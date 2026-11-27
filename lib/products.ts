import type { L10n } from "./i18n";

export type Art = "tshirt" | "mug" | "cap" | "keychain" | "frame" | "gift" | "church" | "souvenir";

export type Category = { slug: string; name: L10n };

// A ready design shown in a real photo. `phrase` is the text printed on it, used as its name.
// `image` names files in public/products/: <image>.webp (1200px) and <image>-sm.webp (480px).
// `fit: "contain"` shows a wide photo whole in square tiles instead of cropping it.
export type Design = { id: string; phrase: string; image: string; alt: string; fit?: "contain" };

export type ProductOption = { id: string; label: L10n; choices: string[] };

export type Product = {
  slug: string;
  category: Category["slug"];
  name: L10n;
  blurb: L10n;
  art: Art;
  // null = "price on request". Put a real INR amount here only once the shop confirms it.
  priceInr: number | null;
  // Customizable products take a customer photo and text.
  customizable: boolean;
  options: ProductOption[];
  // Pickable designs. With no sample, the first design's photo is the product's main image; no designs and no sample = placeholder drawing.
  designs: Design[];
  // Lead example photo (AI-made, or free stock credited in README). Always shown with a "Sample photo" tag, never pickable.
  sample?: { image: string; alt: string };
};

export const imageUrl = (image: string, size: "sm" | "lg") => `/products/${image}${size === "sm" ? "-sm" : ""}.webp`;

export const CATEGORIES: Category[] = [
  { slug: "wear", name: { en: "T-Shirts & Caps", hi: "टी-शर्ट और कैप", pa: "ਟੀ-ਸ਼ਰਟਾਂ ਅਤੇ ਟੋਪੀਆਂ" } },
  { slug: "keepsakes", name: { en: "Mugs, Frames & Keychains", hi: "मग, फ़्रेम और कीचेन", pa: "ਮੱਗ, ਫ਼ਰੇਮ ਅਤੇ ਕੀ-ਚੇਨ" } },
  { slug: "christmas-church", name: { en: "Christmas & Church Gifts", hi: "क्रिसमस और चर्च उपहार", pa: "ਕ੍ਰਿਸਮਸ ਅਤੇ ਚਰਚ ਤੋਹਫ਼ੇ" } },
];

const SIZE: ProductOption = {
  id: "size",
  label: { en: "Size", hi: "साइज़", pa: "ਸਾਈਜ਼" },
  choices: ["Kids", "S", "M", "L", "XL", "XXL"],
};

