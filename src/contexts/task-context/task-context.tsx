"use client";
import {createContext, ReactNode, useContext, useState} from "react";

export interface Task {
  id: string;
  name: string;
  context: string;
  status: string;
  textareaHeight?: string;
}

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, "id">) => void;
  updateTaskStatus: (id: string, updatedFields: Partial<Task>) => void;
  updateTaskHeight: (id: string, height: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (task: Omit<Task, "id">) => {
    setTasks((prevTasks) => [
      ...prevTasks,
      { ...task, id: String(Date.now()), textareaHeight: "auto"},
    ]);
  };

  function updateTaskStatus(taskId: string, updatedFields: Partial<Task>) {

    setTasks((prevTasks) =>
        prevTasks.map((task) =>
            task.id === taskId ? { ...task, ...updatedFields } : task
        )
    );
  }

  const updateTaskHeight = (taskId: string, height: string) => {
    setTasks((prevTasks) =>
        prevTasks.map((task) =>
            task.id === taskId ? { ...task, textareaHeight: height } : task
        )
    );
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTaskStatus, updateTaskHeight}}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};
