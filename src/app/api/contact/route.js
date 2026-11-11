import nodemailer from "nodemailer";

// Server-only names are preferred. The old NEXT_PUBLIC_* names still work so
// the existing Vercel settings keep sending mail, but please rename them:
// a NEXT_PUBLIC_ prefix is meant for values that are safe to expose.
const env = (name) => process.env[name] || process.env[`NEXT_PUBLIC_${name}`];

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const clean = (v, max) => (typeof v === "string" ? v.replace(/[\r\n]+/g, " ").trim().slice(0, max) : "");
const json = (body, status) => Response.json(body, { status });

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "That request did not look right. Reload the page and try again." }, 400);
  }

  // Honeypot: real people never fill this field. Pretend it worked.
  if (body.company) return json({ message: "Delivered." }, 200);

  const name = clean(body.name, 100);
  const email = clean(body.email, 200);
  const subject = clean(body.subject, 150);
  const message = typeof body.message === "string" ? body.message.trim().slice(0, 5000) : "";

  if (!name || !email || !subject || !message) return json({ error: "Fill in all four fields and send again." }, 400);
  if (!EMAIL.test(email)) return json({ error: "That email address looks off. Check it and send again." }, 400);

  const user = env("SENDER_USER");
  const pass = env("SENDER_PASS");
  const to = env("RECEIVER_USER") || user;
  if (!user || !pass) {
    console.error("Contact form: SENDER_USER / SENDER_PASS are not set");
    return json({ error: "Mail is not set up on this deployment yet. Ping me on LinkedIn instead." }, 503);
  }

  try {
    const transporter = nodemailer.createTransport({ service: "gmail", auth: { user, pass } });
    await transporter.sendMail({
      from: `"Portfolio contact" <${user}>`,
      to,
      replyTo: `"${name.replace(/"/g, "'")}" <${email}>`,
      subject: `[Portfolio] ${subject}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });
    return json({ message: "Delivered." }, 200);
  } catch (err) {
    console.error("Contact form: send failed", err);
    return json({ error: "The mail server refused that one. Try again in a minute, or ping me on LinkedIn." }, 502);
  }
}
