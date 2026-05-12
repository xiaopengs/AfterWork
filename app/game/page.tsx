'use client';

// 21点游戏页面 - Blackjack Game Page
import { useEffect } from 'react';
import { useGameStore } from '@/lib/store/gameStore';
import Card from '@/components/game/Card';

export default function GamePage() {
  const {
    playerHand,
    dealerHand,
    phase,
    playerScore,
    dealerScore,
    bet,
    chips,
    result,
    message,
    startGame,
    playerHit,
    playerStand,
    playerDouble,
    resetGame,
    history,
  } = useGameStore();

  // 计算庄家可见分数
  const visibleDealerScore = dealerHand.reduce((acc, card) => {
    if (card.hidden) return acc;
    return acc + card.value;
  }, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-900 to-green-950 p-4">
      {/* 顶部信息栏 */}
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="bg-amber-900/80 px-6 py-3 rounded-xl border border-amber-700">
            <p className="text-amber-200 text-sm">你的筹码</p>
            <p className="text-3xl font-bold text-amber-100">💰 {chips}</p>
          </div>
          <h1 className="text-3xl font-bold text-amber-100 tracking-wider" style={{ fontFamily: 'Georgia, serif' }}>
            🎰 二十一点
          </h1>
          <button
            onClick={resetGame}
            className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg text-white text-sm"
          >
            重新开始
          </button>
        </div>

        {/* 庄家区域 */}
        <div className="bg-green-800/50 rounded-2xl p-6 mb-4 border-2 border-green-700">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl text-amber-100 font-semibold">🎴 庄家</h2>
            <span className="text-lg text-amber-200">
              {dealerHand.some(c => c.hidden) ? `${visibleDealerScore} + ?` : dealerScore}
            </span>
          </div>
          <div className="flex justify-center gap-4 min-h-[120px]">
            {dealerHand.length === 0 ? (
              <div className="text-amber-200/50 text-lg">等待发牌...</div>
            ) : (
              dealerHand.map((card, index) => (
                <div
                  key={index}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <Card card={card} size="lg" />
                </div>
              ))
            )}
          </div>
        </div>

        {/* 结果信息 */}
        {message && (
          <div className={`
            text-center py-4 px-6 rounded-xl mb-4 text-xl font-bold
            ${result === 'player_win' || result === 'blackjack' 
              ? 'bg-green-600 text-white animate-pulse' 
              : result === 'dealer_win' 
                ? 'bg-red-600 text-white' 
                : 'bg-yellow-600 text-white'
            }
          `}>
            {message}
          </div>
        )}

        {/* 玩家区域 */}
        <div className="bg-green-800/50 rounded-2xl p-6 mb-4 border-2 border-green-700">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl text-amber-100 font-semibold">🎴 你</h2>
            <span className="text-lg text-amber-200">{playerScore}</span>
          </div>
          <div className="flex justify-center gap-4 min-h-[120px]">
            {playerHand.length === 0 ? (
              <div className="text-amber-200/50 text-lg">点击开始游戏</div>
            ) : (
              playerHand.map((card, index) => (
                <div
                  key={index}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <Card card={card} size="lg" />
                </div>
              ))
            )}
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="flex justify-center gap-4 flex-wrap">
          {phase === 'betting' && playerHand.length === 0 && (
            <>
              {[10, 25, 50, 100].map(amount => (
                <button
                  key={amount}
                  onClick={() => startGame(amount)}
                  disabled={chips < amount}
                  className={`
                    px-8 py-4 rounded-xl text-xl font-bold transition-all
                    ${chips >= amount 
                      ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-lg hover:scale-105' 
                      : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    }
                  `}
                >
                  💰 下注 {amount}
                </button>
              ))}
            </>
          )}

          {phase === 'playing' && playerHand.length > 0 && (
            <>
              <button
                onClick={playerHit}
                disabled={chips < bet && playerHand.length >= 2}
                className="px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xl font-bold shadow-lg hover:scale-105 transition-all disabled:opacity-50"
              >
                📥 要牌
              </button>
              <button
                onClick={playerStand}
                className="px-8 py-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xl font-bold shadow-lg hover:scale-105 transition-all"
              >
                ✋ 停牌
              </button>
              {playerHand.length === 2 && chips >= bet && (
                <button
                  onClick={playerDouble}
                  className="px-8 py-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xl font-bold shadow-lg hover:scale-105 transition-all"
                >
                  ⏩ 双倍
                </button>
              )}
            </>
          )}

          {phase === 'result' && (
            <button
              onClick={resetGame}
              className="px-8 py-4 rounded-xl bg-green-600 hover:bg-green-500 text-white text-xl font-bold shadow-lg hover:scale-105 transition-all"
            >
              🔄 再来一局
            </button>
          )}
        </div>

        {/* 历史记录 */}
        {history.length > 0 && (
          <div className="mt-8 bg-black/30 rounded-xl p-4">
            <h3 className="text-amber-200 text-lg font-semibold mb-3">📜 最近记录</h3>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {history.slice(0, 10).map((item, index) => (
                <div
                  key={index}
                  className={`
                    px-3 py-2 rounded-lg text-sm whitespace-nowrap
                    ${item.result === 'player_win' || item.result === 'blackjack' 
                      ? 'bg-green-600/50 text-green-200' 
                      : item.result === 'push'
                        ? 'bg-yellow-600/50 text-yellow-200'
                        : 'bg-red-600/50 text-red-200'
                    }
                  `}
                >
                  {item.result === 'blackjack' ? '♠ BJ' : item.result === 'player_win' ? '胜' : item.result === 'push' ? '平' : '负'}
                  <span className="ml-1 text-xs opacity-75">{item.bet}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 规则说明 */}
        <div className="mt-6 text-amber-200/60 text-sm text-center">
          <p>A 可以是 1 或 11，J/Q/K 都算 10 点</p>
          <p>超过 21 点爆牌输，双倍下注后只能再要一张牌</p>
        </div>
      </div>

      {/* 添加动画样式 */}
      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}