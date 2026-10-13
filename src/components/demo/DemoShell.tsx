'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { DemoSidebar } from './DemoSidebar';
import { DemoHeader } from './DemoHeader';
import {
  INITIAL_FIREWALL_RULES,
  INITIAL_SERVICES,
  DemoFirewallRule,
  DemoServiceStatus,
  DemoViewKey,
} from './demoState';

// Individual Views
import { LobbyView } from './views/LobbyView';
import { FirewallView } from './views/FirewallView';
import { ThreatDefenseView } from './views/ThreatDefenseView';
import { InterfacesView } from './views/InterfacesView';
import { VpnView } from './views/VpnView';
import { FleetView } from './views/FleetView';
import { DiagnosticsView } from './views/DiagnosticsView';
import { TerminalView } from './views/TerminalView';
import { SystemView } from './views/SystemView';
import { AiCopilotView } from './views/AiCopilotView';

export function DemoShell() {
  const searchParams = useSearchParams();
  const initialView = (searchParams.get('view') as DemoViewKey) || 'lobby';

  const [activeView, setActiveView] = useState<DemoViewKey>(initialView);
  const [rules, setRules] = useState<DemoFirewallRule[]>(INITIAL_FIREWALL_RULES);
  const [services] = useState<DemoServiceStatus[]>(INITIAL_SERVICES);
  const [stagedCount, setStagedCount] = useState<number>(0);

  // Commit-Confirm Timer State
  const [isConfirmPending, setIsConfirmPending] = useState(false);
  const [confirmCountdown, setConfirmCountdown] = useState(60);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Synchronize active view with URL without reload
  const handleSelectView = (view: DemoViewKey) => {
    setActiveView(view);
    const url = new URL(window.location.href);
    url.searchParams.set('view', view);
    window.history.pushState({}, '', url.toString());
  };

  // Rule operations
  const handleToggleRule = (id: string) => {
    setRules((prev) =>
      prev.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r))
    );
    setStagedCount((prev) => prev + 1);
    showToast('Rule toggled. Change staged in test buffer.');
  };

  const handleAddRule = (newRuleData: Omit<DemoFirewallRule, 'id' | 'packets' | 'bytes'>) => {
    const newRule: DemoFirewallRule = {
      ...newRuleData,
      id: `rule-${Date.now()}`,
      packets: 0,
      bytes: '0 B',
    };
    setRules((prev) => [newRule, ...prev]);
    setStagedCount((prev) => prev + 1);
    showToast('New policy rule staged.');
  };

  const handleDeleteRule = (id: string) => {
    setRules((prev) => prev.filter((r) => r.id !== id));
    setStagedCount((prev) => prev + 1);
    showToast('Rule removed. Change staged.');
  };

  // Commit-Confirm actions
  const handleApplyChanges = () => {
    setIsConfirmPending(true);
    setConfirmCountdown(60);
    setStagedCount(0);
    showToast('Changes applied! 60-second commit-confirm countdown started.');
  };

  const handleConfirmChanges = () => {
    setIsConfirmPending(false);
    showToast('Configuration confirmed permanently to kernel flash!');
  };

  const handleRollbackChanges = () => {
    setIsConfirmPending(false);
    setRules(INITIAL_FIREWALL_RULES);
    setStagedCount(0);
    showToast('Rollback executed: Reverted to previous verified ruleset.');
  };

  const handleResetSandbox = () => {
    setRules(INITIAL_FIREWALL_RULES);
    setStagedCount(0);
    setIsConfirmPending(false);
    showToast('Sandbox reset to factory default configuration.');
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Commit-Confirm Countdown Interval
  useEffect(() => {
    if (!isConfirmPending) return;
    const interval = setInterval(() => {
      setConfirmCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleRollbackChanges();
          return 60;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isConfirmPending]);

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-950 text-slate-100 font-sans select-none">
      {/* Discreet Sandbox Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 border-b border-emerald-500/20 px-4 py-1.5 flex items-center justify-between text-[11px] text-slate-300">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-semibold text-emerald-300">LIVE INTERACTIVE SANDBOX</span>
          <span className="text-slate-500">•</span>
          <span className="hidden sm:inline">Simulated Axonwall Appliance</span>
          <span className="text-slate-500 hidden sm:inline">•</span>
          <span className="font-mono text-slate-400">Web Console Port 2966</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-slate-400 hidden md:inline">All changes run locally in your browser memory</span>
        </div>
      </div>

      {/* Main Console Container */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <DemoSidebar
          activeView={activeView}
          onSelectView={handleSelectView}
          stagedChangesCount={stagedCount}
        />

        {/* Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Header */}
          <DemoHeader
            stagedCount={stagedCount}
            isConfirmPending={isConfirmPending}
            confirmCountdown={confirmCountdown}
            onApplyChanges={handleApplyChanges}
            onConfirmChanges={handleConfirmChanges}
            onRollbackChanges={handleRollbackChanges}
            onResetSandbox={handleResetSandbox}
          />

          {/* Main Active View */}
          <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
            {activeView === 'lobby' && <LobbyView services={services} onSelectView={handleSelectView} />}
            {activeView === 'firewall' && (
              <FirewallView
                rules={rules}
                stagedCount={stagedCount}
                onToggleRule={handleToggleRule}
                onAddRule={handleAddRule}
                onDeleteRule={handleDeleteRule}
                onApplyChanges={handleApplyChanges}
              />
            )}
            {activeView === 'threats' && <ThreatDefenseView />}
            {activeView === 'interfaces' && <InterfacesView />}
            {activeView === 'routing' && <InterfacesView />}
            {activeView === 'vpn' && <VpnView />}
            {activeView === 'fleet' && <FleetView />}
            {activeView === 'diagnostics' && <DiagnosticsView />}
            {activeView === 'terminal' && <TerminalView />}
            {activeView === 'system' && <SystemView />}
            {activeView === 'ai' && <AiCopilotView />}
          </main>
        </div>
      </div>

      {/* Toast Feedback Notification */}
      {toastMessage && (
        <div className="fixed bottom-4 right-4 z-50 bg-slate-900 border border-emerald-500/40 text-emerald-300 px-4 py-2.5 rounded-xl shadow-2xl text-xs flex items-center gap-2 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
