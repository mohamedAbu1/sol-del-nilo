import nodemailer from "nodemailer";
import { createClient } from "@supabase/supabase-js";

export const POST = async (req) => {
  // ✅ تحقق من وجود بيانات البيئة
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
    return new Response(JSON.stringify({ error: "Supabase credentials are missing" }), {
      status: 500,
    });
  }
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    return new Response(JSON.stringify({ error: "Email credentials are missing" }), {
      status: 500,
    });
  }

  // ✅ الاتصال بـ Supabase داخل الدالة
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
  );

  try {
    const body = await req.json();
    const { name, email, subject, message, phone, user_id } = body;

    if (!name || !email || !subject || !message || !phone || !user_id) {
      return new Response(JSON.stringify({ error: "Missing required fields." }), {
        status: 400,
      });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER,
      subject: `Contact Form: ${subject}`,
      html: `...`, // نفس HTML السابق
    };

    await transporter.sendMail(mailOptions);

    const { error } = await supabase.from("messages").insert([
      {
        name,
        email,
        phone,
        subject,
        message,
        user_id,
        created_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      console.error("Supabase insert error:", error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Server error:", err);
    return new Response(JSON.stringify({ error: err.message || "Unexpected error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
