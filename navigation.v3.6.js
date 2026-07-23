(() => {
  "use strict";

  const q = (selector, scope = document) => scope.querySelector(selector);
  const qa = (selector, scope = document) => [...scope.querySelectorAll(selector)];
  const isStoryPage = document.body.classList.contains("story-page");
  const isRtl = () => document.documentElement.dir === "rtl";
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const navigationLabels = {
    en: {
      "nav.home": "Home",
      "nav.programme": "Programme",
      "nav.journey": "Journey",
      "nav.selection": "Selection",
      "nav.stations": "Preparation Stations",
      "nav.competencies": "Competencies",
      "nav.assessment": "Assessment",
      "nav.impact": "Impact",
      "nav.admission": "Admission",
      "nav.story": "Story of SAMT",
      navigation: "Navigation",
      open: "Open menu",
      close: "Close menu",
      backdrop: "Close navigation",
      switchLanguage: "التبديل إلى العربية",
      storyTitle: "The Story of SAMT",
      storyCopy: "Discover the Arabic meaning, Emirati cultural context and leadership character behind the name."
    },
    ar: {
      "nav.home": "الرئيسية",
      "nav.programme": "البرنامج",
      "nav.journey": "الرحلة",
      "nav.selection": "الاختيار",
      "nav.stations": "محطات الإعداد",
      "nav.competencies": "الكفاءات",
      "nav.assessment": "التقييم",
      "nav.impact": "الأثر",
      "nav.admission": "القبول",
      "nav.story": "قصة سَمْت",
      navigation: "التنقل",
      open: "فتح القائمة",
      close: "إغلاق القائمة",
      backdrop: "إغلاق التنقل",
      switchLanguage: "Switch to English",
      storyTitle: "قصة سَمْت",
      storyCopy: "اكتشف المعنى العربي والسياق الإماراتي والشخصية القيادية الكامنة خلف الاسم."
    }
  };

  function ensureStoryDiscovery() {
    const desktopNavigation = q(".desktop-nav");
    if (desktopNavigation && !q('a[href="story-of-samt.html"]', desktopNavigation)) {
      const link = document.createElement("a");
      link.href = "story-of-samt.html";
      link.dataset.i18n = "nav.story";
      link.textContent = "Story of SAMT";
      desktopNavigation.append(link);
    }

    const footerNavigation = q(".site-footer__bottom nav");
    if (footerNavigation && !q('a[href="story-of-samt.html"]', footerNavigation)) {
      const link = document.createElement("a");
      link.href = "story-of-samt.html";
      link.dataset.i18n = "nav.story";
      link.textContent = "Story of SAMT";
      footerNavigation.insertBefore(link, footerNavigation.lastElementChild);
    }

    if (!isStoryPage) {
      const programmeLinks = q(".programme__links");
      if (programmeLinks && !q(".story-entry-card")) {
        const card = document.createElement("a");
        card.className = "story-entry-card";
        card.href = "story-of-samt.html";
        card.innerHTML = `
          <span class="story-entry-card__mark" aria-hidden="true">سَمْت</span>
          <span class="story-entry-card__copy"><strong></strong><span></span></span>
          <i aria-hidden="true">↗</i>`;
        programmeLinks.after(card);
      }
    }
  }

  function menuItems() {
    if (isStoryPage) {
      return [
        ["index.html", "nav.home", "Home"],
        ["index.html#programme", "nav.programme", "Programme"],
        ["index.html#stations", "nav.stations", "Preparation Stations"],
        ["story-of-samt.html", "nav.story", "Story of SAMT", "story"]
      ];
    }

    return [
      ["#programme", "nav.programme", "Programme"],
      ["#journey", "nav.journey", "Journey"],
      ["#selection", "nav.selection", "Selection"],
      ["#stations", "nav.stations", "Preparation Stations"],
      ["#competencies", "nav.competencies", "Competencies"],
      ["#assessment", "nav.assessment", "Assessment"],
      ["#impact", "nav.impact", "Impact"],
      ["#admission", "nav.admission", "Admission"],
      ["story-of-samt.html", "nav.story", "Story of SAMT", "story"]
    ];
  }

  function rebuildMenu() {
    const legacyMenu = q(".mobile-menu");
    const legacyToggle = q(".menu-toggle");
    if (!legacyMenu || !legacyToggle) return null;

    const links = menuItems().map(([href, key, label, type]) => {
      const current = isStoryPage && type === "story" ? ' aria-current="page"' : "";
      const className = type ? ` class="mobile-menu__${type}"` : "";
      return `<a href="${href}" data-i18n="${key}"${className}${current}>${label}</a>`;
    }).join("");

    legacyMenu.setAttribute("role", "dialog");
    legacyMenu.setAttribute("aria-modal", "true");
    legacyMenu.setAttribute("aria-labelledby", "mobile-menu-title");
    legacyMenu.innerHTML = `
      <button class="mobile-menu__backdrop" type="button" tabindex="-1" aria-label="Close navigation"></button>
      <div class="mobile-menu__panel" tabindex="-1">
        <div class="mobile-menu__top">
          <a class="mobile-menu__brand" href="${isStoryPage ? "index.html" : "#hero"}" aria-label="SAMT home">
            <img src="assets/brand/samt-symbol.svg" width="600" height="500" alt="" />
            <span><strong>SAMT</strong><small>From Potential to Command</small></span>
          </a>
          <div class="mobile-menu__actions">
            <button class="mobile-menu__language" type="button">العربية</button>
            <button class="mobile-menu__close" type="button" aria-label="Close menu">×</button>
          </div>
        </div>
        <div class="mobile-menu__scroll">
          <p class="mobile-menu__label" id="mobile-menu-title">Navigation</p>
          <nav aria-label="Mobile navigation">${links}</nav>
        </div>
        <div class="mobile-menu__footer"><strong>From Potential to Command</strong><span>من الإمكانات إلى القيادة</span></div>
      </div>`;

    // Replacing these nodes removes the legacy page-specific menu listeners.
    const menu = legacyMenu.cloneNode(true);
    const toggle = legacyToggle.cloneNode(true);
    legacyMenu.replaceWith(menu);
    legacyToggle.replaceWith(toggle);
    return { menu, toggle };
  }

  ensureStoryDiscovery();
  const controls = rebuildMenu();
  if (!controls) return;

  const { menu, toggle } = controls;
  const panel = q(".mobile-menu__panel", menu);
  const closeButton = q(".mobile-menu__close", menu);
  const backdrop = q(".mobile-menu__backdrop", menu);
  const languageButton = q(".mobile-menu__language", menu);
  const inertTargets = qa("main, .site-footer, .page-progress, .section-rail");
  const focusableSelector = 'a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])';
  let lastFocusedElement = null;
  let storedScrollY = 0;
  let touchStartX = 0;
  let touchStartY = 0;

  const menuIsOpen = () => menu.classList.contains("is-open");
  const currentLanguage = () => isRtl() ? "ar" : "en";

  function updateLanguageUI() {
    const language = currentLanguage();
    const dictionary = navigationLabels[language];

    qa('[data-i18n^="nav."]', document).forEach((element) => {
      const value = dictionary[element.dataset.i18n];
      if (value) element.textContent = value;
    });

    const menuLabel = q(".mobile-menu__label", menu);
    if (menuLabel) menuLabel.textContent = dictionary.navigation;

    if (languageButton) {
      languageButton.textContent = language === "ar" ? "English" : "العربية";
      languageButton.lang = language === "ar" ? "en" : "ar";
      languageButton.dir = language === "ar" ? "ltr" : "rtl";
      languageButton.setAttribute("aria-label", dictionary.switchLanguage);
    }

    closeButton?.setAttribute("aria-label", dictionary.close);
    backdrop?.setAttribute("aria-label", dictionary.backdrop);
    toggle.setAttribute("aria-label", menuIsOpen() ? dictionary.close : dictionary.open);

    const storyCard = q(".story-entry-card");
    if (storyCard) {
      q("strong", storyCard).textContent = dictionary.storyTitle;
      q(".story-entry-card__copy span", storyCard).textContent = dictionary.storyCopy;
    }
  }

  function lockDocument() {
    storedScrollY = window.scrollY;
    document.body.classList.add("menu-open");
    document.body.style.position = "fixed";
    document.body.style.top = `-${storedScrollY}px`;
    document.body.style.width = "100%";
    inertTargets.forEach((element) => {
      if ("inert" in element) element.inert = true;
    });
  }

  function unlockDocument() {
    inertTargets.forEach((element) => {
      if ("inert" in element) element.inert = false;
    });
    document.body.classList.remove("menu-open");
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.width = "";
    window.scrollTo(0, storedScrollY);
  }

  function openMenu() {
    if (menuIsOpen()) return;
    lastFocusedElement = document.activeElement;
    menu.classList.add("is-open");
    menu.setAttribute("aria-hidden", "false");
    toggle.setAttribute("aria-expanded", "true");
    lockDocument();
    updateLanguageUI();
    q(".mobile-menu__scroll", panel).scrollTop = 0;
    requestAnimationFrame(() => closeButton.focus());
  }

  function closeMenu({ restoreFocus = true } = {}) {
    if (!menuIsOpen()) return;
    menu.classList.remove("is-open");
    menu.setAttribute("aria-hidden", "true");
    toggle.setAttribute("aria-expanded", "false");
    unlockDocument();
    updateLanguageUI();
    if (restoreFocus) requestAnimationFrame(() => lastFocusedElement?.focus?.());
  }

  function trapFocus(event) {
    if (!menuIsOpen() || event.key !== "Tab") return;
    const focusableElements = qa(focusableSelector, panel).filter((element) => element.offsetParent !== null);
    if (!focusableElements.length) return;
    const firstElement = focusableElements[0];
    const lastElement = focusableElements.at(-1);

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  }

  toggle.addEventListener("click", () => menuIsOpen() ? closeMenu() : openMenu());
  closeButton.addEventListener("click", () => closeMenu());
  backdrop.addEventListener("click", () => closeMenu());

  languageButton.addEventListener("click", () => {
    q(".site-header .language-toggle")?.click();
    requestAnimationFrame(updateLanguageUI);
  });

  qa(".mobile-menu nav a", menu).forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href") || "";
      if (href.startsWith("#")) {
        const target = q(href);
        if (target) {
          event.preventDefault();
          closeMenu({ restoreFocus: false });
          requestAnimationFrame(() => target.scrollIntoView({
            behavior: reducedMotion ? "auto" : "smooth",
            block: "start"
          }));
          return;
        }
      }
      closeMenu({ restoreFocus: false });
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuIsOpen()) {
      event.preventDefault();
      closeMenu();
      return;
    }
    trapFocus(event);
  });

  panel.addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0].clientX;
    touchStartY = event.changedTouches[0].clientY;
  }, { passive: true });

  panel.addEventListener("touchend", (event) => {
    const deltaX = event.changedTouches[0].clientX - touchStartX;
    const deltaY = event.changedTouches[0].clientY - touchStartY;
    const horizontalSwipe = Math.abs(deltaX) >= 70 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2;
    if (!horizontalSwipe) return;
    if ((!isRtl() && deltaX > 0) || (isRtl() && deltaX < 0)) closeMenu();
  }, { passive: true });

  new MutationObserver(updateLanguageUI).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["dir", "lang"]
  });

  addEventListener("resize", () => {
    if (innerWidth > 1180 && menuIsOpen()) closeMenu({ restoreFocus: false });
  });

  updateLanguageUI();
})();