"use client";

import Link from "next/link";
import { whatsappUrl } from "@/lib/config";
import { CATEGORIES, productsIn } from "@/lib/products";
import { ProductCard } from "./ProductCard";
import { ProductImage } from "./ProductImage";
import { useLang } from "./Providers";
import { Ribbon } from "./Ribbon";

export function HomeView() {
  const { t, l } = useLang();
  return (
    <>
      <section className="hero">
        <div className="hero-text">
          <p className="blessings">{t("blessings")}</p>
          <h1 className="hero-title">Sampson Grace Prints</h1>
          <p className="tagline">{t("tagline")}</p>
          <Ribbon>{t("celebrate")}</Ribbon>
          <p className="lead">{t("intro")}</p>
          <div className="actions">
            <Link href="/products" className="btn">
              {t("browse")}
            </Link>
            <a href={whatsappUrl()} className="btn btn-ghost" target="_blank" rel="noreferrer">
              {t("chatWhatsApp")}
            </a>
          </div>
        </div>
        <img className="hero-img" src="/hero-nativity.webp" alt="Nativity scene with Mary, Joseph and baby Jesus" width={1152} height={864} fetchPriority="high" />
      </section>

      <section className="verse-band">
        <p className="verse">“{t("verse")}”</p>
        <p className="verse-ref">{t("verseRef")}</p>
      </section>

      <section>
        <h2 className="section-title">{t("ourProducts")}</h2>
        <div className="categories">
          {CATEGORIES.map((c) => (
            <Link key={c.slug} href={`/category/${c.slug}`} className="category">
              <ProductImage product={productsIn(c.slug)[0]} />
              <span>{l(c.name)}</span>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="section-title">{t("howTitle")}</h2>
        <ol className="steps">
          <li>{t("how1")}</li>
          <li>{t("how2")}</li>
          <li>{t("how3")}</li>
        </ol>
      </section>

      <section>
        <h2 className="section-title">{t("allProducts")}</h2>
        <div className="grid">
          {CATEGORIES.flatMap((c) => productsIn(c.slug)).map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </>
  );
}
