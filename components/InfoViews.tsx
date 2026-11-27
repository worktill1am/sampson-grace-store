"use client";

import { OFFICES, mapsUrl, telUrl, whatsappUrl } from "@/lib/config";
import { OliveOrnament, WhatsAppIcon } from "./Icons";
import { useLang } from "./Providers";

export function AboutView() {
  const { t } = useLang();
  return (
    <article className="wrap page-flow prose-atelier">
      <header className="archive-header">
        <span className="kicker">{t("blessings")}</span>
        <h1 className="archive-title">{t("aboutTitle")}</h1>
        <p className="tagline">{t("tagline")}</p>
        <OliveOrnament size={40} className="ornament-rule" />
      </header>

      <div className="story-sheet">
        <p className="story-paragraph">{t("about1")}</p>
        <p className="story-paragraph">{t("about2")}</p>
        <blockquote className="story-motto">“{t("giftsMotto")}”</blockquote>
      </div>
    </article>
  );
}

export function ContactView() {
  const { t, l } = useLang();
  return (
    <div className="wrap page-flow">
      <header className="archive-header">
        <span className="kicker">{t("blessings")}</span>
        <h1 className="archive-title">{t("contactTitle")}</h1>
        <OliveOrnament size={40} className="ornament-rule" />
      </header>

      <div className="offices">
        {OFFICES.map((o) => (
          <section key={o.title} className="office" data-testid={o.title}>
            <span className="kicker">{t(o.title)}</span>
            <h2>{l(o.person)}</h2>
            <p className="office-addr">{o.address}</p>
            <div className="actions">
              {o.phone && (
                <>
                  <a className="btn btn-terracotta" href={telUrl(o.phone.e164)}>
                    {t("call")} {o.phone.display}
                  </a>
                  <a className="btn btn-wa" href={whatsappUrl()} target="_blank" rel="noreferrer">
                    <WhatsAppIcon size={17} />
                    <span>{t("whatsapp")}</span>
                  </a>
                </>
              )}
              <a className="btn btn-ghost" href={mapsUrl(o.address)} target="_blank" rel="noreferrer">
                {t("map")}
              </a>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
