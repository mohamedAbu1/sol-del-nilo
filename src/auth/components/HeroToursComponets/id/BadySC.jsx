"use client";
import React from "react";
import SideDecor from "../../SideDecor ";
import AnimatedPictures from "./AnimatedPictures";
import MainCardSC from "./MainCardSC";
import RightSideDecor from "../../RightSideDecor";

const BadySC = ({user}) => {
  return (
    <section
      className="container flex flex-col justify-center"
      style={{ marginTop: "140px" }}
    >
      <SideDecor />
      <AnimatedPictures  />
      <MainCardSC  user={user} />
      <RightSideDecor />
    </section>
  );
};

export default BadySC;
