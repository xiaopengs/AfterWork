'use client';

import { useState } from 'react';
import { Drink, getMoodColor } from '@/lib/drinks-data';

interface DrinkCardFullProps {
  drink: Drink;
  onSelect?: (drink: Drink) => void;
}

export default function DrinkCardFull({ drink, onSelect }: DrinkCardFullProps) {
  const [showModal, setShowModal] = useState(false);
  const moodColor = getMoodColor(drink.mood);

  const handleClick = () => {
    setShowModal(true);
    onSelect?.(drink);
  };

  return (
    <>
      <div 
        className="glass-effect rounded-xl p-6 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:border-accent-gold/30"
        onClick={handleClick}
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-serif text-text-primary mb-1">{drink.name}</h3>
            <span className="text-xs text-text-secondary tracking-widest">{drink.nameEn}</span>
          </div>
          <span 
            className="px-3 py-1 rounded-full text-xs"
            style={{ 
              backgroundColor: `${moodColor}20`,
              color: moodColor,
              border: `1px solid ${moodColor}50`
            }}
          >
            {drink.mood}
          </span>
        </div>

        <p className="text-text-secondary text-sm leading-relaxed mb-4 font-serif italic">
          &ldquo;{drink.desc}&rdquo;
        </p>

        {/* Effect bars */}
        <div className="grid grid-cols-4 gap-2">
          {[
            { label: '创', value: drink.cre },
            { label: '灵', value: drink.inh },
            { label: '清', value: drink.asc },
            { label: '醉', value: drink.exp },
          ].map(({ label, value }) => (
            <div key={label} className="text-center">
              <div className="h-16 bg-white/5 rounded-lg overflow-hidden mb-1">
                <div 
                  className="h-full rounded-lg transition-all duration-500"
                  style={{ 
                    height: `${value}%`,
                    backgroundColor: moodColor,
                    opacity: 0.6
                  }}
                />
              </div>
              <span className="text-xs text-text-secondary">{label}</span>
              <span className="text-xs text-text-secondary/50 ml-0.5">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowModal(false)}
        >
          <div 
            className="glass-effect rounded-xl max-w-md w-full p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="absolute top-4 right-4 text-text-secondary hover:text-text-primary text-2xl"
              onClick={() => setShowModal(false)}
            >
              ×
            </button>

            <h2 className="text-2xl font-serif text-text-primary mb-1">{drink.name}</h2>
            <span className="text-xs text-text-secondary tracking-widest">{drink.nameEn}</span>

            <p className="text-text-secondary leading-relaxed my-6 font-serif italic text-lg">
              &ldquo;{drink.desc}&rdquo;
            </p>

            <div className="mb-6">
              <div className="text-sm text-text-secondary mb-2">心情标签</div>
              <span 
                className="px-4 py-2 rounded-full text-sm"
                style={{ 
                  backgroundColor: `${moodColor}20`,
                  color: moodColor,
                  border: `1px solid ${moodColor}50`
                }}
              >
                {drink.mood}
              </span>
            </div>

            <div className="mb-6">
              <div className="text-sm text-text-secondary mb-3">品鉴指数</div>
              <div className="space-y-2">
                {[
                  { label: '创造力 Creative', value: drink.cre },
                  { label: '灵感 Inspiration', value: drink.inh },
                  { label: '清醒 Ascending', value: drink.asc },
                  { label: '沉醉 Experience', value: drink.exp },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center gap-3">
                    <span className="text-xs text-text-secondary w-28">{label}</span>
                    <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full"
                        style={{ 
                          width: `${value}%`,
                          backgroundColor: moodColor
                        }}
                      />
                    </div>
                    <span className="text-xs text-text-secondary w-8">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button className="flex-1 py-3 bg-accent-wine text-text-primary rounded-lg font-medium hover:bg-accent-wine-light transition-all">
                点一杯
              </button>
              <button 
                className="px-4 py-3 border border-accent-gold/50 text-accent-gold rounded-lg hover:bg-accent-gold/10 transition-all"
                onClick={() => setShowModal(false)}
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
