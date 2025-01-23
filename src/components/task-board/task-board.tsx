"use client";

import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import { useState } from "react";

import Draggable from "@/components/task-board/draggable";
import Droppable from "./droppable";
import style from "./task-board.module.css";


export default function TaskBoard() {
  const [tasks, setTasks] = useState([
    { id: "1", name: "Task 1", context:"", status: "in-list" },
    { id: "2", name: "Task 2", context: "", status: "in-progress" },
    { id: "3", name: "Task 3", context:"", status: "done" },
    { id: "4", name: "Task 4", context:"", status: "in-list" },
    { id: "5", name: "Task 5", context:"", status: "in-list" },
    { id: "6", name: "Task 6", context: "", status: "in-progress" },
    { id: "7", name: "Task 7", context:"", status: "done" },
    { id: "8", name: "Task 8", context:"", status: "in-list" },
    { id: "9", name: "Task 9", context:"", status: "in-list" },
  ]);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(useSensor(PointerSensor));

  // Handle dragging start
  function handleDragStart(event: any) {
    setActiveId(event.active.id);
  }

  // Handle dragging end (reordering and updating task status)
  function handleDragEnd(event: any) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const draggedTask = tasks.find((task) => task.id === active.id);
      const targetStatus = over?.data.current?.status; // Get target section's status

      if (draggedTask && targetStatus) {
        const updatedTasks = tasks.map((task) => {
          if (task.id === draggedTask.id) {
            return { ...task, status: targetStatus }; // Update status of the dragged task
          }
          return task;
        });

        setTasks(updatedTasks);
      }
    }

    setActiveId(null);
  }

  const addTask = (status: string) => {
    const newTask = {
      id: String(Date.now()), // Unique ID based on timestamp
      name: `New Task`,
      context: `This is a new task`,
      status: status,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
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
          <div className="flex items-center justify-between">
            <h2 className="font-bold">
              In the List{" "}
              <span className="text-gray-500">
                ({tasks.filter((task) => task.status === "in-list").length})
              </span>
            </h2>
            <button
              onClick={() => addTask("in-list")}
              className="ml-2 px-2 py-1 border-solid  border-2 border-slate-500 text-slate-500 rounded"
            >
              +
            </button>
          </div>
          <div className="flex items-center justify-between">
            <h2 className="font-bold">
              In Progress{" "}
              <span className="text-gray-500">
                ({tasks.filter((task) => task.status === "in-progress").length})
              </span>
            </h2>
            <button
              onClick={() => addTask("in-progress")}
              className="ml-2 px-2 py-1 border-solid  border-2 border-slate-500 text-slate-500 rounded"
            >
              +
            </button>
          </div>
          <div className="flex items-center justify-between">
            <h2 className="font-bold">
              Done{" "}
              <span className="text-gray-500">
                ({tasks.filter((task) => task.status === "done").length})
              </span>
            </h2>
            <button
              onClick={() => addTask("done")}
              className="ml-2 px-2 py-1 border-solid  border-2 border-slate-500 text-slate-500 rounded"
            >
              +
            </button>
          </div>
        </div>

        {/* Scrollable Content Row */}
        <div
          className={`grid grid-cols-3 gap-7 overflow-auto ${style.customScroll}`}
        >
          {/* In the List Section */}
          <Droppable status="in-list" tasks={tasks} setTasks={setTasks}>
            <div className="flex flex-col gap-2">
              {tasks
                .filter((task) => task.status === "in-list")
                .map((task) => (
                  <Draggable key={task.id} id={task.id} status="in-progress">
                    <div className="bg-white p-2 rounded shadow mb-2 h-40">
                      {task.name} {task.context}
                    </div>
                  </Draggable>
                ))}
            </div>
          </Droppable>

          {/* In Progress Section */}
          <Droppable status="in-progress" tasks={tasks} setTasks={setTasks}>
            <div className="flex flex-col gap-2">
              {tasks
                .filter((task) => task.status === "in-progress")
                .map((task) => (
                  <Draggable key={task.id} id={task.id} status="done">
                    <div className="bg-white p-2 rounded shadow mb-2 h-40">
                      {task.name} {task.context}
                    </div>
                  </Draggable>
                ))}
            </div>
          </Droppable>

          {/* Done Section */}
          <Droppable status="done" tasks={tasks} setTasks={setTasks}>
            <div className="flex flex-col gap-2">
              {tasks
                .filter((task) => task.status === "done")
                .map((task) => (
                  <Draggable key={task.id} id={task.id} status="done">
                    <div className="bg-white p-2 rounded shadow mb-2 h-40">
                      {task.name} {task.context}
                    </div>
                  </Draggable>
                ))}
            </div>
          </Droppable>
        </div>
      </div>
    </DndContext>
  );
}
