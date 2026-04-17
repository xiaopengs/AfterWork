'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface DrinkData {
  id: string;
  name: string;
  mood: string;
}

export default function BarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [drink, setDrink] = useState<DrinkData | null>(null);
  const [mood, setMood] = useState('');
  const pathname = usePathname();

  useEffect(() => {
    const savedDrink = sessionStorage.getItem('currentDrink');
    const savedMood = sessionStorage.getItem('currentMood');
    if (savedDrink) setDrink(JSON.parse(savedDrink));
    if (savedMood) setMood(savedMood);
  }, []);

    const navItems = [
    { href: '/bar', icon: '🍷', label: '品酒' },
    { href: '/bar/forum', icon: '💬', label: '论坛' },
    { href: '/bar/fortune', icon: '🔮', label: '占卜' },
    { href: '/memories', icon: '🎮', label: '回忆' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-primary">
      {/* Top Nav */}
      <header className="sticky top-0 z-50 glass-effect border-b border-white/5">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/" className="text-text-secondary hover:text-text-primary transition-colors">
            ← 入口
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-lg">🍷</span>
            <span className="font-serif text-text-primary">AfterWork</span>
          </div>
          <div className="w-12" />
        </div>
        
        {/* Drink status bar */}
        {drink && (
          <div 
            className="px-4 py-2 text-sm flex items-center gap-2 border-t border-white/5"
            style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
          >
            <span>{mood}</span>
            <span className="text-text-secondary">·</span>
            <span className="text-accent-wine">{drink.name}</span>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 pb-20">
        {children}
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 glass-effect border-t border-white/5">
        <div className="flex justify-around py-3">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 px-4 py-1 transition-colors ${
                pathname === item.href ? 'text-accent-gold' : 'text-text-secondary'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-xs">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
