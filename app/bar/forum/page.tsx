'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { posts as initialPosts, moodCategories, getMoodEmoji, getMoodColor, filterPostsByMood, type Post, type MoodCategory } from '@/lib/posts';

export default function ForumPage() {
  const [drink, setDrink] = useState<{ id: string; name: string; mood: string } | null>(null);
  const [mood, setMood] = useState('');
  const [activeMood, setActiveMood] = useState<MoodCategory>('全部');
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [expandedPostId, setExpandedPostId] = useState<string | null>(null);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [bookmarkedPosts, setBookmarkedPosts] = useState<Set<string>>(new Set());
  const [animatingHeart, setAnimatingHeart] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedDrink = sessionStorage.getItem('currentDrink');
    const savedMood = sessionStorage.getItem('currentMood');
    if (savedDrink) setDrink(JSON.parse(savedDrink));
    if (savedMood) setMood(savedMood);

    // 加载本地存储的点赞和收藏状态
    const savedLikes = localStorage.getItem('forum_liked_posts');
    const savedBookmarks = localStorage.getItem('forum_bookmarked_posts');
    if (savedLikes) setLikedPosts(new Set(JSON.parse(savedLikes)));
    if (savedBookmarks) setBookmarkedPosts(new Set(JSON.parse(savedBookmarks)));
  }, []);

  useEffect(() => {
    localStorage.setItem('forum_liked_posts', JSON.stringify(Array.from(likedPosts)));
  }, [likedPosts]);

  useEffect(() => {
    localStorage.setItem('forum_bookmarked_posts', JSON.stringify(Array.from(bookmarkedPosts)));
  }, [bookmarkedPosts]);

  useEffect(() => {
    if (activeMood === '全部') {
      setPosts(initialPosts);
    } else {
      setPosts(filterPostsByMood(activeMood));
    }
    setPage(0);
    setHasMore(true);
  }, [activeMood]);

  // 模拟加载更多
  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore) return;
    
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const nextPage = page + 1;
    const startIndex = nextPage * 10;
    const endIndex = startIndex + 10;
    
    if (endIndex < initialPosts.length) {
      const newPosts = initialPosts.slice(startIndex, endIndex);
      setPosts(prev => [...prev, ...newPosts]);
      setPage(nextPage);
    } else {
      setHasMore(false);
    }
    setIsLoading(false);
  }, [isLoading, hasMore, page]);

  // 无限滚动
  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasMore, isLoading, loadMore]);

  // 点赞处理
  const handleLike = (postId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setAnimatingHeart(postId);
    setTimeout(() => setAnimatingHeart(null), 600);
    
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          likes: likedPosts.has(postId) ? p.likes - 1 : p.likes + 1,
        };
      }
      return p;
    }));
    
    setLikedPosts(prev => {
      const next = new Set(prev);
      if (next.has(postId)) {
        next.delete(postId);
      } else {
        next.add(postId);
      }
      return next;
    });
  };

  // 收藏处理
  const handleBookmark = (postId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return { ...p };
      }
      return p;
    }));
    
    setBookmarkedPosts(prev => {
      const next = new Set(prev);
      if (next.has(postId)) {
        next.delete(postId);
      } else {
        next.add(postId);
      }
      return next;
    });
  };

  // 展开/收起帖子
  const toggleExpand = (postId: string) => {
    setExpandedPostId(prev => prev === postId ? null : postId);
  };

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
        {posts.map((post) => {
          const isExpanded = expandedPostId === post.id;
          const isLiked = likedPosts.has(post.id);
          const isBookmarked = bookmarkedPosts.has(post.id);
          const isHeartAnimating = animatingHeart === post.id;
          
          return (
            <article
              key={post.id}
              onClick={() => toggleExpand(post.id)}
              className={`p-4 rounded-xl transition-all duration-300 cursor-pointer ${
                isExpanded ? 'bg-white/5 border border-accent-wine/30' : ''
              }`}
              style={{
                background: isExpanded ? undefined : 'rgba(255,255,255,0.03)',
                border: isExpanded ? '1px solid rgba(139, 41, 66, 0.3)' : '1px solid rgba(255,255,255,0.06)',
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

              {/* Post Content - Truncated or Full */}
              <p className={`text-text-primary/90 leading-relaxed mb-3 text-sm ${
                !isExpanded ? 'line-clamp-3' : ''
              }`}>
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

              {/* Expanded Content - Full Post Link */}
              {isExpanded && (
                <Link
                  href={`/bar/forum/${post.id}`}
                  className="block mb-3 text-xs text-accent-wine/80 hover:text-accent-wine transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  → 查看完整帖子和评论
                </Link>
              )}

              {/* Post Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-5 text-text-secondary text-xs">
                  {/* Like Button */}
                  <button 
                    onClick={(e) => handleLike(post.id, e)}
                    className={`flex items-center gap-1.5 transition-all active:scale-90 ${
                      isLiked ? 'text-red-400' : 'hover:text-red-400'
                    }`}
                  >
                    <span className={`text-lg transition-transform ${isHeartAnimating ? 'scale-150' : ''}`}>
                      {isLiked ? '❤️' : '🤍'}
                    </span>
                    <span>{post.likes}</span>
                  </button>
                  
                  {/* Comment Count */}
                  <div className="flex items-center gap-1.5 hover:text-accent-gold transition-colors">
                    <span>💬</span>
                    <span>{post.comments}</span>
                  </div>
                </div>

                {/* Bookmark Button */}
                <button 
                  onClick={(e) => handleBookmark(post.id, e)}
                  className={`p-2 rounded-full transition-all active:scale-90 ${
                    isBookmarked 
                      ? 'bg-accent-gold/20 text-accent-gold' 
                      : 'hover:bg-white/10 text-text-secondary'
                  }`}
                >
                  <svg 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill={isBookmarked ? 'currentColor' : 'none'} 
                    stroke="currentColor" 
                    strokeWidth="2"
                  >
                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                  </svg>
                </button>
              </div>

              {/* Heart Animation Overlay */}
              {isHeartAnimating && (
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  <span className="text-4xl animate-heart-burst">❤️</span>
                </div>
              )}
            </article>
          );
        })}

        {/* Load More Trigger */}
        <div ref={loadMoreRef} className="py-4 text-center">
          {isLoading && (
            <div className="flex items-center justify-center gap-2 text-text-secondary text-sm">
              <div className="w-4 h-4 border-2 border-accent-wine/30 border-t-accent-wine rounded-full animate-spin" />
              <span>加载更多...</span>
            </div>
          )}
          {!hasMore && posts.length > 0 && (
            <p className="text-text-secondary/50 text-xs">— 已加载全部 {posts.length} 条帖子 —</p>
          )}
        </div>

        {/* Empty State */}
        {posts.length === 0 && (
          <div className="text-center py-16">
            <span className="text-4xl mb-4 block">🍷</span>
            <p className="text-text-secondary text-sm">这个心情的帖子还在酿造中...</p>
          </div>
        )}
      </div>

      {/* Floating Post Button */}
      <Link
        href="/bar/forum/compose"
        className="fixed bottom-24 right-5 w-12 h-12 rounded-full bg-accent-wine text-text-primary flex items-center justify-center text-xl shadow-lg active:scale-95 transition-transform hover:scale-105"
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
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        @keyframes heart-burst {
          0% {
            transform: scale(0.5);
            opacity: 1;
          }
          50% {
            transform: scale(1.5);
            opacity: 1;
          }
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        .animate-heart-burst {
          animation: heart-burst 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
