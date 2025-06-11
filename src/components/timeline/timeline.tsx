import React from "react";
import { useProject } from "@/contexts/project-context";
import { Task } from "@/entities/models/task";
import { Card } from "@/components/card/card";
import cns from "classnames";
import { COLORS } from "@/components/content-components/content-team-member-pictures/content-team-member-pictures";
import {TASK_STATUS} from "@/enums/task-status";

const STATUS_COLORS: Record<"todo" | "in-progress" | "done", string> = {
  todo: "bg-blue-100",
  done: "bg-green-100",
  "in-progress": "bg-yellow-100",
};

const Timeline = () => {
  const { currentProject } = useProject();

  const groupTasksByMonth = () => {
    const monthArray: Record<string, Task[]> = {};
    currentProject.tasks.forEach((task) => {
      const date = new Date(task.createdAt);
      const formatedDate = `${date.toLocaleString("default", { month: "long" })} ${date.getFullYear()}`;

      if (!monthArray[formatedDate]) {
        monthArray[formatedDate] = [];
      }
      monthArray[formatedDate].push(task);
    });

    return Object.entries(monthArray).map(([month, tasks]) => ({
      month,
      tasks: tasks.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      ),
    }));
  };

  const tasksByMonth = groupTasksByMonth();

  return (
    <div className="h-full px-10 overflow-auto">
      <h3 className="text-xl font-semibold">Project Timeline</h3>
      <div className="relative mt-3">
        <div className="absolute left-16 top-0 bottom-0 w-0.5 bg-gray-200 z-0" />
        <div className="space-y-8">
          {tasksByMonth.map((group) => (
            <div key={group.month} className="relative">
              {/* Month Header */}
              <div className="sticky top-4 z-10 mb-6 flex items-center">
                <div className="h-16 w-16 rounded-full flex justify-center items-center bg-indigo-500 text-white font-semibold mr-2">
                  {group.month
                    .split(" ")[0]
                    .substring(0, 3)
                    .toLocaleUpperCase()}
                </div>
                <h2 className="bg-white py-2 px-3 rounded-lg h-fit ml-3">
                  {group.month}
                </h2>
              </div>
              {/* Task List */}
              <div className="ml-12 mt-4">
                {group.tasks.map((task) => {
                  const date = new Date(task.createdAt);
                  const formattedTaskDate = `${date.getDate()} ${date.toLocaleString("default", { month: "short" })}`;
                  const taskBgColor = STATUS_COLORS[task.status as TASK_STATUS];
                  return (
                    <div key={task.id} className="flex flex-row relative mb-6">
                      {/* Date Display */}
                      <div className="absolute -left-12">
                        {formattedTaskDate}
                      </div>
                      <div className=" ml-6 mr-2 h-5 w-5 rounded-full border-2 border-indigo-800" />

                      {/* Task Card */}
                      <Card className="w-full">
                        <div className="flex flex-col">
                          {/* Task Title & Status */}
                          <div className="flex flex-row justify-between items-center mb-2">
                            <h5 className="text-lg font-semibold text-gray-600 break-words">
                              {task.title}
                            </h5>
                            <span className={cns(taskBgColor, "px-3 py-1 rounded-xl")}>{task.status}</span>
                          </div>

                          {/* Task Description */}
                          <p className="text-s text-gray-500 break-words mb-3">
                            {task.description}
                          </p>

                          {/* Task Tags */}
                          <div className="flex flex-row gap-1 mb-3">
                            {task.tags.map((tag, index) => (
                              <span
                                key={index}
                                className={cns(
                                  COLORS[index % COLORS.length],
                                  "mr-2 p-1 rounded text-xs text-gray-500",
                                )}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          {/* Assigned Members & Due Date */}
                          <div className="flex flex-row justify-between items-center h-7">
                            <div className="flex flex-row justify-center items-center relative">
                              {task.assignedTo.map((member, index) => (
                                <li
                                  key={member.id}
                                  className={cns(
                                    COLORS[index % COLORS.length],
                                    "h-7 w-7 rounded-full border border-white flex items-center justify-center text-white absolute",
                                  )}
                                  style={{ left: `${index * 20}px` }}
                                >
                                  <img
                                    src={member.picture}
                                    alt={member.name}
                                    className="h-full w-full object-cover rounded-full"
                                  />
                                </li>
                              ))}
                            </div>
                            <span className="text-xs text-neutral-500">
                              Due: {task.dueDate.slice(0, 10)}
                            </span>
                          </div>
                        </div>
                      </Card>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { Timeline };
