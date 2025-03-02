import { ReactNode } from "react";
import {Sidebar} from "@/components/sidebar/sidebar";
import {Profile} from "@/components/profile/profile";

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div>
      <div className="h-screen w-screen flex flex-row">
          <Sidebar/>
          {children}
          <Profile/>
      </div>
    </div>
  );
}
