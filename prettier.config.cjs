/** @type {import("prettier").Config} */
const config = {
  trailingComma: "es5",
  semi: true,
  tabWidth: 2,
  singleQuote: true,
  jsxSingleQuote: true,
  printWidth: 80,
  plugins: [require.resolve("prettier-plugin-tailwindcss")],
};

module.exports = config;
