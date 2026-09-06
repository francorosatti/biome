import { create } from 'zustand';

interface UiState {
  selectedAnimalId: number | null;
  setSelectedAnimalId: (id: number | null) => void;
}

export const useUiStore = create<UiState>((set) => ({
  selectedAnimalId: null,
  setSelectedAnimalId: (id) => set({ selectedAnimalId: id }),
}));
