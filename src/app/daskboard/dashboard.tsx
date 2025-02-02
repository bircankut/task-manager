import { TaskBoard } from "@/components/task-components/task-board/task-board";
import { DashboardComponents } from "../../components/dashboard-components";

interface DashboardProps {}

export default function Dashboard({}: DashboardProps) {
  return (
    <div className="h-screen w-full flex flex-col">
      <div className="h-2/5 bg-gray-100 pt-3 pb-6 px-8 flex flex-col justify-between">
        <DashboardComponents.Header />
        <DashboardComponents.Banner />
        <DashboardComponents.Nav />
      </div>
      <div className="h-3/5">
          <TaskBoard />
      </div>
    </div>
  );
}
