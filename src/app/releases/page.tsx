'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Download,
  Shield,
  CheckCircle2,
  Cpu,
  HardDrive,
  Server,
  Cloud,
  Database,
  Lock,
  Terminal,
  ExternalLink,
  Copy,
  Check,
  Sparkles,
  ArrowRight,
  RefreshCw,
  Bug,
  KeyRound,
  ArrowRightLeft,
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

const V0_11_32_ARTIFACTS: ReleaseArtifact[] = [
  {
    id: 'iso-standard',
    title: 'Turnkey Appliance ISO (Debian 13)',
    subtitle: 'Bootable UEFI & BIOS installer for bare-metal x86_64 routers, servers, and mini-PCs',
    filename: 'axonwall-debian13-amd64.iso',
    size: '1,002.0 MB',
    badge: 'RECOMMENDED • BARE METAL',
    badgeColor: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    icon: HardDrive,
    sha256: '13c0c71d6dcc1968d42e64d36eeff06199ce1f48bfc65b0787a5445aebb09c5a',
    downloadUrl: 'https://github.com/axonwall/axonwall/releases/download/v0.11.32/axonwall-debian13-amd64.iso',
    sha256Url: 'https://github.com/axonwall/axonwall/releases/download/v0.11.32/axonwall-debian13-amd64.iso.sha256',
    sigUrl: 'https://github.com/axonwall/axonwall/releases/download/v0.11.32/axonwall-debian13-amd64.iso.sha256.sig',
    highlights: [
      'Supports A/B Dual-Root (ext4), ZFSBootMenu v3.1.x Root-on-ZFS (zbm), and Single-Root Rolling modes',
      'Interactive multi-disk mdadm RAID-1 or OpenZFS Stripe/Mirror/RAID-Z/dRAID pool installer',
      'Includes Linux 6.12 LTS, nftables, Rosenpass PQ-KEM, Ghost-in-the-Ring, Eluvix AI Router, and Neovim TUI',
    ],
  },
  {
    id: 'edge-uki',
    title: 'Super-Slim Edge NGFW (Single-File UEFI UKI)',
    subtitle: 'Zero-surface, stateless perimeter UKI with pure-Go PID 1 (/init), CONFIG_MODULES=n, and <1.2s RAM boot',
    filename: 'axonwall-edge-sku-vm-virtio.efi',
    size: '7.0 MB',
    badge: 'NEW • ZERO-SURFACE UKI',
    badgeColor: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
    icon: Cpu,
    sha256: '66342158a0fb97b90d84249b40bdb11ef51103fd7fc6b0ea24eed5470875659f',
    downloadUrl: 'https://github.com/axonwall/axonwall/releases/download/v0.11.32/axonwall-edge-sku-vm-virtio.efi',
    sha256Url: 'https://github.com/axonwall/axonwall/releases/download/v0.11.32/axonwall-edge-sku-vm-virtio.efi.sha256',
    sigUrl: 'https://github.com/axonwall/axonwall/releases/download/v0.11.32/axonwall-edge-sku-vm-virtio.efi.sha256.sig',
    highlights: [
      'Zero userland, zero shell (/bin/sh, bash, busybox, sshd removed), and total LKM rootkit immunity',
      'Pure-Go Netlink nftables/WireGuard data plane + RFC 8415 DHCPv6 IA_NA/IA_PD & RFC 4861 Router Advertisements',
      'Autonomous pure-Go Cloud-Init (NoCloud, ConfigDrive, QEMU fw_cfg, AWS/GCP/Azure/OpenStack IMDS)',
    ],
    extraAsset: {
      filename: 'axonwall-edge-sku-vm-virtio-initramfs.cpio.gz',
      size: '3.5 MB',
      sha256: '9cbb64835e0ff5c5653fe8744cf9af446f2e45fd9132c85a569a28956519d67d',
      downloadUrl:
        'https://github.com/axonwall/axonwall/releases/download/v0.11.32/axonwall-edge-sku-vm-virtio-initramfs.cpio.gz',
    },
  },
  {
    id: 'cloud-qcow2',
    title: 'Cloud & Hypervisor QCOW2 Image',
    subtitle: 'Pre-built disk image for Proxmox VE, KVM/QEMU, OpenStack, Hetzner, AWS, and GCP',
    filename: 'axonwall-debian13-amd64-cloud.qcow2',
    size: '827.0 MB',
    badge: 'PROXMOX • KVM • CLOUD',
    badgeColor: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
    icon: Cloud,
    sha256: '66e63f701f9b6af683560426237e1ca50808f1a884c1168fda6a511a75a867f3',
    downloadUrl: 'https://github.com/axonwall/axonwall/releases/download/v0.11.32/axonwall-debian13-amd64-cloud.qcow2',
    sha256Url:
      'https://github.com/axonwall/axonwall/releases/download/v0.11.32/axonwall-debian13-amd64-cloud.qcow2.sha256',
    sigUrl:
      'https://github.com/axonwall/axonwall/releases/download/v0.11.32/axonwall-debian13-amd64-cloud.qcow2.sha256.sig',
    highlights: [
      'Instant import into Proxmox VE (qm importdisk) and libvirt/QEMU with VirtIO SCSI & VirtIO-Net acceleration',
      'Firstboot Cloud-Init reconciler (#cloud-config axonwall: schema) for zero-touch automated provisioning',
      'Pre-configured serial console, QEMU guest agent, and automatic root partition resize',
    ],
  },
  {
    id: 'vault-iso',
    title: 'Axonwall Vault S3 Appliance ISO',
    subtitle: 'Dedicated immutable S3 backup & SeaweedFS object storage vault with B-14 Internal PKI CA',
    filename: 'axonwall-vault-debian13-amd64.iso',
    size: '878.0 MB',
    badge: 'IMMUTABLE S3 VAULT',
    badgeColor: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    icon: Database,
    sha256: 'e37a461d54284c0d39233b8c39afbb029872a90c5c3938fe018a4802d0fa273a',
    downloadUrl: 'https://github.com/axonwall/axonwall/releases/download/v0.11.32/axonwall-vault-debian13-amd64.iso',
    sha256Url:
      'https://github.com/axonwall/axonwall/releases/download/v0.11.32/axonwall-vault-debian13-amd64.iso.sha256',
    sigUrl:
      'https://github.com/axonwall/axonwall/releases/download/v0.11.32/axonwall-vault-debian13-amd64.iso.sha256.sig',
    highlights: [
      'Turnkey SeaweedFS S3-compatible object storage appliance for encrypted configuration & ZFS snapshot backups',
      'Built-in B-14 Internal PKI Certificate Authority with automated mTLS client certificate provisioning',
      'Hardened nftables lockdown policy exposing only verified mTLS S3 & provisioning endpoints',
    ],
  },
  {
    id: 'debian-deb',
    title: 'Debian 13 Standalone Package (.deb)',
    subtitle: 'Install Axonwall on existing Debian 13 (Trixie) x86_64 hosts or apply OTA A/B & ZBM slot upgrades',
    filename: 'axonwall_0.11.32_amd64.deb',
    size: '60.1 MB',
    badge: 'DEBIAN 13 PACKAGE',
    badgeColor: 'bg-slate-800 text-slate-300 border-slate-700',
    icon: Server,
    sha256: 'a40f13c7018b970b6e54c9e04904cf9622766493cf64eaaf29e8c89624d37c96',
    downloadUrl: 'https://github.com/axonwall/axonwall/releases/download/v0.11.32/axonwall_0.11.32_amd64.deb',
    sha256Url: 'https://github.com/axonwall/axonwall/releases/download/v0.11.32/axonwall_0.11.32_amd64.deb.sha256',
    sigUrl: 'https://github.com/axonwall/axonwall/releases/download/v0.11.32/axonwall_0.11.32_amd64.deb.sha256.sig',
    highlights: [
      'Bundles axonwalld (Go daemon), axonwall-controller, axonwall-ui (Next.js standalone), and axonwall-console TUI',
      'Includes systemd units, sysusers/tmpfiles, Neovim Super Configurator (axonwall-config), and ZSH shell',
      'Used automatically by axonwall-update for cryptographically verified OTA upgrades',
    ],
  },
];

