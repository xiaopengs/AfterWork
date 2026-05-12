# AfterWork 午后酒馆 - 产品规格说明书

> *最后一个可以慢慢来的地方 · 21点喝酒游戏*

---

## 1. 项目概述

### 1.1 核心理念

**AfterWork** 是一个融合了 **21点纸牌游戏** + **喝酒惩罚** + **AI 调酒师** 的沉浸式酒馆体验。在赛博朋克美学与东方意境交融的数字空间里，和 AI 荷官来一局，喝一杯，享受午后时光。

### 1.2 核心玩法

**21点喝酒游戏** (Blackjack Drinking)

```
进入酒馆 → 开始游戏 → AI荷官发牌 → 决策(要牌/停牌) → 比大小 → 输家喝酒 → 调酒师评语
```

**喝酒规则**：
- 庄家 vs 玩家 21点
- 玩家爆牌 → 喝一杯
- 玩家输 → 喝一杯
- 平局 → 各喝半杯
- 特殊牌型有彩蛋奖励（免喝/连喝）

### 1.3 AI 角色

| 角色 | 功能 | 风格 |
|------|------|------|
| 🎰 荷官小八 | 发牌、判断、讲解规则 | 专业、冷幽默 |
| 🍸 调酒师老陈 | 推荐酒水、讲述故事 | 温暖、絮叨 |
| 📖 故事收集者 | 记录精彩瞬间 | 好奇、共情 |

---

## 2. 产品功能

### 2.1 首页 (Landing)

- Hero 区域：游戏入口 + 氛围展示
- 游戏规则说明（简化版）
- 历史战绩（本地存储）
- 酒水推荐（Coze AI）

### 2.2 游戏页面 (Game)

**核心流程**：
1. 选择难度（简单/普通/困难）
2. 选择下注杯数（1-5杯）
3. AI 荷官发牌（2张）
4. 玩家决策：
   - 要牌 (Hit)
   - 停牌 (Stand)
   - 双倍下注 (Double) - 只一次
   - 保险 (Insurance) - 当庄家明牌是 A
5. 荷官自动操作
6. 判定输赢
7. 输家"喝酒"（模拟）
8. 调酒师评语
9. 继续/离开

**特殊牌型**：
| 牌型 | 说明 | 奖励 |
|------|------|------|
| Blackjack | 21点（AA + 10/J/Q/K） | 免喝 + 特殊称号 |
| 五龙 | 5张牌未爆 | 免喝 |
| 对子 | 前两张相同 | 可分牌 |
| 爆牌 | >21点 | 自动输 |

### 2.3 酒水系统 (Drinks)

**喝酒模拟**：
- 点击"喝酒"按钮
- 酒液动画减少
- 调酒师评语
- 累计醉意值

**酒水推荐**：
- 根据当前醉意推荐
- AI 调酒师讲述酒故事
- 可下单（外卖跳转）

### 2.4 回忆录 (Memories)

- 游戏记录
- 精彩瞬间截图
- 心情统计
- 成就徽章

---

## 3. 技术架构

### 3.1 技术栈

| 类别 | 技术 | 说明 |
|------|------|------|
| 框架 | Next.js 14 | App Router |
| 语言 | TypeScript | 类型安全 |
| 样式 | TailwindCSS | 原子化 CSS |
| 状态 | Zustand | 轻量状态管理 |
| 动画 | Framer Motion | 流畅动效 |
| AI | Coze API | AI Agent |
| 部署 | Vercel | 自动部署 |

### 3.2 项目结构

