import nodemailer from "nodemailer";

// Configuring the email transport
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.NEXT_PUBLIC_SENDER_USER,
        pass: process.env.NEXT_PUBLIC_SENDER_PASS,
    },
});

export async function POST(request) {
    try {
        const { name, email, subject, message } = await request.json();

        // Validation
        if (!name || !email || !subject || !message) {
            return new Response(JSON.stringify({ error: "All fields are required" }), { status: 400 });
        }

        const mailOptions = {
            from: process.env.NEXT_PUBLIC_SENDER_USER,
            to: process.env.NEXT_PUBLIC_RECEIVER_USER,
            subject: "New Contact Form Submission",
            text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`,
        };

        await transporter.sendMail(mailOptions);
        return new Response(JSON.stringify({ message: "Email sent successfully" }), { status: 200 });
    } catch (error) {
        console.error("Error sending email", error);
        return new Response(JSON.stringify({ error: "Failed to send email" }), { status: 500 });
    }
}
