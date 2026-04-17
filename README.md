# 🍷 AfterWork 午后酒馆

<!-- Logo and Banner -->
<div align="center">

![AfterWork Logo](https://img.shields.io/badge/AfterWork-午后酒馆-8B2942?style=for-the-badge&logo=wine&logoColor=D4A574)

<!-- Banner -->
```
╔══════════════════════════════════════════════════════════════════╗
║                                                                  ║
║     ██████╗ ██╗      ██████╗ ██████╗ ███╗   ██╗ █████╗ ██╗      ║
║    ██╔════╝ ██║     ██╔═══██╗██╔══██╗████╗  ██║██╔══██╗██║      ║
║    ██║  ███╗██║     ██║   ██║██████╔╝██╔██╗ ██║███████║██║      ║
║    ██║   ██║██║     ██║   ██║██╔══██╗██║╚██╗██║██╔══██║██║      ║
║    ╚██████╔╝███████╗╚██████╔╝██║  ██║██║ ╚████║██║  ██║███████╗║
║     ╚═════╝ ╚══════╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚══════╝║
║                         🍷 Afternoon Wine Bar 🍷                ║
║                                                                  ║
╚══════════════════════════════════════════════════════════════════╝
```

### *A cozy escape for your afternoon retreat*

[![License: MIT](https://img.shields.io/badge/License-MIT-D4A574?style=flat-square)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

</div>

---

## 📖 Project Introduction

**AfterWork 午后酒馆** is a simulated afternoon wine bar social platform where technology meets relaxation. Step into our digital tavern and experience a unique blend of curated drinks, mystical fortune-telling, cherished memories, and AI-powered interactions.

### 🎯 Core Philosophy
> *"午后酒馆的放松地，记录有趣的人和事"*  
> *A relaxation sanctuary in the afternoon, recording interesting people and stories.*

### 👥 Target Audience
- Urban professionals seeking a digital escape after work
- Wine and cocktail enthusiasts exploring new experiences
- Anyone looking for a cozy corner to unwind and reflect
- Curious souls interested in AI-powered interactions

---

## ✨ Features

| Icon | Feature | Description |
|:----:|---------|-------------|
| 🍷 | **精选酒水展示** | Curated Drinks Gallery - Browse our exquisite collection of wines and cocktails with detailed tasting notes |
| 🎴 | **今日占卜** | Daily Fortune - Let the mystical energies guide your afternoon with personalized readings |
| 📜 | **午后回忆** | Afternoon Memories - Capture and preserve special moments from your bar visits |
| 🤖 | **AI 智能体** | AI Agents - Interact with our digital bartenders, storytellers, and chroniclers |
| 👤 | **用户登录系统** | User Authentication - Create your profile and personalize your bar experience |

### 🤖 Meet Our AI Agents

| Agent | Role | Specialty |
|-------|------|-----------|
| 🍸 **调酒师** | Bartender | Recommends the perfect drink based on your mood |
| 📚 **说书人** | Storyteller | Weaves tales of the tavern's legendary moments |
| ✍️ **记录员** | Chronicler | Helps document and summarize your memories |

---

## 🛠️ Tech Stack

### Framework & Language
![Next.js](https://img.shields.io/badge/Next.js-14-000000?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

### Styling & UI
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)

### Database & ORM
![Prisma](https://img.shields.io/badge/Prisma-5.22-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-Dev-003B57?style=for-the-badge&logo=sqlite&logoColor=white)

### AI Integration
![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4-412991?style=for-the-badge&logo=openai&logoColor=white)
![Coze API](https://img.shields.io/badge/Coze-API-FF6B9D?style=for-the-badge&logo=coze&logoColor=white)

### Additional Tools
![Vercel AI SDK](https://img.shields.io/badge/Vercel_AI_SDK-6.0-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-3.25-3E67B1?style=for-the-badge&logo=zod&logoColor=white)

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- pnpm 8+
- Git

### Installation Steps

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/AfterWork.git
cd AfterWork

# 2. Install dependencies
pnpm install

# 3. Set up database
pnpm db:push

# 4. Seed initial data
pnpm db:seed

# 5. Start development server
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) to enter the tavern.

---

## ⚙️ Environment Configuration

Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="file:./dev.db"

# OpenAI Configuration
OPENAI_API_KEY="sk-your-openai-api-key"

# Coze API (Optional)
COZE_API_KEY="your-coze-api-key"
COZE_BOT_ID="your-bot-id"

# Application
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### Configuration Details

| Variable | Required | Description |
|----------|:--------:|-------------|
| `DATABASE_URL` | Yes | SQLite database path for development |
| `OPENAI_API_KEY` | Yes | API key for OpenAI GPT models |
| `COZE_API_KEY` | No | Coze platform API for bot integration |
| `COZE_BOT_ID` | No | Specific Coze bot identifier |

---

## 📁 Project Structure

```
AfterWork/
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── seed.ts           # Initial data seeder
├── components/
│   ├── Header.tsx         # Navigation header
│   ├── DrinkCard.tsx      # Drink display card
│   ├── MemoryCard.tsx     # Memory entry card
│   └── GlassAnimation.tsx # Wine glass animation
├── app/
│   ├── layout.tsx         # Root layout
│   ├── page.tsx          # Home / Drink menu
│   ├── bar/
│   │   └── page.tsx      # Tasting room
│   ├── memories/
│   │   └── page.tsx      # Memory gallery
│   └── chat/
│       └── page.tsx      # Tavern chat
├── lib/
│   ├── prisma.ts         # Prisma client
│   └── agents/
│       ├── bartender.ts  # Bartender AI agent
│       ├── storyteller.ts # Storyteller AI agent
│       └── chronicler.ts # Chronicler AI agent
├── public/
│   └── images/           # Static assets
├── .env.local            # Environment variables
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

### Directory Overview

| Directory | Purpose |
|-----------|---------|
| `prisma/` | Database schema and seed data |
| `components/` | Reusable React components |
| `app/` | Next.js 14 App Router pages |
| `lib/` | Utility functions and AI agents |

---

## 🤝 Contributing

We welcome contributions from developers and storytellers alike!

### Development Workflow

```bash
# 1. Fork the repository

# 2. Create your feature branch
git checkout -b feature/AmazingFeature

# 3. Commit your changes
git commit -m 'Add some AmazingFeature'

# 4. Push to the branch
git push origin feature/AmazingFeature

# 5. Open a Pull Request
```

### Contribution Guidelines

- Follow the existing code style and TypeScript conventions
- Write meaningful commit messages
- Add appropriate tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

### Development Setup

```bash
# Run linting
pnpm lint

# Type checking
pnpm tsc --noEmit

# Build for production
pnpm build
```

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 AfterWork 午后酒馆

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
```

---

## 📞 Contact & Support

### Get in Touch

| Channel | Handle |
|---------|--------|
| 💬 **Issues** | [GitHub Issues](https://github.com/yourusername/AfterWork/issues) |
| 💡 **Discussions** | [GitHub Discussions](https://github.com/yourusername/AfterWork/discussions) |
| 📧 **Email** | hello@afterwork.bar |

### Community

- 🌟 Star this repository if you enjoy the project
- 🍴 Fork to create your own variant
- 🔄 Pull requests are always welcome

---

<div align="center">

### *"In the afternoon, we drink, we laugh, we remember."*

**AfterWork 午后酒馆** — *Your digital sanctuary for relaxation*

*Made with ❤️ and a splash of wine*

</div>
