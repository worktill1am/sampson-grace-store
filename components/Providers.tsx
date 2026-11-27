"use client";

import { createContext, useContext, useEffect, useReducer, useState, type ReactNode } from "react";
import { STRINGS, type L10n, type Lang, type StringKey } from "@/lib/i18n";
import { cartReducer, type CartAction, type CartItem } from "@/lib/order";

type LangCtx = { lang: Lang; setLang: (l: Lang) => void; t: (k: StringKey) => string; l: (v: L10n) => string };
type CartCtx = {
  items: CartItem[];
  dispatch: (a: CartAction) => void;
  drawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
};

const LangContext = createContext<LangCtx | null>(null);
const CartContext = createContext<CartCtx | null>(null);

const LANG_KEY = "sgp-lang";
const CART_KEY = "sgp-cart";

export function Providers({ children }: { children: ReactNode }) {
  const [items, dispatch] = useReducer(cartReducer, []);
  const [loaded, setLoaded] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    localStorage.removeItem(LANG_KEY);
    document.documentElement.lang = "en";
    try {
      dispatch({ type: "load", items: JSON.parse(localStorage.getItem(CART_KEY) ?? "[]") as CartItem[] });
    } catch {
      localStorage.removeItem(CART_KEY);
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) localStorage.setItem(CART_KEY, JSON.stringify(items));
  }, [items, loaded]);

  const langValue: LangCtx = {
    lang: "en",
    setLang: () => {},
    t: (k) => STRINGS[k].en,
    l: (v) => v.en,
  };

  return (
    <LangContext.Provider value={langValue}>
      <CartContext.Provider
        value={{
          items,
          dispatch,
          drawerOpen,
          openDrawer: () => setDrawerOpen(true),
          closeDrawer: () => setDrawerOpen(false),
        }}
      >
        {children}
      </CartContext.Provider>
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang outside Providers");
  return ctx;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart outside Providers");
  return ctx;
}
