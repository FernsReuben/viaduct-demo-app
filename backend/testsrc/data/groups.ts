export const groups = [
  {
    id: "g1",
    name: "Super Admin",

    permissions: {
      github: "admin",
      discord: "administrator",
      google: "super_admin",
    },
  },

  {
    id: "g2",
    name: "Maintainer",

    permissions: {
      github: "write",
      discord: "moderator",
      google: "admin_docs",
    },
  },

  {
    id: "g3",
    name: "Committer",

    permissions: {
      github: "push",
      discord: "trusted_member",
      google: "engineering_docs",
    },
  },

  {
    id: "g4",
    name: "Reviewer",

    permissions: {
      github: "triage",
      discord: "reviewer",
      google: "review_access",
    },
  },

  {
    id: "g5",
    name: "Contributor",

    permissions: {
      github: "read",
      discord: "member",
      google: "docs_access",
    },
  },

  {
    id: "g6",
    name: "Community Moderator",

    permissions: {
      github: "none",
      discord: "moderator",
      google: "community_access",
    },
  },
];