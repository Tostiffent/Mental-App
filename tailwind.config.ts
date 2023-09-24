import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
     colors: {
      "foreground-primary": "var(--foreground-primary)",
      "foreground-secondary": "var(--foreground-secondary)",
      "foreground-tertiary": "var(--foreground-tertiary)",
      "background-primary": "var(--background-primary)",
      "background-secondary": "var(--background-secondary)"
     } 
    },
  },
  plugins: [],
}
export default config
