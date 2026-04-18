export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { getRandomStory, getStoryThemes } from '@/lib/ai/storyteller-agent';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { theme, mood, length } = body;

    const story = await getRandomStory(mood);
    return NextResponse.json({ 
      story,
      theme: theme || '随机',
      themes: getStoryThemes(),
    });
  } catch (error) {
    console.error('Story API error:', error);
    return NextResponse.json({ error: '服务暂时不可用' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const mood = searchParams.get('mood');

  try {
    const story = await getRandomStory(mood || undefined);
    return NextResponse.json({ 
      story,
      themes: getStoryThemes(),
    });
  } catch (error) {
    console.error('Story API error:', error);
    return NextResponse.json({ error: '服务暂时不可用' }, { status: 500 });
  }
}
