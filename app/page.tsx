'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { drinks, moodColors, moodEmojis, Drink } from '@/lib/drinks-data';

const moods = ['温暖', '深思', '俏皮', '荒诞', '裂隙', '分裂', '脆弱', '猎奇', '苦甜'];

export default function HomePage() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [selectedDrink, setSelectedDrink] = useState<Drink | null>(null);
  const [showDrinks, setShowDrinks] = useState(false);
  const router = useRouter();

  const moodDrinks = selectedMood 
    ? drinks.filter(d => d.mood === selectedMood)
    : [];

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
    setShowDrinks(true);
    setSelectedDrink(null);
  };

  const handleDrinkSelect = (drink: Drink) => {
    setSelectedDrink(drink);
  };

  const handleEnter = () => {
    if (selectedDrink) {
      sessionStorage.setItem('currentDrink', JSON.stringify(selectedDrink));
      sessionStorage.setItem('currentMood', selectedMood || '');
      router.push('/bar');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-8 sm:py-12">
        <div className="text-center mb-10 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-serif text-text-primary mb-3 sm:mb-4">
            欢迎来到 AfterWork
          </h1>
          <p className="text-base sm:text-lg text-text-secondary">
            先点一杯酒，再坐下来
          </p>
        </div>

        {/* Mood Grid - Mobile optimized */}
        <div className="w-full max-w-md sm:max-w-lg mb-6 sm:mb-8">
          <p className="text-center text-text-secondary mb-3 sm:mb-4 text-xs sm:text-sm">
            你现在的心情是？
          </p>
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {moods.map((mood) => (
              <button
                key={mood}
                onClick={() => handleMoodSelect(mood)}
                onTouchStart={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
                onTouchEnd={(e) => e.currentTarget.style.transform = ''}
                className={`p-3 sm:p-4 rounded-xl text-center transition-all duration-200 touch-manipulation select-none ${
                  selectedMood === mood
                    ? 'scale-100'
                    : 'active:scale-95'
                }`}
                style={{
                  background: selectedMood === mood 
                    ? moodColors[mood] + '30' 
                    : 'rgba(255,255,255,0.05)',
                  border: `1px solid ${selectedMood === mood ? moodColors[mood] : 'transparent'}`,
                  minHeight: '70px',
                  willChange: 'transform, background',
                }}
              >
                <span className="text-xl sm:text-2xl block mb-1">{moodEmojis[mood]}</span>
                <span className="text-xs sm:text-sm text-text-primary">{mood}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Drinks List - Mobile optimized scroll */}
        {showDrinks && moodDrinks.length > 0 && (
          <div className="w-full max-w-md sm:max-w-lg mt-6 sm:mt-8">
            <p className="text-center text-text-secondary mb-3 sm:mb-4 text-xs sm:text-sm">
              今夜适合你的酒
            </p>
            <div 
              className="space-y-2 sm:space-y-3 max-h-[35vh] sm:max-h-[40vh] overflow-y-auto mobile-scroll pb-4"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              {moodDrinks.map((drink) => (
                <button
                  key={drink.id}
                  onClick={() => handleDrinkSelect(drink)}
                  onTouchStart={(e) => e.currentTarget.style.opacity = '0.8'}
                  onTouchEnd={(e) => e.currentTarget.style.opacity = '1'}
                  className={`w-full p-3 sm:p-4 rounded-xl text-left transition-all duration-150 touch-manipulation select-none active:scale-[0.98] ${
                    selectedDrink?.id === drink.id ? 'scale-[1.01]' : ''
                  }`}
                  style={{
                    background: selectedDrink?.id === drink.id
                      ? 'rgba(139, 41, 66, 0.3)'
                      : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${selectedDrink?.id === drink.id ? '#8B2942' : 'rgba(255,255,255,0.1)'}`,
                    willChange: 'transform, background',
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-text-primary font-medium text-sm sm:text-base truncate">{drink.name}</h3>
                      <p className="text-xs text-text-secondary mt-0.5 sm:mt-1 line-clamp-1 sm:line-clamp-2">{drink.desc.slice(0, 30)}...</p>
                    </div>
                    {selectedDrink?.id === drink.id && (
                      <span className="text-accent-wine text-lg sm:text-xl ml-2 flex-shrink-0">✓</span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Enter Button - Mobile optimized positioning */}
        {selectedDrink && (
          <button
            onClick={handleEnter}
            className="fixed bottom-6 sm:bottom-12 left-1/2 -translate-x-1/2 px-6 sm:px-8 py-3 sm:py-4 bg-accent-wine text-text-primary rounded-full font-medium text-base sm:text-lg transition-all duration-200 active:scale-95 touch-manipulation shadow-lg shadow-accent-wine/30"
            style={{
              minWidth: '140px',
              willChange: 'transform',
            }}
          >
            入座
          </button>
        )}
      </div>
    </div>
  );
}
