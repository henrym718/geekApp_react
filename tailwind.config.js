/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FFFFFF",
        hero: "#202020",
        header: "#161616",
        color1: "#404145",
        color2: "#62646A",
        color3: "#222325",
        color4: "#74767E",
        color5: "#FFFFFF",
        color6: "#0ae98a",
      },
      container: {
        center: true,
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
