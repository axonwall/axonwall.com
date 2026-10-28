'use client';

import React, { useState } from 'react';
import {
  ShieldAlert,
  Ban,
  Globe,
  Radio,
  Search,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Play,
  Lock,
} from 'lucide-react';
import { DemoCrowdSecAlert, INITIAL_CROWDSEC_ALERTS } from '../demoState';

export function ThreatDefenseView() {
  const [activeTab, setActiveTab] = useState<'sinkhole' | 'geoip' | 'crowdsec' | 'rootkit'>('sinkhole');

  // DNS Sinkhole Test State
  const [testDomain, setTestDomain] = useState('');
  const [testResult, setTestResult] = useState<{ domain: string; blocked: boolean; category?: string } | null>(null);

  // GeoIP Country Block Toggles
  const [blockedCountries, setBlockedCountries] = useState<Record<string, boolean>>({
    RU: true,
    CN: true,
    KP: true,
    IR: true,
    BY: false,
    BR: false,
    VN: false,
  });

  // CrowdSec decisions state
  const [alerts, setAlerts] = useState<DemoCrowdSecAlert[]>(INITIAL_CROWDSEC_ALERTS);
  const [banIp, setBanIp] = useState('');
  const [banReason, setBanReason] = useState('');

  const handleTestDomain = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testDomain.trim()) return;
    const domain = testDomain.toLowerCase().trim();
    const isBad =
      domain.includes('malware') ||
      domain.includes('telemetry') ||
      domain.includes('ad') ||
      domain.includes('c2') ||
      domain.endsWith('.ru') ||
      domain.endsWith('.top') ||
      domain.includes('track');

    setTestResult({
      domain,
      blocked: isBad,
      category: isBad ? 'High-Risk Malicious / Telemetry Feed (OISD)' : 'Legitimate Domain (Pass)',
    });
  };

  const handleAddBan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!banIp.trim()) return;
    const newAlert: DemoCrowdSecAlert = {
      id: `cs-${Date.now()}`,
      ip: banIp.trim(),
      country: 'MANUAL',
      reason: banReason.trim() || 'Manual admin block decision',
      action: 'ban',
      duration: '24h remaining',
      timestamp: 'Just now',
    };
    setAlerts([newAlert, ...alerts]);
    setBanIp('');
    setBanReason('');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
          <ShieldAlert className="w-6 h-6 text-emerald-400" />
          <span>Threat Defense & Security Intelligence</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Automated line-rate packet drops, multi-feed DNS sinkholes, GeoIP filtering, and CrowdSec bouncer.
        </p>
      </div>

      {/* Sub Tabs */}
      <div className="flex border-b border-slate-800 space-x-6 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('sinkhole')}
          className={`pb-3 flex items-center gap-2 transition-colors border-b-2 ${
            activeTab === 'sinkhole'
              ? 'border-emerald-400 text-emerald-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Ban className="w-4 h-4" />
          <span>DNS Sinkhole (RPZ)</span>
        </button>

        <button
          onClick={() => setActiveTab('geoip')}
          className={`pb-3 flex items-center gap-2 transition-colors border-b-2 ${
            activeTab === 'geoip'
              ? 'border-emerald-400 text-emerald-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Globe className="w-4 h-4" />
          <span>GeoIP Location Filter</span>
        </button>

        <button
          onClick={() => setActiveTab('crowdsec')}
          className={`pb-3 flex items-center gap-2 transition-colors border-b-2 ${
            activeTab === 'crowdsec'
              ? 'border-emerald-400 text-emerald-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Radio className="w-4 h-4" />
          <span>CrowdSec Bouncer</span>
        </button>

        <button
          onClick={() => setActiveTab('rootkit')}
          className={`pb-3 flex items-center gap-2 transition-colors border-b-2 ${
            activeTab === 'rootkit'
              ? 'border-emerald-400 text-emerald-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Lock className="w-4 h-4" />
          <span>Ghost-in-the-Ring & Rootkit Hunter</span>
        </button>
      </div>

      {/* TAB 1: DNS SINKHOLE */}
      {activeTab === 'sinkhole' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-xs text-slate-400 font-medium">Sinkholed Queries Today</span>
              <div className="text-2xl font-bold font-mono text-emerald-400 mt-1">3,912</div>
              <span className="text-[11px] text-slate-500 font-mono mt-1 block">2.7% of total DNS requests</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-xs text-slate-400 font-medium">Active Threat Feeds</span>
              <div className="text-2xl font-bold font-mono text-white mt-1">4 Lists</div>
              <span className="text-[11px] text-slate-500 font-mono mt-1 block">2,481,200 malicious domains</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-xs text-slate-400 font-medium">Response Policy Zone</span>
              <div className="text-2xl font-bold font-mono text-cyan-400 mt-1">0.0.0.0</div>
              <span className="text-[11px] text-slate-500 font-mono mt-1 block">Zero-latency NXDOMAIN return</span>
            </div>
          </div>

          {/* Live Sinkhole Query Tester */}
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="font-semibold text-sm text-white flex items-center gap-2">
              <Search className="w-4 h-4 text-emerald-400" />
              <span>Simulate DNS Domain Sinkhole Evaluation</span>
            </h3>
            <p className="text-xs text-slate-400">
              Test whether a domain or C2 endpoint is recognized and quarantined by the Unbound DNS RPZ engine:
            </p>

            <form onSubmit={handleTestDomain} className="flex gap-2">
              <input
                type="text"
                value={testDomain}
                onChange={(e) => setTestDomain(e.target.value)}
                placeholder="Try: cobaltstrike-c2.ru, tracking.telemetry.microsoft.com, github.com"
                className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors"
              >
                <Play className="w-3.5 h-3.5" />
                <span>Evaluate</span>
              </button>
            </form>

            {testResult && (
              <div
                className={`p-3.5 rounded-lg border text-xs flex items-center justify-between ${
                  testResult.blocked
                    ? 'bg-red-500/10 border-red-500/30 text-red-300'
                    : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                }`}
              >
                <div className="flex items-center gap-2 font-mono">
                  {testResult.blocked ? <XCircle className="w-4 h-4 text-red-400" /> : <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                  <span>{testResult.domain}</span>
                  <span className="text-slate-400 font-sans">&rarr;</span>
                  <span className="font-bold">{testResult.blocked ? 'SINKHOLED (0.0.0.0)' : 'ALLOWED (Resolved)'}</span>
                </div>
                <span className="text-[11px] font-sans text-slate-400">{testResult.category}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: GEOIP FILTER */}
      {activeTab === 'geoip' && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
            <h3 className="font-semibold text-sm text-white">nftables Country Filter Sets</h3>
            <p className="text-xs text-slate-400 mt-1">
              Axonwall uses in-kernel nftables sets populated from MaxMind GeoLite2 databases. Packets from blocked nations are dropped in the prerouting raw table before conntrack allocation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { code: 'RU', name: 'Russian Federation', drops: '84,192' },
              { code: 'CN', name: "People's Republic of China", drops: '124,510' },
              { code: 'KP', name: 'North Korea', drops: '1,280' },
              { code: 'IR', name: 'Islamic Republic of Iran', drops: '24,190' },
              { code: 'BY', name: 'Belarus', drops: '4,102' },
              { code: 'BR', name: 'Brazil', drops: '12,410' },
            ].map((c) => {
              const isBlocked = !!blockedCountries[c.code];
              return (
                <div
                  key={c.code}
                  className={`p-4 rounded-xl border flex items-center justify-between transition-colors ${
                    isBlocked
                      ? 'bg-red-500/10 border-red-500/30'
                      : 'bg-slate-900 border-slate-800'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-sm text-white">{c.code}</span>
                      <span className="text-xs text-slate-300 font-sans">{c.name}</span>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400 mt-1 block">
                      {isBlocked ? `${c.drops} pkts dropped` : 'Pass-through'}
                    </span>
                  </div>

                  <button
                    onClick={() =>
                      setBlockedCountries((prev) => ({
                        ...prev,
                        [c.code]: !prev[c.code],
                      }))
                    }
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      isBlocked
                        ? 'bg-red-600 hover:bg-red-500 text-white'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                    }`}
                  >
                    {isBlocked ? 'Blocked' : 'Allow'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: CROWDSEC BOUNCER */}
      {activeTab === 'crowdsec' && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-sm text-white">Active CrowdSec Decisions</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Collaborative threat intelligence bouncer blocking brute-force attacks and port scans.
              </p>
            </div>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
              Bouncer Active
            </span>
          </div>

          {/* Manual Ban Trigger */}
          <form onSubmit={handleAddBan} className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              required
              placeholder="IP Address (e.g. 198.51.100.99)"
              value={banIp}
              onChange={(e) => setBanIp(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500"
            />
            <input
              type="text"
              placeholder="Reason (e.g. Unauthorized credential stuffing)"
              value={banReason}
              onChange={(e) => setBanReason(e.target.value)}
              className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5"
            >
              <Ban className="w-3.5 h-3.5" />
              <span>Insta-Ban IP</span>
            </button>
          </form>

          {/* Alerts Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/70 border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="p-3 pl-4">Target IP</th>
                  <th className="p-3">Country / Origin</th>
                  <th className="p-3">Detection Scenario</th>
                  <th className="p-3">Duration</th>
                  <th className="p-3">When</th>
                  <th className="p-3 pr-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-mono text-slate-300">
                {alerts.map((a) => (
                  <tr key={a.id} className="hover:bg-slate-800/40">
                    <td className="p-3 pl-4 font-bold text-white">{a.ip}</td>
                    <td className="p-3 font-sans text-slate-400">{a.country}</td>
                    <td className="p-3 font-sans text-red-300">{a.reason}</td>
                    <td className="p-3 text-slate-400">{a.duration}</td>
                    <td className="p-3 font-sans text-slate-500">{a.timestamp}</td>
                    <td className="p-3 pr-4">
                      <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/30 text-[10px] font-bold uppercase">
                        {a.action}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: GHOST-IN-THE-RING & 6-ENGINE ROOTKIT HUNTER */}
      {activeTab === 'rootkit' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-900 border border-emerald-500/30">
              <span className="text-xs text-slate-400 font-medium">Ring-0 BPF_LSM Lockdown</span>
              <div className="text-xl font-bold font-mono text-emerald-400 mt-1">ENFORCED</div>
              <span className="text-[11px] text-slate-500 font-mono mt-1 block">SYS_BPF &amp; io_uring SQPOLL gated</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-xs text-slate-400 font-medium">/proc/kcore XArray Walk</span>
              <div className="text-xl font-bold font-mono text-emerald-400 mt-1">0 Hidden BPF</div>
              <span className="text-[11px] text-slate-500 font-mono mt-1 block">prog_idr matches bpftool (14/14)</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-xs text-slate-400 font-medium">Silicon PMU LBR Telemetry</span>
              <div className="text-xl font-bold font-mono text-cyan-400 mt-1">CLEAN</div>
              <span className="text-[11px] text-slate-500 font-mono mt-1 block">0 NOP-sled / kretprobe trampolines</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-xs text-slate-400 font-medium">6-Engine Malware Suite</span>
              <div className="text-xl font-bold font-mono text-emerald-400 mt-1">6 / 6 PASS</div>
              <span className="text-[11px] text-slate-500 font-mono mt-1 block">Lynis Hardening Index: 92/100</span>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-sm text-white">Host Malware &amp; Ring-0 Rootkit Engines</h3>
                <p className="text-xs text-slate-400">
                  Combined userland forensic scanners and hardware-assisted kernel telemetry (`security-rootkit-hunter`)
                </p>
              </div>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                All Engines Clean
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 text-xs">
              {[
                {
                  name: 'Ghost-in-the-Ring Telemetry (Ring-0)',
                  status: 'VERIFIED',
                  detail: 'Blocks syscall-less io_uring SQPOLL worker implants (iou-sqp-*), audits /proc/kcore prog_idr XArray for DKOM-hidden eBPF programs, and inspects CPU PMU Last Branch Records (LBR).',
                },
                {
                  name: 'rkhunter + chkrootkit',
                  status: 'CLEAN',
                  detail: '248 known Linux kernel rootkit signatures, hidden /proc PID cross-checks, LKM table inspection, and promiscuous packet-sniffer hooks.',
                },
                {
                  name: 'ClamAV Real-Time Guard (clamonacc)',
                  status: 'ACTIVE',
                  detail: 'fanotify kernel mount guard scanning newly written ELF binaries on /tmp, /var/tmp, /dev/shm, and /root before execution.',
                },
                {
                  name: 'AIDE + YARA + Lynis CIS Audit',
                  status: 'HARDENED',
                  detail: 'SHA-512 + xattr integrity verification on /boot and /usr/sbin, YARA live process memory sweeps for C2 beacons, and automated Lynis sysctl scoring.',
                },
              ].map((engine) => (
                <div key={engine.name} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">{engine.name}</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-mono text-[10px]">
                      {engine.status}
                    </span>
                  </div>
                  <p className="text-slate-400 leading-relaxed">{engine.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
