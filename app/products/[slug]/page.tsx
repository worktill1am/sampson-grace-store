import { notFound } from "next/navigation";
import { ProductView } from "@/components/ProductView";
import { PRODUCTS, productBySlug } from "@/lib/products";

export const generateStaticParams = () => PRODUCTS.map((p) => ({ slug: p.slug }));
export const dynamicParams = false;

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = productBySlug(slug);
  if (!product) notFound();
  return <ProductView product={product} />;
}
