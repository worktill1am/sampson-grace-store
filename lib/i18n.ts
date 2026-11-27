export const LANGS = ["en", "hi", "pa"] as const;
export type Lang = (typeof LANGS)[number];
export type L10n = Record<Lang, string>;

export const LANG_LABEL: L10n = { en: "English", hi: "हिंदी", pa: "ਪੰਜਾਬੀ" };

export const STRINGS = {
  blessings: {
    en: "Faith · Heirloom Prints · Sacred Milestones",
    hi: "विश्वास · यादगार प्रिंट · पवित्र अवसर",
    pa: "ਵਿਸ਼ਵਾਸ · ਯਾਦਗਾਰੀ ਪ੍ਰਿੰਟ · ਪਵਿੱਤਰ ਮੌਕੇ",
  },
  heroDisplay: {
    en: "Reverent Keepsakes & Custom Prints for Every Sacred Season.",
    hi: "हर पवित्र अवसर और क्रिसमस के लिए सुंदर मसीही उपहार व कस्टम प्रिंट।",
    pa: "ਹਰ ਪਵਿੱਤਰ ਮੌਕੇ ਅਤੇ ਕ੍ਰਿਸਮਸ ਲਈ ਸੁੰਦਰ ਮਸੀਹੀ ਤੋਹਫ਼ੇ ਅਤੇ ਕਸਟਮ ਪ੍ਰਿੰਟ।",
  },
  tagline: {
    en: "Printing Faith, Sharing Grace!",
    hi: "विश्वास छापते हैं, अनुग्रह बाँटते हैं!",
    pa: "ਵਿਸ਼ਵਾਸ ਛਾਪਦੇ ਹਾਂ, ਕਿਰਪਾ ਵੰਡਦੇ ਹਾਂ!",
  },
  celebrate: {
    en: "Christmas, Baptism, Weddings & Church Fellowship",
    hi: "क्रिसमस, बपतिस्मा, विवाह और चर्च संगति",
    pa: "ਕ੍ਰਿਸਮਸ, ਬਪਤਿਸਮਾ, ਵਿਆਹ ਅਤੇ ਚਰਚ ਸੰਗਤ",
  },
  intro: {
    en: "Thoughtfully printed Bible verse frames, ceramic mugs, custom T-shirts, caps, keychains, and seasonal nativity gifts — crafted to order in Dera Bassi & Bhogpur, Punjab.",
    hi: "बाइबल वचन फ़्रेम, सिरेमिक मग, कस्टम टी-शर्ट, कैप, कीचेन और क्रिसमस उपहार — डेरा बस्सी और भोगपुर, पंजाब में प्रेम से निर्मित।",
    pa: "ਬਾਈਬਲ ਵਚਨ ਫ਼ਰੇਮ, ਸਿਰੇਮਿਕ ਮੱਗ, ਕਸਟਮ ਟੀ-ਸ਼ਰਟਾਂ, ਟੋਪੀਆਂ, ਕੀ-ਚੇਨ ਅਤੇ ਕ੍ਰਿਸਮਸ ਤੋਹਫ਼ੇ — ਡੇਰਾ ਬੱਸੀ ਅਤੇ ਭੋਗਪੁਰ, ਪੰਜਾਬ ਵਿੱਚ ਪਿਆਰ ਨਾਲ ਤਿਆਰ।",
  },
  giftsMotto: {
    en: "Gifts Inspired by Faith, Created with Love!",
    hi: "विश्वास से प्रेरित उपहार, प्रेम से बनाए गए!",
    pa: "ਵਿਸ਼ਵਾਸ ਤੋਂ ਪ੍ਰੇਰਿਤ ਤੋਹਫ਼ੇ, ਪਿਆਰ ਨਾਲ ਬਣਾਏ!",
  },
  heroCaption: {
    en: "Seasonal Focus · Nativity & Advent Keepsakes alongside Year-Round Custom Prints",
    hi: "क्रिसमस और पूरे वर्ष के पवित्र अवसरों के लिए व्यक्तिगत मसीही उपहार",
    pa: "ਕ੍ਰਿਸਮਸ ਅਤੇ ਪੂਰੇ ਸਾਲ ਦੇ ਪਵਿੱਤਰ ਮੌਕਿਆਂ ਲਈ ਨਿੱਜੀ ਮਸੀਹੀ ਤੋਹਫ਼ੇ",
  },
  trustPrivacy: {
    en: "On-device photo preview (never uploaded)",
    hi: "फ़ोटो केवल आपके फ़ोन पर दिखती है",
    pa: "ਫ਼ੋਟੋ ਸਿਰਫ਼ ਤੁਹਾਡੇ ਫ਼ੋਨ 'ਤੇ ਰਹਿੰਦੀ ਹੈ",
  },
  trustProof: {
    en: "Pay via UPI only after WhatsApp price confirmation",
    hi: "WhatsApp पर कीमत तय होने के बाद ही UPI भुगतान",
    pa: "WhatsApp 'ਤੇ ਕੀਮਤ ਪੱਕੀ ਹੋਣ ਤੋਂ ਬਾਅਦ ਹੀ UPI ਭੁਗਤਾਨ",
  },

  navHome: { en: "Home", hi: "होम", pa: "ਹੋਮ" },
  navProducts: { en: "Shop", hi: "उत्पाद", pa: "ਉਤਪਾਦ" },
  navOccasions: { en: "Occasions", hi: "अवसर", pa: "ਮੌਕੇ" },
  navAbout: { en: "About", hi: "हमारे बारे में", pa: "ਸਾਡੇ ਬਾਰੇ" },
  navContact: { en: "Contact", hi: "संपर्क", pa: "ਸੰਪਰਕ" },
  navOrder: { en: "Order", hi: "ऑर्डर", pa: "ਆਰਡਰ" },
  quickBag: { en: "Cart", hi: "कार्ट", pa: "ਕਾਰਟ" },
  language: { en: "Language", hi: "भाषा", pa: "ਭਾਸ਼ਾ" },

  browse: { en: "Explore Keepsakes", hi: "उत्पाद देखें", pa: "ਉਤਪਾਦ ਵੇਖੋ" },
  chatWhatsApp: { en: "Chat on WhatsApp", hi: "WhatsApp पर बात करें", pa: "WhatsApp 'ਤੇ ਗੱਲ ਕਰੋ" },
  occasionsKicker: { en: "Gifting by Sacred Moment", hi: "अवसर के अनुसार उपहार", pa: "ਮੌਕੇ ਅਨੁਸਾਰ ਤੋਹਫ਼ੇ" },
  occasionsTitle: { en: "Curated for Life’s Milestones", hi: "हर खास अवसर के लिए चुने गए उपहार", pa: "ਹਰ ਖ਼ਾਸ ਮੌਕੇ ਲਈ ਚੁਣੇ ਗਏ ਤੋਹਫ਼ੇ" },
  departmentsKicker: { en: "Print Atelier Departments", hi: "हमारे विभाग", pa: "ਸਾਡੇ ਵਿਭਾਗ" },
  ourProducts: { en: "Our Collections & Custom Prints", hi: "हमारे उत्पाद और सेवाएँ", pa: "ਸਾਡੇ ਉਤਪਾਦ ਅਤੇ ਸੇਵਾਵਾਂ" },
  howKicker: { en: "Personal & Transparent Ordering", hi: "सरल और सुरक्षित प्रक्रिया", pa: "ਸਰਲ ਅਤੇ ਭਰੋਸੇਮੰਦ ਤਰੀਕਾ" },
  howTitle: { en: "How Custom WhatsApp & UPI Ordering Works", hi: "ऑर्डर कैसे करें", pa: "ਆਰਡਰ ਕਿਵੇਂ ਕਰੀਏ" },
  how1Title: { en: "Personalize Privately", hi: "अपनी पसंद चुनें", pa: "ਆਪਣੀ ਪਸੰਦ ਚੁਣੋ" },
  how1: {
    en: "Select a ready scripture design or preview your own photo and Bible verse directly in your browser — your photo never uploads to any server.",
    hi: "तैयार बाइबल डिज़ाइन चुनें या ब्राउज़र में अपनी फ़ोटो और वचन की झलक देखें — फ़ोटो किसी सर्वर पर अपलोड नहीं होती।",
    pa: "ਤਿਆਰ ਬਾਈਬਲ ਡਿਜ਼ਾਈਨ ਚੁਣੋ ਜਾਂ ਬ੍ਰਾਊਜ਼ਰ ਵਿੱਚ ਆਪਣੀ ਫ਼ੋਟੋ ਅਤੇ ਵਚਨ ਦੀ ਝਲਕ ਵੇਖੋ — ਫ਼ੋਟੋ ਕਿਸੇ ਸਰਵਰ 'ਤੇ ਅੱਪਲੋਡ ਨਹੀਂ ਹੁੰਦੀ।",
  },
  how2Title: { en: "Send Request on WhatsApp", hi: "WhatsApp पर भेजें", pa: "WhatsApp 'ਤੇ ਭੇਜੋ" },
  how2: {
    en: "Tap once to open WhatsApp with your complete itemized order written out in English, then attach your photo directly in that chat.",
    hi: "एक टैप से WhatsApp में पूरा लिखा हुआ ऑर्डर खोलें और उसी चैट में अपनी फ़ोटो जोड़ दें।",
    pa: "ਇੱਕ ਟੈਪ ਨਾਲ WhatsApp ਵਿੱਚ ਪੂਰਾ ਲਿਖਿਆ ਹੋਇਆ ਆਰਡਰ ਖੋਲ੍ਹੋ ਅਤੇ ਉੱਥੇ ਹੀ ਆਪਣੀ ਫ਼ੋਟੋ ਲਗਾਓ।",
  },
  how3Title: { en: "Confirm Price & Pay via UPI", hi: "पुष्टि और UPI भुगतान", pa: "ਪੁਸ਼ਟੀ ਅਤੇ UPI ਭੁਗਤਾਨ" },
  how3: {
    en: "Sampson Massey reviews your layout, confirms quantity pricing and delivery timing on WhatsApp, and only then do you pay via UPI.",
    hi: "हम WhatsApp पर डिज़ाइन और कीमत की पुष्टि करेंगे, उसके बाद ही आप UPI से भुगतान करें।",
    pa: "ਅਸੀਂ WhatsApp 'ਤੇ ਡਿਜ਼ਾਈਨ ਅਤੇ ਕੀਮਤ ਪੱਕੀ ਕਰਾਂਗੇ, ਉਸ ਤੋਂ ਬਾਅਦ ਹੀ ਤੁਸੀਂ UPI ਨਾਲ ਭੁਗਤਾਨ ਕਰੋ।",
  },

  allProducts: { en: "All Keepsakes & Prints", hi: "सभी उत्पाद", pa: "ਸਾਰੇ ਉਤਪਾਦ" },
  view: { en: "Personalize", hi: "देखें", pa: "ਵੇਖੋ" },
  customizable: { en: "Custom Photo & Verse", hi: "अपनी फ़ोटो और टेक्स्ट जोड़ें", pa: "ਆਪਣੀ ਫ਼ੋਟੋ ਅਤੇ ਲਿਖਤ ਜੋੜੋ" },
  priceOnRequest: { en: "Price on request", hi: "कीमत पूछें", pa: "ਕੀਮਤ ਪੁੱਛੋ" },
  placeholderPrice: { en: "Quoted on WhatsApp", hi: "WhatsApp पर कीमत", pa: "WhatsApp 'ਤੇ ਕੀਮਤ" },
  samplePhoto: { en: "Sample photo", hi: "नमूना फ़ोटो", pa: "ਨਮੂਨਾ ਫ਼ੋਟੋ" },
  placeholderImage: { en: "Placeholder image", hi: "नमूना चित्र", pa: "ਨਮੂਨਾ ਤਸਵੀਰ" },

  step1Label: { en: "Step 1 · Select Edition", hi: "चरण 1 · डिज़ाइन चुनें", pa: "ਕਦਮ 1 · ਡਿਜ਼ਾਈਨ ਚੁਣੋ" },
  step2Label: { en: "Step 2 · Personalize Canvas", hi: "चरण 2 · अपनी फ़ोटो व वचन", pa: "ਕਦਮ 2 · ਆਪਣੀ ਫ਼ੋਟੋ ਅਤੇ ਵਚਨ" },
  step3Label: { en: "Step 3 · Specifications & Quantity", hi: "चरण 3 · विवरण और संख्या", pa: "ਕਦਮ 3 · ਵੇਰਵਾ ਅਤੇ ਗਿਣਤੀ" },
  pickDesign: { en: "Pick a design", hi: "डिज़ाइन चुनें", pa: "ਡਿਜ਼ਾਈਨ ਚੁਣੋ" },
  ownDesign: { en: "My own photo / text", hi: "मेरी अपनी फ़ोटो / टेक्स्ट", pa: "ਮੇਰੀ ਆਪਣੀ ਫ਼ੋਟੋ / ਲਿਖਤ" },
  pickFirst: {
    en: "Select a scripture edition above, or choose “My own photo / text” to preview your custom print.",
    hi: "ऊपर कोई डिज़ाइन चुनें, या “मेरी अपनी फ़ोटो / टेक्स्ट” चुनें।",
    pa: "ਉੱਪਰ ਕੋਈ ਡਿਜ਼ਾਈਨ चुनੋ, ਜਾਂ “ਮੇਰੀ ਆਪਣੀ ਫ਼ੋਟੋ / ਲਿਖਤ” ਚੁਣੋ।",
  },
  design: { en: "Design", hi: "डिज़ाइन", pa: "ਡਿਜ਼ਾਈਨ" },
  yourPhoto: { en: "Your photo", hi: "आपकी फ़ोटो", pa: "ਤੁਹਾਡੀ ਫ਼ੋਟੋ" },
  choosePhoto: { en: "Choose a photo from your device", hi: "फ़ोटो चुनें", pa: "ਫ਼ੋਟੋ चुनੋ" },
  changePhoto: { en: "Change photo", hi: "फ़ोटो बदलें", pa: "ਫ਼ੋਟੋ ਬਦਲੋ" },
  photoNote: {
    en: "100% private: your photo stays on your device for live preview only. Attach it in the WhatsApp chat when sending your order.",
    hi: "फ़ोटो आपके फ़ोन पर ही रहती है। ऑर्डर भेजते समय उसे WhatsApp चैट में जोड़ें।",
    pa: "ਫ਼ੋਟੋ ਤੁਹਾਡੇ ਫ਼ੋਨ 'ਤੇ ਹੀ ਰਹਿੰਦੀ ਹੈ। ਆਰਡਰ ਭੇਜਣ ਵੇਲੇ ਇਸਨੂੰ WhatsApp ਚੈਟ ਵਿੱਚ ਲਗਾਓ।",
  },
  yourText: {
    en: "Your text (name, message or Bible verse)",
    hi: "आपका टेक्स्ट (नाम, संदेश या बाइबल वचन)",
    pa: "ਤੁਹਾਡੀ ਲਿਖਤ (ਨਾਮ, ਸੁਨੇਹਾ ਜਾਂ ਬਾਈਬਲ ਵਚਨ)",
  },
  versePrompts: {
    en: "Suggested milestone verses:",
    hi: "सुझाए गए बाइबल वचन:",
    pa: "ਸੁਝਾਏ ਗਏ ਬਾਈਬਲ ਵਚਨ:",
  },
  notes: { en: "Notes for us (optional)", hi: "हमारे लिए नोट (वैकल्पिक)", pa: "ਸਾਡੇ ਲਈ ਨੋਟ (ਵਿਕਲਪਿਕ)" },
  notesHelp: {
    en: "Occasion (Baptism, Wedding, Christmas), preferred garment/mug color, quantity, or needed-by date.",
    hi: "बताएँ आपको क्या चाहिए: संख्या, अवसर, रंग, तारीख।",
    pa: "ਦੱਸੋ ਤੁਹਾਨੂੰ ਕੀ ਚਾਹੀਦਾ ਹੈ: ਗਿਣਤੀ, ਮੌਕਾ, ਰੰਗ, ਤਾਰੀਖ।",
  },
  quantity: { en: "Quantity", hi: "संख्या", pa: "ਗਿਣਤੀ" },
  preview: { en: "Live Print Preview · Stays on Your Device", hi: "पूर्वावलोकन", pa: "ਝਲਕ" },
  addToOrder: { en: "Add to order", hi: "ऑर्डर में जोड़ें", pa: "ਆਰਡਰ ਵਿੱਚ ਜੋੜੋ" },
  added: { en: "Added to your order.", hi: "आपके ऑर्डर में जोड़ दिया गया।", pa: "ਤੁਹਾਡੇ ਆਰਡਰ ਵਿੱਚ ਜੋੜ ਦਿੱਤਾ ਗਿਆ।" },
  viewOrder: { en: "View order", hi: "ऑर्डर देखें", pa: "ਆਰਡਰ ਵੇਖੋ" },
  openDrawer: { en: "Quick preview drawer", hi: "त्वरित झलक", pa: "ਤੁਰੰਤ ਝਲਕ" },
  careSpecs: { en: "Materials, Print Care & Bulk Church Inquiries", hi: "सामग्री और देखभाल जानकारी", pa: "ਸਮੱਗਰੀ ਅਤੇ ਸੰਭਾਲ ਜਾਣਕਾਰੀ" },

  orderTitle: { en: "Your order request", hi: "आपका ऑर्डर अनुरोध", pa: "ਤੁਹਾਡੀ ਆਰਡਰ ਬੇਨਤੀ" },
  orderEmpty: { en: "Your order request bag is currently empty.", hi: "आपका ऑर्डर खाली है।", pa: "ਤੁਹਾਡਾ ਆਰਡਰ ਖਾਲੀ ਹੈ।" },
  remove: { en: "Remove", hi: "हटाएँ", pa: "ਹਟਾਓ" },
  photo: { en: "Photo", hi: "फ़ोटो", pa: "ਫ਼ੋਟੋ" },
  text: { en: "Text", hi: "टेक्स्ट", pa: "ਲਿਖਤ" },
  yourName: { en: "Your name", hi: "आपका नाम", pa: "ਤੁਹਾਡਾ ਨਾਮ" },
  yourPlace: { en: "Town / delivery address (optional)", hi: "शहर / डिलीवरी पता (वैकल्पिक)", pa: "ਸ਼ਹਿਰ / ਡਿਲੀਵਰੀ ਪਤਾ (ਵਿਕਲਪਿਕ)" },
  sendWhatsApp: { en: "Send order on WhatsApp", hi: "WhatsApp पर ऑर्डर भेजें", pa: "WhatsApp 'ਤੇ ਆਰਡਰ ਭੇਜੋ" },
  attachReminder: {
    en: "WhatsApp opens with your order written out. Please attach your photo(s) in that chat before sending.",
    hi: "WhatsApp में आपका ऑर्डर लिखा हुआ खुलेगा। भेजने से पहले उसी चैट में अपनी फ़ोटो जोड़ें।",
    pa: "WhatsApp ਵਿੱਚ ਤੁਹਾਡਾ ਆਰਡਰ ਲਿਖਿਆ ਹੋਇਆ ਖੁੱਲ੍ਹੇਗਾ। ਭੇਜਣ ਤੋਂ ਪਹਿਲਾਂ ਉਸੇ ਚੈਟ ਵਿੱਚ ਆਪਣੀ ਫ਼ੋਟੋ ਲਗਾਓ।",
  },
  payTitle: { en: "Pay by UPI", hi: "UPI से भुगतान", pa: "UPI ਨਾਲ ਭੁਗਤਾਨ" },
  payNote: {
    en: "Please pay only after we confirm your order and price on WhatsApp.",
    hi: "कृपया WhatsApp पर ऑर्डर और कीमत की पुष्टि के बाद ही भुगतान करें।",
    pa: "ਕਿਰਪਾ ਕਰਕੇ WhatsApp 'ਤੇ ਆਰਡਰ ਅਤੇ ਕੀਮਤ ਦੀ ਪੁਸ਼ਟੀ ਤੋਂ ਬਾਅਦ ਹੀ ਭੁਗਤਾਨ ਕਰੋ।",
  },
  upiPending: { en: "UPI QR shared after WhatsApp confirmation", hi: "UPI ID जल्द आएगी (अस्थायी)", pa: "UPI ID ਜਲਦੀ ਆਵੇਗੀ (ਅਸਥਾਈ)" },
  upiId: { en: "UPI ID", hi: "UPI ID", pa: "UPI ID" },

  mainOffice: { en: "Main Office", hi: "मुख्य कार्यालय", pa: "ਮੁੱਖ ਦਫ਼ਤਰ" },
  branchOffice: { en: "Branch Office", hi: "शाखा कार्यालय", pa: "ਸ਼ਾਖਾ ਦਫ਼ਤਰ" },
  call: { en: "Call", hi: "कॉल करें", pa: "ਕਾਲ ਕਰੋ" },
  whatsapp: { en: "WhatsApp", hi: "WhatsApp", pa: "WhatsApp" },
  map: { en: "Open in Google Maps", hi: "Google Maps में खोलें", pa: "Google Maps ਵਿੱਚ ਖੋਲ੍ਹੋ" },
  contactTitle: { en: "Contact us", hi: "संपर्क करें", pa: "ਸੰਪਰਕ ਕਰੋ" },

  aboutTitle: { en: "About Sampson Grace Prints", hi: "सैम्पसन ग्रेस प्रिंट्स के बारे में", pa: "ਸੈਮਸਨ ਗ੍ਰੇਸ ਪ੍ਰਿੰਟਸ ਬਾਰੇ" },
  about1: {
    en: "Sampson Grace Prints is a Christian custom-print and keepsake workshop in Punjab. We craft personalized T-shirts, ceramic mugs, embroidered and printed caps, pocket keychains, and Bible verse photo frames alongside seasonal Christmas and church fellowship gifts.",
    hi: "सैम्पसन ग्रेस प्रिंट्स पंजाब की एक मसीही प्रिंटिंग दुकान है। हम टी-शर्ट, मग, कैप, कीचेन और फ़ोटो फ़्रेम पर फ़ोटो, नाम और बाइबल वचन छापते हैं, और क्रिसमस उपहार व चर्च के लिए उपहार बनाते हैं।",
    pa: "ਸੈਮਸਨ ਗ੍ਰੇਸ ਪ੍ਰਿੰਟਸ ਪੰਜਾਬ ਦੀ ਇੱਕ ਮਸੀਹੀ ਪ੍ਰਿੰਟਿੰਗ ਦੁਕਾਨ ਹੈ। ਅਸੀਂ ਟੀ-ਸ਼ਰਟਾਂ, ਮੱਗਾਂ, ਟੋਪੀਆਂ, ਕੀ-ਚੇਨਾਂ ਅਤੇ ਫ਼ੋਟੋ ਫ਼ਰੇਮਾਂ 'ਤੇ ਫ਼ੋਟੋ, ਨਾਮ ਅਤੇ ਬਾਈਬਲ ਵਚਨ ਛਾਪਦੇ ਹਾਂ, ਅਤੇ ਕ੍ਰਿਸਮਸ ਤੋਹਫ਼ੇ ਅਤੇ ਚਰਚਾਂ ਲਈ ਤੋਹਫ਼ੇ ਬਣਾਉਂਦੇ ਹਾਂ।",
  },
  about2: {
    en: "Our main workshop in Dera Bassi is led by Sampson Massey, and our branch office in Bhogpur is led by Pardeep Robert. Every order — from a single baptism frame to bulk congregation gifts — is personally reviewed with you over WhatsApp.",
    hi: "हमारा मुख्य कार्यालय डेरा बस्सी में सैम्पसन मैसी चलाते हैं, और शाखा कार्यालय भोगपुर में परदीप रॉबर्ट।",
    pa: "ਸਾਡਾ ਮੁੱਖ ਦਫ਼ਤਰ ਡੇਰਾ ਬੱਸੀ ਵਿੱਚ ਸੈਮਸਨ ਮੈਸੀ ਚਲਾਉਂਦੇ ਹਨ, ਅਤੇ ਸ਼ਾਖਾ ਦਫ਼ਤਰ ਭੋਗਪੁਰ ਵਿੱਚ ਪਰਦੀਪ ਰੌਬਰਟ।",
  },
  verse: {
    en: "I can do all things through Christ",
    hi: "मैं मसीह के द्वारा सब कुछ कर सकता हूँ",
    pa: "ਮੈਂ ਮਸੀਹ ਦੁਆਰਾ ਸਭ ਕੁਝ ਕਰ ਸਕਦਾ ਹਾਂ",
  },
  verseRef: { en: "Philippians 4:13", hi: "फिलिप्पियों 4:13", pa: "ਫ਼ਿਲਿੱਪੀਆਂ 4:13" },
} satisfies Record<string, L10n>;

export type StringKey = keyof typeof STRINGS;