```
afterwork/
├── app/
│   ├── page.tsx              # 首页
│   ├── game/
│   │   └── page.tsx          # 游戏页
│   ├── drinks/
│   │   └── page.tsx          # 酒水页
│   ├── memories/
│   │   └── page.tsx          # 回忆录
│   └── layout.tsx            # 布局
├── components/
│   ├── game/
│   │   ├── Card.tsx          # 扑克牌
│   │   ├── GameBoard.tsx     # 游戏桌
│   │   ├── Dealer.tsx        # 荷官
│   │   └── Player.tsx        # 玩家
│   ├── ui/
│   │   ├── GlassCard.tsx     # 玻璃态卡片
│   │   ├── Button.tsx         # 按钮
│   │   └── Modal.tsx         # 弹窗
│   └── layout/
│       ├── Header.tsx        # 头部
│       └── Footer.tsx        # 底部
├── lib/
│   ├── game/
│   │   ├── blackjack.ts      # 21点逻辑
│   │   └── scoring.ts        # 计分系统
│   ├── store/
│   │   └── gameStore.ts      # 游戏状态
│   ├── ai/
│   │   ├── coze.ts           # Coze API
│   │   └── prompts.ts        # AI Prompt
│   └── utils/
│       └── animations.ts     # 动画工具
├── hooks/
│   ├── useGame.ts            # 游戏逻辑
│   └── useAudio.ts           # 音效
└── public/
    ├── cards/                # 卡牌素材
    └── audio/                # 音效素材
```

### 3.3 数据模型

```typescript
// 游戏状态
interface GameState {
  deck: Card[];
  playerHand: Card[];
  dealerHand: Card[];
  playerScore: number;
  dealerScore: number;
  phase: 'betting' | 'playing' | 'dealer' | 'result';
  bet: number;
  drinks: number;        // 当前喝酒数
  totalDrinks: number;   // 累计喝酒
  result: 'win' | 'lose' | 'push' | 'blackjack' | null;
}

// 纸牌
interface Card {
  suit: 'hearts' | 'diamonds' | 'clubs' | 'spades';
  rank: 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K';
  faceUp: boolean;
}

// 回忆
interface Memory {
  id: string;
  type: 'game' | 'drink' | 'story';
  content: string;
  timestamp: Date;
  mood: string;
}
```

---

## 4. 设计规范

### 4.1 视觉风格

**关键词**: 深色奢华、纸牌质感、酒馆氛围

### 4.2 色彩系统

```css
:root {
  --bg-primary: #0a0a0f;
  --bg-secondary: #12121a;
  --bg-card: rgba(255, 255, 255, 0.03);
  --bg-felt: #1a472a;           /* 赌桌绿 */
  
  --text-primary: #f5f5f5;
  --text-secondary: #a0a0b0;
  --text-muted: #606070;
  
  --accent-gold: #d4af37;       /* 金色 */
  --accent-amber: #f59e0b;       /* 琥珀 */
  
  --card-red: #dc2626;           /* 红桃/方块 */
  --card-black: #1f1f1f;         /* 黑桃/梅花 */
  
  --win: #22c55e;
  --lose: #ef4444;
  --push: #eab308;
}
```

### 4.3 动效设计

- 发牌动画：依次翻开，200ms 间隔
- 翻牌动画：3D 翻转，0.5s
- 喝酒动画：液体减少，1s
- 胜负特效：粒子效果，庆祝/安慰

### 4.4 卡牌设计

```
  ┌─────┐
  │ A   │
  │  ♠  │
  │   A │
  └─────┘
```

- 经典扑克样式
- 轻微毛边效果
- 数字 + 花色
- 背面：酒馆 Logo

---

## 5. 部署

### 5.1 Vercel 自动部署

- GitHub 推送自动触发
- 环境变量：
  - `NEXT_PUBLIC_COZE_API_KEY`
  - `NEXT_PUBLIC_COZE_BOT_ID`
- 预览部署 + 生产部署

### 5.2 CI/CD

```yaml
# .github/workflows/deploy.yml
on:
  push:
    branches: [main]
```

---

## 6. 里程碑

- [x] SPEC.md 完成
- [ ] 项目结构初始化
- [ ] 首页开发
- [ ] 21点核心逻辑
- [ ] 游戏 UI
- [ ] AI 集成
- [ ] 部署测试

---

*最后更新: 2026-04-19*