"use client";

import { useState } from "react";
import Link from "next/link";
import GlassAnimation from "@/components/GlassAnimation";

const wines = [
  {
    id: 1,
    name: "勃艮第黑皮诺",
    region: "法国勃艮第",
    grape: "黑皮诺",
    vintage: 2019,
    description: "优雅细腻，带有樱桃、覆盆子和淡淡的香料气息。酒体轻盈，单宁如丝般柔滑。",
    flavor: ["樱桃", "覆盆子", "香料", "森林地表"],
    pairing: "适合搭配鸭肉、菌菇类菜肴或软质奶酪",
  },
  {
    id: 2,
    name: "托斯卡纳经典",
    region: "意大利托斯卡纳",
    grape: "桑娇维塞",
    vintage: 2018,
    description: "成熟的红樱桃和香草风味，单宁紧致但不失柔和，矿物感明显。",
    flavor: ["红樱桃", "香草", "皮革", "矿物"],
    pairing: "完美搭配意大利面、牛排或成熟帕尔马奶酪",
  },
  {
    id: 3,
    name: "莫奈干白",
    region: "法国卢瓦尔河谷",
    grape: "长相思",
    vintage: 2021,
    description: "清新爽脆，柑橘和青苹果的香气，矿物质感明显，余味悠长。",
    flavor: ["青柠", "青苹果", "矿物质", "白花"],
    pairing: "适合搭配海鲜、生蚝或山羊奶酪",
  },
  {
    id: 4,
    name: "罗讷河谷红",
    region: "法国罗讷河谷",
    grape: "GSM混酿",
    vintage: 2017,
    description: "浓郁饱满，带有黑莓和紫罗兰的香气，伴有香料和甘草的味道。",
    flavor: ["黑莓", "紫罗兰", "香料", "甘草"],
    pairing: "搭配烤肉、炖菜或蓝纹奶酪",
  },
];

