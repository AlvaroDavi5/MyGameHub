import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@components': fileURLToPath(new URL('./app/components', import.meta.url)),
			'@configs': fileURLToPath(new URL('./app/configs', import.meta.url)),
			'@assets': fileURLToPath(new URL('./app/assets', import.meta.url)),
		},
	},
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: ['./tests/setup.ts'],
		include: ['tests/**/*.test.{ts,tsx}'],
		css: false,
		coverage: {
			provider: 'v8',
			reportsDirectory: './coverage',
			reporter: ['text', 'lcov'],
			include: ['app/**/*.{ts,tsx}'],
			exclude: ['app/**/*.d.ts', 'app/routes.ts'],
		},
	},
});
