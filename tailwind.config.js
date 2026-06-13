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
          dark:    'var(--bg)',
          accent:  '#D96C4A',
          light:   'var(--text)',
          green:   '#2E4D3A',
          grey:    'var(--text-muted)',
          card:    'var(--bg-card)',
          surface: 'var(--bg-surface)',
          footer:  'var(--bg-footer)',
          border:  'var(--border)',
        },
      },
      fontFamily: {
        heading: ['var(--font-jakarta)', 'sans-serif'],
        body:    ['var(--font-inter)', 'sans-serif'],
        mono:    ['var(--font-mono)', 'monospace'],
      },
      typography: () => ({
        brand: {
          css: {
            '--tw-prose-body':          'var(--text)',
            '--tw-prose-headings':      'var(--text)',
            '--tw-prose-lead':          'var(--text-muted)',
            '--tw-prose-links':         '#D96C4A',
            '--tw-prose-bold':          'var(--text)',
            '--tw-prose-counters':      'var(--text-muted)',
            '--tw-prose-bullets':       'var(--text-muted)',
            '--tw-prose-hr':            'var(--border)',
            '--tw-prose-quotes':        'var(--text)',
            '--tw-prose-quote-borders': '#D96C4A',
            '--tw-prose-captions':      'var(--text-muted)',
            '--tw-prose-code':          '#D96C4A',
            '--tw-prose-pre-code':      'var(--text)',
            '--tw-prose-pre-bg':        'var(--bg-card)',
            '--tw-prose-th-borders':    'var(--border)',
            '--tw-prose-td-borders':    'var(--border)',
            'a': { textDecoration: 'none', '&:hover': { textDecoration: 'underline' } },
            'blockquote': { borderLeftColor: '#D96C4A', fontStyle: 'italic' },
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
