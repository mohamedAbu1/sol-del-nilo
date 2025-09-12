import { UserSchema } from "@/lib/utils/CheckSchema";
import prisma from "@/lib/utils/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
export async function POST(request) {
  try {
    // todo هنا اقوم بجلب البيانات من المستخدم
    const body = await request.json();
    // ? $$$$$$$$$$$$$$$
    // todo تحقق بسيط من البيانات
    const validation = UserSchema.safeParse(body);
    // ? $$$$$$$$$$$$$$$
    // todo هنا اقوم بالتحقيقي بأن البيانات تتبع الشروط التي وضعتها قبل الدخول الي قاعدة البيانات
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error[0].message },
        { status: 404 }
      );
    }
    // ? $$$$$$$$$$$$$$$
    // todo هنا اقوم بجلب المستخدم من خلال الايميل و هو فريد من نوعه
    const user = prisma.user.findUnique({ where: { email: body.email } });
    // ? $$$$$$$$$$$$$$$
    // todo هنا اقوم بالتحقق ان المستخدم ليس موجود بالفعل في قاعدة البيانات من خلال الايميل
    if (user === true) {
      return NextResponse.json(
        { message: "this user is here" },
        { status: 400 }
      );
    }
    // ? $$$$$$$$$$$$$$$

    const salt = await bcrypt.genSalt(10);
    // todo هنا اقوم بعمل هاش للباسورد و هو عباره عن تأمين
    const haghPassword = await bcrypt.hash(body.password, salt);
    // ? $$$$$$$$$$$$$$$
    // todo هنا اقوم بأنشاء مستخدم جديد من خلال اضافت مستخدم لقاعدة البيانات
    const newUser = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: haghPassword,
      },
      // ? $$$$$$$$$$$$$$$
      // todo هنا اختار البيانات التي سوف تعود لي
      select: {
        name: true,
        email: true,
        id: true,
        role: true,
      },
    });

    const token =  null

    return NextResponse.json(newUser, { status: 201 });
    // ? $$$$$$$$$$$$$$$
  } catch (error) {
    console.error("خطأ في POST:", error);
    return Response.json({ message: "خطأ داخلي في السيرفر" }, { status: 500 });
  }
}
