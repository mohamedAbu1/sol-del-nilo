// import prisma from "@/lib/utils/db";
// import { NextResponse } from "next/server";
// import { TourSchema } from "@/lib/utils/CheckSchema";
// export async function GET(request, { params }) {
//   const { id } = params;
//   try {
//     const tour = await prisma.tour.findUnique({
//       where: { id },
//       select: {
//         id: true,
//         title: true,
//         description: true,
//         price: true,
//         DayPeople: true,
//         Destination: true,
//         theDate: true,
//         TripDuration: true,
//         NumberOfParticipants: true,
//         image: true,
//         categoryId: true,
//         cityId: true,
//         city: true,
//         category: true,
//         tripprogram: true,
//         comments: true,
//         includes: true,
//       },
//     });
//     if (!tour) {
//       return NextResponse.json({ error: "الرحلة غير موجودة" }, { status: 404 });
//     }
//     return NextResponse.json({ tour }, { status: 200 });
//   } catch (error) {
//     console.error("❌ خطأ أثناء جلب الرحلة:", error);
//     return NextResponse.json(
//       { error: "خطأ داخلي في السيرفر" },
//       { status: 500 }
//     );
//   }
// }
// // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// export async function PATCH(request, { params }) {
//   const { id } = params;
//   const body = await request.json();
//   console.log("بيانات الرحلة:", body);
//   const {
//     title,
//     description,
//     price,
//     DayPeople,
//     Destination,
//     theDate,
//     TripDuration,
//     image,
//     categoryId,
//     cityId,
//     tripprogram,
//     includes,
//     preparation,
//     currentUserRole,
//     NumberOfParticipants,
//   } = body;
//   if (currentUserRole?.toUpperCase() !== "ADMIN") {
//     return NextResponse.json(
//       { error: "❌ غير مصرح لك بتعديل الرحلة" },
//       { status: 403 }
//     );
//   }
//   const tourData = {
//     title,
//     description,
//     price,
//     DayPeople,
//     Destination,
//     theDate,
//     TripDuration,
//     image,
//     categoryId,
//     cityId,
//     tripprogram,
//     includes,
//     preparation,
//     NumberOfParticipants,
//   };
//   const validation = TourSchema.safeParse(tourData);
//   if (!validation.success) {
//     return NextResponse.json(
//       { error: "❌ البيانات غير صالحة", details: validation.error.format() },
//       { status: 400 }
//     );
//   }
//   try {
//     const existingTour = await prisma.tour.findUnique({ where: { id } });
//     if (!existingTour) {
//       return NextResponse.json(
//         { error: "❌ الرحلة غير موجودة" },
//         { status: 404 }
//       );
//     }
//     const updatedTour = await prisma.tour.update({
//       where: { id },
//       data: {
//         title,
//         description,
//         price,
//         DayPeople,
//         Destination,
//         theDate,
//         TripDuration,
//         image,
//         preparation,
//         NumberOfParticipants,
//         category: { connect: { id: categoryId } },
//         city: { connect: { id: cityId } },
//         tripprogram: {
//           deleteMany: {},
//           create: tripprogram.map((item) => ({
//             time: item.time,
//             program: item.program,
//           })),
//         },
//         includes: {
//           deleteMany: {},
//           create: includes.map((item) => ({ text: item.text })),
//         },
//       },
//     });
//     return NextResponse.json(
//       { message: "✅ تم تحديث الرحلة بنجاح", tour: updatedTour },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("❌ خطأ أثناء تحديث الرحلة:", error);
//     return NextResponse.json(
//       { error: "❌ خطأ داخلي في السيرفر" },
//       { status: 500 }
//     );
//   }
// }
import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";
import { TourSchema } from "@/lib/utils/CheckSchema";

export async function GET(request, { params }) {
  const { id } = params;

  try {
    const { data: tour, error } = await supabase
      .from("tour")
      .select(`
        *,
        category(*),
        city(*),
        tripprogram(*),
        includes(*)
      `)
      .eq("id", id)
      .single();

    if (error || !tour) {
      return NextResponse.json({ error: "الرحلة غير موجودة" }, { status: 404 });
    }

    return NextResponse.json({ tour }, { status: 200 });
  } catch (error) {
    console.error("❌ خطأ أثناء جلب الرحلة:", error);
    return NextResponse.json({ error: "خطأ داخلي في السيرفر" }, { status: 500 });
  }
}
export async function PATCH(request, { params }) {
  const { id } = params;
  const body = await request.json();

  const {
    title,
    description,
    price,
    DayPeople,
    Destination,
    theDate,
    TripDuration,
    image,
    categoryId,
    cityId,
    tripprogram,
    includes,
    preparation,
    currentUserRole,
    NumberOfParticipants,
  } = body;

  if (currentUserRole?.toUpperCase() !== "ADMIN") {
    return NextResponse.json(
      { error: "❌ غير مصرح لك بتعديل الرحلة" },
      { status: 403 }
    );
  }

  const tourData = {
    title,
    description,
    price,
    DayPeople,
    Destination,
    theDate,
    TripDuration,
    image,
    categoryId,
    cityId,
    preparation,
    NumberOfParticipants,
  };

  const validation = TourSchema.safeParse({ ...tourData, tripprogram, includes });
  if (!validation.success) {
    return NextResponse.json(
      { error: "❌ البيانات غير صالحة", details: validation.error.format() },
      { status: 400 }
    );
  }

  try {
    // تحقق من وجود الرحلة
    const { data: existingTour, error: findError } = await supabase
      .from("tour")
      .select("id")
      .eq("id", id)
      .single();

    if (findError || !existingTour) {
      return NextResponse.json({ error: "❌ الرحلة غير موجودة" }, { status: 404 });
    }

    // تحديث بيانات الرحلة
    const { data: updatedTour, error: updateError } = await supabase
      .from("tour")
      .update(tourData)
      .eq("id", id)
      .select()
      .single();

    if (updateError) throw updateError;

    // حذف البرنامج السابق
    await supabase.from("tripprogram").delete().eq("tourId", id);

    // إضافة البرنامج الجديد
    const tripprogramData = tripprogram.map((item) => ({
      time: item.time,
      program: item.program,
      tourId: id,
    }));
    await supabase.from("tripprogram").insert(tripprogramData);

    // حذف العناصر المشمولة السابقة
    await supabase.from("includes").delete().eq("tourId", id);

    // إضافة العناصر الجديدة
    const includesData = includes.map((item) => ({
      text: item.text,
      tourId: id,
    }));
    await supabase.from("includes").insert(includesData);

    return NextResponse.json(
      { message: "✅ تم تحديث الرحلة بنجاح", tour: updatedTour },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ خطأ أثناء تحديث الرحلة:", error);
    return NextResponse.json({ error: "❌ خطأ داخلي في السيرفر" }, { status: 500 });
  }
}