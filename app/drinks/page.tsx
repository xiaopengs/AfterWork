"use client";

import { useState, useEffect } from "react";
import { Card, Badge, FadeIn } from "@/components/ui";
import { useRouter } from "next/navigation";

const drinkCategories = [
  { id: "whisky", name: "威士忌", icon: "🥃", color: "#D4A574" },
  { id: "wine", name: "葡萄酒", icon: "🍷", color: "#8B2942" },
  { id: "cocktail", name: "鸡尾酒", icon: "🍹", color: "#4ECDC4" },
  { id: "beer", name: "精酿啤酒", icon: "🍺", color: "#FFE66D" },
];

const drinksData: Record<string, Array<{
  id: string;
  name: string;
  price: string;
  desc: string;
  mood: string;
  moodColor: string;
  tags: string[];
}>> = {
  whisky: [
    { id: "w1", name: "落日威士忌", price: "¥128", desc: "如落日般温暖的威士忌", mood: "温暖", moodColor: "#FF6B6B", tags: ["烈性", "醇厚"] },
    { id: "w2", name: "月光马天尼", price: "¥98", desc: "适合独自沉思的夜晚", mood: "深思", moodColor: "#4ECDC4", tags: ["清冽", "优雅"] },
    { id: "w3", name: "琥珀之泪", price: "¥158", desc: "陈年佳酿的深沉韵味", mood: "怀旧", moodColor: "#DDA0DD", tags: ["陈年", "复杂"] },
  ],
  wine: [
    { id: "v1", name: "黑皮诺之夜", price: "¥188", desc: "勃艮第产区的优雅", mood: "沉思", moodColor: "#4ECDC4", tags: ["柔和", "果香"] },
    { id: "v2", name: "赤霞珠之魂", price: "¥228", desc: "饱满圆润的经典口感", mood: "深沉", moodColor: "#8B2942", tags: ["饱满", "丹宁"] },
    { id: "v3", name: "桃红酒韵", price: "¥98", desc: "初恋般的清甜", mood: "俏皮", moodColor: "#FF6B9D", tags: ["清新", "轻盈"] },
  ],
  cocktail: [
    { id: "c1", name: "彩虹气泡", price: "¥88", desc: "带着气泡的甜蜜", mood: "俏皮", moodColor: "#FFE66D", tags: ["甜", "气泡"] },
    { id: "c2", name: "雾都孤儿", price: "¥108", desc: "伦敦雾夜的迷醉", mood: "裂隙", moodColor: "#A8E6CF", tags: ["神秘", "烟熏"] },
    { id: "c3", name: "血腥玛丽", price: "¥118", desc: "大胆的红色诱惑", mood: "猎奇", moodColor: "#FF8C00", tags: ["辛辣", "大胆"] },
  ],
  beer: [
    { id: "b1", name: "IPA风暴", price: "¥68", desc: "热带风情的苦涩", mood: "热情", moodColor: "#FF6B6B", tags: ["苦", "果香"] },
    { id: "b2", name: "黑啤深沉", price: "¥58", desc: "咖啡与巧克力的融合", mood: "深沉", moodColor: "#4A3728", tags: ["烘烤", "顺滑"] },
    { id: "b3", name: "小麦白啤", price: "¥48", desc: "夏日微风的轻爽", mood: "温暖", moodColor: "#FFE66D", tags: ["清爽", "果香"] },
  ],
};

const moodTags: Record<string, { emoji: string; color: string }> = {
  温暖: { emoji: "🔥", color: "#FF6B6B" },
  深思: { emoji: "🌊", color: "#4ECDC4" },
  俏皮: { emoji: "✨", color: "#FFE66D" },
  裂隙: { emoji: "⚡", color: "#A8E6CF" },
  怀旧: { emoji: "📜", color: "#DDA0DD" },
  猎奇: { emoji: "🔮", color: "#FF8C00" },
  深沉: { emoji: "🌙", color: "#8B2942" },
  热情: { emoji: "💫", color: "#FF8C69" },
};

