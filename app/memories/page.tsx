"use client";

import { useState, useEffect } from "react";
import MemoryCard from "@/components/MemoryCard";
import Link from "next/link";

interface Memory {
  id: string;
  content: string;
  mood: string;
  createdAt: string;
  drink?: {
    name: string;
  };
}

const defaultMemories = [
  {
    id: "demo1",
    title: "初秋的傍晚",
    content: "第一次走进这家酒馆，就被那昏黄的灯光吸引了。点了一杯勃艮第，一个人坐在角落，看着窗外渐暗的天色。酒香在唇齿间停留，那一刻，所有的烦恼都暂时放下了。",
    mood: "放松",
    date: "2024年9月15日",
    wine: "勃艮第黑皮诺 2019",
    color: "#8B2942",
    emoji: "🌅",
  },
  {
    id: "demo2",
    title: "老友重逢",
    content: "五年未见的老朋友，从国外回来。我们点了整整一桌酒，从白葡萄酒喝到红酒，聊着彼此这些年的变化。友情这东西，果然是越陈越香。",
    mood: "愉悦",
    date: "2024年10月2日",
    wine: "莫奈干白 & 桑娇维塞",
    color: "#D4A574",
    emoji: "🥂",
  },
  {
    id: "demo3",
    title: "生日的微醺",
    content: "今年的生日没有大操大办，就和最爱的人在这里度过。一瓶好酒，一个安静的夜晚，比任何喧嚣都珍贵。窗外飘着细雨，屋内是温暖的灯光和她明媚的笑容。",
    mood: "沉醉",
    date: "2024年11月20日",
    wine: "香槟特酿",
    color: "#9B59B6",
    emoji: "🎂",
  },
];

const moods = ["全部", "微醺", "沉醉", "愉悦", "放松", "怀念"];

export default function MemoriesPage() {
  const [filter, setFilter] = useState<string>("全部");
  const [userMemories, setUserMemories] = useState<Memory[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [newContent, setNewContent] = useState("");
  const [newMood, setNewMood] = useState("放松");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    if (token) {
      fetch("/api/memories", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setUserMemories(data);
          }
        })
        .catch(console.error);
    }
  }, []);

  const handleSubmitMemory = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return;

    setLoading(true);
    try {
      const res = await fetch("/api/memories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          content: newContent,
          mood: newMood,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setUserMemories([data, ...userMemories]);
        setNewContent("");
        setShowForm(false);
      }
    } catch (error) {
      console.error("提交回忆失败:", error);
    } finally {
      setLoading(false);
    }
  };

  // 合并默认回忆和用户回忆
  const allMemories = [
    ...defaultMemories.map((m) => ({ ...m, isUser: false })),
    ...userMemories.map((m) => ({
      id: m.id,
      title: m.mood + "时刻",
      content: m.content,
      mood: m.mood,
      date: new Date(m.createdAt).toLocaleDateString("zh-CN"),
      wine: m.drink?.name || "午后特调",
      color: moods.includes(m.mood) ? "#8B2942" : "#D4A574",
      emoji: "🍷",
      isUser: true,
    })),
  ];

  const filteredMemories =
    filter === "全部"
      ? allMemories
      : allMemories.filter((m) => m.mood === filter);

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
            每一杯酒背后，都有一个故事。
            <br />
            这里是酒客们留下的珍贵回忆，温暖而动人。
          </p>
        </div>

        {/* Decorative quote */}
        <div className="text-center mb-12">
          <blockquote className="text-xl font-serif text-accent-gold italic">
            &ldquo;有些地方，存放着时光的温度；
            <br />
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

        {/* User memories section (logged in) */}
        {isLoggedIn && userMemories.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-serif text-accent-gold mb-4 text-center">
              📝 我的回忆
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userMemories.map((memory) => (
                <MemoryCard
                  key={memory.id}
                  id={memory.id}
                  title={memory.mood + "时刻"}
                  content={memory.content}
                  mood={memory.mood}
                  date={new Date(memory.createdAt).toLocaleDateString("zh-CN")}
                  wine={memory.drink?.name || "午后特调"}
                  color="#8B2942"
                  emoji="🍷"
                />
              ))}
            </div>
          </div>
        )}

        {/* Public memories */}
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
              <p className="text-4xl font-serif text-accent-gold mb-2">{allMemories.length}</p>
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
              <p className="text-4xl font-serif text-neon-cyan mb-2">∞</p>
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
            {isLoggedIn ? (
              <button
                onClick={() => setShowForm(!showForm)}
                className="px-6 py-3 bg-accent-wine text-text-primary rounded-lg font-medium transition-all duration-300 hover:bg-accent-wine-light"
              >
                {showForm ? "取消" : "记录此刻"}
              </button>
            ) : (
              <Link
                href="/login"
                className="inline-block px-6 py-3 bg-accent-wine text-text-primary rounded-lg font-medium transition-all duration-300 hover:bg-accent-wine-light"
              >
                登录后记录
              </Link>
            )}
          </div>

          {/* Memory form */}
          {showForm && (
            <form
              onSubmit={handleSubmitMemory}
              className="mt-6 glass-effect rounded-xl p-6 max-w-lg mx-auto text-left"
            >
              <div className="mb-4">
                <label className="block text-text-secondary text-sm mb-2">
                  心情
                </label>
                <select
                  value={newMood}
                  onChange={(e) => setNewMood(e.target.value)}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-text-primary"
                >
                  {moods.slice(1).map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-text-secondary text-sm mb-2">
                  记录这一刻
                </label>
                <textarea
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-text-primary h-32 resize-none"
                  placeholder="写下你的故事..."
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-accent-wine text-text-primary rounded-lg font-medium transition-all hover:bg-accent-wine-light disabled:opacity-50"
              >
                {loading ? "保存中..." : "保存回忆"}
              </button>
            </form>
          )}
        </div>

        {/* Floating decoration */}
        <div className="fixed bottom-8 right-8 opacity-20 pointer-events-none">
          <span className="text-6xl float-animation">🍷</span>
        </div>
      </div>
    </div>
  );
}
