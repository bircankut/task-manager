import TaskBoard from "@/components/task-board/task-board";
import { TaskProvider } from "@/contexts/task-context/task-context";

interface DashboardProps {}

export default function Dashboard({}: DashboardProps) {
  return (
    <div className="h-screen flex flex-col text-gray-800 ">
      <div className="h-2/5 bg-indigo-100">calendar</div>
      <div className="h-3/5 bg-indigo-50">
        <TaskProvider>
          <TaskBoard />
        </TaskProvider>
      </div>
    </div>
  );
}
