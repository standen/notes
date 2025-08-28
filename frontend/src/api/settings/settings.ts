import { BASE_URL } from "@/api/constants";

export const endpointsSettings = {
  permissions: `${BASE_URL}/settings/permissions`,
  roles: `${BASE_URL}/settings/roles`,
  users: `${BASE_URL}/settings/users`,
  allUsersLogins: `${BASE_URL}/settings/users?filter=logins`,
  allUsersRolesNames: `${BASE_URL}/settings/roles?filter=rolesNames`,
};
