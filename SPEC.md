# AfterWork 午后酒馆 - 设计规范文档

> 本文档是 AfterWork 项目的完整设计规范，为开发团队提供详尽、可执行的设计参考标准。

---

## 目录

1. [项目概述](#1-项目概述)
2. [设计语言](#2-设计语言)
3. [心情色彩系统](#3-心情色彩系统)
4. [功能模块](#4-功能模块)
5. [页面结构](#5-页面结构)
6. [数据模型](#6-数据模型)
7. [技术栈](#7-技术栈)
8. [组件规范](#8-组件规范)
9. [API 设计](#9-api-设计)
10. [开发规范](#10-开发规范)

---

## 1. 项目概述

### 1.1 项目信息

| 属性 | 值 |
|------|-----|
| 项目名称 | AfterWork |
| 中文名 | 午后酒馆 |
| 域名 | afterwork.bar |
| 版本 | 1.0.0 |
| 状态 | 开发中 |

### 1.2 产品理念

> **"午后酒馆的放松地，先点一杯酒，然后慢慢品酒、逛逛、聊聊天、看看有趣的事"**

AfterWork 是一个模拟午后酒馆氛围的社交平台。不同于常规社交应用的紧迫感，我们营造一种「可以慢慢来」的松弛感——用户先选择当下的心情（如同选择今日的心情鸡尾酒），然后入座、浏览、互动。

### 1.3 目标用户

| 用户画像 | 特征描述 |
|----------|----------|
| 都市白领 | 下班后寻求放松空间的职场人士 |
| 独居青年 | 渴望有温度的匿名社交体验 |
| 夜猫子 | 享受深夜独处时光的人 |
| 文艺青年 | 喜欢有设计感和仪式感的产品 |

### 1.4 核心价值

| 价值 | 说明 | 设计体现 |
|------|------|----------|
| **仪式感** | 每个行为都有意义 | 心情选择→选酒→入座的入场流程 |
| **沉浸感** | 酒馆氛围贯穿始终 | 深色玻璃态 UI、柔和光效、轻声动画 |
| **社交** | 真实且安全的互动 | 匿名帖子、心情匹配评论 |
| **记忆沉淀** | 午后回忆、心情统计 | 个人中心的可视化数据 |

### 1.5 核心场景

```
用户进入 → 选择心情(选酒) → 入座酒馆 → 浏览论坛/占卜/回忆 → 互动 → 离开
```

---

## 2. 设计语言

### 2.1 视觉风格

#### 2.1.1 风格定义

| 关键词 | 描述 |
|--------|------|
| **深色玻璃态** | 毛玻璃效果(Glassmorphism)，半透明磨砂质感 |
| **极简主义** | 克制元素，保留核心信息 |
| **酒馆氛围** | 暖色光晕、木质纹理暗示、琥珀色调 |

#### 2.1.2 设计关键词

```
琥珀 · 磨砂 · 暖光 · 呼吸感 · 克制 · 留白
```

#### 2.1.3 设计参考

- 风格对标：高端威士忌酒吧 / 深夜咖啡馆 / 日式居酒屋
- 参考产品：Notion 的克制感 + Stripe 的优雅感 + 深夜食堂的温度感

### 2.2 色彩系统

#### 2.2.1 基础色彩

| 用途 | 色值 | 变量名 | 说明 |
|------|------|--------|------|
| 背景深色 | `#0D0D0D` | `--color-bg-deep` | 最深背景层 |
| 背景主色 | `#1A1A1A` | `--color-bg-primary` | 主要背景 |
| 背景卡片 | `#252525` | `--color-bg-card` | 卡片背景 |
| 玻璃底层 | `rgba(255,255,255,0.05)` | `--color-glass-base` | 玻璃态底层 |
| 玻璃高光 | `rgba(255,255,255,0.1)` | `--color-glass-highlight` | 玻璃态高光 |
| 文字主色 | `#F5F5F5` | `--color-text-primary` | 主要文字 |
| 文字次色 | `#A0A0A0` | `--color-text-secondary` | 次要文字 |
| 文字暗色 | `#666666` | `--color-text-muted` | 暗色文字 |
| 边框色 | `rgba(255,255,255,0.1)` | `--color-border` | 分隔线 |

#### 2.2.2 功能色彩

| 用途 | 色值 | 变量名 |
|------|------|--------|
| 成功 | `#7CB582` | `--color-success` |
| 警告 | `#E8A87C` | `--color-warning` |
| 错误 | `#C75B5B` | `--color-error` |
| 信息 | `#5B7C99` | `--color-info` |

### 2.3 字体规范

#### 2.3.1 字体家族

```css
/* 标题字体 - 衬线体 */
font-family: 'Cormorant Garamond', 'Noto Serif SC', Georgia, serif;

/* 正文字体 - 无衬线体 */
font-family: 'Inter', 'Noto Sans SC', -apple-system, BlinkMacSystemFont, sans-serif;

/* 等宽字体 - 代码/数字 */
font-family: 'JetBrains Mono', 'Fira Code', monospace;
```

#### 2.3.2 字号系统

| 级别 | 名称 | 字号 | 行高 | 字重 | 用途 |
|------|------|------|------|------|------|
| `xs` | 超小 | 12px | 1.5 | 400 | 辅助说明 |
| `sm` | 小 | 14px | 1.5 | 400 | 次要信息 |
| `base` | 基础 | 16px | 1.6 | 400 | 正文 |
| `lg` | 大 | 18px | 1.6 | 500 | 重要正文 |
| `xl` | 特大 | 20px | 1.4 | 600 | 副标题 |
| `2xl` | 2倍 | 24px | 1.3 | 600 | 区块标题 |
| `3xl` | 3倍 | 30px | 1.2 | 700 | 页面标题 |
| `4xl` | 4倍 | 36px | 1.1 | 700 | 大标题 |

#### 2.3.3 字重使用

| 字重 | 值 | 使用场景 |
|------|-----|----------|
| Light | 300 | 装饰性文字、引用 |
| Regular | 400 | 正文、说明 |
| Medium | 500 | 按钮、强调 |
| Semibold | 600 | 标题、次级标题 |
| Bold | 700 | 大标题、重要数字 |

### 2.4 间距系统

基于 **4px** 网格的间距系统：

| 名称 | 值 | Tailwind | 使用场景 |
|------|-----|----------|----------|
| `space-0` | 0px | `0` | 无间距 |
| `space-1` | 4px | `1` | 紧凑元素 |
| `space-2` | 8px | `2` | 相关元素 |
| `space-3` | 12px | `3` | 小间距 |
| `space-4` | 16px | `4` | 标准间距 |
| `space-6` | 24px | `6` | 区块内间距 |
| `space-8` | 32px | `8` | 区块间间距 |
| `space-12` | 48px | `12` | 大区块 |
| `space-16` | 64px | `16` | 页面边距 |
| `space-24` | 96px | `24` | 段间距 |

### 2.5 圆角系统

| 名称 | 值 | Tailwind | 使用场景 |
|------|-----|----------|----------|
| `none` | 0px | `rounded-none` | 特殊布局 |
| `sm` | 4px | `rounded-sm` | 小按钮、标签 |
| `md` | 8px | `rounded-md` | 卡片、输入框 |
| `lg` | 12px | `rounded-lg` | 模态框 |
| `xl` | 16px | `rounded-xl` | 大卡片 |
| `2xl` | 24px | `rounded-2xl` | 特殊容器 |
| `full` | 9999px | `rounded-full` | 头像、圆形按钮 |

### 2.6 阴影系统

```css
/* 柔和阴影 - 默认卡片 */
--shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.3);

/* 中等阴影 - 悬浮卡片 */
--shadow-md: 0 4px 16px rgba(0, 0, 0, 0.4);

/* 大阴影 - 模态框 */
--shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.5);

/* 内发光 - 玻璃态 */
--shadow-glow: inset 0 0 20px rgba(212, 165, 116, 0.1);

/* 心情光晕 - 各心情色 */
--shadow-mood-{name}: 0 0 20px var(--mood-color);
```

### 2.7 动画原则

#### 2.7.1 动画哲学

> **克制、流畅、有意义** — 动画是传达信息，不是炫技

| 原则 | 说明 | 示例 |
|------|------|------|
| **克制** | 避免过度动画，聚焦核心交互 | 页面切换用淡入，不加弹跳 |
| **流畅** | 使用自然的缓动曲线 | 优先使用 `ease-out`、`ease-in-out` |
| **有意义** | 动画应传达状态变化 | 加载用呼吸光效，心情切换用颜色渐变 |

#### 2.7.2 动画时长

| 级别 | 名称 | 时长 | 使用场景 |
|------|------|------|----------|
| `instant` | 即时 | 0ms | 无动画 |
| `fast` | 快 | 150ms | 按钮状态变化 |
| `normal` | 正常 | 250ms | 卡片展开 |
| `slow` | 慢 | 400ms | 页面过渡 |
| `very-slow` | 极慢 | 600ms+ | 强调动画 |

#### 2.7.3 缓动曲线

```css
--ease-default: cubic-bezier(0.4, 0, 0.2, 1);      /* 默认 */
--ease-out: cubic-bezier(0, 0, 0.2, 1);            /* 退出 */
--ease-in: cubic-bezier(0.4, 0, 1, 1);            /* 进入 */
--ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1); /* 弹跳 */
--ease-smooth: cubic-bezier(0.25, 0.1, 0.25, 1);  /* 平滑 */
```

#### 2.7.4 标准动画规范

```typescript
// 基础动画类
const animations = {
  fadeIn: {
    duration: '250ms',
    easing: 'ease-out',
    property: 'opacity',
    from: 0,
    to: 1,
  },
  slideUp: {
    duration: '400ms',
    easing: 'ease-out',
    property: 'transform',
    from: 'translateY(20px)',
    to: 'translateY(0)',
  },
  scaleIn: {
    duration: '300ms',
    easing: 'ease-out',
    property: 'transform, opacity',
    from: 'scale(0.95)',
    to: 'scale(1)',
  },
  breath: {
    duration: '2s',
    easing: 'ease-in-out',
    property: 'opacity, box-shadow',
    infinite: true,
  },
};
```

---

## 3. 心情色彩系统

### 3.1 心情定义

心情是 AfterWork 的核心概念，贯穿整个产品体验。用户选择心情如同点一杯特调鸡尾酒。

### 3.2 心情列表

| 心情 | 英文 | 颜色代码 | RGB | CMYK | 用途描述 |
|------|------|----------|-----|------|----------|
| **温暖** | Warm | `#D4A574` | 212,165,116 | 0,22,45,17 | 午后阳光、被窝、热可可、老友 |
| **深思** | Pensive | `#9B7EBD` | 155,126,189 | 18,33,0,26 | 独处、阅读、哲学、雨天发呆 |
| **俏皮** | Playful | `#7CB582` | 124,181,130 | 32,0,28,29 | 恶作剧、好天气、和宠物玩耍 |
| **荒诞** | Absurd | `#E8A87C` | 232,168,124 | 0,28,47,9 | 离谱想法、深夜脑洞、无厘头 |
| **裂隙** | Cracked | `#5B7C99` | 91,124,153 | 41,19,0,40 | 疲惫、裂缝、独自撑着的时刻 |
| **分裂** | Divided | `#D4869C` | 212,134,156 | 0,37,26,17 | 纠结、两难、天使与恶魔 |
| **脆弱** | Fragile | `#C75B5B` | 199,91,91 | 0,54,54,22 | 玻璃心、想哭、需要拥抱 |
| **猎奇** | Curious | `#5BA3A3` | 91,163,163 | 44,0,0,36 | 探索欲、奇怪的知识、新鲜事 |
| **苦甜** | BitterSweet | `#B8945F` | 184,148,95 | 0,20,48,28 | 回忆、怀旧、回不去的从前 |

### 3.3 心情色卡规范

```typescript
// 心情颜色系统类型定义
interface MoodColor {
  id: string;           // 'warm', 'pensive', etc.
  name: string;         // 中文名
  nameEn: string;       // 英文名
  color: string;        // 主色 '#D4A574'
  rgb: string;          // RGB值 '212, 165, 116'
  lightColor: string;   // 浅色变 '#E8C9A8'
  darkColor: string;    // 深色变 '#A67C4A'
  glassColor: string;   // 玻璃态色 'rgba(212, 165, 116, 0.2)'
  glowColor: string;    // 光晕色 'rgba(212, 165, 116, 0.4)'
}

const MOOD_COLORS: Record<string, MoodColor> = {
  warm: {
    id: 'warm',
    name: '温暖',
    nameEn: 'Warm',
    color: '#D4A574',
    rgb: '212, 165, 116',
    lightColor: '#E8C9A8',
    darkColor: '#A67C4A',
    glassColor: 'rgba(212, 165, 116, 0.2)',
    glowColor: 'rgba(212, 165, 116, 0.4)',
  },
  // ... 其他心情
};
```

### 3.4 心情使用场景

| 心情 | 适合的场景 | 酒馆元素 | 论坛标签 |
|------|------------|----------|----------|
| 温暖 | 感谢、分享好事 | 热红酒、蛋酒 | `#温暖的午后` |
| 深思 | 分享思考、求建议 | 威士忌、苦艾酒 | `#一个人的思考` |
| 俏皮 | 搞笑日常、段子 | 气泡酒、莫吉托 | `#今日份沙雕` |
| 荒诞 | 离谱分享、脑洞 | 特调创意酒 | `#离谱大会` |
| 裂隙 | 吐槽、宣泄 | 烈酒 shot | `#打工人の崩溃` |
| 分裂 | 选择困难、纠结 | 双色鸡尾酒 | `#选A还是选B` |
| 脆弱 | 寻求安慰、倾诉 | 热托迪、热巧 | `#深夜emo` |
| 猎奇 | 分享冷知识、新发现 | 特色精酿 | `#奇怪的知识点` |
| 苦甜 | 怀旧、回忆 | 老式鸡尾酒 | `#那年今日` |

---

## 4. 功能模块

### 4.1 入口仪式

**流程：心情选择 → 选酒 → 入座**

```
┌─────────────────────────────────────────────────────────┐
│                     入口仪式                              │
│                                                         │
│  [心情选择]    →    [选酒单]    →    [入座确认]           │
│  Choose Mood       Select Drink      Take a Seat        │
│                                                         │
│  9种心情对应      根据心情推荐      确认座位号              │
│  9种心情酒        专属特调          入座成功              │
└─────────────────────────────────────────────────────────┘
```

#### 4.1.1 心情选择页

| 元素 | 说明 |
|------|------|
| 心情选择器 | 9个心情选项，圆形/卡片式 |
| 心情预览 | 选中时显示心情色光晕 |
| 心情描述 | 每种心情的简短文案 |
| 跳过入口 | 右上方「随便逛逛」 |

#### 4.1.2 选酒页

| 元素 | 说明 |
|------|------|
| 心情匹配酒 | 根据心情推荐的3-5款酒 |
| 酒品卡片 | 酒名、度数、口感描述、配图 |
| 选择确认 | 点击选择，选中态高亮 |
| 自定义备注 | 可选：加冰/不加冰/双份 |

#### 4.1.3 入座确认

| 元素 | 说明 |
|------|------|
| 座位号 | 随机生成如「吧台 07号」 |
| 入座动画 | 酒杯放置桌面效果 |
| 确认按钮 | 「入座」进入酒馆主页 |
| 倒计时 | 30秒无操作自动入座 |

### 4.2 论坛信息流

**核心功能：浏览、发布、评论**

```
┌─────────────────────────────────────────────────────────┐
│                     论坛信息流                            │
│                                                         │
│  ┌─────────┐  ┌──────────────────────────────────────┐  │
│  │ 心情筛选 │  │         帖子卡片列表                   │  │
│  │ [全部]   │  │                                      │  │
│  │ [温暖]   │  │  ┌────────────────────────────────┐  │  │
│  │ [深思]   │  │  │ 心情标签    时间                │  │  │
│  │ [俏皮]   │  │  │ 帖子标题...                    │  │  │
│  │ ...     │  │  │ 帖子内容摘要...                 │  │  │
│  └─────────┘  │  │ ♡ 23    💬 12                   │  │  │
│               │  └────────────────────────────────┘  │  │
│               └──────────────────────────────────────┘  │
│                                                         │
│              [ + 发布新帖 ]                              │
└─────────────────────────────────────────────────────────┘
```

#### 4.2.1 浏览功能

| 功能 | 说明 |
|------|------|
| 心情筛选 | 顶部标签栏，支持多选 |
| 无限滚动 | 下拉加载更多 |
| 下拉刷新 | Pull to refresh |
| 帖子卡片 | 心情标签、标题、摘要、互动数 |
| 帖子详情 | 全文、评论区、相关推荐 |

#### 4.2.2 发布功能

| 功能 | 说明 |
|------|------|
| 发布入口 | 底部导航/右下角悬浮 |
| 心情选择 | 必选，当前心情或自定义 |
| 内容编辑 | 标题(可选) + 正文 |
| 图片上传 | 最多9张，可预览 |
| 匿名发布 | 默认匿名，可选显示IP属地 |
| 草稿保存 | 自动保存到本地 |

#### 4.2.3 互动功能

| 功能 | 说明 |
|------|------|
| 评论 | 支持回复、楼中楼 |
| 点赞 | 心形动画 |
| 收藏 | 存入午后回忆 |
| 举报 | 匿名举报机制 |

### 4.3 占卜角落

**每日塔罗一抽，感受神秘氛围**

```
┌─────────────────────────────────────────────────────────┐
│                     占卜角落                              │
│                                                         │
│         ┌─────────────────────────────┐                 │
│         │                             │                 │
│         │      [神秘卡牌背面]          │                 │
│         │      等待抽取中...           │                 │
│         │                             │                 │
│         └─────────────────────────────┘                 │
│                                                         │
│              [ 抽取今日塔罗 ]                             │
│                                                         │
│  ─────────────────────────────────────────────          │
│                                                         │
│  今日抽卡时间: 14:30                                    │
│  本周已抽: 3/7                                          │
│  解牌记录: [查看]                                       │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

#### 4.3.1 塔罗功能

| 功能 | 说明 |
|------|------|
| 每日一抽 | 每天0点重置 |
| 卡牌动画 | 翻转揭示效果 |
| 牌面解读 | 正位/逆位含义 |
| 心情关联 | 结合当日心情解读 |
| 历史记录 | 过往抽卡记录 |

#### 4.3.2 卡牌系统

| 类型 | 数量 | 说明 |
|------|------|------|
| 大阿尔卡纳 | 22张 | 主牌，重大主题 |
| 小阿尔卡纳 | 56张 | 副牌，日常小事 |

### 4.4 个人中心

**我的午后回忆、心情统计**

```
┌─────────────────────────────────────────────────────────┐
│                     个人中心                              │
│                                                         │
│  ┌─────────────────────────────────────────────────────┐ │
│  │  座位号: 吧台 07号                                    │ │
│  │  入馆次数: 23 次                                      │ │
│  │  累积心情: 89 次                                      │ │
│  └─────────────────────────────────────────────────────┘ │
│                                                         │
│  ───────────────── 心情分布 ──────────────────          │
│                                                         │
│       温暖 ████████████░░░░  32%                        │
│       深思 ██████░░░░░░░░░░  18%                        │
│       俏皮 ████░░░░░░░░░░░░  12%                        │
│       ...                                               │
│                                                         │
│  ───────────────── 午后回忆 ──────────────────          │
│                                                         │
│  [收藏的帖子] [我的发帖] [我的评论]                       │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

#### 4.4.1 心情统计

| 指标 | 说明 |
|------|------|
| 心情分布 | 饼图/柱状图展示各心情占比 |
| 心情日历 | 每日心情打卡记录 |
| 心情趋势 | 周/月心情变化曲线 |
| 心情之最 | 最常心情、最高互动心情 |

#### 4.4.2 午后回忆

| 类型 | 说明 |
|------|------|
| 收藏帖子 | 收藏的帖子列表 |
| 我的发帖 | 发布的帖子管理 |
| 我的评论 | 评论记录 |
| 占卜记录 | 历史塔罗记录 |

### 4.5 酒令骰子

**克制的小游戏入口，增添趣味**

| 功能 | 说明 |
|------|------|
| 骰子游戏 | 每日免费掷一次 |
| 酒令挑战 | 随机酒令/真心话大冒险 |
| 排行榜 | 本周酒令王 |

---

## 5. 页面结构

### 5.1 路由结构

```
/                           → 入口页 (心情选择/选酒)
/bar                        → 酒馆主页 (默认论坛信息流)
/bar/forum                 → 论坛信息流
/bar/forum/[id]             → 帖子详情
/bar/forum/compose          → 发布帖子
/bar/fortune                → 占卜角落
/bar/me                     → 个人中心
/bar/me/settings            → 设置页
```

### 5.2 页面详细说明

#### 5.2.1 入口页 `/`

| 元素 | 说明 |
|------|------|
| Logo | 午后酒馆标志 |
| 心情选择 | 9个心情选项轮播/网格 |
| 选酒区 | 根据心情推荐的酒品 |
| 入座按钮 | 确认入座 |
| 随便逛逛 | 跳过入口 |

#### 5.2.2 酒馆主页 `/bar`

| 元素 | 说明 |
|------|------|
| 顶部状态栏 | 座位号、今日心情、当日时间 |
| 心情筛选 | 可滑动的心情标签栏 |
| 论坛信息流 | 帖子列表 |
| 底部导航 | 首页/占卜/我的 |

#### 5.2.3 论坛详情 `/bar/forum/[id]`

| 元素 | 说明 |
|------|------|
| 返回导航 | 左上返回 |
| 帖子内容 | 标题、正文、图片 |
| 心情标签 | 所属心情 |
| 互动栏 | 点赞、收藏、分享 |
| 评论区 | 评论列表、输入框 |

#### 5.2.4 发布页 `/bar/forum/compose`

| 元素 | 说明 |
|------|------|
| 心情选择 | 必选 |
| 标题输入 | 可选，最多50字 |
| 正文输入 | 必填，最多2000字 |
| 图片上传 | 可选，最多9张 |
| 发布按钮 | 发布/存草稿 |

#### 5.2.5 占卜页 `/bar/fortune`

| 元素 | 说明 |
|------|------|
| 抽牌区 | 塔罗牌区域 |
| 抽牌按钮 | 每日一次 |
| 历史记录 | 过往抽牌 |
| 本周统计 | 本周运势 |

#### 5.2.6 个人中心 `/bar/me`

| 元素 | 说明 |
|------|------|
| 用户信息 | 座位号、头像 |
| 数据统计 | 入馆次数、心情数 |
| 心情分布 | 可视化图表 |
| 功能入口 | 收藏/发帖/评论 |
| 设置入口 | 账号设置 |

---

## 6. 数据模型

### 6.1 ER 图

```
┌─────────────┐       ┌─────────────┐       ┌─────────────┐
│    User     │       │    Post     │       │   Comment   │
├─────────────┤       ├─────────────┤       ├─────────────┤
│ id          │──┐    │ id          │       │ id          │
│ anonymousId │  │    │ authorId    │◄──────│ authorId    │
│ seatNumber  │  │    │ moodId      │       │ postId      │◄──┐
│ createdAt   │  │    │ title       │       │ content     │   │
│ updatedAt   │  │    │ content     │       │ parentId    │   │
└─────────────┘  │    │ images      │       │ createdAt   │   │
       │         │    │ likes       │       └─────────────┘   │
       │         │    │ createdAt   │                │         │
       │         │    └─────────────┘                │         │
       │         │              │                    │         │
       │    ┌────┴──────────────┴────────────────────┘         │
       │    │                                                 │
       ▼    ▼                                                 │
┌─────────────┐       ┌─────────────┐       ┌─────────────┐   │
│   Mood      │       │  Memory     │       │  Fortune    │   │
├─────────────┤       ├─────────────┤       ├─────────────┤   │
│ id          │       │ id          │       │ id          │   │
│ name        │       │ userId      │◄──────│ userId      │   │
│ color       │       │ type        │       │ cardId      │   │
│ icon        │       │ targetId    │       │ moodId      │   │
│ description │       │ createdAt   │       │ interpretation│ │
└─────────────┘       └─────────────┘       │ createdAt   │   │
       │                                        └─────────────┘   │
       │                                                 ▲       │
       └─────────────────────────────────────────────────┘       │
                                                                 │
       (关联关系)                                                 │
```

### 6.2 模型详细定义

#### 6.2.1 User (用户)

```prisma
model User {
  id          String    @id @default(cuid())
  anonymousId String    @unique @default(cuid())
  seatNumber  String?   // 座位号，如 "吧台 07号"
  nickname    String?   // 可选昵称
  avatar      String?   // 头像 URL
  
  // 统计数据
  visitCount  Int       @default(0)
  lastVisit   DateTime?
  
  // 关联
  posts       Post[]
  comments    Comment[]
  memories    Memory[]
  fortunes    Fortune[]
  
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}
```

#### 6.2.2 Mood (心情)

```prisma
model Mood {
  id          String    @id @default(cuid())
  key         String    @unique // 'warm', 'pensive', etc.
  name        String    // 中文名
  nameEn      String    // 英文名
  color       String    // 主色
  lightColor  String    // 浅色
  darkColor   String    // 深色
  glassColor  String    // 玻璃态色
  glowColor   String    // 光晕色
  description String?   // 描述
  sortOrder   Int       @default(0)
  
  // 关联
  posts       Post[]
  fortunes    Fortune[]
  
  createdAt   DateTime  @default(now())
}
```

#### 6.2.3 Post (帖子)

```prisma
model Post {
  id          String    @id @default(cuid())
  
  // 内容
  title       String?
  content     String
  
  // 媒体
  images      Json?     // 图片 URL 数组
  
  // 心情
  moodId      String
  mood        Mood      @relation(fields: [moodId], references: [id])
  
  // 作者
  authorId    String
  author      User      @relation(fields: [authorId], references: [id])
  
  // 互动数据
  likeCount   Int       @default(0)
  commentCount Int      @default(0)
  collectCount Int      @default(0)
  
  // IP属地 (可选)
  ipRegion    String?
  
  // 状态
  isDraft     Boolean   @default(false)
  isDeleted   Boolean   @default(false)
  
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  
  // 关联
  comments    Comment[]
  memories    Memory[]  @relation("CollectedPosts")
  
  @@index([moodId])
  @@index([createdAt])
}
```

#### 6.2.4 Comment (评论)

```prisma
model Comment {
  id          String    @id @default(cuid())
  content     String
  
  // 关联
  authorId    String
  author      User      @relation(fields: [authorId], references: [id])
  
  postId      String
  post        Post      @relation(fields: [postId], references: [id], onDelete: Cascade)
  
  // 楼中楼
  parentId    String?
  parent      Comment?  @relation("CommentReplies", fields: [parentId], references: [id])
  replies     Comment[] @relation("CommentReplies")
  
  // 互动数据
  likeCount   Int       @default(0)
  
  isDeleted   Boolean   @default(false)
  
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  
  @@index([postId])
  @@index([parentId])
}
```

#### 6.2.5 Memory (回忆)

```prisma
model Memory {
  id          String    @id @default(cuid())
  type        String    // 'post_collect', 'comment_collect', etc.
  
  // 关联用户
  userId      String
  user        User      @relation(fields: [userId], references: [id])
  
  // 关联目标
  targetType  String    // 'post', 'comment'
  targetId    String
  
  // 收藏的快照
  snapshot    Json?     // 保存时的主题快照
  
  createdAt   DateTime  @default(now())
  
  @@unique([userId, targetType, targetId])
  @@index([userId])
}
```

#### 6.2.6 Fortune (占卜记录)

```prisma
model Fortune {
  id              String    @id @default(cuid())
  
  // 塔罗牌
  cardId          String    // 牌 ID
  cardName        String    // 牌名
  cardImage       String    // 牌图
  isReversed      Boolean   @default(false)
  
  // 解读
  interpretation  String    // 解读内容
  
  // 关联心情
  moodId          String
  mood            Mood      @relation(fields: [moodId], references: [id])
  
  // 关联用户
  userId          String
  user            User      @relation(fields: [userId], references: [id])
  
  // 日期
  fortuneDate     DateTime  @db.Date // 占卜日期
  
  createdAt       DateTime  @default(now())
  
  @@unique([userId, fortuneDate])
  @@index([userId])
}
```

---

## 7. 技术栈

### 7.1 核心技术

| 技术 | 版本 | 用途 |
|------|------|------|
| Next.js | 14 | React 框架，App Router |
| React | 18.3 | UI 库 |
| TypeScript | 5.3 | 类型安全 |
| TailwindCSS | 3.4 | 样式框架 |

### 7.2 数据库

| 技术 | 版本 | 用途 |
|------|------|------|
| Prisma | 5.22 | ORM |
| SQLite | - | 开发环境数据库 |
| PostgreSQL | - | 生产环境数据库 (可选) |

### 7.3 AI 集成

| 技术 | 用途 |
|------|------|
| OpenAI SDK | AI 代理能力 |
| Vercel AI SDK | 流式响应处理 |
| Coze API | 第三方 Bot 集成 (可选) |

### 7.4 工具库

| 技术 | 版本 | 用途 |
|------|------|------|
| Zod | 3.25 | 数据验证 |
| bcryptjs | 3.0 | 密码加密 |
| jsonwebtoken | 9.0 | JWT 认证 |
| tsx | 4.21 | TypeScript 执行 |

### 7.5 开发工具

| 工具 | 用途 |
|------|------|
| ESLint | 代码检查 |
| Prettier | 代码格式化 |
| Husky | Git hooks (可选) |

---

## 8. 组件规范

### 8.1 组件命名规范

#### 8.1.1 命名约定

| 类型 | 规范 | 示例 |
|------|------|------|
| 页面组件 | `PascalCase + Page` | `ForumPage`, `ProfilePage` |
| 布局组件 | `PascalCase + Layout` | `AppLayout`, `CardLayout` |
| 功能组件 | `PascalCase` | `PostCard`, `CommentInput` |
| 基础组件 | `PascalCase` | `Button`, `Modal`, `Avatar` |
| 图标组件 | `PascalCase + Icon` | `WineIcon`, `HeartIcon` |
| Hooks | `camelCase + use` | `useMood`, `useAuth` |
| 工具函数 | `camelCase` | `formatDate`, `getMoodColor` |

#### 8.1.2 目录结构

```
components/
├── ui/                    # 基础 UI 组件
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.props.ts
│   │   └── Button.stories.tsx
│   ├── Card/
│   ├── Modal/
│   └── ...
├── features/              # 功能组件
│   ├── Post/
│   │   ├── PostCard.tsx
│   │   ├── PostList.tsx
│   │   └── PostDetail.tsx
│   ├── Mood/
│   │   ├── MoodSelector.tsx
│   │   ├── MoodTag.tsx
│   │   └── MoodFilter.tsx
│   ├── Fortune/
│   │   ├── TarotCard.tsx
│   │   └── FortuneResult.tsx
│   └── ...
├── layout/                # 布局组件
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── Navigation.tsx
└── icons/                 # 图标组件
    └── index.tsx
```

### 8.2 Props 接口规范

#### 8.2.1 基础 Props

```typescript
// 基础 Props 类型
interface BaseProps {
  className?: string;
  children?: React.ReactNode;
}

// 带样式的 Props
interface StyledProps extends BaseProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  mood?: MoodKey;
}

// 事件 Props
interface EventsProps extends BaseProps {
  onClick?: (event: React.MouseEvent) => void;
  onChange?: (value: any) => void;
  onSubmit?: (data: any) => void;
}
```

#### 8.2.2 组件 Props 示例

```typescript
// PostCard Props
interface PostCardProps {
  // 必需属性
  post: {
    id: string;
    title?: string;
    content: string;
    images?: string[];
    mood: Mood;
    author: { id: string; seatNumber?: string };
    likeCount: number;
    commentCount: number;
    createdAt: string;
  };
  
  // 可选属性
  showActions?: boolean;
  compact?: boolean;
  
  // 事件回调
  onLike?: (postId: string) => void;
  onComment?: (postId: string) => void;
  onCollect?: (postId: string) => void;
  onClick?: (postId: string) => void;
}

// MoodSelector Props
interface MoodSelectorProps {
  value?: string;
  onChange: (mood: Mood) => void;
  exclude?: string[];     // 排除的心情
  showDescription?: boolean;
}
```

### 8.3 动画规范

#### 8.3.1 Tailwind 动画类

```typescript
// tailwind.config.ts 动画配置
const config = {
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 250ms ease-out',
        'fade-out': 'fadeOut 200ms ease-in',
        'slide-up': 'slideUp 400ms ease-out',
        'slide-down': 'slideDown 400ms ease-out',
        'scale-in': 'scaleIn 300ms ease-out',
        'breath': 'breath 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        fadeOut: {
          from: { opacity: '1' },
          to: { opacity: '0' },
        },
        slideUp: {
          from: { transform: 'translateY(20px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          from: { transform: 'translateY(-20px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          from: { transform: 'scale(0.95)', opacity: '0' },
          to: { transform: 'scale(1)', opacity: '1' },
        },
        breath: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.02)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px var(--glow-color)' },
          '100%': { boxShadow: '0 0 20px var(--glow-color)' },
        },
      },
    },
  },
};
```

#### 8.3.2 Framer Motion 使用规范 (可选)

```typescript
// 如使用 framer-motion
import { motion, AnimatePresence } from 'framer-motion';

// 页面过渡
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const pageTransition = {
  type: 'tween',
  ease: 'easeOut',
  duration: 0.25,
};

// 列表动画
const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};
```

### 8.4 响应式断点

```typescript
// Tailwind 断点
const breakpoints = {
  sm: '640px',   // 大手机
  md: '768px',   // 平板
  lg: '1024px',  // 小桌面
  xl: '1280px',  // 桌面
  '2xl': '1536px', // 大屏
};

// 使用方式
// sm: mobile-first, md: tablet, lg: desktop
```

---

## 9. API 设计

### 9.1 API 路由结构

```
app/api/
├── auth/
│   └── [...nextauth]/route.ts    # 认证
├── posts/
│   ├── route.ts                  # GET (列表), POST (创建)
│   └── [id]/
│       ├── route.ts              # GET, PATCH, DELETE
│       └── like/route.ts         # POST 点赞
├── comments/
│   ├── route.ts                  # GET (列表), POST (创建)
│   └── [id]/
│       ├── route.ts              # PATCH, DELETE
│       └── like/route.ts         # POST 点赞
├── fortunes/
│   ├── route.ts                  # GET (列表), POST (抽卡)
│   └── today/route.ts            # GET 今日占卜
├── moods/
│   └── route.ts                  # GET 心情列表
└── users/
    ├── me/route.ts               # GET, PATCH 当前用户
    └── [id]/
        └── route.ts              # GET 用户信息
```

### 9.2 API 响应格式

```typescript
// 统一响应格式
interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
  meta?: {
    page?: number;
    pageSize?: number;
    total?: number;
  };
}

// 成功响应
{
  "success": true,
  "data": { ... }
}

// 错误响应
{
  "success": false,
  "error": {
    "code": "POST_NOT_FOUND",
    "message": "帖子不存在"
  }
}
```

### 9.3 主要 API 端点

#### 9.3.1 帖子 API

| 方法 | 端点 | 说明 |
|------|------|------|
| GET | `/api/posts` | 获取帖子列表 |
| GET | `/api/posts/:id` | 获取帖子详情 |
| POST | `/api/posts` | 创建帖子 |
| PATCH | `/api/posts/:id` | 更新帖子 |
| DELETE | `/api/posts/:id` | 删除帖子 |
| POST | `/api/posts/:id/like` | 点赞 |

**GET /api/posts**

```typescript
// Query Parameters
interface PostsQuery {
  mood?: string;       // 心情筛选
  page?: number;       // 页码，默认1
  pageSize?: number;   // 每页数量，默认20
  sort?: 'latest' | 'hot'; // 排序方式
}

// Response
interface PostsResponse {
  posts: Post[];
  total: number;
  page: number;
  pageSize: number;
}
```

**POST /api/posts**

```typescript
// Request Body
interface CreatePostBody {
  moodId: string;
  title?: string;
  content: string;
  images?: string[];
}

// Response
interface CreatePostResponse {
  post: Post;
}
```

#### 9.3.2 评论 API

| 方法 | 端点 | 说明 |
|------|------|------|
| GET | `/api/comments?postId=xxx` | 获取评论列表 |
| POST | `/api/comments` | 创建评论 |
| POST | `/api/comments/:id/like` | 点赞评论 |
| DELETE | `/api/comments/:id` | 删除评论 |

#### 9.3.3 占卜 API

| 方法 | 端点 | 说明 |
|------|------|------|
| GET | `/api/fortunes` | 获取占卜历史 |
| GET | `/api/fortunes/today` | 获取今日占卜 |
| POST | `/api/fortunes` | 抽取塔罗牌 |

---

## 10. 开发规范

### 10.1 Git 规范

#### 10.1.1 分支命名

```
feature/xxx          # 新功能
fix/xxx              # 修复
refactor/xxx         # 重构
docs/xxx             # 文档
style/xxx            # 样式调整
test/xxx             # 测试
```

#### 10.1.2 Commit 规范

```
<type>(<scope>): <subject>

# type
feat:     新功能
fix:      修复
refactor: 重构
docs:     文档
style:    格式
test:     测试
chore:    构建/工具

# example
feat(forum): add post detail page
fix(mood): fix color display issue
```

### 10.2 代码规范

#### 10.2.1 TypeScript 规范

```typescript
// 1. 使用 interface 定义对象类型
interface User {
  id: string;
  name: string;
}

// 2. 使用 type 定义联合类型、工具类型
type MoodKey = 'warm' | 'pensive' | 'playful';
type ApiResponse<T> = { data: T } | { error: string };

// 3. 导出类型和函数
export type { User, MoodKey };
export function getMoodColor(key: MoodKey): string {
  return MOOD_COLORS[key].color;
}

// 4. 组件使用 React.FC 或直接声明
const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return <button {...props}>{children}</button>;
};
```

#### 10.2.2 React 规范

```typescript
// 1. 使用 Server Components 和 Client Components
// app/page.tsx (Server Component)
export default async function HomePage() {
  const data = await fetchData();
  return <main>{data}</main>;
}

// components/Button.tsx ('use client')
'use client';
import { useState } from 'react';
export function Button() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}

// 2. Props 解构
function PostCard({ post, onLike, onClick }: PostCardProps) {
  return (
    <div onClick={() => onClick?.(post.id)}>
      {post.content}
      <button onClick={() => onLike?.(post.id)}>点赞</button>
    </div>
  );
}

// 3. 条件渲染
{isLoading && <Skeleton />}
{error ? <ErrorMessage error={error} /> : <Content data={data} />}
```

### 10.3 文件规范

#### 10.3.1 文件命名

| 类型 | 规范 | 示例 |
|------|------|------|
| 页面文件 | `page.tsx` | `forum/page.tsx` |
| 布局文件 | `layout.tsx` | `bar/layout.tsx` |
| 组件文件 | `ComponentName.tsx` | `PostCard.tsx` |
| 工具文件 | `util.ts` / `utils.ts` | `date.ts` |
| 类型文件 | `types.ts` | `mood.ts` |
| Hook 文件 | `useXxx.ts` | `useMood.ts` |
| 样式文件 | `ComponentName.module.css` | (如需) |

#### 10.3.2 导入顺序

```typescript
// 1. React / Next.js
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// 2. 外部库
import { useState, useEffect } from 'react';
import { z } from 'zod';

// 3. 内部组件
import { Button } from '@/components/ui/Button';
import { PostCard } from '@/components/features/Post/PostCard';

// 4. 工具函数
import { formatDate } from '@/lib/utils/date';
import { MOOD_COLORS } from '@/lib/constants/mood';

// 5. 类型定义
import type { Post, Mood } from '@/types';

// 6. 样式（如果使用 CSS 模块）
import styles from './PostList.module.css';
```

### 10.4 环境变量规范

```typescript
// .env.example
# Database
DATABASE_URL="file:./dev.db"

# Auth
JWT_SECRET="your-secret-key"

# OpenAI
OPENAI_API_KEY="sk-..."

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 10.5 性能规范

| 指标 | 目标 | 说明 |
|------|------|------|
| LCP | < 2.5s | 最大内容绘制 |
| FID | < 100ms | 首次输入延迟 |
| CLS | < 0.1 | 累积布局偏移 |
| TTFB | < 200ms | 首字节时间 |

### 10.6 可访问性规范

| 标准 | 要求 |
|------|------|
| 颜色对比度 | 文字与背景对比度 ≥ 4.5:1 |
| 键盘导航 | 所有功能可通过键盘操作 |
| ARIA 标签 | 交互元素应有适当 ARIA 属性 |
| 焦点指示 | 焦点状态应有可见指示器 |

---

## 附录

### A. Tailwind 配置参考

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        mood: {
          warm: '#D4A574',
          pensive: '#9B7EBD',
          playful: '#7CB582',
          absurd: '#E8A87C',
          cracked: '#5B7C99',
          divided: '#D4869C',
          fragile: '#C75B5B',
          curious: '#5BA3A3',
          bittersweets: '#B8945F',
        },
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Noto Serif SC', 'Georgia', 'serif'],
        sans: ['Inter', 'Noto Sans SC', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        // 如前所述
      },
    },
  },
  plugins: [],
};

export default config;
```

### B. 心情色值常量

```typescript
// lib/constants/mood.ts
export const MOOD_COLORS = {
  warm: {
    key: 'warm',
    name: '温暖',
    nameEn: 'Warm',
    color: '#D4A574',
    lightColor: '#E8C9A8',
    darkColor: '#A67C4A',
    glassColor: 'rgba(212, 165, 116, 0.2)',
    glowColor: 'rgba(212, 165, 116, 0.4)',
  },
  pensive: {
    key: 'pensive',
    name: '深思',
    nameEn: 'Pensive',
    color: '#9B7EBD',
    lightColor: '#B8A0D1',
    darkColor: '#7A5E9B',
    glassColor: 'rgba(155, 126, 189, 0.2)',
    glowColor: 'rgba(155, 126, 189, 0.4)',
  },
  playful: {
    key: 'playful',
    name: '俏皮',
    nameEn: 'Playful',
    color: '#7CB582',
    lightColor: '#A3D1A8',
    darkColor: '#5C9162',
    glassColor: 'rgba(124, 181, 130, 0.2)',
    glowColor: 'rgba(124, 181, 130, 0.4)',
  },
  absurd: {
    key: 'absurd',
    name: '荒诞',
    nameEn: 'Absurd',
    color: '#E8A87C',
    lightColor: '#F2C4A8',
    darkColor: '#C8885C',
    glassColor: 'rgba(232, 168, 124, 0.2)',
    glowColor: 'rgba(232, 168, 124, 0.4)',
  },
  cracked: {
    key: 'cracked',
    name: '裂隙',
    nameEn: 'Cracked',
    color: '#5B7C99',
    lightColor: '#8AABBF',
    darkColor: '#3B5C79',
    glassColor: 'rgba(91, 124, 153, 0.2)',
    glowColor: 'rgba(91, 124, 153, 0.4)',
  },
  divided: {
    key: 'divided',
    name: '分裂',
    nameEn: 'Divided',
    color: '#D4869C',
    lightColor: '#E8B0BC',
    darkColor: '#B4667C',
    glassColor: 'rgba(212, 134, 156, 0.2)',
    glowColor: 'rgba(212, 134, 156, 0.4)',
  },
  fragile: {
    key: 'fragile',
    name: '脆弱',
    nameEn: 'Fragile',
    color: '#C75B5B',
    lightColor: '#DF8585',
    darkColor: '#A73B3B',
    glassColor: 'rgba(199, 91, 91, 0.2)',
    glowColor: 'rgba(199, 91, 91, 0.4)',
  },
  curious: {
    key: 'curious',
    name: '猎奇',
    nameEn: 'Curious',
    color: '#5BA3A3',
    lightColor: '#85BDBD',
    darkColor: '#3B8383',
    glassColor: 'rgba(91, 163, 163, 0.2)',
    glowColor: 'rgba(91, 163, 163, 0.4)',
  },
  bittersweets: {
    key: 'bittersweets',
    name: '苦甜',
    nameEn: 'BitterSweet',
    color: '#B8945F',
    lightColor: '#D2B48C',
    darkColor: '#98744F',
    glassColor: 'rgba(184, 148, 95, 0.2)',
    glowColor: 'rgba(184, 148, 95, 0.4)',
  },
} as const;

export type MoodKey = keyof typeof MOOD_COLORS;
```

---

**文档版本**: 1.0.0  
**最后更新**: 2024年  
**维护者**: AfterWork 开发团队
