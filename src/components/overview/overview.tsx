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
import { format } from "date-fns";
import { TASK_STATUS } from "@/enums/task-status";

const STATUS_COLORS: Record<"todo" | "in-progress" | "done", string> = {
  todo: "bg-blue-100",
  done: "bg-green-100",
  "in-progress": "bg-yellow-100",
};

const Overview = () => {
  const { currentProject, getTeamMembersTask } = useProject();
  const currentProjectDoneTasks = currentProject.tasks.filter(
    (task) => task.status === TASK_STATUS.DONE,
  ).length;
  const currentProjectTaskCount = currentProject.tasks.length;
  const currentProjectProgress =
    currentProjectTaskCount > 0
      ? Math.round((currentProjectDoneTasks / currentProjectTaskCount) * 100)
      : 0;

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
          <Card className="flex flex-col gap-2 bg-neutral-50 p-2 rounded-3xl shadow">
            <div className="flex flex-row">
              <LuCircleCheckBig size={24} className="mr-2 text-green-500" />
              <h3 className="font-medium">Progress</h3>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
              <div
                className="bg-violet-500 h-2.5 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${currentProjectProgress}%` }}
              ></div>
            </div>
            <p className="text-sm text-muted-foreground">
              {currentProjectProgress}% complete
            </p>
          </Card>
          <Card className=" bg-neutral-50 p-2 rounded-3xl shadow">
            <div className="flex flex-row mb-4 ">
              <FaRegClock size={24} className="mr-2 text-blue-500" />
              <h3 className="font-medium">Status</h3>
            </div>
            <div className="flex flex-row gap-7">
              <div className="flex flex-col gap-2">
                {
                  currentProject.tasks.filter(
                    (task) => task.status === TASK_STATUS.TODO,
                  ).length
                }
                <span className="text-muted-foreground text-xs">To do</span>
              </div>
              <div className="flex flex-col gap-2">
                {
                  currentProject.tasks.filter(
                    (task) => task.status === TASK_STATUS.IN_PROGRESS,
                  ).length
                }
                <span className="text-muted-foreground text-xs">
                  In Progress
                </span>
              </div>
              <div className="flex flex-col gap-2">
                {
                  currentProject.tasks.filter(
                    (task) => task.status === TASK_STATUS.DONE,
                  ).length
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
        <CardTitle className="text-neutral-800 mb-6">
          Upcoming Deadlines
        </CardTitle>
        <div>
          {currentProject.tasks
            .filter((task) => task.status !== TASK_STATUS.DONE)
            .map((task) => (
              <div
                key={task.id}
                className="mb-4 bg-neutral-50 p-2 rounded-2xl shadow"
              >
                <h4 className="font-medium text-m mb-2">{task.title}</h4>
                <ul className="flex flex-row justify-between items-center">
                  <div className="flex flex-row gap-2">
                    {task.assignedTo.map((member) => (
                      <li
                        key={member.id}
                        className="h-6 w-6 rounded-full border border-white flex items-center justify-center overflow-hidden"
                      >
                        <img
                          src={member.picture}
                          alt={member.name}
                          className="h-full w-full object-cover"
                        />
                      </li>
                    ))}
                  </div>
                  <span className="bg-yellow-100 rounded-2xl py-1 px-2">
                    {format(new Date(task.dueDate), "yyyy/MM/dd")}
                  </span>
                </ul>
              </div>
            ))}
        </div>
      </Card>
      <Card className="w-full">
        <CardTitle className="text-neutral-800 mb-6">Recent Activity</CardTitle>
        <div>
          {/*It needs to return late updated ones*/}
          {currentProject.tasks.map((task) => {
            const taskBgColor = STATUS_COLORS[task.status as TASK_STATUS];
            return (
              <div
                key={task.id}
                className="mb-4 bg-neutral-50 p-3 rounded-2xl shadow"
              >
                <div className="flex flex-row justify-between items-center">
                  <h4 className="font-medium text-m mb-2">{task.title}</h4>
                  <span
                    className={cns(
                      taskBgColor,
                      "rounded-2xl py-1 px-2 text-xs",
                    )}
                  >
                    {task.status}
                  </span>
                </div>
                <p className="text-neutral-500 text-sm mb-3">
                  {task.description}
                </p>
                <ul className="flex flex-row justify-between items-center">
                  <div className="flex flex-row gap-2">
                    {task.assignedTo.map((member) => (
                      <li
                        key={member.id}
                        className="h-6 w-6 rounded-full border border-white flex items-center justify-center overflow-hidden"
                      >
                        <img
                          src={member.picture}
                          alt={member.name}
                          className="h-full w-full object-cover"
                        />
                      </li>
                    ))}
                  </div>
                  <span className="flex flex-row text-xs text-neutral-500">
                    {`Updated at ${format(new Date(task.lastModifiedAt), "yyyy/MM/dd")}`}
                  </span>
                </ul>
              </div>
            );
          })}
        </div>
      </Card>
      <Card className="w-full">
        <CardTitle className="text-neutral-800 mb-6">
          Task Distribution
        </CardTitle>
        <ul className="flex flex-col gap-6">
          {currentProject.team.map((member) => {
            const memberTasks = getTeamMembersTask(member, currentProject);
            const completedTasks = memberTasks.filter(
              (task) => task.status === TASK_STATUS.DONE,
            ).length;
            const totalTasks = memberTasks.length;
            const completionPercentage =
              totalTasks > 0 ? (completedTasks / totalTasks) * 100 : "0";

            return (
              <div
                key={member.id}
                className="bg-neutral-50 p-4 rounded-3xl shadow flex flex-col gap-2"
              >
                <div className="flex flex-row gap-2">
                  <div
                    key={member.id}
                    className="h-6 w-6 rounded-full border border-white flex items-center justify-center overflow-hidden"
                  >
                    <img
                      src={member.picture}
                      alt={member.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <h3 className="font-semibold">{member.name}</h3>
                </div>
                <ul>
                  <li className="text-sm text-neutral-700 ">
                    <div className="flex flex-row justify-between mb-2">
                      <span>
                        {completedTasks} out of {totalTasks}
                      </span>
                      <p className="text-sm text-muted-foreground">
                        {completionPercentage}%
                      </p>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                      <div
                        className="bg-violet-500 h-2.5 rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${completionPercentage}%` }}
                      ></div>
                    </div>
                  </li>
                </ul>
              </div>
            );
          })}
        </ul>
      </Card>
    </div>
  );
};

export { Overview };
