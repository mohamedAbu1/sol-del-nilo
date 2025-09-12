import { NextResponse, NextRequest } from "next/server";
import { UserLoginSchema } from "@/lib/utils/CheckSchema";
import prisma from "@/lib/utils/db";
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
export async function POST(request) {
  try {
    const body = await request.json();
    // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

    const validation = UserLoginSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error[0].message },
        { status: 404 }
      );
    }
    // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
    const user = await prisma.user.findUnique({where: {email: body.email}})

    if (!user) {
        return NextResponse.json({message:"هذه الايميل غير موجود "})
        
    }
  } catch (error) {
    console.error("خطأ في POST:", error);
    return Response.json({ message: "خطأ داخلي في السيرفر" }, { status: 500 });
  }
}
