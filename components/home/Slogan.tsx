import { Swoosh } from "@/components/ui/Swoosh";

export function Slogan() {
  return (
    <section aria-label="Our slogan" className="slogan">
      <div className="container">
        <p className="slogan-small" lang="bn">
          প্রতিটি পাড়ায়, প্রতিটি মানুষের জন্য
        </p>
        <p className="slogan-big" lang="bn">
          পাশে আছি, পাশে থাকবো
        </p>
        <Swoosh className="slogan-swoosh" />
      </div>
    </section>
  );
}
