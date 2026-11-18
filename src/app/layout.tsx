import type { Metadata, Viewport } from 'next';
import {
  Cormorant_Garamond,
  JetBrains_Mono,
  Plus_Jakarta_Sans,
} from 'next/font/google';
import type { ReactNode } from 'react';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { SITE_CONFIG } from '@/config/site';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-serif',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
});

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0D0D10',
};

export const metadata: Metadata = {
  title: {
    default: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="nb"
      className={`${cormorant.variable} ${jakarta.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <a href="#hovedinnhold" className="skip-link">
          Hopp til hovedinnhold
        </a>
        <SiteHeader />
        <main id="hovedinnhold">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
