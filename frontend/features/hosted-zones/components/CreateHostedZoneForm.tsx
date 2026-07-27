"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
type FormData = {
  name: string;
  description: string;
};

interface Props {
  onSubmit: (data: FormData) => void;
  loading: boolean;
  onCancel: () => void;
  defaultValues?: FormData;
  submitButtonText?: string;
}

export default function CreateHostedZoneForm({
  onSubmit,
  loading,
  onCancel,
  defaultValues,
  submitButtonText,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues,
  });
  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);
  async function onFormSubmit(data: FormData) {
    await onSubmit(data);

    reset();
  }
  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-5">
      <div>
        <label className="mb-1 block text-sm font-medium">Domain Name</label>

        <input
          {...register("name", {
            required: "Domain name is required",
          })}
          disabled={loading}
          placeholder="example.com"
          className="w-full rounded-md border px-3 py-2 disabled:bg-gray-100 disabled:text-gray-500"
        />

        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Description</label>

        <textarea
          {...register("description")}
          disabled={loading}
          rows={3}
          placeholder="Production website"
          className="w-full rounded-md border px-3 py-2 disabled:bg-gray-100 disabled:text-gray-500"
        />
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="rounded border px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="flex min-w-[170px] items-center justify-center gap-2 rounded bg-orange-500 px-4 py-2 text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading && (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          )}

          {loading ? "Saving..." : (submitButtonText ?? "Create Hosted Zone")}
        </button>
      </div>
    </form>
  );
}
