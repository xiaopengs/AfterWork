"use client";

import { useState } from "react";
import MemoryCard from "@/components/MemoryCard";

const memories = [
  {
    id: 1,
    title: "初秋的傍晚",
    content: "第一次走进这家酒馆，就被那昏黄的灯光吸引了。点了一杯勃艮第，一个人坐在角落，看着窗外渐暗的天色。酒香在唇齿间停留，那一刻，所有的烦恼都暂时放下了。",
    mood: "放松",
    date: "2024年9月15日",
    wine: "勃艮第黑皮诺 2019",
    color: "#8B2942",
    emoji: "🌅",
  },
  {
    id: 2,
    title: "老友重逢",
    content: "五年未见的老朋友，从国外回来。我们点了整整一桌酒，从白葡萄酒喝到红酒，聊着彼此这些年的变化。友情这东西，果然是越陈越香。",
    mood: "愉悦",
    date: "2024年10月2日",
    wine: "莫奈干白 & 桑娇维塞",
    color: "#D4A574",
    emoji: "🥂",
  },
  {
    id: 3,
    title: "生日的微醺",
    content: "今年的生日没有大操大办，就和最爱的人在这里度过。一瓶好酒，一个安静的夜晚，比任何喧嚣都珍贵。窗外飘着细雨，屋内是温暖的灯光和她明媚的笑容。",
    mood: "沉醉",
    date: "2024年11月20日",
    wine: "香槟特酿",
    color: "#9B59B6",
    emoji: "🎂",
  },
  {
    id: 4,
    title: "独自思考的夜晚",
    content: "工作遇到了瓶颈，独自来到这里思考人生。调酒师推荐了一款波特酒，甜蜜中带着些许苦涩，像极了当下的心境。但正如这酒一样，苦尽总会甘来。",
    mood: "怀念",
    date: "2024年12月5日",
    wine: "葡萄牙波特酒",
    color: "#A0A0A0",
    emoji: "🌧️",
  },
  {
    id: 5,
    title: "第一次约会",
    content: "鼓起勇气约了她，没想到她对葡萄酒也很有研究。我们从第一瓶聊到最后一瓶，发现彼此有太多相似的喜好。临走时，她笑着说下次要带我来这里。",
    mood: "微醺",
    date: "2025年1月18日",
    wine: "桃红普罗旺斯",
    color: "#FF6B9D",
    emoji: "💕",
  },
  {
    id: 6,
    title: "写作的灵感",
    content: "坐在吧台边，手里握着一杯红酒，思绪飘向了很远的地方。有时候灵感就是这样，在微醺中不期而至。那个晚上，我写完了搁置半年的故事开头。",
    mood: "放松",
    date: "2025年2月14日",
    wine: "罗讷河GSM混酿",
    color: "#4ECDC4",
    emoji: "✍️",
  },
];

export default function MemoriesPage() {
  const [filter, setFilter] = useState<string>("全部");
  const moods = ["全部", "微醺", "沉醉", "愉悦", "放松", "怀念"];

  const filteredMemories = filter === "全部" 
    ? memories 
    : memories.filter(m => m.mood === filter);

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-accent-gold text-sm tracking-wider">MEMORIES</span>
          <h1 className="text-4xl md:text-5xl font-serif text-text-primary mt-2 mb-4">
            午后回忆墙
          </h1>
          <p className="text-text-secondary max-w-2xl mx-auto">
            每一杯酒背后，都有一个故事。<br />
            这里是酒客们留下的珍贵回忆，温暖而动人。
          </p>
        </div>

        {/* Decorative quote */}
        <div className="text-center mb-12">
          <blockquote className="text-xl font-serif text-accent-gold italic">
            &ldquo;有些地方，存放着时光的温度；<br />
            有些味道，承载着记忆的重量。&rdquo;
          </blockquote>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {moods.map((mood) => (
            <button
              key={mood}
              onClick={() => setFilter(mood)}
              className={`px-5 py-2 rounded-full text-sm transition-all duration-300 ${
                filter === mood
                  ? "bg-accent-wine text-text-primary scale-105"
                  : "bg-primary-light text-text-secondary hover:text-text-primary hover:bg-primary-light/80"
              }`}
            >
              {mood}
            </button>
          ))}
        </div>

        {/* Memories grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMemories.map((memory) => (
            <MemoryCard
              key={memory.id}
              {...memory}
            />
          ))}
        </div>

        {/* Empty state */}
        {filteredMemories.length === 0 && (
          <div className="text-center py-20">
            <span className="text-6xl mb-4 block">📭</span>
            <p className="text-text-secondary">暂无符合条件的回忆</p>
          </div>
        )}

        {/* Stats section */}
        <div className="mt-20 glass-effect rounded-2xl p-8">
          <h2 className="text-2xl font-serif text-text-primary text-center mb-8">
            回忆墙数据
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-4xl font-serif text-accent-gold mb-2">{memories.length}</p>
              <p className="text-text-secondary text-sm">温暖故事</p>
            </div>
            <div>
              <p className="text-4xl font-serif text-accent-wine mb-2">8</p>
              <p className="text-text-secondary text-sm">涉及酒款</p>
            </div>
            <div>
              <p className="text-4xl font-serif text-neon-pink mb-2">6</p>
              <p className="text-text-secondary text-sm">心情标签</p>
            </div>
            <div>
              <p className="text-4xl font-serif text-neon-blue mb-2">∞</p>
              <p className="text-text-secondary text-sm">未完待续</p>
            </div>
          </div>
        </div>

        {/* Leave memory CTA */}
        <div className="mt-12 text-center">
          <div className="glass-effect rounded-xl p-8 max-w-lg mx-auto">
            <span className="text-4xl mb-4 block">✍️</span>
            <h3 className="text-xl font-serif text-text-primary mb-3">
              分享你的故事
            </h3>
            <p className="text-text-secondary text-sm mb-6">
              每一次品酒，都是一段独特的故事。欢迎来到这里，
              留下属于你的回忆。
            </p>
            <button className="px-6 py-3 bg-accent-wine text-text-primary rounded-lg font-medium transition-all duration-300 hover:bg-accent-wine-light">
              记录此刻
            </button>
          </div>
        </div>

        {/* Floating decoration */}
        <div className="fixed bottom-8 right-8 opacity-20 pointer-events-none">
          <span className="text-6xl float-animation">🍷</span>
        </div>
      </div>
    </div>
  );
}
