import { useState } from "react";
import type { User, ExternalGroup } from "../App";
import UserDetailModal from "../components/UserDetailModal";

type Props = {
  darkMode: boolean;
  users: User[];
};

const groupMap: Record<string, string> = {
  g1: "Super Admin",
  g2: "Maintainer",
  g3: "Committer",
  g4: "Reviewer",
  g5: "Contributor",
  g6: "Community Moderator",
};

const mockExternalGroups: ExternalGroup[] = [
  {
    id: "eg1",
    provider: "GitHub",
    name: "openbridge-platform",
    description: "Primary engineering organization",
    mappedGroups: ["g1", "g2"],
  },
  {
    id: "eg2",
    provider: "GitHub",
    name: "openbridge-community",
    description: "Community repository access",
    mappedGroups: ["g2", "g5"],
  },
  {
    id: "eg3",
    provider: "Google",
    name: "maintainers@openbridge.dev",
    description: "Google Workspace maintainer group",
    mappedGroups: ["g2"],
  },
  {
    id: "eg4",
    provider: "Discord",
    name: "Moderator",
    description: "Discord moderation permissions",
    mappedGroups: ["g6"],
  },
  {
    id: "eg5",
    provider: "Discord",
    name: "Trusted Contributor",
    description: "Verified contributor role",
    mappedGroups: ["g5", "g4"],
  },
];

function getUsersForExternalGroup(group: ExternalGroup, users: User[]) {
  return users.filter((user) => {
    // provider matching
    if (group.provider === "GitHub") {
      if (user.github?.orgs?.includes(group.name)) {
        return true;
      }
    }

    if (group.provider === "Discord") {
      if (user.discord?.roles?.includes(group.name)) {
        return true;
      }
    }

    if (group.provider === "Google") {
      if (user.google?.groups?.includes(group.name)) {
        return true;
      }
    }

    // internal role fallback
    const mappedInternalRoles: Record<string, string[]> = {
      "openbridge-platform": ["g1", "g2"],
      "openbridge-community": ["g2", "g5"],
      "maintainers@openbridge.dev": ["g2"],
      Moderator: ["g6"],
      "Trusted Contributor": ["g5", "g4"],
      Reviewer: ["g4"],
      "Community Moderator": ["g6"],
    };

    const linkedRoles = mappedInternalRoles[group.name] ?? [];

    return user.groups.some((role) => linkedRoles.includes(role));
  });
}

