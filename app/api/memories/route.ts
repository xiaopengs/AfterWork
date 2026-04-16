import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const MemorySchema = z.object({
  content: z.string().min(1),
  mood: z.string().optional(),
  drinkId: z.string().optional(),
})

export async function GET() {
  try {
    const memories = await prisma.memory.findMany({
      orderBy: { createdAt: 'desc' },
      include: { drink: { select: { id: true, name: true, nameEn: true } } }
    })
    return NextResponse.json(memories)
  } catch (error) {
    console.error('Error fetching memories:', error)
    return NextResponse.json({ error: 'Failed to fetch memories' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validatedData = MemorySchema.parse(body)
    const memory = await prisma.memory.create({
      data: validatedData,
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
