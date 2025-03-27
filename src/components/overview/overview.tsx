import React from "react";
import { useProject } from "@/contexts/project-context";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/card/card";
import { LuCircleCheckBig } from "react-icons/lu";
import { FaRegClock } from "react-icons/fa6";
import { LuUsers } from "react-icons/lu";
import cns from "classnames";

const Overview = () => {
  const { currentProject } = useProject();
  return (
    <div className="grid grid-cols-2 px-10 gap-4 w-full">
      <Card>
        <CardHeader className="text-neutral-800">
          {currentProject.name}
        </CardHeader>
        <CardDescription className="text-neutral-500">
          {currentProject.description}
        </CardDescription>

        <div className="grid grid-cols-2 gap-4 my-6">
          <Card className="flex flex-col gap-2 shadow-3xl bg-slate-50">
            <div className="flex flex-row">
              <LuCircleCheckBig size={24} className="mr-2 text-green-500" />
              <h3 className="font-medium">Progress</h3>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
              <div
                className="bg-violet-500 h-2.5 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${40}%` }}
              ></div>
            </div>
            <p className="text-sm text-muted-foreground">{40}% complete</p>
          </Card>
          <Card className=" bg-slate-50">
            <div className="flex flex-row mb-4">
              <FaRegClock size={24} className="mr-2 text-blue-500" />
              <h3 className="font-medium">Status</h3>
            </div>
            <div className="flex flex-row gap-7">
              <div className="flex flex-col gap-2">
                {
                  currentProject.tasks.filter(
                    (task) => task.status === "in-list",
                  ).length
                }
                <span className="text-muted-foreground text-xs">In List</span>
              </div>
              <div className="flex flex-col gap-2">
                {
                  currentProject.tasks.filter(
                    (task) => task.status === "in-progress",
                  ).length
                }
                <span className="text-muted-foreground text-xs">
                  In Progress
                </span>
              </div>
              <div className="flex flex-col gap-2">
                {
                  currentProject.tasks.filter((task) => task.status === "done")
                    .length
                }
                <span className="text-muted-foreground text-xs">Done</span>
              </div>
            </div>
          </Card>
        </div>
        <div className="flex flex-col mb-4 my-4">
          <div className="flex flex-row gap-1 mb-4 items-center">
            <LuUsers size={24} className="mr-2 text-violet-400" />
            <h3 className="font-medium">Team Members</h3>
          </div>

          <ul className="flex flex-row gap-6">
            {currentProject.team.map((member, index) => (
              <li
                key={index}
                className="flex flex-row gap-1 items-center justify-center bg-white rounded-2xl shadow p-1"
              >
                <div
                  key={member.id}
                  className={cns(
                    "h-6 w-6 rounded-full border border-white flex items-center justify-center text-white",
                  )}
                >
                  <img
                    src={member.picture}
                    alt={member.name}
                    className="h-full w-full object-cover rounded-full"
                  />
                </div>
                <span className="text-xs">{member.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </Card>
      <Card className="w-full">
        <CardTitle className="text-neutral-800">Upcoming Deadlines</CardTitle>
      </Card>
      <Card className="w-full">
        <CardTitle className="text-neutral-800">Recent Activity</CardTitle>
      </Card>
      <Card className="w-full">
        <CardTitle className="text-neutral-800">Task Distribution</CardTitle>
      </Card>
    </div>
  );
};

export { Overview };
