"use client";

import { useLang } from "./Providers";

export function Price({ inr }: { inr: number | null }) {
  const { t } = useLang();
  if (inr !== null) {
    return <p className="price">₹ {inr.toLocaleString("en-IN")}</p>;
  }
  return (
    <p className="price price-inquiry">
      <span className="price-label">₹ {t("priceOnRequest")}</span>
      <span className="quote-seal">{t("placeholderPrice")}</span>
    </p>
  );
}
