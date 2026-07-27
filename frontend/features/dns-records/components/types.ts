export interface HostedZone {
  id: number;
  name: string;
  description: string;
  created_at: string;
}

export interface DNSRecord {
  id: number;
  hosted_zone_id: number;
  name: string;
  type: string;
  value: string;
  ttl: number;
  created_at: string;
}