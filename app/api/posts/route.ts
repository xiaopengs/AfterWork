import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '@/lib/auth';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');

    const posts = await prisma.post.findMany({
      take: limit,
      skip: offset,
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: { username: true },
        },
      },
    });

    const total = await prisma.post.count();

    return NextResponse.json({
      posts: posts.map(p => ({
        id: p.id,
        content: p.content,
        mood: p.mood,
        likes: p.likes,
        comments: p.comments,
        createdAt: p.createdAt.toISOString(),
        author: p.anonymous ? '匿名' : p.user?.username || '匿名',
      })),
      total,
      hasMore: offset + limit < total,
    });
  } catch (error) {
    console.error('GET posts error:', error);
    return NextResponse.json({ error: '获取帖子失败' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: '请先登录' }, { status: 401 });
    }

    const token = authHeader.slice(7);
    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: '登录已过期' }, { status: 401 });
    }

    const { content, mood, anonymous } = await request.json();

    if (!content?.trim()) {
      return NextResponse.json({ error: '内容不能为空' }, { status: 400 });
    }

    const post = await prisma.post.create({
      data: {
        content: content.trim(),
        mood: mood || '深思',
        userId: payload.userId,
        anonymous: anonymous ?? true,
        likes: 0,
        comments: 0,
      },
    });

    return NextResponse.json({
      success: true,
      post: {
        id: post.id,
        content: post.content,
        mood: post.mood,
        likes: post.likes,
        comments: post.comments,
        createdAt: post.createdAt.toISOString(),
        author: post.anonymous ? '匿名' : payload.username,
      },
    });
  } catch (error) {
    console.error('POST posts error:', error);
    return NextResponse.json({ error: '发布失败' }, { status: 500 });
  }
}
