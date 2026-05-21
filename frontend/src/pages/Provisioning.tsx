type Props = {
  darkMode: boolean;
};

export default function ProvisioningPage({
  darkMode,
}: Props) {
  return (
    <section
      className={`rounded-3xl border p-8 ${
        darkMode
          ? "border-slate-800 bg-slate-900/60"
          : "border-slate-300 bg-white"
      }`}
    >
      <div className="mb-10">
        <h2 className="text-3xl font-bold">
          Provisioning Pipelines
        </h2>

        <p
          className={`mt-2 ${
            darkMode
              ? "text-slate-400"
              : "text-slate-600"
          }`}
        >
          Automated identity synchronization
          and policy orchestration workflows.
        </p>
      </div>

      <div className="space-y-6">
        {[
          [
            "1. Google Workspace Event",
            "A user is added to the maintainers Google Group.",
            "Trigger Detected",
          ],
          [
            "2. Viaduct Policy Engine",
            "Policies determine GitHub team and Discord role mappings.",
            "Policy Evaluated",
          ],
          [
            "3. GitHub Provisioning",
            "Repository and organization permissions are synchronized.",
            "Access Provisioned",
          ],
        ].map(([title, description, status]) => (
          <div
            key={title}
            className={`rounded-2xl border p-6 ${
              darkMode
                ? "border-slate-800 bg-slate-950"
                : "border-slate-300 bg-slate-50"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="font-semibold">
                {title}
              </div>

              <div className="rounded-full bg-blue-500/10 px-3 py-1 text-sm text-blue-500">
                {status}
              </div>
            </div>

            <div
              className={`mt-3 ${
                darkMode
                  ? "text-slate-400"
                  : "text-slate-600"
              }`}
            >
              {description}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}