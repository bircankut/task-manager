"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { projects } from "@/entities/models/project";
import { Project } from "@/entities/models/project";
import { Task } from "@/entities/models/task";

interface ProjectContextData {
  currentProject: Project;
  setCurrentProject: (project: Project) => void;
  addTask: (task: Omit<Task, "id">) => void;
  updateTask: (id: number, updatedFields: Partial<Task>) => void;
}

const ProjectContext = createContext<ProjectContextData>({
  currentProject: {
    id: 0,
    name: "",
    logo: "",
    backgroundImage: "",
    createdAt: "",
    dueDate: "",
    tasks: [],
    team: [],
  },
  setCurrentProject: (_project) => undefined,
  addTask: (task: Omit<Task, "id">) => undefined,
  updateTask: (id: number, updatedFields: Partial<Task>) => undefined,
});

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
  const [currentProject, setCurrentProject] = useState<Project>(projects[1]);

  const addTask = (task: Omit<Task, "id">) => {
    setCurrentProject((prevProject) => ({
      ...prevProject,
      tasks: [...prevProject.tasks, { ...task, id: Date.now() }],
    }));
  };

  const updateTask = (taskId: number, updatedFields: Partial<Task>) => {
    setCurrentProject((prevProject) => ({
      ...prevProject,
      tasks: prevProject.tasks.map((task) =>
        task.id === taskId ? { ...task, ...updatedFields } : task,
      ),
    }));
  };

  return (
    <ProjectContext.Provider
      value={{ currentProject, setCurrentProject, addTask, updateTask }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProject must be used within a ProjectProvider");
  }
  return context;
};
