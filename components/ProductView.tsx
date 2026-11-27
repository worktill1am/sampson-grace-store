"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";
import { categoryBySlug, imageUrl, type Product } from "@/lib/products";
import { CheckSealIcon, FrameUploadIcon, ShieldLockIcon, ToteIcon } from "./Icons";
import { MUG_GLAZES, MUG_INKS, type MugFont, type MugPhotoFit, type MugWrap } from "./Mug3DPreview";
import { Price } from "./Price";
import { ProductArt } from "./ProductArt";
import { ProductImage } from "./ProductImage";
import { useCart, useLang } from "./Providers";

const Mug3DPreview = dynamic(() => import("./Mug3DPreview").then((m) => m.Mug3DPreview), {
  ssr: false,
  loading: () => (
    <div className="mug-3d-loading" role="status">
      Loading 3D ceramic mug studio…
    </div>
  ),
});

type Photo = { name: string; url: string; thumb: string; width: number; height: number };
type Choice = { kind: "none" } | { kind: "design"; id: string } | { kind: "own" };

const MILESTONE_VERSES = [
  "With God All Things Are Possible",
  "The Lord is my Shepherd · Psalm 23:1",
  "The Lord bless you and keep you · Numbers 6:24",
  "Love never fails · 1 Corinthians 13:8",
];

