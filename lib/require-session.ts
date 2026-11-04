import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "./auth";

/**
 * Runs on the server at the top of every private page. The session cookie arrives
 * with the request, so a logged-in user stays on the page after a reload.
 */
export async function requireSession(path: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect(`/login?redirect=${encodeURIComponent(path)}`);
  return session;
}
