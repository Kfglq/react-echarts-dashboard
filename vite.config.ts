// vite.config.ts
import { fileURLToPath, URL } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import type { ConfigEnv, UserConfig } from 'vite';
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
	const env = loadEnv(mode, process.cwd(), '');
	const isDevelopment = env.VITE_REACT_APP_ENV === 'development';
  const protocol = env.VITE_REACT_APP_PROTOCOL === 'https';
	const host = env.VITE_REACT_APP_HOST ?? 'localhost';
	const port = isDevelopment ? parseInt(env.VITE_REACT_APP_PORT ?? '3000', 10) : undefined;
	const prefix = env.VITE_REACT_APP_ROUTE_PREFIX ?? '';
  return {
    plugins: [react()],
		resolve: {
			alias: {
				'@': fileURLToPath(new URL('./src', import.meta.url)),
			},
		},
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: `@import "@/mixin/main.scss";`,
				},
			},
		},
		base: prefix ? `/${prefix}/` : '/',
		server: {
      https: protocol ? { key: '', cert: '' } : undefined, // 根據協議設置 HTTPS
			host: host, // 設定主機
			...(isDevelopment && { port }), // 設定端口
      open: true,
		},
  };
});
