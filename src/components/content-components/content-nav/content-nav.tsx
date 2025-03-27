"use client";
import React from "react";
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
    <nav className=" px-6 flex justify-center bg-white rounded-3xl shadow">
      <div className="glass-panel rounded-full px-2 py-2 flex space-x-2">
        {navItems.map((item) => (
          <button
            key={item}
            className={`h-10 w-32 p-2 rounded-3xl transition-colors ${
              selectedSection === item
                ? "bg-indigo-500 text-white"
                : "hover:bg-indigo-100"
            }`}
            onClick={() => handleSectionClick(item)}
          >
            {item}
          </button>
        ))}
      </div>
    </nav>
  );
};

export { ContentNav };
