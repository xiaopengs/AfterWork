'use client';

import { useState } from 'react';
import DrinkCardFull from '@/components/DrinkCardFull';
import { drinks, Drink } from '@/lib/drinks-data';

const moodFilters = ['全部', '温暖', '深思', '俏皮', '荒诞', '裂隙', '分裂', '脆弱', '猎奇', '苦甜'];

export default function HomePage() {
  const [filter, setFilter] = useState('全部');
  const [selectedDrink, setSelectedDrink] = useState<Drink | null>(null);

  const filteredDrinks = filter === '全部' 
    ? drinks 
    : drinks.filter(d => d.mood === filter);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-64 h-64 bg-accent-wine/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-accent-gold/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 text-center px-4">
          <p className="text-accent-gold text-sm tracking-[0.3em] mb-4 uppercase">After Work Wine Bar</p>
          <h1 className="text-5xl md:text-7xl font-serif text-text-primary mb-6 neon-glow">
            午后，来一杯？
          </h1>
          <p className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            每一款酒都是一首诗<br />
            让思绪在微醺中找到出口
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#drinks" className="group px-8 py-4 bg-accent-wine text-text-primary rounded-lg font-medium transition-all hover:bg-accent-wine-light hover:scale-105 pulse-glow">
              探索酒单
            </a>
            <a href="/fortune" className="px-8 py-4 border border-accent-gold/50 text-accent-gold rounded-lg font-medium transition-all hover:bg-accent-gold/10">
              今日占卜
            </a>
          </div>
        </div>
      </section>

      {/* Drinks Section */}
      <section id="drinks" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <span className="text-accent-gold text-sm tracking-wider">DRINKS MENU</span>
          <h2 className="text-3xl md:text-4xl font-serif text-text-primary mt-2 mb-4">
            酒 · 单
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto">
            每款酒都有独特的情绪指数<br />
            创 · 灵 · 清 · 醉
          </p>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {moodFilters.map((mood) => (
            <button
              key={mood}
              onClick={() => setFilter(mood)}
              className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                filter === mood
                  ? 'bg-accent-wine text-text-primary scale-105'
                  : 'bg-white/5 text-text-secondary hover:text-text-primary hover:bg-white/10'
              }`}
            >
              {mood}
            </button>
          ))}
        </div>

        {/* Drinks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDrinks.map((drink) => (
            <DrinkCardFull 
              key={drink.id} 
              drink={drink}
              onSelect={setSelectedDrink}
            />
          ))}
        </div>

        <div className="text-center mt-12 text-text-secondary">
          共 {filteredDrinks.length} 款特调
        </div>
      </section>

      {/* Atmosphere Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-wine/5 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-accent-gold text-sm tracking-wider">ATMOSPHERE</span>
              <h2 className="text-3xl md:text-4xl font-serif text-text-primary mt-2 mb-6">
                沉浸在午后的温柔里
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                推开那扇门，柔和的灯光洒落下来，空气中弥漫着淡淡的酒香。
              </p>
              <p className="text-text-secondary leading-relaxed">
                这里没有喧嚣，只有你和你的思绪。每一款酒，都是通往内心的一扇窗。
              </p>
              <div className="mt-8 grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-3xl font-serif text-accent-gold">{drinks.length}+</p>
                  <p className="text-text-secondary text-sm">特调酒款</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-serif text-accent-gold">9</p>
                  <p className="text-text-secondary text-sm">情绪标签</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-serif text-accent-gold">∞</p>
                  <p className="text-text-secondary text-sm">可能</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-2xl glass-effect p-8 flex items-center justify-center">
                <div className="text-center">
                  <span className="text-8xl float-animation">🍷</span>
                  <p className="text-text-secondary mt-6 font-serif italic">&ldquo;品酒，品的是人生&rdquo;</p>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 border border-accent-gold/30 rounded-full" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 border border-accent-wine/30 rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <blockquote className="text-2xl md:text-3xl font-serif text-text-primary italic leading-relaxed">
            &ldquo;每天最美好的时刻，莫过于傍晚时分，<br className="hidden md:block" />
            手中的那杯酒，和窗外的夕阳。&rdquo;
          </blockquote>
          <p className="text-accent-gold mt-6">—— 午后酒馆</p>
        </div>
      </section>
    </div>
  );
}
