"use client";

import { OFFICES, mapsUrl, telUrl, whatsappUrl } from "@/lib/config";
import { useLang } from "./Providers";
import { Ribbon } from "./Ribbon";

export function AboutView() {
  const { t } = useLang();
  return (
    <article className="prose">
      <h1 className="section-title">{t("aboutTitle")}</h1>
      <p className="tagline center">{t("tagline")}</p>
      <p>{t("about1")}</p>
      <p>{t("about2")}</p>
      <Ribbon>{t("giftsMotto")}</Ribbon>
    </article>
  );
}

export function ContactView() {
  const { t, l } = useLang();
  return (
    <>
      <h1 className="section-title">{t("contactTitle")}</h1>
      <div className="offices">
        {OFFICES.map((o) => (
          <section key={o.title} className="office" data-testid={o.title}>
            <h2>{t(o.title)}</h2>
            <p className="person">{l(o.person)}</p>
            <p>{o.address}</p>
            <div className="actions">
              {o.phone && (
                <>
                  <a className="btn" href={telUrl(o.phone.e164)}>
                    {t("call")} {o.phone.display}
                  </a>
                  <a className="btn btn-wa" href={whatsappUrl()} target="_blank" rel="noreferrer">
                    {t("whatsapp")}
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
    </>
  );
}
