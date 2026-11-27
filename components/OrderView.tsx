"use client";

import Link from "next/link";
import { useState } from "react";
import { orderUrl } from "@/lib/order";
import { imageUrl, productBySlug } from "@/lib/products";
import { ProductArt } from "./ProductArt";
import type { CartItem } from "@/lib/order";
import { useCart, useLang } from "./Providers";
import { UpiBox } from "./UpiBox";

export function OrderView() {
  const { t, l } = useLang();
  const { items, dispatch } = useCart();
  const [customer, setCustomer] = useState({ name: "", place: "" });

  return (
    <>
      <h1 className="section-title">{t("orderTitle")}</h1>
      {items.length === 0 ? (
        <p className="center">
          {t("orderEmpty")} <Link href="/products">{t("browse")} →</Link>
        </p>
      ) : (
        <div className="order-grid">
          <div>
            <ul className="lines">
              {items.map((item) => {
                const product = productBySlug(item.slug);
                if (!product) return null;
                return (
                  <li key={item.id} className="line">
                    <LineImage item={item} />
                    <div>
                      <h3>{l(product.name)}</h3>
                      {product.designs.length > 0 && (
                        <p>
                          {t("design")}: {item.design ?? t("ownDesign")}
                        </p>
                      )}
                      {product.options.map((o) => (
                        <p key={o.id} className="muted">
                          {l(o.label)}: {item.options[o.id]}
                        </p>
                      ))}
                      {item.text && <p>“{item.text}”</p>}
                      {item.photo && (
                        <p className="muted">
                          {t("photo")}: {item.photo.name}
                        </p>
                      )}
                      {item.notes && <p className="muted">{item.notes}</p>}
                      <div className="qty">
                        <button aria-label="-" onClick={() => dispatch({ type: "qty", id: item.id, qty: item.qty - 1 })}>
                          −
                        </button>
                        <span>{item.qty}</span>
                        <button aria-label="+" onClick={() => dispatch({ type: "qty", id: item.id, qty: item.qty + 1 })}>
                          +
                        </button>
                        <button className="link" onClick={() => dispatch({ type: "remove", id: item.id })}>
                          {t("remove")}
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
            <label>
              {t("yourName")}
              <input value={customer.name} onChange={(e) => setCustomer({ ...customer, name: e.target.value })} autoComplete="name" />
            </label>
            <label>
              {t("yourPlace")}
              <input value={customer.place} onChange={(e) => setCustomer({ ...customer, place: e.target.value })} />
            </label>
            <p className="notice">{t("attachReminder")}</p>
            <a className="btn btn-wa" href={orderUrl(items, customer)} target="_blank" rel="noreferrer" data-testid="send-whatsapp">
              {t("sendWhatsApp")}
            </a>
          </div>
          <UpiBox />
        </div>
      )}
    </>
  );
}

function LineImage({ item }: { item: CartItem }) {
  const product = productBySlug(item.slug)!;
  const design = item.design ? product.designs.find((d) => d.phrase === item.design) : undefined;
  if (design) return <img src={imageUrl(design.image, "sm")} style={{ objectFit: design.fit }} alt={design.alt} className="thumb" />;
  if (item.photo) return <img src={item.photo.thumb} alt="" className="thumb" />;
  if (product.sample) return <img src={imageUrl(product.sample.image, "sm")} alt={product.sample.alt} className="thumb" />;
  return <ProductArt art={product.art} />;
}
