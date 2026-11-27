import { Holly } from "./ProductArt";

export function Ribbon({ children }: { children: React.ReactNode }) {
  return (
    <p className="ribbon">
      <Holly className="ribbon-holly" />
      <span>{children}</span>
      <Holly className="ribbon-holly" />
    </p>
  );
}
