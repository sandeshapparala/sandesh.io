import { test, mock, beforeEach } from "node:test";
import assert from "node:assert/strict";
import type { Firestore } from "firebase-admin/firestore";
import type { Inbound } from "../src/types.ts";

// Transaction contract double: validates reads-before-writes and atomic commits.
// No live Firebase data, model calls, or WhatsApp recipients are used.
type Data = Record<string, unknown>;
const records = new Map<string, Data>();
function ref(path: string) {
  return {
    path,
    id: path.split("/").at(-1)!,
    get: async () => snapshot(path),
    collection: (name: string) => collection(`${path}/${name}`),
    set: async (data: Data, options?: { merge: boolean }) => {
      records.set(
        path,
        options?.merge ? { ...records.get(path), ...data } : data,
      );
    },
    update: async (data: Data) => {
      records.set(path, { ...records.get(path), ...data });
    },
  };
}
function snapshot(path: string) {
  return {
    exists: records.has(path),
    id: path.split("/").at(-1)!,
    data: () => structuredClone(records.get(path)),
  };
}
function collection(path: string) {
  let field = "",
    limit = 100,
    direction = "asc";
  const query = {
    doc: (id: string) => ref(`${path}/${id}`),
    orderBy: (f: string, d = "asc") => {
      field = f;
      direction = d;
      return query;
    },
    limit: (n: number) => {
      limit = n;
      return query;
    },
    get: async () => ({
      docs: [...records.keys()]
        .filter(
          (k) =>
            k.startsWith(`${path}/`) &&
            k.split("/").length === path.split("/").length + 1,
        )
        .map(snapshot)
        .sort(
          (a, b) =>
            (Number(a.data()?.[field]) - Number(b.data()?.[field])) *
            (direction === "desc" ? -1 : 1),
        )
        .slice(0, limit),
    }),
  };
  return query;
}
const database = {
  collection,
  runTransaction: async (fn: (tx: unknown) => Promise<unknown>) => {
    const writes: (() => void)[] = [];
    let writing = false;
    const result = await fn({
      getAll: async (...refs: ReturnType<typeof ref>[]) => {
        assert.equal(writing, false, "Firestore reads must precede writes");
        return refs.map((r) => snapshot(r.path));
      },
      get: async (r: ReturnType<typeof ref>) => {
        assert.equal(writing, false, "Firestore reads must precede writes");
        return snapshot(r.path);
      },
      create: (r: ReturnType<typeof ref>, data: Data) => {
        assert.ok(!records.has(r.path));
        writing = true;
        writes.push(() => records.set(r.path, data));
      },
      set: (
        r: ReturnType<typeof ref>,
        data: Data,
        options?: { merge: boolean },
      ) => {
        writing = true;
        writes.push(() =>
          records.set(
            r.path,
            options?.merge ? { ...records.get(r.path), ...data } : data,
          ),
        );
      },
      update: (r: ReturnType<typeof ref>, data: Data) => {
        writing = true;
        writes.push(() =>
          records.set(r.path, { ...records.get(r.path), ...data }),
        );
      },
      delete: (r: ReturnType<typeof ref>) => {
        writing = true;
        writes.push(() => {
          records.delete(r.path);
        });
      },
    });
    writes.forEach((write) => write());
    return result;
  },
};
mock.module("../src/firebase.ts", {
  namedExports: { db: () => database as unknown as Firestore },
});
let sends = 0,
  failSend = false,
  onGenerate: (() => Promise<void>) | null = null;
class SendFailure extends Error {
  uncertain = true;
}
mock.module("../src/transport.ts", {
  namedExports: {
    SendFailure,
    sendText: async () => {
      sends++;
      if (failSend) throw new SendFailure();
      return "outbound-1";
    },
  },
});
mock.module("../src/model.ts", {
  namedExports: {
    generateReply: async () => {
      if (onGenerate) await onGenerate();
      return {
        reply: "I build agents around your workflow. What business do you run?",
        handoff: false,
        reason: "",
        summary: "Wants an agent",
        service: "AI agent",
        business: "",
        timeline: "",
      };
    },
  },
});
const { persist, conversationRef, applyStatus } =
  await import("../src/store.ts");
