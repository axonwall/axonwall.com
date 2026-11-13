'use client';

import React, { useState } from 'react';
import { Settings, RefreshCw, Building2, HardDrive, ShieldCheck, CheckCircle2, Download, GitBranch, Cpu } from 'lucide-react';

export function SystemView() {
  const [activeTab, setActiveTab] = useState<'ab' | 'git' | 'sso' | 'backup' | 'kernel'>('ab');
  const [kernelTrack, setKernelTrack] = useState<'universal' | 'stripped'>('stripped');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownloadBackup = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
          <Settings className="w-6 h-6 text-emerald-400" />
          <span>System, A/B Boot, Etckeeper Git &amp; Enterprise SSO</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          ZFSBootMenu v3.1.0 &amp; A/B dual-root upgrades, Etckeeper `/etc` Git revision tracking, OpenLDAP + OIDC SSO, and snapshots.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800 space-x-6 text-xs font-semibold overflow-x-auto">
        <button
          onClick={() => setActiveTab('ab')}
          className={`pb-3 flex items-center gap-2 transition-colors border-b-2 whitespace-nowrap ${
            activeTab === 'ab'
              ? 'border-emerald-400 text-emerald-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <RefreshCw className="w-4 h-4" />
          <span>A/B Dual-Root &amp; ZFSBootMenu</span>
        </button>

        <button
          onClick={() => setActiveTab('git')}
          className={`pb-3 flex items-center gap-2 transition-colors border-b-2 whitespace-nowrap ${
            activeTab === 'git'
              ? 'border-emerald-400 text-emerald-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <GitBranch className="w-4 h-4" />
          <span>Etckeeper `/etc` Git History</span>
        </button>

        <button
          onClick={() => setActiveTab('sso')}
          className={`pb-3 flex items-center gap-2 transition-colors border-b-2 whitespace-nowrap ${
            activeTab === 'sso'
              ? 'border-emerald-400 text-emerald-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Unified OpenLDAP + OIDC SSO</span>
        </button>

        <button
          onClick={() => setActiveTab('backup')}
          className={`pb-3 flex items-center gap-2 transition-colors border-b-2 whitespace-nowrap ${
            activeTab === 'backup'
              ? 'border-emerald-400 text-emerald-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <HardDrive className="w-4 h-4" />
          <span>Backup &amp; Snapshots</span>
        </button>

        <button
          onClick={() => setActiveTab('kernel')}
          className={`pb-3 flex items-center gap-2 transition-colors border-b-2 whitespace-nowrap ${
            activeTab === 'kernel'
              ? 'border-emerald-400 text-emerald-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Cpu className="w-4 h-4" />
          <span>Custom Kernel Studio</span>
        </button>
      </div>

      {/* TAB 1: A/B DUAL-ROOT */}
      {activeTab === 'ab' && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
            <h3 className="font-semibold text-sm text-white">Unbrickable Dual-Root Operating Architecture</h3>
            <p className="text-xs text-slate-400 mt-1">
              Axonwall maintains two identical immutable operating system slots. System updates write to the standby slot in the background. On reboot, GRUB and the hardware watchdog boot the new slot and automatically roll back if health checks do not pass.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Slot A */}
            <div className="p-5 rounded-xl bg-slate-900 border-2 border-emerald-500/40 space-y-3 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-emerald-500 text-slate-950 font-bold text-[10px] uppercase tracking-wider px-3 py-0.5 rounded-bl-lg">
                Active Slot
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <h4 className="font-bold text-base text-white">Slot A: axon_root_a</h4>
              </div>
              <div className="space-y-1 text-xs font-mono text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-500">Partition:</span>
                  <span>/dev/nvme0n1p2 (8.0 GB ext4)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">OS Version:</span>
                  <span className="text-emerald-400">Axonwall v0.11.68 (Stable)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Kernel / Boot:</span>
                  <span>Linux 6.12.10-amd64 • ZFSBootMenu v3.1.0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Watchdog Status:</span>
                  <span className="text-emerald-400">Validated (Healthy Boot)</span>
                </div>
              </div>
            </div>

            {/* Slot B */}
            <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-slate-800 text-slate-400 font-bold text-[10px] uppercase tracking-wider px-3 py-0.5 rounded-bl-lg">
                Standby Slot
              </div>
              <div className="flex items-center gap-2">
                <RefreshCw className="w-5 h-5 text-slate-400" />
                <h4 className="font-bold text-base text-white">Slot B: axon_root_b</h4>
              </div>
              <div className="space-y-1 text-xs font-mono text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-500">Partition:</span>
                  <span>/dev/nvme0n1p3 (8.0 GB ext4)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">OS Version:</span>
                  <span className="text-slate-400">Ready for OTA Updates</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">State:</span>
                  <span className="text-slate-400">Inactive (Standby)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Last Rollback Image:</span>
                  <span>Axonwall v0.11.62</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-400 flex items-center justify-between">
            <span>Persistent Data Volume: <strong>/dev/nvme0n1p4 (/var/lib/axonwall)</strong></span>
            <span className="text-emerald-400">48.2 GB free / 64 GB</span>
          </div>
        </div>
      )}

      {/* TAB 2: ETCKEEPER GIT HISTORY */}
      {activeTab === 'git' && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="font-semibold text-sm text-white">Etckeeper `/etc` Git Revision Audit (`system-etckeeper`)</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Every committed `/etc/axonwall/*.yaml` reconciliation, APT transaction, and RBAC update is versioned automatically in local Git.
              </p>
            </div>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
              HEAD: 9f41c8e (Clean)
            </span>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden text-xs font-mono">
            <div className="divide-y divide-slate-800">
              {[
                {
                  sha: '9f41c8e',
                  msg: 'axonwalld: confirm firewall.yaml rule-07 OPT1 outbound policy',
                  author: 'admin@axonwall-core',
                  when: '12 mins ago',
                },
                {
                  sha: '4b18a02',
                  msg: 'bpf-lsm: pin axonwall_lsm CVE-2026-31431 AF_ALG socket_bind guard',
                  author: 'systemd-boot',
                  when: '2 hours ago',
                },
                {
                  sha: 'e720d19',
                  msg: 'rosenpass: rotate Classic McEliece + ML-KEM-512 peer manifest',
                  author: 'axonwalld',
                  when: '1 day ago',
                },
              ].map((c) => (
                <div key={c.sha} className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-slate-800/40">
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-bold">
                      {c.sha}
                    </span>
                    <span className="text-slate-200">{c.msg}</span>
                  </div>
                  <div className="text-slate-500 text-[11px]">
                    {c.author} • {c.when}
                  </div>
                </div>
              ))}
            </div>
            <pre className="p-4 bg-slate-950 border-t border-slate-800 text-[11px] leading-relaxed text-slate-300 overflow-x-auto">{`diff --git a/axonwall/firewall.yaml b/axonwall/firewall.yaml
index 3a118c0..9f41c8e 100644
--- a/axonwall/firewall.yaml
+++ b/axonwall/firewall.yaml
@@ -42,4 +42,9 @@ rules:
+  - id: rule-07
+    action: pass
+    interface: opt1
+    destination: any
+    description: Allow OPT1 Attached Subnet Outbound to Internet`}</pre>
          </div>
        </div>
      )}

      {/* TAB 2: ENTERPRISE SSO */}
      {activeTab === 'sso' && (
        <div className="space-y-6">
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-sm text-white">OpenID Connect (OIDC) Identity Provider</h3>
                <p className="text-xs text-slate-400">Configured for corporate single sign-on via Microsoft Entra ID</p>
              </div>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                SSO Enabled
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                <span className="text-slate-500 text-[10px] block">Issuer URL:</span>
                <span className="text-slate-200">https://login.microsoftonline.com/72f988bf.../v2.0</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                <span className="text-slate-500 text-[10px] block">Client ID:</span>
                <span className="text-slate-200">axonwall-firewall-console-app-id</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 sm:col-span-2">
                <span className="text-slate-500 text-[10px] block">Redirect / Callback URI (Port 2966):</span>
                <span className="text-emerald-400 font-bold">https://firewall.corp.local:2966/api/auth/callback/oidc</span>
              </div>
            </div>

            <div className="pt-2">
              <h4 className="text-xs font-semibold text-slate-300 mb-2">Role Mappings (IdP Security Groups to RBAC):</h4>
              <div className="space-y-1.5 text-xs font-mono">
                <div className="p-2.5 bg-slate-950 rounded border border-slate-800 flex justify-between">
                  <span className="text-slate-300">Entra-FirewallAdmins</span>
                  <span className="text-emerald-400 font-bold">Role: admin (Full Read/Write)</span>
                </div>
                <div className="p-2.5 bg-slate-950 rounded border border-slate-800 flex justify-between">
                  <span className="text-slate-300">Entra-SecurityOperations</span>
                  <span className="text-cyan-400 font-bold">Role: operator (Diagnostics & Rules)</span>
                </div>
                <div className="p-2.5 bg-slate-950 rounded border border-slate-800 flex justify-between">
                  <span className="text-slate-300">Entra-ComplianceAuditors</span>
                  <span className="text-slate-400 font-bold">Role: readonly (Audit Logs Only)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: BACKUP */}
      {activeTab === 'backup' && (
        <div className="space-y-6">
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="font-semibold text-sm text-white">Appliance Configuration Snapshot</h3>
            <p className="text-xs text-slate-400">
              Download an encrypted JSON bundle containing all nftables rules, aliases, WireGuard keypairs, and system settings:
            </p>

            <div className="flex items-center gap-3">
              <button
                onClick={handleDownloadBackup}
                className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <Download className="w-4 h-4" />
                <span>Export Configuration (JSON)</span>
              </button>
            </div>

            {downloadSuccess && (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-xs font-mono text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Configuration bundle generated: <strong>axonwall-backup-2026-11-10.json</strong></span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 4: CUSTOM KERNEL STUDIO */}
      {activeTab === 'kernel' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => setKernelTrack('universal')}
              className={`p-5 rounded-xl border text-left transition ${
                kernelTrack === 'universal'
                  ? 'bg-emerald-950/30 border-emerald-500/50'
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm">Track 1: Universal Hardened Kernel</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                  Debian + KSPP
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-2">
                Ships broad hardware module compatibility (NVMe, HBA, VirtIO, NICs) layered with KSPP hardening,
                5-Hook BPF-LSM, K3s cgroups v2, OpenZFS SPL, and nftables LPM XDP.
              </p>
            </button>

            <button
              onClick={() => setKernelTrack('stripped')}
              className={`p-5 rounded-xl border text-left transition ${
                kernelTrack === 'stripped'
                  ? 'bg-sky-950/30 border-sky-500/50'
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm">Track 2: Hardware-Stripped localmodconfig</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/20 text-sky-300">
                  ~78% Fewer Modules
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-2">
                Detects host CPU microarchitecture, PCIe NICs/NVMe, IOMMU, and TPM 2.0 via sysfs, building a tailored
                <code className="text-slate-200 mx-1">.deb</code> that strips unused drivers while locking mandatory runtime bits.
              </p>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-sm text-white">Detected Hardware Inventory (Demo Node)</h4>
                <span className="text-[11px] font-mono text-emerald-400">x86_64 • znver4</span>
              </div>
              <div className="space-y-2 text-xs font-mono text-slate-300">
                <div className="flex justify-between p-2 rounded bg-slate-950 border border-slate-800/80">
                  <span className="text-slate-500">CPU / IOMMU / TPM:</span>
                  <span>AMD EPYC 4564P • AMD-Vi + TPM 2.0</span>
                </div>
                <div className="flex justify-between p-2 rounded bg-slate-950 border border-slate-800/80">
                  <span className="text-slate-500">NIC Drivers:</span>
                  <span>ixgbe (2x 10GbE SFP+), igc (2x 2.5GbE)</span>
                </div>
                <div className="flex justify-between p-2 rounded bg-slate-950 border border-slate-800/80">
                  <span className="text-slate-500">Storage / FS:</span>
                  <span>nvme, zfs, overlay, wireguard, cls_bpf</span>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-sm text-white">24-Check Kernel Security &amp; Feature Audit</h4>
                <span className="text-xs font-mono font-bold text-emerald-400">Score: 96 / 100</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-2 rounded bg-slate-950 border border-emerald-500/30 text-emerald-300">
                  ✓ CONFIG_SECURITY_LOCKDOWN_LSM
                </div>
                <div className="p-2 rounded bg-slate-950 border border-emerald-500/30 text-emerald-300">
                  ✓ CONFIG_BPF_LSM + BPF_JIT
                </div>
                <div className="p-2 rounded bg-slate-950 border border-emerald-500/30 text-emerald-300">
                  ✓ CONFIG_CGROUPS + USER_NS
                </div>
                <div className="p-2 rounded bg-slate-950 border border-emerald-500/30 text-emerald-300">
                  ✓ CONFIG_NF_TABLES + VETH
                </div>
              </div>
              <div className="text-[11px] font-mono text-slate-400 pt-1">
                Active Profile: <span className="text-white">{kernelTrack === 'universal' ? 'universal-kspp (make bindeb-pkg)' : 'stripped-host-localmod (znver4 + KSPP)'}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
