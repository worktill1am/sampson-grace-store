"use client";

import Link from "next/link";
import { useState } from "react";
import { whatsappUrl } from "@/lib/config";
import { CATEGORIES, OCCASIONS, PRODUCTS, productsIn, type OccasionId } from "@/lib/products";
import { CheckSealIcon, CornerFlourish, OliveOrnament, WhatsAppIcon } from "./Icons";
import { ProductCard } from "./ProductCard";
import { ProductImage } from "./ProductImage";
import { useLang } from "./Providers";

const GIFT_GUIDE_TILES = [
  {
    title: "Christmas & Family",
    subtitle: "Festive Keepsake Boxes",
    href: "/products/christian-christmas-gifts",
    image: "/products/lifestyle-christmas-gifts-sm.webp",
    alt: "Sample: deep red Christmas gift box with gold ribbon and star ornament",
  },
  {
    title: "Churches & Choirs",
    subtitle: "Fellowship Totes & Mugs",
    href: "/products/church-gifts",
    image: "/products/lifestyle-church-gifts-sm.webp",
    alt: "Sample: church fellowship canvas tote and matching cream mugs",
  },
  {
    title: "Baptism & Keepsakes",
    subtitle: "Crosses & Bookmarks",
    href: "/products/christian-souvenirs",
    image: "/products/lifestyle-souvenirs-sm.webp",
    alt: "Sample: olive-wood standing cross, leather bookmark, and keepsake box",
  },
  {
    title: "Morning Devotions",
    subtitle: "Scripture Coffee Mugs",
    href: "/products/printed-coffee-mug",
    image: "/products/lifestyle-mug-sm.webp",
    alt: "Sample: cream ceramic coffee mug beside candle and leather book",
  },
];

