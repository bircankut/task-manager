"use client";
import { useProject } from "@/contexts/project-context";
import { differenceInDays, differenceInHours, format } from "date-fns";
import ColorThief from "color-thief-browser";
import { useEffect, useRef, useState } from "react";
import { WhiteContainer } from "@/components/white-container/white-container";

const ContentBanner = () => {
  const { currentProject } = useProject();
  const [textColor, setTextColor] = useState("white");
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const extractColor = () => {
      try {
        const colorThief = new ColorThief();
        if (img.complete) {
          const dominantColor = colorThief.getColor(img);
          const brightness =
            (dominantColor[0] * 299 +
              dominantColor[1] * 587 +
              dominantColor[2] * 114) /
            1000;
          setTextColor(brightness > 128 ? "black" : "white");
        }
      } catch (error) {
        console.error("Error extracting color:", error);
      }
    };

    if (img.complete) {
      extractColor();
    } else {
      img.onload = extractColor;
    }
  }, [currentProject.backgroundImage]);

  const formattedCreatedAt = format(
    new Date(currentProject.createdAt),
    "yyyy-MM-dd",
  );
  const formattedDueDate = format(
    new Date(currentProject.dueDate),
    "yyyy-MM-dd",
  );
  const now = new Date();

  const daysLeft = differenceInDays(formattedDueDate, now);
  const hoursLeft = differenceInHours(formattedDueDate, now) % 24;

  const timeLeftText =
    daysLeft > 0
      ? `${daysLeft} days ${hoursLeft} hours`
      : daysLeft === 0
        ? `${hoursLeft} hours left`
        : "Past due";

  return (
    <div className="h-48 w-full relative rounded-3xl overflow-hidden">
      <img
        ref={imgRef}
        src={currentProject.backgroundImage}
        className="hidden"
        alt="background"
      />

      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${currentProject.backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <footer
        className="w-full flex justify-between absolute bottom-0 px-5 py-4"
        style={{ color: textColor }}
      >
        <div className="flex flex-row gap-5 items-center py-2">
          <WhiteContainer height="40px" width="40px" borderRadius="30px">
            <span className="text-gray-800">logo</span>
          </WhiteContainer>
          <h3 className="text-2xl font-semibold">{currentProject.name}</h3>
        </div>
        <div className="flex flex-row gap-14 py-2">
          <div className="flex flex-col">
            <h5 className="text-xs">CREATED</h5>
            <span className="text-xs">{formattedCreatedAt}</span>
          </div>
          <div className="flex flex-col">
            <h5 className="text-xs">DUE DATE</h5>
            <span className="text-xs">{formattedDueDate}</span>
          </div>
          <div className="flex flex-col">
            <h5 className="text-xs">TIME LEFT</h5>
            <span className="text-xs">{timeLeftText}</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export { ContentBanner };
