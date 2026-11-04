"use client";

import { Button } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { type FieldErrors, fieldErrors, registerSchema } from "@/lib/validators";
import { Field } from "./Field";

export function RegisterForm({ redirectTo }: { redirectTo: string }) {
  const router = useRouter();
  const [values, setValues] = useState({ name: "", email: "", image: "", password: "" });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [pending, setPending] = useState(false);

  const set = (key: keyof typeof values) => (value: string) => {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const parsed = registerSchema.safeParse(values);
    if (!parsed.success) {
      const next = fieldErrors(parsed.error);
      setErrors(next);
      if (next.password) toast.error(next.password);
      return;
    }

    setPending(true);
    const { error } = await authClient.signUp.email(parsed.data);
    setPending(false);
    if (error) {
      toast.error(error.message ?? "Registration failed. Check your details and try again");
      return;
    }
    toast.success(`Welcome to Pashe, ${parsed.data.name}`);
    router.push(redirectTo);
    router.refresh();
  }

  return (
    <form className="auth-form" noValidate onSubmit={handleSubmit}>
      <Field autoComplete="name" error={errors.name} label="Name" name="name" onChange={set("name")} value={values.name} />
      <Field autoComplete="email" error={errors.email} label="Email" name="email" onChange={set("email")} type="email" value={values.email} />
      <Field error={errors.image} label="Photo URL" name="image" onChange={set("image")} placeholder="https://..." type="url" value={values.image} />
      <Field
        autoComplete="new-password"
        error={errors.password}
        hint="At least 6 characters, with an uppercase and a lowercase letter."
        label="Password"
        name="password"
        onChange={set("password")}
        type="password"
        value={values.password}
      />
      <Button className="btn btn-primary btn-block" isPending={pending} type="submit">
        Create account
      </Button>
      <p className="auth-switch">
        Already have an account? <Link href={`/login?redirect=${encodeURIComponent(redirectTo)}`}>Log in</Link>
      </p>
    </form>
  );
}
