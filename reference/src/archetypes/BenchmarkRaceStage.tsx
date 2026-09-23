import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import type { SceneCut, JobScene } from "../engine/clock";
import type { PlatformId } from "../engine/theme";
import { PLATFORMS, THEME } from "../engine/theme";
import { Background } from "../chrome/Background";
import { HookMetric } from "../chrome/HookMetric";
import { CtaBoard } from "../chrome/CtaBoard";
import { Captions } from "../chrome/Captions";
import { MetaphorWidget } from "../metaphors";
import type { Contender } from "../metaphors/BarRace";

const TerminalLogs: React.FC<{ cuts: SceneCut; cardWidth: number; lines: string[] }> = ({
  cuts,
  cardWidth,
  lines,
}) => {
  const frame = useCurrentFrame();
  const visible = Math.min(
    lines.length,
    1 + Math.floor(interpolate(frame, [cuts.hookEnd, cuts.analyzeEnd], [0, lines.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })),
  );
  const exit = interpolate(frame, [cuts.resolveEnd, cuts.resolveEnd + 15], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  if (exit <= 0.01) return null;

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: 220,
        width: cardWidth,
        transform: "translateX(-50%)",
        opacity: exit,
        border: `2px solid ${THEME.border}`,
        borderRadius: 16,
        background: "#05070c",
        padding: 16,
        fontFamily: "ui-monospace, monospace",
        color: THEME.success,
        fontSize: 20,
        lineHeight: 1.55,
        minHeight: 200,
        boxSizing: "border-box",
      }}
    >
      {lines.slice(0, visible).map((l) => (
        <div key={l}>{l}</div>
      ))}
    </div>
  );
};

export const BenchmarkRaceStage: React.FC<{
  cuts: SceneCut;
  platform: PlatformId;
  fps: number;
  scenes: JobScene[];
  headline: string;
  metricValue: number;
  metricUnit: string;
  contenders: Contender[];
  unit: string;
  terminalLines: string[];
  ctaHeadline: string;
  principles: string[];
  badge: string;
}> = (props) => {
  const preset = PLATFORMS[props.platform];
  return (
    <AbsoluteFill>
      <Background cuts={props.cuts} />
      <HookMetric
        cuts={props.cuts}
        value={props.metricValue}
        unit={props.metricUnit}
        headline={props.headline}
        cardWidth={preset.cardWidth}
      />
      <TerminalLogs
        cuts={props.cuts}
        cardWidth={preset.cardWidth}
        lines={props.terminalLines}
      />
      <MetaphorWidget
        type="bar-race"
        cuts={props.cuts}
        width={preset.cardWidth}
        params={{ contenders: props.contenders, unit: props.unit }}
      />
      <CtaBoard
        cuts={props.cuts}
        cardWidth={preset.cardWidth}
        headline={props.ctaHeadline}
        principles={props.principles}
        badge={props.badge}
      />
      <Captions scenes={props.scenes} fps={props.fps} safeBottom={preset.safeBottom} />
    </AbsoluteFill>
  );
};
