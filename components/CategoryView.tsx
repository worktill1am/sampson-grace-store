"use client";

import Link from "next/link";
import { CATEGORIES, productsIn } from "@/lib/products";
import { ProductCard } from "./ProductCard";
import { useLang } from "./Providers";

// Without `only`, lists every category in turn.
export function CategoryView({ only }: { only?: string }) {
  const { t, l } = useLang();
  const shown = only ? CATEGORIES.filter((c) => c.slug === only) : CATEGORIES;
  return (
    <>
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
      {shown.map((c) => (
        <section key={c.slug}>
          <h1 className="section-title">{l(c.name)}</h1>
          <div className="grid">
            {productsIn(c.slug).map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      ))}
    </>
  );
}
