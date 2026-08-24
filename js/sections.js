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
      img.style.objectFit = fit || "cover";
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
      btn.textContent = lang === "en" ? group.titleEn : group.titleVi;
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

    // Only rebuild/reset the carousel when the active group actually
    // changed — a pure language switch just relabels the existing
    // slides/list in place (no autoplay restart, no layout jump).
    var groupKey = activeAmenityTab + ":" + activeAmenityGroup;
    var groupChanged = groupKey !== lastRenderedAmenityGroupKey;
    lastRenderedAmenityGroupKey = groupKey;

    renderAmenityList(lang);
    renderAmenityCarousel(lang, groupChanged);
  }

  // Plain list — natural numbered text, not interactive. Clicking an
  // item never changes the carousel; there is no per-item active
  // state to maintain.
  function renderAmenityList(lang) {
    var listHost = document.getElementById("amenity-list");
    if (!listHost) return;
    listHost.innerHTML = "";
    var group = currentAmenityGroup();
    var items = group ? group.items : [];

    if (!items.length) {
      var empty = document.createElement("p");
      empty.className = "amenity-list__empty";
      empty.textContent = lang === "en"
        ? "The amenity list for this group has not been supplied in the approved source yet."
        : "Danh sách tiện ích của khu vực này chưa được cung cấp trong tài liệu duyệt.";
      listHost.appendChild(empty);
      return;
    }

    items.forEach(function (item, index) {
      var row = document.createElement("p");
      row.className = "amenity-list__item";
      var idx = document.createElement("span");
      idx.className = "amenity-list__index";
      idx.textContent = String(item.n || index + 1).padStart(2, "0");
      var name = document.createElement("span");
      name.className = "amenity-list__name";
      name.textContent = lang === "en" ? item.en : item.vi;
      row.appendChild(idx);
      row.appendChild(name);
      listHost.appendChild(row);
    });
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

    if (!groupChanged) {
      // Language-only re-render: just relabel what's already there.
      Array.prototype.forEach.call(stage.querySelectorAll(".amenity-carousel__img"), function (img) {
        img.alt = title;
      });
      var note = stage.querySelector(".amenity-carousel__placeholder p");
      if (note) note.textContent = lang === "en" ? "Add amenity illustration images here" : "Thêm ảnh minh họa tiện ích tại đây";
      if (expandBtn && images.length) {
        expandBtn.onclick = function () { openZoomModal(images[amenityCarouselIndex], title); };
      }
      return;
    }

    stopAmenityCarouselAutoplay();
    amenityCarouselIndex = 0;
    stage.innerHTML = "";
    dotsHost.innerHTML = "";
    var carousel = document.getElementById("amenity-carousel");
    if (carousel) carousel.classList.toggle("amenity-carousel--empty", !images.length);

    if (!images.length) {
      var placeholder = document.createElement("div");
      placeholder.className = "amenity-carousel__placeholder";
      var icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      icon.setAttribute("viewBox", "0 0 24 24");
      icon.setAttribute("aria-hidden", "true");
      icon.innerHTML =
        '<rect x="3" y="4.5" width="18" height="15" rx="2" fill="none" stroke="currentColor" stroke-width="1.4"/>' +
        '<circle cx="9" cy="10" r="1.6" fill="none" stroke="currentColor" stroke-width="1.4"/>' +
        '<path d="M4 17.5l5.5-5.5 3 3 3.5-4 4 4.5" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round" stroke-linecap="round"/>';
      placeholder.appendChild(icon);
      var note = document.createElement("p");
      note.textContent = lang === "en" ? "Add amenity illustration images here" : "Thêm ảnh minh họa tiện ích tại đây";
      placeholder.appendChild(note);
      stage.appendChild(placeholder);
      if (expandBtn) expandBtn.onclick = null;
      return;
    }

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
     5. PAYMENT POLICY (§8) — static markup, just wire tabs
     ----------------------------------------------------- */
  function setupPolicyTabs() {
    var steps = document.querySelectorAll(".policy__step");
    var panels = document.querySelectorAll(".policy__panel");
    steps.forEach(function (step) {
      step.addEventListener("click", function () {
        var target = step.getAttribute("data-policy-step");
        steps.forEach(function (s) {
          var isActive = s === step;
          s.classList.toggle("is-active", isActive);
          s.setAttribute("aria-selected", isActive ? "true" : "false");
        });
        panels.forEach(function (panel) {
          var isMatch = panel.getAttribute("data-policy-panel") === target;
          panel.classList.toggle("is-active", isMatch);
          panel.hidden = !isMatch;
        });
      });
    });
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
        'href="' + window.projectConfig.zaloUrl + '" target="_blank" rel="noopener noreferrer">' +
        '<span class="floating-contacts__icon" aria-hidden="true">Za</span>' +
        '<span class="floating-contacts__label">Zalo</span></a>';
    }
    if (window.projectConfig.whatsappUrl && whatsapp) {
      whatsapp.disabled = false;
      whatsapp.removeAttribute("aria-disabled");
      whatsapp.outerHTML = '<a class="floating-contacts__btn floating-contacts__btn--whatsapp" id="floating-whatsapp" ' +
        'href="' + window.projectConfig.whatsappUrl + '" target="_blank" rel="noopener noreferrer">' +
        '<span class="floating-contacts__icon" aria-hidden="true">Wa</span>' +
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
    renderProgress(lang);
    renderPressArticles(lang);
  }

  renderAll();
  setupPolicyTabs();
  setupDetailsToggle();
  setupFloatingContacts();
  setupFinalForm();
  setupDepthFrames();
  setupTier1CertificateZoom();

  document.addEventListener("palmcity:langchange", function (e) {
    renderAll();
  });
})();
