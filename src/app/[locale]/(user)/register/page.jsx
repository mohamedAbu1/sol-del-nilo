// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
import ImageHeroRegisterCover from "@/auth/components/user/signup/ImageHeroRegisterCover";
import SignUnForm from "@/auth/components/user/signup/SignUnForm";
import SignUpTextHero from "@/auth/components/user/signup/SignUpTextHero";
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
