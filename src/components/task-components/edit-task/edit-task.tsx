import React, { ChangeEvent, useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { IoAddCircleOutline } from "react-icons/io5";
import { Task } from "@/entities/models/task";
import { useProject } from "@/contexts/project-context";
import cns from "classnames";
import { COLORS } from "@/components/task-components/task-board/task-board";
import IconButton from "@/components/icon-button/icon-button";
import { TaskInput } from "@/components/task-input/task-input";
import { TaskTextarea } from "@/components/task-textarea/task-textarea";

interface EditTaskProps {
  onClose: () => void;
  onPointerDown?: (e: React.PointerEvent<HTMLDivElement>) => void;
  task: Task;
}

const EditTask = ({ onClose, onPointerDown, task }: EditTaskProps) => {
  const { updateTask, currentProject } = useProject();
  const [editedTask, setEditedTask] = useState({ ...task });
  const [tagInput, setTagInput] = useState("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    if (name === "tags") {
      setTagInput(value);
    } else {
      setEditedTask((prevTask) => ({
        ...prevTask,
        [name]: value,
      }));
    }
  };

  const addTag = (newTag: string) => {
    const trimmedTag = newTag.trim();
    if (!trimmedTag) return;

    setEditedTask((prev) => ({
      ...prev,
      tags: prev.tags.includes(trimmedTag)
        ? prev.tags
        : [...prev.tags, trimmedTag],
    }));
  };

  const removeTag = (tagToRemove: string) => {
    setEditedTask((prev) => ({
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
      !editedTask.assignedTo.some((member) => member.id === selectedMember.id)
    ) {
      setEditedTask((prevTask) => ({
        ...prevTask,
        assignedTo: [...prevTask.assignedTo, selectedMember],
      }));
    }
  };

  const removeMember = (memberId: number) => {
    setEditedTask((prev) => ({
      ...prev,
      assignedTo: prev.assignedTo.filter((member) => member.id !== memberId),
    }));
  };

  const handleSubmit = () => {
    if (!editedTask.title.trim()) return;
    updateTask(task.id, editedTask);
    onClose();
  };

  return (
    <div
      onPointerDown={onPointerDown}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div className="flex flex-col bg-white w-2/5 min-h-40 shadow-2xl rounded-xl p-6 gap-4">
        <div className="flex justify-end">
          <IconButton
            onClick={onClose}
            size={28}
            className="text-gray-500 hover:text-gray-700"
            icon={IoCloseCircleOutline}
          />
        </div>

        <h3 className="text-lg text-gray-600 font-semibold">Edit Task</h3>

        <TaskInput
          label="Task Title"
          type="text"
          name="title"
          value={editedTask.title}
          onChange={handleChange}
        />

        <TaskTextarea
          label="Task Description"
          name="description"
          value={editedTask.description}
          onChange={handleChange}
        />

        <div className="flex flex-row gap-8">
          <section className="w-1/2 flex flex-col">
            <div className="flex flex-row relative">
              <TaskInput
                label="Tags"
                type="text"
                name="tags"
                value={tagInput}
                onChange={handleChange}
                className="min-w-60"
              ></TaskInput>

              <IconButton
                onClick={() => addTag(tagInput)}
                size={28}
                className="text-gray-500 hover:text-gray-700 absolute top-8 right-0"
                icon={IoAddCircleOutline}
              />
            </div>
            <div className="flex flex-wrap py-3 gap-1.5">
              {editedTask.tags.map((tag, key) => (
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
                {editedTask.assignedTo.map((member) => (
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
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export { EditTask };
