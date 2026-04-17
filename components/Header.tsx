"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<{ id: string; username: string } | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [mounted, setMounted] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      const userStr = localStorage.getItem("user");
      if (token && userStr) {
        try {
          setUser(JSON.parse(userStr));
        } catch {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }
      }
    }
  }, [pathname]);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setShowUserMenu(false);
      }
    };
    
    if (showUserMenu) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showUserMenu]);

  // Close mobile menu on route change
  useEffect(() => {
    setShowMobileMenu(false);
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setShowUserMenu(false);
    router.push("/");
  };

  const navItems = [
    { href: "/", label: "首页", icon: "🏠" },
    { href: "/bar", label: "品酒间", icon: "🍷" },
    { href: "/fortune", label: "占卜", icon: "🎴" },
    { href: "/memories", label: "回忆墙", icon: "📜" },
  ];

  const NavContent = ({ mobile = false }: { mobile?: boolean }) => (
    <div className={`${mobile ? "flex flex-col py-4 space-y-1" : "hidden md:flex items-center gap-1"}`}>
      {navItems.map((item, index) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`
              ${mobile 
                ? "flex items-center gap-3 px-4 py-3 rounded-xl transition-all" 
                : "flex items-center gap-2 px-4 py-2 rounded-lg transition-all"
              }
              ${isActive 
                ? "bg-[rgba(139,41,66,0.25)] text-[#D4A574]" 
                : "text-[#A0A0A0] hover:text-[#F5F5F5] hover:bg-white/5"
              }
            `}
            style={mounted ? { animationDelay: `${index * 80}ms` } : undefined}
          >
            <span className={mobile ? "text-xl" : "text-base"}>{item.icon}</span>
            <span className={mobile ? "text-base" : "text-sm"}>{item.label}</span>
            {isActive && (
              <span className={`
                ${mobile ? "ml-auto w-2 h-2" : "absolute right-2 w-1.5 h-1.5"}
                rounded-full bg-[#D4A574]
              `} />
            )}
          </Link>
        );
      })}
    </div>
  );

  return (
    <header 
      className={`
        fixed top-0 left-0 right-0 z-50 
        bg-[rgba(26,26,26,0.75)] backdrop-blur-[12px] 
        border-b border-[rgba(255,255,255,0.08)]
        safe-area-top
        ${mounted ? "animate-fade-in" : "opacity-0"}
      `}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-2 group touch-manipulation"
          >
            <span className="text-xl sm:text-2xl transition-transform duration-200 group-active:scale-90">
              🍷
            </span>
            <span className="text-lg sm:text-xl font-serif text-[#D4A574] neon-glow-gold hidden sm:block">
              午后酒馆
            </span>
          </Link>

          {/* Desktop Navigation */}
          <NavContent />

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* User Menu */}
            <div ref={userMenuRef} className="relative">
              {user ? (
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className={`
                    flex items-center gap-2 px-3 py-2 rounded-xl
                    bg-[rgba(139,41,66,0.2)] text-[#D4A574]
                    hover:bg-[rgba(139,41,66,0.35)] transition-all
                    active:scale-95 touch-manipulation min-h-[44px]
                  `}
                  aria-label="用户菜单"
                  aria-expanded={showUserMenu}
                >
                  <span>👤</span>
                  <span className="hidden sm:inline text-sm">{user.username}</span>
                  <svg 
                    className={`w-4 h-4 transition-transform ${showUserMenu ? "rotate-180" : ""}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              ) : (
                <Link
                  href="/login"
                  className={`
                    px-4 py-2 rounded-xl
                    bg-[rgba(139,41,66,0.2)] text-[#D4A574]
                    hover:bg-[rgba(139,41,66,0.35)] transition-all
                    active:scale-95 touch-manipulation text-sm
                    min-h-[44px] flex items-center
                  `}
                >
                  登录
                </Link>
              )}

              {/* User Dropdown */}
              {showUserMenu && user && createPortal(
                <div 
                  className="fixed inset-0 z-40"
                  onClick={() => setShowUserMenu(false)}
                >
                  <div 
                    className="absolute right-4 top-auto mt-2 w-40 py-2 z-50
                      bg-[rgba(26,26,26,0.95)] backdrop-blur-[12px] 
                      border border-[rgba(255,255,255,0.1)]
                      rounded-xl shadow-2xl
                      animate-scale-in"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="px-4 py-2 border-b border-[rgba(255,255,255,0.08)]">
                      <p className="text-sm text-[#F5F5F5]">{user.username}</p>
                      <p className="text-xs text-[#A0A0A0] truncate">{user.id}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-3 text-left text-[#A0A0A0] 
                        hover:text-red-400 hover:bg-white/5 transition-all
                        flex items-center gap-2 min-h-[44px]"
                    >
                      <span>🚪</span>
                      <span className="text-sm">退出登录</span>
                    </button>
                  </div>
                </div>,
                document.body
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 rounded-lg hover:bg-white/5 transition-all min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="菜单"
              aria-expanded={showMobileMenu}
            >
              <div className="w-5 h-4 flex flex-col justify-between">
                <span className={`
                  w-full h-0.5 bg-[#F5F5F5] rounded-full transition-all duration-300 origin-center
                  ${showMobileMenu ? "rotate-45 translate-y-1.5" : ""}
                `} />
                <span className={`
                  w-full h-0.5 bg-[#F5F5F5] rounded-full transition-all duration-300
                  ${showMobileMenu ? "opacity-0 scale-0" : ""}
                `} />
                <span className={`
                  w-full h-0.5 bg-[#F5F5F5] rounded-full transition-all duration-300 origin-center
                  ${showMobileMenu ? "-rotate-45 -translate-y-1.5" : ""}
                `} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div 
            className="md:hidden border-t border-[rgba(255,255,255,0.08)] animate-fade-in"
            onClick={() => setShowMobileMenu(false)}
          >
            <NavContent mobile />
          </div>
        )}
      </nav>
    </header>
  );
}
