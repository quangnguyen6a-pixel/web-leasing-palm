# Palm City — Landing Page Front-end Prototype

Front-end prototype for the Palm City landing page (top navigation, hero
banner, language switcher, mobile menu, register-interest popup, sticky
header states, anchor navigation, and minimal placeholder sections).

**This is a prototype, not the production website.** It is not connected
to any back-end, CRM, or CMS. It exists to:

- Serve as a reviewable interface for stakeholder sign-off.
- Act as a front-end reference for the development team.
- Serve as the layout/behaviour baseline for the eventual WordPress/Elementor build.

Brand hierarchy: **Palm City** is the lead brand throughout the page
(page `<title>`, hero, footer). **Savills** appears only as the
distribution/sales agent (labelled "Đại lý phân phối / Sales Agent"),
never as the developer or investor.

> **Header exception, by explicit client request:** the top navigation
> shows the Savills mark only — the Palm City logo was removed from
> the header. This departs from the brand-hierarchy principle above
> (Palm City normally leading visually everywhere, including the nav);
> it was a deliberate, confirmed client decision, not an oversight.
> Palm City identity is still carried by the page title, hero, and
> footer. See the comment above the brand mark in `index.html` for the
> same note in code. Revisit if stakeholders flag it during review.

---

## 1. Running the prototype

No build step, no package manager, no dependencies.

**Option A — open directly**
Open `index.html` in a browser.

**Option B — local static server (recommended, avoids `file://` quirks)**
```bash
# Python
python3 -m http.server 8080

# or Node (if available)
npx serve .
```
Then visit `http://localhost:8080`.

---

## 2. File structure

```
palm-city-prototype/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
├── assets/
│   ├── palm-city-logo.svg     (placeholder — see assets/README.md)
│   ├── savills-logo.svg       (placeholder)
│   ├── palm-city-hero.webp    (placeholder)
│   └── README.md
└── README.md
```

Built with plain HTML5, CSS3, and vanilla JavaScript only — no React,
Vue, Angular, Tailwind, Bootstrap, jQuery, build tools, or package
manager.

---

## 3. Design tokens

Defined as CSS custom properties in `css/styles.css` (`:root`):

```css
--color-navy-primary: #001c3d;
--color-navy-secondary: #002b49;
--color-savills-yellow: #ffdf00;
--color-white: #ffffff;
--color-neutral-light: #f4f4f4;
--color-text: #262626;
--color-overlay: rgba(0, 28, 61, 0.48);

--font-heading: "Playfair Display", Georgia, serif;
--font-body: "Gotham", "SVN-Gotham", Arial, sans-serif;
```

**Yellow usage rule:** Savills yellow is reserved for active menu state,
hover/focus state, small accents, and the register-interest button. It
must never be used as a large background fill.

**Fonts:** the prototype loads Playfair Display from Google Fonts for
convenience. Gotham/SVN-Gotham is a licensed font and is **not** loaded
from any CDN here — production must supply the licensed webfont files
and update the `@font-face` / `font-family` stack accordingly.

---

## 4. Breakpoints

```css
/* Mobile */
@media (max-width: 767px) { ... }
/* Tablet */
@media (min-width: 768px) and (max-width: 1023px) { ... }
/* Desktop */
@media (min-width: 1024px) { ... }
/* Large desktop */
@media (min-width: 1440px) { ... }
```

---

## 5. Header states

- **Top of page:** transparent background, white text/logo, height
  ~84px (72px on mobile).
- **Scrolled** (after ~64px of scroll): switches to
  `data-state="scrolled"` — translucent navy (`rgba(0,28,61,0.74)`)
  with `backdrop-filter: blur(14px)`, subtle bottom border/shadow,
  height reduced to ~70px (~60px on mobile). Transition is 240ms.
- **Glass/interactive treatment:** nav links, the language switcher,
  hamburger, and the brand mark all get a translucent
  `rgba(255,255,255,0.08)` + `blur(6px)` hover/focus pill; the
  Register Interest button rests as a subtle glass pill and fills
  solid yellow on hover. The mobile drawer, its overlay, and the popup
  overlay also carry backdrop blur. The Project Overview stat cards
  lift and brighten their border on hover. All of this is CSS
  `transition`/`:hover`/`:focus-visible` only — no JS — and durations
  collapse under `prefers-reduced-motion` via the existing global rule.
