import prisma from "@/lib/utils/db";
import { NextResponse } from "next/server";
import  {TourSchema} from "@/lib/utils/CheckSchema"
export async function POST(request) {
  try {
    const body = await request.json();

    // ✅ التحقق من صحة البيانات باستخدام Zod
    const validation = TourSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: "البيانات غير صالحة", details: validation.error.format() },
        { status: 400 }
      );
    }

    // ✅ إنشاء الكارت في قاعدة البيانات
    const newTour = await prisma.tour.create({
      data: validation.data,
    });

    return NextResponse.json(newTour, { status: 201 });
  } catch (error) {
    console.error("❌ خطأ في إنشاء الكارت:", error);
    return NextResponse.json(
      { error: "خطأ داخلي في السيرفر" },
      { status: 500 }
    );
  }
}
