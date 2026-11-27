"use client";

import { createContext, useContext, useEffect, useReducer, useState, type ReactNode } from "react";
import { LANGS, STRINGS, type L10n, type Lang, type StringKey } from "@/lib/i18n";
import { cartReducer, type CartAction, type CartItem } from "@/lib/order";

type LangCtx = { lang: Lang; setLang: (l: Lang) => void; t: (k: StringKey) => string; l: (v: L10n) => string };
type CartCtx = { items: CartItem[]; dispatch: (a: CartAction) => void };

const LangContext = createContext<LangCtx | null>(null);
const CartContext = createContext<CartCtx | null>(null);

const LANG_KEY = "sgp-lang";
const CART_KEY = "sgp-cart";

export function Providers({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const [items, dispatch] = useReducer(cartReducer, []);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(LANG_KEY);
    if (LANGS.includes(saved as Lang)) setLang(saved as Lang);
    try {
      dispatch({ type: "load", items: JSON.parse(localStorage.getItem(CART_KEY) ?? "[]") as CartItem[] });
    } catch {
      localStorage.removeItem(CART_KEY);
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    if (loaded) localStorage.setItem(LANG_KEY, lang);
  }, [lang, loaded]);

  useEffect(() => {
    if (loaded) localStorage.setItem(CART_KEY, JSON.stringify(items));
  }, [items, loaded]);

  const langValue: LangCtx = { lang, setLang, t: (k) => STRINGS[k][lang], l: (v) => v[lang] };
  return (
    <LangContext.Provider value={langValue}>
      <CartContext.Provider value={{ items, dispatch }}>{children}</CartContext.Provider>
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
