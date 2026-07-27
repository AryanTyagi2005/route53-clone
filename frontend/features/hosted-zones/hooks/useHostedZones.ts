"use client";

import { useEffect, useState } from "react";
import { getHostedZones } from "../services/hostedZoneService";
import type { HostedZone } from "../types.ts";

export function useHostedZones() {
  const [hostedZones, setHostedZones] = useState<HostedZone[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchHostedZones() {
    try {
      setLoading(true);

      const data = await getHostedZones();

      setHostedZones(data);
      setError("");
    } catch {
      setError("Failed to load hosted zones.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchHostedZones();
  }, []);

  return {
    hostedZones,
    loading,
    error,
    refetch: fetchHostedZones,
  };
}
