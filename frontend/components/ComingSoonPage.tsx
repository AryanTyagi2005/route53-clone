import Link from "next/link";

interface ComingSoonPageProps {
  title: string;
  description: string;
}

export default function ComingSoonPage({
  title,
  description,
}: ComingSoonPageProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-10 shadow-sm">
      <p className="mb-2 text-sm font-medium uppercase tracking-wide text-orange-600">
        Amazon Route 53
      </p>

      <h1 className="text-3xl font-semibold text-gray-900">{title}</h1>

      <p className="mt-3 max-w-2xl text-gray-600">{description}</p>

      <div className="mt-10 rounded-lg border border-dashed border-gray-300 bg-gray-50 p-10 text-center">
        <h2 className="text-xl font-semibold text-gray-800">🚧 Coming Soon</h2>

        <p className="mt-2 text-gray-500">
          This section is intentionally mocked for this Route 53 clone
          assignment.
        </p>

        <Link
          href="/hosted-zones"
          className="mt-6 inline-flex rounded-md bg-orange-500 px-4 py-2 text-white hover:bg-orange-600"
        >
          Back to Hosted Zones
        </Link>
      </div>
    </div>
  );
}
