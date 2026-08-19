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
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "location__tab";
      btn.setAttribute("role", "tab");
      btn.setAttribute("data-category", key);
      btn.setAttribute("aria-selected", key === activeLocationCategory ? "true" : "false");
      btn.textContent = lang === "en" ? cat.en : cat.vi;
      btn.addEventListener("click", function () {
        activeLocationCategory = key;
        renderLocation(currentLang());
      });
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
     3. AMENITIES CAROUSEL (§6)
     ----------------------------------------------------- */
  function renderAmenities(lang) {
    var track = document.getElementById("amenities-track");
    if (!track || !window.amenitiesSlides) return;
    track.innerHTML = "";
    var total = window.amenitiesSlides.length;

    window.amenitiesSlides.forEach(function (slide, index) {
      var el = document.createElement("div");
      el.className = "amenities__slide" + (index === 0 ? " is-active" : "");
      el.setAttribute("role", "group");
      el.setAttribute("aria-roledescription", "slide");
      el.setAttribute("aria-label", (index + 1) + " / " + total);

      if (slide.image) {
        var img = document.createElement("img");
        img.className = "amenities__slide-image";
        img.src = slide.image;
        img.alt = lang === "en" ? slide.titleEn : slide.titleVi;
        el.appendChild(img);
      } else {
        // Expected asset noted in js/config.js (slide.expectedAsset).
        var note = document.createElement("p");
        note.className = "amenities__slide-note";
        note.textContent = lang === "en" ? "Image being updated" : "Hình ảnh đang được cập nhật";
        el.appendChild(note);
      }

      var title = document.createElement("span");
      title.className = "amenities__slide-title";
      title.textContent = lang === "en" ? slide.titleEn : slide.titleVi;
      el.appendChild(title);

      var count = document.createElement("span");
      count.className = "amenities__slide-count";
      count.textContent = String(index + 1).padStart(2, "0") + "/" + String(total).padStart(2, "0");
      el.appendChild(count);

      track.appendChild(el);
    });

    setupAmenitiesInteraction(track);
  }

  var amenitiesSetup = false;
  function setupAmenitiesInteraction(track) {
    var prevBtn = document.getElementById("amenities-prev");
    var nextBtn = document.getElementById("amenities-next");
    var slides = Array.prototype.slice.call(track.querySelectorAll(".amenities__slide"));

    function updateActive() {
      var trackCenter = track.scrollLeft + track.clientWidth / 2;
      var closest = null;
      var closestDist = Infinity;
      slides.forEach(function (slide) {
        var center = slide.offsetLeft + slide.offsetWidth / 2;
        var dist = Math.abs(center - trackCenter);
        if (dist < closestDist) {
          closestDist = dist;
          closest = slide;
        }
      });
      slides.forEach(function (slide) {
        slide.classList.toggle("is-active", slide === closest);
      });
    }

    function goTo(index) {
      var target = slides[Math.max(0, Math.min(slides.length - 1, index))];
      if (!target) return;
      track.scrollTo({
        left: target.offsetLeft - (track.clientWidth - target.offsetWidth) / 2,
        behavior: "smooth"
      });
    }

    function activeIndex() {
      return slides.findIndex(function (s) { return s.classList.contains("is-active"); });
    }

    if (prevBtn) prevBtn.onclick = function () { goTo(activeIndex() - 1); };
    if (nextBtn) nextBtn.onclick = function () { goTo(activeIndex() + 1); };

    if (!amenitiesSetup) {
      amenitiesSetup = true;
      var scrollTimeout;
      track.addEventListener("scroll", function () {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(updateActive, 80);
      }, { passive: true });

      track.addEventListener("keydown", function (e) {
        if (e.key === "ArrowRight") { e.preventDefault(); goTo(activeIndex() + 1); }
        if (e.key === "ArrowLeft") { e.preventDefault(); goTo(activeIndex() - 1); }
      });

      // Pointer-drag scroll (mouse); touch scroll uses native overflow.
      var isDown = false, startX = 0, startScroll = 0;
      track.addEventListener("pointerdown", function (e) {
        if (e.pointerType === "touch") return;
        isDown = true;
        startX = e.clientX;
        startScroll = track.scrollLeft;
        track.setPointerCapture(e.pointerId);
      });
      track.addEventListener("pointermove", function (e) {
        if (!isDown) return;
        track.scrollLeft = startScroll - (e.clientX - startX);
      });
      ["pointerup", "pointercancel", "pointerleave"].forEach(function (evt) {
        track.addEventListener(evt, function () { isDown = false; });
      });
    }

    updateActive();
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
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "floorplans__tab";
      btn.setAttribute("role", "tab");
      btn.setAttribute("aria-selected", index === activeFloorplanIndex ? "true" : "false");
      btn.textContent = lang === "en" ? type.en : type.vi;
      btn.addEventListener("click", function () {
        activeFloorplanIndex = index;
        renderFloorplans(currentLang());
      });
      tabsHost.appendChild(btn);
    });

    var activeType = window.floorPlanTypes[activeFloorplanIndex];

    // Expected asset noted in the HTML comment above this frame.
    frameHost.innerHTML =
      '<p class="floorplans__image-note">' +
      (lang === "en" ? "Floor plan image is being updated" : "Hình ảnh mặt bằng đang được cập nhật") +
      "</p>";
    frameHost.onclick = function () {
      openZoomModal(null, lang === "en" ? activeType.en : activeType.vi);
    };

    panelHost.innerHTML = "";
    var typeHeading = document.createElement("p");
    typeHeading.className = "floorplans__panel-type";
    typeHeading.textContent = lang === "en" ? activeType.en : activeType.vi;

    var area = document.createElement("p");
    area.className = "floorplans__panel-area";
    area.textContent = (lang === "en" ? "Carpet area: " : "Diện tích thông thủy: ") + PENDING_VI_EN(lang);

    var benefits = document.createElement("ul");
    benefits.className = "floorplans__panel-benefits";
    var benefitTexts = lang === "en"
      ? ["Layout optimised for practical everyday use", "Open, airy sightlines", "Well-proportioned living and bedroom zones"]
      : ["Thiết kế tối ưu công năng sử dụng", "Tầm nhìn thoáng đãng", "Bố trí phòng khách và phòng ngủ hợp lý"];
    benefitTexts.forEach(function (text) {
      var li = document.createElement("li");
      li.textContent = text;
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
  }
  function PENDING_VI_EN(lang) { return lang === "en" ? PENDING_EN : PENDING_VI; }

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
        (lang === "en" ? "Progress information is being updated" : "Thông tin đang được cập nhật") +
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
     7. SAVILLS NEWS (§10)
     ----------------------------------------------------- */
  function renderNews(lang) {
    var host = document.getElementById("savills-news");
    if (!host || !window.savillsNews) return;
    host.innerHTML = "";
    window.savillsNews.forEach(function (item) {
      var a = document.createElement("a");
      a.className = "news-card";
      a.href = item.url;
      a.target = "_blank";
      a.rel = "noopener noreferrer";

      var date = document.createElement("p");
      date.className = "news-card__date";
      date.textContent = lang === "en" ? item.dateEn : item.dateVi;

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

      a.appendChild(date);
      a.appendChild(title);
      a.appendChild(excerpt);
      a.appendChild(link);
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
     INIT
     ----------------------------------------------------- */
  function renderAll() {
    var lang = currentLang();
    renderDetails(lang);
    renderLocation(lang);
    renderAmenities(lang);
    renderFloorplans(lang);
    renderProgress(lang);
    renderNews(lang);
  }

  renderAll();
  setupPolicyTabs();
  setupFloatingContacts();
  setupFinalForm();

  document.addEventListener("palmcity:langchange", function (e) {
    renderAll();
  });
})();
