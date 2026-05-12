"use client";

import { useState, useEffect } from "react";

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
  duration?: number;
}

export default function FadeIn({
  children,
  delay = 0,
  direction = "up",
  className = "",
  duration = 0.5,
}: FadeInProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const transforms = {
    up: "translateY(20px)",
    down: "translateY(-20px)",
    left: "translateX(20px)",
    right: "translateX(-20px)",
    none: "scale(0.95)",
  };

  return (
    <div
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translate(0) scale(1)" : transforms[direction],
        transition: `all ${duration}s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}