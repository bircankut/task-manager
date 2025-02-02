import { DashboardBanner } from "@/components/dashboard-components/dashboard-banner/dashboard-banner";
import { DashboardHeader } from "@/components/dashboard-components/dashboard-header/dashboard-header";
import { DashboardNav } from "@/components/dashboard-components/dashboard-nav/dashboard-nav";

export const DashboardComponents = {
  Banner: DashboardBanner,
  Header: DashboardHeader,
  Nav: DashboardNav,
} as const;
