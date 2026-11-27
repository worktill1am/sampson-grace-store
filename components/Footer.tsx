"use client";

import { OFFICES, mapsUrl, telUrl } from "@/lib/config";
import { useLang } from "./Providers";

export function Footer() {
  const { t, l } = useLang();
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        {OFFICES.map((o) => (
          <section key={o.title}>
            <h3>{t(o.title)}</h3>
            <p className="person">{l(o.person)}</p>
            <p>
              <a href={mapsUrl(o.address)} target="_blank" rel="noreferrer">
                {o.address}
              </a>
            </p>
            {o.phone && (
              <p>
                <a href={telUrl(o.phone.e164)}>{o.phone.display}</a>
              </p>
            )}
          </section>
        ))}
        <p className="motto">{t("giftsMotto")}</p>
      </div>
    </footer>
  );
}
