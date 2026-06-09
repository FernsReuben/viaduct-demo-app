import { useState } from "react";
import type { Group, User, ExternalGroup } from "../App";
import UserDetailModal from "../components/UserDetailModal";

type Props = {
  groups: Group[];
  users?: User[];
  externalGroups?: ExternalGroup[];
  darkMode?: boolean;
};

const groupNameMap: Record<string, string> = {
  g1: "Super Admin",
  g2: "Maintainer",
  g3: "Committer",
  g4: "Reviewer",
  g5: "Contributor",
  g6: "Community Moderator",
};

export default function GroupManagement({
  groups,
  users = [],
  externalGroups = [],
  darkMode = true,
}: Props) {
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  return (
    <div
      className={`rounded-3xl border p-8 ${
        darkMode
          ? "border-slate-800 bg-slate-900/60 text-white"
          : "border-slate-200 bg-white text-slate-900"
      }`}
    >
      <div className="mb-8 flex justify-between">
        <div>
          <h2 className="text-3xl font-bold">Internal Groups</h2>

          <p className="mt-2 opacity-70">
            Manage internal groups and mappings.
          </p>
        </div>

        <button className="rounded-2xl bg-blue-600 px-4 py-2 text-white">
          + Create Group
        </button>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {groups.map((group) => {
          const members = users.filter((u) => u.groups.includes(group.id));

          const mappedExternal = externalGroups.filter((eg) =>
            eg.mappedGroups.includes(group.id),
          );

          const inferredExternalGroups = externalGroups.filter((eg) => {
            return users.some((user) => {
              if (!user.groups.includes(group.id)) return false;

              if (
                eg.provider === "GitHub" &&
                user.github?.orgs?.includes(eg.name)
              ) {
                return true;
              }

              if (
                eg.provider === "Discord" &&
                user.discord?.roles?.includes(eg.name)
              ) {
                return true;
              }

              if (
                eg.provider === "Google" &&
                user.google?.groups?.includes(eg.name)
              ) {
                return true;
              }

              return false;
            });
          });

          return (
            <div
              key={group.id}
              className={`rounded-2xl border p-5 ${
                darkMode
                  ? "border-slate-800 bg-slate-950"
                  : "border-slate-200 bg-slate-50"
              }`}
            >
              <div className="flex justify-between mb-4">
                <div>
                  <h3 className="font-semibold">{group.name}</h3>

                  <p className="text-sm opacity-60">Internal Group</p>
                </div>

                <button
                  onClick={() => setSelectedGroup(group)}
                  className="rounded-lg bg-blue-600 px-3 py-1 text-white"
                >
                  Edit
                </button>
              </div>

              <div className="space-y-3">
                <StatCard
                  label="Members"
                  value={members.length}
                  darkMode={darkMode}
                />

                <StatCard
                  label="External Groups"
                  value={mappedExternal.length}
                  darkMode={darkMode}
                />
              </div>

              {(mappedExternal.length > 0 ||
                inferredExternalGroups.length > 0) && (
                <div className="mt-4 space-y-2">
                  {[...mappedExternal, ...inferredExternalGroups]
                    .filter(
                      (eg, index, arr) =>
                        arr.findIndex((x) => x.id === eg.id) === index,
                    )
                    .map((eg) => (
                      <div
                        key={eg.id}
                        className={`flex justify-between rounded-lg px-3 py-2 ${
                          darkMode ? "bg-slate-900" : "bg-slate-100"
                        }`}
                      >
                        <span>{eg.name}</span>

                        <span className="text-xs text-blue-400">
                          {eg.provider}
                        </span>
                      </div>
                    ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {selectedGroup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div
            className={`w-[700px] rounded-3xl p-6 ${
              darkMode ? "bg-slate-950 text-white" : "bg-white"
            }`}
          >
            <div className="flex justify-between mb-6">
              <h2 className="text-2xl font-bold">{selectedGroup.name}</h2>

              <button onClick={() => setSelectedGroup(null)}>✕</button>
            </div>

            <h3 className="mb-3 font-semibold">Members</h3>

            <div className="space-y-3">
              {users
                .filter((u) => u.groups.includes(selectedGroup.id))
                .map((user) => (
                  <div
                    key={user.id}
                    onClick={() => setSelectedUser(user)}
                    className={`cursor-pointer rounded-xl p-4 ${
                      darkMode
                        ? "bg-slate-900 hover:bg-slate-800"
                        : "bg-slate-100 hover:bg-slate-200"
                    }`}
                  >
                    <div className="flex justify-between">
                      <div>
                        <div className="font-medium">{user.name}</div>

                        <div className="text-sm opacity-70">{user.email}</div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {user.groups.map((id) => (
                          <span
                            key={id}
                            className="rounded-full bg-blue-600/20 px-3 py-1 text-xs text-blue-400"
                          >
                            {groupNameMap[id]}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {selectedUser && (
        <UserDetailModal
          user={selectedUser}
          groups={groups}
          darkMode={darkMode}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
}

function StatCard({
  label,
  value,
  darkMode,
}: {
  label: string;
  value: number;
  darkMode: boolean;
}) {
  return (
    <div
      className={`rounded-lg px-3 py-2 ${
        darkMode ? "bg-slate-900" : "bg-slate-100"
      }`}
    >
      <div className="text-sm opacity-70">{label}</div>

      <div className="font-medium">{value}</div>
    </div>
  );
}
