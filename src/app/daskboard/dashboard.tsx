import TaskBoard from "@/components/task-board/task-board";
import { TaskProvider } from "@/contexts/task-context/task-context";
import { DashboardHeader } from "@/components/dashboard-header/dashboard-header";
import { DashboardBanner } from "@/components/dashboard-banner/dashboard-banner";
import DashboardNav from "@/components/dashboard-nav/dashboard-nav";
interface DashboardProps {}

export default function Dashboard({}: DashboardProps) {
  return (
    <div className="h-screen flex flex-col text-gray-800 ">
      <div className="h-2/5 bg-gray-50 pt-3 pb-6 px-10 flex flex-col justify-between">
        <DashboardHeader />
        <DashboardBanner />
        <DashboardNav />
      </div>
      <div className="h-3/5 bg-indigo-50">
        <TaskProvider>
          <TaskBoard />
        </TaskProvider>
      </div>
    </div>
  );
}
