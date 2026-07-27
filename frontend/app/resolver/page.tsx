import AppShell from "@/components/layout/AppShell";
import ComingSoonPage from "@/components/ComingSoonPage";

export default function ResolverPage() {
  return (
    <AppShell>
      <ComingSoonPage
        title="Resolver"
        description="Configure hybrid DNS resolution between AWS and on-premises networks."
      />
    </AppShell>
  );
}
