"use client";
import { useDashboard } from "@/context/Information";
import HomePage from "./HomePage";
import CreateTripForm from "./CreateTripForm";
import UserInformation from "./UserInformation";
import ReservationInformation from "./ReservationInformation";
import UpdateTripForm from "./UpdateTripForm";

const VariablePages = () => {
  const { activeSection } = useDashboard();

  return <>
  
  {activeSection === "home" && <HomePage />}
  {activeSection === "CreateTrip" && <CreateTripForm/>}
  {activeSection === "UpdateTrip" && <UpdateTripForm />}
  {activeSection === "UserInformation" && <UserInformation />}
  {activeSection === "Reservation" && <ReservationInformation />}
  </>;
};

export default VariablePages;
