import React, { ComponentType, InputHTMLAttributes } from "react";
import IconButton from "@/components/icon-button/icon-button";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon: ComponentType<{ size?: string | number; color?: string }>;
  buttonIcon?: any;
  type?: string;
  placeholder?: string;
  className?: string;
}

const InputWithIcon = ({
  icon: IconComponent,
  buttonIcon,
  type = "text",
  placeholder,
  className = "",
  ...props
}: InputProps) => {
  return (
    <div className="relative">
      <div className="h-12 absolute left-4 flex items-center justify-center">
        <IconComponent aria-hidden="true" size={24} color={"#8b8b8b"} />
      </div>
      <input
        type={type}
        placeholder={placeholder}
        className={`bg-gray-50 h-12 w-full px-14 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 ${className}`}
        {...props}
      />
      {buttonIcon ? (
        <div className="h-12 absolute right-4  top-0 flex items-center justify-center">
          <IconButton icon={buttonIcon} color={"#8b8b8b"} />
        </div>
      ) : null}
    </div>
  );
};

export { InputWithIcon };
