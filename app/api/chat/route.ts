export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const ChatMessageSchema = z.object({
  role: z.enum(['user', 'assistant', 'system']),
  content: z.string().min(1),
})

export async function GET() {
  try {
    const messages = await prisma.chatMessage.findMany({
      orderBy: { createdAt: 'asc' },
      take: 50
    })
    return NextResponse.json(messages)
  } catch (error) {
    console.error('Error fetching messages:', error)
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validatedData = ChatMessageSchema.parse(body)
    const message = await prisma.chatMessage.create({ data: validatedData })
    const responseContent = `收到您的消息: "${validatedData.content}". 这是一个模拟的AI回复。`
    const aiMessage = await prisma.chatMessage.create({
      data: { role: 'assistant', content: responseContent }
    })
    return NextResponse.json({ userMessage: message, assistantMessage: aiMessage }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation error', details: error.errors }, { status: 400 })
    }
    console.error('Error processing chat:', error)
    return NextResponse.json({ error: 'Failed to process chat message' }, { status: 500 })
  }
}
