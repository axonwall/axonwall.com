'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Download,
  CheckCircle2,
  Cpu,
  HardDrive,
  Server,
  Cloud,
  Lock,
  Terminal,
  ExternalLink,
  Copy,
  Check,
  ArrowRight,
  RefreshCw,
} from 'lucide-react';
import { Navbar } from '../../components/Navbar';
import { Logo } from '../../components/Logo';

interface ReleaseArtifact {
  id: string;
  title: string;
  subtitle: string;
  filename: string;
  size: string;
  badge: string;
  badgeColor: string;
  icon: any;
  sha256: string;
  downloadUrl: string;
  sha256Url: string;
  sigUrl: string;
  highlights: string[];
  extraAsset?: {
    filename: string;
    size: string;
    sha256: string;
    downloadUrl: string;
  };
}

const RELEASE_ARTIFACTS: ReleaseArtifact[] = [
  {
    id: 'iso-unified',
    title: 'Unified Bare-Metal NGFW + Vault Edition ISO (Debian 13)',
    subtitle:
      'Bootable UEFI Live/Installer ISO for bare-metal x86_64 routers, servers, and mini-PCs — select Standard NGFW or Immutable S3 Vault Edition during install',
    filename: 'axonwall-debian13-amd64.iso',
    size: '1.21 GiB (1,238.2 MB)',
    badge: 'RECOMMENDED • UNIFIED NGFW + VAULT',
    badgeColor: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    icon: HardDrive,
    sha256: '8c4bb98fda1f304d02e7c91dd629e88c7253578dccaec3c22b62b7320cdaf44d',
    downloadUrl: 'https://github.com/axonwall/axonwall/releases/download/v0.11.64/axonwall-debian13-amd64.iso',
    sha256Url: 'https://github.com/axonwall/axonwall/releases/download/v0.11.64/axonwall-debian13-amd64.iso.sha256',
    sigUrl: 'https://github.com/axonwall/axonwall/releases/download/v0.11.64/axonwall-debian13-amd64.iso.sha256.sig',
    highlights: [
      'Pure ZFSBootMenu v3.1.0 direct UEFI Root-on-ZFS, A/B Dual-Root (mdadm RAID-1), or Single-Root Rolling modes',
      'Unified 5-step TUI & unattended YAML installer (axonwall-console --install) with NGFW + SeaweedFS S3 Vault editions',
      'Smart NVMe/SSD/HDD disk tiering (SLOG/L2ARC/spares), LUKS2 + TPM 2.0 PCR 0+2+7 auto-unlock, 5-hook CO-RE BPF-LSM & Linux 6.9+ BPF_TOKEN mediator',
    ],
  },
  {
    id: 'edge-uki',
    title: 'Super-Slim Edge NGFW (Single-File UEFI UKI)',
    subtitle:
      'Zero-shell stateless perimeter UKI with Linux 6.12 LTS (CONFIG_MODULES=n), pure-Go PID 1 (axonwall-satellite), and <1.2s RAM boot',
    filename: 'axonwall-edge-sku-vm-virtio.efi',
    size: '7.1 MB',
    badge: 'ZERO-SHELL UKI • PID 1 GO',
    badgeColor: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
    icon: Cpu,
    sha256: '6c621e90754fc7879f4cf5a040aea811a0ba9cb0e57bb80e26bd02e5d8aaecab',
    downloadUrl: 'https://github.com/axonwall/axonwall/releases/download/v0.11.64/axonwall-edge-sku-vm-virtio.efi',
    sha256Url: 'https://github.com/axonwall/axonwall/releases/download/v0.11.64/axonwall-edge-sku-vm-virtio.efi.sha256',
    sigUrl: 'https://github.com/axonwall/axonwall/releases/download/v0.11.64/axonwall-edge-sku-vm-virtio.efi.sha256.sig',
    highlights: [
      'Zero userland, zero shell (/bin/sh, bash, busybox, sshd stripped), and complete loadable-kernel-module immunity',
      'Pure-Go Netlink nftables/WireGuard data plane + RFC 8415 DHCPv6 IA_NA/IA_PD & RFC 4861 Router Advertisements',
      'Autonomous pure-Go Cloud-Init (NoCloud, ConfigDrive, QEMU fw_cfg, AWS/GCP/Azure/OpenStack IMDS) + hardware watchdog HA',
    ],
    extraAsset: {
      filename: 'axonwall-edge-sku-vm-virtio-initramfs.cpio.gz',
      size: '3.6 MB',
      sha256: '9204c9f9ac77889c6e201320cf6f2919003026c78809d1f83315d03cb115b40b',
      downloadUrl:
        'https://github.com/axonwall/axonwall/releases/download/v0.11.64/axonwall-edge-sku-vm-virtio-initramfs.cpio.gz',
    },
  },
  {
    id: 'cloud-qcow2',
    title: 'Cloud & Hypervisor QCOW2 Appliance Image',
    subtitle:
      'Cloud-Init ready disk image for KVM/QEMU, Proxmox VE, OpenStack, Hetzner, AWS, and GCP with background Slot-B first-boot sync',
    filename: 'axonwall-debian13-amd64-cloud.qcow2',
    size: '1.11 GiB (1,132.6 MB)',
    badge: 'KVM • PROXMOX VE • OPENSTACK',
    badgeColor: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
    icon: Cloud,
    sha256: 'aa27acbcd73e055e61c25c07ea16468dd5aa84acd10853388f38971f3fb0f703',
    downloadUrl: 'https://github.com/axonwall/axonwall/releases/download/v0.11.64/axonwall-debian13-amd64-cloud.qcow2',
    sha256Url:
      'https://github.com/axonwall/axonwall/releases/download/v0.11.64/axonwall-debian13-amd64-cloud.qcow2.sha256',
    sigUrl:
      'https://github.com/axonwall/axonwall/releases/download/v0.11.64/axonwall-debian13-amd64-cloud.qcow2.sha256.sig',
    highlights: [
      'Instant import into Proxmox VE (qm importdisk) and libvirt/QEMU with VirtIO-SCSI, VirtIO-Net, and QEMU guest agent',
      'Background first-boot Slot-B synchronization establishes full A/B Dual-Root rollback parity without delaying first login',
      'Zero-touch Cloud-Init reconciler (#cloud-config axonwall:) + exportable seed ISOs via axonwallctl cloudinit export --iso',
    ],
  },
  {
    id: 'debian-deb',
    title: 'Standalone Debian / Ubuntu AMD64 Package (.deb)',
    subtitle:
      'Install Axonwall on existing Debian 12/13 or Ubuntu 24.04 x86_64 hosts, or apply verified OTA A/B & ZFSBootMenu upgrades',
    filename: 'axonwall_0.11.64_amd64.deb',
    size: '82.2 MB',
    badge: 'DEBIAN 12/13 • UBUNTU 24.04',
    badgeColor: 'bg-slate-800 text-slate-300 border-slate-700',
    icon: Server,
    sha256: '6864c004ba550c1822b61303a04aeaaf3bc7d0a0717ad6532c3244af6ce176bc',
    downloadUrl: 'https://github.com/axonwall/axonwall/releases/download/v0.11.64/axonwall_0.11.64_amd64.deb',
    sha256Url: 'https://github.com/axonwall/axonwall/releases/download/v0.11.64/axonwall_0.11.64_amd64.deb.sha256',
    sigUrl: 'https://github.com/axonwall/axonwall/releases/download/v0.11.64/axonwall_0.11.64_amd64.deb.sha256.sig',
    highlights: [
      'Bundles axonwalld (Go daemon + 5-hook CO-RE BPF-LSM & Dual-Stack VLAN/LPM CIDR/SYN-Flood XDP objects), axonwall-controller, 24-tool axonwall-mcp, axonwall-ui, and axonwall-console',
      'Includes Neovim Super Configurator (axonwall-config), axonwallctl <ebpf|nas|virt|k3s|import> CLI, restricted operator shell (axonwall-opshell), and Etckeeper /etc Git sync',
      'Used automatically by axonwall-update and axonwallctl update for Ed25519-verified OTA upgrades across ZBM & A/B slots',
    ],
  },
];

