/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
<<<<<<< HEAD
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite/**/*.{js,jsx,ts,tsx}", // Flowbite의 경로
  ],
  theme: {},
  plugins: [
    require("flowbite/plugin"), // Flowbite 플러그인
    require("@tailwindcss/line-clamp"),
=======
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    'node_modules/flowbite/**/*.{js,jsx,ts,tsx}', // Flowbite의 경로
  ],
  theme: {
  },
  plugins: [
    require('flowbite/plugin'), // Flowbite 플러그인
    require('@tailwindcss/line-clamp'),
>>>>>>> 441d37707245f84b2c0f522698fa79c66dbbce78
  ],
};
