"use client";
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
import { Link } from "@/i18n/navigation";
import { RegisterPathEn, RegisterPathEs } from "@/lib/constants/FixedTexts";
import Image from "next/image";
const logo2 = "/assets/Copilot_20250908_231423.png";

// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
const SignUpTextHero = () => {
  return (
    <section className="hidden lg:flex w-1/2 h-full items-center justify-center flex-col z-20">
      <Image src={logo2} alt="Logo" width={500} height={200} loading="eager" />
     
    </section>
  );
};

export default SignUpTextHero;
