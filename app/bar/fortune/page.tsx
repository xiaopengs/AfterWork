"use client";

import { useState, useEffect, useCallback } from "react";

// Tarot Card Database
interface TarotCard {
  id: string;
  name: string;
  nameEn: string;
  type: "major" | "minor";
  arcana: string;
  symbol: string;
  upright: {
    meaning: string;
    love: string;
    career: string;
  };
  reversed: {
    meaning: string;
    love: string;
    career: string;
  };
  drink: {
    name: string;
    reason: string;
  };
}

const tarotCards: TarotCard[] = [
  // Major Arcana
  {
    id: "lovers",
    name: "恋人",
    nameEn: "The Lovers",
    type: "major",
    arcana: "大阿尔卡纳",
    symbol: "♊",
    upright: {
      meaning: "爱与选择的十字路口，象征着内心的和谐与重要的抉择",
      love: "两人之间深刻的吸引与情感连接，可能是灵魂伴侣的出现",
      career: "需要做出关键决定，选择与价值观相符的道路",
    },
    reversed: {
      meaning: "犹豫不决、内心失衡，或过度的理想主义",
      love: "感情中的矛盾、沟通障碍或价值观冲突",
      career: "决策困难，可能需要重新审视职业方向",
    },
    drink: {
      name: "内格罗尼",
      reason: "苦与甜的完美平衡，正如恋人间微妙的情感交织",
    },
  },
  {
    id: "moon",
    name: "月亮",
    nameEn: "The Moon",
    type: "major",
    arcana: "大阿尔卡纳",
    symbol: "☾",
    upright: {
      meaning: "潜意识的迷雾，直觉与想象力的涌动",
      love: "神秘的情感纠葛，可能有隐藏的情感需要面对",
      career: "局势不明朗，需要依靠直觉判断方向",
    },
    reversed: {
      meaning: "从恐惧中解脱，拨开迷雾见到真相",
      love: "放下猜疑，重新建立信任与坦诚",
      career: "理清混乱的局面，看清真实的情况",
    },
    drink: {
      name: "蓝色夏威夷",
      reason: "如月光下神秘海洋般澄澈而深邃",
    },
  },
  {
    id: "star",
    name: "星星",
    nameEn: "The Star",
    type: "major",
    arcana: "大阿尔卡纳",
    symbol: "✧",
    upright: {
      meaning: "希望与灵感的源泉，身心平衡的宁静时刻",
      love: "真诚的感情表达，治愈与和解的可能",
      career: "灵感涌现，目标清晰可见",
    },
    reversed: {
      meaning: "希望暂时黯淡，需要重新找回内心的平静",
      love: "情感上的失落感，需要自我疗愈",
      career: "缺乏动力或方向感，需要重新设定目标",
    },
    drink: {
      name: "莫吉托",
      reason: "薄荷的清新如星光般照亮心田",
    },
  },
  {
    id: "sun",
    name: "太阳",
    nameEn: "The Sun",
    type: "major",
    arcana: "大阿尔卡纳",
    symbol: "☀",
    upright: {
      meaning: "纯粹的快乐、成功与活力的象征",
      love: "热烈而美好的情感，充满阳光的关系",
      career: "事业蒸蒸日上，收获认可与成功",
    },
    reversed: {
      meaning: "暂时的低落，或对快乐的过度追求",
      love: "关系中需要更多真诚与光明",
      career: "暂时的挫折，但不应失去信心",
    },
    drink: {
      name: "僵尸",
      reason: "热情似火的果香，如同太阳般充满能量",
    },
  },
  {
    id: "death",
    name: "死神",
    nameEn: "Death",
    type: "major",
    arcana: "大阿尔卡纳",
    symbol: "♰",
    upright: {
      meaning: "转变与重生，旧事物的结束与新生的开始",
      love: "放下过去的情感模式，迎接新的开始",
      career: "职业转型期，可能是突破的关键时刻",
    },
    reversed: {
      meaning: "抗拒改变，在结束与开始之间徘徊",
      love: "难以放下旧情，或在关系中停滞不前",
      career: "害怕改变带来的不确定性",
    },
    drink: {
      name: "教父",
      reason: "威士忌的醇厚，如同岁月沉淀后的智慧",
    },
  },
  {
    id: "wheel",
    name: "命运之轮",
    nameEn: "Wheel of Fortune",
    type: "major",
    arcana: "大阿尔卡纳",
    symbol: "☸",
    upright: {
      meaning: "命运的轮回，机遇与转折的到来",
      love: "关系可能出现新的发展机遇",
      career: "好运降临，把握关键的时机",
    },
    reversed: {
      meaning: "时运不济，或过度的控制欲",
      love: "关系中的反复无常，需要耐心等待",
      career: "机遇暂时未到，需要积蓄力量",
    },
    drink: {
      name: "马天尼",
      reason: "如命运般简约而深邃，变化无穷",
    },
  },
  // Minor Arcana - Wands
  {
    id: "wands-three",
    name: "权杖三",
    nameEn: "Three of Wands",
    type: "minor",
    arcana: "小阿尔卡纳 · 权杖",
    symbol: "🪄",
    upright: {
      meaning: "远见与探索，等待与展望的时机",
      love: "异地恋或对未来的共同规划",
      career: "业务拓展海外市场，眼光长远",
    },
    reversed: {
      meaning: "计划受阻，过度等待而错失良机",
      love: "缺乏沟通，关系进展缓慢",
      career: "计划未能实现，需要调整策略",
    },
    drink: {
      name: "金汤力",
      reason: "清爽而充满探索精神，如同远航的水手",
    },
  },
  // Minor Arcana - Cups
  {
    id: "cups-five",
    name: "圣杯五",
    nameEn: "Five of Cups",
    type: "minor",
    arcana: "小阿尔卡纳 · 圣杯",
    symbol: "🏆",
    upright: {
      meaning: "失落与悲伤，但也暗示着新的可能性",
      love: "情感上的失落，但应看到还拥有的",
      career: "项目失败或错失机会，需要重新振作",
    },
    reversed: {
      meaning: "放下悲伤，接受失去并向前看",
      love: "从失落中恢复，重新审视感情",
      career: "从挫折中学习，准备新的开始",
    },
    drink: {
      name: "咸狗",
      reason: "苦中带甜，如同经历后的淡然",
    },
  },
  // Minor Arcana - Swords
  {
    id: "swords-seven",
    name: "宝剑七",
    nameEn: "Seven of Swords",
    type: "minor",
    arcana: "小阿尔卡纳 · 宝剑",
    symbol: "⚔",
    upright: {
      meaning: "策略与智取，隐秘的行动",
      love: "可能存在欺骗或需要坦诚相对的时刻",
      career: "需要运用智慧解决问题，但要注意方法",
    },
    reversed: {
      meaning: "坦诚相见，放弃投机取巧",
      love: "打破隔阂，诚实面对感情",
      career: "诚实是最好的策略，正当途径更长久",
    },
    drink: {
      name: "马天尼",
      reason: "锐利而直接，正如坦诚的智慧",
    },
  },
  // Minor Arcana - Pentacles
  {
    id: "pentacles-six",
    name: "星币六",
    nameEn: "Six of Pentacles",
    type: "minor",
    arcana: "小阿尔卡纳 · 星币",
    symbol: "⬡",
    upright: {
      meaning: "给予与接受的平衡，慷慨与感恩",
      love: "在关系中付出与收获的平衡",
      career: "财务上的帮助或合作机会",
    },
    reversed: {
      meaning: "不平衡的给予，或接受时的不安",
      love: "关系中的不平等，需要调整",
      career: "财务问题，合作条件不公",
    },
    drink: {
      name: "勃艮第黑皮诺",
      reason: "优雅细腻，如同礼尚往来的温情",
    },
  },
  // Additional cards for variety
  {
    id: "magician",
    name: "魔术师",
    nameEn: "The Magician",
    type: "major",
    arcana: "大阿尔卡纳",
    symbol: "✴",
    upright: {
      meaning: "创造力的觉醒，行动力的开始",
      love: "吸引力增强，有新发展的可能",
      career: "技能得到发挥，项目即将启动",
    },
    reversed: {
      meaning: "才能未发挥，行动力不足",
      love: "沟通不畅，或缺乏行动力",
      career: "计划停留在想法阶段",
    },
    drink: {
      name: "莫吉托",
      reason: "清新活泼，充满创造的灵感",
    },
  },
  {
    id: "hermit",
    name: "隐士",
    nameEn: "The Hermit",
    type: "major",
    arcana: "大阿尔卡纳",
    symbol: "⛑",
    upright: {
      meaning: "内省与独处，寻找内心的指引",
      love: "独处思考的时期，或等待成熟的感情",
      career: "需要沉淀思考，不宜急于行动",
    },
    reversed: {
      meaning: "过度封闭，或逃避问题",
      love: "害怕独处，或过于依赖他人",
      career: "需要更多自我反思的时间",
    },
    drink: {
      name: "托斯卡纳经典",
      reason: "如岁月沉淀的智慧，独处而不孤独",
    },
  },
];

