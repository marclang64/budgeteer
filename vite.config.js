import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';

// REMOVED_FIREBASE_DATABASE_URL://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: './tests/setup.js',
	},
	resolve: {
		alias: [
			{ find: '@', replacement: path.resolve(__dirname, 'src') },
			{
				find: '@components',
				replacement: path.resolve(__dirname, 'src/components'),
			},
			{
				find: '@context',
				replacement: path.resolve(__dirname, 'src/context'),
			},
			{
				find: '@hooks',
				replacement: path.resolve(__dirname, 'src/hooks'),
			},
			{
				find: '@pages',
				replacement: path.resolve(__dirname, 'src/pages'),
			},
			{
				find: '@routing',
				replacement: path.resolve(__dirname, 'src/routing'),
			},
			{
				find: '@shared',
				replacement: path.resolve(__dirname, 'src/shared'),
			},
			{
				find: '@utils',
				replacement: path.resolve(__dirname, 'src/utils'),
			},
		],
	},
});
