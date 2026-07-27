"use client";

import type { DNSRecord } from "../types";

interface DeleteRecordModalProps {
  open: boolean;
  record: DNSRecord | null;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

export default function DeleteRecordModal({
  open,
  record,
  onClose,
  onConfirm,
}: DeleteRecordModalProps) {
  if (!open || !record) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-lg bg-white shadow-xl">
        <div className="border-b px-6 py-4">
          <h2 className="text-lg font-semibold">Delete DNS Record</h2>
        </div>

        <div className="px-6 py-5">
          <p className="text-gray-700">
            Are you sure you want to delete
            <span className="font-semibold"> "{record.name}" </span>?
          </p>

          <p className="mt-2 text-sm text-red-600">
            This action cannot be undone.
          </p>
        </div>

        <div className="flex justify-end gap-3 border-t px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-md border px-4 py-2 hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
