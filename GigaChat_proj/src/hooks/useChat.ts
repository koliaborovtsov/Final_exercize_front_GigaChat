import { useCallback } from "react";
import { useChatStore } from "../store/chatStore";
import { GigaChatAPI } from "../api/gigachatAdapter";
import { v4 as uuidv4 } from "uuid";

export const useChat = () => {
	const {
		messages,
		isLoading,
		isGenerating,
		error,
		currentModel,
		systemPrompt,
		temperature,
		top_p,
		max_tokens,
		addMessage,
		updateLastAssistantMessage,
		setLoading,
		setGenerating,
		setError,
		clearChat,
	} = useChatStore();

	const sendMessage = useCallback(
		async (userInput: string) => {
			if (!userInput.trim() || isLoading) return;

			// Добавляем сообщение пользователя
			const userMessage = {
				id: uuidv4(),
				role: "user" as const,
				content: userInput.trim(),
				timestamp: Date.now(),
			};
			addMessage(userMessage);
			setLoading(true);
			setGenerating(true);

			try {
				const chatMessages = messages
					.filter((m) => m.role !== "system")
					.concat(userMessage)
					.slice(-10); // Контекст ограничен последними 10 сообщениями

				await GigaChatAPI.sendMessageStream(
					chatMessages,
					(token: string) => {
						updateLastAssistantMessage(token);
					},
					() => {
						setLoading(false);
						setGenerating(false);
					},
					//ошибка генерации
					(err: Error) => {
						setError(err.message);
						setLoading(false);
						setGenerating(false);
					},
					currentModel,
					{ temperature, top_p, max_tokens },
				);
			} catch (error) {
				setError((error as Error).message);
				setLoading(false);
				setGenerating(false);
			}
		},
		[messages, isLoading, currentModel, temperature, top_p, max_tokens],
	);

	const stopGeneration = useCallback(() => {
		GigaChatAPI.abortGeneration();
		setLoading(false);
		setGenerating(false);
	}, []);

	return {
		messages,
		isLoading,
		isGenerating,
		error,
		sendMessage,
		stopGeneration,
		clearChat,
	};
};
