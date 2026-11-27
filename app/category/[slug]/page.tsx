import { notFound } from "next/navigation";
import { CategoryView } from "@/components/CategoryView";
import { CATEGORIES, categoryBySlug } from "@/lib/products";

export const generateStaticParams = () => CATEGORIES.map((c) => ({ slug: c.slug }));
export const dynamicParams = false;

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!categoryBySlug(slug)) notFound();
  return <CategoryView only={slug} />;
}
