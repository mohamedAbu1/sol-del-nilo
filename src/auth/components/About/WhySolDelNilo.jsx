"use client"
import { useTranslations } from "next-intl";
import SectionTitle from "./SectionTitle ";
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
const WhySolDelNilo = () => {
    const t = useTranslations("AboutPage");
  
  return (
    <section className="mb-16 text-center">
      <SectionTitle title={t("title3")} />
      <p className="text-lg text-gray-400  max-w-3xl mx-auto">
        {t("p3")}
      </p>
    </section>
  );
};
export default WhySolDelNilo;
