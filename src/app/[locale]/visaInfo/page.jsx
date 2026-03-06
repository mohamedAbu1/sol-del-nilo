import Header from "@/auth/components/Header/Header";
import { cookies } from "next/headers";
import { vrefyTokenForPage } from "@/lib/utils/veryfyToken";
import ImageSection from "@/auth/components/VISA/ImageSection";
import ContentSection from "@/auth/components/VISA/ContentSection";
import GeneralAdvice from "@/auth/components/VISA/GeneralAdvice";
import SocialFloatingButton from "@/components/layout/SocialFloatingButton";
import ChatFloating from "@/components/layout/ChatFloating";

export default async function EgyptVisaPage() {
  const cookieStore = await cookies(); // ✅ استخدم await
  const token = cookieStore.get("jwttoken")?.value;
  const user = vrefyTokenForPage(token);

  return (
    <main className="w-full flex flex-col items-center justify-center bg-white dark:bg-[#1a1b1b] text-[#002147] dark:text-[#d2cec8] font-sans animate-fadeIn">

      <Header user={user || ""} />
      <ImageSection />
      <ContentSection />
      <GeneralAdvice />
      <SocialFloatingButton />
      <ChatFloating user={user || ""} />
    </main>
  );
}
