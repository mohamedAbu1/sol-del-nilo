import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET(request, { params }) {
  const { id } = params;
  try {
    const { data: tour, error } = await supabase
      .from("tour")
      .select(
        "*, category(*), city(*), tripprogram(*), includes(*), reviews(*),tourimage(*),payments(*),messages(*)"
      )
      .eq("id", id)
      .single();
    if (error || !tour) {
      console.error("❌ Supabase Error:", error?.message);
      return NextResponse.json({ error: "الرحلة غير موجودة" }, { status: 404 });
    }

    return NextResponse.json({ tour }, { status: 200 });
  } catch (error) {
    console.error("❌ خطأ أثناء جلب الرحلة:", error);
    return NextResponse.json(
      { error: "خطأ داخلي في السيرفر" },
      { status: 500 }
    );
  }
}

export async function PATCH(req, {params}) {
  const tourId = params.id;

  const body = await req.json();
  console.log("📥 بيانات التعديل:", body);

  // تحقق من وجود id
  if (!tourId) {
    return NextResponse.json({ error: "Tour ID is required" }, { status: 400 });
  }

  // تحقق من صحة البيانات
  const {
    title,
    description,
    price,
    theDate,
    TripDuration,
    DayPeople,
    cityId,
    categoryId,
    rival,
    image,
  } = body;

 if (
  !title || !description || !price || !theDate || !TripDuration ||
  !cityId || !categoryId || !rival || !DayPeople ||
  !Array.isArray(image) || image.length < 4
) {
  return NextResponse.json({ error: "Missing or invalid fields" }, { status: 400 });
}


  // تنفيذ التحديث
  const { error } = await supabase
    .from("tour")
    .update({
      title,
      description,
      price,
      theDate,
      TripDuration,
      cityId,
      categoryId,
      rival,
      DayPeople,
      image,
    })
    .eq("id", tourId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Tour updated successfully" }, { status: 200 });
  console.log("✅ تم تعديل الرحلة بنجاح");
}
