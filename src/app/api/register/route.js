// import prisma from "@/lib/utils/db"; // الاتصال بقاعدة البيانات
// import { NextResponse } from "next/server"; // لإنشاء ردود HTTP
// import bcrypt from "bcryptjs"; // لتشفير كلمة المرور
// import { verifyCsrfToken } from "@/lib/utils/csrf"; // التحقق من رمز CSRF

// // // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// // export async function POST(request) {
// //   try {
// //     // // ✅ استخراج رمز CSRF من الهيدر
// //     // const csrfToken = request.headers.get("x-csrf-token");
// //     // const secret = process.env.CSRF_SECRET;
// //     // if (!secret) throw new Error("CSRF_SECRET is not defined");

// //     // // ✅ التحقق من صحة رمز CSRF
// //     // if (!csrfToken || !verifyCsrfToken(secret, csrfToken)) {
// //     //   return NextResponse.json(
// //     //     { error: "رمز CSRF غير صالح أو مفقود" },
// //     //     { status: 403 }
// //     //   );
// //     // }
// //     // // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// //     // ✅ قراءة البيانات القادمة من المستخدم
// //     const body = await request.json();

// //     // ✅ التحقق من صحة البيانات باستخدام Zod
// //     const validation = UserSchema.safeParse(body);
// //     if (!validation.success) {
// //       return NextResponse.json(
// //         { error: "البيانات غير صالحة" },
// //         { status: 400 }
// //       );
// //     }
// //     // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// //     // ✅ التحقق من عدم وجود المستخدم مسبقًا
// //     const existingUser = await prisma.user.findUnique({
// //       where: { email: body.email },
// //     });

// //     if (existingUser) {
// //       return NextResponse.json(
// //         { error: "المستخدم موجود بالفعل، يرجى استخدام بريد إلكتروني آخر" },
// //         { status: 409 }
// //       );
// //     }
// //     // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// //     // ✅ تشفير كلمة المرور
// //     const salt = await bcrypt.genSalt(10);
// //     const hashedPassword = await bcrypt.hash(body.password, salt);
// //     // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// //     // ✅ إنشاء مستخدم جديد في قاعدة البيانات
// //     const newUser = await prisma.user.create({
// //       data: {
// //         name: body.name,
// //         email: body.email,
// //         password: hashedPassword,
// //       },
// //       select: {
// //         id: true,
// //         name: true,
// //         email: true,
// //         role: true,
// //         isActive: true,
// //       },
// //     });
// //     // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// //     // ✅ إنشاء JWT يحتوي على بيانات المستخدم
// //     const payload = {
// //       id: newUser.id,
// //       email: newUser.email,
// //       name: newUser.name,
// //       role: newUser.role,
// //       isActive: newUser.isActive,
// //     };

// //     const cookie = setCookie(payload);

// //     // ✅ تخزين JWT في الكوكيز بطريقة آمنة
// //     const response = NextResponse.json({ mag: "creadsd" }, { status: 201 });

// //     response.headers.set("Set-Cookie", cookie);
// //     console.log(response);
// //     return response;

// //     // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// //   } catch (error) {
// //     console.error("❌ خطأ في التسجيل:", error);
// //     return NextResponse.json(
// //       { error: "حدث خطأ داخلي في السيرفر" },
// //       { status: 500 }
// //     );
// //   }
// // }
// import { UserSchema } from "@/lib/utils/CheckSchema"; // التحقق من صحة البيانات باستخدام Zod
// import { supabase } from "@/lib/supabaseClient"; // الاتصال بقاعدة Supabase
// import bcrypt from "bcryptjs"; // لتشفير كلمة المرور
// import { NextResponse } from "next/server"; // لإنشاء ردود HTTP
// import { setCookie } from "@/lib/utils/JWToken"; // تخزين JWT في الكوكيز

// export async function POST(request) {
//   try {
//     const body = await request.json();

//     // ✅ التحقق من صحة البيانات
//     const validation = UserSchema.safeParse(body);
//     if (!validation.success) {
//       return NextResponse.json({ error: "البيانات غير صالحة" }, { status: 400 });
//     }

//     // ✅ التحقق من عدم وجود المستخدم مسبقًا
//     const { data: existingUser, error: findError } = await supabase
//       .from("user")
//       .select("id")
//       .eq("email", body.email)
//       .single();

//     if (findError && findError.code !== "PGRST116") {
//       // خطأ غير متعلق بعدم وجود صف
//       console.error("Supabase Error:", findError.message);
//       return NextResponse.json({ error: "فشل التحقق من المستخدم" }, { status: 500 });
//     }

