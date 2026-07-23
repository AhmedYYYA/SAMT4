(() => {
  "use strict";

  const q = (selector, scope = document) => scope.querySelector(selector);
  const qa = (selector, scope = document) => [...scope.querySelectorAll(selector)];
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = matchMedia("(pointer: fine)").matches;

  document.documentElement.classList.add("samt-v3-6-ready");

  function createTransitionLayer() {
    if (q(".premium-transition")) return;
    const layer = document.createElement("div");
    layer.className = "premium-transition";
    layer.setAttribute("aria-hidden", "true");
    layer.innerHTML = '<span class="premium-transition__line"></span><span class="premium-transition__mark">SAMT</span>';
    document.body.append(layer);
  }

  function initPageTransitions() {
    createTransitionLayer();
    const layer = q(".premium-transition");
    qa('a[href$=".html"], a[href*=".html#"]').forEach((link) => {
      link.addEventListener("click", (event) => {
        if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        const url = new URL(link.href, location.href);
        if (url.origin !== location.origin || url.href === location.href) return;
        if (reducedMotion) return;
        event.preventDefault();
        layer.classList.add("is-active");
        setTimeout(() => { location.href = url.href; }, 420);
      });
    });
    addEventListener("pageshow", () => layer?.classList.remove("is-active"));
  }

  function initSectionReveal() {
    const sections = qa("main section, main article > section");
    if (reducedMotion || !("IntersectionObserver" in window)) {
      sections.forEach((section) => section.classList.add("is-revealed"));
      return;
    }

    sections.forEach((section) => section.classList.add("premium-reveal"));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-revealed");
        observer.unobserve(entry.target);
      });
    }, { threshold: .08, rootMargin: "0px 0px -7%" });
    sections.forEach((section) => observer.observe(section));
  }

  function initPointerLight() {
    if (!finePointer || reducedMotion) return;
    const light = document.createElement("div");
    light.className = "pointer-light";
    light.setAttribute("aria-hidden", "true");
    document.body.append(light);
    let targetX = innerWidth / 2;
    let targetY = innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;

    addEventListener("pointermove", (event) => {
      targetX = event.clientX;
      targetY = event.clientY;
    }, { passive: true });

    const render = () => {
      currentX += (targetX - currentX) * .11;
      currentY += (targetY - currentY) * .11;
      light.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      requestAnimationFrame(render);
    };
    render();
  }

  function initPremiumTilt() {
    if (!finePointer || reducedMotion) return;
    const elements = qa(".competency-card, .impact-card, .story-pillar, .admission__panel, .hero__identity");
    elements.forEach((element) => {
      element.classList.add("premium-tilt");
      element.addEventListener("pointermove", (event) => {
        const rect = element.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - .5;
        const y = (event.clientY - rect.top) / rect.height - .5;
        element.style.setProperty("--tilt-x", `${(-y * 2.2).toFixed(2)}deg`);
        element.style.setProperty("--tilt-y", `${(x * 2.6).toFixed(2)}deg`);
        element.style.setProperty("--glow-x", `${((x + .5) * 100).toFixed(1)}%`);
        element.style.setProperty("--glow-y", `${((y + .5) * 100).toFixed(1)}%`);
      });
      element.addEventListener("pointerleave", () => {
        element.style.setProperty("--tilt-x", "0deg");
        element.style.setProperty("--tilt-y", "0deg");
      });
    });
  }

  function initStoryReadingProgress() {
    if (!document.body.classList.contains("story-page")) return;
    const progress = document.createElement("div");
    progress.className = "story-reading-progress";
    progress.setAttribute("aria-hidden", "true");
    progress.innerHTML = "<span></span>";
    document.body.append(progress);
    const bar = q("span", progress);
    const update = () => {
      const article = q('[data-story-lang]:not([hidden])');
      if (!article) return;
      const rect = article.getBoundingClientRect();
      const total = Math.max(1, article.offsetHeight - innerHeight);
      const consumed = Math.min(total, Math.max(0, -rect.top));
      bar.style.transform = `scaleX(${consumed / total})`;
    };
    addEventListener("scroll", update, { passive: true });
    addEventListener("resize", update);
    new MutationObserver(update).observe(document.documentElement, { attributes: true, attributeFilter: ["dir", "lang"] });
    update();
  }

  function initCurrentSectionAnnouncement() {
    const status = document.createElement("div");
    status.className = "sr-only";
    status.setAttribute("role", "status");
    status.setAttribute("aria-live", "polite");
    document.body.append(status);
    const headings = qa("main section[id] h2, main section[id] h1");
    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible?.target?.textContent) status.textContent = visible.target.textContent.trim();
    }, { threshold: [.5] });
    headings.forEach((heading) => observer.observe(heading));
  }

  initPageTransitions();
  initSectionReveal();
  initPointerLight();
  initPremiumTilt();
  initStoryReadingProgress();
  initCurrentSectionAnnouncement();
})();