"use client";

import {
  DndContext,
  DragOverlay,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  useDroppable,
} from "@dnd-kit/core";
import { useState } from "react";
import { CSS } from "@dnd-kit/utilities";
import Draggable from "@/components/task-board/draggable";
import Droppable from "./droppable";

export default function TaskBoard() {
  const [tasks, setTasks] = useState([
    { id: "1", name: "Task 1", context:"this needs to be done", status: "in-list" },
    { id: "2", name: "Task 2", context: "go to doctor", status: "in-progress" },
    { id: "3", name: "Task 3", context:"go shopping", status: "done" },
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

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-4">
        {/* In the List Section */}
        <Droppable status="in-list" tasks={tasks} setTasks={setTasks}>
          <h2 className="font-bold">In the List</h2>
          {tasks
            .filter((task) => task.status === "in-list")
            .map((task) => (
              <Draggable key={task.id} id={task.id} status="in-progress">
                <div className="bg-white p-2 rounded shadow mb-2">
                  {task.name} {task.context}
                </div>
              </Draggable>
            ))}
        </Droppable>

        {/* In Progress Section */}
        <Droppable status="in-progress" tasks={tasks} setTasks={setTasks}>
          <h2 className="font-bold">In Progress</h2>
          {tasks
            .filter((task) => task.status === "in-progress")
            .map((task) => (
              <Draggable key={task.id} id={task.id} status="done">
                <div className="bg-white p-2 rounded shadow mb-2">
                  {task.name} {task.context}
                </div>
              </Draggable>
            ))}
        </Droppable>

        {/* Done Section */}
        <Droppable status="done" tasks={tasks} setTasks={setTasks}>
          <h2 className="font-bold">Done</h2>
          {tasks
            .filter((task) => task.status === "done")
            .map((task) => (
              <Draggable key={task.id} id={task.id} status="done">
                <div className="bg-white p-2 rounded shadow mb-2">
                  {task.name} {task.context}
                </div>
              </Draggable>
            ))}
        </Droppable>
      </div>
    </DndContext>
  );
}
