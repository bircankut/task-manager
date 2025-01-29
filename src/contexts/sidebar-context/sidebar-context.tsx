"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface SidebarContextType {
    sidebarState: boolean;
    handleSidebarState: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
    const [sidebarState, setSidebarState] = useState(true);

    function handleSidebarState() {
        setSidebarState(!sidebarState);
    }

    return (
        <SidebarContext.Provider value={{ sidebarState, handleSidebarState }}>
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