const RELEASE_CHANGELOG = [
  {
    version: 'v0.11.64',
    date: 'November 10, 2026',
    tag: 'Latest Stable',
    highlights: [
      'Linux 6.9+ BPF_TOKEN_CREATE Unprivileged UserNS Delegation & 5-Hook CO-RE BPF-LSM Mediator: Added lsm/bpf_token_create and lsm/bpf_token_cmd Ring-0 hooks plus isolated /run/axonwall/bpffs-tokens/<profile> superblocks—empowering rootless K3s (hostUsers: false) pods and unprivileged LXC containers to load safe XDP/TC/Socket networking eBPF while vetoing kprobe/tracepoint/lsm bpf_probe_read_kernel() host memory reads.',
      'Dual-Stack IPv4/IPv6 + 802.1Q/802.1ad QinQ VLAN, LPM CIDR & TCP SYN-Flood XDP Engine: Upgraded Ring-0 XDP with 2-layer VLAN peeling, BPF_MAP_TYPE_LRU_HASH dual-stack flow accounting, BPF_MAP_TYPE_LPM_TRIE CIDR subnet & exact-host TTL XDP_DROP blocklists, per-source Ring-0 TCP SYN-flood PPS rate limiting, and complete axonwallctl ebpf <overview|tokens|xdp-blocks|xdp-drop|xdp-unblock|syn-limit|render-k3s> commands.',
      'Expanded 16-Scope / 16-Resource / 24-Tool MCP Server & 9-Vendor Unified Appliance Importer: Full Model Context Protocol coverage across Firewall, Ring-0 eBPF & BPF_TOKEN_CREATE, KVM/Libvirt/LXC (snapshots, linked clones, live migration, QGA, Libvirt XML), K3s (Cilium eBPF CNI + Etcd S3 snapshots), OpenZFS NAS (Special NVMe VDEVs, AES-256-GCM encryption, Checkpoints/TRIM, Time Machine, Cloud Sync), and non-destructive Proxmox VE 8.x + TrueNAS SCALE migration.',
      'Coroot-Grade eBPF APM & Cross-Duty Kernel Telemetry (coroot-ebpf-apm): Zero-instrumentation L7 HTTP/gRPC/SQL/Redis/Kafka dissection, optional TLS uprobes, 99 Hz continuous FlameGraphs, automated RCA checks, and deep OpenZFS /proc/spl/kstat/zfs ARC/L2ARC/ZIL + KVM vnet/tap telemetry.',
      '2-Node HA K3s, OpenEBS, Kubeconfig & Etckeeper /etc Git UI: Automated 2-node K3s token join, OpenEBS ZFS-LocalPV & Mayastor NVMe-oF failover, non-root axonwall-kubeconfig / axonwallctl kubeconfig --vip credential sync, and Etckeeper /system/etckeeper Git history & unified diff workspace.',
    ],
  },
  {
    version: 'v0.11.62',
    date: 'November 8, 2026',
    tag: 'CO-RE BPF-LSM & Security Audit',
    highlights: [
      'Ring-0 CO-RE BPF-LSM Exploit Guard: Kernel lsm/socket_bind hook blocking Copy Fail (CVE-2026-31431) AF_ALG crypto socket heap overflows, plus lsm/bpf and lsm/uring_sqpoll enforcement keyed by unspoofable (s_dev, i_ino) kernel inodes.',
      'Restricted Operator Shell (axonwall-opshell): Hardened login shell confining non-root operators to audited appliance workflows without arbitrary bash escape.',
      'Operator-CA Certificate Preservation & 60+ Hardening Fixes: Preserves custom/operator TLS certificates across upgrades and HA sync, paired with 60+ daemon, controller, and sanitizer security remediations.',
    ],
  },
  {
    version: 'v0.11.58',
    date: 'November 5, 2026',
    tag: 'Cloud-Init, K3s CLI & OpenLDAP Federation',
    highlights: [
      'Cloud QCOW2 Background Slot-B Synchronization: First-boot systemd service clones the active cloud root to Slot B asynchronously so cloud VMs gain full A/B Dual-Root rollback parity.',
      'Zero-Touch OpenLDAP RBAC & Service-Account Federation: Automatic directory, group, and OIDC synchronization across K3s RBAC, Vigilant Octo Waffle (VOW), Vigilante SOC, Eluvix AI Router, and FreeRADIUS.',
      'Workstation & Cloud-Init Tooling: Bundled kubectl and helm v3 in cli-workstation, plus full-appliance Cloud-Init seed export (axonwallctl cloudinit export --iso).',
    ],
  },
  {
    version: 'v0.11.52',
    date: 'October 31, 2026',
    tag: 'Pure ZFSBootMenu v3.1.0 UEFI',
    highlights: [
      'Direct UEFI ZFSBootMenu (v3.1.0) Boot Architecture: Replaced legacy GRUB-on-ZFS chains with direct UEFI ZFSBootMenu EFISTUB execution and mirrored EFI System Partition (ESP) synchronization.',
      'Boot Environment Lifecycle CLI (axonwallctl zbm): Create, snapshot, clone, pin, and activate arbitrary zroot/ROOT/* OpenZFS Boot Environments with pre-boot rollback safety.',
      'Tactical Boot Palettes (axonwall-zbm-theme): Five curated high-contrast pre-boot themes synchronized into the ZFSBootMenu EFI image.',
    ],
  },
  {
    version: 'v0.11.42',
    date: 'October 25, 2026',
    tag: 'Unified Installer, TPM 2.0 & MCP AI',
    highlights: [
      'Unified NGFW + Vault Bare-Metal Installer: Consolidated Standard NGFW and Vault S3 editions into a single ISO driven by a 5-step TUI (axonwall-console --install) and unattended YAML profiles.',
      'Smart NVMe/SSD/HDD Tiering & TPM 2.0 Auto-Unlock: Automatic ZFS SLOG, L2ARC, and hot-spare topology layout paired with LUKS2 full-disk encryption bound to TPM 2.0 PCRs 0+2+7.',
      'Model Context Protocol (MCP) Guardrailed AI Engine: Disabled-by-default kill switch, blast-radius policy guardrails, and auto-expiring TTL tactical firewall leases in isolated table inet axonwall_mcp.',
    ],
  },
  {
    version: 'v0.11.32',
    date: 'October 20, 2026',
    tag: 'Edge UKI & Canonical Repo',
    highlights: [
      'Super-Slim Edge NGFW Single-File UEFI UKI (axonwall-edge-sku-vm-virtio.efi): Monolithic CONFIG_MODULES=n kernel with axonwall-satellite as pure-Go PID 1 (/init), zero shell/userland, and <1.2s RAM boot.',
      'Pure-Go Cloud-Init & Dual-Stack IPv6 Engine: Autonomous NoCloud/ConfigDrive/fw_cfg/IMDS provisioning, RFC 8415 DHCPv6 client (IA_NA + IA_PD), RFC 4193 ULA, and RFC 4861 Router Advertisements.',
      'Active-Standby Edge HA & Hosted Edge VM Orchestration: Hardware watchdog enforcement (i6300esb / iTCO_wdt), WAN self-fencing, LAN VIP takeover, and isolated br-wan micro-VM orchestration.',
      'Canonical Repository Migration: Unified repository, updater endpoints, and Go module paths under github.com/axonwall/axonwall.',
    ],
  },
  {
    version: 'v0.11.31',
    date: 'October 18, 2026',
    tag: 'Root-on-ZFS & Eluvix AI',
    highlights: [
      'Initial ZFSBootMenu Root-on-ZFS Mode (installMode: "zbm"): Boot directly from OpenZFS pools (Stripe, Mirror, RAID-Z1/2/3, dRAID) with zero-copy snapshot Boot Environments (BEs).',
      'Eluvix Sovereign AI Router & DLP Guard Plugin (eluvix): Switchyard 4-tier complexity routing (local Ollama/vLLM/Lemonade SLMs vs. cloud frontier models), PrivacyGuard reversible PII/secret tokenization, PromptGuard filter, and 8 agent harnesses.',
    ],
  },
  {
    version: 'v0.11.28 – v0.11.30',
    date: 'October 14–17, 2026',
    tag: 'Ring-0 Defense & HA PKI',
    highlights: [
      'Ghost-in-the-Ring & 8-Engine Malware Hunter: rkhunter, chkrootkit, ClamAV, AIDE, YARA, Lynis, unhide, and debsums paired with Ring-0 BPF_LSM lockdown, /proc/kcore prog_idr walks, and Silicon PMU LBR telemetry.',
      'Host CSR-Based HA PKI Enrollment (GenerateHAPKICSR / SignHAPKICSR): Private keys never traverse the network during 2-Host cluster join.',
      'Declarative /etc/axonwall/*.yaml Persistence: Bidirectional reconciliation across interfaces, Kea DHCP4, Unbound DNS, WireGuard, Rosenpass, and Keepalived/conntrackd HA.',
    ],
  },
  {
    version: 'v0.11.24 – v0.11.27',
    date: 'October 2026',
    tag: 'Super TUI, VOW & PQ-VPN',
    highlights: [
      'Neovim Super Configurator TUI (axonwall-config) with native Vim motions across configuration domains + Oh My Zsh workstation shell.',
      'Vigilant Octo Waffle (VOW) GitOps SecOps stack on K3s + Vigilante Autonomous SOC & BattleStation.',
      'Post-Quantum Rosenpass Dual-KEM (Classic McEliece 460896 + ML-KEM-512 / Kyber-512) WireGuard mesh & N-port Multi-WAN/Multi-LAN architecture.',
    ],
  },
];

