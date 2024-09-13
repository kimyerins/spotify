/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    'node_modules/flowbite/**/*.{js,jsx,ts,tsx}', // Flowbite의 경로
  ],
  theme: {
    extend: {
      boxShadow: {
        custom: "0px 8px 24px 0px rgba(0, 0, 0, 0.5)", // 사용자 정의 box-shadow
      },
    },
  },
  plugins: [
    require('flowbite/plugin'), // Flowbite 플러그인
    require('@tailwindcss/line-clamp'),
  ],
};
