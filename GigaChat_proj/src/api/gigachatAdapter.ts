import { GigaChatMessage, ChatCompletionRequest, StreamChunk } from './types';
import { getToken } from './authService';

const BASE_URL = '/api/v1';
let abortController: AbortController | null = null;

export const GigaChatAPI = {
  sendMessageStream: async (
	messages: GigaChatMessage[],
	onToken: (token: string) => void,
	onComplete: (fullText: string) => void,
	onError: (error: Error) => void,
	model: string = 'GigaChat',
	options?: {
	  temperature?: number;
	  top_p?: number;
	  max_tokens?: number;
	}
  ) => {
	const token = await getToken();
	abortController = new AbortController();

	const systemMessage = messages.find(m => m.role === 'system') || {
	  role: 'system',
	  content: 'Ты полезный ассистент'
	};

	const body: ChatCompletionRequest = {
	  model,
	  messages: [systemMessage, ...messages.filter(m => m.role !== 'system')],
	  temperature: options?.temperature ?? 1.0,
	  top_p: options?.top_p ?? 0.9,
	  max_tokens: options?.max_tokens ?? 2048,
	  stream: true,
	  update_interval: 0
	};

	try {
	  const response = await fetch(`${BASE_URL}/chat/completions`, {
		method: 'POST',
		headers: {
		  'Authorization': `Bearer ${token}`,
		  'Content-Type': 'application/json',
		  'Accept': 'application/json'
		},
		body: JSON.stringify(body),
		signal: abortController.signal
	  });

	  if (!response.ok) {
		throw new Error(`HTTP ошибка: ${response.status}`);
	  }

	  const reader = response.body?.getReader();
	  if (!reader) throw new Error('Не поддерживается streaming');

	  const decoder = new TextDecoder();
	  let fullText = '';
	  let buffer = '';

	  while (true) {
		const { done, value } = await reader.read();
		if (done) break;

		buffer += decoder.decode(value, { stream: true });
		const lines = buffer.split('\n');
		buffer = lines.pop() || '';

		for (const line of lines) {
		  if (line.startsWith('data: ')) {
			const data = line.slice(6).trim();
			if (data === '[DONE]') {
			  onComplete(fullText);
			  return;
			}

			try {
			  const parsed = JSON.parse(data) as StreamChunk;
			  const content = parsed.choices[0]?.delta?.content || '';
			  fullText += content;
			  onToken(content);
			} catch (e) {
			  console.warn('Ошибка парсинга SSE:', e);
			}
		  }
		}
	  }

	  onComplete(fullText);
	} catch (error) {
	  if ((error as Error).name === 'AbortError') {
		onComplete(fullText || '');
	  } else {
		onError(error as Error);
	  }
	}
  },

  getModels: async (): Promise<ModelInfo[]> => {
	const token = await getToken();
	const response = await fetch(`${BASE_URL}/models`, {
	  headers: {
		'Authorization': `Bearer ${token}`,
		'Accept': 'application/json'
	  }
	});

	if (!response.ok) {
	  throw new Error(`Ошибка получения моделей: ${response.status}`);
	}

	const data = await response.json();
	return data.data as ModelInfo[];
  },

  // Отмена генерации
  abortGeneration: () => {
	if (abortController) {
	  abortController.abort();
	  abortController = null;
	}
  }
};