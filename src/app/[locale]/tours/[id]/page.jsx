import AnimatedPictures from "@/auth/components/HeroToursComponets/id/AnimatedPictures";
import SideDecor from "@/auth/components/SideDecor ";
import RightSideDecor from "@/auth/components/RightSideDecor";
import MainCardSC from "@/auth/components/HeroToursComponets/id/MainCardSC";
import { cookies } from "next/headers";
import { vrefyTokenForPage } from "@/lib/utils/veryfyToken";
import { supabase } from "@/lib/supabaseClient";
import Header from "@/auth/components/HeaderComponets/Header";

export default async function TourPage({ params }) {
  const { id } = params;
  console.log("🔍 ID:", id);
  const cookieStore = await cookies();
  const token = cookieStore.get("jwttoken")?.value;
  const user = vrefyTokenForPage(token);
  try {
    const { data: tour, error } = await supabase
      .from("tour")
      .select(
        "*, category(*), city(*), tripprogram(*), includes(*), reviews(*)"
      )
      .eq("id", id)
      .single();
    console.log("📦 Supabase response:", tour);
    console.log("📛 Supabase error:", error);

    if (error || !tour) {
      console.error("❌ Supabase Error:", error?.message);
      return <p>❌ الرحلة غير موجودة</p>;
    }

    const cookieStore = cookies();
    const token = cookieStore.get("jwttoken")?.value;
    const user = vrefyTokenForPage(token);

    return (
      <main className="flex flex-col items-center justify-center">
        <Header user={user} />
        <section
          style={{ width: "100vw", paddingBottom: "30px", marginTop: "140px" }}
          className="flex flex-col justify-center"
        >
          <SideDecor />
          <AnimatedPictures tour={tour} />
          <MainCardSC tour={tour} user={user} />
          <RightSideDecor />
        </section>
      </main>
    );
  } catch (error) {
    console.error("❌ خطأ أثناء جلب الرحلة:", error);
    return <p>❌ الرحلة غير موجودة</p>;
  }
}
