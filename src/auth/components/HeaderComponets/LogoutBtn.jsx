import { Button } from "@mui/material";
import React from "react";
import { BsDoorOpenFill } from "react-icons/bs";
import { useRouter } from "next/navigation";
import axios from "axios";
import { DOMAIN } from "@/lib/constants/FixedTexts";
import { toast } from "react-toastify";
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
  return (
    <>
      <Button
        style={{ color: "grey" }}
        className="flex items-center justify-center gap-2 flex-row link bg-none"
        onClick={LogoutHnadler}
      >
        logout <BsDoorOpenFill />
      </Button>
    </>
  );
};

export default LogoutBtn;
