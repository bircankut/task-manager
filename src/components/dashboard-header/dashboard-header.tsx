"use client"
import IconButton from "@/components/icon-button/icon-button";
import { LuChevronsLeft } from "react-icons/lu";
import { LuChevronsRight } from "react-icons/lu";
import { LuMaximize2 } from "react-icons/lu";
import { LuMessageSquareMore } from "react-icons/lu";
import { RiTimerLine } from "react-icons/ri";
import { LuStar } from "react-icons/lu";
import { HiOutlineDotsVertical } from "react-icons/hi";
import {useSidebar} from "@/contexts/sidebar-context/sidebar-context";

const DashboardHeader = () => {
    const { sidebarState, handleSidebarState } = useSidebar();
  return (
    <div className="flex justify-between items-center">
      <div className="flex flex-row ">
        <IconButton onClick={handleSidebarState} icon={sidebarState ? LuChevronsLeft :  LuChevronsRight} >
        </IconButton>
          <IconButton icon={LuMaximize2}>
          </IconButton>
      </div>
      <div>profile pictures</div>
      <div className="flex flex-row ">
        <IconButton icon={LuMessageSquareMore}>
        </IconButton>
        <IconButton icon={RiTimerLine}>
        </IconButton>
        <IconButton icon={LuStar}>
        </IconButton>
        <IconButton icon={HiOutlineDotsVertical}>
        </IconButton>
      </div>
    </div>
  );
};

export { DashboardHeader };
