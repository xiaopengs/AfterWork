"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import PouringGlass from "@/components/PouringGlass";
import { GlowText, FadeIn, Card, Badge } from "@/components/ui";

const moods = [
  { name: "温暖", emoji: "🔥", color: "#FF6B6B", desc: "寻找温度" },
  { name: "深思", emoji: "🌊", color: "#4ECDC4", desc: "整理思绪" },
  { name: "俏皮", emoji: "✨", color: "#FFE66D", desc: "轻松一刻" },
  { name: "猎奇", emoji: "🔮", color: "#FF8C00", desc: "探索未知" },
  { name: "裂隙", emoji: "⚡", color: "#A8E6CF", desc: "突破边界" },
  { name: "脆弱", emoji: "🦋", color: "#87CEEB", desc: "释放情绪" },
  { name: "分裂", emoji: "🔀", color: "#DDA0DD", desc: "释放自我" },
  { name: "苦甜", emoji: "🍫", color: "#8B4513", desc: "品味人生" },
  { name: "荒诞", emoji: "🎭", color: "#95E1D3", desc: "打破常规" },
];

const drinks = [
  { id: "1", name: "落日威士忌", mood: "温暖", color: "#D4A574", desc: "如落日般温暖的威士忌" },
  { id: "2", name: "月光马天尼", mood: "深思", color: "#C0C0C0", desc: "适合独自沉思的夜晚" },
  { id: "3", name: "彩虹气泡", mood: "俏皮", color: "#FF6B9D", desc: "带着气泡的甜蜜" },
];

interface Drink {
  id: string;
  name: string;
  mood: string;
  color: string;
  desc: string;
}

