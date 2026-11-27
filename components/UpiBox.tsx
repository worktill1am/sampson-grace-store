"use client";

import QRCode from "qrcode";
import { useEffect, useState } from "react";
import { SHOP_NAME, UPI_ID } from "@/lib/config";
import { CheckSealIcon } from "./Icons";
import { useLang } from "./Providers";

export function UpiBox() {
  const { t } = useLang();
  const [qr, setQr] = useState<string | null>(null);

  useEffect(() => {
    if (!UPI_ID) return;
    const link = `upi://pay?pa=${encodeURIComponent(UPI_ID)}&pn=${encodeURIComponent(SHOP_NAME)}&cu=INR`;
    QRCode.toDataURL(link, { margin: 1, width: 220, color: { dark: "#1E3526", light: "#FBF6EC" } }).then(setQr);
  }, []);

  return (
    <aside className="upi">
      <span className="kicker">Step III · Secure Payment</span>
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
            <span className="qr-seal-title">UPI Payment QR</span>
            <span className="qr-seal-sub">{t("upiPending")}</span>
          </div>
          <p className="upi-apps-note">Supports Google Pay · PhonePe · Paytm · BHIM UPI</p>
        </>
      )}

      <p className="muted">{t("payNote")}</p>

      <ul className="upi-promise-list">
        <li>
          <CheckSealIcon size={15} />
          <span>Personal layout &amp; quantity confirmation on WhatsApp</span>
        </li>
        <li>
          <CheckSealIcon size={15} />
          <span>No upfront payment before Sampson Massey confirms your quote</span>
        </li>
      </ul>
    </aside>
  );
}
