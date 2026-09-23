import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { THEME } from "../engine/theme";
import type { SceneCut } from "../engine/clock";

/** Minimal bad→good code card (no Shiki dep in reference). */
export const CodeCard: React.FC<{
  cuts: SceneCut;
  cardWidth: number;
  bad: string;
  good: string;
}> = ({ cuts, cardWidth, bad, good }) => {
  const frame = useCurrentFrame();
  const morph = interpolate(frame, [cuts.analyzeEnd - 4, cuts.analyzeEnd + 36], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const top = interpolate(frame, [cuts.hookEnd - 4, cuts.hookEnd + 22], [400, 200], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const exit = interpolate(frame, [cuts.resolveEnd, cuts.resolveEnd + 15], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const exitY = interpolate(frame, [cuts.resolveEnd, cuts.resolveEnd + 15], [0, -20], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const crisis = morph < 0.5;

  if (exit <= 0.01) return null;

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top,
        width: cardWidth,
        transform: `translateX(-50%) translateY(${exitY}px)`,
        opacity: exit,
        border: `2px solid ${crisis ? THEME.danger : THEME.success}`,
        borderRadius: 16,
        background: THEME.panel,
        padding: 18,
        boxSizing: "border-box",
      }}
    >
      <div style={{ color: THEME.mutedDim, fontFamily: "ui-monospace, monospace", marginBottom: 10 }}>
        {crisis ? "AntiPattern.java" : "Solution.java"}
      </div>
      <pre
        style={{
          margin: 0,
          color: THEME.text,
          fontSize: 26,
          lineHeight: "40px",
          fontFamily: "ui-monospace, monospace",
          whiteSpace: "pre-wrap",
          opacity: morph < 0.5 ? 1 - morph * 1.2 : (morph - 0.5) * 2,
        }}
      >
        {morph < 0.5 ? bad : good}
      </pre>
    </div>
  );
};
