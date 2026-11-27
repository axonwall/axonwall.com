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
import {
  GITHUB_RELEASE_URL,
  RELEASE_CHANGELOG,
  RELEASE_DATE,
  RELEASE_TAG,
  RELEASE_VERSION,
  releaseAssetUrl,
} from '@/lib/release';

interface ReleaseArtifact {
  id: string;
  title: string;
  subtitle: string;
  filename: string;
  size?: string;
  badge: string;
  badgeColor: string;
  icon: any;
  sha256?: string;
  downloadUrl: string;
  sha256Url: string;
  sigUrl: string;
  highlights: string[];
  extraAsset?: {
    filename: string;
    size?: string;
    sha256?: string;
    downloadUrl: string;
  };
}

const RELEASE_ARTIFACTS: ReleaseArtifact[] = [
  {
    id: 'iso-unified',
    title: 'Unified Bare-Metal NGFW + Minimal + Vault + K3s Storage ISO (Debian 13)',
    subtitle:
      'Bootable UEFI/BIOS Live/Installer ISO for bare-metal x86_64 servers, routers, and mini-PCs — select Standard NGFW, Minimal Reduced Attack Surface, Immutable Vault S3, or Barebones K3s + Storage Edition at boot or in the TUI installer',
    filename: 'axonwall-debian13-amd64.iso',
    badge: 'RECOMMENDED • NGFW + MINIMAL + VAULT + K3S',
    badgeColor: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    icon: HardDrive,
    downloadUrl: releaseAssetUrl('axonwall-debian13-amd64.iso'),
    sha256Url: releaseAssetUrl('axonwall-debian13-amd64.iso.sha256'),
    sigUrl: releaseAssetUrl('axonwall-debian13-amd64.iso.sha256.sig'),
    highlights: [
      'Lean Router/NGFW Core defaults (core-firewall active; 4 Starter Packs via [P] -> starter-packs.seed) + Quad-edition GRUB/ISOLINUX & 5-step TUI (axonwall, minimal, vault, k3s-storage)',
      'Edge-to-Central-Analytics Telemetry Offload (Prometheus Remote-Write, VictoriaLogs NDJSON/gzip & IPFIX PEN 62999), K3s Analytics Stack (axonwall-analytics Helm chart), and Hardened WAN Headscale Invites with Port Knocking',
      'Four boot engines (ZFSBootMenu v3.1.0, in-kernel Btrfs + Snapper, Dual-Root A/B, Rolling), LUKS2 + TPM 2.0 PCR 0+2+7 auto-unlock & Air-Gapped Plugin Cache support',
    ],
  },
  {
    id: 'edge-uki',
    title: 'Super-Slim Edge NGFW (Single-File UEFI UKI)',
    subtitle:
      'Zero-shell stateless perimeter UKI with Linux 6.12 LTS (CONFIG_MODULES=n), pure-Go PID 1 (axonwall-satellite), and <1.2s RAM boot',
    filename: 'axonwall-edge-sku-vm-virtio.efi',
    badge: 'ZERO-SHELL UKI • PID 1 GO',
    badgeColor: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
    icon: Cpu,
    downloadUrl: releaseAssetUrl('axonwall-edge-sku-vm-virtio.efi'),
    sha256Url: releaseAssetUrl('axonwall-edge-sku-vm-virtio.efi.sha256'),
    sigUrl: releaseAssetUrl('axonwall-edge-sku-vm-virtio.efi.sha256.sig'),
    highlights: [
      'Zero userland, zero shell (/bin/sh, bash, busybox, sshd stripped), and complete loadable-kernel-module immunity',
      'Pure-Go Netlink nftables/WireGuard data plane + Edge-to-Hub TELEMETRY_REPORT / EDGE_FLOW_BATCH offload & opt-in XDP remote mitigation',
      'Autonomous pure-Go Cloud-Init (NoCloud, ConfigDrive, QEMU fw_cfg, AWS/GCP/Azure/OpenStack IMDS) + hardware watchdog HA',
    ],
    extraAsset: {
      filename: 'axonwall-edge-sku-vm-virtio-initramfs.cpio.gz',
      downloadUrl:
        releaseAssetUrl('axonwall-edge-sku-vm-virtio-initramfs.cpio.gz'),
    },
  },
  {
    id: 'cloud-qcow2',
    title: 'Cloud & Hypervisor QCOW2 Appliance Image',
    subtitle:
      'Cloud-Init ready disk image for KVM/QEMU, Proxmox VE, OpenStack, Hetzner, AWS, and GCP with background Slot-B first-boot sync',
    filename: 'axonwall-debian13-amd64-cloud.qcow2',
    badge: 'KVM • PROXMOX VE • OPENSTACK',
    badgeColor: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
    icon: Cloud,
    downloadUrl: releaseAssetUrl('axonwall-debian13-amd64-cloud.qcow2'),
    sha256Url:
      releaseAssetUrl('axonwall-debian13-amd64-cloud.qcow2.sha256'),
    sigUrl:
      releaseAssetUrl('axonwall-debian13-amd64-cloud.qcow2.sha256.sig'),
    highlights: [
      'Instant import into Proxmox VE (qm importdisk) and libvirt/QEMU with VirtIO-SCSI, VirtIO-Net, and QEMU guest agent',
      'Background first-boot Slot-B synchronization establishes full A/B Dual-Root rollback parity without delaying first login',
      'Zero-touch Cloud-Init reconciler (#cloud-config axonwall: including starter_packs:) + exportable seed ISOs via axonwallctl cloudinit export --iso',
    ],
  },
  {
    id: 'debian-deb',
    title: 'Standalone Debian / Ubuntu AMD64 Packages (.deb)',
    subtitle:
      'Install Lean Core Axonwall on existing Debian 12/13 or Ubuntu 24.04 x86_64 hosts, or apply verified OTA ZBM, Btrfs + Snapper & A/B upgrades (companion axonwall-minimal, axonwall-vault & axonwall-k3s-storage .debs + axonwall-docs tarball also published)',
    filename: `axonwall_${RELEASE_VERSION}_amd64.deb`,
    badge: 'DEBIAN 12/13 • UBUNTU 24.04',
    badgeColor: 'bg-slate-800 text-slate-300 border-slate-700',
    icon: Server,
    downloadUrl: releaseAssetUrl(`axonwall_${RELEASE_VERSION}_amd64.deb`),
    sha256Url: releaseAssetUrl(`axonwall_${RELEASE_VERSION}_amd64.deb.sha256`),
    sigUrl: releaseAssetUrl(`axonwall_${RELEASE_VERSION}_amd64.deb.sha256.sig`),
    highlights: [
      'Lean Router/NGFW Core (47 plugin manifests, 4 Curated Starter Packs & Air-Gapped Plugin Cache) + automatic v0.15.x upgrade preservation',
      'Includes axonwalld, axonwall-controller, 29-tool mcp-ai-control, Next.js 16 axonwall-ui, axonwall-console, /bin/bash fallback & local POSIX UserManager',
      'Used automatically by axonwall-update and axonwallctl update for RSA-4096 SHA-256 verified OTA upgrades across ZBM, Btrfs + Snapper & A/B slots',
    ],
    extraAsset: {
      filename: `axonwall-docs-${RELEASE_VERSION}.tar.gz`,
      size: '~1.1 MB offline docs-portal bundle',
      downloadUrl:
        releaseAssetUrl(`axonwall-docs-${RELEASE_VERSION}.tar.gz`),
    },
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
            Latest Official Release: {RELEASE_TAG} ({RELEASE_DATE}) • Signed with RSA-4096 &amp; SHA-256
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
            Releases &amp; Installation Media
          </h1>

          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Every Axonwall release is built deterministically via GitHub Actions and published with 64-character SHA-256
            checksums and detached RSA-4096 SHA-256 cryptographic signatures (
            <code className="text-slate-200 font-mono">.sha256.sig</code>) verified against{' '}
            <code className="text-emerald-400 font-mono">/etc/axonwall/release-signing.pub</code>. Standard NGFW (Lean Core),
            Minimal Reduced Attack Surface, Immutable Vault S3, and Barebones K3s + Storage editions all ship inside the unified bare-metal ISO.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href={GITHUB_RELEASE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition flex items-center gap-2 shadow-lg shadow-emerald-950/60"
            >
              <ExternalLink className="w-4 h-4" /> View {RELEASE_TAG} on GitHub Releases
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
              ZFSBootMenu, Btrfs + Snapper &amp; RAID Guide <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>

        {/* Artifact Cards */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                Official {RELEASE_TAG} Build Matrix • {RELEASE_DATE}
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
              const verifyCmd = `curl -LO ${item.downloadUrl} && curl -LO ${item.sha256Url} && curl -LO ${item.sigUrl} && sha256sum -c ${item.filename}.sha256`;
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
                        {item.size && (
                          <span className="text-emerald-200 font-mono text-[11px]">({item.size})</span>
                        )}
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

                  {/* Verification Bar */}
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2 overflow-x-auto">
                      <span className="text-slate-500 font-semibold uppercase text-[10px] shrink-0">Verify:</span>
                      <code className="font-mono text-emerald-400 text-[11px]">
                        {item.sha256 || `Download .sha256 & .sha256.sig from GitHub ${RELEASE_TAG} release assets`}
                      </code>
                    </div>
                    <button
                      onClick={() =>
                        copyToClipboard(
                          item.sha256 ? `${item.sha256}  ${item.filename}` : verifyCmd,
                          item.id
                        )
                      }
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-[11px] shrink-0 self-start sm:self-auto"
                    >
                      {copiedHash === item.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" /> Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" /> {item.sha256 ? 'Copy Hash' : 'Copy Verify Cmd'}
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
                          {item.extraAsset.size && (
                            <span className="text-slate-500 font-mono text-[11px]">({item.extraAsset.size})</span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono break-all">
                          {item.extraAsset.sha256
                            ? `SHA-256: ${item.extraAsset.sha256}`
                            : `Signed .sha256 and .sha256.sig attached to ${RELEASE_TAG} GitHub Release`}
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
              <span>1. Verify {RELEASE_TAG} SHA-256 &amp; RSA-4096 Signature</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every {RELEASE_TAG} release artifact is signed with the Axonwall Release Signing Key. Verify both the SHA-256
              digest and the detached RSA-4096 signature before flashing or booting:
            </p>
            <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-300 overflow-x-auto leading-relaxed">
{`# Download ${RELEASE_TAG} ISO + checksum + detached signature
curl -LO https://github.com/axonwall/axonwall/releases/download/${RELEASE_TAG}/axonwall-debian13-amd64.iso
curl -LO https://github.com/axonwall/axonwall/releases/download/${RELEASE_TAG}/axonwall-debian13-amd64.iso.sha256
curl -LO https://github.com/axonwall/axonwall/releases/download/${RELEASE_TAG}/axonwall-debian13-amd64.iso.sha256.sig

# Verify SHA-256 checksum
sha256sum -c axonwall-debian13-amd64.iso.sha256

# Verify detached RSA-4096 SHA-256 signature (.sha256.sig)
openssl dgst -sha256 \\
  -verify /etc/axonwall/release-signing.pub \\
  -signature axonwall-debian13-amd64.iso.sha256.sig \\
  axonwall-debian13-amd64.iso.sha256`}
            </pre>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-white font-bold text-base">
              <Terminal className="w-5 h-5 text-sky-400" />
              <span>2. Instant Boot: Edge UKI, Proxmox QCOW2, or Debian .deb</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Boot the Zero-Shell Edge UKI directly into RAM via QEMU/KVM, import the Cloud-Init QCOW2 appliance
              image into Proxmox VE, or install standard / Minimal <code className="text-slate-200 font-mono">.deb</code> packages:
            </p>
            <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-300 overflow-x-auto leading-relaxed">
{`# Boot Zero-Shell Edge UKI directly in RAM (<1.2s)
qemu-system-x86_64 -enable-kvm -m 512M -smp 2 \\
  -kernel axonwall-edge-sku-vm-virtio.efi \\
  -device i6300esb -watchdog-action reset -nographic

# Import Cloud QCOW2 into Proxmox VE (Slot-B syncs on first boot)
qm importdisk 9000 axonwall-debian13-amd64-cloud.qcow2 local-zfs

# Install standalone ${RELEASE_TAG} package (or minimal / vault / k3s-storage edition)
sudo apt install ./axonwall_${RELEASE_VERSION}_amd64.deb`}
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
                    <span className="text-lg font-extrabold text-white font-mono">{rel.tagName}</span>
                    <span
                      className={`text-[11px] font-mono px-2.5 py-0.5 rounded border ${
                        relIdx === 0
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-semibold'
                          : 'bg-slate-800 text-slate-300 border-slate-700'
                      }`}
                    >
                      {rel.badge}
                    </span>
                  </div>
                  <span className="text-xs text-slate-500 font-mono">{rel.displayDate}</span>
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
