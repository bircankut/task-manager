"use client";

import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  DragOverlay,
  DragEndEvent,
  DragStartEvent,
} from "@dnd-kit/core";
import { ListHeader } from "@/components/list-components/list-header/list-header";
import Droppable from "@/components/list-components/list/droppable";
import Draggable from "@/components/list-components/list/draggable";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { RiAttachmentLine } from "react-icons/ri";
import { LuMessagesSquare } from "react-icons/lu";
import IconButton from "@/components/icon-button/icon-button";
import { useProject } from "@/contexts/project-context";
import cns from "classnames";
import { createPortal } from "react-dom";
import { EditTask } from "@/components/list-components/edit-task/edit-task";

export const COLORS = [
  "bg-indigo-100",
  "bg-indigo-300",
  "bg-indigo-500",
  "bg-indigo-700",
  "bg-indigo-900",
];

const sections = [
  { title: "To Do", status: "todo" },
  { title: "In Progress", status: "in-progress" },
  { title: "Done", status: "done" },
];

const List = () => {
  const { currentProject, updateTask, addTask, setCurrentProject } =
    useProject();
  const [activeTaskId, setActiveTaskId] = useState<number | null>(null);
  const [openTaskId, setOpenTaskId] = useState<number | null>(null);

  const activeTask = currentProject.tasks.find(
    (task) => task.id === activeTaskId,
  );

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragStart = (event: DragStartEvent) => {
    setActiveTaskId(Number(event.active.id));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const targetTask = currentProject.tasks.find(
      (task) => task.id === Number(active.id),
    );
    const targetDroppableAreaStatus = over?.data?.current?.status || over?.id;

    if (targetTask && targetDroppableAreaStatus) {
      updateTask(targetTask.id, { status: targetDroppableAreaStatus });
    }

    setActiveTaskId(null);
  };

  const handleDragOver = (event: any) => {
    console.log("Dragging over:", event.over?.id);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLElement>) => {
    e.stopPropagation();
  };

  const toggleTaskEdit = (taskId: number) => {
    setOpenTaskId((prev) => (prev === taskId ? null : taskId));
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="bg-gray-100 h-full w-full grid grid-cols-3 gap-12 px-10 overflow-auto">
        {sections.map((section, key) => (
          <div key={key} className="flex flex-col h-full w-full">
            <div className="sticky top-0 bg-gray-100 py-2">
              <ListHeader
                key={section.status}
                title={section.title}
                taskCount={
                  currentProject.tasks.filter(
                    (task) => task.status === section.status,
                  ).length
                }
                status={section.status}
              />
            </div>
            <div className="h-full">
              <Droppable
                key={section.status}
                id={section.status}
                data={{ status: section.status }}
              >
                {currentProject.tasks
                  .filter((task) => task.status === section.status)
                  .map((task, key) => (
                    <Draggable key={String(task.id)} id={String(task.id)}>
                      <div
                        key={key}
                        className="flex flex-row justify-between items-center mb-4"
                      >
                        <h4 className="h-max text-sm font-semibold text-gray-600 break-words">
                          {task.title}
                        </h4>{" "}
                        <IconButton
                          onPointerDown={handlePointerDown}
                          onClick={() => toggleTaskEdit(task.id)}
                          icon={HiOutlineDotsVertical}
                        />
                        {openTaskId === task.id &&
                          createPortal(
                            <EditTask
                              task={task}
                              onPointerDown={handlePointerDown}
                              onClose={() => setOpenTaskId(null)}
                            />,
                            document.body,
                          )}
                      </div>
                      <div className=" mb-4 text-sm text-gray-500 break-words">
                        {task.description}
                      </div>
                      <div className="flex flex-row gap-5 items-center border-b border-gray-200 mb-3 pb-3">
                        {task.assignedTo.map((member, key) => (
                          <div key={key} className="flex flex-row">
                            <div className="h-4 w-4 rounded-xl bg-indigo-300 mr-1">
                              <img
                                src={member.picture}
                                alt={member.name}
                                className="h-full w-full object-cover rounded-full"
                              />
                            </div>
                            <span className="text-xs text-gray-500">
                              {member.name}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-row justify-between items-center">
                        <div>
                          {task.tags.map((tag, key) => (
                            <span
                              key={key}
                              className={cns(
                                COLORS[key % COLORS.length],
                                "mr-2 p-1 rounded text-xs text-gray-500",
                              )}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex flex-row justify-between items-center gap-2">
                          <div className="flex flex-row justify-between items-center">
                            <IconButton
                              icon={LuMessagesSquare}
                              size={18}
                              color={"#6e6d6b"}
                            ></IconButton>
                            <span className="text-xs text-gray-500 font-semibold ml-1">
                              {task.discussions.length}
                            </span>
                          </div>
                          <div className="flex flex-row justify-between items-center">
                            <IconButton
                              icon={RiAttachmentLine}
                              size={18}
                              color={"#6e6d6b"}
                            ></IconButton>
                            <span className="text-xs text-gray-500 font-semibold ml-1">
                              {task.discussions.length}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Draggable>
                  ))}
              </Droppable>
            </div>
          </div>
        ))}
      </div>
      <DragOverlay className="bg-white p-6 rounded-lg mb-5">
        {activeTask ? (
          <div>
            <div className="flex flex-row justify-between items-center mb-4">
              <h4 className="text-sm font-semibold text-gray-600 break-words">
                {activeTask.title}
              </h4>{" "}
              <IconButton icon={HiOutlineDotsVertical}></IconButton>
            </div>
            <div className="mb-4 text-sm text-gray-500 break-words">
              {activeTask.description}
            </div>
            <div className="flex flex-row gap-5 items-center border-b border-gray-200 mb-3 pb-3">
              {activeTask.assignedTo.map((member, key) => (
                <div key={key} className="flex flex-row">
                  <div className="h-4 w-4 rounded-xl bg-indigo-300 mr-1">
                    <img
                      src={member.picture}
                      alt={member.name}
                      className="h-full w-full object-cover rounded-full"
                    />
                  </div>
                  <span className="text-xs text-gray-500">{member.name}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-row justify-between items-center">
              <div>
                {activeTask.tags.map((tag, key) => (
                  <span
                    key={key}
                    className={cns(
                      COLORS[key % COLORS.length],
                      " mr-2 p-1 rounded text-gray-500 text-xs",
                    )}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex flex-row justify-between items-center gap-2">
                <div className="flex flex-row justify-between items-center">
                  <IconButton
                    icon={LuMessagesSquare}
                    size={18}
                    color={"#6e6d6b"}
                  ></IconButton>
                  <span className="text-xs text-gray-500 font-semibold ml-1">
                    {activeTask.discussions.length}
                  </span>
                </div>
                <div className="flex flex-row justify-between items-center">
                  <IconButton
                    icon={RiAttachmentLine}
                    size={18}
                    color={"#6e6d6b"}
                  ></IconButton>
                  <span className="text-xs text-gray-500 font-semibold ml-1">
                    {activeTask.discussions.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export { List };
