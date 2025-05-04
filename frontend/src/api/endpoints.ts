const port = import.meta.env.VITE_BACKEND_PORT;
const backendUrl = `http://localhost:${port}`;

export const endpoints = {
  auth: {
    login: `${backendUrl}/auth/login`,
    logout: `${backendUrl}/auth/logout`,
  },
  permissions: {
    allActions: `${backendUrl}/settings/permissions`,
  },
  roles: {
    allActions: `${backendUrl}/settings/roles`,
  },
  users: {
    allActions: `${backendUrl}/settings/users`,
  },
};
