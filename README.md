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
│   ├── styles.css      (Hero / Overview / USP — approved, do not rebuild)
│   └── sections.css    (everything below USP — see §9b)
├── js/
│   ├── main.js         (approved nav/menu/popup/language/USP logic)
│   ├── config.js        (projectConfig + data objects for §9b)
│   └── sections.js      (renders/wires the §9b sections)
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

Defined as CSS custom properties in `css/styles.css` (`:root`) — the
Champagne Gold × Savills Navy colour system (see §9k for the full pass):

```css
--savills-navy: #001c3d;
--navy-secondary: #002b49;
--navy-elevated: #0a3554;

--gold-deep: #8a651b;
--gold-antique: #b98a2e;
--gold-main: #c79b42;
--gold-champagne: #e7d29a;
--gold-highlight: #f3e6c6;

--warm-ivory: #f8f2e6;
--warm-muted: #d9d0c2;

--savills-yellow: #ffdf00;
--savills-yellow-hover: #ffe63b;
--savills-yellow-active: #e6c900;
--savills-red: #cd171e;

--gold-metallic: linear-gradient(105deg, #8a651b 0%, #c79b42 24%, #f3e6c6 48%, #d6b566 66%, #9a6b1f 100%);
--gold-soft: linear-gradient(135deg, rgba(243, 230, 198, 0.18) 0%, rgba(199, 155, 66, 0.09) 46%, rgba(138, 101, 27, 0.06) 100%);

--font-heading: "Playfair Display", Georgia, serif;
--font-body: "Gotham", "SVN-Gotham", Arial, sans-serif;
```

The pre-existing token names (`--color-navy-primary`, `--color-savills-yellow`,
`--color-white`, etc.) are kept as aliases onto the tokens above, so every
rule written against the old names still resolves correctly — no
site-wide renaming was needed.

