import { useSortable } from "@dnd-kit/sortable";
import { CSSProperties, ReactNode } from "react";

interface DraggableProps {
  id: string;
  children: ReactNode;
}

export default function Draggable({ id, children }: DraggableProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useSortable({
      id,
    });

  const draggableStyle: CSSProperties = {
    color: "gray",
    transform: transform
        ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
        : undefined,
    transition: isDragging ? "none" : "transform 200ms ease",
    opacity: isDragging ? 0 : 1,
  };
  const draggableClass = "bg-white p-6 rounded-lg mb-5";


  return (
    <div ref={setNodeRef} className={draggableClass} style={draggableStyle} {...attributes} {...listeners}>
      {children}
    </div>
  );
}
