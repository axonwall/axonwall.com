'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Shield, Menu, X, ExternalLink, Github, ArrowLeft } from 'lucide-react';
import { DocsSidebar } from './components/DocsSidebar';

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#080c14] text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-black">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-[#080c14]/90 border-b border-slate-800/80 h-16 shrink-0 flex items-center px-4 sm:px-8 justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            aria-label="Toggle Navigation Menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/10 group-hover:border-emerald-500/50 transition">
              <Shield className="w-5 h-5" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-bold text-lg text-white tracking-tight">Axonwall</span>
              <span className="text-xs font-semibold text-emerald-400 font-mono uppercase px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                Docs
              </span>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-4 text-xs font-medium">
          <Link
            href="/"
            className="hidden sm:flex items-center gap-1.5 text-slate-400 hover:text-white transition px-2.5 py-1.5 rounded-lg hover:bg-slate-800/50"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </Link>
          <Link
            href="/architecture"
            className="hidden sm:inline-block text-slate-400 hover:text-white transition px-2.5 py-1.5 rounded-lg hover:bg-slate-800/50"
          >
            Architecture
          </Link>
          <a
            href="https://github.com/axonwall/axonwall_monorepo"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-slate-400 hover:text-white transition px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700"
          >
            <Github className="w-4 h-4" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Desktop Sidebar */}
        <div className="hidden md:block w-72 shrink-0 sticky top-16 h-[calc(100vh-4rem)]">
          <DocsSidebar />
        </div>

        {/* Mobile Sidebar Drawer */}
        {mobileOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex">
            <div
              className="fixed inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <div className="relative z-10 w-4/5 max-w-sm h-full bg-[#080c14] border-r border-slate-800 shadow-2xl flex flex-col">
              <div className="flex items-center justify-between p-4 border-b border-slate-800">
                <span className="font-bold text-sm text-white">Documentation Menu</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-1.5 rounded text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 overflow-hidden">
                <DocsSidebar onClose={() => setMobileOpen(false)} />
              </div>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 px-6 sm:px-10 lg:px-12 py-10 max-w-4xl">
          {children}
        </main>
      </div>
    </div>
  );
}
