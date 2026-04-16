import { NextRequest, NextResponse } from 'next/server';
import { callBarAgent, barChat } from '@/lib/ai/bar-agent';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { mood, preferences, message } = body;

    if (message) {
      // 调酒师闲聊模式
      const response = await barChat(message);
      return NextResponse.json({ content: response });
    }

    if (mood) {
      // 推荐模式
      const result = await callBarAgent({ mood, preferences });
      return NextResponse.json(result);
    }

    return NextResponse.json({ error: '缺少 mood 或 message 参数' }, { status: 400 });
  } catch (error) {
    console.error('Recommend API error:', error);
    return NextResponse.json({ error: '服务暂时不可用' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const message = searchParams.get('message');

  if (message) {
    const response = await barChat(message);
    return NextResponse.json({ content: response });
  }

  return NextResponse.json({ error: '缺少 message 参数' }, { status: 400 });
}
