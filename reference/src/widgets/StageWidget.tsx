import type {
  FlowStep,
  IconGridItem,
  TableMockupData,
} from "../EditorialShort/types";
import { IconGridWidget } from "../EditorialShort/widgets/IconGridWidget";
import { FlowStepWidget } from "../EditorialShort/widgets/FlowStepWidget";
import { UiMockupWidget } from "../EditorialShort/widgets/UiMockupWidget";
import { normalizeWidgetType } from "../engine/mode";

export type StageWidgetProps = {
  type: string;
  data?: IconGridItem[] | FlowStep | TableMockupData | unknown;
  children?: React.ReactNode;
};

/**
 * Abstract center-stage slot — never hardcode CodeWindow/IoFlow here.
 * Geek-Dark code-morph usually passes `children` from the archetype shell.
 */
export const StageWidget: React.FC<StageWidgetProps> = ({
  type,
  data,
  children,
}) => {
  const kind = normalizeWidgetType(type);

  if (kind === "icon-matrix") {
    return <IconGridWidget items={(data as IconGridItem[]) ?? []} />;
  }
  if (kind === "ui-mockup") {
    return <UiMockupWidget data={data as TableMockupData} />;
  }
  if (kind === "flow-step") {
    return <FlowStepWidget data={data as FlowStep} />;
  }
  if (kind === "code-morph") {
    return <>{children ?? null}</>;
  }

  return null;
};
