import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    root: '.',
    build: {
        outDir: "dist",
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
            '@utils': '/src/utils',
            '@rest': '/src/rest',
            '@service': '/src/service',
            '@types': '/src/types',
        },
    },
    plugins: [
        tailwindcss()
    ]
});
