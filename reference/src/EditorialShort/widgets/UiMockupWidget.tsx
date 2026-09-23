import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { EDITORIAL_THEME } from "../theme";
import type { TableMockupData } from "../types";

export const UiMockupWidget: React.FC<{ data: TableMockupData }> = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({
    frame: Math.max(frame - 10, 0),
    fps,
    config: { damping: 15, stiffness: 120 },
  });

  const cursorX = interpolate(frame, [40, 70, 90], [40, 220, 260], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cursorY = interpolate(frame, [40, 70, 90], [30, 118, 118], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const clickPulse =
    frame > 88
      ? interpolate(Math.sin(((frame - 88) / fps) * Math.PI * 4), [-1, 1], [0.6, 1])
      : 0;

  const hl = data.highlight ?? { row: 1, col: 1 };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 720,
        margin: "0 auto",
        opacity: enter,
        transform: `translateY(${interpolate(enter, [0, 1], [24, 0])}px) scale(${interpolate(enter, [0, 1], [0.96, 1])})`,
        background: "#FFFFFF",
        borderRadius: 16,
        border: `1px solid ${EDITORIAL_THEME.divider}`,
        boxShadow: "0 12px 40px rgba(0,0,0,0.08)",
        overflow: "hidden",
        position: "relative",
        fontFamily: '"PingFang SC", Inter, system-ui, sans-serif',
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 14px",
          borderBottom: `1px solid ${EDITORIAL_THEME.divider}`,
        }}
      >
        <div>
          <div style={{ fontSize: 16, fontWeight: 800, color: EDITORIAL_THEME.textTitle }}>
            {data.title}
          </div>
          {data.subtitle ? (
            <div style={{ fontSize: 12, color: EDITORIAL_THEME.textMuted, marginTop: 2 }}>
              {data.subtitle}
            </div>
          ) : null}
        </div>
        <div
          style={{
            background: EDITORIAL_THEME.accentOrange,
            color: "#fff",
            fontSize: 12,
            fontWeight: 700,
            padding: "6px 12px",
            borderRadius: 999,
            opacity: 0.7 + clickPulse * 0.3,
          }}
        >
          {data.actionLabel ?? "+ 新建"}
        </div>
      </div>

      <div style={{ padding: "10px 14px" }}>
        <div
          style={{
            height: 32,
            borderRadius: 8,
            background: "#F5F5F4",
            border: `1px solid ${EDITORIAL_THEME.divider}`,
            marginBottom: 10,
            color: EDITORIAL_THEME.textMuted,
            fontSize: 12,
            display: "flex",
            alignItems: "center",
            paddingLeft: 12,
          }}
        >
          搜索…
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
          <thead>
            <tr>
              {data.columns.map((c) => (
                <th
                  key={c}
                  style={{
                    textAlign: "left",
                    padding: "8px 6px",
                    color: EDITORIAL_THEME.textMuted,
                    fontWeight: 600,
                    borderBottom: `1px solid ${EDITORIAL_THEME.divider}`,
                  }}
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row, ri) => (
              <tr key={ri}>
                {row.map((cell, ci) => {
                  const hot = ri === hl.row && ci === hl.col && frame > 70;
                  return (
                    <td
                      key={`${ri}-${ci}`}
                      style={{
                        padding: "8px 6px",
                        color: EDITORIAL_THEME.textTitle,
                        borderBottom: `1px solid ${EDITORIAL_THEME.divider}`,
                        background: hot
                          ? "rgba(22, 163, 74, 0.14)"
                          : ri === hl.row && frame > 55
                            ? "rgba(37, 99, 235, 0.06)"
                            : "transparent",
                        boxShadow: hot ? `inset 0 0 0 1px ${EDITORIAL_THEME.accentGreen}` : "none",
                        borderRadius: hot ? 6 : 0,
                        fontWeight: hot ? 700 : 500,
                      }}
                    >
                      {cell}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Virtual cursor */}
      <div
        style={{
          position: "absolute",
          left: cursorX,
          top: cursorY,
          width: 14,
          height: 14,
          borderRadius: 2,
          background: EDITORIAL_THEME.textTitle,
          clipPath: "polygon(0 0, 100% 70%, 55% 70%, 70% 100%, 0 0)",
          opacity: interpolate(frame, [35, 45], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
          zIndex: 5,
        }}
      />
    </div>
  );
};
