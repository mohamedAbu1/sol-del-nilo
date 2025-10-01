import ImageHeroRegisterCover from "@/auth/components/user/signup/ImageHeroRegisterCover";
import LoginForm from "@/auth/components/user/login/LoginForm";
import SignUpTextHero from "@/auth/components/user/signup/SignUpTextHero";
import { generateMetadata } from "./metadata";
export { generateMetadata };
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LoadingScreen from "../../lodaing";
import { Suspense } from "react";
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
const Login = async () => {
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  const cookieStore = await cookies();
  const token = cookieStore.get("jwttoken")?.value;
  if (token) redirect("/");
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  return (
    <Suspense fallback={<LoadingScreen />}>
      <main className="w-full h-screen flex flex-row relative overflow-hidden">
        <ImageHeroRegisterCover />
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <SignUpTextHero />
        <LoginForm />
      </main>
    </Suspense>
  );
};

export default Login;
