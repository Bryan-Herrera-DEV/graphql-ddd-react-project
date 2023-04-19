import { type IUser } from "../interfaces/utils.interface";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  token: string;
  user: IUser | null;
  isAuth: boolean;
  userId: number | null;
}

interface Actions {
  setToken: (token: string) => void;
  setUser: (user: IUser) => void;
  setUserId: (userId: number) => void;
}

export const useAuthStore = create(
  persist<State & Actions>(
    (set) => ({
      token: "",
      user: null,
      isAuth: false,
      userId: null,
      setToken: (token: string) => {
        set(() => ({ token, isAuth: !!token }));
      },
      setUser: (user: IUser) => {
        set(() => ({ user }));
      },
      setUserId: (userId: number) => {
        set(() => ({ userId }));
      }
    }),
    {
      name: "auth",
    }
  )
);
