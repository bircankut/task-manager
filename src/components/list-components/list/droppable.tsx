import { useDroppable } from "@dnd-kit/core";
import { ReactNode } from "react";

interface DroppableProps {
  id: string;
  data?: Record<string, any>;
  children: ReactNode;
}

export default function Droppable({ id, data, children }: DroppableProps) {
  const { isOver, setNodeRef } = useDroppable({
    id,
    data: { status: id },
  });

  const droppableStyle = {
    borderRadius: "8px",
    transition: "background-color 0.2s ease, border 0.2s ease",
    minHeight:"500px",
  };

  const droppableClass = isOver
    ? "border-2 border-dashed border-indigo-300"
    : "border-2 border-transparent ";

  return (
    <div ref={setNodeRef} className={droppableClass} style={droppableStyle} data-status={id}>
      {children}
    </div>
  );
}
