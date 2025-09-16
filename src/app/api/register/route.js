import { UserSchema } from "@/lib/utils/CheckSchema";
import prisma from "@/lib/utils/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { generateToken } from "@/lib/utils/JWToken";
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

//todo POST
//todo /api/register
//todo crreat accont for user 
//todo Public 

// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
export async function POST(request) {
  try {
    // todo هنا اقوم بجلب البيانات من المستخدم
    const body = await request.json();
        console.log(body)

    // ? $$$$$$$$$$$$$$$
    // todo تحقق بسيط من البيانات
    const validation = UserSchema.safeParse(body);
    // ? $$$$$$$$$$$$$$$
    // todo هنا اقوم بالتحقيقي بأن البيانات تتبع الشروط التي وضعتها قبل الدخول الي قاعدة البيانات
    if (!validation.success) {
      return NextResponse.json(
        { message: "المستخدم موجود بالفعل، يرجى استخدام بريد إلكتروني آخر" },
        { status: 404 }
      );
    }
            console.log(validation)

    // ? $$$$$$$$$$$$$$$
    // todo هنا اقوم بجلب المستخدم من خلال الايميل و هو فريد من نوعه
    const user = await prisma.user.findUnique({ where: { email: body.email } });
    console.log(user)
    // ? $$$$$$$$$$$$$$$
    // todo هنا اقوم بالتحقق ان المستخدم ليس موجود بالفعل في قاعدة البيانات من خلال الايميل
    if (user) {
      return NextResponse.json(
        { message: "this user is here" },
        { status: 400 }
      );
    }
        console.log(user)

    // ? $$$$$$$$$$$$$$$

    const salt = await bcrypt.genSalt(10);
    // todo هنا اقوم بعمل هاش للباسورد و هو عباره عن تأمين
    const hashPassword = await bcrypt.hash(body.password, salt);
    // ? $$$$$$$$$$$$$$$
    // todo هنا اقوم بأنشاء مستخدم جديد من خلال اضافت مستخدم لقاعدة البيانات
    const newUser = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: hashPassword,
      },
      // ? $$$$$$$$$$$$$$$
      // todo هنا اختار البيانات التي سوف تعود لي
      select: {
        name: true,
        email: true,
        id: true,
        role: true,
        isActive: true,
      },
    });

    const payload = {
      id: newUser.id,
      email: newUser.email,
      isActive: newUser.isActive,
      name: newUser.name,
      role: newUser.role,
    };

    const token = generateToken(payload);

    return NextResponse.json({ ...newUser, token }, { status: 201 });
    // ? $$$$$$$$$$$$$$$
  } catch (error) {
    console.error("خطأ في POST:", error);
    return NextResponse.json(
      { message: "خطأ داخلي في السيرفر" },
      { status: 500 }
    );
  }
}
