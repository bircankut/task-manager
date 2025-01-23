import Profile from "@/components/profile/profile";
import Sidebar from "@/components/sidebar/sidebar";
import Dashboard from "@/app/daskboard/dashboard";

export default function Home() {
  let sidebarOpen = true;
  return (
    <div className="h-screen w-full flex flex-row bg-indigo-100">
      <div
        className={`bg-indigo-300 ${sidebarOpen ? "w-64" : "w-16"} transition-all duration-300`}
      >
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-row">
        <div className="flex-1">
          <Dashboard />
        </div>

        <div className="w-80 p-4 bg-indigo-300">
          <Profile />
        </div>
      </div>
    </div>
  );
}
