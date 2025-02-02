"use client";
import { useProject } from "@/contexts/project-context";
import { differenceInDays, differenceInHours, format } from "date-fns";

const DashboardBanner = () => {
  const { currentProject } = useProject();

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

  const timeLeftText = (() => {
    if (daysLeft > 0) {
      return `${daysLeft} days ${hoursLeft} hours`;
    } else if (daysLeft === 0) {
      return `${hoursLeft} hours left`;
    } else {
      return "Past due";
    }
  })();

  return (
    <div
      className="h-48 w-full relative rounded-3xl "
      style={{
        backgroundImage: `url(${currentProject.backgroundImage})`,
        backgroundSize: "cover",
      }}
    >
      <footer className="w-full flex justify-between absolute bottom-0 px-5 py-4">
        <div className="flex flex-row gap-5 items-center py-2">
          <span>logo</span>
          <h3>{currentProject.name}</h3>
        </div>
        <div className="flex flex-row gap-8 py-2">
          <div className="flex flex-col">
            <h5>CREATED</h5>
            <span>{formattedCreatedAt}</span>
          </div>
          <div className="flex flex-col">
            <h5>DUE DATE</h5>
            <span>{formattedDueDate}</span>
          </div>
          <div className="flex flex-col">
            <h5>TIME LEFT</h5>
            <span>{timeLeftText}</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export { DashboardBanner };
