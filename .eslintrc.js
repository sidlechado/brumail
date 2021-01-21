module.exports = {
	root: true,
	env: {
		node: true,
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: './tsconfig.eslint.json',
		tsconfigRootDir: __dirname,
		ecmaVersion: 9,
		sourceType: 'module',
		extraFileExtensions: ['.json', '.yaml', '.yml'],
	},
	plugins: [
		'@typescript-eslint',
		'json',
		'yaml',
		'no-only-tests',
	],
	extends: [
		'airbnb-typescript/base',
		'plugin:node/recommended',
		'plugin:json/recommended',
	],
	rules: {
		// Configuring 2-spaced Tab indentation and enforces indentation level for case clauses in switch statements
		indent: [2, 'tab', { SwitchCase: 1 }],
		'no-tabs': 0,
		'@typescript-eslint/indent': ['error', 'tab'],

		// Requires functions return to be explicit defined
		'@typescript-eslint/explicit-function-return-type': 'warn',

		// Enforces using ';' as property separator in interfaces
		'@typescript-eslint/member-delimiter-style': ['error', {
			multiline: {
				delimiter: 'semi',
				requireLast: true,
			},
			singleline: {
				delimiter: 'semi',
				requireLast: true,
			},
		}],

		// Allows unused variables in arguments if they start with _
		// Most of the time used in middlewares that needs an argument to be declared
		'@typescript-eslint/no-unused-vars': ['error', {
			argsIgnorePattern: '^_',
		}],

		// Allowing import & export syntax
		'node/no-unsupported-features/es-syntax': ['error', {
			ignores: ['modules'],
		}],

		// This will allow TS files imports
		'node/no-missing-import': 'off',

		// This will allow module-alias usage
		'import/no-unresolved': 'off',

		// Set the lines' max length to 120
		'max-len': ['error', { code: 120 }],

		// Forbid the 'console' usage
		'no-console': 'error',

		// Disable the need of using parentheses around an arrow function's body
		'implicit-arrow-linebreak': 'off',

		'import/extensions': ['error', 'ignorePackages',
			{
				js: 'never',
				ts: 'never',
			},
		],

		// Disable the need of using "default export" when there is only one entity being exported
		'import/prefer-default-export': 'off',
		'no-multiple-empty-lines': 'warn',
		// Do not error when there is no space for //#region and //#endregion (foldable area markers)
		'spaced-comment': ['error', 'always', {
			line: {
				markers: ['#region', '#endregion'],
			},
		}],
		'no-only-tests/no-only-tests': 'error',
	},
};
