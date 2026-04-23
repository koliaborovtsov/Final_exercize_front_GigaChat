import React, { useState } from 'react';
import { useChatStore } from '../../store/chatStore';
import styles from './SystemPrompt.module.css';

const SystemPrompt: React.FC = () => {
  const { systemPrompt, setSystemPrompt, temperature, top_p, max_tokens } = useChatStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editPrompt, setEditPrompt] = useState(systemPrompt);

  const handleSave = () => {
	setSystemPrompt(editPrompt);
	setIsEditing(false);
  };

  return (
	<div className={styles.systemPrompt}>
	  <h4>Системный промпт:</h4>
	  {isEditing ? (
		<div>
		  <textarea
			value={editPrompt}
			onChange={(e) => setEditPrompt(e.target.value)}
			className={styles.editTextarea}
		  />
		  <button onClick={handleSave} className={styles.saveButton}>
			Сохранить
		  </button>
		  <button onClick={() => setIsEditing(false)} className={styles.cancelButton}>
			Отмена
		  </button>
		</div>
	  ) : (
		<div className={styles.promptDisplay}>
		  <p>{systemPrompt}</p>
		  <button onClick={() => setIsEditing(true)} className={styles.editButton}>
			✏️ Редактировать
		  </button>
		</div>
	  )}
	</div>
  );
};

export default SystemPrompt;