export const LANGS = ["en", "hi", "pa"] as const;
export type Lang = (typeof LANGS)[number];
export type L10n = Record<Lang, string>;

export const LANG_LABEL: L10n = { en: "English", hi: "हिंदी", pa: "ਪੰਜਾਬੀ" };

// UI copy. Hindi and Punjabi are best-effort and need a native speaker's review (see README).
export const STRINGS = {
  blessings: { en: "Faith · Love · Christmas · Blessings", hi: "विश्वास · प्रेम · क्रिसमस · आशीष", pa: "ਵਿਸ਼ਵਾਸ · ਪਿਆਰ · ਕ੍ਰਿਸਮਸ · ਬਰਕਤਾਂ" },
  tagline: { en: "Printing Faith, Sharing Grace!", hi: "विश्वास छापते हैं, अनुग्रह बाँटते हैं!", pa: "ਵਿਸ਼ਵਾਸ ਛਾਪਦੇ ਹਾਂ, ਕਿਰਪਾ ਵੰਡਦੇ ਹਾਂ!" },
  celebrate: { en: "Celebrate the Joy of Christmas!", hi: "क्रिसमस की खुशी मनाएँ!", pa: "ਕ੍ਰਿਸਮਸ ਦੀ ਖੁਸ਼ੀ ਮਨਾਓ!" },
  intro: {
    en: "Make this Christmas memorable with beautiful Christian gifts and personalized creations.",
    hi: "सुंदर मसीही उपहारों और व्यक्तिगत रचनाओं के साथ इस क्रिसमस को यादगार बनाएँ।",
    pa: "ਸੁੰਦਰ ਮਸੀਹੀ ਤੋਹਫ਼ਿਆਂ ਅਤੇ ਨਿੱਜੀ ਰਚਨਾਵਾਂ ਨਾਲ ਇਸ ਕ੍ਰਿਸਮਸ ਨੂੰ ਯਾਦਗਾਰ ਬਣਾਓ।",
  },
  giftsMotto: { en: "Gifts Inspired by Faith, Created with Love!", hi: "विश्वास से प्रेरित उपहार, प्रेम से बनाए गए!", pa: "ਵਿਸ਼ਵਾਸ ਤੋਂ ਪ੍ਰੇਰਿਤ ਤੋਹਫ਼ੇ, ਪਿਆਰ ਨਾਲ ਬਣਾਏ!" },

  navHome: { en: "Home", hi: "होम", pa: "ਹੋਮ" },
  navProducts: { en: "Products", hi: "उत्पाद", pa: "ਉਤਪਾਦ" },
  navAbout: { en: "About", hi: "हमारे बारे में", pa: "ਸਾਡੇ ਬਾਰੇ" },
  navContact: { en: "Contact", hi: "संपर्क", pa: "ਸੰਪਰਕ" },
  navOrder: { en: "Order", hi: "ऑर्डर", pa: "ਆਰਡਰ" },
  language: { en: "Language", hi: "भाषा", pa: "ਭਾਸ਼ਾ" },

  browse: { en: "Browse products", hi: "उत्पाद देखें", pa: "ਉਤਪਾਦ ਵੇਖੋ" },
  chatWhatsApp: { en: "Chat on WhatsApp", hi: "WhatsApp पर बात करें", pa: "WhatsApp 'ਤੇ ਗੱਲ ਕਰੋ" },
  ourProducts: { en: "Our Products & Services", hi: "हमारे उत्पाद और सेवाएँ", pa: "ਸਾਡੇ ਉਤਪਾਦ ਅਤੇ ਸੇਵਾਵਾਂ" },
  howTitle: { en: "How ordering works", hi: "ऑर्डर कैसे करें", pa: "ਆਰਡਰ ਕਿਵੇਂ ਕਰੀਏ" },
  how1: { en: "Pick a product and add your photo, name or Bible verse.", hi: "उत्पाद चुनें और अपनी फ़ोटो, नाम या बाइबल वचन जोड़ें।", pa: "ਉਤਪਾਦ ਚੁਣੋ ਅਤੇ ਆਪਣੀ ਫ਼ੋਟੋ, ਨਾਮ ਜਾਂ ਬਾਈਬਲ ਵਚਨ ਜੋੜੋ।" },
  how2: { en: "Send your order request to us on WhatsApp and attach your photo there.", hi: "अपना ऑर्डर अनुरोध WhatsApp पर भेजें और वहीं अपनी फ़ोटो जोड़ें।", pa: "ਆਪਣੀ ਆਰਡਰ ਬੇਨਤੀ WhatsApp 'ਤੇ ਭੇਜੋ ਅਤੇ ਉੱਥੇ ਹੀ ਆਪਣੀ ਫ਼ੋਟੋ ਲਗਾਓ।" },
  how3: { en: "We confirm the price, then you pay by UPI.", hi: "हम कीमत बताएँगे, फिर आप UPI से भुगतान करें।", pa: "ਅਸੀਂ ਕੀਮਤ ਦੱਸਾਂਗੇ, ਫਿਰ ਤੁਸੀਂ UPI ਨਾਲ ਭੁਗਤਾਨ ਕਰੋ।" },

  allProducts: { en: "All products", hi: "सभी उत्पाद", pa: "ਸਾਰੇ ਉਤਪਾਦ" },
  view: { en: "View", hi: "देखें", pa: "ਵੇਖੋ" },
  customizable: { en: "Add your photo & text", hi: "अपनी फ़ोटो और टेक्स्ट जोड़ें", pa: "ਆਪਣੀ ਫ਼ੋਟੋ ਅਤੇ ਲਿਖਤ ਜੋੜੋ" },
  priceOnRequest: { en: "Price on request", hi: "कीमत पूछें", pa: "ਕੀਮਤ ਪੁੱਛੋ" },
  placeholderPrice: { en: "Placeholder price", hi: "अस्थायी कीमत", pa: "ਅਸਥਾਈ ਕੀਮਤ" },
  samplePhoto: { en: "Sample photo", hi: "नमूना फ़ोटो", pa: "ਨਮੂਨਾ ਫ਼ੋਟੋ" },
  placeholderImage: { en: "Placeholder image", hi: "नमूना चित्र", pa: "ਨਮੂਨਾ ਤਸਵੀਰ" },

  pickDesign: { en: "Pick a design", hi: "डिज़ाइन चुनें", pa: "ਡਿਜ਼ਾਈਨ ਚੁਣੋ" },
  ownDesign: { en: "My own photo / text", hi: "मेरी अपनी फ़ोटो / टेक्स्ट", pa: "ਮੇਰੀ ਆਪਣੀ ਫ਼ੋਟੋ / ਲਿਖਤ" },
  pickFirst: {
    en: "Pick a design above, or choose “My own photo / text”.",
    hi: "ऊपर कोई डिज़ाइन चुनें, या “मेरी अपनी फ़ोटो / टेक्स्ट” चुनें।",
    pa: "ਉੱਪਰ ਕੋਈ ਡਿਜ਼ਾਈਨ ਚੁਣੋ, ਜਾਂ “ਮੇਰੀ ਆਪਣੀ ਫ਼ੋਟੋ / ਲਿਖਤ” ਚੁਣੋ।",
  },
  design: { en: "Design", hi: "डिज़ाइन", pa: "ਡਿਜ਼ਾਈਨ" },
  yourPhoto: { en: "Your photo", hi: "आपकी फ़ोटो", pa: "ਤੁਹਾਡੀ ਫ਼ੋਟੋ" },
  choosePhoto: { en: "Choose a photo", hi: "फ़ोटो चुनें", pa: "ਫ਼ੋਟੋ ਚੁਣੋ" },
  changePhoto: { en: "Change photo", hi: "फ़ोटो बदलें", pa: "ਫ਼ੋਟੋ ਬਦਲੋ" },
  photoNote: {
    en: "The photo stays on your phone. Attach it in the WhatsApp chat when you send the order.",
    hi: "फ़ोटो आपके फ़ोन पर ही रहती है। ऑर्डर भेजते समय उसे WhatsApp चैट में जोड़ें।",
    pa: "ਫ਼ੋਟੋ ਤੁਹਾਡੇ ਫ਼ੋਨ 'ਤੇ ਹੀ ਰਹਿੰਦੀ ਹੈ। ਆਰਡਰ ਭੇਜਣ ਵੇਲੇ ਇਸਨੂੰ WhatsApp ਚੈਟ ਵਿੱਚ ਲਗਾਓ।",
  },
  yourText: { en: "Your text (name, message or Bible verse)", hi: "आपका टेक्स्ट (नाम, संदेश या बाइबल वचन)", pa: "ਤੁਹਾਡੀ ਲਿਖਤ (ਨਾਮ, ਸੁਨੇਹਾ ਜਾਂ ਬਾਈਬਲ ਵਚਨ)" },
  notes: { en: "Notes for us (optional)", hi: "हमारे लिए नोट (वैकल्पिक)", pa: "ਸਾਡੇ ਲਈ ਨੋਟ (ਵਿਕਲਪਿਕ)" },
  notesHelp: { en: "Tell us what you need: quantity, occasion, colours, date.", hi: "बताएँ आपको क्या चाहिए: संख्या, अवसर, रंग, तारीख।", pa: "ਦੱਸੋ ਤੁਹਾਨੂੰ ਕੀ ਚਾਹੀਦਾ ਹੈ: ਗਿਣਤੀ, ਮੌਕਾ, ਰੰਗ, ਤਾਰੀਖ।" },
  quantity: { en: "Quantity", hi: "संख्या", pa: "ਗਿਣਤੀ" },
  preview: { en: "Preview", hi: "पूर्वावलोकन", pa: "ਝਲਕ" },
  addToOrder: { en: "Add to order", hi: "ऑर्डर में जोड़ें", pa: "ਆਰਡਰ ਵਿੱਚ ਜੋੜੋ" },
  added: { en: "Added to your order.", hi: "आपके ऑर्डर में जोड़ दिया गया।", pa: "ਤੁਹਾਡੇ ਆਰਡਰ ਵਿੱਚ ਜੋੜ ਦਿੱਤਾ ਗਿਆ।" },
  viewOrder: { en: "View order", hi: "ऑर्डर देखें", pa: "ਆਰਡਰ ਵੇਖੋ" },

  orderTitle: { en: "Your order request", hi: "आपका ऑर्डर अनुरोध", pa: "ਤੁਹਾਡੀ ਆਰਡਰ ਬੇਨਤੀ" },
  orderEmpty: { en: "Your order is empty.", hi: "आपका ऑर्डर खाली है।", pa: "ਤੁਹਾਡਾ ਆਰਡਰ ਖਾਲੀ ਹੈ।" },
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
  upiPending: { en: "UPI ID coming soon (placeholder)", hi: "UPI ID जल्द आएगी (अस्थायी)", pa: "UPI ID ਜਲਦੀ ਆਵੇਗੀ (ਅਸਥਾਈ)" },
  upiId: { en: "UPI ID", hi: "UPI ID", pa: "UPI ID" },

  mainOffice: { en: "Main Office", hi: "मुख्य कार्यालय", pa: "ਮੁੱਖ ਦਫ਼ਤਰ" },
  branchOffice: { en: "Branch Office", hi: "शाखा कार्यालय", pa: "ਸ਼ਾਖਾ ਦਫ਼ਤਰ" },
  call: { en: "Call", hi: "कॉल करें", pa: "ਕਾਲ ਕਰੋ" },
  whatsapp: { en: "WhatsApp", hi: "WhatsApp", pa: "WhatsApp" },
  map: { en: "Open in Google Maps", hi: "Google Maps में खोलें", pa: "Google Maps ਵਿੱਚ ਖੋਲ੍ਹੋ" },
  contactTitle: { en: "Contact us", hi: "संपर्क करें", pa: "ਸੰਪਰਕ ਕਰੋ" },

  aboutTitle: { en: "About Sampson Grace Prints", hi: "सैम्पसन ग्रेस प्रिंट्स के बारे में", pa: "ਸੈਮਸਨ ਗ੍ਰੇਸ ਪ੍ਰਿੰਟਸ ਬਾਰੇ" },
  about1: {
    en: "Sampson Grace Prints is a Christian printing shop in Punjab. We print photos, names and Bible verses on T-shirts, mugs, caps, keychains and photo frames, and make Christmas gifts and gifts for churches.",
    hi: "सैम्पसन ग्रेस प्रिंट्स पंजाब की एक मसीही प्रिंटिंग दुकान है। हम टी-शर्ट, मग, कैप, कीचेन और फ़ोटो फ़्रेम पर फ़ोटो, नाम और बाइबल वचन छापते हैं, और क्रिसमस उपहार व चर्च के लिए उपहार बनाते हैं।",
    pa: "ਸੈਮਸਨ ਗ੍ਰੇਸ ਪ੍ਰਿੰਟਸ ਪੰਜਾਬ ਦੀ ਇੱਕ ਮਸੀਹੀ ਪ੍ਰਿੰਟਿੰਗ ਦੁਕਾਨ ਹੈ। ਅਸੀਂ ਟੀ-ਸ਼ਰਟਾਂ, ਮੱਗਾਂ, ਟੋਪੀਆਂ, ਕੀ-ਚੇਨਾਂ ਅਤੇ ਫ਼ੋਟੋ ਫ਼ਰੇਮਾਂ 'ਤੇ ਫ਼ੋਟੋ, ਨਾਮ ਅਤੇ ਬਾਈਬਲ ਵਚਨ ਛਾਪਦੇ ਹਾਂ, ਅਤੇ ਕ੍ਰਿਸਮਸ ਤੋਹਫ਼ੇ ਅਤੇ ਚਰਚਾਂ ਲਈ ਤੋਹਫ਼ੇ ਬਣਾਉਂਦੇ ਹਾਂ।",
  },
  about2: {
    en: "Our main office is run by Sampson Massey in Dera Bassi, and our branch office by Pardeep Robert in Bhogpur.",
    hi: "हमारा मुख्य कार्यालय डेरा बस्सी में सैम्पसन मैसी चलाते हैं, और शाखा कार्यालय भोगपुर में परदीप रॉबर्ट।",
    pa: "ਸਾਡਾ ਮੁੱਖ ਦਫ਼ਤਰ ਡੇਰਾ ਬੱਸੀ ਵਿੱਚ ਸੈਮਸਨ ਮੈਸੀ ਚਲਾਉਂਦੇ ਹਨ, ਅਤੇ ਸ਼ਾਖਾ ਦਫ਼ਤਰ ਭੋਗਪੁਰ ਵਿੱਚ ਪਰਦੀਪ ਰੌਬਰਟ।",
  },
  verse: { en: "I can do all things through Christ", hi: "मैं मसीह के द्वारा सब कुछ कर सकता हूँ", pa: "ਮੈਂ ਮਸੀਹ ਦੁਆਰਾ ਸਭ ਕੁਝ ਕਰ ਸਕਦਾ ਹਾਂ" },
  verseRef: { en: "Philippians 4:13", hi: "फिलिप्पियों 4:13", pa: "ਫ਼ਿਲਿੱਪੀਆਂ 4:13" },
} satisfies Record<string, L10n>;

export type StringKey = keyof typeof STRINGS;
