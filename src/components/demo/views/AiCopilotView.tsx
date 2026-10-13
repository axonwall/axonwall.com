'use client';

import React, { useState } from 'react';
import { Sparkles, Send, Bot, User, CornerDownLeft, ShieldCheck, Zap } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'user',
    text: 'Explain why port 2966 is used for the management interface and how the anti-lockout rule protects it.',
    timestamp: '11:42 AM',
  },
  {
    id: 'msg-2',
    sender: 'ai',
    text: `Axonwall utilizes **Port 2966** (which spells **\`AXON\`** on telephone keypad buttons \`2-9-6-6\`) as its dedicated default management port for both the Web Console and Controller Fleet Manager.

### Key Architectural Benefits:
1. **Collision-Free Port**: Unlike \`8443\` or \`8080\` which frequently conflict with Docker containers, microservices, or local dev tools, \`2966\` is dedicated and unmistakable.
2. **Anti-Lockout Protection**: In \`nftables\`, rule \`rule-01\` explicitly matches:
\`\`\`nftables
tcp dport { 22, 80, 443, 2966 } accept comment "emergency-anti-lockout"
\`\`\`
3. **60-Second Rollback Safety**: Any changes made to firewall rules or interface bindings trigger a 60-second commit-confirm countdown. If connectivity to port 2966 is interrupted, the kernel automatically restores the previous working state without locking you out!`,
    timestamp: '11:42 AM',
  },
];

export function AiCopilotView() {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (textToSend?: string) => {
    const q = textToSend || input;
    if (!q.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: q.trim(),
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      let reply = '';
      const lower = q.toLowerCase();

      if (lower.includes('iot') || lower.includes('isolate')) {
        reply = `To isolate your **IoT VLAN** from your trusted corporate network:
1. Ensure your IoT devices are assigned to a distinct subnet (e.g. \`192.168.100.150 - 192.168.100.200\` or VLAN 30).
2. Create an in-chain drop policy before your general pass rules:
\`\`\`nftables
iifname "vlan30" ip daddr 192.168.100.0/24 counter drop comment "Isolate IoT from LAN"
iifname "vlan30" oifname "wan" counter accept comment "Permit IoT Internet Egress"
\`\`\`
This blocks IoT cameras and smart bulbs from probing your workstations or NAS, while still allowing them cloud access for firmware updates.`;
      } else if (lower.includes('commit') || lower.includes('confirm') || lower.includes('timer')) {
        reply = `The **60-Second Commit-Confirm Safety Mechanism** protects network engineers against accidental lockout:
- Whenever you modify firewall rules, interfaces, or IP routing in the console, Axonwall applies the change in **test mode** and starts a 60-second hardware watchdog.
- If you can still reach the Web Console on port **2966**, you click **"Confirm Changes"**, committing the configuration permanently to disk.
- If connectivity is lost (or the timer expires without confirmation), the \`axonwalld\` daemon automatically rolls back to the previous verified configuration bundle!`;
      } else if (lower.includes('flowtable') || lower.includes('fastpath') || lower.includes('offload')) {
        reply = `**Flowtable Hardware Offload** enables Axonwall to achieve 10Gbps+ line-rate forwarding with negligible CPU load:
- Standard Linux packet processing passes every packet through the full Netfilter traversal stack.
- Once a bidirectional connection is established (e.g. TCP handshake complete), Axonwall offloads that connection's tuple into the kernel **flowtable fastpath**.
- Subsequent packets bypass layer 3/4 filtering routines and are directly forwarded by the network driver, slashing latency to microseconds!`;
      } else if (lower.includes('ssh') || lower.includes('rate-limit') || lower.includes('rate limit')) {
        reply = `Here is a production-grade **nftables rate-limiting snippet** for port 22 (SSH):
\`\`\`nftables
# Limit new SSH connection attempts to 3 per minute per source IP
tcp dport 22 ct state new meter ssh-meter { ip saddr limit rate over 3/minute } drop
tcp dport 22 ct state new counter accept comment "Accept SSH within rate limit"
\`\`\`
This defeats automated brute-force scripts before they can stress system authentication services.`;
      } else {
        reply = `I have analyzed your request regarding **"${q}"** against the Axonwall 2026.4 security policy engine. All configuration rules compile to native \`nftables\` data plane tables on port **2966**, maintaining zero-downtime reliability and enterprise A/B partition integrity.`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: reply,
          timestamp: 'Just now',
        },
      ]);
    }, 700);
  };

  return (
    <div className="space-y-4 max-w-4xl mx-auto flex flex-col h-[calc(100vh-140px)]">
      {/* Header */}
      <div className="flex-shrink-0">
        <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-emerald-400" />
          <span>Axonwall AI Security Copilot</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Intelligent network assistant for policy auditing, threat analysis, and nftables syntax generation.
        </p>
      </div>

      {/* Suggestion Chips */}
      <div className="flex flex-wrap gap-2 text-xs flex-shrink-0">
        {[
          'How do I isolate my IoT VLAN?',
          'Explain the 60-second Commit-Confirm timer',
          'What is nftables Flowtable fastpath offload?',
          'Rate-limit SSH brute-force attempts',
        ].map((q) => (
          <button
            key={q}
            onClick={() => handleSend(q)}
            className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/40 text-slate-300 hover:text-white transition-colors"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Chat Messages Log */}
      <div className="flex-1 bg-slate-900 border border-slate-800 rounded-xl p-4 overflow-y-auto space-y-4 text-xs">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex items-start gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {m.sender === 'ai' && (
              <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 flex-shrink-0 mt-0.5">
                <Bot className="w-4 h-4" />
              </div>
            )}

            <div
              className={`max-w-2xl rounded-xl p-3.5 space-y-2 leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-emerald-600 text-white font-medium ml-12'
                  : 'bg-slate-950 border border-slate-800 text-slate-200 mr-12'
              }`}
            >
              <div className="whitespace-pre-wrap font-sans">{m.text}</div>
              <div
                className={`text-[10px] ${
                  m.sender === 'user' ? 'text-emerald-200 text-right' : 'text-slate-500'
                }`}
              >
                {m.timestamp}
              </div>
            </div>

            {m.sender === 'user' && (
              <div className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 flex-shrink-0 mt-0.5">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-slate-400 text-xs italic">
            <Bot className="w-4 h-4 text-emerald-400 animate-spin" />
            <span>AI Copilot is formulating answer...</span>
          </div>
        )}
      </div>

      {/* Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-xl p-2 flex-shrink-0"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask AI Copilot about firewall policies, port 2966, VPN routing, or threat mitigation..."
          className="flex-1 bg-transparent px-3 py-1.5 text-xs text-white placeholder:text-slate-500 focus:outline-none"
        />
        <button
          type="submit"
          className="p-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
