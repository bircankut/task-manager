import React, { ReactNode } from "react";
import cns from "classnames";

interface ButtonProps {
  variant?: "background" | "border"; // Added variant support
  onPointerDown?: (e: React.PointerEvent<HTMLButtonElement>) => void;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children?: ReactNode;
  disabled?: boolean;
  className?: string;
}

const Button = ({
  variant = "background",
  children,
  disabled = false,
  className,
  onClick,
  onPointerDown,
  ...props
}: ButtonProps) => {
  return (
    <button
      onPointerDown={onPointerDown}
      onClick={onClick}
      {...props}
      disabled={disabled}
      aria-disabled={disabled}
      className={cns(
        "rounded-md transition-all duration-200",
        {
          "bg-indigo-600 text-white hover:bg-indigo-700 disabled:bg-gray-300 disabled:text-gray-500":
            variant === "background",
          "border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-100 disabled:border-gray-300 disabled:text-gray-400":
            variant === "border",
        },
        className,
      )}
    >
      {children}
    </button>
  );
};

export { Button };
