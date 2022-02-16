module.exports = {
  content: ["./src/app/**/*.{html,ts,js}", "./src/index.html"],
  theme: {
    container: {
      padding: "2rem",
      center: true,
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
