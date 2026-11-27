"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { whatsappUrl } from "@/lib/config";
import { CloseIcon, CrossEmblem, MenuIcon, ToteIcon, WhatsAppIcon } from "./Icons";
import { useCart, useLang } from "./Providers";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Shop All" },
  { href: "/category/wear", label: "Tees & Caps" },
  { href: "/category/keepsakes", label: "Mugs & Frames" },
  { href: "/category/christmas-church", label: "Christmas & Church" },
  { href: "/about", label: "Our Story" },
  { href: "/contact", label: "Contact" },
] as const;

export function Header() {
  const { t } = useLang();
  const { items, openDrawer } = useCart();
  const path = usePathname();
  const count = items.reduce((n, i) => n + i.qty, 0);
  const mobileDialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = mobileDialogRef.current;
    if (dialog?.open) dialog.close();
  }, [path]);

  function openMobileMenu() {
    mobileDialogRef.current?.showModal();
  }

  function closeMobileMenu() {
    mobileDialogRef.current?.close();
  }

  return (
    <>
      <div className="announcement-strip">
        <div className="wrap announcement-inner">
          <span>CHRISTMAS &amp; CUSTOM FAITH KEEPSAKES · DIRECT WHATSAPP ORDERING · PAY AFTER PROOF</span>
        </div>
      </div>

      <header className="site-header">
        <div className="wrap header-top-row">
          <div className="header-left-slot">
            <button
              type="button"
              className="mobile-menu-btn"
              aria-label="Open navigation menu"
              onClick={openMobileMenu}
            >
              <MenuIcon size={20} />
            </button>
            <a href={whatsappUrl()} target="_blank" rel="noreferrer" className="header-wa-link">
              <WhatsAppIcon size={15} />
              <span>WhatsApp Studio</span>
            </a>
          </div>

          <Link href="/" className="brand-link">
            <span className="brand-seal">
              <CrossEmblem size={26} />
            </span>
            <span className="wordmark">Sampson Grace Prints</span>
          </Link>

          <div className="header-controls">
            {count > 0 && path !== "/order" && (
              <button
                type="button"
                className="drawer-peek-btn"
                onClick={openDrawer}
                aria-label={t("quickBag")}
              >
                {t("quickBag")}
              </button>
            )}

            <Link
              href="/order"
              className={path === "/order" ? "order-pill active" : "order-pill"}
              aria-current={path === "/order" ? "page" : undefined}
            >
              <ToteIcon size={16} />
              <span className="order-pill-text">{t("navOrder")}</span>
              <span className="count" data-testid="cart-count">
                {count}
              </span>
            </Link>
          </div>
        </div>

        <nav className="desktop-nav-row" aria-label="Primary">
          <div className="wrap desktop-nav">
            {NAV.map((n) => {
              const isCurrent = path === n.href;
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  className={isCurrent ? "nav-item active" : "nav-item"}
                  aria-current={isCurrent ? "page" : undefined}
                >
                  {n.label}
                </Link>
              );
            })}
          </div>
        </nav>
      </header>

      <dialog
        ref={mobileDialogRef}
        className="sheet-dialog mobile-menu-dialog"
        aria-labelledby="mobile-nav-heading"
        onClick={(e) => {
          if (e.target === mobileDialogRef.current) closeMobileMenu();
        }}
      >
        <div className="sheet-panel mobile-sheet-panel">
          <div className="sheet-head">
            <h2 id="mobile-nav-heading" className="sheet-title">
              Sampson Grace Prints
            </h2>
            <button type="button" className="icon-close-btn" onClick={closeMobileMenu} aria-label="Close menu">
              <CloseIcon size={18} />
            </button>
          </div>

          <nav className="mobile-sheet-nav" aria-label="Mobile navigation">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className={path === n.href ? "mobile-sheet-link active" : "mobile-sheet-link"}
                aria-current={path === n.href ? "page" : undefined}
                onClick={closeMobileMenu}
              >
                {n.label}
              </Link>
            ))}
            <Link href="/order" className="mobile-sheet-link" onClick={closeMobileMenu}>
              {t("navOrder")} ({count})
            </Link>
          </nav>
        </div>
      </dialog>
    </>
  );
}
