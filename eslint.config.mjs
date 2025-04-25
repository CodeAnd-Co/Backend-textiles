import js from '@eslint/js';
import globals from 'globals';
import jsdoc from 'eslint-plugin-jsdoc';

export default [
  { ignores: ['dist', 'node_modules'] },

  // JSDoc rules for target files - controllers and utility/data folders (excluding Constantes)
  {
    plugins: {
      jsdoc,
    },
    files: ['**/Utilidades/**/*.js', '**/Datos/**/*.js', '**/*.controller.js'],
    ignores: [
      '**/Utilidades/**/Constantes/**/*.js', // Exclude Constantes folders
    ],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: globals.node,
      parserOptions: {
        ecmaFeatures: { jsx: false },
        sourceType: 'module',
      },
    },
    settings: {
      jsdoc: {
        mode: 'jsdoc', // Classic JS mode, not TypeScript
      },
    },
    rules: {
      // Enforce JSDoc presence - Highest priority
      'jsdoc/require-jsdoc': [
        'error', // Changed from "warn" to "error" to enforce more strictly
        {
          require: {
            FunctionDeclaration: true,
            MethodDefinition: true,
            ClassDeclaration: true,
            ArrowFunctionExpression: true, // Changed to true to require JSDoc for arrow functions
            FunctionExpression: true, // Changed to true to require JSDoc for function expressions
          },
          exemptEmptyFunctions: false, // Require JSDoc even for empty functions
        },
      ],

      // Enforce JSDoc content quality - With warnings
      'jsdoc/require-param': 'warn',
      'jsdoc/require-param-name': 'warn',
      'jsdoc/require-param-type': 'warn',
      'jsdoc/require-returns': 'warn',
      'jsdoc/require-returns-type': 'warn',
      'jsdoc/valid-types': 'warn',
      'jsdoc/check-param-names': 'warn',
      'jsdoc/check-tag-names': 'warn',
      'jsdoc/check-types': 'warn',

      // Optional rules based on your preference
      'jsdoc/require-description': 'warn', // Added: Require general descriptions
      'jsdoc/require-param-description': 'off', // Kept off as per your preference
      'jsdoc/require-returns-description': 'off', // Kept off as per your preference
    },
  },

  // General rules for all JavaScript files
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: globals.node,
      parserOptions: {
        ecmaFeatures: { jsx: false },
        sourceType: 'module',
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      'object-shorthand': 'error',
      'no-new-object': 'error',
      'default-param-last': 'error',
      'no-new-func': 'error',
      'function-paren-newline': ['error', 'consistent'],
      'no-duplicate-imports': 'error',
      'object-curly-newline': ['error', { consistent: true }],
      'no-undef': 'error',
      'prefer-const': 'error',
      'one-var': ['error', 'never'],
      'no-multi-assign': 'error',
      'no-plusplus': 'error',
      'operator-linebreak': ['error', 'before'],
      'new-cap': [
        'error',
        {
          newIsCap: true,
          capIsNew: false,
          capIsNewExceptions: ['Router'],
          properties: false,
        },
      ],
      camelcase: [
        'error',
        {
          properties: 'never',
          allow: ['exec_mode'],
        },
      ],
      'id-length': ['error', { min: 2 }],
      'nonblock-statement-body-position': ['error', 'beside'],
      'brace-style': ['error', '1tbs', { allowSingleLine: true }],
      'no-iterator': 'error',
      'no-restricted-syntax': 'error',
      'prefer-arrow-callback': 'error',
      'arrow-spacing': 'error',
      'no-array-constructor': 'error',
      'template-curly-spacing': ['error', 'never'],
      'prefer-template': 'error',
      'no-eval': 'error',
      'no-useless-constructor': 'error',
      'no-dupe-class-members': 'error',
      'class-methods-use-this': 'error',
      'dot-notation': 'error',
      'prefer-exponentiation-operator': 'error',
    },
  },

  // Special configuration for test files
  {
    files: ['**/*.test.js', '**/*.spec.js', 'jest.setup.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      parserOptions: {
        sourceType: 'module',
      },
    },
  },
];
