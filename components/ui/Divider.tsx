"use client";

interface DividerProps {
  orientation?: "horizontal" | "vertical";
  color?: string;
  className?: string;
}

export default function Divider({
  orientation = "horizontal",
  color = "rgba(255,255,255,0.08)",
  className = "",
}: DividerProps) {
  if (orientation === "vertical") {
    return (
      <div
        className={`w-px h-full ${className}`}
        style={{ backgroundColor: color }}
      />
    );
  }

  return (
    <div
      className={`w-full h-px ${className}`}
      style={{
        background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
      }}
    />
  );
}