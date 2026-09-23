import { AbsoluteFill, useCurrentFrame } from "remotion";
import { EDITORIAL_LAYOUT, EDITORIAL_THEME } from "./theme";
import { useCardEnter } from "./MascotAvatar";
import { MascotAvatar } from "./MascotAvatar";
import type { EditorialSubtitle } from "./types";

export const EditorialCard: React.FC<{
  category: string;
  title: string;
  badge?: string;
  showMascot?: boolean;
  subtitles: EditorialSubtitle[];
  children: React.ReactNode;
}> = ({ category, title, badge, showMascot = true, subtitles, children }) => {
  const frame = useCurrentFrame();
  const { opacity, scale } = useCardEnter();
  const active =
    subtitles.find((s) => frame >= s.startFrame && frame < s.endFrame) ??
    subtitles[subtitles.length - 1];

  const cardTop = (EDITORIAL_LAYOUT.height - EDITORIAL_LAYOUT.cardHeight) / 2;
  const captionTop = cardTop + EDITORIAL_LAYOUT.cardHeight + 28;

  return (
    <AbsoluteFill style={{ backgroundColor: EDITORIAL_THEME.stageBg }}>
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: EDITORIAL_LAYOUT.cardWidth,
          height: EDITORIAL_LAYOUT.cardHeight,
          marginLeft: -EDITORIAL_LAYOUT.cardWidth / 2,
          marginTop: -EDITORIAL_LAYOUT.cardHeight / 2,
          backgroundColor: EDITORIAL_THEME.cardBg,
          borderRadius: EDITORIAL_LAYOUT.cardRadius,
          border: `1px solid ${EDITORIAL_THEME.cardBorder}`,
          boxShadow: "0 24px 80px rgba(0,0,0,0.45), 0 4px 16px rgba(0,0,0,0.25)",
          opacity,
          transform: `scale(${scale})`,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          boxSizing: "border-box",
          padding: "36px 40px 28px",
        }}
      >
        <div style={{ position: "relative", zIndex: 2, marginBottom: 18 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <span
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: "#FFFFFF",
                background: EDITORIAL_THEME.accentBlue,
                padding: "5px 14px",
                borderRadius: 999,
                letterSpacing: "0.02em",
              }}
            >
              {category}
            </span>
            {badge ? (
              <span style={{ fontSize: 15, color: EDITORIAL_THEME.textMuted }}>{badge}</span>
            ) : null}
          </div>
          <h1
            style={{
              margin: 0,
              fontSize: 44,
              lineHeight: 1.28,
              fontWeight: 800,
              color: EDITORIAL_THEME.textTitle,
              fontFamily:
                '"PingFang SC", "Noto Sans SC", Inter, system-ui, sans-serif',
              whiteSpace: "pre-line",
              maxWidth: showMascot ? "76%" : "100%",
            }}
          >
            {title}
          </h1>
        </div>

        <div
          style={{
            flex: 1,
            minHeight: 0,
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {children}
        </div>

        {showMascot ? <MascotAvatar side="left" size={100} /> : null}
      </div>

      {/* Caption lives in lower letterbox — outside the ivory card */}
      {active?.text ? (
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: captionTop,
            display: "flex",
            justifyContent: "center",
            zIndex: 5,
            opacity,
          }}
        >
          <div
            style={{
              maxWidth: 920,
              padding: "12px 28px",
              borderRadius: 999,
              background: EDITORIAL_THEME.captionPill,
              color: EDITORIAL_THEME.captionText,
              fontSize: 30,
              fontWeight: 700,
              textAlign: "center",
              lineHeight: 1.35,
              fontFamily:
                '"PingFang SC", "Noto Sans SC", Inter, system-ui, sans-serif',
            }}
          >
            {active.text}
          </div>
        </div>
      ) : null}
    </AbsoluteFill>
  );
};
