import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { getUserFromRequest } from '@/lib/auth'

const MemorySchema = z.object({
  content: z.string().min(1),
  mood: z.string().optional(),
  drinkId: z.string().optional(),
})

export async function GET(request: NextRequest) {
  try {
    // 检查是否有用户登录
    const userData = getUserFromRequest(request);
    
    if (userData) {
      // 登录用户：只返回自己的回忆
      const memories = await prisma.memory.findMany({
        where: { userId: userData.userId },
        orderBy: { createdAt: 'desc' },
        include: { drink: { select: { id: true, name: true, nameEn: true } } }
      });
      return NextResponse.json(memories);
    }
    
    // 未登录：返回空数组（游客看不到用户回忆）
    return NextResponse.json([]);
  } catch (error) {
    console.error('Error fetching memories:', error)
    return NextResponse.json({ error: 'Failed to fetch memories' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    // 检查用户登录
    const userData = getUserFromRequest(request);
    if (!userData) {
      return NextResponse.json({ error: '请先登录' }, { status: 401 });
    }

    const body = await request.json()
    const validatedData = MemorySchema.parse(body)
    
    const memory = await prisma.memory.create({
      data: {
        ...validatedData,
        userId: userData.userId,
      },
      include: { drink: { select: { id: true, name: true, nameEn: true } } }
    })
    return NextResponse.json(memory, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation error', details: error.errors }, { status: 400 })
    }
    console.error('Error creating memory:', error)
    return NextResponse.json({ error: 'Failed to create memory' }, { status: 500 })
  }
}
