"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
  },
  {
    name: "Hosted Zones",
    href: "/hosted-zones",
  },
  {
    name: "Traffic Policies",
    href: "/traffic-policies",
  },
  {
    name: "Health Checks",
    href: "/health-checks",
  },
  {
    name: "Resolver",
    href: "/resolver",
  },
  {
    name: "Profiles",
    href: "/profiles",
  },
];

export default function SideNavigation() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-gray-200 bg-white min-h-[calc(100vh-56px)]">
      <div className="p-4">
        <h2 className="mb-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
          Route 53
        </h2>

        <nav className="space-y-1">
          {navigation.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`block rounded-md px-3 py-2 text-sm transition ${
                  active
                    ? "bg-blue-50 text-blue-700 font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
