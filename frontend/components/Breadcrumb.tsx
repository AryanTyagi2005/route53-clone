import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="mb-6 flex items-center gap-2 text-sm text-gray-500">
      {items.map((item, index) => (
        <div
          key={item.label}
          className="flex items-center gap-2"
        >
          {item.href ? (
            <Link
              href={item.href}
              className="hover:text-blue-600"
            >
              {item.label}
            </Link>
          ) : (
            <span className="font-medium text-gray-900">
              {item.label}
            </span>
          )}

          {index !== items.length - 1 && (
            <span>/</span>
          )}
        </div>
      ))}
    </nav>
  );
}