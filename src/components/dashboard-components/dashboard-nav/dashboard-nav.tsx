import React from "react";

const DashboardNav = () => {
  return (
    <div
      className="h-11 w-full flex flex-row justify-between items-center rounded-xl px-10"
      style={{
        boxShadow: "20px 20px 60px #bebebe, -20px -20px 60px #ffffff",
      }}
    >
      <span>Overview</span>
      <span>List</span>
      <span>DashBoard</span>
      <span>Timeline</span>
      <span>Calendar</span>
    </div>
  );
};

export { DashboardNav };
