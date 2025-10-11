// app/api/reviews/route.ts
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req) {
  try {
    const body = await req.json();
    const { tourId, rating, comment, userId, name, created_at, avatar } = body;
    console.log(body);
    // تحقق من القيم الأساسية
    if (!tourId || !rating) {
      return NextResponse.json(
        { error: "tourId و rating مطلوبان" },
        { status: 400 }
      );
    }

    // إدخال التقييم في Supabase
    const { data, error } = await supabase.from("reviews").insert([
      {
        tourId,
        rating,
        comment,
        userId: userId || null, // اختياري
        name,
        created_at,
        avatar, // ✅ أضف الصورة هنا
      },
    ]);

    if (error) {
      console.error("❌ خطأ من Supabase:", error.message);
      return NextResponse.json(
        { error: "فشل في حفظ التقييم" },
        { status: 500 }
      );
    }

    return NextResponse.json(data, { status: 201 });
  } catch (err) {
    console.error("❌ خطأ غير متوقع:", err);
    return NextResponse.json({ error: "خطأ في الخادم" }, { status: 500 });
  }
}
