import React, { ComponentType, ReactNode } from "react";

interface IconButtonProps {
  onPointerDown?: (e: React.PointerEvent<HTMLButtonElement>) => void;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children?: ReactNode;
  disabled?: boolean;
  icon: ComponentType<{ size?: string | number; color?: string }>;
  className?: string;
  size?: string | number;
  color?: string;
}

const IconButton = ({
  children,
  disabled = false,
  icon: IconComponent,
  className,
  onClick,
  size = 24,
  color = "#57534E",
  onPointerDown,
  ...props
}: IconButtonProps) => {
  return (
    <button
      onPointerDown={onPointerDown}
      onClick={onClick}
      {...props}
      disabled={disabled}
      aria-disabled={disabled}
      className={className}
    >
      {IconComponent && (
        <IconComponent size={size} color={color} aria-hidden="true" />
      )}
      {children}
    </button>
  );
};

export default IconButton;
