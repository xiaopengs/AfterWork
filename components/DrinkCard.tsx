"use client";

import { useState } from "react";

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

  return (
    <div 
      className="relative h-80 perspective-1000 cursor-pointer"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      style={{ 
        animationDelay: `${index * 0.1}s`
      }}
    >
      <div 
        className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${
          isFlipped ? "rotate-y-180" : ""
        }`}
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
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
          <div className="relative h-full p-6 flex flex-col">
            {/* Wine glass icon */}
            <div className="flex-1 flex items-center justify-center">
              <div 
                className="w-20 h-28 rounded-t-full relative float-animation"
                style={{
                  background: `linear-gradient(180deg, ${color} 0%, ${color}88 100%)`,
                  boxShadow: `0 0 20px ${color}40`,
                }}
              >
                {/* Glass stem */}
                <div 
                  className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-1 h-12 rounded-full"
                  style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
                />
                {/* Glass base */}
                <div 
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-2 rounded-full"
                  style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
                />
                {/* Shine effect */}
                <div 
                  className="absolute top-2 left-3 w-2 h-6 rounded-full opacity-40"
                  style={{ backgroundColor: "rgba(255,255,255,0.6)" }}
                />
              </div>
            </div>

            {/* Drink info */}
            <div className="text-center mt-4">
              <span 
                className="text-xs px-3 py-1 rounded-full mb-2 inline-block"
                style={{ 
                  backgroundColor: `${color}30`,
                  color: color,
                  border: `1px solid ${color}50`
                }}
              >
                {type}
              </span>
              <h3 className="text-lg font-serif text-text-primary mb-1">
                {name}
              </h3>
              <p className="text-text-secondary text-sm">
                {alcohol} alc/vol
              </p>
            </div>

            {/* Hover hint */}
            <div className="absolute bottom-4 left-0 right-0 text-center">
              <span className="text-text-secondary/50 text-xs">悬停查看详情 →</span>
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div 
          className="absolute w-full h-full rounded-2xl overflow-hidden glass-effect p-6"
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
            <h3 className="text-xl font-serif text-text-primary mb-4">
              {name}
            </h3>
            
            <p className="text-text-secondary text-sm flex-1 leading-relaxed">
              {description}
            </p>
            
            <div className="mt-6 pt-4 border-t border-white/10">
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-text-secondary/50 text-xs">价格</span>
                  <p className="text-accent-gold text-xl font-serif">{price}</p>
                </div>
                <button 
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105"
                  style={{ 
                    backgroundColor: color,
                    boxShadow: `0 0 15px ${color}50`,
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
