import React, { useEffect, useRef } from 'react';
import { useChat } from '../../hooks/useChat';
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard';
import Message from './Message';
import InputField from './InputField';
import styles from './ChatWindow.module.css';

const ChatWindow: React.FC = () => {
  const {
	messages,
	isLoading,
	isGenerating,
	error,
	sendMessage,
	stopGeneration,
	clearChat
  } = useChat();

  const { copiedId, copyToClipboard } = useCopyToClipboard();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Автоматическая прокрутка к последнему сообщению
  useEffect(() => {
	messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
	<div className={styles.chatWindow}>
	  <div className={styles.header}>
		<h2>GigaChat Assistant</h2>
		<button onClick={clearChat} className={styles.clearButton}>
		  Очистить чат
		</button>
	  </div>

	  <div className={styles.messagesContainer}>
		{messages.length === 0 && (
		  <div className={styles.welcomeMessage}>
			<h3>Добро пожаловать в GigaChat!</h3>
			<p>Задайте вопрос или начните обсуждение</p>
		  </div>
		)}

		{messages.map((message) => (
		  <Message
			key={message.id}
			message={message}
			onCopy={copyToClipboard}
			isCopied={copiedId === message.id}
		  />
		))}

		{error && (
		  <div className={styles.error}>
			<p>⚠️ {error}</p>
		  </div>
		)}

		<div ref={messagesEndRef} />
	  </div>

	  <InputField
		onSend={sendMessage}
		onStop={stopGeneration}
		isLoading={isGenerating}
		disabled={isLoading && !isGenerating}
	  />
	</div>
  );
};

export default ChatWindow;