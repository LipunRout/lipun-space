import type { Metadata, Viewport } from 'next';
import '@fontsource-variable/space-grotesk';
import '@fontsource-variable/inter';
import '@fontsource/instrument-serif/400.css';
import '@fontsource/instrument-serif/400-italic.css';
import '@fontsource/ibm-plex-mono/400.css';
import '@fontsource/ibm-plex-mono/500.css';
import './globals.css';
import { site } from '@/lib/site';
import MotionProvider from '@/components/MotionProvider';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: '%s | Lipun Rout' },
  description: site.description,
  authors: [{ name: site.name }],
  keywords: ['Lipun Rout', 'Software Developer', 'Full-Stack Developer', 'AI web applications', 'React', 'Next.js', 'Freelance developer'],
  openGraph: {
    type: 'website',
    url: '/',
    siteName: site.name,
    title: site.title,
    description: site.description,
    images: [{ url: '/lipun.jpg', width: 1100, height: 1366, alt: 'Lipun Rout' }],
  },
  twitter: { card: 'summary_large_image', title: site.title, description: site.description, images: ['/lipun.jpg'] },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: '#030406', colorScheme: 'dark' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-motion="on" suppressHydrationWarning>
      <body>
        <MotionProvider>
          <a href="#about" className="skip-link">Skip to content</a>
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}