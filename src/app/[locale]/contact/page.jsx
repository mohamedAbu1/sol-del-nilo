import ContactUs from "@/auth/components/HeroContact/ContactUs";
import Header from "@/auth/components/HeaderComponets/Header";
import { vrefyTokenForPage } from "@/lib/utils/veryfyToken";
import { cookies } from "next/headers";
import { generateMetadata } from "./metadata";
import FaceContactPage from "@/auth/components/HeroContact/FaceContactPage";
export { generateMetadata };

const Contact = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwttoken")?.value;
  const user = vrefyTokenForPage(token);
  return (
    <main className="w-full h-auto flex flex-col items-center justify-center m-auto">
      <FaceContactPage user={user} />
      <ContactUs user={user} />
    </main>
  );
};

export default Contact;