//     if (existingUser) {
//       return NextResponse.json(
//         { error: "المستخدم موجود بالفعل، يرجى استخدام بريد إلكتروني آخر" },
//         { status: 409 }
//       );
//     }

//     // ✅ تشفير كلمة المرور
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(body.password, salt);

//     // ✅ إنشاء مستخدم جديد
//     const { data: newUser, error: insertError } = await supabase
//       .from("user")
//       .insert([
//         {
//           name: body.name,
//           email: body.email,
//           password: hashedPassword,
//           role: "USER", // إذا كان لديك حقل role
//           isActive: true, // إذا كان لديك حقل isActive
//         },
//       ])
//       .select("id, name, email, role, isActive") // عرض الحقول المطلوبة

//     if (insertError) {
//       console.error("Supabase Error:", insertError.message);
//       return NextResponse.json({ error: "فشل إنشاء المستخدم" }, { status: 500 });
//     }

//     // ✅ إنشاء JWT وتخزينه في الكوكيز
//     const payload = {
//       id: newUser[0].id,
//       email: newUser[0].email,
//       name: newUser[0].name,
//       role: newUser[0].role,
//       isActive: newUser[0].isActive,
//     };

//     const cookie = setCookie(payload);

//     const response = NextResponse.json({ message: "تم إنشاء المستخدم بنجاح" }, { status: 201 });
//     response.headers.set("Set-Cookie", cookie);
//     return response;
//   } catch (error) {
//     console.error("❌ خطأ في التسجيل:", error);
//     return NextResponse.json({ error: "حدث خطأ داخلي في السيرفر" }, { status: 500 });
//   }
// }
import { supabase } from "@/lib/supabaseClient";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { UserSchema } from "@/lib/utils/CheckSchema"; // Zod للتحقق من صحة البيانات
import { setCookie, generateToken } from "@/lib/utils/JWToken"; // توليد وتخزين JWT

export async function POST(request) {
  try {
    // ✅ قراءة البيانات من الطلب
    const body = await request.json();
    console.log("📥 البيانات المستلمة:", body);

    // ✅ التحقق من صحة البيانات باستخدام Zod
    const parsed = UserSchema.safeParse(body);
    if (!parsed.success) {
      console.error("❌ فشل التحقق من البيانات:", parsed.error);
      return NextResponse.json(
        { error: "البيانات غير صالحة" },
        { status: 400 }
      );
    }

    const { name, email, password } = parsed.data;

    // ✅ التحقق من وجود المستخدم مسبقًا
    const { data: existingUser, error: findError } = await supabase
      .from("user") // تأكد من حالة الأحرف
      .select("id")
      .eq("email", email)
      .single();

    console.log("🔍 نتيجة البحث:", existingUser);

    if (findError && findError.code !== "PGRST116") {
      console.error("❌ خطأ في البحث:", findError.message);
      return NextResponse.json(
        { error: "فشل التحقق من البريد الإلكتروني" },
        { status: 500 }
      );
    }

    if (existingUser) {
      return NextResponse.json(
        { error: "المستخدم موجود بالفعل، يرجى استخدام بريد إلكتروني آخر" },
        { status: 409 }
      );
    }

    // ✅ تشفير كلمة المرور
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ إدخال المستخدم الجديد بكل الحقول
    const { data: newUser, error: insertError } = await supabase
      .from("user")
      .insert([
        {
          name,
          email,
          password: hashedPassword,
          role: "USER",
          isActive: true,
        },
      ])
      .select("id, name, email, role, isActive");

    if (insertError) {
      console.error("❌ خطأ في الإدخال:", insertError.message);
      return NextResponse.json(
        { error: "فشل إنشاء المستخدم: " + insertError.message },
        { status: 500 }
      );
    }

    // ✅ توليد JWT
    const token = generateToken({
      id: newUser[0].id,
      email: newUser[0].email,
      name: newUser[0].name,
      role: newUser[0].role,
      isActive: newUser[0].isActive,
    });

    // ✅ تخزين JWT في الكوكيز
    const cookie = setCookie(token);

    const response = NextResponse.json(
      {
        message: "تم إنشاء المستخدم بنجاح",
        user: newUser[0],
      },
      { status: 201 }
    );

    response.headers.set("Set-Cookie", cookie);
    return response;
  } catch (error) {
    console.error("❌ خطأ عام:", error);
    return NextResponse.json(
      { error: "حدث خطأ داخلي في السيرفر" },
      { status: 500 }
    );
  }
}
