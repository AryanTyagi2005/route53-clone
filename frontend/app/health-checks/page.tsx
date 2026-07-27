import AppShell from "@/components/layout/AppShell";
import ComingSoonPage from "@/components/ComingSoonPage";

export default function HealthChecksPage() {
  return (
    <AppShell>
      <ComingSoonPage
        title="Health Checks"
        description="Monitor endpoint availability and route traffic based on health status."
      />
    </AppShell>
  );
}
