import { useDroppable } from "@dnd-kit/core";
import { ReactNode } from "react";

interface DroppableProps {
  id: string;
  data?: Record<string, any>;
  children: ReactNode;
}

export default function Droppable({ id, data, children }: DroppableProps) {
  const { setNodeRef } = useDroppable({
    id,
    data,
  });

  return (
    <div ref={setNodeRef} className=" text-zinc-900 ">
      {children}
    </div>
  );
}
