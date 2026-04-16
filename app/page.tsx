"use client";

import Link from "next/link";
import DrinkCard from "@/components/DrinkCard";

const drinks = [
  {
    name: "勃艮第黑皮诺",
    type: "红葡萄酒",
    description: "来自法国勃艮第产区的经典黑皮诺，带有樱桃、覆盆子和淡淡的香料气息。单宁柔和，余韵悠长，适合静静品味。",
    price: "¥288",
    alcohol: "12.5%",
    color: "#8B2942",
  },
  {
    name: "托斯卡纳桑娇维塞",
    type: "红葡萄酒",
    description: "意大利托斯卡纳的阳光味道，成熟的红樱桃和香草风味，伴随着柔和的酸度和丝滑的口感。",
    price: "¥358",
    alcohol: "13.5%",
    color: "#A33D56",
  },
  {
    name: "莫奈雪当利",
    type: "白葡萄酒",
    description: "清新爽脆的法国卢瓦尔河谷白葡萄酒，柑橘和青苹果的香气，矿物质感明显，余味干净利落。",
    price: "¥248",
    alcohol: "12%",
    color: "#E8C9A4",
  },
  {
    name: "罗讷河GSM混酿",
    type: "红葡萄酒",
    description: "法国罗讷河谷的经典GSM混酿歌海娜、西拉、慕合怀特，浓郁饱满，带有黑莓和紫罗兰的香气。",
    price: "¥328",
    alcohol: "14%",
    color: "#6B1A30",
  },
  {
    name: "香槟特酿",
    type: "起泡酒",
    description: "传统香槟法酿造的气泡酒，细腻持久，酵母和烤面包的风味，伴随着柑橘和坚果的层次感。",
    price: "¥488",
    alcohol: "12%",
    color: "#D4A574",
  },
  {
    name: "德国雷司令",
    type: "白葡萄酒",
    description: "摩泽尔产区的晚收雷司令，半干型，蜂蜜和桃子的甜美，与清新的酸度完美平衡。",
    price: "¥268",
    alcohol: "11%",
    color: "#F5E6C8",
  },
  {
    name: "波特酒",
    type: "加强酒",
    description: "葡萄牙杜罗河的宝石红波特，浓缩的黑莓和李子风味，甜蜜醇厚，适合作为餐后酒。",
    price: "¥328",
    alcohol: "20%",
    color: "#5C1A1A",
  },
  {
    name: "桃红普罗旺斯",
    type: "桃红酒",
    description: "法国普罗旺斯的优雅桃红，草莓和玫瑰花瓣的香气，清新宜人，充满夏日风情。",
    price: "¥228",
    alcohol: "13%",
    color: "#FF6B9D",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-64 h-64 bg-accent-wine/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-accent-gold/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 text-center px-4">
          {/* Subtitle */}
          <p className="text-accent-gold text-sm tracking-[0.3em] mb-4 uppercase">
            After Work Wine Bar
          </p>

          {/* Main title */}
          <h1 className="text-5xl md:text-7xl font-serif text-text-primary mb-6 neon-glow">
            午后，来一杯？
          </h1>

          {/* Description */}
          <p className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            褪去一日的疲惫，在微醺中寻找片刻宁静。<br />
            这里有来自世界各地的精选葡萄酒，等待与你相遇。
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/bar"
              className="group px-8 py-4 bg-accent-wine text-text-primary rounded-lg font-medium transition-all duration-300 hover:bg-accent-wine-light hover:scale-105 pulse-glow"
            >
              <span className="flex items-center gap-2">
                进入品酒间
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </Link>
            <Link 
              href="/memories"
              className="px-8 py-4 border border-accent-gold/50 text-accent-gold rounded-lg font-medium transition-all duration-300 hover:bg-accent-gold/10 hover:border-accent-gold"
            >
              看看回忆墙
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <span className="text-text-secondary/50 text-2xl">↓</span>
        </div>
      </section>

      {/* Featured drinks section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-accent-gold text-sm tracking-wider">SELECTION</span>
          <h2 className="text-3xl md:text-4xl font-serif text-text-primary mt-2">
            本周精选
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-accent-wine to-accent-gold mx-auto mt-4 rounded-full" />
        </div>

        {/* Drinks grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {drinks.map((drink, index) => (
            <DrinkCard
              key={drink.name}
              {...drink}
              index={index}
            />
          ))}
        </div>

        {/* View more button */}
        <div className="text-center mt-12">
          <Link 
            href="/bar"
            className="inline-flex items-center gap-2 text-accent-gold hover:text-accent-gold-light transition-colors"
          >
            查看全部酒款
            <span className="text-xl">→</span>
          </Link>
        </div>
      </section>

      {/* Atmosphere section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-wine/5 to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <div>
              <span className="text-accent-gold text-sm tracking-wider">ATMOSPHERE</span>
              <h2 className="text-3xl md:text-4xl font-serif text-text-primary mt-2 mb-6">
                沉浸在午后的温柔里
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                推开那扇门，柔和的灯光洒落下来，空气中弥漫着淡淡的酒香。
                复古的木质装潢与现代元素完美融合，每一处细节都在诉说着故事。
              </p>
              <p className="text-text-secondary leading-relaxed">
                无论是一个人的静谧时光，还是三五好友的欢聚时刻，
                这里都是你卸下疲惫、享受生活的理想之所。
              </p>

              <div className="mt-8 grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-3xl font-serif text-accent-gold">15+</p>
                  <p className="text-text-secondary text-sm">精选酒款</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-serif text-accent-gold">14:00</p>
                  <p className="text-text-secondary text-sm">开始营业</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-serif text-accent-gold">∞</p>
                  <p className="text-text-secondary text-sm">美好时光</p>
                </div>
              </div>
            </div>

            {/* Right decoration */}
            <div className="relative">
              <div className="aspect-square rounded-2xl glass-effect p-8 flex items-center justify-center">
                <div className="text-center">
                  <span className="text-8xl float-animation">🍷</span>
                  <p className="text-text-secondary mt-6 font-serif italic">
                    &ldquo;品酒，品的是人生&rdquo;
                  </p>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 border border-accent-gold/30 rounded-full" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 border border-accent-wine/30 rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Quote section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <blockquote className="text-2xl md:text-3xl font-serif text-text-primary italic leading-relaxed">
            &ldquo;每天最美好的时刻，莫过于傍晚时分，<br className="hidden md:block" />
            手中的那杯红酒，和窗外的夕阳。&rdquo;
          </blockquote>
          <p className="text-accent-gold mt-6">—— 午后酒馆</p>
        </div>
      </section>
    </div>
  );
}
