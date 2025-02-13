/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/modules/**/**/*.{js,ts,jsx,tsx}',
    './src/modules/**/*.{js,ts,jsx,tsx}',
    './src/layout/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#393937',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      fontFamily: {
        KANIT: ['KANIT'],
        INTER: ['Inter', 'sans-serif'],
      },
      fontSize: {
        '32-20-400': [
          '32px',
          {
            fontFamily: 'KANIT',
            fontWeight: 400,
            lineHeight: '20px',
          },
        ],
        '12-16-400': [
          '12px',
          {
            fontFamily: 'KANIT',
            fontWeight: 400,
            lineHeight: '16px',
          },
        ],
        '14-20-400': [
          '14px',
          {
            fontFamily: 'KANIT',
            fontWeight: 400,
            lineHeight: '20px',
          },
        ],
        '32-20-600': [
          '32px',
          {
            fontFamily: 'INTER',
            fontWeight: 600,
            lineHeight: '20px',
          },
        ],
        '10-20-300': [
          '10px',
          {
            fontFamily: 'INTER',
            fontWeight: 300,
            lineHeight: '20px',
          },
        ],
        '12-20-600': [
          '12px',
          {
            fontFamily: 'INTER',
            fontWeight: 600,
            lineHeight: '20px',
          },
        ],
        '15-20-600': [
          '15px',
          {
            fontFamily: 'INTER',
            fontWeight: 600,
            lineHeight: '20px',
          },
        ],
        '64-20-700': [
          '64px',
          {
            fontFamily: 'INTER',
            fontWeight: 700,
            lineHeight: '20px',
          },
        ],
        '32-20-500': [
          '32px',
          {
            fontFamily: 'INTER',
            fontWeight: 500,
            lineHeight: '20px',
          },
        ],
        '48-20-700': [
          '48px',
          {
            fontFamily: 'INTER',
            fontWeight: 700,
            lineHeight: '20px',
          },
        ],
        '26-20-600': [
          '26px',
          {
            fontFamily: 'INTER',
            fontWeight: 600,
            lineHeight: '20px',
          },
        ],
      },
    },
  },
  plugins: [],
}
