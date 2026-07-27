import { Search, Plus } from "lucide-react";

interface RecordsToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  recordTypeFilter: string;
  onRecordTypeFilterChange: (value: string) => void;
  onCreateRecord: () => void;
}

export default function RecordsToolbar({
  search,
  onSearchChange,
  recordTypeFilter,
  onRecordTypeFilterChange,
  onCreateRecord,
}: RecordsToolbarProps) {
  return (
    <div className="mb-6 flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />

          <input
            type="text"
            placeholder="Search records..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-80 rounded-md border border-gray-300 py-2 pl-10 pr-3 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <select
          value={recordTypeFilter}
          onChange={(e) => onRecordTypeFilterChange(e.target.value)}
          className="rounded-md border border-gray-300 px-3 py-2"
        >
          <option value="ALL">All Types</option>
          <option value="A">A</option>
          <option value="AAAA">AAAA</option>
          <option value="CNAME">CNAME</option>
          <option value="MX">MX</option>
          <option value="TXT">TXT</option>
          <option value="NS">NS</option>
          <option value="PTR">PTR</option>
          <option value="SRV">SRV</option>
          <option value="CAA">CAA</option>
        </select>
      </div>

      <button
        onClick={onCreateRecord}
        className="flex items-center gap-2 rounded-md bg-orange-500 px-4 py-2 text-white hover:bg-orange-600"
      >
        <Plus size={18} />
        Create Record
      </button>
    </div>
  );
}
