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
    downloadUrl: 'https://github.com/axonwall/axonwall/releases/download/v0.13.1/axonwall-debian13-amd64.iso',
    sha256Url: 'https://github.com/axonwall/axonwall/releases/download/v0.13.1/axonwall-debian13-amd64.iso.sha256',
    sigUrl: 'https://github.com/axonwall/axonwall/releases/download/v0.13.1/axonwall-debian13-amd64.iso.sha256.sig',
    highlights: [
      'Quad-edition UEFI GRUB & BIOS ISOLINUX menus + 5-step TUI (axonwall-console --install) supporting axonwall, minimal, vault, and k3s-storage',
      'Four boot engines: ZFSBootMenu v3.1.0 Root-on-ZFS, in-kernel Btrfs + Snapper Root (single-disk or native RAID-1), A/B Dual-Root (mdadm RAID-1), or Rolling Single-Root',
      'Smart NVMe/SSD/HDD disk tiering (SLOG/L2ARC/spares), LUKS2 + TPM 2.0 PCR 0+2+7 auto-unlock, 5-hook CO-RE BPF-LSM & Linux 6.9+ BPF_TOKEN mediator',
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
    downloadUrl: 'https://github.com/axonwall/axonwall/releases/download/v0.13.1/axonwall-edge-sku-vm-virtio.efi',
    sha256Url: 'https://github.com/axonwall/axonwall/releases/download/v0.13.1/axonwall-edge-sku-vm-virtio.efi.sha256',
    sigUrl: 'https://github.com/axonwall/axonwall/releases/download/v0.13.1/axonwall-edge-sku-vm-virtio.efi.sha256.sig',
    highlights: [
      'Zero userland, zero shell (/bin/sh, bash, busybox, sshd stripped), and complete loadable-kernel-module immunity',
      'Pure-Go Netlink nftables/WireGuard data plane (including NFT_LIMIT_F_INV over-rate, wildcard ifname & chunked sets) + RFC 8415 DHCPv6 & RA',
      'Autonomous pure-Go Cloud-Init (NoCloud, ConfigDrive, QEMU fw_cfg, AWS/GCP/Azure/OpenStack IMDS) + hardware watchdog HA',
    ],
    extraAsset: {
      filename: 'axonwall-edge-sku-vm-virtio-initramfs.cpio.gz',
      downloadUrl:
        'https://github.com/axonwall/axonwall/releases/download/v0.13.1/axonwall-edge-sku-vm-virtio-initramfs.cpio.gz',
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
    downloadUrl: 'https://github.com/axonwall/axonwall/releases/download/v0.13.1/axonwall-debian13-amd64-cloud.qcow2',
    sha256Url:
      'https://github.com/axonwall/axonwall/releases/download/v0.13.1/axonwall-debian13-amd64-cloud.qcow2.sha256',
    sigUrl:
      'https://github.com/axonwall/axonwall/releases/download/v0.13.1/axonwall-debian13-amd64-cloud.qcow2.sha256.sig',
    highlights: [
      'Instant import into Proxmox VE (qm importdisk) and libvirt/QEMU with VirtIO-SCSI, VirtIO-Net, and QEMU guest agent',
      'Background first-boot Slot-B synchronization establishes full A/B Dual-Root rollback parity without delaying first login',
      'Zero-touch Cloud-Init reconciler (#cloud-config axonwall:) + exportable seed ISOs via axonwallctl cloudinit export --iso',
    ],
  },
  {
    id: 'debian-deb',
    title: 'Standalone Debian / Ubuntu AMD64 Packages (.deb)',
    subtitle:
      'Install Axonwall on existing Debian 12/13 or Ubuntu 24.04 x86_64 hosts, or apply verified OTA ZBM, Btrfs + Snapper & A/B upgrades (companion axonwall-minimal, axonwall-vault & axonwall-k3s-storage .debs also published)',
    filename: 'axonwall_0.13.1_amd64.deb',
    badge: 'DEBIAN 12/13 • UBUNTU 24.04',
    badgeColor: 'bg-slate-800 text-slate-300 border-slate-700',
    icon: Server,
    downloadUrl: 'https://github.com/axonwall/axonwall/releases/download/v0.13.1/axonwall_0.13.1_amd64.deb',
    sha256Url: 'https://github.com/axonwall/axonwall/releases/download/v0.13.1/axonwall_0.13.1_amd64.deb.sha256',
    sigUrl: 'https://github.com/axonwall/axonwall/releases/download/v0.13.1/axonwall_0.13.1_amd64.deb.sha256.sig',
    highlights: [
      'Bundles axonwalld (Go daemon + 5-hook CO-RE BPF-LSM, Dual-Stack VLAN/LPM CIDR/SYN-Flood XDP & kernel BPF inventory), axonwall-controller, 25-tool axonwall-mcp, Next.js 16 axonwall-ui, and axonwall-console',
      'Includes Neovim Super Configurator (axonwall-config), axonwallctl CLI, SHA-256 bundled-binary plugins, Browser K9s Live Explorer, restricted operator shell (axonwall-opshell), and Etckeeper /etc Git sync',
      'Used automatically by axonwall-update and axonwallctl update for Ed25519-verified OTA upgrades across ZBM, Btrfs + Snapper & A/B slots',
    ],
  },
];

