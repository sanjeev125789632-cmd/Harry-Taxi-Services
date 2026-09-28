# Harry Taxi Services – Post-Launch Owner Action Checklist

This checklist contains all required operational, local SEO, and verification actions that the business owner (**Harry Taxi Services**) must complete to launch and rank successfully.

---

### 1. Fill in Placeholders in the HTML Codebase
Before deploying to your production web host, open the files and replace the visible square-bracket placeholders with your actual details:
- **`[PRICE]`**: Insert your verified per-vehicle rates (e.g. `INR 18,500`, `INR 38,000`).
- **`[DATE]`**: Set the current date (e.g. `March 2026` or `15 April 2026`) for all *"Prices valid as of"* and *"Last updated"* indicators.
- **`[KM]`** and **`[HRS]`**: Verify route distances and driving durations against seasonal conditions.
- **`[DRIVER NAME]`**: Enter the actual names of your registered drivers.
- **`[YEARS]`**: Enter real years of driving and Spiti experience.
- **`[XXXX]`**: Replace masked DL and badge placeholders with the real last 4 digits of driver commercial licenses.
- **`[PHONE NUMBER]`**: Enter your primary phone number across all `tel:` links and header/footer elements.
- **`[WHATSAPP NUMBER]`**: Enter your WhatsApp number in international format without plus or hyphens (e.g., `919816000000`) in `assets/js/main.js` and all `wa.me` links.
- **`[EMAIL]`**: Enter your official enquiry email.
- **`[PHYSICAL ADDRESS]`**: Enter your exact physical address or registered dispatch office in Shimla.
- **`[NUMBER]` / GST**: Enter your commercial GSTIN or HP State Tourist Taxi Permit Registration number.
- **`[ADVANCE %]`**: Specify your required advance deposit percentage (e.g. `20%` or `25%`).
- **`[REFUND %]`**: Confirm your cancellation refund slabs.
- **`[EXTRA KM RATE]`** and **`[EXTRA DAY CHARGE]`**: Set your extra usage rates.

---

### 2. Google Business Profile (GBP) Setup
- **Primary Category:** `Taxi service`
- **Secondary Category:** `Tour operator`
- **Business Type:** Service-Area Business (SAB) if your vehicle operates from your residence / dispatch yard without a customer walk-in retail counter (do NOT create a fake storefront address).
- **Service Areas:** Add `Shimla`, `Manali`, `Spiti Valley`, `Kinnaur`, `Chandigarh`, `Delhi NCR`.
- **NAP Consistency (Character for Character):**
  Ensure the Name, Address, and Phone Number match **exactly** across:
  - Website (`/#business` schema and About page)
  - Google Business Profile
  - Justdial
  - Sulekha
  - Tripadvisor
  - IndiaMART
- **Services with Prices:** Add individual services in GBP matching your website (e.g. *Shimla to Kaza Taxi*, *Spiti–Kinnaur Circuit Tour*, *Chandigarh to Manali Taxi*) with exact starting fares.
- **Real Photos:** Regularly upload high-resolution photos of your fleet (with visible HP commercial yellow plates) and scenic Himalayan halts (Kunzum Pass, Sangla, Chitkul, Kaza).

---

### 3. Verification Tags & Search Console
- **Google Search Console:**
  - Replace `[GOOGLE_SEARCH_CONSOLE_VERIFICATION_TOKEN]` in `index.html` with your verification meta tag.
  - Add domain property `harrytaxiservices.com` in Google Search Console.
  - Submit `https://harrytaxiservices.com/sitemap.xml`.
- **Bing Webmaster Tools:**
  - Replace `[BING_WEBMASTER_VERIFICATION_TOKEN]` with your Bing token.
  - Submit `https://harrytaxiservices.com/sitemap.xml`.
- **Google Analytics 4 (GA4):**
  - Add your GA4 Measurement ID (`G-XXXXXXXXXX`) to the `<head>` of all pages.
  - Verify that the conversion events (`form_submit`, `whatsapp_click`, `call_click`) are firing in DebugView.

---

### 4. Technical Validation & Core Web Vitals
- **Schema Validation:**
  - Run your live URLs through Google's [Rich Results Test](https://search.google.com/test/rich-results) and the [Schema Markup Validator](https://validator.schema.org/).
  - Confirm `LocalBusiness`, `Service`, `TouristTrip`, and `BreadcrumbList` are detected without errors.
- **Mobile Core Web Vitals:**
  - Test on [PageSpeed Insights (Mobile)](https://pagespeed.web.dev/):
    - **LCP (Largest Contentful Paint):** Target ≤ 2.5s (Preloaded WebP hero image guarantees instant paint).
    - **INP (Interaction to Next Paint):** Target ≤ 200ms (Vanilla JS, deferred execution).
    - **CLS (Cumulative Layout Shift):** Target ≤ 0.1 (Explicit `width` and `height` on all media elements).

---

### 5. Review Gathering Protocol (E-E-A-T)
- Request a Google review from guests at the conclusion of every trip (send direct short link via WhatsApp when dropping at Chandigarh/Delhi Airport).
- Reply to 100% of reviews (both positive and neutral) in a professional, courteous tone.
- **Never offer financial incentives, discounts, or contest entries in exchange for reviews** (violates Google review policies).
