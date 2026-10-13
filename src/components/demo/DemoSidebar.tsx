'use client';

import React, { useState, useMemo } from 'react';
import { Logo } from '../Logo';
import {
  LayoutDashboard,
  Flame,
  Globe,
  MapPin,
  Radio,
  Ban,
  Network,
  Layers,
  Route,
  Compass,
  Server,
  KeyRound,
  ShieldCheck,
  Activity,
  Wrench,
  Binary,
  Terminal,
  Settings,
  Building2,
  RefreshCw,
  HardDrive,
  Sparkles,
  Wifi,
  Search,
  X,
  ChevronDown,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react';
import { DemoViewKey } from './demoState';
export type { DemoViewKey };

interface NavItem {
  id: DemoViewKey;
  name: string;
  icon: any;
  badge?: string;
}

interface NavGroup {
  id: string;
  name: string;
  items: NavItem[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    id: 'overview',
    name: 'Overview',
    items: [
      { id: 'lobby', name: 'Dashboard / Lobby', icon: LayoutDashboard },
      { id: 'ai', name: 'AI Security Copilot', icon: Sparkles, badge: 'AI' },
    ],
  },
  {
    id: 'firewall-sec',
    name: 'Firewall & Protection',
    items: [
      { id: 'firewall', name: 'Firewall Rules & NAT', icon: Flame, badge: '6' },
      { id: 'threats', name: 'Threat Defense & Blocklists', icon: ShieldAlert, badge: 'Active' },
    ],
  },
  {
    id: 'networking',
    name: 'Networking & Fabric',
    items: [
      { id: 'interfaces', name: 'Interfaces & Multi-WAN', icon: Network },
      { id: 'routing', name: 'Gateways & Dynamic Routes', icon: Route },
      { id: 'vpn', name: 'WireGuard & Mesh VPN', icon: KeyRound, badge: 'Mesh' },
      { id: 'fleet', name: 'Edge Satellites (Fleet)', icon: Wifi, badge: '4' },
    ],
  },
  {
    id: 'ops-system',
    name: 'Operations & System',
    items: [
      { id: 'diagnostics', name: 'Packet Tracer (nftables)', icon: Layers, badge: 'Trace' },
      { id: 'terminal', name: 'Web Shell & Terminal', icon: Terminal, badge: 'CLI' },
      { id: 'system', name: 'System, A/B & Enterprise SSO', icon: Settings },
    ],
  },
];

interface DemoSidebarProps {
  activeView: DemoViewKey;
  onSelectView: (view: DemoViewKey) => void;
  stagedChangesCount?: number;
}

export function DemoSidebar({ activeView, onSelectView, stagedChangesCount = 0 }: DemoSidebarProps) {
  const [search, setSearch] = useState('');
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({});

  const toggleGroup = (groupId: string) => {
    setCollapsedGroups((prev) => ({ ...prev, [groupId]: !prev[groupId] }));
  };

  const filteredGroups = useMemo(() => {
    if (!search.trim()) return NAV_GROUPS;
    const query = search.toLowerCase();
    return NAV_GROUPS.map((group) => ({
      ...group,
      items: group.items.filter((item) => item.name.toLowerCase().includes(query)),
    })).filter((group) => group.items.length > 0);
  }, [search]);

  return (
    <aside className="w-64 flex-shrink-0 bg-slate-900 border-r border-slate-800 flex flex-col h-full select-none">
      {/* Brand Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Logo className="w-8 h-8" />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-sm tracking-tight text-white">Axonwall</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                SANDBOX
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono">Port 2966 • Appliance</p>
          </div>
        </div>
      </div>

      {/* Quick Search */}
      <div className="p-3 border-b border-slate-800/60">
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search console..."
            className="w-full bg-slate-950/80 border border-slate-800 rounded-md pl-8 pr-7 py-1.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/50"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-2 top-2 text-slate-500 hover:text-slate-300"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 overflow-y-auto p-2 space-y-4 text-xs">
        {filteredGroups.map((group) => {
          const isCollapsed = !!collapsedGroups[group.id];
          return (
            <div key={group.id} className="space-y-1">
              <button
                onClick={() => toggleGroup(group.id)}
                className="w-full flex items-center justify-between px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400 hover:text-slate-200"
              >
                <span>{group.name}</span>
                {isCollapsed ? (
                  <ChevronRight className="w-3 h-3 text-slate-500" />
                ) : (
                  <ChevronDown className="w-3 h-3 text-slate-500" />
                )}
              </button>

              {!isCollapsed && (
                <div className="space-y-0.5">
                  {group.items.map((item) => {
                    const isActive = activeView === item.id;
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => onSelectView(item.id)}
                        className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg font-medium transition-all ${
                          isActive
                            ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-sm'
                            : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                          <span className="truncate">{item.name}</span>
                        </div>
                        {item.id === 'firewall' && stagedChangesCount > 0 ? (
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse">
                            +{stagedChangesCount} staged
                          </span>
                        ) : item.badge ? (
                          <span
                            className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                              isActive
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                : 'bg-slate-800 text-slate-400 border border-slate-700/60'
                            }`}
                          >
                            {item.badge}
                          </span>
                        ) : null}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer Info */}
      <div className="p-3 border-t border-slate-800 bg-slate-950/40 text-[11px] text-slate-400 space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-slate-500">Kernel Fastpath:</span>
          <span className="text-emerald-400 font-mono flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            nftables 1.1.2
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-500">Dual-Root Slot:</span>
          <span className="text-slate-300 font-mono">Slot A [axon_root_a]</span>
        </div>
      </div>
    </aside>
  );
}
