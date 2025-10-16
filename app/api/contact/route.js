import nodemailer from "nodemailer";

function validateBody(body) {
  const errors = {};
  if (!body?.name || !body.name.trim()) errors.name = "Name is required";
  if (!body?.email || !/.+@.+\..+/.test(body.email)) errors.email = "Valid email is required";
  if (!body?.message || body.message.trim().length < 10) errors.message = "Message must be at least 10 characters";
  return errors;
}

export async function POST(request) {
  try {
    const body = await request.json();
    const validationErrors = validateBody(body);
    if (Object.keys(validationErrors).length > 0) {
      return Response.json(
        { error: "Validation failed", details: validationErrors },
        { status: 400 }
      );
    }

    const requiredEnv = [
      "EMAIL_HOST",
      "EMAIL_PORT",
      "EMAIL_USER",
      "EMAIL_PASS",
    ].filter((key) => !process.env[key]);

    if (requiredEnv.length > 0) {
      console.error("Missing email configuration", requiredEnv);
      return Response.json(
        {
          error: "Server email configuration is incomplete.",
          details: requiredEnv,
        },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT || 587),
      secure: process.env.EMAIL_SECURE === "true" || Number(process.env.EMAIL_PORT) === 465,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `Portfolio Contact <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER,
      replyTo: `${body.name} <${body.email}>`,
      subject: `Portfolio contact from ${body.name}`,
      text: `Name: ${body.name}\nEmail: ${body.email}\n\n${body.message}`,
    };

    await transporter.sendMail(mailOptions);

    return Response.json({ message: "Thanks! Your message has been sent." });
  } catch (error) {
    console.error("Contact form error", error);
    return Response.json(
      { error: "Something went wrong while sending your message." },
      { status: 500 }
    );
  }
}
