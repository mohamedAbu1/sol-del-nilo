"use client";
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
import { useScreenSize } from "@/auth/hooks/screenSize";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
export default function NotFound() {
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  const params = useParams();
  const locale = params?.locale || "en";
  const { width } = useScreenSize();
  const isMobile = width <= 768;
  const t = useTranslations("NotFoundPage");
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#f5e4c3",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: "center",
        justifyContent: "center",
        padding: isMobile ? "2rem" : "4rem",
        gap: "2rem",
      }}
    >
      {/* خلفية المعبد */}
      <Image
        src="/assets/Copilot_20250913_220029.png"
        alt="Temple Background"
        fill
        style={{ objectFit: "cover", zIndex: 0 }}
        priority
      />

      {/* المحتوى النصي */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          width: isMobile ? "100%" : "40%",
          textAlign: isMobile ? "center" : "left",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        {/* ورقة البردية */}
        <div style={{ marginBottom: "1rem" }}>
          <Image
            src="/assets/Copilot_20250913_220957.png"
            alt="Papyrus Error Label"
            width={isMobile ? 300 : 400}
            height={isMobile ? 150 : 200}
          />
        </div>

        {/* النص التوضيحي */}
        <p
          style={{
            color: "#4b2e1e",
            fontSize: isMobile ? "1.4rem" : "2.2rem",
            fontWeight: "700",
            fontFamily: "serif",
            marginBottom: "1.5rem",
            textAlign: "center",
          }}
        >
          {t("p")}
        </p>

        {/* زر Explore Tours */}
        <a
          href={`/${locale}/tours`}
          style={{
            backgroundColor: "#d4af37",
            color: "#000",
            padding: "1rem 2rem",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "bold",
            boxShadow: "2px 2px 6px rgba(0,0,0,0.3)",
            fontSize: "1.2rem",
            display: "inline-block",
          }}
        >
          {t("btn")}
        </a>
      </div>

      {/* الشخصية الفرعونية */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          width: isMobile ? "100%" : "45%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Image
          src="/assets/Copilot_20250913_220339.png"
          alt="Pharaoh Character"
          width={isMobile ? 350 : 850}
          height={isMobile ? 250 : 650}
        />
      </div>
    </div>
  );
}
