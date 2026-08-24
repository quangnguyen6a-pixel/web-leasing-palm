/* =========================================================
   PALM CITY — PROTOTYPE JAVASCRIPT
   Vanilla JS only. Front-end reference. Not production code.
   ========================================================= */
(function () {
  "use strict";

  /* -----------------------------------------------------
     1. STICKY HEADER STATE ON SCROLL
     ----------------------------------------------------- */
  var header = document.getElementById("site-header");
  var SCROLL_THRESHOLD = 64;

  function updateHeaderState() {
    if (window.scrollY > SCROLL_THRESHOLD) {
      header.setAttribute("data-state", "scrolled");
    } else {
      header.setAttribute("data-state", "top");
    }
  }
  updateHeaderState();
  window.addEventListener("scroll", updateHeaderState, { passive: true });

  /* -----------------------------------------------------
     1b. HERO POINTER-FOLLOW SPOTLIGHT
     Desktop/mouse only — driven directly by cursor movement, not
     autoplay, so it's left on regardless of prefers-reduced-motion.
     ----------------------------------------------------- */
  var hero = document.querySelector(".hero");
  if (hero && window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    hero.classList.add("hero--interactive");
    hero.addEventListener("mousemove", function (e) {
      var rect = hero.getBoundingClientRect();
      var x = ((e.clientX - rect.left) / rect.width) * 100;
      var y = ((e.clientY - rect.top) / rect.height) * 100;
      hero.style.setProperty("--spot-x", x + "%");
      hero.style.setProperty("--spot-y", y + "%");
    });
  }

  /* -----------------------------------------------------
     2. SMOOTH SCROLL FOR ANCHOR LINKS
     ----------------------------------------------------- */
  function smoothScrollTo(targetId) {
    var target = document.getElementById(targetId);
    if (!target) return;
    var headerHeight = header.offsetHeight;
    var top = target.getBoundingClientRect().top + window.scrollY - headerHeight;
    window.scrollTo({ top: top, behavior: "smooth" });
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      var id = link.getAttribute("href").slice(1);
      var target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      smoothScrollTo(id);
      closeMobileMenu();
    });
  });

  /* -----------------------------------------------------
     3. ACTIVE MENU STATE VIA INTERSECTION OBSERVER
     ----------------------------------------------------- */
  var sections = document.querySelectorAll("main section[id]");
  var navLinks = document.querySelectorAll(".main-nav__link, .mobile-menu__link");

  function setActiveLink(id) {
    navLinks.forEach(function (link) {
      var isMatch = link.getAttribute("href") === "#" + id;
      if (isMatch) {
        link.setAttribute("aria-current", "true");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  if ("IntersectionObserver" in window && sections.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            setActiveLink(entry.target.id);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  /* -----------------------------------------------------
     3b. SUBTLE SCROLL REVEAL (Project Overview panel/cards)
     Content is visible by default; JS only opts elements into a
     hidden-then-revealed state when IntersectionObserver is
     available, so nothing depends on JS to be readable.
     ----------------------------------------------------- */
  var revealEls = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && revealEls.length) {
    revealEls.forEach(function (el) {
      el.classList.add("reveal-pending");
    });
    var revealObserver = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  /* -----------------------------------------------------
     3c. USP COUNT-UP + POST-COUNT SHIMMER
     Values are already final numbers in the HTML (visible with no JS,
     see index.html). Only once this script runs do we blank them to
     "0" and count up when the card first scrolls into view; the
     shimmer/glint (.is-counted, styled in styles.css) is purely CSS
     and only starts once counting finishes.
     ----------------------------------------------------- */
  function formatStatValue(num, decimals) {
    var isEn = document.documentElement.getAttribute("lang") === "en";
    var fixed = num.toFixed(decimals);
    return isEn ? fixed : fixed.replace(".", ",");
  }

  var prefersReducedMotion =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var statValues = document.querySelectorAll(".usp-number[data-value]");
  if (statValues.length && "IntersectionObserver" in window && !prefersReducedMotion) {
    statValues.forEach(function (el) {
      var decimals = parseInt(el.getAttribute("data-decimals") || "0", 10);
      el.textContent = formatStatValue(0, decimals);
    });

    var statObserver = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          obs.unobserve(el);

          var target = parseFloat(el.getAttribute("data-value"));
          var decimals = parseInt(el.getAttribute("data-decimals") || "0", 10);
          var duration = 1000;
          var start = null;

          el.classList.add("is-counting");
          function step(timestamp) {
            if (!start) start = timestamp;
            var progress = Math.min((timestamp - start) / duration, 1);
            var eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = formatStatValue(target * eased, decimals);
            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              el.textContent = formatStatValue(target, decimals);
              el.classList.remove("is-counting");
              el.classList.add("is-counted");
            }
          }
          requestAnimationFrame(step);
        });
      },
      { threshold: 0.4 }
    );
    statValues.forEach(function (el) {
      statObserver.observe(el);
    });
  }

  /* -----------------------------------------------------
     4. MOBILE MENU
     ----------------------------------------------------- */
  var mobileMenu = document.getElementById("mobile-menu");
  var hamburgerBtn = document.getElementById("hamburger-btn");
  var mobileMenuCloseBtn = document.getElementById("mobile-menu-close");
  var mobileMenuPanel = mobileMenu.querySelector(".mobile-menu__panel");
  var lastFocusedBeforeMenu = null;

  function getFocusableElements(container) {
    return Array.prototype.slice.call(
      container.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    );
  }

  function openMobileMenu() {
    lastFocusedBeforeMenu = document.activeElement;
    mobileMenu.setAttribute("data-open", "true");
    mobileMenu.setAttribute("aria-hidden", "false");
    hamburgerBtn.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
    var focusables = getFocusableElements(mobileMenuPanel);
    if (focusables.length) focusables[0].focus();
  }

  function closeMobileMenu() {
    if (mobileMenu.getAttribute("data-open") !== "true") return;
    mobileMenu.setAttribute("data-open", "false");
    mobileMenu.setAttribute("aria-hidden", "true");
    hamburgerBtn.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
    if (lastFocusedBeforeMenu) lastFocusedBeforeMenu.focus();
  }

  hamburgerBtn.addEventListener("click", function () {
    var isOpen = mobileMenu.getAttribute("data-open") === "true";
    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });
  mobileMenuCloseBtn.addEventListener("click", closeMobileMenu);
  mobileMenu.querySelectorAll("[data-close-mobile-menu]").forEach(function (el) {
    el.addEventListener("click", closeMobileMenu);
  });
  mobileMenu.querySelectorAll(".mobile-menu__link").forEach(function (link) {
    link.addEventListener("click", closeMobileMenu);
  });

  mobileMenuPanel.addEventListener("keydown", function (e) {
    if (e.key === "Tab") {
      var focusables = getFocusableElements(mobileMenuPanel);
      if (!focusables.length) return;
      var first = focusables[0];
      var last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  /* -----------------------------------------------------
     5. POPUP — REGISTER INTEREST
     ----------------------------------------------------- */
  var popup = document.getElementById("register-popup");
  var popupDialog = popup.querySelector(".popup__dialog");
  var popupCloseBtn = document.getElementById("popup-close");
  var registerForm = document.getElementById("register-form");
  var lastFocusedBeforePopup = null;

  function openPopup(triggerEl) {
    lastFocusedBeforePopup = triggerEl || document.activeElement;
    closeMobileMenu();
    popup.setAttribute("data-open", "true");
    popup.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    var focusables = getFocusableElements(popupDialog);
    if (focusables.length) focusables[0].focus();
  }

  function closePopup() {
    if (popup.getAttribute("data-open") !== "true") return;
    popup.setAttribute("data-open", "false");
    popup.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastFocusedBeforePopup) lastFocusedBeforePopup.focus();
  }

  // Delegated (not a static NodeList snapshot) so any [data-open-popup]
  // trigger works, including ones sections.js renders dynamically after
  // this script runs (e.g. the floor-plan panel CTA).
  document.addEventListener("click", function (e) {
    var trigger = e.target.closest && e.target.closest("[data-open-popup]");
    if (trigger) openPopup(trigger);
  });
  popupCloseBtn.addEventListener("click", closePopup);
  popup.querySelectorAll("[data-close-popup]").forEach(function (el) {
    el.addEventListener("click", closePopup);
  });

  popupDialog.addEventListener("keydown", function (e) {
    if (e.key === "Tab") {
      var focusables = getFocusableElements(popupDialog);
      if (!focusables.length) return;
      var first = focusables[0];
      var last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  // Prototype only.
  // Backend submission and validation will be implemented in production.
  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();
    closePopup();
  });

  /* -----------------------------------------------------
     6. GLOBAL ESCAPE KEY + OUTSIDE CLICK
     ----------------------------------------------------- */
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    if (popup.getAttribute("data-open") === "true") {
      closePopup();
    } else if (mobileMenu.getAttribute("data-open") === "true") {
      closeMobileMenu();
    }
  });

  /* -----------------------------------------------------
     7. LANGUAGE SWITCHER (VI / EN)
     Prototype mechanism only. Production should use
     WPML/Polylang with dedicated /vi/ and /en/ URLs and
     proper hreflang — not a client-side JS toggle.
     ----------------------------------------------------- */
  var LANG_STORAGE_KEY = "palmcity-lang";
  var langButtons = document.querySelectorAll("[data-lang-set]");
  var langTextEls = document.querySelectorAll("[data-lang-vi][data-lang-en]");
  var langAriaEls = document.querySelectorAll("[data-lang-vi-aria][data-lang-en-aria]");
  var langAltEls = document.querySelectorAll("[data-lang-vi-alt][data-lang-en-alt]");

  function applyLanguage(lang) {
    document.documentElement.setAttribute("lang", lang);

    langTextEls.forEach(function (el) {
      var text = lang === "en" ? el.getAttribute("data-lang-en") : el.getAttribute("data-lang-vi");
      if (text === null) return;
      el.textContent = text;
      // Elements with a data-text mirror (hero headline/supporting water
      // and reflection layers use content: attr(data-text) in CSS) need
      // that attribute kept in sync with the visible text.
      if (el.hasAttribute("data-text")) el.setAttribute("data-text", text);
    });

    langAriaEls.forEach(function (el) {
      var text = lang === "en" ? el.getAttribute("data-lang-en-aria") : el.getAttribute("data-lang-vi-aria");
      if (text !== null) el.setAttribute("aria-label", text);
    });

    langAltEls.forEach(function (el) {
      var text = lang === "en" ? el.getAttribute("data-lang-en-alt") : el.getAttribute("data-lang-vi-alt");
      if (text !== null) el.setAttribute("alt", text);
    });

    langButtons.forEach(function (btn) {
      var isActive = btn.getAttribute("data-lang-set") === lang;
      btn.setAttribute("aria-pressed", isActive ? "true" : "false");
    });

    hamburgerBtn.setAttribute("aria-label", lang === "en" ? "Open menu" : "Mở menu");

    // Re-render the decimal separator (16,5 vs 16.5) on any USP value.
    // Mid-count-up values are left alone (the animation's own next
    // frame already uses the new language via formatStatValue()). If
    // reduced motion is on, or IntersectionObserver isn't supported,
    // the count-up system never zeroed the value in the first place —
    // it's always "final" and safe to reformat with the real number.
    document.querySelectorAll(".usp-number[data-value]").forEach(function (el) {
      if (el.classList.contains("is-counting")) return;
      var decimals = parseInt(el.getAttribute("data-decimals") || "0", 10);
      var isFinal =
        prefersReducedMotion ||
        !("IntersectionObserver" in window) ||
        el.classList.contains("is-counted");
      var value = isFinal ? parseFloat(el.getAttribute("data-value")) : 0;
      el.textContent = formatStatValue(value, decimals);
    });

    try {
      window.localStorage.setItem(LANG_STORAGE_KEY, lang);
    } catch (err) {
      /* localStorage unavailable — ignore in prototype */
    }

    // sections.js renders some content (project details, connectivity,
    // amenities, news) from JS data objects after this script runs, so
    // it can't be caught by the langTextEls snapshot above — it listens
    // for this event to re-render in the new language instead.
    document.dispatchEvent(new CustomEvent("palmcity:langchange", { detail: { lang: lang } }));
  }

  langButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      applyLanguage(btn.getAttribute("data-lang-set"));
    });
  });

  var storedLang = "vi";
  try {
    storedLang = window.localStorage.getItem(LANG_STORAGE_KEY) || "vi";
  } catch (err) {
    storedLang = "vi";
  }
  applyLanguage(storedLang);
})();
