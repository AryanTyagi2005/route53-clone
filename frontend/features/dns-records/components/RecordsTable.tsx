import { DNSRecord } from "../types";

interface RecordsTableProps {
  records: DNSRecord[];
  onEdit: (record: DNSRecord) => void;
  onDelete: (record: DNSRecord) => void;
}

export default function RecordsTable({
  records,
  onEdit,
  onDelete,
}: RecordsTableProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      <table className="min-w-full">
        <thead className="bg-gray-50">
          <tr className="border-b border-gray-200">
            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
              Name
            </th>

            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
              Type
            </th>

            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
              Value
            </th>

            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
              TTL
            </th>

            <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {records.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-6 py-12 text-center">
                <div className="space-y-2">
                  <p className="text-lg font-semibold text-gray-700">
                    No DNS records found
                  </p>

                  <p className="text-sm text-gray-500">
                    Create your first DNS record to start routing traffic.
                  </p>
                </div>
              </td>
            </tr>
          ) : (
            records.map((record) => (
              <tr
                key={record.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {record.name}
                </td>

                <td className="px-6 py-4 text-sm font-medium text-gray-800">
                  {record.type}
                </td>

                <td className="px-6 py-4 text-sm text-gray-700">
                  {record.value}
                </td>

                <td className="px-6 py-4 text-sm text-gray-700">
                  {record.ttl}
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => onEdit(record)}
                      className="rounded-md border border-blue-500 px-3 py-1 text-sm font-medium text-blue-600 hover:bg-blue-50"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => onDelete(record)}
                      className="rounded-md border border-red-500 px-3 py-1 text-sm font-medium text-red-600 hover:bg-red-50"
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
  );
}
