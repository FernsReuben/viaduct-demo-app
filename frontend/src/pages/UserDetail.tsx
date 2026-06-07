import { useNavigate, useParams } from "react-router-dom";
import type { User, Group } from "../App";

type Props = {
  users: User[];
  groups: Group[];
  darkMode: boolean;
};

const groupNameMap: Record<string, string> = {
  g1: "Super Admin",
  g2: "Maintainer",
  g3: "Committer",
  g4: "Reviewer",
  g5: "Contributor",
  g6: "Community Moderator",
};

export default function UserDetailPage({ users, groups, darkMode }: Props) {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const user = users.find((u) => u.id === userId);

  if (!user) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold">User not found</h1>
        <button
          onClick={() => navigate("/users")}
          className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white"
        >
          Back to Users
        </button>
      </div>
    );
  }

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
          <div className="flex items-center gap-6">
            <img
              src={user.github?.avatarUrl}
              alt={user.name}
              className={`h-20 w-20 rounded-full border-4 ${
                darkMode ? "border-slate-700" : "border-slate-300"
              }`}
            />
            <div>
              <h1 className="text-3xl font-bold">{user.name}</h1>
              <p
                className={`mt-2 ${
                  darkMode ? "text-slate-400" : "text-slate-600"
                }`}
              >
                {user.email}
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate("/users")}
            className={`rounded-2xl border px-5 py-3 font-medium transition ${
              darkMode
                ? "border-slate-700 bg-slate-900 hover:border-slate-600 hover:bg-slate-800"
                : "border-slate-300 bg-white hover:bg-slate-100"
            }`}
          >
            ← Back
          </button>
        </div>
      </section>

      {/* EXTERNAL IDENTIFIERS */}
      <section
        className={`rounded-3xl border p-8 ${
          darkMode
            ? "border-slate-800 bg-slate-900/60"
            : "border-slate-200 bg-white"
        }`}
      >
        <h2 className="mb-6 text-2xl font-semibold">External Identifiers</h2>

        <div className="grid gap-6 md:grid-cols-3">
          {/* GitHub */}
          <div
            className={`rounded-2xl border p-6 ${
              darkMode
                ? "border-slate-800 bg-slate-950"
                : "border-slate-200 bg-slate-50"
            }`}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">GitHub</h3>
              <span
                className={`rounded-full px-3 py-1 text-sm ${
                  darkMode
                    ? "bg-gray-700 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                Connected
              </span>
            </div>

            <div className="mt-4 space-y-3">
              <div>
                <div
                  className={`text-sm ${
                    darkMode ? "text-slate-400" : "text-slate-600"
                  }`}
                >
                  Username
                </div>
                <div className="mt-1 font-medium">@{user.github?.username}</div>
              </div>

              {user.github?.orgs && (
                <div>
                  <div
                    className={`text-sm ${
                      darkMode ? "text-slate-400" : "text-slate-600"
                    }`}
                  >
                    Organizations
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {user.github.orgs.map((org) => (
                      <span
                        key={org}
                        className="rounded-full bg-blue-600/20 px-3 py-1 text-sm text-blue-400"
                      >
                        {org}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Discord */}
          <div
            className={`rounded-2xl border p-6 ${
              darkMode
                ? "border-slate-800 bg-slate-950"
                : "border-slate-200 bg-slate-50"
            }`}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Discord</h3>
              <span
                className={`rounded-full px-3 py-1 text-sm ${
                  darkMode
                    ? "bg-gray-700 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                Connected
              </span>
            </div>

            <div className="mt-4 space-y-3">
              <div>
                <div
                  className={`text-sm ${
                    darkMode ? "text-slate-400" : "text-slate-600"
                  }`}
                >
                  Username
                </div>
                <div className="mt-1 font-medium">{user.discord?.username}</div>
              </div>

              {user.discord?.roles && (
                <div>
                  <div
                    className={`text-sm ${
                      darkMode ? "text-slate-400" : "text-slate-600"
                    }`}
                  >
                    Roles
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {user.discord.roles.map((role) => (
                      <span
                        key={role}
                        className="rounded-full bg-purple-600/20 px-3 py-1 text-sm text-purple-400"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Google */}
          <div
            className={`rounded-2xl border p-6 ${
              darkMode
                ? "border-slate-800 bg-slate-950"
                : "border-slate-200 bg-slate-50"
            }`}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Google</h3>
              <span
                className={`rounded-full px-3 py-1 text-sm ${
                  darkMode
                    ? "bg-gray-700 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                Connected
              </span>
            </div>

            <div className="mt-4 space-y-3">
              <div>
                <div
                  className={`text-sm ${
                    darkMode ? "text-slate-400" : "text-slate-600"
                  }`}
                >
                  Email
                </div>
                <div className="mt-1 font-medium">{user.google?.email}</div>
              </div>

              {user.google?.groups && (
                <div>
                  <div
                    className={`text-sm ${
                      darkMode ? "text-slate-400" : "text-slate-600"
                    }`}
                  >
                    Groups
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {user.google.groups.map((group) => (
                      <span
                        key={group}
                        className="rounded-full bg-amber-600/20 px-3 py-1 text-sm text-amber-400"
                      >
                        {group}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* GROUP MEMBERSHIPS */}
      <section
        className={`rounded-3xl border p-8 ${
          darkMode
            ? "border-slate-800 bg-slate-900/60"
            : "border-slate-200 bg-white"
        }`}
      >
        <h2 className="mb-6 text-2xl font-semibold">Group Memberships</h2>

        <div className="grid gap-4 md:grid-cols-2">
          {user.groups.length === 0 ? (
            <p className={`${darkMode ? "text-slate-400" : "text-slate-600"}`}>
              No group memberships
            </p>
          ) : (
            user.groups.map((groupId) => {
              const groupName = groupNameMap[groupId] || groupId;
              const groupData = groups.find((g) => g.id === groupId);

              return (
                <div
                  key={groupId}
                  className={`rounded-2xl border p-6 ${
                    darkMode
                      ? "border-slate-800 bg-slate-950"
                      : "border-slate-200 bg-slate-50"
                  }`}
                >
                  <h3 className="text-lg font-semibold">{groupName}</h3>

                  {groupData?.childGroups &&
                    groupData.childGroups.length > 0 && (
                      <div className="mt-4">
                        <div
                          className={`text-sm ${
                            darkMode ? "text-slate-400" : "text-slate-600"
                          }`}
                        >
                          Inherited Groups
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {groupData.childGroups.map((childId) => {
                            const childName =
                              groups.find((g) => g.id === childId)?.name ||
                              childId;
                            return (
                              <span
                                key={childId}
                                className="rounded-full bg-blue-600/20 px-3 py-1 text-sm text-blue-400"
                              >
                                {childName}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    )}
                </div>
              );
            })
          )}
        </div>
      </section>
    </div>
  );
}
