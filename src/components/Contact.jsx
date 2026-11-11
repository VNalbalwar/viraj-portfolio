"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Send } from "lucide-react";
import { Socials } from "./Icons";
import { socials } from "@/content/profile";

const EMPTY = { name: "", email: "", subject: "", message: "", company: "" };
const field =
  "mt-1.5 w-full rounded-2xl border bg-[var(--surface)] px-4 py-3 text-[1rem] text-[var(--on)] placeholder:text-[color-mix(in_oklab,var(--on)_62%,var(--bg))] transition-[border-color,background-color] duration-200 focus:border-[var(--on)] focus:bg-[var(--surface-2)] focus:outline-none";

export default function Contact() {
  const [form, setForm] = useState(EMPTY);
  const [state, setState] = useState({ status: "idle", message: "" });
  const set = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const busy = state.status === "sending";

  async function submit(e) {
    e.preventDefault();
    if (busy) return;
    setState({ status: "sending", message: "Sending…" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something broke on my side. Try again in a minute, or ping me on LinkedIn.");
      setForm(EMPTY);
      setState({ status: "sent", message: "Delivered. I'll reply soon." });
    } catch (err) {
      setState({ status: "error", message: err.message });
    }
  }

  return (
    <section id="contact" className="zone" aria-labelledby="contact-h">
      <div className="wrap zone-pad">
        <div className="panel-accent grid rounded-[2rem] p-6 sm:p-10 lg:p-14 gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
          <div>
            <h2 id="contact-h" className="display text-[clamp(2.6rem,7.5vw,5.5rem)]">
              Let's talk.
            </h2>
            <p className="mt-6 max-w-[40ch] text-[1.15rem] font-medium">
              You made it all the way down here, so you might as well say hi. If you're working on something where infrastructure, performance or reliability matters, I'd like to hear about it.
            </p>
            <Socials items={socials} className="mt-8" />
          </div>

          <form onSubmit={submit} noValidate={false} className="grid gap-4 sm:grid-cols-2">
            <label className="block font-semibold">
              Your name
              <input className={field} style={{ borderColor: "var(--line)" }} name="name" value={form.name} onChange={set} required maxLength={100} autoComplete="name" />
            </label>
            <label className="block font-semibold">
              Email
              <input className={field} style={{ borderColor: "var(--line)" }} type="email" name="email" value={form.email} onChange={set} required maxLength={200} autoComplete="email" placeholder="you@example.com" />
            </label>
            <label className="block font-semibold sm:col-span-2">
              Subject
              <input className={field} style={{ borderColor: "var(--line)" }} name="subject" value={form.subject} onChange={set} required maxLength={150} />
            </label>
            <label className="block font-semibold sm:col-span-2">
              Message
              <textarea className={`${field} min-h-40 resize-y`} style={{ borderColor: "var(--line)" }} name="message" value={form.message} onChange={set} required maxLength={5000} />
            </label>
            {/* honeypot: humans never see or fill this */}
            <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label>
                Company
                <input tabIndex={-1} name="company" value={form.company} onChange={set} autoComplete="off" />
              </label>
            </div>
            <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
              <button type="submit" className="btn btn-hot" disabled={busy}>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={state.status === "sent" ? "sent" : "send"}
                    initial={{ y: 12, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -12, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-flex items-center gap-2"
                  >
                    {state.status === "sent" ? (
                      <>Sent <Check size={18} aria-hidden /></>
                    ) : (
                      <>{busy ? "Sending" : "Send message"} <Send size={17} aria-hidden /></>
                    )}
                  </motion.span>
                </AnimatePresence>
              </button>
              <p
                role="status"
                aria-live="polite"
                className="readout text-[0.85rem] font-semibold"
                style={state.status === "error" ? { textDecoration: "underline" } : undefined}
              >
                {state.message || "I usually reply within a day."}
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
