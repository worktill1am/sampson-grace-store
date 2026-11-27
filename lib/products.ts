import type { L10n } from "./i18n";

export type Art = "tshirt" | "mug" | "cap" | "keychain" | "frame" | "gift" | "church" | "souvenir";

export type OccasionId = "all" | "christmas" | "baptism" | "weddings" | "sympathy" | "easter" | "church";

export type Occasion = {
  id: OccasionId;
  label: L10n;
  note: L10n;
};

export type Category = {
  slug: string;
  roman: string;
  name: L10n;
  subtitle: L10n;
};

export type Design = { id: string; phrase: string; image: string; alt: string; fit?: "contain"; cropTop?: boolean };

export type ProductOption = { id: string; label: L10n; choices: string[] };

export type Product = {
  slug: string;
  category: Category["slug"];
  occasions: Exclude<OccasionId, "all">[];
  badge?: string;
  name: L10n;
  blurb: L10n;
  craftNote: L10n;
  art: Art;
  priceInr: number | null;
  customizable: boolean;
  /** When true, the product detail page opens on the sample photo until a design or custom print is picked. */
  requiresDesignPick?: boolean;
  options: ProductOption[];
  designs: Design[];
  sample?: { image: string; alt: string };
};

export const imageUrl = (image: string, size: "sm" | "lg") => `/products/${image}${size === "sm" ? "-sm" : ""}.webp`;

export const OCCASIONS: Occasion[] = [
  {
    id: "all",
    label: { en: "All Keepsakes", hi: "सभी उपहार", pa: "ਸਾਰੇ ਤੋਹਫ਼ੇ" },
    note: { en: "Complete collection of custom & ready scripture prints", hi: "सभी कस्टम और तैयार बाइबल प्रिंट", pa: "ਸਾਰੇ ਕਸਟਮ ਅਤੇ ਤਿਆਰ ਬਾਈਬਲ ਪ੍ਰਿੰਟ" },
  },
  {
    id: "christmas",
    label: { en: "Christmas & Advent", hi: "क्रिसमस व आगमन", pa: "ਕ੍ਰਿਸਮਸ ਅਤੇ ਆਗਮਨ" },
    note: { en: "Nativity keepsakes, warm mugs & family gift sets", hi: "क्रिसमस उपहार सेट और मग", pa: "ਕ੍ਰਿਸਮਸ ਤੋਹਫ਼ੇ ਅਤੇ ਮੱਗ" },
  },
  {
    id: "baptism",
    label: { en: "Baptism & Confirmation", hi: "बपतिस्मा व दृढ़ीकरण", pa: "ਬਪਤਿਸਮਾ ਅਤੇ ਪੁਸ਼ਟੀਕਰਨ" },
    note: { en: "Personalized date keepsakes, verse frames & pocket tokens", hi: "नाम और तारीख वाले यादगार उपहार", pa: "ਨਾਮ ਅਤੇ ਤਾਰੀਖ ਵਾਲੇ ਯਾਦਗਾਰੀ ਤੋਹਫ਼ੇ" },
  },
  {
    id: "weddings",
    label: { en: "Christian Weddings", hi: "मसीही विवाह", pa: "ਮਸੀਹੀ ਵਿਆਹ" },
    note: { en: "Framed couple portraits paired with covenant scripture", hi: "विवाह वचन फ़ोटो फ़्रेम और उपहार", pa: "ਵਿਆਹ ਵਚਨ ਫ਼ੋਟੋ ਫ਼ਰੇਮ ਅਤੇ ਤੋਹਫ਼ੇ" },
  },
  {
    id: "sympathy",
    label: { en: "Sympathy & Comfort", hi: "सांत्वना व स्मृति", pa: "ਹੌਸਲਾ ਅਤੇ ਯਾਦਗਾਰ" },
    note: { en: "Psalm 23 frames & quiet words of peace and remembrance", hi: "भजन संहिता 23 फ़्रेम और सांत्वना उपहार", pa: "ਜ਼ਬੂਰ 23 ਫ਼ਰੇਮ ਅਤੇ ਹੌਸਲੇ ਦੇ ਤੋਹਫ਼ੇ" },
  },
  {
    id: "easter",
    label: { en: "Easter & Youth", hi: "ईस्टर व युवा संगति", pa: "ਈਸਟਰ ਅਤੇ ਯੂਥ ਸੰਗਤ" },
    note: { en: "Resurrection tees, scripture caps & fellowship giveaways", hi: "टी-शर्ट, कैप और युवा संगति उपहार", pa: "ਟੀ-ਸ਼ਰਟਾਂ, ਟੋਪੀਆਂ ਅਤੇ ਯੂਥ ਤੋਹਫ਼ੇ" },
  },
  {
    id: "church",
    label: { en: "Church & Choir Bulk", hi: "चर्च व क्वायर थोक ऑर्डर", pa: "ਚਰਚ ਅਤੇ ਕੁਆਇਰ ਥੋਕ ਆਰਡਰ" },
    note: { en: "Congregation welcome kits, Sunday totes & retreat wear", hi: "चर्च के नाम और वचन वाले सामूहिक उपहार", pa: "ਚਰਚ ਦੇ ਨਾਮ ਅਤੇ ਵਚਨ ਵਾਲੇ ਸਮੂਹਿਕ ਤੋਹਫ਼ੇ" },
  },
];

