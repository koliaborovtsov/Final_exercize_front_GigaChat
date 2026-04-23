# GigaChat Clone

Веб-клиент для общения с моделью GigaChat от Сбера. Построен на React + TypeScript + Vite.

## Возможности

- Чат с моделью GigaChat в режиме реального времени (streaming)
- История сообщений с сохранением в локальном хранилище (Zustand)
- Markdown-разметка ответов с подсветкой кода
- Возможность отмены генерации
- Системные сообщения и настройка параметров (`temperature`, `top_p`, `max_tokens`)

## Стек

- React 18 + TypeScript
- Vite 5
- Zustand — управление состоянием
- react-markdown + remark-gfm — рендер Markdown
- react-syntax-highlighter — подсветка кода

## Требования

- Node.js 20+
- Учётная запись разработчика на [Sber Developers](https://developers.sber.ru/studio) с активным проектом GigaChat API

## Установка

```bash
git clone <ссылка на репозиторий>
cd GigaChat_proj
npm install
```

## Настройка

Получите `Client ID` и `Client Secret`, далее в .env в корне проекта:

```
VITE_GIGACHAT_CLIENT_ID=ваш_client_id
VITE_GIGACHAT_CLIENT_SECRET=ваш_client_secret
```

По умолчанию используется scope `GIGACHAT_API_PERS`. Для корпоративного доступа поменяйте scope в `src/api/authService.ts`.

## Запуск


```bash
npx vite
```

(Приложение откроется на `http://localhost:5000`)

Или:

```bash
npm run build
```

Локальный предпросмотр собранной версии:

```bash
npm run preview
```

## Структура проекта

```
GigaChat_proj/
├── index.html
├── vite.config.ts        # настройки Vite + прокси на серверы Sber
├── tsconfig.json
└── src/
    ├── main.tsx          # точка входа
    ├── App.tsx
    ├── api/              # работа с GigaChat API
    ├── components/       # UI-компоненты
    ├── hooks/            # пользовательские хуки
    ├── store/            # Zustand-стор
    └── styles/           # глобальные стили
```

