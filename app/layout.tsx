import '@fontsource/titan-one/400.css';
import '@fontsource-variable/kumbh-sans/wght.css';
import '@fontsource/gaegu/400.css';
import '@fontsource/gaegu/700.css';
import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { ThemeProvider } from 'jamstacks';
import { ThemeScript } from 'jamstacks/server';
import { SiteHeader } from '../components/site-header';
import { SiteFooter } from '../components/site-footer';
import { TrailReveal } from '../components/trail-reveal';
import { business } from '../content/business';
import { asset } from '../lib/paths';
import { site } from '../lib/site';
import './tailwind.input.css';

const description = site.description || business.introduction;
const ogImage = site.url ? `${site.url}/og.png` : asset('/og.png');

export const metadata: Metadata = {
  title: { default: `${business.name}: dog walks and pet sitting in Madison`, template: `%s | ${business.name}` },
  description,
  ...(site.url ? { metadataBase: new URL(`${site.url}/`) } : {}),
  openGraph: {
    type: 'website', siteName: business.name, title: business.name, description,
    images: [{ url: ogImage, width: 1200, height: 630, alt: `${business.name}: dog walks and pet sitting on Madison’s east side` }],
  },
  twitter: { card: 'summary_large_image', title: business.name, description, images: [ogImage] },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FBF6E2' },
    { media: '(prefers-color-scheme: dark)', color: '#22301F' },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="en" suppressHydrationWarning>
    <head><meta name="color-scheme" content="light dark" /><ThemeScript /></head>
    <body><ThemeProvider>
      <a className="skip-link" href="#main">Skip to content</a>
      <SiteHeader /><main id="main" tabIndex={-1}>{children}</main><SiteFooter />
      <TrailReveal />
    </ThemeProvider></body>
  </html>;
}