- Implemented in `js/main.js` via a `scroll` listener that toggles
  `data-state` on `#site-header`; all visual differences are pure CSS
  driven off that attribute.
- Active nav item is tracked with `IntersectionObserver` against each
  `<section id="...">` in `<main>`, and marked with `aria-current="true"`
  (styled with an underline + yellow, never a background block).
- **Hero interactivity:** on mouse/trackpad devices only (`(hover:
  hover) and (pointer: fine)`, checked in `js/main.js`), a soft warm
  glow (`.hero__spotlight`) tracks the cursor over the hero image via
  `--spot-x`/`--spot-y` CSS custom properties updated on `mousemove`.
  Since it's driven directly by the user's own pointer rather than
  autoplay, it stays active under `prefers-reduced-motion`. The
  headline (`.hero__headline`) gets a restrained gold-white shine: a
  narrow highlight band sweeps across the text once every ~6.5s via a
  `background-clip: text` gradient animation, resting as plain white
  for most of the cycle — not a continuous shimmer. This animation
  **is** disabled under `prefers-reduced-motion` (explicit
  `animation-name: none !important` override, since the text would
  otherwise strobe under the site's global near-zero-duration rule).

---

## 6. Mobile menu states

- Below 768px, the desktop nav/utility controls are hidden and a
  hamburger button (`#hamburger-btn`) appears, with `aria-label`,
  `aria-expanded`, and `aria-controls="mobile-menu"`.
- Opens a right-side drawer panel (`#mobile-menu`) containing: brand
  group, section links, language switcher, and the Register Interest
  button.
- Closes on: close button, selecting a menu item, `Escape`, or clicking
  the overlay outside the panel.
- Page scroll is locked (`body { overflow: hidden }`) while open.
- Focus is trapped inside the panel while open and returned to the
  triggering element (the hamburger button) on close.

---

## 7. Language switcher logic

- Pure client-side, `js/main.js`, no page reload.
- All translatable text/labels use `data-lang-vi` / `data-lang-en`
  attributes (and `data-lang-vi-aria` / `data-lang-en-aria` for
  `aria-label`s); `applyLanguage()` swaps `textContent`/`aria-label`
  across every tagged element.
- Updates `<html lang="vi">` / `<html lang="en">`.
- Persists the choice in `localStorage` (`palmcity-lang`) so it
  survives reloads within the prototype.
- Does **not** change scroll position — the section the user is
  viewing stays in view.

**Production note:** this JS toggle is a prototype mechanism only. The
WordPress build should use WPML or Polylang with dedicated `/vi/` and
`/en/` URLs and correct `hreflang` tags. A client-side toggle is not an
acceptable SEO solution in production.

---

## 8. Popup open/close logic

- The Register Interest popup (`#register-popup`) opens **only** on an
  explicit click of a "Đăng ký quan tâm / Register Interest" trigger
  (header button or mobile menu button). It never auto-opens, has no
  timer, and no exit-intent trigger.
- `role="dialog"`, `aria-modal="true"`, focus trapped inside, focus
  returned to the button that opened it on close.
- Closes on: close button (×), `Escape`, or clicking the overlay.
- The form (`<form novalidate id="register-form">`) has its `submit`
  handled purely client-side:
  ```js
  // Prototype only.
  // Backend submission and validation will be implemented in production.
  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();
    closePopup();
  });
  ```
  No network request, no fake "success" confirmation, no data
  persistence anywhere.

---

## 9. Project Overview section

`#overview` (`.project-overview` in `index.html`) is a fully designed
section, not a placeholder: a bilingual eyebrow/heading, a restrained
glassmorphism storytelling panel, and a 3-column USP stat-card grid
(reference price / booking value / incentive level).

- **Container/alignment:** reuses the exact same box model as
  `.header-inner` and `.hero__content` — `.project-overview__container`
  has `max-width: var(--content-max-width)` with the padding *inside*
  that max-width box (not section-padding-then-inner, which is what
  `.placeholder-section` uses). This keeps its left/right edges
  pixel-identical to the hero and nav at every breakpoint, including
  the ≥1440px max-width bump to 1360px.
- **Copy and figures are drafts.** The storytelling paragraph carries
  a "Nội dung minh hoạ — chờ duyệt / Draft copy — pending approval"
  flag; the three stat cards show a dimmed "—" placeholder value
  (`.stat-card__value--placeholder`) with a note below the grid
  ("Số liệu minh hoạ — chờ xác nhận…"). Swap in approved copy/figures
  by editing the `data-lang-vi`/`data-lang-en` text and replacing the
  `—` — no structural changes needed.
- **Scroll reveal:** the panel and cards fade/slide in on scroll via
  `[data-reveal]` + `IntersectionObserver` in `js/main.js`
  (`.reveal-pending` / `.is-visible` in `styles.css`). This is
  progressive enhancement — the JS only *adds* the hidden state, so
  content stays visible with JS disabled or no `IntersectionObserver`
  support. Respects `prefers-reduced-motion` via the existing global
  rule.

`#location`, `#amenities`, `#floor-plans`, `#gallery`, `#progress`
remain intentionally minimal placeholders — bilingual heading + a
"Placeholder for development" label — used only to validate sticky
header behaviour, smooth scrolling, active-menu state, anchor links,
and responsive layout. **They are not final section designs** and
carry no assumed project content.

---

## 10. What has no back-end

- The Register Interest form does not submit, validate server-side, or
  store any data. No API calls, no CRM integration.
- The language switcher is a client-side text swap, not a real i18n
  routing system.
- No analytics, no cookie consent, no CMS wiring.

---

## 11. Assets to replace before production

See `assets/README.md`. The client-supplied logos and hero photo are
now in place: `assets/palm-city-logo.png`, `assets/savills-logo.png`,
`assets/palm-city-hero.webp` (the hero was cropped to remove a
baked-in headline/stats panel from the source file — see
`assets/README.md` for details). If missing, the prototype falls back
automatically to `[PALM_CITY_LOGO]` / `[SAVILLS_LOGO]` /
`[APPROVED_HERO_IMAGE]` text placeholders via each `<img>`'s
`onerror` handler.

Production should still swap in: a vector (SVG) version of each logo
if available, and — ideally — a light/white version of the Palm City
logo (see `assets/README.md` re: the `.logo-chip` contrast plaque used
in this prototype as a stand-in). Also replace the Google Fonts
Playfair Display link and the Gotham font stack with licensed,
self-hosted webfont files.

Hero copy (headline + supporting copy) in `index.html` is marked
**Draft – Pending Approval** and must be confirmed by the project team
before production use.

---

## 12. Mapping to WordPress / Elementor

| Prototype component | Elementor implementation |
| --- | --- |
| Header (`.site-header`) | Theme Builder Header |
| Hero (`.hero`) | Full-width Container |
| Main navigation (`.main-nav`) | Nav Menu Widget |
| Mobile drawer (`.mobile-menu`) | Nav Menu widget's built-in mobile dropdown, or a custom off-canvas widget |
| Language switcher (`.lang-switcher`) | WPML / Polylang language switcher widget |
| Popup (`#register-popup`) | Elementor Popup Builder |
| Registration form | Elementor Forms widget or CRM-connected form widget |
| Hero image (`.hero__image`) | Image/Picture widget with `srcset` |
| Anchor sections (`#overview`, etc.) | Container/Section IDs (Elementor "CSS ID") |

The prototype's CSS classes (`.hero__content`, `.main-nav__link`, etc.)
are intentionally **not** Elementor class names — the prototype does
not assume or depend on Elementor's own generated markup/classes.

---

## 13. QA checklist

- [ ] Desktop layout (≥1024px)
- [ ] Tablet layout (768–1023px)
- [ ] Mobile layout (≤767px)
- [ ] Sticky header transitions top → scrolled correctly
- [ ] Active nav link updates while scrolling through placeholder sections
- [ ] Smooth scroll works from header nav, mobile nav, and hero "Explore" link
- [ ] Language switching updates all tagged text, `<html lang>`, and persists across reload
- [ ] Mobile drawer opens/closes via button, item click, Escape, and overlay click; locks body scroll
- [ ] Popup opens only on explicit click (never automatically); traps focus; returns focus on close
- [ ] Keyboard-only navigation reaches header, mobile menu, and popup controls with visible focus states
- [ ] Hero image is responsive and does not distort at narrow/wide viewports
- [ ] Submitting the popup form never sends a network request (confirm in DevTools → Network)
- [ ] No project information (pricing, handover date, unit count, legal claims) appears anywhere
