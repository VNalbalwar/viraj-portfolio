"use client";

import { useState } from "react";
import { socials } from "@/content/profile";

const EMPTY = { name: "", email: "", subject: "", message: "", company: "" };
const field =
  "mt-2 w-full rounded-[var(--radius)] border bg-transparent px-4 py-3 text-[1rem] text-[var(--ink)] placeholder:text-[var(--muted)] transition-colors duration-150 focus:border-[var(--ink)] focus:outline-none";

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
      <div className="wrap grid gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <div>
          <h2 id="contact-h" className="t-h2">
            Contact
          </h2>
          <p className="t-lead mt-6 max-w-[28ch]">
            If you work on infrastructure, performance or reliability, I'd like to hear about it.
          </p>
          <ul className="mt-8">
            {socials.map((s) => (
              <li key={s.id} className="row-rule">
                <a href={s.href} target="_blank" rel="noopener noreferrer me" className="flex min-h-12 items-center justify-between py-3 link-draw">
                  <span>{s.label}</span>
                  <span aria-hidden>↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

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
              {busy ? "Sending" : "Send message"}
            </button>
            <p role="status" aria-live="polite" className="t-mono" style={state.status === "error" ? { textDecoration: "underline" } : undefined}>
              {state.message}
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
