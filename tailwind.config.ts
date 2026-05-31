import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
      colors: {
        ink: 'hsl(var(--ink))',
        paper: 'hsl(var(--paper))',
        accent: 'hsl(var(--accent))',
        ember: 'hsl(var(--ember))',
        mist: 'hsl(var(--mist))',
      },
      boxShadow: {
        panel: '0 20px 60px rgba(9, 19, 23, 0.16)',
      },
      backgroundImage: {
        grid: 'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
} satisfies Config;
