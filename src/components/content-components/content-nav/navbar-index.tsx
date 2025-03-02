import { Overview } from "@/components/overview/overview";
import { List } from "@/components/list/list";
import { Timeline } from "@/components/timeline/timeline";
import {Dashboard} from "@/components/dashboard-components/dashboard/dashboard";
import { Calendar } from "@/components/calendar/calendar";
import type { ReactElement } from "react";

type SectionName = "Overview" | "List" | "Dashboard" | "Timeline" | "Calendar";

export const sectionComponents: Record<SectionName, () => ReactElement> = {
  Overview: () => <Overview />,
  List: () => <List />,
  Dashboard: () => <Dashboard />,
  Timeline: () => <Timeline />,
  Calendar: () => <Calendar />,
};
