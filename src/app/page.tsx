'use client';

import { useState } from 'react';
import {
  Shield,
  Zap,
  ArrowRight,
  Server,
  Layers,
  Cpu,
  CheckCircle2,
  Lock,
  RefreshCw,
  Terminal,
  Activity,
  Globe,
  Radio,
  Boxes,
  KeyRound,
  Download,
  ExternalLink,
  ChevronRight,
  HelpCircle,
} from 'lucide-react';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'firewall' | 'vpn' | 'ha' | 'observability'>('firewall');

  return (
    <div className="min-h-screen bg-[#080c14] text-slate-100 selection:bg-emerald-500 selection:text-black">
      {/* Background glow header */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[650px] radial-glow pointer-events-none -z-10" />

      {/* Navigation */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#080c14]/80 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/10">
              <Shield className="w-5 h-5" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-bold text-lg text-white tracking-tight">Axonwall</span>
              <span className="text-[10px] text-emerald-400 font-mono uppercase px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 font-semibold">
                Linux + nftables
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-7 text-sm text-slate-400 font-medium">
            <a href="#why-axonwall" className="hover:text-emerald-400 transition">Why Axonwall</a>
            <a href="#features" className="hover:text-emerald-400 transition">Features</a>
            <a href="#appliances" className="hover:text-emerald-400 transition">Hardware Appliances</a>
            <a href="#pricing" className="hover:text-emerald-400 transition">Editions & Pricing</a>
            <a href="#migration" className="hover:text-emerald-400 transition">Migration</a>
            <a
              href="https://github.com/axonwall/axonwall_monorepo"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition flex items-center gap-1"
            >
              GitHub <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#appliances"
              className="hidden sm:inline-flex px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
            >
              Order Appliance
            </a>
            <a
              href="https://github.com/axonwall/axonwall_monorepo/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition shadow-lg shadow-emerald-950/60 flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" /> Download ISO
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-semibold animate-pulse">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            Axonwall 1.0 Release • Pure Linux 6.12 LTS & nftables Engine
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight max-w-4xl mx-auto leading-[1.1]">
            The Next-Generation Open Source Firewall <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400">Built on Linux</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Replace legacy BSD packet filters and accidental admin lockouts. Axonwall delivers line-rate multi-core performance, Junos-style commit-confirm with automated rollback, and a reactive Next.js 16 console.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href="https://github.com/axonwall/axonwall_monorepo/releases"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-sm font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl shadow-emerald-950/80 transition flex items-center justify-center gap-2"
            >
              Download Community Edition (Free) <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#appliances"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-sm font-semibold bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-800 transition flex items-center justify-center gap-2"
            >
              <Server className="w-4 h-4 text-emerald-400" /> Explore Hardware Appliances
            </a>
          </div>

          {/* Trust stats */}
          <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto border-t border-slate-800/80 text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-white font-mono">100 Gbps</div>
              <div className="text-xs text-slate-400 mt-1">Wire-Speed nftables</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-emerald-400 font-mono">60s</div>
              <div className="text-xs text-slate-400 mt-1">Commit-Confirm Rollback</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-white font-mono">0ms</div>
              <div className="text-xs text-slate-400 mt-1">CAKE Bufferbloat Latency</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-sky-400 font-mono">100%</div>
              <div className="text-xs text-slate-400 mt-1">Open Source Core</div>
            </div>
          </div>

          {/* Interactive UI Mockup Showcase */}
          <div className="pt-12 max-w-5xl mx-auto">
            <div className="rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl p-6 text-left relative overflow-hidden backdrop-blur-xl">
              {/* Window Controls */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="text-xs font-mono text-slate-500 ml-2">https://axonwall.internal/firewall</span>
                </div>
                {/* Commit Confirm Banner Mockup */}
                <div className="flex items-center gap-2 bg-amber-950/60 border border-amber-500/30 px-3 py-1 rounded-lg text-xs text-amber-300 font-mono">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  Commit-Confirm: 00:48 auto-rollback
                  <button className="px-2 py-0.5 rounded bg-emerald-600 text-white font-sans font-semibold text-[11px] ml-2">
                    Confirm
                  </button>
                  <button className="px-2 py-0.5 rounded bg-rose-600/80 text-white font-sans font-semibold text-[11px]">
                    Rollback
                  </button>
                </div>
              </div>

              {/* Grid content */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div className="text-xs text-slate-500 font-mono mb-1">TABLE INET AXONWALL</div>
                  <div className="text-lg font-bold text-white font-mono">28,450 pkts/s</div>
                  <div className="text-xs text-emerald-400 mt-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> 0 dropped packets on LAN
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div className="text-xs text-slate-500 font-mono mb-1">SMART QOS (CAKE)</div>
                  <div className="text-lg font-bold text-sky-400 font-mono">A+ Bufferbloat Grade</div>
                  <div className="text-xs text-slate-400 mt-1">DiffServ Prioritization Active</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div className="text-xs text-slate-500 font-mono mb-1">SURICATA IDS/IPS</div>
                  <div className="text-lg font-bold text-purple-400 font-mono">NFQUEUE Fail-Open</div>
                  <div className="text-xs text-emerald-400 mt-1">Zero downtime on reload</div>
                </div>
              </div>

              <div className="mt-4 p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-400 overflow-x-auto">
                <span className="text-slate-500"># nft -f /etc/axonwall/candidate.nft (atomic transaction)</span><br />
                table inet axonwall &#123;<br />
                &nbsp;&nbsp;chain forward &#123; type filter hook forward priority 0; policy drop; &#125;<br />
                &nbsp;&nbsp;chain postrouting &#123; type nat hook postrouting priority srcnat; oifname &quot;eth0&quot; masquerade; &#125;<br />
                &#125;<br />
                <span className="text-sky-400">✓ Atomic transaction completed in 1.4ms. Commit-confirm timer armed.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Architectural Paradigm Shift (Why Axonwall) */}
      <section id="why-axonwall" className="py-24 border-t border-slate-800/80 bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">The Linux Advantage</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Why We Left FreeBSD Behind
            </h2>
            <p className="text-sm sm:text-base text-slate-400">
              For 20 years, open-source firewalls relied on FreeBSD. But today, the modern internet runs on Linux. Here is why Axonwall is the definitive architectural upgrade.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">nftables Line-Rate</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                FreeBSD <code className="text-slate-300">pf</code> locks on single cores under heavy NAT loads. Linux <code className="text-slate-300">nftables</code> scales across all CPU cores with lockless flow tables and multi-queue RSS.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <RefreshCw className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Commit-Confirm Rollback</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                No more fear of applying rules remotely. If a mistake cuts your connection, the Go daemon automatically reverts to the last-known-good atomic bundle within 60 seconds.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                <KeyRound className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Kernel DCO VPN</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                WireGuard runs natively in the Linux kernel, and OpenVPN 2.6 uses kernel Data Channel Offload (<code className="text-slate-300">ovpn-dco</code>), eliminating user-space context switches for line-rate encryption.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <Boxes className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Cloud-Native & Hybrid</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Axonwall manages strictly <code className="text-slate-300">table inet axonwall</code> without touching Docker or Kubernetes tables. Deploy on Bare Metal, VM, Docker, or Kubernetes CNF pods.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Deep Dive */}
      <section id="features" className="py-24 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Enterprise Feature Set</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Full OPNsense Parity, Built for 2026
            </h2>
            <p className="text-sm sm:text-base text-slate-400">
              Every critical security service—from ISC Kea DHCP to FRRouting BGP and Suricata IDS—re-architected for Linux.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Shield className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-white">Suricata IDS/IPS (Fail-Open)</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Integrated NFQUEUE fail-open bypass. If Suricata restarts or crashes under DDoS load, packet flow bypasses the queue rather than severing all network connectivity.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                <Activity className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-white">Smart QoS (CAKE + IFB)</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Linux CAKE queue discipline with automatic DiffServ DSCP prioritization, TCP ACK filtering, and IFB virtual ingress shaping. Eliminates latency during full downloads.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <Radio className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-white">CrowdSec & Dynamic Feeds</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                CrowdSec LAPI bouncer directly binds attacker IPs to native nftables interval sets with zero ruleset reload. Dynamic URL table feeds, GeoIP, and ASN blocking.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Server className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-white">High Availability (VRRP + State Sync)</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Keepalived VRRP active/standby virtual routers combined with Conntrackd FTFW UDP state replication. Zero dropped sessions on failover.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Globe className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-white">FRRouting (BGP / OSPF / BFD)</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Production-grade enterprise dynamic routing powered by FRR. Full IPv4 and IPv6 BGP multi-homing with BFD sub-second link failure detection.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                <Activity className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-white">VictoriaMetrics Telemetry</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Embedded high-resolution time series engine and NetFlow/IPFIX flow analyzer. Identify top bandwidth talkers and destination ports in real time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Hardware Appliances Section (The OPNsense / Deciso Model) */}
      <section id="appliances" className="py-24 border-t border-slate-800/80 bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Turnkey Systems</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Pre-Configured Hardware Appliances
            </h2>
            <p className="text-sm sm:text-base text-slate-400">
              Factory burned-in, pre-loaded with Axonwall OS, and tested for maximum thermal reliability. Ships globally with next-day advance hardware replacement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Edge 10 */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-6 hover:border-slate-700 transition">
              <div className="space-y-4">
                <span className="px-2.5 py-1 rounded-md text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase">
                  Branch & Home Lab
                </span>
                <h3 className="text-xl font-bold text-white">Axonwall Edge 10</h3>
                <div className="text-3xl font-extrabold text-white font-mono">$499</div>
                <p className="text-xs text-slate-400">Silent, fanless aluminum chassis for home labs, branch offices, and edge deployments.</p>

                <ul className="text-xs text-slate-300 space-y-2 pt-2 border-t border-slate-800">
                  <li className="flex items-center gap-2">✓ Quad-Core Intel x86 (Fanless)</li>
                  <li className="flex items-center gap-2">✓ 4x 2.5GbE RJ-45 (Intel i226)</li>
                  <li className="flex items-center gap-2">✓ 2x 10GbE SFP+ Ports</li>
                  <li className="flex items-center gap-2">✓ 16GB DDR5 RAM + 128GB NVMe</li>
                  <li className="flex items-center gap-2">✓ 2.5 Gbps WireGuard Throughput</li>
                </ul>
              </div>

              <button className="w-full py-2.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white transition border border-slate-700">
                Order Edge 10
              </button>
            </div>

            {/* Edge 20-5G */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-6 hover:border-slate-700 transition">
              <div className="space-y-4">
                <span className="px-2.5 py-1 rounded-md text-[10px] font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20 uppercase">
                  Cellular Failover
                </span>
                <h3 className="text-xl font-bold text-white">Axonwall Edge 20-5G</h3>
                <div className="text-3xl font-extrabold text-white font-mono">$899</div>
                <p className="text-xs text-slate-400">Integrated 5G Sub-6 modem with dual SIM redundancy for retail and mobile edge.</p>

                <ul className="text-xs text-slate-300 space-y-2 pt-2 border-t border-slate-800">
                  <li className="flex items-center gap-2">✓ Octa-Core ARM64 / x86</li>
                  <li className="flex items-center gap-2">✓ Dual SIM 5G Sub-6 + GNSS</li>
                  <li className="flex items-center gap-2">✓ 4x 2.5GbE + 2x 10GbE SFP+</li>
                  <li className="flex items-center gap-2">✓ 802.3at PoE Power Input</li>
                  <li className="flex items-center gap-2">✓ Out-of-band management</li>
                </ul>
              </div>

              <button className="w-full py-2.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white transition border border-slate-700">
                Order Edge 20-5G
              </button>
            </div>

            {/* Rack 100 */}
            <div className="p-6 rounded-2xl bg-slate-900 border-2 border-emerald-500/50 shadow-xl shadow-emerald-950/20 flex flex-col justify-between space-y-6 relative">
              <div className="space-y-4">
                <span className="px-2.5 py-1 rounded-md text-[10px] font-semibold bg-emerald-500 text-black uppercase font-bold">
                  Most Popular
                </span>
                <h3 className="text-xl font-bold text-white">Axonwall Rack 100</h3>
                <div className="text-3xl font-extrabold text-white font-mono">$1,699</div>
                <p className="text-xs text-slate-400">1U rackmount appliance for medium enterprises, schools, and central headquarters.</p>

                <ul className="text-xs text-slate-300 space-y-2 pt-2 border-t border-slate-800">
                  <li className="flex items-center gap-2">✓ Intel Xeon D 8-Core / 16-Thread</li>
                  <li className="flex items-center gap-2">✓ 8x 2.5GbE + 4x 10GbE SFP+</li>
                  <li className="flex items-center gap-2">✓ 32GB ECC RAM (expandable to 128GB)</li>
                  <li className="flex items-center gap-2">✓ Dual Redundant 300W PSUs</li>
                  <li className="flex items-center gap-2">✓ 10 Gbps WireGuard & IMIX NAT</li>
                </ul>
              </div>

              <button className="w-full py-2.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition shadow-lg shadow-emerald-950/60">
                Order Rack 100
              </button>
            </div>

            {/* Core HA Cluster */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-6 hover:border-slate-700 transition">
              <div className="space-y-4">
                <span className="px-2.5 py-1 rounded-md text-[10px] font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20 uppercase">
                  Datacenter HA Pair
                </span>
                <h3 className="text-xl font-bold text-white">Axonwall Core HA</h3>
                <div className="text-3xl font-extrabold text-white font-mono">$7,999</div>
                <p className="text-xs text-slate-400">Turnkey active/standby dual 1U HA pair with 100GbE QSFP28 and sub-second failover.</p>

                <ul className="text-xs text-slate-300 space-y-2 pt-2 border-t border-slate-800">
                  <li className="flex items-center gap-2">✓ 2x 1U Clustered Appliances</li>
                  <li className="flex items-center gap-2">✓ AMD EPYC 16-Core / 32-Thread</li>
                  <li className="flex items-center gap-2">✓ 4x 25GbE SFP28 + 2x 100GbE QSFP28</li>
                  <li className="flex items-center gap-2">✓ Conntrackd 100GbE DAC Link</li>
                  <li className="flex items-center gap-2">✓ Dedicated IPMI / BMC management</li>
                </ul>
              </div>

              <button className="w-full py-2.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white transition border border-slate-700">
                Contact Enterprise Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Editions & Subscriptions (OPNsense / Deciso Model) */}
      <section id="pricing" className="py-24 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Transparent Pricing</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Software Editions & Enterprise Support
            </h2>
            <p className="text-sm sm:text-base text-slate-400">
              100% open source community edition for everyone, with certified long-term support and commercial threat feeds for mission-critical enterprise deployments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Community Edition */}
            <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white">Community Edition</h3>
                <p className="text-xs text-slate-400 mt-1">For homelabs, developers, and self-supported small deployments.</p>
                <div className="text-4xl font-extrabold text-white font-mono mt-4">$0 <span className="text-sm font-normal text-slate-500">/ forever</span></div>
              </div>

              <ul className="text-xs text-slate-300 space-y-3 pt-4 border-t border-slate-800">
                <li className="flex items-center gap-2 text-emerald-400">✓ 100% Free & Open Source Core</li>
                <li className="flex items-center gap-2">✓ Bi-weekly rolling release cycle</li>
                <li className="flex items-center gap-2">✓ Full nftables, WireGuard, and IPsec</li>
                <li className="flex items-center gap-2">✓ OpenLDAP and ISC Kea DHCP</li>
                <li className="flex items-center gap-2">✓ Community Forum Support</li>
              </ul>

              <a
                href="https://github.com/axonwall/axonwall_monorepo"
                className="w-full py-3 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white transition border border-slate-700 block text-center"
              >
                Download Community ISO
              </a>
            </div>

            {/* Business Edition */}
            <div className="p-8 rounded-2xl bg-slate-900 border-2 border-emerald-500 shadow-xl shadow-emerald-950/30 space-y-6 relative">
              <div className="absolute top-0 right-8 -translate-y-1/2 bg-emerald-500 text-black px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider">
                Recommended for Production
              </div>

              <div>
                <h3 className="text-xl font-bold text-white">Business Edition</h3>
                <p className="text-xs text-slate-400 mt-1">Hardened, validated release channel for commercial environments.</p>
                <div className="text-4xl font-extrabold text-white font-mono mt-4">$249 <span className="text-sm font-normal text-slate-500">/ appliance / year</span></div>
              </div>

              <ul className="text-xs text-slate-300 space-y-3 pt-4 border-t border-slate-800">
                <li className="flex items-center gap-2 text-emerald-400">✓ Everything in Community, plus:</li>
                <li className="flex items-center gap-2">✓ Hardened Quarterly LTS update stream</li>
                <li className="flex items-center gap-2">✓ Automated hardware regression QA</li>
                <li className="flex items-center gap-2">✓ Commercial Threat Intelligence Feeds</li>
                <li className="flex items-center gap-2">✓ MaxMind GeoIP2 + CrowdSec CTI</li>
                <li className="flex items-center gap-2">✓ Encrypted Cloud Config Vault</li>
              </ul>

              <button className="w-full py-3 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition shadow-lg shadow-emerald-950/60">
                Subscribe to Business Edition
              </button>
            </div>

            {/* Enterprise Support */}
            <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white">Enterprise SLA Support</h3>
                <p className="text-xs text-slate-400 mt-1">24/7 mission-critical response for enterprise and government clusters.</p>
                <div className="text-4xl font-extrabold text-white font-mono mt-4">$1,499 <span className="text-sm font-normal text-slate-500">/ node / year</span></div>
              </div>

              <ul className="text-xs text-slate-300 space-y-3 pt-4 border-t border-slate-800">
                <li className="flex items-center gap-2 text-emerald-400">✓ Everything in Business Edition, plus:</li>
                <li className="flex items-center gap-2">✓ 24x7x365 Emergency Phone & Ticket SLA</li>
                <li className="flex items-center gap-2">✓ 2-hour response time guarantee</li>
                <li className="flex items-center gap-2">✓ Named Technical Account Manager (TAM)</li>
                <li className="flex items-center gap-2">✓ Architecture review & migration service</li>
                <li className="flex items-center gap-2">✓ Next-business-day hardware advance swap</li>
              </ul>

              <button className="w-full py-3 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white transition border border-slate-700">
                Contact Enterprise Support
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Migration Section */}
      <section id="migration" className="py-20 border-t border-slate-800/80 bg-slate-950/60">
        <div className="max-w-5xl mx-auto px-6 text-center space-y-6">
          <div className="inline-flex p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <RefreshCw className="w-6 h-6" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Migrate from OPNsense or pfSense in 30 Seconds
          </h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
            Our built-in migration engine parses your existing <code className="text-slate-300">config.xml</code> backup and automatically translates interface mappings, aliases, firewall rules, NAT port forwards, and DHCP subnets to Linux nftables.
          </p>
          <div className="pt-2">
            <a
              href="https://github.com/axonwall/axonwall_monorepo#migration"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
            >
              Learn about config.xml Migration <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 border-t border-slate-800/80">
        <div className="max-w-4xl mx-auto px-6 space-y-12">
          <h2 className="text-3xl font-extrabold text-white text-center">Frequently Asked Questions</h2>

          <div className="space-y-6 text-sm">
            <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <h3 className="font-bold text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-emerald-400" /> Why did you build Axonwall on Linux instead of FreeBSD?
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Linux provides modern hardware drivers on day one (including 5G cellular, Wi-Fi 7, and 100GbE NICs), multi-core scalability via <code className="text-slate-300">nftables</code> and eBPF, and native support for running inside Docker and Kubernetes. FreeBSD packet filtering (<code className="text-slate-300">pf</code>) suffers from lock contention under heavy symmetrical traffic.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <h3 className="font-bold text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-emerald-400" /> Can I install Axonwall on my own PC or server?
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Yes. Axonwall Community Edition runs on any standard 64-bit x86 or ARM64 computer. We provide bootable UEFI ISO images, Debian 13 packages (<code className="text-slate-300">.deb</code>), Docker Compose templates, and Proxmox/KVM virtual machine images.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <h3 className="font-bold text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-emerald-400" /> How does Commit-Confirm prevent lockouts?
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                When you apply a new ruleset, Axonwall loads it into the Linux kernel and arms a 60-second confirmation timer. If your session remains connected and you click &quot;Confirm&quot;, the configuration is permanently stored. If your rule severed connectivity, the timer expires and the daemon automatically rolls back to the previous working bundle.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-12 bg-slate-950 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Shield className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-white">Axonwall</span>
            <span>— The Modern Linux Router & Next-Gen Firewall.</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="https://github.com/axonwall/axonwall_monorepo" className="hover:text-slate-300 transition">GitHub</a>
            <a href="#features" className="hover:text-slate-300 transition">Features</a>
            <a href="#appliances" className="hover:text-slate-300 transition">Appliances</a>
            <a href="#pricing" className="hover:text-slate-300 transition">Pricing</a>
            <a href="https://github.com/axonwall/axonwall_monorepo/blob/main/LICENSE" className="hover:text-slate-300 transition">License</a>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 mt-8 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-600">
          <p>© {new Date().getFullYear()} Axonwall Project. All rights reserved.</p>
          <p>OPNsense is a trademark of Deciso B.V. pfSense is a trademark of Netgate. Axonwall is an independent open-source project.</p>
        </div>
      </footer>
    </div>
  );
}
