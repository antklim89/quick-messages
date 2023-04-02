import { resolve } from 'path';
import { URL } from 'url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';


export default defineConfig({
    plugins: [react()],
    clearScreen: false,
    resolve: {
        alias: {
            '~': resolve(new URL('.', import.meta.url).pathname, './src'),
        },
    },
    define: {
        IS_DEV: process.env.NODE_ENV === 'development',
    },
});
