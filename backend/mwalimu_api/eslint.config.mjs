// @ts-check

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    {
        
        rules: {
            "@typescript-eslint/no-unused-vars": 0,
            "@typescript-eslint/prefer-as-const": 0,
            "@typescript-eslint/no-unsafe-assignment": 0,
            "@typescript-eslint/no-invalid-this": 2,
        },
    },
);
