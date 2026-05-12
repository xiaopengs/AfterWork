"use client";

interface BadgeProps {
  children: React.ReactNode;
  color?: string;
  size?: "sm" | "md";
}

export default function Badge({
  children,
  color = "#8B2942",
  size = "sm",
}: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center gap-1.5
        font-medium tracking-wider uppercase
        rounded-full
        ${size === "sm" ? "px-2.5 py-1 text-xs" : "px-4 py-1.5 text-sm"}
      `}
      style={{
        backgroundColor: `${color}20`,
        color: color,
        border: `1px solid ${color}40`,
      }}
    >
      {children}
    </span>
  );
}