export default function BarPage() {
  const [selectedWine, setSelectedWine] = useState(wines[0]);
  const [tastingStep, setTastingStep] = useState(0);
  const [showWineList, setShowWineList] = useState(false);

  const tastingSteps = [
    { title: "观色", desc: "将酒杯倾斜45度，观察酒液的色泽和透明度" },
    { title: "闻香", desc: "轻轻旋转酒杯，深深吸入香气，感受层层风味" },
    { title: "品味", desc: "小酌一口，让酒液在口腔中流动，感受味觉的变化" },
    { title: "回味", desc: "咽下酒后，感受余韵在口腔中的停留和变化" },
  ];

  const handleNextStep = () => {
    setTastingStep((prev) => (prev < tastingSteps.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <span className="text-accent-gold text-xs sm:text-sm tracking-wider">TASTING ROOM</span>
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-serif text-text-primary mt-2 mb-3 sm:mb-4">
            私享品酒间
          </h1>
          <p className="text-text-secondary max-w-2xl mx-auto text-sm sm:text-base px-4">
            选一款心仪的酒，跟随导引，慢慢品味其中的韵味与故事
          </p>
        </div>

        {/* Mobile wine toggle */}
        <button
          onClick={() => setShowWineList(!showWineList)}
          className="md:hidden w-full mb-4 p-3 glass-effect rounded-xl flex items-center justify-between active:scale-[0.98]"
        >
          <span className="text-text-primary text-sm">选择酒款: <strong>{selectedWine.name}</strong></span>
          <span className="text-text-secondary">{showWineList ? "▲" : "▼"}</span>
        </button>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-12">
          {/* Left: Wine selection - hidden on mobile unless toggled */}
          <div className={`${showWineList ? 'block' : 'hidden md:block'}`}>
            {/* Wine list */}
            <div className="space-y-2 sm:space-y-4">
              {wines.map((wine) => (
                <button
                  key={wine.id}
                  onClick={() => {
                    setSelectedWine(wine);
                    setTastingStep(0);
                    setShowWineList(false);
                  }}
                  className={`w-full p-3 sm:p-6 rounded-xl text-left transition-all duration-200 touch-manipulation select-none active:scale-[0.98] ${
                    selectedWine.id === wine.id
                      ? "glass-effect border-accent-wine"
                      : "bg-primary-light/50 hover:bg-primary-light"
                  }`}
                  style={{ willChange: 'transform' }}
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div 
                      className="w-12 h-16 sm:w-16 sm:h-20 rounded-lg flex-shrink-0"
                      style={{
                        background: selectedWine.id === wine.id 
                          ? "linear-gradient(135deg, #8B2942 0%, #A33D56 100%)"
                          : "linear-gradient(135deg, #1A1A1A 0%, #252525 100%)",
                        boxShadow: selectedWine.id === wine.id 
                          ? "0 0 15px rgba(139, 41, 66, 0.4)" 
                          : "none",
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm sm:text-lg font-serif text-text-primary truncate">
                        {wine.name}
                      </h3>
                      <p className="text-text-secondary text-xs sm:text-sm truncate">
                        {wine.region} · {wine.grape} · {wine.vintage}
                      </p>
                    </div>
                    {selectedWine.id === wine.id && (
                      <span className="text-accent-wine text-lg sm:text-2xl flex-shrink-0">✓</span>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Selected wine details */}
            <div className="mt-4 sm:mt-8 p-4 sm:p-6 glass-effect rounded-xl">
              <h3 className="text-lg sm:text-2xl font-serif text-text-primary mb-2 sm:mb-4">
                {selectedWine.name}
              </h3>
              <p className="text-text-secondary leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
                {selectedWine.description}
              </p>
              
              <div className="mb-4 sm:mb-6">
                <h4 className="text-accent-gold text-xs sm:text-sm mb-2 sm:mb-3">风味特征</h4>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {selectedWine.flavor.map((f, i) => (
                    <span 
                      key={i}
                      className="px-2 sm:px-3 py-0.5 sm:py-1 bg-accent-wine/20 rounded-full text-xs sm:text-sm text-text-primary"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-accent-gold text-xs sm:text-sm mb-1 sm:mb-2">餐酒搭配</h4>
                <p className="text-text-secondary text-xs sm:text-sm">{selectedWine.pairing}</p>
              </div>
            </div>
          </div>

          {/* Right: Tasting experience */}
          <div>
            <div className="lg:sticky lg:top-24">
              {/* Glass animation */}
              <div className="glass-effect rounded-2xl p-4 sm:p-8 mb-4 sm:mb-8">
                <div className="flex justify-center mb-4 sm:mb-6">
                  <GlassAnimation 
                    color="#8B2942" 
                    size="md"
                  />
                </div>
                
                {/* Tasting progress */}
                <div className="flex justify-center gap-2 mb-4 sm:mb-6">
                  {tastingSteps.map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 sm:w-3 h-2 sm:h-3 rounded-full transition-all duration-300 ${
                        i <= tastingStep ? "bg-accent-wine" : "bg-text-secondary/30"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Tasting guide */}
              <div className="glass-effect rounded-xl p-4 sm:p-6">
                <h4 className="text-lg sm:text-xl font-serif text-text-primary mb-2">
                  {tastingSteps[tastingStep].title}
                </h4>
                <p className="text-text-secondary leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
                  {tastingSteps[tastingStep].desc}
                </p>

                <button
                  onClick={handleNextStep}
                  className="w-full py-2.5 sm:py-3 bg-accent-wine text-text-primary rounded-lg font-medium transition-all duration-200 active:scale-95 touch-manipulation text-sm sm:text-base"
                >
                  {tastingStep < tastingSteps.length - 1 ? "下一步 →" : "重新开始 ↺"}
                </button>
              </div>

              {/* Tips */}
              <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-accent-gold/10 rounded-lg border border-accent-gold/20">
                <p className="text-accent-gold text-xs sm:text-sm">
                  💡 小贴士：品酒时保持环境光线充足，温度适宜（红酒16-18°C，白酒8-12°C），更能体验到酒的完整风味。
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section: Wine knowledge */}
        <div className="mt-20">
          {/* Game Hint - 克制入口 */}
          <div className="text-center mb-8">
            <button 
              onClick={() => alert('🎲 骰子在手边，想玩随时招呼~')}
              className="text-text-secondary/60 text-xs hover:text-text-secondary transition-colors"
            >
              🎲 酒令骰子在手边
            </button>
          </div>

          <h2 className="text-2xl font-serif text-text-primary text-center mb-8">
            品酒小知识
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="glass-effect rounded-xl p-4 sm:p-6 text-center">
              <span className="text-3xl sm:text-4xl mb-3 sm:mb-4 block">👁️</span>
              <h3 className="text-base sm:text-lg font-serif text-text-primary mb-1 sm:mb-2">观色</h3>
              <p className="text-text-secondary text-xs sm:text-sm">
                倾斜酒杯观察酒液的边缘颜色，红酒从紫红到砖红，白酒从青柠色到金黄。
              </p>
            </div>
            <div className="glass-effect rounded-xl p-4 sm:p-6 text-center">
              <span className="text-3xl sm:text-4xl mb-3 sm:mb-4 block">👃</span>
              <h3 className="text-base sm:text-lg font-serif text-text-primary mb-1 sm:mb-2">闻香</h3>
              <p className="text-text-secondary text-xs sm:text-sm">
                先闻静止的香气，再轻轻摇晃让香气释放，感受一层层展开的风味层次。
              </p>
            </div>
            <div className="glass-effect rounded-xl p-4 sm:p-6 text-center sm:col-span-2 md:col-span-1">
              <span className="text-3xl sm:text-4xl mb-3 sm:mb-4 block">👅</span>
              <h3 className="text-base sm:text-lg font-serif text-text-primary mb-1 sm:mb-2">品味</h3>
              <p className="text-text-secondary text-xs sm:text-sm">
                小口品尝，让酒液充分接触口腔各处，注意甜、酸、单宁和酒体的平衡。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
