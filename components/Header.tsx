"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<{ id: string; username: string } | null>(null);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    // Check user login status - only on client
    if (typeof window !== "undefined") {
      const token = localStorage.getItem('token');
      const userStr = localStorage.getItem('user');
      if (token && userStr) {
        try {
          setUser(JSON.parse(userStr));
        } catch {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      }
    }
  }, [pathname]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClick = () => setShowMenu(false);
    if (showMenu) {
      document.addEventListener('click', handleClick);
      return () => document.removeEventListener('click', handleClick);
    }
  }, [showMenu]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setShowMenu(false);
    router.push('/');
  };

  const navItems = [
    { href: "/", label: "首页", icon: "🏠" },
    { href: "/bar", label: "品酒间", icon: "🍷" },
    { href: "/fortune", label: "占卜", icon: "🎴" },
    { href: "/memories", label: "回忆墙", icon: "📜" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-effect safe-area-top">
      <nav className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-2 group touch-manipulation"
          >
            <span className="text-xl sm:text-2xl transition-transform active:scale-90">🍷</span>
            <span className="text-lg sm:text-xl font-serif text-accent-gold neon-glow-gold">
              午后酒馆
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 active:scale-95 ${
                    isActive 
                      ? "bg-accent-wine/20 text-accent-gold" 
                      : "text-text-secondary hover:text-text-primary hover:bg-white/5"
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-gold" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* User / Auth */}
          <div className="flex items-center gap-2 sm:gap-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowMenu(!showMenu);
                  }}
                  className="flex items-center gap-2 px-2 sm:px-3 py-1.5 rounded-lg bg-accent-wine/20 text-accent-gold hover:bg-accent-wine/30 transition-all active:scale-95 touch-manipulation"
                  aria-label="用户菜单"
                  aria-expanded={showMenu}
                >
                  <span>👤</span>
                  <span className="hidden sm:inline text-sm">{user.username}</span>
                </button>
                {showMenu && (
                  <div 
                    className="absolute right-0 mt-2 w-36 sm:w-40 py-2 glass-effect rounded-lg border border-white/10"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2.5 text-left text-text-secondary hover:text-red-400 hover:bg-white/5 transition-all active:bg-white/10 text-sm"
                    >
                      退出登录
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="px-3 sm:px-4 py-2 rounded-lg bg-accent-wine/20 text-accent-gold hover:bg-accent-wine/30 transition-all active:scale-95 touch-manipulation text-sm"
              >
                登录
              </Link>
            )}
          </div>

          {/* Mobile Navigation - Simplified Icons */}
          <div className="md:hidden flex items-center space-x-2 sm:space-x-3">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-lg sm:text-xl p-1 active:scale-90 transition-transform ${
                    isActive ? "opacity-100 scale-110" : "opacity-50"
                  }`}
                  title={item.label}
                  aria-label={item.label}
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
