import React, { Suspense } from 'react';
import { DemoShell } from '../../components/demo/DemoShell';

export const metadata = {
  title: 'Live Interactive Web Console Demo (v0.11.68) | Axonwall',
  description:
    'Experience the Axonwall v0.11.68 Next-Gen Linux Firewall Web Console directly in your browser. Test nftables rule staging, 60s commit-confirm, Custom Kernel Studio, Multi-WAN & BGP routing, Rosenpass PQ-KEM, CO-RE BPF-LSM guard, and Etckeeper Git.',
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
