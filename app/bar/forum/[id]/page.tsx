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
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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
    
    // 保存状态
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
    
    // 保存状态
    const savedBookmarks = localStorage.getItem('forum_bookmarked_posts');
    const bookmarked = savedBookmarks ? JSON.parse(savedBookmarks) : [];
    if (isBookmarked) {
      localStorage.setItem('forum_bookmarked_posts', JSON.stringify(bookmarked.filter((id: string) => id !== postId)));
    } else {
      localStorage.setItem('forum_bookmarked_posts', JSON.stringify([...bookmarked, postId]));
    }
  };

  const handleSubmitComment = async () => {
    if (!newComment.trim() || isSubmitting) return;
    
    setIsSubmitting(true);
    
    // 模拟提交
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
    
    // 清空输入框焦点
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

  return (
    <div className={`min-h-screen pb-32 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
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
            <span>返回</span>
          </button>
          <span className="font-serif text-text-primary text-sm">帖子详情</span>
          <div className="w-16" />
        </div>
      </header>

      {/* Post Content */}
      <article className="p-4">
        {/* Post Header */}
        <div className="flex items-center gap-3 mb-4">
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center text-xl"
            style={{ background: `${getMoodColor(post.mood)}20` }}
          >
            {getMoodEmoji(post.mood)}
          </div>
          <div className="flex-1">
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
              <span className="text-text-secondary text-sm">
                {post.author}
              </span>
            </div>
            <p className="text-text-secondary/60 text-xs">{post.createdAt}</p>
          </div>
        </div>

        {/* Post Content */}
        <div 
          className="p-4 rounded-xl mb-4"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <p className="text-text-primary/90 leading-relaxed whitespace-pre-wrap">
            {post.content}
          </p>
          
          {post.drink && (
            <div className="mt-4 pt-4 border-t border-white/5">
              <span className="text-sm text-accent-gold/80 bg-accent-gold/10 px-3 py-1.5 rounded-full">
                🍸 {post.drink}
              </span>
            </div>
          )}
        </div>

        {/* Post Actions */}
        <div className="flex items-center justify-between px-2 mb-6">
          <div className="flex items-center gap-6">
            {/* Like */}
            <button 
              onClick={handleLike}
              className={`flex items-center gap-2 px-3 py-2 rounded-full transition-all active:scale-95 ${
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

            {/* Comment */}
            <div className="flex items-center gap-2 text-text-secondary px-3 py-2">
              <span className="text-lg">💬</span>
              <span className="text-sm font-medium">{comments.length}</span>
            </div>
          </div>

          {/* Bookmark */}
          <button 
            onClick={handleBookmark}
            className={`p-2.5 rounded-full transition-all active:scale-90 ${
              isBookmarked 
                ? 'bg-accent-gold/20 text-accent-gold' 
                : 'bg-white/5 text-text-secondary hover:bg-white/10'
            }`}
          >
            <svg 
              width="18" 
              height="18" 
              viewBox="0 0 24 24" 
              fill={isBookmarked ? 'currentColor' : 'none'} 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
          </button>
        </div>

        {/* Comments Section */}
        <div className="mb-4">
          <h3 className="text-text-secondary text-xs uppercase tracking-wider mb-4 flex items-center gap-2">
            <span>💬</span>
            <span>{comments.length} 条评论</span>
          </h3>

          {/* Comments List */}
          <div className="space-y-4">
            {comments.map((comment, index) => (
              <div 
                key={comment.id}
                className="flex gap-3 animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm flex-shrink-0">
                  {comment.author[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-text-primary text-sm font-medium">
                      {comment.author}
                    </span>
                    <span className="text-text-secondary/50 text-xs">
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
      </article>

      {/* Comment Input */}
      <div className="fixed bottom-0 left-0 right-0 p-4 glass-effect border-t border-white/5">
        <div className="flex items-end gap-3">
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
              placeholder="说点什么..."
              className="w-full p-3 pr-12 rounded-xl bg-white/5 border border-white/10 text-text-primary placeholder-text-secondary/40 resize-none focus:outline-none focus:border-accent-wine/50 transition-colors text-sm"
              style={{ minHeight: '48px', maxHeight: '120px' }}
              rows={1}
            />
          </div>
          <button
            onClick={handleSubmitComment}
            disabled={!newComment.trim() || isSubmitting}
            className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all active:scale-95 ${
              newComment.trim() && !isSubmitting
                ? 'bg-accent-wine text-text-primary'
                : 'bg-white/10 text-text-secondary/50'
            }`}
          >
            {isSubmitting ? (
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
              '发送'
            )}
          </button>
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
      `}</style>
    </div>
  );
}
