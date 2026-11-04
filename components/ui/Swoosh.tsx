/** The hand-drawn stroke under the hero and slogan headlines. */
export function Swoosh({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={`swoosh ${className ?? ""}`} fill="none" viewBox="0 0 420 22">
      <path
        d="M4 17C72 5 196 1 300 5c44 2 82 5 116 9-62-4-142-6-214-3C128 14 62 20 18 21"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="3"
      />
    </svg>
  );
}
