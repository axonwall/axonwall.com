'use client';

import React, { useState } from 'react';
import { Wifi, Copy, Check, Server, Shield, RefreshCw, Zap } from 'lucide-react';
import { DemoSatelliteNode, INITIAL_SATELLITES } from '../demoState';

export function FleetView() {
  const [nodes] = useState<DemoSatelliteNode[]>(INITIAL_SATELLITES);
  const [ztpToken] = useState('ztp_sec_e8f20b33a019482ca0e8b2');
  const [copiedZtp, setCopiedZtp] = useState(false);

  const ztpCommand = `./axonwall-satellite \\
  -core wss://hub.axonwall.corp:2966/ws/satellite \\
  -id sat-node-$(cat /sys/class/net/eth0/address | tr -d ':') \\
  -token ${ztpToken}`;

  const handleCopyZtp = () => {
    navigator.clipboard.writeText(ztpCommand);
    setCopiedZtp(true);
    setTimeout(() => setCopiedZtp(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Wifi className="w-6 h-6 text-emerald-400" />
            <span>Satellite Fleet Manager</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Centralized orchestration of remote edge micro-firewalls running on OpenWrt, Debian, or Raspberry Pi.
          </p>
        </div>

        <button
          onClick={handleCopyZtp}
          className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-sm transition-colors"
        >
          {copiedZtp ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copiedZtp ? 'Copied ZTP Command' : 'Copy Edge ZTP Bootstrap'}</span>
        </button>
      </div>

      {/* Edge Satellites Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {nodes.map((node) => (
          <div
            key={node.id}
            className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3 hover:border-slate-700 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <h3 className="font-bold text-sm text-white">{node.name}</h3>
              </div>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                {node.latencyMs} ms RTT
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-mono text-slate-300">
              <div>
                <span className="text-slate-500 text-[10px] block">Public IPv4:</span>
                <span>{node.ip}</span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] block">Region:</span>
                <span className="font-sans text-slate-200">{node.region}</span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] block">Policy Version:</span>
                <span className="text-emerald-400">v{node.policyVersion} (Synchronized)</span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] block">Last Heartbeat:</span>
                <span>{node.lastHeartbeatSec}s ago</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-3">
                <span>CPU: <strong className="text-white">{node.cpuPercent}%</strong></span>
                <span>RAM: <strong className="text-white">{node.memoryPercent}%</strong></span>
              </div>
              <span className="text-emerald-400 font-mono">{node.activeTunnels} Mesh Tunnels</span>
            </div>
          </div>
        ))}
      </div>

      {/* Bootstrapping Command Card */}
      <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
        <h3 className="font-semibold text-sm text-white flex items-center gap-2">
          <Zap className="w-4 h-4 text-emerald-400" />
          <span>Zero-Touch Provisioning (ZTP) Command via Port 2966</span>
        </h3>
        <p className="text-xs text-slate-400">
          Execute this single command on any remote Linux or OpenWrt edge device to automatically join the fleet and download its declarative nftables policy:
        </p>

        <pre className="p-3 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-emerald-400 overflow-x-auto">
          {ztpCommand}
        </pre>
      </div>
    </div>
  );
}
