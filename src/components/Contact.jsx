"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Send } from "lucide-react";
import { FadeUp, MaskHeading } from "./Reveal";

const EMPTY = { name: "", email: "", subject: "", message: "", company: "" };
const field =
  "mt-2 w-full rounded-[12px] border bg-transparent px-4 py-3.5 text-[1rem] text-[var(--ink)] transition-[border-color,background-color] duration-200 focus:border-[var(--ink)] focus:bg-[rgb(255_255_255/0.08)] focus:outline-none";

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
      if (!res.ok) throw new Error(data.error || "That didn't send. Try again in a minute, or message me on LinkedIn.");
      setForm(EMPTY);
      setState({ status: "sent", message: "Sent. I'll reply by email." });
    } catch (err) {
      setState({ status: "error", message: err.message });
    }
  }

  return (
    <section id="contact" className="sec band" aria-labelledby="contact-h">
      <div className="wrap">
        <MaskHeading id="contact-h" text="Say hello." className="t-display text-[clamp(4rem,15vw,14rem)]" />
        <div className="mt-16 grid gap-x-6 gap-y-14 lg:grid-cols-12">
          <FadeUp className="lg:col-span-4">
            <p className="t-lead max-w-[24ch]">If you work on infrastructure, performance or reliability, I'd like to hear about it.</p>
          </FadeUp>

          <FadeUp delay={0.1} className="lg:col-span-7 lg:col-start-6">
            <form onSubmit={submit} className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                Name
                <input className={field} style={{ borderColor: "var(--line)" }} name="name" value={form.name} onChange={set} required maxLength={100} autoComplete="name" />
              </label>
              <label className="block">
                Email
                <input className={field} style={{ borderColor: "var(--line)" }} type="email" name="email" value={form.email} onChange={set} required maxLength={200} autoComplete="email" />
              </label>
              <label className="block sm:col-span-2">
                Subject
                <input className={field} style={{ borderColor: "var(--line)" }} name="subject" value={form.subject} onChange={set} required maxLength={150} />
              </label>
              <label className="block sm:col-span-2">
                Message
                <textarea className={`${field} min-h-40 resize-y`} style={{ borderColor: "var(--line)" }} name="message" value={form.message} onChange={set} required maxLength={5000} />
              </label>
              <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                <label>
                  Company
                  <input tabIndex={-1} name="company" value={form.company} onChange={set} autoComplete="off" />
                </label>
              </div>
              <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
                <button type="submit" className="btn btn-solid" disabled={busy}>
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={state.status === "sent" ? "sent" : busy ? "busy" : "send"}
                      initial={{ y: 12, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -12, opacity: 0 }}
                      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                      className="inline-flex items-center gap-2"
                    >
                      {state.status === "sent" ? (
                        <>Sent <Check size={18} aria-hidden /></>
                      ) : (
                        <>{busy ? "Sending" : "Send message"} <Send size={16} aria-hidden /></>
                      )}
                    </motion.span>
                  </AnimatePresence>
                </button>
                <p role="status" aria-live="polite" style={state.status === "error" ? { textDecoration: "underline" } : undefined}>
                  {state.message}
                </p>
              </div>
            </form>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
