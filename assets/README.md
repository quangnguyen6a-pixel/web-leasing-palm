# Assets

```
assets/
├── palm-city-logo.png              # Palm City logo, as supplied (dark icon + wordmark, transparent background)
├── savills-logo.png                # Savills logo, as supplied (yellow square tile)
├── palm-city-hero.webp             # Hero perspective image, cropped to remove the marketing text/stat panel baked into the source file
├── palm-city-overview-riverside.jpg # Reused for both the Overview intro and the Project-details table media slot
├── palm-city-location-map.webp     # Official location map (Location section only — see root README §6)
├── floorplan-tower3-typical.jpg    # Typical-floor plan, Tower 3 (window.floorPlanTypical.image)
├── floorplan-2pn-corner.jpg        # 2PN unit-type card, 84.9/75.8 m² (floorPlanTypes "2pn")
├── floorplan-2pn.jpg               # 2PN unit-type card, 85.9/76.9 m² (downloaded, not currently wired — see root README asset-mapping report)
├── floorplan-3pn.jpg               # 3PN unit-type card, 126.1/115.2 m² (floorPlanTypes "3pn")
├── floorplan-3pn-corner.jpg        # 3PN corner-unit card, 125.3/115.3 m² (downloaded, unassigned — no matching floorPlanTypes id; see report)
├── media/
│   ├── palm-river-savills-partnership-event.jpg  # pressArticles[1].image
│   └── savills-partner-certificate.png           # .savills-section__certificate (Tier-1/F1 certificate, see root README §9o)
└── amenities/                      # amenityGroups.palmCity.*.images — resized web copies, see root README §9o
    ├── amenity-palmcity-retail-{1,2}.jpg
    ├── amenity-palmcity-park-{1..8}.jpg
    ├── amenity-palmcity-promenade-{1..4}.jpg
    └── amenity-palmcity-wellness-{1,2}.jpg
```

These are the raster files as supplied by the client (not SVGs). If a
vector source becomes available later, drop it in with the same
filename and a `.svg` extension, then update the `src` attributes in
`index.html` accordingly.

**Palm City logo contrast:** the supplied logo is a dark icon on a
transparent background, which has low contrast against the navy header.
Rather than recolour the logo file itself, `index.html`/`styles.css`
wrap it in a small white plaque (`.logo-chip`) so it stays legible in
both the transparent (top-of-page) and scrolled header states. If a
white/light version of the logo is supplied later, swap the file in and
the `.logo-chip` wrapper can be dropped from `index.html` and its CSS
rule removed from `styles.css`.

**Hero image:** the file supplied included a baked-in headline and a
project stats panel over the bottom ~30% of the image. That text is
draft marketing copy, not something this prototype should assume or
display, so the image was cropped to the clean aerial photo only,
saved as `palm-city-hero.webp`. If a clean (text-free) master photo
becomes available, it can replace this file directly — no re-cropping
needed.

If any of these files are missing, the prototype falls back to visible
text placeholders automatically:

- `[PALM_CITY_LOGO]`
- `[SAVILLS_LOGO]`
- `[APPROVED_HERO_IMAGE]`

See the root `README.md` for full asset-replacement notes.
