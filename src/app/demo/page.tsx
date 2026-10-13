import React, { Suspense } from 'react';
import { DemoShell } from '../../components/demo/DemoShell';

export const metadata = {
  title: 'Live Interactive Web Console Demo | Axonwall',
  description:
    'Experience the Axonwall Next-Gen Linux Firewall Web Console directly in your browser. Test rule staging, commit-confirm timers, WireGuard mesh, and threat defense.',
};

export default function DemoPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-screen items-center justify-center bg-slate-950 text-slate-400 font-mono text-xs">
          Loading Axonwall Sandbox...
        </div>
      }
    >
      <DemoShell />
    </Suspense>
  );
}
