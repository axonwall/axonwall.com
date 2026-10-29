'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Shield,
  Zap,
  ArrowRight,
  Server,
  Layers,
  Cpu,
  CheckCircle2,
  Lock,
  RefreshCw,
  Terminal,
  Activity,
  Globe,
  Radio,
  Boxes,
  KeyRound,
  Download,
  ExternalLink,
  ChevronRight,
  HelpCircle,
  EyeOff,
  TrendingDown,
  Sparkles,
  Bug,
  Database,
  GitBranch,
  ArrowRightLeft,
  BookOpen,
} from 'lucide-react';
import { Logo } from '../components/Logo';
import { HeroSecurityHUD } from '../components/HeroSecurityHUD';
import { PersonalPerimeterVisual } from '../components/PersonalPerimeterVisual';
import { CostSavingsCalculator } from '../components/CostSavingsCalculator';
import { ThemeSwitcher } from '../components/ThemeSwitcher';
import { Navbar } from '../components/Navbar';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'firewall' | 'vpn' | 'ha' | 'observability'>('firewall');

  return (
    <div className="min-h-screen bg-[#080c14] text-slate-100 selection:bg-emerald-500 selection:text-black">
      {/* Background glow header */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[650px] radial-glow pointer-events-none -z-10" />

      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-20 pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-semibold animate-pulse">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            Axonwall v0.11.32 • Linux 6.12 LTS, Zero-Surface Edge UKI, ZFSBootMenu &amp; Sovereign AI
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight max-w-4xl mx-auto leading-[1.1]">
            The Next-Generation Open Source Firewall{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400">
              Built on Linux
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Replace legacy BSD packet filters and accidental admin lockouts. Axonwall unites line-rate multi-core{' '}
            <code className="text-slate-200 font-mono">nftables</code>, a stateless 7 MB{' '}
            <strong className="text-slate-200">Single-File UEFI Edge UKI</strong> (pure-Go PID 1), native{' '}
            <strong className="text-slate-200">ZFSBootMenu Root-on-ZFS</strong>, 2-Host Full-Stack High Availability,
            Post-Quantum Rosenpass Dual-KEM VPNs, Ring-0 <code className="text-slate-200 font-mono">io_uring</code>/<code className="text-slate-200 font-mono">eBPF</code>{' '}
            rootkit hunting, and the <strong className="text-slate-200">Eluvix Sovereign AI Router</strong> in one platform.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="/demo/"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-sm font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl shadow-emerald-950/80 transition flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-emerald-300" /> Launch Interactive Web Console (Sandbox)
            </Link>
            <Link
              href="/releases"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-sm font-semibold bg-slate-900/90 hover:bg-slate-800 text-emerald-300 border border-emerald-500/40 transition flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4 text-emerald-400" /> Releases &amp; Download ISO (v0.11.32)
            </Link>
            <Link
              href="/docs"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-sm font-semibold bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-800 transition flex items-center justify-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-sky-400" /> Explore Documentation &amp; Guides
            </Link>
          </div>

          {/* Trust stats */}
          <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto border-t border-slate-800/80 text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-white font-mono">100 Gbps</div>
              <div className="text-xs text-slate-400 mt-1">Wire-Speed nftables</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-emerald-400 font-mono">60s</div>
              <div className="text-xs text-slate-400 mt-1">Commit-Confirm Rollback</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-white font-mono">Dual-KEM</div>
              <div className="text-xs text-slate-400 mt-1">McEliece + Kyber PQ-VPN</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-sky-400 font-mono">Ring-0</div>
              <div className="text-xs text-slate-400 mt-1">BPF_LSM &amp; PMU Rootkit Hunter</div>
            </div>
          </div>

          {/* Dynamic Real-Time Security HUD Showcase */}
          <HeroSecurityHUD />
        </div>
      </section>

      {/* The Architectural Paradigm Shift (Why Axonwall) */}
      <section id="why-axonwall" className="py-24 border-t border-slate-800/80 bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">The Linux Advantage</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Why We Left FreeBSD Behind
            </h2>
            <p className="text-sm sm:text-base text-slate-400">
              For 20 years, open-source firewalls relied on FreeBSD. But today, the modern internet runs on Linux. Here is why Axonwall is the definitive architectural upgrade.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">nftables Line-Rate</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                FreeBSD <code className="text-slate-300">pf</code> locks on single cores under heavy NAT loads. Linux <code className="text-slate-300">nftables</code> scales across all CPU cores with lockless flow tables and multi-queue RSS.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <RefreshCw className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Commit-Confirm Rollback</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                No more fear of applying rules remotely. If a mistake cuts your connection, the Go daemon automatically reverts to the last-known-good atomic bundle within 60 seconds.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                <KeyRound className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Post-Quantum &amp; Kernel DCO</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                WireGuard runs natively in the Linux kernel paired with Rosenpass Dual-KEM (Classic McEliece + Kyber-768) post-quantum PSK rotation and OpenVPN 2.6 kernel Data Channel Offload (<code className="text-slate-300">ovpn-dco</code>).
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <Boxes className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Modular &amp; Hyper-Converged</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Axonwall isolates <code className="text-slate-300">table inet axonwall</code> without touching Docker or K3s CNI chains. Run as a dedicated NGFW, a Host-Mode OpenZFS NAS, or a 2-node K3s + OpenEBS cluster.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Personal Sovereignty & Individual Defense */}
      <section id="personal-sovereignty" className="py-24 border-t border-slate-800/80 bg-slate-950/70 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl h-[500px] radial-subtle pointer-events-none -z-10" />
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-wider">
              <EyeOff className="w-3.5 h-3.5" /> Guarding the Individual User
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Reclaim Your Digital Bastion
            </h2>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              Your home network shouldn&apos;t be an open book for commercial data harvesters, ISP profiling, or vulnerable smart appliances. Axonwall establishes uncompromising digital sovereignty for the individual user.
            </p>
          </div>

          <PersonalPerimeterVisual />
        </div>
      </section>

      {/* Feature Deep Dive (12 Full-Spectrum Cards) */}
      <section id="features" className="py-24 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Full-Spectrum Feature Set</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Beyond OPNsense &amp; TrueNAS, Built for 2026
            </h2>
            <p className="text-sm sm:text-base text-slate-400">
              Every critical network, storage, container, and Ring-0 security service—engineered natively on Linux 6.12 LTS.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 1. Super-Slim Edge NGFW (Single-File UEFI UKI) */}
            <Link
              href="/docs/edge-uki-ngfw"
              className="p-6 rounded-2xl bg-slate-900 border border-emerald-500/40 hover:border-emerald-500/80 transition space-y-3 group block"
            >
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Cpu className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  NEW • ZERO-SURFACE UKI
                </span>
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition">
                Super-Slim Edge NGFW (Single-File UEFI UKI)
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Monolithic <code className="text-slate-300">CONFIG_MODULES=n</code> kernel booting{' '}
                <code className="text-slate-300">axonwall-satellite</code> as pure-Go PID 1 (<code className="text-slate-300">/init</code>)
                into RAM in &lt;1.2s. Zero shell/userland, pure-Go Netlink &amp; Cloud-Init, Dual-Stack IPv6, and Edge HA.
              </p>
            </Link>

            {/* 2. Eluvix Sovereign AI Router & DLP Guard */}
            <Link
              href="/docs/eluvix-ai-router"
              className="p-6 rounded-2xl bg-slate-900 border border-purple-500/40 hover:border-purple-500/80 transition space-y-3 group block"
            >
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/15 text-purple-300 border border-purple-500/30">
                  NEW • SOVEREIGN AI
                </span>
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition">
                Eluvix Sovereign AI Router &amp; DLP Guard
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Switchyard 4-tier routing (local Ollama/vLLM/Lemonade SLMs vs. cloud frontier models), PrivacyGuard
                reversible PII/secret tokenization (<code className="text-slate-300">sk-*</code>, <code className="text-slate-300">AKIA*</code>),
                PromptGuard filter, and 8 agent harnesses.
              </p>
            </Link>

            {/* 3. ZFSBootMenu Root-on-ZFS Boot Environments */}
            <Link
              href="/docs/installer-raid-zfs"
              className="p-6 rounded-2xl bg-slate-900 border border-sky-500/40 hover:border-sky-500/80 transition space-y-3 group block"
            >
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                  <RefreshCw className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/15 text-sky-300 border border-sky-500/30">
                  NEW • ZBM ROOT-ON-ZFS
                </span>
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-sky-300 transition">
                ZFSBootMenu v3.1.x Root-on-ZFS &amp; A/B Slots
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Boot directly from OpenZFS pools (<code className="text-slate-300">zroot/ROOT/*</code> across Stripe,
                Mirror, RAID-Z, or dRAID) with zero-copy snapshot Boot Environments (BEs) and pre-boot watchdog
                auto-revert alongside ext4 A/B slots.
              </p>
            </Link>

            {/* 4. Ghost-in-the-Ring & rkhunter */}
            <Link
              href="/docs/ghost-in-the-ring-rootkits"
              className="p-6 rounded-2xl bg-slate-900 border border-emerald-500/30 hover:border-emerald-500/70 transition space-y-3 group block"
            >
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Bug className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  RING-0 DEFENSE
                </span>
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition">
                Ghost-in-the-Ring &amp; 6-Engine Malware Hunter
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Pairs <code className="text-slate-300">rkhunter</code>, <code className="text-slate-300">chkrootkit</code>,{' '}
                <code className="text-slate-300">ClamAV</code>, <code className="text-slate-300">AIDE</code>,{' '}
                <code className="text-slate-300">YARA</code>, and <code className="text-slate-300">Lynis</code> with
                Ring-0 <code className="text-slate-300">BPF_LSM</code> lockdown, <code className="text-slate-300">/proc/kcore</code>{' '}
                <code className="text-slate-300">prog_idr</code> inspection, and Silicon PMU LBR telemetry to catch
                syscall-less <code className="text-slate-300">io_uring</code> and eBPF rootkits.
              </p>
            </Link>

            {/* 2. Post-Quantum Rosenpass Dual-KEM VPN */}
            <Link
              href="/docs/post-quantum-rosenpass"
              className="p-6 rounded-2xl bg-slate-900 border border-sky-500/30 hover:border-sky-500/70 transition space-y-3 group block"
            >
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                  <KeyRound className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/15 text-sky-300 border border-sky-500/30">
                  POST-QUANTUM
                </span>
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-sky-300 transition">
                Rosenpass Dual-KEM WireGuard Mesh
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Hybrid Post-Quantum key exchange combining Classic McEliece 460896 (code-based KEM) + Kyber-768 / ML-KEM
                (lattice-based KEM) with in-kernel WireGuard, rotating 256-bit Pre-Shared Keys every 120 seconds.
              </p>
            </Link>

            {/* 3. 2-Host High Availability */}
            <Link
              href="/docs/high-availability#two-host-setup"
              className="p-6 rounded-2xl bg-slate-900 border border-amber-500/30 hover:border-amber-500/70 transition space-y-3 group block"
            >
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                  <ArrowRightLeft className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30">
                  2-HOST GUIDE
                </span>
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition">
                Full-Stack High Availability (VRRP + mTLS Sync)
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Keepalived VRRP + conntrackd FTFW state sync + automatic ECDSA P-256 HA PKI mTLS enrollment + Chrony
                symmetric NTP + OpenLDAP <code className="text-slate-300">syncrepl</code> + SQLite WAL streaming + ZFS
                Send/Recv.
              </p>
            </Link>

            {/* 4. Neovim Super Configurator & ZSH Shell */}
            <Link
              href="/docs/cli-super-configurator"
              className="p-6 rounded-2xl bg-slate-900 border border-purple-500/30 hover:border-purple-500/70 transition space-y-3 group block"
            >
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                  <Terminal className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/15 text-purple-300 border border-purple-500/30">
                  SUPER TUI
                </span>
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition">
                Neovim Super Configurator, NastyMap &amp; ZSH
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Configure all 11 domains via <code className="text-slate-300">axonwall-config</code>—a hyperfocused Lua
                form TUI with full Vim motions—paired with the NastyMap topology simulator and an Oh My Zsh + Starship
                workstation shell.
              </p>
            </Link>

            {/* 5. Vigilant Octo Waffle & K3s */}
            <Link
              href="/docs/vigilant-octo-waffle"
              className="p-6 rounded-2xl bg-slate-900 border border-emerald-500/30 hover:border-emerald-500/70 transition space-y-3 group block"
            >
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <GitBranch className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  K3S SECOPS
                </span>
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition">
                K3s, OpenEBS &amp; Vigilant Octo Waffle SOC
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Embedded K3s with OpenEBS Mayastor NVMe-oF storage, plus the turnkey <code className="text-slate-300">vigilant-octo-waffle</code>{' '}
                GitOps stack (Gitea, Tekton, Vault, Wazuh, Cilium, Tetragon) and Vigilante Purple-Team BattleStation.
              </p>
            </Link>

            {/* 6. OpenZFS NAS Storage & Vault */}
            <Link
              href="/docs/zfs-nas-storage"
              className="p-6 rounded-2xl bg-slate-900 border border-sky-500/30 hover:border-sky-500/70 transition space-y-3 group block"
            >
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                  <Database className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/15 text-sky-300 border border-sky-500/30">
                  ZFS + VAULT
                </span>
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-sky-300 transition">
                TrueNAS-Grade OpenZFS NAS &amp; S3 Vault
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Native OpenZFS Stripe/Mirror/RAID-Z pools, Samba SMB3 with Windows VSS Shadow Copies, NFSv4, iSCSI
                targets, and the dedicated Axonwall Vault S3 backup appliance with SeaweedFS &amp; B-14 Internal PKI CA.
              </p>
            </Link>

            {/* 7. Suricata 7+ IDS/IPS */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Shield className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-white">Suricata 7+ IDS/IPS (Fail-Open)</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Integrated NFQUEUE fail-open bypass &amp; AF_PACKET/eBPF zero-copy inspection. If Suricata restarts
                under load, packet flow bypasses the queue rather than severing network connectivity.
              </p>
            </div>

            {/* 8. Smart QoS (CAKE + IFB) */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                <Activity className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-white">Smart QoS (CAKE + IFB Shaping)</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Linux CAKE queue discipline with automatic DiffServ DSCP prioritization, TCP ACK filtering, and IFB
                virtual ingress shaping. Eliminates bufferbloat latency during saturated transfers.
              </p>
            </div>

            {/* 9. CrowdSec & Unbound DNS RPZ */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <Radio className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-white">CrowdSec LAPI &amp; Unbound DNS RPZ</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                CrowdSec LAPI bouncer binds attacker IPs to native nftables interval sets with CIDR minimization, paired
                with Unbound DNS Response Policy Zone (RPZ) sinkholing and GeoIP/ASN filtering.
              </p>
            </div>

            {/* 10. Multi-WAN, Multi-LAN & FRRouting */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Globe className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-white">N-Port Multi-WAN &amp; FRRouting (BGP/OSPF)</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Arbitrary N-port WAN/LAN/OPT topologies, 802.1Q VLANs, and LACP bonds paired with FRRouting BGP, OSPF,
                ECMP load balancing, and BFD sub-second link failure detection.
              </p>
            </div>

            {/* 11. KVM/QEMU & LXC Hypervisor */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Cpu className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-white">KVM/QEMU &amp; LXC Hypervisor Compute</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Built-in virtualization manager for KVM Virtual Machines, lightweight LXC containers, VFIO PCI/GPU
                passthrough, ISO storage, and browser-based noVNC/SPICE consoles.
              </p>
            </div>

            {/* 12. AI Security Copilot & VictoriaMetrics */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-white">AI Security Copilot &amp; VictoriaMetrics</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Multi-provider AI engine (Google Antigravity, Ollama, Claude, Codex, vLLM) paired with embedded
                VictoriaMetrics, VictoriaLogs, and live eBPF/NFLOG SSE packet tracing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Documentation & Step-by-Step Guides Banner */}
      <section className="py-20 border-t border-slate-800/80 bg-slate-950/80">
        <div className="max-w-7xl mx-auto px-6 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                Engineering Documentation &amp; Guides
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Deep-Dive Technical Guides
              </h2>
            </div>
              <Link
                href="/docs"
                className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 hover:text-emerald-300"
              >
                Browse All 17 Documentation Sections <ArrowRight className="w-4 h-4" />
              </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            <Link
              href="/docs/edge-uki-ngfw"
              className="p-5 rounded-xl bg-slate-900 border border-emerald-500/40 hover:border-emerald-500 transition space-y-2 group"
            >
              <div className="font-mono text-[10px] text-emerald-400 uppercase">Zero-Surface Perimeter</div>
              <div className="font-bold text-white text-sm group-hover:text-emerald-300">
                Super-Slim Edge NGFW (Single-File UEFI UKI)
              </div>
              <p className="text-slate-400 leading-relaxed">
                How <code className="font-mono">CONFIG_MODULES=n</code>, pure-Go PID 1 (<code className="font-mono">/init</code>),
                and pure-Go Netlink/Cloud-Init deliver a 7 MB zero-shell firewall that boots in &lt;1.2s.
              </p>
            </Link>

            <Link
              href="/docs/eluvix-ai-router"
              className="p-5 rounded-xl bg-slate-900 border border-purple-500/40 hover:border-purple-500 transition space-y-2 group"
            >
              <div className="font-mono text-[10px] text-purple-400 uppercase">Sovereign AI &amp; DLP</div>
              <div className="font-bold text-white text-sm group-hover:text-purple-300">
                Eluvix AI Router, Tokenomics &amp; DLP Guard
              </div>
              <p className="text-slate-400 leading-relaxed">
                Switchyard 4-tier local/frontier routing, reversible PrivacyGuard PII/secret tokenization, and 8
                autonomous coding agent harnesses.
              </p>
            </Link>

            <Link
              href="/docs/installer-raid-zfs"
              className="p-5 rounded-xl bg-slate-900 border border-sky-500/40 hover:border-sky-500 transition space-y-2 group"
            >
              <div className="font-mono text-[10px] text-sky-400 uppercase">Root-on-ZFS &amp; A/B Slots</div>
              <div className="font-bold text-white text-sm group-hover:text-sky-300">
                ZFSBootMenu v3.1.x &amp; Multi-Disk RAID-1
              </div>
              <p className="text-slate-400 leading-relaxed">
                Zero-copy OpenZFS Boot Environments (<code className="font-mono">zroot/ROOT/*</code>), pre-boot watchdog
                rollback, and mdadm RAID-1 A/B slots.
              </p>
            </Link>

            <Link
              href="/docs/high-availability#two-host-setup"
              className="p-5 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 transition space-y-2 group"
            >
              <div className="font-mono text-[10px] text-emerald-400 uppercase">Step-by-Step Guide</div>
              <div className="font-bold text-white text-sm group-hover:text-emerald-300">
                Setting Up a 2-Host HA Cluster
              </div>
              <p className="text-slate-400 leading-relaxed">
                Complete cabling, <code className="font-mono">interfaces.yaml</code>, <code className="font-mono">ha.yaml</code>,
                Host CSR mTLS PKI, Keepalived VRRP, and conntrackd failover walkthrough.
              </p>
            </Link>

            <Link
              href="/docs/ghost-in-the-ring-rootkits"
              className="p-5 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 transition space-y-2 group"
            >
              <div className="font-mono text-[10px] text-amber-400 uppercase">Ring-0 Research</div>
              <div className="font-bold text-white text-sm group-hover:text-amber-300">
                Detecting eBPF &amp; io_uring Rootkits
              </div>
              <p className="text-slate-400 leading-relaxed">
                How <code className="font-mono">BPF_LSM</code>, <code className="font-mono">/proc/kcore</code>{' '}
                <code className="font-mono">prog_idr</code> walks, Silicon PMU LBR, and <code className="font-mono">rkhunter</code>{' '}
                defend Ring-0.
              </p>
            </Link>

            <Link
              href="/docs/post-quantum-rosenpass"
              className="p-5 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 transition space-y-2 group"
            >
              <div className="font-mono text-[10px] text-sky-400 uppercase">Post-Quantum VPN</div>
              <div className="font-bold text-white text-sm group-hover:text-sky-300">
                Rosenpass Dual-KEM WireGuard
              </div>
              <p className="text-slate-400 leading-relaxed">
                Deploy Classic McEliece 460896 + Kyber-768 hybrid PSK rotation across site-to-site WireGuard links.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Official Release v0.11.32 & Signed Installation Media Section */}
      <section id="releases" className="py-24 border-t border-slate-800/80 bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                <Download className="w-3.5 h-3.5" /> Official Release • v0.11.32 (Signed with Ed25519 &amp; SHA-256)
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                Download Verified Appliance Media
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed">
                Every release artifact is built deterministically from{' '}
                <a href="https://github.com/axonwall/axonwall" className="text-emerald-400 underline">
                  github.com/axonwall/axonwall
                </a>{' '}
                and accompanied by SHA-256 digests and detached Ed25519 signatures (<code className="text-slate-300 font-mono">.sha256.sig</code>).
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/releases"
                className="px-5 py-3 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition flex items-center gap-2 shadow-lg shadow-emerald-950/60"
              >
                <span>Full Release Matrix &amp; Changelog</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="https://github.com/axonwall/axonwall/releases/tag/v0.11.32"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 transition flex items-center gap-2"
              >
                <ExternalLink className="w-3.5 h-3.5 text-emerald-400" /> GitHub v0.11.32
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 1. Standard Debian 13 ISO */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-emerald-500/40 flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-semibold">
                    BARE METAL • VM • ZFSBOOTMENU
                  </span>
                  <span className="text-xs font-mono text-slate-400">1,002.0 MB</span>
                </div>
                <h3 className="text-lg font-bold text-white">Turnkey Appliance ISO</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Bootable UEFI &amp; BIOS installer supporting A/B Dual-Root, ZFSBootMenu v3.1.x Root-on-ZFS, and
                  mdadm RAID-1 mirroring.
                </p>
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 font-mono text-[10px] text-slate-400 truncate">
                  SHA256: <span className="text-emerald-400">13c0c71d6dcc1968d42e64d36eeff061...</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="https://github.com/axonwall/axonwall/releases/download/v0.11.32/axonwall-debian13-amd64.iso"
                  className="flex-1 py-2.5 px-3 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition text-center flex items-center justify-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" /> axonwall-debian13-amd64.iso
                </a>
                <a
                  href="https://github.com/axonwall/axonwall/releases/download/v0.11.32/axonwall-debian13-amd64.iso.sha256"
                  className="py-2.5 px-2.5 rounded-lg text-[11px] font-mono bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800"
                >
                  .sha256
                </a>
              </div>
            </div>

            {/* 2. Super-Slim Edge UKI (.efi) */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-sky-500/40 flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-sky-500/15 text-sky-300 border border-sky-500/30 font-semibold">
                    ZERO-SURFACE UKI • PID 1 GO
                  </span>
                  <span className="text-xs font-mono text-slate-400">7.0 MB</span>
                </div>
                <h3 className="text-lg font-bold text-white">Super-Slim Edge NGFW (.efi)</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Single-file UEFI Unified Kernel Image (<code className="text-slate-300">CONFIG_MODULES=n</code>) with
                  pure-Go PID 1, zero shell, Cloud-Init, Dual-Stack IPv6, and &lt;1.2s RAM boot.
                </p>
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 font-mono text-[10px] text-slate-400 truncate">
                  SHA256: <span className="text-sky-400">66342158a0fb97b90d84249b40bdb11e...</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="https://github.com/axonwall/axonwall/releases/download/v0.11.32/axonwall-edge-sku-vm-virtio.efi"
                  className="flex-1 py-2.5 px-3 rounded-lg text-xs font-semibold bg-sky-600 hover:bg-sky-500 text-white transition text-center flex items-center justify-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" /> axonwall-edge-sku-vm-virtio.efi
                </a>
                <a
                  href="https://github.com/axonwall/axonwall/releases/download/v0.11.32/axonwall-edge-sku-vm-virtio.efi.sha256"
                  className="py-2.5 px-2.5 rounded-lg text-[11px] font-mono bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800"
                >
                  .sha256
                </a>
              </div>
            </div>

            {/* 3. Cloud QCOW2 / Vault ISO / Debian .deb */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-purple-500/15 text-purple-300 border border-purple-500/30 font-semibold">
                    CLOUD QCOW2 • VAULT • .DEB
                  </span>
                  <span className="text-xs font-mono text-slate-400">v0.11.32</span>
                </div>
                <h3 className="text-lg font-bold text-white">Cloud, S3 Vault &amp; Debian Packages</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Deploy directly on Proxmox/KVM, build an immutable SeaweedFS S3 backup vault, or install on Debian 13:
                </p>
                <div className="space-y-2 pt-1 text-xs">
                  <a
                    href="https://github.com/axonwall/axonwall/releases/download/v0.11.32/axonwall-debian13-amd64-cloud.qcow2"
                    className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 transition"
                  >
                    <span className="font-mono text-slate-200 text-[11px]">axonwall-debian13-amd64-cloud.qcow2</span>
                    <span className="text-purple-400 font-mono text-[10px]">827 MB ↓</span>
                  </a>
                  <a
                    href="https://github.com/axonwall/axonwall/releases/download/v0.11.32/axonwall-vault-debian13-amd64.iso"
                    className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 transition"
                  >
                    <span className="font-mono text-slate-200 text-[11px]">axonwall-vault-debian13-amd64.iso</span>
                    <span className="text-amber-400 font-mono text-[10px]">878 MB ↓</span>
                  </a>
                  <a
                    href="https://github.com/axonwall/axonwall/releases/download/v0.11.32/axonwall_0.11.32_amd64.deb"
                    className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 transition"
                  >
                    <span className="font-mono text-slate-200 text-[11px]">axonwall_0.11.32_amd64.deb</span>
                    <span className="text-emerald-400 font-mono text-[10px]">60.1 MB ↓</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cost Savings & Stop Paying Enterprise Tax */}
      <section id="cost-savings" className="py-24 border-t border-slate-800/80 bg-slate-950/60 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl h-[500px] radial-glow pointer-events-none -z-10" />
        <div className="max-w-7xl mx-auto px-6">
          <CostSavingsCalculator />
        </div>
      </section>

      {/* Hardware Appliances Section (The OPNsense / Deciso Model) */}
      <section id="appliances" className="py-24 border-t border-slate-800/80 bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Turnkey Systems</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Pre-Configured Hardware Appliances
            </h2>
            <p className="text-sm sm:text-base text-slate-400">
              Factory burned-in, pre-loaded with Axonwall OS, and tested for maximum thermal reliability. Ships globally with next-day advance hardware replacement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Edge 10 */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-6 hover:border-slate-700 transition">
              <div className="space-y-4">
                <span className="px-2.5 py-1 rounded-md text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase">
                  Branch &amp; Home Lab
                </span>
                <h3 className="text-xl font-bold text-white">Axonwall Edge 10</h3>
                <div className="text-3xl font-extrabold text-white font-mono">$499</div>
                <p className="text-xs text-slate-400">Silent, fanless aluminum chassis for home labs, branch offices, and edge deployments.</p>

                <ul className="text-xs text-slate-300 space-y-2 pt-2 border-t border-slate-800">
                  <li className="flex items-center gap-2">✓ Quad-Core Intel x86 (Fanless)</li>
                  <li className="flex items-center gap-2">✓ 4x 2.5GbE RJ-45 (Intel i226)</li>
                  <li className="flex items-center gap-2">✓ 2x 10GbE SFP+ Ports</li>
                  <li className="flex items-center gap-2">✓ 16GB DDR5 RAM + 128GB NVMe</li>
                  <li className="flex items-center gap-2">✓ 2.5 Gbps WireGuard Throughput</li>
                </ul>
              </div>

              <button className="w-full py-2.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white transition border border-slate-700">
                Order Edge 10
              </button>
            </div>

            {/* Edge 20-5G */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-6 hover:border-slate-700 transition">
              <div className="space-y-4">
                <span className="px-2.5 py-1 rounded-md text-[10px] font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20 uppercase">
                  Cellular Failover
                </span>
                <h3 className="text-xl font-bold text-white">Axonwall Edge 20-5G</h3>
                <div className="text-3xl font-extrabold text-white font-mono">$899</div>
                <p className="text-xs text-slate-400">Integrated 5G Sub-6 modem with dual SIM redundancy for retail and mobile edge.</p>

                <ul className="text-xs text-slate-300 space-y-2 pt-2 border-t border-slate-800">
                  <li className="flex items-center gap-2">✓ Octa-Core ARM64 / x86</li>
                  <li className="flex items-center gap-2">✓ Dual SIM 5G Sub-6 + GNSS</li>
                  <li className="flex items-center gap-2">✓ 4x 2.5GbE + 2x 10GbE SFP+</li>
                  <li className="flex items-center gap-2">✓ 802.3at PoE Power Input</li>
                  <li className="flex items-center gap-2">✓ Out-of-band management</li>
                </ul>
              </div>

              <button className="w-full py-2.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white transition border border-slate-700">
                Order Edge 20-5G
              </button>
            </div>

            {/* Rack 100 */}
            <div className="p-6 rounded-2xl bg-slate-900 border-2 border-emerald-500/50 shadow-xl shadow-emerald-950/20 flex flex-col justify-between space-y-6 relative">
              <div className="space-y-4">
                <span className="px-2.5 py-1 rounded-md text-[10px] font-semibold bg-emerald-500 text-black uppercase font-bold">
                  Most Popular
                </span>
                <h3 className="text-xl font-bold text-white">Axonwall Rack 100</h3>
                <div className="text-3xl font-extrabold text-white font-mono">$1,699</div>
                <p className="text-xs text-slate-400">1U rackmount appliance for medium enterprises, schools, and central headquarters.</p>

                <ul className="text-xs text-slate-300 space-y-2 pt-2 border-t border-slate-800">
                  <li className="flex items-center gap-2">✓ Intel Xeon D 8-Core / 16-Thread</li>
                  <li className="flex items-center gap-2">✓ 8x 2.5GbE + 4x 10GbE SFP+</li>
                  <li className="flex items-center gap-2">✓ 32GB ECC RAM (expandable to 128GB)</li>
                  <li className="flex items-center gap-2">✓ Dual Redundant 300W PSUs</li>
                  <li className="flex items-center gap-2">✓ 10 Gbps WireGuard &amp; IMIX NAT</li>
                </ul>
              </div>

              <button className="w-full py-2.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition shadow-lg shadow-emerald-950/60">
                Order Rack 100
              </button>
            </div>

            {/* Core HA Cluster */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-6 hover:border-slate-700 transition">
              <div className="space-y-4">
                <span className="px-2.5 py-1 rounded-md text-[10px] font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20 uppercase">
                  Datacenter HA Pair
                </span>
                <h3 className="text-xl font-bold text-white">Axonwall Core HA</h3>
                <div className="text-3xl font-extrabold text-white font-mono">$7,999</div>
                <p className="text-xs text-slate-400">Turnkey active/standby dual 1U HA pair with 100GbE QSFP28 and sub-second failover.</p>

                <ul className="text-xs text-slate-300 space-y-2 pt-2 border-t border-slate-800">
                  <li className="flex items-center gap-2">✓ 2x 1U Clustered Appliances</li>
                  <li className="flex items-center gap-2">✓ AMD EPYC 16-Core / 32-Thread</li>
                  <li className="flex items-center gap-2">✓ 4x 25GbE SFP28 + 2x 100GbE QSFP28</li>
                  <li className="flex items-center gap-2">✓ Conntrackd 100GbE DAC Link</li>
                  <li className="flex items-center gap-2">✓ Dedicated IPMI / BMC management</li>
                </ul>
              </div>

              <button className="w-full py-2.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white transition border border-slate-700">
                Contact Enterprise Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Editions & Subscriptions (OPNsense / Deciso Model) */}
      <section id="pricing" className="py-24 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Transparent Pricing</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Software Editions &amp; Enterprise Support
            </h2>
            <p className="text-sm sm:text-base text-slate-400">
              100% open source community edition for everyone, with certified long-term support and commercial threat feeds for mission-critical enterprise deployments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Community Edition */}
            <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white">Community Edition</h3>
                <p className="text-xs text-slate-400 mt-1">For homelabs, developers, and self-supported small deployments.</p>
                <div className="text-4xl font-extrabold text-white font-mono mt-4">$0 <span className="text-sm font-normal text-slate-500">/ forever</span></div>
              </div>

              <ul className="text-xs text-slate-300 space-y-3 pt-4 border-t border-slate-800">
                <li className="flex items-center gap-2 text-emerald-400">✓ 100% Free &amp; Open Source Core</li>
                <li className="flex items-center gap-2">✓ Bi-weekly rolling release cycle</li>
                <li className="flex items-center gap-2">✓ Full nftables, WireGuard, Rosenpass PQ-KEM</li>
                <li className="flex items-center gap-2">✓ OpenZFS NAS, K3s, Neovim TUI &amp; Rootkit Hunter</li>
                <li className="flex items-center gap-2">✓ Community Forum Support</li>
              </ul>

              <a
                href="https://github.com/axonwall/axonwall"
                className="w-full py-3 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white transition border border-slate-700 block text-center"
              >
                Download Community ISO
              </a>
            </div>

            {/* Business Edition */}
            <div className="p-8 rounded-2xl bg-slate-900 border-2 border-emerald-500 shadow-xl shadow-emerald-950/30 space-y-6 relative">
              <div className="absolute top-0 right-8 -translate-y-1/2 bg-emerald-500 text-black px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider">
                Recommended for Production
              </div>

              <div>
                <h3 className="text-xl font-bold text-white">Business Edition</h3>
                <p className="text-xs text-slate-400 mt-1">Hardened, validated release channel for commercial environments.</p>
                <div className="text-4xl font-extrabold text-white font-mono mt-4">$249 <span className="text-sm font-normal text-slate-500">/ appliance / year</span></div>
              </div>

              <ul className="text-xs text-slate-300 space-y-3 pt-4 border-t border-slate-800">
                <li className="flex items-center gap-2 text-emerald-400">✓ Everything in Community, plus:</li>
                <li className="flex items-center gap-2">✓ Hardened Quarterly LTS update stream</li>
                <li className="flex items-center gap-2">✓ Automated hardware regression QA</li>
                <li className="flex items-center gap-2">✓ Commercial Threat Intelligence &amp; YARA Feeds</li>
                <li className="flex items-center gap-2">✓ MaxMind GeoIP2 + CrowdSec CTI</li>
                <li className="flex items-center gap-2">✓ Encrypted Cloud Config Vault</li>
              </ul>

              <button className="w-full py-3 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition shadow-lg shadow-emerald-950/60">
                Subscribe to Business Edition
              </button>
            </div>

            {/* Enterprise Support */}
            <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white">Enterprise SLA Support</h3>
                <p className="text-xs text-slate-400 mt-1">24/7 mission-critical response for enterprise and government clusters.</p>
                <div className="text-4xl font-extrabold text-white font-mono mt-4">$1,499 <span className="text-sm font-normal text-slate-500">/ node / year</span></div>
              </div>

              <ul className="text-xs text-slate-300 space-y-3 pt-4 border-t border-slate-800">
                <li className="flex items-center gap-2 text-emerald-400">✓ Everything in Business Edition, plus:</li>
                <li className="flex items-center gap-2">✓ 24x7x365 Emergency Phone &amp; Ticket SLA</li>
                <li className="flex items-center gap-2">✓ 2-hour response time guarantee</li>
                <li className="flex items-center gap-2">✓ Named Technical Account Manager (TAM)</li>
                <li className="flex items-center gap-2">✓ Architecture review &amp; 2-Host HA onboarding</li>
                <li className="flex items-center gap-2">✓ Next-business-day hardware advance swap</li>
              </ul>

              <button className="w-full py-3 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white transition border border-slate-700">
                Contact Enterprise Support
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Migration Section */}
      <section id="migration" className="py-20 border-t border-slate-800/80 bg-slate-950/60">
        <div className="max-w-5xl mx-auto px-6 text-center space-y-6">
          <div className="inline-flex p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <RefreshCw className="w-6 h-6" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Migrate from OPNsense, pfSense, or Cisco ASA in 30 Seconds
          </h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
            Our built-in Migration Studio parses your existing <code className="text-slate-300">config.xml</code> or Cisco
            ASA configuration, performs mathematical rule-shadowing and subnet-collision analysis, and translates rules,
            aliases, NAT port forwards, and DHCP subnets directly to Linux nftables.
          </p>
          <div className="pt-2">
            <Link
              href="/docs/migration"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
            >
              Explore Migration Studio Documentation <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 border-t border-slate-800/80">
        <div className="max-w-4xl mx-auto px-6 space-y-12">
          <h2 className="text-3xl font-extrabold text-white text-center">Frequently Asked Questions</h2>

          <div className="space-y-6 text-sm">
            <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <h3 className="font-bold text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-emerald-400" /> Why did you build Axonwall on Linux instead of FreeBSD?
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Linux provides modern hardware drivers on day one (including 5G cellular, Wi-Fi 7, and 100GbE NICs), multi-core scalability via <code className="text-slate-300">nftables</code> and eBPF, native Ring-0 <code className="text-slate-300">BPF_LSM</code> security hooks, and native support for OpenZFS, KVM, and K3s Kubernetes. FreeBSD packet filtering (<code className="text-slate-300">pf</code>) suffers from lock contention under heavy symmetrical traffic.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <h3 className="font-bold text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-emerald-400" /> Can I install Axonwall on my own PC or server?
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Yes. Axonwall Community Edition runs on any standard 64-bit x86 or ARM64 computer. We provide bootable UEFI ISO images (supporting both A/B Dual-Root and Standard Single-Root partition modes), Debian 13 packages (<code className="text-slate-300">.deb</code>), Docker Compose templates, and Proxmox/KVM virtual machine images.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <h3 className="font-bold text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-emerald-400" /> How does two-host High Availability work in Axonwall?
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Two Axonwall nodes connect via a dedicated sync interface (<code className="text-slate-300">eth3</code>) running Keepalived VRRP for sub-second virtual IP failover, <code className="text-slate-300">conntrackd</code> FTFW for zero-drop TCP/UDP/WireGuard connection state transfer, automatic ECDSA P-256 HA PKI mTLS enrollment for signed configuration and SQLite WAL replication, Chrony symmetric NTP peering, OpenLDAP <code className="text-slate-300">syncrepl</code>, and incremental OpenZFS snapshot streaming. See the{' '}
                <Link href="/docs/high-availability#two-host-setup" className="text-emerald-400 underline">
                  Step-by-Step 2-Host Setup Guide
                </Link>
                .
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <h3 className="font-bold text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-emerald-400" /> How does Commit-Confirm prevent lockouts?
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                When you apply a new ruleset from the Web Console, CLI, or Neovim Super Configurator (<code className="text-slate-300">axonwall-config</code>), Axonwall loads it into the Linux kernel and arms a 60-second confirmation timer. If your session remains connected and you confirm, the configuration is permanently stored. If your rule severed connectivity, the timer expires and the daemon automatically rolls back to the previous working bundle.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-12 bg-slate-950 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Logo size="sm" variant="icon" />
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-sm">Axonwall</span>
              <span className="hidden sm:inline">— The Modern Linux Router &amp; Next-Gen Firewall.</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <Link href="/docs" className="hover:text-slate-300 transition">Docs</Link>
            <Link href="/docs/high-availability#two-host-setup" className="hover:text-slate-300 transition">2-Host HA Guide</Link>
            <Link href="/docs/ghost-in-the-ring-rootkits" className="hover:text-slate-300 transition">Ring-0 Hunter</Link>
            <Link href="/docs/post-quantum-rosenpass" className="hover:text-slate-300 transition">Post-Quantum VPN</Link>
            <Link href="/architecture" className="hover:text-slate-300 transition">Architecture</Link>
            <a href="https://github.com/axonwall/axonwall" className="hover:text-slate-300 transition">GitHub</a>
            <a href="#appliances" className="hover:text-slate-300 transition">Appliances</a>
            <a href="#pricing" className="hover:text-slate-300 transition">Pricing</a>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 mt-8 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-600">
          <p>© {new Date().getFullYear()} Axonwall Project. All rights reserved.</p>
          <p>OPNsense is a trademark of Deciso B.V. pfSense is a trademark of Netgate. Axonwall is an independent open-source project.</p>
        </div>
      </footer>
    </div>
  );
}
