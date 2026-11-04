"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

/** Shows the login toast after Google sends the browser back with ?welcome=1. */
export function WelcomeToast() {
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (params.get("welcome") !== "1") return;
    toast.success("You are logged in");
    const rest = new URLSearchParams(params);
    rest.delete("welcome");
    const query = rest.toString();
    router.replace(query ? `${pathname}?${query}` : pathname);
  }, [params, pathname, router]);

  return null;
}
