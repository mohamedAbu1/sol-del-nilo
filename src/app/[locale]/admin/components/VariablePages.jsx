"use client";
import { useTripsContext } from "@/context/TripsContext";
import HomePage from "./HomePage";
import CreateTripForm from "./CreateTripForm";
import UserInformation from "./UserInformation";
import ReservationInformation from "./ReservationInformation";
import UpdateTripForm from "./UpdateTripForm";
import { useTheme } from "@mui/material/styles"; // ✅ استدعاء الثيم

const VariablePages = () => {
  const { activeSection } = useTripsContext();
  const muiTheme = useTheme(); // ✅ يجيب الثيم الحالي

  return (
    <section
      style={{
        marginLeft:"20px",
        backgroundColor: muiTheme.palette.background.default, // ✅ الخلفية من الثيم
        color: muiTheme.palette.text.primary, // ✅ النصوص من الثيم
      }}
      className="w-full h-fit flex"
    >
      {activeSection === "home" && <HomePage />}
      {activeSection === "CreateTrip" && <CreateTripForm />}
      {activeSection === "UpdateTrip" && <UpdateTripForm />}
      {activeSection === "UserInformation" && <UserInformation />}
      {activeSection === "Reservation" && <ReservationInformation />}
    </section>
  );
};

export default VariablePages;
