import { useDraggable } from "@dnd-kit/core";
import {CSSProperties, ReactNode} from "react";


interface DraggableProps {
  id: string;
  status: string;
  children: ReactNode;
}

export default function Draggable({ id, status, children }: DraggableProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id });

  const style: CSSProperties = {
    color: "gray",
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    transition: isDragging ? "none" : "transform 200ms ease",
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="cursor-grab"
      data-status={status}
    >
      {children}
    </div>
  );
}
