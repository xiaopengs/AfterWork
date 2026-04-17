"use client";

import { useEffect, useState } from "react";

interface PouringGlassProps {
  color?: string;
}

export default function PouringGlass({ color = "#8B2942" }: PouringGlassProps) {
  const [isPouring, setIsPouring] = useState(true);
  const [pourProgress, setPourProgress] = useState(0);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const intervalTime = isMobile ? 30 : 50;
    const increment = isMobile ? 3 : 2;

    const interval = setInterval(() => {
      setPourProgress((prev) => {
        if (prev >= 100) {
          setIsPouring(false);
          clearInterval(interval);
          return 100;
        }
        return prev + increment;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex flex-col items-center px-4">
      {/* Bottle being poured */}
      <div
        className="w-16 h-22 sm:w-20 sm:h-28 rounded-t-full relative"
        style={{
          background: `linear-gradient(180deg, ${color} 0%, ${color}88 100%)`,
          transform: "rotate(-45deg)",
          transformOrigin: "bottom center",
          boxShadow: `0 0 20px ${color}60`,
          willChange: "transform, box-shadow",
        }}
      >
        <div className="absolute top-3 sm:top-4 left-3 sm:left-4 w-2 sm:w-3 h-8 sm:h-10 rounded-full opacity-40"
          style={{ backgroundColor: "rgba(255,255,255,0.6)" }}
        />
      </div>

      {/* Pour stream */}
      {isPouring && (
        <div
          className="w-1.5 sm:w-2 h-6 sm:h-8 rounded-full"
          style={{
            backgroundColor: color,
            boxShadow: `0 0 10px ${color}`,
            opacity: 0.8,
          }}
        />
      )}

      {/* Wine glass */}
      <div className="relative mt-6 sm:mt-8">
        {/* Glass body */}
        <div
          className="w-16 h-22 sm:w-20 sm:h-28 rounded-t-full relative overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.1)",
            border: "2px solid rgba(255,255,255,0.2)",
          }}
        >
          {/* Wine fill */}
          <div
            className="absolute bottom-0 left-0 right-0 transition-all duration-100"
            style={{
              height: `${pourProgress}%`,
              background: `linear-gradient(180deg, ${color}CC 0%, ${color} 100%)`,
              boxShadow: `inset 0 0 15px ${color}80`,
            }}
          >
            {/* Bubbles - hidden on mobile for performance */}
            <div className="absolute inset-0 overflow-hidden hidden sm:block">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 rounded-full bg-white/30"
                  style={{
                    left: `${20 + i * 15}%`,
                    animation: `float 2s ease-in-out infinite`,
                    animationDelay: `${i * 0.4}s`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Glass shine */}
          <div
            className="absolute top-1.5 sm:top-2 left-2 sm:left-3 w-1.5 sm:w-2 h-6 sm:h-8 rounded-full opacity-30"
            style={{ backgroundColor: "rgba(255,255,255,0.5)" }}
          />
        </div>

        {/* Glass stem */}
        <div
          className="absolute h-8 sm:h-10 bottom-[-32px] sm:bottom-[-40px] left-1/2 -translate-x-1/2 rounded-full"
          style={{
            width: "6px",
            background: "linear-gradient(180deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 100%)",
          }}
        />

        {/* Glass base */}
        <div
          className="absolute w-8 sm:w-10 bottom-[-6px] sm:bottom-[-8px] left-1/2 -translate-x-1/2 rounded-full"
          style={{
            background: "linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 100%)",
          }}
        />

        {/* Glow effect under glass */}
        <div
          className="absolute -bottom-1.5 sm:-bottom-2 left-1/2 -translate-x-1/2 w-20 sm:w-24 h-6 sm:h-8 rounded-full blur-lg opacity-50"
          style={{ backgroundColor: color }}
        />
      </div>
    </div>
  );
}
