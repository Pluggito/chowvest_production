import { create } from "zustand";

interface UserState {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  location: string;
  createdAt?: string;
  setUser: (user: {
    id: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    location: string;
    createdAt?: string;
  }) => void;
  resetUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  id: "",
  fullName: "",
  email: "",
  phoneNumber: "",
  location: "",
  createdAt: undefined,

  setUser: (user) =>
    set({
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      location: user.location,
      createdAt: user.createdAt,
    }),

  resetUser: () =>
    set({
      id: "",
      fullName: "",
      email: "",
      phoneNumber: "",
      location: "",
      createdAt: undefined,
    }),
}));