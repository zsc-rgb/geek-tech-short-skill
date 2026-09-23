import { AbsoluteFill } from "remotion";
import { EditorialCard } from "./EditorialCard";
import { IconGridWidget } from "./widgets/IconGridWidget";
import { FlowStepWidget } from "./widgets/FlowStepWidget";
import { UiMockupWidget } from "./widgets/UiMockupWidget";
import type {
  EditorialVideoConfig,
  FlowStep,
  IconGridItem,
  TableMockupData,
} from "./types";
import { DEMO_EDITORIAL_FLOW, DEMO_EDITORIAL_ICONS, DEMO_EDITORIAL_TABLE } from "./demos";

export const EditorialShort: React.FC<{
  config?: EditorialVideoConfig;
}> = ({ config }) => {
  const cfg = config ?? DEMO_EDITORIAL_TABLE;

  let widget: React.ReactNode = null;
  if (cfg.widgetType === "icon-grid") {
    widget = <IconGridWidget items={cfg.widgetData as IconGridItem[]} />;
  } else if (cfg.widgetType === "flow-step") {
    widget = <FlowStepWidget data={cfg.widgetData as FlowStep} />;
  } else {
    widget = <UiMockupWidget data={cfg.widgetData as TableMockupData} />;
  }

  return (
    <AbsoluteFill>
      <EditorialCard
        category={cfg.header.category}
        title={cfg.header.title}
        badge={cfg.badge}
        showMascot={cfg.showMascot !== false}
        subtitles={cfg.subtitles}
      >
        {widget}
      </EditorialCard>
    </AbsoluteFill>
  );
};

export { DEMO_EDITORIAL_FLOW, DEMO_EDITORIAL_ICONS, DEMO_EDITORIAL_TABLE };
export type { EditorialVideoConfig };
