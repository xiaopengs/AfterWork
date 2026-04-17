# AFTERWORK
### 午后酒馆 · Your Digital Sanctuary After Hours

---

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js" alt="Next.js">
  <img src="https://img.shields.io/badge/React-18.3-blue?style=flat-square&logo=react" alt="React">
  <img src="https://img.shields.io/badge/Prisma-5.22-2D3748?style=flat-square&logo=prisma" alt="Prisma">
  <img src="https://img.shields.io/badge/TypeScript-5.3-blue?style=flat-square&logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="License">
</p>

---

## PROJECT INTRODUCTION

### What is AfterWork?

**AfterWork** 是一款专为都市夜归人设计的沉浸式酒馆体验应用。在这个赛博朋克美学与东方意境交融的数字空间里，每一位疲惫的灵魂都能找到属于自己的那杯酒。

### Core Philosophy

> *"下班后的第一杯酒，敬所有还在路上的人。"*

### Target Users

- 都市白领与创意工作者
- 需要一个私密空间释放情绪的现代人
- 追求独特美学体验的数字原住民
- 热爱酒文化与仪式感的品鉴者

---

## VISUAL HIGHLIGHTS

### 1. 入口仪式 · Entry Ritual
深邃的暗色背景下，一扇门缓缓开启。字符逐帧显现，"欢迎光临"四个字在霓虹光晕中渐次浮现，配合悬浮的粒子效果，营造出推开现实与虚拟边界的神秘感。

### 2. 心情选酒 · Mood Selection
九种心情状态以渐变卡片呈现：**温暖**、**深思**、**俏皮**、**荒诞**、**裂隙**、**分裂**、**脆弱**、**猎奇**、**苦甜**。每种心情对应独特的色彩光谱与酒水推荐。

### 3. 酒水呈现 · Drink Presentation
精选28款特调饮品，每款都有专属的诗意描述。酒液注入的动态动画配合环境色彩渐变，让选酒过程本身就是一种享受。

### 4. 塔罗占卜 · Tarot Divination
神秘的塔罗牌阵，每日限定一次抽取。大阿尔卡纳与小阿尔卡纳交织，正位逆位各有解读，配合专属的配酒建议。

### 5. 个人空间 · Personal Chamber
个人数据中心实时更新：今夜品鉴统计、心情分布图谱、成就徽章系统、以及完整的午后回忆录。

---

## FEATURES

### 🎭 入口仪式感
- 沉浸式开门动画
- 字符逐帧出现效果
- 环境粒子系统
- 心情预选交互

### 🍸 心情选酒系统
- 9种心情维度 × 28款特调酒品
- AI驱动的智能推荐（基于 OpenAI）
- 调酒师"老陈"的专属故事
- 酒水属性分析（创造力/灵感/清醒/沉醉）

### 💬 酒馆论坛
- 心情分类的信息流
- 点赞与心跳动画
- 收藏书签系统
- 匿名发布机制
- 无限滚动加载

### 🔮 占卜角落
- 每日塔罗抽取（限一次）
- 11张大阿尔卡纳 + 12张小阿尔卡纳
- 正位/逆位双解读
- 爱情/事业/综合三维分析
- 专属配酒推荐

### 📜 个人回忆录
- 今夜品鉴统计
- 心情分布可视化
- 成就徽章系统
- 发帖/收藏/品鉴记录
- 成就解锁体系

### 🎲 酒令骰子
- 随机酒令生成
- 助兴游戏互动
- 多人共享模式

---

## TECH STACK

### Core Framework
| 技术 | 版本 | 用途 |
|------|------|------|
| Next.js | 14 | React 全栈框架 |
| React | 18.3.1 | UI 组件库 |
| TypeScript | 5.3.3 | 类型安全 |
| Tailwind CSS | 3.4.1 | 原子化样式 |

