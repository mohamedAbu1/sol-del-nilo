import Stripe from "stripe";
import { supabase } from "@/lib/supabase";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature");

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      const { data, error } = await supabase.from("payments").insert([
        {
          email: session.customer_email,
          amount: session.amount_total,
          currency: session.currency,
          customer_id: session.customer,
        },
      ]);

      if (error) {
        console.error("❌ خطأ في حفظ البيانات:", error.message);
        return new Response("Database error", { status: 500 });
      }

      console.log("✅ تم حفظ الدفع في Supabase:", data);
    }

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("❌ Webhook error:", err.message);
    return new Response("Webhook error", { status: 400 });
  }
}
