/** @type {import('tailwindcss').Config} */
// import flowbite from 'flowbite/plugin'
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        arya: ['Arya', 'sans-serif'], 
        montserrat: ['Montserrat', 'sans-serif'], 
      },
      colors: {
        primary: {
          dark: "#080808",
          light: "#ffeef0",
          blue: "#2996d8",
          red: "#ff4843",
          bgthin: "#1c1c1c",
          yellow: "#ffc700",
          bluebold: "#225877",
          border: "#636363"
        },
      },
    },
  },
  plugins: [],
};
