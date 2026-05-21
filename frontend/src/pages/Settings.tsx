import { useState } from "react";

type Props = {
  darkMode: boolean;
  setDarkMode: (v: boolean) => void;
};

export default function SettingsPage({ darkMode, setDarkMode }: Props) {
  const [autoSync, setAutoSync] = useState(true);

  const [auditLogging, setAuditLogging] = useState(true);

  const [provisioningMode, setProvisioningMode] = useState("Automatic");

  return (
    <section
      className={`rounded-3xl border p-8 transition-colors duration-300 ${
        darkMode
          ? "border-slate-800 bg-slate-900/60"
          : "border-slate-300 bg-white"
      }`}
    >
      <div className="mb-8">
        <h2 className="text-3xl font-bold">Settings</h2>

        <p className={`mt-2 ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
          Configure orchestration behavior, synchronization settings, and
          platform preferences.
        </p>
      </div>

      <div className="space-y-6">
        {/* APPEARANCE */}
        <Card darkMode={darkMode}>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold">Appearance</div>

              <div
                className={`mt-2 text-sm ${
                  darkMode ? "text-slate-400" : "text-slate-600"
                }`}
              >
                Toggle between dark and light mode for the dashboard UI.
              </div>
            </div>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                darkMode
                  ? "bg-blue-600 text-white hover:bg-blue-500"
                  : "bg-slate-200 text-slate-900 hover:bg-slate-300"
              }`}
            >
              {darkMode ? "Dark Mode" : "Light Mode"}
            </button>
          </div>
        </Card>

        {/* AUTO SYNC */}
        <SettingToggle
          darkMode={darkMode}
          title="Automatic Sync"
          description="Automatically synchronize user permissions across connected providers."
          enabled={autoSync}
          onToggle={() => setAutoSync(!autoSync)}
        />

        {/* AUDIT LOGGING */}
        <SettingToggle
          darkMode={darkMode}
          title="Audit Logging"
          description="Store provisioning and synchronization events for compliance tracking."
          enabled={auditLogging}
          onToggle={() => setAuditLogging(!auditLogging)}
        />

        {/* PROVISIONING MODE */}
        <Card darkMode={darkMode}>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold">Provisioning Mode</div>

              <div
                className={`mt-2 text-sm ${
                  darkMode ? "text-slate-400" : "text-slate-600"
                }`}
              >
                Control how identity changes are applied across providers.
              </div>
            </div>

            <select
              value={provisioningMode}
              onChange={(e) => setProvisioningMode(e.target.value)}
              className={`rounded-xl border px-4 py-2 text-sm outline-none ${
                darkMode
                  ? "border-slate-700 bg-slate-900 text-white"
                  : "border-slate-300 bg-white text-slate-900"
              }`}
            >
              <option>Automatic</option>

              <option>Manual</option>

              <option>Approval Required</option>
            </select>
          </div>
        </Card>

        {/* PROVIDER STATUS */}
        <Card darkMode={darkMode}>
          <div className="mb-5">
            <div className="font-semibold">Provider Status</div>

            <div
              className={`mt-2 text-sm ${
                darkMode ? "text-slate-400" : "text-slate-600"
              }`}
            >
              Current health and synchronization state of connected
              integrations.
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <ProviderStatus
              darkMode={darkMode}
              name="GitHub"
              status="Operational"
            />

            <ProviderStatus
              darkMode={darkMode}
              name="Google Workspace"
              status="Operational"
            />

            <ProviderStatus
              darkMode={darkMode}
              name="Discord"
              status="Operational"
            />
          </div>
        </Card>
      </div>
    </section>
  );
}

function Card({
  children,
  darkMode,
}: {
  children: React.ReactNode;
  darkMode: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-6 transition-colors duration-300 ${
        darkMode
          ? "border-slate-800 bg-slate-950"
          : "border-slate-300 bg-slate-50"
      }`}
    >
      {children}
    </div>
  );
}

function SettingToggle({
  title,
  description,
  enabled,
  onToggle,
  darkMode,
}: {
  title: string;
  description: string;
  enabled: boolean;
  onToggle: () => void;
  darkMode: boolean;
}) {
  return (
    <Card darkMode={darkMode}>
      <div className="flex items-center justify-between">
        <div>
          <div className="font-semibold">{title}</div>

          <div
            className={`mt-2 text-sm ${
              darkMode ? "text-slate-400" : "text-slate-600"
            }`}
          >
            {description}
          </div>
        </div>

        <button
          onClick={onToggle}
          className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
            enabled
              ? "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30"
              : darkMode
                ? "bg-slate-800 text-slate-300 hover:bg-slate-700"
                : "bg-slate-200 text-slate-700 hover:bg-slate-300"
          }`}
        >
          {enabled ? "Enabled" : "Disabled"}
        </button>
      </div>
    </Card>
  );
}

function ProviderStatus({
  name,
  status,
  darkMode,
}: {
  name: string;
  status: string;
  darkMode: boolean;
}) {
  return (
    <div
      className={`rounded-xl border p-5 transition-colors duration-300 ${
        darkMode ? "border-slate-800 bg-slate-900" : "border-slate-300 bg-white"
      }`}
    >
      <div className="font-medium">{name}</div>

      <div className="mt-3 inline-flex rounded-full bg-emerald-500/10 px-3 py-1 text-sm text-emerald-400">
        {status}
      </div>
    </div>
  );
}
