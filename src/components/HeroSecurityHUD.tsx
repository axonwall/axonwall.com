'use client';

import React, { useState, useEffect } from 'react';
import {
  Shield,
  Activity,
  Zap,
  Terminal,
  Radio,
  CheckCircle2,
  Lock,
  RefreshCw,
  Cpu,
  Layers,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';

export const HeroSecurityHUD: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'stream' | 'nftables' | 'threats'>('stream');
  const [packetCounter, setPacketCounter] = useState(2841920);
  const [threatCount, setThreatCount] = useState(14820);
  const [pingMs, setPingMs] = useState(0.24);

  // Subtle real-time oscillation to give a living system feel
  useEffect(() => {
    const timer = setInterval(() => {
      setPacketCounter((prev) => prev + Math.floor(Math.random() * 450) + 120);
      if (Math.random() > 0.6) {
        setThreatCount((prev) => prev + 1);
      }
      setPingMs(Number((0.2 + Math.random() * 0.08).toFixed(2)));
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full max-w-5xl mx-auto mt-10 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl p-4 sm:p-6 text-left overflow-hidden backdrop-blur-xl animate-glow">
      {/* Background cyber grid & glow */}
      <div className="absolute inset-0 cyber-grid-dense opacity-40 pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top HUD Header Bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <div className="h-4 w-px bg-slate-800 mx-1 hidden sm:block" />
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              LIVE TELEMETRY
            </span>
            <span className="text-xs font-mono text-slate-400 hidden sm:inline">
              Linux 6.12.18-lts • nftables v1.1.0 • x86_64
            </span>
          </div>
        </div>

        {/* Commit-Confirm Safeguard Badge */}
        <div className="flex items-center gap-2 bg-slate-950/80 border border-amber-500/30 px-3 py-1 rounded-lg text-xs font-mono text-amber-300">
          <RefreshCw className="w-3 h-3 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
          <span>Commit-Confirm Watchdog:</span>
          <span className="font-bold text-white bg-amber-950/80 px-1.5 py-0.5 rounded border border-amber-500/40">
            ARMED (60s)
          </span>
          <span className="hidden md:inline text-[10px] text-slate-400 ml-1">Zero Lockout Risk</span>
        </div>
      </div>

      {/* Key Metric Tiles */}
      <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 my-5">
        {/* Metric 1: nftables Line-Rate */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 hover:border-emerald-500/30 transition">
          <div className="flex items-center justify-between text-slate-400 text-[11px] font-mono uppercase">
            <span>nftables Forward</span>
            <Zap className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-lg sm:text-xl font-bold font-mono text-white mt-1">
            {packetCounter.toLocaleString()} <span className="text-xs font-normal text-slate-400">pps</span>
          </div>
          <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1 font-medium">
            <CheckCircle2 className="w-3 h-3 shrink-0" /> Multi-core lockless RSS
          </div>
        </div>

        {/* Metric 2: CAKE Bufferbloat Latency */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 hover:border-sky-500/30 transition">
          <div className="flex items-center justify-between text-slate-400 text-[11px] font-mono uppercase">
            <span>Bufferbloat (CAKE)</span>
            <Activity className="w-3.5 h-3.5 text-sky-400" />
          </div>
          <div className="text-lg sm:text-xl font-bold font-mono text-sky-400 mt-1">
            {pingMs} <span className="text-xs font-normal text-slate-400">ms ping</span>
          </div>
          <div className="text-[11px] text-sky-300 mt-1 flex items-center gap-1 font-medium">
            <CheckCircle2 className="w-3 h-3 shrink-0 text-sky-400" /> DiffServ DSCP voice prio
          </div>
        </div>

        {/* Metric 3: CrowdSec CTI Blocks */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 hover:border-purple-500/30 transition">
          <div className="flex items-center justify-between text-slate-400 text-[11px] font-mono uppercase">
            <span>CrowdSec LAPI Bouncer</span>
            <Radio className="w-3.5 h-3.5 text-purple-400" />
          </div>
          <div className="text-lg sm:text-xl font-bold font-mono text-purple-300 mt-1">
            {threatCount.toLocaleString()} <span className="text-xs font-normal text-slate-400">threat IPs</span>
          </div>
          <div className="text-[11px] text-purple-400 mt-1 flex items-center gap-1 font-medium">
            <Lock className="w-3 h-3 shrink-0" /> Zero reload RAM sets
          </div>
        </div>

        {/* Metric 4: Suricata IPS */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 hover:border-emerald-500/30 transition">
          <div className="flex items-center justify-between text-slate-400 text-[11px] font-mono uppercase">
            <span>Suricata 7 Layer-7</span>
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-lg sm:text-xl font-bold font-mono text-emerald-300 mt-1">
            100% Fail-Open
          </div>
          <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1 font-medium">
            <CheckCircle2 className="w-3 h-3 shrink-0" /> NFQUEUE bypass safe
          </div>
        </div>
      </div>

      {/* Interactive View Switcher Tabs */}
      <div className="relative z-10 flex items-center gap-2 border-b border-slate-800/80 pb-2 mb-3">
        <button
          onClick={() => setActiveTab('stream')}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition flex items-center gap-1.5 ${
            activeTab === 'stream'
              ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <Activity className="w-3.5 h-3.5" /> Real-time Packet Flow
        </button>
        <button
          onClick={() => setActiveTab('nftables')}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition flex items-center gap-1.5 ${
            activeTab === 'nftables'
              ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <Terminal className="w-3.5 h-3.5" /> Atomic nftables Engine
        </button>
        <button
          onClick={() => setActiveTab('threats')}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition flex items-center gap-1.5 ${
            activeTab === 'threats'
              ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <Radio className="w-3.5 h-3.5" /> Threat Defense Map
        </button>
      </div>

      {/* Tab Panels */}
      <div className="relative z-10 rounded-xl bg-slate-950 border border-slate-800 p-4 font-mono text-xs overflow-hidden">
        {activeTab === 'stream' && (
          <div className="space-y-3">
            {/* Visual SVG Packet Waveform */}
            <div className="h-16 w-full flex items-end gap-1 px-1 py-1 bg-slate-900/60 rounded-lg border border-slate-800/60 relative overflow-hidden">
              <div className="absolute top-2 left-3 text-[10px] text-slate-500 font-mono flex items-center gap-2">
                <span>INTERFACE eth0 (WAN 2.5GbE)</span>
                <span className="text-emerald-400">● TX: 1.18 Gbps</span>
                <span className="text-sky-400">● RX: 2.39 Gbps</span>
              </div>
              {[38, 45, 60, 52, 78, 65, 85, 92, 70, 62, 80, 95, 88, 76, 84, 98, 90, 72, 85, 91, 68, 74, 82, 89, 95, 78, 86, 92, 84, 75, 88, 96, 91, 83, 79, 87, 94, 89, 77, 85, 92, 99, 88, 73, 81, 90, 96, 82, 88, 94].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 bg-gradient-to-t from-emerald-500/40 via-emerald-400/80 to-sky-400 rounded-t-sm transition-all duration-500"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] text-slate-400 pt-1">
              <div className="flex items-center justify-between p-2 rounded bg-slate-900/80 border border-slate-800/60">
                <span>Kernel BPF Bypass:</span>
                <span className="text-emerald-400 font-bold">ACTIVE (XDP Offload)</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-slate-900/80 border border-slate-800/60">
                <span>WireGuard Peers:</span>
                <span className="text-sky-400 font-bold">14 Connected (Kernel DCO)</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-slate-900/80 border border-slate-800/60">
                <span>DNS Query Latency:</span>
                <span className="text-purple-400 font-bold">0.8 ms (Local Kea + Unbound)</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'nftables' && (
          <div className="space-y-1 text-slate-300 leading-relaxed overflow-x-auto">
            <div className="text-slate-500"># Atomic transaction: commit-confirm staged in kernel memory</div>
            <div>
              <span className="text-purple-400">table</span> <span className="text-sky-400">inet</span> axonwall &#123;
            </div>
            <div className="pl-4">
              <span className="text-slate-500"># Hardware offloaded fastpath for established flows</span>
            </div>
            <div className="pl-4">
              <span className="text-emerald-400">flowtable</span> ft &#123; <span className="text-amber-400">hook</span> ingress <span className="text-amber-400">priority</span> filter; <span className="text-amber-400">devices</span> = &#123; eth0, eth1 &#125;; &#125;
            </div>
            <div className="pl-4">
              <span className="text-emerald-400">chain</span> forward &#123; <span className="text-amber-400">type</span> filter <span className="text-amber-400">hook</span> forward <span className="text-amber-400">priority</span> 0; <span className="text-rose-400">policy drop;</span>
            </div>
            <div className="pl-8">
              ip protocol &#123; tcp, udp &#125; flow add @ft
            </div>
            <div className="pl-8">
              ct state established,related <span className="text-emerald-400">accept</span>
            </div>
            <div className="pl-8">
              ip saddr @crowdsec_blackhole <span className="text-rose-400">drop</span>
            </div>
            <div className="pl-4">&#125;</div>
            <div>&#125;</div>
            <div className="text-sky-400 pt-2 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Ruleset verified safe. Atomic activation in 1.2ms without dropping state table.</span>
            </div>
          </div>
        )}

        {activeTab === 'threats' && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-[11px] pb-1 border-b border-slate-800">
              <span>ACTIVE DEFENSE FEED</span>
              <span>KERNEL REACTION</span>
              <span>STATUS</span>
            </div>
            <div className="space-y-1.5 text-[11px]">
              <div className="flex items-center justify-between p-1.5 rounded bg-slate-900/60">
                <span className="text-slate-200">CrowdSec Community Consensus (LAPI)</span>
                <span className="text-rose-400 font-mono">18,432 CIDRs dropped</span>
                <span className="text-emerald-400 font-bold">Synchronized</span>
              </div>
              <div className="flex items-center justify-between p-1.5 rounded bg-slate-900/60">
                <span className="text-slate-200">Suricata Layer-7 Emerging Threats</span>
                <span className="text-amber-400 font-mono">NFQUEUE Fail-Open</span>
                <span className="text-emerald-400 font-bold">Inspecting</span>
              </div>
              <div className="flex items-center justify-between p-1.5 rounded bg-slate-900/60">
                <span className="text-slate-200">DNS Blocklist (Ad/Telemetry/Malware)</span>
                <span className="text-sky-400 font-mono">412,890 hostnames sinkholed</span>
                <span className="text-emerald-400 font-bold">0.0ms nxdomain</span>
              </div>
              <div className="flex items-center justify-between p-1.5 rounded bg-slate-900/60">
                <span className="text-slate-200">SYN Flood & Portscan Heuristics</span>
                <span className="text-purple-400 font-mono">nft synproxy active</span>
                <span className="text-emerald-400 font-bold">Shielded</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Status Callout */}
      <div className="relative z-10 mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400 pt-2 border-t border-slate-800/60">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>Zero cloud dependency. All packets analyzed locally on your own hardware.</span>
        </div>
        <div className="font-mono text-[11px] text-slate-500">
          commit-hash: <span className="text-slate-300">db34993</span> • 0 dropped frames
        </div>
      </div>
    </div>
  );
};
