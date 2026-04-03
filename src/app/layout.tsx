import type { Metadata, Viewport } from 'next';
import './globals.css';
import CursorBubble from '@/components/CursorBubble/CursorBubble';
import ThreeBackground from '@/components/ThreeBackground/ThreeBackground';
import PageWrapper from '@/components/PageWrapper';
import { SchemaMarkup } from '@/components/SEO';

export const viewport: Viewport = {
  themeColor: 'var(--black)',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

// Default URL to use as a base
const DEFAULT_URL = 'https://your-domain.com';

export const metadata: Metadata = {
  title: 'Fun Website',
  description: 'A blank website for Fun',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_URL),
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    title: 'Fun Website',
    description: 'A blank website for fun purposes.',
    siteName: 'Fun Website',
    images: [{
      url: '/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'Blank Website',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fun Website',
    description: 'A blank website for fun purposes.',
    images: ['/og-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_URL;
  
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <SchemaMarkup
          title="Fun Website"
          description="A blank website for fun purposes."
          siteUrl={siteUrl}
          type="WebSite"
        />
      </head>
      <body id="HomeScreenBody" className="Home-Screen-Body">
        <ThreeBackground />
        <main id="HomeScreenMain" className="Home-Screen-Main">
          <PageWrapper>
            {children}
          </PageWrapper>
        </main>
        <CursorBubble />
      </body>
    </html>
  );
} 