**Yellow usage rule:** Solid Savills Yellow (`--savills-yellow`) is
reserved exclusively for primary conversion CTAs (register/request-info/
pricing/contact/brochure buttons, the popup's submit button) and the
approved square icon backgrounds in the Savills benefit cards. Every
other "gold" moment on the site — active nav/tabs, eyebrow labels,
focus rings, USP numbers, map marker, carousel controls, secondary
buttons, link arrows — uses Champagne Gold (`--gold-champagne` /
`--gold-main` / `--gold-metallic`) instead. The two are visually close
but never interchangeable: yellow always means "you can act on this
now."

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

---

## 9b. Sections below Overview/USP — interface framework

Everything from the mid-page CTA through the final form and floating
contact controls (`css/sections.css`, `js/config.js`, `js/sections.js`)
is a working **interface framework**, not final content. It was built
against the approved "Section outline chuẩn" without touching Hero,
Overview/USP, navigation structure, the popup, or the language switcher
— those stay exactly as already approved.

- **`js/config.js`** is the single source of truth for the project
  name/logo (`projectConfig`) and every data-driven section (project
  details, connectivity, amenities slides, floor-plan types, progress
  milestones, Savills news). Sections read from here instead of
  hard-coding copy, so re-skinning or updating content means editing
  one file.
- **Brand rule:** the source outline mixes "Palm City"/"Palm River".
  Nothing here auto-renames the project — `projectConfig.projectName`
  is Palm City throughout. The two Savills news URLs keep a
  `palm-river` slug because they're real external links, not because
  the project was renamed.
- **No invented data.** Any field without an approved source value
  (e.g. "Chủ đầu tư phát triển", "Đơn vị phân phối", per-type floor
  plan areas, construction milestones, news headlines/excerpts) renders
  a shared "Đang cập nhật" / "Being updated" placeholder rather than a
  fabricated figure. `window.progressMilestones` is deliberately empty
  until real dates are approved.
- **Missing imagery.** No amenity photos, floor-plan renders, location
  map/video, Savills-Residential team photo, or per-type show-unit
  images exist in `/assets` yet. Each spot renders a neutral dashed
  frame with a "being updated" note and an HTML/JS comment naming the
  expected asset path (e.g. `assets/amenities/amenity-01.jpg`) — never
  lorem ipsum or a "demo" label.
- **Language:** dynamic sections (details, connectivity, amenities,
  news) are rendered by `sections.js`, which runs after `main.js`'s
  language-switch snapshot is taken. `main.js` now dispatches a
  `palmcity:langchange` `CustomEvent` after applying VI/EN so
  `sections.js` can re-render those sections in the new language —
  this is the only functional change made to `main.js` for this pass,
  alongside switching the popup-open trigger to event delegation
  (`document.addEventListener("click", …)` instead of a static
  `querySelectorAll` snapshot) so CTAs rendered later by `sections.js`
  (e.g. the floor-plan panel button) still open the existing popup.
- **Interactive widgets:** location category tabs, the amenities
  drag/swipe/keyboard carousel, floor-plan type tabs + image zoom
  modal, the payment-policy step tabs, and the final form's inline
  validation/loading/success states are all vanilla JS, no library.
  The final form does not submit anywhere or store data (prototype
  scope only).
- **Colour rhythm:** new sections alternate deep-navy
  (`.details/.amenities/.policy/.savills-section/.final-form`) and
  warm-ivory (`.location/.floorplans/.progress-section/.residential`)
  backgrounds; headings use `"Noto Serif Display"` and body/labels use
  `"Manrope"` (with the existing Gotham fallback chain) — kept separate
  from the approved Hero/Overview typography via a dedicated
  `--font-heading-alt` / `--font-body-alt` pair in `css/sections.css`,
  so nothing in `styles.css` changes.
- **Nav fit:** the header now carries 9 links (added Chi tiết dự án /
  Chính sách / Về Savills / Liên hệ). `styles.css` gained tighter
  nav gap/padding at the base, tablet (768–1023px), and a new
  1024–1279px breakpoint, plus hiding the "Đại lý phân phối" label
  earlier, so the nav stays on one line with no overflow through
  1024px–1440px+.
- **Floating contacts:** hotline (`tel:0969696201`) is live; Zalo/
  WhatsApp render disabled (no invented URLs) until
  `projectConfig.zaloUrl`/`whatsappUrl` are supplied, at which point
  `sections.js` swaps them to live links automatically. Desktop shows
  a vertical hover-to-reveal stack; mobile shows a sticky bottom bar
  respecting `env(safe-area-inset-*)`.

---

## 9c. Targeted refinement pass — logo, depth frames, glass tabs, news

- **Savills logo:** the header's "Đại lý phân phối" text label was
  removed (its wrapper too); `.brand-group` now carries an
  `aria-label="Savills Việt Nam – Đối tác phân phối"` instead. The
  approved logo file (`assets/savills-logo.png`) is a **square** mark,
  not a wide wordmark — enlarging its `width` (per the brief's
  124–136px desktop / 104–116px tablet / 82–96px mobile ranges) grows
  its height by the same amount via `height: auto`. To keep the header
  from growing past a sensible size, the logo widths were kept toward
  the low end of each range (112 / 108 / 82px) and `--header-height-top`
  / `--header-height-scrolled` were bumped a corresponding amount at
  each breakpoint — both are flagged here as a deliberate reconciliation
  of the brief's width targets against the real asset's proportions,
  same as the header's other documented brand-hierarchy deviation.
- **`.media-depth-frame`:** reusable glass/offset-border component
  (see `css/sections.css`) applied to the new Overview image, the
  project-details image, the amenities carousel, and the floor-plan
  viewer. The static glass chrome (gradient background, border, inner
  highlight, `::before` offset frame, `::after` cyan reflection) is
  plain CSS — always on, no JS required. The scroll-entrance animation
  (opacity/translateY/image-scale) is opt-in via `[data-depth-frame]`
  + `.is-visible`, toggled by an `IntersectionObserver` in
  `sections.js`, kept deliberately separate from the static chrome so
  it never fights a host section's own reveal logic — the amenities
  carousel gets the frame's visuals only, not this attribute, since
  its own active/inactive slide state already serves as its entrance.
  A `--light`/`--dark` modifier adapts the border/shadow to the host
  section's background. Pointer parallax (±4px, image only) runs on
  `[data-depth-frame]` elements only, on mouse/no-reduced-motion only.
  **Specificity note:** `.details__image`/`.amenities__slide-image`
  are single-class selectors that would otherwise lose their
  `height: 100%` to the shared `.media-depth-frame__inner img` rule's
  `height: auto` (a class+element compound selector outranks a bare
  class, regardless of source order) — both are scoped with their
  parent class (e.g. `.media-depth-frame__inner .details__image`) to
  win that specificity fight, the same lesson as the hero's
  `animation` shorthand note elsewhere in this file, just for
  specificity instead of shorthand collision.
- **`.glass-tab` system:** shared component for the Location category
  buttons and Floor-plan type tabs (`--light`/`--dark` background
  variants, `.is-active` state, a short yellow underline rather than a
  full border). Shape (pill vs. rounded-rect, height, padding) layers
  on top via `.location__tab`/`.floorplans__tab`. On mobile both tab
  rows become a horizontally-snapping, scrollbar-hidden row; the
  active tab is kept in view via a **horizontal-only** scroll helper
  (`scrollTabIntoView()` in `sections.js`) — deliberately not
  `Element.scrollIntoView()`, which was found to also scroll the
  page's own vertical position when the tab wasn't yet on-screen (e.g.
  immediately after page load), a real bug caught and fixed during
  this pass.
- **New Overview image:** `#overview` now has a balanced 6/6
  copy/image layout above the USP cards. No new rendering was actually
  supplied in `/assets` for this pass despite the brief referencing
  one — it renders the same neutral "being updated" frame convention
  as every other missing asset, with an HTML comment naming the
  expected file (`assets/palm-city-riverside-rendering.jpg`).
- **News / credibility cards:** `#savills` gained a second heading
  block (eyebrow/heading/lead) directly above the news grid, and
  `js/config.js`'s `savillsNews` entries gained `confirmed`,
  `publisher`, and `typeVi`/`typeEn` fields. `publisher` is inferred
  from each link's own domain (both are Savills-owned channels) —
  headline/date/excerpt were never supplied, so `confirmed: false` and
  `sections.js`'s `renderNews()` hides both cards entirely, showing one
  calm empty-state message instead of placeholder copy. Flipping
  `confirmed` to `true` and filling in the date/title/excerpt fields is
  enough to make a card render.

---

## 9d. Follow-up pass — image config, yellow frame removed

- **Image config fields:** the Overview and Project Details image
  slots (previously static HTML, and in the Details case reusing the
  hero photo as a stand-in) are now driven by
  `projectConfig.overviewImage` / `projectConfig.projectDetailImage`
  in `js/config.js` — both start `""` and render the neutral "being
  updated" placeholder until a real path is set. `floorPlanTypes[i]`
  gained an `image` field the same way. `amenitiesSlides[i].image` and
  `progressMilestones` already followed this pattern from the previous
  pass. Setting any of these fields is the only step needed — a shared
  `renderDepthFrameImage()` helper in `sections.js` re-renders on load
  and on every language switch, no CSS/markup change required. Each
  slot's HTML comment names its exact config field and expected asset
  path for the next handoff.
- **`object-fit` choice matters here:** the Overview image (embedded
  copy/logo baked into the corners) renders with `object-fit: contain`
  so nothing is ever cropped; the Details image and floor-plan images
  do the same (contain) since floor plans must never be cropped
  either; the amenities carousel keeps `cover` since it's plain
  photography, not text-bearing.
- **Yellow offset frame removed:** `.media-depth-frame`'s `::before`
  (the yellow-bordered rectangle behind each image) was deleted
  outright per a later refinement — the component now uses a single
  navy/cyan glass border only (see the component's own comment in
  `css/sections.css`). Savills yellow was deliberately left everywhere
  else it already appeared (buttons, `.glass-tab.is-active`'s
  underline, USP numbers, section-tag accents).

---

## 9e. Approved images connected

Two approved images were supplied and are now wired in (both saved to
`/assets` with clean filenames):

- **`assets/palm-city-overview-riverside.jpg`** — the riverside towers
  rendering with "Nơi tái tạo năng lượng mỗi ngày" and the Palm City
  logo embedded in it. Used for **three** slots since it's the only
  architectural/lifestyle rendering supplied so far:
  - `#overview` — `object-fit: contain`, full image, nothing cropped.
  - `#chi-tiet-du-an` (Project Details) — `object-fit: cover`,
    `object-position: center 45%`, reused as the "aerial/architectural
    overview" per this task's own explicit reuse-when-no-alternative
    rule. This crop does cut off the embedded corner text/logo in that
    one placement — acceptable there per the brief's own object-fit
    rules for "architectural project images" (only the Overview
    placement was required to stay fully uncropped).
  - Amenities carousel, slide 1 only — labelled "Cảnh quan ven sông" /
    "Riverside landscape" (a genuine fit for that category). Slides
    2–4 keep the neutral placeholder rather than repeating the same
    photo three more times, which would read as a bug, not content —
    still need dedicated amenity photos (pool/gym/clubhouse/park).
- **`assets/palm-city-location-map.webp`** — the approved connectivity
  map, now the actual background of `.location__map-frame` (`object-fit:
  cover`); the gold pulse marker is positioned via inline `left`/`top`
  on `.location__map-marker` in `index.html` to sit over the Palm City
  pin already drawn on the map (approximate — the map isn't an
  interactive/coordinate-aware asset, just a static image).
- **Fixed during this pass:** the amenities carousel's slide-number/
  title overlay used to be plain text with only a drop-shadow, which
  became unreadable once a slide's image itself carried embedded text
  near the same corner. Both now sit on a small solid navy chip so
  they stay legible regardless of what's under them.
- **Still empty:** Project Details' "Chủ đầu tư phát triển"/"Đơn vị
  phân phối" fields (unrelated to images), floor-plan images (6
  types), amenity slides 2–4, progress milestones, Savills-Residential
  team photo, and both Savills news article images — no approved files
  exist yet for any of these.

