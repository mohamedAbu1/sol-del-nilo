import { NextResponse } from "next/server";
import  prisma  from "@/lib/utils/db";

export async function GET() {
  try {
    const cities = await prisma.city.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json(cities);
  } catch (error) {
    console.error("❌ خطأ في جلب المدن:", error);
    return NextResponse.json({ error: "فشل في جلب المدن" }, { status: 500 });
  }
}
