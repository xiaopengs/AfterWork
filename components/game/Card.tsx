'use client';

// 扑克牌组件 - Card Component
import { Card as CardType, getSuitSymbol, getSuitColor } from '@/lib/game/blackjack';

interface CardProps {
  card: CardType;
  size?: 'sm' | 'md' | 'lg';
  showBack?: boolean;
}

export default function Card({ card, size = 'md', showBack }: CardProps) {
  // 如果牌是隐藏的，显示背面
  if (card.hidden || showBack) {
    return (
      <div className={`
        relative rounded-lg border-2 border-amber-700 bg-gradient-to-br from-amber-800 to-amber-900
        flex items-center justify-center shadow-lg
        ${size === 'sm' ? 'w-12 h-16' : size === 'lg' ? 'w-28 h-40' : 'w-20 h-28'}
      `}>
        <div className="absolute inset-2 rounded border border-amber-600/50" />
        <div className="text-amber-600/30 text-2xl font-serif">♠</div>
        <div className="absolute top-1 left-1 text-amber-700/40 text-xs">♠</div>
        <div className="absolute bottom-1 right-1 text-amber-700/40 text-xs rotate-180">♠</div>
      </div>
    );
  }

  const suitSymbol = getSuitSymbol(card.suit);
  const suitColor = getSuitColor(card.suit);
  const isRed = card.suit === 'hearts' || card.suit === 'diamonds';

  const sizeClasses = {
    sm: { card: 'w-12 h-16', font: 'text-xs', symbol: 'text-lg' },
    md: { card: 'w-20 h-28', font: 'text-sm', symbol: 'text-2xl' },
    lg: { card: 'w-28 h-40', font: 'text-base', symbol: 'text-4xl' },
  };

  const { card: cardClass, font, symbol } = sizeClasses[size];

  // 大小王特殊花色显示
  const rankDisplay = card.rank;

  return (
    <div className={`
      ${cardClass} 
      bg-white rounded-lg border-2 border-gray-200 shadow-lg 
      flex flex-col items-center justify-between p-1
      transition-transform hover:scale-105
    `}>
      {/* 左上角 */}
      <div className={`self-start ${font} font-bold ${isRed ? 'text-red-500' : 'text-gray-800'}`}>
        <div>{rankDisplay}</div>
        <div className={symbol}>{suitSymbol}</div>
      </div>
      
      {/* 中间大符号 */}
      <div className={`${symbol} ${isRed ? 'text-red-500' : 'text-gray-800'}`}>
        {suitSymbol}
      </div>
      
      {/* 右下角 */}
      <div className={`self-end ${font} font-bold ${isRed ? 'text-red-500' : 'text-gray-800'} rotate-180`}>
        <div>{rankDisplay}</div>
        <div className={symbol}>{suitSymbol}</div>
      </div>
    </div>
  );
}

// 发牌动画组件
interface DealAnimationProps {
  cards: CardType[];
  delay?: number;
}

export function DealAnimation({ cards, delay = 100 }: DealAnimationProps) {
  return (
    <div className="flex gap-2">
      {cards.map((card, index) => (
        <div
          key={index}
          className="animate-deal"
          style={{ 
            animationDelay: `${index * delay}ms`,
            animationFillMode: 'both' 
          }}
        >
          <Card card={card} size="lg" />
        </div>
      ))}
    </div>
  );
}