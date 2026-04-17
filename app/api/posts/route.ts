import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '@/lib/auth';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');
    const mood = searchParams.get('mood');

    const where = mood && mood !== '全部' ? { mood } : {};

    const posts = await prisma.post.findMany({
      take: limit,
      skip: offset,
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: { username: true },
        },
      },
    });

    const total = await prisma.post.count({ where });

    return NextResponse.json({
      posts: posts.map(p => ({
        id: p.id,
        content: p.content,
        mood: p.mood,
        likes: p.likes,
        comments: (p as any).commentCount ?? 0,
        createdAt: p.createdAt.toISOString(),
        author: p.anonymous ? '匿名' : p.user?.username || '匿名',
        liked: false,
        bookmarked: false,
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
        liked: false,
        bookmarked: false,
      },
    });
  } catch (error) {
    console.error('POST posts error:', error);
    return NextResponse.json({ error: '发布失败' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const postId = searchParams.get('postId');

    if (!postId) {
      return NextResponse.json({ error: '缺少帖子ID' }, { status: 400 });
    }

    const authHeader = request.headers.get('Authorization');
    let userId: string | undefined;

    if (authHeader?.startsWith('Bearer ')) {
      const token = authHeader.slice(7);
      const payload = verifyToken(token);
      if (payload) {
        userId = payload.userId;
      }
    }

    if (action === 'like') {
      const post = await prisma.post.update({
        where: { id: postId },
        data: { likes: { increment: 1 } },
      });
      return NextResponse.json({ success: true, likes: post.likes });
    }

    if (action === 'unlike') {
      const post = await prisma.post.update({
        where: { id: postId },
        data: { likes: { decrement: 1 } },
      });
      return NextResponse.json({ success: true, likes: Math.max(0, post.likes) });
    }

    if (action === 'bookmark') {
      if (!userId) {
        return NextResponse.json({ error: '请先登录' }, { status: 401 });
      }

      const existing = await prisma.bookmark.findUnique({
        where: {
          userId_postId: { userId, postId },
        },
      });

      if (existing) {
        await prisma.bookmark.delete({
          where: { id: existing.id },
        });
        return NextResponse.json({ success: true, bookmarked: false });
      } else {
        await prisma.bookmark.create({
          data: { userId, postId },
        });
        return NextResponse.json({ success: true, bookmarked: true });
      }
    }

    return NextResponse.json({ error: '未知操作' }, { status: 400 });
  } catch (error) {
    console.error('PATCH posts error:', error);
    return NextResponse.json({ error: '操作失败' }, { status: 500 });
  }
}
