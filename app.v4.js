(() => {
  "use strict";

  document.documentElement.classList.remove("no-js");
  document.documentElement.classList.add("js");

  const q = (selector, scope = document) => scope.querySelector(selector);
  const qa = (selector, scope = document) => [...scope.querySelectorAll(selector)];
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const saveData = navigator.connection?.saveData === true;
  const lowPower = saveData || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4);
  const isStoryPage = document.body.classList.contains("story-page");
  const state = { language: document.documentElement.lang === "ar" ? "ar" : "en", menuOpen: false, journeyComplete: false, journeyStage: -1, transitionActive: false };

  if (lowPower) document.body.dataset.performance = "reduced";

  const copy = {
    en: {
      skip: "Skip to content", navigation: "Navigation", "brand": "Strategic Advancement,<br>Management & Transformation",
      "nav.programme": "Programme", "nav.journey": "Journey", "nav.selection": "Selection", "nav.stations": "Preparation Stations", "nav.competencies": "Competencies", "nav.assessment": "Assessment", "nav.impact": "Impact", "nav.admission": "Admission", "nav.story": "Story of SAMT",
      "hero.kicker": "From Potential to Command", "hero.line1": "Prepared to Lead.", "hero.line2": "Ready to <em>Command.</em>", "hero.summary": "SAMT identifies exceptional talent and prepares selected individuals for future command, strategic leadership and greater institutional responsibility.", "hero.discover": "Discover SAMT", "hero.story": "Discover the Story", "hero.scroll": "Scroll to explore",
      "programme.kicker": "An elite leadership programme", "programme.title": "Selection is earned.<br><em>Leadership is formed.</em>", "programme.story": "Discover the Story of SAMT <span>↗</span>", "programme.copy": "SAMT is designed for exceptional professionals who demonstrate the character, intellect, judgement, discipline and ambition required to assume future command and senior leadership responsibilities.", "programme.quote": "Entry is earned. Development is demanding. Readiness is evidenced.", "programme.metric1": "Selected fellows", "programme.metric2": "International stations", "programme.metric3": "Full-time weeks", "programme.metric4": "Command standard",
      "journey.kicker": "The leadership journey", "journey.title": "A disciplined path from <em>potential to command.</em>", "journey.note": "Every stage raises the standard of judgement, character, exposure and responsibility.", "journey.skip": "View complete journey",
      "journey.s1.title": "Potential", "journey.s1.copy": "Exceptional potential is identified.", "journey.s2.title": "Selection", "journey.s2.copy": "A rigorous and selective admission process.", "journey.s3.title": "Formation", "journey.s3.copy": "Core capability and leadership judgement are developed.", "journey.s4.title": "Exposure", "journey.s4.copy": "National and international environments broaden perspective.", "journey.s5.title": "Transformation", "journey.s5.copy": "Leadership readiness is measured and strengthened.", "journey.s6.title": "Command Readiness", "journey.s6.copy": "Prepared to lead. Ready to command.",
      "selection.kicker": "Selecting the elite of the elite", "selection.title": "A leadership privilege.<br><em>Not a training seat.</em>", "selection.copy": "SAMT selects high-potential professionals through evidence, assessment and independent judgement.", "selection.g1": "Eligibility", "selection.g1c": "Minimum experience and documented performance.", "selection.g2": "Assessment Centre", "selection.g2c": "Analysis, collaboration and decision under pressure.", "selection.g3": "Executive Interview", "selection.g3c": "Motivation, humility, judgement and leadership potential.", "selection.g4": "Independent Endorsement", "selection.g4c": "Final decision by a multidisciplinary panel.",
      "stations.kicker": "Preparation stations", "stations.title": "Global exposure.<br><em>Strategic perspective.</em>", "stations.copy": "Participants engage with leading institutions, sectors and operating environments that shape global leadership.", "station.current": "Current station", "station.duration": "Duration", "station.focus": "Primary focus",
      "competencies.kicker": "Leadership maturity competencies", "competencies.title": "Built for command.<br><em>Trusted to decide.</em>", "competencies.c1": "Strategic Judgement", "competencies.c1s": "Read context, consequence and long-term institutional direction.", "competencies.c2": "Systems Thinking", "competencies.c2s": "Understand interdependence across people, capability and mission.", "competencies.c3": "Decision-Making Under Complexity", "competencies.c3s": "Balance mission, risk, time and incomplete information.", "competencies.c4": "Institutional Leadership", "competencies.c4s": "Align strategy, people and governance toward sustained impact.", "competencies.c5": "Innovation & Transformation", "competencies.c5s": "Convert emerging possibilities into executable institutional change.", "competencies.c6": "International Engagement", "competencies.c6s": "Build trust, perspective and strategic partnerships across cultures.",
      "assessment.kicker": "Assessment and governance", "assessment.title": "No progression without evidence.<br><em>No execution without governance.</em>", "assessment.copy": "Development is measured continuously and governed through clear authority, independent evidence and disciplined decision points.", "assessment.a1": "Baseline", "assessment.a1s": "Pre-programme capability profile", "assessment.a2": "Daily Evidence", "assessment.a2s": "Tasks, conduct and reflection", "assessment.a3": "Host Assessment", "assessment.a3s": "Independent observations", "assessment.a4": "Maturity Challenge", "assessment.a4s": "Decision and executive briefing", "assessment.a5": "Impact Project", "assessment.a5s": "Institutional result and follow-through",
      "impact.kicker": "Institutional impact", "impact.title": "Stronger leadership.<br><em>Stronger institutions.</em>", "impact.copy": "SAMT is measured by what changes after participants return: better judgement, stronger networks, executable transformation and sustained institutional value.", "impact.i1": "Measurable leadership growth", "impact.i1s": "Evidence across six command-oriented competencies.", "impact.i2": "Strategic networks", "impact.i2s": "National and international relationships built with purpose.", "impact.i3": "Transformation assignments", "impact.i3s": "Priority challenges converted into owned delivery plans.", "impact.i4": "Sustained institutional value", "impact.i4s": "Follow-up and impact measurement over twelve months.",
      "admission.kicker": "Admission", "admission.title": "Selected for potential.<br><em>Shaped for command.</em>", "admission.copy": "Participation is by institutional nomination and a rigorous selection process. Admission is not open enrolment.", "admission.cta": "Return to the beginning", "admission.c1": "Years of practical experience", "admission.c2": "Fellows selected per cohort", "admission.c3": "Full-time commitment", "admission.c4": "Independent final endorsement",
      "footer.rights": "All rights reserved.", "footer.top": "Back to top", "footer.disclaimer": "Concept website. Proposed partners and programme arrangements are subject to formal approval and agreement.",
      "transition.title": "The Story Behind the Name", "transition.quote": "Every leader begins with a direction.<br>Every direction begins with a meaning.", "transition.skip": "Skip"
    },
    ar: {
      skip: "انتقل إلى المحتوى", navigation: "التنقل", "brand": "التقدم الاستراتيجي،<br>الإدارة والتحول",
      "nav.programme": "البرنامج", "nav.journey": "الرحلة", "nav.selection": "الاختيار", "nav.stations": "محطات الإعداد", "nav.competencies": "الكفاءات", "nav.assessment": "التقييم", "nav.impact": "الأثر", "nav.admission": "القبول", "nav.story": "قصة سَمْت",
      "hero.kicker": "من الإمكانات إلى القيادة", "hero.line1": "مؤهلون للقيادة.", "hero.line2": "جاهزون <em>لتحمل المسؤولية.</em>", "hero.summary": "يكتشف برنامج سَمْت الكفاءات الاستثنائية ويؤهل المشاركين المختارين للقيادة المستقبلية وصناعة القرار الاستراتيجي وتحمل مسؤوليات مؤسسية أكبر.", "hero.discover": "اكتشف سَمْت", "hero.story": "اكتشف قصة سَمْت", "hero.scroll": "مرر للاستكشاف",
      "programme.kicker": "برنامج نوعي لإعداد القيادات", "programme.title": "الاختيار يُكتسب.<br><em>والقيادة تُصقل.</em>", "programme.story": "اكتشف قصة سَمْت <span>↗</span>", "programme.copy": "صُمم برنامج سَمْت للكفاءات الاستثنائية التي تمتلك السمات والقدرات والطموح اللازم لتحمل مسؤوليات القيادة المستقبلية وصناعة القرار الاستراتيجي.", "programme.quote": "الالتحاق يُكتسب، والتطوير يتطلب الالتزام، والجاهزية تثبتها الأدلة.", "programme.metric1": "مشاركون مختارون", "programme.metric2": "محطات دولية", "programme.metric3": "أسبوعاً بدوام كامل", "programme.metric4": "معيار قيادي واحد",
      "journey.kicker": "رحلة إعداد القيادة", "journey.title": "مسار منضبط من <em>الإمكانات إلى القيادة.</em>", "journey.note": "ترفع كل مرحلة مستوى الحكم والسمات والتعرض والمسؤولية.", "journey.skip": "عرض الرحلة كاملة",
      "journey.s1.title": "الإمكانات", "journey.s1.copy": "تُكتشف الإمكانات الاستثنائية.", "journey.s2.title": "الاختيار", "journey.s2.copy": "عملية قبول دقيقة وانتقائية.", "journey.s3.title": "الإعداد", "journey.s3.copy": "تُبنى القدرات الأساسية والحكم القيادي.", "journey.s4.title": "التعرض النوعي", "journey.s4.copy": "توسّع البيئات الوطنية والدولية المنظور.", "journey.s5.title": "التحول", "journey.s5.copy": "تُقاس الجاهزية القيادية وتُعزز.", "journey.s6.title": "الجاهزية للقيادة", "journey.s6.copy": "مؤهلون للقيادة وجاهزون لتحمل المسؤولية.",
      "selection.kicker": "اختيار نخبة النخبة", "selection.title": "امتياز قيادي.<br><em>وليس مقعداً تدريبياً.</em>", "selection.copy": "يختار سَمْت أصحاب الإمكانات العالية من خلال الأدلة والتقييم والحكم المستقل.", "selection.g1": "الأهلية", "selection.g1c": "الحد الأدنى من الخبرة والأداء الموثق.", "selection.g2": "مركز التقييم", "selection.g2c": "التحليل والتعاون واتخاذ القرار تحت الضغط.", "selection.g3": "المقابلة التنفيذية", "selection.g3c": "الدافعية والتواضع والحكم والإمكانات القيادية.", "selection.g4": "الاعتماد المستقل", "selection.g4c": "القرار النهائي بواسطة لجنة متعددة التخصصات.",
      "stations.kicker": "محطات الإعداد", "stations.title": "تعرض عالمي.<br><em>ومنظور استراتيجي.</em>", "stations.copy": "يتفاعل المشاركون مع مؤسسات وقطاعات وبيئات تشغيلية رائدة تسهم في تشكيل القيادة العالمية.", "station.current": "المحطة الحالية", "station.duration": "المدة", "station.focus": "التركيز الرئيس",
      "competencies.kicker": "كفاءات النضج القيادي", "competencies.title": "مبنيون للقيادة.<br><em>موثوقون لاتخاذ القرار.</em>", "competencies.c1": "الحكم الاستراتيجي", "competencies.c1s": "قراءة السياق والنتائج والاتجاه المؤسسي بعيد المدى.", "competencies.c2": "التفكير المنظومي", "competencies.c2s": "فهم الترابط بين الأفراد والقدرات والمهمة.", "competencies.c3": "اتخاذ القرار في التعقيد", "competencies.c3s": "الموازنة بين المهمة والمخاطر والوقت والمعلومات الناقصة.", "competencies.c4": "القيادة المؤسسية", "competencies.c4s": "مواءمة الاستراتيجية والأفراد والحوكمة نحو أثر مستدام.", "competencies.c5": "الابتكار والتحول", "competencies.c5s": "تحويل الإمكانات الناشئة إلى تغيير مؤسسي قابل للتنفيذ.", "competencies.c6": "التفاعل الدولي", "competencies.c6s": "بناء الثقة والمنظور والشراكات الاستراتيجية عبر الثقافات.",
      "assessment.kicker": "التقييم والحوكمة", "assessment.title": "لا تقدم دون دليل.<br><em>ولا تنفيذ دون حوكمة.</em>", "assessment.copy": "يُقاس التطوير باستمرار ويُحكم من خلال سلطة واضحة وأدلة مستقلة ونقاط قرار منضبطة.", "assessment.a1": "خط الأساس", "assessment.a1s": "ملف القدرات قبل البرنامج", "assessment.a2": "الأدلة اليومية", "assessment.a2s": "المهام والسلوك والتأمل", "assessment.a3": "تقييم الجهة المستضيفة", "assessment.a3s": "ملاحظات مستقلة", "assessment.a4": "تحدي النضج", "assessment.a4s": "القرار والإحاطة التنفيذية", "assessment.a5": "مشروع الأثر", "assessment.a5s": "النتيجة المؤسسية والمتابعة",
      "impact.kicker": "الأثر المؤسسي", "impact.title": "قيادة أقوى.<br><em>ومؤسسات أقوى.</em>", "impact.copy": "يُقاس سَمْت بما يتغير بعد عودة المشاركين: حكم أفضل وشبكات أقوى وتحول قابل للتنفيذ وقيمة مؤسسية مستدامة.", "impact.i1": "نمو قيادي قابل للقياس", "impact.i1s": "أدلة عبر ست كفاءات موجهة للقيادة.", "impact.i2": "شبكات استراتيجية", "impact.i2s": "علاقات وطنية ودولية مبنية بهدف.", "impact.i3": "مهام التحول", "impact.i3s": "تحويل التحديات ذات الأولوية إلى خطط تنفيذ مملوكة.", "impact.i4": "قيمة مؤسسية مستدامة", "impact.i4s": "متابعة وقياس للأثر على مدى اثني عشر شهراً.",
      "admission.kicker": "القبول", "admission.title": "مختارون للإمكانات.<br><em>ومُعدّون للقيادة.</em>", "admission.copy": "المشاركة بالترشيح المؤسسي وعبر عملية اختيار دقيقة، وليست تسجيلاً مفتوحاً.", "admission.cta": "العودة إلى البداية", "admission.c1": "سنوات من الخبرة العملية", "admission.c2": "مشاركون مختارون لكل دفعة", "admission.c3": "التزام بدوام كامل", "admission.c4": "اعتماد نهائي مستقل",
      "footer.rights": "جميع الحقوق محفوظة.", "footer.top": "العودة إلى الأعلى", "footer.disclaimer": "موقع تصوري. الجهات المقترحة وترتيبات البرنامج خاضعة للاعتماد والاتفاق الرسمي.",
      "transition.title": "قصة الاسم", "transition.quote": "لكل قائد وجهة...<br>ولكل وجهة سَمْت.", "transition.skip": "تخطّي"
    }
  };

  const stations = {
    en: {
      uae: { code: "UAE", title: "United Arab Emirates", subtitle: "National foundation, sovereign capability and transformation", body: "A three-week national foundation station connecting leadership formation with the UAE defence, aviation, advanced-technology and sustainability ecosystems.", duration: "3 weeks", focus: "National capability & transformation", points: ["Tawazun and national capability governance", "EDGE and GAL defence and aviation ecosystems", "TII, Masdar, emerging technology and sustainability"], image: "assets/stations/uae-animated-v3.4.svg", alt: "Animated United Arab Emirates preparation station" },
      uk: { code: "UK", title: "United Kingdom", subtitle: "Professional military education, governance and defence programmes", body: "A six-week station combining professional military education, leadership formation and exposure to institutions and companies supporting United Kingdom defence programmes.", duration: "6 weeks", focus: "Military education & defence programmes", points: ["RAF Cosford and professional air-force education", "Royal Military Academy Sandhurst and leadership formation", "Prime organisations supporting UK defence programmes"], image: "assets/stations/uk-animated-v3.4.svg", alt: "Animated United Kingdom preparation station" },
      france: { code: "FRANCE", title: "French Republic", subtitle: "European industry, partnerships and strategic engagement", body: "A three-week European station centred on industry, strategic partnerships and engagement with organisations operating through approved agreements.", duration: "3 weeks", focus: "European partnerships & industry", points: ["European defence-industry engagement", "Partnership, contract and stakeholder management", "Industrial cooperation and international business development"], image: "assets/stations/france-animated-v3.4.svg", alt: "Animated France preparation station" },
      usa: { code: "USA", title: "United States of America", subtitle: "Defence cooperation, acquisition and strategic education", body: "A four-week station focused on government-to-government cooperation, Foreign Military Sales, strategic education and defence acquisition ecosystems.", duration: "4 weeks", focus: "Defence cooperation & acquisition", points: ["Government-to-government and security-cooperation programmes", "Foreign Military Sales and acquisition processes", "Strategic education and transformation institutions"], image: "assets/stations/usa-animated-v3.4.svg", alt: "Animated United States preparation station" }
    },
    ar: {
      uae: { code: "الإمارات", title: "دولة الإمارات العربية المتحدة", subtitle: "التأسيس الوطني والقدرات السيادية والتحول", body: "محطة تأسيس وطنية لمدة ثلاثة أسابيع تربط إعداد القيادة بمنظومات الدفاع والطيران والتقنيات المتقدمة والاستدامة في دولة الإمارات.", duration: "3 أسابيع", focus: "القدرات الوطنية والتحول", points: ["مجلس التوازن وحوكمة القدرات الوطنية", "منظومات إيدج وGAL في الدفاع والطيران", "معهد الابتكار التكنولوجي TII ومصدر والتقنيات الناشئة والاستدامة"], image: "assets/stations/uae-animated-v3.4.svg", alt: "محطة إعداد دولة الإمارات العربية المتحدة المتحركة" },
      uk: { code: "المملكة المتحدة", title: "المملكة المتحدة", subtitle: "التعليم العسكري المهني والحوكمة والبرامج الدفاعية", body: "محطة لمدة ستة أسابيع تجمع بين التعليم العسكري المهني وصقل القيادة والتعرض للمؤسسات والشركات الداعمة للبرامج الدفاعية البريطانية.", duration: "6 أسابيع", focus: "التعليم العسكري والبرامج الدفاعية", points: ["RAF Cosford والتعليم المهني للقوة الجوية", "الأكاديمية العسكرية الملكية ساندهيرست وصقل القيادة", "الجهات الرائدة الداعمة للبرامج الدفاعية البريطانية"], image: "assets/stations/uk-animated-v3.4.svg", alt: "محطة إعداد المملكة المتحدة المتحركة" },
      france: { code: "فرنسا", title: "الجمهورية الفرنسية", subtitle: "الصناعة الأوروبية والشراكات والتفاعل الاستراتيجي", body: "محطة أوروبية لمدة ثلاثة أسابيع تتمحور حول الصناعة والشراكات الاستراتيجية والتفاعل مع الجهات العاملة عبر اتفاقيات معتمدة.", duration: "3 أسابيع", focus: "الشراكات والصناعة الأوروبية", points: ["التفاعل مع الصناعات الدفاعية الأوروبية", "إدارة الشراكات والعقود وأصحاب المصلحة", "التعاون الصناعي وتطوير الأعمال الدولية"], image: "assets/stations/france-animated-v3.4.svg", alt: "محطة إعداد فرنسا المتحركة" },
      usa: { code: "الولايات المتحدة", title: "الولايات المتحدة الأمريكية", subtitle: "التعاون الدفاعي والاستحواذ والتعليم الاستراتيجي", body: "محطة لمدة أربعة أسابيع تركز على التعاون الحكومي والمبيعات العسكرية الأجنبية والتعليم الاستراتيجي ومنظومات الاستحواذ الدفاعي.", duration: "4 أسابيع", focus: "التعاون الدفاعي والاستحواذ", points: ["برامج التعاون الحكومي والتعاون الأمني", "المبيعات العسكرية الأجنبية وإجراءات الاستحواذ", "مؤسسات التعليم الاستراتيجي والتحول"], image: "assets/stations/usa-animated-v3.4.svg", alt: "محطة إعداد الولايات المتحدة المتحركة" }
    }
  };

  function setMeta(language) {
    const ar = language === "ar";
    document.title = ar ? "سَمْت — من الإمكانات إلى القيادة" : "SAMT — From Potential to Command";
    q('meta[name="description"]')?.setAttribute("content", ar ? "برنامج سَمْت لإعداد القيادات من الإمكانات الواعدة إلى الجاهزية المثبتة لتحمل المسؤولية." : "SAMT is a selective leadership programme progressing exceptional potential toward command readiness through disciplined formation, international exposure and evidence-based assessment.");
    q('meta[property="og:locale"]')?.setAttribute("content", ar ? "ar_AE" : "en_AE");
  }

  function applyLanguage(language, persist = true) {
    if (isStoryPage) return;
    state.language = language === "ar" ? "ar" : "en";
    const dictionary = copy[state.language];
    document.documentElement.lang = state.language;
    document.documentElement.dir = state.language === "ar" ? "rtl" : "ltr";
    qa("[data-i18n]").forEach(element => {
      const value = dictionary[element.dataset.i18n];
      if (value !== undefined) element.textContent = value;
    });
    qa("[data-i18n-html]").forEach(element => {
      const value = dictionary[element.dataset.i18nHtml];
      if (value !== undefined) element.innerHTML = value;
    });
    const languageButton = q(".language-toggle");
    if (languageButton) {
      languageButton.firstElementChild.textContent = state.language === "ar" ? "EN" : "ع";
      languageButton.setAttribute("aria-label", state.language === "ar" ? "Switch to English" : "التبديل إلى العربية");
    }
    qa("[data-story-link]").forEach(link => link.href = state.language === "ar" ? "story-of-samt-ar.html" : "story-of-samt.html");
    setMeta(state.language);
    updateStation(q('[data-station][aria-selected="true"]')?.dataset.station || "uae", false);
    refreshJourneyCopy();
    if (persist) {
      try { localStorage.setItem("samt-language", state.language); } catch (_) {}
      const url = new URL(location.href);
      if (state.language === "ar") url.searchParams.set("lang", "ar"); else url.searchParams.delete("lang");
      history.replaceState(null, "", url);
    }
  }

  function initialiseLanguage() {
    if (isStoryPage) return;
    const requested = new URLSearchParams(location.search).get("lang");
    let stored = null;
    try { stored = localStorage.getItem("samt-language"); } catch (_) {}
    applyLanguage(requested === "ar" ? "ar" : stored === "ar" ? "ar" : "en", false);
    q(".language-toggle")?.addEventListener("click", () => applyLanguage(state.language === "ar" ? "en" : "ar"));
  }

  function initHeader() {
    const header = q(".site-header");
    const toggle = q(".menu-toggle");
    const menu = q(".mobile-menu");
    const panel = q(".mobile-menu__panel", menu || document);
    const close = q(".mobile-menu__close", menu || document);
    const backdrop = q(".mobile-menu__backdrop", menu || document);
    if (!header) return;

    const onScroll = () => header.classList.toggle("is-scrolled", scrollY > 18);
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    if (!toggle || !menu || !panel) return;

    let previousFocus = null;
    const focusable = () => qa('a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])', panel).filter(node => node.offsetParent !== null);
    const openMenu = () => {
      previousFocus = document.activeElement;
      state.menuOpen = true;
      menu.setAttribute("aria-hidden", "false");
      toggle.setAttribute("aria-expanded", "true");
      document.body.classList.add("menu-open");
      q("main")?.setAttribute("inert", "");
      q("footer")?.setAttribute("inert", "");
      requestAnimationFrame(() => close?.focus());
    };
    const closeMenu = (restore = true) => {
      state.menuOpen = false;
      menu.setAttribute("aria-hidden", "true");
      toggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("menu-open");
      q("main")?.removeAttribute("inert");
      q("footer")?.removeAttribute("inert");
      if (restore) requestAnimationFrame(() => previousFocus?.focus?.());
    };
    toggle.addEventListener("click", () => state.menuOpen ? closeMenu() : openMenu());
    close?.addEventListener("click", () => closeMenu());
    backdrop?.addEventListener("click", () => closeMenu());
    qa("nav a", menu).forEach(link => link.addEventListener("click", () => closeMenu(false)));
    document.addEventListener("keydown", event => {
      if (event.key === "Escape" && state.menuOpen) { event.preventDefault(); closeMenu(); return; }
      if (event.key !== "Tab" || !state.menuOpen) return;
      const nodes = focusable();
      if (!nodes.length) return;
      if (event.shiftKey && document.activeElement === nodes[0]) { event.preventDefault(); nodes.at(-1).focus(); }
      else if (!event.shiftKey && document.activeElement === nodes.at(-1)) { event.preventDefault(); nodes[0].focus(); }
    });
    addEventListener("resize", () => { if (innerWidth > 1180 && state.menuOpen) closeMenu(false); });
  }

  function initPageProgress() {
    const bar = q(".page-progress span");
    if (!bar) return;
    let ticking = false;
    const update = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
      bar.style.transform = `scaleX(${Math.min(1, Math.max(0, scrollY / max))})`;
      ticking = false;
    };
    addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    update();
  }

  function initReveal() {
    const elements = qa(".reveal");
    if (!elements.length) return;
    if (reducedMotion || !("IntersectionObserver" in window)) { elements.forEach(el => el.classList.add("is-visible")); return; }
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); } }), { threshold: .18 });
    elements.forEach(el => observer.observe(el));
  }

  function updateStation(key, animate = true) {
    if (isStoryPage) return;
    const data = stations[state.language]?.[key];
    if (!data) return;
    qa("[data-station]").forEach(button => {
      const active = button.dataset.station === key;
      button.setAttribute("aria-selected", String(active));
      button.tabIndex = active ? 0 : -1;
    });
    const image = q("#station-image");
    if (image) {
      if (animate && !reducedMotion) { image.style.opacity = "0"; image.style.transform = "scale(.96)"; }
      image.src = data.image;
      image.alt = data.alt;
      requestAnimationFrame(() => requestAnimationFrame(() => { image.style.opacity = "1"; image.style.transform = "scale(1)"; }));
    }
    q("#station-caption").textContent = `STATION ${String(["uae","uk","france","usa"].indexOf(key) + 1).padStart(2,"0")} / ${data.code}`;
    q("#station-title").textContent = data.title;
    q("#station-subtitle").textContent = data.subtitle;
    q("#station-body").textContent = data.body;
    q("#station-duration").textContent = data.duration;
    q("#station-focus").textContent = data.focus;
    q("#station-points").innerHTML = data.points.map(point => `<li>${point}</li>`).join("");
  }

  function initStations() {
    const tabs = qa("[data-station]");
    if (!tabs.length) return;
    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => updateStation(tab.dataset.station));
      tab.addEventListener("keydown", event => {
        if (!["ArrowLeft","ArrowRight","Home","End"].includes(event.key)) return;
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
    updateStation("uae", false);

    const visual = q(".station-stage__visual");
    const image = q("#station-image");
    if (visual && image && !reducedMotion && matchMedia("(pointer:fine)").matches && !lowPower) {
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

  function refreshJourneyCopy() {
    const cards = qa(".journey-card");
    const active = cards[state.journeyStage >= 0 ? state.journeyStage : 0];
    if (!active) return;
    q(".journey__caption strong").textContent = q("h3", active)?.textContent || "";
    q(".journey__caption span").textContent = q("p", active)?.textContent || "";
  }

  function setJourneyStage(index) {
    if (state.journeyComplete || innerWidth <= 900) return;
    const cards = qa(".journey-card");
    if (!cards.length || index === state.journeyStage) return;
    state.journeyStage = Math.max(0, Math.min(cards.length - 1, index));
    cards.forEach((card, cardIndex) => {
      card.style.setProperty("--x", `${journeySlot(cardIndex)}px`);
      card.classList.toggle("is-featured", cardIndex === state.journeyStage);
      card.classList.toggle("is-settled", cardIndex < state.journeyStage);
    });
    refreshJourneyCopy();
    const progress = q(".journey__progress span");
    if (progress) progress.style.transform = `scaleX(${state.journeyStage / (cards.length - 1)})`;
  }

  function completeJourney() {
    const cards = qa(".journey-card");
    if (!cards.length) return;
    state.journeyComplete = true;
    state.journeyStage = cards.length - 1;
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
    if (innerWidth <= 900 || reducedMotion) { completeJourney(); return; }
    setJourneyStage(0);
    let ticking = false;
    const update = () => {
      if (!state.journeyComplete) {
        const rect = section.getBoundingClientRect();
        const travel = Math.max(1, section.offsetHeight - innerHeight);
        const progress = Math.min(1, Math.max(0, -rect.top / travel));
        if (progress >= .97) completeJourney();
        else setJourneyStage(Math.min(cards.length - 1, Math.floor(progress * cards.length)));
      }
      ticking = false;
    };
    addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    q(".journey__skip")?.addEventListener("click", completeJourney);
    section.addEventListener("wheel", event => { if (Math.abs(event.deltaY) > 160 && state.journeyStage >= 0) completeJourney(); }, { passive: true, once: true });
    addEventListener("resize", () => { if (innerWidth <= 900) completeJourney(); else qa(".journey-card").forEach((card,index) => card.style.setProperty("--x", `${journeySlot(index)}px`)); });
    update();
  }

  function setInert(active) {
    [q("header"), q("main"), q("footer")].forEach(element => {
      if (!element) return;
      if (active) element.setAttribute("inert", ""); else element.removeAttribute("inert");
    });
  }

  function initStoryTransition() {
    if (isStoryPage) return;
    const overlay = q(".story-transition");
    const links = qa("[data-story-link]");
    if (!overlay || !links.length) return;
    const skip = q(".story-transition__skip", overlay);
    let destination = "story-of-samt.html";
    let timer = 0;

    const complete = () => {
      if (!state.transitionActive) return;
      clearTimeout(timer);
      try { sessionStorage.setItem("samt-story-arrival", "1"); } catch (_) {}
      location.href = destination;
    };
    const play = href => {
      if (state.transitionActive) return;
      state.transitionActive = true;
      destination = href;
      overlay.setAttribute("aria-hidden", "false");
      overlay.classList.add("is-playing");
      document.body.classList.add("transition-open");
      setInert(true);
      requestAnimationFrame(() => skip?.focus());
      let seen = false;
      try { seen = sessionStorage.getItem("samt-story-bridge-seen") === "1"; sessionStorage.setItem("samt-story-bridge-seen", "1"); } catch (_) {}
      const duration = reducedMotion ? 140 : seen ? 950 : 3800;
      timer = setTimeout(complete, duration);
    };
    links.forEach(link => link.addEventListener("click", event => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button > 0) return;
      event.preventDefault();
      play(link.href);
    }));
    skip?.addEventListener("click", complete);
    overlay.addEventListener("pointerdown", event => { if (!event.target.closest("button")) complete(); });
    overlay.addEventListener("wheel", complete, { passive: true });
    document.addEventListener("keydown", event => { if (state.transitionActive && ["Escape","Enter"," "].includes(event.key)) { event.preventDefault(); complete(); } });
  }

  function initStoryPage() {
    if (!isStoryPage) return;
    state.language = document.documentElement.lang === "ar" ? "ar" : "en";
    const arrival = (() => { try { const value = sessionStorage.getItem("samt-story-arrival") === "1"; sessionStorage.removeItem("samt-story-arrival"); return value; } catch (_) { return false; } })();
    if (arrival && !reducedMotion) {
      const main = q("main");
      main?.animate([{ opacity: 0, transform: "scale(1.012)" }, { opacity: 1, transform: "scale(1)" }], { duration: 900, easing: "cubic-bezier(.22,1,.36,1)", fill: "both" });
    }
    const sections = qa(".story-section");
    sections.forEach(section => section.classList.add("reveal-pending"));
    if (reducedMotion || !("IntersectionObserver" in window)) sections.forEach(section => section.classList.add("is-visible"));
    else {
      const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); } }), { threshold: .18 });
      sections.forEach(section => observer.observe(section));
    }
    const progressLinks = qa(".story-progress a");
    if (progressLinks.length && "IntersectionObserver" in window) {
      const chapterObserver = new IntersectionObserver(entries => entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        progressLinks.forEach(link => link.setAttribute("aria-current", String(link.hash === `#${entry.target.id}`)));
      }), { rootMargin: "-35% 0px -55%", threshold: 0 });
      sections.forEach(section => chapterObserver.observe(section));
    }
  }

  initialiseLanguage();
  initHeader();
  initPageProgress();
  initReveal();
  initStations();
  initJourney();
  initStoryTransition();
  initStoryPage();
})();