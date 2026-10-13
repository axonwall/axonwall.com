'use client';

import React, { useState } from 'react';
import {
  Shield,
  EyeOff,
  Wifi,
  Laptop,
  Smartphone,
  Tv,
  HardDrive,
  Lock,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Globe,
  Radio,
  Server,
  Layers,
} from 'lucide-react';

export const PersonalPerimeterVisual: React.FC = () => {
  const [activeScenario, setActiveScenario] = useState<'isp' | 'iot' | 'roaming'>('isp');

  return (
    <div className="space-y-12">
      {/* Scenario Selector Pills */}
      <div className="flex flex-wrap justify-center gap-3">
        <button
          onClick={() => setActiveScenario('isp')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center gap-2 border ${
            activeScenario === 'isp'
              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-lg shadow-emerald-950/40'
              : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
          }`}
        >
          <EyeOff className="w-4 h-4 text-emerald-400" />
          <span>1. ISP Snooping & Ad Obliteration</span>
        </button>

        <button
          onClick={() => setActiveScenario('iot')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center gap-2 border ${
            activeScenario === 'iot'
              ? 'bg-purple-500/20 text-purple-300 border-purple-500/50 shadow-lg shadow-purple-950/40'
              : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
          }`}
        >
          <Tv className="w-4 h-4 text-purple-400" />
          <span>2. Smart Home & IoT Sandboxing</span>
        </button>

        <button
          onClick={() => setActiveScenario('roaming')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center gap-2 border ${
            activeScenario === 'roaming'
              ? 'bg-sky-500/20 text-sky-300 border-sky-500/50 shadow-lg shadow-sky-950/40'
              : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
          }`}
        >
          <Wifi className="w-4 h-4 text-sky-400" />
          <span>3. Airport & Cafe Roaming Cloak</span>
        </button>
      </div>

      {/* Visual Defense Bastion Diagram */}
      <div className="relative rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 overflow-hidden shadow-2xl backdrop-blur-xl">
        {/* Ambient Grid Background */}
        <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: The Threat Landscape */}
          <div className="lg:col-span-4 space-y-4">
            <div className="text-xs font-mono uppercase tracking-wider text-rose-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              Outside Threats & Surveillance
            </div>

            {activeScenario === 'isp' && (
              <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-900/40 space-y-3">
                <div className="flex items-center gap-2.5 text-rose-300 font-bold text-sm">
                  <EyeOff className="w-4 h-4 text-rose-400" />
                  ISP Browsing Profiling & DPI
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Your telecom provider logs every unencrypted DNS lookup and SNI header, packaging your family&apos;s daily habits into behavioral marketing dossiers.
                </p>
                <div className="text-[11px] font-mono text-rose-400 bg-rose-950/60 p-2 rounded-lg border border-rose-900/30">
                  ✗ DNS: 192.0.2.1 (Monitored by ISP)<br />
                  ✗ Target: Ad brokers, data aggregators
                </div>
              </div>
            )}

            {activeScenario === 'iot' && (
              <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-900/40 space-y-3">
                <div className="flex items-center gap-2.5 text-rose-300 font-bold text-sm">
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                  Sketchy Smart Devices & IP Cams
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Cheap smart plugs, robot vacuums, and Chinese IP cameras run vulnerable, unpatched firmware that constantly beacon out to overseas command-and-control servers.
                </p>
                <div className="text-[11px] font-mono text-rose-400 bg-rose-950/60 p-2 rounded-lg border border-rose-900/30">
                  ✗ Botnet risk: Mirai, Mozi infection<br />
                  ✗ Vulnerability: Lateral LAN pivot to PC
                </div>
              </div>
            )}

            {activeScenario === 'roaming' && (
              <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-900/40 space-y-3">
                <div className="flex items-center gap-2.5 text-rose-300 font-bold text-sm">
                  <Wifi className="w-4 h-4 text-rose-400" />
                  Hostile Public Wi-Fi Networks
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Airport, hotel, and coffee shop Wi-Fi exposes your phone and laptop to rogue access points, ARP poisoning, and unencrypted hotel proxy inspection.
                </p>
                <div className="text-[11px] font-mono text-rose-400 bg-rose-950/60 p-2 rounded-lg border border-rose-900/30">
                  ✗ Evil Twin fake SSIDs<br />
                  ✗ Session hijacking on public hotspots
                </div>
              </div>
            )}
          </div>

          {/* Center Column: The Axonwall Fortress Gate */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-950 border-2 border-emerald-500/50 shadow-2xl shadow-emerald-950/50 relative text-center space-y-4">
            <div className="absolute -top-3 px-3 py-0.5 rounded-full bg-emerald-500 text-black font-mono text-[10px] font-extrabold uppercase tracking-wider">
              Axonwall Sentry Gate
            </div>

            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/20">
              <Shield className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <div className="font-bold text-white text-base">Your Private Fortress</div>
              <div className="text-xs text-emerald-400 font-mono">100% Local • Zero Cloud Telemetry</div>
            </div>

            <div className="w-full space-y-2 text-left pt-2 border-t border-slate-800 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Kernel-level nftables micro-isolation</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Encrypted DNS-over-TLS (Unbound)</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>400k+ Ad & Telemetry Host Sinkhole</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Always-On Kernel WireGuard Mesh</span>
              </div>
            </div>

            <div className="w-full bg-slate-900 p-2.5 rounded-xl border border-slate-800 text-[11px] font-mono text-emerald-300 text-left">
              {activeScenario === 'isp' && (
                <span>✓ DoT encrypted upstream to Quad9. ISP sees zero DNS history.</span>
              )}
              {activeScenario === 'iot' && (
                <span>✓ VLAN 40 (IoT) isolated. nftables policy: drop to LAN (10.0.1.0/24).</span>
              )}
              {activeScenario === 'roaming' && (
                <span>✓ WireGuard tunnel active (wg0). 0-RTT ChaCha20 encryption to home fiber.</span>
              )}
            </div>
          </div>

          {/* Right Column: Protected Sanctuary */}
          <div className="lg:col-span-4 space-y-4">
            <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Your Sovereign Sanctuary
            </div>

            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <Laptop className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Work Laptops & PCs</div>
                    <div className="text-[10px] text-slate-400">VLAN 10 • Clean, high-priority lane</div>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  PROTECTED
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Family Phones & Tablets</div>
                    <div className="text-[10px] text-slate-400">Ad-free browsing & tracker-blocked</div>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-semibold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">
                  SHIELDED
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                    <HardDrive className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Private NAS & Storage</div>
                    <div className="text-[10px] text-slate-400">Zero open ports to Shodan/Internet</div>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-semibold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                  AIRGAPPED
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Feature Highlights */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-300">
          <div className="space-y-1.5">
            <div className="font-bold text-white flex items-center gap-1.5">
              <EyeOff className="w-3.5 h-3.5 text-emerald-400" />
              Zero Telemetry Ethos
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              No mandatory cloud accounts, no diagnostic pings back to vendor data lakes, no surprise terms-of-service revisions. Your network data never leaves your walls.
            </p>
          </div>

          <div className="space-y-1.5">
            <div className="font-bold text-white flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-sky-400" />
              Bufferbloat Annihilation
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Family streaming 4K Netflix while you upload a giant git repository? Linux CAKE queue discipline keeps your Zoom call and multiplayer gaming at sub-1ms ping.
            </p>
          </div>

          <div className="space-y-1.5">
            <div className="font-bold text-white flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-purple-400" />
              Sovereign Remote Access
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Access your home file server, Plex library, and cameras from anywhere in the world via kernel-accelerated WireGuard without relying on third-party relay clouds.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
