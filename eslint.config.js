import { defineConfig } from 'eslint/config';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default defineConfig([
    {
        plugins: {
            '@typescript-eslint': tsPlugin,
        },

        languageOptions: {
            parser: tsParser,
        },

        rules: {
            'max-len': [2, 100],
            '@typescript-eslint/no-unused-vars': 2,
        },
    },
    {
        ignores: ['dist/', 'node_modules/'],
    }
]);
