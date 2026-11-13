'use client';

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
  HelpCircle,
  EyeOff,
  Sparkles,
  Bug,
  Database,
  GitBranch,
  ArrowRightLeft,
  BookOpen,
  Bot,
  ShieldAlert,
  Users,
  Cloud,
  HardDrive,
  FileCode,
} from 'lucide-react';
import { Logo } from '../components/Logo';
import { HeroSecurityHUD } from '../components/HeroSecurityHUD';
import { PersonalPerimeterVisual } from '../components/PersonalPerimeterVisual';
import { CostSavingsCalculator } from '../components/CostSavingsCalculator';
import { Navbar } from '../components/Navbar';

const FIVE_CORE_ROLES = [
  {
    id: 'core-firewall',
    name: 'NGFW & SD-WAN Fabric',
    desc: 'Multi-core nftables (1:1 BINAT, Hairpin, NPTv6), LPM CIDR + SYN-Flood XDP, FRR BGP/OSPF, PQ-VPN & Suricata 7+.',
    href: '/docs/architecture',
    badge: 'core-firewall',
    accent: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
  },
  {
    id: 'core-nas',
    name: 'OpenZFS NAS & S3 Vault',
    desc: 'Special NVMe VDEVs, Native AES-256-GCM encryption, Checkpoints/TRIM, SMB3 Time Machine/VSS, iSCSI, Cloud Sync & S3.',
    href: '/docs/zfs-nas-storage',
    badge: 'core-nas',
    accent: 'text-sky-400 border-sky-500/30 bg-sky-500/10',
  },
  {
    id: 'core-k3s',
    name: 'K3s, Cilium eBPF & VOW',
    desc: 'Cilium eBPF CNI (kube-proxy-less + Hubble) or WireGuard Flannel, Etcd S3 snapshots, UserNS BPF_TOKEN & OpenEBS.',
    href: '/docs/k3s-kubernetes',
    badge: 'core-k3s',
    accent: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10',
  },
  {
    id: 'core-virt',
    name: 'KVM & LXC Hypervisor',
    desc: 'OVMF Secure Boot + TPM2, VirtioFS ZFS shares, Zero-Copy Linked Clones, Live Migration, Libvirt XML, LXC & VFIO.',
    href: '/docs/kvm-lxc-hypervisor',
    badge: 'core-virt',
    accent: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
  },
  {
    id: 'core-vigilante',
    name: 'Vigilante Autonomous SOC',
    desc: 'Autonomous SOAR containment, honeynet deception mesh, PCAP forensics, security data lake & 12 SOC packages.',
    href: '/docs/vigilante-cyber-ops',
    badge: 'core-vigilante',
    accent: 'text-purple-400 border-purple-500/30 bg-purple-500/10',
  },
];

const MIGRATION_IMPORTERS = [
  'pfSense (config.xml)',
  'OPNsense (config.xml)',
  'Proxmox VE 8.x',
  'TrueNAS SCALE',
  'Cisco ASA / FTD',
  'VyOS',
  'MikroTik RouterOS',
  'Linux iptables',
  'RHEL / Fedora firewalld',
];

