"use client";

import { useLang } from "./Providers";

export function Price({ inr }: { inr: number | null }) {
  const { t } = useLang();
  if (inr !== null) return <p className="price">₹ {inr.toLocaleString("en-IN")}</p>;
  return (
    <p className="price">
      ₹ {t("priceOnRequest")} <span className="tag tag-inline">{t("placeholderPrice")}</span>
    </p>
  );
}
