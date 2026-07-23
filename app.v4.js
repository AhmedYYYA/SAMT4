(() => {
  "use strict";

  document.documentElement.classList.remove("no-js");
  document.documentElement.classList.add("js");

  const q = (selector, scope = document) => scope.querySelector(selector);
  const qa = (selector, scope = document) => [...scope.querySelectorAll(selector)];
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const saveData = navigator.connection?.saveData === true;
  const lowPower = saveData || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4);
  const storyPage = document.body.classList.contains("story-page");
  const state = { language: document.documentElement.lang === "ar" ? "ar" : "en", menu: false, journey: -1, journeyDone: false, transition: false };
  const cache = { arabic: null, stations: new Map(), originals: null };
  const idle = callback => "requestIdleCallback" in window
    ? requestIdleCallback(callback, { timeout: 1600 })
    : setTimeout(callback, 200);

  let initialLanguage = "en";
  if (!storyPage) {
    const requested = new URLSearchParams(location.search).get("lang");
    let stored = null;
    try { stored = localStorage.getItem("samt-language"); } catch (_) {}
    initialLanguage = requested === "ar" || stored === "ar" ? "ar" : "en";
    if (initialLanguage === "ar") {
      document.documentElement.lang = "ar";
      document.documentElement.dir = "rtl";
      document.documentElement.classList.add("i18n-pending");
      state.language = "ar";
    }
  }
  if (lowPower) document.body.dataset.performance = "reduced";

  function near(selector, callback, rootMargin = "35% 0px") {
    const target = q(selector);
    if (!target) return;
    if (!("IntersectionObserver" in window)) {
      setTimeout(callback, 2200);
      return;
    }
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      observer.disconnect();
      setTimeout(callback, 0);
    }, { rootMargin, threshold: 0 });
    observer.observe(target);
  }

  function initHeader() {
    const header = q(".site-header");
    const toggle = q(".menu-toggle");
    const menu = q(".mobile-menu");
    const panel = q(".mobile-menu__panel", menu || document);
    const close = q(".mobile-menu__close", menu || document);
    const backdrop = q(".mobile-menu__backdrop", menu || document);
    if (!header) return;

    const updateHeader = () => header.classList.toggle("is-scrolled", scrollY > 18);
    addEventListener("scroll", updateHeader, { passive: true });
    updateHeader();
    if (!toggle || !menu || !panel) return;

    let previousFocus = null;
    const focusable = () => qa('a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])', panel)
      .filter(element => element.offsetParent !== null);
    const setBackground = active => {
      [q("main"), q("footer")].forEach(element => {
        if (!element) return;
        if (active) element.setAttribute("inert", "");
        else element.removeAttribute("inert");
      });
    };
    const openMenu = () => {
      previousFocus = document.activeElement;
      state.menu = true;
      menu.setAttribute("aria-hidden", "false");
      toggle.setAttribute("aria-expanded", "true");
      document.body.classList.add("menu-open");
      setBackground(true);
      requestAnimationFrame(() => close?.focus());
    };
    const closeMenu = (restore = true) => {
      state.menu = false;
      menu.setAttribute("aria-hidden", "true");
      toggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("menu-open");
      setBackground(false);
      if (restore) requestAnimationFrame(() => previousFocus?.focus?.());
    };

    toggle.addEventListener("click", () => state.menu ? closeMenu() : openMenu());
    close?.addEventListener("click", () => closeMenu());
    backdrop?.addEventListener("click", () => closeMenu());
    qa("nav a", menu).forEach(link => link.addEventListener("click", () => closeMenu(false)));
    document.addEventListener("keydown", event => {
      if (event.key === "Escape" && state.menu) {
        event.preventDefault();
        closeMenu();
        return;
      }
      if (event.key !== "Tab" || !state.menu) return;
      const nodes = focusable();
      if (!nodes.length) return;
      if (event.shiftKey && document.activeElement === nodes[0]) {
        event.preventDefault();
        nodes.at(-1).focus();
      } else if (!event.shiftKey && document.activeElement === nodes.at(-1)) {
        event.preventDefault();
        nodes[0].focus();
      }
    });
    addEventListener("resize", () => {
      if (innerWidth > 1180 && state.menu) closeMenu(false);
    });
  }

  function captureOriginals() {
    if (cache.originals) return;
    cache.originals = new Map();
    qa("[data-i18n]").forEach(element => cache.originals.set(element, [false, element.textContent]));
    qa("[data-i18n-html]").forEach(element => cache.originals.set(element, [true, element.innerHTML]));
  }

  async function loadArabic() {
    if (cache.arabic) return cache.arabic;
    const response = await fetch("i18n/ar.json", { credentials: "same-origin" });
    if (!response.ok) throw new Error(`Arabic translation request failed: ${response.status}`);
    cache.arabic = await response.json();
    return cache.arabic;
  }

  function applyArabic(dictionary) {
    qa("[data-i18n]").forEach(element => {
      const value = dictionary[element.dataset.i18n];
      if (value !== undefined) element.textContent = value;
    });
    qa("[data-i18n-html]").forEach(element => {
      const value = dictionary[element.dataset.i18nHtml];
      if (value !== undefined) element.innerHTML = value;
    });
  }

  function restoreEnglish() {
    cache.originals?.forEach(([html, value], element) => {
      if (html) element.innerHTML = value;
      else element.textContent = value;
    });
  }

  function languageChrome(language) {
    const arabic = language === "ar";
    const button = q(".language-toggle");
    if (button) {
      button.firstElementChild.textContent = arabic ? "EN" : "ع";
      button.setAttribute("aria-label", arabic ? "Switch to English" : "التبديل إلى العربية");
    }
    qa("[data-story-link]").forEach(link => link.href = arabic ? "story-of-samt-ar.html" : "story-of-samt.html");
    q(".menu-toggle")?.setAttribute("aria-label", arabic ? "فتح القائمة" : "Open menu");
    q(".mobile-menu__close")?.setAttribute("aria-label", arabic ? "إغلاق القائمة" : "Close menu");
    q(".mobile-menu__backdrop")?.setAttribute("aria-label", arabic ? "إغلاق التنقل" : "Close navigation");
    q(".desktop-nav")?.setAttribute("aria-label", arabic ? "التنقل الرئيسي" : "Primary navigation");
    q(".mobile-menu nav")?.setAttribute("aria-label", arabic ? "التنقل عبر الهاتف" : "Mobile navigation");
    q(".station-route")?.setAttribute("aria-label", arabic ? "محطات الإعداد" : "Preparation stations");
    q(".hero__identity")?.setAttribute("aria-label", arabic ? "هوية سَمْت بالعربية والإنجليزية" : "SAMT bilingual identity");
    q(".site-footer__bottom nav")?.setAttribute("aria-label", arabic ? "تنقل التذييل" : "Footer navigation");
    document.title = arabic ? "سَمْت — من الإمكانات إلى القيادة" : "SAMT — From Potential to Command";
    q('meta[name="description"]')?.setAttribute("content", arabic
      ? "برنامج سَمْت لإعداد القيادات من الإمكانات الواعدة إلى الجاهزية المثبتة لتحمل المسؤولية."
      : "SAMT is a selective leadership programme progressing exceptional potential toward command readiness through disciplined formation, international exposure and evidence-based assessment.");
    q('meta[property="og:locale"]')?.setAttribute("content", arabic ? "ar_AE" : "en_AE");
  }

  async function setLanguage(language, persist = true) {
    language = language === "ar" ? "ar" : "en";
    if (language === "ar") captureOriginals();
    state.language = language;
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    languageChrome(language);
    try {
      if (language === "ar") applyArabic(await loadArabic());
      else restoreEnglish();
      refreshJourney();
      const activeStation = q('[data-station][aria-selected="true"]')?.dataset.station;
      if (activeStation && cache.stations.has(language)) await updateStation(activeStation, false);
    } catch (error) {
      console.error(error);
      const live = q("#live-region");
      if (live) live.textContent = language === "ar" ? "تعذر تحميل الترجمة العربية مؤقتاً." : "The requested language could not be loaded temporarily.";
    } finally {
      document.documentElement.classList.remove("i18n-pending");
    }
    if (!persist) return;
    try { localStorage.setItem("samt-language", language); } catch (_) {}
    const url = new URL(location.href);
    if (language === "ar") url.searchParams.set("lang", "ar");
    else url.searchParams.delete("lang");
    history.replaceState(null, "", url);
  }

  function initLanguage() {
    languageChrome(initialLanguage);
    q(".language-toggle")?.addEventListener("click", () => setLanguage(state.language === "ar" ? "en" : "ar"));
    if (initialLanguage === "ar") setLanguage("ar", false);
  }

  function initReveal() {
    const elements = qa(".reveal:not(.hero__copy):not(.hero__identity)");
    if (!elements.length) return;
    if (innerWidth <= 900 || reducedMotion || !("IntersectionObserver" in window)) {
      elements.forEach(element => element.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }), { threshold: .18 });
    elements.forEach(element => observer.observe(element));
  }

  async function stationData(language) {
    if (cache.stations.has(language)) return cache.stations.get(language);
    const response = await fetch(`data/stations.${language}.json`, { credentials: "same-origin" });
    if (!response.ok) throw new Error(`Station data request failed: ${response.status}`);
    const data = await response.json();
    cache.stations.set(language, data);
    return data;
  }

  async function updateStation(key, animate = true) {
    const data = (await stationData(state.language))[key];
    if (!data) return;
    qa("[data-station]").forEach(button => {
      const active = button.dataset.station === key;
      button.setAttribute("aria-selected", String(active));
      button.tabIndex = active ? 0 : -1;
    });
    const image = q("#station-image");
    if (image) {
      if (animate && !reducedMotion) {
        image.style.opacity = "0";
        image.style.transform = "scale(.96)";
      }
      image.src = data.image;
      image.alt = data.alt;
      requestAnimationFrame(() => requestAnimationFrame(() => {
        image.style.opacity = "1";
        image.style.transform = "scale(1)";
      }));
    }
    const order = ["uae", "uk", "france", "usa"];
    q("#station-caption").textContent = `STATION ${String(order.indexOf(key) + 1).padStart(2, "0")} / ${data.code}`;
    q("#station-title").textContent = data.title;
    q("#station-subtitle").textContent = data.subtitle;
    q("#station-body").textContent = data.body;
    q("#station-duration").textContent = data.duration;
    q("#station-focus").textContent = data.focus;
    q("#station-points").replaceChildren(...data.points.map(point => {
      const item = document.createElement("li");
      item.textContent = point;
      return item;
    }));
  }

  function initStations() {
    const tabs = qa("[data-station]");
    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => updateStation(tab.dataset.station));
      tab.addEventListener("keydown", event => {
        if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
        event.preventDefault();
        let next = index;
        if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
        if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
        if (event.key === "Home") next = 0;
        if (event.key === "End") next = tabs.length - 1;
        tabs[next].focus();
        updateStation(tabs[next].dataset.station);
      });
    });
    const visual = q(".station-stage__visual");
    const image = q("#station-image");
    if (visual && image && !reducedMotion && !lowPower && matchMedia("(pointer:fine)").matches) {
      visual.addEventListener("pointermove", event => {
        const rect = visual.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width - .5) * 10;
        const y = ((event.clientY - rect.top) / rect.height - .5) * 8;
        image.style.transform = `translate3d(${x}px,${y}px,0) scale(.99)`;
      });
      visual.addEventListener("pointerleave", () => image.style.transform = "translate3d(0,0,0) scale(1)");
    }
  }

  function journeySlot(index) {
    const width = Math.min(innerWidth * .78, 1000);
    return -width / 2 + (width / 5) * index;
  }

  function refreshJourney() {
    const cards = qa(".journey-card");
    const active = cards[state.journey >= 0 ? state.journey : 0];
    if (!active) return;
    const title = q(".journey__caption strong");
    const description = q(".journey__caption span");
    if (title) title.textContent = q("h3", active)?.textContent || "";
    if (description) description.textContent = q("p", active)?.textContent || "";
  }

  function journeyStage(index) {
    if (state.journeyDone || innerWidth <= 900 || index === state.journey) return;
    const cards = qa(".journey-card");
    state.journey = Math.max(0, Math.min(cards.length - 1, index));
    cards.forEach((card, cardIndex) => {
      card.style.setProperty("--x", `${journeySlot(cardIndex)}px`);
      card.classList.toggle("is-featured", cardIndex === state.journey);
      card.classList.toggle("is-settled", cardIndex < state.journey);
    });
    refreshJourney();
    q(".journey__progress span")?.style.setProperty("transform", `scaleX(${state.journey / (cards.length - 1)})`);
  }

  function completeJourney() {
    const cards = qa(".journey-card");
    state.journeyDone = true;
    state.journey = cards.length - 1;
    cards.forEach((card, index) => {
      card.style.setProperty("--x", `${journeySlot(index)}px`);
      card.classList.remove("is-featured");
      card.classList.add("is-settled");
    });
    q(".journey__progress span")?.style.setProperty("transform", "scaleX(1)");
    q(".journey__caption")?.setAttribute("hidden", "");
    q(".journey__skip")?.setAttribute("hidden", "");
  }

  function initJourney() {
    const section = q("#journey");
    const cards = qa(".journey-card");
    if (!section || !cards.length) return;
    if (innerWidth <= 900 || reducedMotion) {
      completeJourney();
      return;
    }
    journeyStage(0);
    let ticking = false;
    const update = () => {
      if (!state.journeyDone) {
        const rect = section.getBoundingClientRect();
        const travel = Math.max(1, section.offsetHeight - innerHeight);
        const progress = Math.min(1, Math.max(0, -rect.top / travel));
        if (progress >= .97) completeJourney();
        else journeyStage(Math.min(cards.length - 1, Math.floor(progress * cards.length)));
      }
      ticking = false;
    };
    addEventListener("scroll", () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }, { passive: true });
    q(".journey__skip")?.addEventListener("click", completeJourney);
    section.addEventListener("wheel", event => {
      if (Math.abs(event.deltaY) > 160) completeJourney();
    }, { passive: true, once: true });
    update();
  }

  function initTransition() {
    const overlay = q(".story-transition");
    const links = qa("[data-story-link]");
    if (!overlay || !links.length) return;
    const skip = q(".story-transition__skip", overlay);
    let destination = "story-of-samt.html";
    let timer = 0;
    const complete = () => {
      if (!state.transition) return;
      clearTimeout(timer);
      try { sessionStorage.setItem("samt-story-arrival", "1"); } catch (_) {}
      location.href = destination;
    };
    const play = href => {
      if (state.transition) return;
      state.transition = true;
      destination = href;
      overlay.setAttribute("aria-hidden", "false");
      overlay.classList.add("is-playing");
      document.body.classList.add("transition-open");
      [q("header"), q("main"), q("footer")].forEach(element => element?.setAttribute("inert", ""));
      requestAnimationFrame(() => skip?.focus());
      let seen = false;
      try {
        seen = sessionStorage.getItem("samt-story-bridge-seen") === "1";
        sessionStorage.setItem("samt-story-bridge-seen", "1");
      } catch (_) {}
      timer = setTimeout(complete, reducedMotion ? 140 : seen ? 950 : 3800);
    };
    links.forEach(link => link.addEventListener("click", event => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button > 0) return;
      event.preventDefault();
      play(link.href);
    }));
    skip?.addEventListener("click", complete);
    overlay.addEventListener("pointerdown", event => {
      if (!event.target.closest("button")) complete();
    });
    overlay.addEventListener("wheel", complete, { passive: true });
    document.addEventListener("keydown", event => {
      if (!state.transition || !["Escape", "Enter", " "].includes(event.key)) return;
      event.preventDefault();
      complete();
    });
  }

  function initStory() {
    let arrived = false;
    try {
      arrived = sessionStorage.getItem("samt-story-arrival") === "1";
      sessionStorage.removeItem("samt-story-arrival");
    } catch (_) {}
    if (arrived && !reducedMotion) {
      q("main")?.animate(
        [{ opacity: 0, transform: "scale(1.012)" }, { opacity: 1, transform: "scale(1)" }],
        { duration: 900, easing: "cubic-bezier(.22,1,.36,1)", fill: "both" }
      );
    }
    idle(() => {
      const sections = qa(".story-section");
      sections.forEach(section => section.classList.add("reveal-pending"));
      if (reducedMotion || !("IntersectionObserver" in window)) {
        sections.forEach(section => section.classList.add("is-visible"));
        return;
      }
      const reveal = new IntersectionObserver(entries => entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        reveal.unobserve(entry.target);
      }), { threshold: .18 });
      sections.forEach(section => reveal.observe(section));
      const links = qa(".story-progress a");
      const chapter = new IntersectionObserver(entries => entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        links.forEach(link => link.setAttribute("aria-current", String(link.hash === `#${entry.target.id}`)));
      }), { rootMargin: "-35% 0px -55%", threshold: 0 });
      sections.forEach(section => chapter.observe(section));
    });
  }

  initHeader();
  if (storyPage) {
    initStory();
  } else {
    initLanguage();
    initTransition();
    if (innerWidth > 900) idle(initReveal);
    else qa(".reveal").forEach(element => element.classList.add("is-visible"));
    near("#journey", initJourney, "20% 0px");
    near("#stations", initStations, "20% 0px");
  }
})();