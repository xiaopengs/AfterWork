'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface UserProfile {
  nickname: string;
  entryTime: string;
  drinksTonight: number;
  mostFrequentMood: string;
  totalPosts: number;
  totalCollections: number;
}

interface Memory {
  id: string;
  type: 'post' | 'collection' | 'drink';
  title: string;
  date: string;
  preview?: string;
}

interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  earned: boolean;
}

const defaultProfile: UserProfile = {
  nickname: '深夜独酌客',
  entryTime: '2026-04-17 19:30',
  drinksTonight: 2,
  mostFrequentMood: '微醺愉悦',
  totalPosts: 12,
  totalCollections: 8,
};

const defaultMemories: Memory[] = [
  { id: '1', type: 'post', title: '关于那杯雷司令的记忆', date: '2026-04-15', preview: '今夜尝试了一款来自莱茵河的雷司令...' },
  { id: '2', type: 'post', title: '独处的夜晚', date: '2026-04-12', preview: '一个人的夜晚，一杯酒的时光...' },
  { id: '3', type: 'collection', title: '收藏：起泡酒入门指南', date: '2026-04-10' },
  { id: '4', type: 'collection', title: '收藏：如何品鉴黑皮诺', date: '2026-04-08' },
  { id: '5', type: 'drink', title: '2018年波尔多混酿', date: '2026-04-15' },
  { id: '6', type: 'drink', title: '马尔贝克红葡萄酒', date: '2026-04-12' },
  { id: '7', type: 'drink', title: '长相思白葡萄酒', date: '2026-04-10' },
];

const defaultBadges: Badge[] = [
  { id: '1', name: '初次入场', icon: '🎫', description: '完成首次入场', earned: true },
  { id: '2', name: '微醺新手', icon: '🍷', description: '饮用了第一杯酒', earned: true },
  { id: '3', name: '论坛新星', icon: '💬', description: '发布了第一篇帖子', earned: true },
  { id: '4', name: '收藏达人', icon: '📚', description: '收藏了5篇内容', earned: true },
  { id: '5', name: '资深酒客', icon: '👑', description: '饮用了10种不同的酒', earned: false },
];

