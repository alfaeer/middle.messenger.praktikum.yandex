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
                "error404": './src/pages/error404/index.html',
                "error500": './src/pages/error500/index.html',
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
            '@framework': '/src/framework',
            '@pages': '/src/pages',
            '@utils': '/src/utils'
        },
    },
    plugins: [
        tailwindcss()
    ]
});
