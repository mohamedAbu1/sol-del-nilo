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
      return NextResponse.json(
        { error: "Failed to save booking" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Booking saved successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error("❌ Server error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const body = await req.json();
    const { email, bookingId } = body;
    console.log(body);
    if (!email || !bookingId) {
      return NextResponse.json(
        { error: "Missing email or bookingId" },
        { status: 400 }
      );
    }

    // ✅ تحقق من وجود الحجز ومطابقة البريد الإلكتروني
    const { data: booking, error: fetchError } = await supabase
      .from("payments")
      .select("id, email")
      .eq("id", bookingId)
      .single();

    if (fetchError || !booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    if (booking.email !== email) {
      return NextResponse.json(
        { error: "Unauthorized: Email mismatch" },
        { status: 403 }
      );
    }

    // ✅ تنفيذ الحذف
    const { error: deleteError } = await supabase
      .from("payments")
      .delete()
      .eq("id", bookingId);

    if (deleteError) {
      console.error("❌ Delete error:", deleteError);
      return NextResponse.json(
        { error: "Failed to delete booking" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Booking deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error("❌ Server error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
