import type { Metadata } from "next";
import { ProfileForm } from "@/components/forms/ProfileForm";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { requireSession } from "@/lib/require-session";

export const metadata: Metadata = { title: "My Profile" };

export default async function ProfilePage() {
  const { user } = await requireSession("/profile");

  return (
    <div className="container page">
      <SectionHeading accent="Profile" accentFirst={false} as="h1" plain="My" />
      <ProfileForm email={user.email} image={user.image ?? ""} name={user.name} />
    </div>
  );
}
