import { supabase } from "@/lib/supabaseClient";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { payerName, payerEmail, amount, currency, status, orderId } = JSON.parse(req.body);

    const { data, error } = await supabase.from("payments").insert([
      {
        payer_name: payerName,
        payer_email: payerEmail,
        amount: amount,
        currency: currency,
        status: status,
        order_id: orderId,
        created_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      console.error("❌ خطأ في الإدخال:", error.message);
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ message: "✅ تم حفظ الدفع بنجاح", data });
  } catch (err) {
    console.error("❌ خطأ في المعالجة:", err.message);
    return res.status(500).json({ error: "فشل في حفظ البيانات" });
  }
}
