"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { projects } from "@/entities/models/project";
import { Project } from "@/entities/models/project";

interface ProjectContextType {
    currentProject: Project;
    setCurrentProject: (project: Project) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
    const [currentProject, setCurrentProject] = useState<Project>(projects[0]);

    return (
        <ProjectContext.Provider value={{ currentProject, setCurrentProject }}>
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
