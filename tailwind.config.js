/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {
      colors: {
        bgColor: "#0B1118",
        dropdownGrey: "#1a2027",
        dropdownGreyHover: "#34414f",
        bgButton: "#2c2d2e",
        bgButtonHover: "#363738",
        lightBlack: "#0f151c",
        lightGrey: "#edf1f3",
        darkGrey: "#8D8A8A",
        lightOrange: "#FFA500",
        grey: "#ababab",
      },
      backgroundImage: {
        checkmark: "url('/src/Icons/checkmark.svg')",
      },
      aspectRatio: {
        "16/9": [16, 9],
      },
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