export default function DrinksPage() {
  const [activeCategory, setActiveCategory] = useState("whisky");
  const [selectedDrink, setSelectedDrink] = useState<string | null>(null);
  const router = useRouter();

  const drinks = drinksData[activeCategory] || [];

  return (
    <div className="min-h-screen pb-20">
      {/* Header Section */}
      <div className="px-4 py-8 text-center">
        <FadeIn>
          <h1 className="text-3xl font-serif text-[#F5F5F5] mb-2">
            <span className="text-[#D4A574]">美酒</span>推荐
          </h1>
          <p className="text-[#A0A0A0] text-sm tracking-wider">
            为你的心情甄选一杯
          </p>
        </FadeIn>
      </div>

      {/* Category Tabs */}
      <div className="px-4 mb-6 overflow-x-auto">
        <div className="flex gap-3 min-w-max">
          {drinkCategories.map((category, index) => (
            <FadeIn key={category.id} delay={index * 100}>
              <button
                onClick={() => setActiveCategory(category.id)}
                className={`
                  px-5 py-3 rounded-2xl
                  transition-all duration-300
                  flex items-center gap-2
                  ${
                    activeCategory === category.id
                      ? "scale-105"
                      : "hover:scale-102"
                  }
                `}
                style={{
                  background:
                    activeCategory === category.id
                      ? `${category.color}20`
                      : "rgba(255,255,255,0.03)",
                  border: `1px solid ${
                    activeCategory === category.id
                      ? `${category.color}60`
                      : "rgba(255,255,255,0.08)"
                  }`,
                }}
              >
                <span className="text-xl">{category.icon}</span>
                <span
                  className="text-sm font-medium"
                  style={{
                    color:
                      activeCategory === category.id
                        ? category.color
                        : "#A0A0A0",
                  }}
                >
                  {category.name}
                </span>
              </button>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* Drinks Grid */}
      <div className="px-4 space-y-4">
        {drinks.map((drink, index) => (
          <FadeIn key={drink.id} delay={index * 80}>
            <Card
              hover
              className={`
                relative overflow-hidden
                ${selectedDrink === drink.id ? "ring-2" : ""}
              `}
              glow={selectedDrink === drink.id ? drink.moodColor : undefined}
            >
              <div
                className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10 blur-3xl"
                style={{ backgroundColor: drink.moodColor }}
              />
              
              <div className="relative flex items-start gap-4">
                {/* Drink Color Indicator */}
                <div
                  className="w-3 h-16 rounded-full mt-1 shrink-0"
                  style={{
                    background: `linear-gradient(to bottom, ${drink.moodColor}, ${drink.moodColor}40)`,
                    boxShadow: `0 0 12px ${drink.moodColor}60`,
                  }}
                />

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-[#F5F5F5] font-medium text-lg">
                        {drink.name}
                      </h3>
                      <p className="text-[#A0A0A0] text-sm mt-1">
                        {drink.desc}
                      </p>
                    </div>
                    <span
                      className="text-lg font-serif shrink-0"
                      style={{ color: drink.moodColor }}
                    >
                      {drink.price}
                    </span>
                  </div>

                  {/* Tags & Mood */}
                  <div className="flex items-center gap-2 mt-3 flex-wrap">
                    <Badge color={drink.moodColor}>
                      <span className="mr-1">
                        {moodTags[drink.mood]?.emoji}
                      </span>
                      {drink.mood}
                    </Badge>
                    {drink.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-xs text-[#A0A0A0] bg-[rgba(255,255,255,0.05)] rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Select Button */}
              <button
                onClick={() => setSelectedDrink(selectedDrink === drink.id ? null : drink.id)}
                className={`
                  absolute bottom-4 right-4
                  w-8 h-8 rounded-full
                  transition-all duration-300
                  flex items-center justify-center
                `}
                style={{
                  backgroundColor: selectedDrink === drink.id ? drink.moodColor : "rgba(255,255,255,0.05)",
                  color: selectedDrink === drink.id ? "#0D0D0D" : "#A0A0A0",
                }}
              >
                {selectedDrink === drink.id ? "✓" : "+"}
              </button>
            </Card>
          </FadeIn>
        ))}
      </div>

      {/* Bottom Action */}
      {selectedDrink && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0Dee] to-transparent">
          <FadeIn direction="up">
            <button
              onClick={() => router.push("/bar")}
              className="w-full py-4 rounded-2xl font-medium text-lg tracking-wider
                bg-gradient-to-r from-[#8B2942] to-[#A33D56]
                text-[#F5F5F5]
                shadow-lg shadow-[rgba(139,41,66,0.4)]
                transition-all duration-300
                hover:scale-[1.02] active:scale-[0.98]
              "
            >
              开始品鉴
            </button>
          </FadeIn>
        </div>
      )}

      <style jsx global>{`
        .hover\\:scale-102:hover {
          transform: scale(1.02);
        }
      `}</style>
    </div>
  );
}