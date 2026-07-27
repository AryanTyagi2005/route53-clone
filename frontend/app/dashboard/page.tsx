import AppShell from "@/components/layout/AppShell";
import ComingSoonPage from "@/components/ComingSoonPage";

export default function DashboardPage() {
  return (
    <AppShell>
      <ComingSoonPage
        title="Dashboard"
        description="Monitor your Route 53 resources and DNS health from a central dashboard."
      />
    </AppShell>
  );
}
