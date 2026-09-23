import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { THEME } from "../engine/theme";
import type { SceneCut } from "../engine/clock";

export const Background: React.FC<{ cuts: SceneCut }> = ({ cuts }) => {
  const frame = useCurrentFrame();
  const shift = (frame * 1.6) % 64;
  const crisis =
    frame < cuts.analyzeEnd
      ? interpolate(frame, [0, cuts.hookEnd], [0.04, 0.07], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      : 0;

  return (
    <AbsoluteFill style={{ backgroundColor: THEME.bg }}>
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "42%",
          width: 520,
          height: 520,
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${
            frame < cuts.analyzeEnd ? "rgba(255,42,109,0.28)" : "rgba(5,255,161,0.22)"
          }, transparent 68%)`,
          filter: "blur(120px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          insetInline: 0,
          bottom: 0,
          height: "40%",
          perspective: 600,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "-30%",
            bottom: "-45%",
            width: "160%",
            height: "160%",
            transform: "rotateX(65deg)",
            transformOrigin: "center top",
            backgroundImage: `
              linear-gradient(rgba(56,189,248,0.14) 1px, transparent 1px),
              linear-gradient(90deg, rgba(56,189,248,0.14) 1px, transparent 1px)
            `,
            backgroundSize: "64px 64px",
            backgroundPosition: `0 ${-shift}px`,
            WebkitMaskImage: "linear-gradient(to top, black 0%, transparent 85%)",
            maskImage: "linear-gradient(to top, black 0%, transparent 85%)",
          }}
        />
      </div>
      <AbsoluteFill style={{ backgroundColor: THEME.danger, opacity: crisis }} />
    </AbsoluteFill>
  );
};
