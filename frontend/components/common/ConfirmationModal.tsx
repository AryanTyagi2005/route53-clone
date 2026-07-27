"use client";

import { useEffect } from "react";

interface ConfirmationModalProps {
  open: boolean;
  title: string;
  message: string;
  confirmText: string;
  cancelText?: string;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmationModal({
  open,
  title,
  message,
  confirmText,
  cancelText = "Cancel",
  loading = false,
  onConfirm,
  onCancel,
}: ConfirmationModalProps) {
  if (!open) return null;

  useEffect(() => {
    if (!open || loading) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onCancel();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, loading, onCancel]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={() => {
        if (!loading) {
          onCancel();
        }
      }}
    >
      <div
        className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold">{title}</h2>

        <p className="mt-3 text-sm text-gray-600">{message}</p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onCancel}
            disabled={loading}
            className="rounded border px-4 py-2 disabled:opacity-50"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:opacity-50"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
