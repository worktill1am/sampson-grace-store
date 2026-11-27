"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LANGS, LANG_LABEL } from "@/lib/i18n";
import { useCart, useLang } from "./Providers";

const NAV = [
  { href: "/", key: "navHome" },
  { href: "/products", key: "navProducts" },
  { href: "/about", key: "navAbout" },
  { href: "/contact", key: "navContact" },
] as const;

export function Header() {
  const { lang, setLang, t } = useLang();
  const { items } = useCart();
  const path = usePathname();
  const count = items.reduce((n, i) => n + i.qty, 0);

  return (
    <header className="site-header">
      <div className="wrap header-row">
        <Link href="/" className="wordmark">
          Sampson Grace Prints
        </Link>
        <div className="lang" role="group" aria-label={t("language")}>
          {LANGS.map((l) => (
            <button key={l} onClick={() => setLang(l)} aria-pressed={lang === l} lang={l}>
              {LANG_LABEL[l]}
            </button>
          ))}
        </div>
      </div>
      <nav className="wrap nav">
        {NAV.map((n) => (
          <Link key={n.href} href={n.href} aria-current={path === n.href ? "page" : undefined}>
            {t(n.key)}
          </Link>
        ))}
        <Link href="/order" className="nav-order" aria-current={path === "/order" ? "page" : undefined}>
          {t("navOrder")} <span className="count" data-testid="cart-count">{count}</span>
        </Link>
      </nav>
    </header>
  );
}
