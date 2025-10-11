import nodemailer from "nodemailer";
import { createClient } from "@supabase/supabase-js";

// إعداد الاتصال بـ Supabase باستخدام مفتاح الخدمة
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export const POST = async (req) => {
  try {
    const body = await req.json();
    const { name, email, subject, message, phone, user_id } = body;

    // تحقق من البيانات الأساسية
    if (!name || !email || !subject || !message || !phone || !user_id) {
      return new Response(
        JSON.stringify({ error: "Missing required fields." }),
        {
          status: 400,
        }
      );
    }

    // إعداد البريد
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: email,
      to: "mohamedahmed33m11@gmail.com",
      subject: `Contact Form: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9; color: #333;">
          <h2 style="color: #ffb300;">📩 New Contact Form Submission</h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr><td style="padding: 8px; font-weight: bold;">Name:</td><td style="padding: 8px;">${name}</td></tr>
            <tr style="background-color: #f1f1f1;"><td style="padding: 8px; font-weight: bold;">Email:</td><td style="padding: 8px;">${email}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Phone:</td><td style="padding: 8px;">${phone}</td></tr>
            <tr style="background-color: #f1f1f1;"><td style="padding: 8px; font-weight: bold;">Subject:</td><td style="padding: 8px;">${subject}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Message:</td><td style="padding: 8px;">${message}</td></tr>
          </table>
          <hr style="margin-top: 30px; border: none; border-top: 1px solid #ccc;" />
          <p style="font-size: 0.9rem; color: #777;">This message was sent from your website contact form.</p>
        </div>
      `,
    };

    // 1️⃣ إرسال البريد
    await transporter.sendMail(mailOptions);

    // 2️⃣ حفظ البيانات في Supabase
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
    return new Response(
      JSON.stringify({ error: err.message || "Unexpected error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
