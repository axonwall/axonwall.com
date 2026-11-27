import React, { Suspense } from 'react';
import { DemoShell } from '../../components/demo/DemoShell';
import { RELEASE_TAG } from '@/lib/release';

export const metadata = {
  title: `Live Interactive Web Console Demo (${RELEASE_TAG}) | Axonwall`,
  description:
    `Experience the Axonwall ${RELEASE_TAG} Next-Gen Linux Firewall Web Console directly in your browser. Test nftables rule staging, 60s commit-confirm, 47-plugin store & starter packs, Custom Kernel Studio, Multi-WAN & BGP routing, Rosenpass PQ-KEM, CO-RE BPF-LSM guard, Btrfs/ZBM rollbacks, Browser K9s, and Etckeeper Git.`,
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
