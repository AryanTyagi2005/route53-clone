import CreateHostedZoneButton from "@/features/hosted-zones/components/CreateHostedZoneButton";

interface HostedZonesToolbarProps {
  refetch: () => Promise<void>;
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export default function HostedZonesToolbar({
  refetch,
  searchTerm,
  onSearchChange,
}: HostedZonesToolbarProps) {
  return (
    <div className="mb-6 flex items-center justify-between gap-4">
      <input
        type="text"
        placeholder="Search hosted zones..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full max-w-sm rounded-md border px-3 py-2"
      />

      <CreateHostedZoneButton refetch={refetch} />
    </div>
  );
}
