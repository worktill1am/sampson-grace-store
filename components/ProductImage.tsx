"use client";

import { imageUrl, type Product } from "@/lib/products";
import { ProductArt } from "./ProductArt";
import { useLang } from "./Providers";

// The product's lead photo: its tagged sample photo, else its first design, else the labeled placeholder drawing.
export function ProductImage({ product, size = "sm" }: { product: Product; size?: "sm" | "lg" }) {
  const { t } = useLang();
  const design = product.designs[0];
  const px = size === "sm" ? 480 : 1200;
  if (product.sample)
    return (
      <div className="sample">
        <img className="photo" src={imageUrl(product.sample.image, size)} alt={product.sample.alt} width={px} height={px} />
        <span className="tag tag-sample">{t("samplePhoto")}</span>
      </div>
    );
  if (design)
    return <img className="photo" style={{ objectFit: design.fit }} src={imageUrl(design.image, size)} alt={design.alt} width={px} height={px} loading="lazy" />;
  return <ProductArt art={product.art} label={t("placeholderImage")} />;
}
