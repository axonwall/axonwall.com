'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, CornerDownLeft, Trash2, HelpCircle } from 'lucide-react';

interface HistoryItem {
  command: string;
  output: string;
}

export function TerminalView() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      command: 'cat /etc/issue',
      output: `================================================================================
Axonwall Appliance (Debian 13)
Web Console: https://192.168.100.1:2966
Appliance Console: Login with administrator credentials
================================================================================`,
    },
    {
      command: 'axonwall status',
      output: `[Axonwall System Report]
Appliance Hostname : axonwall-core
OS Release         : Debian 13 (Trixie) Linux 6.12.10-amd64
Web Management     : Listening on https://0.0.0.0:2966 [TLS 1.3]
Data Plane Engine  : nftables 1.1.2 (Flowtable HW Offload Active)
Active Conntrack   : 2,419 / 2,000,000 states (0.12%)
WireGuard Peers    : 3 connected (wg0)
Satellite Fleet    : 4 micro-edge nodes synchronized (v24)`,
    },
  ]);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const executeCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    let out = '';
    const parts = trimmed.split(' ');
    const cmd = parts[0].toLowerCase();

    switch (cmd) {
      case 'help':
      case '?':
        out = `Available Appliance Shell Commands:
  nft list ruleset          - Dump active Linux kernel nftables ruleset
  axonwall status           - Display core system health and management ports
  axonwall-config           - Launch 11-domain Neovim Super Configurator TUI
  axonwallctl rootkit-scan  - Run 6-engine Malware Suite + Ring-0 Ghost-in-the-Ring audit
  axonwallctl ha-status     - Display 2-Host High Availability VRRP, Conntrack & ZFS sync
  ip addr                   - List network interfaces and assigned IP subnets
  cat /etc/issue            - Display system issue banner
  uname -a                  - Print Linux kernel architecture and version
  ping <host>               - Send ICMP echo requests
  uptime                    - Display appliance uptime and load averages
  clear                     - Clear terminal display buffer`;
        break;

      case 'axonwall-config':
        out = `[Axonwall Neovim Super Configurator v0.11.28]
Loaded 11 Interactive Lua Form Domains (/usr/share/axonwall/nvim/init.lua):
  [1] Interfaces & VLANs     [5] Rosenpass PQ-VPN      [9]  Rootkit & Ring-0 Hunter
  [2] nftables Firewall      [6] 2-Host HA Cluster     [10] Suricata / Zeek / CrowdSec
  [3] NAT & Port Forwards    [7] BGP / OSPF (FRR)      [11] K3s & Vigilant Octo Waffle
  [4] Unbound DNS & Kea      [8] ZFS Pools & Snapshots
Keymaps: <Tab> Next Field | <Space> Toggle | <leader>w Stage | <leader>c Commit-Confirm (60s Rollback)`;
        break;

      case 'axonwallctl':
        if (parts[1] === 'rootkit-scan') {
          out = `[Ghost-in-the-Ring & 6-Engine Malware Hunter Audit]
[PASS] BPF_LSM Kernel Guard    : Unprivileged BPF_PROG_LOAD & IORING_SETUP_SQPOLL blocked
[PASS] /proc/kcore XArray Walk : 14 active bpf_prog structs in prog_idr (matches bpftool: 14/14, 0 hidden)
[PASS] Silicon PMU LBR Audit   : 0 anomalous branch deltas / 0 kretprobe trampolines on sys_getdents64
[PASS] rkhunter & chkrootkit   : 248 rootkit signatures checked, 0 suspect LKM or hidden /proc PIDs
[PASS] ClamAV + AIDE + YARA    : clamonacc active; SHA-512 /boot & /usr/sbin verified; 0 YARA memory hits
[PASS] Lynis Hardening Index   : 92 / 100 (CIS / NIST 800-53 Appliance Profile)`;
        } else if (parts[1] === 'ha-status') {
          out = `[Axonwall 2-Host High Availability Cluster Status]
Local Node         : axonwall-fw01 (PRIMARY / MASTER)
Peer Node          : axonwall-fw02 (172.16.254.2 - HEALTHY, 0.28ms RTT)
mTLS PKI Link      : Verified (Serial #04A9F1, TLS 1.3 ECDHE-ECDSA-AES256-GCM)
VRRP VIPs          : WAN 203.0.113.10/24 (MASTER) | LAN 192.168.100.1/24 (MASTER)
conntrackd FTFW    : Synchronized (2,419 active flows mirrored over eth2)
Chrony Stratum-1   : Peer offset +0.000012s (interleaved symmetric mode)
State Replication  : OpenLDAP syncrepl OK | SQLite WAL OK | ZFS tank/config @ha-sync-0942 OK`;
        } else {
          out = `Usage: axonwallctl <rootkit-scan | ha-status | tui | status>`;
        }
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      case 'nft':
        if (parts.slice(1).join(' ') === 'list ruleset') {
          out = `table inet axonwall {
    chain prerouting {
        type filter hook prerouting priority -150; policy accept;
        ip saddr @threat_feed_ips counter drop
    }

    chain input {
        type filter hook input priority 0; policy drop;
        ct state established,related accept
        iif "lo" accept
        tcp dport { 22, 80, 443, 2966 } accept comment "emergency-anti-lockout"
        iif "wan" udp dport 51820 accept comment "wireguard-ingress"
    }

    chain forward {
        type filter hook forward priority 0; policy drop;
        ct state established,related accept
        iifname "lan" oifname "wan" accept
        iifname "wg0" oifname "lan" accept
    }

    chain postrouting {
        type nat hook postrouting priority 100; policy accept;
        oifname "wan" masquerade
    }
}`;
        } else {
          out = `Usage: nft list ruleset`;
        }
        break;

      case 'axonwall':
        if (parts[1] === 'status') {
          out = `[Axonwall System Report]
Appliance Hostname : axonwall-core
OS Release         : Debian 13 (Trixie) Linux 6.12.10-amd64
Web Management     : Listening on https://0.0.0.0:2966 [TLS 1.3]
Data Plane Engine  : nftables 1.1.2 (Flowtable HW Offload Active)
Active Conntrack   : 2,419 / 2,000,000 states (0.12%)
WireGuard Peers    : 3 connected (wg0)
Satellite Fleet    : 4 micro-edge nodes synchronized (v24)`;
        } else {
          out = `axonwall: unknown command '${parts.slice(1).join(' ')}'. Try 'axonwall status'.`;
        }
        break;

      case 'ip':
        out = `1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN
    inet 127.0.0.1/8 scope host lo
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc mq state UP qlen 1000
    inet 198.51.100.22/24 brd 198.51.100.255 scope global eth0
3: eth1: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc mq state UP qlen 1000
    inet 192.168.100.1/24 brd 192.168.100.255 scope global eth1
4: eth2: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc mq state UP qlen 1000
    inet 10.0.50.1/24 brd 10.0.50.255 scope global eth2
5: wg0: <POINTOPOINT,NOARP,UP,LOWER_UP> mtu 1420 qdisc noqueue state UNKNOWN
    inet 10.10.0.1/24 scope global wg0`;
        break;

      case 'uname':
        out = `Linux axonwall-core 6.12.10-amd64 #1 SMP PREEMPT_DYNAMIC Debian 6.12.10-1 (2026-10-10) x86_64 GNU/Linux`;
        break;

      case 'uptime':
        out = ` 11:42:00 up 14 days,  6:32,  2 users,  load average: 0.14, 0.08, 0.05`;
        break;

      case 'cat':
        if (parts[1] === '/etc/issue') {
          out = `================================================================================
Axonwall Appliance (Debian 13)
Web Console: https://192.168.100.1:2966
Appliance Console: Login with administrator credentials
================================================================================`;
        } else {
          out = `cat: ${parts[1] || ''}: No such file or directory`;
        }
        break;

      case 'ping':
        const target = parts[1] || '1.1.1.1';
        out = `PING ${target} (${target}) 56(84) bytes of data.
64 bytes from ${target}: icmp_seq=1 ttl=58 time=4.12 ms
64 bytes from ${target}: icmp_seq=2 ttl=58 time=3.98 ms
64 bytes from ${target}: icmp_seq=3 ttl=58 time=4.05 ms
64 bytes from ${target}: icmp_seq=4 ttl=58 time=4.01 ms

--- ${target} ping statistics ---
4 packets transmitted, 4 received, 0% packet loss, time 3004ms
rtt min/avg/max/mdev = 3.980/4.040/4.120/0.052 ms`;
        break;

      default:
        out = `bash: ${cmd}: command not found. Type 'help' for available commands.`;
        break;
    }

    setHistory((prev) => [...prev, { command: trimmed, output: out }]);
    setInput('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(input);
  };

  return (
    <div className="space-y-4 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <TerminalIcon className="w-6 h-6 text-emerald-400" />
            <span>Interactive Web Shell & Sensor Console</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Direct authenticated CLI access to the underlying Debian 13 appliance and nftables engine.
          </p>
        </div>

        <button
          onClick={() => setHistory([])}
          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1.5 transition-colors border border-slate-700 self-start sm:self-auto"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear Buffer</span>
        </button>
      </div>

      {/* Suggestion Chips */}
      <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
        <span className="text-slate-500 font-sans text-[11px]">Quick Commands:</span>
        {[
          'nft list ruleset',
          'axonwall status',
          'axonwall-config',
          'axonwallctl rootkit-scan',
          'axonwallctl ha-status',
          'ip addr',
          'uptime',
        ].map((c) => (
          <button
            key={c}
            onClick={() => executeCommand(c)}
            className="px-2.5 py-1 rounded-md bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/40 text-slate-300 hover:text-emerald-400 transition-colors"
          >
            {c}
          </button>
        ))}
      </div>

      {/* Terminal Window */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl font-mono text-xs">
        {/* Terminal Header */}
        <div className="bg-slate-900 border-b border-slate-800 px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="ml-2 text-slate-400 text-[11px]">admin@axonwall-core:~ (ttyS0 / web-pty)</span>
          </div>
          <span className="text-emerald-400 text-[10px]">CONNECTED • TLS 1.3</span>
        </div>

        {/* Terminal Output */}
        <div className="p-4 space-y-3 min-h-[380px] max-h-[500px] overflow-y-auto">
          {history.map((h, i) => (
            <div key={i} className="space-y-1">
              <div className="flex items-center gap-2 text-slate-300">
                <span className="text-emerald-400 font-bold">admin@axonwall-core:~$</span>
                <span className="text-white">{h.command}</span>
              </div>
              <pre className="text-slate-300 whitespace-pre-wrap leading-relaxed text-[11px] pl-4 border-l border-slate-800">
                {h.output}
              </pre>
            </div>
          ))}

          {/* Active Input Line */}
          <form onSubmit={handleSubmit} className="flex items-center gap-2 text-slate-300 pt-1">
            <span className="text-emerald-400 font-bold">admin@axonwall-core:~$</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type command ('help', 'nft list ruleset', 'axonwall status')..."
              className="flex-1 bg-transparent text-white focus:outline-none placeholder:text-slate-600 font-mono text-xs"
              autoFocus
            />
            <button type="submit" className="text-slate-500 hover:text-slate-300">
              <CornerDownLeft className="w-3.5 h-3.5" />
            </button>
          </form>
          <div ref={bottomRef} />
        </div>
      </div>
    </div>
  );
}
