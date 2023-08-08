//Generated by WriteToUsemodeldeletedialog_ts
import { HeroSkillDeletePayload } from "@/interfaces/HeroSkillInterfaces";
import { create } from "zustand";

type State = {
  recordsToDelete: string[];
  setRecordsToDelete: (recordsToDelete: string[]) => void;
  isDialogLoading: boolean;
  setIsDialogLoading: (isDialogLoading: boolean) => void;
  mutate?: (payload: HeroSkillDeletePayload) => void;
  setMutate: (mutate: (payload: HeroSkillDeletePayload) => void) => void;
};

// Create your store, which includes both state and (optionally) actions
const useHeroSkillDeleteDialog = create<State>((set) => ({
  recordsToDelete: [],
  setRecordsToDelete: (recordsToDelete) => set({ recordsToDelete }),
  isDialogLoading: false,
  setIsDialogLoading: (isDialogLoading) => set({ isDialogLoading }),
  setMutate: (mutate) => set({ mutate }),
}));

export { useHeroSkillDeleteDialog };
