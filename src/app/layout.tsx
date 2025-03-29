import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  themeColor: 'var(--black)',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: 'Fun Website',
  description: 'A blank website for Fun',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com'),
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
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body id="HomeScreenBody" className="Home-Screen-Body">
        <main id="HomeScreenMain" className="Home-Screen-Main">
          {children}
        </main>
      </body>
    </html>
  );
} 