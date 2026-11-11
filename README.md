# axonwall.com — Official Public Website & Interactive Console Sandbox (`v0.11.64`)

This directory contains the statically exported Next.js 14 website, interactive browser console sandbox, theme schema registry, and public technical documentation for **[Axonwall](https://axonwall.com)** — the Sovereign Linux Next-Generation Firewall (`core-firewall`), OpenZFS + Garage S3 Vault NAS (`core-nas`), K3s Edge Cloud (`core-k3s`), KVM/LXC Hypervisor (`core-virt`), and Vigilante Autonomous AI SOC (`core-vigilante`).

## Tech Stack

- **Framework**: Next.js 14 (App Router) configured with `output: 'export'`, `trailingSlash: true`, and `images: { unoptimized: true }` (`next.config.mjs`)
- **Styling**: Tailwind CSS + CSS Custom Properties powered by the 22-palette **Universal Theme Engine** (`src/lib/themes.ts`)
- **Icons**: `lucide-react`
- **Hosting**: Static export (`./out`) deployed automatically to GitHub Pages (`axonwall.com`) via `.github/workflows/deploy.yml`

## Local Development

```bash
# Install dependencies from axonwall.com/
pnpm install

# Start the local development server on http://localhost:3001
pnpm dev

# Produce a production static export in ./out
pnpm build
```

## Directory Layout

```text
axonwall.com/
├── public/
│   ├── CNAME                        # Custom domain binding (axonwall.com)
│   ├── logo-icon.svg                # Brand neural shield SVG icon
│   ├── og-image.svg                 # 1200x630 OpenGraph / Twitter social card
│   ├── robots.txt                   # Search engine crawler policy
│   └── schemas/
│       ├── theme.json               # JSON Schema for single AxonwallTheme files
│       └── theme-manifest.json      # JSON Schema for multi-theme ThemeManifest packs
├── src/
│   ├── app/
│   │   ├── page.tsx                 # Landing page, 5 core roles, TCO calculator & downloads
│   │   ├── architecture/page.tsx    # 4-layer architecture, 12 YAML domains, BPF-LSM & MCP leases
│   │   ├── demo/page.tsx            # Client-only interactive Port 2966 Web Console sandbox
│   │   ├── releases/page.tsx        # v0.11.64 SHA-256 checksums, artifacts & release changelog
│   │   └── docs/                    # 24 technical documentation guides + DocsSidebar
│   ├── components/
│   │   ├── Navbar.tsx               # Global navigation with dropdown badges & theme switcher
│   │   ├── HeroSecurityHUD.tsx      # Live telemetry & atomic nftables hero preview
│   │   ├── CostSavingsCalculator.tsx# Interactive 1–5 year firewall TCO comparison
│   │   └── demo/                    # Interactive sandbox views (Firewall, Routing/BGP, VPN, BPF-LSM, Git, CLI)
│   └── lib/
│       └── themes.ts                # 22 built-in themes + JSON import/export & GitHub theme loader
└── next.config.mjs                  # Static HTML export configuration
```

## JSON Schemas

Community themes and theme packs reference canonical JSON Schemas served from `public/schemas/`:

- Single theme (`AxonwallTheme`): `https://axonwall.com/schemas/theme.json`
- Theme pack (`ThemeManifest`): `https://axonwall.com/schemas/theme-manifest.json`

## License

Copyright (C) 2026 Axonwall Contributors. Distributed under the **GNU General Public License v2.0 (GPLv2)** — see [LICENSE](./LICENSE) for full terms.