export default function ReleasesPage() {
  const [copiedHash, setCopiedHash] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedHash(id);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#080c14] text-slate-100 selection:bg-emerald-500 selection:text-black">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-16 space-y-20">
        {/* Hero Header */}
        <section className="text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Latest Official Release: v0.11.64 (Published 2026-11-10) • Signed with Ed25519 &amp; SHA-256
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
            Releases &amp; Installation Media
          </h1>

          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Every Axonwall release is built deterministically via GitHub Actions and published with 64-character SHA-256
            checksums and detached Ed25519 cryptographic signatures (
            <code className="text-slate-200 font-mono">.sha256.sig</code>) verified against{' '}
            <code className="text-emerald-400 font-mono">/etc/axonwall/release-signing.pub</code>. Both Standard NGFW
            and Immutable Vault S3 editions ship inside the unified bare-metal ISO.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href="https://github.com/axonwall/axonwall/releases/tag/v0.11.64"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition flex items-center gap-2 shadow-lg shadow-emerald-950/60"
            >
              <ExternalLink className="w-4 h-4" /> View v0.11.64 on GitHub Releases
            </a>
            <a
              href="https://github.com/axonwall/axonwall/releases/tag/rolling-latest"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 transition flex items-center gap-2"
            >
              <RefreshCw className="w-3.5 h-3.5 text-sky-400" /> Rolling Latest Channel (rolling-latest)
            </a>
            <Link
              href="/docs/installer-raid-zfs"
              className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-emerald-300 border border-emerald-500/30 transition flex items-center gap-2"
            >
              ZFSBootMenu, RAID-1 &amp; TPM 2.0 Guide <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>

        {/* Artifact Cards */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                Official v0.11.64 Build Matrix • 2026-11-10
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                Download Verified Appliance Images
              </h2>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              Architecture: x86_64 (amd64) • Debian 13 Trixie • Linux 6.12 LTS
            </span>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {RELEASE_ARTIFACTS.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className="p-6 sm:p-8 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition space-y-6"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                          <Icon className="w-5 h-5" />
                        </div>
                        <h3 className="text-xl font-bold text-white">{item.title}</h3>
                        <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded border ${item.badgeColor}`}>
                          {item.badge}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-400">{item.subtitle}</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 shrink-0">
                      <a
                        href={item.downloadUrl}
                        className="px-5 py-3 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition flex items-center gap-2 shadow-lg shadow-emerald-950/50"
                      >
                        <Download className="w-4 h-4" />
                        <span>Download {item.filename}</span>
                        <span className="text-emerald-200 font-mono text-[11px]">({item.size})</span>
                      </a>
                      <a
                        href={item.sha256Url}
                        className="px-3 py-3 rounded-xl text-xs font-mono bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 transition"
                      >
                        .sha256
                      </a>
                      <a
                        href={item.sigUrl}
                        className="px-3 py-3 rounded-xl text-xs font-mono bg-slate-950 hover:bg-slate-800 text-emerald-300 border border-emerald-500/30 transition"
                      >
                        .sha256.sig
                      </a>
                    </div>
                  </div>

                  {/* Highlights */}
                  <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-300 pt-2 border-t border-slate-800/80">
                    {item.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  {/* SHA-256 Bar */}
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2 overflow-x-auto">
                      <span className="text-slate-500 font-semibold uppercase text-[10px] shrink-0">SHA-256:</span>
                      <code className="font-mono text-emerald-400 text-[11px]">{item.sha256}</code>
                    </div>
                    <button
                      onClick={() => copyToClipboard(`${item.sha256}  ${item.filename}`, item.id)}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-[11px] shrink-0 self-start sm:self-auto"
                    >
                      {copiedHash === item.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" /> Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" /> Copy Hash
                        </>
                      )}
                    </button>
                  </div>

                  {/* Extra companion asset for Edge UKI */}
                  {item.extraAsset && (
                    <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sky-400 font-semibold text-[11px]">
                            Companion Standalone Initramfs:
                          </span>
                          <code className="font-mono text-white text-[11px]">{item.extraAsset.filename}</code>
                          <span className="text-slate-500 font-mono text-[11px]">({item.extraAsset.size})</span>
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono break-all">
                          SHA-256: {item.extraAsset.sha256}
                        </div>
                      </div>
                      <a
                        href={item.extraAsset.downloadUrl}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-sky-300 border border-sky-500/30 text-xs font-semibold shrink-0"
                      >
                        <Download className="w-3.5 h-3.5" /> Download Initramfs
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Cryptographic Verification & Quick Deploy */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-white font-bold text-base">
              <Lock className="w-5 h-5 text-emerald-400" />
              <span>1. Verify v0.11.64 SHA-256 &amp; Ed25519 Signature</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every v0.11.64 release artifact is signed with the Axonwall Release Signing Key. Verify both the SHA-256
              digest and the detached Ed25519 signature before flashing or booting:
            </p>
            <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-300 overflow-x-auto leading-relaxed">
{`# Download v0.11.64 ISO + checksum + Ed25519 signature
curl -LO https://github.com/axonwall/axonwall/releases/download/v0.11.64/axonwall-debian13-amd64.iso
curl -LO https://github.com/axonwall/axonwall/releases/download/v0.11.64/axonwall-debian13-amd64.iso.sha256
curl -LO https://github.com/axonwall/axonwall/releases/download/v0.11.64/axonwall-debian13-amd64.iso.sha256.sig

# Verify SHA-256 checksum (8c4bb98fda1f304d...0cdaf44d)
sha256sum -c axonwall-debian13-amd64.iso.sha256

# Verify detached Ed25519 signature (.sha256.sig)
openssl pkeyutl -verify -pubin \\
  -inkey /etc/axonwall/release-signing.pub \\
  -rawin -in axonwall-debian13-amd64.iso.sha256 \\
  -sigfile axonwall-debian13-amd64.iso.sha256.sig`}
            </pre>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-white font-bold text-base">
              <Terminal className="w-5 h-5 text-sky-400" />
              <span>2. Instant Boot: Edge UKI, Proxmox QCOW2, or Debian .deb</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Boot the 7.1 MB Zero-Shell Edge UKI directly into RAM via QEMU/KVM, import the Cloud-Init QCOW2 appliance
              image into Proxmox VE, or install the standalone <code className="text-slate-200 font-mono">.deb</code>:
            </p>
            <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-300 overflow-x-auto leading-relaxed">
{`# Boot Zero-Shell Edge UKI directly in RAM (<1.2s)
qemu-system-x86_64 -enable-kvm -m 512M -smp 2 \\
  -kernel axonwall-edge-sku-vm-virtio.efi \\
  -device i6300esb -watchdog-action reset -nographic

# Import Cloud QCOW2 into Proxmox VE (Slot-B syncs on first boot)
qm importdisk 9000 axonwall-debian13-amd64-cloud.qcow2 local-zfs

# Install standalone v0.11.64 package on Debian 12/13 or Ubuntu 24.04
sudo apt install ./axonwall_0.11.64_amd64.deb`}
            </pre>
          </div>
        </section>

        {/* Release Changelog */}
        <section className="space-y-8">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Release History</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">What&apos;s New in Axonwall</h2>
          </div>

          <div className="space-y-6">
            {RELEASE_CHANGELOG.map((rel, relIdx) => (
              <div
                key={rel.version}
                className={`p-6 rounded-2xl bg-slate-900/70 border space-y-4 ${
                  relIdx === 0 ? 'border-emerald-500/40 shadow-lg shadow-emerald-950/20' : 'border-slate-800'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-extrabold text-white font-mono">{rel.version}</span>
                    <span
                      className={`text-[11px] font-mono px-2.5 py-0.5 rounded border ${
                        relIdx === 0
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-semibold'
                          : 'bg-slate-800 text-slate-300 border-slate-700'
                      }`}
                    >
                      {rel.tag}
                    </span>
                  </div>
                  <span className="text-xs text-slate-500 font-mono">{rel.date}</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-300 leading-relaxed">
                  {rel.highlights.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="text-emerald-400 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-12 bg-slate-950 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Logo size="sm" variant="icon" />
            <span className="font-bold text-white text-sm">Axonwall</span>
            <span>— Sovereign Linux NGFW, OpenZFS NAS, K3s, KVM &amp; Autonomous AI SOC.</span>
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/" className="hover:text-slate-300 transition">Home</Link>
            <Link href="/docs" className="hover:text-slate-300 transition">Docs</Link>
            <Link href="/architecture" className="hover:text-slate-300 transition">Architecture</Link>
            <Link href="/demo/" className="hover:text-slate-300 transition">Live Demo</Link>
            <a href="https://github.com/axonwall/axonwall/releases" className="hover:text-slate-300 transition">
              GitHub Releases
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
