"use client";
import { useSidebar } from "@/contexts/sidebar-context";
import cns from "classnames";
import IconButton from "@/components/icon-button/icon-button";
import { RiNotification4Line } from "react-icons/ri";
import { FiHome } from "react-icons/fi";
import { TbMessage } from "react-icons/tb";
import { FiUsers } from "react-icons/fi";
import { LuFolder } from "react-icons/lu";
import { LuSettings } from "react-icons/lu";
import { TbLogout } from "react-icons/tb";
import { LuCircleHelp } from "react-icons/lu";
import React, { useState } from "react";
import { projects } from "@/entities/models/project";
import { useProject } from "@/contexts/project-context";

const Sidebar = () => {
  const { currentProject, setCurrentProject, currentUser } = useProject();
  const { isSidebarExpanded } = useSidebar();
  const [openSection, setOpenSection] = useState("home");

  function handleOpeningSection(sectionName: any) {
    setOpenSection((prev) => (prev === sectionName ? null : sectionName));
  }

  return (
    <div
      className={cns(
        "h-screen border-r-2 border-b-indigo-200 flex flex-row text-gray-800 bg-gray-50",
      )}
    >
      <div className="h-screen w-20 p-3 shrink-0">
        <div className="h-full w-full flex flex-col justify-between items-center py-2 bg-indigo-100 rounded-md">
          <div className="h-12 w-10 bg-indigo-600 rounded-xl mb-10">
            <img
              src={currentUser.picture}
              alt={currentUser.name}
              className="h-full w-full object-cover rounded-xl"
            />
          </div>
          <div className="h-2/3 flex flex-col justify-start items-center gap-8 pt-6 pb-10">
            <IconButton
              icon={FiHome}
              onClick={() => handleOpeningSection("home")}
            />
            <IconButton
              icon={RiNotification4Line}
              onClick={() => handleOpeningSection("notifications")}
            />
            <IconButton
              icon={TbMessage}
              onClick={() => handleOpeningSection("messages")}
            />
            <IconButton
              icon={FiUsers}
              onClick={() => handleOpeningSection("team")}
            />
            <IconButton
              icon={LuFolder}
              onClick={() => handleOpeningSection("projects")}
            />
            <IconButton
              icon={LuCircleHelp}
              onClick={() => handleOpeningSection("help")}
            />
          </div>
          <div className="h-1/3 flex flex-col justify-end items-center gap-8 py-10">
            <IconButton
              icon={LuSettings}
              onClick={() => handleOpeningSection("settings")}
            />
            <IconButton icon={TbLogout} />
            <span>logo</span>
          </div>
        </div>
      </div>

      <div
        className={cns(
          isSidebarExpanded ? "w-60" : "w-0",
          "flex flex-col transition-all duration-300 overflow-hidden ",
        )}
      >
        {openSection === "home" && (
          <div className="p-4">
            <h2 className="text-lg font-semibold text-neutral-600">Home</h2>
            <p>Welcome to your dashboard.</p>
          </div>
        )}

        {openSection === "notifications" && (
          <div className="p-4">
            <h2 className="text-lg font-semibold text-neutral-600">Notifications</h2>
            <ul className="mt-2 space-y-2">
              <li className="p-2 bg-gray-200 rounded-md text-neutral-600">Notification 1</li>
              <li className="p-2 bg-gray-200 rounded-md text-neutral-600">Notification 2</li>
            </ul>
          </div>
        )}

        {openSection === "messages" && (
          <div className="p-4">
            <h2 className="text-lg font-semibold text-neutral-600">Messages</h2>
            <ul className="mt-2 space-y-2">
              <li className="p-2 bg-gray-200 rounded-md text-neutral-600">Message 1</li>
              <li className="p-2 bg-gray-200 rounded-md text-neutral-600">Message 2</li>
            </ul>
          </div>
        )}

        {openSection === "team" && (
          <div className="p-4">
            <h2 className="text-lg font-semibold text-neutral-600">Team Members</h2>
            <ul className="mt-2 space-y-2">
              <li className="p-2 bg-gray-200 rounded-md text-neutral-600">User 1</li>
              <li className="p-2 bg-gray-200 rounded-md text-neutral-600">User 2</li>
            </ul>
          </div>
        )}

        {openSection === "projects" && (
          <div className="p-4 ">
            <h2 className="text-xl font-semibold mb-4 text-neutral-600">Projects</h2>
            <select
              value={currentProject?.id}
              onChange={(e) => {
                const selectedProject = projects.find(
                  (p) => p.id === Number(e.target.value),
                );
                if (selectedProject) setCurrentProject(selectedProject);
              }}
              className="px-1 p-3 bg-violet-100 rounded text-neutral-600 w-full"
            >
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>

            <div className="mt-6">
              <h3 className="text-lg text-neutral-600 font-semibold">Current Project</h3>
              {currentProject && (
                <div className="mt-2rounded">
                  <p className="font-bold text-neutral-600">{currentProject.name}</p>
                  <p className="text-sm text-neutral-600">
                    Due: {new Date(currentProject.dueDate).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {openSection === "help" && (
          <div className="p-4">
            <h2 className="text-lg font-semibold text-neutral-600">Help</h2>
            <p>Need assistance? Contact support.</p>
          </div>
        )}

        {openSection === "settings" && (
          <div className="p-4">
            <h2 className="text-lg font-semibold text-neutral-600">Settings</h2>
            <p>Adjust your preferences here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export { Sidebar };