### Data & Storage
| 技术 | 版本 | 用途 |
|------|------|------|
| Prisma | 5.22.0 | ORM 与数据建模 |
| SQLite | - | 轻量级数据库 |

### AI Integration
| 技术 | 版本 | 用途 |
|------|------|------|
| OpenAI | 6.34.0 | AI 对话与推荐 |
| Vercel AI SDK | 6.0.164 | AI 能力扩展 |

### Authentication
| 技术 | 版本 | 用途 |
|------|------|------|
| bcryptjs | 3.0.3 | 密码加密 |
| jsonwebtoken | 9.0.3 | Token 认证 |

### Development
| 技术 | 版本 | 用途 |
|------|------|------|
| pnpm | - | 包管理器 |
| ESLint | 8.56.0 | 代码规范 |
| PostCSS | 8.4.35 | CSS 预处理 |

---

## QUICK START

```bash
# 克隆项目
git clone https://github.com/xiaopengs/AfterWork.git
cd AfterWork

# 安装依赖
pnpm install

# 初始化数据库
pnpm db:push
pnpm db:seed

# 开发模式
pnpm dev

# 生产构建
pnpm build

# 生产启动
pnpm start
```

访问 [http://localhost:3000](http://localhost:3000) 开启你的午夜之旅。

---

## DEPLOYMENT

### Vercel（推荐）

1. **Fork 或 Clone 项目**

2. **在 Vercel 导入项目**
   - 访问 [vercel.com/new](https://vercel.com/new)
   - 选择你的 GitHub 仓库

3. **配置环境变量**
   ```
   DATABASE_URL="file:./prod.db"
   NEXTAUTH_SECRET="your-secret-key-min-32-chars"
   OPENAI_API_KEY="sk-..."  # 可选，启用 AI 功能
   ```

4. **部署**
   - 点击 Deploy
   - Vercel 自动检测 Next.js 并配置构建

5. **域名配置**（可选）
   - 在 Project Settings → Domains 添加自定义域名

### Docker

```bash
# 构建镜像
docker build -t afterwork .

# 运行容器
docker run -p 3000:3000 \
  -e DATABASE_URL="file:./prod.db" \
  -e NEXTAUTH_SECRET="your-secret-key" \
  afterwork
```

### Manual Deployment

```bash
# 生产构建
pnpm build

# 使用 PM2 启动
pm2 start pnpm --name afterwork -- start

# 或使用 nohup
nohup pnpm start > /var/log/afterwork.log 2>&1 &
```

---

## ENVIRONMENT VARIABLES

创建 `.env` 文件：

```env
# Database
DATABASE_URL="file:./dev.db"

# Authentication
NEXTAUTH_SECRET="your-super-secret-key-minimum-32-characters-long"
NEXTAUTH_URL="http://localhost:3000"

# AI Features (Optional)
OPENAI_API_KEY="sk-..."
```

| 变量名 | 必填 | 说明 |
|--------|------|------|
| DATABASE_URL | 是 | SQLite 数据库路径 |
| NEXTAUTH_SECRET | 是 | JWT 签名密钥（至少32字符） |
| OPENAI_API_KEY | 否 | 启用 AI 推荐与对话功能 |

---

## PROJECT STRUCTURE

```
AfterWork/
├── app/                          # Next.js App Router
│   ├── api/                      # API 路由
│   │   ├── ai/                   # AI 相关接口
│   │   │   ├── recommend/        # 酒水推荐
│   │   │   ├── remember/         # 回忆生成
│   │   │   └── story/            # 故事讲述
│   │   ├── auth/                 # 认证接口
│   │   ├── drinks/               # 酒水数据
│   │   ├── posts/                # 论坛帖子
│   │   ├── comments/             # 评论系统
│   │   ├── memories/             # 回忆录
│   │   ├── fortune/              # 占卜系统
│   │   └── chat/                 # 酒馆聊天
│   ├── bar/                      # 酒馆主界面
│   │   ├── forum/                # 论坛页面
│   │   ├── fortune/              # 占卜页面
│   │   └── me/                   # 个人中心
│   ├── login/                    # 登录页面
│   ├── layout.tsx                # 根布局
│   ├── page.tsx                  # 首页（入口）
│   └── globals.css               # 全局样式
├── components/                   # React 组件
│   ├── Header.tsx                 # 导航栏
│   ├── DrinkCard.tsx              # 酒卡组件
│   ├── PouringGlass.tsx           # 注酒动画
│   └── GlassAnimation.tsx        # 酒杯动画
├── lib/                          # 工具函数
│   ├── ai/                       # AI Agent 系统
│   │   ├── bar-agent.ts          # 调酒师 Agent
│   │   ├── storyteller-agent.ts  # 故事家 Agent
│   │   └── remember-agent.ts     # 回忆 Agent
│   ├── auth.ts                   # 认证工具
│   ├── prisma.ts                 # Prisma 客户端
│   ├── drinks-data.ts            # 酒水数据库
│   └── posts.ts                  # 论坛数据
├── prisma/                       # 数据库层
│   ├── schema.prisma             # 数据模型
│   └── seed.ts                   # 数据种子
└── public/                       # 静态资源
```

---

## MOOD COLOR SYSTEM

| 心情 | 色彩 | 含义 |
|------|------|------|
| 🔥 温暖 | `#D4A574` | 落日余晖，家的归属 |
| 🌙 深思 | `#8B5CF6` | 静谧月色，内省时刻 |
| 🌸 俏皮 | `#10B981` | 春芽萌动，轻快舞步 |
| 🎭 荒诞 | `#F59E0B` | 霓虹迷离，超现实 |
| ⚡ 裂隙 | `#6366F1` | 电光火石，灵感迸发 |
| 🪞 分裂 | `#EC4899` | 镜像自我，多重可能 |
| 💔 脆弱 | `#EF4444` | 晶莹易碎，温柔以待 |
| 🦑 猎奇 | `#14B8A6` | 深邃神秘，探索未知 |
| 🍊 苦甜 | `#F97316` | 酸涩回甘，人生百味 |

---

## API REFERENCE

### 认证接口

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | `/api/auth/register` | 用户注册 |
| POST | `/api/auth/login` | 用户登录 |
| GET | `/api/auth/me` | 获取当前用户 |

### 酒水接口

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/drinks` | 获取所有酒水 |
| GET | `/api/drinks/[id]` | 获取指定酒水 |

### 论坛接口

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/posts` | 获取帖子列表 |
| POST | `/api/posts` | 发布新帖 |
| GET/POST | `/api/comments` | 评论管理 |

### AI 接口

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | `/api/ai/recommend` | AI 酒水推荐 |
| POST | `/api/ai/remember` | AI 回忆生成 |
| POST | `/api/ai/story` | AI 故事讲述 |
| POST | `/api/chat` | 酒馆闲聊 |

### 其他

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/memories` | 获取回忆录 |
| GET | `/api/fortune` | 塔罗占卜 |

---

## CONTRIBUTION

欢迎提交 Issue 和 Pull Request！

### 开发规范

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add amazing feature'`)
4. 推送分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

### 代码规范

- 使用 TypeScript 严格模式
- 遵循 ESLint 配置
- 组件使用函数式写法
- 样式优先使用 Tailwind CSS
- 提交信息使用中文

---

## LICENSE

本项目基于 MIT 许可证开源，详情请查看 [LICENSE](LICENSE) 文件。

---

## CONTACT

- **GitHub**: [xiaopengs/AfterWork](https://github.com/xiaopengs/AfterWork)
- **Author**: xiaopengs
- **Email**: [待补充]

---

<p align="center">
  <br>
  <em>「在霓虹与暗影之间，寻一杯属于你的酒。」</em>
  <br><br>
  🌙 AfterWork · 午夜酒馆 · 与你共度每一个下班后的夜晚
</p>
