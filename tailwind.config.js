/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        hoverColors: "#FFC000",
        brightColor: "#dd8036",
        backgroundColor: "#36ae9a"
      },
      extend: {
        fontFamily: {
          roboto: ['Roboto', 'sans-serif'],
        },
    },
  },
  plugins: [],
},}