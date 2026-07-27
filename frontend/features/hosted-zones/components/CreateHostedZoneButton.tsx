"use client";

import { useState } from "react";
import CreateHostedZoneModal from "./CreateHostedZoneModal";

interface Props {
  refetch: () => Promise<void>;
}

export default function CreateHostedZoneButton({ refetch }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-md bg-orange-500 px-4 py-2 text-white hover:bg-orange-600"
      >
        Create hosted zone
      </button>

      <CreateHostedZoneModal
        open={open}
        onClose={() => setOpen(false)}
        refetch={refetch}
      />
    </>
  );
}