export const CATEGORIES: Category[] = [
  {
    slug: "wear",
    roman: "I",
    name: { en: "T-Shirts & Caps", hi: "टी-शर्ट और कैप", pa: "ਟੀ-ਸ਼ਰਟਾਂ ਅਤੇ ਟੋਪੀਆਂ" },
    subtitle: {
      en: "Everyday faith apparel, youth retreat tees & embroidered scripture caps",
      hi: "दैनिक पहनावा, यूथ रिट्रीट टी-शर्ट और बाइबल वचन कैप",
      pa: "ਰੋਜ਼ਾਨਾ ਪਹਿਰਾਵਾ, ਯੂਥ ਰਿਟਰੀਟ ਟੀ-ਸ਼ਰਟਾਂ ਅਤੇ ਬਾਈਬਲ ਵਚਨ ਟੋਪੀਆਂ",
    },
  },
  {
    slug: "keepsakes",
    roman: "II",
    name: { en: "Mugs, Frames & Keychains", hi: "मग, फ़्रेम और कीचेन", pa: "ਮੱਗ, ਫ਼ਰੇਮ ਅਤੇ ਕੀ-ਚੇਨ" },
    subtitle: {
      en: "Ceramic morning devotion mugs, tabletop verse frames & pocket tokens",
      hi: "सिरेमिक मग, बाइबल वचन फ़ोटो फ़्रेम और पॉकेट कीचेन",
      pa: "ਸਿਰੇਮਿਕ ਮੱਗ, ਬਾਈਬਲ ਵਚਨ ਫ਼ੋਟੋ ਫ਼ਰੇਮ ਅਤੇ ਪੌਕੇਟ ਕੀ-ਚੇਨ",
    },
  },
  {
    slug: "christmas-church",
    roman: "III",
    name: { en: "Christmas & Church Gifts", hi: "क्रिसमस और चर्च उपहार", pa: "ਕ੍ਰਿਸਮਸ ਅਤੇ ਚਰਚ ਤੋਹਫ਼ੇ" },
    subtitle: {
      en: "Seasonal nativity sets, baptism souvenirs & bulk church fellowship prints",
      hi: "क्रिसमस उपहार, स्मृति-चिह्न और चर्च संगति उपहार",
      pa: "ਕ੍ਰਿਸਮਸ ਤੋਹਫ਼ੇ, ਯਾਦਗਾਰੀ ਚੀਜ਼ਾਂ ਅਤੇ ਚਰਚ ਸੰਗਤ ਤੋਹਫ਼ੇ",
    },
  },
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
    occasions: ["easter", "church", "christmas"],
    badge: "Best Seller",
    name: { en: "Customized T-Shirt Printing", hi: "कस्टमाइज़्ड टी-शर्ट प्रिंटिंग", pa: "ਕਸਟਮਾਈਜ਼ਡ ਟੀ-ਸ਼ਰਟ ਪ੍ਰਿੰਟਿੰਗ" },
    blurb: {
      en: "Your photo, name or Bible verse printed on a comfortable everyday T-shirt.",
      hi: "आपकी फ़ोटो, नाम या बाइबल वचन टी-शर्ट पर।",
      pa: "ਤੁਹਾਡੀ ਫ਼ੋਟੋ, ਨਾਮ ਜਾਂ ਬਾਈਬਲ ਵਚਨ ਟੀ-ਸ਼ਰਟ 'ਤੇ।",
    },
    craftNote: {
      en: "Soft breathable cotton blend · Sizes Kids to XXL · Single or choir/youth group quantities.",
      hi: "आरामदायक कॉटन · Kids से XXL तक · एकल या चर्च समूह ऑर्डर उपलब्ध।",
      pa: "ਆਰਾਮਦਾਇਕ ਕਾਟਨ · Kids ਤੋਂ XXL ਤੱਕ · ਇਕੱਲੇ ਜਾਂ ਚਰਚ ਗਰੁੱਪ ਆਰਡਰ ਉਪਲਬਧ।",
    },
    art: "tshirt",
    priceInr: null,
    customizable: true,
    requiresDesignPick: true,
    options: [SIZE],
    sample: {
      image: "lifestyle-tee",
      alt: "Sample: neatly folded cream heavyweight cotton T-shirt with a small gold cross beside evergreen and pine cone",
    },
    designs: [
      { id: "walk-in-the-spirit-galatians-5-22-23", phrase: "Walk In The Spirit · Galatians 5:22-23", image: "tee-walk-in-the-spirit", alt: "Black T-shirt printed “Walk In The Spirit”, Galatians 5:22-23" },
      { id: "psalm-23", phrase: "PSALM 23", image: "tee-psalm-23", alt: "Back of a navy T-shirt printed with Psalm 23" },
      { id: "faith-looks-good-on-me", phrase: "Faith Looks Good On Me", image: "tee-faith-looks-good-on-me", alt: "White T-shirt printed “Faith Looks Good On Me”" },
      { id: "faith-over-fear", phrase: "Faith Over Fear", image: "tee-faith-over-fear", alt: "Black T-shirt printed “Faith Over Fear”" },
      { id: "jesus-saves", phrase: "Jesus Saves", image: "tee-jesus-saves", alt: "White T-shirt printed “Jesus Saves” in green", cropTop: true },
    ],
  },
  {
    slug: "custom-cap",
    category: "wear",
    occasions: ["easter", "church", "baptism"],
    badge: "6 Colors",
    name: { en: "Customized Caps", hi: "कस्टमाइज़्ड कैप", pa: "ਕਸਟਮਾਈਜ਼ਡ ਟੋਪੀਆਂ" },
    blurb: {
      en: "Structured cotton caps printed or embroidered with scripture or your custom word.",
      hi: "आपके शब्द, नाम या डिज़ाइन वाली कैप।",
      pa: "ਤੁਹਾਡੇ ਸ਼ਬਦ, ਨਾਮ ਜਾਂ ਡਿਜ਼ਾਈਨ ਵਾਲੀ ਟੋਪੀ।",
    },
    craftNote: {
      en: "Adjustable back closure · Six studio colorways · Crisp front crown verse placement.",
      hi: "एडजस्टेबल स्ट्रैप · 6 रंग विकल्प · स्पष्ट फ्रंट प्रिंटिंग।",
      pa: "ਐਡਜਸਟੇਬਲ ਸਟ੍ਰੈਪ · 6 ਰੰਗਾਂ ਦੇ ਵਿਕਲਪ · ਸਾਫ਼ ਫਰੰਟ ਪ੍ਰਿੰਟਿੰਗ।",
    },
    art: "cap",
    priceInr: null,
    customizable: true,
    options: [],
    sample: {
      image: "lifestyle-cap",
      alt: "Sample: forest-green structured cotton cap with a small gold cross resting on rustic wood beside pine cones and velvet ribbon",
    },
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
    occasions: ["christmas", "baptism", "weddings", "sympathy"],
    badge: "Best Seller",
    name: { en: "Printed Coffee Mugs", hi: "प्रिंटेड कॉफ़ी मग", pa: "ਪ੍ਰਿੰਟਡ ਕੌਫ਼ੀ ਮੱਗ" },
    blurb: {
      en: "Heirloom ceramic coffee mugs printed with daily scripture, portraits, or milestone dates.",
      hi: "आपकी फ़ोटो या वचन से छपा मग।",
      pa: "ਤੁਹਾਡੀ ਫ਼ੋਟੋ ਜਾਂ ਵਚਨ ਨਾਲ ਛਪਿਆ ਮੱਗ।",
    },
    craftNote: {
      en: "11 oz glazed ceramic · Fade-resistant sublimation transfer · Gentle hand-wash recommended.",
      hi: "चमकदार सिरेमिक मग · टिकाऊ प्रिंट · उपहार पैकिंग के लिए उपयुक्त।",
      pa: "ਚਮਕਦਾਰ ਸਿਰੇਮਿਕ ਮੱਗ · ਪੱਕਾ ਪ੍ਰਿੰਟ · ਤੋਹਫ਼ੇ ਵਜੋਂ ਦੇਣ ਲਈ ਵਧੀਆ।",
    },
    art: "mug",
    priceInr: null,
    customizable: true,
    options: [],
    sample: {
      image: "lifestyle-mug",
      alt: "Sample: warm cream ceramic coffee mug with subtle gold cross beside a leather book, taper candle, and fir sprig",
    },
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
    occasions: ["weddings", "baptism", "sympathy", "christmas"],
    badge: "Heirloom Gift",
    name: { en: "Bible Verse Photo Frames", hi: "बाइबल वचन फ़ोटो फ़्रेम", pa: "ਬਾਈਬਲ ਵਚਨ ਫ਼ੋਟੋ ਫ਼ਰੇਮ" },
    blurb: {
      en: "Warm wood-toned tabletop & wall frames pairing your family photograph with scripture.",
      hi: "बाइबल वचन के साथ फ़्रेम में आपकी फ़ोटो।",
      pa: "ਬਾਈਬਲ ਵਚਨ ਨਾਲ ਫ਼ਰੇਮ ਵਿੱਚ ਤੁਹਾਡੀ ਫ਼ੋਟੋ।",
    },
    craftNote: {
      en: "Classic warm wood border · Ideal for Christian weddings, baptisms, housewarmings & memorials.",
      hi: "क्लासिक लकड़ी फ़िनिश · विवाह, बपतिस्मा और स्मृति उपहारों के लिए उत्तम।",
      pa: "ਕਲਾਸਿਕ ਲੱਕੜ ਫ਼ਿਨਿਸ਼ · ਵਿਆਹ, ਬਪਤਿਸਮਾ ਅਤੇ ਯਾਦਗਾਰੀ ਤੋਹਫ਼ਿਆਂ ਲਈ ਉੱਤਮ।",
    },
    art: "frame",
    priceInr: null,
    customizable: true,
    options: [],
    sample: {
      image: "lifestyle-frame",
      alt: "Sample: walnut-wood tabletop frame holding an olive branch and cross botanical art print on a linen mantel with pine garland",
    },
    designs: [
      { id: "i-can-do-all-things-through-christ-philippians-4-13", phrase: "I can do all things through Christ · Philippians 4:13", image: "frame-i-can-do-all-things", alt: "Frame with the verse “I can do all things through Christ”, Philippians 4:13" },
      { id: "the-lord-is-my-shepherd-i-lack-nothing-psalm-23-1", phrase: "The Lord is my shepherd, I lack nothing · Psalm 23:1", image: "frame-the-lord-is-my-shepherd", alt: "Frame with the verse “The Lord is my shepherd, I lack nothing”, Psalm 23:1" },
    ],
  },
  {
    slug: "personalized-keychain",
    category: "keepsakes",
    occasions: ["baptism", "easter", "christmas", "church"],
    badge: "Stocking Stuffer",
    name: { en: "Personalized Keychains", hi: "पर्सनलाइज़्ड कीचेन", pa: "ਪਰਸਨਲਾਈਜ਼ਡ ਕੀ-ਚੇਨ" },
    blurb: {
      en: "Pocket keepsake keychains printed with beloved verses, names, or a miniature portrait.",
      hi: "आपकी फ़ोटो या नाम वाली कीचेन।",
      pa: "ਤੁਹਾਡੀ ਫ਼ੋਟੋ ਜਾਂ ਨਾਮ ਵਾਲੀ ਕੀ-ਚੇਨ।",
    },
    craftNote: {
      en: "Polished split-ring hardware · Lightweight glossy plaque · Popular for Sunday school & confirmation favors.",
      hi: "मज़बूत मेटल रिंग · संडे स्कूल और दृढ़ीकरण उपहारों के लिए लोकप्रिय।",
      pa: "ਮਜ਼ਬੂਤ ਮੈਟਲ ਰਿੰਗ · ਸੰਡੇ ਸਕੂਲ ਅਤੇ ਪੁਸ਼ਟੀਕਰਨ ਤੋਹਫ਼ਿਆਂ ਲਈ ਮਸ਼ਹੂਰ।",
    },
    art: "keychain",
    priceInr: null,
    customizable: true,
    options: [],
    sample: {
      image: "lifestyle-keychain",
      alt: "Sample: antique brass and walnut keychain with cross charm resting on folded cream linen beside red velvet ribbon and fir sprig",
    },
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
    occasions: ["christmas", "church"],
    badge: "Christmas",
    name: { en: "Christian Christmas Gifts", hi: "मसीही क्रिसमस उपहार", pa: "ਮਸੀਹੀ ਕ੍ਰਿਸਮਸ ਤੋਹਫ਼ੇ" },
    blurb: {
      en: "Seasonal nativity keepsakes, ornaments, and gift boxes curated for family, choir, and church.",
      hi: "परिवार, दोस्तों और चर्च के लिए क्रिसमस उपहार।",
      pa: "ਪਰਿਵਾਰ, ਦੋਸਤਾਂ ਅਤੇ ਚਰਚ ਲਈ ਕ੍ਰਿਸਮਸ ਤੋਹਫ਼ੇ।",
    },
    craftNote: {
      en: "Festive Advent & Christmas presentation · Individual family parcels or congregation gift runs.",
      hi: "क्रिसमस और आगमन पर्व के लिए विशेष उपहार सेट।",
      pa: "ਕ੍ਰਿਸਮਸ ਅਤੇ ਆਗਮਨ ਤਿਉਹਾਰ ਲਈ ਵਿਸ਼ੇਸ਼ ਤੋਹਫ਼ੇ।",
    },
    art: "gift",
    sample: {
      image: "lifestyle-christmas-gifts",
      alt: "Sample: deep red linen gift box with gold ribbon, ceramic star ornament, lit candle, and evergreen sprigs",
    },
    priceInr: null,
    customizable: false,
    options: [],
    designs: [],
  },
  {
    slug: "church-gifts",
    category: "christmas-church",
    occasions: ["church", "easter", "christmas"],
    badge: "Bulk Orders",
    name: { en: "Customized Gifts for Churches", hi: "चर्च के लिए कस्टमाइज़्ड उपहार", pa: "ਚਰਚਾਂ ਲਈ ਕਸਟਮਾਈਜ਼ਡ ਤੋਹਫ਼ੇ" },
    blurb: {
      en: "Commemorative mugs, fellowship totes, and plaques printed with your church name and theme verse.",
      hi: "आपके चर्च के नाम या संदेश के साथ छपे उपहार।",
      pa: "ਤੁਹਾਡੇ ਚਰਚ ਦੇ ਨਾਮ ਜਾਂ ਸੁਨੇਹੇ ਨਾਲ ਛਪੇ ਤੋਹਫ਼ੇ।",
    },
    craftNote: {
      en: "Custom congregation lettering · Pastor appreciation, church anniversaries & Sunday welcome kits.",
      hi: "चर्च वर्षगाँठ, पास्टर सम्मान और संगति सम्मेलनों के लिए।",
      pa: "ਚਰਚ ਵਰ੍ਹੇਗੰਢ, ਪਾਸਟਰ ਸਨਮਾਨ ਅਤੇ ਸੰਗਤ ਸਮਾਗਮਾਂ ਲਈ।",
    },
    art: "church",
    sample: {
      image: "lifestyle-church-gifts",
      alt: "Sample: canvas fellowship tote with gold cross, two matching ceramic mugs, and carved walnut cross plaque on oak table",
    },
    priceInr: null,
    customizable: false,
    options: [],
    designs: [],
  },
  {
    slug: "christian-souvenirs",
    category: "christmas-church",
    occasions: ["baptism", "weddings", "sympathy", "easter"],
    badge: "Milestones",
    name: { en: "Personalized Christian Souvenirs", hi: "पर्सनलाइज़्ड मसीही स्मृति-चिह्न", pa: "ਪਰਸਨਲਾਈਜ਼ਡ ਮਸੀਹੀ ਯਾਦਗਾਰੀ ਚੀਜ਼ਾਂ" },
    blurb: {
      en: "Heirloom bookmarks, wooden crosses, and magnets inscribed with a name, milestone date, or verse.",
      hi: "नाम, तारीख या वचन के साथ बनी यादगार चीज़ें।",
      pa: "ਨਾਮ, ਤਾਰੀਖ ਜਾਂ ਵਚਨ ਨਾਲ ਬਣੀਆਂ ਯਾਦਗਾਰੀ ਚੀਜ਼ਾਂ।",
    },
    craftNote: {
      en: "Thoughtful keepsakes for baptisms, confirmations, wedding favors & memorial services.",
      hi: "बपतिस्मा, विवाह और स्मृति सभाओं के लिए यादगार भेंट।",
      pa: "ਬਪਤਿਸਮਾ, ਵਿਆਹ ਅਤੇ ਯਾਦਗਾਰੀ ਸਭਾਵਾਂ ਲਈ ਤੋਹਫ਼ੇ।",
    },
    art: "souvenir",
    sample: {
      image: "lifestyle-souvenirs",
      alt: "Sample: carved olive-wood standing cross, leather bookmark with red tassel, linen keepsake box, evergreen, and candle",
    },
    priceInr: null,
    customizable: false,
    options: [],
    designs: [],
  },
];

export const productBySlug = (slug: string) => PRODUCTS.find((p) => p.slug === slug);
export const productsIn = (category: string) => PRODUCTS.filter((p) => p.category === category);
export const categoryBySlug = (slug: string) => CATEGORIES.find((c) => c.slug === slug);
