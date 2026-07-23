(() => {
  "use strict";

  const q = (s, scope = document) => scope.querySelector(s);
  const qa = (s, scope = document) => [...scope.querySelectorAll(s)];
  const isStory = document.body.classList.contains("story-page");
  const rtl = () => document.documentElement.dir === "rtl";
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  function ensureStoryDiscovery() {
    const desktop = q(".desktop-nav");
    if (desktop && !q('a[href="story-of-samt.html"]', desktop)) {
      const a = document.createElement("a");
      a.href = "story-of-samt.html";
      a.dataset.i18n = "nav.story";
      a.textContent = "Story";
      desktop.append(a);
    }

    const footer = q(".site-footer__bottom nav");
    if (footer && !q('a[href="story-of-samt.html"]', footer)) {
      const a = document.createElement("a");
      a.href = "story-of-samt.html";
      a.dataset.i18n = "nav.story";
      a.textContent = "Story of SAMT";
      footer.insertBefore(a, footer.lastElementChild);
    }

    if (!isStory) {
      const links = q(".programme__links");
      if (links && !q(".story-entry-card")) {
        const card = document.createElement("a");
        card.className = "story-entry-card";
        card.href = "story-of-samt.html";
        card.innerHTML = '<span class="story-entry-card__copy"><strong></strong><span></span></span><i aria-hidden="true">↗</i>';
        links.after(card);
      }
    }
  }

  function menuLinks() {
    return isStory
      ? [
          ["index.html", "nav.home", "Home"],
          ["index.html#programme", "nav.programme", "Programme"],
          ["index.html#stations", "nav.stations", "Preparation Stations"],
          ["story-of-samt.html", "nav.story", "Story of SAMT", "story"]
        ]
      : [
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

    const links = menuLinks().map(([href, key, label, kind]) =>
      `<a href="${href}" data-i18n="${key}"${kind ? ' class="mobile-menu__story"' : ''}${isStory && kind ? ' aria-current="page"' : ''}>${label}</a>`
    ).join("");

    legacyMenu.setAttribute("role", "dialog");
    legacyMenu.setAttribute("aria-modal", "true");
    legacyMenu.setAttribute("aria-labelledby", "mobile-menu-title");
    legacyMenu.innerHTML = `
      <button class="mobile-menu__backdrop" type="button" tabindex="-1" aria-label="Close navigation"></button>
      <div class="mobile-menu__panel" tabindex="-1">
        <div class="mobile-menu__top">
          <a class="mobile-menu__brand" href="${isStory ? 'index.html' : '#hero'}" aria-label="SAMT home">
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

    // Detach anonymous legacy listeners; the shared controller becomes authoritative.
    const menu = legacyMenu.cloneNode(true);
    const toggle = legacyToggle.cloneNode(true);
    legacyMenu.replaceWith(menu);
    legacyToggle.replaceWith(toggle);
    return { menu, toggle };
  }

  ensureStoryDiscovery();
  const nodes = rebuildMenu();
  if (!nodes) return;

  const { menu, toggle } = nodes;
  const panel = q(".mobile-menu__panel", menu);
  const closeBtn = q(".mobile-menu__close", menu);
  const backdrop = q(".mobile-menu__backdrop", menu);
  const languageBtn = q(".mobile-menu__language", menu);
  const inertTargets = qa("main, .site-footer, .page-progress, .section-rail");
  const focusable = 'a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])';
  let lastFocus = null;
  let scrollY = 0;
  let touchX = 0;
  let touchY = 0;

  const opened = () => menu.classList.contains("is-open");

  function syncLanguageUI() {
    const ar = rtl();
    const navText = ar ? {
      "nav.home":"الرئيسية","nav.programme":"البرنامج","nav.journey":"الرحلة","nav.selection":"الاختيار",
      "nav.stations":"محطات الإعداد","nav.competencies":"الكفاءات","nav.assessment":"التقييم",
      "nav.impact":"الأثر","nav.admission":"القبول","nav.story":"قصة سَمْت"
    } : {
      "nav.home":"Home","nav.programme":"Programme","nav.journey":"Journey","nav.selection":"Selection",
      "nav.stations":"Preparation Stations","nav.competencies":"Competencies","nav.assessment":"Assessment",
      "nav.impact":"Impact","nav.admission":"Admission","nav.story":"Story of SAMT"
    };
    qa('[data-i18n^="nav."]', document).forEach(el => {
      const value = navText[el.dataset.i18n];
      if (value) el.textContent = value;
    });
    const label = q(".mobile-menu__label", menu);
    if (label) label.textContent = ar ? "التنقل" : "Navigation";
    if (languageBtn) {
      languageBtn.textContent = ar ? "English" : "العربية";
      languageBtn.lang = ar ? "en" : "ar";
      languageBtn.dir = ar ? "ltr" : "rtl";
      languageBtn.setAttribute("aria-label", ar ? "Switch to English" : "التبديل إلى العربية");
    }
    closeBtn?.setAttribute("aria-label", ar ? "إغلاق القائمة" : "Close menu");
    backdrop?.setAttribute("aria-label", ar ? "إغلاق التنقل" : "Close navigation");
    toggle.setAttribute("aria-label", opened() ? (ar ? "إغلاق القائمة" : "Close menu") : (ar ? "فتح القائمة" : "Open menu"));
    const card = q(".story-entry-card");
    if (card) {
      q("strong", card).textContent = ar ? "قصة سَمْت" : "The Story of SAMT";
      q(".story-entry-card__copy span", card).textContent = ar
        ? "اكتشف المعنى العربي والسياق الإماراتي والشخصية القيادية الكامنة خلف الاسم."
        : "Discover the Arabic meaning, Emirati cultural context and leadership character behind the name.";
    }
  }

  function lock() {
    scrollY = scrollY || window.scrollY;
    document.body.classList.add("menu-open");
    document.body.style.top = `-${scrollY}px`;
    document.body.style.position = "fixed";
    document.body.style.width = "100%";
    inertTargets.forEach(el => { if ("inert" in el) el.inert = true; });
  }

  function unlock() {
    inertTargets.forEach(el => { if ("inert" in el) el.inert = false; });
    document.body.classList.remove("menu-open");
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.width = "";
    window.scrollTo(0, scrollY);
    scrollY = 0;
  }

  function openMenu() {
    if (opened()) return;
    lastFocus = document.activeElement;
    menu.classList.add("is-open");
    menu.setAttribute("aria-hidden", "false");
    toggle.setAttribute("aria-expanded", "true");
    lock();
    syncLanguageUI();
    panel.scrollTop = 0;
    requestAnimationFrame(() => closeBtn.focus());
  }

  function closeMenu(restore = true) {
    if (!opened()) return;
    menu.classList.remove("is-open");
    menu.setAttribute("aria-hidden", "true");
    toggle.setAttribute("aria-expanded", "false");
    unlock();
    syncLanguageUI();
    if (restore) requestAnimationFrame(() => lastFocus?.focus?.());
  }

  function trapFocus(event) {
    if (!opened() || event.key !== "Tab") return;
    const list = qa(focusable, panel).filter(el => el.offsetParent !== null);
    if (!list.length) return;
    const first = list[0];
    const last = list.at(-1);
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }

  toggle.addEventListener("click", () => opened() ? closeMenu() : openMenu());
  closeBtn.addEventListener("click", () => closeMenu());
  backdrop.addEventListener("click", () => closeMenu());
  languageBtn.addEventListener("click", () => {
    q(".site-header .language-toggle")?.click();
    requestAnimationFrame(syncLanguageUI);
  });

  qa(".mobile-menu nav a", menu).forEach(link => link.addEventListener("click", event => {
    const href = link.getAttribute("href") || "";
    if (href.startsWith("#")) {
      const target = q(href);
      if (target) {
        event.preventDefault();
        closeMenu(false);
        requestAnimationFrame(() => target.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" }));
        return;
      }
    }
    closeMenu(false);
  }));

  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && opened()) { event.preventDefault(); closeMenu(); return; }
    trapFocus(event);
  });

  panel.addEventListener("touchstart", event => {
    touchX = event.changedTouches[0].clientX;
    touchY = event.changedTouches[0].clientY;
  }, { passive: true });
  panel.addEventListener("touchend", event => {
    const dx = event.changedTouches[0].clientX - touchX;
    const dy = event.changedTouches[0].clientY - touchY;
    if (Math.abs(dx) < 70 || Math.abs(dx) < Math.abs(dy) * 1.2) return;
    if ((!rtl() && dx > 0) || (rtl() && dx < 0)) closeMenu();
  }, { passive: true });

  new MutationObserver(syncLanguageUI).observe(document.documentElement, { attributes: true, attributeFilter: ["dir", "lang"] });
  addEventListener("resize", () => { if (innerWidth > 1180 && opened()) closeMenu(false); });
  syncLanguageUI();
})();