'use client';

import React, { useState } from 'react';
import { Layers, Play, CheckCircle2, XCircle, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export function DiagnosticsView() {
  const [iface, setIface] = useState('lan');
  const [srcIp, setSrcIp] = useState('192.168.100.45');
  const [dstIp, setDstIp] = useState('192.168.100.1');
  const [dstPort, setDstPort] = useState('2966');
  const [proto, setProto] = useState('tcp');
  const [isTracing, setIsTracing] = useState(false);
  const [traceResult, setTraceResult] = useState<{
    verdict: 'PASS' | 'DROP';
    matchedRule: string;
    stage1: string;
    stage2: string;
    stage3: string;
    stage4: string;
  } | null>(null);

  const handleTrace = (e: React.FormEvent) => {
    e.preventDefault();
    setIsTracing(true);
    setTraceResult(null);

    setTimeout(() => {
      setIsTracing(false);
      const port = parseInt(dstPort, 10);

      // Packet evaluation logic
      if (iface === 'lan' && (port === 2966 || port === 22 || port === 443 || port === 80)) {
        setTraceResult({
          verdict: 'PASS',
          matchedRule: `rule-01 (Anti-Lockout): tcp dport { 22, 80, 443, 2966 } accept`,
          stage1: 'PREROUTING: Ingress validation passed. No threat set match.',
          stage2: 'ROUTING: Local socket delivery targeted to appliance core.',
          stage3: `INPUT FILTER: Matched Anti-Lockout Rule on port ${port}. Verdict: ACCEPT.`,
          stage4: 'LOCAL IN: Handed over to axonwalld management listener on 0.0.0.0:2966.',
        });
      } else if (iface === 'wan' && port !== 51820) {
        setTraceResult({
          verdict: 'DROP',
          matchedRule: 'chain input { type filter hook input priority 0; policy drop; }',
          stage1: 'PREROUTING: WAN ingress packet accepted into filter table.',
          stage2: 'ROUTING: Packet directed to local appliance host.',
          stage3: `INPUT FILTER: Port ${port} not in WAN allowed ingress set.`,
          stage4: 'FINAL ACTION: Packet dropped silently by default input filter policy.',
        });
      } else if (iface === 'lan' && dstIp !== '192.168.100.1') {
        setTraceResult({
          verdict: 'PASS',
          matchedRule: 'rule-04 (LAN Outbound): iif "lan" oif "wan" accept',
          stage1: 'PREROUTING: Conntrack new state allocated (ct state new).',
          stage2: 'ROUTING: Forwarding lookup matched default gateway via WAN (eth0).',
          stage3: 'FORWARD FILTER: Outbound internet policy matched. Verdict: ACCEPT.',
          stage4: 'POSTROUTING: SNAT masquerade applied (192.168.100.45 -> 198.51.100.22).',
        });
      } else {
        setTraceResult({
          verdict: 'PASS',
          matchedRule: 'Default Pass Policy',
          stage1: 'PREROUTING: Passed integrity verification.',
          stage2: 'ROUTING: Path resolved in kernel FIB.',
          stage3: 'FORWARD: Permitted by interface rules.',
          stage4: 'POSTROUTING: Egress completed.',
        });
      }
    }, 600);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
          <Layers className="w-6 h-6 text-emerald-400" />
          <span>nftables Packet Tracer Simulation (E5)</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Trace hypothetical network packets through the kernel data plane to diagnose rule matching, NAT, and filtering.
        </p>
      </div>

      {/* Simulator Form */}
      <form onSubmit={handleTrace} className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
        <h3 className="font-semibold text-sm text-white flex items-center gap-2">
          <Zap className="w-4 h-4 text-emerald-400" />
          <span>Configure Test Packet</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
          <div>
            <label className="block text-slate-400 font-medium mb-1">Ingress Interface</label>
            <select
              value={iface}
              onChange={(e) => setIface(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:outline-none focus:border-emerald-500 font-mono"
            >
              <option value="lan">lan (eth1 - 192.168.100.1)</option>
              <option value="wan">wan (eth0 - 198.51.100.22)</option>
              <option value="dmz">dmz (eth2 - 10.0.50.1)</option>
              <option value="wg0">wg0 (10.10.0.1)</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-400 font-medium mb-1">Protocol</label>
            <select
              value={proto}
              onChange={(e) => setProto(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:outline-none focus:border-emerald-500 font-mono uppercase"
            >
              <option value="tcp">TCP</option>
              <option value="udp">UDP</option>
              <option value="icmp">ICMP</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-400 font-medium mb-1">Source IP</label>
            <input
              type="text"
              value={srcIp}
              onChange={(e) => setSrcIp(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:outline-none focus:border-emerald-500 font-mono"
            />
          </div>

          <div>
            <label className="block text-slate-400 font-medium mb-1">Destination IP</label>
            <input
              type="text"
              value={dstIp}
              onChange={(e) => setDstIp(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:outline-none focus:border-emerald-500 font-mono"
            />
          </div>

          <div>
            <label className="block text-slate-400 font-medium mb-1">Destination Port</label>
            <input
              type="text"
              value={dstPort}
              onChange={(e) => setDstPort(e.target.value)}
              placeholder="e.g. 2966"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:outline-none focus:border-emerald-500 font-mono font-bold text-emerald-400"
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="text-slate-500">Quick Tests:</span>
            <button
              type="button"
              onClick={() => {
                setIface('lan');
                setSrcIp('192.168.100.50');
                setDstIp('192.168.100.1');
                setDstPort('2966');
              }}
              className="underline hover:text-emerald-400"
            >
              LAN to Admin Port 2966
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => {
                setIface('wan');
                setSrcIp('185.220.101.4');
                setDstIp('198.51.100.22');
                setDstPort('22');
              }}
              className="underline hover:text-red-400"
            >
              WAN SSH Probe
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => {
                setIface('lan');
                setSrcIp('192.168.100.50');
                setDstIp('1.1.1.1');
                setDstPort('443');
              }}
              className="underline hover:text-cyan-400"
            >
              Outbound Internet HTTPS
            </button>
          </div>

          <button
            type="submit"
            disabled={isTracing}
            className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-2 shadow-sm transition-colors disabled:opacity-50"
          >
            <Play className="w-3.5 h-3.5" />
            <span>{isTracing ? 'Evaluating Pipeline...' : 'Simulate Packet Flow'}</span>
          </button>
        </div>
      </form>

      {/* Trace Evaluation Results */}
      {traceResult && (
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-3">
              <span
                className={`px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider font-mono flex items-center gap-1.5 ${
                  traceResult.verdict === 'PASS'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-red-500/20 text-red-400 border border-red-500/30'
                }`}
              >
                {traceResult.verdict === 'PASS' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-400" />
                )}
                <span>VERDICT: {traceResult.verdict}</span>
              </span>
              <span className="text-xs font-mono text-slate-300">
                {srcIp} &rarr; {dstIp}:{dstPort} ({proto.toUpperCase()})
              </span>
            </div>
            <span className="text-xs text-slate-400 font-mono truncate max-w-sm">
              Matched: {traceResult.matchedRule}
            </span>
          </div>

          {/* 4 Pipeline Stages */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
            <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Stage 1</span>
              <span className="font-semibold text-white block">PREROUTING Hook</span>
              <p className="text-slate-400 text-[11px] mt-1">{traceResult.stage1}</p>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Stage 2</span>
              <span className="font-semibold text-white block">FIB Routing Decision</span>
              <p className="text-slate-400 text-[11px] mt-1">{traceResult.stage2}</p>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Stage 3</span>
              <span className="font-semibold text-white block">FILTER Ruleset</span>
              <p className="text-slate-400 text-[11px] mt-1">{traceResult.stage3}</p>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Stage 4</span>
              <span className="font-semibold text-white block">POSTROUTING / Egress</span>
              <p className="text-slate-400 text-[11px] mt-1">{traceResult.stage4}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
