"use client";

import { Button } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { type FieldErrors, fieldErrors, loginSchema } from "@/lib/validators";
import { Field } from "./Field";

export function LoginForm({ redirectTo }: { redirectTo: string }) {
  const router = useRouter();
  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [pending, setPending] = useState(false);

  const set = (key: keyof typeof values) => (value: string) => {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const parsed = loginSchema.safeParse(values);
    if (!parsed.success) {
      setErrors(fieldErrors(parsed.error));
      return;
    }

    setPending(true);
    const { error } = await authClient.signIn.email(parsed.data);
    setPending(false);
    if (error) {
      toast.error(error.message ?? "Login failed. Check your email and password");
      return;
    }
    toast.success("You are logged in");
    router.push(redirectTo);
    router.refresh();
  }

  async function handleGoogle() {
    // Google sends the browser away, so the welcome toast runs when it comes back.
    const joiner = redirectTo.includes("?") ? "&" : "?";
    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: `${redirectTo}${joiner}welcome=1`,
    });
    if (error) toast.error(error.message ?? "Google login is not available right now");
  }

  return (
    <form className="auth-form" noValidate onSubmit={handleSubmit}>
      <Field autoComplete="email" error={errors.email} label="Email" name="email" onChange={set("email")} type="email" value={values.email} />
      <Field autoComplete="current-password" error={errors.password} label="Password" name="password" onChange={set("password")} type="password" value={values.password} />
      <Button className="btn btn-primary btn-block" isPending={pending} type="submit">
        Log in
      </Button>
      <p className="auth-divider">or</p>
      <Button className="btn btn-outline btn-block" onPress={handleGoogle} type="button">
        <FcGoogle aria-hidden="true" size={20} /> Continue with Google
      </Button>
      <p className="auth-switch">
        New to Pashe? <Link href={`/register?redirect=${encodeURIComponent(redirectTo)}`}>Create an account</Link>
      </p>
    </form>
  );
}