export function ProductView({ product }: { product: Product }) {
  const { t, l } = useLang();
  const { dispatch, openDrawer } = useCart();
  const [photo, setPhoto] = useState<Photo | null>(null);
  const [text, setText] = useState("");
  const [notes, setNotes] = useState("");
  const [qty, setQty] = useState(1);
  const [options, setOptions] = useState<Record<string, string>>(() =>
    Object.fromEntries(product.options.map((o) => [o.id, o.choices[0]])),
  );
  const [choice, setChoice] = useState<Choice>(() =>
    product.requiresDesignPick && product.sample && product.designs.length
      ? { kind: "none" }
      : product.designs[0]
        ? { kind: "design", id: product.designs[0].id }
        : { kind: "own" },
  );
  const [added, setAdded] = useState(false);

  // 3D Mug Studio customization state
  const isMug = product.art === "mug";
  const [mugGlazeId, setMugGlazeId] = useState(MUG_GLAZES[0].id);
  const [mugInkId, setMugInkId] = useState(MUG_INKS[0].id);
  const [mugFont, setMugFont] = useState<MugFont>("roman");
  const [mugWrap, setMugWrap] = useState<MugWrap>("front");
  const [mugPhotoFit, setMugPhotoFit] = useState<MugPhotoFit>("contain");
  const [mugPhotoScale, setMugPhotoScale] = useState(0.94);
  const [mugCross, setMugCross] = useState(true);

  const mugGlaze = MUG_GLAZES.find((g) => g.id === mugGlazeId) ?? MUG_GLAZES[0];
  const mugInk = MUG_INKS.find((i) => i.id === mugInkId) ?? MUG_INKS[0];

  const design = choice.kind === "design" ? product.designs.find((d) => d.id === choice.id) ?? null : null;
  const ownWork = product.customizable && choice.kind === "own";
  const show3DMug = isMug && ownWork;
  const category = categoryBySlug(product.category);

  function selectGlaze(id: string) {
    setMugGlazeId(id);
    const nextGlaze = MUG_GLAZES.find((g) => g.id === id);
    if (!nextGlaze) return;
    // Smart ink contrast pairing when switching between dark and light ceramic
    if (nextGlaze.dark && (mugInkId === "pine" || mugInkId === "velvet" || mugInkId === "espresso")) {
      setMugInkId("gold");
    } else if (!nextGlaze.dark && mugInkId === "ivory") {
      setMugInkId("pine");
    }
  }

  async function pickPhoto(file: File | undefined) {
    if (!file) return;
    if (photo) URL.revokeObjectURL(photo.url);
    const url = URL.createObjectURL(file);
    const meta = await readPhotoMeta(url);
    setPhoto({ name: file.name, url, ...meta });
    // Always default to uncut Auto-Fit whenever a new photo is uploaded
    setMugPhotoFit("contain");
    setMugPhotoScale(0.94);
  }

  function add() {
    const fontName = mugFont === "roman" ? "Inscribed Roman" : mugFont === "serif" ? "Manuscript Serif" : "Clean Sans";
    const wrapName = mugWrap === "full" ? "Full panoramic wrap" : mugWrap === "both" ? "Wrap both sides" : "Front print";
    const fitNote = photo ? `, Photo: ${mugPhotoFit === "contain" ? "Auto-fit uncut" : "Fill frame"} (${Math.round(mugPhotoScale * 100)}%)` : "";
    const mugSpecNote = show3DMug
      ? `3D Mug Preview: ${mugGlaze.label} glaze, ${mugInk.label} ink, ${fontName}, ${wrapName}${fitNote}${mugCross && !photo ? ", Cross emblem" : ""}`
      : "";
    const combinedNotes = [mugSpecNote, notes.trim()].filter(Boolean).join(" · ");

    dispatch({
      type: "add",
      item: {
        id: crypto.randomUUID(),
        slug: product.slug,
        qty,
        options,
        design: design?.phrase ?? null,
        text: ownWork ? text.trim() : "",
        notes: combinedNotes,
        photo: ownWork && photo ? { name: photo.name, thumb: photo.thumb } : null,
      },
    });
    setAdded(true);
  }

  return (
    <article className="wrap product page-flow">
      <nav className="pdp-breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <Link href="/products">Shop</Link>
        {category && (
          <>
            <span aria-hidden="true">/</span>
            <Link href={`/category/${category.slug}`} className="crumb">
              {l(category.name)}
            </Link>
          </>
        )}
      </nav>

      <div className="product-grid">
        {/* Left Studio Stage — Interactive 3D Ceramic Mug or High-Res Print Preview */}
        <div
          className={
            show3DMug
              ? "studio-stage-col is-3d-mug"
              : ownWork
                ? "studio-stage-col is-customizing"
                : "studio-stage-col"
          }
        >
          <div className="linen-mat-stage">
            {design ? (
              <img
                key={design.id}
                className={design.cropTop ? "photo main-photo stage-crossfade crop-clean" : "photo main-photo stage-crossfade"}
                src={imageUrl(design.image, "lg")}
                alt={design.alt}
                width={1200}
                height={1200}
                style={{ backgroundImage: `url(${imageUrl(design.image, "sm")})` }}
              />
            ) : show3DMug ? (
              <div className="custom-preview-wrap mug-3d-stage-wrap">
                <Mug3DPreview
                  text={text}
                  photoUrl={photo?.url}
                  glazeHex={mugGlaze.hex}
                  inkHex={mugInk.hex}
                  fontStyle={mugFont}
                  wrapMode={mugWrap}
                  photoFit={mugPhotoFit}
                  photoScale={mugPhotoScale}
                  showCross={mugCross}
                />
                <p className="preview-note">
                  <ShieldLockIcon size={14} />
                  <span>Live 3D Preview · Your photo &amp; text stay privately on your device</span>
                </p>
              </div>
            ) : choice.kind === "own" && product.designs.length ? (
              <div className="custom-preview-wrap">
                <ProductArt art={product.art} photo={photo?.url} text={text} />
                <p className="preview-note">
                  <ShieldLockIcon size={14} />
                  <span>{t("preview")}</span>
                </p>
              </div>
            ) : (
              <ProductImage product={product} size="lg" />
            )}
          </div>
        </div>

        {/* Right Boutique Buy-Box & Co-Creation Studio */}
        <form
          className="customize atelier-form"
          onSubmit={(e) => {
            e.preventDefault();
            add();
          }}
        >
          <header className="atelier-head">
            <h1>{l(product.name)}</h1>
            <Price inr={product.priceInr} />
            <p className="atelier-blurb">{l(product.blurb)}</p>

            {isMug && (
              <div className="studio-mode-bar" role="group" aria-label="Mug visualization mode">
                <button
                  type="button"
                  className={!ownWork ? "studio-mode-btn active" : "studio-mode-btn"}
                  aria-pressed={!ownWork}
                  onClick={() => {
                    if (product.designs[0]) {
                      setChoice({ kind: "design", id: product.designs[0].id });
                      setAdded(false);
                    }
                  }}
                >
                  Ready Workshop Prints
                </button>
                <button
                  type="button"
                  className={ownWork ? "studio-mode-btn active" : "studio-mode-btn"}
                  aria-pressed={ownWork}
                  onClick={() => {
                    setChoice({ kind: "own" });
                    setAdded(false);
                  }}
                >
                  3D Mug Text Visualizer
                </button>
              </div>
            )}
          </header>

          {product.designs.length > 0 && (
            <fieldset className="designs">
              <legend>
                <span className="step-kicker">{t("step1Label")}</span>
                <span>{t("pickDesign")} — Real Workshop Prints</span>
              </legend>
              <div className="swatch-grid">
                {product.designs.map((d) => {
                  const isChecked = choice.kind === "design" && choice.id === d.id;
                  return (
                    <label key={d.id} className="design">
                      <input
                        type="radio"
                        name="design"
                        checked={isChecked}
                        onChange={() => {
                          setChoice({ kind: "design", id: d.id });
                          setAdded(false);
                        }}
                      />
                      <div className="swatch-frame">
                        <img
                          src={imageUrl(d.image, "sm")}
                          style={{ objectFit: d.fit }}
                          className={d.cropTop ? "swatch-crop-clean" : undefined}
                          alt={d.alt}
                          width={480}
                          height={480}
                          loading="lazy"
                        />
                        {isChecked && (
                          <span className="swatch-check" aria-hidden="true">
                            <CheckSealIcon size={13} />
                          </span>
                        )}
                      </div>
                      <span className="swatch-caption">{d.phrase}</span>
                    </label>
                  );
                })}

                <label className="design design-own">
                  <input
                    type="radio"
                    name="design"
                    checked={choice.kind === "own"}
                    onChange={() => {
                      setChoice({ kind: "own" });
                      setAdded(false);
                    }}
                  />
                  <div className="swatch-frame">
                    <ProductArt art={product.art} mini />
                    {choice.kind === "own" && (
                      <span className="swatch-check" aria-hidden="true">
                        <CheckSealIcon size={13} />
                      </span>
                    )}
                  </div>
                  <span className="swatch-caption">{isMug ? "3D Custom Text / Photo" : t("ownDesign")}</span>
                </label>
              </div>
            </fieldset>
          )}

          {design && (
            <p className="chosen" data-testid="chosen-design">
              <CheckSealIcon size={15} />
              <span>
                {t("design")}: <strong>{design.phrase}</strong>
              </span>
            </p>
          )}

          {ownWork && (
            <section className="personalize-well" aria-label={t("step2Label")}>
              <span className="step-kicker">
                {show3DMug ? "Step 2 · Live 3D Mug Customizer" : t("step2Label")}
              </span>

              <label className="studio-field">
                <span className="studio-label">{t("yourText")}</span>
                <input
                  value={text}
                  maxLength={80}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Type your Bible verse, name, or blessing..."
                />
              </label>

              <div className="verse-presets">
                <span className="preset-heading">{t("versePrompts")}</span>
                <div className="preset-row">
                  {MILESTONE_VERSES.map((v) => (
                    <button key={v} type="button" className="preset-pill" onClick={() => setText(v)}>
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              {show3DMug && (
                <div className="mug-3d-controls">
                  <div className="mug-control-group">
                    <span className="studio-label">Mug Glaze: {mugGlaze.label}</span>
                    <div className="color-dot-row" role="group" aria-label="Mug ceramic glaze color">
                      {MUG_GLAZES.map((g) => (
                        <button
                          key={g.id}
                          type="button"
                          title={g.label}
                          aria-label={g.label}
                          aria-pressed={mugGlazeId === g.id}
                          className={mugGlazeId === g.id ? "color-dot active" : "color-dot"}
                          style={{ backgroundColor: g.hex }}
                          onClick={() => selectGlaze(g.id)}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="mug-control-group">
                    <span className="studio-label">Print Ink: {mugInk.label}</span>
                    <div className="color-dot-row" role="group" aria-label="Print ink color">
                      {MUG_INKS.map((ink) => (
                        <button
                          key={ink.id}
                          type="button"
                          title={ink.label}
                          aria-label={ink.label}
                          aria-pressed={mugInkId === ink.id}
                          className={mugInkId === ink.id ? "color-dot active" : "color-dot"}
                          style={{ backgroundColor: ink.hex }}
                          onClick={() => setMugInkId(ink.id)}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="mug-toggle-grid">
                    <div className="mug-control-group">
                      <span className="studio-label">Lettering</span>
                      <div className="mini-segment mini-segment-3" role="group" aria-label="Lettering style">
                        <button
                          type="button"
                          className={mugFont === "roman" ? "mini-seg-btn active" : "mini-seg-btn"}
                          aria-pressed={mugFont === "roman"}
                          onClick={() => setMugFont("roman")}
                        >
                          Roman
                        </button>
                        <button
                          type="button"
                          className={mugFont === "serif" ? "mini-seg-btn active" : "mini-seg-btn"}
                          aria-pressed={mugFont === "serif"}
                          onClick={() => setMugFont("serif")}
                        >
                          Serif
                        </button>
                        <button
                          type="button"
                          className={mugFont === "sans" ? "mini-seg-btn active" : "mini-seg-btn"}
                          aria-pressed={mugFont === "sans"}
                          onClick={() => setMugFont("sans")}
                        >
                          Sans
                        </button>
                      </div>
                    </div>

                    <div className="mug-control-group">
                      <span className="studio-label">Print Placement</span>
                      <div className="mini-segment mini-segment-3" role="group" aria-label="Print placement">
                        <button
                          type="button"
                          className={mugWrap === "front" ? "mini-seg-btn active" : "mini-seg-btn"}
                          aria-pressed={mugWrap === "front"}
                          onClick={() => setMugWrap("front")}
                        >
                          Front
                        </button>
                        <button
                          type="button"
                          className={mugWrap === "both" ? "mini-seg-btn active" : "mini-seg-btn"}
                          aria-pressed={mugWrap === "both"}
                          onClick={() => setMugWrap("both")}
                        >
                          Both
                        </button>
                        <button
                          type="button"
                          className={mugWrap === "full" ? "mini-seg-btn active" : "mini-seg-btn"}
                          aria-pressed={mugWrap === "full"}
                          onClick={() => setMugWrap("full")}
                        >
                          Full Wrap
                        </button>
                      </div>
                    </div>
                  </div>

                  {photo && (
                    <div className="mug-photo-tuning">
                      <div className="mug-photo-meta-row">
                        <span className="mug-photo-dims">
                          {photo.width}×{photo.height}px · Aspect ratio preserved automatically
                        </span>
                        <button
                          type="button"
                          className="clear-photo-link"
                          onClick={() => {
                            URL.revokeObjectURL(photo.url);
                            setPhoto(null);
                          }}
                        >
                          Remove
                        </button>
                      </div>

                      <div className="mug-toggle-grid">
                        <div className="mug-control-group">
                          <span className="studio-label">Photo Framing</span>
                          <div className="mini-segment" role="group" aria-label="Photo framing">
                            <button
                              type="button"
                              className={mugPhotoFit === "contain" ? "mini-seg-btn active" : "mini-seg-btn"}
                              aria-pressed={mugPhotoFit === "contain"}
                              onClick={() => setMugPhotoFit("contain")}
                            >
                              Fit Full Image
                            </button>
                            <button
                              type="button"
                              className={mugPhotoFit === "cover" ? "mini-seg-btn active" : "mini-seg-btn"}
                              aria-pressed={mugPhotoFit === "cover"}
                              onClick={() => setMugPhotoFit("cover")}
                            >
                              Fill Frame
                            </button>
                          </div>
                        </div>

                        <label className="mug-control-group">
                          <span className="studio-label">Print Size: {Math.round(mugPhotoScale * 100)}%</span>
                          <input
                            type="range"
                            min={60}
                            max={100}
                            step={2}
                            value={Math.round(mugPhotoScale * 100)}
                            onChange={(e) => setMugPhotoScale(Number(e.target.value) / 100)}
                            className="mug-range-slider"
                          />
                        </label>
                      </div>
                    </div>
                  )}

                  {!photo && (
                    <label className="cross-toggle-row">
                      <input
                        type="checkbox"
                        checked={mugCross}
                        onChange={(e) => setMugCross(e.target.checked)}
                      />
                      <span>Include subtle heirloom cross emblem above verse</span>
                    </label>
                  )}
                </div>
              )}

              <label className="file-dropzone">
                <span className="studio-label">{t("yourPhoto")}</span>
                <span className="dropzone-box">
                  <FrameUploadIcon size={19} />
                  <span>{photo ? `${t("changePhoto")} (${photo.name})` : t("choosePhoto")}</span>
                </span>
                <input type="file" accept="image/*" onChange={(e) => pickPhoto(e.target.files?.[0])} />
              </label>

              <p className="privacy-callout">
                <ShieldLockIcon size={15} />
                <span>{t("photoNote")}</span>
              </p>
            </section>
          )}

          <div className="specs-section">
            <span className="step-kicker">{t("step3Label")}</span>

            {product.options.map((o) => (
              <label key={o.id} className="studio-field">
                <span className="studio-label">{l(o.label)}</span>
                <select value={options[o.id]} onChange={(e) => setOptions({ ...options, [o.id]: e.target.value })}>
                  {o.choices.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </label>
            ))}

            <label className="studio-field">
              <span className="studio-label">{t("notes")}</span>
              <textarea value={notes} rows={3} onChange={(e) => setNotes(e.target.value)} placeholder={t("notesHelp")} />
            </label>

            <div className="order-action-row">
              <label className="studio-field qty-input-wrap">
                <span className="studio-label">{t("quantity")}</span>
                <input
                  type="number"
                  min={1}
                  value={qty}
                  onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
                />
              </label>

              <button className="btn btn-terracotta add-submit-btn" type="submit" disabled={choice.kind === "none"}>
                <ToteIcon size={17} />
                <span>{t("addToOrder")}</span>
              </button>
            </div>
          </div>

          {choice.kind === "none" && <p className="selection-prompt">{t("pickFirst")}</p>}

          {added && (
            <div className="added-banner" role="status">
              <span className="added-msg">
                <CheckSealIcon size={16} />
                <span>{t("added")}</span>
              </span>
              <div className="added-links">
                <Link href="/order" className="added-primary-link">
                  {t("viewOrder")} →
                </Link>
                <button type="button" className="added-drawer-btn" onClick={openDrawer}>
                  {t("openDrawer")}
                </button>
              </div>
            </div>
          )}

          <div className="pdp-trust-box">
            <p className="pdp-trust-lead">Custom Christmas &amp; Milestone Printing — Dera Bassi &amp; Bhogpur</p>
            <ul className="pdp-trust-list">
              <li>
                <CheckSealIcon size={14} />
                <span>100% private browser preview (your photo never uploads)</span>
              </li>
              <li>
                <CheckSealIcon size={14} />
                <span>Personal quote &amp; layout confirmation on WhatsApp before UPI payment</span>
              </li>
              <li>
                <CheckSealIcon size={14} />
                <span>Single family gifts or bulk church &amp; choir quantities welcome</span>
              </li>
            </ul>
          </div>

          <details className="craft-disclosure">
            <summary>{t("careSpecs")}</summary>
            <p>{l(product.craftNote)}</p>
          </details>
        </form>
      </div>
    </article>
  );
}

async function readPhotoMeta(url: string): Promise<{ thumb: string; width: number; height: number }> {
  const img = new Image();
  img.src = url;
  await img.decode();
  const scale = 160 / Math.max(img.width, img.height);
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(img.width * scale);
  canvas.height = Math.round(img.height * scale);
  canvas.getContext("2d")!.drawImage(img, 0, 0, canvas.width, canvas.height);
  return { thumb: canvas.toDataURL("image/jpeg", 0.7), width: img.naturalWidth, height: img.naturalHeight };
}
