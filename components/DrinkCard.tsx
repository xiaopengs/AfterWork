"use client";

import { useState, useCallback } from "react";

interface DrinkCardProps {
  name: string;
  type: string;
  description: string;
  price: string;
  alcohol: string;
  color: string;
  index: number;
}

export default function DrinkCard({ 
  name, 
  type, 
  description, 
  price, 
  alcohol, 
  color,
  index 
}: DrinkCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  // Mobile-friendly: use tap to flip instead of hover
  const handleClick = useCallback(() => {
    setIsFlipped(prev => !prev);
  }, []);

  // Prevent scroll when interacting with card on mobile
  const handleTouch = useCallback((e: React.TouchEvent) => {
    e.stopPropagation();
  }, []);

  return (
    <div 
      className="relative h-72 sm:h-80 perspective-1000 cursor-pointer select-none"
      onClick={handleClick}
      onTouchStart={handleTouch}
      role="button"
      aria-label={`查看 ${name} 的详细信息`}
      style={{ 
        animationDelay: `${index * 0.1}s`
      }}
    >
      <div 
        className={`relative w-full h-full transition-transform duration-300 ease-out ${
          isFlipped ? "rotate-y-180" : ""
        }`}
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          willChange: "transform",
        }}
      >
        {/* Front of card */}
        <div 
          className="absolute w-full h-full rounded-2xl overflow-hidden glass-effect"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Color gradient overlay */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              background: `linear-gradient(135deg, ${color} 0%, transparent 60%)`,
            }}
          />
          
          {/* Card content */}
          <div className="relative h-full p-4 sm:p-6 flex flex-col">
            {/* Wine glass icon - simplified for mobile */}
            <div className="flex-1 flex items-center justify-center">
              <div 
                className="w-16 h-22 sm:w-20 sm:h-28 rounded-t-full relative"
                style={{
                  background: `linear-gradient(180deg, ${color} 0%, ${color}88 100%)`,
                  boxShadow: `0 0 20px ${color}40`,
                  willChange: "box-shadow",
                }}
              >
                {/* Glass stem */}
                <div 
                  className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-1 h-10 sm:h-12 rounded-full"
                  style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
                />
                {/* Glass base */}
                <div 
                  className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-6 sm:w-8 h-1.5 sm:h-2 rounded-full"
                  style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
                />
                {/* Shine effect */}
                <div 
                  className="absolute top-2 left-2 sm:left-3 w-1.5 sm:w-2 h-5 sm:h-6 rounded-full opacity-40"
                  style={{ backgroundColor: "rgba(255,255,255,0.6)" }}
                />
              </div>
            </div>

            {/* Drink info */}
            <div className="text-center mt-3 sm:mt-4">
              <span 
                className="text-xs px-2 sm:px-3 py-0.5 sm:py-1 rounded-full mb-1 sm:mb-2 inline-block"
                style={{ 
                  backgroundColor: `${color}30`,
                  color: color,
                  border: `1px solid ${color}50`
                }}
              >
                {type}
              </span>
              <h3 className="text-base sm:text-lg font-serif text-text-primary mb-0.5 sm:mb-1">
                {name}
              </h3>
              <p className="text-text-secondary text-xs sm:text-sm">
                {alcohol} alc/vol
              </p>
            </div>

            {/* Tap hint for mobile */}
            <div className="absolute bottom-3 sm:bottom-4 left-0 right-0 text-center">
              <span className="text-text-secondary/50 text-xs">点击查看详情</span>
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div 
          className="absolute w-full h-full rounded-2xl overflow-hidden glass-effect p-4 sm:p-6"
          style={{ 
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              background: `linear-gradient(135deg, ${color} 0%, transparent 60%)`,
            }}
          />
          
          <div className="relative h-full flex flex-col">
            <h3 className="text-lg sm:text-xl font-serif text-text-primary mb-2 sm:mb-4">
              {name}
            </h3>
            
            <p className="text-text-secondary text-xs sm:text-sm flex-1 leading-relaxed overflow-y-auto mobile-scroll">
              {description}
            </p>
            
            <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-white/10">
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-text-secondary/50 text-xs">价格</span>
                  <p className="text-accent-gold text-lg sm:text-xl font-serif">{price}</p>
                </div>
                <button 
                  className="px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 active:scale-95 active:opacity-80"
                  style={{ 
                    backgroundColor: color,
                    boxShadow: `0 0 15px ${color}50`,
                    minWidth: "80px",
                    minHeight: "40px",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    // Order action
                  }}
                >
                  点一杯
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
