/**
 * Axonwall Web Console Demo State & Mock Dataset
 * Runs purely client-side in the browser for static site deployment.
 */

export type DemoViewKey =
  | 'lobby'
  | 'firewall'
  | 'threats'
  | 'interfaces'
  | 'routing'
  | 'vpn'
  | 'fleet'
  | 'diagnostics'
  | 'terminal'
  | 'system'
  | 'ai';

export interface DemoFirewallRule {
  id: string;
  action: 'pass' | 'block' | 'reject';
  interface: 'all' | 'wan' | 'lan' | 'dmz' | 'wg0';
  protocol: 'tcp' | 'udp' | 'icmp' | 'any';
  source: string;
  destination: string;
  destinationPort: string;
  description: string;
  enabled: boolean;
  packets: number;
  bytes: string;
}

export interface DemoSatelliteNode {
  id: string;
  name: string;
  region: string;
  ip: string;
  status: 'online' | 'degraded' | 'offline';
  latencyMs: number;
  lastHeartbeatSec: number;
  policyVersion: number;
  cpuPercent: number;
  memoryPercent: number;
  activeTunnels: number;
}

export interface DemoWireGuardPeer {
  id: string;
  name: string;
  publicKey: string;
  allowedIps: string;
  endpoint: string;
  lastHandshake: string;
  txBytes: string;
  rxBytes: string;
  status: 'connected' | 'idle';
}

export interface DemoCrowdSecAlert {
  id: string;
  ip: string;
  country: string;
  reason: string;
  action: 'ban' | 'captcha';
  duration: string;
  timestamp: string;
}

export interface DemoServiceStatus {
  name: string;
  unit: string;
  description: string;
  status: 'active' | 'inactive' | 'failed';
  memory: string;
  uptime: string;
}

export const INITIAL_FIREWALL_RULES: DemoFirewallRule[] = [
  {
    id: 'rule-01',
    action: 'pass',
    interface: 'lan',
    protocol: 'tcp',
    source: 'LAN Subnet',
    destination: 'Appliance LAN IP',
    destinationPort: '22, 80, 443, 2966',
    description: 'Anti-Lockout Rule: Web Management Console & SSH',
    enabled: true,
    packets: 41290,
    bytes: '38.4 MB',
  },
  {
    id: 'rule-02',
    action: 'block',
    interface: 'wan',
    protocol: 'any',
    source: '@threat_feed_ips',
    destination: 'WAN Address',
    destinationPort: 'any',
    description: 'Line-Rate Drop: Active Threat Intelligence & Tor Exit Nodes',
    enabled: true,
    packets: 198420,
    bytes: '124.9 MB',
  },
  {
    id: 'rule-03',
    action: 'pass',
    interface: 'wan',
    protocol: 'udp',
    source: 'any',
    destination: 'WAN Address',
    destinationPort: '51820',
    description: 'WireGuard VPN Gateway Ingress',
    enabled: true,
    packets: 843100,
    bytes: '891.2 MB',
  },
  {
    id: 'rule-04',
    action: 'pass',
    interface: 'lan',
    protocol: 'any',
    source: 'LAN Subnet',
    destination: 'any',
    destinationPort: 'any',
    description: 'Default LAN to Internet Outbound Gateway',
    enabled: true,
    packets: 4912000,
    bytes: '4.8 GB',
  },
  {
    id: 'rule-05',
    action: 'block',
    interface: 'lan',
    protocol: 'any',
    source: '192.168.100.150 - 192.168.100.200 (IoT)',
    destination: 'LAN Subnet',
    destinationPort: 'any',
    description: 'Isolate IoT VLAN from Trusted Corporate LAN',
    enabled: true,
    packets: 14210,
    bytes: '4.2 MB',
  },
  {
    id: 'rule-06',
    action: 'pass',
    interface: 'dmz',
    protocol: 'tcp',
    source: 'any',
    destination: '10.0.50.10',
    destinationPort: '443',
    description: 'DMZ Reverse Proxy Inbound HTTPS',
    enabled: true,
    packets: 62410,
    bytes: '48.9 MB',
  },
];

