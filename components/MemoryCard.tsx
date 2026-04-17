"use client";

import { useState } from "react";

interface MemoryCardProps {
  id: string | number;
  title: string;
  content: string;
  mood: string;
  date: string;
  wine?: string;
  color: string;
  emoji: string;
}

export default function MemoryCard({
  title,
  content,
  mood,
  date,
  wine,
  color,
  emoji,
}: MemoryCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const moodColors: Record<string, string> = {
    "微醺": "#8B2942",
    "沉醉": "#9B59B6",
    "愉悦": "#D4A574",
    "放松": "#4ECDC4",
    "怀念": "#A0A0A0",
  };

  const moodColor = moodColors[mood] || color;

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div 
      className="relative touch-manipulation"
    >
      {/* Card */}
      <div 
        className="relative rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 active:scale-[0.98]"
        style={{
          background: "linear-gradient(145deg, #1A1A1A 0%, #252525 100%)",
          border: `1px solid ${moodColor}30`,
          boxShadow: `0 2px 12px ${moodColor}15`,
          willChange: 'transform',
        }}
        onClick={handleClick}
        onTouchStart={(e) => e.currentTarget.style.opacity = '0.9'}
        onTouchEnd={(e) => e.currentTarget.style.opacity = '1'}
        role="button"
        aria-expanded={isExpanded}
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      >
        {/* Top decorative bar */}
        <div 
          className="h-0.5 sm:h-1"
          style={{ background: `linear-gradient(90deg, ${moodColor}, ${moodColor}00)` }}
        />

        <div className="p-4 sm:p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-3 sm:mb-4 gap-2">
            <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
              <span className="text-2xl sm:text-3xl flex-shrink-0">{emoji}</span>
              <div className="min-w-0">
                <h3 className="text-sm sm:text-lg font-serif text-text-primary truncate">
                  {title}
                </h3>
                <p className="text-xs text-text-secondary">{date}</p>
              </div>
            </div>
            
            <span 
              className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs flex-shrink-0"
              style={{ 
                backgroundColor: `${moodColor}20`,
                color: moodColor,
                border: `1px solid ${moodColor}40`,
              }}
            >
              {mood}
            </span>
          </div>

          {/* Content */}
          <p 
            className={`text-text-secondary text-xs sm:text-sm leading-relaxed transition-all duration-200 ${
              isExpanded ? "" : "line-clamp-2 sm:line-clamp-3"
            }`}
          >
            {content}
          </p>

          {/* Wine tag */}
          {wine && (
            <div className="mt-3 sm:mt-4 flex items-center space-x-2">
              <span className="text-accent-gold text-sm sm:text-base">🍷</span>
              <span className="text-accent-gold/80 text-xs sm:text-sm truncate">{wine}</span>
            </div>
          )}

          {/* Expand indicator */}
          <div className="mt-3 sm:mt-4 text-center">
            <span className="text-text-secondary/50 text-xs">
              {isExpanded ? "点击收起 ↑" : "点击展开 ↓"}
            </span>
          </div>
        </div>
      </div>

      {/* Decorative corner elements */}
      <div 
        className="absolute -top-0.5 -right-0.5 w-3 h-3 sm:w-4 sm:h-4 border-t border-r rounded-tr opacity-30"
        style={{ borderColor: moodColor }}
      />
      <div 
        className="absolute -bottom-0.5 -left-0.5 w-3 h-3 sm:w-4 sm:h-4 border-b border-l rounded-bl opacity-30"
        style={{ borderColor: moodColor }}
      />
    </div>
  );
}
