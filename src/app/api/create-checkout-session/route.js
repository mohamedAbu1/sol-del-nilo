import { NextResponse } from "next/server";
import Stripe from "stripe";

// 🔐 استخدم مفتاح Stripe السري من لوحة التحكم
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  const { price, tourId, bookingData } = await request.json();

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `حجز رحلة رقم ${tourId}`,
              description: `عدد الأفراد: ${bookingData.people}, تاكسي: ${bookingData.needsTaxi}`,
            },
            unit_amount: Math.round(price * 100), // Stripe يستخدم السنت
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("❌ خطأ في إنشاء جلسة الدفع:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
