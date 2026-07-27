"use client";

import { ReactNode } from "react";
import TopNavigation from "./TopNavigation";
import SideNavigation from "./SideNavigation";

interface AppShellProps {
  children: ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-gray-100">
      <TopNavigation />

      <div className="flex">
        <SideNavigation />

        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
