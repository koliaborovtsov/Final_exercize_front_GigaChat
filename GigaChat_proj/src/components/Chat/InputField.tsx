import React, { useState } from 'react';
import styles from './InputField.module.css';

interface InputFieldProps {
  onSend: (message: string) => void;
  onStop: () => void;
  isLoading: boolean;
  disabled: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  onSend,
  onStop,
  isLoading,
  disabled
}) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
	e.preventDefault();
	if (input.trim()) {
	  onSend(input.trim());
	  setInput('');
	}
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
	if (e.key === 'Enter' && !e.shiftKey) {
	  e.preventDefault();
	  handleSubmit(e);
	}
  };

  return (
	<form onSubmit={handleSubmit} className={styles.inputField}>
	  <textarea
		value={input}
		onChange={(e) => setInput(e.target.value)}
		onKeyDown={handleKeyDown}
		placeholder="Введите сообщение... (Shift+Enter для новой строки)"
		rows={2}
		disabled={disabled}
		className={styles.textarea}
	  />
	  <div className={styles.buttons}>
		{isLoading ? (
		  <button
			type="button"
			onClick={onStop}
			className={styles.stopButton}
		  >
			⏹ Остановить
		  </button>
		) : (
		  <button
			type="submit"
			disabled={!input.trim() || disabled}
			className={styles.sendButton}
		  >
			▶ Отправить
		  </button>
		)}
	  </div>
	</form>
  );
};

export default InputField;