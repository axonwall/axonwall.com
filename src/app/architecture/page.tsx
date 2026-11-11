import React from 'react';
import Link from 'next/link';
import {
  Shield,
  Cpu,
  Layers,
  ArrowRightLeft,
  Activity,
  FileCode,
  Terminal,
  GitBranch,
  ArrowRight,
  KeyRound,
  Bug,
  Database,
  Bot,
  Boxes,
  ShieldAlert,
  HardDrive,
} from 'lucide-react';
import { Navbar } from '../../components/Navbar';

export const metadata = {
  title: 'Axonwall Architecture | v0.11.64 System Design & Ring-0 Blueprint',
  description:
    'Detailed architectural blueprint of Axonwall v0.11.64: 5 modular core roles, 12 bidirectional /etc/axonwall/*.yaml files, Linux 6.12 LTS nftables & XDP data plane, CO-RE BPF-LSM Ring-0 exploit guard, ZFSBootMenu v3.1.0 & A/B Dual-Root boot, Coroot eBPF APM, and isolated MCP tactical leases.',
};

const YAML_DOMAINS = [
  { file: 'system.yaml', scope: 'Hostname, 5 core roles, plugins, AI copilot, Eluvix, Coroot eBPF APM, SNMP, UPS & ACME' },
  { file: 'interfaces.yaml', scope: 'NIC bindings, 802.1Q/802.1ad VLANs, bridges, LACP bonds, CARP/VRRP VIPs & VRFs' },
  { file: 'firewall.yaml', scope: 'Aliases, stateful nftables rules, SNAT/DNAT/Hairpin/1:1 BINAT/NPTv6 & CAKE/FQ-CoDel QoS' },
  { file: 'routing.yaml', scope: 'Gateways, Multi-WAN failover/ECMP groups, static routes & FRR (BGP/OSPF/BFD)' },
  { file: 'services.yaml', scope: 'Kea DHCPv4/v6 IA_PD + radvd SLAAC, Unbound RPZ, mDNS, UPnP/NAT-PMP, HAProxy & RADIUS' },
  { file: 'vpn.yaml', scope: 'WireGuard, Rosenpass Dual-KEM (McEliece + ML-KEM-512), strongSwan IPsec, OpenVPN DCO & Headscale' },
  { file: 'security.yaml', scope: 'Suricata 7+, CrowdSec, GeoIP, Zero-Trust IAP, OIDC/LDAP SSO, 5-Hook BPF-LSM & BPF_TOKEN' },
  { file: 'ha.yaml', scope: '2-Host VRRP + conntrackd + CSR mTLS PKI state sync & Satellite Fleet manager' },
  { file: 'storage.yaml', scope: 'OpenZFS pools + Special NVMe VDEVs, AES-256-GCM, Checkpoints/TRIM, Time Machine, Cloud Sync & S3' },
  { file: 'k3s.yaml', scope: 'Embedded HA K3s, Cilium eBPF CNI + Hubble, Etcd S3 snapshots, UserNS + BPF_TOKEN & OpenEBS CSI' },
  { file: 'virt.yaml', scope: 'KVM/QEMU VMs, VirtioFS, Linked Clones, Live Migrate, Libvirt XML, LXC + BPF_TOKEN, VFIO & Edge UKI' },
  { file: 'vigilante.yaml', scope: 'Autonomous SOAR containment, honeynet deception mesh, PCAP forensics & 12 SOC packages' },
];

