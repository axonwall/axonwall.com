'use client';

import React, { useState } from 'react';
import {
  Flame,
  Plus,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RotateCcw,
  Search,
  Filter,
  Layers,
  ArrowRight,
  Shield,
  Trash2,
} from 'lucide-react';
import { DemoFirewallRule } from '../demoState';

interface FirewallViewProps {
  rules: DemoFirewallRule[];
  stagedCount: number;
  onToggleRule: (id: string) => void;
  onAddRule: (rule: Omit<DemoFirewallRule, 'id' | 'packets' | 'bytes'>) => void;
  onDeleteRule: (id: string) => void;
  onApplyChanges: () => void;
}

export function FirewallView({
  rules,
  stagedCount,
  onToggleRule,
  onAddRule,
  onDeleteRule,
  onApplyChanges,
}: FirewallViewProps) {
  const [selectedIface, setSelectedIface] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New rule form state
  const [desc, setDesc] = useState('');
  const [action, setAction] = useState<'pass' | 'block' | 'reject'>('pass');
  const [iface, setIface] = useState<'wan' | 'lan' | 'dmz' | 'wg0'>('lan');
  const [proto, setProto] = useState<'tcp' | 'udp' | 'icmp' | 'any'>('tcp');
  const [src, setSrc] = useState('any');
  const [dst, setDst] = useState('any');
  const [dstPort, setDstPort] = useState('2966');

  const filteredRules = rules.filter((r) => {
    if (selectedIface !== 'all' && r.interface !== selectedIface) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        r.description.toLowerCase().includes(q) ||
        r.source.toLowerCase().includes(q) ||
        r.destination.toLowerCase().includes(q) ||
        r.destinationPort.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleCreateRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!desc.trim()) return;
    onAddRule({
      description: desc.trim(),
      action,
      interface: iface,
      protocol: proto,
      source: src,
      destination: dst,
      destinationPort: dstPort,
      enabled: true,
    });
    setDesc('');
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Flame className="w-6 h-6 text-emerald-400" />
            <span>Firewall Rules & Policies</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Declarative nftables state machine compiled directly to Linux kernel fastpath tables.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {stagedCount > 0 && (
            <button
              onClick={onApplyChanges}
              className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors animate-pulse"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Apply {stagedCount} Staged &rarr;</span>
            </button>
          )}

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Policy Rule</span>
          </button>
        </div>
      </div>

      {/* Interface Filter Pills & Search */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-slate-900 border border-slate-800 p-2.5 rounded-xl">
        <div className="flex items-center gap-1 overflow-x-auto text-xs font-medium">
          {['all', 'wan', 'lan', 'dmz', 'wg0'].map((i) => (
            <button
              key={i}
              onClick={() => setSelectedIface(i)}
              className={`px-3 py-1.5 rounded-lg uppercase tracking-wider transition-colors ${
                selectedIface === i
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              {i === 'all' ? 'All Interfaces' : i}
            </button>
          ))}
        </div>

        <div className="relative min-w-[220px]">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter rules..."
            className="w-full bg-slate-950/80 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/50"
          />
        </div>
      </div>

      {/* Rules Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/70 border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="p-3 pl-4">State</th>
                <th className="p-3">Action</th>
                <th className="p-3">Interface</th>
                <th className="p-3">Proto</th>
                <th className="p-3">Source</th>
                <th className="p-3">Destination</th>
                <th className="p-3">Port</th>
                <th className="p-3">Description</th>
                <th className="p-3">Counters</th>
                <th className="p-3 pr-4 text-right">Delete</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 font-mono text-slate-200">
              {filteredRules.map((rule) => (
                <tr
                  key={rule.id}
                  className={`hover:bg-slate-800/40 transition-colors ${
                    !rule.enabled ? 'opacity-50 bg-slate-950/40' : ''
                  }`}
                >
                  {/* Enabled Toggle Switch */}
                  <td className="p-3 pl-4">
                    <button
                      onClick={() => onToggleRule(rule.id)}
                      title={rule.enabled ? 'Click to disable' : 'Click to enable'}
                      className={`w-8 h-4.5 rounded-full transition-colors relative flex items-center p-0.5 ${
                        rule.enabled ? 'bg-emerald-500' : 'bg-slate-700'
                      }`}
                    >
                      <div
                        className={`w-3.5 h-3.5 rounded-full bg-white transition-transform ${
                          rule.enabled ? 'translate-x-3.5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </td>

                  {/* Action Badge */}
                  <td className="p-3">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider ${
                        rule.action === 'pass'
                          ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                          : rule.action === 'block'
                          ? 'bg-red-500/15 text-red-400 border border-red-500/30'
                          : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                      }`}
                    >
                      {rule.action === 'pass' && <CheckCircle2 className="w-3 h-3" />}
                      {rule.action === 'block' && <XCircle className="w-3 h-3" />}
                      {rule.action}
                    </span>
                  </td>

                  {/* Interface */}
                  <td className="p-3 font-semibold uppercase text-slate-300 font-sans">{rule.interface}</td>

                  {/* Protocol */}
                  <td className="p-3 uppercase text-slate-400">{rule.protocol}</td>

                  {/* Source */}
                  <td className="p-3 text-slate-300 font-sans truncate max-w-[140px]">{rule.source}</td>

                  {/* Destination */}
                  <td className="p-3 text-slate-300 font-sans truncate max-w-[140px]">{rule.destination}</td>

                  {/* Port */}
                  <td className="p-3 font-semibold text-emerald-400">{rule.destinationPort}</td>

                  {/* Description */}
                  <td className="p-3 font-sans text-slate-300 max-w-[220px] truncate" title={rule.description}>
                    {rule.description}
                  </td>

                  {/* Packet Counters */}
                  <td className="p-3 text-slate-400 text-[11px]">
                    <div>{rule.packets.toLocaleString()} pkts</div>
                    <div className="text-slate-500">{rule.bytes}</div>
                  </td>

                  {/* Delete Action */}
                  <td className="p-3 pr-4 text-right">
                    <button
                      onClick={() => onDeleteRule(rule.id)}
                      className="p-1 rounded text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                      title="Delete rule"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Rule Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-emerald-400" />
                <span>Create New Firewall Rule</span>
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-white text-xs"
              >
                Cancel
              </button>
            </div>

            <form onSubmit={handleCreateRule} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 font-medium mb-1">Rule Description</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Allow Inbound Admin Console (Port 2966)"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Action</label>
                  <select
                    value={action}
                    onChange={(e) => setAction(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="pass">Pass (Accept)</option>
                    <option value="block">Block (Drop)</option>
                    <option value="reject">Reject (ICMP Unreachable)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Interface</label>
                  <select
                    value={iface}
                    onChange={(e) => setIface(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="lan">LAN (eth1)</option>
                    <option value="wan">WAN (eth0)</option>
                    <option value="dmz">DMZ (eth2)</option>
                    <option value="wg0">WireGuard (wg0)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Protocol</label>
                  <select
                    value={proto}
                    onChange={(e) => setProto(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="tcp">TCP</option>
                    <option value="udp">UDP</option>
                    <option value="icmp">ICMP</option>
                    <option value="any">ANY</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Source</label>
                  <input
                    type="text"
                    value={src}
                    onChange={(e) => setSrc(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Port</label>
                  <input
                    type="text"
                    value={dstPort}
                    onChange={(e) => setDstPort(e.target.value)}
                    placeholder="2966, 443"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold"
                >
                  Stage Rule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
