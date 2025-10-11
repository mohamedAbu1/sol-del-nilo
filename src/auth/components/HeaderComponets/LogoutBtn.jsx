import { Button } from "@mui/material";
import React from "react";
import { BsDoorOpenFill } from "react-icons/bs";
import { useRouter } from "next/navigation";
import axios from "axios";
import { DOMAIN } from "@/lib/constants/FixedTexts";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
const LogoutBtn = () => {
  const router = useRouter();
  const LogoutHnadler = async () => {
    try {
      await axios.get("/api/logout");
      router.push("/");
      router.refresh();
      localStorage.setItem("user", undefined);
    } catch (error) {
      toast.warning("في حاجه غلط ياد");
      console.log(error);
    }
  };
    const t = useTranslations("Header");
  
  return (
    <>
      <Button
        className="hidden lg:flex items-center justify-center gap-2 flex-row link bg-none hover:text-gray-400"
        variant="contained"
        style={{ backgroundColor: "#FF9800", color:"#fff"}}
        onClick={LogoutHnadler}
      >
        {t("Btn2")}<BsDoorOpenFill />
      </Button>
    </>
  );
};

export default LogoutBtn;
