import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";

/** @type {import('eslint').Linter.Config[]} */
export default [
    {
        ignores: ["dist", "node_modules"],
    },
    {
        files: ["**/*.{js,mjs,cjs,ts,vue}"]
    },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    ...pluginVue.configs["flat/recommended"],
    {
        files: ["**/*.vue"],
        rules: {
            "vue/multi-word-component-names": "off",
        },
        languageOptions: {
            parserOptions: {
                parser: tseslint.parser,
            },
        },
    },
];
