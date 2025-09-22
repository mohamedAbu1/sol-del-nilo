import ClientHome from "@/auth/components/ClientHome";
import { generateMetadata } from "./metadata";
export { generateMetadata }; //todo هذه من اجل تحسين SEO في محرك البحث
import { cookies } from "next/headers";
import { vrefyTokenForPage } from "@/lib/utils/veryfyToken";
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
const HomePage = async () => {
  const cookieStore = await cookies(); // ✅ استخدم await
  const token = cookieStore.get("jwttoken")?.value;
  const user = vrefyTokenForPage(token);
  console.log(user);
  return <ClientHome user={user}/>;
};

export default HomePage;
