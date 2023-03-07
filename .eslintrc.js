module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: __dirname,
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint/eslint-plugin', 'import', 'prettier'],
    extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'plugin:import/recommended',
        'plugin:import/typescript',
    ],
    settings: {
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts'],
        },
    },
    root: true,
    env: {
        node: true,
        jest: true,
    },
    ignorePatterns: [
        '.eslintrc.*',
        'node_modules/**',
        'dist/**',
        'test/**',
        'e2e/**',
        '**/*.hbs',
    ],
    rules: {
        semi: ['error', 'always'],
        strict: 'error',
        'no-console': 'warn',
        'comma-dangle': 'off',
        'no-unused-vars': 'off',
        'no-use-before-define': 'off',
        'array-callback-return': 'off',
        'no-restricted-syntax': [
            'warn',
            {
                selector: "CallExpression[callee.name='debug']",
                message:
                    "La función 'debug' solo debe estar disponible en desarrollo. Eliminar antes de salir a producción.",
            },
        ],
        'spaced-comment': [
            'error',
            'always',
            {
                markers: [
                    '!',
                    '?',
                    '*',
                    '//',
                    'todo',
                    'TODO',
                    'bug',
                    'BUG',
                    'hack',
                    'HACK',
                    'fixme',
                    'FIXME',
                    'xxx',
                    'XXX',
                    'fix',
                    'FIX',
                    'fixit',
                    'FIXIT',
                    '#region',
                    '#endregion',
                ],
                exceptions: ['-', '+'],
            },
        ],
        'import/no-named-as-default': 'off',
        'import/order': [
            'error',
            {
                'newlines-between': 'always-and-inside-groups',
                groups: [
                    // built-in types are first
                    'builtin',
                    // then external modules
                    'external',
                    // then parent types
                    'parent',
                    // then siblings
                    'sibling',
                    // Then the index file
                    'index',
                    // Then the rest: internal and external type
                    'object',
                ],
            },
        ],
        'import/no-cycle': 'off',
        'import/export': 'off',
        '@typescript-eslint/no-unused-vars': [
            'error',
            { vars: 'all', args: 'after-used', ignoreRestSiblings: false },
        ],
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        'prettier/prettier': [
            'error',
            {
                semi: true,
                singleQuote: true,
                arrowParens: 'avoid',
                trailingComma: 'all',
                tabWidth: 4,
                useTabs: false,
                endOfLine: 'lf',
            },
        ],
    },
};
