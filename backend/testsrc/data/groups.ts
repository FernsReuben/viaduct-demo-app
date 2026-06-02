export const groups = [
  {
    id: "g1",
    name: "Super Admin",

    childGroups: ["g2", "g3"],

    externalGroups: ["eg1", "eg4", "eg7"],
  },

  {
    id: "g2",
    name: "Maintainer",

    childGroups: ["g3"],

    externalGroups: ["eg2", "eg5", "eg8"],
  },

  {
    id: "g3",
    name: "Committer",

    childGroups: [],

    externalGroups: ["eg3"],
  },

  {
    id: "g4",
    name: "Reviewer",

    childGroups: [],

    externalGroups: ["eg9"],
  },

  {
    id: "g5",
    name: "Contributor",

    childGroups: [],

    externalGroups: ["eg6"],
  },

  {
    id: "g6",
    name: "Community Moderator",

    childGroups: [],

    externalGroups: ["eg5", "eg6"],
  },
];
