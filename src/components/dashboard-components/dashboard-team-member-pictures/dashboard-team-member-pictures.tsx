"use client";
import cns from "classnames";
import { useMemo } from "react";
import { useProject } from "@/contexts/project-context";
import {COLORS} from "@/constants/colors";

interface DashboardTeamMemberPictures {}

const MAX_TEAM_MEMBER_BADGE_DISPLAY_COUNT = 11;


const DashboardTeamMemberPictures = ({}: DashboardTeamMemberPictures) => {
  const { currentProject } = useProject();

  const teamMemberDisplayList = useMemo(
    () => currentProject.team.slice(0, MAX_TEAM_MEMBER_BADGE_DISPLAY_COUNT - 1).reverse(),
    [currentProject.team],
  );
  const shouldRenderTeamMemberCountBadge =
    currentProject.team.length > MAX_TEAM_MEMBER_BADGE_DISPLAY_COUNT;

  return (
    <ul className="relative flex items-center">
      {teamMemberDisplayList.map((member, index) => (
        <li
          key={member.id}
          className={cns(
            COLORS[index % COLORS.length],
            "h-7 w-7 rounded-full border border-white flex items-center justify-center text-white absolute",
          )}
          style={{ right: `${index * 20}px` }}
        >
          {member.id}
        </li>
      ))}

      {shouldRenderTeamMemberCountBadge && (
        <li
          className="h-7 w-7 rounded-full bg-indigo-300 text-white border border-white
        flex items-center justify-center absolute"
          style={{
            right: `${(MAX_TEAM_MEMBER_BADGE_DISPLAY_COUNT - 1) * 20}px`,
          }}
        >
          +
          {currentProject.team.length -
            (MAX_TEAM_MEMBER_BADGE_DISPLAY_COUNT - 1)}
        </li>
      )}
    </ul>
  );
};

export { DashboardTeamMemberPictures };
