(() => {
  "use strict";

  const q = (selector, scope = document) => scope.querySelector(selector);
  const qa = (selector, scope = document) => [...scope.querySelectorAll(selector)];
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hasGSAP = typeof window.gsap !== "undefined";
  const hasScrollTrigger = typeof window.ScrollTrigger !== "undefined";
  const isStoryPage = document.body.classList.contains("story-page");

  function initHeroLanguageComposition() {
    const copy = q(".hero__copy");
    const identity = q(".hero__identity");
    if (!copy || !identity) return;

    const animate = () => {
      if (!hasGSAP || reducedMotion) return;
      const rtl = document.documentElement.dir === "rtl";
      gsap.fromTo(copy,
        { x: rtl ? 42 : -42, autoAlpha: .45 },
        { x: 0, autoAlpha: 1, duration: .72, ease: "power3.out", clearProps: "x,opacity,visibility" }
      );
      gsap.fromTo(identity,
        { x: rtl ? -76 : 76, autoAlpha: 0 },
        { x: 0, autoAlpha: 1, duration: .92, ease: "power4.out", clearProps: "x,opacity,visibility" }
      );
    };

    new MutationObserver(animate).observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["dir", "lang"]
    });
  }

  function initStationArtworkMotion() {
    const visual = q(".station-stage__visual");
    const image = q("#station-image");
    if (!visual || !image || reducedMotion) return;

    visual.addEventListener("pointermove", (event) => {
      if (!hasGSAP || !matchMedia("(pointer:fine)").matches) return;
      const rect = visual.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - .5;
      const y = (event.clientY - rect.top) / rect.height - .5;
      gsap.to(image, { x: x * 8, y: y * 6, scale: .975, duration: .8, ease: "power3.out", overwrite: "auto" });
    });
    visual.addEventListener("pointerleave", () => {
      if (hasGSAP) gsap.to(image, { x: 0, y: 0, scale: .965, duration: 1, ease: "power3.out" });
    });

    new MutationObserver(() => {
      if (!hasGSAP) return;
      gsap.fromTo(image, { autoAlpha: 0, scale: .94 }, { autoAlpha: 1, scale: .965, duration: .8, ease: "power3.out" });
    }).observe(image, { attributes: true, attributeFilter: ["src"] });
  }

  function initJourneySequence() {
    const section = q("#journey");
    const track = q(".journey__track");
    const cards = qa(".journey-card");
    if (!section || !track || !cards.length || innerWidth <= 760 || reducedMotion || !hasGSAP || !hasScrollTrigger) return;

    gsap.registerPlugin(ScrollTrigger);
    const caption = document.createElement("div");
    caption.className = "journey-stage-caption";
    caption.setAttribute("aria-live", "polite");
    caption.innerHTML = "<strong></strong><span></span>";
    track.parentElement.append(caption);

    const skip = document.createElement("button");
    skip.className = "journey-skip";
    skip.type = "button";
    skip.textContent = document.documentElement.dir === "rtl" ? "عرض المسار الكامل" : "View complete journey";
    track.parentElement.append(skip);

    const title = q("strong", caption);
    const copy = q("span", caption);
    const progress = q(".journey__progress span");
    let currentStage = -1;
    let completed = false;

    const slotFor = (index) => {
      const width = Math.min(innerWidth * .82, 1060);
      const gap = width / (cards.length - 1);
      return -width / 2 + gap * index;
    };

    function settleAll(animated = true) {
      completed = true;
      currentStage = cards.length - 1;
      const scale = innerWidth < 1050 ? .48 : .57;
      cards.forEach((card, index) => {
        card.classList.remove("is-featured");
        card.classList.add("is-settled");
        gsap.to(card, {
          x: slotFor(index), y: 118, z: -80,
          scale, rotateX: 0, rotateY: 0,
          autoAlpha: 1, filter: "blur(0px)",
          duration: animated ? .75 : 0,
          ease: "power3.out"
        });
      });
      if (progress) gsap.to(progress, { scaleX: 1, duration: animated ? .65 : 0 });
      gsap.to(caption, { autoAlpha: 0, y: -12, duration: animated ? .35 : 0 });
      skip.style.display = "none";
    }

    function feature(index) {
      if (completed || index === currentStage) return;
      currentStage = index;
      cards.forEach((card, cardIndex) => {
        card.classList.toggle("is-featured", cardIndex === index);
        card.classList.toggle("is-settled", cardIndex < index);

        if (cardIndex < index) {
          gsap.to(card, {
            x: slotFor(cardIndex), y: 118, z: -120,
            scale: innerWidth < 1050 ? .46 : .54,
            rotateX: 0, rotateY: 0,
            autoAlpha: 1, filter: "blur(0px)",
            duration: .72, ease: "power3.out"
          });
        } else if (cardIndex === index) {
          gsap.fromTo(card,
            { x: 0, y: 0, z: -1100, scale: .42, rotateX: 11, autoAlpha: .08, filter: "blur(14px)" },
            { x: 0, y: 0, z: 0, scale: 1.08, rotateX: 0, autoAlpha: 1, filter: "blur(0px)", duration: 1, ease: "power4.out" }
          );
        } else {
          gsap.set(card, { x: 0, y: 0, z: -1100, scale: .42, autoAlpha: 0, filter: "blur(14px)" });
        }
      });

      const active = cards[index];
      title.textContent = q("h3", active)?.textContent || "";
      copy.textContent = q("p", active)?.textContent || "";
      gsap.fromTo(caption, { y: 12, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .55, ease: "power3.out" });
      if (progress) gsap.to(progress, { scaleX: index / (cards.length - 1), duration: .55, ease: "power2.out" });
    }

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate(self) {
        if (completed) return;
        const raw = Math.min(.999, Math.max(0, self.progress));
        const stage = Math.min(cards.length - 1, Math.floor(raw * cards.length));
        feature(stage);
        if (raw > .965) settleAll(true);
      },
      onLeave: () => settleAll(false),
      onEnterBack: () => { if (!completed) feature(Math.max(0, currentStage)); }
    });

    skip.addEventListener("click", () => {
      settleAll(true);
      trigger.disable(false);
    });

    section.addEventListener("wheel", (event) => {
      if (Math.abs(event.deltaY) > 140 && currentStage >= 0 && !completed) settleAll(true);
    }, { passive: true, once: true });

    new MutationObserver(() => {
      skip.textContent = document.documentElement.dir === "rtl" ? "عرض المسار الكامل" : "View complete journey";
      if (currentStage >= 0 && !completed) feature(currentStage);
    }).observe(document.documentElement, { attributes: true, attributeFilter: ["dir", "lang"] });

    feature(0);
  }

  function buildStoryTransition() {
    const overlay = document.createElement("div");
    overlay.className = "story-transition-v37";
    overlay.setAttribute("role", "status");
    overlay.setAttribute("aria-live", "polite");
    overlay.innerHTML = `
      <div class="story-transition-v37__inner">
        <img class="story-transition-v37__symbol" src="assets/brand/samt-symbol.svg" alt="" />
        <p class="story-transition-v37__word">سَمْت</p>
        <h2 class="story-transition-v37__title"></h2>
        <div class="story-transition-v37__line"></div>
        <p class="story-transition-v37__quote"></p>
      </div>
      <button class="story-transition-v37__skip" type="button"></button>`;
    document.body.append(overlay);
    return overlay;
  }

  function transitionCopy(overlay) {
    const ar = document.documentElement.dir === "rtl";
    q(".story-transition-v37__title", overlay).textContent = ar ? "قصة سَمْت" : "The Story Behind the Name";
    q(".story-transition-v37__quote", overlay).innerHTML = ar
      ? "لكل قائد وجهة...<br>ولكل وجهة سَمْت."
      : "Every leader begins with a direction.<br>Every direction begins with a meaning.";
    q(".story-transition-v37__skip", overlay).textContent = ar ? "تخطّي" : "Skip";
  }

  function initStoryTransition() {
    if (isStoryPage) {
      if (sessionStorage.getItem("samt-story-transition") === "1") {
        sessionStorage.removeItem("samt-story-transition");
        document.documentElement.classList.add("story-arrival-v37");
        if (hasGSAP && !reducedMotion) {
          gsap.fromTo(".story-main", { autoAlpha: 0, scale: 1.015 }, { autoAlpha: 1, scale: 1, duration: 1.1, ease: "power3.out" });
        }
      }
      return;
    }

    const links = qa('a[href="story-of-samt.html"], a[href$="/story-of-samt.html"]');
    if (!links.length) return;
    const overlay = buildStoryTransition();
    transitionCopy(overlay);
    let navigating = false;
    let timer = 0;

    const complete = () => {
      if (!navigating) return;
      clearTimeout(timer);
      try { sessionStorage.setItem("samt-story-transition", "1"); } catch (_) {}
      location.href = "story-of-samt.html";
    };

    const play = () => {
      if (navigating) return;
      navigating = true;
      transitionCopy(overlay);
      overlay.classList.add("is-active");
      document.body.style.overflow = "hidden";
      if (!hasGSAP || reducedMotion) {
        overlay.style.opacity = "1";
        timer = setTimeout(complete, reducedMotion ? 700 : 3400);
        return;
      }
      const tl = gsap.timeline();
      tl.to(overlay, { autoAlpha: 1, duration: .45, ease: "power2.out" })
        .from(".story-transition-v37__symbol", { y: 26, scale: .72, rotation: -7, autoAlpha: 0, duration: .8, ease: "back.out(1.7)" }, "-=.08")
        .from(".story-transition-v37__word", { y: 22, autoAlpha: 0, duration: .62, ease: "power3.out" }, "-=.38")
        .from(".story-transition-v37__title", { y: 18, autoAlpha: 0, duration: .55 }, "-=.28")
        .to(".story-transition-v37__line", { scaleX: 1, duration: .7, ease: "power3.out" }, "-=.22")
        .from(".story-transition-v37__quote", { y: 16, autoAlpha: 0, duration: .62 }, "-=.32");
      timer = setTimeout(complete, 3800);
    };

    links.forEach(link => link.addEventListener("click", event => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      play();
    }));

    q(".story-transition-v37__skip", overlay).addEventListener("click", complete);
    document.addEventListener("keydown", event => { if (navigating && event.key === "Escape") complete(); });
    overlay.addEventListener("wheel", complete, { passive: true, once: true });
    overlay.addEventListener("pointerdown", event => {
      if (event.target.closest(".story-transition-v37__skip")) return;
      if (navigating) complete();
    });
  }

  function init() {
    initHeroLanguageComposition();
    initStationArtworkMotion();
    initJourneySequence();
    initStoryTransition();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
})();
