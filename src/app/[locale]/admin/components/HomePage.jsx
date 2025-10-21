"use client";
import React from "react";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { MdOutlineCreate } from "react-icons/md";
import { FaUsersCog } from "react-icons/fa";
import { useTripsContext } from "@/context/TripsContext";
import { useScreenSize } from "@/auth/hooks/screenSize";

const HomePage = () => {
  const { width, height } = useScreenSize();

  const { activeSection } = useTripsContext();
  return (
    <section
      style={{ width: width * 0.83 }}
      className="flex flex-col items-center justify-center"
    >
      <h1 style={{ fontSize: "31px", fontFamily: "sans-serif", color: "#fff" }}>
        Welcome to the <span style={{ color: "#ff9800" }}>SolDelNilo</span>{" "}
        control panel
      </h1>
      <div className="w-full h-9/12 flex flex-col gap-5 items-center justify-center">
        <ul className="flex flex-row gap-20 w-full" style={{ padding: "20px" }}>
          <li
            style={{
              width: "32%",
              padding: "22px",
              borderRadius: "22px",
              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            }}
            className="border-gray-500 border-2 flex flex-col gap-6"
          >
            <HiOutlineInformationCircle
              className="text-4xl"
              style={{ color: "#ff9800" }}
            />
            <h1 className="text-4xl text-gray-500">information</h1>
            <p className=" text-gray-500">
              Here you can monitor the site in terms of views, visits and most
              important interactions.
            </p>
          </li>
          <li
            style={{
              width: "32%",
              padding: "22px",
              borderRadius: "22px",
              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            }}
            className="border-gray-500 border-2 flex flex-col gap-6"
          >
            <MdOutlineCreate
              className="text-4xl"
              style={{ color: "#ff9800" }}
            />

            <h1 className="text-4xl text-gray-500">Create a trip</h1>
            <p className=" text-gray-500">
              Here you will be able to create new trips for users and you can
              edit any trip.
            </p>
          </li>
          <li
            style={{
              width: "32%",
              padding: "22px",
              borderRadius: "22px",
              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            }}
            className="border-gray-500 border-2 flex flex-col gap-6"
          >
            <FaUsersCog className="text-4xl" style={{ color: "#ff9800" }} />
            <h1 className="text-4xl text-gray-500">User information</h1>
            <p className=" text-gray-500">
              {" "}
              Here you can also know the number of clients and the most
              important information about them and control the removal of those
              you want from them.
            </p>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default HomePage;
