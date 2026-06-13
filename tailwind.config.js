/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark:    '#1C1C1C',
          accent:  '#D96C4A',
          light:   '#EAEAE4',
          green:   '#2E4D3A',
          grey:    '#9A9A94',
          card:    '#242424',
          border:  '#2E2E2E',
        },
      },
      fontFamily: {
        heading: ['var(--font-jakarta)', 'sans-serif'],
        body:    ['var(--font-inter)', 'sans-serif'],
        mono:    ['var(--font-mono)', 'monospace'],
      },
      typography: ({ theme }) => ({
        brand: {
          css: {
            '--tw-prose-body':         theme('colors.brand.light'),
            '--tw-prose-headings':     theme('colors.brand.light'),
            '--tw-prose-lead':         theme('colors.brand.grey'),
            '--tw-prose-links':        theme('colors.brand.accent'),
            '--tw-prose-bold':         theme('colors.brand.light'),
            '--tw-prose-counters':     theme('colors.brand.grey'),
            '--tw-prose-bullets':      theme('colors.brand.grey'),
            '--tw-prose-hr':           theme('colors.brand.border'),
            '--tw-prose-quotes':       theme('colors.brand.light'),
            '--tw-prose-quote-borders':theme('colors.brand.accent'),
            '--tw-prose-captions':     theme('colors.brand.grey'),
            '--tw-prose-code':         theme('colors.brand.accent'),
            '--tw-prose-pre-code':     theme('colors.brand.light'),
            '--tw-prose-pre-bg':       theme('colors.brand.card'),
            '--tw-prose-th-borders':   theme('colors.brand.border'),
            '--tw-prose-td-borders':   theme('colors.brand.border'),
            'a': { textDecoration: 'none', '&:hover': { textDecoration: 'underline' } },
            'blockquote': { borderLeftColor: theme('colors.brand.accent'), fontStyle: 'italic' },
            'code::before': { content: '""' },
            'code::after':  { content: '""' },
            'code': { backgroundColor: 'rgba(217,108,74,0.15)', borderRadius: '4px', padding: '2px 6px' },
            'img': { borderRadius: '8px' },
            'h2': { scrollMarginTop: '80px' },
            'h3': { scrollMarginTop: '80px' },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
