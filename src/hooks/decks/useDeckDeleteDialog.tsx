import { DeckUpdatePayload } from "@/interfaces/DeckInterfaces";
import { create } from "zustand";

type State = {
  recordsToDelete: string[];
  setRecordsToDelete: (recordsToDelete: string[]) => void;
  isDialogLoading: boolean;
  setIsDialogLoading: (isDialogLoading: boolean) => void;
  mutate?: (payload: DeckUpdatePayload) => void;
  setMutate: (mutate: (payload: DeckUpdatePayload) => void) => void;
};

// Create your store, which includes both state and (optionally) actions
const useDeckDeleteDialog = create<State>((set) => ({
  recordsToDelete: [],
  setRecordsToDelete: (recordsToDelete) => set({ recordsToDelete }),
  isDialogLoading: false,
  setIsDialogLoading: (isDialogLoading) => set({ isDialogLoading }),
  setMutate: (mutate) => set({ mutate }),
}));

export { useDeckDeleteDialog };
