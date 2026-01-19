/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    "grid",
    "grid-cols-1",
    "grid-cols-2",
    "grid-cols-3",
    "md:grid-cols-2",
    "lg:grid-cols-3",
    "gap-6",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
