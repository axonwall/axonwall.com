'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  ChevronDown,
  Layers,
  Zap,
  Cpu,
  EyeOff,
  TrendingDown,
  FileText,
  ShieldAlert,
  ArrowRightLeft,
  Palette,
  Activity,
  Terminal,
  Sparkles,
  Server,
  Download,
  ExternalLink,
  Menu,
  X,
  Shield,
  KeyRound,
  Bug,
  Database,
  GitBranch,
} from 'lucide-react';
import { Logo } from './Logo';
import { ThemeSwitcher } from './ThemeSwitcher';

interface DropdownItem {
  title: string;
  desc: string;
  href: string;
  icon: any;
  badge?: string;
  external?: boolean;
}

const PRODUCT_ITEMS: DropdownItem[] = [
  {
    title: 'Why Linux & nftables',
    desc: 'Replacing legacy BSD packet filters with Linux 6.12 LTS multi-core scaling',
    href: '/#why-axonwall',
    icon: Layers,
  },
  {
    title: 'Enterprise & Ring-0 Features',
    desc: '12-subsystem stack: nftables, Rosenpass PQ-KEM, Ghost-in-the-Ring, ZFS, K3s & VOW',
    href: '/#features',
    icon: Zap,
  },
  {
    title: 'Ghost-in-the-Ring & rkhunter',
    desc: '6-engine malware suite + BPF_LSM & Silicon PMU LBR rootkit detection',
    href: '/docs/ghost-in-the-ring-rootkits',
    icon: Bug,
    badge: 'Ring-0',
  },
  {
    title: 'Post-Quantum Rosenpass VPN',
    desc: 'Classic McEliece 460896 + Kyber-768 hybrid WireGuard PSK rotation',
    href: '/docs/post-quantum-rosenpass',
    icon: KeyRound,
    badge: 'PQ-KEM',
  },
  {
    title: 'Modular ZFS NAS, K3s & VOW',
    desc: 'Converged OpenZFS NAS, 2-node K3s + OpenEBS, and Vigilant Octo Waffle SOC',
    href: '/docs/modular-architecture',
    icon: Database,
  },
  {
    title: 'Kernel & System Architecture',
    desc: 'In-kernel flowtable fastpath, Commit-Confirm rollback, and B-14 PKI CA',
    href: '/architecture',
    icon: Cpu,
  },
  {
    title: 'Individual Defense & Savings',
    desc: 'Personal perimeter sovereignty and TCO calculator vs. proprietary firewalls',
    href: '/#personal-sovereignty',
    icon: EyeOff,
  },
];

const DOCS_ITEMS: DropdownItem[] = [
  {
    title: 'Documentation Hub (v0.11.28)',
    desc: 'Complete operating system guide, installation modes, and quickstart',
    href: '/docs',
    icon: FileText,
  },
  {
    title: '2-Host High Availability Guide',
    desc: 'Step-by-step 2-host setup: VRRP, conntrackd, mTLS PKI, NTP, LDAP & ZFS sync',
    href: '/docs/high-availability#two-host-setup',
    icon: ArrowRightLeft,
    badge: 'Guide',
  },
  {
    title: 'Ghost-in-the-Ring & Malware Hunter',
    desc: 'rkhunter, ClamAV, AIDE, YARA, Lynis, io_uring & eBPF rootkit telemetry',
    href: '/docs/ghost-in-the-ring-rootkits',
    icon: Bug,
    badge: 'New',
  },
  {
    title: 'Post-Quantum Rosenpass VPN',
    desc: 'Dual-KEM Classic McEliece + Kyber-768 WireGuard tunnel configuration',
    href: '/docs/post-quantum-rosenpass',
    icon: KeyRound,
  },
  {
    title: 'Neovim Super Configurator & ZSH',
    desc: 'Form-driven Lua TUI (axonwall-config) with native Vim motions & NastyMap',
    href: '/docs/cli-super-configurator',
    icon: Terminal,
    badge: 'TUI',
  },
  {
    title: 'Vigilant Octo Waffle & K3s',
    desc: 'Turnkey K3s GitOps stack (Gitea, Tekton, Vault, Wazuh) & Vigilante SOC',
    href: '/docs/vigilant-octo-waffle',
    icon: GitBranch,
  },
  {
    title: 'ZFS NAS, RAID & Threat Defense',
    desc: 'OpenZFS pools, multi-disk RAID install, Unbound RPZ sinkhole & Suricata 7+',
    href: '/docs/zfs-nas-storage',
    icon: ShieldAlert,
  },
  {
    title: 'REST API & Theme Engine',
    desc: 'Declarative DesiredState schema, Unix socket IPC, and 20 console themes',
    href: '/docs/api-reference',
    icon: Palette,
  },
];

const EXPLORE_ITEMS: DropdownItem[] = [
  {
    title: 'Live Web Console Demo',
    desc: 'Full-featured interactive appliance sandbox running in your browser',
    href: '/demo/',
    icon: Sparkles,
    badge: 'Sandbox',
  },
  {
    title: 'Hardware Appliances',
    desc: 'Turnkey 1U/2U rackmount and mini-desktop appliances with port 2966',
    href: '/#appliances',
    icon: Server,
  },
  {
    title: 'Download ISO',
    desc: 'Free community installation media for x86_64 servers and mini-PCs',
    href: 'https://github.com/axonwall/axonwall/releases',
    icon: Download,
    external: true,
  },
  {
    title: 'GitHub Repository',
    desc: 'Open-source source code, issues, PRs, and community roadmap',
    href: 'https://github.com/axonwall/axonwall',
    icon: ExternalLink,
    external: true,
  },
];

