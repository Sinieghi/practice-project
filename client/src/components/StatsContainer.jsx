import React from "react";
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from "react-icons/fa";
import Wrapper from "../assets/wrappers/StatsContainer";
import StatItems from "./StatItems";

const StatsContainer = ({ defaultStatus }) => {
  const stats = [
    {
      title: "pinding aplications",
      count: defaultStatus?.pending || 0,
      icon: <FaSuitcaseRolling />,
      color: "#f59e0b",
      bcg: "#fef3c7",
    },
    {
      title: "inteview scheduled",
      count: defaultStatus?.interview || 0,
      icon: <FaCalendarCheck />,
      color: "#647acb",
      bcg: "#c0e8f9",
    },
    {
      title: "jobs declined",
      count: defaultStatus?.declined || 0,
      icon: <FaBug />,
      color: "#d66a6e",
      bcg: "#ff1234",
    },
  ];
  return (
    <Wrapper>
      {stats.map((item) => {
        return <StatItems key={item.title} {...item} />;
      })}
    </Wrapper>
  );
};

export default StatsContainer;
