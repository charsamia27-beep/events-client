import type { ReactNode } from "react";

interface SectionHeadingProps {
  plain: string;
  accent: string;
  /** Puts the accent words first, as in "Our Promise". */
  accentFirst?: boolean;
  align?: "center" | "start";
  lead?: ReactNode;
  as?: "h1" | "h2";
}

export function SectionHeading({ plain, accent, accentFirst, align = "center", lead, as: Tag = "h2" }: SectionHeadingProps) {
  const accentWords = <span className="heading-accent">{accent}</span>;
  return (
    <div className={`section-heading section-heading-${align}`}>
      <Tag className="heading">
        {accentFirst ? (
          <>
            {accentWords} {plain}
          </>
        ) : (
          <>
            {plain} {accentWords}
          </>
        )}
      </Tag>
      {lead && <p className="heading-lead">{lead}</p>}
    </div>
  );
}
