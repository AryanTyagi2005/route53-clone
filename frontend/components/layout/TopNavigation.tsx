"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useAuth } from "@/features/auth/hooks/useAuth";

export default function TopNavigation() {
  const router = useRouter();
  const { logout } = useAuth();

  function handleLogout() {
    logout();
    router.push("/login");
  }

  return (
    <header className="flex h-14 items-center justify-between border-b border-gray-200 bg-[#232f3e] px-6">
      <div className="flex items-center gap-6">
        <Link href="/hosted-zones" className="text-lg font-semibold text-white">
          Amazon Route 53
        </Link>

        <span className="text-sm text-gray-300">Amazon Route 53</span>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-300">Admin User</span>

        <button
          onClick={handleLogout}
          className="rounded bg-gray-700 px-3 py-1 text-sm text-white hover:bg-gray-600"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
