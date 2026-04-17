"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import PouringGlass from "@/components/PouringGlass";

const moods = ["温暖", "深思", "俏皮", "荒诞", "裂隙", "分裂", "脆弱", "猎奇", "苦甜"];

const moodColors: Record<string, string> = {
  温暖: "#FF6B6B",
  深思: "#4ECDC4",
  俏皮: "#FFE66D",
  荒诞: "#95E1D3",
  裂隙: "#A8E6CF",
  分裂: "#DDA0DD",
  脆弱: "#87CEEB",
  猎奇: "#FF8C00",
  苦甜: "#8B4513",
};

const moodEmojis: Record<string, string> = {
  温暖: "🔥",
  深思: "🌊",
  俏皮: "✨",
  荒诞: "🎭",
  裂隙: "⚡",
  分裂: "🔀",
  脆弱: "🦋",
  猎奇: "🔮",
  苦甜: "🍫",
};

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
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Welcome text animation
  useEffect(() => {
    if (phase === "welcome") {
      const timer = setTimeout(() => {
        setPhase("mood");
      }, 2500);
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

  const handleMoodSelect = (mood: string) => {
    const color = moodColors[mood] || "#8B2942";
    setBgColor(color);
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
          ? `radial-gradient(ellipse at center, ${bgColor}30 0%, #0D0D0D 70%)`
          : "#0D0D0D",
        transition: "background 1s ease",
      }}
    >
      {/* Ambient particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white/20 animate-float-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Door animation overlay */}
      {phase === "door" && (
        <div className="absolute inset-0 flex items-center justify-center z-50">
          <div className="text-center animate-fade-in">
            <div className="text-6xl mb-8 animate-pulse">🚪</div>
            <p className="text-text-secondary text-lg tracking-widest">推开这扇门</p>
          </div>
        </div>
      )}

      {/* Welcome message */}
      {phase === "welcome" && (
        <div ref={welcomeRef} className="flex flex-col items-center justify-center min-h-screen px-6">
          <div className="text-center animate-welcome-in">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-text-primary mb-6">
              <span className="inline-block animate-char-in" style={{ animationDelay: "0.1s" }}>欢</span>
              <span className="inline-block animate-char-in" style={{ animationDelay: "0.2s" }}>迎</span>
              <span className="inline-block animate-char-in" style={{ animationDelay: "0.3s" }}>光</span>
              <span className="inline-block animate-char-in" style={{ animationDelay: "0.4s" }}>临</span>
            </h1>
            <p className="text-xl sm:text-2xl text-accent-wine font-light tracking-wider animate-char-in" style={{ animationDelay: "0.6s" }}>
              Welcome to AfterWork
            </p>
            <div className="mt-12 animate-char-in" style={{ animationDelay: "1s" }}>
              <p className="text-text-secondary text-sm tracking-widest">今夜，你想要什么？</p>
            </div>
          </div>
        </div>
      )}

      {/* Mood selection */}
      {(phase === "mood" || phase === "drink") && (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12 animate-content-in">
          <div className="text-center mb-8">
            <p className="text-text-secondary text-sm tracking-widest mb-2">此刻的心情</p>
            <h2 className="text-2xl sm:text-3xl font-serif text-text-primary">
              {phase === "drink" ? (
                <span style={{ color: bgColor }}>我明白了</span>
              ) : (
                "你正在感受..."
              )}
            </h2>
          </div>

          {/* Mood grid */}
          <div className="grid grid-cols-3 gap-3 max-w-md w-full mb-8">
            {moods.map((mood, index) => (
              <button
                key={mood}
                onClick={() => handleMoodSelect(mood)}
                className="p-4 rounded-2xl text-center transition-all duration-300 hover:scale-105 active:scale-95"
                style={{
                  background: `linear-gradient(135deg, ${moodColors[mood]}15, ${moodColors[mood]}05)`,
                  border: `1px solid ${moodColors[mood]}30`,
                  animation: `fade-in-up 0.4s ease forwards`,
                  animationDelay: `${index * 0.05}s`,
                  opacity: 0,
                }}
              >
                <span className="text-2xl block mb-1">{moodEmojis[mood]}</span>
                <span className="text-xs text-text-primary">{mood}</span>
              </button>
            ))}
          </div>

          {/* Drinks selection - only show after mood selected */}
          {showDrinks && (
            <div className="w-full max-w-md animate-content-in">
              <p className="text-center text-text-secondary text-sm mb-4">为你甄选</p>
              <div className="space-y-3">
                {drinks
                  .filter((d) => d.mood === (selectedDrink?.mood || "温暖"))
                  .map((drink, index) => (
                    <button
                      key={drink.id}
                      onClick={() => handleDrinkSelect(drink)}
                      className="w-full p-4 rounded-2xl text-left transition-all duration-300"
                      style={{
                        background:
                          selectedDrink?.id === drink.id
                            ? `${drink.color}20`
                            : "rgba(255,255,255,0.03)",
                        border: `1px solid ${
                          selectedDrink?.id === drink.id ? drink.color : "rgba(255,255,255,0.1)"
                        }`,
                        animation: `fade-in-up 0.3s ease forwards`,
                        animationDelay: `${index * 0.1}s`,
                        opacity: 0,
                      }}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ background: drink.color, boxShadow: `0 0 10px ${drink.color}` }}
                        />
                        <div className="flex-1">
                          <h3 className="text-text-primary font-medium">{drink.name}</h3>
                          <p className="text-xs text-text-secondary mt-0.5">{drink.desc}</p>
                        </div>
                        {selectedDrink?.id === drink.id && (
                          <span className="text-lg" style={{ color: drink.color }}>✓</span>
                        )}
                      </div>
                    </button>
                  ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Pouring glass animation when drink selected */}
      {selectedDrink && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-40 animate-content-in">
          <PouringGlass color={selectedDrink.color} />
        </div>
      )}

      {/* Ready state - Enter button */}
      {phase === "ready" && selectedDrink && (
        <div className="fixed bottom-12 left-0 right-0 flex flex-col items-center z-50 animate-content-in">
          <button
            onClick={handleEnter}
            className="px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
              background: `linear-gradient(135deg, ${selectedDrink.color}, ${selectedDrink.color}99)`,
              boxShadow: `0 0 30px ${selectedDrink.color}50, 0 10px 40px rgba(0,0,0,0.5)`,
              color: "#F5F5F5",
            }}
          >
            <span className="tracking-widest">请 进</span>
          </button>
          <p className="text-text-secondary text-xs mt-4 tracking-widest">
            你的 {selectedDrink.name} 已备好
          </p>
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
            <p className="text-accent-wine text-lg tracking-widest animate-pulse">
              正在入座...
            </p>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes char-appear {
          from {
            opacity: 0;
            transform: translateY(20px) rotateX(-90deg);
          }
          to {
            opacity: 1;
            transform: translateY(0) rotateX(0);
          }
        }

        @keyframes welcome-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes content-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float-particle {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0.2;
          }
          50% {
            transform: translateY(-30px) translateX(10px);
            opacity: 0.5;
          }
        }

        @keyframes fade-to-black {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-char-in {
          animation: char-appear 0.6s ease forwards;
          opacity: 0;
        }

        .animate-welcome-in {
          animation: welcome-in 1s ease forwards;
        }

        .animate-content-in {
          animation: content-in 0.6s ease forwards;
        }

        .animate-float-particle {
          animation: float-particle 5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
