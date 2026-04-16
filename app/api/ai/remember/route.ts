import { NextRequest, NextResponse } from 'next/server';
import { callRememberAgent, suggestTags } from '@/lib/ai/remember-agent';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { memories, drinkName, content } = body;

    if (content) {
      const tags = await suggestTags(content);
      return NextResponse.json({ content, tags });
    }

    if (memories && Array.isArray(memories)) {
      const result = await callRememberAgent({ memories, drinkName });
      return NextResponse.json({ summary: result });
    }

    return NextResponse.json({ error: '缺少 memories 或 content 参数' }, { status: 400 });
  } catch (error) {
    console.error('Remember API error:', error);
    return NextResponse.json({ error: '服务暂时不可用' }, { status: 500 });
  }
}
