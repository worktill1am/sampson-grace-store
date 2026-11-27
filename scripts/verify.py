"""End-to-end check of the live store. Usage: python3 scripts/verify.py <base-url>"""
import sys, urllib.parse
from pathlib import Path
from playwright.sync_api import sync_playwright, expect

BASE = sys.argv[1].rstrip("/")
ROOT = Path(__file__).resolve().parent.parent
SHOTS = ROOT / "screenshots"
PHOTO = ROOT / "scripts" / "test-photo.jpg"
PHONE = "918360469833"
BRANCH_POSTER_NUMBER = "988810139"
PAGES = ["/", "/products", "/products/printed-coffee-mug", "/products/custom-cap", "/products/bible-verse-photo-frame",
         "/products/personalized-keychain", "/category/wear", "/category/keepsakes", "/category/christmas-church",
         "/products/custom-t-shirt", "/products/church-gifts", "/order", "/about", "/contact"]


def check_images(page, path):
    """Every <img> on the page must be fetchable as an image, and every loaded one must have decoded."""
    srcs = set(page.locator("img").evaluate_all("els => els.map(e => e.currentSrc || e.src)"))
    for src in srcs:
        if src.startswith("data:"): continue
        res = page.request.get(src)
        assert res.ok and res.headers["content-type"].startswith("image/"), (path, src, res.status)
    broken = page.locator("img").evaluate_all("els => els.filter(e => e.complete && e.naturalWidth === 0).map(e => e.src)")
    assert not broken, (path, broken)
    IMAGES_CHECKED.update(srcs)


IMAGES_CHECKED = set()


