"use client"
import { useProject } from "@/contexts/project-context/project-context";
import { projects } from "@/entities/models/project";

const Sidebar = ()=> {
    const { currentProject, setCurrentProject } = useProject();

    return (
        <aside className="w-64 h-screen bg-indigo-300text-white p-4 flex flex-col">
            <h2 className="text-xl font-semibold mb-4">Projects</h2>
            <select
                value={currentProject?.projectId}
                onChange={(e) => {
                    const selectedProject = projects.find(p => p.projectId === Number(e.target.value));
                    if (selectedProject) setCurrentProject(selectedProject);
                }}
                className="p-2 bg-gray-700 rounded text-white"
            >
                {projects.map((project) => (
                    <option key={project.projectId} value={project.projectId}>
                        {project.name}
                    </option>
                ))}
            </select>

            <div className="mt-6">
                <h3 className="text-lg font-semibold">Current Project</h3>
                {currentProject && (
                    <div className="mt-2 p-3 bg-gray-800 rounded">
                        <p className="font-bold">{currentProject.name}</p>
                        <p className="text-sm">Due: {new Date(currentProject.dueDate).toLocaleDateString()}</p>
                    </div>
                )}
            </div>
        </aside>
    );
}

export { Sidebar };