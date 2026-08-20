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

  // Shared renderer for a .media-depth-frame__inner box: shows the
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
      img.style.objectFit = fit || "cover";
      img.style.objectPosition = objectPosition || "center";
      inner.appendChild(img);
    } else {
      var note = document.createElement("p");
      note.className = "media-depth-frame__note";
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
     ----------------------------------------------------- */
  function renderDetails(lang) {
    var primaryEl = document.getElementById("details-list-primary");
    var secondaryEl = document.getElementById("details-list-secondary");
    if (!primaryEl || !secondaryEl || !window.projectDetails) return;
    var PRIMARY_COUNT = 5;
    primaryEl.innerHTML = "";
    secondaryEl.innerHTML = "";

    window.projectDetails.forEach(function (field, index) {
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
      (index < PRIMARY_COUNT ? primaryEl : secondaryEl).appendChild(row);
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
     3. AMENITIES — image + interactive list (§6)
     Two-level tabs (main tab, then group/floor tab) both read from
     window.amenityTabs / window.amenityGroups / window.amenityData
     (js/config.js). Nothing here branches on a specific tab or group
     key — the same render path serves Palm City's single flat group
     and Palm River's four floor groups.
     ----------------------------------------------------- */
  var activeAmenityTab = null;
  var activeAmenityGroup = null;
  var activeAmenityItemIndex = 0;

  function currentAmenityItems() {
    if (!activeAmenityTab || !activeAmenityGroup || !window.amenityData) return [];
    var tabData = window.amenityData[activeAmenityTab] || {};
    return tabData[activeAmenityGroup] || [];
  }

  function renderAmenitySection(lang) {
    var mainTabsHost = document.getElementById("amenities-main-tabs");
    var groupTabsHost = document.getElementById("amenities-floor-tabs");
    if (!mainTabsHost || !groupTabsHost || !window.amenityTabs || !window.amenityGroups) return;

    if (!activeAmenityTab) activeAmenityTab = window.amenityTabs[0].key;
    var groups = window.amenityGroups[activeAmenityTab] || [];
    if (!activeAmenityGroup || !groups.some(function (g) { return g.key === activeAmenityGroup; })) {
      activeAmenityGroup = groups.length ? groups[0].key : null;
      activeAmenityItemIndex = 0;
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
        activeAmenityItemIndex = 0;
        renderAmenitySection(currentLang());
      });
      mainTabsHost.appendChild(btn);
    });

    // Group/floor tabs only make sense when a tab has more than one
    // group (Palm River); Palm City's single flat list hides this row
    // entirely rather than showing a redundant one-item tablist.
    groupTabsHost.innerHTML = "";
    groupTabsHost.hidden = groups.length <= 1;
    groups.forEach(function (group) {
      var isActive = group.key === activeAmenityGroup;
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "glass-tab glass-tab--dark amenities__floor-tab" + (isActive ? " is-active" : "");
      btn.setAttribute("role", "tab");
      btn.setAttribute("aria-selected", isActive ? "true" : "false");
      btn.textContent = lang === "en" ? group.labelEn : group.labelVi;
      btn.addEventListener("click", function () {
        if (activeAmenityGroup === group.key) return;
        activeAmenityGroup = group.key;
        activeAmenityItemIndex = 0;
        renderAmenitySection(currentLang());
      });
      if (isActive) {
        requestAnimationFrame(function () { scrollTabIntoView(btn); });
      }
      groupTabsHost.appendChild(btn);
    });

    renderAmenityList(lang);
    renderAmenityMedia(lang);
  }

  function renderAmenityList(lang) {
    var listHost = document.getElementById("amenity-list");
    if (!listHost) return;
    listHost.innerHTML = "";
    currentAmenityItems().forEach(function (item, index) {
      var isActive = index === activeAmenityItemIndex;
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "amenity-list__item" + (isActive ? " is-active" : "");
      btn.setAttribute("role", "option");
      btn.setAttribute("aria-selected", isActive ? "true" : "false");

      var idx = document.createElement("span");
      idx.className = "amenity-list__index";
      idx.textContent = item.id;
      var name = document.createElement("span");
      name.className = "amenity-list__name";
      name.textContent = lang === "en" ? item.titleEn : item.titleVi;
      btn.appendChild(idx);
      btn.appendChild(name);

      btn.addEventListener("click", function () {
        if (activeAmenityItemIndex === index) return;
        activeAmenityItemIndex = index;
        updateAmenityListActiveState();
        renderAmenityMedia(currentLang());
      });
      listHost.appendChild(btn);
    });
  }

  function updateAmenityListActiveState() {
    var listHost = document.getElementById("amenity-list");
    if (!listHost) return;
    Array.prototype.forEach.call(listHost.children, function (btn, index) {
      var isActive = index === activeAmenityItemIndex;
      btn.classList.toggle("is-active", isActive);
      btn.setAttribute("aria-selected", isActive ? "true" : "false");
    });
  }

  // Cross-fade + slight scale between amenity images (350–500ms total,
  // no page reload, no section height change — the frame keeps a
  // fixed aspect ratio throughout via CSS).
  var amenityMediaSwapTimer = null;
  function renderAmenityMedia(lang) {
    var wrap = document.getElementById("amenity-image-wrap");
    var indexEl = document.getElementById("amenity-index");
    var titleEl = document.getElementById("amenity-title");
    var descEl = document.getElementById("amenity-description");
    var expandBtn = document.getElementById("amenity-expand");
    if (!wrap) return;

    var item = currentAmenityItems()[activeAmenityItemIndex];
    if (!item) {
      wrap.innerHTML = "";
      if (titleEl) titleEl.textContent = "";
      if (descEl) { descEl.textContent = ""; descEl.hidden = true; }
      return;
    }

    var title = lang === "en" ? item.titleEn : item.titleVi;
    var description = lang === "en" ? item.descriptionEn : item.descriptionVi;

    if (indexEl) indexEl.textContent = item.id;
    if (titleEl) titleEl.textContent = title;
    if (descEl) {
      descEl.textContent = description || "";
      descEl.hidden = !description;
    }
    if (expandBtn) {
      expandBtn.onclick = function () {
        openZoomModal(item.image || null, title);
      };
    }

    clearTimeout(amenityMediaSwapTimer);
    wrap.classList.add("is-swapping");
    amenityMediaSwapTimer = setTimeout(function () {
      wrap.innerHTML = "";
      if (item.image) {
        var img = document.createElement("img");
        img.src = item.image;
        img.alt = title;
        img.loading = "lazy";
        if (item.objectPosition) img.style.objectPosition = item.objectPosition;
        wrap.appendChild(img);
      } else {
        var placeholder = document.createElement("div");
        placeholder.className = "amenity-image-wrap__placeholder";
        var icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        icon.setAttribute("viewBox", "0 0 24 24");
        icon.setAttribute("aria-hidden", "true");
        icon.innerHTML =
          '<rect x="3" y="4.5" width="18" height="15" rx="2" fill="none" stroke="currentColor" stroke-width="1.4"/>' +
          '<circle cx="9" cy="10" r="1.6" fill="none" stroke="currentColor" stroke-width="1.4"/>' +
          '<path d="M4 17.5l5.5-5.5 3 3 3.5-4 4 4.5" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round" stroke-linecap="round"/>';
        placeholder.appendChild(icon);
        var note = document.createElement("p");
        note.textContent = lang === "en" ? "Add the amenity image here" : "Thêm ảnh tiện ích tại đây";
        placeholder.appendChild(note);
        wrap.appendChild(placeholder);
      }
      wrap.classList.remove("is-swapping");
    }, 190);
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
     7. SAVILLS NEWS / CREDIBILITY CARDS (§10)
     Only cards with confirmed source data render — an item with a
     real URL but no confirmed headline/date/excerpt (see
     js/config.js) is skipped rather than shown with placeholder
     copy, per this task's "hide empty cards" instruction. If nothing
     is confirmed yet, the grid shows one calm empty-state message
     instead of an abrupt blank section.
     ----------------------------------------------------- */
  function renderNews(lang) {
    var host = document.getElementById("savills-news");
    if (!host || !window.savillsNews) return;
    host.innerHTML = "";

    var confirmedItems = window.savillsNews.filter(function (item) { return item.confirmed; });

    if (!confirmedItems.length) {
      host.innerHTML =
        '<div class="savills-section__news-empty">' +
        (lang === "en"
          ? "Official updates and media coverage are being confirmed"
          : "Thông tin chính thức và tin tức truyền thông đang được xác nhận") +
        "</div>";
      return;
    }

    confirmedItems.forEach(function (item, index) {
      var a = document.createElement("a");
      a.className = "news-card" + (index === 0 ? " news-card--featured" : "");
      a.href = item.url;
      a.target = "_blank";
      a.rel = "noopener noreferrer";

      var media = document.createElement("div");
      media.className = "news-card__media";
      if (item.image) {
        var img = document.createElement("img");
        img.src = item.image;
        img.alt = "";
        img.loading = "lazy";
        media.appendChild(img);
      } else {
        var note = document.createElement("p");
        note.className = "news-card__media-note";
        note.textContent = lang === "en" ? "Image being updated" : "Hình ảnh đang được cập nhật";
        media.appendChild(note);
      }

      var body = document.createElement("div");
      body.className = "news-card__body";

      var badge = document.createElement("div");
      badge.className = "news-card__badge";

      var source = document.createElement("span");
      source.className = "news-card__source";
      if (item.publisherLogo) {
        var logoImg = document.createElement("img");
        logoImg.src = item.publisherLogo;
        logoImg.alt = item.publisher;
        source.appendChild(logoImg);
      }
      source.appendChild(document.createTextNode(item.publisher));

      var type = document.createElement("span");
      type.className = "news-card__type";
      type.textContent = lang === "en" ? item.typeEn : item.typeVi;

      var date = document.createElement("span");
      date.className = "news-card__date";
      date.textContent = lang === "en" ? item.dateEn : item.dateVi;

      badge.appendChild(source);
      badge.appendChild(type);
      badge.appendChild(date);

      var title = document.createElement("p");
      title.className = "news-card__title";
      title.textContent = lang === "en" ? item.titleEn : item.titleVi;

      var excerpt = document.createElement("p");
      excerpt.className = "news-card__excerpt";
      excerpt.textContent = lang === "en" ? item.excerptEn : item.excerptVi;

      var link = document.createElement("span");
      link.className = "news-card__link";
      link.innerHTML = (lang === "en" ? "See details" : "Xem chi tiết") +
        ' <span class="news-card__arrow" aria-hidden="true">&rarr;</span>';

      body.appendChild(badge);
      body.appendChild(title);
      body.appendChild(excerpt);
      body.appendChild(link);

      a.appendChild(media);
      a.appendChild(body);
      host.appendChild(a);
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
     10. MEDIA DEPTH FRAME — scroll-entrance + pointer parallax
     The static glass chrome renders with plain CSS (see
     .media-depth-frame in sections.css); this only adds the opt-in
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
      var img = frame.querySelector(".media-depth-frame__inner img");
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
    renderNews(lang);
  }

  renderAll();
  setupPolicyTabs();
  setupFloatingContacts();
  setupFinalForm();
  setupDepthFrames();

  document.addEventListener("palmcity:langchange", function (e) {
    renderAll();
  });
})();
