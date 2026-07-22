(() => {
  "use strict";

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hasGSAP = typeof window.gsap !== "undefined";
  const hasScrollTrigger = typeof window.ScrollTrigger !== "undefined";
  const hasLenis = typeof window.Lenis !== "undefined";

  if (!hasGSAP || !hasScrollTrigger) {
    document.body.classList.remove("is-loading");
    document.querySelector(".loader")?.classList.add("is-hidden");
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  let lenis = null;
  if (hasLenis && !reducedMotion) {
    lenis = new Lenis({ lerp: 0.1, smoothWheel: true, smoothTouch: false, wheelMultiplier: 0.92 });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  const q = (selector, scope = document) => scope.querySelector(selector);
  const qa = (selector, scope = document) => [...scope.querySelectorAll(selector)];

  /* Loader */
  const loader = q(".loader");
  const loaderBar = q(".loader__bar");
  const loaderValue = q(".loader__value");
  const loading = { value: 0 };

  gsap.to(loading, {
    value: 100,
    duration: 1.55,
    ease: "power2.inOut",
    onUpdate: () => {
      const value = Math.round(loading.value);
      loaderBar.style.width = `${value}%`;
      loaderValue.textContent = `${value}%`;
    },
    onComplete: () => {
      document.body.classList.remove("is-loading");
      loader.classList.add("is-hidden");
      introAnimation();
      ScrollTrigger.refresh();
    }
  });

  function introAnimation() {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    tl.from(".site-header", { y: -32, autoAlpha: 0, duration: .9 })
      .from(".hero__eyebrow", { y: 24, autoAlpha: 0, duration: .7 }, "-=.45")
      .from(".hero__title span", { yPercent: 115, autoAlpha: 0, stagger: .12, duration: 1.1 }, "-=.35")
      .from(".hero__arabic, .hero__summary", { y: 26, autoAlpha: 0, stagger: .12, duration: .8 }, "-=.55")
      .from(".hero__actions > *", { y: 18, autoAlpha: 0, stagger: .1, duration: .6 }, "-=.45")
      .from(".hero__identity", { x: 45, autoAlpha: 0, duration: 1 }, "-=.7")
      .from(".scroll-cue", { y: 18, autoAlpha: 0, duration: .55 }, "-=.4");

    qa(".hero-route").forEach((path, index) => {
      const length = path.getTotalLength();
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      gsap.to(path, { strokeDashoffset: 0, duration: 1.8 + index * .22, delay: .35 + index * .12, ease: "power2.out" });
    });

    gsap.fromTo(".command-star", { scale: 0, rotation: -35 }, { scale: 1, rotation: 0, duration: 1.2, delay: 1.05, ease: "back.out(2)" });
  }

  /* Route followers */
  function animateFollower(pathSelector, followerSelector, duration, delay = 0) {
    const path = q(pathSelector);
    const follower = q(followerSelector);
    if (!path || !follower || reducedMotion) return;
    const length = path.getTotalLength();
    const state = { progress: 0 };
    gsap.to(state, {
      progress: 1,
      duration,
      delay,
      repeat: -1,
      repeatDelay: 1.2,
      ease: "none",
      onUpdate: () => {
        const point = path.getPointAtLength(length * state.progress);
        follower.setAttribute("cx", point.x);
        follower.setAttribute("cy", point.y);
      }
    });
  }
  animateFollower("#route-1", ".route-follower--1", 7.6, 1.1);
  animateFollower("#route-2", ".route-follower--2", 9.2, 2.4);
  animateFollower("#route-3", ".route-follower--3", 10.8, 3.1);

  gsap.to(".command-star", { scale: 1.13, duration: 1.8, repeat: -1, yoyo: true, ease: "sine.inOut" });
  gsap.to(".ambient__aurora--gold", { xPercent: -18, yPercent: 16, duration: 13, repeat: -1, yoyo: true, ease: "sine.inOut" });
  gsap.to(".ambient__aurora--blue", { xPercent: 16, yPercent: -12, duration: 17, repeat: -1, yoyo: true, ease: "sine.inOut" });

  /* Scroll progress and header */
  gsap.to(".page-progress span", {
    scaleX: 1,
    ease: "none",
    scrollTrigger: { trigger: document.documentElement, start: "top top", end: "bottom bottom", scrub: true }
  });

  ScrollTrigger.create({
    start: 80,
    onUpdate: (self) => q(".site-header").classList.toggle("is-scrolled", self.scroll() > 80)
  });

  gsap.to(".scroll-cue", {
    y: 24,
    autoAlpha: 0,
    ease: "none",
    scrollTrigger: { trigger: ".hero", start: "top top", end: "25% top", scrub: true }
  });

  gsap.to(".hero__copy", {
    yPercent: 16,
    autoAlpha: .12,
    ease: "none",
    scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1 }
  });
  gsap.to(".hero__identity", {
    yPercent: -12,
    autoAlpha: .18,
    ease: "none",
    scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1 }
  });
  gsap.to(".hero-routes", {
    yPercent: 10,
    scale: 1.04,
    ease: "none",
    scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1 }
  });
  gsap.to(".hero__earth", {
    yPercent: 18,
    scale: 1.06,
    ease: "none",
    scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1.2 }
  });

  /* Generic reveals */
  qa(".programme__intro, .programme__statement, .stations__header > *, .station-console, .command__inner > *").forEach((element) => {
    gsap.from(element, {
      y: 50,
      autoAlpha: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: { trigger: element, start: "top 86%", once: true }
    });
  });

  qa(".programme__metrics article").forEach((card, index) => {
    gsap.from(card, {
      y: 34,
      autoAlpha: 0,
      delay: index * .08,
      duration: .75,
      scrollTrigger: { trigger: ".programme__metrics", start: "top 84%", once: true }
    });
  });

  /* Journey horizontal pinned animation */
  const journeyTrack = q(".journey__track");
  const journey = q(".journey");
  function journeyDistance() { return Math.max(0, journeyTrack.scrollWidth - window.innerWidth); }
  if (journeyTrack && journey) {
    const journeyTween = gsap.to(journeyTrack, {
      x: () => -journeyDistance(),
      ease: "none",
      scrollTrigger: { trigger: journey, start: "top top", end: "bottom bottom", scrub: 1, invalidateOnRefresh: true }
    });
    gsap.to(".journey__progress span", {
      scaleX: 1,
      ease: "none",
      scrollTrigger: { trigger: journey, start: "top top", end: "bottom bottom", scrub: true }
    });
    qa(".journey-card").forEach((card) => {
      gsap.from(card, {
        y: 60,
        autoAlpha: .28,
        scale: .94,
        ease: "none",
        scrollTrigger: { trigger: card, containerAnimation: journeyTween, start: "left 88%", end: "center center", scrub: true }
      });
    });
  }

  /* Station motion */
  gsap.from(".station-stage__content", {
    x: 70,
    autoAlpha: 0,
    duration: 1.15,
    ease: "power4.out",
    scrollTrigger: { trigger: ".station-stage", start: "top 72%", once: true }
  });
  gsap.from(".station-stage__visual", {
    scale: .94,
    autoAlpha: 0,
    duration: 1.25,
    ease: "power4.out",
    scrollTrigger: { trigger: ".station-stage", start: "top 72%", once: true }
  });
  gsap.to(".stations__backdrop", {
    yPercent: 12,
    ease: "none",
    scrollTrigger: { trigger: ".stations", start: "top bottom", end: "bottom top", scrub: 1 }
  });

  /* Command section */
  gsap.from(".command__figure", {
    y: 140,
    autoAlpha: 0,
    duration: 1.4,
    ease: "power4.out",
    scrollTrigger: { trigger: ".command", start: "top 66%", once: true }
  });
  gsap.from(".command__light", {
    scaleY: 0,
    transformOrigin: "top",
    duration: 1.5,
    ease: "power3.out",
    scrollTrigger: { trigger: ".command", start: "top 72%", once: true }
  });

  /* Smooth anchors */
  qa('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const selector = link.getAttribute("href");
      const target = selector && q(selector);
      if (!target) return;
      event.preventDefault();
      if (lenis) lenis.scrollTo(target, { duration: 1.2 });
      else target.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
      closeMenu();
    });
  });

  /* Magnetic controls */
  if (!reducedMotion) {
    qa(".magnetic").forEach((button) => {
      button.addEventListener("pointermove", (event) => {
        const rect = button.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;
        gsap.to(button, { x: x * .15, y: y * .15, duration: .3, ease: "power3.out" });
      });
      button.addEventListener("pointerleave", () => gsap.to(button, { x: 0, y: 0, duration: .6, ease: "elastic.out(1,.45)" }));
    });
  }

  /* Cursor */
  const cursorDot = q(".cursor--dot");
  const cursorRing = q(".cursor--ring");
  if (cursorDot && cursorRing && matchMedia("(pointer:fine)").matches) {
    let mouseX = innerWidth / 2, mouseY = innerHeight / 2;
    let ringX = mouseX, ringY = mouseY;
    addEventListener("pointermove", (event) => {
      mouseX = event.clientX; mouseY = event.clientY;
      gsap.set(cursorDot, { x: mouseX, y: mouseY });
    });
    gsap.ticker.add(() => {
      ringX += (mouseX - ringX) * .18;
      ringY += (mouseY - ringY) * .18;
      gsap.set(cursorRing, { x: ringX, y: ringY });
    });
    qa("[data-cursor]").forEach((el) => {
      el.addEventListener("mouseenter", () => document.body.classList.add(`cursor-${el.dataset.cursor}`));
      el.addEventListener("mouseleave", () => document.body.classList.remove(`cursor-${el.dataset.cursor}`));
    });
  }

  /* Menu */
  const menuToggle = q(".menu-toggle");
  const mobileMenu = q(".mobile-menu");
  function openMenu() {
    menuToggle.setAttribute("aria-expanded", "true");
    mobileMenu.classList.add("is-open");
    mobileMenu.setAttribute("aria-hidden", "false");
    gsap.to(".mobile-menu__backdrop", { opacity: 1, duration: .35 });
    gsap.to(".mobile-menu__panel", { x: 0, duration: .7, ease: "power4.out" });
  }
  function closeMenu() {
    if (!mobileMenu.classList.contains("is-open")) return;
    menuToggle.setAttribute("aria-expanded", "false");
    gsap.to(".mobile-menu__backdrop", { opacity: 0, duration: .3 });
    gsap.to(".mobile-menu__panel", {
      x: document.documentElement.dir === "rtl" ? "-100%" : "100%",
      duration: .55,
      ease: "power4.in",
      onComplete: () => { mobileMenu.classList.remove("is-open"); mobileMenu.setAttribute("aria-hidden", "true"); }
    });
  }
  menuToggle?.addEventListener("click", () => mobileMenu.classList.contains("is-open") ? closeMenu() : openMenu());
  q(".mobile-menu__backdrop")?.addEventListener("click", closeMenu);
  qa(".mobile-menu a").forEach((a) => a.addEventListener("click", closeMenu));

  /* Modals */
  qa("[data-modal-open]").forEach((button) => {
    button.addEventListener("click", () => {
      const modal = document.getElementById(button.dataset.modalOpen);
      if (!modal) return;
      modal.showModal();
      gsap.fromTo(modal, { y: 50, autoAlpha: 0, scale: .97 }, { y: 0, autoAlpha: 1, scale: 1, duration: .55, ease: "power4.out" });
      lenis?.stop();
    });
  });
  qa("[data-modal-close]").forEach((button) => button.addEventListener("click", () => closeModal(button.closest("dialog"))));
  qa("dialog.modal").forEach((modal) => {
    modal.addEventListener("click", (event) => { if (event.target === modal) closeModal(modal); });
    modal.addEventListener("cancel", (event) => { event.preventDefault(); closeModal(modal); });
  });
  function closeModal(modal) {
    if (!modal?.open) return;
    gsap.to(modal, { y: 30, autoAlpha: 0, duration: .3, onComplete: () => { modal.close(); gsap.set(modal, { clearProps: "all" }); lenis?.start(); } });
  }

  /* Bilingual content */
  const translations = {
    en: {
      "loader.message": "Preparing the ascent",
      "nav.programme": "Programme", "nav.journey": "The Journey", "nav.stations": "Preparation Stations", "nav.command": "Command Readiness",
      "hero.kicker": "From Potential to Command", "hero.line1": "Prepared to Lead.", "hero.line2": "Ready to <em>Command.</em>", "hero.arabic": "من الإمكانات إلى القيادة",
      "hero.summary": "SAMT identifies exceptional talent and prepares selected individuals for future command, strategic leadership and greater institutional responsibility.",
      "hero.discover": "Discover SAMT", "hero.overview": "Programme Overview", "hero.scroll": "Scroll to explore",
      "programme.kicker": "An elite leadership programme", "programme.title": "Selection is earned.<br /><em>Leadership is formed.</em>",
      "programme.copy": "SAMT is designed for exceptional professionals who demonstrate the character, intellect, judgement, discipline and ambition required to assume future command and senior leadership responsibilities.",
      "programme.metric1": "Selected fellows", "programme.metric2": "International stations", "programme.metric3": "Command standard",
      "journey.kicker": "The leadership journey", "journey.title": "A disciplined path from <em>potential to command.</em>", "journey.note": "Every stage raises the standard of judgement, character, exposure and responsibility.",
      "journey.s1.title": "Potential", "journey.s1.copy": "Exceptional potential is identified.",
      "journey.s2.title": "Selection", "journey.s2.copy": "A rigorous and selective admission process.",
      "journey.s3.title": "Formation", "journey.s3.copy": "Core capability and leadership judgement are developed.",
      "journey.s4.title": "Exposure", "journey.s4.copy": "National and international environments broaden perspective.",
      "journey.s5.title": "Transformation", "journey.s5.copy": "Leadership readiness is measured and strengthened.",
      "journey.s6.title": "Command Readiness", "journey.s6.copy": "Prepared to lead. Ready to command.",
      "stations.kicker": "Preparation stations", "stations.title": "Global exposure.<br /><em>Strategic perspective.</em>", "stations.copy": "Participants engage with leading institutions, sectors and operating environments that shape global leadership.",
      "station.current": "Current station", "station.title": "United Arab Emirates", "station.subtitle": "Foundation, strategic orientation and national context",
      "station.body": "The national foundation phase builds a common understanding of the state, leadership expectations, strategic priorities and the institutional environment in which future responsibility will be exercised.",
      "station.durationLabel": "Duration", "station.focusLabel": "Primary focus", "station.focus": "Leadership foundation",
      "station.point1": "Strategic leadership and national vision", "station.point2": "Defence, aviation and institutional ecosystems", "station.point3": "Capability development and transformation frameworks", "station.details": "View Station Details",
      "station.modal.hosts": "Proposed hosts", "station.modal.hostsCopy": "Selected national leadership, defence, aviation, technology and institutional partners.",
      "station.modal.learning": "Learning focus", "station.modal.learningCopy": "Strategic leadership, institutional awareness, capability development and national security context.",
      "station.modal.outcomes": "Expected outcomes", "station.modal.outcomesCopy": "A common leadership foundation, stronger strategic judgement and readiness for international exposure.",
      "command.kicker": "The standard ahead", "command.title": "The future needs leaders.<br /><em>Are you ready?</em>", "command.arabic": "المستقبل يحتاج قادة، هل أنت مستعد؟", "command.cta": "Learn About Admission",
      "modal.programme.kicker": "Programme overview", "modal.programme.title": "Selected for potential.<br /><em>Shaped for command.</em>",
      "modal.programme.copy": "SAMT is a highly selective leadership programme for exceptional professionals who demonstrate the judgement, character, discipline and ambition required for future command and senior strategic responsibility.",
      "footer.rights": "All rights reserved.", "footer.top": "Back to top"
    },
    ar: {
      "loader.message": "تهيئة مسار الصعود",
      "nav.programme": "البرنامج", "nav.journey": "رحلة الإعداد", "nav.stations": "محطات الإعداد", "nav.command": "الجاهزية للقيادة",
      "hero.kicker": "من الإمكانات إلى القيادة", "hero.line1": "مؤهلون للقيادة.", "hero.line2": "جاهزون <em>لتحمل المسؤولية.</em>", "hero.arabic": "من الإمكانات إلى القيادة",
      "hero.summary": "يستقطب برنامج سَمْت الكفاءات الاستثنائية ويؤهل المشاركين المختارين لتولي مسؤوليات القيادة المستقبلية وصناعة القرار الاستراتيجي وتحقيق أثر مؤسسي أكبر.",
      "hero.discover": "اكتشف سَمْت", "hero.overview": "نبذة عن البرنامج", "hero.scroll": "مرر للاستكشاف",
      "programme.kicker": "برنامج نوعي لإعداد القيادات", "programme.title": "الاختيار يُستحق.<br /><em>والقيادة تُصقل.</em>",
      "programme.copy": "صُمم سَمْت للكفاءات الاستثنائية التي تمتلك السمات والقدرات الفكرية والحكم المهني والانضباط والطموح اللازم لتولي مسؤوليات القيادة العليا مستقبلاً.",
      "programme.metric1": "منتسبون مختارون", "programme.metric2": "محطات دولية", "programme.metric3": "معيار قيادي واحد",
      "journey.kicker": "رحلة الإعداد القيادي", "journey.title": "مسار منضبط من <em>الإمكانات إلى القيادة.</em>", "journey.note": "ترفع كل مرحلة مستوى الحكم والسمات القيادية والتعرض والمسؤولية.",
      "journey.s1.title": "الإمكانات", "journey.s1.copy": "اكتشاف الإمكانات الاستثنائية.",
      "journey.s2.title": "الاختيار", "journey.s2.copy": "عملية قبول دقيقة وعالية الانتقائية.",
      "journey.s3.title": "الإعداد", "journey.s3.copy": "تطوير القدرات الأساسية والحكم القيادي.",
      "journey.s4.title": "التعرض النوعي", "journey.s4.copy": "بيئات وطنية ودولية توسع المنظور.",
      "journey.s5.title": "التحول", "journey.s5.copy": "قياس الجاهزية القيادية وتعزيزها.",
      "journey.s6.title": "الجاهزية للقيادة", "journey.s6.copy": "مؤهلون للقيادة وجاهزون لتحمل المسؤولية.",
      "stations.kicker": "محطات الإعداد", "stations.title": "تعرض عالمي.<br /><em>ومنظور استراتيجي.</em>", "stations.copy": "ينخرط المشاركون مع مؤسسات وقطاعات وبيئات تشغيلية رائدة تسهم في تشكيل القيادة العالمية.",
      "station.current": "المحطة الحالية", "station.title": "دولة الإمارات العربية المتحدة", "station.subtitle": "الأساس الوطني والتوجيه الاستراتيجي والسياق المؤسسي",
      "station.body": "تبني مرحلة التأسيس الوطني فهماً مشتركاً للدولة وتوقعات القيادة والأولويات الاستراتيجية والبيئة المؤسسية التي ستُمارس ضمنها المسؤوليات المستقبلية.",
      "station.durationLabel": "المدة", "station.focusLabel": "التركيز الرئيس", "station.focus": "الأساس القيادي",
      "station.point1": "القيادة الاستراتيجية والرؤية الوطنية", "station.point2": "منظومات الدفاع والطيران والمؤسسات", "station.point3": "أطر تطوير القدرات والتحول", "station.details": "عرض تفاصيل المحطة",
      "station.modal.hosts": "الجهات المستضيفة المقترحة", "station.modal.hostsCopy": "جهات وطنية مختارة في القيادة والدفاع والطيران والتقنية والعمل المؤسسي.",
      "station.modal.learning": "محاور التعلم", "station.modal.learningCopy": "القيادة الاستراتيجية والوعي المؤسسي وتطوير القدرات وسياق الأمن الوطني.",
      "station.modal.outcomes": "المخرجات المتوقعة", "station.modal.outcomesCopy": "أساس قيادي مشترك وحكم استراتيجي أقوى وجاهزية للتعرض الدولي.",
      "command.kicker": "المعيار القادم", "command.title": "المستقبل يحتاج قادة.<br /><em>هل أنت مستعد؟</em>", "command.arabic": "من الإمكانات إلى القيادة", "command.cta": "تعرّف إلى القبول",
      "modal.programme.kicker": "نبذة عن البرنامج", "modal.programme.title": "نختار الإمكانات.<br /><em>ونصقلها للقيادة.</em>",
      "modal.programme.copy": "سَمْت برنامج قيادي عالي الانتقائية للكفاءات الاستثنائية التي تمتلك الحكم والسمات والانضباط والطموح اللازم لمسؤوليات القيادة المستقبلية وصناعة القرار الاستراتيجي.",
      "footer.rights": "جميع الحقوق محفوظة.", "footer.top": "العودة إلى الأعلى"
    }
  };

  const languageToggle = q(".language-toggle");
  let language = localStorage.getItem("samt-language") || "en";
  function applyLanguage(nextLanguage) {
    language = nextLanguage;
    localStorage.setItem("samt-language", language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    qa("[data-i18n]").forEach((element) => {
      const value = translations[language][element.dataset.i18n];
      if (value) element.innerHTML = value;
    });
    closeMenu();
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }
  languageToggle?.addEventListener("click", () => applyLanguage(language === "en" ? "ar" : "en"));
  applyLanguage(language);

  /* Particle field */
  const canvas = q("#particle-canvas");
  const ctx = canvas?.getContext("2d");
  let particles = [];
  let frame = 0;
  function resizeCanvas() {
    if (!canvas || !ctx) return;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    canvas.width = innerWidth * dpr;
    canvas.height = innerHeight * dpr;
    canvas.style.width = `${innerWidth}px`;
    canvas.style.height = `${innerHeight}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.min(100, Math.max(38, Math.floor(innerWidth / 17)));
    particles = Array.from({ length: count }, () => ({ x: Math.random() * innerWidth, y: Math.random() * innerHeight, r: Math.random() * 1.35 + .2, vx: (Math.random() - .5) * .06, vy: Math.random() * .09 + .02, a: Math.random() * .32 + .04 }));
  }
  function drawParticles() {
    if (!ctx) return;
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    particles.forEach((p) => {
      p.x += p.vx; p.y -= p.vy;
      if (p.y < -5) { p.y = innerHeight + 5; p.x = Math.random() * innerWidth; }
      if (p.x < -5) p.x = innerWidth + 5;
      if (p.x > innerWidth + 5) p.x = -5;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fillStyle = `rgba(241,217,154,${p.a})`; ctx.fill();
    });
    frame = requestAnimationFrame(drawParticles);
  }
  if (canvas && ctx && !reducedMotion) { resizeCanvas(); drawParticles(); }

  let resizeTimer;
  addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { resizeCanvas(); ScrollTrigger.refresh(); }, 180);
  });
  addEventListener("keydown", (event) => {
    if (event.key === "Escape") { closeMenu(); qa("dialog[open]").forEach(closeModal); }
  });
  document.addEventListener("visibilitychange", () => {
    if (!canvas || reducedMotion) return;
    if (document.hidden) cancelAnimationFrame(frame); else drawParticles();
  });
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
})();
