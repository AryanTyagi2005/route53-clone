"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import type { HostedZone } from "@/features/hosted-zones/types";
import { deleteHostedZone } from "@/features/hosted-zones/services/hostedZoneService";

import ConfirmationModal from "@/components/common/ConfirmationModal";
import EditHostedZoneModal from "@/features/hosted-zones/components/EditHostedZoneModal";

import { toast } from "sonner";

interface HostedZonesTableProps {
  hostedZones: HostedZone[];
  loading: boolean;
  error: string;
  refetch: () => Promise<void>;
}

export default function HostedZonesTable({
  hostedZones,
  loading,
  error,
  refetch,
}: HostedZonesTableProps) {
  const router = useRouter();

  const [selectedZone, setSelectedZone] = useState<HostedZone | null>(null);
  const [editingZone, setEditingZone] = useState<HostedZone | null>(null);
  const [deleting, setDeleting] = useState(false);

  if (loading) {
    return (
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm p-6">
        Loading hosted zones...
      </div>
    );
  }

  async function handleDelete() {
    if (!selectedZone) return;

    try {
      setDeleting(true);

      await deleteHostedZone(selectedZone.id);

      toast.success("Hosted zone deleted successfully.");

      setSelectedZone(null);

      await refetch();
    } catch (error: any) {
      console.error(error);

      const message =
        error?.response?.data?.detail ?? "Failed to delete hosted zone.";

      toast.error(message);
    } finally {
      setDeleting(false);
    }
  }

  if (error) {
    return (
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm p-6">
        {error}
      </div>
    );
  }

  return (
    <>
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr className="border-b border-gray-200">
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                Name
              </th>

              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                Description
              </th>

              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                Created
              </th>

              <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {hostedZones.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-10 text-center text-gray-500"
                >
                  No hosted zones found.
                </td>
              </tr>
            ) : (
              hostedZones.map((zone) => (
                <tr
                  key={zone.id}
                  className="border-b hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 text-sm">
                    <button
                      onClick={() => router.push(`/hosted-zones/${zone.id}`)}
                      className="font-medium text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      {zone.name}
                    </button>
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-700">
                    {zone.description || "-"}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-700">
                    {new Date(zone.created_at).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setEditingZone(zone)}
                        className="rounded-md border border-blue-500 px-3 py-1 text-sm text-blue-600 hover:bg-blue-50"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => setSelectedZone(zone)}
                        className="rounded-md border border-red-500 px-3 py-1 text-sm text-red-600 hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <ConfirmationModal
        open={selectedZone !== null}
        title="Delete Hosted Zone"
        message={
          selectedZone
            ? `Are you sure you want to delete "${selectedZone.name}"?`
            : ""
        }
        confirmText="Delete"
        loading={deleting}
        onCancel={() => setSelectedZone(null)}
        onConfirm={handleDelete}
      />

      <EditHostedZoneModal
        open={editingZone !== null}
        hostedZone={editingZone}
        onClose={() => setEditingZone(null)}
        refetch={refetch}
      />
    </>
  );
}
