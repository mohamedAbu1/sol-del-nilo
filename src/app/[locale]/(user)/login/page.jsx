// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
import ImageHeroRegisterCover from "@/auth/components/user/signup/ImageHeroRegisterCover";
import LoginForm from "@/auth/components/user/login/LoginForm";
import SignUpTextHero from "@/auth/components/user/signup/SignUpTextHero";
import { generateMetadata } from "./metadata";
export { generateMetadata }//todo هذه من اجل محرك البحث في جوجل SEO
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
const Login = () => {
  return (
    <main className="w-full h-screen flex flex-row relative overflow-hidden">
      <ImageHeroRegisterCover />
      <div className="absolute inset-0 bg-black/50 z-10"></div>
      <SignUpTextHero />
      <LoginForm />
    </main>
  );
};

export default Login;