export default function HomePage() {
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
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Axonwall v0.11.68 • Linux 6.12 LTS, Custom Hardened Kernels, 5-Hook BPF-LSM, LPM CIDR/SYN XDP, ZBM v3.1.0 &amp; 25-Tool MCP
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight max-w-5xl mx-auto leading-[1.08]">
            The Sovereign Linux NGFW &amp;{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400">
              Converged Security OS
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Eliminate separate OPNsense, TrueNAS SCALE, Proxmox VE, and standalone Kubernetes nodes. Axonwall unites
            line-rate multi-core <code className="text-slate-200 font-mono">nftables</code> + Ring-0 eBPF XDP, a 7.1 MB{' '}
            <strong className="text-slate-200">Zero-Shell UEFI Edge UKI</strong>, pure UEFI{' '}
            <strong className="text-slate-200">ZFSBootMenu v3.1.0</strong>,{' '}
            <code className="text-slate-200 font-mono">CO-RE BPF-LSM</code> exploit defense, Post-Quantum Rosenpass
            Dual-KEM VPNs, <strong className="text-slate-200">OpenZFS NAS, Cilium K3s, KVM/Libvirt/LXC</strong>, and{' '}
            <strong className="text-slate-200">Vigilante Autonomous SOC + 25-Tool MCP AI</strong> in one platform.
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
              <Download className="w-4 h-4 text-emerald-400" /> Releases &amp; Download ISO (v0.11.68)
            </Link>
            <Link
              href="/docs"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-sm font-semibold bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-800 transition flex items-center justify-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-sky-400" /> Explore 25 Documentation Guides
            </Link>
          </div>

          {/* Trust stats */}
          <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl mx-auto border-t border-slate-800/80 text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-white font-mono">100 Gbps</div>
              <div className="text-xs text-slate-400 mt-1">Wire-Speed nftables + XDP</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-emerald-400 font-mono">60s</div>
              <div className="text-xs text-slate-400 mt-1">Commit-Confirm Rollback</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-white font-mono">Dual-KEM</div>
              <div className="text-xs text-slate-400 mt-1">McEliece + ML-KEM-512 PQ-VPN</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-sky-400 font-mono">Ring-0</div>
              <div className="text-xs text-slate-400 mt-1">CO-RE BPF-LSM &amp; Coroot eBPF</div>
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
              For 20 years, open-source firewalls relied on FreeBSD. Today, modern silicon, eBPF Ring-0 telemetry, and
              hyper-converged workloads run natively on Linux 6.12 LTS.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">nftables &amp; XDP Line-Rate</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                FreeBSD <code className="text-slate-300">pf</code> contends on locks under heavy NAT loads. Linux{' '}
                <code className="text-slate-300">nftables</code> scales across all CPU cores with lockless flowtables,
                multi-queue RSS, and pre-conntrack XDP DDoS drops.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <RefreshCw className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Commit-Confirm &amp; ZFSBootMenu</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Zero remote lockouts: unconfirmed rule commits auto-revert in 60 seconds, while pure UEFI ZFSBootMenu
                v3.1.0 Boot Environments and A/B Dual-Root slots make OS upgrades unbrickable.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                <KeyRound className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Post-Quantum &amp; Kernel DCO</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                In-kernel WireGuard paired with Rosenpass Dual-KEM (Classic McEliece 460896 + ML-KEM-512 / Kyber-512)
                120-second PSK rotation and OpenVPN kernel Data Channel Offload (<code className="text-slate-300">ovpn-dco</code>).
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <Boxes className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">5 Modular Core Roles</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Axonwall isolates <code className="text-slate-300">table inet axonwall</code> cleanly from CNI bridges.
                Run a pure NGFW or toggle OpenZFS NAS, 2-node HA K3s, KVM/LXC hypervisor, and Vigilante Autonomous SOC.
              </p>
            </div>
          </div>

          {/* Unified Competitor Replacement Matrix */}
          <div className="pt-8 space-y-6">
            <div className="text-center max-w-3xl mx-auto space-y-2">
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                4 Appliances Replaced • Full Parity &amp; Beyond
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                One Converged Linux 6.12 Platform vs. 4 Siloed Systems
              </h3>
              <p className="text-xs sm:text-sm text-slate-400">
                Consolidate OPNsense/pfSense, TrueNAS SCALE, Proxmox VE, and standalone K3s/Harvester clusters with
                direct 9-vendor configuration importers and zero feature compromises.
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/70">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-950/90 border-b border-slate-800 text-slate-300">
                    <th className="py-3.5 px-4 font-bold">Capability Domain</th>
                    <th className="py-3.5 px-4 font-bold text-emerald-400">Axonwall v0.11.68</th>
                    <th className="py-3.5 px-4 font-bold text-slate-400">OPNsense / pfSense</th>
                    <th className="py-3.5 px-4 font-bold text-slate-400">TrueNAS SCALE</th>
                    <th className="py-3.5 px-4 font-bold text-slate-400">Proxmox VE 8.x</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/70 text-slate-300">
                  <tr>
                    <td className="py-3 px-4 font-semibold text-white">Packet &amp; NAT Dataplane</td>
                    <td className="py-3 px-4 text-emerald-300">Linux 6.12 nftables (BINAT, Hairpin, NPTv6) + LPM CIDR &amp; SYN-Flood XDP</td>
                    <td className="py-3 px-4 text-slate-400">FreeBSD pf (lock contention, no eBPF XDP)</td>
                    <td className="py-3 px-4 text-slate-500">Host firewall only</td>
                    <td className="py-3 px-4 text-slate-400">Bridge firewall only (no NGFW/Multi-WAN)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-white">Ring-0 Exploit &amp; PQ-VPN</td>
                    <td className="py-3 px-4 text-emerald-300">5-Hook CO-RE BPF-LSM + BPF_TOKEN + Rosenpass Dual-KEM + ovpn-dco</td>
                    <td className="py-3 px-4 text-slate-400">WireGuard / OpenVPN DCO (no BPF-LSM)</td>
                    <td className="py-3 px-4 text-slate-500">None</td>
                    <td className="py-3 px-4 text-slate-500">AppArmor only (no PQ-VPN or BPF-LSM)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-white">OpenZFS NAS &amp; Vault</td>
                    <td className="py-3 px-4 text-emerald-300">Special NVMe VDEVs, AES-256-GCM, TRIM/Checkpoints, SMB3 Time Machine, Cloud Sync &amp; WORM S3</td>
                    <td className="py-3 px-4 text-slate-500">Boot ZFS only (no NAS shares/S3)</td>
                    <td className="py-3 px-4 text-slate-300">Full OpenZFS NAS (no NGFW or Edge UKI)</td>
                    <td className="py-3 px-4 text-slate-400">VM storage ZFS only (no native SMB/Time Machine/S3)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-white">KVM, Libvirt &amp; LXC</td>
                    <td className="py-3 px-4 text-emerald-300">OVMF Secure Boot + TPM2, VirtioFS, Linked Clones, Live Migrate, Libvirt XML, LXC BPF_TOKEN &amp; VFIO</td>
                    <td className="py-3 px-4 text-slate-500">None</td>
                    <td className="py-3 px-4 text-slate-400">Basic KVM / Incus (no VXLAN SDN or Edge UKI)</td>
                    <td className="py-3 px-4 text-slate-300">Full KVM &amp; LXC (no NGFW, K3s, or SOC)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-white">Kubernetes &amp; Cloud-Native</td>
                    <td className="py-3 px-4 text-emerald-300">Embedded HA K3s, Cilium eBPF CNI + Hubble, Etcd S3 Snapshots, UserNS &amp; OpenEBS Mayastor</td>
                    <td className="py-3 px-4 text-slate-500">None (FreeBSD kernel)</td>
                    <td className="py-3 px-4 text-slate-500">Removed k3s in Electric Eel (Docker Compose only)</td>
                    <td className="py-3 px-4 text-slate-500">Requires separate guest VMs</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-white">Rollback &amp; AI Governance</td>
                    <td className="py-3 px-4 text-emerald-300">60s Commit-Confirm + ZBM v3.1.0 + 12 YAML GitOps + 25-Tool Guardrailed MCP &amp; Vigilante SOC</td>
                    <td className="py-3 px-4 text-slate-400">Monolithic config.xml (no auto-revert or MCP)</td>
                    <td className="py-3 px-4 text-slate-400">SQLite DB + ZFS BEs (no GitOps YAML or MCP)</td>
                    <td className="py-3 px-4 text-slate-400">pmxcfs /etc/pve (no Commit-Confirm or SOC)</td>
                  </tr>
                </tbody>
              </table>
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
              Your home network shouldn&apos;t be an open book for commercial data harvesters, ISP profiling, or
              vulnerable smart appliances. Axonwall establishes uncompromising digital sovereignty for the individual
              user.
            </p>
          </div>

          <PersonalPerimeterVisual />
        </div>
      </section>

      {/* Feature Deep Dive (5 Modular Core Roles + Full-Spectrum Feature Grid) */}
      <section id="features" className="py-24 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
              Converged Platform Architecture • v0.11.68
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              5 Modular Core Roles, One Unified Control Plane
            </h2>
            <p className="text-sm sm:text-base text-slate-400">
              Enable only the subsystems your deployment needs in <code className="text-slate-200 font-mono">/etc/axonwall/system.yaml</code>—from
              a minimal 7.1 MB zero-shell perimeter UKI to a full hyper-converged ZFS, K3s, KVM, and Autonomous SOC cluster.
            </p>
          </div>

          {/* 5 Core Roles Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {FIVE_CORE_ROLES.map((role) => (
              <Link
                key={role.id}
                href={role.href}
                className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 hover:border-emerald-500/50 transition space-y-2.5 flex flex-col justify-between group"
              >
                <div className="space-y-2">
                  <span className={`inline-block text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${role.accent}`}>
                    {role.badge}
                  </span>
                  <h3 className="text-sm font-bold text-white group-hover:text-emerald-300 transition">{role.name}</h3>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{role.desc}</p>
                </div>
                <span className="text-[11px] text-emerald-400 font-semibold inline-flex items-center gap-1 pt-1">
                  Explore role <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            ))}
          </div>

          {/* 15 Full-Spectrum Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 1. CO-RE BPF-LSM Ring-0 Exploit Guard & Ghost-in-the-Ring */}
            <Link
              href="/docs/ghost-in-the-ring-rootkits"
              className="p-6 rounded-2xl bg-slate-900 border border-emerald-500/40 hover:border-emerald-500/80 transition space-y-3 group block"
            >
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Bug className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  RING-0 • CVE-2026-31431
                </span>
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition">
                5-Hook CO-RE BPF-LSM Guard &amp; BPF_TOKEN Mediator
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Blocks Copy Fail (CVE-2026-31431) <code className="text-slate-300">AF_ALG</code> overflows,{' '}
                <code className="text-slate-300">io_uring</code> implants, and cross-tenant{' '}
                <code className="text-slate-300">bpf_probe_read_kernel()</code> tracing while mediating Linux 6.9+{' '}
                <code className="text-slate-300">BPF_TOKEN_CREATE</code> delegation for rootless LXC &amp; K3s pods.
              </p>
            </Link>

            {/* 2. MCP Security AI Server & Tactical Leases */}
            <Link
              href="/docs/mcp-ai-control"
              className="p-6 rounded-2xl bg-slate-900 border border-purple-500/40 hover:border-purple-500/80 transition space-y-3 group block"
            >
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                  <Bot className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/15 text-purple-300 border border-purple-500/30">
                  16 RESOURCES • 24 TOOLS
                </span>
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition">
                MCP Security AI Server (5 Full-Stack Duties)
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                16-scope Model Context Protocol server (<code className="text-slate-300">axonwall-mcp</code>) with
                anti-lockout guardrails, TTL leases in <code className="text-slate-300">table inet axonwall_mcp</code>,
                LPM CIDR &amp; SYN-Flood <code className="text-slate-300">XDP_DROP</code>, KVM/Libvirt, K3s Etcd, ZFS NAS &amp; 9-vendor import.
              </p>
            </Link>

            {/* 3. Coroot Zero-Instrumentation eBPF APM */}
            <Link
              href="/docs/observability"
              className="p-6 rounded-2xl bg-slate-900 border border-sky-500/40 hover:border-sky-500/80 transition space-y-3 group block"
            >
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                  <Activity className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/15 text-sky-300 border border-sky-500/30">
                  DUAL-STACK XDP + APM
                </span>
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-sky-300 transition">
                Dual-Stack VLAN XDP &amp; Coroot eBPF APM
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Turnkey <code className="text-slate-300">coroot-ebpf-apm</code> captures L7 HTTP, gRPC, Postgres, MySQL,
                and Redis latency, TCP retransmits, and K3s service dependency graphs via kernel eBPF without code
                changes, backed by VictoriaMetrics &amp; VictoriaLogs.
              </p>
            </Link>

            {/* 4. Vigilante Autonomous SOC & SOAR */}
            <Link
              href="/docs/vigilante-cyber-ops"
              className="p-6 rounded-2xl bg-slate-900 border border-rose-500/35 hover:border-rose-500/75 transition space-y-3 group block"
            >
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
                  <ShieldAlert className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/15 text-rose-300 border border-rose-500/30">
                  AUTONOMOUS SOC &amp; SOAR
                </span>
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-rose-300 transition">
                Vigilante Cyber Defense &amp; Deception Mesh
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Autonomous SOAR active containment playbooks, low-interaction honeynet deception listeners, ring-buffer
                PCAP forensics, embedded security data lake, and 12 modular purple-team &amp; threat-hunting packages.
              </p>
            </Link>

            {/* 5. Super-Slim Edge NGFW (Single-File UEFI UKI) */}
            <Link
              href="/docs/edge-uki-ngfw"
              className="p-6 rounded-2xl bg-slate-900 border border-emerald-500/30 hover:border-emerald-500/70 transition space-y-3 group block"
            >
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Cpu className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  7.1 MB ZERO-SHELL UKI
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

            {/* 6. Eluvix Sovereign AI Router & DLP Guard */}
            <Link
              href="/docs/eluvix-ai-router"
              className="p-6 rounded-2xl bg-slate-900 border border-purple-500/30 hover:border-purple-500/70 transition space-y-3 group block"
            >
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/15 text-purple-300 border border-purple-500/30">
                  SOVEREIGN AI &amp; DLP
                </span>
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition">
                Eluvix Sovereign AI Router &amp; DLP Guard
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Switchyard 4-tier routing (local Ollama/vLLM/Lemonade SLMs vs. frontier models), PrivacyGuard reversible
                PII/secret tokenization (<code className="text-slate-300">sk-*</code>, <code className="text-slate-300">AKIA*</code>),
                PromptGuard filter, and 8 coding agent harnesses.
              </p>
            </Link>

            {/* 7. ZFSBootMenu v3.1.0 Root-on-ZFS & TPM 2.0 */}
            <Link
              href="/docs/installer-raid-zfs"
              className="p-6 rounded-2xl bg-slate-900 border border-sky-500/30 hover:border-sky-500/70 transition space-y-3 group block"
            >
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                  <RefreshCw className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/15 text-sky-300 border border-sky-500/30">
                  ZBM v3.1.0 • TPM 2.0
                </span>
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-sky-300 transition">
                Pure UEFI ZFSBootMenu, TPM 2.0 &amp; A/B Slots
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Direct UEFI ZFSBootMenu v3.1.0 Boot Environments (<code className="text-slate-300">axonwallctl zbm</code>),
                smart NVMe/SSD/HDD SLOG/L2ARC tiering, LUKS2 + TPM 2.0 PCR <code className="text-slate-300">0+2+7</code>{' '}
                auto-unlock, and Cloud QCOW2 Slot-B sync.
              </p>
            </Link>

            {/* 8. Post-Quantum Rosenpass Dual-KEM VPN */}
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
                Hybrid Post-Quantum key exchange (<code className="text-slate-300">rosenpass</code>) combining Classic
                McEliece 460896 (code-based KEM) + ML-KEM-512 (Kyber-512) with kernel WireGuard, rotating 256-bit PSKs
                every 120 seconds.
              </p>
            </Link>

            {/* 9. Unified OpenLDAP + OIDC SSO Federation */}
            <Link
              href="/docs/identity-openldap-sso"
              className="p-6 rounded-2xl bg-slate-900 border border-amber-500/30 hover:border-amber-500/70 transition space-y-3 group block"
            >
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                  <Users className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30">
                  IDENTITY FEDERATION
                </span>
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition">
                Unified OpenLDAP &amp; OIDC/SAML SSO
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Embedded OpenLDAP multi-provider <code className="text-slate-300">syncrepl</code> and OIDC/SAML SSO with
                zero-touch RBAC &amp; service-account federation across Web UI, K3s, VOW, Vigilante SOC, Eluvix, and
                FreeRADIUS.
              </p>
            </Link>

            {/* 10. KVM/QEMU & LXC Hypervisor */}
            <Link
              href="/docs/kvm-lxc-hypervisor"
              className="p-6 rounded-2xl bg-slate-900 border border-amber-500/30 hover:border-amber-500/70 transition space-y-3 group block"
            >
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                  <Boxes className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30">
                  KVM • LXC • VFIO
                </span>
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition">
                KVM/QEMU, LXC &amp; VFIO Passthrough
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Full hypervisor orchestration (<code className="text-slate-300">virt.yaml</code>) for KVM VMs,
                unprivileged LXC containers with Linux 6.9+ <code className="text-slate-300">BPF_TOKEN</code> mounts,
                VFIO PCIe/GPU &amp; SR-IOV passthrough, VXLAN SDN, and browser noVNC consoles.
              </p>
            </Link>

            {/* 11. 2-Host High Availability + K3s + OpenEBS */}
            <Link
              href="/docs/high-availability#two-host-setup"
              className="p-6 rounded-2xl bg-slate-900 border border-emerald-500/30 hover:border-emerald-500/70 transition space-y-3 group block"
            >
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <ArrowRightLeft className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  2-NODE HA + K3S
                </span>
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition">
                Full-Stack 2-Host HA, K3s &amp; OpenEBS
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Keepalived VRRP + conntrackd FTFW + CSR mTLS PKI + OpenLDAP <code className="text-slate-300">syncrepl</code>{' '}
                + 2-node HA K3s (<code className="text-slate-300">axonwallctl kubeconfig --vip</code> &amp;{' '}
                <code className="text-slate-300">UserNamespacesSupport</code>), OpenEBS CSI, and ZFS Send/Recv.
              </p>
            </Link>

            {/* 12. Etckeeper /etc Git Versioning & Terraform Provider */}
            <Link
              href="/docs/gitops-audit"
              className="p-6 rounded-2xl bg-slate-900 border border-purple-500/30 hover:border-purple-500/70 transition space-y-3 group block"
            >
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                  <GitBranch className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/15 text-purple-300 border border-purple-500/30">
                  GITOPS • TERRAFORM
                </span>
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition">
                Etckeeper /etc Git UI &amp; Terraform Provider
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                12 bidirectional <code className="text-slate-300">/etc/axonwall/*.yaml</code> files, Etckeeper{' '}
                <code className="text-slate-300">/etc</code> Git history &amp; unified diff UI, and the native
                Terraform / OpenTofu provider for declarative fleet IaC.
              </p>
            </Link>

            {/* 13. Neovim Super Configurator & Restricted Operator Shell */}
            <Link
              href="/docs/cli-super-configurator"
              className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 transition space-y-3 group block"
            >
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Terminal className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  TUI • OPSHELL
                </span>
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition">
                Neovim Super Configurator &amp; axonwall-opshell
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Edit all 12 YAML domains via <code className="text-slate-300">axonwall-config</code> with native Vim
                motions, simulate paths in NastyMap, and confine non-root operators with{' '}
                <code className="text-slate-300">axonwall-opshell</code>.
              </p>
            </Link>

            {/* 14. Suricata 7+, CrowdSec & Unbound DNS RPZ */}
            <Link
              href="/docs/threat-defense"
              className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 transition space-y-3 group block"
            >
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                  <Shield className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  FAIL-OPEN IPS
                </span>
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-sky-300 transition">
                Suricata 7+ IPS, CrowdSec &amp; DNS RPZ
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Fail-open NFQUEUE &amp; eBPF Suricata 7+ inspection, CrowdSec LAPI interval-set bouncers, GeoIP/ASN
                prerouting drops, and Unbound DNSSEC Response Policy Zone (RPZ) sinkholing.
              </p>
            </Link>

            {/* 15. N-Port Multi-WAN, CAKE QoS & FRRouting */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Globe className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  SD-WAN • CAKE QOS
                </span>
              </div>
              <h3 className="text-base font-bold text-white">N-Port Multi-WAN, FRRouting &amp; CAKE QoS</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Arbitrary WAN/LAN/OPT topologies, 802.1Q VLANs, and LACP bonds with FRRouting BGP/OSPF/BFD ECMP routing
                and Linux CAKE + IFB ingress shaping to eliminate bufferbloat.
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
                24 Comprehensive Technical Guides
              </h2>
            </div>
            <Link
              href="/docs"
              className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 hover:text-emerald-300"
            >
              Browse All 24 Comprehensive Guides <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <Link
              href="/docs/mcp-ai-control"
              className="p-5 rounded-xl bg-slate-900 border border-purple-500/40 hover:border-purple-500 transition space-y-2 group"
            >
              <div className="font-mono text-[10px] text-purple-400 uppercase">Guardrailed AI Ops</div>
              <div className="font-bold text-white text-sm group-hover:text-purple-300">
                25-Tool MCP Server &amp; Tactical Leases
              </div>
              <p className="text-slate-400 leading-relaxed">
                16 scopes, 16 resources &amp; 25 tools across Firewall (<code className="font-mono">table inet axonwall_mcp</code>),
                Ring-0 eBPF/<code className="font-mono">BPF_TOKEN</code>, KVM/Libvirt, K3s, ZFS NAS &amp; 9-vendor import.
              </p>
            </Link>

            <Link
              href="/docs/vigilante-cyber-ops"
              className="p-5 rounded-xl bg-slate-900 border border-rose-500/40 hover:border-rose-500 transition space-y-2 group"
            >
              <div className="font-mono text-[10px] text-rose-400 uppercase">Autonomous SOC &amp; SOAR</div>
              <div className="font-bold text-white text-sm group-hover:text-rose-300">
                Vigilante Cyber Defense Operations
              </div>
              <p className="text-slate-400 leading-relaxed">
                Active SOAR containment, honeynet deception mesh, PCAP forensics, and 12 modular SOC packages.
              </p>
            </Link>

            <Link
              href="/docs/kvm-lxc-hypervisor"
              className="p-5 rounded-xl bg-slate-900 border border-amber-500/40 hover:border-amber-500 transition space-y-2 group"
            >
              <div className="font-mono text-[10px] text-amber-400 uppercase">Hypervisor Compute</div>
              <div className="font-bold text-white text-sm group-hover:text-amber-300">
                KVM/QEMU, LXC &amp; VFIO Passthrough
              </div>
              <p className="text-slate-400 leading-relaxed">
                Virtual machines, unprivileged LXC <code className="font-mono">BPF_TOKEN</code> containers, PCIe/GPU
                passthrough, VXLAN SDN, and Hosted Edge UKI micro-VMs.
              </p>
            </Link>

            <Link
              href="/docs/identity-openldap-sso"
              className="p-5 rounded-xl bg-slate-900 border border-sky-500/40 hover:border-sky-500 transition space-y-2 group"
            >
              <div className="font-mono text-[10px] text-sky-400 uppercase">Zero-Touch Identity</div>
              <div className="font-bold text-white text-sm group-hover:text-sky-300">
                Unified OpenLDAP &amp; OIDC SSO
              </div>
              <p className="text-slate-400 leading-relaxed">
                Multi-provider <code className="font-mono">syncrepl</code> and automatic RBAC federation across K3s, VOW,
                Vigilante, Eluvix, and RADIUS.
              </p>
            </Link>

            <Link
              href="/docs/edge-uki-ngfw"
              className="p-5 rounded-xl bg-slate-900 border border-emerald-500/40 hover:border-emerald-500 transition space-y-2 group"
            >
              <div className="font-mono text-[10px] text-emerald-400 uppercase">Zero-Shell Perimeter</div>
              <div className="font-bold text-white text-sm group-hover:text-emerald-300">
                Super-Slim Edge NGFW (UEFI UKI)
              </div>
              <p className="text-slate-400 leading-relaxed">
                How <code className="font-mono">CONFIG_MODULES=n</code> and pure-Go PID 1 deliver a 7.1 MB stateless
                firewall booting in &lt;1.2s.
              </p>
            </Link>

            <Link
              href="/docs/eluvix-ai-router"
              className="p-5 rounded-xl bg-slate-900 border border-slate-800 hover:border-purple-500/50 transition space-y-2 group"
            >
              <div className="font-mono text-[10px] text-purple-400 uppercase">Sovereign AI &amp; DLP</div>
              <div className="font-bold text-white text-sm group-hover:text-purple-300">
                Eluvix AI Router &amp; PrivacyGuard
              </div>
              <p className="text-slate-400 leading-relaxed">
                Switchyard 4-tier local/frontier routing, reversible PII/secret tokenization, and 8 agent harnesses.
              </p>
            </Link>

            <Link
              href="/docs/ghost-in-the-ring-rootkits"
              className="p-5 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 transition space-y-2 group"
            >
              <div className="font-mono text-[10px] text-emerald-400 uppercase">Ring-0 Security</div>
              <div className="font-bold text-white text-sm group-hover:text-emerald-300">
                5-Hook BPF-LSM &amp; BPF_TOKEN Mediator
              </div>
              <p className="text-slate-400 leading-relaxed">
                CVE-2026-31431 Copy Fail <code className="font-mono">AF_ALG</code> block, Linux 6.9+{' '}
                <code className="font-mono">BPF_TOKEN</code> Ring-0 gate, and PMU LBR auditing.
              </p>
            </Link>

            <Link
              href="/docs/high-availability#two-host-setup"
              className="p-5 rounded-xl bg-slate-900 border border-slate-800 hover:border-sky-500/50 transition space-y-2 group"
            >
              <div className="font-mono text-[10px] text-sky-400 uppercase">Step-by-Step Cluster</div>
              <div className="font-bold text-white text-sm group-hover:text-sky-300">
                2-Host HA, ZFS &amp; K3s Failover
              </div>
              <p className="text-slate-400 leading-relaxed">
                Cabling, CSR mTLS PKI, Keepalived VRRP, conntrackd, OpenEBS replication, and ZFS Send/Recv walkthrough.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Official Release v0.11.68 & Signed Installation Media Section */}
      <section id="releases" className="py-24 border-t border-slate-800/80 bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                <Download className="w-3.5 h-3.5" /> Official Release • v0.11.68 (2026-11-13 • Signed with Ed25519 &amp; SHA-256)
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                Download Verified v0.11.68 Media
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed">
                Every release artifact is built deterministically from{' '}
                <a href="https://github.com/axonwall/axonwall" className="text-emerald-400 underline">
                  github.com/axonwall/axonwall
                </a>{' '}
                with SHA-256 digests and detached Ed25519 signatures (<code className="text-slate-300 font-mono">.sha256.sig</code>).
                Standard NGFW, Vault S3, and barebones K3s + Storage editions ship together inside the unified ISO.
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
                href="https://github.com/axonwall/axonwall/releases/tag/v0.11.68"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 transition flex items-center gap-2"
              >
                <ExternalLink className="w-3.5 h-3.5 text-emerald-400" /> GitHub v0.11.68
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 1. Unified Bare-Metal Debian 13 ISO */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-emerald-500/40 flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-semibold flex items-center gap-1.5">
                    <HardDrive className="w-3 h-3" /> TRIPLE-EDITION NGFW + VAULT + K3S-STORAGE ISO
                  </span>
                  <span className="text-xs font-mono text-slate-400">1.27 GiB (1,299.2 MB)</span>
                </div>
                <h3 className="text-lg font-bold text-white">Unified Bare-Metal Live/Installer ISO</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Debian 13 Trixie UEFI installer for NGFW, Vault S3 &amp; barebones K3s + OpenEBS Storage editions.
                  Supports pure ZFSBootMenu v3.1.0, mdadm RAID-1 A/B Dual-Root, smart NVMe/SSD/HDD tiering, and LUKS2 + TPM 2.0 auto-unlock.
                </p>
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 font-mono text-[10px] text-slate-400 break-all">
                  SHA256: <span className="text-emerald-400">dda4648fc20ba148b530cc87f55ecfff16329681a1ffb8265304ccfcfb8aa83b</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="https://github.com/axonwall/axonwall/releases/download/v0.11.68/axonwall-debian13-amd64.iso"
                  className="flex-1 py-2.5 px-3 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition text-center flex items-center justify-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" /> axonwall-debian13-amd64.iso
                </a>
                <a
                  href="https://github.com/axonwall/axonwall/releases/download/v0.11.68/axonwall-debian13-amd64.iso.sha256"
                  className="py-2.5 px-2.5 rounded-lg text-[11px] font-mono bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800"
                >
                  .sha256
                </a>
                <a
                  href="https://github.com/axonwall/axonwall/releases/download/v0.11.68/axonwall-debian13-amd64.iso.sha256.sig"
                  className="py-2.5 px-2.5 rounded-lg text-[11px] font-mono bg-slate-950 hover:bg-slate-800 text-emerald-300 border border-emerald-500/30"
                >
                  .sig
                </a>
              </div>
            </div>

            {/* 2. Super-Slim Edge UKI (.efi) */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-sky-500/40 flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-sky-500/15 text-sky-300 border border-sky-500/30 font-semibold flex items-center gap-1.5">
                    <Cpu className="w-3 h-3" /> ZERO-SHELL UKI • PID 1 GO
                  </span>
                  <span className="text-xs font-mono text-slate-400">7.1 MB</span>
                </div>
                <h3 className="text-lg font-bold text-white">Super-Slim Edge NGFW (.efi)</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Single-file UEFI Unified Kernel Image (<code className="text-slate-300">CONFIG_MODULES=n</code>) with{' '}
                  <code className="text-slate-300">axonwall-satellite</code> as PID 1, zero shell, Cloud-Init, Dual-Stack
                  IPv6, and &lt;1.2s RAM boot.
                </p>
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 font-mono text-[10px] text-slate-400 break-all">
                  SHA256: <span className="text-sky-400">81795473dfafad59db093b5c8d2a20bc1bf8e327e7edb3c6b1bf3ef7205298c9</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="https://github.com/axonwall/axonwall/releases/download/v0.11.68/axonwall-edge-sku-vm-virtio.efi"
                  className="flex-1 py-2.5 px-3 rounded-lg text-xs font-semibold bg-sky-600 hover:bg-sky-500 text-white transition text-center flex items-center justify-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" /> axonwall-edge-sku-vm-virtio.efi
                </a>
                <a
                  href="https://github.com/axonwall/axonwall/releases/download/v0.11.68/axonwall-edge-sku-vm-virtio.efi.sha256"
                  className="py-2.5 px-2.5 rounded-lg text-[11px] font-mono bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800"
                >
                  .sha256
                </a>
                <a
                  href="https://github.com/axonwall/axonwall/releases/download/v0.11.68/axonwall-edge-sku-vm-virtio.efi.sha256.sig"
                  className="py-2.5 px-2.5 rounded-lg text-[11px] font-mono bg-slate-950 hover:bg-slate-800 text-sky-300 border border-sky-500/30"
                >
                  .sig
                </a>
              </div>
            </div>

            {/* 3. Cloud QCOW2 Appliance Image */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-purple-500/40 flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-purple-500/15 text-purple-300 border border-purple-500/30 font-semibold flex items-center gap-1.5">
                    <Cloud className="w-3 h-3" /> KVM • PROXMOX • CLOUD-INIT
                  </span>
                  <span className="text-xs font-mono text-slate-400">1.17 GiB (1,194.9 MB)</span>
                </div>
                <h3 className="text-lg font-bold text-white">Cloud-Init QCOW2 Appliance Image</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Pre-built KVM, Proxmox VE, and OpenStack disk image with VirtIO acceleration, zero-touch Cloud-Init
                  reconciler, and background first-boot Slot-B synchronization.
                </p>
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 font-mono text-[10px] text-slate-400 break-all">
                  SHA256: <span className="text-purple-400">10c4ec26051bfe130afe13be4a4a2c644f364c3167e5e2643f14bf596b359415</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="https://github.com/axonwall/axonwall/releases/download/v0.11.68/axonwall-debian13-amd64-cloud.qcow2"
                  className="flex-1 py-2.5 px-3 rounded-lg text-xs font-semibold bg-purple-600 hover:bg-purple-500 text-white transition text-center flex items-center justify-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" /> axonwall-debian13-amd64-cloud.qcow2
                </a>
                <a
                  href="https://github.com/axonwall/axonwall/releases/download/v0.11.68/axonwall-debian13-amd64-cloud.qcow2.sha256"
                  className="py-2.5 px-2.5 rounded-lg text-[11px] font-mono bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800"
                >
                  .sha256
                </a>
                <a
                  href="https://github.com/axonwall/axonwall/releases/download/v0.11.68/axonwall-debian13-amd64-cloud.qcow2.sha256.sig"
                  className="py-2.5 px-2.5 rounded-lg text-[11px] font-mono bg-slate-950 hover:bg-slate-800 text-purple-300 border border-purple-500/30"
                >
                  .sig
                </a>
              </div>
            </div>

            {/* 4. Standalone Debian / Ubuntu AMD64 .deb */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-300 border border-slate-700 font-semibold flex items-center gap-1.5">
                    <Server className="w-3 h-3" /> DEBIAN 12/13 • UBUNTU 24.04
                  </span>
                  <span className="text-xs font-mono text-slate-400">142.3 MB</span>
                </div>
                <h3 className="text-lg font-bold text-white">Standalone AMD64 Package (.deb)</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Install the complete Axonwall daemon, controller, MCP AI server, Web UI, Neovim TUI, and{' '}
                  <code className="text-slate-300">axonwall-opshell</code> onto existing Debian/Ubuntu hosts or OTA slots.
                </p>
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 font-mono text-[10px] text-slate-400 break-all">
                  SHA256: <span className="text-emerald-400">17c8040dabf10dd716447c09a0ecbc61b5d2b6b0a0339a8a73bd940a0e19cfe9</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="https://github.com/axonwall/axonwall/releases/download/v0.11.68/axonwall_0.11.68_amd64.deb"
                  className="flex-1 py-2.5 px-3 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition text-center flex items-center justify-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5 text-emerald-400" /> axonwall_0.11.68_amd64.deb
                </a>
                <a
                  href="https://github.com/axonwall/axonwall/releases/download/v0.11.68/axonwall_0.11.68_amd64.deb.sha256"
                  className="py-2.5 px-2.5 rounded-lg text-[11px] font-mono bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800"
                >
                  .sha256
                </a>
                <a
                  href="https://github.com/axonwall/axonwall/releases/download/v0.11.68/axonwall_0.11.68_amd64.deb.sha256.sig"
                  className="py-2.5 px-2.5 rounded-lg text-[11px] font-mono bg-slate-950 hover:bg-slate-800 text-emerald-300 border border-emerald-500/30"
                >
                  .sig
                </a>
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
              Factory burned-in, pre-loaded with Axonwall v0.11.68 (ZFSBootMenu + TPM 2.0 + Custom Hardened Kernel), and tested for maximum
              thermal reliability. Ships globally with next-day advance hardware replacement.
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
                <p className="text-xs text-slate-400">
                  Silent, fanless aluminum chassis for home labs, branch offices, and edge deployments.
                </p>

                <ul className="text-xs text-slate-300 space-y-2 pt-2 border-t border-slate-800">
                  <li className="flex items-center gap-2">✓ Quad-Core Intel x86 (Fanless)</li>
                  <li className="flex items-center gap-2">✓ 4x 2.5GbE RJ-45 (Intel i226)</li>
                  <li className="flex items-center gap-2">✓ 2x 10GbE SFP+ Ports</li>
                  <li className="flex items-center gap-2">✓ 16GB DDR5 RAM + 128GB NVMe</li>
                  <li className="flex items-center gap-2">✓ Discrete TPM 2.0 + 2.5 Gbps WG</li>
                </ul>
              </div>

              <a
                href="mailto:sales@axonwall.com?subject=Axonwall%20Edge%2010%20Appliance%20Inquiry"
                className="w-full py-2.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white transition border border-slate-700 block text-center"
              >
                Order Edge 10
              </a>
            </div>

            {/* Edge 20-5G */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-6 hover:border-slate-700 transition">
              <div className="space-y-4">
                <span className="px-2.5 py-1 rounded-md text-[10px] font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20 uppercase">
                  Cellular Failover
                </span>
                <h3 className="text-xl font-bold text-white">Axonwall Edge 20-5G</h3>
                <div className="text-3xl font-extrabold text-white font-mono">$899</div>
                <p className="text-xs text-slate-400">
                  Integrated 5G Sub-6 modem with dual SIM redundancy for retail and mobile edge.
                </p>

                <ul className="text-xs text-slate-300 space-y-2 pt-2 border-t border-slate-800">
                  <li className="flex items-center gap-2">✓ Octa-Core x86_64 Processor</li>
                  <li className="flex items-center gap-2">✓ Dual SIM 5G Sub-6 + GNSS</li>
                  <li className="flex items-center gap-2">✓ 4x 2.5GbE + 2x 10GbE SFP+</li>
                  <li className="flex items-center gap-2">✓ 802.3at PoE Power Input</li>
                  <li className="flex items-center gap-2">✓ Out-of-band management</li>
                </ul>
              </div>

              <a
                href="mailto:sales@axonwall.com?subject=Axonwall%20Edge%2020-5G%20Appliance%20Inquiry"
                className="w-full py-2.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white transition border border-slate-700 block text-center"
              >
                Order Edge 20-5G
              </a>
            </div>

            {/* Rack 100 */}
            <div className="p-6 rounded-2xl bg-slate-900 border-2 border-emerald-500/50 shadow-xl shadow-emerald-950/20 flex flex-col justify-between space-y-6 relative">
              <div className="space-y-4">
                <span className="px-2.5 py-1 rounded-md text-[10px] font-semibold bg-emerald-500 text-black uppercase font-bold">
                  Most Popular
                </span>
                <h3 className="text-xl font-bold text-white">Axonwall Rack 100</h3>
                <div className="text-3xl font-extrabold text-white font-mono">$1,699</div>
                <p className="text-xs text-slate-400">
                  1U rackmount appliance for medium enterprises, schools, and central headquarters.
                </p>

                <ul className="text-xs text-slate-300 space-y-2 pt-2 border-t border-slate-800">
                  <li className="flex items-center gap-2">✓ Intel Xeon D 8-Core / 16-Thread</li>
                  <li className="flex items-center gap-2">✓ 8x 2.5GbE + 4x 10GbE SFP+</li>
                  <li className="flex items-center gap-2">✓ 32GB ECC RAM + Dual NVMe ZBM Mirror</li>
                  <li className="flex items-center gap-2">✓ Dual Redundant 300W PSUs</li>
                  <li className="flex items-center gap-2">✓ 10 Gbps WireGuard &amp; IMIX NAT</li>
                </ul>
              </div>

              <a
                href="mailto:sales@axonwall.com?subject=Axonwall%20Rack%20100%20Appliance%20Inquiry"
                className="w-full py-2.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition shadow-lg shadow-emerald-950/60 block text-center"
              >
                Order Rack 100
              </a>
            </div>

            {/* Core HA Cluster */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-6 hover:border-slate-700 transition">
              <div className="space-y-4">
                <span className="px-2.5 py-1 rounded-md text-[10px] font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20 uppercase">
                  Datacenter HA Pair
                </span>
                <h3 className="text-xl font-bold text-white">Axonwall Core HA</h3>
                <div className="text-3xl font-extrabold text-white font-mono">$7,999</div>
                <p className="text-xs text-slate-400">
                  Turnkey active/standby dual 1U HA pair with 100GbE QSFP28 and sub-second failover.
                </p>

                <ul className="text-xs text-slate-300 space-y-2 pt-2 border-t border-slate-800">
                  <li className="flex items-center gap-2">✓ 2x 1U Clustered Appliances</li>
                  <li className="flex items-center gap-2">✓ AMD EPYC 16-Core / 32-Thread</li>
                  <li className="flex items-center gap-2">✓ 4x 25GbE SFP28 + 2x 100GbE QSFP28</li>
                  <li className="flex items-center gap-2">✓ Conntrackd &amp; ZFS 100GbE DAC Link</li>
                  <li className="flex items-center gap-2">✓ Dedicated IPMI / BMC management</li>
                </ul>
              </div>

              <a
                href="mailto:sales@axonwall.com?subject=Axonwall%20Core%20HA%20Cluster%20Inquiry"
                className="w-full py-2.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white transition border border-slate-700 block text-center"
              >
                Contact Enterprise Sales
              </a>
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
              100% open source GPLv2 Community Edition for everyone, with certified long-term support and commercial
              threat feeds for mission-critical enterprise deployments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Community Edition */}
            <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white">Community Edition</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    For homelabs, developers, and self-supported deployments.
                  </p>
                  <div className="text-4xl font-extrabold text-white font-mono mt-4">
                    $0 <span className="text-sm font-normal text-slate-500">/ forever</span>
                  </div>
                </div>

                <ul className="text-xs text-slate-300 space-y-3 pt-4 border-t border-slate-800">
                  <li className="flex items-center gap-2 text-emerald-400">✓ 100% Free &amp; Open Source (GNU GPLv2)</li>
                  <li className="flex items-center gap-2">✓ All 5 Core Roles (NGFW, ZFS, K3s, KVM, Vigilante)</li>
                  <li className="flex items-center gap-2">✓ Rosenpass PQ-KEM, CO-RE BPF-LSM &amp; Coroot eBPF</li>
                  <li className="flex items-center gap-2">✓ MCP Security AI, Eluvix DLP &amp; Terraform Provider</li>
                  <li className="flex items-center gap-2">✓ Community GitHub Discussions &amp; Docs</li>
                </ul>
              </div>

              <Link
                href="/releases"
                className="w-full py-3 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white transition border border-slate-700 block text-center"
              >
                Download Community ISO (v0.11.68)
              </Link>
            </div>

            {/* Business Edition */}
            <div className="p-8 rounded-2xl bg-slate-900 border-2 border-emerald-500 shadow-xl shadow-emerald-950/30 flex flex-col justify-between space-y-6 relative">
              <div className="absolute top-0 right-8 -translate-y-1/2 bg-emerald-500 text-black px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider">
                Recommended for Production
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white">Business Edition</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Hardened, validated release channel for commercial environments.
                  </p>
                  <div className="text-4xl font-extrabold text-white font-mono mt-4">
                    $249 <span className="text-sm font-normal text-slate-500">/ appliance / year</span>
                  </div>
                </div>

                <ul className="text-xs text-slate-300 space-y-3 pt-4 border-t border-slate-800">
                  <li className="flex items-center gap-2 text-emerald-400">✓ Everything in Community, plus:</li>
                  <li className="flex items-center gap-2">✓ Hardened Quarterly LTS update stream</li>
                  <li className="flex items-center gap-2">✓ Automated hardware regression QA</li>
                  <li className="flex items-center gap-2">✓ Commercial Threat Intelligence &amp; YARA Feeds</li>
                  <li className="flex items-center gap-2">✓ MaxMind GeoIP2 + CrowdSec CTI</li>
                  <li className="flex items-center gap-2">✓ Encrypted Cloud Config Vault</li>
                </ul>
              </div>

              <a
                href="mailto:sales@axonwall.com?subject=Axonwall%20Business%20Edition%20Inquiry"
                className="w-full py-3 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition shadow-lg shadow-emerald-950/60 block text-center"
              >
                Subscribe to Business Edition
              </a>
            </div>

            {/* Enterprise Support */}
            <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white">Enterprise SLA Support</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    24/7 mission-critical response for enterprise and government clusters.
                  </p>
                  <div className="text-4xl font-extrabold text-white font-mono mt-4">
                    $1,499 <span className="text-sm font-normal text-slate-500">/ node / year</span>
                  </div>
                </div>

                <ul className="text-xs text-slate-300 space-y-3 pt-4 border-t border-slate-800">
                  <li className="flex items-center gap-2 text-emerald-400">✓ Everything in Business Edition, plus:</li>
                  <li className="flex items-center gap-2">✓ 24x7x365 Emergency Phone &amp; Ticket SLA</li>
                  <li className="flex items-center gap-2">✓ 2-hour response time guarantee</li>
                  <li className="flex items-center gap-2">✓ Named Technical Account Manager (TAM)</li>
                  <li className="flex items-center gap-2">✓ Architecture review &amp; 2-Host HA onboarding</li>
                  <li className="flex items-center gap-2">✓ Next-business-day hardware advance swap</li>
                </ul>
              </div>

              <a
                href="mailto:sales@axonwall.com?subject=Axonwall%20Enterprise%20SLA%20Support%20Inquiry"
                className="w-full py-3 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white transition border border-slate-700 block text-center"
              >
                Contact Enterprise Support
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Migration Section (All 9 Importers) */}
      <section id="migration" className="py-20 border-t border-slate-800/80 bg-slate-950/60">
        <div className="max-w-5xl mx-auto px-6 text-center space-y-6">
          <div className="inline-flex p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <FileCode className="w-6 h-6" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Migrate from 9 Firewalls, Hypervisors &amp; NAS Appliances in 30 Seconds
          </h2>
          <p className="text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Unified Appliance Migration Studio parses configurations across 9 platforms—including{' '}
            <strong className="text-slate-200">OPNsense, pfSense, Proxmox VE 8.x, and TrueNAS SCALE</strong>—performing
            mathematical rule-shadowing &amp; subnet-collision audits while non-destructively merging aliases, NAT, KVM
            VMs, LXC containers, and OpenZFS pools/shares into <code className="text-slate-300">/etc/axonwall/*.yaml</code>.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            {MIGRATION_IMPORTERS.map((imp) => (
              <span
                key={imp}
                className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-emerald-300"
              >
                ✓ {imp}
              </span>
            ))}
          </div>

          <div className="pt-2">
            <Link
              href="/docs/migration"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
            >
              Explore All 9 Migration Importers <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
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
                Linux 6.12 LTS delivers day-one hardware drivers (5G cellular, Wi-Fi 7, 100GbE NICs), lockless multi-core
                scalability via <code className="text-slate-300">nftables</code> and Dual-Stack QinQ VLAN XDP, 5-hook
                Ring-0 <code className="text-slate-300">CO-RE BPF-LSM</code> security + Linux 6.9+{' '}
                <code className="text-slate-300">BPF_TOKEN_CREATE</code> delegation, Coroot eBPF APM, and native support
                for OpenZFS, KVM/QEMU, LXC, and K3s Kubernetes.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <h3 className="font-bold text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-emerald-400" /> Can I install Axonwall on my own PC, server, or Proxmox VM?
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Yes. Axonwall Community Edition is 100% open source (GNU GPLv2) and ships as a unified bare-metal UEFI
                ISO (supporting pure ZFSBootMenu v3.1.0 Root-on-ZFS, mdadm RAID-1 A/B Dual-Root, and Rolling modes), a
                7.1 MB Zero-Shell Edge UKI (<code className="text-slate-300">.efi</code>), a Cloud-Init QCOW2 image for
                Proxmox/KVM, and a standalone <code className="text-slate-300">.deb</code> package.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <h3 className="font-bold text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-emerald-400" /> How does two-host High Availability work in Axonwall?
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Two Axonwall nodes peer via Keepalived VRRP for sub-second VIP failover,{' '}
                <code className="text-slate-300">conntrackd</code> FTFW for zero-drop state sync, CSR-based ECDSA P-256
                mTLS PKI for configuration &amp; SQLite WAL replication, Chrony symmetric NTP, OpenLDAP{' '}
                <code className="text-slate-300">syncrepl</code>, 2-node K3s + OpenEBS volume replication, and
                incremental OpenZFS Send/Recv. See the{' '}
                <Link href="/docs/high-availability#two-host-setup" className="text-emerald-400 underline">
                  Step-by-Step 2-Host Setup Guide
                </Link>
                .
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <h3 className="font-bold text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-emerald-400" /> How are AI and MCP actions kept safe on a production firewall?
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                The Model Context Protocol server (<code className="text-slate-300">axonwall-mcp</code>) ships disabled
                by default behind a hard kill switch. When enabled by an administrator, its 16 capability scopes, 16
                resources, and 25 tools spanning Firewall, Ring-0 eBPF/<code className="text-slate-300">BPF_TOKEN</code>,
                KVM/Libvirt, K3s Etcd, OpenZFS NAS, and 9-vendor Migration enforce dual TypeScript + Go blast-radius validators, isolated
                auto-expiring TTL blocks (<code className="text-slate-300">table inet axonwall_mcp</code> &amp; LPM CIDR{' '}
                <code className="text-slate-300">XDP_DROP</code>), and mandatory 60-second Commit-Confirm rollback
                protection on any DesiredState proposal.
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
              <span className="hidden sm:inline">
                — Sovereign Linux NGFW, OpenZFS NAS, K3s, KVM &amp; Autonomous AI SOC.
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <Link href="/docs" className="hover:text-slate-300 transition">Docs (25 Guides)</Link>
            <Link href="/releases" className="hover:text-slate-300 transition">Releases (v0.11.68)</Link>
            <Link href="/docs/custom-kernel" className="hover:text-slate-300 transition">Custom Kernel</Link>
            <Link href="/docs/mcp-ai-control" className="hover:text-slate-300 transition">MCP AI</Link>
            <Link href="/docs/vigilante-cyber-ops" className="hover:text-slate-300 transition">Vigilante SOC</Link>
            <Link href="/docs/ghost-in-the-ring-rootkits" className="hover:text-slate-300 transition">BPF-LSM Guard</Link>
            <Link href="/architecture" className="hover:text-slate-300 transition">Architecture</Link>
            <a href="https://github.com/axonwall/axonwall" className="hover:text-slate-300 transition">GitHub</a>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 mt-8 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-600">
          <p>© {new Date().getFullYear()} Axonwall Project. Licensed under GNU GPLv2.</p>
          <p>
            OPNsense is a trademark of Deciso B.V. pfSense is a trademark of Netgate. Axonwall is an independent
            open-source project.
          </p>
        </div>
      </footer>
    </div>
  );
}
