import React from 'react';
import Link from 'next/link';
import {
  Shield,
  Cpu,
  Layers,
  Zap,
  ArrowRightLeft,
  Activity,
  FileCode,
  Terminal,
  GitBranch,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Server,
  Download,
  KeyRound,
  Bug,
  Database,
  Lock,
} from 'lucide-react';
import { Logo } from '../../components/Logo';
import { Navbar } from '../../components/Navbar';

export const metadata = {
  title: 'Axonwall Architecture | Technical Overview & System Design',
  description:
    'Detailed architectural overview of Axonwall v0.11.28: Linux 6.12 LTS & nftables line-rate packet filter, Junos commit-confirm rollback, Ghost-in-the-Ring Ring-0 rootkit hunter, Post-Quantum Rosenpass Dual-KEM VPN, 2-Host HA sync, OpenZFS NAS, and K3s + Vigilant Octo Waffle.',
};

export default function StandaloneArchitecturePage() {
  return (
    <div className="min-h-screen bg-[#080c14] text-slate-100 selection:bg-emerald-500 selection:text-black">
      {/* Background glow header */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[650px] radial-glow pointer-events-none -z-10" />

      {/* Navigation */}
      <Navbar />

      {/* Main Architecture Content */}
      <main className="max-w-5xl mx-auto px-6 py-16 space-y-16">
        {/* Hero Section */}
        <div className="text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            System Blueprint &amp; Technical Specification • v0.11.28
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight max-w-4xl mx-auto leading-tight">
            The Linux-Native{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400">
              Hyper-Converged Firewall Engine
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Axonwall redesigns the open-source network &amp; infrastructure stack from the ground up: replacing
            single-threaded FreeBSD pf with lockless Linux multi-core netfilter scaling, Junos commit-confirm safety,
            Post-Quantum Dual-KEM VPNs, Ring-0 eBPF/PMU rootkit defense, and converged OpenZFS + K3s orchestration.
          </p>
        </div>

        {/* System Diagram */}
        <section className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-emerald-400" /> Control Plane &amp; Data Plane Architecture
          </h2>
          <pre className="p-6 rounded-xl bg-black/60 border border-slate-800/80 text-emerald-400 font-mono text-xs overflow-x-auto leading-relaxed">
{`      ┌─────────────────────────────────────────────────────────────────────────┐
      │     Next.js 16 Console (:2966 TLS) • Neovim Super Configurator TUI      │
      │     OpenLDAP Multi-Provider syncrepl • OIDC/SAML SSO • B-14 PKI CA      │
      └────────────────────────────────────┬────────────────────────────────────┘
                                           │ Signed DesiredState (/etc/axonwall/*.yaml)
                                           ▼
      ┌─────────────────────────────────────────────────────────────────────────┐
      │                Privileged Go Daemon (axonwalld)                         │
      │      Zod/Go Schema Validation • 60s Commit-Confirm • mTLS HA Engine     │
      └──────┬─────────────────────────────┼─────────────────────────────┬──────┘
             ▼                             ▼                             ▼
┌─────────────────────────┐  ┌─────────────────────────┐  ┌─────────────────────────┐
│   Linux 6.12 Dataplane  │  │  Ring-0 & Threat Engine │  │  Converged Workloads    │
│ • table inet axonwall   │  │ • Ghost-in-the-Ring LBR │  │ • OpenZFS Pools/SMB/NFS │
│ • Rosenpass PQ-KEM + WG │  │ • BPF_LSM + io_uring    │  │ • K3s + OpenEBS Mayastor│
│ • Keepalived+conntrackd │  │ • rkhunter/ClamAV/YARA  │  │ • Vigilant Octo Waffle  │
│ • FRRouting BGP/OSPF    │  │ • Suricata 7+ & CrowdSec│  │ • KVM/QEMU & LXC Compute│
└─────────────────────────┘  └─────────────────────────┘  └─────────────────────────┘`}
          </pre>
        </section>

        {/* Pillars Grid */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-white text-center">Core Architectural Pillars</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl bg-slate-900/40 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2.5 font-bold text-white text-base">
                <Cpu className="w-5 h-5 text-emerald-400" />
                <span>Multi-Core nftables &amp; N-Port Fabric</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Linux Netfilter evaluates packets across all CPU cores with zero lock contention. Supports arbitrary
                multi-WAN, multi-LAN, and N-port interfaces (VLAN 802.1Q, LACP 802.3ad bonding, bridges) inside a
                dedicated <code className="text-slate-200">table inet axonwall</code>.
              </p>
              <Link
                href="/docs/architecture"
                className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold inline-flex items-center gap-1"
              >
                Read architecture deep dive <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="p-6 rounded-xl bg-slate-900/40 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2.5 font-bold text-white text-base">
                <ArrowRightLeft className="w-5 h-5 text-emerald-400" />
                <span>2-Host Full-Stack High Availability</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Active/passive clustering with Keepalived VRRP, conntrackd FTFW state sync, automatic ECDSA P-256 HA PKI
                mTLS enrollment, Chrony symmetric NTP peering, OpenLDAP <code className="text-slate-200">syncrepl</code>,
                SQLite WAL streaming, and ZFS Send/Recv.
              </p>
              <Link
                href="/docs/high-availability#two-host-setup"
                className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold inline-flex items-center gap-1"
              >
                2-Host Setup Walkthrough <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="p-6 rounded-xl bg-slate-900/40 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2.5 font-bold text-white text-base">
                <Bug className="w-5 h-5 text-emerald-400" />
                <span>Ghost-in-the-Ring &amp; 6-Engine Malware Hunter</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Combines <code className="text-slate-200">rkhunter</code>, <code className="text-slate-200">chkrootkit</code>,{' '}
                <code className="text-slate-200">ClamAV</code>, <code className="text-slate-200">AIDE</code>,{' '}
                <code className="text-slate-200">YARA</code>, and <code className="text-slate-200">Lynis</code> with
                Ring-0 <code className="text-slate-200">BPF_LSM</code> hooks, <code className="text-slate-200">/proc/kcore</code>{' '}
                <code className="text-slate-200">prog_idr</code> walks, and Silicon PMU Last Branch Records (LBR) to
                catch syscall-less <code className="text-slate-200">io_uring</code> and eBPF rootkits.
              </p>
              <Link
                href="/docs/ghost-in-the-ring-rootkits"
                className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold inline-flex items-center gap-1"
              >
                Ring-0 Rootkit Hunter guide <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="p-6 rounded-xl bg-slate-900/40 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2.5 font-bold text-white text-base">
                <KeyRound className="w-5 h-5 text-emerald-400" />
                <span>Post-Quantum Rosenpass Dual-KEM VPN</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Pairs Classic McEliece 460896 (code-based KEM) + Kyber-768 / ML-KEM-768 (lattice-based KEM) with
                in-kernel Linux WireGuard, rotating 256-bit Pre-Shared Keys every 120 seconds against
                Harvest-Now-Decrypt-Later quantum adversaries.
              </p>
              <Link
                href="/docs/post-quantum-rosenpass"
                className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold inline-flex items-center gap-1"
              >
                Post-Quantum VPN architecture <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="p-6 rounded-xl bg-slate-900/40 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2.5 font-bold text-white text-base">
                <Terminal className="w-5 h-5 text-emerald-400" />
                <span>Neovim Super Configurator &amp; ZSH Shell</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Configure all 11 appliance domains via <code className="text-slate-200">axonwall-config</code>—a
                form-driven Neovim Lua TUI with native Vim motions—paired with the NastyMap topology simulator and an
                Oh My Zsh + Starship workstation shell.
              </p>
              <Link
                href="/docs/cli-super-configurator"
                className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold inline-flex items-center gap-1"
              >
                Explore CLI &amp; Neovim TUI <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="p-6 rounded-xl bg-slate-900/40 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2.5 font-bold text-white text-base">
                <Database className="w-5 h-5 text-emerald-400" />
                <span>Modular ZFS NAS, K3s &amp; Vigilant Octo Waffle</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Operate as a pure firewall, a Host-Mode OpenZFS NAS, or a 2-node K3s + OpenEBS cluster running the
                Vigilant Octo Waffle DevSecOps stack (Gitea, Tekton, Vault, Wazuh, Cilium, Tetragon) and Vigilante SOC.
              </p>
              <Link
                href="/docs/vigilant-octo-waffle"
                className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold inline-flex items-center gap-1"
              >
                Vigilant Octo Waffle &amp; K3s docs <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="p-6 rounded-xl bg-slate-900/40 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2.5 font-bold text-white text-base">
                <Shield className="w-5 h-5 text-emerald-400" />
                <span>Junos Commit-Confirm &amp; A/B Dual-Root</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Changes are applied under an autonomous 60-second watchdog timer, and firmware updates flash to an
                inactive root partition (<code className="text-slate-200">axon_root_a</code> /{' '}
                <code className="text-slate-200">axon_root_b</code>) or run in Standard Single-Root rolling Linux mode.
              </p>
              <Link
                href="/docs/architecture#commit-confirm"
                className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold inline-flex items-center gap-1"
              >
                Commit-Confirm details <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="p-6 rounded-xl bg-slate-900/40 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2.5 font-bold text-white text-base">
                <FileCode className="w-5 h-5 text-emerald-400" />
                <span>Migration Studio &amp; Shadowing Analysis</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                One-click migration from pfSense, OPNsense, and Cisco ASA/FTD with automated mathematical rule
                shadowing, dead-rule detection, and selective cherry-pick merge.
              </p>
              <Link
                href="/docs/migration"
                className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold inline-flex items-center gap-1"
              >
                Migration guide <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="p-8 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-sky-950/40 border border-emerald-500/30 text-center space-y-6">
          <h2 className="text-3xl font-extrabold text-white">Ready to deploy Axonwall?</h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto">
            Get started with our step-by-step installation and 2-Host HA setup guides or download the bootable UEFI ISO
            image.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/docs"
              className="px-6 py-2.5 rounded-xl font-semibold text-xs bg-emerald-600 hover:bg-emerald-500 text-white transition shadow-lg shadow-emerald-950/60"
            >
              Explore Full Documentation
            </Link>
            <Link
              href="/docs/high-availability#two-host-setup"
              className="px-6 py-2.5 rounded-xl font-semibold text-xs bg-slate-900 hover:bg-slate-800 text-emerald-300 border border-emerald-500/40 transition"
            >
              2-Host HA Setup Guide
            </Link>
            <Link
              href="/releases"
              className="px-6 py-2.5 rounded-xl font-semibold text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
            >
              Releases &amp; Download ISO (v0.11.32)
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-12 bg-slate-950 text-xs text-slate-500 mt-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Shield className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-white">Axonwall</span>
            <span>— The Modern Linux Router &amp; Next-Gen Firewall.</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-slate-300 transition">Home</Link>
            <Link href="/docs" className="hover:text-slate-300 transition">Docs</Link>
            <Link href="/architecture" className="hover:text-slate-300 transition">Architecture</Link>
            <a href="https://github.com/axonwall/axonwall" className="hover:text-slate-300 transition">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
