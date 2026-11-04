"use client";

import type { FormEvent } from "react";
import { toast } from "sonner";

export function Newsletter() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    toast.info("Newsletter sign-up opens soon. Thanks for your interest.");
    event.currentTarget.reset();
  }

  return (
    <section className="newsletter">
      <div className="container newsletter-row">
        <div>
          <h2 className="newsletter-title">New events in your inbox</h2>
          <p className="newsletter-text">One short email a month, with upcoming events and how to help.</p>
        </div>
        <form className="newsletter-form" onSubmit={handleSubmit}>
          <label className="visually-hidden" htmlFor="newsletter-email">
            Email address
          </label>
          <input id="newsletter-email" name="email" placeholder="you@example.com" required type="email" />
          <button className="btn btn-marigold" type="submit">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
