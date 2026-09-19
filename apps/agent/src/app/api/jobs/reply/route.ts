import { after } from "next/server";
import { verifyWorker } from "@sandesh/agent-core/dispatch";
import { processJobs } from "@sandesh/agent-core/process-jobs";
import { boundedBody } from "@sandesh/agent-core/webhook";
export const runtime = "nodejs";
export const maxDuration = 300;
export async function POST(request: Request) {
  if (!(await verifyWorker(request)))
    return new Response("Unauthorized", { status: 401 });
  let id: string;
  try {
    id = JSON.parse((await boundedBody(request, 1024)).toString()).id;
    if (!/^[a-f0-9]{64}$/.test(id)) throw new Error();
  } catch {
    return new Response("Invalid job", { status: 400 });
  }
  after(() => processJobs([id]));
  return new Response("Accepted", { status: 202 });
}
