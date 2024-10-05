import { loadEnv } from 'vite';
import { defineConfig } from 'vitest/config';

export default defineConfig(({ mode }) => ({
	test: {
		environment: 'jsdom',
		// mode defines what ".env.{mode}" file to choose if exists
		env: loadEnv(mode, process.cwd(), ''),
		exclude: [
			// Defaults
			'**/node_modules/**',
			'**/dist/**',
			'**/cypress/**',
			'**/.{idea,git,cache,output,temp}/**',
			'**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build,eslint,prettier}.config.*',

			// Playwright Tests
			'tests/**/*'
		],
		watch: false
	},
	include: 'src/**/*.spec.ts'
}));
