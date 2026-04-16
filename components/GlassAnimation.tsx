"use client";

import { useEffect, useState } from "react";

interface GlassAnimationProps {
  color?: string;
  size?: "sm" | "md" | "lg";
}

export default function GlassAnimation({ 
  color = "#8B2942", 
  size = "md" 
}: GlassAnimationProps) {
  const [isPouring, setIsPouring] = useState(true);
  const [pourProgress, setPourProgress] = useState(0);

  const sizeClasses = {
    sm: { glass: "w-12 h-16", stem: "h-6 bottom-[-24px]", base: "w-6 bottom-[-4px]" },
    md: { glass: "w-20 h-28", stem: "h-10 bottom-[-40px]", base: "w-10 bottom-[-8px]" },
    lg: { glass: "w-32 h-44", stem: "h-16 bottom-[-64px]", base: "w-16 bottom-[-12px]" },
  };

  const currentSize = sizeClasses[size];

  useEffect(() => {
    const interval = setInterval(() => {
      setPourProgress((prev) => {
        if (prev >= 100) {
          setIsPouring(false);
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex flex-col items-center">
      {/* Bottle being poured */}
      <div 
        className={`${currentSize.glass} rounded-t-full relative`}
        style={{
          background: `linear-gradient(180deg, ${color} 0%, ${color}88 100%)`,
          transform: "rotate(-45deg)",
          transformOrigin: "bottom center",
          boxShadow: `0 0 30px ${color}60`,
        }}
      >
        <div className="absolute top-4 left-4 w-3 h-10 rounded-full opacity-40"
          style={{ backgroundColor: "rgba(255,255,255,0.6)" }}
        />
      </div>

      {/* Pour stream */}
      {isPouring && (
        <div 
          className="w-2 h-8 rounded-full animate-pulse"
          style={{ 
            backgroundColor: color,
            boxShadow: `0 0 10px ${color}`,
          }}
        />
      )}

      {/* Wine glass */}
      <div className="relative mt-8">
        {/* Glass body */}
        <div 
          className={`${currentSize.glass} rounded-t-full relative overflow-hidden`}
          style={{
            background: "rgba(255,255,255,0.1)",
            border: "2px solid rgba(255,255,255,0.2)",
          }}
        >
          {/* Wine fill */}
          <div 
            className="absolute bottom-0 left-0 right-0 transition-all duration-200"
            style={{ 
              height: `${pourProgress}%`,
              background: `linear-gradient(180deg, ${color}CC 0%, ${color} 100%)`,
              boxShadow: `inset 0 0 20px ${color}80`,
            }}
          >
            {/* Bubbles */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 rounded-full bg-white/30 animate-bounce"
                  style={{
                    left: `${20 + i * 15}%`,
                    animationDelay: `${i * 0.3}s`,
                    animationDuration: `${1.5 + i * 0.2}s`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Glass shine */}
          <div 
            className="absolute top-2 left-3 w-2 h-8 rounded-full opacity-30"
            style={{ backgroundColor: "rgba(255,255,255,0.5)" }}
          />
        </div>

        {/* Glass stem */}
        <div 
          className={`absolute ${currentSize.stem} left-1/2 -translate-x-1/2 rounded-full`}
          style={{ 
            width: "8px",
            background: "linear-gradient(180deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 100%)",
          }}
        />

        {/* Glass base */}
        <div 
          className={`absolute ${currentSize.base} left-1/2 -translate-x-1/2 rounded-full`}
          style={{ 
            background: "linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 100%)",
          }}
        />

        {/* Glow effect under glass */}
        <div 
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-8 rounded-full blur-xl opacity-50"
          style={{ backgroundColor: color }}
        />
      </div>

      {/* Status text */}
      <p className="mt-8 text-text-secondary text-sm">
        {pourProgress < 100 ? "正在斟酒..." : "酒已斟好，享用吧"}
      </p>
    </div>
  );
}
