import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY || '',
  baseURL: 'https://openrouter.ai/api/v1',
  defaultHeaders: {
    'HTTP-Referer': process.env.OPENROUTER_SITE_URL || 'https://afterwork.app',
    'X-Title': 'AfterWork - 午后酒馆',
  },
});

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface AIResponse {
  content: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

export type StreamCallback = (chunk: string) => void;

// OpenRouter model mapping - use free or cheap models by default
const DEFAULT_MODEL = 'anthropic/claude-3-haiku';

export async function generateAIResponse(
  messages: ChatMessage[],
  options?: {
    model?: string;
    temperature?: number;
    maxTokens?: number;
  }
): Promise<AIResponse> {
  const response = await openai.chat.completions.create({
    model: options?.model || DEFAULT_MODEL,
    messages: messages as OpenAI.Chat.ChatCompletionMessageParam[],
    temperature: options?.temperature ?? 0.8,
    max_tokens: options?.maxTokens ?? 1024,
  });

  return {
    content: response.choices[0]?.message?.content || '',
    usage: response.usage ? {
      promptTokens: response.usage.prompt_tokens,
      completionTokens: response.usage.completion_tokens,
      totalTokens: response.usage.total_tokens,
    } : undefined,
  };
}

export async function streamAIResponse(
  messages: ChatMessage[],
  onChunk: StreamCallback,
  options?: {
    model?: string;
    temperature?: number;
  }
): Promise<void> {
  const stream = await openai.chat.completions.create({
    model: options?.model || DEFAULT_MODEL,
    messages: messages as OpenAI.Chat.ChatCompletionMessageParam[],
    temperature: options?.temperature ?? 0.8,
    stream: true,
  });

  for await (const chunk of stream) {
    const content = chunk.choices[0]?.delta?.content;
    if (content) {
      onChunk(content);
    }
  }
}

export { openai };