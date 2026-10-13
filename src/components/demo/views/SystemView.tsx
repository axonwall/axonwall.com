'use client';

import React, { useState } from 'react';
import { Settings, RefreshCw, Building2, HardDrive, ShieldCheck, CheckCircle2, Download, Upload } from 'lucide-react';

export function SystemView() {
  const [activeTab, setActiveTab] = useState<'ab' | 'sso' | 'backup'>('ab');
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
          <span>System, A/B Partitions & Enterprise SSO</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Zero-downtime A/B firmware upgrades, identity provider integration, and configuration snapshots.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800 space-x-6 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('ab')}
          className={`pb-3 flex items-center gap-2 transition-colors border-b-2 ${
            activeTab === 'ab'
              ? 'border-emerald-400 text-emerald-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <RefreshCw className="w-4 h-4" />
          <span>A/B Dual-Root Partition Scheme</span>
        </button>

        <button
          onClick={() => setActiveTab('sso')}
          className={`pb-3 flex items-center gap-2 transition-colors border-b-2 ${
            activeTab === 'sso'
              ? 'border-emerald-400 text-emerald-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Enterprise SSO (OIDC / SAML)</span>
        </button>

        <button
          onClick={() => setActiveTab('backup')}
          className={`pb-3 flex items-center gap-2 transition-colors border-b-2 ${
            activeTab === 'backup'
              ? 'border-emerald-400 text-emerald-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <HardDrive className="w-4 h-4" />
          <span>Backup & Snapshots</span>
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
                  <span className="text-emerald-400">Axonwall OS 2026.4.1 (Stable)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Kernel:</span>
                  <span>Linux 6.12.10-amd64</span>
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
                  <span>Axonwall OS 2026.3.8</span>
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
                <span>Configuration bundle generated: <strong>axonwall-backup-2026-10-13.json</strong></span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