const { processJob, Busy } = await import("../src/worker.ts");
const { digest } = await import("../src/webhook.ts");
const sample = (id = "inbound-1"): Inbound => ({
  kind: "inbound",
  id,
  phone: "919999999999",
  name: "Synthetic lead",
  text: "I need an agent",
  timestamp: Date.now() - 1000,
  unsupported: false,
  referral: null,
});
beforeEach(() => {
  records.clear();
  records.set("wa_settings/agent", { mode: "public" });
  sends = 0;
  failSend = false;
  onGenerate = null;
});
test("duplicate webhook and worker delivery send only once", async () => {
  const event = sample();
  const id = await persist(event);
  assert.equal(await persist(event), id);
  await processJob(id);
  await processJob(id);
  assert.equal(sends, 1);
  assert.equal(records.get(`wa_jobs/${id}`)?.state, "done");
  const timings = records.get(`wa_jobs/${id}`)?.timings as Record<string, number>;
  for (const stage of ["claimMs", "eligibilityMs", "historyMs", "generationMs", "reservationMs", "providerMs", "workerMs"])
    assert.ok(Number.isFinite(timings[stage]) && timings[stage] >= 0, stage);
});
test("human takeover during generation prevents outbound send", async () => {
  const event = sample();
  const id = await persist(event);
  onGenerate = async () => {
    await conversationRef(event.phone).update({
      aiEnabled: false,
      revision: 2,
    });
  };
  await processJob(id);
  assert.equal(sends, 0);
});
test("unknown provider outcome is held for review without blind retry", async () => {
  const id = await persist(sample());
  failSend = true;
  await processJob(id);
  await processJob(id);
  assert.equal(sends, 1);
  assert.equal(records.get(`wa_jobs/${id}`)?.state, "review");
});
test("expired sending reservation becomes review rather than another send", async () => {
  const id = await persist(sample());
  records.set(`wa_jobs/${id}`, {
    ...records.get(`wa_jobs/${id}`),
    state: "sending",
    sendingAt: Date.now() - 100000,
  });
  await processJob(id);
  assert.equal(sends, 0);
  assert.equal(records.get(`wa_jobs/${id}`)?.state, "review");
});
test("conversation lease defers another worker", async () => {
  const event = sample(),
    id = await persist(event);
  await conversationRef(event.phone).update({ leaseUntil: Date.now() + 60000 });
  await assert.rejects(processJob(id), Busy);
  assert.equal(sends, 0);
});
test("latest of two same-second messages gets one contextual reply", async () => {
  const a = sample("one"),
    b = { ...a, id: "two", text: "Real estate" };
  const first = await persist(a),
    second = await persist(b);
  await processJob(first);
  await processJob(second);
  assert.equal(sends, 1);
});
test("STOP remains suppressed on subsequent enquiries", async () => {
  await persist({ ...sample("stop"), text: "STOP" });
  const id = await persist(sample("later"));
  await processJob(id);
  assert.equal(sends, 0);
});
test("global kill switch is rechecked after generation", async () => {
  const id = await persist(sample());
  onGenerate = async () => {
    records.set("wa_settings/agent", { mode: "off" });
  };
  await processJob(id);
  assert.equal(sends, 0);
});
test("delivery statuses do not regress", async () => {
  const phone = sample().phone;
  await applyStatus({
    kind: "status",
    id: "outbound-1",
    phone,
    status: "read",
    timestamp: Date.now(),
  });
  await applyStatus({
    kind: "status",
    id: "outbound-1",
    phone,
    status: "sent",
    timestamp: Date.now(),
  });
  assert.equal(
    records.get(
      `wa_conversations/${digest(phone)}/messages/${digest("outbound-1")}`,
    )?.status,
    "read",
  );
});
