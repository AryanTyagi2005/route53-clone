interface RecordsHeaderProps {
  name: string;
  description: string;
}

export default function RecordsHeader({
  name,
  description,
}: RecordsHeaderProps) {
  return (
    <div className="mb-6 rounded-lg border bg-white p-6 shadow-sm">
      <button className="mb-4 text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline">
        ← Back to Hosted Zones
      </button>

      <div className="flex items-start justify-between">
        <div>
          <div className="mb-2 flex items-center gap-3">
            <h1 className="text-3xl font-bold text-gray-900">{name}</h1>

            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
              Public Hosted Zone
            </span>
          </div>

          <p className="max-w-3xl text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  );
}