const RELEASE_CHANGELOG = [
  {
    version: 'v0.13.1',
    date: 'November 22, 2026',
    tag: 'Latest Release',
    highlights: [
      'Turnkey Headscale Mesh Onboarding, Magic Invite Links & User Self-Service Portal (/vpn/mesh, /portal/vpn, /invite/[token]): Administrators can invite users with configurable expiration, device registration quotas, pre-assigned tags, and auto-registration flags. Generates single-use invite tokens with instant QR codes and direct links. Features a dedicated end-user interface (MeshSelfServicePortal) for non-root users to view active mesh nodes, generate authentication keys (reusable, ephemeral, pre-authenticated), register devices via interactive auth-key commands or machine registration keys, inspect WireGuard configs, and manage their credentials.',
      'Headscale Management Engine (apps/axonwalld & apps/axonwall-controller): Native headscale configuration reconciliation engine (headscale_config.go), automated SQLite/Postgres DB initialization, secure server key management, and REST endpoints for user lifecycle management (/v1/vpn/mesh/people, /v1/vpn/mesh/invites/preview, /v1/vpn/mesh/invites/redeem, /v1/vpn/mesh/self/*), machine tagging, routing advertisements, session expiration tracking, and full RBAC integration.',
      'Interactive XDP Packet Flow Sankey Diagram (EbpfXdpPipelineVisualizer): Real-time vector-based visualization of ingress packets traversing Ring-0 DMA RX rings, VLAN decapsulation, IPv4/IPv6 layer parsing, and final XDP verdicts (PASS, DROP, TX, REDIRECT), switchable between Cumulative Packets and Live PPS deltas with live map inspection.',
      'Kernel TCP State Machine Funnel & Traffic Heatmap Matrix (EbpfSocketAndServiceVisualizer): Funnel diagram detailing active TCP connections through kernel states (LISTEN, SYN_SENT, ESTABLISHED, FIN_WAIT, TIME_WAIT), paired with an interactive Source IP x Destination Port traffic matrix supporting 1-click fast-drop defensive rules and Listening Services vs XDP ingress exposure matrix.',
      'eBPF Execution Profiler & SoftIRQ/NAPI Pressure Heatmap (EbpfRuntimeProfilerVisualizer): 1-click toggle for /proc/sys/kernel/bpf_stats_enabled runtime metric collection, 3-tier execution budget icicle flame-strip, rolling top-program CPU timeline, and per-CPU SoftIRQ/NAPI core pressure heatmap parsing /proc/net/softnet_stat.',
      'BPF Kernel Dependency Graph & Verifier Complexity Scatter Plot (EbpfKernelGraphVisualizer): Force-directed topology connecting BPF links, programs, and maps with type filters, coupled with a Verifier Complexity vs. JIT execution latency scatter plot for instant kernel performance auditing.',
      'Raw Link Enumeration & Socket Telemetry (apps/axonwalld): Enumerates bpf_link objects via raw BPF_LINK_GET_NEXT_ID syscalls (unix.SYS_BPF), maps program-to-map associations, and collects /proc/net/{tcp,udp,raw}* socket exposure telemetry.',
      'Appliance ISO Offline Packaging & Bootloader Cache Hardening: Fixed offline Debian installer chroot cache validation in packaging/iso/build-iso.sh by ensuring both grub-pc (BIOS) and grub-efi-amd64 (UEFI) packages are reliably downloaded and cached into config/includes.chroot/var/cache/apt/archives/. Resolved shim-unsigned and shim-helpers-amd64-signed package resolution issues.',
    ],
  },
  {
    version: 'v0.13.0',
    date: 'November 21, 2026',
    tag: 'Feature Release',
    highlights: [
      'Btrfs + Snapper Root Boot Architecture (installMode: "btrfs"): First-class in-kernel Copy-on-Write alternative to ZFSBootMenu across kernel config (CONFIG_BTRFS_FS=y), Debian 13 & Alpine ISOs (btrfs-progs, snapper), axonwall-console --install TUI, unified axonwall-install ([3] Btrfs + Snapper Root), Cloud-Init, axonwall-update --btrfs, axonwalld (/v1/system/btrfs), Kernel Studio pre-kernel snapshots, axonwall-tui (Btrfs Snapper tab), axonwallctl, and Web Console (/system/updates & /system/power). Supports single-disk compress=zstd:1 or automatic multi-disk native Btrfs RAID-1 (-d raid1 -m raid1), flat subvolume isolation (@, @snapshots, @var_log, @var_lib_axonwall or LUKS2 axon_data), GRUB2 Axonwall Btrfs Snapshots submenu (omitting grubenv/save_env sparse-file writes), and atomic flat-subvolume rollback via axonwall-btrfs-grub.',
      'Minimal Reduced-Attack-Surface Edition (minimal) & On-Demand Role/Plugin Provisioning: Fourth unified edition alongside axonwall, vault, and k3s-storage across GRUB2/ISOLINUX menus, TUI/shell/Debian d-i (preseed-minimal.cfg) installers, Cloud-Init, axonwall-update, and dedicated axonwall-minimal_*.deb packages—with clean on-demand installation of Core Roles & Plugins via /system/plugins, axonwallctl plugin, and /v1/system/plugins/action.',
      'Plugin Bundled Binaries & 23-Plugin Catalog (5 Core Roles + 18 Extension Plugins): SHA-256-verified bundled binary archives extracted fail-closed into per-plugin bin/ directories with automatic interactive-shell PATH snippets (plugin_shell.go). Migrated k3s & k9s into core-k3s and vim & neovim into cli-workstation, and added cli-emacs, cli-emacs-doom, and cli-emacs-spacemacs.',
      'Expanded Ring-0 eBPF Visualizations & Live Kernel BPF Inventory (/reporting/ebpf, /reporting/flows, /v1/ebpf/overview): Added six live telemetry visualizers (EbpfDataplaneCharts, EbpfFlowTopologyMap, EbpfKernelInventoryPanel, EbpfCrossDutyVisualizer, EbpfSecurityVisualizer + ThreatSketchWaveform, FlowsLiveVisualStrip) backed by CollectKernelBpfInventory() enumerating live kernel BPF programs & maps.',
      'Full-Stack Security Hardening (Rounds 3, 4 & v0.12.4 Deep-Dive) & Next.js 16 Stack Rollup: DNS/IP/redirect SSRF guard (ssrf-guard.ts), CSRF X-Forwarded-Host + same-origin proof checks, /api/auth/gateway bypass fix, live .password_changed enforcement, OIDC nonce/proxy fixes, immediate break-glass MFA reset, 8-field secret redaction, honest ClickHouse Data Lake & daemon-down UI states, SSSD shell allowlists, HelmChart/Samba/LIO/MinIO/QEMU/LXC validators, MCP audit secret redaction, pure-Go Netlink over/wildcard/chunked sets in axonwall-satellite, safe POSIX awk symlink validation in axonwall-update, Next.js 16 (--webpack), TypeScript 7, Turbo, Go & Docker updates.',
    ],
  },
  {
    version: 'v0.12.4',
    date: 'November 20, 2026',
    tag: 'Maintenance Release',
    highlights: [
      '9600-Baud Serial Console & Dual gfxterm/serial GRUB Output: Restored reliable VGA + headless serial console boot interaction across appliance images.',
      'Vault & K3s-Storage Packaging & Installer Parity: Raised nftables dependency floor to >= 1.1.0 across vault and k3s-storage editions, synced Debian and Alpine axonwall-install hardening, and landed Round-4 fail-closed updater/watchdog fixes.',
    ],
  },
  {
    version: 'v0.12.3',
    date: 'November 19, 2026',
    tag: 'Browser K9s & Cluster Scheduling',
    highlights: [
      'Browser K9s Live Explorer (/k3s/explorer, /v1/k3s/* & /api/k3s/logs/stream): Browser-native K9s workbench with keyboard command navigation (:po, :svc, :ing, :pulse, :topo), Cluster Pulse Recharts visualizations, interactive SVG Ingress-to-PVC Topology Map, live SSE logs, container exec, YAML dry-run edit, admin Secret decode, and default CLI k9s (v0.51.0).',
      'Interactive K3s Node Roles & Taints Modal (/k3s/cluster & /v1/k3s/nodes/scheduling): Merge-patch scheduling controls with one-click Edge Node tainting so edge firewalls run only essential networking pods.',
      'Identity & HA Split-Brain Protection: Added authenticated SSSD read bind account (cn=svc-sssd), OpenLDAP DIT glue verification, and local node identity preservation during HA SQLite replica promotion.',
    ],
  },
  {
    version: 'v0.12.2',
    date: 'November 18, 2026',
    tag: 'HA & Installer Fix',
    highlights: [
      'HA Keepalived Sync-Group Notify Fix: Moved notify_master, notify_backup, and notify_fault into vrrp_sync_group VG1 in keepalived.conf generation so multi-instance VRRP transitions fire a single synchronized event and cannot demote the active MASTER DirectoryManager/NAS to BACKUP.',
      'ZFS Installer Topology Fix: Defined resolve_zfs_topology() before its first call site in axonwall-install (Debian & Alpine) so POSIX sh ZFS installations resolve RAID topology cleanly.',
    ],
  },
  {
    version: 'v0.12.1',
    date: 'November 18, 2026',
    tag: 'Hardening Release',
    highlights: [
      'Full-Stack Hardening & Security Audit: Comprehensive v0.12.1 bug hunt across @axonwall/lib, axonwalld, axonwall-satellite, axonwall-controller, axonwall-console, Web Console, and packaging/CI.',
      'Daemons, eBPF & Satellite: Hardened netdev/ZFS/K3s/Virt engines, bundle validation, and Threat-LLM Harvester eBPF; added standby interface fencing, fixed nftables netlink opcodes, and improved cloud-init parsing.',
      'Web Console, TUI & Packaging: Fixed IPC timeouts, split-brain prevention, RBAC/MFA guards, ZFSBootMenu partition layout, QCOW2 build traps/growpart, edition isolation, and preseed parity; removed hardcoded workstation paths.',
    ],
  },
  {
    version: 'v0.12.0',
    date: 'November 17, 2026',
    tag: 'Feature Release',
    highlights: [
      'Vigilante Base Domain & Module Endpoint URLs: Configure the Vigilante base domain directly in /vigilante/modules and view/launch per-module HTTPS endpoints (soc.<domain>, wazuh.<domain>, opensearch.<domain>, etc.). Updated axonwalld bundle validation to permit in-house Vigilante modular SOC HelmCharts alongside Cilium.',
      'Axonwall Blackbox: Extreme eBPF Threat-LLM Harvester (ebpf-threat-harvester): Strictly opt-in Ring-0 flight recorder correlating TCX ingress/egress flow sketches, JA4T, DNS entropy, and Tier-1 L7 slices with sched_process_exec, sys_enter_memfd_create, and guarded uprobe/SSL_write. Enforces mandatory pre-disk DLP secret/token masking, prefix-preserving AES-128 Crypto-PAn IPv4/IPv6 + HMAC hostname anonymization, hardcoded control-plane TLS uprobe exclusions (axonwalld, sshd, eluvix, vault, k3s, etc.), 45s Gold/Silver oracle correlation, Teacher-LLM distillation, OpenZFS zstd spooling, Dual-Track .tar.zst (ChatML SFT/RLVR train.jsonl/val.jsonl + Apache Parquet 1.0 features.parquet), and AWS SigV4 S3 shipping.',
      'Universal & Hardware-Stripped Hardened Linux 6.12 LTS Kernel Pipeline (packaging/kernel/): Seven layered Kconfig fragments (now including CONFIG_NET_CLS_ACT, CONFIG_NET_SCH_INGRESS, CONFIG_UPROBE_EVENTS & CONFIG_FTRACE_SYSCALLS) delivering Debian-equivalent server/cloud hardware support with KSPP hardening, integrity-mode Lockdown LSM, BPF_LSM, rootless USER_NS + cgroups v2, OpenZFS DKMS symbol preservation, nftables flowtables, and eBPF CO-RE BTF.',
      'Interactive 25-Check Custom Kernel Studio (/system/kernel & axonwallctl kernel): Inventories CPU flags/ISA (-march x86-64-v2/v3/v4/native), IOMMU, UEFI Secure Boot, TPM 2.0, watchdogs, PCIe/NIC/NVMe devices, and active lsmod modules; audits /boot/config-* or /proc/config.gz against 25 checks (including ebpf-tcx-uprobe-harvester); compiles minimal localmodconfig fragments asynchronously; and stages installs via ZFSBootMenu clones or side-by-side GRUB.',
      'Unified Rebrand & Plymouth Boot Splash: Brick wall, shield, and crossed axes rebrand across Web Console, GRUB, ZFSBootMenu, and Plymouth boot splash, plus isolated chroot pseudo-fs mounts for clean QCOW2 cloud image builds.',
    ],
  },
  {
    version: 'v0.11.69 – v0.11.71',
    date: 'November 13–15, 2026',
    tag: 'Arch Parity, Rootless Dev & Installer Safety',
    highlights: [
      'Arch / Omarchy Linux Parity & Zero-Config Rootless Dev Sandbox (.axonwall-dev/): Run axonwalld, Web Console, and axonwallctl inside a workspace-local rootless sandbox, with Arch Linux distro detection, pacman upgrades, /proc/config.gz kernel audit fallback, Cloud-Init symlink guards, and dev CSRF/auth hardening.',
      'Installer OS/Disk Detection & Reinstall Safety Guards: Hides installer menus on already-installed booted systems, detects existing OS and ZFS partitions on candidate disks, and requires explicit confirmation before destructive writes.',
      'First-Boot Password Recovery & Cross-Edition Credential Guarantees: Fixes unprovisioned console password-setter glitch loops and ensures consistent default credentials across axonwall, vault, and k3s-storage editions.',
    ],
  },
  {
    version: 'v0.11.68',
    date: 'November 13, 2026',
    tag: 'Latest Stable',
    highlights: [
      'Triple-Edition Unified Bootloader Menus: Debian 13 UEFI GRUB & BIOS ISOLINUX and Alpine UEFI GRUB & BIOS Syslinux menus expose all three appliance editions directly at boot—Standard NGFW (axonwall), Immutable Vault S3 (vault), and Barebones K3s + Storage (k3s-storage).',
      'CI Preseed & Branding Parity Checks: Enforced automated package and systemd-enable consistency verification across Vault and K3s-Storage Debian installer preseeds in release builds.',
    ],
  },
  {
    version: 'v0.11.66 – v0.11.67',
    date: 'November 11–12, 2026',
    tag: 'Barebones K3s + Storage Profile',
    highlights: [
      'Barebones K3s + OpenZFS/OpenEBS Storage Host Profile (k3s-storage): Headless compute + storage edition enabling core-k3s and core-nas cleanly in host mode (core-firewall=false) with pre-staged OpenEBS ZFS-LocalPV CSI manifests, minimal host nftables, and server/agent cluster join.',
      'Cross-Distro Firstboot & Cloud-Init Parity: Integrated k3s-storage across the 5-step axonwall-console --install wizard, Debian preseeds, Alpine OpenRC firstboot, and @axonwall/lib Cloud-Init & K3s compilers.',
    ],
  },
  {
    version: 'v0.11.64 – v0.11.65',
    date: 'November 10–11, 2026',
    tag: 'BPF_TOKEN, Dual XDP & 9x Import',
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
            Latest Official Release: v0.13.1 (2026-11-22) • Signed with Ed25519 &amp; SHA-256
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
            Releases &amp; Installation Media
          </h1>

          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Every Axonwall release is built deterministically via GitHub Actions and published with 64-character SHA-256
            checksums and detached Ed25519 cryptographic signatures (
            <code className="text-slate-200 font-mono">.sha256.sig</code>) verified against{' '}
            <code className="text-emerald-400 font-mono">/etc/axonwall/release-signing.pub</code>. Standard NGFW,
            Minimal Reduced Attack Surface, Immutable Vault S3, and Barebones K3s + Storage editions all ship inside the unified bare-metal ISO.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href="https://github.com/axonwall/axonwall/releases/tag/v0.13.1"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition flex items-center gap-2 shadow-lg shadow-emerald-950/60"
            >
              <ExternalLink className="w-4 h-4" /> View v0.13.1 on GitHub Releases
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
                Official v0.13.1 Build Matrix • 2026-11-22
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
                        {item.sha256 || `Download .sha256 & .sha256.sig from GitHub v0.13.1 release assets`}
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
                            : 'Signed .sha256 and .sha256.sig attached to v0.13.1 GitHub Release'}
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
              <span>1. Verify v0.13.1 SHA-256 &amp; Ed25519 Signature</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every v0.13.1 release artifact is signed with the Axonwall Release Signing Key. Verify both the SHA-256
              digest and the detached Ed25519 signature before flashing or booting:
            </p>
            <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-300 overflow-x-auto leading-relaxed">
{`# Download v0.13.1 ISO + checksum + Ed25519 signature
curl -LO https://github.com/axonwall/axonwall/releases/download/v0.13.1/axonwall-debian13-amd64.iso
curl -LO https://github.com/axonwall/axonwall/releases/download/v0.13.1/axonwall-debian13-amd64.iso.sha256
curl -LO https://github.com/axonwall/axonwall/releases/download/v0.13.1/axonwall-debian13-amd64.iso.sha256.sig

# Verify SHA-256 checksum
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

# Install standalone v0.13.1 package (or minimal / vault / k3s-storage edition)
sudo apt install ./axonwall_0.13.1_amd64.deb`}
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
