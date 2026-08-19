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
  var openPopupTriggers = document.querySelectorAll("[data-open-popup]");
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

  openPopupTriggers.forEach(function (trigger) {
    trigger.addEventListener("click", function () {
      openPopup(trigger);
    });
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

  function applyLanguage(lang) {
    document.documentElement.setAttribute("lang", lang);

    langTextEls.forEach(function (el) {
      var text = lang === "en" ? el.getAttribute("data-lang-en") : el.getAttribute("data-lang-vi");
      if (text !== null) el.textContent = text;
    });

    langAriaEls.forEach(function (el) {
      var text = lang === "en" ? el.getAttribute("data-lang-en-aria") : el.getAttribute("data-lang-vi-aria");
      if (text !== null) el.setAttribute("aria-label", text);
    });

    langButtons.forEach(function (btn) {
      var isActive = btn.getAttribute("data-lang-set") === lang;
      btn.setAttribute("aria-pressed", isActive ? "true" : "false");
    });

    hamburgerBtn.setAttribute("aria-label", lang === "en" ? "Open menu" : "Mở menu");

    try {
      window.localStorage.setItem(LANG_STORAGE_KEY, lang);
    } catch (err) {
      /* localStorage unavailable — ignore in prototype */
    }
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
