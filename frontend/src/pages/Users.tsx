type Props = {
  users: any[];
  darkMode: boolean;
};

export default function UsersPage({
  users,
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
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">
            Users
          </h2>

          <p
            className={`mt-2 ${
              darkMode
                ? "text-slate-400"
                : "text-slate-600"
            }`}
          >
            Managed contributor identities
            across connected providers.
          </p>
        </div>

        <div
          className={`rounded-2xl border px-4 py-2 text-sm ${
            darkMode
              ? "border-slate-700 bg-slate-950 text-slate-300"
              : "border-slate-300 bg-slate-100 text-slate-700"
          }`}
        >
          {users.length} managed identities
        </div>
      </div>

      <div
        className={`overflow-hidden rounded-2xl border ${
          darkMode
            ? "border-slate-800"
            : "border-slate-300"
        }`}
      >
        <table className="w-full">
          <thead
            className={
              darkMode
                ? "bg-slate-900"
                : "bg-slate-100"
            }
          >
            <tr
              className={`text-left text-sm ${
                darkMode
                  ? "text-slate-400"
                  : "text-slate-600"
              }`}
            >
              <th className="px-6 py-4">
                User
              </th>

              <th className="px-6 py-4">
                Role
              </th>

              <th className="px-6 py-4">
                GitHub
              </th>

              <th className="px-6 py-4">
                Discord
              </th>

              <th className="px-6 py-4">
                Organizations
              </th>

              <th className="px-6 py-4">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {users.map((user: any) => (
              <tr
                key={user.id}
                className={`border-t transition ${
                  darkMode
                    ? "border-slate-800 hover:bg-slate-900/40"
                    : "border-slate-200 hover:bg-slate-50"
                }`}
              >
                <td className="px-6 py-5">
                  <div className="flex items-center gap-4">
                    <img
                      src={
                        user.github?.avatarUrl
                      }
                      alt={user.name}
                      className={`h-11 w-11 rounded-full border ${
                        darkMode
                          ? "border-slate-700"
                          : "border-slate-300"
                      }`}
                    />

                    <div>
                      <div className="font-medium">
                        {user.name}
                      </div>

                      <div
                        className={`mt-1 text-sm ${
                          darkMode
                            ? "text-slate-400"
                            : "text-slate-600"
                        }`}
                      >
                        {user.email}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-5">
                  <div className="flex flex-wrap gap-2">
                    {user.groups.map(
                      (group: string) => (
                        <span
                          key={group}
                          className="rounded-full bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-500"
                        >
                          {group.replace(
                            "_",
                            " "
                          )}
                        </span>
                      )
                    )}
                  </div>
                </td>

                <td
                  className={`px-6 py-5 ${
                    darkMode
                      ? "text-slate-300"
                      : "text-slate-700"
                  }`}
                >
                  @{user.github?.username}
                </td>

                <td
                  className={`px-6 py-5 ${
                    darkMode
                      ? "text-slate-300"
                      : "text-slate-700"
                  }`}
                >
                  {user.discord?.username}
                </td>

                <td className="px-6 py-5">
                  <div className="flex flex-wrap gap-2">
                    {user.github?.orgs?.map(
                      (org: string) => (
                        <span
                          key={org}
                          className={`rounded-lg px-2 py-1 text-xs ${
                            darkMode
                              ? "bg-slate-800 text-slate-300"
                              : "bg-slate-200 text-slate-700"
                          }`}
                        >
                          {org}
                        </span>
                      )
                    )}
                  </div>
                </td>

                <td className="px-6 py-5">
                  <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-sm text-emerald-500">
                    Synced
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}