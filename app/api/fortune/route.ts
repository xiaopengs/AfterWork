export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';

// 今日运势数据
const fortunes = [
  {
    emoji: "🌟",
    name: "大吉",
    color: "#FFD700",
    desc: "今日运势极佳，所有事情都会顺风顺水！",
  },
  {
    emoji: "✨",
    name: "吉",
    color: "#90EE90",
    desc: "今日运势不错，适合尝试新事物。",
  },
  {
    emoji: "🍀",
    name: "小吉",
    color: "#98FB98",
    desc: "今日有小惊喜，保持好心情。",
  },
  {
    emoji: "🌙",
    name: "平",
    color: "#87CEEB",
    desc: "今日运势平稳，稳扎稳打即可。",
  },
  {
    emoji: "⛅",
    name: "一般",
    color: "#B0C4DE",
    desc: "今日有些小波折，但无大碍。",
  },
];

const colors = [
  "深红色", "宝石蓝", "翡翠绿", "琥珀金", "紫罗兰", 
  "玫瑰粉", "星空紫", "海洋蓝", "落日橙", "月光银"
];

const numbers = [3, 7, 9, 12, 18, 21, 24, 36, 42, 88];

const tips = [
  "今天适合独处思考，给自己一点安静的时间。",
  "遇到困难时，不妨换个角度看问题。",
  "今天的你魅力四射，多与人交流会有好运。",
  "适合做一些平时不敢尝试的事情。",
  "保持开放的心态，新的机会即将到来。",
  "今天的你特别有创造力，灵感爆棚。",
  "适合与朋友聚会，人际关系带来好运。",
  "今天适合学习新技能，提升自己。",
  "静下心来倾听内心的声音。",
  "今天的你自带幸运光环，抓住机会！",
];

// 获取今日固定种子（基于日期）
function getTodaySeed(): number {
  const today = new Date();
  return today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
}

// 伪随机数生成器（基于种子）
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get('date');

  // 使用传入的日期或今天
  let seed: number;
  if (date) {
    const d = new Date(date);
    seed = d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
  } else {
    seed = getTodaySeed();
  }

  // 基于种子生成固定结果
  const fortuneIndex = Math.floor(seededRandom(seed) * fortunes.length);
  const colorIndex = Math.floor(seededRandom(seed * 2) * colors.length);
  const numIndex = Math.floor(seededRandom(seed * 3) * numbers.length);
  const tipIndex = Math.floor(seededRandom(seed * 4) * tips.length);

  const fortune = fortunes[fortuneIndex];

  return NextResponse.json({
    fortune: {
      ...fortune,
      index: fortuneIndex,
    },
    luckyColor: colors[colorIndex],
    luckyNumber: numbers[numIndex],
    tip: tips[tipIndex],
    date: new Date().toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    seed,
  });
}
