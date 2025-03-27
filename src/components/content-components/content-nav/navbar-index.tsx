import { Overview } from "@/components/overview/overview";
import { Timeline } from "@/components/timeline/timeline";
import { List } from "@/components/list-components/list/list";
import { ContentCalendar } from "@/components/calendar/calendar";
import type { ReactElement } from "react";
import { Dashboard } from "@/components/dashboard/dashboard";

type SectionName = "Overview" | "List" | "Dashboard" | "Timeline" | "Calendar";

export const sectionComponents: Record<SectionName, () => ReactElement> = {
  Overview: () => <Overview />,
  List: () => <List />,
  Dashboard: () => <Dashboard />,
  Timeline: () => <Timeline />,
  Calendar: () => <ContentCalendar />,
};
