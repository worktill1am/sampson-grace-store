"use client";

import Link from "next/link";
import { imageUrl, type Product } from "@/lib/products";
import { Price } from "./Price";
import { ProductImage } from "./ProductImage";
import { useLang } from "./Providers";

export function ProductCard({ product }: { product: Product }) {
  const { l } = useLang();
  const hoverDesign = product.designs[0];
  const editionCount = product.designs.length;

  return (
    <Link href={`/products/${product.slug}`} className="card">
      <div className="card-media-box">
        <ProductImage product={product} />
        {hoverDesign && (
          <img
            src={imageUrl(hoverDesign.image, "sm")}
            alt=""
            aria-hidden="true"
            width={480}
            height={480}
            loading="lazy"
            className="card-hover-photo"
            style={{ objectFit: hoverDesign.fit }}
          />
        )}
        {product.badge && <span className="card-corner-badge">{product.badge}</span>}
      </div>

      <div className="card-body">
        <h3>{l(product.name)}</h3>
        <p className="card-meta-line">
          {editionCount > 0 ? `${editionCount} Ready Designs + Custom` : "Made to Order · Custom Printing"}
        </p>
        <div className="card-price-row">
          <Price inr={product.priceInr} />
        </div>
      </div>
    </Link>
  );
}
