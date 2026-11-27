"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { orderUrl, type CartItem } from "@/lib/order";
import { imageUrl, productBySlug } from "@/lib/products";
import { CloseIcon, ToteIcon, WhatsAppIcon } from "./Icons";
import { ProductArt } from "./ProductArt";
import { useCart, useLang } from "./Providers";

export function OrderDrawer() {
  const { t, l } = useLang();
  const { items, dispatch, drawerOpen, closeDrawer } = useCart();
  const path = usePathname();
  const [customer, setCustomer] = useState({ name: "", place: "" });
  const [mountedOpen, setMountedOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (path === "/order" && drawerOpen) {
      closeDrawer();
    }
  }, [path, drawerOpen, closeDrawer]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (drawerOpen) {
      setMountedOpen(true);
      if (!dialog.open) {
        dialog.removeAttribute("data-closing");
        dialog.showModal();
      }
    } else if (dialog.open) {
      animateAndClose(dialog).then(() => setMountedOpen(false));
    } else {
      setMountedOpen(false);
    }
  }, [drawerOpen]);

  if (path === "/order") return null;

  return (
    <dialog
      ref={dialogRef}
      className="sheet-dialog order-drawer-dialog"
      aria-labelledby="order-drawer-heading"
      onCancel={(e) => {
        e.preventDefault();
        closeDrawer();
      }}
      onClick={(e) => {
        if (e.target === dialogRef.current) closeDrawer();
      }}
    >
      {mountedOpen && (
        <div className="sheet-panel order-drawer-panel">
          <div className="sheet-head">
            <div className="drawer-title-group">
              <ToteIcon size={18} />
              <h2 id="order-drawer-heading" className="sheet-title">
                {t("orderTitle")}
              </h2>
            </div>
            <button type="button" className="icon-close-btn" onClick={closeDrawer} aria-label="Close order drawer" autoFocus>
              <CloseIcon size={18} />
            </button>
          </div>

          <div className="drawer-body">
            {items.length === 0 ? (
              <div className="drawer-empty">
                <p>{t("orderEmpty")}</p>
                <Link href="/products" className="btn" onClick={closeDrawer}>
                  {t("browse")}
                </Link>
              </div>
            ) : (
              <>
                <ul className="drawer-lines">
                  {items.map((item) => {
                    const product = productBySlug(item.slug);
                    if (!product) return null;
                    return (
                      <li key={item.id} className="drawer-line">
                        <DrawerItemMedia item={item} />
                        <div className="drawer-line-info">
                          <strong>{l(product.name)}</strong>
                          {product.designs.length > 0 && (
                            <span className="drawer-meta">
                              {t("design")}: {item.design ?? t("ownDesign")}
                            </span>
                          )}
                          {item.text && <span className="drawer-quote">“{item.text}”</span>}
                          {item.photo && (
                            <span className="drawer-meta">
                              {t("photo")}: {item.photo.name}
                            </span>
                          )}
                          <div className="drawer-qty-row">
                            <button
                              type="button"
                              aria-label="Decrease item quantity"
                              onClick={() => dispatch({ type: "qty", id: item.id, qty: item.qty - 1 })}
                            >
                              −
                            </button>
                            <span>{item.qty}</span>
                            <button
                              type="button"
                              aria-label="Increase item quantity"
                              onClick={() => dispatch({ type: "qty", id: item.id, qty: item.qty + 1 })}
                            >
                              +
                            </button>
                            <button
                              type="button"
                              className="drawer-remove"
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

                <div className="drawer-customer-fields">
                  <label className="studio-field">
                    <span className="studio-label">{t("yourName")}</span>
                    <input
                      value={customer.name}
                      onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                      placeholder="Sampson / Family Name"
                    />
                  </label>
                  <label className="studio-field">
                    <span className="studio-label">{t("yourPlace")}</span>
                    <input
                      value={customer.place}
                      onChange={(e) => setCustomer({ ...customer, place: e.target.value })}
                      placeholder="Town or city"
                    />
                  </label>
                </div>
              </>
            )}
          </div>

          {items.length > 0 && (
            <div className="drawer-foot">
              <p className="drawer-note">{t("payNote")}</p>
              <a className="btn btn-wa btn-block" href={orderUrl(items, customer)} target="_blank" rel="noreferrer">
                <WhatsAppIcon size={17} />
                <span>{t("sendWhatsApp")}</span>
              </a>
              <Link href="/order" className="btn btn-ghost btn-block" onClick={closeDrawer}>
                {t("viewOrder")} &amp; {t("payTitle")} →
              </Link>
            </div>
          )}
        </div>
      )}
    </dialog>
  );
}

function DrawerItemMedia({ item }: { item: CartItem }) {
  const product = productBySlug(item.slug)!;
  const design = item.design ? product.designs.find((d) => d.phrase === item.design) : undefined;
  if (design) {
    return <img src={imageUrl(design.image, "sm")} style={{ objectFit: design.fit }} alt={design.alt} width={72} height={72} className="drawer-thumb" />;
  }
  if (item.photo) {
    return <img src={item.photo.thumb} alt="" width={72} height={72} className="drawer-thumb" />;
  }
  if (item.text) {
    return (
      <div className="drawer-mini-art">
        <ProductArt art={product.art} text={item.text} mini />
      </div>
    );
  }
  if (product.sample) {
    return <img src={imageUrl(product.sample.image, "sm")} alt={product.sample.alt} width={72} height={72} className="drawer-thumb" />;
  }
  return (
    <div className="drawer-mini-art">
      <ProductArt art={product.art} mini />
    </div>
  );
}

async function animateAndClose(dialog: HTMLDialogElement) {
  dialog.setAttribute("data-closing", "");
  const animations = dialog.getAnimations({ subtree: true });
  if (animations.length > 0) {
    await Promise.race([
      Promise.allSettled(animations.map((a) => a.finished)),
      new Promise((r) => setTimeout(r, 320)),
    ]);
  }
  dialog.removeAttribute("data-closing");
  if (dialog.open) dialog.close();
}
