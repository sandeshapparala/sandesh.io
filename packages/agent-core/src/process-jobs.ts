import "server-only";
import { setTimeout as delay } from "node:timers/promises";
import { Busy, processJob } from "./worker";

// Runs within the current Vercel invocation, not a periodic recovery job.
// Wait briefly for concurrent requests to release the conversation lease.
export async function processJobs(ids: string[]) {
  const pending = [...new Set(ids)];
  const deadline = Date.now() + 240000;
  await Promise.all(Array.from({ length: Math.min(4, pending.length) }, async () => {
    while (pending.length && Date.now() < deadline - 40000) {
      const id = pending.shift()!;
      for (;;) {
        try {
          await processJob(id);
          break;
        } catch (error) {
          if (error instanceof Busy && Date.now() < deadline - 40000) {
            await delay(1000);
            continue;
          }
          // Retain the durable job for inspection/provider redelivery. Never
          // automatically replay a send with an uncertain provider outcome.
          console.error("whatsapp_job_incomplete", id);
          break;
        }
      }
    }
  }));
  if (pending.length) console.error("whatsapp_batch_incomplete", pending.length);
}
