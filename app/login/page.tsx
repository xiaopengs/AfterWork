'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || '操作失败');
        setLoading(false);
        return;
      }

      // 保存 token
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // 跳转到首页
      router.push('/');
    } catch {
      setError('网络错误，请重试');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-wine/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-gold/10 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <span className="text-6xl">🍷</span>
          <h1 className="text-3xl font-serif text-accent-gold mt-4 neon-glow-gold">
            午后酒馆
          </h1>
          <p className="text-text-secondary mt-2">After Work Wine Bar</p>
        </div>

        {/* Login Card */}
        <div className="glass-effect rounded-2xl p-8">
          {/* Tabs */}
          <div className="flex mb-6 border-b border-white/10">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 pb-4 text-center transition-all ${
                isLogin
                  ? 'text-accent-gold border-b-2 border-accent-gold'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              登录
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 pb-4 text-center transition-all ${
                !isLogin
                  ? 'text-accent-gold border-b-2 border-accent-gold'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              注册
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-text-secondary text-sm mb-2">
                用户名
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg
                         text-text-primary placeholder-text-secondary/50
                         focus:outline-none focus:border-accent-gold/50 focus:ring-1 focus:ring-accent-gold/20
                         transition-all"
                placeholder="输入用户名"
                required
                minLength={3}
                maxLength={20}
              />
            </div>

            <div>
              <label className="block text-text-secondary text-sm mb-2">
                密码
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg
                         text-text-primary placeholder-text-secondary/50
                         focus:outline-none focus:border-accent-gold/50 focus:ring-1 focus:ring-accent-gold/20
                         transition-all"
                placeholder="输入密码"
                required
                minLength={6}
              />
            </div>

            {error && (
              <div className="text-red-400 text-sm text-center py-2 bg-red-400/10 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-accent-wine text-text-primary rounded-lg
                       font-medium transition-all hover:bg-accent-wine-light
                       disabled:opacity-50 disabled:cursor-not-allowed
                       hover:scale-[1.02] active:scale-[0.98]"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  {isLogin ? '登录中...' : '注册中...'}
                </span>
              ) : (
                isLogin ? '进入酒馆' : '创建账号'
              )}
            </button>
          </form>

          {/* Skip */}
          <div className="mt-6 text-center">
            <button
              onClick={() => router.push('/')}
              className="text-text-secondary text-sm hover:text-accent-gold transition-colors"
            >
              游客模式进入 →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