def flow(browser, name, viewport, shots):
    page = browser.new_page(viewport=viewport)
    errors = []
    page.on("console", lambda m: m.type == "error" and errors.append(m.text))
    page.on("pageerror", lambda e: errors.append(str(e)))

    # Every product shows a real photo or a tagged sample photo; no placeholder drawings remain.
    page.goto(BASE + "/products")
    # 3 AI samples (gifts, church, souvenirs) + the free Pexels tee lead photo. Mug and cap lead with Albert's own photos.
    expect(page.locator(".card .tag-sample")).to_have_count(4)
    expect(page.get_by_text("Placeholder image")).to_have_count(0)
    page.wait_for_load_state("networkidle")
    if "products" in shots: page.screenshot(path=SHOTS / shots["products"], full_page=True)

    page.goto(BASE + "/")
    expect(page.locator(".hero-title")).to_have_text("Sampson Grace Prints")
    expect(page.locator(".category .tag-sample")).to_have_count(2)  # tee tile + Christmas tile
    expect(page.locator(".category .photo").nth(0)).to_have_attribute("src", "/products/sample-tee-sm.webp")
    expect(page.locator(".category .photo").nth(1)).to_have_attribute("src", "/products/mug-jesus-is-my-saviour-sm.webp")
    if "home" in shots: page.screenshot(path=SHOTS / shots["home"], full_page=True)

    page.locator(".category").first.click()
    expect(page).to_have_url(BASE + "/category/wear")
    page.get_by_role("link", name="Customized T-Shirt Printing").click()
    expect(page).to_have_url(BASE + "/products/custom-t-shirt")

    # The faith-print sample photo leads; nothing is picked yet, so ordering waits for a choice.
    expect(page.locator(".product-grid .sample .photo")).to_have_attribute("src", "/products/sample-tee.webp")
    expect(page.locator(".product-grid .tag-sample")).to_have_text("Sample photo")
    expect(page.get_by_test_id("chosen-design")).to_have_count(0)
    expect(page.get_by_role("button", name="Add to order")).to_be_disabled()
    page.wait_for_load_state("networkidle")
    if "tee" in shots: page.screenshot(path=SHOTS / shots["tee"], full_page=True)
    page.locator("label.design", has_text="Walk In The Spirit").click()
    expect(page.get_by_test_id("chosen-design")).to_contain_text("Walk In The Spirit")
    expect(page.locator(".main-photo")).to_have_attribute("src", "/products/tee-walk-in-the-spirit.webp")
    page.locator("label.design", has_text="My own photo / text").click()
    page.set_input_files("input[type=file]", str(PHOTO))
    expect(page.locator(".print-area img")).to_be_visible()
    page.get_by_label("Your text").fill("With God All Things Are Possible")
    expect(page.locator(".print-area span")).to_have_text("With God All Things Are Possible")
    page.get_by_label("Size").select_option("L")
    page.get_by_label("Quantity").fill("2")
    if "product" in shots: page.screenshot(path=SHOTS / shots["product"], full_page=True)
    page.get_by_role("button", name="Add to order").click()
    expect(page.get_by_test_id("cart-count")).to_have_text("2")

    # The cap leads with Albert's red Shepherd cap, preselected and untagged.
    page.goto(BASE + "/products/custom-cap")
    expect(page.locator(".main-photo")).to_have_attribute("src", "/products/cap-red-jesus-is-my-shepherd.webp")
    expect(page.get_by_test_id("chosen-design")).to_contain_text("Jesus is my Shepherd · Psalm 23:1 (red)")
    expect(page.locator(".product-grid .tag-sample")).to_have_count(0)
    page.wait_for_load_state("networkidle")
    if "cap" in shots: page.screenshot(path=SHOTS / shots["cap"], full_page=True)

    # A ready design from the photo grid. The mug leads with Albert's "Jesus Is My Saviour" mug.
    page.goto(BASE + "/products/printed-coffee-mug")
    expect(page.locator(".main-photo")).to_have_attribute("src", "/products/mug-jesus-is-my-saviour.webp")
    page.get_by_role("img", name="Red mug printed “I am the way”, John 14:6").click()
    expect(page.get_by_test_id("chosen-design")).to_contain_text("I am the way · John 14:6")
    expect(page.locator(".main-photo")).to_have_attribute("src", "/products/mug-i-am-the-way.webp")
    # The picked design's photo must actually be decoded and on screen, not just set as src.
    page.wait_for_function("""() => { const i = document.querySelector('.main-photo');
        return i.complete && i.naturalWidth > 0 && i.currentSrc.endsWith('/products/mug-i-am-the-way.webp'); }""")
    if "designs" in shots: page.screenshot(path=SHOTS / shots["designs"], full_page=True)
    page.get_by_role("button", name="Add to order").click()
    expect(page.get_by_test_id("cart-count")).to_have_text("3")
    page.get_by_role("link", name="View order").click()
    expect(page).to_have_url(BASE + "/order")

    expect(page.locator(".line img.thumb")).to_have_count(2)  # uploaded-photo thumb + design photo
    page.get_by_label("Your name").fill("Test Customer")
    page.get_by_label("Town").fill("Dera Bassi")
    expect(page.get_by_test_id("upi-placeholder")).to_be_visible()
    if "order" in shots: page.screenshot(path=SHOTS / shots["order"], full_page=True)

    href = page.get_by_test_id("send-whatsapp").get_attribute("href")
    url = urllib.parse.urlparse(href)
    assert url.netloc == "wa.me" and url.path == f"/{PHONE}", href
    text = urllib.parse.parse_qs(url.query)["text"][0]
    for needle in ["Customized T-Shirt Printing x 2", "Design: My own photo/text", "Size: L",
                   "Printed Coffee Mugs x 1", "Design: I am the way · John 14:6", '"With God All Things Are Possible"',
                   "Photo: test-photo.jpg", "Name: Test Customer", "Town / address: Dera Bassi"]:
        assert needle in text, (needle, text)
    print(f"[{name}] WhatsApp link OK: wa.me/{PHONE}\n" + text)

    # Language switch persists across pages.
    page.get_by_role("button", name="ਪੰਜਾਬੀ").click()
    expect(page.locator("html")).to_have_attribute("lang", "pa")
    expect(page.locator("h1")).to_have_text("ਤੁਹਾਡੀ ਆਰਡਰ ਬੇਨਤੀ")
    page.goto(BASE + "/")
    expect(page.locator(".tagline")).to_have_text("ਵਿਸ਼ਵਾਸ ਛਾਪਦੇ ਹਾਂ, ਕਿਰਪਾ ਵੰਡਦੇ ਹਾਂ!")
    if "punjabi" in shots: page.screenshot(path=SHOTS / shots["punjabi"], full_page=True)
    page.get_by_role("button", name="हिंदी").click()
    expect(page.locator(".tagline")).to_have_text("विश्वास छापते हैं, अनुग्रह बाँटते हैं!")
    if "hindi" in shots: page.screenshot(path=SHOTS / shots["hindi"], full_page=True)
    page.get_by_role("button", name="English").click()
    expect(page.locator(".tagline")).to_have_text("Printing Faith, Sharing Grace!")

    # No branch phone anywhere; the only tel: link is the main office.
    for path in PAGES:
        page.goto(BASE + path)
        page.wait_for_load_state("networkidle")
        check_images(page, path)
        html = page.content()
        assert BRANCH_POSTER_NUMBER not in html, path
        tels = set(page.locator("a[href^='tel:']").evaluate_all("els => els.map(e => e.getAttribute('href'))"))
        assert tels <= {f"tel:+{PHONE}"}, (path, tels)
        was = set(page.locator("a[href*='wa.me']").evaluate_all("els => els.map(e => new URL(e.href).pathname)"))
        assert was <= {f"/{PHONE}"}, (path, was)
    expect(page.get_by_test_id("branchOffice").locator("a[href^='tel:']")).to_have_count(0)
    expect(page.get_by_test_id("branchOffice").locator("a[href*='wa.me']")).to_have_count(0)
    expect(page.get_by_test_id("mainOffice").locator(f"a[href='tel:+{PHONE}']")).to_have_count(1)
    if "contact" in shots: page.screenshot(path=SHOTS / shots["contact"], full_page=True)

    assert not errors, errors
    print(f"[{name}] full flow OK, no console errors")
    page.close()


with sync_playwright() as p:
    browser = p.chromium.launch()
    flow(browser, "mobile 390x844", {"width": 390, "height": 844},
         {"home": "home-mobile.png", "product": "product-customization-mobile.png", "order": "order-mobile.png",
          "designs": "product-designs-mobile.png", "products": "products-all-mobile.png", "punjabi": "home-punjabi-mobile.png",
          "tee": "product-tee-mobile.png", "cap": "product-cap-mobile.png"})
    flow(browser, "desktop 1280x800", {"width": 1280, "height": 800},
         {"home": "home-desktop.png", "product": "product-customization-desktop.png", "order": "order-desktop.png",
          "contact": "contact-desktop.png", "hindi": "home-hindi-desktop.png",
          "tee": "product-tee-desktop.png", "cap": "product-cap-desktop.png"})
    browser.close()
print(f"{len([s for s in IMAGES_CHECKED if '/products/' in s])} product photo URLs loaded OK")
print("ALL CHECKS PASSED")
