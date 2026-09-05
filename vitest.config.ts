import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'~': fileURLToPath(new URL('./app', import.meta.url)),
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
