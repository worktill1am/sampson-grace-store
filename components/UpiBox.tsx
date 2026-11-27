"use client";

import QRCode from "qrcode";
import { useEffect, useState } from "react";
import { SHOP_NAME, UPI_ID } from "@/lib/config";
import { useLang } from "./Providers";

export function UpiBox() {
  const { t } = useLang();
  const [qr, setQr] = useState<string | null>(null);

  useEffect(() => {
    if (!UPI_ID) return;
    const link = `upi://pay?pa=${encodeURIComponent(UPI_ID)}&pn=${encodeURIComponent(SHOP_NAME)}&cu=INR`;
    QRCode.toDataURL(link, { margin: 1, width: 220, color: { dark: "#1e4d36", light: "#fffdf7" } }).then(setQr);
  }, []);

  return (
    <section className="upi">
      <h2>{t("payTitle")}</h2>
      {UPI_ID ? (
        <>
          {qr && <img src={qr} alt={`UPI QR for ${UPI_ID}`} width={220} height={220} />}
          <p>
            {t("upiId")}: <strong>{UPI_ID}</strong>
          </p>
        </>
      ) : (
        <>
          <div className="qr-placeholder" data-testid="upi-placeholder">
            UPI QR
            <br />
            placeholder
          </div>
          <p>
            <span className="tag tag-inline">{t("upiPending")}</span>
          </p>
        </>
      )}
      <p className="muted">{t("payNote")}</p>
    </section>
  );
}
