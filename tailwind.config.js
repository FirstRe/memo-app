/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/modules/**/**/*.{js,ts,jsx,tsx}',
    './src/modules/**/*.{js,ts,jsx,tsx}',
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
      },
    },
  },
  plugins: [],
}
