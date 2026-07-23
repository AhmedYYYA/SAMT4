(() => {
  "use strict";
  const q = (s, scope = document) => scope.querySelector(s);
  const qa = (s, scope = document) => [...scope.querySelectorAll(s)];
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hasGSAP = typeof window.gsap !== "undefined";
  const hasScrollTrigger = typeof window.ScrollTrigger !== "undefined";
  let currentLanguage = "en";

  const i18n = {
    en: {
      "nav.home": "Home", "nav.programme": "Programme", "nav.stations": "Preparation Stations", "nav.story": "Story of SAMT",
      "brand.descriptor": "Strategic Advancement,<br />Management & Transformation",
      "story.kicker": "The meaning behind the name", "story.word": "SAMT", "story.title": "The Story of SAMT",
      "story.lead": "An authentic Arabic word. A contemporary leadership identity.", "story.note": "English version",
      "footer.rights": "All rights reserved.", "footer.top": "Back to top"
    },
    ar: {
      "nav.home": "الرئيسية", "nav.programme": "البرنامج", "nav.stations": "محطات الإعداد", "nav.story": "قصة سَمْت",
      "brand.descriptor": "التقدم الاستراتيجي،<br />الإدارة والتحول",
      "story.kicker": "المعنى الكامن خلف الاسم", "story.word": "سَمْت", "story.title": "قصة سَمْت",
      "story.lead": "كلمة عربية أصيلة، وهوية قيادية معاصرة.", "story.note": "النسخة العربية",
      "footer.rights": "جميع الحقوق محفوظة.", "footer.top": "العودة إلى الأعلى"
    }
  };

  function setLanguage(lang, animate = true) {
    currentLanguage = lang === "ar" ? "ar" : "en";
    document.documentElement.lang = currentLanguage;
    document.documentElement.dir = currentLanguage === "ar" ? "rtl" : "ltr";
    qa("[data-i18n]").forEach(el => { const value = i18n[currentLanguage][el.dataset.i18n]; if (value !== undefined) el.textContent = value; });
    qa("[data-i18n-html]").forEach(el => { const value = i18n[currentLanguage][el.dataset.i18nHtml]; if (value !== undefined) el.innerHTML = value; });
    qa("[data-story-lang]").forEach(el => { el.hidden = el.dataset.storyLang !== currentLanguage; });
    document.title = currentLanguage === "ar" ? "قصة سَمْت" : "The Story of SAMT";
    q(".language-toggle")?.setAttribute("aria-label", currentLanguage === "ar" ? "Switch to English" : "التبديل إلى العربية");
    try { localStorage.setItem("samt-language", currentLanguage); } catch (_) {}
    if (animate && hasGSAP && !reducedMotion) {
      gsap.fromTo(".story-hero__inner", { x: currentLanguage === "ar" ? 54 : -54, autoAlpha: .2 }, { x: 0, autoAlpha: 1, duration: .8, ease: "power3.out" });
      gsap.fromTo(`[data-story-lang="${currentLanguage}"] .story-section`, { y: 22, autoAlpha: .25 }, { y: 0, autoAlpha: 1, duration: .65, stagger: .035, ease: "power3.out", clearProps: "all" });
    }
    requestAnimationFrame(() => window.ScrollTrigger?.refresh());
  }

  function initLanguage() {
    let stored = "en";
    try { stored = localStorage.getItem("samt-language") || "en"; } catch (_) {}
    setLanguage(stored, false);
    q(".language-toggle")?.addEventListener("click", () => setLanguage(currentLanguage === "en" ? "ar" : "en"));
  }

  function initMenu() {
    const toggle = q(".menu-toggle"); const menu = q(".mobile-menu");
    const close = () => { menu?.classList.remove("is-open"); menu?.setAttribute("aria-hidden", "true"); toggle?.setAttribute("aria-expanded", "false"); document.body.classList.remove("menu-open"); };
    toggle?.addEventListener("click", () => { const open = !menu?.classList.contains("is-open"); menu?.classList.toggle("is-open", open); menu?.setAttribute("aria-hidden", String(!open)); toggle.setAttribute("aria-expanded", String(open)); document.body.classList.toggle("menu-open", open); });
    q(".mobile-menu__backdrop")?.addEventListener("click", close);
    qa(".mobile-menu a").forEach(a => a.addEventListener("click", close));
    addEventListener("keydown", e => { if (e.key === "Escape") close(); });
  }

  function initParticles() {
    const canvas = q("#particle-canvas"); if (!canvas || reducedMotion) return;
    const ctx = canvas.getContext("2d"); let particles = [];
    function resize() { const dpr = Math.min(devicePixelRatio || 1, 2); canvas.width = innerWidth*dpr; canvas.height = innerHeight*dpr; canvas.style.width = `${innerWidth}px`; canvas.style.height = `${innerHeight}px`; ctx.setTransform(dpr,0,0,dpr,0,0); particles = Array.from({length:Math.min(90,Math.floor(innerWidth/18))},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,r:Math.random()*1.1+.25,v:Math.random()*.12+.025,a:Math.random()*.42+.12})); }
    function draw(){ ctx.clearRect(0,0,innerWidth,innerHeight); particles.forEach(p=>{p.y-=p.v;if(p.y<-4){p.y=innerHeight+4;p.x=Math.random()*innerWidth;}ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle=`rgba(241,217,154,${p.a})`;ctx.fill();});requestAnimationFrame(draw); }
    resize(); draw(); addEventListener("resize",resize);
  }

  function initMotion() {
    if (!hasGSAP || reducedMotion) return;
    gsap.from(".site-header", { y:-28, autoAlpha:0, duration:.8, ease:"power3.out" });
    gsap.from(".story-hero__inner > *", { y:34, autoAlpha:0, duration:.85, stagger:.11, ease:"power4.out", delay:.15 });
    gsap.from(".story-ascent path", { strokeDasharray:1200, strokeDashoffset:1200, duration:2.1, stagger:.15, ease:"power2.out" });
    if (hasScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
      qa(".story-section").forEach(section => gsap.from(section.querySelectorAll("h2,.story-section__body"), { y:42, autoAlpha:0, duration:.9, stagger:.12, ease:"power3.out", scrollTrigger:{trigger:section,start:"top 80%",once:true} }));
      ScrollTrigger.create({ start:80, onUpdate:self => q(".site-header")?.classList.toggle("is-scrolled", self.scroll()>80) });
    }
  }

  initLanguage(); initMenu(); initParticles(); initMotion();
})();