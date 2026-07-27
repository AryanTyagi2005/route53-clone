import api from "@/lib/axios";

export async function getDnsRecords(hostedZoneId: number) {
  const response = await api.get(`/hosted-zones/${hostedZoneId}/records`);
  return response.data;
}

export async function createDnsRecord(
  hostedZoneId: number,
  data: {
    name: string;
    type: string;
    value: string;
    ttl: number;
  }
) {
  const response = await api.post(
    `/hosted-zones/${hostedZoneId}/records`,
    data
  );

  return response.data;
}

export async function updateDnsRecord(
  hostedZoneId: number,
  recordId: number,
  data: {
    name: string;
    type: string;
    value: string;
    ttl: number;
  }
) {
  const response = await api.put(
    `/hosted-zones/${hostedZoneId}/records/${recordId}`,
    data
  );

  return response.data;
}

export async function deleteDnsRecord(hostedZoneId: number, recordId: number) {
  await api.delete(`/hosted-zones/${hostedZoneId}/records/${recordId}`);
}