export default function StandaloneArchitecturePage() {
  return (
    <div className="min-h-screen bg-[#080c14] text-slate-100 selection:bg-emerald-500 selection:text-black">
      {/* Background glow header */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[650px] radial-glow pointer-events-none -z-10" />

      {/* Navigation */}
      <Navbar />

      {/* Main Architecture Content */}
      <main className="max-w-6xl mx-auto px-6 py-16 space-y-16">
        {/* Hero Section */}
        <div className="text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            System Blueprint &amp; Technical Specification • v0.11.64
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight max-w-4xl mx-auto leading-tight">
            The Linux-Native{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400">
              Hyper-Converged Security Engine
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Axonwall v0.11.64 unifies 5 modular core roles, 12 bidirectional{' '}
            <code className="text-slate-200 font-mono">/etc/axonwall/*.yaml</code> files, lockless Linux 6.12 LTS
            nftables + Dual-Stack VLAN/LPM CIDR/SYN-Flood XDP packet processing, 5-hook CO-RE BPF-LSM &amp; Linux 6.9+{' '}
            <code className="text-slate-200 font-mono">BPF_TOKEN_CREATE</code> mediation, pure UEFI ZFSBootMenu v3.1.0,
            and a guardrailed 24-tool MCP AI control plane.
          </p>
        </div>

        {/* System Diagram */}
        <section className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-emerald-400" /> Control Plane, Ring-0 &amp; Converged Data Plane
          </h2>
          <pre className="p-5 sm:p-6 rounded-xl bg-black/60 border border-slate-800/80 text-emerald-400 font-mono text-[11px] sm:text-xs overflow-x-auto leading-relaxed">
{` ┌───────────────────────────────────────────────────────────────────────────────────┐
 │  Next.js Console (:2966 TLS) • Neovim TUI (axonwall-config) • Terraform Provider  │
 │  OpenLDAP Multi-Provider syncrepl • OIDC/SAML SSO • 16-Scope / 24-Tool MCP Server │
 └─────────────────────────────────────────┬─────────────────────────────────────────┘
                                           │ Bidirectional 12x /etc/axonwall/*.yaml
                                           │ + Etckeeper /etc Git + Zod Schema Lock
                                           ▼
 ┌───────────────────────────────────────────────────────────────────────────────────┐
 │              Controller (TypeScript) & Privileged Go Daemon (axonwalld)           │
 │       60s Commit-Confirm Watchdog • CSR mTLS HA Engine • Operator-CA Vault        │
 └──────┬──────────────────────────┬──────────────────────────┬──────────────────────┘
        ▼                          ▼                          ▼
 ┌──────────────────────┐  ┌────────────────────────┐  ┌─────────────────────────────┐
 │ Linux 6.12 Dataplane │  │ Ring-0 BPF & Threat AI │  │ 5 Modular Converged Roles   │
 │ • Dual-Stack VLAN XDP│  │ • 5-Hook CO-RE BPF-LSM │  │ • core-firewall (NGFW/FRR)  │
 │ • table inet axonwall│  │   + BPF_TOKEN (6.9+)   │  │ • core-nas (ZFS+ARC/ZIL+S3) │
 │ • table inet         │  │   (CVE-2026-31431 /    │  │ • core-k3s (UserNS+OpenEBS) │
 │   axonwall_mcp (TTL) │  │    io_uring / UserNS)  │  │ • core-virt (KVM/LXC/VFIO)  │
 │ • Rosenpass ML-KEM   │  │ • Coroot eBPF L7 APM   │  │ • core-vigilante (SOAR/SOC) │
 │ • Keepalived + FTFW  │  │ • Suricata 7+ & 8 AVs  │  │ • ZFSBootMenu v3.1.0 & A/B  │
 └──────────────────────┘  └────────────────────────┘  └─────────────────────────────┘`}
          </pre>
        </section>

        {/* 12 Declarative /etc/axonwall/*.yaml Files */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                Single Source of Truth
              </span>
              <h2 className="text-2xl font-bold text-white mt-1">
                12 Bidirectional <code className="font-mono text-emerald-300">/etc/axonwall/*.yaml</code> Domains
              </h2>
            </div>
            <Link
              href="/docs/gitops-audit"
              className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold inline-flex items-center gap-1"
            >
              GitOps, Etckeeper &amp; YAML Docs <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Every edit made in the Web Console, Neovim Super Configurator (<code className="text-slate-200 font-mono">axonwall-config</code>),
            Terraform provider, or <code className="text-slate-200 font-mono">vim /etc/axonwall/*.yaml</code> compiles
            through the same Zod DesiredState schema validator, stages under the 60-second Commit-Confirm watchdog, and
            versions <code className="text-slate-200 font-mono">/etc</code> via Etckeeper Git.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
            {YAML_DOMAINS.map((d) => (
              <div key={d.file} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
                <div className="font-mono font-bold text-emerald-400">/etc/axonwall/{d.file}</div>
                <p className="text-slate-400 text-[11px] leading-relaxed">{d.scope}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Core Architectural Pillars Grid */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-white text-center">Core Architectural Pillars</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl bg-slate-900/40 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2.5 font-bold text-white text-base">
                <Cpu className="w-5 h-5 text-emerald-400" />
                <span>Dual-Stack QinQ VLAN XDP &amp; Multi-Core nftables</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Pre-conntrack eBPF/XDP peels 2-layer <code className="text-slate-200">802.1Q/802.1ad</code> VLANs,
                tracks IPv4/IPv6 flows in <code className="text-slate-200">BPF_MAP_TYPE_LRU_HASH</code> maps, and
                executes monotonic TTL <code className="text-slate-200">XDP_DROP</code> bans while Netfilter flowtables
                forward stateful traffic locklessly inside <code className="text-slate-200">table inet axonwall</code>.
              </p>
              <Link
                href="/docs/architecture"
                className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold inline-flex items-center gap-1"
              >
                Read data plane deep dive <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="p-6 rounded-xl bg-slate-900/40 border border-emerald-500/30 space-y-3">
              <div className="flex items-center gap-2.5 font-bold text-white text-base">
                <Bug className="w-5 h-5 text-emerald-400" />
                <span>5-Hook CO-RE BPF-LSM &amp; Linux 6.9+ BPF_TOKEN Mediator</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Five CO-RE BPF-LSM hooks (<code className="text-slate-200">lsm/socket_bind</code>,{' '}
                <code className="text-slate-200">lsm/bpf</code>, <code className="text-slate-200">lsm/uring_sqpoll</code>,{' '}
                <code className="text-slate-200">lsm/bpf_token_create</code>,{' '}
                <code className="text-slate-200">lsm/bpf_token_cmd</code>) block Copy Fail CVE-2026-31431, syscall-less{' '}
                <code className="text-slate-200">io_uring</code> implants, and cross-tenant UserNS{' '}
                <code className="text-slate-200">bpf_probe_read_kernel()</code> escapes while delegating safe networking
                eBPF to rootless K3s &amp; LXC containers.
              </p>
              <Link
                href="/docs/ghost-in-the-ring-rootkits"
                className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold inline-flex items-center gap-1"
              >
                Ring-0 BPF-LSM &amp; Rootkit guide <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="p-6 rounded-xl bg-slate-900/40 border border-purple-500/30 space-y-3">
              <div className="flex items-center gap-2.5 font-bold text-white text-base">
                <Bot className="w-5 h-5 text-purple-400" />
                <span>Guardrailed 24-Tool MCP AI Across All 5 Duties</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                <code className="text-slate-200">axonwall-mcp</code> (disabled by default via hard kill switch) exposes{' '}
                <strong className="text-slate-200">16 capability scopes, 16 read-only resources, and 25 guardrailed tools</strong>{' '}
                spanning Firewall (<code className="text-slate-200">table inet axonwall_mcp</code> TTL leases), Ring-0
                eBPF/<code className="text-slate-200">BPF_TOKEN</code>, KVM/Libvirt, K3s Etcd, OpenZFS NAS &amp; 9-vendor import.
              </p>
              <Link
                href="/docs/mcp-ai-control"
                className="text-xs text-purple-400 hover:text-purple-300 font-semibold inline-flex items-center gap-1"
              >
                MCP Security AI architecture <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="p-6 rounded-xl bg-slate-900/40 border border-sky-500/30 space-y-3">
              <div className="flex items-center gap-2.5 font-bold text-white text-base">
                <HardDrive className="w-5 h-5 text-sky-400" />
                <span>ZFSBootMenu v3.1.0, A/B Dual-Root &amp; Zero-Shell UKI</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Choose pure UEFI ZFSBootMenu v3.1.0 Boot Environments (<code className="text-slate-200">axonwallctl zbm</code>{' '}
                with mirrored ESPs &amp; 5 boot palettes), mdadm RAID-1 A/B Dual-Root (<code className="text-slate-200">axon_root_a/b</code>{' '}
                + Cloud QCOW2 firstboot Slot-B sync) with LUKS2 TPM 2.0 PCR <code className="text-slate-200">0+2+7</code>,
                or the 7.1 MB stateless Edge UKI (<code className="text-slate-200">axonwall-satellite</code> PID 1).
              </p>
              <Link
                href="/docs/installer-raid-zfs"
                className="text-xs text-sky-400 hover:text-sky-300 font-semibold inline-flex items-center gap-1"
              >
                Boot &amp; Storage architectures <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="p-6 rounded-xl bg-slate-900/40 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2.5 font-bold text-white text-base">
                <KeyRound className="w-5 h-5 text-emerald-400" />
                <span>Post-Quantum Rosenpass Dual-KEM VPN</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Pairs Classic McEliece 460896 (code-based KEM) + ML-KEM-512 / Kyber-512 (lattice-based KEM) with
                in-kernel Linux WireGuard, rotating 256-bit Pre-Shared Keys every 120 seconds against
                Harvest-Now-Decrypt-Later quantum adversaries with zero data-plane overhead.
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
                <ArrowRightLeft className="w-5 h-5 text-emerald-400" />
                <span>2-Host Full-Stack HA &amp; OpenLDAP Federation</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Active/passive clustering with Keepalived VRRP, conntrackd FTFW state sync, CSR-based ECDSA P-256 HA PKI
                mTLS, Operator-CA preservation, Chrony symmetric NTP, OpenLDAP <code className="text-slate-200">syncrepl</code>{' '}
                (federating K3s, VOW, Vigilante, Eluvix &amp; RADIUS), 2-node HA K3s + OpenEBS, and ZFS Send/Recv.
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
                <Activity className="w-5 h-5 text-emerald-400" />
                <span>Coroot eBPF APM &amp; OpenZFS ARC/ZIL Telemetry</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Kernel tracepoints, optional TLS uprobes, and 99 Hz FlameGraphs inspect L7 HTTP, gRPC, SQL, Redis, and
                Kafka flows alongside <code className="text-slate-200">/proc/spl/kstat/zfs</code> ARC/L2ARC/ZIL storage
                metrics and automated RCA checks.
              </p>
              <Link
                href="/docs/observability"
                className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold inline-flex items-center gap-1"
              >
                eBPF &amp; Observability docs <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="p-6 rounded-xl bg-slate-900/40 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2.5 font-bold text-white text-base">
                <Boxes className="w-5 h-5 text-emerald-400" />
                <span>5 Modular Core Roles: NAS, K3s, KVM &amp; Vigilante SOC</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Scale from <code className="text-slate-200">core-firewall</code> alone to converged{' '}
                <code className="text-slate-200">core-nas</code> (OpenZFS + SeaweedFS S3),{' '}
                <code className="text-slate-200">core-k3s</code> (OpenEBS + VOW),{' '}
                <code className="text-slate-200">core-virt</code> (KVM/LXC/VFIO), and{' '}
                <code className="text-slate-200">core-vigilante</code> (Autonomous SOAR, honeynet &amp; PCAP forensics).
              </p>
              <Link
                href="/docs/modular-architecture"
                className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold inline-flex items-center gap-1"
              >
                Modular Core Roles guide <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="p-8 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-sky-950/40 border border-emerald-500/30 text-center space-y-6">
          <h2 className="text-3xl font-extrabold text-white">Ready to deploy Axonwall v0.11.64?</h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto">
            Explore all 24 engineering guides, test the interactive Web Console sandbox, or download the Ed25519-signed
            unified NGFW + Vault ISO.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/docs"
              className="px-6 py-2.5 rounded-xl font-semibold text-xs bg-emerald-600 hover:bg-emerald-500 text-white transition shadow-lg shadow-emerald-950/60"
            >
              Explore All 24 Guides
            </Link>
            <Link
              href="/demo/"
              className="px-6 py-2.5 rounded-xl font-semibold text-xs bg-slate-900 hover:bg-slate-800 text-emerald-300 border border-emerald-500/40 transition"
            >
              Launch Live Demo Sandbox
            </Link>
            <Link
              href="/releases"
              className="px-6 py-2.5 rounded-xl font-semibold text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
            >
              Releases &amp; Download ISO (v0.11.64)
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
            <span>— Sovereign Linux NGFW, OpenZFS NAS, K3s, KVM &amp; Autonomous AI SOC.</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-slate-300 transition">Home</Link>
            <Link href="/docs" className="hover:text-slate-300 transition">Docs</Link>
            <Link href="/releases" className="hover:text-slate-300 transition">Releases (v0.11.64)</Link>
            <a href="https://github.com/axonwall/axonwall" className="hover:text-slate-300 transition">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
