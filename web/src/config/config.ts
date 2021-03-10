const ENDPOINTS = {
  register: "/api/user",
  login: "/api/user/login",
  logout: "/api/user/logout",
  me: "/api/user/me",
  tasks: "api/task",
  deleteTask: (id: string) => `api/task/${id}`,
};

export const config = {
  server: {
    endpoints: ENDPOINTS,
  },
};
