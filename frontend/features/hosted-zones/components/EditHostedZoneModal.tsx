"use client";

import { useEffect, useState } from "react";
import CreateHostedZoneForm from "./CreateHostedZoneForm";
import {
  createHostedZone,
  updateHostedZone,
} from "../services/hostedZoneService";
import type { HostedZone } from "../types";
import { toast } from "sonner";

interface Props {
  open: boolean;
  hostedZone: HostedZone | null;
  onClose: () => void;
  refetch: () => Promise<void>;
}

type FormData = {
  name: string;
  description: string;
};

export default function EditHostedZoneModal({
  open,
  hostedZone,
  onClose,
  refetch,
}: Props) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && !loading) {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, loading, onClose]);

  if (!open) return null;

  async function handleSubmit(data: FormData) {
    if (!hostedZone) {
      return;
    }

    try {
      setLoading(true);

      await updateHostedZone(hostedZone.id, data);

      await refetch();

      toast.success("Hosted zone updated successfully.");

      onClose();
    } catch (error: any) {
      console.error(error);

      const message =
        error?.response?.data?.detail ?? "Failed to update hosted zone.";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={() => {
        if (!loading) {
          onClose();
        }
      }}
    >
      <div
        className="w-full max-w-lg rounded-lg bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-6 text-xl font-semibold">Edit Hosted Zone</h2>

        <CreateHostedZoneForm
          loading={loading}
          onSubmit={handleSubmit}
          onCancel={onClose}
          defaultValues={{
            name: hostedZone?.name ?? "",
            description: hostedZone?.description ?? "",
          }}
          submitButtonText="Save Changes"
        />
      </div>
    </div>
  );
}
