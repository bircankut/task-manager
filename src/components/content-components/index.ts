import { ContentBanner } from "@/components/content-components/content-banner/content-banner";
import { ContentHeader } from "@/components/content-components/content-header/content-header";
import { ContentNav } from "@/components/content-components/content-nav/content-nav";

export const ContentComponents = {
  Banner: ContentBanner,
  Header: ContentHeader,
  Nav: ContentNav,
} as const;
