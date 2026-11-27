import type { L10n } from "./i18n";

// Edit shop details here. See README.
export const SHOP_NAME = "Sampson Grace Prints";

// Main office phone, digits only with country code. Used for click-to-call and WhatsApp orders.
export const PHONE_E164 = "918360469833";
export const PHONE_DISPLAY = "83604 69833";

// UPI ID for payments, e.g. "sampsongrace@okaxis". While null, a labeled placeholder QR is shown.
export const UPI_ID: string | null = null;

export type Office = {
  title: "mainOffice" | "branchOffice";
  person: L10n;
  address: string;
  // Only offices with a confirmed number get one. The branch number is intentionally absent.
  phone?: { e164: string; display: string };
};

export const OFFICES: Office[] = [
  {
    title: "mainOffice",
    person: { en: "Sampson Massey", hi: "सैम्पसन मैसी", pa: "ਸੈਮਸਨ ਮੈਸੀ" },
    address: "#38, G.B.P. Astra, Near New Cambridge School, Dera Bassi, S.A.S. Nagar, Mohali 140507, Punjab",
    phone: { e164: PHONE_E164, display: PHONE_DISPLAY },
  },
  {
    title: "branchOffice",
    person: { en: "Pardeep Robert", hi: "परदीप रॉबर्ट", pa: "ਪਰਦੀਪ ਰੌਬਰਟ" },
    address: "#423, Ward no. 13, Shakti Nagar, Bhogpur, Jalandhar 144201, Punjab",
  },
];

export const telUrl = (e164: string) => `tel:+${e164}`;
export const mapsUrl = (address: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
export const whatsappUrl = (text?: string) =>
  `https://wa.me/${PHONE_E164}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
