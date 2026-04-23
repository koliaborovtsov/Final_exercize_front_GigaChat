export interface GigaChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface ChatCompletionRequest {
  model: string;
  messages: GigaChatMessage[];
  temperature?: number;
  top_p?: number;
  max_tokens?: number;
  stream?: boolean;
  update_interval?: number;
}

export interface ModelInfo {
  id: string;
  object: string;
  owned_by: string;
}

export interface StreamChunk {
  choices: Array<{
	delta: {
	  content?: string;
	  role?: string;
	};
	finish_reason: string | null;
  }>;
}