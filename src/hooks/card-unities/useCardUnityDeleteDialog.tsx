//Generated by WriteToUsemodeldeletedialog_ts - useModelDeleteDialog.ts
import { CardUnityDeletePayload } from "@/interfaces/CardUnityInterfaces";
import { create } from "zustand";

type State = {
  recordsToDelete: string[];
  setRecordsToDelete: (recordsToDelete: string[]) => void;
  isDialogLoading: boolean;
  setIsDialogLoading: (isDialogLoading: boolean) => void;
  mutate?: (payload: CardUnityDeletePayload) => void;
  setMutate: (mutate: (payload: CardUnityDeletePayload) => void) => void;
};

// Create your store, which includes both state and (optionally) actions
const useCardUnityDeleteDialog = create<State>((set) => ({
  recordsToDelete: [],
  setRecordsToDelete: (recordsToDelete) => set({ recordsToDelete }),
  isDialogLoading: false,
  setIsDialogLoading: (isDialogLoading) => set({ isDialogLoading }),
  setMutate: (mutate) => set({ mutate }),
}));

export { useCardUnityDeleteDialog };
