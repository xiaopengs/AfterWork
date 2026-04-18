export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const drink = await prisma.drink.findUnique({
      where: { id: params.id },
      include: { memories: { orderBy: { createdAt: 'desc' } } }
    })
    if (!drink) {
      return NextResponse.json({ error: 'Drink not found' }, { status: 404 })
    }
    return NextResponse.json({ ...drink, tags: JSON.parse(drink.tags) })
  } catch (error) {
    console.error('Error fetching drink:', error)
    return NextResponse.json({ error: 'Failed to fetch drink' }, { status: 500 })
  }
}
