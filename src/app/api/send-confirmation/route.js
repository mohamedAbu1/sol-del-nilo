import nodemailer from "nodemailer";

export async function POST(req) {
  const body = await req.json();
  const { email, name, tourTitle, date, time, price } = body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your Booking Confirmation – SolDelNilo",
    html: `
  <div style="font-family: 'Segoe UI', 'Cairo', sans-serif; background-color: #f9f9f9; padding: 30px;">
    <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); padding: 30px;">
      <div style="text-align: center;">
        <h2 style="color: #1565c0; font-size: 24px; margin-bottom: 10px;">Thank You for Booking with SolDelNilo 🎉</h2>
        <p style="font-size: 16px; color: #555;">We're thrilled to have you on board. Your adventure awaits!</p>
      </div>

      <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;" />

      <h3 style="color: #333; font-size: 18px; margin-bottom: 10px;">🧭 Tour Details</h3>
      <p style="font-size: 16px; color: #444;"><strong>Tour:</strong> ${tourTitle}</p>
      <p style="font-size: 16px; color: #444;"><strong>Date:</strong> ${date}</p>
      <p style="font-size: 16px; color: #444;"><strong>Time:</strong> ${time}</p>
      <p style="font-size: 16px; color: #444;"><strong>Final Price:</strong> ${price} USD</p>

      <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;" />

      <h3 style="color: #333; font-size: 18px; margin-bottom: 10px;">👤 Customer Info</h3>
      <p style="font-size: 16px; color: #444;"><strong>Name:</strong> ${name}</p>
      <p style="font-size: 16px; color: #444;"><strong>Email:</strong> ${email}</p>

      <div style="text-align: center; margin-top: 40px;">
        <a href="https://yourdomain.com/my-bookings" style="background-color: #d4a85f; color: #fff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: bold; font-size: 16px;">
          View My Booking
        </a>
      </div>

      <p style="text-align: center; font-size: 14px; color: #888; margin-top: 30px;">
        If you have any questions, feel free to contact our support team.
      </p>
    </div>
  </div>
`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("❌ فشل إرسال البريد:", error);
    return new Response(JSON.stringify({ success: false, error }), {
      status: 500,
    });
  }
}
