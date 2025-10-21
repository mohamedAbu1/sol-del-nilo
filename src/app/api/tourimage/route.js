import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

// app/api/tourimage/route.js

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("tourId");

  if (!id) {
    return new Response(JSON.stringify({ error: "id is required" }), {
      status: 400,
    });
  }

  const { data, error } = await supabase
    .from("tour")
    .select(`
      id,
      title,
      tourimage (
        id,
        name,
        url
      )
    `)
    .eq("id", id)
    .single();

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }

  return new Response(JSON.stringify(data), {
    status: 200,
  });
}

export async function POST(request) {
  try {
    const body = await request.json();
    if (!body.tourimage || !Array.isArray(body.tourimage)) {
      return NextResponse.json(
        { error: "tourimage غير موجود أو غير صالح" },
        { status: 400 }
      );
    }

    const tourimageData = body.tourimage.map((step) => ({
      url: step.url,
      name: step.name,
      tourId: step.tourId,
      created_at: new Date().toISOString(), // ✅ توليد التاريخ الحالي
    }));

    const { error } = await supabase.from("tourimage").insert(tourimageData);
    if (error) throw error;

    return NextResponse.json(
      { message: "✅ تم حفظ الصور بنجاح" },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ خطأ في حفظ الصور:", error);
    return NextResponse.json(
      { error: "خطأ داخلي في حفظ الصور" },
      { status: 500 }
    );
  }
}
