# Sampson Grace Prints store

Online store for Sampson Grace Prints, Punjab. "Printing Faith, Sharing Grace!"

Customers pick a product, add a photo and text (previewed in the browser, never uploaded), build an order request, and send it to the shop on WhatsApp with the order written out. They attach their photo in that WhatsApp chat. Payment is by UPI after the shop confirms the price. There is no backend, database, or paid service.

Next.js (App Router) + React + TypeScript. Every page is static.

## Clone and run

```sh
git clone https://github.com/worktill1am/sampson-grace-store.git
cd sampson-grace-store
npm install
npm run dev     # http://localhost:3000
```

## Setup

```sh
npm install
npm run dev     # http://localhost:3000
npm run build   # production build, must pass before deploying
```

## Deploy (Vercel free Hobby plan)

```sh
vercel deploy --prod
```

The folder is linked to the Vercel project `sampson-grace-prints` (team 1am, Hobby plan). Production serves at https://sampson-prints.vercel.app and https://sampson-grace-prints.vercel.app; both are project domains, so each production deploy updates both. No environment variables are needed.

## Editing

| What | Where |
| --- | --- |
| Products, categories, names, descriptions, size options | `lib/products.ts` |
| Prices | `priceInr` in `lib/products.ts`. `null` shows "₹ Price on request" with a placeholder tag. A number shows that price in INR. |
| UPI ID | `UPI_ID` in `lib/config.ts`. While it is `null`, a labeled placeholder QR shows. Set it (e.g. `"name@okaxis"`) and a real UPI QR is generated. |
| Phone / WhatsApp number | `PHONE_E164` and `PHONE_DISPLAY` in `lib/config.ts` |
| Office addresses, branch phone | `OFFICES` in `lib/config.ts`. Add a `phone` to the branch entry once its number is confirmed. |
| Website text in all three languages | `lib/i18n.ts` |
| Product photos and ready designs | `designs` on each product in `lib/products.ts`. Each design's `phrase` (the printed text) is its name and goes into the WhatsApp order. The first design's photo is the product's main image. Products with no designs show the placeholder drawing from `components/ProductArt.tsx`. |
| Importing photos | `python3 scripts/import-photos.py <folder>` writes `public/products/<name>.webp` (1200px) and `<name>-sm.webp` (480px). The photo list and crop boxes live at the top of the script. |
| Hero image | `public/hero-nativity.webp` (nativity with Mary, Joseph and baby Jesus) |

## Before going fully live

- **Confirm 8360469833 is on WhatsApp.** Every order goes to `wa.me/918360469833`.
- **UPI ID needed.** The payment box is a placeholder until `UPI_ID` is set.
- **Branch phone is hidden on purpose.** The poster number (988810139) has 9 digits, one short. Add the correct one in `lib/config.ts`.
- **Prices are placeholders.** Christmas Gifts, Church Gifts and Souvenirs show AI-made sample photos, and the T-shirt leads with a free stock photo (see Image credits). All are `sample` in `lib/products.ts` and tagged "Sample photo"; swap in the shop's own photos when they exist.
- **Hindi and Punjabi need a native speaker's review.** The translations in `lib/i18n.ts` and `lib/products.ts` are careful best efforts, not professional. Check names too (Sampson Massey, Pardeep Robert). Order messages sent to WhatsApp are always in English so the shop gets one format.

## Image credits

The T-shirt lead photo is a free stock photo of someone else's faith-printed tees. It is shown as an example, always tagged "Sample photo", and never offered as a design. The [Pexels license](https://www.pexels.com/license/) allows free commercial use on a website and does not require attribution; credit is given here anyway. `scripts/import-photos.py` crops and resizes it into `public/products/`.

| Used for | File | Photo | Author | License |
| --- | --- | --- | --- | --- |
| T-shirt lead photo (home tile, cards, product page) | `sample-tee*.webp` | [White T-Shirts Exhibition](https://www.pexels.com/photo/white-t-shirts-exhibition-16122152/) ("God's Perfect" / "Nothing before, nothing after, all in God's time") | Wesley Davi | Pexels License |

The mug and cap lead with the shop's own photos: `01` "Jesus Is My Saviour" mug and `18` red "Jesus is my Shepherd" cap, padded to a square on their own studio background. All other images are the shop's own photos (`01`–`20`), AI-made samples (`sample-christmas-gifts`, `sample-church-gifts`, `sample-souvenirs`), or the hero image supplied with the project (`hero-nativity`).

## Verification

`scripts/verify.py` runs the full customer flow with headless Playwright at mobile (390x844) and desktop (1280x800): home, category, product, photo upload and text, add to order, order page, WhatsApp link (number and message), language switching, and a check that no branch phone appears on any page. Screenshots land in `screenshots/`.

```sh
pip install playwright && python3 -m playwright install chromium
python3 scripts/verify.py https://your-deployment-url
```
