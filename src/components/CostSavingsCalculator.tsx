'use client';

import React, { useState } from 'react';
import {
  DollarSign,
  TrendingDown,
  ShieldCheck,
  Server,
  Zap,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Cpu,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export const CostSavingsCalculator: React.FC = () => {
  const [preset, setPreset] = useState<'prosumer' | 'smallBiz' | 'midMarket'>('prosumer');
  const [years, setYears] = useState<number>(3);
  const [vpnUsers, setVpnUsers] = useState<number>(10);

  const presets = {
    prosumer: {
      name: 'Power User & Home Lab',
      desc: '1 firewall appliance, 1Gbps-2.5Gbps fiber, 10 remote VPN devices',
      users: 10,
      commercialHw: 750,
      commercialSubYear: 650,
      commercialVpnPerUserYear: 25,
      axonwallHw: 220, // N100 mini PC
      axonwallSubYear: 0, // Community
    },
    smallBiz: {
      name: 'Small Business / Studio',
      desc: '1 primary firewall + backup, 25 remote employees, site-to-site VPN',
      users: 25,
      commercialHw: 1850,
      commercialSubYear: 1450,
      commercialVpnPerUserYear: 35,
      axonwallHw: 499, // Edge 10
      axonwallSubYear: 249, // Business edition
    },
    midMarket: {
      name: 'Growing Enterprise / HQ',
      desc: 'Dual HA 10GbE cluster, 75 remote staff, 24/7 mission critical',
      users: 75,
      commercialHw: 4800,
      commercialSubYear: 2900,
      commercialVpnPerUserYear: 45,
      axonwallHw: 1699, // Rack 100
      axonwallSubYear: 249,
    },
  };

  const currentPreset = presets[preset];

  const handlePresetChange = (key: 'prosumer' | 'smallBiz' | 'midMarket') => {
    setPreset(key);
    setVpnUsers(presets[key].users);
  };

  // Calculations
  const commercialTotal =
    currentPreset.commercialHw +
    currentPreset.commercialSubYear * years +
    vpnUsers * currentPreset.commercialVpnPerUserYear * years;

  const axonwallTotal =
    currentPreset.axonwallHw + currentPreset.axonwallSubYear * years;

  const netSavings = Math.max(0, commercialTotal - axonwallTotal);
  const savingsPct = Math.round((netSavings / commercialTotal) * 100);

  return (
    <div className="space-y-12">
      {/* Top Banner / Concept Intro */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-wider">
          <TrendingDown className="w-3.5 h-3.5" /> Stop Paying the Enterprise Tax
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          How Much Are You Burning on Firewalls?
        </h2>
        <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
          Big Tech firewall vendors trap you in recurring renewal cycles, charge artificial fees per VPN user, and brick working hardware with artificial End-of-Life deadlines. Axonwall liberates your budget.
        </p>
      </div>

      {/* Preset Buttons */}
      <div className="flex flex-wrap justify-center gap-3">
        <button
          onClick={() => handlePresetChange('prosumer')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
            preset === 'prosumer'
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/60'
              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          Home Lab & Power User
        </button>
        <button
          onClick={() => handlePresetChange('smallBiz')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
            preset === 'smallBiz'
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/60'
              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          Small Business (25 seats)
        </button>
        <button
          onClick={() => handlePresetChange('midMarket')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
            preset === 'midMarket'
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/60'
              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          Enterprise HQ (75 seats)
        </button>
      </div>

      {/* The Calculator Card */}
      <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 shadow-2xl relative overflow-hidden backdrop-blur-xl">
        <div className="absolute inset-0 cyber-grid-dense opacity-20 pointer-events-none" />

        {/* Sliders Area */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 pb-8 border-b border-slate-800">
          <div>
            <div className="flex justify-between items-center text-xs font-mono text-slate-300 mb-2">
              <span className="uppercase text-slate-400">Remote VPN Users / Roaming Devices:</span>
              <span className="text-emerald-400 font-bold text-sm">{vpnUsers} Users</span>
            </div>
            <input
              type="range"
              min="1"
              max="150"
              value={vpnUsers}
              onChange={(e) => setVpnUsers(Number(e.target.value))}
              className="w-full accent-emerald-500 bg-slate-950 rounded-lg cursor-pointer h-2"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
              <span>1 user</span>
              <span>75 users</span>
              <span>150 users</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center text-xs font-mono text-slate-300 mb-2">
              <span className="uppercase text-slate-400">Deployment Lifespan:</span>
              <span className="text-sky-400 font-bold text-sm">{years} Years</span>
            </div>
            <input
              type="range"
              min="1"
              max="5"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full accent-sky-500 bg-slate-950 rounded-lg cursor-pointer h-2"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
              <span>1 Year</span>
              <span>3 Years</span>
              <span>5 Years</span>
            </div>
          </div>
        </div>

        {/* Big Savings Highlight */}
        <div className="relative z-10 my-8 p-6 rounded-2xl bg-gradient-to-r from-emerald-950/70 via-slate-950 to-sky-950/70 border border-emerald-500/40 text-center space-y-2">
          <div className="text-xs uppercase font-mono tracking-wider text-emerald-400 font-semibold">
            Estimated {years}-Year Total Savings with Axonwall
          </div>
          <div className="text-4xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400 font-mono">
            ${netSavings.toLocaleString()}
          </div>
          <div className="text-xs sm:text-sm text-slate-300 font-medium">
            You save <span className="text-emerald-400 font-bold">{savingsPct}%</span> compared to commercial enterprise firewalls.
          </div>
        </div>

        {/* Side-by-Side Comparison Columns */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Corporate Firewall Column */}
          <div className="p-6 rounded-2xl bg-slate-950/90 border border-rose-900/30 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono uppercase text-rose-400 font-bold">Legacy Model</span>
                <h3 className="text-lg font-bold text-white">Commercial Corporate Firewall</h3>
              </div>
              <div className="text-2xl font-bold font-mono text-rose-400">
                ${commercialTotal.toLocaleString()}
              </div>
            </div>

            <ul className="text-xs space-y-3 text-slate-400">
              <li className="flex items-start gap-2.5">
                <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-200">Hardware Markup:</strong> ${currentPreset.commercialHw} for proprietary x86 hardware.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-200">Mandatory Subscriptions:</strong> ${(currentPreset.commercialSubYear * years).toLocaleString()} (${currentPreset.commercialSubYear}/yr). If you cancel, basic routing or IDS features are disabled.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-200">Per-User VPN Tax:</strong> ${(vpnUsers * currentPreset.commercialVpnPerUserYear * years).toLocaleString()} (${currentPreset.commercialVpnPerUserYear}/user/yr for SSL/IPsec VPN clients).
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-200">Forced EOL Obsolescence:</strong> Vendor declares hardware end-of-support after 3-4 years, forcing expensive replacements.
                </span>
              </li>
            </ul>
          </div>

          {/* Axonwall Column */}
          <div className="p-6 rounded-2xl bg-slate-950/90 border-2 border-emerald-500/50 shadow-xl shadow-emerald-950/30 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono uppercase text-emerald-400 font-bold">Axonwall Model</span>
                <h3 className="text-lg font-bold text-white">Axonwall Linux & nftables</h3>
              </div>
              <div className="text-2xl font-bold font-mono text-emerald-400">
                ${axonwallTotal.toLocaleString()}
              </div>
            </div>

            <ul className="text-xs space-y-3 text-slate-400">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-200">Hardware Freedom:</strong> ${currentPreset.axonwallHw} on standard open hardware or a cheap mini-PC ($0 if installed on existing PC or Proxmox VM).
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-200">Zero Mandatory Lock-in:</strong> $0 software fee for Community Edition (or optional $249/yr for certified enterprise LTS QA & support).
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-200">Unlimited WireGuard & OpenVPN:</strong> $0 per-user fees forever. Connect 5 or 500 devices with native Linux kernel speed.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-200">Decade-Long Hardware Lifespan:</strong> Linux 6.12 LTS supports standard x86 and ARM processors indefinitely with zero planned obsolescence.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Hardware Freedom Callout Footer */}
        <div className="relative z-10 mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 shrink-0">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-slate-200 block">Run on Hardware You Already Own</span>
              <span>Install on an old PC, an Intel N100 mini-PC from Amazon, or a Proxmox virtual machine.</span>
            </div>
          </div>
          <a
            href="https://github.com/axonwall/axonwall_monorepo/releases"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition shrink-0"
          >
            Start Saving Today <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
