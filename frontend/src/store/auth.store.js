// import { create } from "zustand";

// const useAuthStore = create((set) => ({
//   user: null,
//   accessToken: null,
//   refreshToken: null,
//   isAuthenticated: false,
//   isLoading: false,

//   setLoading: (loading) =>
//     set({
//       isLoading: loading,
//     }),

//   setUser: (user) =>
//     set({
//       user,
//       isAuthenticated: true,
//     }),

//   setTokens: ({ accessToken, refreshToken }) =>
//     set({
//       accessToken,
//       refreshToken,
//     }),

//   logout: () =>
//     set({
//       user: null,
//       accessToken: null,
//       refreshToken: null,
//       isAuthenticated: false,
//     }),
// }));

// export default useAuthStore;

import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: null,

  isAuthenticated: false,

  isLoading: false,

  login(user) {
    set({
      user,
      isAuthenticated: true,
    });
  },

  initialize(user) {
    set({
      user,
      isAuthenticated: !!user,
      isLoading: false,
    });
  },

  logout() {
    set({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  },

  setLoading(loading) {
    set({
      isLoading: loading,
    });
  },
}));

export default useAuthStore;
