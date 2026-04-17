"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface DrinkData {
  id: string;
  name: string;
  mood: string;
  color?: string;
}

export default function BarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [drink, setDrink] = useState<DrinkData | null>(null);
  const [mood, setMood] = useState("");
  const [isEntering, setIsEntering] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const savedDrink = sessionStorage.getItem("currentDrink");
    const savedMood = sessionStorage.getItem("currentMood");
    if (savedDrink) setDrink(JSON.parse(savedDrink));
    if (savedMood) setMood(savedMood);

    // Entrance animation
    const timer = setTimeout(() => {
      setIsEntering(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const navItems = [
    { href: "/bar", icon: "🍷", label: "品酒" },
    { href: "/bar/forum", icon: "💬", label: "论坛" },
    { href: "/bar/fortune", icon: "🔮", label: "占卜" },
    { href: "/memories", icon: "🎮", label: "回忆" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-primary relative overflow-hidden">
      {/* Subtle background glow based on drink color */}
      {drink?.color && (
        <div
          className="fixed inset-0 pointer-events-none opacity-20"
          style={{
            background: `radial-gradient(ellipse at top, ${drink.color}15 0%, transparent 60%)`,
          }}
        />
      )}

      {/* Top status bar - simplified */}
      <header
        className="sticky top-0 z-50 transition-all duration-500"
        style={{
          background: isEntering
            ? "rgba(13, 13, 13, 0)"
            : "rgba(26, 26, 26, 0.85)",
          backdropFilter: isEntering ? "none" : "blur(12px)",
          WebkitBackdropFilter: isEntering ? "none" : "blur(12px)",
        }}
      >
        <div className="flex items-center justify-between px-4 py-2.5">
          <Link
            href="/"
            className="text-text-secondary hover:text-text-primary transition-colors text-sm flex items-center gap-1"
          >
            <span className="text-xs">←</span>
            <span className="hidden sm:inline">入口</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="text-base">🍷</span>
            <span className="font-serif text-text-primary text-sm hidden sm:inline">
              AfterWork
            </span>
          </div>

          {/* Drink indicator */}
          {drink && (
            <div
              className="flex items-center gap-2 px-2 py-1 rounded-full text-xs transition-all duration-300"
              style={{
                background: `${drink.color || "#8B2942"}15`,
                border: `1px solid ${drink.color || "#8B2942"}30`,
              }}
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{
                  background: drink.color || "#8B2942",
                  boxShadow: `0 0 6px ${drink.color || "#8B2942"}`,
                }}
              />
              <span className="text-text-primary hidden sm:inline">{drink.name}</span>
            </div>
          )}
        </div>
      </header>

      {/* Main content with entrance animation */}
      <main
        className={`flex-1 pb-24 transition-all duration-700 ${
          isEntering ? "translate-y-8 opacity-0" : "translate-y-0 opacity-100"
        }`}
      >
        {children}
      </main>

      {/* Bottom nav - floating style */}
      <nav
        className="fixed bottom-4 left-4 right-4 z-50 transition-all duration-500"
        style={{
          transform: isEntering ? "translateY(20px)" : "translateY(0)",
          opacity: isEntering ? 0 : 1,
        }}
      >
        <div
          className="max-w-md mx-auto rounded-2xl px-2 py-2 flex justify-around"
          style={{
            background: "rgba(26, 26, 26, 0.9)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05) inset",
          }}
        >
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl
                  transition-all duration-300 min-w-[60px]
                  ${isActive ? "scale-105" : "hover:scale-102"}
                `}
                style={{
                  background: isActive
                    ? `${drink?.color || "#8B2942"}20`
                    : "transparent",
                  color: isActive
                    ? drink?.color || "#8B2942"
                    : "#A0A0A0",
                }}
              >
                <span className="text-lg">{item.icon}</span>
                <span
                  className="text-[10px] tracking-wide"
                  style={{
                    fontWeight: isActive ? 500 : 400,
                    textShadow: isActive
                      ? `0 0 10px ${drink?.color || "#8B2942"}50`
                      : "none",
                  }}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Safe area for notched devices */}
      <div
        className="fixed bottom-0 left-0 right-0 h-safe-area-inset-bottom pointer-events-none z-40"
        style={{
          background:
            "linear-gradient(to top, rgba(13, 13, 13, 0.8), transparent)",
        }}
      />
    </div>
  );
}
