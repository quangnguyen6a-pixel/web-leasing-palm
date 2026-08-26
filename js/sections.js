/* =========================================================
   PALM CITY — SECTIONS BELOW HERO / OVERVIEW / USP
   Renders and wires up the interface framework for: project details,
   location/connectivity, amenities carousel, floor plans, payment
   policy, progress, Savills news, and the final form. Data comes
   from js/config.js. Vanilla JS only, no framework.
   ========================================================= */
(function () {
  "use strict";

  function currentLang() {
    return document.documentElement.getAttribute("lang") === "en" ? "en" : "vi";
  }
  var PENDING_VI = "Đang cập nhật";
  var PENDING_EN = "Being updated";

  // Horizontal-only "keep visible" helper for the mobile tab scroll
  // rows (§5/§6). Deliberately NOT Element.scrollIntoView(), which
  // also scrolls the page's own vertical scroll container when the
  // tab isn't currently on-screen (e.g. right after page load) —
  // this only ever touches the tab row's own scrollLeft.
  function scrollTabIntoView(tab) {
    var container = tab.parentElement;
    if (!container) return;
    var target = tab.offsetLeft - (container.clientWidth - tab.offsetWidth) / 2;
    container.scrollLeft = Math.max(0, target);
  }

  // Shared failure handler for every dynamically-created <img>: hides
  // the element (rather than leaving the browser's broken-image icon
  // + alt text visible) and logs the failed URL for diagnosis. Never
  // silently swaps in another image — a hidden slide is honest, a
  // wrong photo is not.
  function handleImgError(img) {
    img.addEventListener("error", function () {
      img.style.display = "none";
      console.warn("Failed to load image:", img.getAttribute("src"));
    });
  }

  // Shared renderer for a .glass-media-inner box: shows the
  // image when a path is supplied, otherwise the neutral "being
  // updated" note already sitting in the DOM (never replaced with
  // stock/demo content). `fit` picks object-fit — "contain" for any
  // image that may carry embedded text/logos near its edges (must
  // never be cropped), "cover" for plain photography.
  function renderDepthFrameImage(inner, src, alt, imgClassName, fit, objectPosition) {
    if (!inner) return;
    inner.innerHTML = "";
    if (src) {
      var img = document.createElement("img");
      if (imgClassName) img.className = imgClassName;
      img.src = src;
      img.alt = alt || "";
      img.loading = "lazy";
      img.decoding = "async";
      img.style.objectPosition = objectPosition || "center";
      handleImgError(img);
      inner.appendChild(img);
    } else {
      var note = document.createElement("p");
      note.className = "glass-media-note";
      note.textContent = currentLang() === "en" ? "Image being updated" : "Hình ảnh đang được cập nhật";
      inner.appendChild(note);
    }
  }

  /* -----------------------------------------------------
     0. OVERVIEW + PROJECT DETAILS IMAGES
     Both slots are configured via projectConfig in js/config.js
     (overviewImage / projectDetailImage) — empty by default, so they
     render the placeholder frame already in the HTML until a path is
     set there. No CSS/markup changes needed when one is added.
     ----------------------------------------------------- */
  function renderConfiguredImages(lang) {
    if (!window.projectConfig) return;
    var overviewAlt = lang === "en" ? "Riverside perspective of Palm River" : "Phối cảnh Palm River bên sông Giồng Ông Tố";
    // object-fit: contain — the approved Overview rendering has
    // embedded copy/logo near its edges that must never be cropped.
    renderDepthFrameImage(
      document.getElementById("overview-media-inner"),
      window.projectConfig.overviewImage,
      overviewAlt,
      null,
      "contain",
      "center"
    );
    var detailAlt = lang === "en" ? "Palm River project rendering" : "Phối cảnh dự án Palm River";
    // object-fit: cover, focal point lower-of-centre — architectural
    // shot, so the towers and riverside stay the visible subject even
    // when the 4:5 frame crops the sky/edges.
    renderDepthFrameImage(
      document.getElementById("details-media-inner"),
      window.projectConfig.projectDetailImage,
      detailAlt,
      "details__image",
      "cover",
      "center 45%"
    );
  }

  /* -----------------------------------------------------
     1. PROJECT DETAILS (§4)
     Desktop and mobile render from the same window.projectDetails
     array into one list — no separate desktop/mobile dataset, and
     rows beyond the default count are hidden with CSS (nth-child,
     see css/sections.css) rather than removed from the DOM by
     breakpoint. The toggle button expands/collapses the same list at
     every width; only the default cutoff count differs (8 desktop/
     tablet, 5 mobile).
     ----------------------------------------------------- */
  var detailsExpanded = false;
  function renderDetails(lang) {
    var listEl = document.getElementById("details-list");
    if (!listEl || !window.projectDetails) return;
    listEl.innerHTML = "";

    window.projectDetails.forEach(function (field) {
      var dt = document.createElement("dt");
      dt.textContent = lang === "en" ? field.en : field.vi;
      var dd = document.createElement("dd");
      if (field.confirmed) {
        dd.textContent = lang === "en" ? field.valueEn : field.valueVi;
      } else {
        dd.textContent = lang === "en" ? PENDING_EN : PENDING_VI;
        dd.classList.add("is-pending");
      }
      var row = document.createElement("div");
      row.className = "details__row";
      row.appendChild(dt);
      row.appendChild(dd);
      listEl.appendChild(row);
    });

    updateDetailsToggle(lang);
  }

  function updateDetailsToggle(lang) {
    var listEl = document.getElementById("details-list");
    var btn = document.getElementById("details-toggle");
    if (!listEl || !btn) return;
    listEl.setAttribute("data-expanded", detailsExpanded ? "true" : "false");
    btn.setAttribute("aria-expanded", detailsExpanded ? "true" : "false");
    btn.textContent = detailsExpanded
      ? (lang === "en" ? "Collapse" : "Thu gọn")
      : (lang === "en" ? "View full information" : "Xem đầy đủ thông tin");
  }

  function setupDetailsToggle() {
    var btn = document.getElementById("details-toggle");
    if (!btn) return;
    btn.addEventListener("click", function () {
      detailsExpanded = !detailsExpanded;
      updateDetailsToggle(currentLang());
      if (!detailsExpanded) {
        var section = document.getElementById("chi-tiet-du-an");
        if (section) section.scrollIntoView({ block: "nearest" });
      }
    });
  }

  /* -----------------------------------------------------
     2. LOCATION / CONNECTIVITY (§5)
     ----------------------------------------------------- */
  var activeLocationCategory = null;

  function renderLocation(lang) {
    var host = document.getElementById("location-tabs");
    if (!host || !window.connectivityData) return;
    var keys = Object.keys(window.connectivityData);
    if (!activeLocationCategory) activeLocationCategory = keys[0];

    var tablist = document.createElement("div");
    tablist.className = "location__tablist";
    tablist.setAttribute("role", "tablist");
    tablist.setAttribute("aria-label", "Nhóm tiện ích kết nối");

    keys.forEach(function (key) {
      var cat = window.connectivityData[key];
      var isActive = key === activeLocationCategory;
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "glass-tab glass-tab--light location__tab" + (isActive ? " is-active" : "");
      btn.setAttribute("role", "tab");
      btn.setAttribute("data-category", key);
      btn.setAttribute("aria-selected", isActive ? "true" : "false");
      btn.textContent = lang === "en" ? cat.en : cat.vi;
      btn.addEventListener("click", function () {
        activeLocationCategory = key;
        renderLocation(currentLang());
      });
      if (isActive) {
        // Keep the active tab visible on the mobile scroll row after
        // a language switch re-render.
        requestAnimationFrame(function () { scrollTabIntoView(btn); });
      }
      tablist.appendChild(btn);
    });

    var panel = document.createElement("div");
    panel.className = "location__panel";
    panel.setAttribute("role", "tabpanel");
    window.connectivityData[activeLocationCategory].items.forEach(function (item) {
      var row = document.createElement("div");
      row.className = "location__item";
      var name = document.createElement("span");
      name.className = "location__item-name";
      name.textContent = lang === "en" ? item.en : item.vi;
      var time = document.createElement("span");
      time.className = "location__item-time";
      time.textContent = lang === "en" ? item.timeEn : item.time;
      row.appendChild(name);
      row.appendChild(time);
      panel.appendChild(row);
    });

    host.innerHTML = "";
    host.appendChild(tablist);
    host.appendChild(panel);
  }

  /* -----------------------------------------------------
     3. AMENITIES (§6)
     The amenity list and the amenity image carousel are fully
     independent of each other — the list is plain text (no buttons,
     no click-to-change-image, no per-item active state); the carousel
     runs on its own autoplay timer against the active group's own
     `images` array. Two-level tabs (main tab, then group tab) both
     read generically from window.amenityTabs / window.amenityGroups
     (js/config.js) — nothing here branches on a specific tab/group
     key, so Palm City's 4 category groups and Palm River's 4 floor
     groups share the exact same render path.
     ----------------------------------------------------- */
  var activeAmenityTab = null;
  var activeAmenityGroup = null;
  var lastRenderedAmenityGroupKey = null;

  function currentAmenityGroup() {
    if (!activeAmenityTab || !activeAmenityGroup || !window.amenityGroups) return null;
    var tabGroups = window.amenityGroups[activeAmenityTab] || {};
    return tabGroups[activeAmenityGroup] || null;
  }

  function renderAmenitySection(lang) {
    var mainTabsHost = document.getElementById("amenities-main-tabs");
    var groupTabsHost = document.getElementById("amenities-floor-tabs");
    if (!mainTabsHost || !groupTabsHost || !window.amenityTabs || !window.amenityGroups) return;

    if (!activeAmenityTab) activeAmenityTab = window.amenityTabs[0].key;
    var groupKeys = Object.keys(window.amenityGroups[activeAmenityTab] || {});
    if (!activeAmenityGroup || groupKeys.indexOf(activeAmenityGroup) === -1) {
      activeAmenityGroup = groupKeys[0] || null;
    }

    mainTabsHost.innerHTML = "";
    window.amenityTabs.forEach(function (tab) {
      var isActive = tab.key === activeAmenityTab;
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "glass-tab glass-tab--dark amenities__main-tab" + (isActive ? " is-active" : "");
      btn.setAttribute("role", "tab");
      btn.setAttribute("aria-selected", isActive ? "true" : "false");
      btn.textContent = lang === "en" ? tab.labelEn : tab.labelVi;
      btn.addEventListener("click", function () {
        if (activeAmenityTab === tab.key) return;
        activeAmenityTab = tab.key;
        activeAmenityGroup = null;
        renderAmenitySection(currentLang());
      });
      mainTabsHost.appendChild(btn);
    });

    groupTabsHost.innerHTML = "";
    groupKeys.forEach(function (key) {
      var group = window.amenityGroups[activeAmenityTab][key];
      var isActive = key === activeAmenityGroup;
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "glass-tab glass-tab--dark amenities__floor-tab" + (isActive ? " is-active" : "");
      btn.setAttribute("role", "tab");
      btn.setAttribute("aria-selected", isActive ? "true" : "false");
      // Palm City groups carry a short tabVi/tabEn label separate from
      // their full official heading (titleVi/titleEn, shown in the
      // panel below); Palm River's floor groups only have the (already
      // short) titleVi/titleEn, which doubles as both.
      btn.textContent = lang === "en" ? (group.tabEn || group.titleEn) : (group.tabVi || group.titleVi);
      btn.addEventListener("click", function () {
        if (activeAmenityGroup === key) return;
        activeAmenityGroup = key;
        renderAmenitySection(currentLang());
      });
      if (isActive) {
        requestAnimationFrame(function () { scrollTabIntoView(btn); });
      }
      groupTabsHost.appendChild(btn);
    });

    // Only rebuild/reset the carousel (and the expanded-list state)
    // when the active group actually changed — a pure language switch
    // just relabels what's already there (no autoplay restart, no
    // layout jump, no losing the visitor's expand/collapse choice).
    var groupKey = activeAmenityTab + ":" + activeAmenityGroup;
    var groupChanged = groupKey !== lastRenderedAmenityGroupKey;
    lastRenderedAmenityGroupKey = groupKey;
    if (groupChanged) {
      amenityListExpanded = false;
      if (amenitySheetOpen) {
        amenitySheetOpen = false;
        var openSheet = document.getElementById("amenity-sheet");
        if (openSheet) {
          openSheet.setAttribute("data-open", "false");
          openSheet.setAttribute("aria-hidden", "true");
        }
        document.body.style.overflow = "";
      }
    }

    renderAmenityList(lang);
    renderAmenityCarousel(lang, groupChanged);
  }

  // Group heading + count badge + a numbered list (global numbering,
  // never restarted per group). Plain text, not interactive — clicking
  // an item never changes the carousel. Only the first 12 items show
  // by default. Past 12 items, the "view all" toggle behaves
  // differently by breakpoint (see isAmenityDesktop()):
  //  - desktop: swaps the preview for the full list in place, inside
  //    #amenity-list-scroll, which is height-matched to the media
  //    frame and scrolls internally (.amenities__layout--expanded).
  //  - tablet/mobile: opens the #amenity-sheet bottom sheet instead,
  //    so a long list never grows the page itself.
  // Every Palm City/Palm River group always has an approved items
  // array now, so there is no empty-list placeholder branch to render.
  var amenityListExpanded = false;
  var amenitySheetOpen = false;

  function isAmenityDesktop() {
    return !!(window.matchMedia && window.matchMedia("(min-width: 1024px)").matches);
  }

  function buildAmenityListEl(items, lang) {
    var list = document.createElement("div");
    list.className = "amenity-list";
    list.setAttribute("aria-label", lang === "en" ? "Amenity list" : "Danh sách tiện ích");
    items.forEach(function (item) {
      var row = document.createElement("p");
      row.className = "amenity-list__item";
      var idx = document.createElement("span");
      idx.className = "amenity-list__index";
      idx.textContent = String(item.n).padStart(2, "0");
      var name = document.createElement("span");
      name.className = "amenity-list__name";
      name.textContent = lang === "en" ? item.en : item.vi;
      row.appendChild(idx);
      row.appendChild(name);
      list.appendChild(row);
    });
    return list;
  }

  function openAmenitySheet() {
    var sheet = document.getElementById("amenity-sheet");
    if (!sheet) return;
    amenitySheetOpen = true;
    sheet.setAttribute("data-open", "true");
    sheet.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    renderAmenityList(currentLang());
    var closeBtn = document.getElementById("amenity-sheet-close");
    if (closeBtn) closeBtn.focus();
  }

  function closeAmenitySheet() {
    if (!amenitySheetOpen) return;
    amenitySheetOpen = false;
    var sheet = document.getElementById("amenity-sheet");
    if (sheet) {
      sheet.setAttribute("data-open", "false");
      sheet.setAttribute("aria-hidden", "true");
    }
    document.body.style.overflow = "";
    var sheetListSlot = document.getElementById("amenity-sheet-list-slot");
    if (sheetListSlot) sheetListSlot.scrollTop = 0;
    renderAmenityList(currentLang());
    var toggle = document.getElementById("amenity-toggle");
    if (toggle) toggle.focus();
  }

  // Caps #amenity-list-scroll's height so the *whole panel* (head +
  // list + toggle) lands at the media frame's own rendered height —
  // not just the list itself — so the row never grows taller than the
  // image and the section's overall height never shifts. The frame's
  // height is measured (its aspect-ratio makes it a function of
  // viewport width), then the head/toggle/gaps "chrome" already
  // sharing the panel's flex column is subtracted from it. Grid
  // align-items: stretch was tried first but also stretched the media
  // frame itself to match the list's full content height, defeating
  // the point — an explicit measured max-height avoids that.
  function syncAmenityListScrollHeight() {
    var layout = document.getElementById("amenities-layout");
    var panel = document.querySelector(".amenity-panel");
    var scrollHost = document.getElementById("amenity-list-scroll");
    var frame = document.getElementById("amenity-media-frame");
    var head = document.querySelector(".amenity-panel__head");
    var toggle = document.getElementById("amenity-toggle");
    if (!layout || !panel || !scrollHost) return;
    if (frame && layout.classList.contains("amenities__layout--expanded")) {
      var frameHeight = frame.getBoundingClientRect().height;
      var gap = parseFloat(getComputedStyle(panel).rowGap) || 0;
      var headHeight = head ? head.getBoundingClientRect().height : 0;
      var toggleHeight = toggle && !toggle.hidden ? toggle.getBoundingClientRect().height : 0;
      var chrome = headHeight + toggleHeight + gap * 2;
      var available = frameHeight - chrome;
      scrollHost.style.maxHeight = Math.max(available, 80) + "px";
    } else {
      scrollHost.style.maxHeight = "";
    }
  }

  function renderAmenityList(lang) {
    var titleHost = document.getElementById("amenity-group-title");
    var countHost = document.getElementById("amenity-group-count");
    var previewSlot = document.getElementById("amenity-list-slot");
    var scrollHost = document.getElementById("amenity-list-scroll");
    var toggle = document.getElementById("amenity-toggle");
    var layout = document.getElementById("amenities-layout");
    var sheetTitleHost = document.getElementById("amenity-sheet-title");
    var sheetCountHost = document.getElementById("amenity-sheet-count");
    var sheetListSlot = document.getElementById("amenity-sheet-list-slot");
    if (!titleHost || !countHost || !previewSlot || !toggle) return;

    var group = currentAmenityGroup();
    var items = group ? group.items : [];
    var total = items.length;

    var titleText = group ? (lang === "en" ? group.titleEn : group.titleVi) : "";
    var countText = total
      ? (lang === "en" ? total + " amenities" : total + " tiện ích")
      : "";
    titleHost.textContent = titleText;
    countHost.textContent = countText;
    if (sheetTitleHost) sheetTitleHost.textContent = titleText;
    if (sheetCountHost) sheetCountHost.textContent = countText;

    var hasOverflow = total > 12;
    var desktop = isAmenityDesktop();
    var inlineExpanded = desktop && amenityListExpanded && hasOverflow;
    var visible = inlineExpanded || !hasOverflow ? items : items.slice(0, 12);

    previewSlot.innerHTML = "";
    previewSlot.appendChild(buildAmenityListEl(visible, lang));
    if (scrollHost && !inlineExpanded) scrollHost.scrollTop = 0;

    if (sheetListSlot) {
      sheetListSlot.innerHTML = "";
      sheetListSlot.appendChild(buildAmenityListEl(items, lang));
    }

    if (layout) layout.classList.toggle("amenities__layout--expanded", inlineExpanded);

    if (hasOverflow) {
      var expandedState = desktop ? amenityListExpanded : amenitySheetOpen;
      toggle.hidden = false;
      toggle.textContent = expandedState
        ? (lang === "en" ? "Collapse" : "Thu gọn")
        : (lang === "en" ? "View all " + total + " amenities" : "Xem tất cả " + total + " tiện ích");
      toggle.setAttribute("aria-expanded", expandedState ? "true" : "false");
      toggle.onclick = function () {
        if (isAmenityDesktop()) {
          amenityListExpanded = !amenityListExpanded;
          renderAmenityList(currentLang());
        } else if (amenitySheetOpen) {
          closeAmenitySheet();
        } else {
          openAmenitySheet();
        }
      };
    } else {
      toggle.hidden = true;
      toggle.onclick = null;
    }
    syncAmenityListScrollHeight();
  }

  // Keeps the expanded list's cap in sync with the media frame's
  // height as it changes — window resize, or the frame's own
  // aspect-ratio recomputing on a width change (e.g. scrollbar
  // appearing/disappearing). syncAmenityListScrollHeight() itself is a
  // no-op while not expanded, so this is cheap to leave running.
  function setupAmenityListHeightSync() {
    var frame = document.getElementById("amenity-media-frame");
    if (!frame) return;
    if (window.ResizeObserver) {
      var ro = new ResizeObserver(function () { syncAmenityListScrollHeight(); });
      ro.observe(frame);
    } else {
      window.addEventListener("resize", syncAmenityListScrollHeight);
    }
  }

  function setupAmenitySheet() {
    var sheet = document.getElementById("amenity-sheet");
    if (!sheet) return;
    var overlay = document.getElementById("amenity-sheet-overlay");
    var closeBtn = document.getElementById("amenity-sheet-close");
    if (overlay) overlay.addEventListener("click", closeAmenitySheet);
    if (closeBtn) closeBtn.addEventListener("click", closeAmenitySheet);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && amenitySheetOpen) closeAmenitySheet();
    });
    // A live resize/orientation change across the 1024px breakpoint is
    // rare but should never leave the UI stuck (sheet open with no
    // way to reach it behind a desktop layout, or the inline panel
    // stretched with no image-height match on a stacked mobile one).
    if (window.matchMedia) {
      var desktopQuery = window.matchMedia("(min-width: 1024px)");
      var onBreakpointChange = function () {
        if (amenitySheetOpen) closeAmenitySheet();
        if (amenityListExpanded) {
          amenityListExpanded = false;
          renderAmenityList(currentLang());
        }
      };
      if (desktopQuery.addEventListener) {
        desktopQuery.addEventListener("change", onBreakpointChange);
      } else if (desktopQuery.addListener) {
        desktopQuery.addListener(onBreakpointChange);
      }
    }
  }

  /* Independent auto-playing image carousel — fade + slight scale
     transition, previous/next, pagination dots, swipe on touch, pause
     on hover/focus, "Xem ảnh" opens the shared zoom lightbox. Runs
     entirely off the active group's own `images` list. */
  var amenityCarouselIndex = 0;
  var amenityCarouselTimer = null;
  var amenityCarouselPaused = false;
  var amenityCarouselInteractionSetup = false;
  var AMENITY_AUTOPLAY_MS = 5500;

  function renderAmenityCarousel(lang, groupChanged) {
    var stage = document.getElementById("amenity-carousel-stage");
    var dotsHost = document.getElementById("amenity-carousel-dots");
    var expandBtn = document.getElementById("amenity-expand");
    if (!stage || !dotsHost) return;

    var group = currentAmenityGroup();
    var images = group ? group.images : [];
    var title = group ? (lang === "en" ? group.titleEn : group.titleVi) : "";
    var mediaFrame = document.getElementById("amenity-media-frame");
    var layout = document.getElementById("amenities-layout");

    if (!groupChanged) {
      // Language-only re-render: just relabel what's already there.
      Array.prototype.forEach.call(stage.querySelectorAll(".amenity-carousel__img"), function (img) {
        img.alt = title;
      });
      if (expandBtn && images.length) {
        expandBtn.onclick = function () { openZoomModal(images[amenityCarouselIndex], title); };
      }
      return;
    }

    stopAmenityCarouselAutoplay();
    amenityCarouselIndex = 0;
    stage.innerHTML = "";
    dotsHost.innerHTML = "";

    // A group with no approved photography (e.g. Premium Privileges)
    // hides the media frame entirely — no placeholder icon, no empty
    // box — and lets the amenity panel take the full row width. A
    // group whose photos happen to have all failed to load (a real
    // runtime error, handled below) still uses the emptied-frame
    // .amenity-carousel--empty treatment rather than removing the
    // frame, since that's a transient failure, not a content gap.
    if (mediaFrame) mediaFrame.hidden = !images.length;
    if (layout) layout.classList.toggle("amenities__layout--full", !images.length);
    if (!images.length) {
      if (expandBtn) expandBtn.onclick = null;
      return;
    }

    var carousel = document.getElementById("amenity-carousel");

    images.forEach(function (src, index) {
      var img = document.createElement("img");
      img.className = "amenity-carousel__img" + (index === 0 ? " is-active" : "");
      img.alt = title;
      img.decoding = "async";
      // Only the first slide fetches immediately; every other slide's
      // path is parked in data-src and only becomes a real src once
      // the visitor navigates to (or just before) it — see
      // loadAmenitySlide() below. Stacking all slides in the same box
      // means the native loading="lazy" viewport check can't tell
      // them apart, so without this every multi-MB photo in the
      // group would fetch the moment the carousel scrolls on screen.
      if (index === 0) {
        img.loading = "eager";
        img.src = src;
      } else {
        img.loading = "lazy";
        img.dataset.src = src;
      }
      stage.appendChild(img);

      var dot = document.createElement("button");
      dot.type = "button";
      dot.className = "amenity-carousel__dot" + (index === 0 ? " is-active" : "");
      dot.setAttribute("role", "tab");
      dot.setAttribute("aria-label", (lang === "en" ? "Image " : "Ảnh ") + (index + 1));
      dot.setAttribute("aria-selected", index === 0 ? "true" : "false");
      dot.addEventListener("click", function () {
        goToAmenityCarouselSlide(index);
        restartAmenityCarouselAutoplay();
      });
      dotsHost.appendChild(dot);

      // A slide that fails to load is removed from rotation (image +
      // its dot hidden) rather than left as a broken-image icon; if
      // it was the active/only slide, advance off it immediately.
      img.addEventListener("error", function () {
        console.warn("Failed to load image:", img.getAttribute("src"));
        img.style.display = "none";
        dot.style.display = "none";
        var remaining = stage.querySelectorAll(".amenity-carousel__img:not([style*='display: none'])");
        if (!remaining.length) {
          carousel.classList.add("amenity-carousel--empty");
          stopAmenityCarouselAutoplay();
        } else if (img.classList.contains("is-active")) {
          goToAmenityCarouselSlide(index + 1);
        }
      });
    });

    if (expandBtn) {
      expandBtn.onclick = function () { openZoomModal(images[amenityCarouselIndex], title); };
    }

    setupAmenityCarouselInteraction();
    if (images.length > 1) startAmenityCarouselAutoplay();
  }

  function goToAmenityCarouselSlide(index) {
    var stage = document.getElementById("amenity-carousel-stage");
    if (!stage) return;
    var imgs = stage.querySelectorAll(".amenity-carousel__img");
    if (!imgs.length) return;
    amenityCarouselIndex = (index + imgs.length) % imgs.length;
    imgs.forEach(function (img, i) {
      img.classList.toggle("is-active", i === amenityCarouselIndex);
      // First time this slide becomes active (or its neighbour, for a
      // smoother swipe/autoplay hand-off): fetch its real src.
      var withinOne = Math.abs(i - amenityCarouselIndex) <= 1;
      if (withinOne && !img.src && img.dataset.src) {
        img.src = img.dataset.src;
      }
    });
    var dots = document.querySelectorAll("#amenity-carousel-dots .amenity-carousel__dot");
    dots.forEach(function (dot, i) {
      var isActive = i === amenityCarouselIndex;
      dot.classList.toggle("is-active", isActive);
      dot.setAttribute("aria-selected", isActive ? "true" : "false");
    });
    var expandBtn = document.getElementById("amenity-expand");
    var group = currentAmenityGroup();
    if (expandBtn && group && group.images.length) {
      expandBtn.onclick = function () { openZoomModal(group.images[amenityCarouselIndex], currentLang() === "en" ? group.titleEn : group.titleVi); };
    }
  }

  function startAmenityCarouselAutoplay() {
    stopAmenityCarouselAutoplay();
    amenityCarouselTimer = setInterval(function () {
      if (amenityCarouselPaused) return;
      goToAmenityCarouselSlide(amenityCarouselIndex + 1);
    }, AMENITY_AUTOPLAY_MS);
  }
  function stopAmenityCarouselAutoplay() {
    if (amenityCarouselTimer) {
      clearInterval(amenityCarouselTimer);
      amenityCarouselTimer = null;
    }
  }
  function restartAmenityCarouselAutoplay() {
    var stage = document.getElementById("amenity-carousel-stage");
    if (stage && stage.querySelectorAll(".amenity-carousel__img").length > 1) {
      startAmenityCarouselAutoplay();
    }
  }

  function setupAmenityCarouselInteraction() {
    if (amenityCarouselInteractionSetup) return;
    amenityCarouselInteractionSetup = true;

    var carousel = document.getElementById("amenity-carousel");
    var stage = document.getElementById("amenity-carousel-stage");
    var prevBtn = document.getElementById("amenity-carousel-prev");
    var nextBtn = document.getElementById("amenity-carousel-next");
    if (!carousel || !stage) return;

    if (prevBtn) prevBtn.addEventListener("click", function () {
      goToAmenityCarouselSlide(amenityCarouselIndex - 1);
      restartAmenityCarouselAutoplay();
    });
    if (nextBtn) nextBtn.addEventListener("click", function () {
      goToAmenityCarouselSlide(amenityCarouselIndex + 1);
      restartAmenityCarouselAutoplay();
    });

    ["mouseenter", "focusin"].forEach(function (evt) {
      carousel.addEventListener(evt, function () { amenityCarouselPaused = true; });
    });
    ["mouseleave", "focusout"].forEach(function (evt) {
      carousel.addEventListener(evt, function () { amenityCarouselPaused = false; });
    });

    // Touch swipe.
    var startX = 0, deltaX = 0, tracking = false;
    stage.addEventListener("touchstart", function (e) {
      tracking = true;
      startX = e.touches[0].clientX;
      deltaX = 0;
    }, { passive: true });
    stage.addEventListener("touchmove", function (e) {
      if (!tracking) return;
      deltaX = e.touches[0].clientX - startX;
    }, { passive: true });
    stage.addEventListener("touchend", function () {
      if (!tracking) return;
      tracking = false;
      if (Math.abs(deltaX) > 40) {
        goToAmenityCarouselSlide(amenityCarouselIndex + (deltaX < 0 ? 1 : -1));
        restartAmenityCarouselAutoplay();
      }
    });
  }

  /* -----------------------------------------------------
     4. FLOOR PLANS (§7)
     ----------------------------------------------------- */
  var activeFloorplanIndex = 0;

  function renderFloorplans(lang) {
    var tabsHost = document.getElementById("floorplans-tabs");
    var panelHost = document.getElementById("floorplans-panel");
    var frameHost = document.getElementById("floorplans-image-frame");
    if (!tabsHost || !panelHost || !frameHost || !window.floorPlanTypes) return;

    tabsHost.innerHTML = "";
    window.floorPlanTypes.forEach(function (type, index) {
      var isActive = index === activeFloorplanIndex;
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "glass-tab glass-tab--light floorplans__tab" + (isActive ? " is-active" : "");
      btn.setAttribute("role", "tab");
      btn.setAttribute("aria-selected", isActive ? "true" : "false");
      btn.textContent = lang === "en" ? type.en : type.vi;
      btn.addEventListener("click", function () {
        activeFloorplanIndex = index;
        renderFloorplans(currentLang());
      });
      if (isActive) {
        requestAnimationFrame(function () { scrollTabIntoView(btn); });
      }
      tabsHost.appendChild(btn);
    });

    var activeType = window.floorPlanTypes[activeFloorplanIndex];
    var typeLabel = lang === "en" ? activeType.en : activeType.vi;

    // Config field: window.floorPlanTypes[i].image (js/config.js) —
    // empty by default, renders the neutral placeholder note until an
    // approved plan/show-unit file is supplied per type.
    renderDepthFrameImage(frameHost, activeType.image, typeLabel, null, "contain");
    frameHost.onclick = function () {
      openZoomModal(activeType.image || null, typeLabel);
    };

    panelHost.innerHTML = "";
    var typeHeading = document.createElement("p");
    typeHeading.className = "floorplans__panel-type";
    typeHeading.textContent = lang === "en" ? activeType.en : activeType.vi;

    var area = document.createElement("p");
    area.className = "floorplans__panel-area";
    var areaValue = (lang === "en" ? activeType.areaEn : activeType.areaVi) || PENDING_VI_EN(lang);
    area.textContent = (lang === "en" ? "Carpet area: " : "Diện tích thông thủy: ") + areaValue;

    var benefits = document.createElement("ul");
    benefits.className = "floorplans__panel-benefits";
    (activeType.benefits || []).forEach(function (b) {
      var li = document.createElement("li");
      li.textContent = lang === "en" ? b.en : b.vi;
      benefits.appendChild(li);
    });

    var cta = document.createElement("button");
    cta.type = "button";
    cta.className = "btn btn--floorplan-cta";
    cta.setAttribute("data-open-popup", "");
    cta.textContent = lang === "en" ? "Request information" : "Đăng ký nhận thông tin";

    panelHost.appendChild(typeHeading);
    panelHost.appendChild(area);
    panelHost.appendChild(benefits);
    panelHost.appendChild(cta);

    var prevBtn = document.getElementById("floorplans-prev");
    var nextBtn = document.getElementById("floorplans-next");
    if (prevBtn) prevBtn.onclick = function () {
      activeFloorplanIndex = (activeFloorplanIndex - 1 + window.floorPlanTypes.length) % window.floorPlanTypes.length;
      renderFloorplans(currentLang());
    };
    if (nextBtn) nextBtn.onclick = function () {
      activeFloorplanIndex = (activeFloorplanIndex + 1) % window.floorPlanTypes.length;
      renderFloorplans(currentLang());
    };

    renderFloorplanTypicalMedia(lang);
    renderFloorplanTypicalPoints(lang);
  }
  function PENDING_VI_EN(lang) { return lang === "en" ? PENDING_EN : PENDING_VI; }

  /* Wraps approved numeric callouts (unit counts, lift ratios, carpet-
     area percentages) in .feature-stat so they read as highlighted
     figures inside the feature-card body text — one shared pattern for
     both languages rather than a duplicate VI/EN regex pair. */
  var FEATURE_STAT_RE =
    /\d+(?:[.,]\d+)?\s?(?:thang máy|lifts?)(?:\s*(?:cho|for|\/)\s*\d+\s*(?:căn\/tầng|units?\s+per\s+floor))?|\d+(?:[.,]\d+)?\s?%(?:\s?[–-]\s?\d+(?:[.,]\d+)?\s?%)?|\d+\s?(?:căn\/tầng|units?\s+per\s+floor)/gi;
  function highlightFeatureStats(text) {
    return text.replace(FEATURE_STAT_RE, function (m) {
      return '<span class="feature-stat">' + m + "</span>";
    });
  }

  function renderFloorplanTypicalMedia(lang) {
    var wrap = document.getElementById("floorplan-typical-image-wrap");
    var zoomBtn = document.getElementById("floorplan-typical-zoom");
    if (!wrap || !window.floorPlanTypical) return;
    var label = lang === "en" ? window.floorPlanTypical.headingEn : window.floorPlanTypical.headingVi;
    wrap.innerHTML = "";
    if (window.floorPlanTypical.image) {
      var img = document.createElement("img");
      img.src = window.floorPlanTypical.image;
      img.alt = label;
      img.loading = "lazy";
      img.decoding = "async";
      handleImgError(img);
      wrap.appendChild(img);
    } else {
      var note = document.createElement("p");
      note.className = "floorplan-media-frame__note";
      note.textContent = lang === "en" ? "Add the floor plan image here" : "Thêm ảnh mặt bằng tại đây";
      wrap.appendChild(note);
    }
    if (zoomBtn) {
      zoomBtn.onclick = function () {
        openZoomModal(window.floorPlanTypical.image || null, label);
      };
    }
  }

  function renderFloorplanTypicalPoints(lang) {
    var host = document.getElementById("floorplans-typical-points");
    if (!host || !window.floorPlanTypical) return;
    host.innerHTML = "";
    window.floorPlanTypical.points.forEach(function (point) {
      var card = document.createElement("div");
      card.className = "feature-card";
      var title = document.createElement("h4");
      title.className = "feature-card__title";
      title.textContent = lang === "en" ? point.titleEn : point.titleVi;
      var text = document.createElement("p");
      text.className = "feature-card__text";
      text.innerHTML = highlightFeatureStats(lang === "en" ? point.textEn : point.textVi);
      card.appendChild(title);
      card.appendChild(text);
      host.appendChild(card);
    });
  }

  /* Simple image zoom modal, created once and reused. */
  var zoomModal;
  function ensureZoomModal() {
    if (zoomModal) return zoomModal;
    zoomModal = document.createElement("div");
    zoomModal.className = "image-zoom-modal";
    zoomModal.innerHTML =
      '<div class="image-zoom-modal__overlay"></div>' +
      '<div class="image-zoom-modal__figure">' +
      '<button type="button" class="image-zoom-modal__close" aria-label="Đóng">&times;</button>' +
      '<div class="image-zoom-modal__body"></div>' +
      "</div>";
    document.body.appendChild(zoomModal);
    function close() {
      zoomModal.setAttribute("data-open", "false");
    }
    zoomModal.querySelector(".image-zoom-modal__overlay").addEventListener("click", close);
    zoomModal.querySelector(".image-zoom-modal__close").addEventListener("click", close);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });
    return zoomModal;
  }
  function openZoomModal(src, label) {
    var modal = ensureZoomModal();
    var body = modal.querySelector(".image-zoom-modal__body");
    if (src) {
      body.innerHTML = '<img src="' + src + '" alt="' + label + '">';
    } else {
      body.innerHTML = '<p style="color:#fff;font-family:var(--font-body-alt);padding:40px;">' +
        (currentLang() === "en" ? "Image being updated" : "Hình ảnh đang được cập nhật") + "</p>";
    }
    modal.setAttribute("data-open", "true");
  }

  /* -----------------------------------------------------
     5. PAYMENT POLICY (§8) — four-tab payment-plan interface,
     fully data-driven from window.paymentPlans (js/config.js).
     One shared panel is (re)rendered for whichever plan is active;
     the other three plans' content is never mounted at once. Every
     content field is empty until an approved source is supplied, so
     renderPolicyPanel() only mounts a sub-container when its field
     actually has content — an empty field never shows a heading,
     bullet, timeline dot or "Đang cập nhật" placeholder to visitors.
     ----------------------------------------------------- */
  var activePolicyIndex = 0;

  function renderPolicySection(lang) {
    var tabsHost = document.getElementById("policy-tabs");
    var panel = document.getElementById("policy-panel");
    if (!tabsHost || !panel || !window.paymentPlans || !window.paymentPlans.length) return;

    // Reset to a valid plan whenever the data/array shape could have
    // changed (language switch, future content edits) — never leaves
    // the active panel pointing past the end of the array.
    if (activePolicyIndex < 0 || activePolicyIndex >= window.paymentPlans.length) {
      activePolicyIndex = 0;
    }

    tabsHost.innerHTML = "";
    window.paymentPlans.forEach(function (plan, index) {
      var isActive = index === activePolicyIndex;
      var tab = document.createElement("button");
      tab.type = "button";
      tab.className = "policy__tab" + (isActive ? " is-active" : "");
      tab.id = "policy-tab-" + plan.id;
      tab.setAttribute("role", "tab");
      tab.setAttribute("aria-selected", isActive ? "true" : "false");
      tab.setAttribute("aria-controls", "policy-panel");
      tab.tabIndex = isActive ? 0 : -1;

      var num = document.createElement("span");
      num.className = "policy__tab-index";
      num.textContent = plan.number;
      tab.appendChild(num);

      var label = document.createElement("span");
      label.className = "policy__tab-label";
      label.textContent = lang === "en" ? plan.labelEn : plan.labelVi;
      tab.appendChild(label);

      tab.addEventListener("click", function () {
        if (activePolicyIndex === index) return;
        activePolicyIndex = index;
        renderPolicySection(currentLang());
        tab.focus();
      });
      tab.addEventListener("keydown", function (e) {
        var last = window.paymentPlans.length - 1;
        var target = null;
        if (e.key === "ArrowRight") target = index === last ? 0 : index + 1;
        else if (e.key === "ArrowLeft") target = index === 0 ? last : index - 1;
        else if (e.key === "Home") target = 0;
        else if (e.key === "End") target = last;
        else return;
        e.preventDefault();
        activePolicyIndex = target;
        renderPolicySection(currentLang());
        var tabs = tabsHost.querySelectorAll(".policy__tab");
        if (tabs[target]) tabs[target].focus();
      });

      tabsHost.appendChild(tab);
    });

    renderPolicyPanel(window.paymentPlans[activePolicyIndex], lang);
  }

  // Dev-time-only sanity check — every plan's instalments (or, for the
  // dual-track mortgage plan, each track) must sum to exactly 100%.
  // Never silently flattens Đợt 5-9 into one 10% row: pct * repeat is
  // what gets summed, matching the grouped-segment rendering below.
  function validatePaymentPlans() {
    if (!window.paymentPlans) return;
    window.paymentPlans.forEach(function (plan) {
      if (plan.id === "mortgage") {
        var customer = 0, bank = 0;
        plan.milestones.forEach(function (m) {
          customer += m.customerPct || 0;
          bank += m.bankPct || 0;
        });
        if (customer !== plan.customerTotal || bank !== plan.bankTotal || customer + bank !== 100) {
          console.warn("Payment plan '" + plan.id + "' dual-track total is wrong: customer=" + customer + "% bank=" + bank + "% (expected 25% + 75% = 100%)");
        }
      } else {
        var total = 0;
        plan.milestones.forEach(function (m) { total += m.pct * (m.repeat || 1); });
        if (total !== 100) {
          console.warn("Payment plan '" + plan.id + "' milestones sum to " + total + "%, not 100%");
        }
      }
    });
  }

  // Groups milestones into rows of at most `size` items (Infinity = a
  // single row). Wide desktop (>=1280px) and mobile (<768px) both use
  // one row — mobile just reflows it vertically via CSS, see the
  // max-width:767px override below — only the 768-1279px tier chunks
  // into rows of 4, so a 7- or 6-milestone plan gets a clean two-row
  // fallback instead of the text shrinking to fit. Re-chunked (via
  // setupPolicyResponsiveReflow()'s matchMedia listener, see INIT)
  // whenever a resize crosses that boundary.
  function chunkMilestones(milestones, size) {
    if (!isFinite(size)) return [milestones];
    var rows = [];
    for (var i = 0; i < milestones.length; i += size) {
      rows.push(milestones.slice(i, i + size));
    }
    return rows;
  }
  function policyRowSize() {
    return (window.matchMedia && window.matchMedia("(min-width: 768px) and (max-width: 1279px)").matches)
      ? 4
      : Infinity;
  }
  var POLICY_ACTIVE_CHIPS = { HDMB: true, HANDOVER: true, GCN: true };
  var POLICY_GAP_ARROW_SVG =
    '<svg viewBox="0 0 10 8" width="9" height="7" aria-hidden="true" focusable="false">' +
    '<path d="M0.5 4H8.5M8.5 4L5.5 1M8.5 4L5.5 7" stroke="currentColor" stroke-width="1.3" ' +
    'stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>';
  var POLICY_ROW_TURN_SVG =
    '<svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" focusable="false">' +
    '<path d="M8 1V11M8 11L4.5 7.5M8 11L11.5 7.5" stroke="currentColor" stroke-width="1.4" ' +
    'stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>';

  // Scroll-triggered reveal — the line "draws" and nodes light up in
  // sequence via CSS transitions (see .payment-plan__row.is-visible
  // in css/sections.css); prefers-reduced-motion is handled globally
  // (styles.css zeroes all transition/animation durations), so no
  // special-casing is needed here beyond the no-IntersectionObserver
  // fallback. Re-observes on every render (tab switch/resize reflow),
  // which intentionally replays the reveal for the freshly mounted row.
  function setupPolicyTimelineReveal(rows) {
    if (!rows.length) return;
    if (!("IntersectionObserver" in window)) {
      rows.forEach(function (row) { row.classList.add("is-visible"); });
      return;
    }
    var observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.35 });
    rows.forEach(function (row) { observer.observe(row); });
  }

  function renderPolicyPanel(plan, lang) {
    var panel = document.getElementById("policy-panel");
    if (!panel) return;
    panel.innerHTML = "";
    panel.setAttribute("aria-labelledby", "policy-tab-" + plan.id);

    var wrap = document.createElement("div");
    wrap.className = "payment-plan";

    // Shared registration-amount badge — identical position/wording
    // on every plan, per the brief ("do not animate it repeatedly":
    // it's plain static markup, no count-up).
    var badge = document.createElement("p");
    badge.className = "payment-plan__badge";
    var badgeLabel = document.createElement("span");
    badgeLabel.textContent = lang === "en" ? "Registration amount:" : "Đăng ký nhận thông tin:";
    var badgeValue = document.createElement("strong");
    badgeValue.className = "payment-plan__badge-value";
    badgeValue.textContent = (lang === "en" ? "VND " : "") + plan.registrationAmount + (lang === "en" ? " million" : " triệu VNĐ");
    badge.appendChild(badgeLabel);
    badge.appendChild(badgeValue);
    wrap.appendChild(badge);

    var isMortgage = plan.id === "mortgage";

    if (isMortgage) {
      var legend = document.createElement("div");
      legend.className = "payment-plan__legend";
      var legendCustomer = document.createElement("span");
      legendCustomer.className = "payment-plan__legend-item payment-plan__legend-item--customer";
      legendCustomer.textContent = lang === "en" ? "KH — Customer payment" : "KH — Khách hàng thanh toán";
      var legendBank = document.createElement("span");
      legendBank.className = "payment-plan__legend-item payment-plan__legend-item--bank";
      legendBank.textContent = lang === "en" ? "NH — Bank disbursement" : "NH — Ngân hàng giải ngân";
      legend.appendChild(legendCustomer);
      legend.appendChild(legendBank);
      wrap.appendChild(legend);
    }

    // Line-based timeline: one continuous metallic-gold line running
    // through every node's centre. Each step draws ONE full-column-
    // width line segment (see .payment-plan__step::before) — since
    // every step in a row is an equal-width flex column with its node
    // centred, step N's segment starts exactly at step N-1's node and
    // ends at step N's own node, so consecutive segments meet with no
    // gap or overlap. Rows (see chunkMilestones()) let a plan with
    // more milestones than fit on one line wrap to a clean second row
    // instead of shrinking text; .payment-plan__row-turn marks that
    // hand-off visually. Renders through the exact same milestone data
    // as before — see window.paymentPlans in js/config.js — so every
    // percentage/timing/chip is unchanged, just redrawn as a timeline.
    var timeline = document.createElement("div");
    timeline.className = "payment-plan__timeline" + (isMortgage ? " payment-plan__timeline--dual" : "");

    var rows = chunkMilestones(plan.milestones, policyRowSize());
    var reflowRows = [];
    var globalIndex = 0;

    rows.forEach(function (rowMilestones, rowIndex) {
      var row = document.createElement("div");
      row.className = "payment-plan__row";
      row.setAttribute("role", "list");
      row.style.setProperty("--row-items", rowMilestones.length);

      rowMilestones.forEach(function (m, indexInRow) {
        var isActive = !!(m.chip && POLICY_ACTIVE_CHIPS[m.chip]);
        var step = document.createElement("div");
        step.className = "payment-plan__step" +
          (m.repeat > 1 ? " payment-plan__step--grouped" : "") +
          (isActive ? " payment-plan__step--active" : "") +
          (indexInRow === 0 ? " payment-plan__step--row-start" : "");
        step.style.setProperty("--i", globalIndex);
        step.setAttribute("role", "listitem");

        // The gap-to-here label sits on this step's own incoming line
        // segment — except for a row's first step, whose incoming gap
        // (if any) is shown on the .payment-plan__row-turn connector
        // instead, so it's never rendered twice.
        var gapVi = m.gapVi, gapEn = m.gapEn;
        if (indexInRow > 0 && (gapVi || gapEn)) {
          var gap = document.createElement("span");
          gap.className = "payment-plan__step-gap";
          gap.innerHTML = POLICY_GAP_ARROW_SVG;
          var gapText = document.createElement("span");
          gapText.textContent = lang === "en" ? gapEn : gapVi;
          gap.appendChild(gapText);
          step.appendChild(gap);
        }

        var node = document.createElement("div");
        node.className = "payment-plan__step-node";
        if (isMortgage) {
          var dual = document.createElement("span");
          dual.className = "payment-plan__step-node-dual";
          var custVal = document.createElement("b");
          custVal.className = "payment-plan__step-node-customer";
          custVal.textContent = m.customerPct ? m.customerPct + "%" : "—";
          var bankVal = document.createElement("b");
          bankVal.className = "payment-plan__step-node-bank";
          bankVal.textContent = m.bankPct ? m.bankPct + "%" : "—";
          dual.appendChild(custVal);
          dual.appendChild(bankVal);
          node.appendChild(dual);
        } else {
          var pct = document.createElement("b");
          pct.className = "payment-plan__step-pct";
          pct.textContent = m.pct + "%";
          node.appendChild(pct);
        }
        step.appendChild(node);

        // Everything but the node lives in one wrapper so the mobile
        // stepper (see the max-width:767px override) can lay the step
        // out as "node on the left, name/time/chip on the right"
        // without any markup change between breakpoints.
        var body = document.createElement("div");
        body.className = "payment-plan__step-body";

        var name = document.createElement("span");
        name.className = "payment-plan__step-name";
        name.textContent = lang === "en" ? m.numberEn : m.numberVi;
        body.appendChild(name);

        if (m.timeVi || m.timeEn) {
          var time = document.createElement("span");
          time.className = "payment-plan__step-time";
          time.textContent = lang === "en" ? m.timeEn : m.timeVi;
          body.appendChild(time);
        }

        if (m.repeat > 1) {
          var groupNote = document.createElement("span");
          groupNote.className = "payment-plan__step-group-note";
          groupNote.textContent = lang === "en"
            ? "× " + m.repeat + " instalments = " + (m.pct * m.repeat) + "%"
            : "× " + m.repeat + " đợt = " + (m.pct * m.repeat) + "%";
          body.appendChild(groupNote);
        }

        if (m.chip) {
          var chipData = window.paymentPlanMilestoneChips[m.chip];
          var chip = document.createElement("span");
          chip.className = "payment-plan__step-chip";
          chip.textContent = lang === "en" ? chipData.en : chipData.vi;
          body.appendChild(chip);
          // Always visible (never hover-only), so the expanded meaning
          // reaches keyboard/touch/mobile users the same as a mouse.
          var chipFull = document.createElement("span");
          chipFull.className = "payment-plan__step-chip-full";
          chipFull.textContent = lang === "en" ? chipData.fullEn : chipData.fullVi;
          body.appendChild(chipFull);
        }

        step.appendChild(body);
        row.appendChild(step);
        globalIndex++;
      });

      timeline.appendChild(row);
      reflowRows.push(row);

      if (rowIndex < rows.length - 1) {
        var nextFirst = rows[rowIndex + 1][0];
        var turn = document.createElement("div");
        turn.className = "payment-plan__row-turn";
        turn.innerHTML = POLICY_ROW_TURN_SVG;
        if (nextFirst.gapVi || nextFirst.gapEn) {
          var turnText = document.createElement("span");
          turnText.textContent = lang === "en" ? nextFirst.gapEn : nextFirst.gapVi;
          turn.appendChild(turnText);
        }
        timeline.appendChild(turn);
      }
    });

    wrap.appendChild(timeline);
    setupPolicyTimelineReveal(reflowRows);

    if (isMortgage) {
      var totals = document.createElement("div");
      totals.className = "payment-plan__track-totals";
      var custTotal = document.createElement("span");
      custTotal.className = "payment-plan__track-totals-item payment-plan__track-totals-item--customer";
      custTotal.textContent = (lang === "en" ? "Customer total: " : "Tổng khách hàng: ") + plan.customerTotal + "%";
      var bankTotal = document.createElement("span");
      bankTotal.className = "payment-plan__track-totals-item payment-plan__track-totals-item--bank";
      bankTotal.textContent = (lang === "en" ? "Bank total: " : "Tổng ngân hàng: ") + plan.bankTotal + "%";
      totals.appendChild(custTotal);
      totals.appendChild(bankTotal);
      wrap.appendChild(totals);
    }

    var benefits = document.createElement("div");
    benefits.className = "payment-plan__benefits";
    var benefitList = lang === "en" ? plan.benefitsEn : plan.benefitsVi;
    benefitList.forEach(function (item) {
      var card = document.createElement("div");
      card.className = "payment-plan__benefit";
      var label = document.createElement("span");
      label.className = "payment-plan__benefit-label";
      label.textContent = item.label;
      var value = document.createElement("span");
      value.className = "payment-plan__benefit-value";
      value.textContent = item.value;
      card.appendChild(label);
      card.appendChild(value);
      if (item.note) {
        var note = document.createElement("span");
        note.className = "payment-plan__benefit-note";
        note.textContent = item.note;
        card.appendChild(note);
      }
      benefits.appendChild(card);
    });
    wrap.appendChild(benefits);

    panel.appendChild(wrap);
  }

  /* -----------------------------------------------------
     6. CONSTRUCTION PROGRESS (§9)
     ----------------------------------------------------- */
  function renderProgress(lang) {
    var host = document.getElementById("progress-content");
    if (!host) return;
    var milestones = window.progressMilestones || [];
    if (!milestones.length) {
      host.innerHTML =
        '<div class="progress-section__empty">' +
        (lang === "en" ? "Progress information is being updated." : "Thông tin tiến độ đang được cập nhật.") +
        "</div>";
      return;
    }
    // Interface framework for future data — not exercised while
    // window.progressMilestones is empty (see js/config.js).
    var timeline = document.createElement("div");
    timeline.className = "progress-section__timeline";
    milestones.forEach(function (m, i) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "progress-section__milestone-btn";
      btn.setAttribute("aria-selected", i === 0 ? "true" : "false");
      btn.textContent = lang === "en" ? m.labelEn : m.labelVi;
      timeline.appendChild(btn);
    });
    host.innerHTML = "";
    host.appendChild(timeline);
  }

  /* -----------------------------------------------------
     7b. PRESS ARTICLE GRID (§10)
     Data-driven, shared by VI/EN — window.pressArticles (js/config.js)
     holds one un-translated record per article (a real published
     headline/publisher isn't re-translated). Any field not yet
     confirmed renders an honest editable-placeholder label instead of
     inventing a headline, publisher or image.
     ----------------------------------------------------- */
  function renderPressArticles(lang) {
    var host = document.getElementById("press-grid");
    if (!host || !window.pressArticles) return;
    host.innerHTML = "";

    window.pressArticles.forEach(function (article) {
      var hasUrl = !!article.url;
      var card = document.createElement(hasUrl ? "a" : "div");
      card.className = "press-card";
      if (hasUrl) {
        card.href = article.url;
        card.target = "_blank";
        card.rel = "noopener noreferrer";
      }

      var media = document.createElement("div");
      if (article.image) {
        media.className = "press-card__media";
        var img = document.createElement("img");
        img.src = article.image;
        img.alt = "";
        img.loading = "lazy";
        img.decoding = "async";
        handleImgError(img);
        media.appendChild(img);
      } else {
        media.className = "press-card__media press-card__media--empty";
        var mediaNote = document.createElement("span");
        mediaNote.textContent = lang === "en" ? "Add article image" : "Thêm ảnh bài viết";
        media.appendChild(mediaNote);
      }
      card.appendChild(media);

      var publisher = document.createElement("div");
      publisher.className = "press-card__publisher";
      if (article.logo) {
        var logo = document.createElement("img");
        logo.src = article.logo;
        logo.alt = article.publisher || "";
        logo.loading = "lazy";
        logo.decoding = "async";
        handleImgError(logo);
        publisher.appendChild(logo);
      } else {
        var publisherName = document.createElement("span");
        publisherName.textContent = article.publisher ||
          (lang === "en" ? "Publisher pending" : "Đang cập nhật đơn vị báo chí");
        publisher.appendChild(publisherName);
      }
      card.appendChild(publisher);

      var title = document.createElement("h3");
      title.className = "press-card__title";
      title.textContent = article.title || (lang === "en" ? "Article title pending" : "Đang cập nhật tiêu đề bài viết");
      card.appendChild(title);

      var excerpt = document.createElement("p");
      excerpt.className = "press-card__excerpt";
      excerpt.textContent = article.excerpt || (lang === "en" ? "Article summary pending" : "Đang cập nhật mô tả bài viết");
      card.appendChild(excerpt);

      if (article.date) {
        var date = document.createElement("span");
        date.className = "press-card__date";
        date.textContent = article.date;
        card.appendChild(date);
      }

      var link = document.createElement("span");
      link.className = "press-card__link";
      link.appendChild(document.createTextNode(
        hasUrl
          ? (lang === "en" ? "Read article" : "Đọc bài viết")
          : (lang === "en" ? "Link pending" : "Đang cập nhật liên kết")
      ));
      var icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      icon.setAttribute("class", "press-card__link-icon");
      icon.setAttribute("viewBox", "0 0 24 24");
      icon.setAttribute("aria-hidden", "true");
      icon.innerHTML = '<path d="M7 17L17 7M9 7h8v8" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>';
      link.appendChild(icon);
      card.appendChild(link);

      host.appendChild(card);
    });
  }

  /* -----------------------------------------------------
     8. FLOATING CONTACT CONTROLS
     ----------------------------------------------------- */
  function setupFloatingContacts() {
    if (!window.projectConfig) return;
    var zalo = document.getElementById("floating-zalo");
    var whatsapp = document.getElementById("floating-whatsapp");
    if (window.projectConfig.zaloUrl && zalo) {
      zalo.disabled = false;
      zalo.removeAttribute("aria-disabled");
      zalo.outerHTML = '<a class="floating-contacts__btn floating-contacts__btn--zalo" id="floating-zalo" ' +
        'href="' + window.projectConfig.zaloUrl + '" target="_blank" rel="noopener noreferrer" aria-label="Liên hệ qua Zalo">' +
        '<img src="assets/icons/icon-zalo.png" alt="" aria-hidden="true">' +
        '<span class="floating-contacts__label">Zalo</span></a>';
    }
    if (window.projectConfig.whatsappUrl && whatsapp) {
      whatsapp.disabled = false;
      whatsapp.removeAttribute("aria-disabled");
      whatsapp.outerHTML = '<a class="floating-contacts__btn floating-contacts__btn--whatsapp" id="floating-whatsapp" ' +
        'href="' + window.projectConfig.whatsappUrl + '" target="_blank" rel="noopener noreferrer" aria-label="Liên hệ qua WhatsApp">' +
        '<img src="assets/icons/icon-whatsapp.png" alt="" aria-hidden="true">' +
        '<span class="floating-contacts__label">WhatsApp</span></a>';
    }
  }

  /* -----------------------------------------------------
     9. FINAL FORM — validation, loading, success (UI only)
     ----------------------------------------------------- */
  function setupFinalForm() {
    var form = document.getElementById("final-form");
    if (!form) return;
    var successEl = document.getElementById("final-form-success");
    var submitBtn = document.getElementById("final-form-submit");
    var nameField = document.getElementById("final-name");
    var phoneField = document.getElementById("final-phone");
    var emailField = document.getElementById("final-email");
    var consentField = document.getElementById("final-consent");
    var PHONE_RE = /^[0-9+()\s-]{8,15}$/;
    var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function setError(field, hasError) {
      var wrap = field.closest(".form-field");
      if (wrap) wrap.classList.toggle("has-error", hasError);
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var valid = true;

      var nameOk = nameField.value.trim().length > 1;
      setError(nameField, !nameOk);
      valid = valid && nameOk;

      var phoneOk = PHONE_RE.test(phoneField.value.trim());
      setError(phoneField, !phoneOk);
      valid = valid && phoneOk;

      var emailOk = emailField.value.trim() === "" || EMAIL_RE.test(emailField.value.trim());
      setError(emailField, !emailOk);
      valid = valid && emailOk;

      var consentOk = consentField.checked;
      setError(consentField, !consentOk);
      valid = valid && consentOk;

      if (!valid) {
        var firstInvalid = form.querySelector(".form-field.has-error input, .form-field.has-error select");
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      // Prototype only: UI interaction only, no backend, no data stored.
      submitBtn.setAttribute("data-loading", "true");
      submitBtn.disabled = true;
      setTimeout(function () {
        submitBtn.setAttribute("data-loading", "false");
        submitBtn.disabled = false;
        form.hidden = true;
        successEl.hidden = false;
        successEl.setAttribute("tabindex", "-1");
        successEl.focus();
      }, 700);
    });
  }

  /* -----------------------------------------------------
     10. GLASS MEDIA FRAME — scroll-entrance + pointer parallax
     The static glass chrome renders with plain CSS (see
     .glass-media-frame in sections.css); this only adds the opt-in
     entrance animation to elements carrying [data-depth-frame], and a
     restrained pointer-parallax on desktop/mouse devices.
     ----------------------------------------------------- */
  function setupDepthFrames() {
    var frames = document.querySelectorAll("[data-depth-frame]");
    if (!frames.length) return;

    var prefersReducedMotion =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if ("IntersectionObserver" in window) {
      var observer = new IntersectionObserver(
        function (entries, obs) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.25 }
      );
      frames.forEach(function (el) { observer.observe(el); });
    } else {
      frames.forEach(function (el) { el.classList.add("is-visible"); });
    }

    var canParallax =
      !prefersReducedMotion &&
      window.matchMedia &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!canParallax) return;

    var MAX_SHIFT = 4;
    frames.forEach(function (frame) {
      var img = frame.querySelector(".glass-media-inner img");
      if (!img) return;
      frame.addEventListener("mousemove", function (e) {
        var rect = frame.getBoundingClientRect();
        var x = (e.clientX - rect.left) / rect.width - 0.5;
        var y = (e.clientY - rect.top) / rect.height - 0.5;
        img.style.transform =
          "translate(" + (x * MAX_SHIFT).toFixed(1) + "px, " + (y * MAX_SHIFT).toFixed(1) + "px) scale(1.018)";
      });
      frame.addEventListener("mouseleave", function () {
        img.style.transform = "";
      });
    });
  }

  /* -----------------------------------------------------
     TIER-1 CERTIFICATE ZOOM — static image (not config-driven, like
     the location map), so this just wires the existing lightbox
     utility once rather than needing its own render function.
     ----------------------------------------------------- */
  function setupTier1CertificateZoom() {
    var btn = document.getElementById("residential-certificate-zoom");
    var img = document.querySelector(".residential__certificate-inner img");
    if (!btn || !img) return;
    btn.addEventListener("click", function () {
      openZoomModal(img.getAttribute("src"), img.getAttribute("alt"));
    });
  }

  // Re-chunks the payment timeline's rows (see policyRowSize()) when a
  // resize crosses the 768px/1280px boundaries that change how many
  // milestones fit per row — a plain CSS media query can't do this
  // since it needs to change how many *elements* JS renders, not just
  // how they're styled.
  function setupPolicyResponsiveReflow() {
    if (!window.matchMedia) return;
    var query = window.matchMedia("(min-width: 768px) and (max-width: 1279px)");
    var onChange = function () { renderPolicySection(currentLang()); };
    if (query.addEventListener) query.addEventListener("change", onChange);
    else if (query.addListener) query.addListener(onChange);
  }

  /* -----------------------------------------------------
     INIT
     ----------------------------------------------------- */
  function renderAll() {
    var lang = currentLang();
    renderConfiguredImages(lang);
    renderDetails(lang);
    renderLocation(lang);
    renderAmenitySection(lang);
    renderFloorplans(lang);
    renderPolicySection(lang);
    renderProgress(lang);
    renderPressArticles(lang);
  }

  validatePaymentPlans();
  renderAll();
  setupDetailsToggle();
  setupAmenitySheet();
  setupAmenityListHeightSync();
  setupPolicyResponsiveReflow();
  setupFloatingContacts();
  setupFinalForm();
  setupDepthFrames();
  setupTier1CertificateZoom();

  document.addEventListener("palmcity:langchange", function (e) {
    renderAll();
  });
})();
