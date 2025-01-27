"use client";

import React, { ChangeEvent, useState } from "react";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  DragOverlay,
} from "@dnd-kit/core";
import { useTaskContext } from "@/contexts/task-context/task-context";
import { TaskHeader } from "@/components/task-header/task-header";
import Droppable from "@/components/task-board/droppable";
import Draggable from "@/components/task-board/draggable";
import style from "./task-board.module.css";

const TaskBoard = () => {
  const { tasks, updateTaskStatus, addTask, updateTaskHeight } =
    useTaskContext();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const targetTask = tasks.find((task) => task.id === active.id);
      const targetStatus = over.data.current?.status;

      if (targetTask && targetStatus) {
        updateTaskStatus(active.id, { ...targetTask, status: targetStatus });
      }
    }

    setActiveId(null);
  };

  const sections = [
    { title: "In the List", status: "in-list" },
    { title: "In Progress", status: "in-progress" },
    { title: "Done", status: "done" },
  ];

  const activeTask = tasks.find((task) => task.id === activeId);

  const handleInput = (taskId: string, e: React.FormEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement;
    target.style.height = "auto";
    const newHeight = `${target.scrollHeight}px`;
    target.style.height = newHeight;
    updateTaskHeight(taskId, newHeight);
  };


  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-rows-[auto_1fr] h-full gap-4 p-5">
        <div className="grid grid-cols-3 gap-7 items-center">
          {sections.map((section) => (
            <TaskHeader
              key={section.status}
              title={section.title}
              taskCount={
                tasks.filter((task) => task.status === section.status).length
              }
              onAdd={() =>
                addTask({
                  name: "",
                  context: "",
                  status: section.status,
                })
              }
            />
          ))}
        </div>

        <div
          className={`grid grid-cols-3 gap-7 overflow-y-auto ${style.customScroll}`}
        >
          {sections.map((section) => (
            <Droppable
              key={section.status}
              id={section.status}
              data={{ status: section.status }}
            >
              {tasks
                .filter((task) => task.status === section.status)
                .map((task) => (
                  <Draggable key={task.id} id={task.id}>
                    <div
                      className="bg-indigo-50 p-5 rounded shadow mb-2 flex flex-col"
                      onDoubleClick={() =>
                        setEditingTaskId(
                          editingTaskId === task.id ? null : task.id,
                        )
                      }
                    >
                      <input
                        className="bg-indigo-50 w-full p-1 mt-1 border-2 border-transparent focus:border-indigo-300 focus:outline-none rounded transition-colors duration-200"
                        type="text"
                        placeholder="name"
                        value={task.name}
                        onChange={(e) =>
                          updateTaskStatus(task.id, {
                            name: e.target.value,
                          })
                        }
                        onPointerDown={(e) => e.stopPropagation()} // Prevent drag initiation
                        id={`task-name-${task.id}`}
                      />

                      <textarea
                        value={task.context}
                        placeholder="context"
                        onChange={(e) =>
                          updateTaskStatus(task.id, {
                            context: e.target.value,
                          })
                        }
                        onPointerDown={(e) => e.stopPropagation()} // Prevent drag initiation
                        className="resize-none w-full p-1 mt-1 bg-indigo-50 border-2 border-transparent focus:border-indigo-300 focus:outline-none rounded transition-colors duration-200"
                        style={{
                          height: task.textareaHeight,
                          overflow: "hidden",
                        }}
                        onInput={(e) => handleInput(task.id, e)}
                      />
                    </div>
                  </Draggable>
                ))}
            </Droppable>
          ))}
        </div>
      </div>

      <DragOverlay>
        {activeTask ? (
          <div
            className="bg-indigo-50 p-5 rounded shadow flex flex-col"
            style={{ pointerEvents: "none", height: "auto" }}
          >
            <span className="text-gray-500 p-1 mt-1 break-words">
              {activeTask.name}
            </span>

            <span className="text-gray-500 p-1 mt-1 break-words">
              {activeTask.context}
            </span>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default TaskBoard;
