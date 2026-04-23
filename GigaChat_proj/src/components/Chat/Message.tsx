import React from 'react';
import { Message as MessageType } from '../../store/types';
import MarkdownRenderer from '../Markdown/MarkdownRenderer';
import styles from './Message.module.css';

interface MessageProps {
  message: MessageType;
  onCopy: (text: string, id: string) => void;
  isCopied: boolean;
}

const Message: React.FC<MessageProps> = ({ message, onCopy, isCopied }) => {
  const isUser = message.role === 'user';
  const time = new Date(message.timestamp).toLocaleTimeString();

  return (
	<div className={`${styles.message} ${isUser ? styles.userMessage : styles.assistantMessage}`}>
	  <div className={styles.avatar}>
		{isUser ? '👤' : '🤖'}
	  </div>
	  <div className={styles.content}>
		<div className={styles.header}>
		  <span className={styles.role}>
			{isUser ? 'Вы' : 'GigaChat'}
		  </span>
		  <span className={styles.time}>{time}</span>
		</div>
		<div className={styles.text}>
		  {isUser ? (
			<p>{message.content}</p>
		  ) : (
			<>
			  <MarkdownRenderer content={message.content} />
			  <div className={styles.actions}>
				<button
				  onClick={() => onCopy(message.content, message.id)}
				  className={styles.copyButton}
				>
				  {isCopied ? '✅ Скопировано' : '📋 Копировать'}
				</button>
			  </div>
			</>
		  )}
		</div>
	  </div>
	</div>
  );
};

export default Message;