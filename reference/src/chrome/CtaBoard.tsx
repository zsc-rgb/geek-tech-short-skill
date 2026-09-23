import { interpolate, useCurrentFrame } from "remotion";
import { THEME } from "../engine/theme";
import type { SceneCut } from "../engine/clock";

export const CtaBoard: React.FC<{
  cuts: SceneCut;
  cardWidth: number;
  headline: string;
  principles: string[];
  badge: string;
}> = ({ cuts, cardWidth, headline, principles, badge }) => {
  const frame = useCurrentFrame();
  if (frame < cuts.resolveEnd) return null;
  const local = frame - cuts.resolveEnd;
  const opacity = interpolate(local, [0, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const scale = interpolate(local, [0, 15], [0.95, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const y = interpolate(local, [0, 15], [16, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: 240,
        width: cardWidth,
        transform: `translateX(-50%) translateY(${y}px) scale(${scale})`,
        opacity,
        border: `2px solid ${THEME.success}`,
        borderRadius: 18,
        background: THEME.panelSolid,
        padding: 28,
        boxSizing: "border-box",
        boxShadow: `0 0 40px ${THEME.successSoft}`,
      }}
    >
      <div style={{ color: THEME.success, fontSize: 26, fontWeight: 700, marginBottom: 18 }}>
        {headline}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {principles.slice(0, 3).map((p, i) => (
          <div
            key={p}
            style={{
              display: "flex",
              gap: 12,
              alignItems: "center",
              padding: "12px 14px",
              borderRadius: 12,
              border: `1px solid ${THEME.border}`,
              background: "rgba(255,255,255,0.03)",
              opacity: interpolate(local, [8 + i * 10, 18 + i * 10], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: THEME.successSoft,
                color: THEME.success,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
              }}
            >
              {i + 1}
            </div>
            <div style={{ color: THEME.text, fontSize: 22 }}>{p}</div>
          </div>
        ))}
      </div>
      <div
        style={{
          marginTop: 22,
          textAlign: "center",
          padding: "14px 16px",
          borderRadius: 14,
          border: `1px solid ${THEME.success}`,
          background: THEME.successSoft,
          color: THEME.text,
          fontWeight: 700,
          fontSize: 20,
        }}
      >
        {badge}
      </div>
    </div>
  );
};
