/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        background: "var(--color-background)",
        text: "var(--color-text)",
      },
    },
  },
  plugins: [],
};
