import { create } from 'zustand';
import type { Product } from '@/domain/entities';
import { storage } from '@/infrastructure/storage/local-storage';

export interface QuoteLine {
  productId: string;
  name: string;
  image: string;
  quantity: number;
}

interface QuoteState {
  items: QuoteLine[];
  add: (product: Pick<Product, 'id' | 'name' | 'image'>, quantity?: number) => void;
  remove: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
  count: () => number;
}

const persist = (items: QuoteLine[]) => storage.set('quote', items);

export const useQuoteStore = create<QuoteState>((set, get) => ({
  items: storage.get<QuoteLine[]>('quote', []),
  add(product, quantity = 1) {
    set((s) => {
      const existing = s.items.find((i) => i.productId === product.id);
      const items = existing
        ? s.items.map((i) => (i.productId === product.id ? { ...i, quantity: i.quantity + quantity } : i))
        : [...s.items, { productId: product.id, name: product.name, image: product.image, quantity }];
      persist(items);
      return { items };
    });
  },
  remove(productId) {
    set((s) => {
      const items = s.items.filter((i) => i.productId !== productId);
      persist(items);
      return { items };
    });
  },
  setQuantity(productId, quantity) {
    set((s) => {
      const items = s.items.map((i) =>
        i.productId === productId ? { ...i, quantity: Math.max(1, quantity) } : i,
      );
      persist(items);
      return { items };
    });
  },
  clear() {
    persist([]);
    set({ items: [] });
  },
  count() {
    return get().items.reduce((n, i) => n + i.quantity, 0);
  },
}));
