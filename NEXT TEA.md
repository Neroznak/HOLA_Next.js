# Обучение FRONTEND NEXT.JS BUN. Настройка системы
1. **npm install -g bun** глобально на комп ставлю bun
2. cd -> папка создания проекта -> **bun create next-app**
3. √ What is your project named? ... next-learn
   √ Would you like to use TypeScript? ... No / Yes
   √ Would you like to use ESLint? ... No / Yes
   √ Would you like to use Tailwind CSS? ... No / Yes
   √ Would you like to use `src/` directory? ... No / Yes
   √ Would you like to use App Router? (recommended) ... No / Yes
   √ Would you like to customize the default import alias (@/*)? ... No / Yes
4. создаём директорию public, там будут статичные картинки. Удаляем favicon.ico из src
5. **pnpm add axios @tanstack/react-query js-cookie geist react-icons react-redux redux-persist sass**
6. **pnpm add -D @trivago/prettier-plugin-sort-imports prettier @types/js-cookie**
7. rename globals.css -> globals.scss
8. .prettierc:
   `module.exports = {
   singleQuote: false, // Использовать одинарные кавычки вместо двойных
   trailingComma: 'none', // Не добавлять запятые в конце списков и объектов
   tabWidth: 2, // Устанавливает ширину табуляции в 2 пробела
   useTabs: false, // Использовать пробелы вместо табуляций для отступов
   semi: true, // Добавлять точку с запятой в конце каждой строки
   printWidth: 80, // Устанавливает максимальную длину строки в 80 символов
   endOfLine: 'auto' // Автоматически определяет стиль окончания строки (CR, LF, CRLF) в зависимости от текущей операционной системы
   };`
9. .env:
   `APP_ENV=development
APP_URL=http://localhost:3000
APP_DOMAIN=localhost
SERVER_URL=http://localhost:5000`
10. меняем next.config:
    ``/** @type {import('next').NextConfig} */
    const nextConfig = {
    env: {
    APP_ENV:process.env.APP_ENV,
    APP_URL:process.env.APP_URL,
    APP_DOMAIN:process.env.APP_DOMAIN,
    SERVER_URL:process.env.SERVER_URL,
    },
    images: {
    remotePatterns: [
    {
    protocol: 'https',
    hostname: 'avatars.yandex.net',
    },
    {
    protocol: 'https',
    hostname: 'lh3.googleusercontent.com',
    }
    ]
    },
    async rewrites() {
    return [
    {
    source: '/uploads/:path*',
    destination: `${process.env.SERVER_URL}/uploads/:path*`,
    }
    ]
    }
};
export default nextConfig;``
11. **pnpm add shadcn@latest**  **pnpm shadcn init**
12. ЧТОБЫ ПОТОМ ДОБАВЛЯТЬ КОМПОНЕНТЫ ИСПОЛЬЗУЮ: **pnpm dlx shadcn-ui@latest add button**
12. tailwind.config:
    `fontFamily: {
    sans:['var(--font-geist-sans)']
    },` среди прочих как бы
13. global.scss upgrade body:
   ` body {
    @apply bg-background text-foreground;
    font-family: var(--font-geist-sans), sans-serif;
    }`
14. src->constants->seo.constants.ts:
    `export const NO_INDEX_PAGE = { robots: { index: false, follow: false } }
export const SITE_NAME = 'TeaShop'
export const SITE_DESCRIPTION =
'Добро пожаловать в наш интернет-магазин - уникальную платформу для комфортных и безопасных покупок, созданную с учетом современных тенденций и технологий.'`
15. корректировки в layouts:
    import type { Metadata } from "next";
    import localFont from "next/font/local";
    import "./globals.scss";
    import {GeistSans} from 'geist/font/sans'
    import {SITE_DESCRIPTION, SITE_NAME} from "@/constants/seo.constants";
16. import { Providers } from "./providers";
const geistSans = localFont({
src: "./fonts/GeistVF.woff",
variable: "--font-geist-sans",
weight: "100 900",
});
const geistMono = localFont({
src: "./fonts/GeistMonoVF.woff",
variable: "--font-geist-mono",
weight: "100 900",
});
export const metadata: Metadata = {
title: {
absolute: SITE_NAME,
template: `%s | ${SITE_NAME}`,
},
description: SITE_DESCRIPTION,
};
export default function RootLayout({
children,
}: Readonly<{
children: React.ReactNode;
}>) {
return (`<html lang="ru">
<body className={GeistSans.variable}><Providers>{children}</Providers>
</body>
</html>
);
}

1.  app -> providers.tsx:
`'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { type PropsWithChildren, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from '@/store/store'
export function Providers({ children }: PropsWithChildren) {
const [client] = useState(
new QueryClient({
defaultOptions: {
queries: {
refetchOnWindowFocus: false // при изменении фокуса окна не отправлялся новый запрос
}
}
})
)
	return (
		<QueryClientProvider client={client}>
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<Toaster />
					{children}
				</PersistGate>
			</Provider>
		</QueryClientProvider>
	)
}`
2. src -> app -> (root) -> page.tsx:














