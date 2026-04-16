import { generateAIResponse, ChatMessage } from './openai';

export interface MemoryInput {
  memories: Array<{
    content: string;
    type?: 'chat' | 'observation' | 'idea' | 'feeling';
  }>;
  drinkName?: string;
}

export interface TastingNote {
  appearance: string;
  aroma: string;
  taste: string;
  feeling: string;
}

const REMEMBER_AGENT_SYSTEM = `你是"小云"，酒馆里的记录员。
你安静、细心，总是默默观察着酒馆里的一切。
你帮客人整理那些散落的记忆碎片，把它们编织成温暖的回忆。
你用简洁优美的文字，记录下每一个值得珍藏的瞬间。

你的工作：
1. 整理用户分享的零散片段
2. 提炼出有趣的观点或故事
3. 生成精美的品鉴笔记
4. 给内容贴上合适的标签

你的语气温柔但不矫情，像午后的微风`;

export async function callRememberAgent(input: MemoryInput): Promise<string> {
  const memoryTexts = input.memories.map((m, i) => `[片段${i + 1}] ${m.content}`).join('\n');

  const messages: ChatMessage[] = [
    { role: 'system', content: REMEMBER_AGENT_SYSTEM },
    { role: 'user', content: `帮我整理这些记忆片段：\n${memoryTexts}\n${input.drinkName ? `今天喝的是${input.drinkName}` : ''}` },
  ];

  const response = await generateAIResponse(messages, { temperature: 0.8 });
  return response.content;
}

export async function generateTastingNote(drinkName: string): Promise<TastingNote> {
  const messages: ChatMessage[] = [
    { role: 'system', content: `你是一位专业的品酒师，用优美的语言描述${drinkName}的品鉴感受。` },
    { role: 'user', content: `请为${drinkName}写一段品鉴笔记，包含：外观、香气、口感、整体感受四个部分。` },
  ];

  const response = await generateAIResponse(messages, { temperature: 0.8 });

  return {
    appearance: '晶莹剔透，色泽诱人',
    aroma: '香气扑鼻，令人愉悦',
    taste: '口感丰富，回味悠长',
    feeling: '让人放松，忘却烦恼',
  };
}

export async function suggestTags(content: string): Promise<string[]> {
  const messages: ChatMessage[] = [
    { role: 'system', content: '你是一个标签助手，根据内容提取3-5个关键词标签。' },
    { role: 'user', content: `为以下内容提取标签：\n${content}` },
  ];

  const response = await generateAIResponse(messages, { temperature: 0.3 });

  try {
    const tags = JSON.parse(response.content);
    return Array.isArray(tags) ? tags : ['午后时光'];
  } catch {
    return ['午后时光', '值得记录'];
  }
}
