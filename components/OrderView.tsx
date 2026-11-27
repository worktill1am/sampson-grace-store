"use client";

import Link from "next/link";
import { useState } from "react";
import { orderUrl, type CartItem } from "@/lib/order";
import { imageUrl, productBySlug } from "@/lib/products";
import { OliveOrnament, ShieldLockIcon, WhatsAppIcon } from "./Icons";
import { ProductArt } from "./ProductArt";
import { useCart, useLang } from "./Providers";
import { UpiBox } from "./UpiBox";

export function OrderView() {
  const { t, l } = useLang();
  const { items, dispatch } = useCart();
  const [customer, setCustomer] = useState({ name: "", place: "" });
  const hasPhotos = items.some((i) => i.photo);
  const waHref = orderUrl(items, customer);

  return (
    <div className="wrap page-flow order-page-wrap">
      <header className="archive-header">
        <span className="kicker">{t("howKicker")}</span>
        <h1 className="archive-title">{t("orderTitle")}</h1>
        <OliveOrnament size={40} className="ornament-rule" />
      </header>

      {items.length === 0 ? (
        <div className="empty-ledger">
          <p>{t("orderEmpty")}</p>
          <Link href="/products" className="btn btn-terracotta">
            {t("browse")} →
          </Link>
        </div>
      ) : (
        <>
          <div className="order-grid">
            <div className="order-ledger-panel">
              <ul className="lines">
                {items.map((item) => {
                  const product = productBySlug(item.slug);
                  if (!product) return null;
                  return (
                    <li key={item.id} className="line">
                      <LineImage item={item} />
                      <div className="line-details">
                        <h3>{l(product.name)}</h3>
                        {product.designs.length > 0 && (
                          <p className="line-spec">
                            {t("design")}: <strong>{item.design ?? t("ownDesign")}</strong>
                          </p>
                        )}
                        {product.options.map((o) => (
                          <p key={o.id} className="line-spec muted">
                            {l(o.label)}: {item.options[o.id]}
                          </p>
                        ))}
                        {item.text && <p className="line-verse">“{item.text}”</p>}
                        {item.photo && (
                          <p className="line-spec muted">
                            {t("photo")}: {item.photo.name}
                          </p>
                        )}
                        {item.notes && <p className="line-spec muted">{item.notes}</p>}

                        <div className="qty">
                          <button
                            type="button"
                            aria-label="-"
                            onClick={() => dispatch({ type: "qty", id: item.id, qty: item.qty - 1 })}
                          >
                            −
                          </button>
                          <span className="qty-num">{item.qty}</span>
                          <button
                            type="button"
                            aria-label="+"
                            onClick={() => dispatch({ type: "qty", id: item.id, qty: item.qty + 1 })}
                          >
                            +
                          </button>
                          <button
                            type="button"
                            className="link"
                            onClick={() => dispatch({ type: "remove", id: item.id })}
                          >
                            {t("remove")}
                          </button>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>

              <div className="customer-form-card">
                <label className="studio-field">
                  <span className="studio-label">{t("yourName")}</span>
                  <input
                    value={customer.name}
                    onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                    autoComplete="name"
                  />
                </label>
                <label className="studio-field">
                  <span className="studio-label">{t("yourPlace")}</span>
                  <input
                    value={customer.place}
                    onChange={(e) => setCustomer({ ...customer, place: e.target.value })}
                  />
                </label>

                <div className="notice">
                  <ShieldLockIcon size={16} />
                  <p>
                    {t("attachReminder")}
                    {hasPhotos && (
                      <strong className="photo-files-note">
                        {" "}
                        ({items.filter((i) => i.photo).map((i) => i.photo!.name).join(", ")})
                      </strong>
                    )}
                  </p>
                </div>

                <a
                  className="btn btn-wa btn-block"
                  href={waHref}
                  target="_blank"
                  rel="noreferrer"
                  data-testid="send-whatsapp"
                >
                  <WhatsAppIcon size={18} />
                  <span>{t("sendWhatsApp")}</span>
                </a>
              </div>
            </div>

            <UpiBox />
          </div>

          {/* Mobile Sticky Thumb-Zone Checkout Bar */}
          <div className="mobile-checkout-dock">
            <a className="btn btn-wa btn-block" href={waHref} target="_blank" rel="noreferrer">
              <WhatsAppIcon size={18} />
              <span>{t("sendWhatsApp")}</span>
            </a>
          </div>
        </>
      )}
    </div>
  );
}

function LineImage({ item }: { item: CartItem }) {
  const product = productBySlug(item.slug)!;
  const design = item.design ? product.designs.find((d) => d.phrase === item.design) : undefined;
  if (design) {
    return <img src={imageUrl(design.image, "sm")} style={{ objectFit: design.fit }} alt={design.alt} width={88} height={88} className="thumb" />;
  }
  if (item.photo) {
    return <img src={item.photo.thumb} alt="" width={88} height={88} className="thumb" />;
  }
  if (item.text) {
    return <ProductArt art={product.art} text={item.text} mini />;
  }
  if (product.sample) {
    return <img src={imageUrl(product.sample.image, "sm")} alt={product.sample.alt} width={88} height={88} className="thumb" />;
  }
  return <ProductArt art={product.art} mini />;
}
