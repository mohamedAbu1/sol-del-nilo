import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import crypto from "crypto";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email } = body;

    // ✅ باسورد وهمي
    const password = crypto.randomUUID(); // أو "google_oauth_user"

    // ✅ تحقق لو المستخدم موجود بالفعل
    const { data: existingUser } = await supabase
      .from("user")
      .select("*")
      .eq("email", email)
      .single();

    let user = existingUser;

    // ✅ لو المستخدم غير موجود → قم بإنشائه
    if (!existingUser) {
      const { data: newUser, error: insertError } = await supabase
        .from("user")
        .insert([{ name, email, password }])
        .select()
        .single();

      if (insertError) {
        console.error("❌ Error creating user:", insertError);
        return NextResponse.json({ error: "Insert error" }, { status: 500 });
      }

      user = newUser;
    }

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error("❌ Error saving user:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
