import { ComponentType, ReactNode } from "react";

interface IconButtonProps {
  children?: ReactNode;
  disabled?: boolean;
  icon: ComponentType<{ size?: string | number; color?: string }>;
  className?: string;
  onClick?: () => void;
}

const IconButton = ({
  children,
  disabled = false,
  icon: IconComponent,
  className,
  onClick,
  ...props
}: IconButtonProps) => {
  return (
    <button
      onClick={onClick}
      {...props}
      disabled={disabled}
      aria-disabled={disabled}
      className={`h-7 w-7 mx-4 ${className}`}
    >
      {IconComponent && (
        <IconComponent size={24} color={"#57534E"} aria-hidden="true" />
      )}
      {children}
    </button>
  );
};

export default IconButton;
