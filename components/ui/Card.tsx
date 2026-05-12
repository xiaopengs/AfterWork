"use client";

import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: string;
}

export default function Card({
  children,
  className = "",
  hover = false,
  glow,
}: CardProps) {
  return (
    <div
      className={`
        glass-card
        p-6
        ${hover ? "hover:-translate-y-1 hover:shadow-xl" : ""}
        ${className}
      `}
      style={
        glow
          ? {
              boxShadow: `0 0 20px ${glow}30`,
            }
          : undefined
      }
    >
      {children}
    </div>
  );
}