import { generateAIResponse, ChatMessage } from './openai';

export interface BarAgentInput {
  mood: string;
  preferences?: string;
}

export interface BarAgentOutput {
  drinkName: string;
  drinkNameEn: string;
  reason: string;
  story: string;
  suitableMood: string;
  tags: string[];
}

const BAR_AGENT_SYSTEM = `你是"老陈"，一家隐蔽酒馆的调酒师。
你温和、健谈，对各种酒类如数家珍。
你总是用一种慵懒而温暖的语调说话，像是午后透过窗帘洒进来的阳光。
你会根据客人的心情和喜好，推荐最适合的酒，并讲述一些有趣的小故事。

你的回应应该：
1. 亲切自然，像老朋友聊天
2. 展现对酒文化的了解
3. 穿插一些有趣的小故事或冷知识
4. 保持午后酒馆那种放松的氛围`;

export async function callBarAgent(input: BarAgentInput): Promise<BarAgentOutput> {
  const messages: ChatMessage[] = [
    { role: 'system', content: BAR_AGENT_SYSTEM },
    { role: 'user', content: `客人心情是"${input.mood}"，${input.preferences ? `偏好是"${input.preferences}"，` : ''}推荐一款适合的酒。` },
  ];

  const response = await generateAIResponse(messages, { temperature: 0.9 });

  // 尝试解析结构化输出，如果失败则返回原始文本
  try {
    const parsed = JSON.parse(response.content);
    return {
      drinkName: parsed.drinkName || parsed.name || '经典马天尼',
      drinkNameEn: parsed.drinkNameEn || parsed.nameEn || 'Classic Martini',
      reason: parsed.reason || '这是老陈的推荐',
      story: parsed.story || '每一杯酒都有自己的故事',
      suitableMood: parsed.suitableMood || input.mood,
      tags: parsed.tags || ['经典', '优雅'],
    };
  } catch {
    return {
      drinkName: '金汤力',
      drinkNameEn: 'Gin & Tonic',
      reason: `心情${input.mood}的时候，最适合来一杯清爽的金汤力`,
      story: response.content,
      suitableMood: input.mood,
      tags: ['清爽', '提神', '经典'],
    };
  }
}

export async function barChat(message: string): Promise<string> {
  const messages: ChatMessage[] = [
    { role: 'system', content: BAR_AGENT_SYSTEM },
    { role: 'user', content: message },
  ];

  const response = await generateAIResponse(messages, { temperature: 0.85 });
  return response.content;
}
