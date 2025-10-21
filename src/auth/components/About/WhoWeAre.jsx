"use client"
import Image from "next/image";
import SectionTitle from "./SectionTitle ";
import { useTranslations } from "next-intl";
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
const WhoWeAre = () => {
    const t = useTranslations("AboutPage");
  
  return (
    <section className="mb-12 flex flex-col lg:flex-row items-center gap-10">
      <div className="flex-1">
        <SectionTitle title={t("title2")} />
        <p className="text-lg text-gray-400">
          {t("p2")}
        </p>
      </div>
      <div className="flex-1">
        <Image
        src={"/assets/Copilot_20250908_2314232.png"}
          alt="Egyptian Woman"
          width={400}
          height={600}
          className="w-full max-w-sm mx-auto h-auto"
          loading="eager"
        />
      </div>
    </section>
  );
};
export default WhoWeAre;
