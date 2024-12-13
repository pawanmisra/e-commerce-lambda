import globals from "globals";
import pluginJs from "@eslint/js";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: { globals: globals.browser },
    files: ["./**/*.mjs"],
    ignores: ["tests/*", "tests/unit/*"]
  },
  pluginJs.configs.recommended,
];