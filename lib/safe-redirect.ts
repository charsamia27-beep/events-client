/** Only follows paths on this site, so a link can't send people somewhere else after login. */
export function safeRedirect(value: string | string[] | undefined, fallback = "/") {
  if (typeof value !== "string") return fallback;
  if (!value.startsWith("/") || value.startsWith("//") || value.startsWith("/\\")) return fallback;
  return value;
}
