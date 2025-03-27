"use client";

import React, { ChangeEvent, useState } from "react";
import { IoAddCircleOutline, IoCloseCircleOutline } from "react-icons/io5";
import { useProject } from "@/contexts/project-context";
import cns from "classnames";
import { COLORS } from "@/components/list-components/list/list";
import { TeamMember } from "@/entities/models/member";
import IconButton from "@/components/icon-button/icon-button";
import { TaskInput } from "@/components/task-input/task-input";
import { TaskTextarea } from "@/components/task-textarea/task-textarea";

interface AddTaskPopUpProps {
  onClose: () => void;
  status: string;
}

const AddTaskPopUpProps = ({ onClose, status }: AddTaskPopUpProps) => {
  const { currentProject, addTask } = useProject();
  const [error, setError] = useState("");
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

    if (name === "tags") {
      setTagInput(value);
    } else {
      setTask((prevTask) => ({
        ...prevTask,
        [name]: value,
      }));
    }
  };

  const addTag = (tag: string) => {
    const newTag = tagInput.trim();
    if (newTag && !task.tags.includes(newTag)) {
      setTask((prevTask) => ({
        ...prevTask,
        tags: [...prevTask.tags, newTag],
      }));
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTask((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
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

  const removeMember = (memberId: number) => {
    setTask((prev) => ({
      ...prev,
      assignedTo: prev.assignedTo.filter((member) => member.id !== memberId),
    }));
  };

  const handleSubmit = () => {
    setError("");

    if (!task.title.trim() || !task.description.trim()) {
      setError("Task title and description fields are required");
      return;
    }

    addTask({
      title: task.title,
      description: task.description,
      tags: task.tags,
      attachments: [],
      assignedTo: task.assignedTo,
      discussions: [],
      status: status,
      createdAt: new Date().toISOString(),
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex flex-col bg-white w-2/5 min-h-40 shadow-2xl rounded-xl p-6 gap-4">
        <div className="flex justify-end">
          <IconButton
            onClick={onClose}
            size={28}
            className="text-gray-500 hover:text-gray-700"
            icon={IoCloseCircleOutline}
          />
        </div>

        <h3 className="text-lg text-gray-600 font-semibold">Add New Task</h3>

        <TaskInput
          label="Task Title"
          type="text"
          name="title"
          value={task.title}
          placeholder="Enter task title"
          onChange={handleChange}
        />

        <TaskTextarea
          label="Task Description"
          name="description"
          value={task.description}
          placeholder="Enter task description"
          onChange={handleChange}
        />

        {error && <p className="text-red-500 text-sm text-center ">{error}</p>}

        <div className="flex flex-row gap-8 justify-between">
          <section className="flex flex-col">
            <div className="flex flex-row relative">
              <TaskInput
                label="Tags"
                type="text"
                name="tags"
                value={tagInput}
                onChange={handleChange}
                className="min-w-72"
              />

              <IconButton
                onClick={() => addTag(tagInput)}
                size={28}
                className="text-gray-500 hover:text-gray-700 absolute -right-8 top-8"
                icon={IoAddCircleOutline}
              />
            </div>
            <div className="flex flex-wrap py-3 gap-1.5">
              {task.tags.map((tag, key) => (
                <div
                  key={key}
                  className={cns(
                    COLORS[key % COLORS.length],
                    "flex  flex-row p-1.5 rounded-md mr-3",
                  )}
                >
                  <span key={key} className="text-xs flex items-center mr-1">
                    {tag}
                  </span>
                  <IconButton
                    onClick={() => removeTag(tag)}
                    size={20}
                    className="text-gray-500 hover:text-gray-700"
                    icon={IoCloseCircleOutline}
                  />
                </div>
              ))}
            </div>
          </section>
          <section className="w-1/2 flex flex-col">
            <div className="flex flex-col">
              <label className="text-sm font-semibold mb-1 text-gray-600">
                Assigned To
              </label>
              <select
                name="assignedTo"
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
              <div className="flex flex-wrap gap-1.5 py-3">
                {task.assignedTo.map((member) => (
                  <div
                    key={member.id}
                    className="flex flex-row mr-4 border border-stone-400 p-2 rounded-md"
                  >
                    <div className="h-4 w-4 rounded-xl bg-indigo-300 mr-1">
                      <img
                        src={member.picture}
                        alt={member.name}
                        className="h-full w-full object-cover rounded-full"
                      />
                    </div>
                    <span className="text-xs mr-1">{member.name}</span>
                    <IconButton
                      onClick={() => removeMember(member.id)}
                      size={20}
                      className="text-gray-500 hover:text-gray-700"
                      icon={IoCloseCircleOutline}
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
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
