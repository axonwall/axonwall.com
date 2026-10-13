'use client';

import React from 'react';
import { Network, Layers, Compass, CheckCircle2, ArrowRight, ShieldCheck, Activity } from 'lucide-react';

export function InterfacesView() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
          <Network className="w-6 h-6 text-emerald-400" />
          <span>Interfaces & Gateway Topologies</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Hardware NIC binding, 802.1Q VLAN trunking, and Multi-WAN failover routing groups.
        </p>
      </div>

      {/* Interface Assignments Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <h3 className="font-semibold text-sm text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-400" />
            <span>Assigned Network Interfaces</span>
          </h3>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
            4 / 4 Link Up
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/70 border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="p-3 pl-4">Logical Interface</th>
                <th className="p-3">Physical Device</th>
                <th className="p-3">IP Assignment</th>
                <th className="p-3">MAC Address</th>
                <th className="p-3">Link Speed</th>
                <th className="p-3">MTU</th>
                <th className="p-3 pr-4">Carrier</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 font-mono text-slate-200">
              {[
                { name: 'WAN', dev: 'eth0', ip: '198.51.100.22/24 (DHCP Gateway)', role: 'Internet Uplink', mac: '52:54:00:1a:2b:01', speed: '10,000 Mbps Full', mtu: 1500, status: 'UP' },
                { name: 'LAN', dev: 'eth1', ip: '192.168.100.1/24 (Static)', role: 'Authoritative DHCP', mac: '52:54:00:1a:2b:02', speed: '1,000 Mbps Full', mtu: 1500, status: 'UP' },
                { name: 'OPT1', dev: 'eth2', ip: '10.0.50.45/24 (DHCP Client)', role: 'Non-Authoritative Attached', mac: '52:54:00:1a:2b:03', speed: '1,000 Mbps Full', mtu: 1500, status: 'UP' },
                { name: 'OPT2', dev: 'eth3', ip: '172.16.20.10/24 (Static)', role: 'Non-Authoritative Attached', mac: '52:54:00:1a:2b:04', speed: '1,000 Mbps Full', mtu: 1500, status: 'UP' },
                { name: 'WG0', dev: 'wg0', ip: '10.10.0.1/24 (WireGuard)', role: 'Crypto Tunnel', mac: 'Virtual Mesh', speed: 'Line-Rate', mtu: 1420, status: 'UP' },
              ].map((nic) => (
                <tr key={nic.name} className="hover:bg-slate-800/40">
                  <td className="p-3 pl-4 font-bold text-white font-sans flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    {nic.name}
                  </td>
                  <td className="p-3 text-cyan-400">{nic.dev}</td>
                  <td className="p-3 font-semibold text-slate-200">
                    <div>{nic.ip}</div>
                    <div className="text-[10px] text-slate-400 font-sans">{nic.role}</div>
                  </td>
                  <td className="p-3 text-slate-400">{nic.mac}</td>
                  <td className="p-3 text-slate-300 font-sans">{nic.speed}</td>
                  <td className="p-3 text-slate-400">{nic.mtu}</td>
                  <td className="p-3 pr-4">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 text-[10px] font-sans font-bold border border-emerald-500/30">
                      {nic.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Multi-WAN Gateway Failover Monitor */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-emerald-400" />
            <h3 className="font-semibold text-sm text-white">Multi-WAN Tier Failover Engine (dpinger)</h3>
          </div>
          <span className="text-xs font-mono text-slate-400">Policy Group: GATEWAY_FAILOVER_GROUP</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-950/80 border border-emerald-500/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-white">Tier 1: Primary Fiber WAN</span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold uppercase">
                Active Master
              </span>
            </div>
            <div className="text-xs text-slate-400 font-mono">Gateway: 198.51.100.1 • Interface: eth0</div>
            <div className="grid grid-cols-3 gap-2 pt-2 text-center text-xs font-mono">
              <div className="bg-slate-900 p-2 rounded">
                <span className="text-slate-500 block text-[10px]">RTT</span>
                <span className="text-emerald-400 font-bold">4.2 ms</span>
              </div>
              <div className="bg-slate-900 p-2 rounded">
                <span className="text-slate-500 block text-[10px]">RTTD</span>
                <span className="text-white font-bold">0.8 ms</span>
              </div>
              <div className="bg-slate-900 p-2 rounded">
                <span className="text-slate-500 block text-[10px]">Loss</span>
                <span className="text-emerald-400 font-bold">0.0%</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-white">Tier 2: Cellular 5G Backup</span>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 text-[10px] font-mono font-bold uppercase">
                Hot Standby
              </span>
            </div>
            <div className="text-xs text-slate-400 font-mono">Gateway: 192.0.2.1 • Interface: wwan0</div>
            <div className="grid grid-cols-3 gap-2 pt-2 text-center text-xs font-mono">
              <div className="bg-slate-900 p-2 rounded">
                <span className="text-slate-500 block text-[10px]">RTT</span>
                <span className="text-cyan-400 font-bold">24.1 ms</span>
              </div>
              <div className="bg-slate-900 p-2 rounded">
                <span className="text-slate-500 block text-[10px]">RTTD</span>
                <span className="text-white font-bold">3.2 ms</span>
              </div>
              <div className="bg-slate-900 p-2 rounded">
                <span className="text-slate-500 block text-[10px]">Loss</span>
                <span className="text-emerald-400 font-bold">0.0%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
