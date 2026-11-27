"use client";

import Link from "next/link";
import { OFFICES, mapsUrl, telUrl } from "@/lib/config";
import { CrossEmblem } from "./Icons";
import { useLang } from "./Providers";

export function Footer() {
  const { t, l } = useLang();
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <section className="footer-col-brand">
          <div className="footer-brand-row">
            <span className="footer-seal">
              <CrossEmblem size={22} />
            </span>
            <span className="footer-wordmark">Sampson Grace Prints</span>
          </div>
          <p className="motto">“{t("giftsMotto")}”</p>
          <nav className="footer-quick-links" aria-label="Footer">
            <Link href="/products">{t("allProducts")}</Link>
            <Link href="/about">{t("navAbout")}</Link>
            <Link href="/contact">{t("navContact")}</Link>
            <Link href="/order">{t("navOrder")}</Link>
          </nav>
        </section>

        {OFFICES.map((o) => (
          <section key={o.title} className="footer-office">
            <h3>{t(o.title)}</h3>
            <p className="person">{l(o.person)}</p>
            <p>
              <a href={mapsUrl(o.address)} target="_blank" rel="noreferrer">
                {o.address}
              </a>
            </p>
            {o.phone && (
              <p className="footer-tel">
                <a href={telUrl(o.phone.e164)}>{o.phone.display}</a>
              </p>
            )}
          </section>
        ))}
      </div>
    </footer>
  );
}