export const PRODUCTS: Product[] = [
  {
    slug: "custom-t-shirt",
    category: "wear",
    name: { en: "Customized T-Shirt Printing", hi: "कस्टमाइज़्ड टी-शर्ट प्रिंटिंग", pa: "ਕਸਟਮਾਈਜ਼ਡ ਟੀ-ਸ਼ਰਟ ਪ੍ਰਿੰਟਿੰਗ" },
    blurb: { en: "Your photo, name or Bible verse printed on a T-shirt.", hi: "आपकी फ़ोटो, नाम या बाइबल वचन टी-शर्ट पर।", pa: "ਤੁਹਾਡੀ ਫ਼ੋਟੋ, ਨਾਮ ਜਾਂ ਬਾਈਬਲ ਵਚਨ ਟੀ-ਸ਼ਰਟ 'ਤੇ।" },
    art: "tshirt",
    priceInr: null,
    customizable: true,
    options: [SIZE],
    sample: { image: "sample-tee", alt: "Sample: two white T-shirts printed “God’s Perfect” and “Nothing before, nothing after, all in God’s time”" },
    designs: [
      { id: "walk-in-the-spirit-galatians-5-22-23", phrase: "Walk In The Spirit · Galatians 5:22-23", image: "tee-walk-in-the-spirit", alt: "Black T-shirt printed “Walk In The Spirit”, Galatians 5:22-23" },
      { id: "psalm-23", phrase: "PSALM 23", image: "tee-psalm-23", alt: "Back of a navy T-shirt printed with Psalm 23" },
      { id: "faith-looks-good-on-me", phrase: "Faith Looks Good On Me", image: "tee-faith-looks-good-on-me", alt: "White T-shirt printed “Faith Looks Good On Me”" },
      { id: "faith-over-fear", phrase: "Faith Over Fear", image: "tee-faith-over-fear", alt: "Black T-shirt printed “Faith Over Fear”" },
      { id: "jesus-saves", phrase: "Jesus Saves", image: "tee-jesus-saves", alt: "White T-shirt printed “Jesus Saves” in green" },
    ],
  },
  {
    slug: "custom-cap",
    category: "wear",
    name: { en: "Customized Caps", hi: "कस्टमाइज़्ड कैप", pa: "ਕਸਟਮਾਈਜ਼ਡ ਟੋਪੀਆਂ" },
    blurb: { en: "A cap with your word, name or design.", hi: "आपके शब्द, नाम या डिज़ाइन वाली कैप।", pa: "ਤੁਹਾਡੇ ਸ਼ਬਦ, ਨਾਮ ਜਾਂ ਡਿਜ਼ਾਈਨ ਵਾਲੀ ਟੋਪੀ।" },
    art: "cap",
    priceInr: null,
    customizable: true,
    options: [],
    designs: [
      { id: "jesus-is-my-shepherd-psalm-23-1-red", phrase: "Jesus is my Shepherd · Psalm 23:1 (red)", image: "cap-red-jesus-is-my-shepherd", alt: "Red cap printed “Jesus is my Shepherd”, Psalm 23:1" },
      { id: "jesus-is-my-shepherd-navy", phrase: "Jesus is my Shepherd (navy)", image: "cap-navy-jesus-is-my-shepherd", alt: "Navy cap embroidered “Jesus is my Shepherd”", fit: "contain" },
      { id: "jesus-is-my-shepherd-psalm-23-1-black", phrase: "Jesus is my Shepherd · Psalm 23:1 (black)", image: "cap-black-jesus-is-my-shepherd", alt: "Black cap printed “Jesus is my Shepherd”, Psalm 23:1" },
      { id: "jesus-is-my-shepherd-psalm-23-1-yellow", phrase: "Jesus is my Shepherd · Psalm 23:1 (yellow)", image: "cap-yellow-jesus-is-my-shepherd", alt: "Yellow cap printed “Jesus is my Shepherd”, Psalm 23:1" },
      { id: "jesus-saves-me-black", phrase: "Jesus saves me (black)", image: "cap-black-jesus-saves-me", alt: "Black cap printed “Jesus saves me”" },
      { id: "jesus-saves-me-white", phrase: "Jesus saves me (white)", image: "cap-white-jesus-saves-me", alt: "White cap printed “Jesus saves me”" },
    ],
  },
  {
    slug: "printed-coffee-mug",
    category: "keepsakes",
    name: { en: "Printed Coffee Mugs", hi: "प्रिंटेड कॉफ़ी मग", pa: "ਪ੍ਰਿੰਟਡ ਕੌਫ਼ੀ ਮੱਗ" },
    blurb: { en: "A mug printed with your photo or verse.", hi: "आपकी फ़ोटो या वचन से छपा मग।", pa: "ਤੁਹਾਡੀ ਫ਼ੋਟੋ ਜਾਂ ਵਚਨ ਨਾਲ ਛਪਿਆ ਮੱਗ।" },
    art: "mug",
    priceInr: null,
    customizable: true,
    options: [],
    designs: [
      { id: "jesus-is-my-saviour", phrase: "Jesus Is My Saviour", image: "mug-jesus-is-my-saviour", alt: "White mug printed “Jesus Is My Saviour”" },
      { id: "i-can-do-all-things-philippians-4-13", phrase: "I Can Do All Things · Philippians 4:13", image: "mug-i-can-do-all-things", alt: "White mug printed “I Can Do All Things”, Philippians 4:13" },
      { id: "i-am-the-way-john-14-6", phrase: "I am the way · John 14:6", image: "mug-i-am-the-way", alt: "Red mug printed “I am the way”, John 14:6" },
      { id: "you-are-the-light-of-the-world-matthew-5-14", phrase: "You Are The Light Of The World · Matthew 5:14", image: "mug-light-of-the-world", alt: "Navy mug printed “You Are The Light Of The World”, Matthew 5:14" },
      { id: "last-supper", phrase: "Last Supper", image: "mug-last-supper", alt: "Navy and gold mug printed with the Last Supper" },
      { id: "ego-is-the-enemy", phrase: "Ego Is The Enemy", image: "mug-ego-is-the-enemy", alt: "Blue mug printed “Ego Is The Enemy”" },
    ],
  },
  {
    slug: "bible-verse-photo-frame",
    category: "keepsakes",
    name: { en: "Bible Verse Photo Frames", hi: "बाइबल वचन फ़ोटो फ़्रेम", pa: "ਬਾਈਬਲ ਵਚਨ ਫ਼ੋਟੋ ਫ਼ਰੇਮ" },
    blurb: { en: "Your photo framed with a Bible verse.", hi: "बाइबल वचन के साथ फ़्रेम में आपकी फ़ोटो।", pa: "ਬਾਈਬਲ ਵਚਨ ਨਾਲ ਫ਼ਰੇਮ ਵਿੱਚ ਤੁਹਾਡੀ ਫ਼ੋਟੋ।" },
    art: "frame",
    priceInr: null,
    customizable: true,
    options: [],
    designs: [
      { id: "i-can-do-all-things-through-christ-philippians-4-13", phrase: "I can do all things through Christ · Philippians 4:13", image: "frame-i-can-do-all-things", alt: "Frame with the verse “I can do all things through Christ”, Philippians 4:13" },
      { id: "the-lord-is-my-shepherd-i-lack-nothing-psalm-23-1", phrase: "The Lord is my shepherd, I lack nothing · Psalm 23:1", image: "frame-the-lord-is-my-shepherd", alt: "Frame with the verse “The Lord is my shepherd, I lack nothing”, Psalm 23:1" },
    ],
  },
  {
    slug: "personalized-keychain",
    category: "keepsakes",
    name: { en: "Personalized Keychains", hi: "पर्सनलाइज़्ड कीचेन", pa: "ਪਰਸਨਲਾਈਜ਼ਡ ਕੀ-ਚੇਨ" },
    blurb: { en: "A keychain with your photo or name.", hi: "आपकी फ़ोटो या नाम वाली कीचेन।", pa: "ਤੁਹਾਡੀ ਫ਼ੋਟੋ ਜਾਂ ਨਾਮ ਵਾਲੀ ਕੀ-ਚੇਨ।" },
    art: "keychain",
    priceInr: null,
    customizable: true,
    options: [],
    designs: [
      { id: "jesus-loves-you-john-3-16", phrase: "Jesus Loves You · John 3:16", image: "keychains", alt: "Five printed keychains with Bible verses", fit: "contain" },
      { id: "your-word-is-a-lamp-psalm-119-105", phrase: "Your Word is a lamp · Psalm 119:105", image: "keychains", alt: "Five printed keychains with Bible verses", fit: "contain" },
      { id: "the-lord-is-my-shepherd-psalm-23-1", phrase: "The Lord is my Shepherd · Psalm 23:1", image: "keychains", alt: "Five printed keychains with Bible verses", fit: "contain" },
      { id: "peace-be-with-you-john-14-27", phrase: "Peace be with you · John 14:27", image: "keychains", alt: "Five printed keychains with Bible verses", fit: "contain" },
      { id: "holy-bible-2-timothy-3-16", phrase: "Holy Bible · 2 Timothy 3:16", image: "keychains", alt: "Five printed keychains with Bible verses", fit: "contain" },
    ],
  },
  {
    slug: "christian-christmas-gifts",
    category: "christmas-church",
    name: { en: "Christian Christmas Gifts", hi: "मसीही क्रिसमस उपहार", pa: "ਮਸੀਹੀ ਕ੍ਰਿਸਮਸ ਤੋਹਫ਼ੇ" },
    blurb: { en: "Christmas gifts for family, friends and church.", hi: "परिवार, दोस्तों और चर्च के लिए क्रिसमस उपहार।", pa: "ਪਰਿਵਾਰ, ਦੋਸਤਾਂ ਅਤੇ ਚਰਚ ਲਈ ਕ੍ਰਿਸਮਸ ਤੋਹਫ਼ੇ।" },
    art: "gift",
    sample: { image: "sample-christmas-gifts", alt: "Sample: red gift box, “Joy to the World” ornament and nativity candle" },
    priceInr: null,
    customizable: false,
    options: [],
    designs: [],
  },
  {
    slug: "church-gifts",
    category: "christmas-church",
    name: { en: "Customized Gifts for Churches", hi: "चर्च के लिए कस्टमाइज़्ड उपहार", pa: "ਚਰਚਾਂ ਲਈ ਕਸਟਮਾਈਜ਼ਡ ਤੋਹਫ਼ੇ" },
    blurb: { en: "Gifts printed with your church's name or message.", hi: "आपके चर्च के नाम या संदेश के साथ छपे उपहार।", pa: "ਤੁਹਾਡੇ ਚਰਚ ਦੇ ਨਾਮ ਜਾਂ ਸੁਨੇਹੇ ਨਾਲ ਛਪੇ ਤੋਹਫ਼ੇ।" },
    art: "church",
    sample: { image: "sample-church-gifts", alt: "Sample: “St. Mary’s Church” mug, “Sunday Fellowship” tote and church family plaque" },
    priceInr: null,
    customizable: false,
    options: [],
    designs: [],
  },
  {
    slug: "christian-souvenirs",
    category: "christmas-church",
    name: { en: "Personalized Christian Souvenirs", hi: "पर्सनलाइज़्ड मसीही स्मृति-चिह्न", pa: "ਪਰਸਨਲਾਈਜ਼ਡ ਮਸੀਹੀ ਯਾਦਗਾਰੀ ਚੀਜ਼ਾਂ" },
    blurb: { en: "Keepsakes personalized with a name, date or verse.", hi: "नाम, तारीख या वचन के साथ बनी यादगार चीज़ें।", pa: "ਨਾਮ, ਤਾਰੀਖ ਜਾਂ ਵਚਨ ਨਾਲ ਬਣੀਆਂ ਯਾਦਗਾਰੀ ਚੀਜ਼ਾਂ।" },
    art: "souvenir",
    sample: { image: "sample-souvenirs", alt: "Sample: “Grace” wooden cross, “God Bless This Home” magnet and Psalm 23:1 bookmark" },
    priceInr: null,
    customizable: false,
    options: [],
    designs: [],
  },
];

export const productBySlug = (slug: string) => PRODUCTS.find((p) => p.slug === slug);
export const productsIn = (category: string) => PRODUCTS.filter((p) => p.category === category);
export const categoryBySlug = (slug: string) => CATEGORIES.find((c) => c.slug === slug);
