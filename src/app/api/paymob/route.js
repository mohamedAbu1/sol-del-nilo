// app/api/paymob/route.js
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("📦 Received booking payload:", body);
    // ✅ بيانات الدفع
    const {
      amount_cents,
      name,
      email,
      userId,
      tourId,
      tourTitle,
      tourDate,
      bookingTime,
      adults,
      children,
      hasChildren,
      hasPets,
      petType,
      guideLanguages,
      selectedExtras,

    } = body;

    // ✅ تنفيذ الدفع (هنا يمكنك ربط Paymob أو أي خدمة دفع أخرى)
    // مبدئيًا سنفترض أن الدفع تم بنجاح

    // ✅ حفظ البيانات في Supabase
    const { error } = await supabase.from("payments").insert([
      {
        amount_cents,
        name,
        email,
        userId,
        tourId,
        tourTitle,
        tourDate,
        bookingTime,
        adults,
        children,
        hasChildren,
        hasPets,
        petType,
        guideLanguages,
        selectedExtras,
        created_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      console.error("❌ Supabase error:", error);
      return NextResponse.json({ error: "Failed to save booking" }, { status: 500 });
    }

    return NextResponse.json({ message: "Booking saved successfully" }, { status: 200 });
  } catch (err) {
    console.error("❌ Server error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
