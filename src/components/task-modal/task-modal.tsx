"use client";

import { useState } from "react";
import { useTaskContext } from "@/contexts/task-context/task-context";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  status: string;
}

const TaskModal = ({ isOpen, onClose, status }: TaskModalProps) => {
  const [task, setTask] = useState<{ name: string; context: string }>({
    name: "",
    context: "",
  });
  const { addTask } = useTaskContext();

  const handleSave = () => {
    addTask({ ...task, status });
    setTask({ name: "", context: "" });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-1/3">
        <h3 className="text-lg font-bold mb-4">Add New Task</h3>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Task Name</label>
          <input
            type="text"
            value={task.name}
            onChange={(e) =>
              setTask((prev) => ({ ...prev, name: e.target.value }))
            }
            className="w-full border border-gray-300 rounded p-2"
            placeholder="Enter task name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Task Context</label>
          <textarea
            value={task.context}
            onChange={(e) =>
              setTask((prev) => ({ ...prev, context: e.target.value }))
            }
            className="w-full border border-gray-300 rounded p-2"
            placeholder="Enter task context"
          />
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-indigo-400 text-white rounded hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export { TaskModal };
