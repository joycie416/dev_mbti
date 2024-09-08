// src > zustand > bearsStore.js
import { create } from "zustand";

const useBearsStore = create((set) => ({
  user: null,
  signIn: (profile) => set((state) => ({ user: profile })),
  signOut: () => set({ bears: null }),
}));

export default useBearsStore;