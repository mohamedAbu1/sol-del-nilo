import Header from "@/auth/components/Header";
import HeroTours from "@/auth/components/HeroTours";
import SelectTours from "@/auth/components/HeroToursComponets/SelectTours";
import { cookies } from "next/headers";
import { vrefyTokenForPage } from "@/lib/utils/veryfyToken";
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
const Tours = async () => {
  const cookieStore = await cookies(); // ✅ استخدم await
  const token = cookieStore.get("jwttoken")?.value;
  const user = vrefyTokenForPage(token);
  return (
    <main
      style={{ overflowX: "hidden" }}
      className="w-full flex items-center justify-center flex-col "
    >
      <Header user={user} />
      <section className="flex flex-row flex-wrap w-full max-w-[1600px] justify-between items-start gap-6 px-4 py-8">
        <SelectTours />
        <HeroTours />
      </section>
    </main>
  );
};

export default Tours;
