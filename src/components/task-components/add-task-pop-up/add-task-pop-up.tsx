"use client";

import { ChangeEvent, useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useProject } from "@/contexts/project-context";
import "react-tippy/dist/tippy.css";
import cns from "classnames";
import { COLORS } from "@/components/task-components/task-board/task-board";
import { TeamMember } from "@/entities/models/member";

interface AddTaskPopUpProps {
  onClose: () => void;
  status: string;
}

const AddTaskPopUpProps = ({ onClose, status }: AddTaskPopUpProps) => {
  const { currentProject, addTask } = useProject();
  const [task, setTask] = useState<{
    title: string;
    description: string;
    dueDate: string;
    tags: string[];
    assignedTo: TeamMember[];
    status: string;
  }>({
    title: "",
    description: "",
    dueDate: "",
    tags: [],
    assignedTo: [],
    status: "",
  });
  const [tagInput, setTagInput] = useState("");
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setTask((prevTask) => ({
      ...prevTask,
      [name]: name === "tags" ? value.split(",") : value,
    }));
  };

  const addTag = () => {
    const newTag = tagInput.trim();
    if (newTag && !task.tags.includes(newTag)) {
      setTask((prevTask) => ({
        ...prevTask,
        tags: [...prevTask.tags, newTag],
      }));
      setTagInput("");
    }
  };

  const assignMember = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedMemberId = Number(e.target.value);
    const selectedMember = currentProject.team.find(
      (member) => member.id === selectedMemberId,
    );

    if (
      selectedMember &&
      !task.assignedTo.some((member) => member.id === selectedMember.id)
    ) {
      setTask((prevTask) => ({
        ...prevTask,
        assignedTo: [...prevTask.assignedTo, selectedMember],
      }));
    }
  };

  const handleSubmit = () => {
    if (!task.title.trim()) return;

    addTask({
      title: task.title,
      description: task.description,
      tags: task.tags,
      attachments: [],
      assignedTo: task.assignedTo,
      discussions: [],
      status: status,
      createdAt: new Date().toISOString(),
      dueDate: task.dueDate,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex flex-col bg-white w-2/5 min-h-40 shadow-2xl rounded-xl p-6 gap-4">
        <div className="flex justify-end">
          <button onClick={onClose}>
            <IoCloseCircleOutline
              size={28}
              className="text-gray-500 hover:text-gray-700"
            />
          </button>
        </div>

        <h3 className="text-lg text-gray-600 font-semibold">Add New Task</h3>

        <div className="flex flex-col">
          <label className="text-sm font-semibold mb-1 text-gray-600">
            Task Title
          </label>
          <input
            type="text"
            name="title"
            value={task.title}
            onChange={handleChange}
            placeholder="Enter task title"
            className="border border-stone-300 rounded-md p-2"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-semibold mb-1 text-gray-600">
            Task Description
          </label>
          <textarea
            name="description"
            value={task.description}
            onChange={handleChange}
            placeholder="Enter task description"
            className="border border-stone-300 rounded-md p-2"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-semibold mb-1 text-gray-600">
            Due Date
          </label>
          <input
            type="date"
            name="dueDate"
            value={task.dueDate}
            onChange={handleChange}
            className="border border-stone-300 rounded-md p-2 text-gray-400"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-semibold mb-1 text-gray-600">
            Tags
          </label>
          <div className="flex flex-row justify-between gap-2">
            <input
              type="text"
              name="tag"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              className="w-5/6 border border-stone-300 rounded-md p-2 text-gray-400"
            />
            <button className="bg-indigo-300 p-2 rounded-md" onClick={addTag}>
              Add Tag
            </button>
          </div>
          <div className="flex flex-row py-3">
            {task.tags.map((tag, key) => (
              <span
                key={key}
                className={cns(
                  COLORS[key % COLORS.length],
                  "mr-2 p-1 rounded text-xs",
                )}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-semibold mb-1 text-gray-600">
            Assigned To
          </label>

          <select
            name="assignedTo"
            value={task.assignedTo.length > 0 ? task.assignedTo[0].id : ""}
            onChange={assignMember}
            className="border border-stone-300 rounded-md p-2"
          >
            <option value="">-- Please choose a member --</option>
            {currentProject.team.map((member) => (
              <option key={member.id} value={member.id}>
                {member.name}
              </option>
            ))}
          </select>

          <div className="flex flex-row py-3">
            {task.assignedTo.map((member, key) => (
              <div key={key} className="flex flex-row mr-4">
                <div className="h-4 w-4 rounded-xl bg-indigo-300 mr-1">
                  {member.picture}
                </div>
                <span className="text-xs">{member.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-12 mt-4">
          <button
            className="border-2 border-indigo-200 p-2 rounded-md"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="border text-gray-100 bg-indigo-800 p-2 rounded-md"
            onClick={handleSubmit}
          >
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
};

export { AddTaskPopUpProps };
