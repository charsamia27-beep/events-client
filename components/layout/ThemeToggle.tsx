"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { LuMoon, LuSun } from "react-icons/lu";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // The saved theme is only known in the browser, so the icon waits for mount.
  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";
  return (
    <button
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className="icon-btn"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      type="button"
    >
      {isDark ? <LuSun size={19} /> : <LuMoon size={19} />}
    </button>
  );
}
