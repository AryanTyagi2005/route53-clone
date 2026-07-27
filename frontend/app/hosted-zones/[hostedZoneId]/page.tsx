"use client";

import { use, useEffect, useState } from "react";
import AppShell from "@/components/layout/AppShell";
import { getHostedZone } from "@/services/hostedZoneService";
import { getDnsRecords, deleteDnsRecord } from "@/services/dnsRecordService";
import RecordsHeader from "@/features/dns-records/components/RecordsHeader";
import RecordsToolbar from "@/features/dns-records/components/RecordsToolbar";
import RecordsTable from "@/features/dns-records/components/RecordsTable";
import CreateRecordModal from "@/features/dns-records/components/CreateRecordModal";
import EditRecordModal from "@/features/dns-records/components/EditRecordModal";
import DeleteRecordModal from "@/features/dns-records/components/DeleteRecordModal";
import Breadcrumb from "@/components/Breadcrumb";

import { HostedZone, DNSRecord } from "@/features/dns-records/types";
interface HostedZoneRecordsPageProps {
  params: Promise<{
    hostedZoneId: string;
  }>;
}

export default function HostedZoneRecordsPage({
  params,
}: HostedZoneRecordsPageProps) {
  const { hostedZoneId } = use(params);

  const [hostedZone, setHostedZone] = useState<HostedZone | null>(null);
  const [records, setRecords] = useState<DNSRecord[]>([]);
  const [search, setSearch] = useState("");
  const [recordTypeFilter, setRecordTypeFilter] = useState("ALL");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<DNSRecord | null>(null);
  const [loading, setLoading] = useState(true);

  const filteredRecords = records.filter((record) => {
    const query = search.toLowerCase();

    const matchesSearch =
      record.name.toLowerCase().includes(query) ||
      record.type.toLowerCase().includes(query) ||
      record.value.toLowerCase().includes(query);

    const matchesType =
      recordTypeFilter === "ALL" || record.type === recordTypeFilter;

    return matchesSearch && matchesType;
  });
  async function fetchHostedZoneData() {
    try {
      setLoading(true);

      const zone = await getHostedZone(Number(hostedZoneId));
      setHostedZone(zone);

      const dnsRecords = await getDnsRecords(Number(hostedZoneId));
      setRecords(dnsRecords);
    } catch (error) {
      console.error("Failed to fetch hosted zone:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchHostedZoneData();
  }, [hostedZoneId]);
  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <Breadcrumb
            items={[
              {
                label: "Hosted Zones",
                href: "/hosted-zones",
              },
              {
                label: hostedZone?.name ?? "Loading...",
              },
            ]}
          />
          <RecordsHeader
            name={hostedZone?.name ?? "Loading..."}
            description={hostedZone?.description ?? "Loading hosted zone..."}
          />

          <RecordsToolbar
            search={search}
            onSearchChange={setSearch}
            recordTypeFilter={recordTypeFilter}
            onRecordTypeFilterChange={setRecordTypeFilter}
            onCreateRecord={() => {
              setIsCreateModalOpen(true);
            }}
          />

          <>
            {loading ? (
              <div className="rounded-lg border bg-white p-8 text-center text-gray-500">
                Loading DNS records...
              </div>
            ) : (
              <RecordsTable
                records={filteredRecords}
                onEdit={(record) => {
                  setSelectedRecord(record);
                  setIsEditModalOpen(true);
                }}
                onDelete={(record) => {
                  setSelectedRecord(record);
                  setIsDeleteModalOpen(true);
                }}
              />
            )}

            <CreateRecordModal
              open={isCreateModalOpen}
              hostedZoneId={Number(hostedZoneId)}
              onClose={() => setIsCreateModalOpen(false)}
              onRecordCreated={fetchHostedZoneData}
            />
            <EditRecordModal
              open={isEditModalOpen}
              hostedZoneId={Number(hostedZoneId)}
              record={selectedRecord}
              onClose={() => {
                setIsEditModalOpen(false);
                setSelectedRecord(null);
              }}
              onRecordUpdated={fetchHostedZoneData}
            />
            <DeleteRecordModal
              open={isDeleteModalOpen}
              record={selectedRecord}
              onClose={() => {
                setIsDeleteModalOpen(false);
                setSelectedRecord(null);
              }}
              onConfirm={async () => {
                if (!selectedRecord) return;

                try {
                  await deleteDnsRecord(
                    Number(hostedZoneId),
                    selectedRecord.id
                  );

                  await fetchHostedZoneData();

                  setIsDeleteModalOpen(false);
                  setSelectedRecord(null);
                } catch (error) {
                  console.error(error);
                }
              }}
            />
          </>
        </div>
      </div>
    </AppShell>
  );
}
