"use client";

import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { toast } from "sonner";
import { SafeImage } from "@/components/ui/SafeImage";
import { authClient } from "@/lib/auth-client";
import { type FieldErrors, fieldErrors, profileSchema } from "@/lib/validators";
import { Field } from "./Field";

interface ProfileFormProps {
  email: string;
  name: string;
  image: string;
}

export function ProfileForm({ email, name, image }: ProfileFormProps) {
  const router = useRouter();
  const { refetch } = authClient.useSession();
  const [values, setValues] = useState({ name, image });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [pending, setPending] = useState(false);

  const set = (key: keyof typeof values) => (value: string) => {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const parsed = profileSchema.safeParse(values);
    if (!parsed.success) {
      setErrors(fieldErrors(parsed.error));
      return;
    }

    setPending(true);
    const { error } = await authClient.updateUser(parsed.data);
    setPending(false);
    if (error) {
      toast.error(error.message ?? "Your profile could not be updated. Try again");
      return;
    }
    await refetch();
    toast.success("Profile updated");
    router.refresh();
  }

  return (
    <div className="profile-card">
      <div className="profile-head">
        {values.image ? (
          <SafeImage alt="" className="profile-photo" src={values.image} />
        ) : (
          <div className="profile-photo image-fallback" />
        )}
        <div className="profile-id">
          <p className="profile-name">{name}</p>
          <p className="profile-email">{email}</p>
        </div>
      </div>
      <form className="auth-form" noValidate onSubmit={handleSubmit}>
        <Field autoComplete="name" error={errors.name} label="Name" name="name" onChange={set("name")} value={values.name} />
        <Field error={errors.image} label="Profile picture URL" name="image" onChange={set("image")} placeholder="https://..." type="url" value={values.image} />
        <Button className="btn btn-primary" isPending={pending} type="submit">
          Update profile
        </Button>
      </form>
    </div>
  );
}
