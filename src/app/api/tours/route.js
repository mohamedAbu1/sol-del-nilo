import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";
import { TourSchema } from "@/lib/utils/CheckSchema";
// ?$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

export async function POST(request) {
  try {
    const body = await request.json();

    const validation = TourSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: "البيانات غير صالحة", details: validation.error.format() },
        { status: 400 }
      );
    }

    const { data: newTour, error: tourError } = await supabase
      .from("tour")
      .insert([
        {
          title: body.title,
          description: body.description,
          price: parseFloat(body.price),
          DayPeople: body.people,
          theDate: body.theDate,
          TripDuration: body.TripDuration,
          image: body.image,
          categoryId: body.categoryId,
          cityId: body.cityId,
          rival: body.rival,
        },
      ])
      .select()
      .single();

    if (tourError) throw tourError;

    // إدخال برنامج الرحلة
    const tripProgramData = body.tripprogram.map((step) => ({
      time: step.time,
      program: step.program,
      tourId: newTour.id,
    }));

    // إدخال العناصر المشمولة
    const includesData = body.includes.map((step) => ({
      text: step.text,
      tourId: newTour.id,
    }));

    await supabase.from("includes").insert(includesData);

    if (body.tourimage && Array.isArray(body.tourimage)) {
      const tourimageData = body.tourimage.map((step) => ({
        label: step.name,
        name: step.label?.trim() || "صورة بدون وصف",
        tourId: newTour.id,
        created_at: new Date().toISOString(),
      }));

      await supabase.from("tourimage").insert(tourimageData);
    }
    return NextResponse.json({ success: true, data: newTour }, { status: 201 });
  } catch (error) {
    console.error("❌ خطأ في إنشاء الرحلة:", error);
    return NextResponse.json(
      { error: "خطأ داخلي في السيرفر" },
      { status: 500 }
    );
  }
}
// ?$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// ?$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const raw = searchParams.get("categories");
    const categories = raw?.split(",").map(decodeURIComponent) || [];

    let query = supabase
      .from("tour")
      .select(
        `
        *,
        category!inner(name),
        city(*),
        tripprogram(*),
        includes(*),
        reviews(*),
        tourimage(*),
        payments(*)
      `
      )
      .order("created_at", { ascending: false });

    if (categories.length > 0) {
      query = query.in("category.name", categories);
    }

    const { data: tours, error } = await query;

    if (error) throw error;

    return NextResponse.json({ tours }, { status: 200 });
  } catch (error) {
    console.error("❌ خطأ أثناء جلب الرحلات:", error);
    return NextResponse.json({ error: "فشل في جلب الرحلات" }, { status: 500 });
  }
}