export default function HomePage() {
  const [phase, setPhase] = useState<"door" | "welcome" | "mood" | "drink" | "ready">("door");
  const [showDrinks, setShowDrinks] = useState(false);
  const [selectedDrink, setSelectedDrink] = useState<Drink | null>(null);
  const [bgColor, setBgColor] = useState<string>("#0D0D0D");
  const [isEntering, setIsEntering] = useState(false);
  const router = useRouter();
  const welcomeRef = useRef<HTMLDivElement>(null);

  // Door opening animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase("welcome");
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Welcome text animation
  useEffect(() => {
    if (phase === "welcome") {
      const timer = setTimeout(() => {
        setPhase("mood");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  // After mood selected, show drinks
  useEffect(() => {
    if (selectedDrink) {
      const timer = setTimeout(() => {
        setPhase("ready");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [selectedDrink]);

  const handleMoodSelect = (mood: typeof moods[0]) => {
    setBgColor(mood.color);
    setPhase("drink");
    setShowDrinks(true);
  };

  const handleDrinkSelect = (drink: Drink) => {
    setSelectedDrink(drink);
    setBgColor(drink.color);
  };

  const handleEnter = () => {
    if (!selectedDrink) return;
    setIsEntering(true);
    setTimeout(() => {
      sessionStorage.setItem("currentDrink", JSON.stringify(selectedDrink));
      sessionStorage.setItem("currentMood", selectedDrink.mood);
      router.push("/bar");
    }, 800);
  };

  return (
    <div
      className="min-h-screen overflow-hidden relative"
      style={{
        background: isEntering
          ? "#000"
          : phase === "mood" || phase === "drink" || phase === "ready"
          ? `radial-gradient(ellipse at center, ${bgColor}25 0%, #0D0D0D 70%)`
          : "#0D0D0D",
        transition: "background 1.2s ease",
      }}
    >
      {/* Ambient particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full animate-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: i % 3 === 0 ? "#D4A574" : "rgba(255,255,255,0.15)",
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${4 + Math.random() * 6}s`,
              width: `${1 + Math.random() * 2}px`,
              height: `${1 + Math.random() * 2}px`,
            }}
          />
        ))}
      </div>

      {/* Door animation overlay */}
      {phase === "door" && (
        <div className="absolute inset-0 flex items-center justify-center z-50">
          <FadeIn>
            <div className="text-center">
              <div className="relative">
                <div className="text-8xl mb-8 animate-pulse-slow">🚪</div>
                <div 
                  className="absolute inset-0 blur-xl opacity-50"
                  style={{ background: "radial-gradient(circle, #8B294240 0%, transparent 70%)" }}
                />
              </div>
              <p className="text-[#A0A0A0] text-lg tracking-[0.3em] animate-pulse-subtle">
                推开这扇门
              </p>
            </div>
          </FadeIn>
        </div>
      )}

      {/* Welcome message */}
      {phase === "welcome" && (
        <div ref={welcomeRef} className="flex flex-col items-center justify-center min-h-screen px-6">
          <FadeIn delay={0} duration={1}>
            <div className="text-center">
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif text-[#F5F5F5] mb-6 tracking-wide">
                <span className="inline-block animate-char-in" style={{ animationDelay: "0.1s" }}>欢</span>
                <span className="inline-block animate-char-in" style={{ animationDelay: "0.2s" }}>迎</span>
                <span className="inline-block animate-char-in" style={{ animationDelay: "0.3s" }}>光</span>
                <span className="inline-block animate-char-in" style={{ animationDelay: "0.4s" }}>临</span>
              </h1>
              <GlowText color="#D4A574" className="text-2xl sm:text-3xl font-light tracking-[0.2em] animate-char-in" style={{ animationDelay: "0.6s" }}>
                Welcome to AfterWork
              </GlowText>
              <FadeIn delay={1200}>
                <div className="mt-16">
                  <p className="text-[#A0A0A0] text-sm tracking-[0.3em]">
                    今夜，你想要什么？
                  </p>
                </div>
              </FadeIn>
            </div>
          </FadeIn>
        </div>
      )}

      {/* Mood selection */}
      {(phase === "mood" || phase === "drink") && (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12">
          <FadeIn delay={0}>
            <div className="text-center mb-10">
              <p className="text-[#A0A0A0] text-xs tracking-[0.4em] uppercase mb-3">此刻的心情</p>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#F5F5F5]">
                {phase === "drink" ? (
                  <GlowText color={bgColor}>我明白了</GlowText>
                ) : (
                  "你正在感受..."
                )}
              </h2>
            </div>
          </FadeIn>

          {/* Mood grid */}
          <div className="grid grid-cols-3 gap-4 max-w-lg w-full mb-10">
            {moods.map((mood, index) => (
              <FadeIn key={mood.name} delay={index * 60} duration={0.4}>
                <button
                  onClick={() => handleMoodSelect(mood)}
                  className="p-5 rounded-2xl text-center transition-all duration-300 hover:scale-105 active:scale-95 group"
                  style={{
                    background: `linear-gradient(135deg, ${mood.color}15, ${mood.color}05)`,
                    border: `1px solid ${mood.color}30`,
                  }}
                >
                  <span className="text-3xl block mb-2 transition-transform duration-300 group-hover:scale-110">
                    {mood.emoji}
                  </span>
                  <span className="text-sm text-[#F5F5F5] font-medium block mb-1">{mood.name}</span>
                  <span className="text-xs text-[#A0A0A0]">{mood.desc}</span>
                </button>
              </FadeIn>
            ))}
          </div>

          {/* Drinks selection - only show after mood selected */}
          {showDrinks && (
            <FadeIn delay={200} direction="up">
              <div className="w-full max-w-md">
                <div className="text-center mb-6">
                  <Badge color="#D4A574">为你甄选</Badge>
                </div>
                <div className="space-y-3">
                  {drinks
                    .filter((d) => d.mood === "温暖")
                    .map((drink, index) => (
                      <Card
                        key={drink.id}
                        hover={false}
                        className={`
                          cursor-pointer transition-all duration-300
                          hover:scale-[1.02] active:scale-[0.98]
                          ${selectedDrink?.id === drink.id ? "ring-2" : ""}
                        `}
                        glow={selectedDrink?.id === drink.id ? drink.color : undefined}
                      >
                        <button
                          onClick={() => handleDrinkSelect(drink)}
                          className="w-full text-left"
                        >
                          <div className="flex items-center gap-4">
                            <div
                              className="w-4 h-12 rounded-full shrink-0"
                              style={{
                                background: `linear-gradient(to bottom, ${drink.color}, ${drink.color}40)`,
                                boxShadow: `0 0 15px ${drink.color}50`,
                              }}
                            />
                            <div className="flex-1">
                              <h3 className="text-[#F5F5F5] font-medium">{drink.name}</h3>
                              <p className="text-xs text-[#A0A0A0] mt-0.5">{drink.desc}</p>
                            </div>
                            {selectedDrink?.id === drink.id && (
                              <span className="text-lg" style={{ color: drink.color }}>✓</span>
                            )}
                          </div>
                        </button>
                      </Card>
                    ))}
                </div>
              </div>
            </FadeIn>
          )}
        </div>
      )}

      {/* Pouring glass animation when drink selected */}
      {selectedDrink && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-40">
          <FadeIn>
            <PouringGlass color={selectedDrink.color} />
          </FadeIn>
        </div>
      )}

      {/* Ready state - Enter button */}
      {phase === "ready" && selectedDrink && (
        <div className="fixed bottom-16 left-0 right-0 flex flex-col items-center z-50 px-6">
          <FadeIn direction="up">
            <button
              onClick={handleEnter}
              className="px-12 py-5 rounded-full text-lg font-medium tracking-[0.3em] transition-all duration-300 hover:scale-105 active:scale-95"
              style={{
                background: `linear-gradient(135deg, ${selectedDrink.color}, ${selectedDrink.color}99)`,
                boxShadow: `0 0 40px ${selectedDrink.color}40, 0 15px 50px rgba(0,0,0,0.5)`,
                color: "#F5F5F5",
              }}
            >
              请 进
            </button>
            <p className="text-[#A0A0A0] text-xs mt-6 tracking-[0.3em]">
              你的 <span style={{ color: selectedDrink.color }}>{selectedDrink.name}</span> 已备好
            </p>
          </FadeIn>
        </div>
      )}

      {/* Enter animation overlay */}
      {isEntering && (
        <div
          className="absolute inset-0 z-50 flex items-center justify-center"
          style={{
            background: "#000",
            animation: "fade-to-black 0.8s ease forwards",
          }}
        >
          <div className="text-center">
            <GlowText color="#8B2942">
              <p className="text-lg tracking-[0.3em] animate-pulse-subtle">
                正在入座...
              </p>
            </GlowText>
          </div>
        </div>
      )}

      {/* Navigation link */}
      <div className="fixed top-6 right-6 z-50">
        <a
          href="/drinks"
          className="text-[#A0A0A0] hover:text-[#D4A574] transition-colors duration-300 text-sm tracking-wider"
        >
          全部酒款 →
        </a>
      </div>

      <style jsx global>{`
        @keyframes char-appear {
          from {
            opacity: 0;
            transform: translateY(30px) scaleY(0);
          }
          to {
            opacity: 1;
            transform: translateY(0) scaleY(1);
          }
        }

        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        @keyframes fade-to-black {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes particle {
          0%, 100% {
            transform: translate(0, 0);
            opacity: 0.3;
          }
          25% {
            transform: translate(20px, -30px);
            opacity: 0.6;
          }
          50% {
            transform: translate(-10px, -50px);
            opacity: 0.4;
          }
          75% {
            transform: translate(30px, -20px);
            opacity: 0.5;
          }
        }

        .animate-char-in {
          animation: char-appear 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }

        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }

        .animate-particle {
          animation: particle 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}