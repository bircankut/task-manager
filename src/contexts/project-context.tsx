"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { projects } from "@/entities/models/project";
import { Project } from "@/entities/models/project";
import { Task } from "@/entities/models/task";
import { TeamMember } from "@/entities/models/member";

interface ProjectContextData {
  currentProject: Project;
  setCurrentProject: (project: Project) => void;
  addTask: (task: Omit<Task, "id">) => void;
  updateTask: (id: number, updatedFields: Partial<Task>) => void;
  getTasksByTeamMember: (
    teamMember: TeamMember,
    allProjects: Project[],
  ) => Task[];
  currentUser: TeamMember;
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
  getTasksByTeamMember: (teamMember: TeamMember, allProjects: Project[]) => [],
  currentUser: {
    id: 1,
    picture: "",
    name: "",
    role: "",
    email: "",
    assignedProjects: [],
  },
});

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
  const [currentProject, setCurrentProject] = useState<Project>(projects[1]);
  const [currentUser, setCurrentUser] = useState<TeamMember>(
    projects[1].team[0],
  );

  const addTask = (task: Omit<Task, "id">) => {
    setCurrentProject((prevProject) => ({
      ...prevProject,
      tasks: [
        ...prevProject.tasks,
        { ...task, id: typeof window !== "undefined" ? Date.now() : 0 },
      ],
    }));
  };

  const updateTask = (taskId: number, updatedFields: Partial<Task>) => {
    setCurrentProject((prevProject) => {
      const updatedTasks = prevProject.tasks.map((task) =>
          task.id === taskId ? { ...task, ...updatedFields } : task
      );

      console.log("Updated tasks:", updatedTasks);

      return {
        ...prevProject,
        tasks: updatedTasks,
      };
    });
  };


  const getTasksByTeamMember = (
    member: TeamMember,
    allProjects: Project[],
  ): Task[] => {
    return allProjects.flatMap((project) =>
      project.tasks.filter((task) =>
        member.assignedProjects.some(
          (assignedProject) =>
            assignedProject.projectId === project.id &&
            assignedProject.tasks.includes(task.id),
        ),
      ),
    );
  };

  return (
    <ProjectContext.Provider
      value={{
        currentProject,
        setCurrentProject,
        addTask,
        updateTask,
        getTasksByTeamMember,
        currentUser,
      }}
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
