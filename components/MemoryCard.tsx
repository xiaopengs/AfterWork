"use client";

import { useState } from "react";

interface MemoryCardProps {
  id: number;
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

  return (
    <div 
      className="relative group"
      style={{
        animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`,
        animationDelay: `${Math.random() * 2}s`,
      }}
    >
      {/* Card */}
      <div 
        className="relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:z-10"
        style={{
          background: "linear-gradient(145deg, #1A1A1A 0%, #252525 100%)",
          border: `1px solid ${moodColor}30`,
          boxShadow: `0 4px 20px ${moodColor}20`,
        }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Top decorative bar */}
        <div 
          className="h-1"
          style={{ background: `linear-gradient(90deg, ${moodColor}, ${moodColor}00)` }}
        />

        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <span className="text-3xl">{emoji}</span>
              <div>
                <h3 className="text-lg font-serif text-text-primary">
                  {title}
                </h3>
                <p className="text-xs text-text-secondary">{date}</p>
              </div>
            </div>
            
            <span 
              className="px-3 py-1 rounded-full text-xs"
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
            className={`text-text-secondary text-sm leading-relaxed transition-all duration-300 ${
              isExpanded ? "" : "line-clamp-2"
            }`}
          >
            {content}
          </p>

          {/* Wine tag */}
          {wine && (
            <div className="mt-4 flex items-center space-x-2">
              <span className="text-accent-gold">🍷</span>
              <span className="text-accent-gold/80 text-sm">{wine}</span>
            </div>
          )}

          {/* Expand indicator */}
          <div className="mt-4 text-center">
            <span className="text-text-secondary/50 text-xs">
              {isExpanded ? "点击收起 ↑" : "点击展开 ↓"}
            </span>
          </div>
        </div>

        {/* Glow effect on hover */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 0%, ${moodColor}20 0%, transparent 60%)`,
          }}
        />
      </div>

      {/* Decorative corner elements */}
      <div 
        className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 rounded-tr-lg opacity-30"
        style={{ borderColor: moodColor }}
      />
      <div 
        className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 rounded-bl-lg opacity-30"
        style={{ borderColor: moodColor }}
      />
    </div>
  );
}
