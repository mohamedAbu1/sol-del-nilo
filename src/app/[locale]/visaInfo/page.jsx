import Header from "@/auth/components/Header";
import { cookies } from "next/headers";
import { vrefyTokenForPage } from "@/lib/utils/veryfyToken";
import ImageSection from "@/auth/components/ImageSection";
import ContentSection from "@/auth/components/ContentSection";
import SideDecor from "@/auth/components/SideDecor ";
import RightSideDecor from "@/auth/components/RightSideDecor";

export default async function EgyptVisaPage() {
  const cookieStore = await cookies(); // ✅ استخدم await
  const token = cookieStore.get("jwttoken")?.value;
  const user = vrefyTokenForPage(token);

  return (
    <main className="w-full flex flex-col items-center justify-center bg-white dark:bg-[#1a1b1b] text-[#002147] dark:text-[#d2cec8] font-sans animate-fadeIn">
      <SideDecor />

      <Header user={user} />
      <ImageSection />
      <ContentSection />
      <RightSideDecor />
    </main>
  );
}
