# Palm City — Landing Page Front-end Prototype

Front-end prototype for the Palm City landing page (top navigation, hero
banner, language switcher, mobile menu, register-interest popup, sticky
header states, anchor navigation, and minimal placeholder sections).

**This is a prototype, not the production website.** It is not connected
to any back-end, CRM, or CMS. It exists to:

- Serve as a reviewable interface for stakeholder sign-off.
- Act as a front-end reference for the development team.
- Serve as the layout/behaviour baseline for the eventual WordPress/Elementor build.

Brand hierarchy: **Palm City** is the lead brand throughout. **Savills**
appears only as the distribution/sales agent (labelled "Đại lý phân phối
/ Sales Agent"), never as the developer or investor.

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
  `data-state="scrolled"` — navy background with `backdrop-filter:
  blur()`, subtle bottom border/shadow, height reduced to ~70px
  (~60px on mobile). Transition is 240ms.
- Implemented in `js/main.js` via a `scroll` listener that toggles
  `data-state` on `#site-header`; all visual differences are pure CSS
  driven off that attribute.
- Active nav item is tracked with `IntersectionObserver` against each
  `<section id="...">` in `<main>`, and marked with `aria-current="true"`
  (styled with an underline + yellow, never a background block).

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

## 9. Placeholder sections

`#overview`, `#location`, `#amenities`, `#floor-plans`, `#gallery`,
`#progress` in `index.html` are intentionally minimal — bilingual
heading + a "Placeholder for development" label, alternating neutral
backgrounds. They exist only to validate sticky header behaviour,
smooth scrolling, active-menu state, anchor links, and responsive
layout. **They are not final section designs** and carry no assumed
project content (no pricing, unit counts, handover dates, or other
project-specific claims).

---

## 10. What has no back-end

- The Register Interest form does not submit, validate server-side, or
  store any data. No API calls, no CRM integration.
- The language switcher is a client-side text swap, not a real i18n
  routing system.
- No analytics, no cookie consent, no CMS wiring.

---

## 11. Assets to replace before production

See `assets/README.md`. In short: drop in
`assets/palm-city-logo.svg`, `assets/savills-logo.svg`, and
`assets/palm-city-hero.webp` (exact filenames) and the prototype's
`[PALM_CITY_LOGO]` / `[SAVILLS_LOGO]` / `[APPROVED_HERO_IMAGE]`
placeholders disappear automatically (via each `<img>`'s `onerror`
fallback). Also replace the Google Fonts Playfair Display link and the
Gotham font stack with licensed, self-hosted webfont files.

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
