// import { NextResponse } from "next/server";
// import  prisma  from "@/lib/utils/db";

// export async function GET() {
//   try {
//     const categories = await prisma.category.findMany({
//       select: {
//         id: true,
//         name: true,
//       },
//       orderBy: {
//         name: "asc",
//       },
//     });

//     return NextResponse.json(categories);
//   } catch (error) {
//     console.error("❌ خطأ في جلب التصنيفات:", error);
//     return NextResponse.json({ error: "فشل في جلب التصنيفات" }, { status: 500 });
//   }
// }
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("category")
      .select("id, name, img")
      .order("name", { ascending: true });

    if (error) {
      console.error("❌ خطأ من Supabase:", error.message);
      return NextResponse.json({ error: "فشل في جلب التصنيفات" }, { status: 500 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.error("❌ خطأ غير متوقع:", err);
    return NextResponse.json({ error: "فشل في جلب التصنيفات" }, { status: 500 });
  }
}
