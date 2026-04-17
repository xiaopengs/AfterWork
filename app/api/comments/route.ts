import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '@/lib/auth';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get('postId');
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');

    if (!postId) {
      return NextResponse.json({ error: '缺少帖子ID' }, { status: 400 });
    }

    const comments = await prisma.comment.findMany({
      where: { postId },
      take: limit,
      skip: offset,
      orderBy: { createdAt: 'asc' },
      include: {
        user: {
          select: { username: true },
        },
      },
    });

    const total = await prisma.comment.count({ where: { postId } });

    return NextResponse.json({
      comments: comments.map(c => ({
        id: c.id,
        content: c.content,
        createdAt: c.createdAt.toISOString(),
        author: c.anonymous ? '匿名' : c.user?.username || '匿名',
      })),
      total,
      hasMore: offset + limit < total,
    });
  } catch (error) {
    console.error('GET comments error:', error);
    return NextResponse.json({ error: '获取评论失败' }, { status: 500 });
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

    const { postId, content, anonymous } = await request.json();

    if (!postId || !content?.trim()) {
      return NextResponse.json({ error: '内容不能为空' }, { status: 400 });
    }

    const [comment] = await prisma.$transaction([
      prisma.comment.create({
        data: {
          content: content.trim(),
          postId,
          userId: payload.userId,
          anonymous: anonymous ?? true,
        },
      }),
      prisma.post.update({
        where: { id: postId },
        data: { comments: { increment: 1 } },
      }),
    ]);

    return NextResponse.json({
      success: true,
      comment: {
        id: comment.id,
        content: comment.content,
        createdAt: comment.createdAt.toISOString(),
        author: comment.anonymous ? '匿名' : payload.username,
      },
    });
  } catch (error) {
    console.error('POST comments error:', error);
    return NextResponse.json({ error: '评论失败' }, { status: 500 });
  }
}