---

## 9f. Content-update pass — Palm River rebrand from source workbook

This pass replaced placeholder/interim copy across the whole page with
approved content from the client-supplied workbook ("Landing page Palm
River (2).xlsx", sheet "Section outline chuẩn"). **No layout,
interaction, or design-system change was made** — only copy, data, and
the minimum new markup needed to display it (the amenities two-tab
system, the floor-plan benefit lists, and four new form fields).

- **Project renamed Palm City → Palm River** everywhere the workbook's
  approved copy uses "Palm River" as the project name (hero, page
  title, footer, image alt text, form privacy copy). "Palm City" is
  kept only where the approved copy itself uses it to mean the larger
  shared master-community/amenity system (e.g. "168+ tiện ích nội khu
  Palm City", the "Tiện ích Palm City" tab) — this distinction is
  intentional, not a missed rename.
- **`js/config.js`** is now the single source of truth for all content:
  `projectConfig`, `projectDetails` (14 fields), `connectivityData` (5
  categories), `palmRiverAmenities` (68 items in 4 floor groups),
  `floorPlanTypical` (4 points), `floorPlanTypes` (6 types with area +
  3 benefits each), `savillsAbout` (corporate/Residential intros + 3
  commitments), `savillsNews`, and `registrationForm` (select option
  sets shared by both the final-page form and the popup).
- **Density resolved to 25%** everywhere (the Project Details table was
  treated as the authoritative source over the Hero's older 26%,
  per the workbook's own source-priority rule).
- **Amenities section** now has two main tabs: "Tiện ích Palm City"
  (unchanged shared-carousel interface) and "Tiện ích nội khu Palm
  River" (new — floor tabs across Tầng G/1/2/20, each rendering its
  own numbered item list; `setupAmenitiesMainTabs()` /
  `renderPalmRiverAmenities()` in `js/sections.js`).
- **Floor plans** typical-floor points and each of the 6 product types'
  area + 3 benefit points now come from `config.js` instead of
  hardcoded placeholder text.
- **Savills section** now carries the workbook's corporate intro
  (165-year/1855 heading + paragraph) and the 3 named commitments as
  pillar descriptions; the Residential section carries its own
  workbook-sourced heading + paragraph.
- **Final form and popup** were both extended with the same 4 new
  fields (Khu vực sinh sống hiện tại, Mục đích mua, Loại sản phẩm quan
  tâm, Ngân sách dự kiến) using identical option sets, so the two stay
  in parity as before.
- **Construction progress** empty-state copy is now the exact approved
  string "Thông tin tiến độ đang được cập nhật." — the workbook itself
  says more images are needed from Savills Residential before any
  milestones can be shown.
- **Sources reported inaccessible in this environment:**
  `savills.sharepoint.com` (SharePoint-authenticated) and
  `palmrivercity.com` (network-policy-blocked) both returned
  `EGRESS_BLOCKED`. Any workbook row pointing at those hosts (e.g. the
  Amenities-tab-1 and Payment-policy image sources) was left on its
  existing placeholder/interface rather than guessed at, per the
  workbook's own fallback instruction.
- **Content conflict resolved:** the Project Details section's
  heading was left as the existing "Thông tin dự án" rather than
  renamed to "Tổng quan dự án" per the workbook's literal text for that
  row, because `#overview` already legitimately owns that exact
  heading — two identical `<h2>`s on the same page would have been a
  worse outcome than the one-word divergence.

---

## 9g. Visual redesign pass — USP grid, Typical floor plan, Amenities

A design-only pass (no content, hero, header, or design-system change)
covering exactly three areas that were flagged as visually broken or
under-designed. All new/renamed classes are documented inline in
`css/sections.css` and `css/styles.css`.

- **USP grid** (`.usp-grid` / `.usp-card`, `css/styles.css`) — replaced
  the old 3-column/featured-card layout with the requested 6-column
  grid (`repeat(6, minmax(0, 1fr))`, first three cards `span 2`, the
  last two centred at columns 2–3 and 4–5). Each card now has four
  distinct elements — `__label`, `__prefix`, `__number-row`
  (`__number` + `__unit`), `__description` — instead of one crowded
  line; the count-up/shine JS in `js/main.js` was repointed from
  `.stat-card__value` to `.usp-card__number` (same behaviour, just the
  new class name). Glass navy/cyan surface, no yellow border. Tablet:
  2 columns with the 5th card centred and spanning both; mobile: 1
  column. No `overflow-x: hidden` was used to paper over the layout —
  the grid math itself is correct at every width (verified: 1440,
  1280, 1024, 768, 430, 390px, zero horizontal overflow).
- **Typical floor plan** (`.floorplan-media-frame` / `.floorplan-features`,
  `css/sections.css`) — replaced the flat two-column text grid with an
  image frame (left, 58%) + 2×2 feature-card grid (right, 42%). The
  frame reuses the existing `.media-depth-frame` component (glass
  chrome, hover lift, scroll-entrance, light sweep) rather than a
  parallel implementation, and adds a new shared `.glass-depth-layer`
  utility (two offset translucent layers behind the card) for the
  requested sense of depth. `object-fit: contain` — the plan drawing
  is never cropped. A "Xem chi tiết" button opens the same zoom
  lightbox already used by the floor-type viewer above it (Escape,
  backdrop, and × all close it; scroll is never locked so there's
  nothing to fail to unlock). Numeric callouts inside the four feature
  cards' body text (`6 căn/tầng`, `89%–92%`, `5 thang máy cho 6
  căn/tầng`, `100%`) are auto-highlighted via `.feature-stat` using one
  shared regex for both languages (`highlightFeatureStats()` in
  `js/sections.js`) rather than hand-tagging each card. No floor-plan
  image is supplied yet — `window.floorPlanTypical.image` is empty by
  default and renders the "Thêm ảnh mặt bằng tại đây" placeholder.
- **Amenities** (`.amenity-media-frame` / `.amenity-list`,
  `css/sections.css` + `js/sections.js`) — replaced the old carousel
  (Palm City tab) and numbered-list-only layout (Palm River tab) with
  one unified image + interactive-list layout used by both tabs. A new
  `window.amenityData` object (`js/config.js`) is the single source for
  both tabs' images/captions/descriptions — `palmCity.all` and
  `palmRiver.{ground,floor1,floor2,floor20}` — built from the existing
  `amenitiesSlides`/`palmRiverAmenities` arrays rather than duplicating
  their approved copy a second time. `window.amenityGroups` supplies
  the level-2 (floor) tab labels; the level-2 tab row hides itself
  automatically when a tab has only one group (Palm City), so nothing
  in `renderAmenitySection()` branches on which tab or group is active.
  Clicking any list item cross-fades the image (~380ms total,
  `.is-swapping`) and updates the index/title/description with no
  page reload and no section-height change (the frame keeps a fixed
  4:3 aspect ratio throughout). Every list row is a real `<button>`
  with `role="option"`/`aria-selected`, so it's keyboard- and
  focus-visible-accessible without extra ARIA plumbing. No amenity
  photo is supplied yet for any of the 68 Palm River items or the 3
  placeholder Palm City slides — each renders a glass placeholder
  ("Thêm ảnh tiện ích tại đây") with an inline SVG picture icon rather
  than a stock photo or a broken `<img>`; setting `image` on the
  source array in `js/config.js` makes it appear automatically.
- **Shared glass/water language** — all three components reuse
  `backdrop-filter: blur(14px) saturate(120–125%)`, navy/cyan/white
  low-opacity borders, and the existing 8s ambient light-sweep
  (`.media-depth-frame__inner::after`) rather than introducing a
  fourth visual system. Hover ripples stay one-shot and capped at
  0.08–0.12 opacity; `prefers-reduced-motion: reduce` disables the USP
  hover ripple, the amenity image cross-fade, and (already, pre-
  existing) the `.media-depth-frame` scroll-entrance/parallax.
- Verified at 1440/1280/1024/768/430/390px: no horizontal overflow, no
  cropped numbers/units/headings/images, no layout shift when
  switching tabs or amenity items, visible focus states on every new
  interactive element (confirmed via real Tab-key focus, not just
  `.focus()`), and the zoom lightbox opens/closes cleanly without
  leaving scroll locked.

---

## 9h. Refinement pass — USP baseline, eyebrows, details toggle, amenities data model, credibility image

A second, more targeted design/data pass on top of 9g. Hero, header, the
registration popup, and every section not listed below are unchanged.

- **USP cards**: rebuilt as a strict 3-row CSS grid (`grid-template-rows:
  56px 112px 48px`) per card — label / number+unit / description — so
  every card's number sits on the same pixel baseline regardless of how
  many lines its own label/description wrap to (verified: both rows'
  number tops match exactly at every breakpoint tested). Classes
  simplified to the flat `.usp-card`/`.usp-label`/`.usp-value-row`/
  `.usp-number`/`.usp-unit`/`.usp-description` (dropped the old
  `.usp-card__*` BEM names and the separate "Ít nhất"/"Từ" prefix line
  — those words are gone; a `.usp-plus` element carries just the "+" in
  the "168+ tiện ích" card). `js/main.js`'s count-up/shine logic was
  repointed from `.stat-card__value`/`.usp-card__number` to
  `.usp-number` — same behaviour, new selector.
- **Eyebrow repetition**: hero eyebrow is now "ĐÔ THỊ NGHỈ DƯỠNG VEN
  SÔNG" / "RIVERSIDE RESORT-STYLE LIVING" (hero `<h1>` unchanged). Six
  section eyebrows were switched from a repeated "PALM RIVER" to
  function-based labels (Project Details → "TỔNG QUAN DỰ ÁN", Location →
  "KẾT NỐI KHU VỰC", Amenities → "HỆ TIỆN ÍCH", Floor Plans → "THIẾT KẾ
  CĂN HỘ", Payment Policy → "THÔNG TIN BÁN HÀNG", Progress → "TIẾN ĐỘ
  XÂY DỰNG" — the last one wasn't named in the brief's list but was
  extended the same treatment for consistency). The mid-page CTA's
  eyebrow was removed outright (`.mid-cta__eyebrow` CSS deleted) since
  its own heading already says "Palm River".
- **Project Details table**: no longer a `<details>`/`<summary>` pair
  whose "Xem thêm" summary was `display:none` on desktop (the actual bug
  behind "desktop thiếu nhiều thông tin" — the extra 9 rows were
  literally unreachable there). Now one `<dl id="details-list">` with
  all 14 rows always in the DOM; a `.details__toggle` button
  (`aria-expanded`, `aria-controls="details-list"`, keyboard + focus-
  visible) toggles `data-expanded` on the list, which CSS uses with
  `:nth-child(n+9)` (desktop/tablet: 8 default) / `:nth-child(n+6)`
  (mobile: 5 default) to hide the rest — same dataset, same list, only
  the default cutoff differs by breakpoint. Content itself was already
  sheet-accurate from an earlier pass, so nothing in `projectDetails`
  changed.
- **Amenities data model**: replaced the click-an-item-to-change-image
  interaction with two independent widgets sharing one
  `window.amenityGroups` source (`js/config.js`) — a plain, non-
  interactive amenity list (numbered `<p>` rows, no buttons, no active
  state) and a fully separate auto-playing image carousel (5.5s
  interval, prev/next, pagination dots, touch swipe, pauses on hover/
  focus, cross-fade + scale transition, "Xem ảnh" opens the shared zoom
  lightbox). Both tabs now have 4 real groups: Palm City → Khu thương
  mại / Công viên cộng đồng / Tuyến dạo bờ sông sinh thái / Thể thao &
  Sức khỏe (group names supplied directly in this task's brief); Palm
  River → the same 68-item, 4-floor list as before, unchanged. Palm
  City's `items`/`images` arrays are empty — see the missing-data note
  below — and render an explicit "chưa được cung cấp" message rather
  than reusing the sitewide "Đang cập nhật" phrase or fabricating
  amenity names.
- **Savills benefit cards**: "01"/"02"/"03" replaced with a
  `.benefit-icon` — a 52×52 square, `#FFDF00` background, a distinct
  24×24 stroke-only SVG per card (shield-check / key / advisor), all
  same size/stroke-width. Cards are still `<li>`, not buttons (no click
  action exists for them).
- **Credibility section**: split out of `#savills` into its own
  `<section class="credibility-section" id="truyen-thong">`. Removed the
  "THÔNG TIN CHÍNH THỨC & TRUYỀN THÔNG" eyebrow and the old news-card
  grid/empty-state entirely (`renderNews()`, `.news-card*`,
  `.savills-section__news*` CSS all deleted, not just overridden).
  Heading/paragraph unchanged. Below them, a single
  `.credibility-fullscreen-media` figure breaks out of `.section-
  container` to full viewport width via `margin-left: calc(50% - 50vw)`,
  with a slow 1.01→1.035 zoom (14s, alternating) and a ≤0.08-opacity
  light sweep — both disabled under `prefers-reduced-motion`. No
  approved photo exists yet (not part of any row in the source sheet),
  so it renders a fixed-height placeholder ("Thêm ảnh truyền thông tại
  đây") rather than the removed "đang được xác nhận" copy or a broken
  `<img>`; setting `window.credibilityMedia.desktop`/`.mobile` in
  `js/config.js` makes the real `<picture>` appear automatically.
- Re-verified at 1440/1280/1024/768/430/390px after this pass: zero
  horizontal overflow, USP number baselines match within each row, the
  details toggle correctly shows 8/5 rows by breakpoint and 14 when
  expanded, the amenity carousel hides its prev/next/dots when a group
  has no images, and VI/EN switching covers every new string with no
  missing translation keys.

---

## 9i. Image-frame audit — one component, no offset layers

Audited every image-frame usage in Overview, Project Details, Amenities,
Floor Plans, and Credibility for misalignment/overlap/overflow. Root
cause: two separate legacy components stacked on top of each other —
`.media-depth-frame` (the glass card itself, with two of its own
animated `::after` pseudo-elements) plus `.glass-depth-layer` (two more
absolutely-positioned, `translate()`-offset rounded rects behind it,
used on the Amenities carousel and the Floor-plan-typical frame). The
offset layers' `translate(10px, 12px)`/`translate(20px, 24px)` pushed
them up to 24px outside their own bounding box, which is exactly the
"decorative outlines extend beyond the frame" / "frames positioned
outside their parent" symptom — and the outer frame's aspect-ratio was
applied inconsistently (sometimes on the outer card, sometimes on the
inner mask), which is the "inconsistent dimensions" symptom.

- **Classes that caused it**: `.media-depth-frame` / `.media-depth-frame__inner`
  / `.media-depth-frame--light` (two `::after` pseudo-elements: an
  animated inner light-sweep plus an outer reflection), `.glass-depth-layer`
  / `.glass-depth-layer--1` / `.glass-depth-layer--2` (offset, translated,
  absolutely-positioned duplicate frames), and the two now-removed
  wrapper `<div>`s `.amenity-media-frame` / `.floorplan-media-frame`
  that existed solely to host those offset layers.
- **Legacy removed** (deleted outright, not overridden): both
  `.glass-depth-layer` offset layers and their host wrappers; the
  animated `depth-frame-sweep` keyframes and the inner `::after` sweep
  pseudo-element; the outer frame's separate reflection `::after`
  (replaced by one static highlight); the `aspect-ratio` on
  `.project-overview__media` being applied to the outer card instead of
  the inner mask; the now-redundant `.media-depth-frame__inner .details__image`
  specificity-defense rule (the shared component's own default already
  matches what it needed).
- **Reusable component applied**: `.glass-media-frame` /
  `.glass-media-inner`, exactly as specified — one border, one static
  `inset: 1px` top-highlight pseudo-element, depth from background
  transparency + border + box-shadow only. Used identically at all 5
  sites (Overview media, Project Details image, Amenities carousel
  stage, Floor Plans viewer, Floor Plans typical), with only a
  `--light` modifier (paler wash, navy border) for the two floor-plan
  drawings and a `contain` object-fit override where a plan must never
  be cropped. `[data-depth-frame]` scroll-entrance and the pointer-
  parallax hover effect (`js/sections.js`, `setupDepthFrames()`) still
  work — only their CSS selectors were renamed to match, not their
  behaviour. Every grid that places one of these frames beside text
  (`.project-overview__body`, `.details__grid`, `.amenities__layout`,
  `.floorplan-typical-layout`, `.floorplans__viewer`) now has
  `min-width: 0` on its column children so a frame can never blow out
  its column at any width. Re-verified at 1440/1280/1024/768/430/390px:
  zero horizontal overflow, every `.glass-media-frame`'s bounding box
  stays within its parent, exactly 5 frames/5 inners in the DOM, and
  the amenities carousel, lightbox, and floor-plan/unit tabs all still
  work exactly as before.

---

## 9j. Credibility section rebuilt — contained frame + press-article grid

Replaced the full-viewport-width image + oversized display heading with
a contained media frame and a compact, data-driven press-article grid,
inside the same `.section-container` as every other section.

- **Image frame**: now a tighter instance of the shared
  `.glass-media-frame`/`.glass-media-inner` component (`.credibility-media-frame`)
  instead of the removed `.credibility-fullscreen-media` (which broke
  out to `100vw` and forced a `clamp(620px, 78svh, 900px)` height —
  the actual source of the oversized empty gap around the placeholder
  note). Padding is `clamp(8px, 0.8vw, 12px)` and the inner mask no
  longer forces a fixed aspect-ratio, so the image (or the placeholder
  note) sits 8–12px from the border on every side instead of inside a
  multi-hundred-pixel box. Still one border, one highlight — no
  separate offset layers were reintroduced.
- **Oversized text block removed**: "Uy tín được củng cố qua những
  thông tin chính thống" + its paragraph + `.credibility-heading` are
  gone, along with the `credibility-zoom`/`credibility-sweep`
  keyframes and the `--credibility-focus` custom property they used.
  Replaced with a plain `<h2 class="press-section-title">` — "Tin tức
  và truyền thông" / "News and media" — no large display type.
- **Press-article grid**: new `window.pressArticles` (`js/config.js`)
  replaces the unused `window.savillsNews`, reusing its two real D12
  URLs (`publisher: "Savills Việt Nam"`) rather than inventing new
  ones. `title`/`excerpt`/`logo`/`image`/`date` are un-translated,
  per-article fields (a real headline isn't re-translated) and stay
  empty since none were supplied — `renderPressArticles()`
  (`js/sections.js`) renders an honest placeholder label for each
  missing field ("Đang cập nhật tiêu đề bài viết", etc.) rather than a
  broken image or an invented headline. Each card is the whole `<a>`
  when a URL exists (`target="_blank" rel="noopener noreferrer"`),
  equal height via `height: 100%` on a `display: flex` card with the
  "Đọc bài viết" link pinned to the bottom via `margin-top: auto`, and
  keyboard-focusable with a visible `:focus-visible` outline.
- Verified: image-to-border gap measures ~12px on all sides, exactly
  one `.credibility-media-frame` with no duplicate outlines, both
  press cards render with real hrefs, and the grid is 3/2/1 columns at
  desktop/tablet/mobile with zero horizontal overflow at
  1440/1280/1024/768/430/390px.

---

## 9k. Colour-system overhaul — Champagne Gold × Savills Navy

Full site-wide colour pass, replacing the cold cyan-and-white glass
treatment with the Champagne Gold × Savills Navy palette in §3. Layout,
content, and interactions are untouched — only colour tokens, gradients,
borders, glass surfaces, shadows, and colour-bearing animations changed.

- **Tokens**: the full palette in §3 added to `css/styles.css` `:root`,
  with every pre-existing token name aliased onto it. `css/sections.css`'s
  legacy `--color-water-blue`/`--color-pale-blue` tokens were unused
  dead code and were removed outright rather than aliased; `--color-ivory`
  is now `var(--warm-ivory)`.
- **CTA rule enforced in code, not just intent**: several buttons that
  open the registration popup (`.btn--register`, `.btn--cta-primary`,
  `.btn--policy-cta`, `.btn--floorplan-cta`, `.btn--residential-cta`)
  were previously navy/transparent *at rest* and only turned yellow on
  `:hover` — the opposite of "yellow marks a genuine conversion action."
  All five are now solid Savills Yellow at rest, `--savills-yellow-hover`
  on hover, `--savills-yellow-active` on `:active`, matching the given
  `.cta-primary` recipe. `.btn--submit`'s hover state (previously
  navy-bg/white-text) now stays in the yellow family for the same
  reason. Also swapped which mid-page CTA got which class in
  `index.html`: "Nhận thông tin" (opens the popup) is now
  `.btn--cta-primary` (yellow); "Xem chi tiết dự án" (scroll-to-anchor)
  is now `.btn--cta-secondary` (navy glass) — they were backwards.
- **Decorative gold vs. functional yellow**: every non-CTA use of
  `var(--color-savills-yellow)` — active nav/tab underline, eyebrow
  labels, focus rings, the USP "+" glyph, the map marker/pulse, carousel
  arrows/dots, `.section-tag`, the policy stepper, link arrows — now
  points at `var(--gold-champagne)`. The three intentional exceptions
  (checked against `index.html`/`js/sections.js` usage) are `.benefit-icon`
  (Savills approved icon squares), `.floating-contacts__btn--register`,
  and `.mobile-contact-bar__btn--primary` — all genuine conversion
  controls, left solid yellow.
- **Hero headline**: the "Palm River" word's three-layer water-shimmer
  effect (base gradient, moving water texture, bling sweep, sparkle)
  was cyan/white; all colour stops now sit inside the gold family
  (base gradient `#f3e6c6→#e7d29a→#c79b42`, texture/sweep tinted with
  `rgba(199,155,66,…)`/`rgba(243,230,198,…)`), capped at
  `--gold-highlight` rather than pure white — the same ceiling the
  spec's own `.animated-gold` reference uses. `.hero__supporting`/
  `.hero__density` (the two lines below the headline) stay warm-ivory,
  not gold — only the "Palm River" word itself is gold, per the
  "don't turn the entire headline gold" rule.
- **USP numbers**: `.usp-number.is-counted`'s shine was a raw
  `#ffdf00`/`#ffffff` gradient; now `background-image: var(--gold-metallic)`.
  The glint dot switched from `#fffef2`/yellow to
  `--gold-highlight`/`--gold-main`.
- **Glass surfaces**: `.glass-media-frame` (Overview/Details/Amenities/
  Floorplans/Credibility image frames) and `.press-card` had a cyan
  border (`rgba(191,232,247,…)`) — now champagne
  (`rgba(231,210,154,…)`); their cyan-tinted background fill
  (`rgba(105,213,245,…)`) is now gold-tinted (`rgba(199,155,66,…)`).
  The unused `.glass-panel` utility was rewritten to match the spec's
  exact recipe (gradient background, champagne border, warm inset
  highlight) so it's ready if a future component adopts it.
- **Registration popup** (`.popup__dialog`): was a light ivory dialog
  with navy text: now navy/warm-glass per the modal rule — ivory title/
  labels/close icon, muted-ivory paragraph, champagne-bordered inputs
  with a champagne focus ring, submit button unchanged (solid yellow,
  hover/active now yellow-family instead of switching to navy/white).
  The page-embedded `.final-form` (already navy) got the same
  champagne field-border treatment for consistency between the two
  forms.
- **Blanket sweep**: every literal `rgba(255, 255, 255, …)` decorative/
  text colour in both stylesheets became `rgba(248, 242, 230, …)`
  (warm ivory), and every `rgba(105, 213, 245, …)` cyan glass fill
  became `rgba(199, 155, 66, …)` (gold). Remaining raw-yellow
  `rgba(255, 223, 0, …)` decorative glows (hero spotlight/ripple,
  section-water-divider streak, policy stepper highlight — none of
  them CTAs) were converted to `rgba(199, 155, 66, …)` so decorative
  gold never visually competes with an actual yellow CTA.
- **Not changed**: the Savills and Palm City logo image assets (no
  CSS filter was ever applied to them, so there was nothing to
  remove); `#ff6b6b`/`#ff9d9d` form-validation error colours
  (unrelated to the cyan/gold system); the neutral `#262626`/`#f4f4f4`
  base text/placeholder tokens.
- Verified at 1440/1280/1024/768/430/390px: hero headline reads gold
  not cyan, every real conversion CTA (register, mid-page "Nhận thông
  tin", floor-plan/policy/residential registration buttons, popup
  submit, floating contact button) is solid yellow at rest with no
  white text on yellow anywhere, USP numbers show the metallic gold
  shine, benefit-icon squares are untouched, tabs/carousel/dots read
  as champagne rather than yellow, and no cyan remains anywhere in
  either stylesheet.

---

## 9l. Metallic-gold refinement, compact USP cards, placeholder removal

Three targeted follow-ups on top of §9k — layout and approved content
unchanged, only gold strength, USP card sizing, and one dead placeholder.

- **Stronger metallic gradient**: the gold scale in `css/styles.css`
  `:root` was replaced with a six-stop scale — `--gold-shadow` (dark
  bronze) → `--gold-deep` → `--gold-mid` → `--gold-bright` →
  `--gold-champagne` → `--gold-specular` (narrow highlight) — and
  `--gold-metallic` now visibly steps through bronze/mid/champagne/
  specular instead of the previous three soft stops. `--gold-antique`/
  `--gold-main`/`--gold-highlight` stay as aliases so no call site
  needed touching. The hero "Palm River" gradient and its water/bling
  layers were re-tinted to the new stops for the same reason.
- **Gold readability**: small gold labels now use the correct end of
  the scale for their background — `--gold-bright` on navy (nav/tab
  active state, eyebrows, hero label, project-overview eyebrow, press
  link, policy stepper) and `--gold-deep` on warm-ivory (`.section-tag`
  gets a light-section override, since it's shared between both tones
  and pale champagne failed contrast on ivory). Light-section body
  copy (`.section-lead`) is now `#17324d` instead of a low-opacity
  navy tint, matching the requested value exactly.
- **Section backgrounds**: the flat `--color-navy-secondary`/
  `--color-ivory` fills on `.details/.amenities/.policy/.savills-section/
  .final-form/.credibility-section` (dark) and `.location/.floorplans/
  .progress-section/.residential` (light) are now each a two-point
  radial gold/ivory wash over a diagonal base, so neither tone reads
  as one flat colour.
- **Premium glass on major surfaces only**: added `.premium-glass`/
  `.premium-glass-light` utilities (the metallic `border-box` gradient
  border technique) next to `.glass-panel`, and applied the same
  technique directly to the two surfaces that count as "major" —
  `.popup__dialog` and `.final-form__panel`. Smaller cards
  (`.glass-media-frame`, `.press-card`, `.usp-card`) keep their
  existing flat champagne border, per "smaller cards should use a
  simpler champagne border."
- **Restrained metallic sweep**: added the shared `metallicSweep`
  keyframe and `.metallic-animated` utility. The USP number shine now
  uses it (renamed from the old `value-shine` keyframe, same ~1.15s
  pass/long-hold rhythm, still staggered per card via `--shine-delay`
  in `index.html`), and its glint-dot `::after` pseudo-element —
  which sat between the number and its unit — was removed outright,
  not replaced. `.usp-number`'s base (non-counting) state now also
  renders the static metallic gradient rather than a flat solid, so
  the number reads as gold from the first paint; `.usp-unit` stays a
  flat `--gold-champagne` colour and is never animated.
- **Compact USP cards**: `.usp-card` switched from fixed-height rows
  (`56px 112px 48px`) to `minmax(...)` rows with `align-content: center`
  and a `min-height: clamp(250px, 20vw, 300px)` on the card itself, so
  height now tracks content instead of reserving near-empty bands —
  desktop cards measure ~250–300px instead of the previous ~340px+.
  `.usp-label`/`.usp-description` got explicit `min-height` instead of
  row-height alignment, so every card's number row still shares one
  baseline. Tablet (768–1023px) and mobile (≤767px) breakpoints got
  matching `minmax()` rows and reduced `min-height` (240px / 220px);
  the tablet 5th-card centring rule was kept (there are always exactly
  five cards) but rewritten to size itself off the grid gap rather
  than a fixed `max-width: 50%`.
- **Media placeholder removed**: the `<figure class="glass-media-frame
  credibility-media-frame">` block above "Tin tức và truyền thông" —
  which only ever rendered "Thêm ảnh truyền thông tại đây" because no
  approved media-coverage photo exists — is gone from `index.html`,
  along with `renderCredibilityMedia()` and its call site in
  `js/sections.js`, `window.credibilityMedia` in `js/config.js`, and
  `.credibility-media-frame`/`.credibility-media-placeholder` in
  `css/sections.css`. It was not replaced with another placeholder.
  `.press-section`'s compensating `margin-top` (previously stacked on
  top of the frame above it) was removed too, so the heading now sits
  directly under `.credibility-section`'s own section padding with no
  doubled or empty gap.
- Verified at 1440/1280/1024/768/430/390px: gold gradient shows
  bronze→mid→champagne→specular steps rather than one flat tone, both
  section backgrounds read as a soft wash rather than flat fill, USP
  cards measure ~250–300px tall on desktop with three equal cards in
  row one and two centred cards in row two, no shimmer dot sits
  between any number and its unit, Savills Yellow stays exclusive to
  conversion CTAs, and "Tin tức và truyền thông" now appears with no
  empty navy gap above it.

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
