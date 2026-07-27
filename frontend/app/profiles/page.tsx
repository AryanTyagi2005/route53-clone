import AppShell from "@/components/layout/AppShell";
import ComingSoonPage from "@/components/ComingSoonPage";

export default function ProfilesPage() {
  return (
    <AppShell>
      <ComingSoonPage
        title="Profiles"
        description="Manage Route 53 profiles and reusable DNS configurations."
      />
    </AppShell>
  );
}
