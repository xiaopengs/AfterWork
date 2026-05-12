"use client";

interface GlowTextProps {
  children: React.ReactNode;
  color?: string;
  className?: string;
}

export default function GlowText({
  children,
  color = "#D4A574",
  className = "",
}: GlowTextProps) {
  return (
    <span
      className={`inline-block ${className}`}
      style={{
        textShadow: `0 0 10px ${color}80, 0 0 20px ${color}60, 0 0 40px ${color}30`,
      }}
    >
      {children}
    </span>
  );
}