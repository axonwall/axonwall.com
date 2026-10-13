'use client';

import React, { useState } from 'react';
import { KeyRound, Network, QrCode, CheckCircle2, Shield, Plus, Copy, Check } from 'lucide-react';
import { DemoWireGuardPeer, INITIAL_WIREGUARD_PEERS } from '../demoState';

export function VpnView() {
  const [peers, setPeers] = useState<DemoWireGuardPeer[]>(INITIAL_WIREGUARD_PEERS);
  const [selectedQrPeer, setSelectedQrPeer] = useState<DemoWireGuardPeer | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
          <KeyRound className="w-6 h-6 text-emerald-400" />
          <span>VPN & Zero-Trust Mesh (WireGuard + Headscale)</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          High-performance ChaCha20-Poly1305 kernel encryption and self-hosted Tailscale mesh coordination.
        </p>
      </div>

      {/* WireGuard Peer Management */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-sm text-white flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>WireGuard Peers (wg0)</span>
            </h3>
            <p className="text-xs text-slate-400">Tunnel Subnet: 10.10.0.1/24 • Listen Port: 51820/UDP</p>
          </div>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
            {peers.filter((p) => p.status === 'connected').length} / {peers.length} Active
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/70 border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="p-3 pl-4">Peer Device</th>
                <th className="p-3">Assigned IP</th>
                <th className="p-3">Endpoint</th>
                <th className="p-3">Last Handshake</th>
                <th className="p-3">Transfer (Tx / Rx)</th>
                <th className="p-3">Status</th>
                <th className="p-3 pr-4 text-right">Mobile Provision</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 font-mono text-slate-200">
              {peers.map((peer) => (
                <tr key={peer.id} className="hover:bg-slate-800/40">
                  <td className="p-3 pl-4 font-bold text-white font-sans flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        peer.status === 'connected' ? 'bg-emerald-400 animate-pulse' : 'bg-slate-600'
                      }`}
                    />
                    {peer.name}
                  </td>
                  <td className="p-3 text-cyan-400 font-semibold">{peer.allowedIps}</td>
                  <td className="p-3 text-slate-400">{peer.endpoint}</td>
                  <td className="p-3 text-slate-300 font-sans">{peer.lastHandshake}</td>
                  <td className="p-3 text-slate-400 text-[11px]">
                    {peer.txBytes} / {peer.rxBytes}
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-sans font-bold uppercase ${
                        peer.status === 'connected'
                          ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {peer.status}
                    </span>
                  </td>
                  <td className="p-3 pr-4 text-right">
                    <button
                      onClick={() => setSelectedQrPeer(peer)}
                      className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-sans inline-flex items-center gap-1.5 transition-colors border border-slate-700"
                    >
                      <QrCode className="w-3.5 h-3.5 text-emerald-400" />
                      <span>QR Config</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Headscale Mesh Topology Visualizer */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-sm text-white flex items-center gap-2">
              <Network className="w-4 h-4 text-emerald-400" />
              <span>Headscale Zero-Trust Mesh Fabric</span>
            </h3>
            <p className="text-xs text-slate-400">
              Coordinated direct peer-to-peer WireGuard mesh without centralized bottleneck routing.
            </p>
          </div>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
            DERP Relays: 3 Active
          </span>
        </div>

        {/* Mesh Visualizer Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/40 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-white">Central Hub: axonwall-core</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
            </div>
            <div className="text-xs font-mono text-emerald-400">Mesh IP: 100.64.0.1</div>
            <div className="text-[11px] text-slate-400">Routes: 192.168.100.0/24 (Subnet Router)</div>
            <div className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 inline-block border border-emerald-500/30">
              Exit Node Available
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-white">MacBook-M3 (Remote)</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
            </div>
            <div className="text-xs font-mono text-cyan-400">Mesh IP: 100.64.0.14</div>
            <div className="text-[11px] text-slate-400">Direct WireGuard P2P (UDP NAT traversal)</div>
            <div className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 inline-block">
              tag:admin • 14ms Latency
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-white">Kubernetes-Cluster-Pod</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
            </div>
            <div className="text-xs font-mono text-cyan-400">Mesh IP: 100.64.0.88</div>
            <div className="text-[11px] text-slate-400">P2P Link • Tailscale Operator</div>
            <div className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 inline-block">
              tag:workload • 3ms Latency
            </div>
          </div>
        </div>
      </div>

      {/* QR Code Modal Simulation */}
      {selectedQrPeer && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl">
            <h3 className="font-bold text-base text-white">Mobile WireGuard Profile</h3>
            <p className="text-xs text-slate-400">
              Scan with the official WireGuard app on iOS or Android to immediately connect {selectedQrPeer.name}:
            </p>

            {/* Simulated QR Code Graphic */}
            <div className="w-48 h-48 mx-auto bg-white p-3 rounded-xl flex flex-col items-center justify-center">
              <div className="w-40 h-40 border-4 border-slate-900 grid grid-cols-6 grid-rows-6 gap-0.5 p-1 bg-white">
                {Array.from({ length: 36 }).map((_, i) => (
                  <div
                    key={i}
                    className={`${(i * 7 + 3) % 2 === 0 ? 'bg-black' : 'bg-transparent'} rounded-xs`}
                  />
                ))}
              </div>
            </div>

            <div className="text-left bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs font-mono">
              <div className="text-slate-400 text-[10px]">Client Address:</div>
              <div className="text-emerald-400 font-bold">{selectedQrPeer.allowedIps}</div>
              <div className="text-slate-400 text-[10px] mt-1">Endpoint:</div>
              <div className="text-white">vpn.axonwall.corp:51820</div>
            </div>

            <button
              onClick={() => setSelectedQrPeer(null)}
              className="w-full py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
