import { pingKeepAlive } from "../../../app/_lib/keepalive";

export async function GET() {
  // Fire-and-forget the ping. Await to capture errors and return status.
  const res = await pingKeepAlive();

  if (res) {
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  }

  return new Response(JSON.stringify({ ok: false }), { status: 500 });
}
