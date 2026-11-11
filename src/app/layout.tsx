import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Axonwall | Sovereign Linux NGFW, OpenZFS NAS, K3s, KVM & Autonomous AI SOC',
  description:
    'Axonwall v0.11.64: Sovereign Linux 6.12 LTS Next-Gen Firewall with multi-core nftables, CO-RE BPF-LSM Ring-0 exploit guard, ZFSBootMenu Root-on-ZFS, 2-Host HA, OpenZFS NAS, K3s, KVM/LXC, Vigilante Autonomous SOC, and Guardrailed MCP AI.',
  keywords: [
    'Axonwall',
    'Linux firewall',
    'nftables',
    'OPNsense alternative',
    'pfSense alternative',
    'open source NGFW',
    'ZFSBootMenu',
    'OpenZFS NAS',
    'WireGuard',
    'Rosenpass post-quantum VPN',
    'BPF-LSM',
    'Coroot eBPF',
    'K3s',
    'KVM hypervisor',
    'MCP security AI',
    'Vigilante SOC',
  ],
  authors: [{ name: 'Axonwall Core Team' }],
  metadataBase: new URL('https://axonwall.com'),
  openGraph: {
    title: 'Axonwall v0.11.64 | Sovereign Linux NGFW, ZFS NAS, K3s, KVM & AI SOC',
    description:
      'Replace legacy BSD firewalls. Line-rate Linux nftables, 60s commit-confirm rollback, ZFSBootMenu & A/B Dual-Root, CO-RE BPF-LSM Ring-0 defense, Post-Quantum Rosenpass VPN, and 5 modular converged roles.',
    url: 'https://axonwall.com',
    siteName: 'Axonwall',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Axonwall v0.11.64 — Sovereign Linux NGFW, OpenZFS NAS, K3s, KVM & Autonomous AI SOC',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Axonwall v0.11.64 | Sovereign Linux NGFW & Converged Security OS',
    description:
      'Wire-speed Linux nftables, CO-RE BPF-LSM Ring-0 defense, ZFSBootMenu Root-on-ZFS, 2-Host HA, KVM/LXC, K3s, and Guardrailed MCP AI.',
    images: ['/og-image.svg'],
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/logo-icon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var tid = localStorage.getItem('axonwall_theme_id') || 'axonwall-emerald';
                document.documentElement.setAttribute('data-theme', tid);
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="antialiased selection:bg-emerald-500 selection:text-black">
        {children}
      </body>
    </html>
  );
}
