"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface SidebarContextData {
  isSidebarExpanded: boolean;
  handleSidebarState: () => void;
}

const SidebarContext = createContext<SidebarContextData>({
  isSidebarExpanded: true,
  handleSidebarState: () => {},
});

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [isSidebarExpanded, setIsSidebarState] = useState(true);

  function handleSidebarState() {
    setIsSidebarState(!isSidebarExpanded);
  }

  return (
    <SidebarContext.Provider value={{ isSidebarExpanded, handleSidebarState }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};
