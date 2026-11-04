import { authClient } from "./auth-client";

const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000").replace(/\/+$/, "");

/** Calls a protected Express route with a fresh JWT from Better Auth. */
export async function privateFetch(path: string, init: RequestInit = {}) {
  const { data, error } = await authClient.token();
  if (error || !data) throw new Error("Log in to continue");
  return fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${data.token}`,
      ...init.headers,
    },
  });
}

/** Reads the { message } body the API sends with every error. */
export async function errorMessage(response: Response, fallback: string) {
  try {
    const body = (await response.json()) as { message?: string };
    return body.message ?? fallback;
  } catch {
    return fallback;
  }
}
