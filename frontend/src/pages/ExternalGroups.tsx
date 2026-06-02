import { useState } from "react";

type ExternalGroup = {
  id: string;
  provider: "GitHub" | "Google" | "Discord";
  name: string;
  description: string;
  linkedInternalGroups: string[];
};

type Props = {
  darkMode: boolean;
};

const mockExternalGroups: ExternalGroup[] = [
  {
    id: "eg1",
    provider: "GitHub",
    name: "openbridge-platform",
    description: "Primary engineering organization",
    linkedInternalGroups: ["Super Admin", "Maintainer"],
  },

  {
    id: "eg2",
    provider: "GitHub",
    name: "openbridge-community",
    description: "Community repository access",
    linkedInternalGroups: ["Contributor", "Community Moderator"],
  },

  {
    id: "eg3",
    provider: "Google",
    name: "maintainers@openbridge.dev",
    description: "Google Workspace maintainer group",
    linkedInternalGroups: ["Maintainer"],
  },

  {
    id: "eg4",
    provider: "Discord",
    name: "Moderator",
    description: "Discord moderation permissions",
    linkedInternalGroups: ["Community Moderator"],
  },

  {
    id: "eg5",
    provider: "Discord",
    name: "Trusted Contributor",
    description: "Verified contributor role",
    linkedInternalGroups: ["Contributor", "Reviewer"],
  },
];

export default function ExternalGroupsPage({ darkMode }: Props) {
  const [selectedGroup, setSelectedGroup] = useState<ExternalGroup | null>(
    null,
  );

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <section
        className={`rounded-3xl border p-8 ${
          darkMode
            ? "border-slate-800 bg-slate-900/60"
            : "border-slate-200 bg-white"
        }`}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">External Groups</h1>

            <p
              className={`mt-2 ${
                darkMode ? "text-slate-400" : "text-slate-600"
              }`}
            >
              Map provider-specific groups to internal Viaduct groups.
            </p>
          </div>

          <button className="rounded-2xl bg-blue-600 px-5 py-3 font-medium text-white">
            Sync Providers
          </button>
        </div>
      </section>

      {/* STATS */}
      <section className="grid gap-5 md:grid-cols-3">
        <StatCard
          title="External Groups"
          value={mockExternalGroups.length.toString()}
          darkMode={darkMode}
        />

        <StatCard title="Connected Providers" value="3" darkMode={darkMode} />

        <StatCard
          title="Mapped Relationships"
          value={mockExternalGroups
            .reduce((acc, g) => acc + g.linkedInternalGroups.length, 0)
            .toString()}
          darkMode={darkMode}
        />
      </section>

      {/* GROUP GRID */}
      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {mockExternalGroups.map((group) => (
          <div
            key={group.id}
            className={`rounded-3xl border p-6 ${
              darkMode
                ? "border-slate-800 bg-slate-900/60"
                : "border-slate-200 bg-white"
            }`}
          >
            <div className="mb-4 flex items-center justify-between">
              <ProviderBadge provider={group.provider} />

              <button
                onClick={() => setSelectedGroup(group)}
                className="rounded-lg bg-blue-600 px-3 py-1 text-sm text-white"
              >
                Manage
              </button>
            </div>

            <h3 className="text-lg font-semibold">{group.name}</h3>

            <p
              className={`mt-2 text-sm ${
                darkMode ? "text-slate-400" : "text-slate-600"
              }`}
            >
              {group.description}
            </p>

            <div className="mt-5">
              <div
                className={`mb-2 text-xs uppercase tracking-wide ${
                  darkMode ? "text-slate-500" : "text-slate-500"
                }`}
              >
                Linked Internal Groups
              </div>

              <div className="flex flex-wrap gap-2">
                {group.linkedInternalGroups.map((internalGroup) => (
                  <span
                    key={internalGroup}
                    className="rounded-full bg-blue-600/20 px-3 py-1 text-sm text-blue-400"
                  >
                    {internalGroup}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* DETAILS MODAL */}
      {selectedGroup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div
            className={`w-[700px] rounded-3xl border p-8 ${
              darkMode
                ? "border-slate-800 bg-slate-950"
                : "border-slate-200 bg-white"
            }`}
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">{selectedGroup.name}</h2>

                <p
                  className={`mt-1 ${
                    darkMode ? "text-slate-400" : "text-slate-600"
                  }`}
                >
                  Manage internal group mappings
                </p>
              </div>

              <button onClick={() => setSelectedGroup(null)}>✕</button>
            </div>

            <div className="space-y-3">
              {[
                "Super Admin",
                "Maintainer",
                "Committer",
                "Reviewer",
                "Contributor",
                "Community Moderator",
              ].map((group) => (
                <label
                  key={group}
                  className={`flex items-center gap-3 rounded-xl p-3 ${
                    darkMode ? "bg-slate-900" : "bg-slate-100"
                  }`}
                >
                  <input
                    type="checkbox"
                    defaultChecked={selectedGroup.linkedInternalGroups.includes(
                      group,
                    )}
                  />

                  <span>{group}</span>
                </label>
              ))}
            </div>

            <button className="mt-6 w-full rounded-xl bg-blue-600 py-3 font-medium text-white">
              Save Mapping
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function ProviderBadge({ provider }: { provider: string }) {
  return (
    <div className="rounded-full bg-slate-800 px-3 py-1 text-sm">
      {provider}
    </div>
  );
}

function StatCard({
  title,
  value,
  darkMode,
}: {
  title: string;
  value: string;
  darkMode: boolean;
}) {
  return (
    <div
      className={`rounded-3xl border p-6 ${
        darkMode
          ? "border-slate-800 bg-slate-900/60"
          : "border-slate-200 bg-white"
      }`}
    >
      <div
        className={`text-sm ${darkMode ? "text-slate-400" : "text-slate-600"}`}
      >
        {title}
      </div>

      <div className="mt-2 text-4xl font-bold">{value}</div>
    </div>
  );
}
