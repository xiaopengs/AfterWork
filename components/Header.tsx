"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "首页", icon: "🏠" },
    { href: "/bar", label: "品酒间", icon: "🍷" },
    { href: "/memories", label: "回忆墙", icon: "📜" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-effect">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <span className="text-2xl group-hover:scale-110 transition-transform">🍷</span>
            <span className="text-xl font-serif text-accent-gold neon-glow-gold">
              午后酒馆
            </span>
          </Link>

          {/* Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    isActive 
                      ? "bg-accent-wine/20 text-accent-gold" 
                      : "text-text-secondary hover:text-text-primary hover:bg-white/5"
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-gold animate-pulse" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Time display */}
          <div className="hidden lg:block text-right">
            <p className="text-text-secondary text-xs">
              {new Date().toLocaleDateString("zh-CN", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          {/* Mobile menu */}
          <div className="md:hidden flex items-center space-x-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-xl ${isActive ? "scale-110" : "opacity-60"} transition-transform`}
                  title={item.label}
                >
                  {item.icon}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </header>
  );
}
