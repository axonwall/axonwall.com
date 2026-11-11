'use client';

import React, { useState } from 'react';
import {
  Route,
  Compass,
  Activity,
  Plus,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Zap,
  Network,
  Layers,
  RefreshCw,
} from 'lucide-react';

interface StaticRouteItem {
  id: string;
  network: string;
  gateway: string;
  iface: string;
  metric: number;
  description: string;
  enabled: boolean;
}

const INITIAL_STATIC_ROUTES: StaticRouteItem[] = [
  {
    id: 'sr-1',
    network: '10.20.0.0/16',
    gateway: '192.168.100.254',
    iface: 'LAN (eth1)',
    metric: 10,
    description: 'Internal Campus Core L3 Switch Subnets',
    enabled: true,
  },
  {
    id: 'sr-2',
    network: '172.16.0.0/12',
    gateway: '10.10.0.2',
    iface: 'WG0 (wg0)',
    metric: 20,
    description: 'Remote Cloud VPC Transit over PQ-WireGuard',
    enabled: true,
  },
  {
    id: 'sr-3',
    network: '10.99.0.0/24',
    gateway: '10.0.50.254',
    iface: 'OPT1 (eth2)',
    metric: 30,
    description: 'Isolated Engineering Lab & Telemetry Segment',
    enabled: true,
  },
];

