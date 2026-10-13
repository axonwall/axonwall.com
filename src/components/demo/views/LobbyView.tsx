'use client';

import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Cpu,
  HardDrive,
  Activity,
  ArrowDownLeft,
  ArrowUpRight,
  Server,
  Layers,
  Terminal,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Flame,
  Zap,
} from 'lucide-react';
import { DemoServiceStatus, DemoViewKey } from '../demoState';

interface LobbyViewProps {
  services: DemoServiceStatus[];
  onSelectView: (view: DemoViewKey) => void;
}

export function LobbyView({ services, onSelectView }: LobbyViewProps) {
  // Simulated real-time throughput fluctuations
  const [wanRx, setWanRx] = useState(248);
  const [wanTx, setWanTx] = useState(42);
  const [cpuUsage, setCpuUsage] = useState(14);

  useEffect(() => {
    const timer = setInterval(() => {
      setWanRx((prev) => Math.min(950, Math.max(80, prev + Math.floor(Math.random() * 31) - 15)));
      setWanTx((prev) => Math.min(250, Math.max(20, prev + Math.floor(Math.random() * 11) - 5)));
      setCpuUsage((prev) => Math.min(45, Math.max(8, prev + Math.floor(Math.random() * 5) - 2)));
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Title & Intro */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <span>System Dashboard</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-normal">
              Appliance Online
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Operational overview of Axonwall Linux appliance and nftables data plane.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onSelectView('diagnostics')}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 flex items-center gap-1.5 transition-colors"
          >
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>Trace Packet Flow</span>
          </button>
          <button
            onClick={() => onSelectView('firewall')}
            className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <Flame className="w-3.5 h-3.5" />
            <span>Manage Rules &rarr;</span>
          </button>
        </div>
      </div>

      {/* Top 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Data Plane */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 block font-medium">Data Plane Engine</span>
            <span className="text-lg font-bold text-white mt-1 block">nftables</span>
            <span className="text-[11px] text-emerald-400 flex items-center gap-1 mt-1 font-mono">
              <CheckCircle2 className="w-3.5 h-3.5" /> Fastpath Active (Flowtable)
            </span>
          </div>
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
        </div>

        {/* Card 2: Uptime & OS */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 block font-medium">System Uptime</span>
            <span className="text-lg font-bold text-white mt-1 block">14d 6h 32m</span>
            <span className="text-[11px] text-slate-400 mt-1 block font-mono">Debian 13 (Linux 6.12)</span>
          </div>
          <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
            <Activity className="w-5 h-5" />
          </div>
        </div>

        {/* Card 3: CPU & RAM */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 block font-medium">CPU Utilization</span>
            <span className="text-lg font-bold text-white mt-1 block">{cpuUsage}%</span>
            <span className="text-[11px] text-slate-400 mt-1 block font-mono">RAM: 2.1 / 16 GB (13%)</span>
          </div>
          <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <Cpu className="w-5 h-5" />
          </div>
        </div>

        {/* Card 4: Conntrack States */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 block font-medium">Conntrack Capacity</span>
            <span className="text-lg font-bold text-white mt-1 block">2,419 / 2.0M</span>
            <span className="text-[11px] text-emerald-400 mt-1 block font-mono">0.12% utilization</span>
          </div>
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Layers className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Real-time Throughput HUD */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* WAN Interface */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <h3 className="font-semibold text-sm text-white">WAN Throughput (eth0)</h3>
            </div>
            <span className="text-xs font-mono text-slate-400">Public IP: 198.51.100.22</span>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="p-3 bg-slate-950/70 border border-slate-800/80 rounded-lg">
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <ArrowDownLeft className="w-3.5 h-3.5 text-emerald-400" />
                <span>Current Inbound</span>
              </div>
              <div className="text-xl font-bold font-mono text-white mt-1">
                {wanRx} <span className="text-xs font-normal text-slate-400">Mbps</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                <div
                  className="bg-emerald-400 h-full rounded-full transition-all duration-1000"
                  style={{ width: `${Math.min(100, (wanRx / 1000) * 100)}%` }}
                />
              </div>
            </div>

            <div className="p-3 bg-slate-950/70 border border-slate-800/80 rounded-lg">
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400" />
                <span>Current Outbound</span>
              </div>
              <div className="text-xl font-bold font-mono text-white mt-1">
                {wanTx} <span className="text-xs font-normal text-slate-400">Mbps</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                <div
                  className="bg-cyan-400 h-full rounded-full transition-all duration-1000"
                  style={{ width: `${Math.min(100, (wanTx / 500) * 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* LAN Interface */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
              <h3 className="font-semibold text-sm text-white">LAN Network (eth1)</h3>
            </div>
            <span className="text-xs font-mono text-slate-400">Gateway: 192.168.100.1/24</span>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="p-3 bg-slate-950/70 border border-slate-800/80 rounded-lg">
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Server className="w-3.5 h-3.5 text-indigo-400" />
                <span>Active DHCP Leases</span>
              </div>
              <div className="text-xl font-bold font-mono text-white mt-1">
                48 <span className="text-xs font-normal text-slate-400">clients</span>
              </div>
              <span className="text-[11px] text-slate-500 font-mono mt-1 block">Kea DHCPv4 active</span>
            </div>

            <div className="p-3 bg-slate-950/70 border border-slate-800/80 rounded-lg">
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>DNS Queries Today</span>
              </div>
              <div className="text-xl font-bold font-mono text-white mt-1">
                142.8k <span className="text-xs font-normal text-slate-400">reqs</span>
              </div>
              <span className="text-[11px] text-emerald-400 font-mono mt-1 block">3,912 sinkholed (RPZ)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Service Supervisor Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-sm text-white flex items-center gap-2">
              <Server className="w-4 h-4 text-emerald-400" />
              <span>Service Supervisor</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Core system daemons and Linux security engines managed by systemd
            </p>
          </div>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
            {services.filter((s) => s.status === 'active').length} / {services.length} Healthy
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/60 border-b border-slate-800 text-slate-400 font-medium">
              <tr>
                <th className="p-3 pl-4">Service</th>
                <th className="p-3">systemd Unit</th>
                <th className="p-3">Purpose</th>
                <th className="p-3">Memory</th>
                <th className="p-3">Uptime</th>
                <th className="p-3 pr-4">State</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-200 font-mono">
              {services.map((srv) => (
                <tr key={srv.unit} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3 pl-4 font-semibold text-white font-sans">{srv.name}</td>
                  <td className="p-3 text-slate-400 text-[11px]">{srv.unit}</td>
                  <td className="p-3 text-slate-300 font-sans">{srv.description}</td>
                  <td className="p-3 text-slate-400">{srv.memory}</td>
                  <td className="p-3 text-slate-400">{srv.uptime}</td>
                  <td className="p-3 pr-4">
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 text-[11px] font-sans font-medium border border-emerald-500/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      Active
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
