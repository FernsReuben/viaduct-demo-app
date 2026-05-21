import { useState } from "react";
import type { Group, User } from "../App";

type Props = {
  groups: Group[];
  users?: User[];
  darkMode?: boolean;
};

export default function GroupManagement({
  groups,
  users = [],
  darkMode = true,
}: Props) {
  const [selectedGroup, setSelectedGroup] =
    useState<Group | null>(null);

  return (
    <div
      className={`rounded-3xl border p-8 ${
        darkMode
          ? "border-slate-800 bg-slate-900/60 text-white"
          : "border-slate-200 bg-white text-slate-900"
      }`}
    >
      {/* HEADER */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">
            Group Management
          </h2>

          <p
            className={`mt-2 ${
              darkMode
                ? "text-slate-400"
                : "text-slate-600"
            }`}
          >
            Manage permission mappings and synchronization rules.
          </p>
        </div>

        <button className="rounded-2xl bg-blue-600 px-4 py-2 text-sm font-medium text-white">
          + Create Group
        </button>
      </div>

      {/* GROUP GRID */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {groups.map((group) => (
          <div
            key={group.id}
            className={`rounded-2xl border p-5 transition ${
              darkMode
                ? "border-slate-800 bg-slate-950 hover:border-slate-700"
                : "border-slate-200 bg-slate-50 hover:border-slate-300"
            }`}
          >
            {/* HEADER */}
            <div className="mb-4 flex items-start justify-between">
              <div>
                <h3 className="font-semibold">
                  {group.name}
                </h3>

                <p
                  className={`text-sm ${
                    darkMode
                      ? "text-slate-400"
                      : "text-slate-600"
                  }`}
                >
                  Identity synchronization policy
                </p>
              </div>

              <button
                onClick={() =>
                  setSelectedGroup(group)
                }
                className="rounded-lg bg-slate-800 px-3 py-1 text-sm text-white"
              >
                Edit
              </button>
            </div>

            {/* PERMISSIONS */}
            <div className="space-y-2">
              <Permission
                label="GitHub"
                value={group.permissions.github}
                darkMode={darkMode}
              />

              <Permission
                label="Discord"
                value={group.permissions.discord}
                darkMode={darkMode}
              />

              <Permission
                label="Google"
                value={group.permissions.google}
                darkMode={darkMode}
              />
            </div>
          </div>
        ))}
      </div>

      {/* EDIT MODAL (MUST HAVE REQUIREMENT #2) */}
      {selectedGroup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div
            className={`w-[600px] rounded-2xl border p-6 ${
              darkMode
                ? "border-slate-800 bg-slate-950 text-white"
                : "border-slate-200 bg-white text-slate-900"
            }`}
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-semibold">
                {selectedGroup.name} Members
              </h3>

              <button
                onClick={() => setSelectedGroup(null)}
                className="text-sm opacity-70"
              >
                ✕
              </button>
            </div>

            {/* USERS IN GROUP */}
            <div className="space-y-2">
              {users
                .filter((u) =>
                  u.groups.includes(selectedGroup.id)
                )
                .map((u) => (
                  <div
                    key={u.id}
                    className={`flex items-center justify-between rounded-lg p-3 ${
                      darkMode
                        ? "bg-slate-900"
                        : "bg-slate-100"
                    }`}
                  >
                    <div>
                      <div className="font-medium">
                        {u.name}
                      </div>
                      <div className="text-sm opacity-70">
                        {u.email}
                      </div>
                    </div>

                    <button className="text-sm text-red-400">
                      Remove
                    </button>
                  </div>
                ))}
            </div>

            <button className="mt-4 w-full rounded-lg bg-blue-600 py-2 text-white">
              + Add User
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Permission({
  label,
  value,
  darkMode,
}: {
  label: string;
  value: string;
  darkMode: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between rounded-lg px-3 py-2 ${
        darkMode ? "bg-slate-900" : "bg-slate-100"
      }`}
    >
      <span className="text-sm">{label}</span>
      <span className="text-sm font-medium text-blue-400">
        {value}
      </span>
    </div>
  );
}