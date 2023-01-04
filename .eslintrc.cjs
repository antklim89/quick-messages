module.exports = {
    env: {
        browser: true,
        es2020: true,
    },
    extends: [
        'eslint:all',

        /**
        * React
        */
        'plugin:react/all',
        'plugin:react-hooks/recommended',
        'plugin:jsx-a11y/strict',

        /**
        * Imports
        */
        'plugin:import/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',

        /**
        * TypeScript
        */
        'plugin:@typescript-eslint/recommended',
    ],

    // parser: "vue-eslint-parser", // VUE
    parser: '@typescript-eslint/parser', // TYPESCRIPT

    parserOptions: {
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
    },
    plugins: [
        '@typescript-eslint',
        'jsx-a11y',
    ],
    rules: {

        /**
        * Imports
        */
        'import/no-unresolved': 0,
        'import/prefer-default-export': 0,
        'import/extensions': 0,
        'import/newline-after-import': ['error', { count: 2 }],
        'import/order': [
            1, {
                'groups': ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
                'newlines-between': 'never',
                'alphabetize': { order: 'asc', caseInsensitive: true },
            },
        ],
        'import/no-extraneous-dependencies': [
            'error', { 'devDependencies': [
                '**/*.test.*',
                '**/*.spec.*',
                '**/*.config.*',
                '**/*.cy.*',
                './cypress/**/*',
            ] },
        ],

        /**
        * Vue
        */
        // "vue/html-indent": [1, 4],

        /**
        * React
        */
        'react/jsx-no-useless-fragment': [2, { allowExpressions: true }],
        'react-hooks/exhaustive-deps': 0,
        'react/jsx-one-expression-per-line': 0,
        'react/forbid-component-props': 0,
        'react/jsx-no-literals': 0,
        'react/jsx-newline': 0,
        'react/prop-types': 0,
        'react/jsx-props-no-spreading': 0,
        'react/react-in-jsx-scope': 0,
        'react/require-default-props': 0,
        'react/destructuring-assignment': 0,
        'react/jsx-closing-bracket-location': 2,
        'react/jsx-no-bind': [2, { ignoreDOMComponents: true }],
        'react/function-component-definition': [2, { 'namedComponents': 'arrow-function' }],
        'react/jsx-max-depth': [1, { 'max': 5 }],
        'react/jsx-sort-props': [1, { callbacksLast: true, shorthandFirst: true }],
        'react/jsx-max-props-per-line': [1, { maximum: 3 }],
        'react/jsx-indent': [1, 4],
        'react/jsx-indent-props': [1, 4],
        'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.jsx'] }],
        'react/jsx-no-duplicate-props': [2, { ignoreCase: false }],

        'jsx-a11y/label-has-associated-control': 2,
        'jsx-a11y/anchor-is-valid': 0,

        /**
        * TypeScript
        */
        '@typescript-eslint/no-empty-interface': 0,
        '@typescript-eslint/no-shadow': 2,
        '@typescript-eslint/no-unused-vars': [1, { argsIgnorePattern: '^_' }],

        /**
        * JavaScript
        */
        'no-warning-comments': [1],
        'newline-per-chained-call': [1, { 'ignoreChainWithDepth': 3 }],
        'spaced-comment': [2, 'always', { 'markers': ['/'] }],
        'capitalized-comments': 0,
        'multiline-comment-style': 0,
        'no-inline-comments': 0,
        'line-comment-position': 0,
        'require-unicode-regexp': 0,
        'no-extra-parens': 0,
        'prefer-named-capture-group': 0,
        'id-length': 0,
        'no-ternary': 0,
        'curly': 0,
        'init-declarations': 0,
        'require-await': 0,
        'space-before-function-paren': 0,
        'sort-imports': 0,
        'one-var': 0,
        'padded-blocks': 0,
        'no-magic-numbers': 0,
        'sort-keys': 0,
        'object-property-newline': 0,
        'no-shadow': 0,
        'no-undef': 0,
        'no-useless-constructor': 0,
        'no-unused-vars': 0,
        'func-style': 0,
        'arrow-body-style': 0,
        'multiline-ternary': [2, 'always-multiline'],
        'no-implicit-coercion': 2,
        'operator-linebreak': [2, 'before'],
        'dot-location': [2, 'property'],
        'max-lines-per-function': [2, 200],
        'max-statements': ['error', 20, { ignoreTopLevelFunctions: true }],
        'function-call-argument-newline': [2, 'consistent'],
        'no-console': [1, { allow: ['error'] }],
        'object-curly-spacing': [2, 'always'],
        'no-use-before-define': [1, { functions: false, classes: true }],
        'semi': 2,
        'comma-dangle': [1, 'always-multiline'],
        'quotes': [1, 'single'],
        'quote-props': [2, 'consistent'],
        'eol-last': 2,
        'no-multiple-empty-lines': [1, { max: 2 }],
        'indent': [1, 4],
        'max-len': [1, { code: 120, ignoreComments: true, ignoreStrings: true }],
        'no-restricted-syntax': [2, 'WithStatement'],
        'camelcase': [1, { properties: 'never' }],
        'object-curly-newline': [1, { minProperties: 6, multiline: false, consistent: true }],
        'array-element-newline': [1, 'consistent'],
    },
    settings: {
        react: {
            pragma: 'React',
            fragment: 'Fragment',
            version: 'detect',
        },
    },

    globals: {
        module: true,
        process: true,
        JSX: true,
    },

    ignorePatterns: [
        '**/node_modules/**/*',
        '**/.next/**/*',
        '**/build/**/*',
        '**/.tmp/**/*',
        '**/.cache/**/*',
        '**/testSetup.ts',
    ],
};
