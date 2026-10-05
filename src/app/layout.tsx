import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Axonwall | Next-Generation Open Source Linux Router & Firewall',
  description:
    'Modernize your edge security. Wire-speed Linux nftables packet filtering, Junos-style commit-confirm with automatic rollback, reactive Next.js 16 UI, and cloud-native Kubernetes deployment.',
  keywords: [
    'firewall',
    'router',
    'nftables',
    'OPNsense alternative',
    'pfSense alternative',
    'Linux firewall',
    'open source firewall',
    'WireGuard',
    'Suricata',
    'HAProxy',
    'SD-WAN',
  ],
  authors: [{ name: 'Axonwall Core Team' }],
  metadataBase: new URL('https://axonwall.com'),
  openGraph: {
    title: 'Axonwall | Next-Generation Open Source Linux Router & Firewall',
    description:
      'The modern replacement for legacy BSD firewalls. Linux nftables, zero-lockout commit-confirm, Next.js UI, and line-rate multi-core performance.',
    url: 'https://axonwall.com',
    siteName: 'Axonwall',
    images: [
      {
        url: 'https://axonwall.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Axonwall Open Source Firewall',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Axonwall | Next-Gen Linux Router & Firewall',
    description: 'Wire-speed Linux nftables, commit-confirm rollback, and reactive Next.js console.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased selection:bg-emerald-500 selection:text-black">
        {children}
      </body>
    </html>
  );
}
