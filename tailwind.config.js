/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "640px",

      md: "768px",

      lg: "1024px",

      xl: "1280px",

      "2xl": "1536px",
    },
    extend: {
      colors: {
        red: {
          light: "#FDF4F3",
          primary: "#EC706D",
        },
        black: "black",
        bgCremo: "#FAF7F2",
        navElement: "#004A54",
        circleGreen: "#64E4B3",
        chatBg: "#E3FFF4",
        textgray: "#81979A",
        alertPink: "#F29B99",
        sunBg: "#A0FDD9",
        notesbg: "#FFE092",
        noteBorder: "#EA9465",
        inputBg: "#F0F2F3",
        aqua: "#A1FEDA",
        textUserBG: "#F0F2F3",
        textSenderBG: "#E3FFF4",
        tertiaryBlue: "#90DDE0",
        lightGraybg: "#C5C5D1",
        seaGreen: "#33D797",
      },
    },
  },
  plugins: [],
};
