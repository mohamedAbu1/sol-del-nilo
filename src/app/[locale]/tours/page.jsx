import Header from "@/auth/components/Header";
import HeroTours from "@/auth/components/HeroTours";
import { cookies } from "next/headers";
import { vrefyTokenForPage } from "@/lib/utils/veryfyToken";
import SideDecor from "@/auth/components/SideDecor ";
import RightSideDecor from "@/auth/components/RightSideDecor";
import LoadingScreen from ".././lodaing";
import { Suspense } from "react";

const Tours = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwttoken")?.value;
  const user = vrefyTokenForPage(token);

  return (
    <Suspense fallback={<LoadingScreen />}>
      <main
        style={{ overflowX: "hidden", overflowY: "visible" }}
        className="w-full flex items-center justify-center flex-col dark:bg-[#1a1b1b]"
      >
        <SideDecor />
        <Header user={user} />
        <HeroTours />
        <RightSideDecor />
      </main>
    </Suspense>
  );
};

export default Tours;
