import prisma from "@/lib/utils/db";
import { NextResponse } from "next/server";
import { TourSchema } from "@/lib/utils/CheckSchema";
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
export async function POST(request) {
  try {
    const body = await request.json();
    console.log("البيانات المستلمة:", body);

    // ✅ تحقق من الحقول المطلوبة
    if (!body.title || !body.description || !body.price) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 405 }
      );
    }

    // ✅ التحقق من صحة البيانات باستخدام Zod
    const validation = TourSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: "البيانات غير صالحة", details: validation.error.format() },
        { status: 400 }
      );
    }
    // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
    // ✅ إنشاء الكارت في قاعدة البيانات
   const newTour =  await prisma.tour.create({
      data: {
        title: body.title,
        description: body.description,
        price: body.price,
        information: body.information,
        DayPeople: body.DayPeople,
        image: body.image,
        category: {
          connect: { id: body.categoryId },
        },
        city: {
          connect: { id: body.cityId },
        },
      },
    });

    // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
    return NextResponse.json(newTour, { status: 201 });
    // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  } catch (error) {
    console.error("❌ خطأ في إنشاء الكارت:", error);
    return NextResponse.json(
      { error: "خطأ داخلي في السيرفر" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // جلب جميع المستخدمين من قاعدة البيانات
    const tours = await prisma.tour.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        price: true,
        information: true,
        DayPeople: true,
        image: true,
        category: true,
        city: true,
      },
    });
    console.log(tours);
    // إرسال البيانات كـ JSON
    return NextResponse.json({ tours }, { status: 200 });
  } catch (error) {
    console.error("خطأ أثناء جلب المستخدمين:", error);
    return NextResponse.json(
      { error: "فشل في جلب المستخدمين" },
      { status: 500 }
    );
  }
}
