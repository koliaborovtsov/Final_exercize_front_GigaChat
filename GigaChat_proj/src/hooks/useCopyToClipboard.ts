import { useState, useCallback } from 'react';

export const useCopyToClipboard = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = useCallback(async (text: string, id: string) => {
	try {
	  await navigator.clipboard.writeText(text);
	  setCopiedId(id);
	  setTimeout(() => setCopiedId(null), 2000);
	  return true;
	} catch (error) {
	  console.error('Ошибка копирования:', error);
	  return false;
	}
  }, []);

  return { copiedId, copyToClipboard };
};