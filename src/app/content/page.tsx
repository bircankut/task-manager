"use client";
import { ContentComponents } from "@/components/content-components";
import React, { useState } from "react";
import { sectionComponents } from "@/components/content-components/content-nav/navbar-index";

interface ContentProps {}

export default function Content({}: ContentProps) {
  const [selectedSection, setSelectedSection] =
    useState<keyof typeof sectionComponents>("List");

  const handleSectionClick = (section: keyof typeof sectionComponents) => {
    setSelectedSection(section);
  };

  return (
    <div className="h-screen w-full flex flex-col">
      <div className="h-2/5 w-full bg-gray-100 pt-3 pb-6 px-8 flex flex-col justify-between">
        <ContentComponents.Header />
        <ContentComponents.Banner />
        <ContentComponents.Nav handleSectionClick={handleSectionClick} selectedSection={selectedSection} />
      </div>
      <div className="h-3/5 w-full bg-gray-100 overflow-y-auto pt-4 pb-4">
        {sectionComponents[selectedSection]()}
      </div>
    </div>
  );
}
