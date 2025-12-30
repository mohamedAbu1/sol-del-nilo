"use client";
import React from "react";
import SideDecor from "../../SideDecor ";
import AnimatedPictures from "./AnimatedPictures";
import MainCardSC from "./MainCardSC";
import RightSideDecor from "../../RightSideDecor";
import FaceIDPage from "./FaceIDPage";
import { useAppContext } from "@/context/AppContext";
import CartDrawer from "../../CartDrawer";

const BadySC = ({ user }) => {
    const { openCart, setOpenCart } = useAppContext(); // ✅ هنا في الأعلى
  
  return (
    <section className="w-full flex flex-col justify-center items-center">
      <SideDecor />
      <div className="relative h-[55vh] w-full">
        {/* صورة الخلفية + الهيدر + العنوان */}
        <FaceIDPage user={user} />
      </div>
      <div className="container flex flex-col justify-center">
        <MainCardSC user={user} />

        <RightSideDecor />
      </div>
       <CartDrawer
          open={openCart}
          onClose={() => setOpenCart(false)}
          cartItems={user?.cart || []}
        />
    </section>
  );
};

export default BadySC;
