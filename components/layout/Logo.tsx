import Link from "next/link";

export function LogoMark() {
  return (
    <svg aria-hidden="true" height="38" viewBox="0 0 44 44" width="38">
      <circle cx="16" cy="13" fill="#f7b64f" r="7" />
      <circle cx="30" cy="16" fill="#4d9de0" r="6" />
      <path d="M4 38c0-11 6-17 12-17s9 4 11 9c-3 3-6 8-6 8z" fill="#f7b64f" />
      <path d="M19 40c1-9 5-16 11-16s10 6 10 16z" fill="#4d9de0" />
    </svg>
  );
}

export function Logo() {
  return (
    <Link aria-label="Pashe home" className="logo" href="/">
      <LogoMark />
      <span className="logo-word">Pashe</span>
    </Link>
  );
}
