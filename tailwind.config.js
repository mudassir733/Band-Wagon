/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/theme");
module.exports = {
  content: [
    "./node_modules/@nextui-org/theme/dist/components/modal.js",
    './node_modules/@nextui-org/theme/dist/components/(modal|snippet|code|input).js',
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/(presentation)/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
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
  plugins: [nextui()],

};
