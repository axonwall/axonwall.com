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
} from 'lucide-react';
import { Logo } from '../../components/Logo';

import { Navbar } from '../../components/Navbar';

export const metadata = {
  title: 'Axonwall Architecture | Technical Overview & System Design',
  description:
    'Detailed architectural overview of Axonwall: Linux 6.12 LTS & nftables line-rate packet filter, Junos commit-confirm rollback, A/B dual-root OS updates, conntrackd HA, and eBPF observability.',
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
            System Blueprint & Technical Specification
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight max-w-4xl mx-auto leading-tight">
            The Linux-Native <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400">Firewall Engine</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Axonwall redesigns the open-source firewall stack from the ground up: replacing single-threaded FreeBSD pf with lockless Linux multi-core netfilter scaling, Junos commit-confirm safety, and cloud-native observability.
          </p>
        </div>

        {/* System Diagram */}
        <section className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-emerald-400" /> Control Plane & Data Plane Architecture
          </h2>
          <pre className="p-6 rounded-xl bg-black/60 border border-slate-800/80 text-emerald-400 font-mono text-xs overflow-x-auto leading-relaxed">
{`                            ┌──────────────────────────────────────────────┐
                            │      Axonwall Modern React/Next.js Console   │
                            │   (OpenLDAP Auth + Supabase Configuration)   │
                            └──────────────────────┬───────────────────────┘
                                                   │ Intent-Driven State (JSON)
                                                   ▼
                            ┌──────────────────────────────────────────────┐
                            │        Privileged Go Control Plane           │
                            │      (Validation, Linting, & Commit-Confirm) │
                            └──────────────────────┬───────────────────────┘
                                                   │
                 ┌─────────────────────────────────┼─────────────────────────────────┐
                 ▼                                 ▼                                 ▼
    ┌───────────────────────────┐    ┌───────────────────────────┐    ┌───────────────────────────┐
    │     Linux nftables        │    │    Embedded Observability │    │   Distributed Satellites  │
    │ Atomic \`table inet axonwall\`│   │   VictoriaMetrics & Logs  │    │  OpenWrt & Linux SD-Branch│
    │ WireGuard, Kea, FRR, IDS  │    │   Insight Flow Analytics  │    │  WireGuard Mesh & Edge FW │
    └───────────────────────────┘    └───────────────────────────┘    └───────────────────────────┘`}
          </pre>
        </section>

        {/* Pillars Grid */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-white text-center">Core Architectural Pillars</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl bg-slate-900/40 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2.5 font-bold text-white text-base">
                <Cpu className="w-5 h-5 text-emerald-400" />
                <span>Multi-Core nftables Scaling</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Linux Netfilter evaluates packets across all CPU cores with zero lock contention. Axonwall operates inside a dedicated <code className="text-slate-200">table inet axonwall</code>, coexisting seamlessly with Docker and Kubernetes CNI.
              </p>
              <Link href="/docs/architecture" className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold inline-flex items-center gap-1">
                Read architecture deep dive <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="p-6 rounded-xl bg-slate-900/40 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2.5 font-bold text-white text-base">
                <Shield className="w-5 h-5 text-emerald-400" />
                <span>Junos Commit-Confirm & Rollback</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Eliminate administrative lockouts. Changes are applied under an autonomous 60-second watchdog timer. If connectivity is lost, Axonwall atomically reverts to the last-known-good ruleset bundle.
              </p>
              <Link href="/docs/architecture#commit-confirm" className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold inline-flex items-center gap-1">
                Commit-Confirm details <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="p-6 rounded-xl bg-slate-900/40 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2.5 font-bold text-white text-base">
                <ArrowRightLeft className="w-5 h-5 text-emerald-400" />
                <span>conntrackd Stateful HA Clustering</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Active/passive clustering with Keepalived VRRP and reliable conntrackd FTFW replication. Replicates TCP states and WireGuard tunnels with zero connection resets during node failover.
              </p>
              <Link href="/docs/high-availability" className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold inline-flex items-center gap-1">
                Explore High Availability <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="p-6 rounded-xl bg-slate-900/40 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2.5 font-bold text-white text-base">
                <FileCode className="w-5 h-5 text-emerald-400" />
                <span>Migration Studio & Shadowing Analysis</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                One-click migration from pfSense, OPNsense, and Cisco ASA/FTD with automated mathematical rule shadowing, dead-rule detection, and selective cherry-pick merge.
              </p>
              <Link href="/docs/migration" className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold inline-flex items-center gap-1">
                Migration guide <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="p-6 rounded-xl bg-slate-900/40 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2.5 font-bold text-white text-base">
                <Activity className="w-5 h-5 text-emerald-400" />
                <span>eBPF & NFLOG Live Packet Tracing</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Real-time kernel packet streams over Server-Sent Events (SSE). Deep protocol dissectors parse Ethernet, IP, TCP flags, and UDP in memory without slow offline PCAP capture files.
              </p>
              <Link href="/docs/observability" className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold inline-flex items-center gap-1">
                Observability docs <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="p-6 rounded-xl bg-slate-900/40 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2.5 font-bold text-white text-base">
                <GitBranch className="w-5 h-5 text-emerald-400" />
                <span>GitOps Configuration Versioning</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Immutable Git commit history for all configuration updates. Inspect unified diff previews and roll back historical revisions with a single click.
              </p>
              <Link href="/docs/gitops-audit" className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold inline-flex items-center gap-1">
                GitOps audit trail <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="p-8 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-sky-950/40 border border-emerald-500/30 text-center space-y-6">
          <h2 className="text-3xl font-extrabold text-white">Ready to deploy Axonwall?</h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto">
            Get started with our step-by-step installation guides or download the bootable UEFI ISO image.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/docs"
              className="px-6 py-2.5 rounded-xl font-semibold text-xs bg-emerald-600 hover:bg-emerald-500 text-white transition shadow-lg shadow-emerald-950/60"
            >
              Explore Full Documentation
            </Link>
            <a
              href="https://github.com/axonwall/axonwall_monorepo/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 rounded-xl font-semibold text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
            >
              Download ISO (v0.1.7)
            </a>
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
            <span>— The Modern Linux Router & Next-Gen Firewall.</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-slate-300 transition">Home</Link>
            <Link href="/docs" className="hover:text-slate-300 transition">Docs</Link>
            <Link href="/architecture" className="hover:text-slate-300 transition">Architecture</Link>
            <a href="https://github.com/axonwall/axonwall_monorepo" className="hover:text-slate-300 transition">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
