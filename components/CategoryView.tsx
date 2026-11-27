"use client";

import Link from "next/link";
import { useState } from "react";
import { CATEGORIES, OCCASIONS, PRODUCTS, productsIn, type OccasionId } from "@/lib/products";
import { CheckSealIcon, OliveOrnament } from "./Icons";
import { ProductCard } from "./ProductCard";
import { useLang } from "./Providers";

export function CategoryView({ only }: { only?: string }) {
  const { t, l } = useLang();
  const [occasion, setOccasion] = useState<OccasionId>("all");
  const shown = only ? CATEGORIES.filter((c) => c.slug === only) : CATEGORIES;
  const activeCat = only ? CATEGORIES.find((c) => c.slug === only) : undefined;

  const filteredAll =
    occasion === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.occasions.includes(occasion));

  return (
    <div className="wrap page-flow">
      <header className="archive-header">
        <span className="kicker">{only ? t("departmentsKicker") : t("occasionsKicker")}</span>
        <h1 className="archive-title">{activeCat ? l(activeCat.name) : t("allProducts")}</h1>
        {activeCat && <p className="archive-sub">{l(activeCat.subtitle)}</p>}
        <OliveOrnament size={40} className="ornament-rule" />
      </header>

      <nav className="tabs" aria-label={t("navProducts")}>
        <Link href="/products" aria-current={!only ? "page" : undefined}>
          {t("allProducts")}
        </Link>
        {CATEGORIES.map((c) => (
          <Link key={c.slug} href={`/category/${c.slug}`} aria-current={only === c.slug ? "page" : undefined}>
            {l(c.name)}
          </Link>
        ))}
      </nav>

      {!only ? (
        <>
          <div className="occasion-strip" role="tablist" aria-label={t("occasionsTitle")}>
            {OCCASIONS.map((occ) => {
              const selected = occasion === occ.id;
              return (
                <button
                  key={occ.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  className={selected ? "occasion-tab active" : "occasion-tab"}
                  onClick={() => setOccasion(occ.id)}
                >
                  {selected && <CheckSealIcon size={14} />}
                  <span>{l(occ.label)}</span>
                </button>
              );
            })}
          </div>

          <div className="catalog-grid">
            {filteredAll.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </>
      ) : (
        shown.map((c) => (
          <section key={c.slug} className="department-block">
            <div className="catalog-grid">
              {productsIn(c.slug).map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
}
