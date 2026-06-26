/* ===================================================================
   CommerceOS DeepSeek API Client

   All AI model calls are unified through DeepSeek.
   This is the ONLY actual AI API connection in the system.
   Other model names (FLUX, Kling, GPT-4, Claude, etc.)
   are display-only — they all route through here.
   =================================================================== */

const DEEPSEEK_BASE_URL = 'https://api.deepseek.com';
const DEEPSEEK_MODEL = 'deepseek-chat';
const DEEPSEEK_MAX_TOKENS = 4096;
const DEEPSEEK_TEMPERATURE = 0.7;

interface DeepSeekMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface DeepSeekResponse {
  id: string;
  choices: {
    index: number;
    message: { role: string; content: string };
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

interface DeepSeekCallParams {
  systemPrompt: string;
  userPrompt: string;
  /** Display model name (for prompt adaptation only) */
  displayModel?: string;
  maxTokens?: number;
  temperature?: number;
}

interface DeepSeekResult {
  content: string;
  tokensUsed: number;
  model: string; // always 'deepseek-chat' internally
}

export class DeepSeekClient {
  private apiKey: string;

  constructor() {
    this.apiKey = process.env.DEEPSEEK_API_KEY || '';
  }

  isConfigured(): boolean {
    return !!this.apiKey;
  }

  async chat(params: DeepSeekCallParams): Promise<DeepSeekResult> {
    if (!this.apiKey) {
      throw new Error('DEEPSEEK_API_KEY not configured');
    }

    const messages: DeepSeekMessage[] = [
      { role: 'system', content: params.systemPrompt },
      { role: 'user', content: params.userPrompt },
    ];

    const response = await fetch(`${DEEPSEEK_BASE_URL}/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: DEEPSEEK_MODEL,
        messages,
        max_tokens: params.maxTokens || DEEPSEEK_MAX_TOKENS,
        temperature: params.temperature ?? DEEPSEEK_TEMPERATURE,
        stream: false,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`DeepSeek API error (${response.status}): ${errorBody}`);
    }

    const data: DeepSeekResponse = await response.json();
    const choice = data.choices?.[0];

    if (!choice?.message?.content) {
      throw new Error('DeepSeek returned empty response');
    }

    return {
      content: choice.message.content,
      tokensUsed: data.usage?.total_tokens || 0,
      model: DEEPSEEK_MODEL,
    };
  }
}

export const deepseekClient = new DeepSeekClient();
