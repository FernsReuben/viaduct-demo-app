import { useEffect, useState } from "react";
import "./App.css";

import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

import OnboardingModal from "./components/OnboardingModal";

/* PAGES */
import DashboardPage from "./pages/Dashboard";
import UsersPage from "./pages/Users";
import UserDetailPage from "./pages/UserDetail";
import GroupsPage from "./pages/Groups";
import ExternalGroupsPage from "./pages/ExternalGroups";
import ProvisioningPage from "./pages/Provisioning";
import ActivityPage from "./pages/Activity";
import SettingsPage from "./pages/Settings";

/* TYPES */

export type User = {
  id: string;
  name: string;
  email: string;

  github?: {
    username: string;
    avatarUrl?: string;
    orgs?: string[];
  };

  discord?: {
    username: string;
    roles?: string[];
  };

  google?: {
    email: string;
    groups?: string[];
  };

  groups: string[];
};

export type Group = {
  id: string;
  name: string;

  childGroups: string[];

  externalGroups: string[];
};

export type Activity = {
  id: string;
  action: string;
  user: string;
  timestamp: string;
  status: string;
};

export type ExternalGroup = {
  id: string;
  provider: string;
  name: string;

  mappedGroups: string[];
};

const API_URL = "http://localhost:3001";

export default function App() {
  const [users, setUsers] = useState<User[]>([]);

  const [groups, setGroups] = useState<Group[]>([]);

  const [activity, setActivity] = useState<Activity[]>([]);

  const [onboardingOpen, setOnboardingOpen] = useState(false);

  const [darkMode, setDarkMode] = useState(true);

  const [externalGroups, setExternalGroups] = useState<ExternalGroup[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/users`)
      .then((res) => res.json())
      .then(setUsers);

    fetch(`${API_URL}/groups`)
      .then((res) => res.json())
      .then(setGroups);

    fetch(`${API_URL}/activity`)
      .then((res) => res.json())
      .then(setActivity);

    fetch(`${API_URL}/external-groups`)
      .then((res) => res.json())
      .then(setExternalGroups);
  }, []);

  const addUser = (user: User) => {
    setUsers((prev) => [...prev, user]);

    setActivity((prev) => [
      {
        id: crypto.randomUUID(),
        action: "Completed onboarding workflow",
        user: user.name,
        timestamp: "Just now",
        status: "success",
      },
      ...prev,
    ]);
  };

  return (
    <BrowserRouter>
      <div
        className={`min-h-screen transition-colors duration-300 ${
          darkMode ? "bg-slate-950 text-white" : "bg-slate-100 text-slate-900"
        }`}
      >
        <div className="flex min-h-screen">
          {/* SIDEBAR */}
          <aside
            className={`w-72 border-r backdrop-blur-xl transition-colors duration-300 ${
              darkMode
                ? "border-slate-800 bg-slate-950/80"
                : "border-slate-300 bg-white/80"
            }`}
          >
            <div className="flex h-full flex-col p-6">
              {/* LOGO */}
              <div className="mb-10">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 font-bold text-white">
                    V
                  </div>

                  <div>
                    <h1 className="text-2xl font-bold tracking-tight">
                      Viaduct
                    </h1>

                    <p
                      className={`text-sm ${
                        darkMode ? "text-slate-400" : "text-slate-600"
                      }`}
                    >
                      Identity orchestration
                    </p>
                  </div>
                </div>
              </div>

              {/* NAV */}
              <nav className="space-y-2">
                <SidebarLink to="/" label="Dashboard" darkMode={darkMode} />

                <SidebarLink to="/users" label="Users" darkMode={darkMode} />

                <SidebarLink
                  to="/groups"
                  label="Internal Groups"
                  darkMode={darkMode}
                />

                <SidebarLink
                  to="/external-groups"
                  label="External Groups"
                  darkMode={darkMode}
                />

                <SidebarLink
                  to="/provisioning"
                  label="Provisioning"
                  darkMode={darkMode}
                />

                <SidebarLink
                  to="/activity"
                  label="Activity"
                  darkMode={darkMode}
                />

                <SidebarLink
                  to="/settings"
                  label="Settings"
                  darkMode={darkMode}
                />
              </nav>

              {/* STATUS */}
              <div
                className={`mt-auto rounded-3xl border p-5 transition-colors duration-300 ${
                  darkMode
                    ? "border-slate-800 bg-slate-900/80"
                    : "border-slate-300 bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-400" />

                  <span className="font-medium">Systems Operational</span>
                </div>

                <p
                  className={`mt-2 text-sm ${
                    darkMode ? "text-slate-400" : "text-slate-600"
                  }`}
                >
                  Synchronization pipelines active and healthy.
                </p>
              </div>
            </div>
          </aside>

          {/* MAIN */}
          <main className="flex-1">
            {/* HEADER */}
            <header
              className={`sticky top-0 z-10 border-b backdrop-blur-xl transition-colors duration-300 ${
                darkMode
                  ? "border-slate-800 bg-slate-950/70"
                  : "border-slate-300 bg-white/70"
              }`}
            >
              <div className="flex items-center justify-between px-10 py-6">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight">
                    Identity Control Plane
                  </h2>

                  <p
                    className={`mt-2 ${
                      darkMode ? "text-slate-400" : "text-slate-600"
                    }`}
                  >
                    Centralized onboarding, permissions, and cross-platform
                    synchronization.
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    className={`rounded-2xl border px-5 py-3 font-medium transition ${
                      darkMode
                        ? "border-slate-700 bg-slate-900 hover:border-slate-600 hover:bg-slate-800"
                        : "border-slate-300 bg-white hover:bg-slate-100"
                    }`}
                  >
                    View Audit Logs
                  </button>

                  <button
                    onClick={() => setOnboardingOpen(true)}
                    className="rounded-2xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-500"
                  >
                    + Onboard User
                  </button>
                </div>
              </div>
            </header>

            {/* ROUTES */}
            <div className="p-10">
              <Routes>
                <Route
                  path="/"
                  element={
                    <DashboardPage
                      users={users}
                      groups={groups}
                      activity={activity}
                      darkMode={darkMode}
                    />
                  }
                />

                <Route
                  path="/users"
                  element={<UsersPage users={users} darkMode={darkMode} />}
                />

                <Route
                  path="/users/:userId"
                  element={
                    <UserDetailPage
                      users={users}
                      groups={groups}
                      darkMode={darkMode}
                    />
                  }
                />

                <Route
                  path="/groups"
                  element={
                    <GroupsPage
                      groups={groups}
                      users={users}
                      externalGroups={externalGroups}
                      darkMode={darkMode}
                    />
                  }
                />

                <Route
                  path="/external-groups"
                  element={<ExternalGroupsPage darkMode={darkMode} />}
                />

                <Route
                  path="/provisioning"
                  element={<ProvisioningPage darkMode={darkMode} />}
                />

                <Route
                  path="/activity"
                  element={
                    <ActivityPage activity={activity} darkMode={darkMode} />
                  }
                />

                <Route
                  path="/settings"
                  element={
                    <SettingsPage
                      darkMode={darkMode}
                      setDarkMode={setDarkMode}
                    />
                  }
                />
              </Routes>
            </div>
          </main>
        </div>

        {/* MODAL */}
        <OnboardingModal
          open={onboardingOpen}
          onClose={() => setOnboardingOpen(false)}
          onAddUser={addUser}
        />
      </div>
    </BrowserRouter>
  );
}

/* COMPONENTS */

function SidebarLink({
  to,
  label,
  darkMode,
}: {
  to: string;
  label: string;
  darkMode: boolean;
}) {
  return (
    <NavLink
      to={to}
      end={to === "/"}
      className={({ isActive }) =>
        `flex w-full items-center rounded-2xl px-4 py-3 font-medium transition ${
          isActive
            ? "bg-blue-600 text-white"
            : darkMode
              ? "text-slate-300 hover:bg-slate-900"
              : "text-slate-700 hover:bg-slate-100"
        }`
      }
    >
      {label}
    </NavLink>
  );
}
