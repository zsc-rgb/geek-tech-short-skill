import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * Minimal 2D mascot — geometric stand-in (no external PNG required).
 * Floats gently; never steals focus from the headline/widget.
 */
export const MascotAvatar: React.FC<{
  side?: "left" | "right";
  size?: number;
}> = ({ side = "left", size = 110 }) => {
  const frame = useCurrentFrame();
  const floatY = Math.sin((frame / 30) * Math.PI * 0.9) * 5;
  const nod = Math.sin((frame / 30) * Math.PI * 1.4) * 2;
  const pos =
    side === "left"
      ? ({ left: 28 } as const)
      : ({ right: 28 } as const);

  return (
    <div
      style={{
        position: "absolute",
        ...pos,
        bottom: 110,
        width: size,
        height: size * 1.25,
        transform: `translateY(${floatY}px) rotate(${nod}deg)`,
        zIndex: 4,
      }}
    >
      <svg width={size} height={size * 1.25} viewBox="0 0 100 125">
        <ellipse cx="50" cy="118" rx="28" ry="5" fill="rgba(0,0,0,0.12)" />
        <rect x="32" y="62" width="36" height="42" rx="10" fill="#4ADE80" />
        <circle cx="50" cy="38" r="22" fill="#F5C6A5" />
        <path
          d="M28 34 C32 18 68 18 72 34 L70 42 C60 36 40 36 30 42 Z"
          fill="#5B4636"
        />
        <circle cx="42" cy="40" r="3.2" fill="#1C1917" />
        <circle cx="58" cy="40" r="3.2" fill="#1C1917" />
        <path
          d="M44 50 Q50 54 56 50"
          stroke="#C2410C"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <rect x="58" y="70" width="22" height="28" rx="4" fill="#FAFAF9" stroke="#D6D3D1" />
      </svg>
    </div>
  );
};

export const useCardEnter = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 120 },
  });
  const opacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const scale = interpolate(enter, [0, 1], [0.96, 1]);
  return { opacity, scale };
};
