const backendUrl = "http://localhost:3000";

export const endpoints = {
  permissions: {
    get: `${backendUrl}/settings/permissions`,
  },
  roles: {
    get: `${backendUrl}/settings/roles`,
  },
  users: {
    get: `${backendUrl}/settings/users`,
  },
};
