// import { NextResponse } from "next/server";
// import  prisma  from "@/lib/utils/db";

// export async function GET() {
//   try {
//     const cities = await prisma.city.findMany({
//       select: {
//         id: true,
//         name: true,
//       },
//       orderBy: {
//         name: "asc",
//       },
//     });

//     return NextResponse.json(cities);
//   } catch (error) {
//     console.error("❌ خطأ في جلب المدن:", error);
//     return NextResponse.json({ error: "فشل في جلب المدن" }, { status: 500 });
//   }
// }
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("city")
      .select("id, name, img") // ✅ أضف img هنا
      .order("name", { ascending: true });

    if (error) {
      console.error("❌ خطأ من Supabase:", error.message);
      return NextResponse.json({ error: "فشل في جلب المدن" }, { status: 500 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.error("❌ خطأ غير متوقع:", err);
    return NextResponse.json({ error: "فشل في جلب المدن" }, { status: 500 });
  }
}
