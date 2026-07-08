import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import '@/styles/globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://blog.leadarx.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'LeadarX Blog: Data Analysis, UI/UX Design and Digital Marketing Insights for Nigerians',
    template: '%s | LeadarX Blog',
  },
  description:
    "Nigeria's tech career and news hub. Practical guides, industry updates, and resources covering Data Analysis, UI/UX Design, Digital Marketing, and other tech-related career paths.",
  keywords: [
    'data analysis Nigeria',
    'tech skills Nigeria',
    'LeadarX blog',
    'data analyst career Nigeria',
    'UI/UX design Nigeria',
    'digital marketing Nigeria',
    'tech academy Nigeria',
    'learn data analysis',
    'Power BI Nigeria',
    'Excel Nigeria',
  ],
  authors: [{ name: 'LeadarX Academy' }],
  creator: 'LeadarX Academy',
  publisher: 'LeadarX Academy',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  openGraph: {
    type: 'website',
    locale: 'en_NG',
    url: SITE_URL,
    siteName: 'LeadarX Blog',
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: 'LeadarX Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@leadarxhq',
    creator: '@leadarxhq',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable} ${mono.variable}`} data-theme="dark" suppressHydrationWarning>
      <head>
        {/* Anti-flash: read theme from localStorage before React hydrates */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('theme')||'dark';document.documentElement.setAttribute('data-theme',t);})();`,
          }}
        />
      </head>
      <body className="bg-brand-dark text-brand-light antialiased">
        <ThemeProvider>
          <Navbar />
          <main className="pt-16">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
