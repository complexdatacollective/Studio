const path = require("path");

/** @type {import("eslint").Linter.Config} */
const config = {
  overrides: [{
    extends: ["plugin:@typescript-eslint/recommended-requiring-type-checking"],
    files: ["*.ts", "*.tsx"],
    parserOptions: {
      project: path.join(__dirname, "tsconfig.json")
    }
  }],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: path.join(__dirname, "tsconfig.json")
  },
  plugins: ["@typescript-eslint"],
  extends: [
    "next/core-web-vitals", "plugin:@typescript-eslint/recommended", "plugin:storybook/recommended", "prettier", "plugin:storybook/recommended",],
  rules: {
    "@typescript-eslint/consistent-type-imports": ["warn", {
      prefer: "type-imports",
      fixStyle: "inline-type-imports"
    }],
    "@typescript-eslint/no-unused-vars": ["warn", {
      argsIgnorePattern: "^_"
    }]
  }
};
module.exports = config;