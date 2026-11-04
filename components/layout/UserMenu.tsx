"use client";

import { Avatar, Button, Dropdown, Label } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

interface UserMenuProps {
  name: string;
  image?: string | null;
  onLoggedOut: () => void;
}

const initials = (name: string) =>
  name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

export function UserMenu({ name, image, onLoggedOut }: UserMenuProps) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function handleLogout() {
    setPending(true);
    const { error } = await authClient.signOut();
    setPending(false);
    if (error) {
      toast.error(error.message ?? "Logout failed. Try again");
      return;
    }
    onLoggedOut();
    toast.success("You are logged out");
    router.push("/");
    router.refresh();
  }

  return (
    <>
      <div className="user-menu">
        <Dropdown>
          <Dropdown.Trigger aria-label={`Account menu for ${name}`} className="avatar-trigger">
            <Avatar className="nav-avatar">
              {image && <Avatar.Image alt="" src={image} />}
              <Avatar.Fallback>{initials(name)}</Avatar.Fallback>
            </Avatar>
          </Dropdown.Trigger>
          <Dropdown.Popover>
            <Dropdown.Menu aria-label="Account" onAction={(key) => router.push(String(key))}>
              <Dropdown.Item id="/events/create" textValue="Create Event">
                <Label>Create Event</Label>
              </Dropdown.Item>
              <Dropdown.Item id="/manage-events" textValue="Manage Events">
                <Label>Manage Events</Label>
              </Dropdown.Item>
              <Dropdown.Item id="/joined-events" textValue="Joined Events">
                <Label>Joined Events</Label>
              </Dropdown.Item>
              <Dropdown.Item id="/profile" textValue="My Profile">
                <Label>My Profile</Label>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown.Popover>
        </Dropdown>
        <span aria-hidden="true" className="name-tip">
          {name}
        </span>
      </div>
      <Button className="btn btn-outline btn-small" isPending={pending} onPress={handleLogout}>
        Logout
      </Button>
    </>
  );
}
