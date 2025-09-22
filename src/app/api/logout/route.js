import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export function GET() {
  try {
    cookies().delete("jwttoken");
    return NextResponse.json({ masg: "logour" }, { status: 200 });
  } catch (error) {
    console.error("❌ خطأ في تسجيل الخروج:", error);
    return NextResponse.json(
      { error: "حدث خطأ داخلي في السيرفر" },
      { status: 500 }
    );
  }
}
