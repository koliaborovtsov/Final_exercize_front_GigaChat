import { v4 as uuidv4 } from 'uuid';

const AUTH_URL = import.meta.env.VITE_GIGACHAT_AUTH_URL || '/auth/v2/oauth';
let cachedToken: string | null = null;
let tokenExpiration: number = 0;

export const getToken = async (): Promise<string> => {
  if (cachedToken && Date.now() < tokenExpiration) {
	return cachedToken;
  }

  const clientId = import.meta.env.VITE_GIGACHAT_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_GIGACHAT_CLIENT_SECRET;
  const rquid = uuidv4();

  try {
	const response = await fetch(AUTH_URL, {
	  method: 'POST',
	  headers: {
		'Content-Type': 'application/x-www-form-urlencoded',
		'Accept': 'application/json',
		'RqUID': rquid,
		'Authorization': `Basic ${btoa(`${clientId}:${clientSecret}`)}`
	  },
	  body: 'scope=GIGACHAT_API_PERS'
	});

	if (!response.ok) {
	  throw new Error(`Ошибка авторизации: ${response.status}`);
	}

	const data = await response.json();
	cachedToken = data.access_token;
	tokenExpiration = Date.now() + (data.expires_in * 1000);

	return cachedToken!;
  } catch (error) {
	console.error('Ошибка получения токена:', error);
	throw error;
  }
};