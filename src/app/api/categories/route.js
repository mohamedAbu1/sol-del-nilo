import { NextResponse } from "next/server";
import  prisma  from "@/lib/utils/db";

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.error("❌ خطأ في جلب التصنيفات:", error);
    return NextResponse.json({ error: "فشل في جلب التصنيفات" }, { status: 500 });
  }
}
