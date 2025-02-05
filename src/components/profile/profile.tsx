"use client";

import React from "react";
import IconButton from "@/components/icon-button/icon-button";
import { LuChevronsLeft, LuChevronsRight, LuMaximize2 } from "react-icons/lu";
import { useProject } from "@/contexts/project-context";
import { projects } from "@/entities/models/project";
import { Chart } from "react-chartjs-2";
import WeekHoursChart from "@/components/time-chart/time-chart";

const Profile = () => {
  const { currentUser, getTasksByTeamMember } = useProject();
  const memberTasks = getTasksByTeamMember(currentUser, projects);

  return (
    <div className="h-full w-80 text-gray-800 bg-indigo-50 border-l-2 border-b-indigo-200">
      <div className="h-full flex flex-col justify-between">
        <header className="flex justify-start py-4 px-2">
          <IconButton className="mx-4" icon={LuChevronsLeft} />
          <IconButton className="mx-4" icon={LuMaximize2} />
          <IconButton className="mx-4" icon={LuChevronsRight} />
        </header>
        <section className="h-full">
          <div>
            <section className="pt-4 px-5">
              <h5 className="text-xs font-semibold text-gray-700 mb-2">
                Your resent project work
              </h5>
              <div className="flex flex-row overflow-x-scroll py-5 ">
                {memberTasks.map((task) => (
                  <div className="flex flex-col h-24 min-w-28 bg-white rounded-xl relative mr-3 pt-5 pb-3 px-2 shadow-md">
                    <div className="h-7 w-7 absolute bottom-20 left-2 bg-white shadow-md rounded-3xl text-xs">
                      logo
                    </div>
                    <span className="text-[11px] leading-[1] font-semibold mb-2">
                      {task.title}
                    </span>
                    <div className="flex flex-row justify-between text-gray-600">
                      <div className="flex flex-col">
                        <span className="text-[10px]">Assigned</span>
                        <div className="h-5 w-5 bg-indigo-300 rounded-xl">
                          c
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px]">Progress</span>
                        <span className="font-semibold">80%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
            <section className="flex flex-col py-5 px-5">
              <span className="text-xs font-semibold text-gray-700 mb-2">
                Time Management
              </span>

              <span className="mb-6">Hours spend</span>
              <WeekHoursChart />
            </section>
          </div>
          <div className="border-t-8 border-indigo-100 p-4">
            <section className="h-92">team chat</section>
          </div>
        </section>
      </div>
    </div>
  );
};

export { Profile };
