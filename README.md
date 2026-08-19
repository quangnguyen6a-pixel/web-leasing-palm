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
>
> The Savills mark itself was later enlarged on request
> (`.savills-logo`, `height: clamp(38px, 3vw, 46px)` desktop /
> `32px` mobile, aspect ratio preserved via `width: auto`). Since the
> header no longer carries a Palm City logo to compare against, Palm
> City's visual lead is maintained elsewhere on the page (page title,
> hero eyebrow/headline, footer) rather than by a side-by-side size
> comparison in the header.

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
- **Hero entrance sequence:** on load, the eyebrow, headline, supporting
  copy and explore link fade/lift in once (`.hero__enter`, `opacity`
  0→1 + `translateY(14px)→0`, `cubic-bezier(0.22, 1, 0.36, 1)`,
  `animation-fill-mode: forwards`, `animation-iteration-count: 1`) with
  a 90ms stagger and per-element durations (450/650/500/400ms) — the
  whole sequence resolves well under 2s. The entrance classes live on
  the eyebrow/`<h1>`/supporting/explore-link elements themselves; the
  headline's decorative water/bling layers live on `::before`/`::after`
  pseudo-elements of the inner `.hero__headline-text` span rather than
  on the `<h1>`, so no single element ever carries two conflicting
  `animation` shorthand declarations (see the shorthand-collision note
  below).
- **Hero typography (Cormorant Garamond, full-width):** the hero copy
  is a single centred column (`width: min(94vw, 1480px)`), not a boxed
  or right-aligned panel. All hero text uses Cormorant Garamond
  (headline 600, supporting 500 italic, eyebrow 500) so the Vietnamese
  diacritics stay sharp at large sizes; headline `clamp(76px, 7.2vw,
  118px)` desktop / `clamp(44px, 12vw, 62px)` mobile, `text-wrap:
  balance` to avoid orphan words instead of manual line breaks (which
  would fight the i18n textContent swap).
- **Water-in-letters headline effect:** three layers, all scoped to
  `.hero__headline-text` so the water texture never bleeds outside the
  glyphs:
  1. The live text itself is a sharp, static icy white-to-light-blue
     `background-clip: text` gradient (`@supports`-guarded, with a
     plain `#eaf6ff` fallback) — always legible, never blurred.
  2. A `::before` duplicate (`content: attr(data-text)`, kept in sync
     with the current language by `applyLanguage()` in `js/main.js`)
     layers a second, animated gradient on top (`hero-water-move`,
     6.2s ease-in-out alternate, background-position drift only) with
     `mix-blend-mode: screen` so it reads as moving light, not a flat
     texture.
  3. That same `::before` layer — and only that layer — carries
     `filter: url(#hero-water-turbulence)`, a hidden inline SVG filter
     (`feTurbulence` with an animated `baseFrequency` + light
     `feDisplacementMap`, defined once near the top of `.hero`) for a
     subtle refraction wobble. It is dropped on mobile
     (`filter: none`) to keep low-power GPUs smooth.
  A separate `::after` on `.hero__headline-text` is the "bling": a
  narrow white-cyan sweep clipped to the letters (`hero-bling-sweep`,
  ~1.3s travel, repeating every 6s, first pass ~1.2s after load) plus
  five small four-point `.hero__sparkle` spans positioned via
  `--sx`/`--sy`/`--sdelay` custom properties, each flashing
  scale/opacity 0→0.85→0 in sync with the sweep. The supporting line
  gets a quieter version of the same sweep (its own `::before`, 200ms
  delayed) and a restrained reflection (`::after`, flipped copy,
  opacity ~0.1, height-capped and mask-faded so it never reaches the
  CTA below it).
- **Shorthand-collision lesson (recorded once, still relevant):** an
  earlier build put an infinite shine `animation` and the one-shot
  entrance `animation` on the *same* element; because both rules had
  equal CSS specificity, the later one in source order silently
  replaced the other's shorthand, leaving the headline stuck at
  `opacity: 0` with nothing left to animate it to `1`. The current
  design avoids this by construction — every animated hero layer is
  its own pseudo-element or sibling span, never sharing an `animation`
  shorthand with the entrance classes.
- **Reduced motion:** under `prefers-reduced-motion: reduce`, the
  headline and supporting line fall back to the sharp static gradient
  text only — `.hero__headline-text::before/::after`,
  `.hero__supporting::before/::after` and `.hero__sparkle` are all
  `display: none !important` (not just paused), which also removes the
  SVG filter reference entirely.
- **Hero interactivity:** on mouse/trackpad devices only (`(hover:
  hover) and (pointer: fine)`, checked in `js/main.js`), a soft warm
  glow (`.hero__spotlight`) tracks the cursor over the hero image via
  `--spot-x`/`--spot-y` CSS custom properties updated on `mousemove`.
  Since it's driven directly by the user's own pointer rather than
  autoplay, it stays active under `prefers-reduced-motion`.
