"use client";
import TourListings from "./TourListings";
import SidebarFilters from "./SidebarFilters";
import { useAppContext } from "@/context/AppContext";
import CartDrawer from "../CartDrawer";

const ContenerMine = ({ user }) => {
  const { openCart, setOpenCart, openBookingModal, setOpenBookingModal } = useAppContext(); // ✅ هنا في الأعلى

  return (
    <div className="container w-full h-full flex flex-col lg:flex-row gap-8 mx-auto text-white">
      <SidebarFilters />
      {/* ✅ Tour Listings */}
      <TourListings />
      <CartDrawer
        open={openCart}
        onClose={() => setOpenCart(false)}
        cartItems={user?.cart || []}
        onCheckout={() => {
          setOpenCart(false); // يغلق السلة
          setOpenBookingModal(true); // يفتح المودال
        }}
      />
    </div>
  );
};

export default ContenerMine;
