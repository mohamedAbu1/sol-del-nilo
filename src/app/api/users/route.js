import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseClient";


export async function GET() {
  const { data, error } = await supabaseAdmin.auth.admin.listUsers();

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true, users: data.users }, { status: 200 });
}
