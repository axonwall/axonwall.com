'use client';

import React, { useState } from 'react';
import {
  Database,
  Cpu,
  ArrowRightLeft,
  Lock,
  Unlock,
  CheckCircle2,
  RefreshCw,
  HardDrive,
  FileCode,
  Boxes,
  CloudUpload,
} from 'lucide-react';

interface ConvergedPlatformViewProps {
  initialSection?: 'storage' | 'compute' | 'migration';
}

export function ConvergedPlatformView({ initialSection = 'storage' }: ConvergedPlatformViewProps) {
  const [section, setSection] = useState<'storage' | 'compute' | 'migration'>(initialSection);
  const [banner, setBanner] = useState<string | null>(null);
  const [checkpointActive, setCheckpointActive] = useState(true);
  const [vaultLocked, setVaultLocked] = useState(false);
  const [cniMode, setCniMode] = useState<'cilium-ebpf' | 'flannel'>('cilium-ebpf');
  const [showLibvirtXml, setShowLibvirtXml] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState<'proxmox' | 'truenas' | 'opnsense' | 'pfsense'>('proxmox');

  const notify = (msg: string) => {
    setBanner(msg);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Database className="w-6 h-6 text-emerald-400" />
            <span>Converged OpenZFS 2.3 NAS, KVM/Libvirt, Cilium K3s &amp; Migration Studio</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Single bare-metal Linux 6.12 LTS platform replacing OPNsense, TrueNAS SCALE, Proxmox VE, and standalone K8s nodes.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
          <button
            onClick={() => setSection('storage')}
            className={`px-3 py-1.5 rounded-lg transition ${
              section === 'storage' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            OpenZFS 2.3 NAS
          </button>
          <button
            onClick={() => setSection('compute')}
            className={`px-3 py-1.5 rounded-lg transition ${
              section === 'compute' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            KVM / LXC / Cilium K3s
          </button>
          <button
            onClick={() => setSection('migration')}
            className={`px-3 py-1.5 rounded-lg transition ${
              section === 'migration' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            9-Vendor Migration
          </button>
        </div>
      </div>

      {banner && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 flex items-center justify-between gap-2">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            {banner}
          </span>
          <button onClick={() => setBanner(null)}>✕</button>
        </div>
      )}

      {section === 'storage' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white font-mono">tank (RAID-Z2 + Special &amp; Dedup NVMe)</h3>
                  <p className="text-xs text-slate-400">6x 16TB SAS HDD + 2x Gen4 NVMe Special VDEV + 2x NVMe Fast Dedup</p>
                </div>
                <span className="px-2.5 py-1 rounded-md bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-bold">
                  ONLINE • 99.4% ARC HIT
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 block">Special Small-Blocks</span>
                  <span className="text-cyan-300">≤ 32K pinned to NVMe mirror</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 block">Pool Checkpoint</span>
                  <span className={checkpointActive ? 'text-emerald-400' : 'text-slate-400'}>
                    {checkpointActive ? 'Armed (Rewind Ready)' : 'None'}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800 text-xs">
                <button
                  onClick={() => notify('Started OpenZFS scrub + NVMe TRIM across pool tank (0 checksum errors).')}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-emerald-400" /> Scrub &amp; TRIM
                </button>
                <button
                  onClick={() => {
                    setCheckpointActive(!checkpointActive);
                    notify(
                      !checkpointActive
                        ? 'Created atomic pool-wide ZFS checkpoint on tank.'
                        : 'Discarded ZFS checkpoint on tank; space reclaimed.'
                    );
                  }}
                  className="px-3 py-1.5 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 text-cyan-300"
                >
                  {checkpointActive ? 'Discard Checkpoint' : 'Create Checkpoint'}
                </button>
                <button
                  onClick={() => notify('Initiated non-blocking smartctl -t short self-test across /dev/nvme0n1..nvme3n1.')}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300"
                >
                  <HardDrive className="w-3.5 h-3.5 inline mr-1" /> S.M.A.R.T. Short Test
                </button>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white">Native Encrypted Datasets, SAN &amp; Rclone Cloud Sync</h3>
                <span className="text-xs font-mono text-amber-300">AES-256-GCM</span>
              </div>

              <div className="space-y-2 text-xs font-mono">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="text-white font-bold">tank/vault-finance</div>
                    <div className="text-slate-400 text-[11px]">SMB3 Multichannel + VSS + Recycle • sec=krb5p NFSv4</div>
                  </div>
                  <button
                    onClick={() => {
                      setVaultLocked(!vaultLocked);
                      notify(
                        !vaultLocked
                          ? 'Unloaded ZFS AES-256-GCM key and unmounted tank/vault-finance.'
                          : 'Loaded ZFS AES-256-GCM key and mounted tank/vault-finance.'
                      );
                    }}
                    className={`px-2.5 py-1 rounded border flex items-center gap-1 ${
                      vaultLocked
                        ? 'bg-amber-500/15 border-amber-500/30 text-amber-300'
                        : 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300'
                    }`}
                  >
                    {vaultLocked ? <Unlock className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
                    {vaultLocked ? 'Unlock Key' : 'Lock Key'}
                  </button>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="text-cyan-300 font-bold">iqn.2026-10.io.axonwall:san.lun0</div>
                    <div className="text-slate-400 text-[11px]">ZVOL /dev/zvol/tank/vm-lun0 (4K block, CHAP ACL)</div>
                  </div>
                  <span className="text-emerald-400">3260/TCP ACTIVE</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="text-white font-bold">rclone: nightly-b2-crypt</div>
                    <div className="text-slate-400 text-[11px]">/mnt/tank/shares → b2://axonwall-dr (Client-Side Crypt)</div>
                  </div>
                  <button
                    onClick={() => notify('Executed encrypted rclone sync nightly-b2-crypt (delta 142.8 MB pushed in 1.9s).')}
                    className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-sans font-semibold flex items-center gap-1"
                  >
                    <CloudUpload className="w-3.5 h-3.5" /> Sync Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {section === 'compute' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-cyan-400" /> KVM/QEMU Hypervisor &amp; Libvirt Domain XML
                </h3>
                <button
                  onClick={() => setShowLibvirtXml(!showLibvirtXml)}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-amber-300 font-mono flex items-center gap-1"
                >
                  <FileCode className="w-3.5 h-3.5" /> {showLibvirtXml ? 'Hide XML' : 'Export Libvirt XML'}
                </button>
              </div>

              <div className="space-y-2 text-xs font-mono">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-cyan-300 font-bold">VM 101 • win11-secops-vdi</span>
                    <span className="text-emerald-400">RUNNING • QGA 10.0.20.41</span>
                  </div>
                  <div className="text-slate-400 text-[11px]">
                    OVMF SecureBoot + swtpm v2.0 • 8 vCPU (pinned 0-7) • 16GB 2M Hugepages • VirtioFS /mnt/tank/shared • VNIC SG: sg-workstation
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1 font-sans">
                    <button
                      onClick={() => notify('Created instant zero-copy ZFS linked clone VM 201 (tank/vm-101-disk0@clone -> tank/vm-201-disk0) in 42ms.')}
                      className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-cyan-300"
                    >
                      Zero-Copy Clone
                    </button>
                    <button
                      onClick={() => notify('Completed incremental ZFS ZVOL send/recv + QEMU QMP live migration of VM 101 to ha-peer-02 (downtime 18ms).')}
                      className="px-2.5 py-1 rounded bg-indigo-500/20 border border-indigo-500/30 text-indigo-300"
                    >
                      QMP Live Migrate
                    </button>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="flex items-center justify-between">
                    <span className="text-purple-300 font-bold">LXC 204 • cilium-sensor-ct (Unprivileged UserNS)</span>
                    <span className="text-emerald-400">BPF_TOKEN: network-dataplane</span>
                  </div>
                  <div className="text-slate-400 text-[11px] mt-1">
                    Linux 6.9+ bpffs token mounted • XDP/TC allowed • kprobe/tracepoint/lsm blocked by CO-RE BPF-LSM
                  </div>
                </div>
              </div>

              {showLibvirtXml && (
                <pre className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-[11px] font-mono text-cyan-200 overflow-x-auto">{`<domain type="kvm">
  <name>vm-101-win11-secops-vdi</name>
  <memory unit="MiB">16384</memory>
  <memoryBacking><hugepages/><source type="memfd"/><access mode="shared"/></memoryBacking>
  <os firmware="efi"><loader secure="yes">/usr/share/OVMF/OVMF_CODE_4M.ms.fd</loader></os>
  <devices>
    <tpm model="tpm-crb"><backend type="emulator" version="2.0"/></tpm>
    <filesystem type="mount" accessmode="passthrough"><driver type="virtiofs"/><target dir="zfs-shared"/></filesystem>
  </devices>
</domain>`}</pre>
              )}
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Boxes className="w-4 h-4 text-emerald-400" /> Embedded HA K3s + Cilium eBPF &amp; Converged Ingress
                </h3>
                <span className="text-xs font-mono text-sky-300">{cniMode}</span>
              </div>

              <p className="text-xs text-slate-400">
                Workloads with <code className="text-emerald-300 font-mono">ingressHostname</code> auto-synthesize split-horizon Unbound DNS records, HAProxy TLS SNI backends, and FRR BGP ServiceLB VIP routes.
              </p>

              <div className="flex gap-2 text-xs">
                <button
                  onClick={() => {
                    setCniMode('cilium-ebpf');
                    notify('Switched K3s CNI to Cilium eBPF (--flannel-backend=none --disable-kube-proxy + Hubble + FRR BGP peering).');
                  }}
                  className={`px-3 py-1.5 rounded-lg border font-mono ${
                    cniMode === 'cilium-ebpf'
                      ? 'bg-sky-500/20 border-sky-500/40 text-sky-300'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  Cilium eBPF (Kube-Proxy-Less)
                </button>
                <button
                  onClick={() => {
                    setCniMode('flannel');
                    notify('Switched K3s CNI to Flannel WireGuard-Native mesh.');
                  }}
                  className={`px-3 py-1.5 rounded-lg border font-mono ${
                    cniMode === 'flannel'
                      ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  Flannel WireGuard
                </button>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-white font-bold">immich-photos (axonwall-replicated-ha 200Gi)</span>
                  <span className="text-cyan-300">https://photos.axonwall.local</span>
                </div>
                <div className="text-slate-400 text-[11px]">
                  Auto-provisioned: Unbound A/AAAA → 192.168.1.1 • HAProxy fe_converged_tls SNI ACL • ServiceLB BGP 192.168.1.241/32
                </div>
              </div>

              <button
                onClick={() => notify('Saved embedded K3s etcd snapshot etcd-snap-2026-11-11 and replicated encrypted copy to S3 vault.')}
                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white"
              >
                Save Etcd Snapshot (Local + S3)
              </button>
            </div>
          </div>
        </div>
      )}

      {section === 'migration' && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <ArrowRightLeft className="w-4 h-4 text-purple-400" /> 9-Vendor Unified Appliance Migration Studio
              </h3>
              <p className="text-xs text-slate-400">
                Non-destructively merge OPNsense/pfSense firewalls, Proxmox VE 8.x hypervisors, and TrueNAS SCALE storage appliances into one DesiredState YAML bundle.
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 text-xs font-mono">
              {(['proxmox', 'truenas', 'opnsense', 'pfsense'] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setSelectedVendor(v)}
                  className={`px-2.5 py-1 rounded-lg border uppercase ${
                    selectedVendor === v
                      ? 'bg-purple-500/20 border-purple-500/40 text-purple-300'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 overflow-x-auto">
            {selectedVendor === 'proxmox'
              ? `# Parsed Proxmox VE 8.x Cluster Bundle (/etc/pve/qemu-server/*.conf + lxc/*.conf + firewall/cluster.fw)
✓ Imported 4 KVM Virtual Machines (OVMF UEFI, swtpm v2.0, VirtIO ZVOLs, PCIe VFIO passthrough)
✓ Imported 3 Unprivileged LXC Containers -> mapped to /etc/axonwall/virt.yaml
✓ Imported 2 Bridges (vmbr0, vmbr1) + 3 Security Groups -> compiled to per-VNIC nftables chains`
              : selectedVendor === 'truenas'
              ? `# Parsed TrueNAS SCALE SQLite/JSON Configuration Export
✓ Imported 2 OpenZFS Pools (tank RAID-Z2 + Special NVMe VDEV) & 9 Datasets (AES-256-GCM preserved)
✓ Imported 6 SMB3 Shares (shadow_copy2, vfs_fruit Time Machine, vfs_recycle) & 4 Kerberos NFSv4 Exports
✓ Imported 2 iSCSI ZVOL Targets + 3 Encrypted rclone Cloud Sync Tasks -> /etc/axonwall/storage.yaml`
              : selectedVendor === 'opnsense'
              ? `# Parsed OPNsense config.xml (MVC + Legacy Rules, Aliases, WireGuard, Kea DHCPv4/v6 & Unbound)
✓ Imported 7 VLAN Interfaces, 14 Aliases, 38 Stateful Rules (0 shadowed rules detected)
✓ Imported NPTv6 + 1:1 BINAT + Outbound NAT + Kea DHCPv6 IA_PD scopes -> /etc/axonwall/firewall.yaml`
              : `# Parsed pfSense Plus XML Backup
✓ Imported Multi-WAN Gateway Groups, FRR BGP Neighbors, OpenVPN -> ovpn-dco Kernel Offload
✓ Imported Static DHCP Reservations & Split-Horizon Unbound Host Overrides -> Ready for 120s Commit-Confirm`}
          </pre>

          <button
            onClick={() =>
              notify(
                `Merged ${selectedVendor.toUpperCase()} configuration non-destructively into DesiredState buffer with 60s Commit-Confirm protection.`
              )
            }
            className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-xs font-semibold text-white"
          >
            Stage Non-Destructive Multi-Appliance Merge
          </button>
        </div>
      )}
    </div>
  );
}