export default function ExternalGroupsPage({ darkMode, users }: Props) {
  const [selectedGroup, setSelectedGroup] = useState<ExternalGroup | null>(
    null,
  );

  const [selectedUsersGroup, setSelectedUsersGroup] =
    useState<ExternalGroup | null>(null);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);

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
            .reduce((acc, g) => acc + g.mappedGroups.length, 0)
            .toString()}
          darkMode={darkMode}
        />
      </section>

      {/* GRID */}
      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {mockExternalGroups.map((group) => {
          const linkedUsers = getUsersForExternalGroup(group, users);

          return (
            <div
              key={group.id}
              className={`rounded-3xl border p-6 ${
                darkMode
                  ? "border-slate-800 bg-slate-900/60"
                  : "border-slate-200 bg-white"
              }`}
            >
              <div className="mb-4 flex items-center justify-between">
                <ProviderBadge provider={group.provider} darkMode={darkMode} />

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
                <div className="mb-2 text-xs uppercase tracking-wide text-slate-500">
                  Linked Internal Groups
                </div>

                <div className="flex flex-wrap gap-2">
                  {group.mappedGroups.map((id) => (
                    <span
                      key={id}
                      className="rounded-full bg-blue-600/20 px-3 py-1 text-sm text-blue-400"
                    >
                      {groupMap[id]}
                    </span>
                  ))}
                </div>

                {/* USERS LINK */}
                <div className="mt-5 flex items-center justify-between">
                  <span
                    className={`text-sm ${
                      darkMode ? "text-slate-400" : "text-slate-600"
                    }`}
                  >
                    {linkedUsers.length} users
                  </span>

                  <button
                    onClick={() => setSelectedUsersGroup(group)}
                    className="rounded-lg bg-slate-700 px-3 py-1 text-sm text-white hover:bg-slate-600"
                  >
                    View Users
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* GROUP MANAGEMENT MODAL */}
      {selectedGroup && (
        <Modal darkMode={darkMode} onClose={() => setSelectedGroup(null)}>
          <h2 className="text-2xl font-bold">{selectedGroup.name}</h2>

          <p
            className={`mt-1 ${darkMode ? "text-slate-400" : "text-slate-600"}`}
          >
            Manage internal group mappings
          </p>

          <div className="mt-6 space-y-3">
            {Object.entries(groupMap).map(([id, name]) => (
              <label
                key={id}
                className={`flex items-center gap-3 rounded-xl p-3 ${
                  darkMode ? "bg-slate-900" : "bg-slate-100"
                }`}
              >
                <input
                  type="checkbox"
                  defaultChecked={selectedGroup.mappedGroups.includes(id)}
                />

                {name}
              </label>
            ))}
          </div>

          <button className="mt-6 w-full rounded-xl bg-blue-600 py-3 text-white">
            Save Mapping
          </button>
        </Modal>
      )}

      {/* USERS MODAL */}
      {selectedUsersGroup && (
        <Modal
          darkMode={darkMode}
          onClose={() => {
            setSelectedUsersGroup(null);
            setSelectedUser(null);
          }}
        >
          <h2 className="text-2xl font-bold">{selectedUsersGroup.name}</h2>

          <p
            className={`mt-1 ${darkMode ? "text-slate-400" : "text-slate-600"}`}
          >
            Users in this external group
          </p>

          <div className="mt-6 space-y-3">
            {getUsersForExternalGroup(selectedUsersGroup, users).map((user) => (
              <div
                key={user.id}
                onClick={() => setSelectedUser(user)}
                className={`cursor-pointer rounded-xl p-4 transition ${
                  darkMode
                    ? "bg-slate-900 hover:bg-slate-800"
                    : "bg-slate-100 hover:bg-slate-200"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{user.name}</div>

                    <div
                      className={`text-sm ${
                        darkMode ? "text-slate-400" : "text-slate-600"
                      }`}
                    >
                      {user.email}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {user.groups.length > 0 ? (
                      user.groups.map((groupId) => (
                        <span
                          key={groupId}
                          className="rounded-full bg-blue-600/20 px-3 py-1 text-xs text-blue-400"
                        >
                          {groupMap[groupId] ?? groupId}
                        </span>
                      ))
                    ) : (
                      <span
                        className={`rounded-full px-3 py-1 text-xs ${
                          darkMode
                            ? "bg-slate-800 text-slate-400"
                            : "bg-slate-200 text-slate-600"
                        }`}
                      >
                        No role
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Modal>
      )}

      {/* USER DETAILS MODAL */}
      {selectedUser && (
        <UserDetailModal
          user={selectedUser}
          groups={[]}
          darkMode={darkMode}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
}

function Modal({
  children,
  darkMode,
  onClose,
}: {
  children: React.ReactNode;
  darkMode: boolean;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div
        className={`w-[700px] rounded-3xl border p-8 ${
          darkMode
            ? "border-slate-800 bg-slate-950"
            : "border-slate-200 bg-white"
        }`}
      >
        <div className="mb-4 flex justify-end">
          <button onClick={onClose}>✕</button>
        </div>

        {children}
      </div>
    </div>
  );
}

function ProviderBadge({
  provider,
  darkMode,
}: {
  provider: string;
  darkMode: boolean;
}) {
  return (
    <div
      className={`rounded-full px-3 py-1 text-sm ${
        darkMode ? "bg-slate-800 text-slate-200" : "bg-slate-200 text-slate-700"
      }`}
    >
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
