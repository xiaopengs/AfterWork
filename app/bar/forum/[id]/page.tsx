'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { posts as allPosts, getMoodEmoji, getMoodColor } from '@/lib/posts';

interface Comment {
  id: string;
  content: string;
  author: string;
  createdAt: string;
}

// 模拟评论数据
const mockComments: Comment[] = [
  {
    id: 'c1',
    content: '这杯酒听起来真的很特别，有机会一定要尝尝',
    author: '调酒师学徒',
    createdAt: '刚刚',
  },
  {
    id: 'c2',
    content: '深夜的酒馆总是能听到故事',
    author: '失眠的常客',
    createdAt: '2分钟前',
  },
  {
    id: 'c3',
    content: '懂这种感觉，有时候微醺才是最清醒的时刻',
    author: '同感者',
    createdAt: '5分钟前',
  },
  {
    id: 'c4',
    content: '写得真好，像在看一部小短片',
    author: '文字爱好者',
    createdAt: '10分钟前',
  },
];

// 格式化时间函数
const formatTime = (timeStr: string): string => {
  if (timeStr.includes('分钟') || timeStr.includes('刚刚') || timeStr.includes('小时')) {
    return timeStr;
  }
  return timeStr;
};

export default function PostDetailPage() {
  const params = useParams();
  const router = useRouter();
  const postId = params.id as string;
  const [post, setPost] = useState(allPosts.find(p => p.id === postId));
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // 获取相关推荐（相同心情的帖子）
  const relatedPosts = allPosts
    .filter(p => p.mood === post?.mood && p.id !== postId)
    .slice(0, 3);

  useEffect(() => {
    if (post) {
      setLikeCount(post.likes);
    }

    // 加载本地存储的状态
    const savedLikes = localStorage.getItem('forum_liked_posts');
    const savedBookmarks = localStorage.getItem('forum_bookmarked_posts');
    if (savedLikes) {
      const liked = JSON.parse(savedLikes) as string[];
      if (liked.includes(postId)) setIsLiked(true);
    }
    if (savedBookmarks) {
      const bookmarked = JSON.parse(savedBookmarks) as string[];
      if (bookmarked.includes(postId)) setIsBookmarked(true);
    }

    // 入场动画
    setTimeout(() => setIsVisible(true), 100);
  }, [postId, post]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
    
    const savedLikes = localStorage.getItem('forum_liked_posts');
    const liked = savedLikes ? JSON.parse(savedLikes) : [];
    if (isLiked) {
      localStorage.setItem('forum_liked_posts', JSON.stringify(liked.filter((id: string) => id !== postId)));
    } else {
      localStorage.setItem('forum_liked_posts', JSON.stringify([...liked, postId]));
    }
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    
    const savedBookmarks = localStorage.getItem('forum_bookmarked_posts');
    const bookmarked = savedBookmarks ? JSON.parse(savedBookmarks) : [];
    if (isBookmarked) {
      localStorage.setItem('forum_bookmarked_posts', JSON.stringify(bookmarked.filter((id: string) => id !== postId)));
    } else {
      localStorage.setItem('forum_bookmarked_posts', JSON.stringify([...bookmarked, postId]));
    }
  };

  const handleShare = () => {
    setIsSharing(true);
    // 模拟分享
    setTimeout(() => {
      setIsSharing(false);
    }, 1500);
  };

  const handleSubmitComment = async () => {
    if (!newComment.trim() || isSubmitting) return;
    
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const comment: Comment = {
      id: `c${Date.now()}`,
      content: newComment.trim(),
      author: '我',
      createdAt: '刚刚',
    };
    
    setComments(prev => [...prev, comment]);
    setNewComment('');
    setIsSubmitting(false);
    
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const handleBack = () => {
    setIsVisible(false);
    setTimeout(() => router.back(), 300);
  };

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <span className="text-4xl mb-4 block">🔍</span>
          <p className="text-text-secondary text-sm">帖子不存在或已被删除</p>
          <Link 
            href="/bar/forum"
            className="mt-4 inline-block text-accent-wine text-sm"
          >
            返回论坛
          </Link>
        </div>
      </div>
    );
  }

  const moodColor = getMoodColor(post.mood);

  return (
    <div className={`min-h-screen pb-36 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Header */}
      <header className="sticky top-0 z-50 glass-effect border-b border-white/5">
        <div className="flex items-center justify-between px-4 py-3">
          <button 
            onClick={handleBack}
            className="text-text-secondary hover:text-text-primary transition-colors flex items-center gap-1"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span className="hidden sm:inline">返回</span>
          </button>
          <span className="font-serif text-text-primary text-sm">帖子详情</span>
          <div className="w-12" />
        </div>
      </header>

      {/* Post Content with Mood Glow */}
      <article className="p-4">
        {/* Mood Atmosphere Effect */}
        <div 
          className="fixed top-0 left-1/2 -translate-x-1/2 w-[120%] h-64 opacity-20 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at center top, ${moodColor}40 0%, transparent 70%)`,
          }}
        />
        
        {/* Post Header */}
        <div className="relative flex items-center gap-4 mb-6 pt-4">
          {/* Large Mood Emoji */}
          <div 
            className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl shadow-lg"
            style={{ 
              background: `${moodColor}25`,
              boxShadow: `0 0 40px ${moodColor}30`
            }}
          >
            {getMoodEmoji(post.mood)}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span 
                className="text-xs px-2.5 py-1 rounded-full font-medium"
                style={{ 
                  background: `${moodColor}30`,
                  color: moodColor
                }}
              >
                {post.mood}
              </span>
              <span className="text-text-secondary text-xs">·</span>
              <span className="text-text-secondary text-sm">
                {post.author}
              </span>
            </div>
            <p className="text-text-secondary/50 text-xs mt-1">{formatTime(post.createdAt)}</p>
          </div>
        </div>

        {/* Post Content */}
        <div 
          className="p-5 rounded-2xl mb-6 relative overflow-hidden"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <p className="text-text-primary/90 leading-relaxed whitespace-pre-wrap text-base">
            {post.content}
          </p>
          
          {post.drink && (
            <div className="mt-5 pt-4 border-t border-white/5">
              <span className="text-sm text-accent-gold/90 bg-accent-gold/10 px-4 py-2 rounded-full inline-flex items-center gap-2">
                <span>🍸</span>
                <span>{post.drink}</span>
              </span>
            </div>
          )}
        </div>

        {/* Comments Section with Atmosphere */}
        <div className="mb-6">
          {/* Atmosphere Header */}
          <div className="text-center mb-6 py-4 relative">
            <div 
              className="absolute inset-0 opacity-10 rounded-xl"
              style={{
                background: `linear-gradient(90deg, transparent, ${moodColor}30, transparent)`
              }}
            />
            <p className="text-text-secondary/70 text-sm italic relative">
              酒过三巡，大家都在
            </p>
          </div>

          {/* Comments List - Single Column on Mobile */}
          <div className="space-y-4">
            {comments.map((comment, index) => (
              <div 
                key={comment.id}
                className="flex gap-3 animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div 
                  className="w-9 h-9 rounded-full flex items-center justify-center text-sm flex-shrink-0"
                  style={{ background: `${moodColor}20` }}
                >
                  {comment.author[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-text-primary text-sm font-medium">
                      {comment.author}
                    </span>
                    <span className="text-text-secondary/40 text-xs">
                      {comment.createdAt}
                    </span>
                  </div>
                  <p className="text-text-primary/80 text-sm leading-relaxed">
                    {comment.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Related Posts Section */}
        {relatedPosts.length > 0 && (
          <div className="mb-6">
            <h3 className="text-text-secondary text-xs uppercase tracking-wider mb-4 flex items-center gap-2">
              <span>✨</span>
              <span>同心情的其他故事</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  href={`/bar/forum/${relatedPost.id}`}
                  className="block p-4 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">
                      {getMoodEmoji(relatedPost.mood)}
                    </span>
                    <span 
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{ 
                        background: `${getMoodColor(relatedPost.mood)}30`,
                        color: getMoodColor(relatedPost.mood)
                      }}
                    >
                      {relatedPost.mood}
                    </span>
                  </div>
                  <p className="text-text-primary/80 text-sm line-clamp-2 leading-relaxed">
                    {relatedPost.content.slice(0, 60)}...
                  </p>
                  <p className="text-text-secondary/40 text-xs mt-2">
                    {relatedPost.author} · {relatedPost.likes}赞
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>

      {/* Fixed Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 glass-effect border-t border-white/5 z-40">
        <div className="p-4">
          <div className="flex items-center justify-between max-w-lg mx-auto">
            {/* Left Actions: Like + Comment Count */}
            <div className="flex items-center gap-2">
              <button 
                onClick={handleLike}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full transition-all active:scale-95 ${
                  isLiked 
                    ? 'bg-red-500/20 text-red-400' 
                    : 'bg-white/5 text-text-secondary hover:bg-white/10'
                }`}
              >
                <span className="text-lg">
                  {isLiked ? '❤️' : '🤍'}
                </span>
                <span className="text-sm font-medium">{likeCount}</span>
              </button>

              <div className="flex items-center gap-2 text-text-secondary bg-white/5 px-4 py-2.5 rounded-full">
                <span className="text-lg">💬</span>
                <span className="text-sm font-medium">{comments.length}</span>
              </div>
            </div>

            {/* Right Actions: Bookmark + Share */}
            <div className="flex items-center gap-2">
              <button 
                onClick={handleBookmark}
                className={`p-2.5 rounded-full transition-all active:scale-90 ${
                  isBookmarked 
                    ? 'bg-accent-gold/20 text-accent-gold' 
                    : 'bg-white/5 text-text-secondary hover:bg-white/10'
                }`}
              >
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill={isBookmarked ? 'currentColor' : 'none'} 
                  stroke="currentColor" 
                  strokeWidth="2"
                >
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                </svg>
              </button>

              <button 
                onClick={handleShare}
                className={`p-2.5 rounded-full transition-all active:scale-90 ${
                  isSharing
                    ? 'bg-accent-wine/20 text-accent-wine' 
                    : 'bg-white/5 text-text-secondary hover:bg-white/10'
                }`}
              >
                {isSharing ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="18" cy="5" r="3" />
                    <circle cx="6" cy="12" r="3" />
                    <circle cx="18" cy="19" r="3" />
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Comment Input - Fixed Bottom */}
          <div className="flex items-end gap-3 mt-4 max-w-lg mx-auto">
            <div className="flex-1 relative">
              <textarea
                ref={textareaRef}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmitComment();
                  }
                }}
                placeholder="来都来了，说两句？"
                className="w-full p-3 pr-14 rounded-xl bg-white/5 border border-white/10 text-text-primary placeholder-text-secondary/40 resize-none focus:outline-none focus:border-accent-wine/50 transition-colors text-sm"
                style={{ minHeight: '48px', maxHeight: '120px' }}
                rows={1}
              />
            </div>
            <button
              onClick={handleSubmitComment}
              disabled={!newComment.trim() || isSubmitting}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all active:scale-95 flex items-center gap-2 ${
                newComment.trim() && !isSubmitting
                  ? 'bg-accent-wine text-text-primary'
                  : 'bg-white/10 text-text-secondary/50'
              }`}
            >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>🍶</span>
                  <span>发送</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
