import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = { title: "Privacy and Terms" };

export default function PrivacyPage() {
  return (
    <div className="container page">
      <SectionHeading accent="and Terms" as="h1" plain="Privacy" />
      <div className="legal-text">
        <p className="body-text">
          Pashe saves your name, email address and profile photo link so you can log in and take part in events.
          If you log in with Google, Pashe receives these details from your Google account.
        </p>
        <p className="body-text">
          Pashe also saves the events you create and the events you join. Your name is shown on events you create.
          Pashe uses a login cookie to keep you logged in, and your browser remembers your theme choice.
          Pashe does not sell your information.
        </p>
        <p className="body-text">
          By using Pashe, you agree to post accurate event details and to use the site respectfully.
          Event organisers are responsible for the events they post.
        </p>
      </div>
    </div>
  );
}