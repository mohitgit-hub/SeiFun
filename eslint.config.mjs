import { defineConfig } from 'eslint/config'
import js from '@eslint/js'
import globals from 'globals'
import pluginReact from 'eslint-plugin-react'
import prettier from 'eslint-plugin-prettier'

export default defineConfig([
    {
        files: ['backend/**/*.{js,mjs,cjs,jsx}', 'sei-dApp/**/*.{js,mjs,cjs,jsx}'],
        plugins: { js, prettier },
        languageOptions: { globals: globals.browser },
        extends: ['js/recommended'],
    },
    {
        files: ['sei-dApp/**/*.{js,jsx}'],
        ...pluginReact.configs.flat.recommended,
    },
])
