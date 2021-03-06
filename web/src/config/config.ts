const ENDPOINTS = {
  register: "/api/user",
  login: "/api/user/login",
  logout: "/api/user/logout",
  me: "/api/user/me",
};

export const config = {
  server: {
    endpoints: ENDPOINTS,
  },
};
