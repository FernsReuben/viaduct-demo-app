type Props = {
  darkMode: boolean;
};

export default function IntegrationsPage({
  darkMode,
}: Props) {
  return (
    <section className="space-y-6">
      <IntegrationCard
        darkMode={darkMode}
        title="GitHub"
        description="Repository and organization access orchestration."
        details={[
          "Organizations: openbridge-platform, openbridge-sdk",
          "Repositories Synced: 14",
          "Webhook Status: Healthy",
          "Last Sync: 2 minutes ago",
        ]}
      />

      <IntegrationCard
        darkMode={darkMode}
        title="Google Workspace"
        description="Identity source-of-truth and group synchronization."
        details={[
          "Managed Groups: 8",
          "Provisioning Policies: Active",
          "Directory Sync: Enabled",
          "Last Sync: 1 minute ago",
        ]}
      />

      <IntegrationCard
        darkMode={darkMode}
        title="Discord"
        description="Community role synchronization and moderation management."
        details={[
          "Server: OpenBridge OSS",
          "Roles Synced: 12",
          "Bot Status: Online",
          "Last Sync: 5 minutes ago",
        ]}
      />
    </section>
  );
}

function IntegrationCard({
  title,
  description,
  details,
  darkMode,
}: any) {
  return (
    <div
      className={`rounded-3xl border p-8 ${
        darkMode
          ? "border-slate-800 bg-slate-900/60"
          : "border-slate-300 bg-white"
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">
            {title}
          </h2>

          <p
            className={`mt-2 ${
              darkMode
                ? "text-slate-400"
                : "text-slate-600"
            }`}
          >
            {description}
          </p>
        </div>

        <div className="rounded-full bg-emerald-500/10 px-3 py-1 text-sm text-emerald-500">
          Connected
        </div>
      </div>

      <div className="mt-6 grid gap-3">
        {details.map((detail: string) => (
          <div
            key={detail}
            className={`rounded-xl border px-4 py-3 text-sm ${
              darkMode
                ? "border-slate-800 bg-slate-950 text-slate-300"
                : "border-slate-300 bg-slate-50 text-slate-700"
            }`}
          >
            {detail}
          </div>
        ))}
      </div>
    </div>
  );
}