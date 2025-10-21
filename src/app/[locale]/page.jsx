import ClientHome from "@/auth/components/HeroComponets/ClientHome";
import { generateMetadata } from "./metadata";
export { generateMetadata };
import { cookies } from "next/headers";
import { vrefyTokenForPage } from "@/lib/utils/veryfyToken";
import LoadingScreen from "./lodaing";
import { Suspense } from "react";

const HomePage = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwttoken")?.value;
  const user = vrefyTokenForPage(token);
  return (
    <Suspense fallback={<LoadingScreen />}>
      <ClientHome user={user} />
    </Suspense>
  );
};

export default HomePage;
