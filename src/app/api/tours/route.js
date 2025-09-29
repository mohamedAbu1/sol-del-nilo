// import prisma from "@/lib/utils/db";
// import { NextResponse } from "next/server";
// import { TourSchema } from "@/lib/utils/CheckSchema";
// export async function POST(request) {
//   try {
//     const body = await request.json();
//     console.log("📦 البيانات المستلمة:", body);
//     if (!body.title || !body.description || !body.price) {
//       return NextResponse.json(
//         { error: "Missing required fields" },
//         { status: 405 }
//       );
//     }
//     const validation = TourSchema.safeParse(body);
//     if (!validation.success) {
//       return NextResponse.json(
//         { error: "البيانات غير صالحة", details: validation.error.format() },
//         { status: 400 }
//       );
//     }
//     if (
//       !Array.isArray(body.tripprogram) ||
//       body.tripprogram.length === 0 ||
//       body.tripprogram.some(
//         (step) =>
//           !step.time ||
//           !step.program ||
//           step.time.trim() === "" ||
//           step.program.trim() === ""
//       )
//     ) {
//       return NextResponse.json(
//         { error: "برنامج الرحلة غير مكتمل أو فارغ" },
//         { status: 400 }
//       );
//     }
//     const newTour = await prisma.tour.create({
//       data: {
//         title: body.title,
//         description: body.description,
//         price: parseFloat(body.price),
//         DayPeople: body.DayPeople,
//         Destination: body.Destination,
//         theDate: body.theDate,
//         TripDuration: body.TripDuration,
//         NumberOfParticipants: body.NumberOfParticipants,
//         image: body.image,
//         category: { connect: { id: body.categoryId } },
//         city: { connect: { id: body.cityId } },
//       },
//     });
//     await prisma.tripProgram.createMany({
//       data: body.tripprogram.map((step) => ({
//         time: step.time,
//         program: step.program,
//         tourId: newTour.id,
//       })),
//     });
//     await prisma.includes.createMany({
//       data: body.includes.map((step) => ({
//         text: step.text,
//         tourId: newTour.id,
//       })),
//     });
 
//     return NextResponse.json(newTour, { status: 201 });
//   } catch (error) {
//     console.error("❌ خطأ في إنشاء الرحلة:", error);
//     return NextResponse.json(
//       { error: "خطأ داخلي في السيرفر" },
//       { status: 500 }
//     );
//   }
// }
// export async function GET() {
//   try {
//     const tours = await prisma.tour.findMany({
//       include: {
//         category: true,
//         city: true,
//         tripprogram: true,
//         includes: true,
//       },
//       orderBy: { createdAt: "desc" },
//     });
//     return NextResponse.json({ tours }, { status: 200 });
//   } catch (error) {
//     console.error("❌ خطأ أثناء جلب الرحلات:", error);
//     return NextResponse.json({ error: "فشل في جلب الرحلات" }, { status: 500 });
//   }
// }
// ?$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// ?$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// ?$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";
import { TourSchema } from "@/lib/utils/CheckSchema";

export async function POST(request) {
  try {
    const body = await request.json();
   console.log(body)

    const validation = TourSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: "البيانات غير صالحة", details: validation.error.format() },
        { status: 400 }
      );
    }
console.log("✅ التحقق:", validation);

    const { data: newTour, error: tourError } = await supabase
      .from("tour")
      .insert([
        {
          title: body.title,
          description: body.description,
          price: parseFloat(body.price),
          DayPeople: body.DayPeople,
          Destination: body.Destination,
          theDate: body.theDate,
          TripDuration: body.TripDuration,
          NumberOfParticipants: body.NumberOfParticipants,
          image: body.image,
          categoryId: body.categoryId,
          cityId: body.cityId,
        },
      ])
      .select()
      .single();

    if (tourError) throw tourError;
    console.log("🆔 newTour.id:", newTour?.id);

    // إدخال برنامج الرحلة
    const tripProgramData = body.tripprogram.map((step) => ({
      time: step.time,
      program: step.program,
      tourId: newTour.id,
    }));
    
    await supabase.from("tripprogram").insert(tripProgramData);

    // إدخال العناصر المشمولة
    const includesData = body.includes.map((step) => ({
      text: step.text,
      tourId: newTour.id,
    }));

    await supabase.from("includes").insert(includesData);

    return NextResponse.json(newTour, { status: 201 });
  } catch (error) {
    console.error("❌ خطأ في إنشاء الرحلة:", error);
    return NextResponse.json(
      { error: "خطأ داخلي في السيرفر" },
      { status: 500 }
    );
  }
}
export async function GET() {
  try {
    const { data: tours, error } = await supabase
      .from("tour")
      .select(`
            *,
            category(*),
            city(*),
            tripprogram(*),
            includes(*)
          `)
      .order("createdAt", { ascending: false });

    if (error) throw error;

    return NextResponse.json({ tours }, { status: 200 });
  } catch (error) {
    console.error("❌ خطأ أثناء جلب الرحلات:", error);
    return NextResponse.json({ error: "فشل في جلب الرحلات" }, { status: 500 });
  }
}
