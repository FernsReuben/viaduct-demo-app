import { useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  onAddUser: (user: any) => void;
};

const steps = ["User Info", "GitHub", "Google", "Discord", "Role", "Review"];

const roleToGroupId: Record<string, string> = {
  Contributor: "g5",
  Committer: "g3",
  Maintainer: "g2",
  "Super Admin": "g1",
};

export default function OnboardingModal({ open, onClose, onAddUser }: Props) {
  const [step, setStep] = useState(0);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    github: "",
    discord: "",
    roles: ["Contributor"],
  });

  if (!open) return null;

  const next = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    }
  };

  const back = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleComplete = () => {
    const newUser = {
      id: crypto.randomUUID(),

      name: formData.name,

      email: formData.email,

      github: {
        username: formData.github,
        avatarUrl: "https://github.com/octocat.png",
        orgs: ["openbridge-dev"],
      },

      discord: {
        username: formData.discord,
        roles: formData.roles,
      },

      google: {
        email: formData.email,
        groups: formData.roles.map(
          (role) => `${role.toLowerCase()}s@openbridge.dev`,
        ),
      },

      groups: formData.roles.map((role) => roleToGroupId[role]),
    };

    onAddUser(newUser);

    onClose();

    setStep(0);

    setFormData({
      name: "",
      email: "",
      github: "",
      discord: "",
      roles: ["Contributor"],
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="w-[700px] rounded-3xl border border-slate-800 bg-slate-900 p-8 text-white shadow-2xl">
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h2 className="text-3xl font-bold">Onboard New User</h2>

            <p className="mt-2 text-slate-400">
              Provision access across connected platforms.
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 transition hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* STEPS */}
        <div className="mb-8 flex flex-wrap gap-3">
          {steps.map((label, index) => (
            <div
              key={label}
              className={`rounded-full px-4 py-2 text-sm ${
                index === step ? "bg-blue-600" : "bg-slate-800"
              }`}
            >
              {label}
            </div>
          ))}
        </div>

        {/* CONTENT */}
        <div className="min-h-[300px]">
          {step === 0 && (
            <div className="space-y-5">
              <Input
                label="Full Name"
                value={formData.name}
                onChange={(value) =>
                  setFormData({
                    ...formData,
                    name: value,
                  })
                }
              />

              <Input
                label="Email"
                value={formData.email}
                onChange={(value) =>
                  setFormData({
                    ...formData,
                    email: value,
                  })
                }
              />
            </div>
          )}

          {step === 1 && (
            <Input
              label="GitHub Username"
              value={formData.github}
              onChange={(value) =>
                setFormData({
                  ...formData,
                  github: value,
                })
              }
            />
          )}

          {step === 2 && (
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6">
              <div className="font-semibold">Google Workspace Connected</div>

              <div className="mt-2 text-slate-400">
                Workspace identity will sync automatically using:
              </div>

              <div className="mt-4 rounded-xl bg-slate-900 px-4 py-3">
                {formData.email || "-"}
              </div>
            </div>
          )}

          {step === 3 && (
            <Input
              label="Discord Username"
              value={formData.discord}
              onChange={(value) =>
                setFormData({
                  ...formData,
                  discord: value,
                })
              }
            />
          )}

          {step === 4 && (
            <div>
              <h3 className="mb-4 text-xl font-semibold">Assign Roles</h3>

              <div className="space-y-3">
                {["Contributor", "Committer", "Maintainer", "Super Admin"].map(
                  (role) => (
                    <label
                      key={role}
                      className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-950 p-4"
                    >
                      <input
                        type="checkbox"
                        checked={formData.roles.includes(role)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({
                              ...formData,
                              roles: [...formData.roles, role],
                            });
                          } else {
                            setFormData({
                              ...formData,
                              roles: formData.roles.filter((r) => r !== role),
                            });
                          }
                        }}
                        className="h-4 w-4"
                      />
                      <span>{role}</span>
                    </label>
                  ),
                )}
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6">
              <div className="space-y-4">
                <ReviewItem label="Name" value={formData.name} />

                <ReviewItem label="Email" value={formData.email} />

                <ReviewItem label="GitHub" value={formData.github} />

                <ReviewItem label="Discord" value={formData.discord} />

                <ReviewItem label="Roles" value={formData.roles.join(", ")} />
              </div>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="mt-8 flex justify-between">
          <button
            onClick={back}
            disabled={step === 0}
            className="rounded-xl bg-slate-800 px-5 py-3 transition hover:bg-slate-700 disabled:opacity-40"
          >
            Back
          </button>

          {step < steps.length - 1 ? (
            <button
              onClick={next}
              className="rounded-xl bg-blue-600 px-5 py-3 font-medium transition hover:bg-blue-500"
            >
              Continue
            </button>
          ) : (
            <button
              onClick={handleComplete}
              className="rounded-xl bg-emerald-600 px-5 py-3 font-medium transition hover:bg-emerald-500"
            >
              Complete Provisioning
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm text-slate-300">{label}</label>

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none transition focus:border-blue-500"
      />
    </div>
  );
}

function ReviewItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
      <span className="text-slate-400">{label}</span>

      <span>{value || "-"}</span>
    </div>
  );
}
