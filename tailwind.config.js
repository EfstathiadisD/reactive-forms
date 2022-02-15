module.exports = {
  content: ["./src/app/**/*.{html,ts,js}", "./src/index.html"],
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