- **Water-reflection system:** a restrained, riverside-inspired layer
  on top of the existing glassmorphism, applied selectively — never to
  nav, mobile menu, popup, or body copy:
  - **Hero:** `.hero__water` (lower ~32% of the hero, `mask-image`
    fades the top edge) drifts very slowly (`water-drift`, 19s,
    `translate3d`+`scale` only) via its `::before`, opacity ~0.1,
    `mix-blend-mode: screen`, `pointer-events: none`.
  - **Project introduction:** superseded by the borderless
    `.project-intro` treatment described in full in §9 (glass wash +
    ripple, replacing the earlier boxed storytelling panel).
  - **USP cards:** `.stat-card::before` is a static idle water texture
    identical on all three cards; `::after` is a one-shot light ripple
    that plays only while a given card is `:hover` (never more than
    one card at a time, since it's hover-scoped, not global).
    `.stat-card__accent` (the yellow top tick) was split out into a
    real element so `::before`/`::after` were free for the water
    layers; all real card content is pinned to `z-index: 1` above them.
  - **Section seam:** `.section-water-divider`, a 2px strip between
    the hero and Project Overview with a slow-drifting (20s, linear)
    low-opacity highlight line — not a wave shape.
  - **Reduced motion:** the two infinite-loop animations (hero water,
    divider) get an explicit `animation-name: none !important` under
    `prefers-reduced-motion` (same reasoning as the headline shine —
    the site's global near-zero-duration rule would otherwise make an
    infinite animation strobe). The one-shot effects (panel entrance,
    card ripple) are left to that global rule, since a single
    near-instant play is harmless. Static `::before` textures remain
    visible either way. The hero/divider drift is also turned off
    below 768px to keep mobile scrolling cheap.

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

`#overview` (`.project-overview` in `index.html`) is a fully designed,
approved-content section: a bilingual eyebrow/heading, a borderless
introduction, and a 3-column USP stat-card grid (indicative price /
booking amount / incentive).

- **Container/alignment:** reuses the exact same box model as
  `.header-inner` and `.hero__content` — `.project-overview__container`
  has `max-width: var(--content-max-width)` with the padding *inside*
  that max-width box (not section-padding-then-inner, which is what
  `.placeholder-section` uses). This keeps its left/right edges
  pixel-identical to the hero and nav at every breakpoint, including
  the ≥1440px max-width bump to 1360px.
- **`.project-intro` (introduction copy):** two approved paragraphs,
  left-aligned, `max-width: 880px`, **not** a boxed card — no border,
  radius, box-shadow, or fixed height. `::before` is a borderless glass
  wash (`backdrop-filter: blur(7px)`, masked so it fades into the navy
  section background rather than reading as a UI element — see the
  literal CSS in the section's comment block). `::after` is a slow
  water ripple behind the copy (8s loop, ~1.4s visible, opacity capped
  ≤0.15, `mix-blend-mode: screen`, `pointer-events: none`); the centre
  behind the text stays calm. `.project-overview` itself carries
  `overflow-x: hidden` so the wash's intentional horizontal bleed
  (`inset: -20px -40px`) never causes page-level horizontal scroll on
  narrow viewports.
- **USP figures are final, client-approved values** (168 / 100 / 16.5),
  written directly in the HTML (`data-value`, `data-decimals`) so they
  render correctly with no JS. `js/main.js` progressively enhances
  them: once the section scrolls into view, each number counts up from
  0 over ~1s (`IntersectionObserver`, `requestAnimationFrame`, ease-out
  cubic), then gets a `.is-counted` class that triggers a repeating
  gold/white shine + a tiny glint near the number's upper-right corner
  (CSS only, 4.4s loop, staggered ~300ms per card via `--shine-delay`).
  The shine gradient's fallback (no `background-clip: text` support) is
  the plain solid-yellow `color` already set on `.stat-card__value`.
  VI numbers use a comma decimal (`16,5`); EN uses a dot (`16.5`) —
  `formatStatValue()` reads `document.documentElement`'s `lang` on
  every re-render, including on language switch.
- **Scroll reveal:** the intro and cards fade/slide in on scroll via
  `[data-reveal]` + `IntersectionObserver` in `js/main.js`
  (`.reveal-pending` / `.is-visible` in `styles.css`). This is
  progressive enhancement — the JS only *adds* the hidden state, so
  content stays visible with JS disabled or no `IntersectionObserver`
  support. Respects `prefers-reduced-motion` via the existing global
  rule.
- **Reduced motion:** count-up is skipped entirely (the HTML's final
  numbers are left untouched — never zeroed), and the intro ripple /
  USP shine+glint get an explicit `animation-name: none !important`
  (same reasoning as the hero headline shine: the site's global
  near-zero-duration override alone would make an infinite-iteration
  animation strobe rather than freeze).

`#location`, `#amenities`, `#floor-plans`, `#gallery`, `#progress`
remain intentionally minimal placeholders — just a bilingual heading,
no body copy — used only to validate sticky header behaviour, smooth
scrolling, active-menu state, anchor links, and responsive layout.
**They are not final section designs** and carry no assumed project
content.

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

Hero copy (headline + supporting copy) in `index.html` is still
unapproved marketing copy — kept unchanged per current instructions,
but there is no longer a visible "Draft – Pending Approval" flag on
the page (removed along with all other demo/placeholder labels; see
the code comment above the headline in `index.html`). Confirm with the
project team before production use.

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
