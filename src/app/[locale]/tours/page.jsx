import Header from "@/auth/components/HeaderComponets/Header";
import { cookies } from "next/headers";
import { vrefyTokenForPage } from "@/lib/utils/veryfyToken";
import ContenerMine from "@/auth/components/HeroToursComponets/ContenerMine";
import SectionSix from "@/auth/components/HeroComponets/SectionSix";

const Tours = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwttoken")?.value;
  const user = vrefyTokenForPage(token);
  return (
    <section className="w-full min-h-screen flex items-center justify-center flex-col lg:flex-col gap-8 mx-auto text-white">
      {/* ✅ Sidebar Filters */}
      <Header user={user} />
      <ContenerMine />
      <SectionSix />
    </section>
  );
};

export default Tours;
