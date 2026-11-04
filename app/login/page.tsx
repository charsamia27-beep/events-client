import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/forms/LoginForm";
import { auth } from "@/lib/auth";
import { safeRedirect } from "@/lib/safe-redirect";

export const metadata: Metadata = { title: "Log in" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string | string[] }>;
}) {
  const redirectTo = safeRedirect((await searchParams).redirect);
  const session = await auth.api.getSession({ headers: await headers() });
  if (session) redirect(redirectTo);

  return (
    <div className="container auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Welcome back</h1>
        <p className="auth-lead">Log in to join events and manage your own.</p>
        <LoginForm redirectTo={redirectTo} />
      </div>
    </div>
  );
}
