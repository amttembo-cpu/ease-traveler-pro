import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Pkg } from "./packages";

export type CartItem = {
  pkg: Pkg;
  travelers: number;
};

type CartCtx = {
  items: CartItem[];
  add: (pkg: Pkg, travelers?: number) => void;
  remove: (id: string) => void;
  setTravelers: (id: string, n: number) => void;
  clear: () => void;
  count: number;
  total: number;
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "easetraveler_cart_v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(items)); } catch {}
  }, [items]);

  const add: CartCtx["add"] = (pkg, travelers = 2) => {
    setItems((cur) => {
      if (cur.find((i) => i.pkg.id === pkg.id)) return cur;
      return [...cur, { pkg, travelers }];
    });
  };
  const remove = (id: string) => setItems((c) => c.filter((i) => i.pkg.id !== id));
  const setTravelers = (id: string, n: number) =>
    setItems((c) => c.map((i) => (i.pkg.id === id ? { ...i, travelers: Math.max(1, n) } : i)));
  const clear = () => setItems([]);

  const count = items.length;
  const total = items.reduce((s, i) => s + i.pkg.priceUSD * i.travelers, 0);

  return (
    <Ctx.Provider value={{ items, add, remove, setTravelers, clear, count, total }}>
      {children}
    </Ctx.Provider>
  );
}

export const useCart = () => {
  const v = useContext(Ctx);
  if (!v) throw new Error("useCart outside CartProvider");
  return v;
};
