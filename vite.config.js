import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    root: '.',
    build: {
        outDir: "dist",
		rollupOptions: {
            input: {
                "main": './index.html',
                "sign-in": './src/pages/sign-in/index.html',
                "sign-up": './src/pages/sign-up/index.html',
                "chat": './src/pages/chat/index.html',
                "error_404": './src/pages/error_404/index.html',
                "error_500": './src/pages/error_500/index.html',
                "profile": './src/pages/profile/index.html'
            }
        }
    },
    server: {
        port: 3000
    },
    preview: {
        port: 3000
    },
    resolve: {
        alias: {
            '@': '/src',
            '@components': '/src/components',
            '@pages': '/src/pages',
            '@utils': '/src/utils'
        },
    },
    plugins: [
        tailwindcss()
    ]
});
