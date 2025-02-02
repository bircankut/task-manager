"use client";
import IconButton from "@/components/icon-button/icon-button";
import { LuChevronsLeft } from "react-icons/lu";
import { LuChevronsRight } from "react-icons/lu";
import { LuMaximize2 } from "react-icons/lu";
import { LuMessageSquareMore } from "react-icons/lu";
import { RiTimerLine } from "react-icons/ri";
import { LuStar } from "react-icons/lu";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useSidebar } from "@/contexts/sidebar-context";

import { DashboardTeamMemberPictures } from "@/components/dashboard-components/dashboard-team-member-pictures/dashboard-team-member-pictures";

const DashboardHeader = () => {
  const { isSidebarExpanded, handleSidebarState } = useSidebar();

  return (
    <div className="flex justify-between items-center">
      <div className="flex flex-row">
        <IconButton
          className="mx-4"
          onClick={handleSidebarState}
          icon={isSidebarExpanded ? LuChevronsLeft : LuChevronsRight}
        />
        <IconButton className="mx-4" icon={LuMaximize2} />
      </div>

      <div className="h-full w-full flex justify-end items-center ">
        <DashboardTeamMemberPictures />
      </div>

      <div className="flex flex-row">
        <IconButton className="mx-4" icon={LuMessageSquareMore} />
        <IconButton className="mx-4" icon={RiTimerLine} />
        <IconButton className="mx-4" icon={LuStar} />
        <IconButton className="mx-4" icon={HiOutlineDotsVertical} />
      </div>
    </div>
  );
};

export { DashboardHeader };
