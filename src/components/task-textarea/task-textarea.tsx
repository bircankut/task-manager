import React, { ChangeEvent, useLayoutEffect, useRef } from "react";
import cns from "classnames";

interface TaskTextareaProps {
  name: string;
  label: string;
  placeholder?: string;
  value: string;
  labelClass?: string;
  className?: string;
  onChange: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => void;
}

const TaskTextarea = ({
  label,
  name,
  value,
  placeholder,
  onChange,
  labelClass,
  className,
}: TaskTextareaProps) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useLayoutEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  return (
    <div className="flex flex-col">
      <label
        className={cns(labelClass, "text-sm font-semibold mb-1 text-gray-600")}
      >
        {label}
      </label>
      <textarea
        ref={textareaRef}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={cns(
          className,
          " border border-stone-300 rounded-md p-2 focus:outline-indigo-500 active:outline-indigo-500",
        )}
        style={{ minHeight: "50px", overflow: "hidden" }}
      />
    </div>
  );
};

export { TaskTextarea };
