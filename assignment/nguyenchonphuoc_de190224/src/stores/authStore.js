// src/store/authStore.jsx
import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "./api";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      _hasHydrated: false,
      setHasHydrated: (state) => set({ _hasHydrated: state }),

      login: async (username, password) => {
        try {
          const response = await api.post("/api/accounts/login", {
            email: username,
            password: password,
          });

          const data = response.data;

          if (data && data.token) {
            set({
              user: {
                username: data.account.accountName,
                role: data.account.accountRole === 1 ? "Admin" : "Staff",
                email: data.account.accountEmail,
              },
            });

            // Keep these for legacy compatibility/api.js usage, though persist handles user state
            localStorage.setItem("token", data.token);
            localStorage.setItem("isAuthenticated", "true");
            return true;
          }
          return false;
        } catch (error) {
          return false;
        }
      },

      logout: () => {
        set({ user: null });
        localStorage.removeItem("auth");
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("token");
        localStorage.removeItem("auth-storage"); // Clear persist data
      },

      isAuthenticated: () => !!useAuthStore.getState().user,
    }),
    {
      name: "auth-storage", // unique name
      getStorage: () => localStorage, // (optional) by default, 'localStorage' is used
      onRehydrateStorage: () => (state) => {
        state.setHasHydrated(true);
      },
    },
  ),
);