export function RoutingView() {
  const [activeTab, setActiveTab] = useState<'sdwan' | 'static' | 'frr'>('sdwan');
  const [simulateWanDown, setSimulateWanDown] = useState(false);
  const [staticRoutes, setStaticRoutes] = useState<StaticRouteItem[]>(INITIAL_STATIC_ROUTES);

  // Add Static Route form state
  const [newNet, setNewNet] = useState('');
  const [newGw, setNewGw] = useState('');
  const [newIface, setNewIface] = useState('LAN (eth1)');
  const [newDesc, setNewDesc] = useState('');

  const handleAddRoute = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNet.trim() || !newGw.trim()) return;
    setStaticRoutes((prev) => [
      ...prev,
      {
        id: `sr-${Date.now()}`,
        network: newNet.trim(),
        gateway: newGw.trim(),
        iface: newIface,
        metric: 25,
        description: newDesc.trim() || 'Custom Static Route',
        enabled: true,
      },
    ]);
    setNewNet('');
    setNewGw('');
    setNewDesc('');
  };

  const toggleRoute = (id: string) => {
    setStaticRoutes((prev) =>
      prev.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r))
    );
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Route className="w-6 h-6 text-emerald-400" />
            <span>Routing, Multi-WAN SD-WAN &amp; FRRouting</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Sub-second gateway SLA probing, connection-pinned ECMP load balancing, static FIB routes, and BGP / OSPFv2 / BFD dynamic routing (`routing.yaml`).
          </p>
        </div>

        <button
          onClick={() => setSimulateWanDown((prev) => !prev)}
          className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors border self-start sm:self-auto ${
            simulateWanDown
              ? 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-500'
              : 'bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border-amber-500/40'
          }`}
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>{simulateWanDown ? 'Restore Primary Fiber WAN' : 'Simulate Primary WAN Link Loss'}</span>
        </button>
      </div>

      {/* Sub Tabs */}
      <div className="flex border-b border-slate-800 space-x-6 text-xs font-semibold overflow-x-auto">
        <button
          onClick={() => setActiveTab('sdwan')}
          className={`pb-3 flex items-center gap-2 transition-colors border-b-2 whitespace-nowrap ${
            activeTab === 'sdwan'
              ? 'border-emerald-400 text-emerald-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>Multi-WAN Gateways &amp; ECMP Groups</span>
        </button>

        <button
          onClick={() => setActiveTab('static')}
          className={`pb-3 flex items-center gap-2 transition-colors border-b-2 whitespace-nowrap ${
            activeTab === 'static'
              ? 'border-emerald-400 text-emerald-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Static Routes ({staticRoutes.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('frr')}
          className={`pb-3 flex items-center gap-2 transition-colors border-b-2 whitespace-nowrap ${
            activeTab === 'frr'
              ? 'border-emerald-400 text-emerald-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Network className="w-4 h-4" />
          <span>FRRouting (BGP / OSPFv2 / BFD)</span>
        </button>
      </div>

      {/* TAB 1: MULTI-WAN & SD-WAN */}
      {activeTab === 'sdwan' && (
        <div className="space-y-6">
          {simulateWanDown && (
            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/40 text-amber-200 text-xs flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>
                  <strong>Failover Triggered:</strong> Primary Fiber (`eth0` &rarr; `198.51.100.1`) exceeded 20% packet loss SLA. Promoted <strong>Tier 2 Business Cable (`eth2`)</strong> to Active Master in 420ms and flushed stale WAN conntrack states.
                </span>
              </div>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 whitespace-nowrap">
                TIER 2 PROMOTED
              </span>
            </div>
          )}

          {/* Gateway Health Probers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Gateway 1 */}
            <div
              className={`p-4 rounded-xl bg-slate-900 border space-y-3 ${
                simulateWanDown ? 'border-red-500/40' : 'border-emerald-500/40'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-bold text-sm text-white block">GW_WAN_FIBER</span>
                  <span className="text-[11px] font-mono text-slate-400">eth0 • 198.51.100.1 (Probe: 1.1.1.1)</span>
                </div>
                {simulateWanDown ? (
                  <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/30 text-[10px] font-mono font-bold uppercase flex items-center gap-1">
                    <XCircle className="w-3 h-3" /> SLA Down
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold uppercase flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Tier 1 Master
                  </span>
                )}
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
                <div className="bg-slate-950 p-2 rounded border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">RTT</span>
                  <span className={simulateWanDown ? 'text-red-400 font-bold' : 'text-emerald-400 font-bold'}>
                    {simulateWanDown ? 'TIMEOUT' : '4.1 ms'}
                  </span>
                </div>
                <div className="bg-slate-950 p-2 rounded border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">Jitter</span>
                  <span className="text-white font-bold">{simulateWanDown ? '—' : '0.7 ms'}</span>
                </div>
                <div className="bg-slate-950 p-2 rounded border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">Loss</span>
                  <span className={simulateWanDown ? 'text-red-400 font-bold' : 'text-emerald-400 font-bold'}>
                    {simulateWanDown ? '100.0%' : '0.0%'}
                  </span>
                </div>
              </div>
            </div>

            {/* Gateway 2 */}
            <div
              className={`p-4 rounded-xl bg-slate-900 border space-y-3 ${
                simulateWanDown ? 'border-emerald-500/40' : 'border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-bold text-sm text-white block">GW_OPT1_CABLE</span>
                  <span className="text-[11px] font-mono text-slate-400">eth2 • 10.0.50.1 (Probe: 9.9.9.9)</span>
                </div>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                    simulateWanDown
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                  }`}
                >
                  {simulateWanDown ? 'Promoted Master' : 'Tier 2 / ECMP w=1'}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
                <div className="bg-slate-950 p-2 rounded border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">RTT</span>
                  <span className="text-cyan-400 font-bold">11.8 ms</span>
                </div>
                <div className="bg-slate-950 p-2 rounded border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">Jitter</span>
                  <span className="text-white font-bold">1.9 ms</span>
                </div>
                <div className="bg-slate-950 p-2 rounded border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">Loss</span>
                  <span className="text-emerald-400 font-bold">0.0%</span>
                </div>
              </div>
            </div>

            {/* Gateway 3 */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-bold text-sm text-white block">GW_5G_BACKUP</span>
                  <span className="text-[11px] font-mono text-slate-400">wwan0 • 192.0.2.1 (Probe: 8.8.8.8)</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-mono font-bold uppercase">
                  Tier 3 Standby
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
                <div className="bg-slate-950 p-2 rounded border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">RTT</span>
                  <span className="text-amber-300 font-bold">26.4 ms</span>
                </div>
                <div className="bg-slate-950 p-2 rounded border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">Jitter</span>
                  <span className="text-white font-bold">3.4 ms</span>
                </div>
                <div className="bg-slate-950 p-2 rounded border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">Loss</span>
                  <span className="text-emerald-400 font-bold">0.0%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Policy Routing Groups */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-sm text-white flex items-center gap-2">
                <Zap className="w-4 h-4 text-emerald-400" />
                <span>SD-WAN Gateway Groups &amp; Kernel FIB Multipath</span>
              </h3>
              <span className="text-xs font-mono text-slate-400">Sticky Conntrack Mark: 0x101 / 0x102</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-emerald-400">WAN_FAILOVER_TIERED</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    Trigger: Loss &gt; 20% or RTT &gt; 250ms
                  </span>
                </div>
                <p className="text-slate-400">
                  Deterministic priority failover for VoIP, WireGuard VPN endpoints, and deterministic TLS sessions.
                </p>
                <div className="font-mono text-[11px] text-slate-300 pt-1">
                  Active Egress: <strong className="text-white">{simulateWanDown ? 'GW_OPT1_CABLE (eth2)' : 'GW_WAN_FIBER (eth0)'}</strong>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-cyan-400">SDWAN_ECMP_BALANCE</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    Weighted ECMP (3 : 1)
                  </span>
                </div>
                <p className="text-slate-400">
                  Flow-hashed multipath load balancing (`fib_multipath_hash_policy=1`) pinning TCP/QUIC flows via `ct mark`.
                </p>
                <div className="font-mono text-[11px] text-slate-300 pt-1">
                  Active Weights: <strong className="text-white">{simulateWanDown ? 'eth2 (100%)' : 'eth0 (75% / w=3) + eth2 (25% / w=1)'}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: STATIC ROUTES */}
      {activeTab === 'static' && (
        <div className="space-y-6">
          <form onSubmit={handleAddRoute} className="p-4 rounded-xl bg-slate-900 border border-slate-800 grid grid-cols-1 sm:grid-cols-5 gap-3 text-xs">
            <input
              type="text"
              required
              placeholder="Destination CIDR (e.g. 10.40.0.0/16)"
              value={newNet}
              onChange={(e) => setNewNet(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 font-mono text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500"
            />
            <input
              type="text"
              required
              placeholder="Next-Hop Gateway (e.g. 192.168.100.254)"
              value={newGw}
              onChange={(e) => setNewGw(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 font-mono text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500"
            />
            <select
              value={newIface}
              onChange={(e) => setNewIface(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 font-mono text-slate-200 focus:outline-none focus:border-emerald-500"
            >
              <option value="LAN (eth1)">LAN (eth1)</option>
              <option value="WAN (eth0)">WAN (eth0)</option>
              <option value="OPT1 (eth2)">OPT1 (eth2)</option>
              <option value="WG0 (wg0)">WG0 (wg0)</option>
            </select>
            <input
              type="text"
              placeholder="Description"
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Static Route</span>
            </button>
          </form>

          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/70 border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="p-3 pl-4">State</th>
                  <th className="p-3">Destination Prefix</th>
                  <th className="p-3">Next-Hop Gateway</th>
                  <th className="p-3">Interface</th>
                  <th className="p-3">Metric</th>
                  <th className="p-3 pr-4">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-mono text-slate-200">
                {staticRoutes.map((r) => (
                  <tr key={r.id} className={`hover:bg-slate-800/40 ${!r.enabled ? 'opacity-50' : ''}`}>
                    <td className="p-3 pl-4">
                      <button
                        onClick={() => toggleRoute(r.id)}
                        className={`w-8 h-4.5 rounded-full transition-colors relative flex items-center p-0.5 ${
                          r.enabled ? 'bg-emerald-500' : 'bg-slate-700'
                        }`}
                      >
                        <div
                          className={`w-3.5 h-3.5 rounded-full bg-white transition-transform ${
                            r.enabled ? 'translate-x-3.5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </td>
                    <td className="p-3 font-bold text-emerald-400">{r.network}</td>
                    <td className="p-3 text-white">{r.gateway}</td>
                    <td className="p-3 text-cyan-400 font-sans font-semibold">{r.iface}</td>
                    <td className="p-3 text-slate-400">{r.metric}</td>
                    <td className="p-3 pr-4 font-sans text-slate-300">{r.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: FRROUTING DYNAMIC PROTOCOLS */}
      {activeTab === 'frr' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-xs text-slate-400 font-medium">FRRouting Control Plane</span>
              <div className="text-xl font-bold font-mono text-emerald-400 mt-1">FRR 10.2 Active</div>
              <span className="text-[11px] text-slate-500 font-mono mt-1 block">bgpd • ospfd • bfdd • zebra</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-xs text-slate-400 font-medium">Local Autonomous System</span>
              <div className="text-xl font-bold font-mono text-white mt-1">AS 65010</div>
              <span className="text-[11px] text-slate-500 font-mono mt-1 block">Router ID: 192.168.100.1</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-xs text-slate-400 font-medium">RPKI Origin Validation</span>
              <div className="text-xl font-bold font-mono text-cyan-400 mt-1">ENFORCED</div>
              <span className="text-[11px] text-slate-500 font-mono mt-1 block">Routinator RTR :3323 Validated</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-xs text-slate-400 font-medium">BFD Liveness Timer</span>
              <div className="text-xl font-bold font-mono text-emerald-400 mt-1">300ms &times; 3</div>
              <span className="text-[11px] text-slate-500 font-mono mt-1 block">&lt;900ms sub-second convergence</span>
            </div>
          </div>

          {/* BGP Neighbors Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <h3 className="font-semibold text-sm text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-400" />
                <span>BGP4 / MP-BGP &amp; OSPFv2 Adjacencies</span>
              </h3>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                3 / 3 Sessions Established
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950/70 border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="p-3 pl-4">Protocol</th>
                    <th className="p-3">Neighbor / Peer</th>
                    <th className="p-3">Remote ASN / Area</th>
                    <th className="p-3">BFD Status</th>
                    <th className="p-3">Prefixes Rx / Tx</th>
                    <th className="p-3">Uptime</th>
                    <th className="p-3 pr-4">State</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-slate-200">
                  {[
                    {
                      proto: 'eBGP',
                      peer: '198.51.100.1 (ISP-A Transit)',
                      asn: 'AS 64512',
                      bfd: 'Up (300ms)',
                      prefixes: '948,210 / 2',
                      uptime: '14d 06h 31m',
                      state: 'Established',
                    },
                    {
                      proto: 'iBGP',
                      peer: '10.10.0.2 (Edge-Frankfurt-DC)',
                      asn: 'AS 65010',
                      bfd: 'Up (300ms)',
                      prefixes: '18 / 12',
                      uptime: '14d 06h 29m',
                      state: 'Established',
                    },
                    {
                      proto: 'OSPFv2',
                      peer: '192.168.100.254 (Core-L3-SW)',
                      asn: 'Area 0.0.0.0',
                      bfd: 'Up (300ms)',
                      prefixes: '24 LSAs',
                      uptime: '14d 06h 32m',
                      state: 'Full / DR',
                    },
                  ].map((adj) => (
                    <tr key={adj.peer} className="hover:bg-slate-800/40">
                      <td className="p-3 pl-4 font-bold text-cyan-400">{adj.proto}</td>
                      <td className="p-3 text-white">{adj.peer}</td>
                      <td className="p-3 text-slate-300">{adj.asn}</td>
                      <td className="p-3 text-emerald-400">{adj.bfd}</td>
                      <td className="p-3 text-slate-300">{adj.prefixes}</td>
                      <td className="p-3 text-slate-400">{adj.uptime}</td>
                      <td className="p-3 pr-4">
                        <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[10px] font-sans font-bold uppercase">
                          {adj.state}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
