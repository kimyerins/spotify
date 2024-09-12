const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      boxShadow: {
        custom: "0px 8px 24px 0px rgba(0, 0, 0, 0.5)", // 사용자 정의 box-shadow
      },
    },
  },
  plugins: [flowbite.plugin()],
};
