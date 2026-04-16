# AfterWork - 午后酒馆

## 概念与愿景

AfterWork 是一个模拟午后酒馆氛围的社交平台。核心体验是：
**点一杯酒 → 慢慢品 → 逛逛聊聊 → 记录有趣的人和事 → 存入午后回忆**

视觉上追求"霓虹微醺"风格 —— 暗调背景配合温暖的酒红色和金色点缀，营造放松、解压的午后时光感。

## 设计语言

### 色彩系统
```
--bg-primary: #0D0D0D        // 深黑背景
--bg-secondary: #1A1A1A      // 卡片背景
--bg-tertiary: #252525       // 悬浮态
--accent-wine: #8B2942       // 酒红色（主色调）
--accent-gold: #D4A574       // 暖金色（点缀）
--accent-amber: #F5A623      // 琥珀色（酒液）
--text-primary: #F5F5F5      // 主文字
--text-secondary: #A0A0A0    // 次要文字
--neon-pink: #FF6B9D         // 霓虹粉
--neon-cyan: #00D9FF         // 霓虹青
```

### 字体
- 标题：Noto Serif SC（衬线，优雅感）
- 正文：Noto Sans SC（无衬线，易读）

### 动效
- 入场：fade-up + blur，400ms ease-out
- 悬浮：微缩放(1.02) + 边框发光
- 页面切换：平滑淡入淡出

## 页面结构

### 1. 首页/酒水菜单 (/)
- 大标题："午后，来一杯？"
- 酒水卡片网格（每张卡片含：图片、名称、描述、度数、评分）
- 侧边悬浮：当前"酒杯"状态

### 2. 品酒间 (/bar)
- 模拟酒杯填充动画
- 酒水详情 + 品鉴笔记输入
- 随机"酒馆趣事"滚动展示

### 3. 午后回忆 (/memories)
- 时间线式回忆卡片
- 按日期/心情标签筛选
- AI 总结功能

### 4. 酒馆八卦 (/chat)
- 匿名聊天室
- 预设话题轮播
- AI 旁观者偶尔插嘴

## 核心功能

### 酒水系统
- 酒水数据：名称、描述、酒精度、风味标签、配图
- 随机推荐引擎
- AI 品酒师角色

### 回忆系统
- 用户创建回忆卡片
- AI 辅助总结精彩片段
- 日期 + 心情标签

### 多智能体协作
- **调酒师 Agent**：推荐酒水
- **说书人 Agent**：生成/讲述酒馆故事
- **记录员 Agent**：整理回忆

## 技术架构

### 前端
- Next.js 14 App Router
- TypeScript
- TailwindCSS
- Framer Motion

### 后端
- Next.js API Routes
- Prisma ORM
- SQLite (dev) / PostgreSQL (prod)

### AI
- Vercel AI SDK
- LangChain.js (多智能体)
- OpenAI / 兼容接口 (Coze)

## 数据模型

### Drink (酒水)
```prisma
model Drink {
  id          String   @id @default(cuid())
  name        String
  nameEn      String?
  description String
  abv         Float    // 酒精度
  image       String?
  tags        String[] // 风味标签
  rating      Float    @default(0)
  createdAt   DateTime @default(now())
}
```

### Memory (回忆)
```prisma
model Memory {
  id        String   @id @default(cuid())
  content   String
  mood      String   // 心情标签
  drinkId   String?
  drink     Drink?   @relation(fields: [drinkId], references: [id])
  createdAt DateTime @default(now())
}
```

### ChatMessage (闲聊)
```prisma
model ChatMessage {
  id        String   @id @default(cuid())
  role      String   // user/assistant
  content   String
  createdAt DateTime @default(now())
}
```

## 酒水数据（初始）

1. **金汤力** - 清爽的杜松子与汤力水的邂逅
2. **莫吉托** - 薄荷与朗姆的夏日微风
3. **内格罗尼** - 苦与甜的意式博弈
4. **僵尸** - 危险的果香陷阱
5. **蓝色夏威夷** - 热带风情的一抹蓝
6. **教父** - 威士忌与杏仁的邂逅
7. **咸狗** - 海风的咸涩与西柚的清苦
8. **马天尼** - 鸡尾酒之王的经典

