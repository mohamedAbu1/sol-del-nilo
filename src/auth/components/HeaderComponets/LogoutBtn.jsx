import { Button } from "@mui/material";
import React from "react";
import { BsDoorOpenFill } from "react-icons/bs";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";

const LogoutBtn = () => {
  const router = useRouter();
  const t = useTranslations("Header");

  const LogoutHandler = async () => {
    try {
      await axios.get("/api/logout");
      localStorage.removeItem("user"); // ✅ إزالة بدل تعيين undefined
      router.push("/");
      router.refresh();
    } catch (error) {
      toast.warning("في حاجه غلط ياد");
      console.error(error);
    }
  };

  return (
    <Button
      className="hidden lg:flex items-center justify-center gap-2 flex-row link bg-none hover:text-gray-400"
      variant="contained"
      style={{ backgroundColor: "#FF9800", color: "#fff" }}
      onClick={LogoutHandler}
    >
      {t("Btn2")} <BsDoorOpenFill />
    </Button>
  );
};

export default LogoutBtn;