export function HomeView() {
  const { t, l } = useLang();
  const [occasion, setOccasion] = useState<OccasionId>("all");

  const visibleProducts =
    occasion === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.occasions.includes(occasion));

  return (
    <div className="home-flow">
      {/* Section 1: Rustic Split Editorial Hero Featuring the Nativity Scene */}
      <section className="hero-band">
        <div className="wrap hero-spread">
          <div className="hero-editorial-card">
            <CornerFlourish className="corner-mark corner-tl" />
            <CornerFlourish className="corner-mark corner-tr" />
            <CornerFlourish className="corner-mark corner-bl" />
            <CornerFlourish className="corner-mark corner-br" />
            <p className="blessings">{t("blessings")}</p>
            <h1 className="hero-title">Sampson Grace Prints</h1>
            <p className="tagline">{t("tagline")}</p>
            <p className="hero-lead">{t("intro")}</p>
            <div className="hero-btn-row">
              <Link href="/products" className="btn btn-terracotta">
                Shop Christmas &amp; Keepsakes
              </Link>
              <a href={whatsappUrl()} className="btn btn-wa" target="_blank" rel="noreferrer">
                <WhatsAppIcon size={16} />
                <span>{t("chatWhatsApp")}</span>
              </a>
            </div>
          </div>

          <figure className="hero-plate">
            <div className="passpartout-frame">
              <img
                src="/hero-nativity.webp"
                alt="Nativity scene with Mary, Joseph and baby Jesus"
                width={1152}
                height={864}
                fetchPriority="high"
                className="hero-img"
              />
            </div>
            <figcaption className="plate-caption">{t("heroCaption")}</figcaption>
          </figure>
        </div>
      </section>

      {/* Section 2: Our Best Sellers & Custom Prints (House of Joppa Clean Boutique Grid) */}
      <section className="wrap" id="occasions">
        <div className="section-center-head">
          <span className="kicker">Our Best Sellers</span>
          <h2>Curated Christian Keepsakes &amp; Prints</h2>
          <p className="section-subtitle">
            Hover any piece to preview our workshop prints, or filter by gifting occasion below.
          </p>
        </div>

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
                {selected && <CheckSealIcon size={13} />}
                <span>{l(occ.label)}</span>
              </button>
            );
          })}
        </div>

        <div className="catalog-grid">
          {visibleProducts.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>

        <div className="section-cta-center">
          <Link href="/products" className="btn btn-outline-sharp">
            View All Keepsakes
          </Link>
        </div>
      </section>

      {/* Section 3: Explore by Collection (House of Joppa Square Tiles with Overlay Titles) */}
      <section className="linen-band">
        <div className="wrap">
          <div className="section-center-head">
            <span className="kicker">Explore by Collection</span>
            <h2>{t("ourProducts")}</h2>
          </div>

          <div className="categories">
            {CATEGORIES.map((c) => (
              <Link key={c.slug} href={`/category/${c.slug}`} className="category">
                <ProductImage product={productsIn(c.slug)[0]} />
                <div className="tile-caption-overlay">
                  <span className="tile-title">{l(c.name)}</span>
                  <span className="tile-sub">{l(c.subtitle)}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Christmas Gifts for Everyone on Your List (4-Column Square Gift Guide) */}
      <section className="wrap">
        <div className="section-center-head">
          <span className="kicker">Seasonal Gift Guide</span>
          <h2>Christmas Gifts for Everyone on Your List</h2>
          <p className="section-subtitle">
            Order early on WhatsApp for custom Christmas &amp; church fellowship delivery across Punjab.
          </p>
        </div>

        <div className="gift-guide-grid">
          {GIFT_GUIDE_TILES.map((tile) => (
            <Link key={tile.title} href={tile.href} className="gift-tile">
              <img src={tile.image} alt={tile.alt} width={480} height={480} loading="lazy" />
              <span className="tag tag-sample">Sample photo</span>
              <div className="tile-caption-overlay">
                <span className="tile-title">{tile.title}</span>
                <span className="tile-sub">{tile.subtitle}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Section 5: Inverted Cypress & Illuminated Gold Scripture Band */}
      <section className="wrap">
        <div className="verse-band">
          <CornerFlourish className="corner-mark corner-tl" />
          <CornerFlourish className="corner-mark corner-tr" />
          <CornerFlourish className="corner-mark corner-bl" />
          <CornerFlourish className="corner-mark corner-br" />
          <OliveOrnament size={58} className="ornament-rule" />
          <blockquote className="verse">“{t("verse")}”</blockquote>
          <p className="verse-ref">{t("verseRef")}</p>
        </div>
      </section>

      {/* Section 6: Editorial Workshop Story + Nativity Plate */}
      <section className="wrap story-split-section">
        <div className="story-split-grid">
          <div className="story-split-copy">
            <span className="kicker">Our Punjab Print Workshop</span>
            <h2>Crafted with Reverence, Confirmed Personally on WhatsApp</h2>
            <p className="story-body-p drop-cap">{t("about1")}</p>
            <p className="story-body-p">{t("about2")}</p>

            <ol className="story-steps">
              <li>
                <span className="ledger-numeral">I</span>
                <div>
                  <h3>{t("how1Title")}</h3>
                  <p>{t("how1")}</p>
                </div>
              </li>
              <li>
                <span className="ledger-numeral">II</span>
                <div>
                  <h3>{t("how2Title")}</h3>
                  <p>{t("how2")}</p>
                </div>
              </li>
              <li>
                <span className="ledger-numeral">III</span>
                <div>
                  <h3>{t("how3Title")}</h3>
                  <p>{t("how3")}</p>
                </div>
              </li>
            </ol>

            <div className="story-actions">
              <Link href="/about" className="btn btn-outline-sharp">
                Read Our Story
              </Link>
            </div>
          </div>

          <figure className="story-split-media">
            <div className="passpartout-frame">
              <img
                src="/hero-christmas.webp"
                alt="Christmas gift tabletop with red velvet ribbon parcels, cream mug, folded cotton tee, wooden cross, evergreens, and beeswax candle"
                width={1200}
                height={896}
                className="hero-img"
              />
            </div>
            <figcaption className="plate-caption">
              Hand-wrapped parcels, scripture mugs, tees &amp; keepsakes crafted to order
            </figcaption>
          </figure>
        </div>
      </section>
    </div>
  );
}
