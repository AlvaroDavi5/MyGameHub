import { reactRouter } from '@react-router/dev/vite';
import { defineConfig } from 'vite';

const port = Number(process.env.PORT) || 3001;

export default defineConfig({
	plugins: [reactRouter()],
	resolve: {
		tsconfigPaths: true,
	},
	server: {
		port,
		strictPort: true,
	},
	preview: {
		port,
		strictPort: true,
	},
});
