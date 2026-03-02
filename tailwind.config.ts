import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: '#F7F8FA',
        ink: '#0F172A'
      }
    }
  },
  plugins: []
};

export default config;
