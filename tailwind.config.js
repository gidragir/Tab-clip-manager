/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        bg_main: "var(--background-main)",
        bg_clip: "var(--background-clip)",
        shadow: "var(--shadow)",
        text_color: "var(--text-color)",
      },
      boxShadow: {
        'sm': '0 0 1px 1px',
      }
    },
  },
  plugins: [],
};
