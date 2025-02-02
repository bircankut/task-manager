import { ComponentType, ReactNode } from "react";

interface IconButtonProps {
  children?: ReactNode;
  disabled?: boolean;
  icon: ComponentType<{ size?: string | number; color?: string }>;
  className?: string;
  onClick?: () => void;
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
    color= "#57534E",
  ...props
}: IconButtonProps) => {
  return (
    <button
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
