type Props = {
  users: any[];
  groups: any[];
  activity: any[];
  darkMode: boolean;
};

export default function DashboardPage({
  users,
  groups,
  //activity,
  darkMode,
}: Props) {
  return (
    <div className="space-y-8">
      <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          title="Managed Users"
          value={users.length.toString()}
          subtitle="Provisioned identities"
          darkMode={darkMode}
        />

        <MetricCard
          title="Permission Groups"
          value={groups.length.toString()}
          subtitle="Policy mappings"
          darkMode={darkMode}
        />

        <MetricCard
          title="Connected Providers"
          value="3"
          subtitle="GitHub, Google, Discord"
          darkMode={darkMode}
        />

        <MetricCard
          title="Sync Health"
          value="98%"
          subtitle="Infrastructure healthy"
          darkMode={darkMode}
        />
      </section>

      <section
        className={`rounded-3xl border p-8 transition-colors duration-300 ${
          darkMode
            ? "border-slate-800 bg-slate-900/60"
            : "border-slate-300 bg-white"
        }`}
      >
        <h2 className="text-2xl font-semibold">Platform Overview</h2>

        <p className={`mt-2 ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
          Centralized orchestration for onboarding, permissions, and
          synchronization workflows.
        </p>
      </section>
    </div>
  );
}

function MetricCard({
  title,
  value,
  subtitle,
  darkMode,
}: {
  title: string;
  value: string;
  subtitle: string;
  darkMode: boolean;
}) {
  return (
    <div
      className={`rounded-3xl border p-6 transition-colors duration-300 ${
        darkMode
          ? "border-slate-800 bg-slate-900/60"
          : "border-slate-300 bg-white"
      }`}
    >
      <div
        className={`text-sm ${darkMode ? "text-slate-400" : "text-slate-600"}`}
      >
        {title}
      </div>

      <div className="mt-3 text-4xl font-bold tracking-tight">{value}</div>

      <div
        className={`mt-2 text-sm ${
          darkMode ? "text-slate-500" : "text-slate-500"
        }`}
      >
        {subtitle}
      </div>
    </div>
  );
}
