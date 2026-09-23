import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { EDITORIAL_THEME } from "../theme";
import type { FlowStep } from "../types";

export const FlowStepWidget: React.FC<{ data: FlowStep }> = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const aIn = spring({
    frame: Math.max(frame - 6, 0),
    fps,
    config: { damping: 14, stiffness: 110 },
  });
  const arrowIn = interpolate(frame, [18, 32], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const bIn = spring({
    frame: Math.max(frame - 28, 0),
    fps,
    config: { damping: 14, stiffness: 110 },
  });
  const punch = spring({
    frame: Math.max(frame - 48, 0),
    fps,
    config: { damping: 16, stiffness: 100 },
  });

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 820,
        paddingLeft: 100,
        display: "flex",
        flexDirection: "column",
        gap: 36,
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          fontSize: 26,
          fontWeight: 700,
          fontFamily: '"PingFang SC", Inter, system-ui, sans-serif',
        }}
      >
        <span
          style={{
            color: EDITORIAL_THEME.textMuted,
            opacity: aIn,
            transform: `translateX(${interpolate(aIn, [0, 1], [-20, 0])}px)`,
          }}
        >
          {data.from}
        </span>
        <span
          style={{
            color: EDITORIAL_THEME.accentBlue,
            opacity: arrowIn,
            transform: `translateX(${interpolate(arrowIn, [0, 1], [-8, 0])}px)`,
            fontSize: 28,
          }}
        >
          →
        </span>
        <span
          style={{
            color: EDITORIAL_THEME.accentBlue,
            opacity: bIn,
            transform: `translateX(${interpolate(bIn, [0, 1], [16, 0])}px)`,
          }}
        >
          {data.to}
        </span>
      </div>

      <div
        style={{
          fontSize: 36,
          fontWeight: 800,
          color: EDITORIAL_THEME.textTitle,
          textAlign: "center",
          lineHeight: 1.4,
          maxWidth: 700,
          opacity: punch,
          transform: `translateY(${interpolate(punch, [0, 1], [18, 0])}px)`,
          fontFamily: '"PingFang SC", Inter, system-ui, sans-serif',
        }}
      >
        {data.punchline}
      </div>
    </div>
  );
};
