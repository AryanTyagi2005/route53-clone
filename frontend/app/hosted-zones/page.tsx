"use client";

import AppShell from "@/components/layout/AppShell";
import HostedZonesHeader from "@/components/hosted-zones/HostedZonesHeader";
import HostedZonesToolbar from "@/components/hosted-zones/HostedZonesToolbar";
import HostedZonesTable from "@/components/hosted-zones/HostedZonesTable";

import { useHostedZones } from "@/features/hosted-zones/hooks/useHostedZones";
import { useMemo, useState } from "react";

export default function HostedZonesPage() {
  const { hostedZones, loading, error, refetch } = useHostedZones();
  const [searchTerm, setSearchTerm] = useState("");
  const filteredHostedZones = useMemo(() => {
    const search = searchTerm.toLowerCase().trim();

    if (!search) {
      return hostedZones;
    }

    return hostedZones.filter((zone) => {
      return (
        zone.name.toLowerCase().includes(search) ||
        (zone.description ?? "").toLowerCase().includes(search)
      );
    });
  }, [hostedZones, searchTerm]);

  return (
    <AppShell>
      <HostedZonesHeader />

      <HostedZonesToolbar
        refetch={refetch}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <HostedZonesTable
        hostedZones={filteredHostedZones}
        loading={loading}
        error={error}
        refetch={refetch}
      />
    </AppShell>
  );
}
