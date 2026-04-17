'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { drinks, moodEmojis, moodColors } from '@/lib/drinks-data';

const moods = ['温暖', '深思', '俏皮', '荒诞', '裂隙', '分裂', '脆弱', '猎奇', '苦甜'] as const;

export default function ComposePage() {
  const router = useRouter();
  const [selectedMood, setSelectedMood] = useState<string>('');
  const [content, setContent] = useState('');
  const [selectedDrink, setSelectedDrink] = useState<string>('');
  const [isPosting, setIsPosting] = useState(false);

  const maxLength = 500;
  const remainingChars = maxLength - content.length;

  const handlePost = async () => {
    if (!selectedMood || !content.trim()) return;
    
    setIsPosting(true);
    
    // 模拟发布延迟
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // TODO: 实际项目中这里应该调用API保存帖子
    console.log('Post created:', {
      mood: selectedMood,
      content: content.trim(),
      drink: selectedDrink,
    });
    
    setIsPosting(false);
    router.push('/bar/forum');
  };

  const canPost = selectedMood && content.trim().length > 0 && !isPosting;

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-effect border-b border-white/5">
        <div className="flex items-center justify-between px-4 py-3">
          <Link 
            href="/bar/forum" 
            className="text-text-secondary hover:text-text-primary transition-colors"
          >
            取消
          </Link>
          <span className="font-serif text-text-primary">发布此刻</span>
          <button
            onClick={handlePost}
            disabled={!canPost}
            className={`text-sm px-4 py-1.5 rounded-full transition-all ${
              canPost
                ? 'bg-accent-wine text-text-primary active:scale-95'
                : 'bg-white/10 text-text-secondary/50'
            }`}
          >
            {isPosting ? '发布中...' : '发布'}
          </button>
        </div>
      </header>

      <div className="px-4 py-6 space-y-6">
        {/* Mood Selection */}
        <section>
          <h3 className="text-text-secondary text-xs mb-3 uppercase tracking-wider">
            此刻心情
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {moods.map((mood) => (
              <button
                key={mood}
                onClick={() => setSelectedMood(mood)}
                className={`p-3 rounded-xl text-center transition-all active:scale-95 ${
                  selectedMood === mood
                    ? 'border-2'
                    : 'border border-white/5'
                }`}
                style={{
                  background: selectedMood === mood
                    ? `${moodColors[mood]}20`
                    : 'rgba(255,255,255,0.02)',
                  borderColor: selectedMood === mood
                    ? moodColors[mood]
                    : 'transparent',
                }}
              >
                <span className="text-xl mb-1 block">{moodEmojis[mood]}</span>
                <span 
                  className="text-xs"
                  style={{ 
                    color: selectedMood === mood 
                      ? moodColors[mood] 
                      : 'var(--text-secondary)' 
                  }}
                >
                  {mood}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Content Input */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-text-secondary text-xs uppercase tracking-wider">
              想说点什么
            </h3>
            <span 
              className={`text-xs ${
                remainingChars < 50 
                  ? remainingChars < 20 
                    ? 'text-red-400' 
                    : 'text-yellow-400' 
                  : 'text-text-secondary/50'
              }`}
            >
              {remainingChars}
            </span>
          </div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value.slice(0, maxLength))}
            placeholder="这里没有人认识你，可以说出心里话..."
            className="w-full h-48 p-4 rounded-xl bg-white/5 border border-white/5 text-text-primary placeholder-text-secondary/40 resize-none focus:outline-none focus:border-accent-wine/50 transition-colors text-sm leading-relaxed"
            style={{ minHeight: '200px' }}
          />
        </section>

        {/* Drink Selection (Optional) */}
        <section>
          <h3 className="text-text-secondary text-xs mb-3 uppercase tracking-wider">
            今天喝了什么酒 <span className="text-text-secondary/40">(可选)</span>
          </h3>
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
            <button
              onClick={() => setSelectedDrink('')}
              className={`px-3 py-1.5 rounded-full text-xs whitespace-nowrap transition-all flex-shrink-0 ${
                selectedDrink === ''
                  ? 'bg-white/20 text-text-primary'
                  : 'bg-white/5 text-text-secondary'
              }`}
            >
              不喝酒
            </button>
            {drinks.slice(0, 10).map((drink) => (
              <button
                key={drink.id}
                onClick={() => setSelectedDrink(drink.name)}
                className={`px-3 py-1.5 rounded-full text-xs whitespace-nowrap transition-all flex-shrink-0 ${
                  selectedDrink === drink.name
                    ? 'bg-accent-gold/20 text-accent-gold'
                    : 'bg-white/5 text-text-secondary'
                }`}
              >
                🍸 {drink.name}
              </button>
            ))}
          </div>
        </section>

        {/* Tips */}
        <div className="p-4 rounded-xl bg-white/5 border border-white/5">
          <p className="text-text-secondary/60 text-xs leading-relaxed">
            💡 小贴士：在这里可以记录今晚的心情和想法，酒馆会为你保存这些回忆。内容仅自己可见，可随时删除。
          </p>
        </div>
      </div>

      {/* Bottom Post Button (Backup) */}
      <div className="fixed bottom-0 left-0 right-0 p-4 glass-effect border-t border-white/5">
        <button
          onClick={handlePost}
          disabled={!canPost}
          className={`w-full py-3.5 rounded-xl font-medium text-sm transition-all active:scale-[0.98] ${
            canPost
              ? 'bg-accent-wine text-text-primary'
              : 'bg-white/10 text-text-secondary/50'
          }`}
        >
          {isPosting ? '🍷 酿造中...' : '🍷 发布此刻'}
        </button>
      </div>

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
