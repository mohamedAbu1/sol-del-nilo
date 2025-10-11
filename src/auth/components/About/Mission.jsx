"use client"
import { useTranslations } from "next-intl";
import SectionTitle from "./SectionTitle ";
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
const Mission = () => {
    const t = useTranslations("AboutPage");
  
  return (
    <section className="mb-12 text-center">
      <SectionTitle title={t("title1")} />
      <p className="text-lg text-gray-400 max-w-3xl mx-auto">
       {t("p1")}
      </p>
    </section>
  );
};
export default Mission;
