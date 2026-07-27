import api from "@/lib/axios";

export async function getHostedZones() {
  const response = await api.get("/hosted-zones");

  return response.data;
}
export async function getHostedZone(id: number) {
  const response = await api.get(`/hosted-zones/${id}`);

  return response.data;
}
