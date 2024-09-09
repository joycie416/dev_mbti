// src > zustand > bearsStore.js
import { create } from "zustand";

const useUserStore = create((set) => ({
  user: null,
  signIn: (profile) => set((state) => ({ user: profile })),
  signOut: () => set({ user: null }),
}));

export default useUserStore;