export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  isGenerating: boolean;
  error: string | null;
  currentModel: string;
  systemPrompt: string;
  temperature: number;
  top_p: number;
  max_tokens: number;

  addMessage: (message: Message) => void;
  updateLastAssistantMessage: (content: string) => void;
  setLoading: (loading: boolean) => void;
  setGenerating: (generating: boolean) => void;
  setError: (error: string | null) => void;
  clearChat: () => void;
  setModel: (model: string) => void;
  setSystemPrompt: (prompt: string) => void;
}