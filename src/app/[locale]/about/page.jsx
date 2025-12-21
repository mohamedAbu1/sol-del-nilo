import Mission from "@/auth/components/About/Mission";
import WhoWeAre from "@/auth/components/About/WhoWeAre";
import WhySolDelNilo from "@/auth/components/About/WhySolDelNilo";
import DecorativeBorder from "@/auth/components/About/DecorativeBorder";
import Header from "@/auth/components/HeaderComponets/Header";
import { generateMetadata } from "./metadata";
export { generateMetadata }; //todo هذه من اجل محرك البحث في جوجل SEO
import { cookies } from "next/headers";
import { vrefyTokenForPage } from "@/lib/utils/veryfyToken";
import SideDecor from "@/auth/components/SideDecor ";
import RightSideDecor from "@/auth/components/RightSideDecor";
import SectionSix from "@/auth/components/HeroComponets/SectionSix";
import TopAboutPage from "@/auth/components/About/TopAboutPage";
import FaceAboutPage from "@/auth/components/About/FaceAboutPage";
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
export default async function AboutUsPage() {
  const cookieStore = await cookies(); // ✅ استخدم await
  const token = cookieStore.get("jwttoken")?.value;
  const user = vrefyTokenForPage(token);

  return (
    <main className="flex flex-col items-center justify-center font-serif min-h-screen px-6 py-16 animate-fadeIn">
      <SideDecor />
      <FaceAboutPage user={user} />

      <div className="container flex flex-col items-center justify-center">
        <TopAboutPage />

        <div className="animate-slideUp delay-300">
          <Mission />
        </div>
        <div className="animate-slideUp delay-500">
          <WhoWeAre />
        </div>
        <div className="animate-slideUp delay-700">
          <WhySolDelNilo />
        </div>
        <div className="animate-slideUp delay-900">
          <DecorativeBorder />
        </div>
      </div>
      <RightSideDecor />
      <SectionSix />
    </main>
  );
}
