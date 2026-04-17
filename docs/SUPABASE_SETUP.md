# Supabase 配置指南

本指南将帮助你在 Supabase 上配置 AfterWork 项目的数据库。

---

## 目录

1. [创建 Supabase 项目](#1-创建-supabase-项目)
2. [获取 API Keys](#2-获取-api-keys)
3. [获取数据库连接字符串](#3-获取数据库连接字符串)
4. [运行数据库迁移](#4-运行数据库迁移)
5. [验证数据库设置](#5-验证数据库设置)
6. [配置环境变量](#6-配置环境变量)
7. [连接 Supabase 到 Vercel](#7-连接-supabase-到-vercel)
8. [故障排除](#8-故障排除)

---

## 1. 创建 Supabase 项目

### 通过浏览器创建

1. 访问 [Supabase Dashboard](https://app.supabase.com)
2. 点击右上角的 **"New Project"** 按钮
3. 填写项目信息：
   - **Organization**: 选择你的组织或创建新的
   - **Name**: 输入项目名称（如 `afterwork-db`）
   - **Database Password**: 设置强密码（**务必保存此密码！**）
   - **Region**: 选择离你最近的区域（如 `Northeast Asia (Tokyo)`）
4. 点击 **"Create new project"**
5. 等待项目创建完成（约2分钟）

### 通过 Supabase CLI 创建

```bash
# 安装 Supabase CLI（如果尚未安装）
npm install -g supabase

# 登录 Supabase
supabase login

# 初始化项目
cd /workspace/AfterWork
supabase init

# 创建新项目（需要 Project ID 和 Database Password）
supabase projects create afterwork-db --db-password YOUR_DB_PASSWORD
```

---

## 2. 获取 API Keys

### 在 Dashboard 中获取

1. 进入你的项目后，点击左侧边栏的 **"Settings"** 图标
2. 点击 **"API"** 选项卡
3. 你会看到以下信息：

#### Project URL
```
https://xxxxxxxxxxxx.supabase.co
```
复制此 URL。

#### `anon` public key
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```
这是公开的 anon key，用于客户端。

#### `service_role` secret key
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```
**警告**: 此密钥具有管理员权限，**永远不要在客户端代码中使用**！

---

## 3. 获取数据库连接字符串

### 获取 Connection Pooling String（推荐用于生产环境）

1. 在 Dashboard 中，点击左侧边栏的 **"Settings"** > **"Database"**
2. 滚动到 **"Connection String"** 部分
3. 选择 **"URI"** 标签
4. 选择 **"pg"** 或 **"Connection pooling"**
5. 复制连接字符串，格式如下：

```bash
postgresql://postgres.[PROJECT_ID]:[DB_PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres
```

### 获取 Direct Connection String（用于本地开发）

1. 在 **"Connection String"** 部分
2. 选择 **"Direct connection"** 选项
3. 复制格式如下：

```bash
postgresql://postgres:[DB_PASSWORD]@db.[PROJECT_ID].supabase.co:5432/postgres
```

---

## 4. 运行数据库迁移

### 方法一：通过 Supabase Dashboard SQL Editor

1. 在 Dashboard 中，点击左侧边栏的 **"SQL Editor"**
2. 点击 **"New Query"** 按钮
3. 复制并粘贴 `prisma/supabase-migration.sql` 的全部内容
4. 点击 **"Run"** 按钮（或按 `Ctrl+Enter`）
5. 等待执行完成（应该看到成功消息）

6. 再次点击 **"New Query"**
7. 复制并粘贴 `prisma/seed.sql` 的全部内容
8. 点击 **"Run"**

### 方法二：使用 Supabase CLI

```bash
# 确保已安装并登录 Supabase CLI
supabase login

# 链接本地项目到 Supabase 项目
supabase link --project-ref YOUR_PROJECT_REF

# 推送迁移到远程数据库
supabase db push

# 运行 seed 脚本
# （需要在 Supabase Dashboard 的 SQL Editor 中手动执行 seed.sql）
```

### 方法三：使用 Supabase CLI 迁移文件

```bash
# 创建新的迁移
supabase migration new init

# 编辑生成的迁移文件
# 将 supabase-migration.sql 的内容复制进去

# 应用迁移
supabase db push
```

---

## 5. 验证数据库设置

在 SQL Editor 中运行以下查询来验证：

### 验证表是否创建成功

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public'
ORDER BY table_name;
```

预期输出应包含：
- `users`
- `moods`
- `posts`
- `comments`
- `memories`
- `fortunes`
- `bookmarks`

### 验证 seed 数据

```sql
SELECT * FROM moods ORDER BY name;
```

预期输出应包含12种心情数据（开心、放松、沉思等）。

### 验证 RLS 策略

```sql
SELECT tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;
```

预期输出应显示每个表的 RLS 策略。

### 验证触发器

```sql
SELECT trigger_name, event_manipulation, action_statement
FROM information_schema.triggers
WHERE trigger_schema = 'public'
ORDER BY event_object_table;
```

预期输出应显示 `update_updated_at_column` 触发器应用于所有表。

---

## 6. 配置环境变量

### 在本地创建 `.env.local` 文件

```bash
cd /workspace/AfterWork
cp .env.example .env.local
```

### 编辑 `.env.local` 文件

```env
# ====================
# Database Configuration
# ====================

# PostgreSQL Connection String（用于 Prisma）
# 格式: postgresql://postgres:[PASSWORD]@db.[PROJECT_ID].supabase.co:5432/postgres
DATABASE_URL="postgresql://postgres.[PROJECT_ID]:[PASSWORD]@db.[PROJECT_ID].supabase.co:5432/postgres"

# ====================
# Supabase Configuration
# ====================

# Project URL（来自 Settings > API > Project URL）
NEXT_PUBLIC_SUPABASE_URL="https://xxxxxxxxxxxx.supabase.co"

# Anon Public Key（来自 Settings > API > Project API keys > anon key）
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

# Service Role Key（仅用于服务端，用于绕过 RLS）
# 永远不要在客户端代码中使用此密钥！
SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

# ====================
# JWT Configuration
# ====================

# JWT Secret（用于签署和验证 JWT 令牌）
# 可以使用 Supabase Dashboard 中的 JWT Secret，或生成自己的强密钥
JWT_SECRET="your-super-secret-jwt-key-with-at-least-32-characters"

# ====================
# Optional: AI Features
# ====================

# OpenAI API Key（用于 AI 驱动的酒类推荐等功能）
OPENAI_API_KEY="sk-..."

# OpenAI Base URL（如果使用代理或自定义端点）
OPENAI_BASE_URL=""
```

### 获取 JWT Secret

在 Supabase Dashboard 中：
1. 进入 **Settings** > **API**
2. 找到 **"JWT Secret"** 部分
3. 点击 **"Regenerate JWT Secret"**（如果需要）
4. 复制 JWT Secret

---

## 7. 连接 Supabase 到 Vercel

### 方法一：通过 Vercel Dashboard

1. 登录 [Vercel Dashboard](https://vercel.com/dashboard)
2. 选择你的 AfterWork 项目
3. 点击 **"Settings"** 选项卡
4. 点击左侧的 **"Environment Variables"**
5. 添加以下环境变量：

| Name | Value | Environments |
|------|-------|--------------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxx.supabase.co` | Production, Preview, Development |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGci...` | Production, Preview, Development |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJhbGci...` | Production, Preview, Development |
| `DATABASE_URL` | `postgresql://...` | Production, Preview, Development |
| `JWT_SECRET` | `your-jwt-secret` | Production, Preview, Development |
| `OPENAI_API_KEY` | `sk-...` | Production, Preview, Development |

6. 点击 **"Save"**
7. 重新部署你的项目（进入 **"Deployments"** > 点击最新部署旁边的 **"..."** > **"Redeploy"**）

### 方法二：使用 Vercel CLI

```bash
# 安装 Vercel CLI（如果尚未安装）
npm install -g vercel

# 登录 Vercel
vercel login

# 进入项目目录
cd /workspace/AfterWork

# 添加环境变量
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY
vercel env add DATABASE_URL
vercel env add JWT_SECRET

# 部署
vercel --prod
```

### 验证 Vercel 部署

1. 在 Vercel Dashboard 中点击你的部署
2. 检查 **"Environment"** 标签确认所有环境变量都已设置
3. 访问你的 Vercel URL 测试应用

---

## 8. 故障排除

### 常见问题

#### 1. "Relation does not exist" 错误

**原因**: 迁移未正确运行
**解决方案**:
- 在 Supabase SQL Editor 中重新运行 `supabase-migration.sql`
- 检查 SQL Editor 是否有错误输出

#### 2. "JWT signature verification failed" 错误

**原因**: JWT Secret 不匹配
**解决方案**:
- 确保 `.env.local` 中的 `JWT_SECRET` 与 Supabase Dashboard 中的 JWT Secret 一致
- 如果在 Vercel 上，确保环境变量已正确设置

#### 3. "RLS policy violated" 错误

**原因**: 尝试访问的数据被 RLS 策略阻止
**解决方案**:
- 检查 RLS 策略是否正确设置
- 对于服务端操作，使用 `supabase.server.ts` 中的 `service_role` 客户端

#### 4. 无法连接到数据库

**原因**: DATABASE_URL 格式不正确
**解决方案**:
- 确保使用正确的连接字符串格式
- 检查密码是否包含特殊字符（可能需要 URL 编码）
- 确保数据库密码正确

#### 5. CORS 错误

**原因**: Supabase 项目未正确配置
**解决方案**:
- 在 Supabase Dashboard 中检查 **"Settings"** > **"API"**
- 确认 **"CORS"** 设置允许你的域名

### 调试技巧

1. **使用 Supabase Dashboard 的日志**：
   - 进入 **"Logs"** 查看 API 请求和错误

2. **在本地测试数据库连接**：
   ```bash
   psql "YOUR_DATABASE_URL"
   ```

3. **检查 Prisma 连接**：
   ```bash
   npx prisma db pull
   ```

4. **查看详细的错误信息**：
   - 在 Supabase Dashboard 中启用 **"Verbose API Logs"**

---

## 文件说明

本项目使用以下 Supabase 相关文件：

| 文件 | 用途 |
|------|------|
| `prisma/schema.prisma` | Prisma 数据库 schema |
| `prisma/supabase-migration.sql` | Supabase SQL 迁移脚本 |
| `prisma/seed.sql` | 初始数据种子 |
| `lib/supabase.ts` | 客户端 Supabase 客户端 |
| `lib/supabase-server.ts` | 服务端 Supabase 客户端（使用 service_role） |

---

## 下一步

1. 确保所有表已创建
2. 确保 seed 数据已加载
3. 配置本地环境变量
4. 运行 `npm run dev` 启动本地开发服务器
5. 部署到 Vercel

---

如有问题，请参考：
- [Supabase 文档](https://supabase.com/docs)
- [Supabase Discord](https://discord.gg/supabase)
- 项目 [README.md](./README.md)
