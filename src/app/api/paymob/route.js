import { NextResponse } from "next/server";
import axios from "axios";
import { createClient } from "@supabase/supabase-js";

// ✅ إنشاء عميل Supabase باستخدام مفتاح الخدمة
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY // تأكد من إضافته في .env.local
);

export async function POST(req) {
  console.log("🔍 بدء تنفيذ API /paymob");

  // ✅ طباعة القيم البيئية
  console.log("🔐 Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
  console.log("🔐 Supabase Key:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  console.log("🔐 Paymob API Key:", process.env.PAYMOB_API_KEY);
  console.log("🔐 Paymob Integration ID:", process.env.PAYMOB_INTEGRATION_ID);
  console.log("🔐 Paymob Iframe ID:", process.env.PAYMOB_IFRAME_ID);

  try {
    const body = await req.json();
    console.log("📦 Body:", body);

    const { amount, name, email, phone, user_id, tour_id } = body;

    if (!amount || !name || !email || !phone || !user_id || !tour_id) {
      console.warn("⚠️ بيانات ناقصة");
      return NextResponse.json(
        { error: "البيانات غير مكتملة" },
        { status: 400 }
      );
    }

    // ✅ الخطوة 1: الحصول على Token
    console.log("🚀 طلب Token من Paymob...");
    const { data: authData } = await axios.post(
      "https://accept.paymob.com/api/auth/tokens",
      {
        api_key: process.env.PAYMOB_API_KEY,
      }
    );
    console.log("✅ Token:", authData.token);

    // ✅ الخطوة 2: إنشاء Order
    console.log("🚀 إنشاء Order...");
    const { data: orderData } = await axios.post(
      "https://accept.paymob.com/api/ecommerce/orders",
      {
        auth_token: authData.token,
        delivery_needed: false,
        amount_cents: 50000,
        currency: "EGP",
        items: [],
      }
    );
    console.log("✅ Order ID:", orderData.id);

    // ✅ الخطوة 3: إنشاء Payment Key
    console.log("🚀 إنشاء Payment Key...");
    const { data: paymentData } = await axios.post(
      "https://accept.paymob.com/api/acceptance/payment_keys",
      {
        auth_token: authData.token,
        amount_cents: 50000,
        expiration: 3600,
        order_id: orderData.id,
        billing_data: {
          first_name: name,
          last_name: "Nile",
          email,
          phone_number: phone,
          apartment: "NA",
          floor: "NA",
          street: "NA",
          building: "NA",
          city: "Cairo",
          country: "EG",
          state: "NA",
        },
        currency: "EGP",
        integration_id: parseInt(process.env.PAYMOB_INTEGRATION_ID),
      }
    );
    console.log("✅ Payment Token:", paymentData.token);

    // ✅ الخطوة 4: حفظ البيانات في Supabase
    console.log("🧾 حفظ البيانات في Supabase...");
    const { error: dbError } = await supabase.from("payments").insert([
      {
        user_id,
        tour_id,
        order_id: orderData.id,
        amount_cents: amount,
        currency: "EGP",
        payment_token: paymentData.token,
        status: "pending",
      },
    ]);

    if (dbError) {
      console.error("❌ خطأ في Supabase:", dbError.message);
      return NextResponse.json(
        { error: "فشل في حفظ البيانات في Supabase" },
        { status: 500 }
      );
    }

    // ✅ الخطوة 5: إرسال رابط الدفع
    const iframeUrl = `https://accept.paymob.com/api/acceptance/iframes/${process.env.PAYMOB_IFRAME_ID}?payment_token=${paymentData.token}`;
    console.log("✅ رابط الدفع:", iframeUrl);
    return NextResponse.json({ url: iframeUrl }, { status: 200 });
  } catch (error) {
    console.error("❌ Paymob error:", {
      message: error.message,
      response: error.response?.data,
      stack: error.stack,
    });

    return NextResponse.json(
      {
        error:
          error.response?.data || error.message || "فشل في إنشاء جلسة الدفع",
      },
      { status: 500 }
    );
  }
}
