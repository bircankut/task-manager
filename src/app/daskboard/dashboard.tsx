import TaskBoard from "@/components/task-board/task-board";

interface DashboardProps {

}

export default function Dashboard({  }: DashboardProps) {
    return (
        <div className="h-screen flex flex-col text-gray-800 ">
            <div className="h-2/5 bg-indigo-200">
                calendar
            </div>
            <div className="flex-1 h-3/5">
                <TaskBoard/>
            </div>
        </div>
    );
}