export default function MePage() {
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const [memories, setMemories] = useState<Memory[]>(defaultMemories);
  const [badges, setBadges] = useState<Badge[]>(defaultBadges);
  const [activeTab, setActiveTab] = useState<'posts' | 'collections' | 'drinks'>('posts');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 模拟加载数据
    const loadData = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/memories');
        if (res.ok) {
          const data = await res.json();
          // 使用API数据更新
        }
      } catch (e) {
        console.log('Using default data');
      }
      setLoading(false);
    };
    loadData();

    // 从sessionStorage获取用户信息
    const savedNickname = sessionStorage.getItem('nickname');
    const savedEntryTime = sessionStorage.getItem('entryTime');
    if (savedNickname) {
      setProfile(prev => ({ ...prev, nickname: savedNickname }));
    }
    if (savedEntryTime) {
      setProfile(prev => ({ ...prev, entryTime: savedEntryTime }));
    }
  }, []);

  const filteredMemories = memories.filter(m => {
    if (activeTab === 'posts') return m.type === 'post';
    if (activeTab === 'collections') return m.type === 'collection';
    if (activeTab === 'drinks') return m.type === 'drink';
    return true;
  });

  const moodEmoji: Record<string, string> = {
    '微醺愉悦': '😊',
    '沉醉忘忧': '🌙',
    '孤独沉思': '🤔',
    '兴奋畅快': '🤩',
  };

  return (
    <div className="px-4 py-6 max-w-lg mx-auto">
      {/* Profile Header */}
      <div className="glass-effect rounded-2xl p-5 mb-4 animate-fade-in">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent-wine to-accent-wine-light flex items-center justify-center text-3xl">
            🎭
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-serif text-text-primary mb-1">
              {profile.nickname}
            </h1>
            <p className="text-text-secondary text-sm">
              入场时间 · {profile.entryTime.split(' ')[1]}
            </p>
          </div>
        </div>

        {/* Tonight Stats */}
        <div className="grid grid-cols-2 gap-3 mt-5">
          <div className="bg-bg-primary/50 rounded-xl p-4 text-center">
            <div className="text-3xl mb-1">{profile.drinksTonight}</div>
            <div className="text-text-secondary text-sm">今晚品鉴</div>
          </div>
          <div className="bg-bg-primary/50 rounded-xl p-4 text-center">
            <div className="text-2xl mb-1">
              {moodEmoji[profile.mostFrequentMood] || '🍷'}
            </div>
            <div className="text-text-secondary text-sm">{profile.mostFrequentMood}</div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="flex justify-around mt-4 pt-4 border-t border-white/5">
          <div className="text-center">
            <div className="text-accent-gold font-medium">{profile.totalPosts}</div>
            <div className="text-text-secondary text-xs">发帖</div>
          </div>
          <div className="text-center">
            <div className="text-accent-gold font-medium">{profile.totalCollections}</div>
            <div className="text-text-secondary text-xs">收藏</div>
          </div>
          <div className="text-center">
            <div className="text-accent-gold font-medium">{badges.filter(b => b.earned).length}</div>
            <div className="text-text-secondary text-xs">成就</div>
          </div>
        </div>
      </div>

      {/* Mood Distribution */}
      <div className="glass-effect rounded-2xl p-5 mb-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <h2 className="text-lg font-medium text-text-primary mb-4 flex items-center gap-2">
          <span>📊</span> 心情分布
        </h2>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-lg w-8">😊</span>
            <div className="flex-1">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-text-secondary">微醺愉悦</span>
                <span className="text-accent-gold">45%</span>
              </div>
              <div className="h-2 bg-bg-primary rounded-full overflow-hidden">
                <div className="h-full bg-accent-wine rounded-full" style={{ width: '45%' }} />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-lg w-8">🌙</span>
            <div className="flex-1">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-text-secondary">沉醉忘忧</span>
                <span className="text-accent-gold">30%</span>
              </div>
              <div className="h-2 bg-bg-primary rounded-full overflow-hidden">
                <div className="h-full bg-accent-gold rounded-full" style={{ width: '30%' }} />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-lg w-8">🤔</span>
            <div className="flex-1">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-text-secondary">孤独沉思</span>
                <span className="text-accent-gold">25%</span>
              </div>
              <div className="h-2 bg-bg-primary rounded-full overflow-hidden">
                <div className="h-full bg-neon-purple rounded-full" style={{ width: '25%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Badges */}
      <div className="glass-effect rounded-2xl p-5 mb-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <h2 className="text-lg font-medium text-text-primary mb-4 flex items-center gap-2">
          <span>🏆</span> 成就徽章
        </h2>
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-2 px-2 mobile-scroll">
          {badges.map(badge => (
            <div
              key={badge.id}
              className={`flex-shrink-0 w-20 text-center p-3 rounded-xl transition-all ${
                badge.earned 
                  ? 'bg-bg-primary/50' 
                  : 'bg-bg-primary/30 opacity-50'
              }`}
            >
              <div className={`text-3xl mb-2 ${!badge.earned && 'grayscale'}`}>
                {badge.icon}
              </div>
              <div className={`text-xs font-medium ${badge.earned ? 'text-text-primary' : 'text-text-secondary'}`}>
                {badge.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Memories */}
      <div className="glass-effect rounded-2xl p-5 animate-fade-in" style={{ animationDelay: '0.3s' }}>
        <h2 className="text-lg font-medium text-text-primary mb-4 flex items-center gap-2">
          <span>📜</span> 午后回忆
        </h2>

        {/* Tabs */}
        <div className="flex gap-2 mb-4">
          {(['posts', 'collections', 'drinks'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                activeTab === tab
                  ? 'bg-accent-wine text-text-primary'
                  : 'bg-bg-primary/50 text-text-secondary hover:text-text-primary'
              }`}
            >
              {tab === 'posts' && '我的发帖'}
              {tab === 'collections' && '收藏'}
              {tab === 'drinks' && '喝过的酒'}
            </button>
          ))}
        </div>

        {/* Memory List */}
        <div className="space-y-3">
          {filteredMemories.length === 0 ? (
            <div className="text-center py-8 text-text-secondary">
              <div className="text-4xl mb-3">🍷</div>
              <p>还没有{activeTab === 'posts' ? '发帖' : activeTab === 'collections' ? '收藏' : '品鉴记录'}</p>
            </div>
          ) : (
            filteredMemories.map(memory => (
              <div
                key={memory.id}
                className="bg-bg-primary/30 rounded-xl p-4 hover:bg-bg-primary/50 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    memory.type === 'post' ? 'bg-accent-wine/20 text-accent-wine' :
                    memory.type === 'collection' ? 'bg-accent-gold/20 text-accent-gold' :
                    'bg-neon-purple/20 text-neon-purple'
                  }`}>
                    {memory.type === 'post' && '📝'}
                    {memory.type === 'collection' && '⭐'}
                    {memory.type === 'drink' && '🍷'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-text-primary font-medium truncate">
                      {memory.title}
                    </h3>
                    {memory.preview && (
                      <p className="text-text-secondary text-sm mt-1 line-clamp-2">
                        {memory.preview}
                      </p>
                    )}
                    <p className="text-text-secondary/50 text-xs mt-2">
                      {memory.date}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Bottom padding for nav */}
      <div className="h-8" />
    </div>
  );
}
