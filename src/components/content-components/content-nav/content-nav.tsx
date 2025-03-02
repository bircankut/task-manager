"use client";
import React, { useState } from "react";
import { sectionComponents } from "@/components/content-components/content-nav/navbar-index";

interface ContentNavProps {
  handleSectionClick: (section: keyof typeof sectionComponents) => void;
  selectedSection: keyof typeof sectionComponents;
}

const ContentNav = ({
  handleSectionClick,
  selectedSection,
}: ContentNavProps) => {
  const navItems: (keyof typeof sectionComponents)[] = [
    "Overview",
    "List",
    "Dashboard",
    "Timeline",
    "Calendar",
  ];

  return (
    <div
      className="h-11 w-full flex flex-row justify-between items-center rounded-xl px-10"
      style={{
        boxShadow: "20px 20px 60px #bebebe, -20px -20px 60px #ffffff",
      }}
    >
      {navItems.map((item) => (
        <button
          key={item}
          className={`h-full w-32 p-2 rounded-xl transition-colors ${
            selectedSection === item
              ? "bg-indigo-600 text-white"
              : "hover:bg-indigo-100"
          }`}
          onClick={() => handleSectionClick(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export { ContentNav };