export function Navbar() {
  const [openMenu, setOpenMenu] = useState<'product' | 'docs' | 'explore' | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click or Escape key
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpenMenu(null);
        setMobileMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const toggleDropdown = (menu: 'product' | 'docs' | 'explore') => {
    setOpenMenu((prev) => (prev === menu ? null : menu));
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[#080c14]/85 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between" ref={navRef}>
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <Logo variant="badge" size="sm" showSubtext={false} />
          <div className="flex items-baseline gap-1.5">
            <span className="font-bold text-lg text-white tracking-tight group-hover:text-emerald-400 transition-colors">
              Axonwall
            </span>
            <span className="text-[10px] text-emerald-400 font-mono uppercase px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 font-semibold">
              Linux + nftables
            </span>
          </div>
        </Link>

        {/* Center: Simplified Dropdown Menus */}
        <nav className="hidden md:flex items-center gap-1 sm:gap-2">
          {/* Dropdown 1: Product */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('product')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                openMenu === 'product'
                  ? 'text-emerald-400 bg-slate-800/60'
                  : 'text-slate-300 hover:text-white hover:bg-slate-850/60'
              }`}
            >
              <span>Product</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  openMenu === 'product' ? 'rotate-180 text-emerald-400' : 'text-slate-500'
                }`}
              />
            </button>

            {openMenu === 'product' && (
              <div className="absolute left-0 mt-2 w-80 p-2 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl space-y-1 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                {PRODUCT_ITEMS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.title}
                      href={item.href}
                      onClick={() => setOpenMenu(null)}
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-800/70 transition-colors group"
                    >
                      <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-colors mt-0.5">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-white group-hover:text-emerald-300 transition-colors">
                          {item.title}
                        </div>
                        <div className="text-[11px] text-slate-400 leading-snug mt-0.5">
                          {item.desc}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Dropdown 2: Documentation */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('docs')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                openMenu === 'docs'
                  ? 'text-emerald-400 bg-slate-800/60'
                  : 'text-slate-300 hover:text-white hover:bg-slate-850/60'
              }`}
            >
              <span>Documentation</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  openMenu === 'docs' ? 'rotate-180 text-emerald-400' : 'text-slate-500'
                }`}
              />
            </button>

            {openMenu === 'docs' && (
              <div className="absolute left-0 mt-2 w-80 p-2 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl space-y-1 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                {DOCS_ITEMS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.title}
                      href={item.href}
                      onClick={() => setOpenMenu(null)}
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-800/70 transition-colors group"
                    >
                      <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors mt-0.5">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-white group-hover:text-cyan-300 transition-colors">
                          {item.title}
                        </div>
                        <div className="text-[11px] text-slate-400 leading-snug mt-0.5">
                          {item.desc}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Dropdown 3: Explore & Demo */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('explore')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                openMenu === 'explore'
                  ? 'text-emerald-400 bg-slate-800/60'
                  : 'text-slate-300 hover:text-white hover:bg-slate-850/60'
              }`}
            >
              <span>Explore</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  openMenu === 'explore' ? 'rotate-180 text-emerald-400' : 'text-slate-500'
                }`}
              />
            </button>

            {openMenu === 'explore' && (
              <div className="absolute left-0 mt-2 w-80 p-2 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl space-y-1 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                {EXPLORE_ITEMS.map((item) => {
                  const Icon = item.icon;
                  const isExternal = item.external;
                  const Comp = isExternal ? 'a' : Link;
                  const extraProps = isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {};
                  return (
                    <Comp
                      key={item.title}
                      href={item.href}
                      onClick={() => setOpenMenu(null)}
                      {...(extraProps as any)}
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-800/70 transition-colors group"
                    >
                      <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 group-hover:bg-indigo-500 group-hover:text-slate-950 transition-colors mt-0.5">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-semibold text-white group-hover:text-indigo-300 transition-colors">
                            {item.title}
                          </span>
                          {item.badge && (
                            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-400 leading-snug mt-0.5">
                          {item.desc}
                        </div>
                      </div>
                    </Comp>
                  );
                })}
              </div>
            )}
          </div>
        </nav>

        {/* Right Actions: Theme Switcher & Order Button at the end */}
        <div className="flex items-center gap-3">
          <ThemeSwitcher />

          {/* Order Button at the end */}
          <Link
            href="/#appliances"
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition shadow-lg shadow-emerald-950/60 flex items-center gap-1.5"
          >
            <Server className="w-3.5 h-3.5" />
            <span>Order</span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-950/95 backdrop-blur-xl px-4 py-4 space-y-4 animate-in fade-in duration-150">
          <div className="space-y-1">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block px-2">
              Product
            </span>
            {PRODUCT_ITEMS.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-1.5 rounded-lg text-xs font-medium text-slate-200 hover:bg-slate-800"
              >
                {item.title}
              </Link>
            ))}
          </div>

          <div className="space-y-1 border-t border-slate-800/60 pt-3">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block px-2">
              Documentation
            </span>
            {DOCS_ITEMS.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-1.5 rounded-lg text-xs font-medium text-slate-200 hover:bg-slate-800"
              >
                {item.title}
              </Link>
            ))}
          </div>

          <div className="space-y-1 border-t border-slate-800/60 pt-3">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block px-2">
              Explore & Demo
            </span>
            {EXPLORE_ITEMS.map((item) => {
              const Comp = item.external ? 'a' : Link;
              const extra = item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {};
              return (
                <Comp
                  key={item.title}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  {...(extra as any)}
                  className="block px-3 py-1.5 rounded-lg text-xs font-medium text-slate-200 hover:bg-slate-800"
                >
                  {item.title}
                </Comp>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-800">
            <Link
              href="/#appliances"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/60"
            >
              <Server className="w-4 h-4" />
              <span>Order Appliance</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
