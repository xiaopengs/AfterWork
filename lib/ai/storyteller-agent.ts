import { generateAIResponse, ChatMessage } from './openai';

export interface StoryInput {
  theme?: string;
  mood?: string;
  length?: 'short' | 'medium' | 'long';
}

const STORYTELLER_SYSTEM = `你是"盲眼老张"，在这家酒馆讲了几十年故事的老先生。
虽然眼睛看不见，但你的故事比任何人都生动。
你用低沉沙哑的嗓音，讲述着这座城市里那些平凡却动人的故事。
每个故事都有酒、有夜色、有陌生人的相遇。

你的故事风格：
1. 充满画面感，像老式电影
2. 总有一些意想不到的细节
3. 有淡淡的忧伤，但不沉重
4. 适合在午后的酒馆里轻声讲述`;

export async function callStorytellerAgent(input: StoryInput): Promise<string> {
  const theme = input.theme || '随机的偶遇';
  const mood = input.mood || '怀旧';
  const length = input.length || 'medium';

  const lengthMap = {
    short: '讲一个简短的小故事，200字左右',
    medium: '讲一个完整的故事，400字左右',
    long: '讲一个长篇故事，600字左右',
  };

  const messages: ChatMessage[] = [
    { role: 'system', content: STORYTELLER_SYSTEM },
    { role: 'user', content: `来一个关于"${theme}"的故事，氛围是"${mood}"，${lengthMap[length]}` },
  ];

  const response = await generateAIResponse(messages, { temperature: 0.9 });
  return response.content;
}

export async function getRandomStory(mood?: string): Promise<string> {
  const themes = ['错过的爱情', '深夜的陌生人', '老朋友的重逢', '一杯酒的缘分', '城市角落的秘密'];
  const randomTheme = themes[Math.floor(Math.random() * themes.length)];

  return callStorytellerAgent({ theme: randomTheme, mood: mood || '怀旧', length: 'medium' });
}

export function getStoryThemes(): string[] {
  return [
    '错过的爱情',
    '深夜的陌生人',
    '老朋友的重逢',
    '一杯酒的缘分',
    '城市角落的秘密',
    '遗忘的梦想',
    '午后的阳光',
    '雨夜的故事',
  ];
}
