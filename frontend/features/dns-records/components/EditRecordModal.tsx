"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createRecordSchema,
  CreateRecordFormData,
} from "./recordSchema";
import { DNSRecord } from "../types";
import { updateDnsRecord } from "@/services/dnsRecordService";
import { toast } from "sonner";

interface EditRecordModalProps {
  open: boolean;
  hostedZoneId: number;
  record: DNSRecord | null;
  onClose: () => void;
  onRecordUpdated: () => Promise<void>;
}

export default function EditRecordModal({
  open,
  hostedZoneId,
  record,
  onClose,
  onRecordUpdated,
}: EditRecordModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateRecordFormData>({
    resolver: zodResolver(createRecordSchema),
  });

  useEffect(() => {
    if (record) {
      reset({
        name: record.name,
        type: record.type as CreateRecordFormData["type"],
        value: record.value,
        ttl: record.ttl,
      });
    }
  }, [record, reset]);

  const onSubmit = async (data: CreateRecordFormData) => {
    if (!record) return;

    try {
      await updateDnsRecord(hostedZoneId, record.id, data);

      toast.success("DNS record updated successfully.");

      await onRecordUpdated();

      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update DNS record.");
    }
  };

  if (!open || !record) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-xl">
        <h2 className="mb-6 text-xl font-semibold">
          Edit Record
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <input
            {...register("name")}
            className="w-full rounded border px-3 py-2"
          />

          <select
            {...register("type")}
            className="w-full rounded border px-3 py-2"
          >
            <option>A</option>
            <option>AAAA</option>
            <option>CNAME</option>
            <option>TXT</option>
            <option>MX</option>
            <option>NS</option>
            <option>PTR</option>
            <option>SRV</option>
            <option>CAA</option>
          </select>

          <input
            {...register("value")}
            className="w-full rounded border px-3 py-2"
          />

          <input
            type="number"
            {...register("ttl")}
            className="w-full rounded border px-3 py-2"
          />

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded border px-4 py-2"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded bg-blue-600 px-4 py-2 text-white"
            >
              Save Changes
            </button>
          </div>

          {errors.name && <p>{errors.name.message}</p>}
        </form>
      </div>
    </div>
  );
}