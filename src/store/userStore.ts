import { User } from "@prisma/client";
import { create } from "zustand";

type Store = {
  user: User | null;
  isDialogOpen: boolean;
  isAlertOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
  setIsAlertOpen: (open: boolean) => void;
  onEditClick: (data: User) => void;
  onDeleteClick: (data: User) => void;
};

export const useUserStore = create<Store>((set, get) => ({
  user: null,
  isDialogOpen: false,
  isAlertOpen: false,
  setIsDialogOpen: (open: boolean) => set({ isDialogOpen: open }),
  setIsAlertOpen: (open: boolean) => set({ isAlertOpen: open }),
  onEditClick: (data: User) => {
    set({ user: data });
    get().setIsDialogOpen(true);
  },
  onDeleteClick: (data: User) => {
    set({ user: data });
    get().setIsAlertOpen(true);
  },
}));
