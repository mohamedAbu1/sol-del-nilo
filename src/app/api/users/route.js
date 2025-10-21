
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("user")
      .select(`
        id,
        name,
        email,
        role,
        created_at,
        messages(*),
        reviews(*),
        payments(*)
      `);

    if (error) {
      console.error("❌ Supabase error:", error.message);
      return NextResponse.json({ error: "فشل في جلب البيانات" }, { status: 500 });
    }

    // ✅ بدون فلترة
    return NextResponse.json({ users: data }, { status: 200 });
  } catch (err) {
    console.error("❌ Unexpected error:", err);
    return NextResponse.json({ error: "فشل في جلب البيانات" }, { status: 500 });
  }
}


// ✅ حذف مستخدم حسب الصلاحيات
export async function DELETE(request) {
  try {
    const body = await request.json();
    const { userId, currentUserRole } = body;

    // تحقق من صلاحيات الأدمن
    if (currentUserRole?.toUpperCase() !== "ADMIN") {
      return NextResponse.json(
        { error: "❌ غير مصرح لك بالحذف" },
        { status: 403 }
      );
    }

    // تحقق من وجود المستخدم
    const { data: existingUser, error: findError } = await supabase
      .from("user")
      .select("id")
      .eq("id", userId)
      .single();

    if (findError || !existingUser) {
      return NextResponse.json(
        { error: "❌ المستخدم غير موجود" },
        { status: 404 }
      );
    }

    // تنفيذ الحذف
    const { error: deleteError } = await supabase
      .from("user")
      .delete()
      .eq("id", userId);

    if (deleteError) {
      console.error("❌ خطأ أثناء الحذف:", deleteError.message);
      return NextResponse.json(
        { error: "❌ فشل في حذف المستخدم" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "✅ تم حذف المستخدم بنجاح" },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ خطأ غير متوقع:", error);
    return NextResponse.json(
      { error: "❌ فشل في حذف المستخدم" },
      { status: 500 }
    );
  }
}
