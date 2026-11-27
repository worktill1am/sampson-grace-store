"use client";

import Link from "next/link";
import type { Product } from "@/lib/products";
import { ProductImage } from "./ProductImage";
import { Price } from "./Price";
import { useLang } from "./Providers";

export function ProductCard({ product }: { product: Product }) {
  const { t, l } = useLang();
  return (
    <Link href={`/products/${product.slug}`} className="card">
      <ProductImage product={product} />
      <div className="card-body">
        <h3>{l(product.name)}</h3>
        <p>{l(product.blurb)}</p>
        <Price inr={product.priceInr} />
        {product.customizable && <span className="chip">{t("customizable")}</span>}
      </div>
    </Link>
  );
}
