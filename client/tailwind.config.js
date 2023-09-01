/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#FF954F",
        secondary: "#FF602B",
        tertiary: "#990202",
        orange: "#FFA800",
        green: "#198754",
        red: "#DC3545",
        light: "#E8EDF5",
        gray: "#8F8F8F",
        lightgray: "#ECECEC",
        white: "#fefefe",
        black: "#090909",
      },
      fontFamily: {
        opensans: ["Open Sans", "sans-serif"],
      }       
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [],
}