import { useDroppable } from "@dnd-kit/core";
import { Dispatch, ReactNode, SetStateAction } from "react";

export default function Droppable({
  status,
  tasks,
  setTasks,
  children,
}: {
  status: string;
  tasks: { id: string; name: string; context: string; status: string }[];
  setTasks: Dispatch<
    SetStateAction<{ id: string; name: string; context: string; status: string }[]>
  >;
  children: ReactNode;
}) {
  const { setNodeRef } = useDroppable({
    id: status,
    data: { status },
  });

  return (
    <div
      ref={setNodeRef}
      className=" text-zinc-900 "
    >
      {children}
    </div>
  );
}
