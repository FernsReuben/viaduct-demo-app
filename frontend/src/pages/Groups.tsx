import GroupManagement from "../components/GroupManagement";

import type { Group, User } from "../App";

type Props = {
  groups: Group[];
  users: User[];
  darkMode: boolean;
};

export default function GroupsPage({
  groups,
  users,
  darkMode,
}: Props) {
  return (
    <GroupManagement
      groups={groups}
      users={users}
      darkMode={darkMode}
    />
  );
}