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
      await axios.get(`${DOMAIN}/api/logout`);
      router.push("/");
      router.refresh();
    } catch (error) {
      toast.warning("في حاجه غلط ياد");
      console.log(error);
    }
  };
  return (
    <>
      <Button
        className="flex items-center justify-center gap-2 flex-row link bg-none text-gray-400"
        onClick={LogoutHnadler}
      >
        logout <BsDoorOpenFill />
      </Button>
    </>
  );
};

export default LogoutBtn;
