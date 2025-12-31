export default {
    extends: [
        'stylelint-config-standard',
        'stylelint-config-tailwindcss'
    ],
    rules: {
        'no-duplicate-selectors': true,
        'selector-type-case': 'lower',
        'at-rule-empty-line-before': 'always',
    },
    ignoreFiles: ['dist/**', 'node_modules/**']
};
