"use client";
import { useProject } from "@/contexts/project-context/project-context";
import { differenceInDays, differenceInHours } from "date-fns";

const DashboardBanner = () => {
  const { currentProject } = useProject();

  const createdAt = new Date(currentProject.createdAt);
  const dueDate = new Date(currentProject.dueDate);
  const now = new Date();

  const daysLeft = differenceInDays(dueDate, now);
  const hoursLeft = differenceInHours(dueDate, now) % 24;

  return (
    <div
      className="h-48 w-full relative rounded-3xl "
      style={{ backgroundImage: `url(${currentProject.backgroundImage})`, backgroundSize: "cover" }}
    >
      <footer className="w-full flex justify-between absolute bottom-0 px-5 py-4">
        <div className="flex flex-row gap-5 items-center py-2">
          <span>logo</span>
          <h3>{currentProject?.name}</h3>
        </div>
        <div className="flex flex-row gap-8 py-2">
          <div className="flex flex-col">
            <h5>CREATED</h5>
            <span>{createdAt.toLocaleDateString()}</span>
          </div>
          <div className="flex flex-col">
            <h5>DUE DATE</h5>
            <span>{dueDate.toLocaleDateString()}</span>
          </div>
          <div className="flex flex-col">
            <h5>TIME LEFT</h5>
            <span>
              {daysLeft > 0
                ? `${daysLeft} days ${hoursLeft} hours`
                : daysLeft === 0
                  ? `${hoursLeft} hours left`
                  : "Past due"}
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export { DashboardBanner };
