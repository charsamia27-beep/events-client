import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { RegisterForm } from "@/components/forms/RegisterForm";
import { auth } from "@/lib/auth";
import { safeRedirect } from "@/lib/safe-redirect";

export const metadata: Metadata = { title: "Register" };

export default async function RegisterPage({
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
        <h1 className="auth-title">Create your account</h1>
        <p className="auth-lead">Post events and join the ones near you.</p>
        <RegisterForm redirectTo={redirectTo} />
      </div>
    </div>
  );
}
