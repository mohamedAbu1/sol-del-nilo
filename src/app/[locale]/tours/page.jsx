import Header from "@/auth/components/HeaderComponets/Header";
import { cookies } from "next/headers";
import { vrefyTokenForPage } from "@/lib/utils/veryfyToken";
import ContenerMine from "@/auth/components/HeroToursComponets/ContenerMine";
import SectionSix from "@/auth/components/HeroComponets/SectionSix";
import RightSideDecor from "@/auth/components/RightSideDecor";
import SideDecor from "@/auth/components/SideDecor ";
import FacePage from "@/auth/components/HeroToursComponets/FacePage";

const Tours = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwttoken")?.value;
  const user = vrefyTokenForPage(token);

  return (
    <section className="w-full min-h-screen flex items-center justify-center flex-col lg:flex-col gap-8 mx-auto text-white">
      
      {/* ✅ Sidebar Filters */}
      <SideDecor />
      <div className="relative h-[55vh] w-full">
        {/* صورة الخلفية + الهيدر + العنوان */}
        <FacePage user={user} />
      </div>

      {/* ✅ القسم السفلي: الفلاتر + الرحلات */}
      <div className=" container relative z-30">
        <ContenerMine />
        <SectionSix />
      </div>

      <RightSideDecor />
    </section>
  );
};

export default Tours;
