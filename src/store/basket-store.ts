import { create } from "zustand";

interface Basket {
  id: string;
  name: string;
  commodityType: string | null;
  image: string | null;
  goalAmount: number;
  currentAmount: number;
  description: string | null;
  targetDate: string | null;
  regularTopUp: number | null;
  category: string;
  status: "ACTIVE" | "COMPLETED" | "PAUSED" | "CANCELLED";
  createdAt: string;
}

interface BasketState {
  baskets: Basket[];
  setBaskets: (baskets: Basket[]) => void;
  addBasket: (basket: Basket) => void;
  updateBasket: (id: string, updates: Partial<Basket>) => void;
  deleteBasket: (id: string) => void;
  resetBaskets: () => void;
}

export const useBasketStore = create<BasketState>((set) => ({
  baskets: [],

  setBaskets: (baskets) => set({ baskets }),

  addBasket: (basket) =>
    set((state) => ({
      baskets: [basket, ...state.baskets],
    })),

  updateBasket: (id, updates) =>
    set((state) => ({
      baskets: state.baskets.map((basket) =>
        basket.id === id ? { ...basket, ...updates } : basket
      ),
    })),

  deleteBasket: (id) =>
    set((state) => ({
      baskets: state.baskets.filter((basket) => basket.id !== id),
    })),

  resetBaskets: () => set({ baskets: [] }),
}));
