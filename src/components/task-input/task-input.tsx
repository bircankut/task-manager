import React, { ChangeEvent } from "react";
import cns from "classnames";

interface TaskInputProps {
  type: string;
  placeholder?: string;
  name: string;
  label: string;
  value: string;
  labelClass?: string;
  className?: string;
  onChange: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => void;
}

const TaskInput = ({
  type,
  label,
  name,
  placeholder,
  value,
  onChange,
  labelClass,
  className,
}: TaskInputProps) => {
  return (
    <div className="flex flex-col">
      <label
        className={cns(labelClass, "text-sm font-semibold mb-1 text-gray-600")}
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={cns(
          className,
          "border border-stone-300 rounded-md p-2 focus:outline-indigo-500 active:outline-indigo-500",
        )}
      />
    </div>
  );
};

export { TaskInput };