const RELEASE_CHANGELOG = [
  {
    version: 'v0.11.32',
    date: 'October 29, 2026',
    tag: 'Latest Stable',
    highlights: [
      'Super-Slim Edge NGFW Single-File UEFI UKI (axonwall-edge-sku-vm-virtio.efi): Monolithic CONFIG_MODULES=n kernel with axonwall-satellite as pure-Go PID 1 (/init), zero shell/userland, and <1.2s RAM boot.',
      'Pure-Go Cloud-Init & Dual-Stack IPv6 Engine: Autonomous NoCloud/ConfigDrive/fw_cfg/IMDS provisioning, RFC 8415 DHCPv6 client (IA_NA + IA_PD), RFC 4193 ULA, and RFC 4861 Router Advertisements.',
      'Active-Standby Edge HA & Hosted Edge VM Orchestration: Hardware watchdog enforcement (i6300esb / iTCO_wdt), WAN self-fencing, LAN VIP takeover, and isolated br-wan micro-VM orchestration.',
      'Canonical Repository Migration: Unified repository, updater endpoints, and Go module paths under github.com/axonwall/axonwall.',
    ],
  },
  {
    version: 'v0.11.31',
    date: 'October 28, 2026',
    tag: 'ZFSBootMenu & Eluvix AI',
    highlights: [
      'Native ZFSBootMenu (v3.1.x) Root-on-ZFS Mode (installMode: "zbm"): Boot directly from OpenZFS pools (Stripe, Mirror, RAID-Z1/2/3, dRAID) with zero-copy snapshot Boot Environments (BEs) and pre-boot watchdog auto-revert.',
      'Eluvix Sovereign AI Router & DLP Guard Plugin (ai-eluvix): Switchyard 4-tier complexity routing (local Ollama/vLLM/Lemonade SLMs vs. cloud frontier models), PrivacyGuard reversible PII/secret tokenization, PromptGuard filter, and 8 agent harnesses (OpenCode, ACP, TrueForge, OpenHands, Mastra, Letta, A2A, Hermes).',
    ],
  },
  {
    version: 'v0.11.30',
    date: 'October 28, 2026',
    tag: 'Security Hardening & PKI',
    highlights: [
      'Comprehensive 60-Point Security Audit Remediation across Go daemon, TypeScript controller, Next.js Web Console, and installer scripts.',
      'Host CSR-Based HA PKI Enrollment (GenerateHAPKICSR / SignHAPKICSR): Private keys never traverse the network during cluster join.',
      'Interactive Multi-Step Import Review Walkthrough in Firewall Migration Studio with negated-rule safety defaults.',
    ],
  },
  {
    version: 'v0.11.28 – v0.11.29',
    date: 'October 27–28, 2026',
    tag: 'Ring-0 Defense & Persistence',
    highlights: [
      'Ghost-in-the-Ring & 6-Engine Malware Hunter: rkhunter, chkrootkit, ClamAV, AIDE, YARA, and Lynis paired with Ring-0 BPF_LSM lockdown, /proc/kcore prog_idr walks, and Silicon PMU LBR telemetry.',
      'Full Reboot Persistence & Privilege Separation: End-to-end reconciliation of /etc/axonwall/*.yaml across interfaces, Kea DHCP4, Unbound DNS, WireGuard, Rosenpass, and Keepalived/conntrackd HA.',
    ],
  },
  {
    version: 'v0.11.24 – v0.11.27',
    date: 'October 2026',
    tag: 'Super TUI, VOW & PQ-VPN',
    highlights: [
      'Neovim Super Configurator TUI (axonwall-config) with native Vim motions across all configuration domains + Oh My Zsh workstation shell.',
      'Vigilant Octo Waffle (VOW) GitOps SecOps stack on K3s + Vigilante Purple-Team BattleStation.',
      'Post-Quantum Rosenpass Dual-KEM (Classic McEliece 460896 + Kyber-768) WireGuard mesh & N-port Multi-WAN/Multi-LAN architecture.',
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
            Latest Official Release: v0.11.32 • Signed with Ed25519 &amp; SHA-256
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
            Releases &amp; Installation Media
          </h1>

          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Every Axonwall release is built deterministically via GitHub Actions and published with SHA-256 checksums
            and detached Ed25519 cryptographic signatures (<code className="text-slate-200 font-mono">.sha256.sig</code>)
            verified against <code className="text-emerald-400 font-mono">/etc/axonwall/release-signing.pub</code>.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href="https://github.com/axonwall/axonwall/releases/tag/v0.11.32"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition flex items-center gap-2 shadow-lg shadow-emerald-950/60"
            >
              <ExternalLink className="w-4 h-4" /> View v0.11.32 on GitHub Releases
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
              RAID-1, A/B &amp; ZFSBootMenu Guide <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>

        {/* Artifact Cards */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                Official v0.11.32 Build Matrix
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                Download Verified Appliance Images
              </h2>
            </div>
            <span className="text-xs text-slate-400 font-mono">Architecture: x86_64 (amd64) • Kernel: Linux 6.12 LTS</span>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {V0_11_32_ARTIFACTS.map((item) => {
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
                        <div className="flex items-center gap-2">
                          <span className="text-sky-400 font-semibold text-[11px]">Companion Standalone Initramfs:</span>
                          <code className="font-mono text-white text-[11px]">{item.extraAsset.filename}</code>
                          <span className="text-slate-500 font-mono text-[11px]">({item.extraAsset.size})</span>
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono truncate">
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
              <span>1. Verify SHA-256 &amp; Ed25519 Release Signature</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every release artifact is signed with the Axonwall Release Signing Key. Verify both the SHA-256 digest and
              the detached Ed25519 signature before flashing or booting:
            </p>
            <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-300 overflow-x-auto leading-relaxed">
{`# Verify SHA-256 checksum
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
              <span>2. Instant Boot: Edge UKI or Proxmox Cloud QCOW2</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Boot the stateless 7 MB Edge NGFW UKI directly into RAM via QEMU/KVM in under 1.2 seconds, or import the
              Cloud-Init QCOW2 disk into Proxmox VE:
            </p>
            <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-300 overflow-x-auto leading-relaxed">
{`# Boot Zero-Surface Edge UKI directly in RAM (<1.2s)
qemu-system-x86_64 -enable-kvm -m 512M -smp 2 \\
  -kernel axonwall-edge-sku-vm-virtio.efi \\
  -device i6300esb -watchdog-action reset -nographic

# Import Cloud QCOW2 into Proxmox VE
qm importdisk 9000 axonwall-debian13-amd64-cloud.qcow2 local-zfs`}
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
            {RELEASE_CHANGELOG.map((rel) => (
              <div key={rel.version} className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-extrabold text-white font-mono">{rel.version}</span>
                    <span className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
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
            <span>— The Modern Linux Router &amp; Next-Gen Firewall.</span>
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/" className="hover:text-slate-300 transition">Home</Link>
            <Link href="/docs" className="hover:text-slate-300 transition">Docs</Link>
            <Link href="/architecture" className="hover:text-slate-300 transition">Architecture</Link>
            <a href="https://github.com/axonwall/axonwall/releases" className="hover:text-slate-300 transition">GitHub Releases</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
