type Props = {
  activity: any[];
  darkMode: boolean;
};

export default function ActivityPage({
  activity,
  darkMode,
}: Props) {
  return (
    <section
      className={`rounded-3xl border p-8 transition-colors duration-300 ${
        darkMode
          ? "border-slate-800 bg-slate-900/60"
          : "border-slate-300 bg-white"
      }`}
    >
      <div className="mb-8">
        <h2 className="text-3xl font-bold">
          Activity
        </h2>

        <p
          className={`mt-2 ${
            darkMode
              ? "text-slate-400"
              : "text-slate-600"
          }`}
        >
          Recent orchestration and
          provisioning events across all
          connected systems.
        </p>
      </div>

      <div className="space-y-4">
        {activity.map((item: any) => (
          <div
            key={item.id}
            className={`rounded-2xl border p-5 transition ${
              darkMode
                ? "border-slate-800 bg-slate-950 hover:border-slate-700"
                : "border-slate-300 bg-slate-50 hover:border-slate-400"
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="font-semibold">
                  {item.user}
                </div>

                <div
                  className={`mt-1 ${
                    darkMode
                      ? "text-slate-300"
                      : "text-slate-700"
                  }`}
                >
                  {item.action}
                </div>

                <div
                  className={`mt-2 text-sm ${
                    darkMode
                      ? "text-slate-500"
                      : "text-slate-500"
                  }`}
                >
                  {item.timestamp}
                </div>
              </div>

              <div className="rounded-full bg-emerald-500/10 px-3 py-1 text-sm text-emerald-500">
                {item.status}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}