import type { User, Group } from "../App";

type Props = {
  user: User;
  groups: Group[];
  darkMode: boolean;
  onClose: () => void;
};

const groupNameMap: Record<string, string> = {
  g1: "Super Admin",
  g2: "Maintainer",
  g3: "Committer",
  g4: "Reviewer",
  g5: "Contributor",
  g6: "Community Moderator",
};

export default function UserDetailModal({ user, darkMode, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div
        className={`w-[900px] max-h-[90vh] overflow-y-auto rounded-3xl border p-8 ${
          darkMode
            ? "border-slate-800 bg-slate-950"
            : "border-slate-200 bg-white"
        }`}
      >
        {/* HEADER */}
        <div className="mb-8 flex justify-between">
          <div className="flex gap-5 items-center">
            <img
              src={user.github?.avatarUrl}
              className="h-20 w-20 rounded-full"
            />

            <div>
              <h1 className="text-3xl font-bold">{user.name}</h1>

              <p className={darkMode ? "text-slate-400" : "text-slate-600"}>
                {user.email}
              </p>
            </div>
          </div>

          <button onClick={onClose} className="text-xl">
            ✕
          </button>
        </div>

        {/* EXTERNAL IDS */}
        <section className="grid gap-4 md:grid-cols-3">
          <IdentifierCard
            title="GitHub"
            value={user.github?.username}
            darkMode={darkMode}
          />

          <IdentifierCard
            title="Discord"
            value={user.discord?.username}
            darkMode={darkMode}
          />

          <IdentifierCard
            title="Google"
            value={user.google?.email}
            darkMode={darkMode}
          />
        </section>

        {/* GROUPS */}
        <section className="mt-8">
          <h2 className="mb-4 text-xl font-semibold">Group Memberships</h2>

          <div className="flex flex-wrap gap-3">
            {user.groups.map((id) => (
              <span
                key={id}
                className="rounded-full bg-blue-600/20 px-4 py-2 text-blue-400"
              >
                {groupNameMap[id] ?? id}
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function IdentifierCard({
  title,
  value,
  darkMode,
}: {
  title: string;
  value?: string;
  darkMode: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-5 ${
        darkMode
          ? "border-slate-800 bg-slate-900"
          : "border-slate-200 bg-slate-50"
      }`}
    >
      <h3 className="font-semibold">{title}</h3>

      <p className={darkMode ? "text-slate-400" : "text-slate-600"}>
        {value ?? "Not connected"}
      </p>
    </div>
  );
}
