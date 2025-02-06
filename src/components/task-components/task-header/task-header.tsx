"use client";

import { useState } from "react";
import { AddTaskPopUpProps } from "@/components/task-components/add-task-pop-up/add-task-pop-up";
import { createPortal } from "react-dom";

interface HeaderProps {
  title: string;
  taskCount: number;
  status: string;
}

const TaskHeader = ({ title, taskCount, status }: HeaderProps) => {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  return (
    <div className="flex flex-row items-center justify-between">
      <h2 className="flex font-bold items-center justify-between">
        <span className="mr-2 text-stone-600"> {title} </span>
        <div className="flex justify-center items-center h-5 w-5 rounded-xl font-light text-sm text-indigo-400 bg-indigo-200">
          {taskCount}
        </div>
      </h2>
      <button
        onClick={() => setIsPopUpOpen(true)}
        className="flex justify-center items-center text-stone-600 rounded relative border border-solid border-stone-600 h-6 w-6"
      >
        +
      </button>
      {isPopUpOpen &&
        createPortal(
          <AddTaskPopUpProps
            status={status}
            onClose={() => setIsPopUpOpen(false)}
          />,
          document.body,
        )}
    </div>
  );
};

export { TaskHeader };
