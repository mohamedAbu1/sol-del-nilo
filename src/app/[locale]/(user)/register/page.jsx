// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
import ImageHeroRegisterCover from "@/auth/components/user/signup/ImageHeroRegisterCover";
import SignUnForm from "@/auth/components/user/signup/SignUnForm";
import SignUpTextHero from "@/auth/components/user/signup/SignUpTextHero";
import { generateMetadata } from "./metadata";
export { generateMetadata }//todo هذه من اجل محرك البحث في جوجل SEO
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
const Register = () => {
  return (
    <main className="w-full h-screen flex flex-row relative overflow-hidden">
      <ImageHeroRegisterCover />
      <div className="absolute inset-0 bg-black/50 z-10"></div>
      <SignUpTextHero />
      <SignUnForm />
    </main>
  );
};

export default Register;