export default function FortunePage() {
  const [isShuffling, setIsShuffling] = useState(false);
  const [drawnCard, setDrawnCard] = useState<TarotCard | null>(null);
  const [isReversed, setIsReversed] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [lastDrawDate, setLastDrawDate] = useState<string | null>(null);
  const [canDraw, setCanDraw] = useState(true);

  // Check daily limit
  useEffect(() => {
    const savedDate = localStorage.getItem("tarotLastDraw");
    const today = new Date().toDateString();
    if (savedDate === today) {
      setCanDraw(false);
      setLastDrawDate(savedDate);
    }
  }, []);

  const handleShuffle = useCallback(() => {
    if (!canDraw || isShuffling) return;

    setIsShuffling(true);
    setShowResult(false);
    setDrawnCard(null);

    // Shuffle animation duration
    const shuffleDuration = 2000;
    const shuffleInterval = 100;

    let shuffleCount = 0;
    const maxShuffles = shuffleDuration / shuffleInterval;

    const interval = setInterval(() => {
      // Quick preview of random cards during shuffle
      const randomCard =
        tarotCards[Math.floor(Math.random() * tarotCards.length)];
      setDrawnCard(randomCard);
      shuffleCount++;

      if (shuffleCount >= maxShuffles) {
        clearInterval(interval);

        // Final draw
        const finalCard =
          tarotCards[Math.floor(Math.random() * tarotCards.length)];
        const reversed = Math.random() > 0.5;

        setDrawnCard(finalCard);
        setIsReversed(reversed);
        setIsShuffling(false);

        // Save draw date
        const today = new Date().toDateString();
        localStorage.setItem("tarotLastDraw", today);
        setLastDrawDate(today);
        setCanDraw(false);

        // Show result after flip animation
        setTimeout(() => setShowResult(true), 500);
      }
    }, shuffleInterval);
  }, [canDraw, isShuffling]);

  const resetDaily = () => {
    const today = new Date().toDateString();
    // Allow reset if the saved date is different from today
    const savedDate = localStorage.getItem("tarotLastDraw");
    if (savedDate !== today) {
      setCanDraw(true);
      setDrawnCard(null);
      setShowResult(false);
      setIsReversed(false);
    }
  };

  return (
    <div className="min-h-screen py-6 sm:py-8 px-3 sm:px-4">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="text-accent-gold text-xs tracking-[0.3em]">
            FORTUNE TELLING
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif text-text-primary mt-2 mb-2">
            塔罗小筑
          </h1>
          <p className="text-text-secondary text-xs sm:text-sm">
            每日前路未卜，且让星辰为你指点迷津
          </p>
        </div>

        {/* Daily Limit Notice */}
        {!canDraw && (
          <div className="mb-6 p-4 glass-effect rounded-xl border border-accent-gold/30">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🌙</span>
              <div>
                <p className="text-text-primary text-sm font-medium">
                  今日已抽取
                </p>
                <p className="text-text-secondary text-xs">
                  星辰每日只回应一次，明日再来吧
                </p>
              </div>
            </div>
            <button
              onClick={resetDaily}
              className="mt-3 w-full py-2 text-accent-gold text-xs border border-accent-gold/30 rounded-lg hover:bg-accent-gold/10 transition-colors"
            >
              重新开始（测试用）
            </button>
          </div>
        )}

        {/* Card Area */}
        <div className="relative mb-8">
          {/* Card Back */}
          <div
            className={`
              mx-auto w-48 h-72 sm:w-56 sm:h-80 rounded-2xl
              bg-gradient-to-br from-[#1a1a1a] via-[#252525] to-[#1a1a1a]
              border border-accent-gold/30
              flex items-center justify-center
              transition-all duration-300
              ${isShuffling ? "animate-[shuffle_0.1s_ease-in-out_infinite]" : ""}
              ${drawnCard && !showResult ? "shadow-xl shadow-accent-gold/20" : ""}
            `}
            style={{
              boxShadow: drawnCard && !showResult
                ? "0 0 30px rgba(212, 165, 116, 0.2)"
                : "0 4px 20px rgba(0,0,0,0.3)",
            }}
          >
            {/* Card Back Pattern */}
            <div className="text-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 rounded-full border-2 border-accent-gold/40 flex items-center justify-center">
                <span className="text-3xl sm:text-4xl text-accent-gold/60">✧</span>
              </div>
              <p className="text-accent-gold/40 text-xs tracking-widest">
                TAROT
              </p>
            </div>
          </div>

          {/* Revealed Card */}
          {drawnCard && showResult && (
            <div
              className={`
                mx-auto w-48 h-72 sm:w-56 sm:h-80 rounded-2xl
                bg-gradient-to-br from-[#1a1a1a] via-[#252525] to-[#1a1a1a]
                border-2 ${isReversed ? "border-accent-wine" : "border-accent-gold"}
                p-4 sm:p-6
                flex flex-col
                animate-[fade-in_0.5s_ease-out]
                ${isReversed ? "rotate-180" : ""}
                transition-all duration-500
              `}
              style={{
                boxShadow: isReversed
                  ? "0 0 30px rgba(139, 41, 66, 0.3)"
                  : "0 0 30px rgba(212, 165, 116, 0.3)",
              }}
            >
              {/* Card Symbol */}
              <div className="text-center mb-3 sm:mb-4">
                <span className={`text-4xl sm:text-5xl ${isReversed ? "text-accent-wine" : "text-accent-gold"}`}>
                  {drawnCard.symbol}
                </span>
              </div>

              {/* Card Name */}
              <div className="text-center mb-3 sm:mb-4">
                <h3 className={`text-lg sm:text-xl font-serif ${isReversed ? "text-accent-wine" : "text-text-primary"}`}>
                  {drawnCard.name}
                </h3>
                <p className="text-text-secondary text-xs">{drawnCard.nameEn}</p>
                <span className={`inline-block mt-1 px-2 py-0.5 rounded text-xs ${isReversed ? "bg-accent-wine/30 text-accent-wine" : "bg-accent-gold/20 text-accent-gold"}`}>
                  {isReversed ? "逆位" : "正位"}
                </span>
              </div>

              {/* Arcana Type */}
              <div className="text-center">
                <span className="text-text-secondary text-xs">{drawnCard.arcana}</span>
              </div>
            </div>
          )}
        </div>

        {/* Draw Button */}
        <div className="text-center mb-8">
          <button
            onClick={handleShuffle}
            disabled={!canDraw || isShuffling}
            className={`
              px-8 py-3 rounded-full font-medium transition-all duration-200
              touch-manipulation active:scale-95
              ${canDraw && !isShuffling
                ? "bg-accent-gold text-[#0D0D0D] hover:bg-accent-gold-light shadow-lg shadow-accent-gold/30"
                : "bg-text-secondary/30 text-text-secondary cursor-not-allowed"
              }
            `}
          >
            {isShuffling ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin">✧</span>
                洗牌中...
              </span>
            ) : canDraw ? (
              "抽取今日指引"
            ) : (
              "明日再来"
            )}
          </button>
        </div>

        {/* Result Section */}
        {drawnCard && showResult && (
          <div className="space-y-4 animate-[slide-up_0.4s_ease-out]">
            {/* Meaning */}
            <div className="glass-effect rounded-xl p-4 sm:p-5">
              <h4 className={`text-sm font-medium mb-2 ${isReversed ? "text-accent-wine" : "text-accent-gold"}`}>
                {isReversed ? "逆位解读" : "正位解读"}
              </h4>
              <p className="text-text-primary text-sm leading-relaxed">
                {isReversed ? drawnCard.reversed.meaning : drawnCard.upright.meaning}
              </p>
            </div>

            {/* Aspect Readings */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="glass-effect rounded-xl p-4">
                <h5 className="text-text-secondary text-xs mb-1">💕 情感</h5>
                <p className="text-text-primary text-xs leading-relaxed">
                  {isReversed ? drawnCard.reversed.love : drawnCard.upright.love}
                </p>
              </div>
              <div className="glass-effect rounded-xl p-4">
                <h5 className="text-text-secondary text-xs mb-1">💼 事业</h5>
                <p className="text-text-primary text-xs leading-relaxed">
                  {isReversed ? drawnCard.reversed.career : drawnCard.upright.career}
                </p>
              </div>
            </div>

            {/* Drink Recommendation */}
            <div className="glass-effect rounded-xl p-4 sm:p-5 border border-accent-gold/20">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">🍷</span>
                <h4 className="text-accent-gold text-sm font-medium">星辰荐酒</h4>
              </div>
              <div className="bg-[#0D0D0D]/50 rounded-lg p-3">
                <p className="text-text-primary text-sm font-medium mb-1">
                  {drawnCard.drink.name}
                </p>
                <p className="text-text-secondary text-xs leading-relaxed">
                  {drawnCard.drink.reason}
                </p>
              </div>
            </div>

            {/* Mystical Quote */}
            <div className="text-center py-4">
              <p className="text-text-secondary/60 text-xs italic">
                &ldquo;塔罗不语，星辰有言&rdquo;
              </p>
            </div>
          </div>
        )}

        {/* Decorative Stars */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute text-accent-gold/10 text-xs animate-pulse-subtle"
              style={{
                top: `${15 + i * 18}%`,
                left: `${10 + i * 20}%`,
                animationDelay: `${i * 0.5}s`,
              }}
            >
              ✧
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes shuffle {
          0%, 100% { transform: translateX(0) rotate(0deg); }
          25% { transform: translateX(-5px) rotate(-1deg); }
          75% { transform: translateX(5px) rotate(1deg); }
        }
      `}</style>
    </div>
  );
}
