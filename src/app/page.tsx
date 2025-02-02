import { Profile } from "@/components/profile/profile";
import Dashboard from "@/app/daskboard/dashboard";

export default function Home() {
  return (
    <div className="w-full flex flex-row">
      <Dashboard />
      <Profile />
    </div>
  );
}
