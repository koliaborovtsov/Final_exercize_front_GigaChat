import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { ChatState, Message } from "./types";

export const useChatStore = create<ChatState>((set) => ({
	messages: [],
	isLoading: false,
	isGenerating: false,
	error: null,
	currentModel: "GigaChat",
	systemPrompt: "Ты полезный ассистент!",
	temperature: 1.0,
	top_p: 0.9,
	max_tokens: 2048,

	addMessage: (message: Message) =>
		set((state) => ({
			messages: [...state.messages, message],
			error: null,
		})),

	updateLastAssistantMessage: (content: string) =>
		set((state) => {
			const messages = [...state.messages];
			const lastMessage = messages[messages.length - 1];

			if (lastMessage && lastMessage.role === "assistant") {
				messages[messages.length - 1] = {
					...lastMessage,
					content: lastMessage.content + content,
				};
			} else {
				messages.push({
					id: uuidv4(),
					role: "assistant",
					content,
					timestamp: Date.now(),
				});
			}

			return { messages };
		}),

	setLoading: (loading: boolean) => set({ isLoading: loading }),

	setGenerating: (generating: boolean) => set({ isGenerating: generating }),

	setError: (error: string | null) =>
		set({ error, isLoading: false, isGenerating: false }),

	clearChat: () => set({ messages: [], error: null }),

	setModel: (model: string) => set({ currentModel: model }),

	setSystemPrompt: (prompt: string) => set({ systemPrompt: prompt }),
}));
