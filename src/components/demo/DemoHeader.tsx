'use client';

import React from 'react';
import Link from 'next/link';
import { ThemeSwitcher } from '../ThemeSwitcher';
import {
  ShieldCheck,
  Cpu,
  Activity,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  ExternalLink,
  UserCheck,
} from 'lucide-react';

interface DemoHeaderProps {
  stagedCount: number;
  isConfirmPending: boolean;
  confirmCountdown: number;
  onApplyChanges: () => void;
  onConfirmChanges: () => void;
  onRollbackChanges: () => void;
  onResetSandbox: () => void;
}

export function DemoHeader({
  stagedCount,
  isConfirmPending,
  confirmCountdown,
  onApplyChanges,
  onConfirmChanges,
  onRollbackChanges,
  onResetSandbox,
}: DemoHeaderProps) {
  return (
    <header className="h-14 border-b border-slate-800 bg-slate-900/90 backdrop-blur px-4 flex items-center justify-between gap-4 z-20">
      {/* Left: Appliance Info & Hostname */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-slate-950/80 border border-slate-800 text-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono font-semibold text-slate-200">axonwall-core</span>
          <span className="text-slate-500 font-mono">|</span>
          <span className="font-mono text-emerald-400">port 2966</span>
        </div>

        {/* Live System Pills */}
        <div className="hidden lg:flex items-center gap-2 text-[11px] font-mono text-slate-400">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-800/60 border border-slate-700/50">
            <Cpu className="w-3 h-3 text-cyan-400" />
            <span>CPU 14%</span>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-800/60 border border-slate-700/50">
            <Activity className="w-3 h-3 text-emerald-400" />
            <span>RAM 2.1 / 16 GB</span>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-800/60 border border-slate-700/50">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            <span>Fastpath: 2.4M States</span>
          </div>
        </div>
      </div>

      {/* Center: Commit-Confirm Warning or Staged Alert */}
      <div className="flex-1 flex justify-center">
        {isConfirmPending ? (
          <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs animate-pulse">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span className="font-medium">
              Commit-Confirm Active: <strong>{confirmCountdown}s</strong> remaining before rollback
            </span>
            <div className="flex items-center gap-1 ml-2">
              <button
                onClick={onConfirmChanges}
                className="px-2 py-0.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-[11px] flex items-center gap-1"
              >
                <CheckCircle2 className="w-3 h-3" /> Confirm
              </button>
              <button
                onClick={onRollbackChanges}
                className="px-2 py-0.5 rounded bg-red-600 hover:bg-red-500 text-white font-semibold text-[11px] flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" /> Rollback
              </button>
            </div>
          </div>
        ) : stagedCount > 0 ? (
          <button
            onClick={onApplyChanges}
            className="flex items-center gap-2 px-3 py-1 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 text-xs transition-colors"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            <span>{stagedCount} unsaved rule change{stagedCount > 1 ? 's' : ''} staged</span>
            <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-[10px] font-bold uppercase tracking-wider">
              Apply (60s timer) &rarr;
            </span>
          </button>
        ) : null}
      </div>

      {/* Right Actions: Sandbox Reset, Theme Switcher, Return to Site */}
      <div className="flex items-center gap-2.5">
        <button
          onClick={onResetSandbox}
          title="Reset sandbox to factory defaults"
          className="text-xs text-slate-400 hover:text-slate-200 px-2 py-1 rounded hover:bg-slate-800 transition-colors flex items-center gap-1"
        >
          <RotateCcw className="w-3 h-3" />
          <span className="hidden sm:inline">Reset Sandbox</span>
        </button>

        <ThemeSwitcher />

        {/* User Pill */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700/60 text-xs text-slate-200">
          <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span className="font-medium hidden sm:inline">admin</span>
          <span className="text-[10px] text-slate-400 hidden md:inline">(Superadmin)</span>
        </div>

        <Link
          href="/"
          className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-md bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-medium transition-colors"
        >
          <span>Exit Demo</span>
          <ExternalLink className="w-3 h-3" />
        </Link>
      </div>
    </header>
  );
}
