import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { EDITORIAL_THEME } from "../theme";
import type { IconGridItem } from "../types";

export const IconGridWidget: React.FC<{ items: IconGridItem[] }> = ({ items }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const list = items.slice(0, 10);
  const cols = list.length > 6 ? 5 : Math.min(4, list.length);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gap: 18,
        width: "100%",
        maxWidth: 860,
        padding: "8px 8px 8px 120px",
        boxSizing: "border-box",
      }}
    >
      {list.map((item, i) => {
        const delay = 8 + i * 5;
        const local = Math.max(frame - delay, 0);
        const pop = spring({
          frame: local,
          fps,
          config: { damping: 12, stiffness: 140 },
        });
        const scale = interpolate(pop, [0, 1], [0.2, 1]);
        const opacity = interpolate(local, [0, 6], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const glow = interpolate(
          Math.sin(((frame - delay) / fps) * Math.PI * 2),
          [-1, 1],
          [0.15, 0.45],
        );

        return (
          <div
            key={item.id}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
              opacity,
              transform: `scale(${scale})`,
            }}
          >
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                background: item.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: 22,
                fontWeight: 800,
                boxShadow: `0 8px 22px rgba(0,0,0,${0.12 + glow * 0.2})`,
                fontFamily: "Inter, system-ui, sans-serif",
              }}
            >
              {item.glyph}
            </div>
            <div
              style={{
                fontSize: 15,
                fontWeight: 600,
                color: EDITORIAL_THEME.textTitle,
                textAlign: "center",
              }}
            >
              {item.label}
            </div>
          </div>
        );
      })}
    </div>
  );
};
