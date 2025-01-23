"use client";

import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import { useTaskContext } from "@/contexts/task-context/task-context";
import { TaskHeader } from "@/components/task-header/task-header";
import Droppable from "@/components/task-board/droppable";
import Draggable from "@/components/task-board/draggable";
import { TaskModal } from "@/components/task-modal/task-modal";
import style from "./task-board.module.css";

const TaskBoard: React.FC = () => {
  const { tasks, updateTaskStatus } = useTaskContext();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStatus, setModalStatus] = useState("");

  const sensors = useSensors(useSensor(PointerSensor));

  // Handle dragging start
  function handleDragStart(event: any) {
    setActiveId(event.active.id);
  }

  // Handle dragging end (reordering and updating task status)
  function handleDragEnd(event: any) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const targetStatus = over.data.current?.status;
      if (active.id && targetStatus) {
        updateTaskStatus(active.id, targetStatus);
      }
    }

    setActiveId(null);
  }

  const openModal = (status: string) => {
    setModalStatus(status);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const sections = [
    { title: "In the List", status: "in-list" },
    { title: "In Progress", status: "in-progress" },
    { title: "Done", status: "done" },
  ];

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
              onAdd={() => openModal(section.status)}
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
                    <div className="bg-white p-2 rounded shadow mb-2 h-40 flex flex-col">
                      <span className="text-base text-stone-600 font-bold">
                        Task Name: {task.name}
                      </span>{" "}
                      <span className="text-sm text-slate-500">Context: {task.context}</span>
                    </div>
                  </Draggable>
                ))}
            </Droppable>
          ))}
        </div>

        <TaskModal
          isOpen={isModalOpen}
          onClose={closeModal}
          status={modalStatus}
        />
      </div>
    </DndContext>
  );
};

export default TaskBoard;
