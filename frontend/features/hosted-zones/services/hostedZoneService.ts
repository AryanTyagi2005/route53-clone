import api from "@/lib/axios";
import type { HostedZone } from "../types.ts";

export interface CreateHostedZoneRequest {
  name: string;
  description: string;
}

export async function getHostedZones(): Promise<HostedZone[]> {
  const response = await api.get("/hosted-zones");
  return response.data;
}

export async function createHostedZone(
  data: CreateHostedZoneRequest
): Promise<HostedZone> {
  const response = await api.post("/hosted-zones", data);
  return response.data;
}
export async function deleteHostedZone(hostedZoneId: number): Promise<void> {
  await api.delete(`/hosted-zones/${hostedZoneId}`);
}
export async function updateHostedZone(
  hostedZoneId: number,
  data: CreateHostedZoneRequest
): Promise<HostedZone> {
  const response = await api.put(`/hosted-zones/${hostedZoneId}`, data);

  return response.data;
}