export const INITIAL_SERVICES: DemoServiceStatus[] = [
  { name: 'nftables', unit: 'nftables.service', description: 'Kernel Fastpath Packet Engine', status: 'active', memory: '14.2 MB', uptime: '14d 6h' },
  { name: 'Unbound DNS', unit: 'unbound.service', description: 'Validating DNSSEC Resolver & Sinkhole', status: 'active', memory: '38.5 MB', uptime: '14d 6h' },
  { name: 'Kea DHCP4', unit: 'kea-dhcp4.service', description: 'High-Performance Kea DHCPv4 Server', status: 'active', memory: '18.1 MB', uptime: '14d 6h' },
  { name: 'WireGuard', unit: 'wg-quick@wg0.service', description: 'In-Kernel Cryptographic VPN Engine', status: 'active', memory: '6.4 MB', uptime: '14d 6h' },
  { name: 'Suricata IDS/IPS', unit: 'suricata.service', description: 'Next-Gen Intrusion Prevention Engine', status: 'active', memory: '412.0 MB', uptime: '14d 6h' },
  { name: 'Headscale', unit: 'headscale.service', description: 'Self-Hosted Zero-Trust Tailscale Hub', status: 'active', memory: '48.6 MB', uptime: '14d 6h' },
  { name: 'CrowdSec', unit: 'crowdsec.service', description: 'Collaborative Intrusion Detection Bouncer', status: 'active', memory: '64.2 MB', uptime: '14d 6h' },
  { name: 'Axonwalld', unit: 'axonwalld.service', description: 'Appliance Daemon & Port 2966 REST Core', status: 'active', memory: '28.9 MB', uptime: '14d 6h' },
];

export const INITIAL_SATELLITES: DemoSatelliteNode[] = [
  {
    id: 'sat-austin-01',
    name: 'Edge-Austin-HQ',
    region: 'North America (US-Central)',
    ip: '198.51.100.84',
    status: 'online',
    latencyMs: 12,
    lastHeartbeatSec: 3,
    policyVersion: 24,
    cpuPercent: 18,
    memoryPercent: 34,
    activeTunnels: 14,
  },
  {
    id: 'sat-london-02',
    name: 'Edge-London-Branch',
    region: 'Europe (UK-South)',
    ip: '203.0.113.45',
    status: 'online',
    latencyMs: 38,
    lastHeartbeatSec: 5,
    policyVersion: 24,
    cpuPercent: 24,
    memoryPercent: 41,
    activeTunnels: 8,
  },
  {
    id: 'sat-tokyo-03',
    name: 'Edge-Tokyo-PoP',
    region: 'Asia Pacific (JP-East)',
    ip: '198.51.100.198',
    status: 'online',
    latencyMs: 94,
    lastHeartbeatSec: 4,
    policyVersion: 24,
    cpuPercent: 31,
    memoryPercent: 52,
    activeTunnels: 19,
  },
  {
    id: 'sat-frankfurt-04',
    name: 'Edge-Frankfurt-DC',
    region: 'Europe (EU-Central)',
    ip: '203.0.113.112',
    status: 'online',
    latencyMs: 42,
    lastHeartbeatSec: 2,
    policyVersion: 24,
    cpuPercent: 15,
    memoryPercent: 29,
    activeTunnels: 12,
  },
];

export const INITIAL_WIREGUARD_PEERS: DemoWireGuardPeer[] = [
  {
    id: 'peer-1',
    name: 'Admin-MacBook-Pro',
    publicKey: 'aBc12...9xYz=',
    allowedIps: '10.10.0.2/32',
    endpoint: '72.14.201.14:51820',
    lastHandshake: '14 seconds ago',
    txBytes: '412.5 MB',
    rxBytes: '1.2 GB',
    status: 'connected',
  },
  {
    id: 'peer-2',
    name: 'SecOps-ThinkPad-Linux',
    publicKey: 'xY98a...3jKm=',
    allowedIps: '10.10.0.3/32',
    endpoint: '98.137.11.4:51820',
    lastHandshake: '1 minute ago',
    txBytes: '128.4 MB',
    rxBytes: '342.1 MB',
    status: 'connected',
  },
  {
    id: 'peer-3',
    name: 'Mobile-iPhone-Field',
    publicKey: 'kL33p...0wEr=',
    allowedIps: '10.10.0.4/32',
    endpoint: '172.56.21.90:51820',
    lastHandshake: '8 minutes ago',
    txBytes: '42.1 MB',
    rxBytes: '98.7 MB',
    status: 'idle',
  },
];

export const INITIAL_CROWDSEC_ALERTS: DemoCrowdSecAlert[] = [
  { id: 'cs-1', ip: '185.220.101.4', country: 'DE (Tor Exit)', reason: 'ssh-bf / brute-force authentication spray', action: 'ban', duration: '4h remaining', timestamp: '2 mins ago' },
  { id: 'cs-2', ip: '194.26.29.112', country: 'RU', reason: 'http-probing / path traversal scanning', action: 'ban', duration: '22h remaining', timestamp: '14 mins ago' },
  { id: 'cs-3', ip: '45.154.255.89', country: 'NL', reason: 'port-scan / SYN stealth reconnaissance', action: 'ban', duration: '3h remaining', timestamp: '31 mins ago' },
  { id: 'cs-4', ip: '193.32.162.77', country: 'UA', reason: 'cve-2024-3400 exploit signature probe', action: 'ban', duration: '18h remaining', timestamp: '1 hour ago' },
];
