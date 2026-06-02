import GroupManagement from "../components/GroupManagement";

import type { Group, User, ExternalGroup } from "../App";

type Props = {
  groups: Group[];
  users: User[];
  externalGroups: ExternalGroup[];
  darkMode: boolean;
};

export default function GroupsPage({
  groups,
  users,
  externalGroups,
  darkMode,
}: Props) {
  return (
    <GroupManagement
      groups={groups}
      users={users}
      darkMode={darkMode}
      externalGroups={externalGroups}
    />
  );
}
