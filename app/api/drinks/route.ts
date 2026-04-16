import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const DrinkSchema = z.object({
  name: z.string().min(1),
  nameEn: z.string().optional(),
  description: z.string().optional(),
  abv: z.number().optional(),
  image: z.string().url().optional(),
  tags: z.array(z.string()).optional(),
  rating: z.number().min(0).max(5).optional(),
})

export async function GET() {
  try {
    const drinks = await prisma.drink.findMany({
      orderBy: { createdAt: 'desc' },
    })
    const parsedDrinks = drinks.map(drink => ({
      ...drink,
      tags: JSON.parse(drink.tags)
    }))
    return NextResponse.json(parsedDrinks)
  } catch (error) {
    console.error('Error fetching drinks:', error)
    return NextResponse.json({ error: 'Failed to fetch drinks' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validatedData = DrinkSchema.parse(body)
    const drink = await prisma.drink.create({
      data: {
        ...validatedData,
        tags: JSON.stringify(validatedData.tags || [])
      }
    })
    return NextResponse.json({
      ...drink,
      tags: JSON.parse(drink.tags)
    }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation error', details: error.errors }, { status: 400 })
    }
    console.error('Error creating drink:', error)
    return NextResponse.json({ error: 'Failed to create drink' }, { status: 500 })
  }
}
