import { SectionHeading } from "@/components/ui/SectionHeading";

const STEPS = [
  { title: "Pick an event", text: "Browse upcoming events and open one to read the place, date and plan." },
  { title: "Press Join Event", text: "Log in or create a free account. Your place is saved straight away." },
  { title: "Show up and help", text: "Check Joined Events for your dates, then bring a friend along." },
];

export function HowItWorks() {
  return (
    <section className="section">
      <div className="container">
        <SectionHeading accent="Works" plain="How Joining" />
        <ol className="steps">
          {STEPS.map((step, index) => (
            <li className="step" key={step.title}>
              <span aria-hidden="true" className="step-number">
                {index + 1}
              </span>
              <h3 className="step-title">{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
