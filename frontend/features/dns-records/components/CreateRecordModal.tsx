"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { createRecordSchema } from "./recordSchema";
import { createDnsRecord } from "@/services/dnsRecordService";
import { toast } from "sonner";

interface CreateRecordModalProps {
  open: boolean;
  hostedZoneId: number;
  onClose: () => void;
  onRecordCreated: () => Promise<void>;
}

type FormData = z.infer<typeof createRecordSchema>;

export default function CreateRecordModal({
  open,
  hostedZoneId,
  onClose,
  onRecordCreated,
}: CreateRecordModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(createRecordSchema),
    defaultValues: {
      name: "",
      type: "A",
      value: "",
      ttl: 300,
    },
  });

  useEffect(() => {
    if (open) {
      reset({
        name: "",
        type: "A",
        value: "",
        ttl: 300,
      });
    }
  }, [open, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      await createDnsRecord(hostedZoneId, data);

      toast.success("DNS record created successfully.");

      await onRecordCreated();

      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Failed to create DNS record.");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-xl">
        <h2 className="mb-6 text-xl font-semibold">Create Record</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">
              Record Name
            </label>

            <input
              {...register("name")}
              className="w-full rounded-md border px-3 py-2"
              placeholder="www"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Record Type
            </label>

            <select
              {...register("type")}
              className="w-full rounded-md border px-3 py-2"
            >
              <option value="A">A</option>
              <option value="AAAA">AAAA</option>
              <option value="CNAME">CNAME</option>
              <option value="TXT">TXT</option>
              <option value="MX">MX</option>
              <option value="NS">NS</option>
              <option value="PTR">PTR</option>
              <option value="SRV">SRV</option>
              <option value="CAA">CAA</option>
            </select>

            {errors.type && (
              <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Value</label>

            <input
              {...register("value")}
              className="w-full rounded-md border px-3 py-2"
              placeholder="192.168.1.1"
            />

            {errors.value && (
              <p className="mt-1 text-sm text-red-600">
                {errors.value.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">TTL</label>

            <input
              type="number"
              {...register("ttl", { valueAsNumber: true })}
              className="w-full rounded-md border px-3 py-2"
            />

            {errors.ttl && (
              <p className="mt-1 text-sm text-red-600">{errors.ttl.message}</p>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border px-4 py-2 hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? "Creating..." : "Create Record"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
