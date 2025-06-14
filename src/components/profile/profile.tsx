"use client";

import React from "react";
import IconButton from "@/components/icon-button/icon-button";
import { LuChevronsLeft, LuChevronsRight, LuMaximize2 } from "react-icons/lu";
import { useProject } from "@/contexts/project-context";
import { projects } from "@/entities/models/project";
import WeekHoursChart from "@/components/time-chart/time-chart";
import cns from "classnames";
import { COLORS } from "@/components/content-components/content-team-member-pictures/content-team-member-pictures";

const Profile = () => {
  const { currentUser, getCurrentUsersTasks } = useProject();
  const memberTasks = getCurrentUsersTasks(currentUser, projects);

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
                {memberTasks.map((task, key) => (
                  <div
                    key={key}
                    className="flex flex-col h-24 min-w-28 bg-white rounded-xl relative mr-3 pt-5 pb-3 px-2 shadow-md"
                  >
                    <div className="h-7 w-7 absolute bottom-20 left-2 bg-white shadow-md rounded-3xl text-xs flex items-center justify-center">
                      logo
                    </div>
                    <span className="text-[11px] leading-[1] font-semibold mb-2">
                      {task.title}
                    </span>
                    <div className="flex flex-row justify-between text-gray-600">
                      <div className="flex flex-col ">
                        <span className="text-[10px] mb-3">Assigned</span>
                        <ul className="relative flex items-center">
                          {task.assignedTo.slice(0, 2).map((member, index) => (
                            <li
                              key={member.id}
                              className={cns(
                                COLORS[index % COLORS.length],
                                "h-5 w-5 rounded-full border border-white flex items-center justify-center text-white absolute",
                              )}
                              style={{ left: `${index * 10}px` }}
                            >
                              <img
                                src={member.picture}
                                alt={member.name}
                                className="h-full w-full object-cover rounded-full"
                              />
                            </li>
                          ))}

                          {task.assignedTo.length > 2 && (
                            <li
                              className="h-5 w-5 rounded-full border border-white bg-gray-500 text-white text-xs flex items-center justify-center absolute"
                              style={{ left: `${2 * 10}px` }}
                            >
                              +{task.assignedTo.length - 2}
                            </li>
                          )}
                        </ul>
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
