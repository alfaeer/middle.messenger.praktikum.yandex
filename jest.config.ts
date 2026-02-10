/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from 'jest';

const config: Config = {
    verbose: true,
    roots: [
        'src'
    ],
    testEnvironment: 'jsdom',
    testMatch: [
        '**/__tests__/**/*.+(ts|tsx|js)',
        '**/?(*.)+(spec|test).+(ts|tsx|js)'
    ],
    transform: {
        '^.+\\.(js|ts|tsx)$': 'ts-jest',
    },
    moduleFileExtensions: [
        'js',
        'ts',
    ],
    transformIgnorePatterns: [
        'node_modules/(?!uuid)',
    ],
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': '<rootDir>/src/utils/styleMock.ts',
        '^@/(.*)$': '<rootDir>/src/$1',
        '^@components/(.*)$': '<rootDir>/src/components/$1',
        '^@framework/(.*)$': '<rootDir>/src/framework/$1',
        '^@pages/(.*)$': '<rootDir>/src/pages/$1',
        '^@utils/(.*)$': '<rootDir>/src/utils/$1',
        '^@rest/(.*)$': '<rootDir>/src/rest/$1',
        '^@service/(.*)$': '<rootDir>/src/service/$1',
        '^@types/(.*)$': '<rootDir>/src/types/$1'
    },
};

export default config;
