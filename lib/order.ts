import { SHOP_NAME, whatsappUrl } from "./config";
import { productBySlug } from "./products";

export type CartItem = {
  id: string;
  slug: string;
  qty: number;
  options: Record<string, string>;
  // Phrase of the ready design picked, or null for the customer's own photo/text.
  design: string | null;
  text: string;
  notes: string;
  // The photo itself never leaves the device. We keep its name and a small thumbnail for the cart.
  photo: { name: string; thumb: string } | null;
};

export type Customer = { name: string; place: string };

export type CartAction =
  | { type: "load"; items: CartItem[] }
  | { type: "add"; item: CartItem }
  | { type: "qty"; id: string; qty: number }
  | { type: "remove"; id: string }
  | { type: "clear" };

export function cartReducer(items: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case "load":
      return action.items;
    case "add":
      return [...items, action.item];
    case "qty":
      return items.map((i) => (i.id === action.id ? { ...i, qty: Math.max(1, action.qty) } : i));
    case "remove":
      return items.filter((i) => i.id !== action.id);
    case "clear":
      return [];
  }
}

// The order message is always English so the shop reads one format, whatever language the customer browsed in.
export function orderMessage(items: CartItem[], customer: Customer): string {
  const lines = [`Hello ${SHOP_NAME}! I would like to place an order:`, ""];
  items.forEach((item, n) => {
    const product = productBySlug(item.slug);
    lines.push(`${n + 1}. ${product?.name.en ?? item.slug} x ${item.qty}`);
    if (product?.designs.length) lines.push(`   Design: ${item.design ?? "My own photo/text"}`);
    for (const [key, value] of Object.entries(item.options)) lines.push(`   ${capitalize(key)}: ${value}`);
    if (item.text) lines.push(`   Text: "${item.text}"`);
    if (item.photo) lines.push(`   Photo: ${item.photo.name} (attaching in this chat)`);
    if (item.notes) lines.push(`   Notes: ${item.notes}`);
  });
  lines.push("");
  if (customer.name) lines.push(`Name: ${customer.name}`);
  if (customer.place) lines.push(`Town / address: ${customer.place}`);
  if (items.some((i) => i.photo)) lines.push("I will attach my photo(s) here.");
  lines.push("Please confirm the price. Thank you!");
  return lines.join("\n");
}

export const orderUrl = (items: CartItem[], customer: Customer) => whatsappUrl(orderMessage(items, customer));

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
