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
    // 检查用户登录状态
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
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    router.push('/');
  };

  const navItems = [
    { href: "/", label: "首页", icon: "🏠" },
    { href: "/bar", label: "品酒间", icon: "🍷" },
    { href: "/fortune", label: "占卜", icon: "🎴" },
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

          {/* User / Auth */}
          <div className="flex items-center gap-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-accent-wine/20 text-accent-gold hover:bg-accent-wine/30 transition-all"
                >
                  <span>👤</span>
                  <span className="hidden sm:inline">{user.username}</span>
                </button>
                {showMenu && (
                  <div className="absolute right-0 mt-2 w-40 py-2 glass-effect rounded-lg border border-white/10">
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left text-text-secondary hover:text-red-400 hover:bg-white/5 transition-all"
                    >
                      退出登录
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 rounded-lg bg-accent-wine/20 text-accent-gold hover:bg-accent-wine/30 transition-all"
              >
                登录
              </Link>
            )}
          </div>

          {/* Mobile menu */}
          <div className="md:hidden flex items-center space-x-3">
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
