'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { posts, moodCategories, getMoodEmoji, getMoodColor, filterPostsByMood, type MoodCategory } from '@/lib/posts';

interface DrinkData {
  id: string;
  name: string;
  mood: string;
}

export default function ForumPage() {
  const [drink, setDrink] = useState<DrinkData | null>(null);
  const [mood, setMood] = useState('');
  const [activeMood, setActiveMood] = useState<MoodCategory>('全部');
  const [filteredPosts, setFilteredPosts] = useState(posts);

  useEffect(() => {
    const savedDrink = sessionStorage.getItem('currentDrink');
    const savedMood = sessionStorage.getItem('currentMood');
    if (savedDrink) setDrink(JSON.parse(savedDrink));
    if (savedMood) setMood(savedMood);
  }, []);

  useEffect(() => {
    setFilteredPosts(filterPostsByMood(activeMood));
  }, [activeMood]);

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="px-4 pt-4">
        {/* Status Bar */}
        <div 
          className="p-3 rounded-xl mb-4"
          style={{ background: 'rgba(139, 41, 66, 0.12)' }}
        >
          <div className="flex items-center gap-2 text-sm">
            <span className="text-base">
              {mood ? getMoodEmoji(mood) : '🍷'}
            </span>
            <span className="text-text-primary font-medium">
              {mood || '此刻心情'}
            </span>
            <span className="text-text-secondary">·</span>
            <span className="text-accent-gold truncate flex-1">
              {drink?.name || '今晚的酒'}
            </span>
          </div>
        </div>

        {/* Filter Tags - Horizontal Scroll */}
        <div className="flex gap-2 overflow-x-auto pb-3 -mx-4 px-4 scrollbar-hide">
          {moodCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveMood(cat)}
              className={`px-3 py-1.5 rounded-full text-xs whitespace-nowrap transition-all duration-200 flex-shrink-0 ${
                activeMood === cat
                  ? 'bg-accent-wine text-text-primary'
                  : 'bg-white/5 text-text-secondary hover:bg-white/10'
              }`}
            >
              {cat === '全部' ? '全部' : `${getMoodEmoji(cat)} ${cat}`}
            </button>
          ))}
        </div>
      </div>

      {/* Posts Feed */}
      <div className="px-4 space-y-3">
        {filteredPosts.map((post) => (
          <article
            key={post.id}
            className="p-4 rounded-xl transition-all duration-200 active:scale-[0.99]"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            {/* Post Header */}
            <div className="flex items-center gap-3 mb-3">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
                style={{ background: `${getMoodColor(post.mood)}20` }}
              >
                {getMoodEmoji(post.mood)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span 
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{ 
                      background: `${getMoodColor(post.mood)}30`,
                      color: getMoodColor(post.mood)
                    }}
                  >
                    {post.mood}
                  </span>
                  <span className="text-text-secondary text-xs">·</span>
                  <span className="text-text-secondary text-xs truncate">
                    {post.author}
                  </span>
                </div>
                <p className="text-text-secondary/60 text-xs">{post.createdAt}</p>
              </div>
            </div>

            {/* Post Content */}
            <p className="text-text-primary/90 leading-relaxed mb-3 text-sm">
              {post.content}
            </p>

            {/* Drink Tag */}
            {post.drink && (
              <div className="mb-3">
                <span className="text-xs text-accent-gold/80 bg-accent-gold/10 px-2 py-1 rounded-full">
                  🍸 {post.drink}
                </span>
              </div>
            )}

            {/* Post Actions */}
            <div className="flex items-center gap-5 text-text-secondary text-xs">
              <button className="flex items-center gap-1.5 hover:text-accent-wine transition-colors active:scale-90">
                <span>♡</span>
                <span>{post.likes}</span>
              </button>
              <button className="flex items-center gap-1.5 hover:text-accent-gold transition-colors active:scale-90">
                <span>○</span>
                <span>{post.comments}</span>
              </button>
            </div>
          </article>
        ))}

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-16">
            <span className="text-4xl mb-4 block">🍷</span>
            <p className="text-text-secondary text-sm">这个心情的帖子还在酿造中...</p>
          </div>
        )}
      </div>

      {/* Floating Post Button */}
      <Link
        href="/bar/forum/compose"
        className="fixed bottom-24 right-5 w-12 h-12 rounded-full bg-accent-wine text-text-primary flex items-center justify-center text-xl shadow-lg active:scale-95 transition-transform"
        style={{
          boxShadow: '0 4px 20px rgba(139, 41, 66, 0.4)',
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </Link>

      {/* Hide scrollbar for filter tags */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
