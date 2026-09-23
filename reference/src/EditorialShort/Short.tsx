import { AbsoluteFill } from "remotion";
import { EditorialCard } from "./EditorialCard";
import { StageWidget } from "../widgets/StageWidget";
import type { EditorialVideoConfig } from "./types";
import { DEMO_EDITORIAL_TABLE } from "./demos";

export const EditorialShort: React.FC<{
  config?: EditorialVideoConfig;
}> = ({ config }) => {
  const cfg = config ?? DEMO_EDITORIAL_TABLE;

  return (
    <AbsoluteFill>
      <EditorialCard
        category={cfg.header.category}
        title={cfg.header.title}
        badge={cfg.badge}
        showMascot={cfg.showMascot !== false}
        subtitles={cfg.subtitles}
      >
        <StageWidget type={cfg.widgetType} data={cfg.widgetData} />
      </EditorialCard>
    </AbsoluteFill>
  );
};
