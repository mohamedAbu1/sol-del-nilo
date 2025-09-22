import prisma from "@/lib/utils/db";
import { NextResponse } from "next/server";
import { TourSchema } from "@/lib/utils/CheckSchema";

// ✅ جلب رحلة واحدة حسب ID
export async function GET(request, { params }) {
  const { id } = params;

  try {
    const tour = await prisma.tour.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        description: true,
        price: true,
        information: true,
        DayPeople: true,
        image: true,
        categoryId: true,
        cityId:true
      },
    });

    if (!tour) {
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
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// ✅ تحديث بيانات رحلة حسب ID (للمسؤول فقط)
export async function PATCH(request, { params }) {
  const { id } = params;
  const body = await request.json();
  console.log(body)
  const {
    title,
    description,
    price,
    information,
    DayPeople,
    image,
    categoryId,
    cityId,
  } = body;

  // ✅ التحقق من صحة البيانات باستخدام Zod
 const { currentUserRole, ...tourData } = body;
const validation = TourSchema.safeParse(tourData);
  if (!validation.success) {
    return NextResponse.json(
      { error: "البيانات غير صالحة", details: validation.error.format() },
      { status: 400 }
    );
  }

  // ✅ تحقق من صلاحية المستخدم
 if (currentUserRole?.toUpperCase() !== "ADMIN"){
    return NextResponse.json(
      { error: "❌ غير مصرح لك بتعديل الرحلة" },
      { status: 403 }
    );
  }

  try {
    // ✅ تحقق من وجود الرحلة
    const existingTour = await prisma.tour.findUnique({ where: { id } });
    if (!existingTour) {
      return NextResponse.json(
        { error: "❌ الرحلة غير موجودة" },
        { status: 404 }
      );
    }

    // ✅ تنفيذ التحديث
    const updatedTour = await prisma.tour.update({
      where: { id },
      data: {
        title,
        description,
        price,
        information,
        DayPeople,
        image,
     category: {
  connect: { id: categoryId },
},
city: {
  connect: { id: cityId },
},
      },
    });

    return NextResponse.json(
      { message: "✅ تم تحديث الرحلة بنجاح", tour: updatedTour },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ خطأ أثناء تحديث الرحلة:", error);
    return NextResponse.json(
      { error: "خطأ داخلي في السيرفر" },
      { status: 500 }
    );
  }
}
