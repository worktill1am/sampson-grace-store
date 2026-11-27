"use client";

import Link from "next/link";
import { useState } from "react";
import { categoryBySlug, imageUrl, type Product } from "@/lib/products";
import { Price } from "./Price";
import { ProductArt } from "./ProductArt";
import { ProductImage } from "./ProductImage";
import { useCart, useLang } from "./Providers";

type Photo = { name: string; url: string; thumb: string };
// What the customer wants printed. "none" only happens while a sample photo leads and nothing is picked yet.
type Choice = { kind: "none" } | { kind: "design"; id: string } | { kind: "own" };

export function ProductView({ product }: { product: Product }) {
  const { t, l } = useLang();
  const { dispatch } = useCart();
  const [photo, setPhoto] = useState<Photo | null>(null);
  const [text, setText] = useState("");
  const [notes, setNotes] = useState("");
  const [qty, setQty] = useState(1);
  const [options, setOptions] = useState<Record<string, string>>(() =>
    Object.fromEntries(product.options.map((o) => [o.id, o.choices[0]])),
  );
  const [choice, setChoice] = useState<Choice>(() =>
    product.sample && product.designs.length
      ? { kind: "none" }
      : product.designs[0]
        ? { kind: "design", id: product.designs[0].id }
        : { kind: "own" },
  );
  const [added, setAdded] = useState(false);
  const design = choice.kind === "design" ? product.designs.find((d) => d.id === choice.id) ?? null : null;
  const ownWork = product.customizable && choice.kind === "own";
  const category = categoryBySlug(product.category);

  async function pickPhoto(file: File | undefined) {
    if (!file) return;
    if (photo) URL.revokeObjectURL(photo.url);
    const url = URL.createObjectURL(file);
    setPhoto({ name: file.name, url, thumb: await thumbnail(url) });
  }

  function add() {
    dispatch({
      type: "add",
      item: {
        id: crypto.randomUUID(),
        slug: product.slug,
        qty,
        options,
        design: design?.phrase ?? null,
        text: ownWork ? text.trim() : "",
        notes: notes.trim(),
        photo: ownWork && photo ? { name: photo.name, thumb: photo.thumb } : null,
      },
    });
    setAdded(true);
  }

  return (
    <article className="product">
      {category && (
        <Link href={`/category/${category.slug}`} className="crumb">
          ← {l(category.name)}
        </Link>
      )}
      <div className="product-grid">
        <div>
          {design ? (
            <img
              key={design.id}
              className="photo main-photo"
              src={imageUrl(design.image, "lg")}
              alt={design.alt}
              width={1200}
              height={1200}
              style={{ backgroundImage: `url(${imageUrl(design.image, "sm")})` }}
            />
          ) : choice.kind === "own" && product.designs.length ? (
            <>
              <ProductArt art={product.art} photo={photo?.url} text={text} />
              <p className="muted center">{t("preview")}</p>
            </>
          ) : (
            <ProductImage product={product} size="lg" />
          )}

        </div>
        <form
          className="customize"
          onSubmit={(e) => {
            e.preventDefault();
            add();
          }}
        >
          <h1>{l(product.name)}</h1>
          <p>{l(product.blurb)}</p>
          <Price inr={product.priceInr} />
          {product.designs.length > 0 && (
            <fieldset className="designs">
              <legend>{t("pickDesign")}</legend>
              {product.designs.map((d) => (
                <label key={d.id} className="design">
                  <input type="radio" name="design" checked={choice.kind === "design" && choice.id === d.id} onChange={() => setChoice({ kind: "design", id: d.id })} />
                  <img src={imageUrl(d.image, "sm")} style={{ objectFit: d.fit }} alt={d.alt} width={480} height={480} loading="lazy" />
                  <span>{d.phrase}</span>
                </label>
              ))}
              <label className="design design-own">
                <input type="radio" name="design" checked={choice.kind === "own"} onChange={() => setChoice({ kind: "own" })} />
                <ProductArt art={product.art} />
                <span>{t("ownDesign")}</span>
              </label>
            </fieldset>
          )}

          {product.options.map((o) => (
            <label key={o.id}>
              {l(o.label)}
              <select value={options[o.id]} onChange={(e) => setOptions({ ...options, [o.id]: e.target.value })}>
                {o.choices.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </label>
          ))}

          {design && (
            <p className="chosen" data-testid="chosen-design">
              {t("design")}: <strong>{design.phrase}</strong>
            </p>
          )}

          {ownWork && (
            <>
              <label className="file">
                {t("yourPhoto")}
                <span className="btn btn-ghost">{photo ? t("changePhoto") : t("choosePhoto")}</span>
                <input type="file" accept="image/*" onChange={(e) => pickPhoto(e.target.files?.[0])} />
                {photo && <span className="muted">{photo.name}</span>}
              </label>
              <p className="muted">{t("photoNote")}</p>
              <label>
                {t("yourText")}
                <input value={text} maxLength={80} onChange={(e) => setText(e.target.value)} placeholder="With God All Things Are Possible" />
              </label>
            </>
          )}

          <label>
            {t("notes")}
            <textarea value={notes} rows={3} onChange={(e) => setNotes(e.target.value)} placeholder={t("notesHelp")} />
          </label>
          <label>
            {t("quantity")}
            <input type="number" min={1} value={qty} onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))} />
          </label>

          {choice.kind === "none" && <p className="muted">{t("pickFirst")}</p>}
          <button className="btn" type="submit" disabled={choice.kind === "none"}>
            {t("addToOrder")}
          </button>
          {added && (
            <p className="notice" role="status">
              {t("added")} <Link href="/order">{t("viewOrder")} →</Link>
            </p>
          )}
        </form>
      </div>
    </article>
  );
}

// A small JPEG for the order page, so the cart can show which photo goes with which item.
async function thumbnail(url: string): Promise<string> {
  const img = new Image();
  img.src = url;
  await img.decode();
  const scale = 160 / Math.max(img.width, img.height);
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(img.width * scale);
  canvas.height = Math.round(img.height * scale);
  canvas.getContext("2d")!.drawImage(img, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/jpeg", 0.7);
}
