'use client';

import { useState, useEffect, useCallback } from 'react';

interface FortuneResult {
  fortune: {
    emoji: string;
    name: string;
    color: string;
    desc: string;
    index: number;
  };
  luckyColor: string;
  luckyNumber: number;
  tip: string;
  date: string;
}

// 星光粒子组件
function StarParticle({ delay }: { delay: number }) {
  return (
    <div
      className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${delay}s`,
        opacity: Math.random() * 0.5 + 0.3,
      }}
    />
  );
}

// 水晶球组件
function CrystalBall({ isAnimating, isRevealed }: { isAnimating: boolean; isRevealed: boolean }) {
  return (
    <div className="relative w-64 h-64">
      {/* 外圈光环 */}
      <div className={`absolute inset-0 rounded-full ${isAnimating ? 'animate-pulse-glow' : ''}`}
        style={{
          background: 'conic-gradient(from 0deg, #8B5CF6, #D4AF37, #8B5CF6)',
          padding: '3px',
        }}
      >
        <div className="w-full h-full rounded-full bg-[#0D0D0D]" />
      </div>

      {/* 水晶球 */}
      <div className={`absolute inset-4 rounded-full overflow-hidden transition-all duration-1000 ${
        isRevealed ? 'scale-100' : 'scale-95'
      }`}>
        <div 
          className="w-full h-full rounded-full"
          style={{
            background: isRevealed 
              ? 'radial-gradient(circle at 30% 30%, #1a1a2e, #16213e, #0f0f23)'
              : 'radial-gradient(circle at 50% 50%, #2d2d4a, #1a1a2e, #0f0f23)',
          }}
        >
          {/* 水晶球内部光效 */}
          <div className="absolute inset-0 rounded-full overflow-hidden">
            {/* 高光 */}
            <div className={`absolute top-4 left-8 w-16 h-8 bg-white/20 rounded-full blur-sm ${isAnimating ? 'animate-pulse' : ''}`} />
            {/* 神秘符号（占卜结果时显示） */}
            {isRevealed && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-6xl animate-fade-in">🔮</div>
              </div>
            )}
            {/* 旋转符文（占卜中） */}
            {isAnimating && !isRevealed && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 border-2 border-purple-400/50 rounded-full animate-spin-slow">
                  <div className="absolute inset-2 border border-amber-400/30 rounded-full" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 底部光芒 */}
      <div className={`absolute -bottom-8 left-1/2 -translate-x-1/2 w-32 h-16 bg-gradient-to-t from-purple-500/50 to-transparent blur-xl transition-opacity duration-1000 ${isAnimating ? 'opacity-100' : 'opacity-0'}`} />
    </div>
  );
}

// 塔罗牌组件
function TarotCard({ isFlipping, isRevealed, onReveal }: { 
  isFlipping: boolean; 
  isRevealed: boolean;
  onReveal: () => void;
}) {
  const [flip, setFlip] = useState(false);

  useEffect(() => {
    if (isFlipping && !flip) {
      setTimeout(() => setFlip(true), 100);
    }
  }, [isFlipping, flip]);

  return (
    <div 
      className="relative w-40 h-56 cursor-pointer perspective-1000"
      onClick={!isRevealed ? onReveal : undefined}
    >
      <div 
        className={`relative w-full h-full transition-transform duration-1000 transform-style-3d ${
          flip ? 'rotate-y-180' : ''
        }`}
        style={{
          transformStyle: 'preserve-3d',
          transform: flip ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* 背面 */}
        <div 
          className="absolute w-full h-full rounded-xl overflow-hidden"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="w-full h-full bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 p-1">
            <div className="w-full h-full border-2 border-amber-400/50 rounded-lg flex items-center justify-center">
              <div className="text-6xl">✧</div>
            </div>
          </div>
        </div>

        {/* 正面 */}
        <div 
          className="absolute w-full h-full rounded-xl overflow-hidden rotate-y-180"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div className="w-full h-full bg-gradient-to-br from-amber-900 via-yellow-800 to-amber-950 p-1">
            <div className="w-full h-full border-2 border-amber-400/50 rounded-lg flex flex-col items-center justify-center p-4">
              <div className="text-5xl mb-2">🌟</div>
              <div className="text-amber-200 font-serif text-center">
                {isRevealed ? '命运已揭晓' : '点击翻转'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 翻转提示 */}
      {!isRevealed && (
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-purple-300 text-sm animate-pulse whitespace-nowrap">
          点击卡片揭示命运
        </div>
      )}
    </div>
  );
}

export default function FortunePage() {
  const [phase, setPhase] = useState<'intro' | 'crystal' | 'tarot' | 'result'>('intro');
  const [isAnimating, setIsAnimating] = useState(false);
  const [result, setResult] = useState<FortuneResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [cardRevealed, setCardRevealed] = useState(false);

  // 生成星光背景
  const stars = Array.from({ length: 50 }, (_, i) => i);

  const startFortune = useCallback(() => {
    setPhase('crystal');
    setIsAnimating(true);
    setLoading(true);

    // 水晶球动画 3 秒
    setTimeout(() => {
      setPhase('tarot');
    }, 3000);
  }, []);

  const revealCard = useCallback(() => {
    setCardRevealed(true);
    setIsAnimating(false);

    // 抽卡后 1.5 秒显示结果
    setTimeout(() => {
      setPhase('result');
      setLoading(true);
      fetch('/api/fortune')
        .then(res => res.json())
        .then(data => setResult(data))
        .finally(() => setLoading(false));
    }, 1500);
  }, []);

  const resetFortune = useCallback(() => {
    setPhase('intro');
    setIsAnimating(false);
    setResult(null);
    setCardRevealed(false);
  }, []);

  return (
    <div className="min-h-screen py-20 px-4 relative overflow-hidden">
      {/* 星光背景 */}
      <div className="fixed inset-0 pointer-events-none">
        {stars.map((i) => (
          <StarParticle key={i} delay={i * 0.1} />
        ))}
        {/* 渐变叠加 */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-950/20 via-transparent to-purple-950/30" />
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* 标题 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif text-amber-400 mb-4" 
            style={{ textShadow: '0 0 30px rgba(255, 215, 0, 0.5)' }}>
            🎴 今日占卜
          </h1>
          <p className="text-purple-300 text-lg">
            命运的齿轮已经开始转动...
          </p>
        </div>

        {/* 占卜内容区域 */}
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          {/* 阶段1: 介绍 */}
          {phase === 'intro' && (
            <div className="text-center animate-fade-in">
              <div className="text-8xl mb-8 animate-float">🔮</div>
              <h2 className="text-2xl text-purple-200 mb-4 font-serif">
                准备好接受命运的指引了吗？
              </h2>
              <p className="text-purple-400/70 mb-8 max-w-md mx-auto">
                水晶球将照见你的今日运势，塔罗牌将揭示命运的讯息...
              </p>
              <button
                onClick={startFortune}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 
                         text-white rounded-full font-medium text-lg
                         hover:from-purple-500 hover:to-indigo-500
                         transform hover:scale-105 transition-all duration-300
                         shadow-lg shadow-purple-500/30"
                style={{
                  animation: 'pulse-glow 2s infinite',
                }}
              >
                开始占卜 →
              </button>
            </div>
          )}

          {/* 阶段2: 水晶球 */}
          {phase === 'crystal' && (
            <div className="text-center animate-fade-in">
              <CrystalBall isAnimating={isAnimating} isRevealed={false} />
              <p className="mt-8 text-purple-300 animate-pulse">
                水晶球正在聚焦命运的光芒...
              </p>
            </div>
          )}

          {/* 阶段3: 塔罗牌 */}
          {phase === 'tarot' && (
            <div className="text-center animate-fade-in">
              <h2 className="text-2xl text-amber-300 mb-8 font-serif">
                请抽取一张命运之牌
              </h2>
              <div className="flex justify-center">
                <TarotCard 
                  isFlipping={isAnimating} 
                  isRevealed={cardRevealed}
                  onReveal={revealCard}
                />
              </div>
            </div>
          )}

          {/* 阶段4: 结果 */}
          {phase === 'result' && result && (
            <div className="text-center animate-fade-in w-full max-w-2xl">
              {/* 主运势 */}
              <div className="glass-effect rounded-3xl p-8 mb-8 border border-purple-500/30">
                <div 
                  className="text-8xl mb-4"
                  style={{ textShadow: `0 0 30px ${result.fortune.color}` }}
                >
                  {result.fortune.emoji}
                </div>
                <h2 
                  className="text-4xl font-serif mb-2"
                  style={{ color: result.fortune.color }}
                >
                  {result.fortune.name}
                </h2>
                <p className="text-purple-200 text-lg">
                  {result.fortune.desc}
                </p>
              </div>

              {/* 详细信息 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="glass-effect rounded-xl p-4 border border-amber-500/20">
                  <div className="text-3xl mb-2">🎨</div>
                  <div className="text-purple-300 text-sm">幸运颜色</div>
                  <div className="text-amber-400 text-xl font-serif">{result.luckyColor}</div>
                </div>
                <div className="glass-effect rounded-xl p-4 border border-amber-500/20">
                  <div className="text-3xl mb-2">🔢</div>
                  <div className="text-purple-300 text-sm">幸运数字</div>
                  <div className="text-amber-400 text-xl font-serif">{result.luckyNumber}</div>
                </div>
                <div className="glass-effect rounded-xl p-4 border border-amber-500/20">
                  <div className="text-3xl mb-2">🍷</div>
                  <div className="text-purple-300 text-sm">适合酒水</div>
                  <div className="text-amber-400 text-lg font-serif">香槟特酿</div>
                </div>
              </div>

              {/* 今日提示 */}
              <div className="glass-effect rounded-xl p-6 border border-purple-500/30 mb-8">
                <div className="text-2xl mb-3">💫 今日指引</div>
                <p className="text-purple-100 text-lg leading-relaxed">
                  &ldquo;{result.tip}&rdquo;
                </p>
              </div>

              {/* 日期 */}
              <div className="text-purple-400/50 text-sm mb-8">
                占卜日期：{result.date}
              </div>

              {/* 重新占卜 */}
              <button
                onClick={resetFortune}
                className="px-6 py-3 border border-purple-500/50 text-purple-300 
                         rounded-full hover:bg-purple-500/20 transition-all"
              >
                再占一卦
              </button>
            </div>
          )}

          {/* Loading */}
          {loading && phase === 'result' && (
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
              <p className="text-purple-300 mt-4 animate-pulse">命运正在揭晓...</p>
            </div>
          )}
        </div>
      </div>

      {/* 额外动画样式 */}
      <style jsx global>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(139, 92, 246, 0.5); }
          50% { box-shadow: 0 0 40px rgba(139, 92, 246, 0.8); }
        }
        .animate-twinkle { animation: twinkle 3s infinite; }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-fade-in { animation: fade-in 0.8s ease-out; }
        .animate-spin-slow { animation: spin-slow 4s linear infinite; }
        .perspective-1000 { perspective: 1000px; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </div>
  );
}
