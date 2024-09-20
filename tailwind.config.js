/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1ED760",
        black: "#000000",
        background: "#2A2B2F",
        activePrimary: "#1ED76026",
        white: "#fff"
      },
      fontFamily: {
        black: ['lato-black', 'sans-serif'],
        light: ['lato-light', 'sans-serif'],
        regular: ['lato-regular', 'sans-serif'],
        bold: ['lato-bold', 'sans-serif']
      },
    },
  },
  plugins: [],
};
