(() => {
  "use strict";

  const q = (selector, scope = document) => scope.querySelector(selector);
  const qa = (selector, scope = document) => [...scope.querySelectorAll(selector)];
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hasGSAP = typeof window.gsap !== "undefined";
  const hasScrollTrigger = typeof window.ScrollTrigger !== "undefined";
  const hasLenis = typeof window.Lenis !== "undefined";

  let lenis = null;
  let currentLanguage = "en";
  let stationIndex = 0;
  let stationTimer = 0;
  let lastFocusedElement = null;

  const stationOrder = ["uae", "uk", "france", "usa"];

  const translations = {
    en: {
      "loader.message": "Preparing the ascent",
      "nav.programme": "Programme",
      "nav.journey": "Journey",
      "nav.selection": "Selection",
      "nav.stations": "Preparation Stations",
      "nav.competencies": "Competencies",
      "nav.assessment": "Assessment",
      "nav.impact": "Impact",
      "nav.admission": "Admission",
      "hero.kicker": "From Potential to Command",
      "hero.line1": "Prepared to Lead.",
      "hero.line2": "Ready to <em>Command.</em>",
      "hero.arabic": "من الإمكانات إلى القيادة",
      "hero.summary": "SAMT identifies exceptional talent and prepares selected individuals for future command, strategic leadership and greater institutional responsibility.",
      "hero.discover": "Discover SAMT",
      "hero.overview": "Programme Overview",
      "hero.scroll": "Scroll to explore",
      "programme.kicker": "An elite leadership programme",
      "programme.title": "Selection is earned.<br><em>Leadership is formed.</em>",
      "programme.copy": "SAMT is designed for exceptional professionals who demonstrate the character, intellect, judgement, discipline and ambition required to assume future command and senior leadership responsibilities.",
      "programme.quote": "Entry is earned. Development is demanding. Readiness is evidenced.",
      "programme.explore": "Explore the programme",
      "programme.metric1": "Selected fellows",
      "programme.metric2": "International stations",
      "programme.metric3": "Full-time weeks",
      "programme.metric4": "Command standard",
      "journey.kicker": "The leadership journey",
      "journey.title": "A disciplined path from <em>potential to command.</em>",
      "journey.note": "Every stage raises the standard of judgement, character, exposure and responsibility.",
      "journey.s1.title": "Potential",
      "journey.s1.copy": "Exceptional potential is identified.",
      "journey.s2.title": "Selection",
      "journey.s2.copy": "A rigorous and selective admission process.",
      "journey.s3.title": "Formation",
      "journey.s3.copy": "Core capability and leadership judgement are developed.",
      "journey.s4.title": "Exposure",
      "journey.s4.copy": "National and international environments broaden perspective.",
      "journey.s5.title": "Transformation",
      "journey.s5.copy": "Leadership readiness is measured and strengthened.",
      "journey.s6.title": "Command Readiness",
      "journey.s6.copy": "Prepared to lead. Ready to command.",
      "selection.kicker": "Selecting the elite of the elite",
      "selection.title": "A leadership privilege.<br><em>Not a training seat.</em>",
      "selection.copy": "SAMT selects high-potential professionals through evidence, assessment and independent judgement. The standard is deliberately demanding because future responsibility is significant.",
      "selection.cta": "View Selection Framework",
      "selection.core": "future leaders",
      "selection.d1": "Judgement",
      "selection.d2": "Character",
      "selection.d3": "Learning agility",
      "selection.d4": "Command presence",
      "selection.d5": "Institutional impact",
      "selection.d6": "Strategic thinking",
      "selection.g1.title": "Eligibility",
      "selection.g1.copy": "Minimum experience and documented performance.",
      "selection.g1.long": "Institutional nomination, minimum experience and a documented performance record.",
      "selection.g2.title": "Assessment Centre",
      "selection.g2.copy": "Analysis, collaboration and decision under pressure.",
      "selection.g2.long": "Group exercises, analytical tasks and decision-making under pressure.",
      "selection.g3.title": "Executive Interview",
      "selection.g3.copy": "Motivation, humility, judgement and leadership potential.",
      "selection.g3.long": "A structured examination of judgement, humility, motivation and learning agility.",
      "selection.g4.title": "Independent Endorsement",
      "selection.g4.copy": "Final decision by a multidisciplinary panel.",
      "selection.g4.long": "Final cohort selection by an authorised multidisciplinary panel.",
      "selection.modalTitle": "Four gates.<br><em>One standard.</em>",
      "stations.kicker": "Preparation stations",
      "stations.title": "Global exposure.<br><em>Strategic perspective.</em>",
      "stations.copy": "Participants engage with leading institutions, sectors and operating environments that shape global leadership.",
      "station.current": "Current station",
      "station.durationLabel": "Duration",
      "station.focusLabel": "Primary focus",
      "station.details": "View Station Details",
      "station.modal.hosts": "Proposed host categories",
      "station.modal.learning": "Learning focus",
      "station.modal.outcomes": "Expected outcomes",
      "station.modal.highlights": "Key experiences",
      "station.modal.disclaimer": "Illustrative host categories and activities are subject to formal coordination, approval and agreement.",
      "competencies.kicker": "Leadership maturity competencies",
      "competencies.title": "Built for command.<br><em>Trusted to decide.</em>",
      "competencies.copy": "The framework integrates strategic judgement, systems awareness, institutional leadership and the ability to act under complexity.",
      "competencies.c1": "Strategic Judgement",
      "competencies.c1s": "Read context, consequence and long-term institutional direction.",
      "competencies.c2": "Systems Thinking",
      "competencies.c2s": "Understand interdependence across people, capability and mission.",
      "competencies.c3": "Decision-Making Under Complexity",
      "competencies.c3s": "Balance mission, risk, time and incomplete information.",
      "competencies.c4": "Institutional Leadership",
      "competencies.c4s": "Align strategy, people and governance toward sustained impact.",
      "competencies.c5": "Innovation & Transformation",
      "competencies.c5s": "Convert emerging possibilities into executable institutional change.",
      "competencies.c6": "International Engagement",
      "competencies.c6s": "Build trust, perspective and strategic partnerships across cultures.",
      "competencies.evidence": "Evidence of maturity",
      "assessment.kicker": "Assessment and governance",
      "assessment.title": "No progression without evidence.<br><em>No execution without governance.</em>",
      "assessment.copy": "Development is measured continuously and governed through clear authority, independent evidence and disciplined decision points.",
      "assessment.cta": "Open assessment model",
      "assessment.a1": "Baseline",
      "assessment.a1s": "Pre-programme capability profile",
      "assessment.a2": "Daily Evidence",
      "assessment.a2s": "Tasks, conduct and reflection",
      "assessment.a3": "Host Assessment",
      "assessment.a3s": "Independent observations",
      "assessment.a4": "Maturity Challenge",
      "assessment.a4s": "Decision and executive briefing",
      "assessment.a5": "Impact Project",
      "assessment.a5s": "Institutional result and follow-through",
      "assessment.gov": "Programme Governance",
      "assessment.govs": "Decision · Control · Impact",
      "assessment.g1": "Executive Sponsor",
      "assessment.g2": "Steering Committee",
      "assessment.g3": "Programme Director",
      "assessment.g4": "Independent Reviewer",
      "assessment.modalTitle": "Readiness is built.<br><em>Evidence proves it.</em>",
      "assessment.m1": "A pre-programme profile establishes strengths, risks and targeted growth priorities.",
      "assessment.m2": "Assignments, conduct, reflection and mentor observations generate continuous evidence.",
      "assessment.m3": "Independent host feedback provides external validation of performance and behaviour.",
      "assessment.m4": "Complex scenarios test judgement, rationale, command presence and executive communication.",
      "assessment.m5": "Institutional assignments demonstrate whether learning converts into sustainable value.",
      "impact.kicker": "Institutional impact",
      "impact.title": "Stronger leadership.<br><em>Stronger institutions.</em>",
      "impact.copy": "SAMT is measured by what changes after participants return: better judgement, stronger networks, executable transformation and sustained institutional value.",
      "impact.i1": "Measurable leadership growth",
      "impact.i1s": "Evidence across six command-oriented competencies.",
      "impact.i2": "Strategic networks",
      "impact.i2s": "National and international relationships built with purpose.",
      "impact.i3": "Transformation assignments",
      "impact.i3s": "Priority challenges converted into owned delivery plans.",
      "impact.i4": "Sustained institutional value",
      "impact.i4s": "Follow-up and impact measurement over twelve months.",
      "impact.projectTitle": "The programme concludes. Capability begins.",
      "impact.p1": "Readiness and decision quality",
      "impact.p2": "Capability and transformation",
      "impact.p3": "People and institutional learning",
      "admission.kicker": "Admission",
      "admission.title": "Selected for potential.<br><em>Shaped for command.</em>",
      "admission.copy": "Participation is by institutional nomination and a rigorous selection process. Admission is not open enrolment.",
      "admission.cta": "View Nomination Process",
      "admission.next": "Continue to Command",
      "admission.c1": "Years of practical experience",
      "admission.c2": "Fellows selected per cohort",
      "admission.c3": "Full-time commitment",
      "admission.c4": "Independent final endorsement",
      "admission.modalTitle": "Nomination first.<br><em>Selection by evidence.</em>",
      "admission.m1": "Institutional nomination",
      "admission.m2": "Eligibility and record review",
      "admission.m3": "Assessment centre",
      "admission.m4": "Structured executive interview",
      "admission.m5": "Final endorsement",
      "admission.modalCopy": "SAMT is not an open-enrolment programme. Candidates are nominated by authorised institutions and progress through a competitive, evidence-based process.",
      "admission.notice": "Programme dates, eligibility parameters and nomination authority will be confirmed in the approved execution plan.",
      "command.kicker": "The standard ahead",
      "command.title": "The future needs leaders.<br><em>Are you ready?</em>",
      "command.arabic": "المستقبل يحتاج قادة، هل أنت مستعد؟",
      "command.cta": "Learn About Admission",
      "modal.programme.kicker": "Programme overview",
      "modal.programme.title": "Selected for potential.<br><em>Shaped for command.</em>",
      "modal.programme.copy": "SAMT is a highly selective leadership programme for exceptional professionals who demonstrate the judgement, character, discipline and ambition required for future command and senior strategic responsibility.",
      "modal.programme.promise": "The programme does not reward attendance. It evidences readiness.",
      "footer.rights": "All rights reserved.",
      "footer.top": "Back to top",
      "footer.disclaimer": "Concept website. Proposed partners and programme arrangements are subject to formal approval and agreement."
    },
    ar: {
      "loader.message": "تهيئة مسار الصعود",
      "nav.programme": "البرنامج",
      "nav.journey": "الرحلة",
      "nav.selection": "الاختيار",
      "nav.stations": "محطات الإعداد",
      "nav.competencies": "الكفاءات",
      "nav.assessment": "التقييم",
      "nav.impact": "الأثر",
      "nav.admission": "القبول",
      "hero.kicker": "من الإمكانات إلى القيادة",
      "hero.line1": "مؤهلون للقيادة.",
      "hero.line2": "جاهزون <em>لتحمل المسؤولية.</em>",
      "hero.arabic": "من الإمكانات إلى القيادة",
      "hero.summary": "يكتشف برنامج سَمْت الكفاءات الاستثنائية ويؤهل المشاركين المختارين للقيادة المستقبلية وصناعة القرار الاستراتيجي وتحمل مسؤوليات مؤسسية أكبر.",
      "hero.discover": "اكتشف سَمْت",
      "hero.overview": "نظرة على البرنامج",
      "hero.scroll": "مرر للاستكشاف",
      "programme.kicker": "برنامج نوعي لإعداد القيادات",
      "programme.title": "الاختيار يُكتسب.<br><em>والقيادة تُصقل.</em>",
      "programme.copy": "صُمم برنامج سَمْت للكفاءات الاستثنائية التي تمتلك السمات والقدرات الفكرية والحكم المهني والانضباط والطموح اللازم لتولي مسؤوليات القيادة العليا مستقبلاً.",
      "programme.quote": "القبول يُكتسب، والتطوير يتطلب الالتزام، والجاهزية تثبتها الأدلة.",
      "programme.explore": "استكشف البرنامج",
      "programme.metric1": "زملاء مختارون",
      "programme.metric2": "محطات دولية",
      "programme.metric3": "أسبوعاً بدوام كامل",
      "programme.metric4": "معيار قيادي موحد",
      "journey.kicker": "رحلة إعداد القائد",
      "journey.title": "مسار منضبط من <em>الإمكانات إلى القيادة.</em>",
      "journey.note": "ترفع كل مرحلة مستوى الحكم والسمات القيادية والتعرض النوعي والمسؤولية.",
      "journey.s1.title": "الإمكانات",
      "journey.s1.copy": "اكتشاف الإمكانات القيادية الاستثنائية.",
      "journey.s2.title": "الاختيار",
      "journey.s2.copy": "عملية قبول دقيقة وعالية الانتقائية.",
      "journey.s3.title": "الإعداد",
      "journey.s3.copy": "بناء القدرات الأساسية والحكم القيادي.",
      "journey.s4.title": "التعرض النوعي",
      "journey.s4.copy": "بيئات وطنية ودولية توسع المنظور.",
      "journey.s5.title": "التحول",
      "journey.s5.copy": "قياس الجاهزية القيادية وتعزيزها.",
      "journey.s6.title": "الجاهزية للقيادة",
      "journey.s6.copy": "مؤهلون للقيادة، جاهزون لتحمل المسؤولية.",
      "selection.kicker": "اختيار نخبة النخبة",
      "selection.title": "امتياز قيادي.<br><em>وليس مقعداً تدريبياً.</em>",
      "selection.copy": "يختار سَمْت أصحاب الإمكانات العالية استناداً إلى الأدلة والتقييم والحكم المستقل. المعيار مرتفع عمداً لأن مسؤوليات المستقبل كبيرة.",
      "selection.cta": "عرض إطار الاختيار",
      "selection.core": "قادة المستقبل",
      "selection.d1": "الحكم المهني",
      "selection.d2": "السمات الشخصية",
      "selection.d3": "مرونة التعلم",
      "selection.d4": "الحضور القيادي",
      "selection.d5": "الأثر المؤسسي",
      "selection.d6": "التفكير الاستراتيجي",
      "selection.g1.title": "الأهلية",
      "selection.g1.copy": "خبرة عملية وسجل أداء موثق.",
      "selection.g1.long": "ترشيح مؤسسي وخبرة عملية كافية وسجل أداء موثق.",
      "selection.g2.title": "مركز التقييم",
      "selection.g2.copy": "التحليل والتعاون واتخاذ القرار تحت الضغط.",
      "selection.g2.long": "تمارين جماعية ومهام تحليلية واتخاذ قرار تحت الضغط.",
      "selection.g3.title": "المقابلة التنفيذية",
      "selection.g3.copy": "الدافع والتواضع والحكم والإمكانات القيادية.",
      "selection.g3.long": "مقابلة منظمة تقيس الحكم والتواضع والدافع ومرونة التعلم.",
      "selection.g4.title": "الاعتماد المستقل",
      "selection.g4.copy": "قرار نهائي من لجنة متعددة التخصصات.",
      "selection.g4.long": "اختيار الدفعة النهائية من قبل لجنة مخولة متعددة التخصصات.",
      "selection.modalTitle": "أربع بوابات.<br><em>ومعيار واحد.</em>",
      "stations.kicker": "محطات الإعداد",
      "stations.title": "تعرض عالمي.<br><em>ومنظور استراتيجي.</em>",
      "stations.copy": "يتفاعل المشاركون مع مؤسسات وقطاعات وبيئات عمل رائدة تسهم في تشكيل القيادة العالمية.",
      "station.current": "المحطة الحالية",
      "station.durationLabel": "المدة",
      "station.focusLabel": "التركيز الرئيس",
      "station.details": "عرض تفاصيل المحطة",
      "station.modal.hosts": "فئات الجهات المستضيفة المقترحة",
      "station.modal.learning": "محاور التعلم",
      "station.modal.outcomes": "المخرجات المتوقعة",
      "station.modal.highlights": "أبرز الخبرات",
      "station.modal.disclaimer": "فئات الجهات والأنشطة الواردة استرشادية وتخضع للتنسيق والاعتماد والاتفاق الرسمي.",
      "competencies.kicker": "كفاءات النضج القيادي",
      "competencies.title": "مُعدون للقيادة.<br><em>وموثوقون لاتخاذ القرار.</em>",
      "competencies.copy": "يجمع الإطار بين الحكم الاستراتيجي وفهم الأنظمة والقيادة المؤسسية والقدرة على العمل في بيئات معقدة.",
      "competencies.c1": "الحكم الاستراتيجي",
      "competencies.c1s": "قراءة السياق والنتائج والاتجاه المؤسسي طويل المدى.",
      "competencies.c2": "التفكير المنظومي",
      "competencies.c2s": "فهم الترابط بين الأفراد والقدرات والمهمة.",
      "competencies.c3": "اتخاذ القرار في التعقيد",
      "competencies.c3s": "الموازنة بين المهمة والمخاطر والوقت ونقص المعلومات.",
      "competencies.c4": "القيادة المؤسسية",
      "competencies.c4s": "مواءمة الاستراتيجية والأفراد والحوكمة لتحقيق أثر مستدام.",
      "competencies.c5": "الابتكار والتحول",
      "competencies.c5s": "تحويل الفرص الناشئة إلى تغيير مؤسسي قابل للتنفيذ.",
      "competencies.c6": "التفاعل الدولي",
      "competencies.c6s": "بناء الثقة والمنظور والشراكات الاستراتيجية عبر الثقافات.",
      "competencies.evidence": "أدلة النضج",
      "assessment.kicker": "التقييم والحوكمة",
      "assessment.title": "لا تقدم دون دليل.<br><em>ولا تنفيذ دون حوكمة.</em>",
      "assessment.copy": "يُقاس التطور باستمرار ويخضع لسلطات واضحة وأدلة مستقلة ونقاط قرار منضبطة.",
      "assessment.cta": "فتح نموذج التقييم",
      "assessment.a1": "خط الأساس",
      "assessment.a1s": "ملف القدرات قبل البرنامج",
      "assessment.a2": "الأدلة اليومية",
      "assessment.a2s": "المهام والسلوك والتأمل",
      "assessment.a3": "تقييم الجهة المستضيفة",
      "assessment.a3s": "ملاحظات مستقلة",
      "assessment.a4": "اختبار النضج",
      "assessment.a4s": "قرار وإحاطة تنفيذية",
      "assessment.a5": "مشروع الأثر",
      "assessment.a5s": "نتيجة مؤسسية ومتابعة التنفيذ",
      "assessment.gov": "حوكمة البرنامج",
      "assessment.govs": "قرار · رقابة · أثر",
      "assessment.g1": "الراعي التنفيذي",
      "assessment.g2": "اللجنة التوجيهية",
      "assessment.g3": "مدير البرنامج",
      "assessment.g4": "المراجع المستقل",
      "assessment.modalTitle": "الجاهزية تُبنى.<br><em>والأدلة تثبتها.</em>",
      "assessment.m1": "يحدد ملف ما قبل البرنامج نقاط القوة والمخاطر وأولويات التطوير المستهدفة.",
      "assessment.m2": "تولد المهام والسلوك والتأمل وملاحظات الموجهين أدلة مستمرة.",
      "assessment.m3": "يوفر تقييم الجهة المستضيفة تحققاً خارجياً من الأداء والسلوك.",
      "assessment.m4": "تختبر السيناريوهات المعقدة الحكم والحجة والحضور القيادي والتواصل التنفيذي.",
      "assessment.m5": "تثبت المهام المؤسسية قدرة التعلم على التحول إلى قيمة مستدامة.",
      "impact.kicker": "الأثر المؤسسي",
      "impact.title": "قيادة أقوى.<br><em>ومؤسسات أقوى.</em>",
      "impact.copy": "يُقاس سَمْت بما يتغير بعد عودة المشاركين: حكم أفضل وشبكات أقوى وتحول قابل للتنفيذ وقيمة مؤسسية مستدامة.",
      "impact.i1": "نمو قيادي قابل للقياس",
      "impact.i1s": "أدلة عبر ست كفاءات موجهة للقيادة.",
      "impact.i2": "شبكات استراتيجية",
      "impact.i2s": "علاقات وطنية ودولية تُبنى لغرض واضح.",
      "impact.i3": "مهام تحول",
      "impact.i3s": "تحويل التحديات ذات الأولوية إلى خطط تنفيذ مملوكة.",
      "impact.i4": "قيمة مؤسسية مستدامة",
      "impact.i4s": "متابعة وقياس للأثر على مدى اثني عشر شهراً.",
      "impact.projectTitle": "ينتهي البرنامج، وتبدأ القدرة.",
      "impact.p1": "الجاهزية وجودة القرار",
      "impact.p2": "القدرات والتحول",
      "impact.p3": "الأفراد والتعلم المؤسسي",
      "admission.kicker": "القبول",
      "admission.title": "مختارون للإمكانات.<br><em>ومصقولون للقيادة.</em>",
      "admission.copy": "تتم المشاركة من خلال ترشيح مؤسسي وعملية اختيار دقيقة. البرنامج ليس مفتوح القبول.",
      "admission.cta": "عرض مسار الترشيح",
      "admission.next": "المتابعة إلى القيادة",
      "admission.c1": "سنوات خبرة عملية",
      "admission.c2": "زملاء مختارون لكل دفعة",
      "admission.c3": "التزام بدوام كامل",
      "admission.c4": "اعتماد نهائي مستقل",
      "admission.modalTitle": "الترشيح أولاً.<br><em>والاختيار بالأدلة.</em>",
      "admission.m1": "الترشيح المؤسسي",
      "admission.m2": "مراجعة الأهلية والسجل",
      "admission.m3": "مركز التقييم",
      "admission.m4": "المقابلة التنفيذية المنظمة",
      "admission.m5": "الاعتماد النهائي",
      "admission.modalCopy": "سَمْت ليس برنامجاً مفتوح القبول. يُرشح المرشحون من الجهات المخولة ويتقدمون عبر عملية تنافسية قائمة على الأدلة.",
      "admission.notice": "تُعتمد مواعيد البرنامج ومعايير الأهلية وسلطة الترشيح ضمن خطة التنفيذ المعتمدة.",
      "command.kicker": "المعيار القادم",
      "command.title": "المستقبل يحتاج قادة.<br><em>هل أنت مستعد؟</em>",
      "command.arabic": "المستقبل يحتاج قادة، هل أنت مستعد؟",
      "command.cta": "التعرف إلى القبول",
      "modal.programme.kicker": "نظرة على البرنامج",
      "modal.programme.title": "مختارون للإمكانات.<br><em>ومصقولون للقيادة.</em>",
      "modal.programme.copy": "سَمْت برنامج قيادي عالي الانتقائية للكفاءات الاستثنائية التي تمتلك الحكم والسمات والانضباط والطموح اللازم لمسؤوليات القيادة المستقبلية والاستراتيجية العليا.",
      "modal.programme.promise": "لا يكافئ البرنامج الحضور، بل يثبت الجاهزية.",
      "footer.rights": "جميع الحقوق محفوظة.",
      "footer.top": "العودة إلى الأعلى",
      "footer.disclaimer": "موقع تصوري. تخضع الجهات المقترحة وترتيبات البرنامج للاعتماد والاتفاق الرسمي."
    }
  };

  const stationData = {
    en: {
      uae: {
        code: "UAE",
        title: "United Arab Emirates",
        subtitle: "Foundation, strategic orientation and national context",
        body: "The national foundation phase establishes a common understanding of leadership expectations, strategic priorities and the institutional environment in which future responsibility will be exercised.",
        duration: "3+ weeks",
        focus: "Leadership foundation",
        points: [
          "Strategic leadership and national vision",
          "Defence, aviation and institutional ecosystems",
          "Capability development and transformation frameworks"
        ],
        hosts: ["National leadership and government institutions", "Defence and staff-development organisations", "Technology, industry and engineering partners"],
        learning: ["Strategic leadership and national direction", "Capability development and institutional readiness", "National security, technology and transformation context"],
        outcomes: ["Common strategic foundation", "Stronger judgement in national context", "Readiness for international exposure"],
        highlights: ["Executive briefings", "Institutional and facility visits", "Mentoring and daily reflection"],
        image: "assets/stations/uae-animated.svg"
      },
      uk: {
        code: "UK",
        title: "United Kingdom",
        subtitle: "Strategy, governance and professional military education",
        body: "An intensive station focused on strategic studies, governance, executive education and the relationship between policy, institutions, capability and command.",
        duration: "3+ weeks",
        focus: "Strategy & governance",
        points: ["Strategic studies and command education", "Governance, policy and institutional decision-making", "Aerospace, engineering and leadership ecosystems"],
        hosts: ["Defence and staff institutions", "Executive education and research centres", "Aerospace and engineering partners"],
        learning: ["Strategic studies and command judgement", "Governance and institutional leadership", "Professional military and executive education"],
        outcomes: ["Broader strategic perspective", "Improved policy-to-execution understanding", "Stronger executive communication"],
        highlights: ["Seminars and decision exercises", "Senior-leader engagement", "Institutional and industry visits"],
        image: "assets/stations/uk-animated.svg"
      },
      france: {
        code: "FRANCE",
        title: "France",
        subtitle: "Industrial excellence, engineering and strategic autonomy",
        body: "A station centred on engineering excellence, industrial strategy, advanced manufacturing, supply networks and the translation of national capability into global influence.",
        duration: "3+ weeks",
        focus: "Industry & engineering",
        points: ["Industrial strategy and national capability", "Engineering, manufacturing and supply networks", "Government relations and international partnerships"],
        hosts: ["National industrial institutions", "Aerospace and advanced-manufacturing organisations", "Executive education and strategy partners"],
        learning: ["Industrial strategy and lifecycle thinking", "Engineering leadership and supply resilience", "International business and government relations"],
        outcomes: ["Understanding of industrial ecosystems", "Stronger lifecycle and sustainment thinking", "Improved partnership and negotiation perspective"],
        highlights: ["Production-line and laboratory visits", "Engineering and executive workshops", "Industry strategy assignments"],
        image: "assets/stations/france-animated.svg"
      },
      usa: {
        code: "USA",
        title: "United States of America",
        subtitle: "Innovation, integration and strategic transformation",
        body: "An advanced station focused on innovation ecosystems, defence and aerospace best practice, strategic integration, acquisition and the leadership of large-scale transformation.",
        duration: "3+ weeks",
        focus: "Innovation & integration",
        points: ["Innovation and emerging technologies", "Defence, aerospace and acquisition ecosystems", "Strategic integration and transformation models"],
        hosts: ["Defence and strategic institutions", "Innovation laboratories and research universities", "Aerospace, technology and integration partners"],
        learning: ["Innovation leadership and emerging technology", "Acquisition, programme and contract management", "Strategic integration across complex ecosystems"],
        outcomes: ["Understanding of innovation ecosystems", "Access to defence and aerospace best practice", "Stronger transformation and integration capability"],
        highlights: ["High-level briefings and roundtables", "Innovation-hub and laboratory visits", "Exposure to future-ready capabilities"],
        image: "assets/stations/usa-animated.svg"
      }
    },
    ar: {
      uae: {
        code: "الإمارات",
        title: "دولة الإمارات العربية المتحدة",
        subtitle: "التأسيس والتوجيه الاستراتيجي والسياق الوطني",
        body: "تبني مرحلة التأسيس الوطني فهماً مشتركاً لتوقعات القيادة والأولويات الاستراتيجية والبيئة المؤسسية التي ستُمارس فيها المسؤوليات المستقبلية.",
        duration: "3+ أسابيع",
        focus: "التأسيس القيادي",
        points: ["القيادة الاستراتيجية والرؤية الوطنية", "منظومات الدفاع والطيران والمؤسسات", "أطر تطوير القدرات والتحول"],
        hosts: ["مؤسسات القيادة والحكومة الوطنية", "مؤسسات الدفاع وإعداد القيادات", "شركاء التقنية والصناعة والهندسة"],
        learning: ["القيادة الاستراتيجية والاتجاه الوطني", "تطوير القدرات والجاهزية المؤسسية", "سياق الأمن الوطني والتقنية والتحول"],
        outcomes: ["أساس استراتيجي مشترك", "تعزيز الحكم في السياق الوطني", "الجاهزية للتعرض الدولي"],
        highlights: ["إحاطات تنفيذية", "زيارات مؤسسية وميدانية", "توجيه وتأمل يومي"],
        image: "assets/stations/uae-animated.svg"
      },
      uk: {
        code: "المملكة المتحدة",
        title: "المملكة المتحدة",
        subtitle: "الاستراتيجية والحوكمة والتعليم القيادي المهني",
        body: "محطة مكثفة تركز على الدراسات الاستراتيجية والحوكمة والتعليم التنفيذي والعلاقة بين السياسة والمؤسسات والقدرة والقيادة.",
        duration: "3+ أسابيع",
        focus: "الاستراتيجية والحوكمة",
        points: ["الدراسات الاستراتيجية والتعليم القيادي", "الحوكمة والسياسة وصناعة القرار المؤسسي", "منظومات الطيران والهندسة والقيادة"],
        hosts: ["مؤسسات الدفاع والأركان", "مراكز التعليم التنفيذي والبحث", "شركاء الطيران والهندسة"],
        learning: ["الدراسات الاستراتيجية والحكم القيادي", "الحوكمة والقيادة المؤسسية", "التعليم العسكري المهني والتنفيذي"],
        outcomes: ["منظور استراتيجي أوسع", "فهم أفضل للرابط بين السياسة والتنفيذ", "تواصل تنفيذي أقوى"],
        highlights: ["ندوات وتمارين قرار", "تفاعل مع قيادات عليا", "زيارات مؤسسية وصناعية"],
        image: "assets/stations/uk-animated.svg"
      },
      france: {
        code: "فرنسا",
        title: "الجمهورية الفرنسية",
        subtitle: "التميز الصناعي والهندسة والاستقلالية الاستراتيجية",
        body: "محطة تتمحور حول التميز الهندسي والاستراتيجية الصناعية والتصنيع المتقدم وشبكات الإمداد وتحويل القدرة الوطنية إلى تأثير عالمي.",
        duration: "3+ أسابيع",
        focus: "الصناعة والهندسة",
        points: ["الاستراتيجية الصناعية والقدرة الوطنية", "الهندسة والتصنيع وشبكات الإمداد", "العلاقات الحكومية والشراكات الدولية"],
        hosts: ["مؤسسات صناعية وطنية", "منظمات الطيران والتصنيع المتقدم", "شركاء التعليم التنفيذي والاستراتيجية"],
        learning: ["الاستراتيجية الصناعية والتفكير عبر دورة الحياة", "القيادة الهندسية ومرونة الإمداد", "الأعمال الدولية والعلاقات الحكومية"],
        outcomes: ["فهم المنظومات الصناعية", "تعزيز التفكير في دورة الحياة والاستدامة", "منظور أفضل للشراكات والتفاوض"],
        highlights: ["زيارات خطوط الإنتاج والمختبرات", "ورش هندسية وتنفيذية", "مهام في الاستراتيجية الصناعية"],
        image: "assets/stations/france-animated.svg"
      },
      usa: {
        code: "الولايات المتحدة",
        title: "الولايات المتحدة الأمريكية",
        subtitle: "الابتكار والتكامل والتحول الاستراتيجي",
        body: "محطة متقدمة تركز على منظومات الابتكار وأفضل الممارسات الدفاعية والجوية والتكامل الاستراتيجي والاستحواذ وقيادة التحول واسع النطاق.",
        duration: "3+ أسابيع",
        focus: "الابتكار والتكامل",
        points: ["الابتكار والتقنيات الناشئة", "منظومات الدفاع والطيران والاستحواذ", "نماذج التكامل والتحول الاستراتيجي"],
        hosts: ["مؤسسات الدفاع والاستراتيجية", "مختبرات الابتكار والجامعات البحثية", "شركاء الطيران والتقنية والتكامل"],
        learning: ["قيادة الابتكار والتقنيات الناشئة", "إدارة الاستحواذ والبرامج والعقود", "التكامل الاستراتيجي عبر منظومات معقدة"],
        outcomes: ["فهم منظومات الابتكار", "التعرف إلى أفضل الممارسات الدفاعية والجوية", "تعزيز القدرة على التحول والتكامل"],
        highlights: ["إحاطات وطاولات مستديرة رفيعة المستوى", "زيارات مراكز الابتكار والمختبرات", "التعرض لقدرات مستقبلية"],
        image: "assets/stations/usa-animated.svg"
      }
    }
  };

  const competencyData = {
    en: {
      judgement: { icon: "judgement", title: "Strategic Judgement", copy: "The ability to read context, understand consequence, distinguish signal from noise and connect decisions to mission and future institutional direction.", evidence: ["Frames complex issues clearly", "Identifies second- and third-order effects", "Explains the rationale behind strategic choices"] },
      systems: { icon: "systems", title: "Systems Thinking", copy: "The ability to understand the interdependence of people, policy, technology, capability, resources and operational outcomes.", evidence: ["Maps critical dependencies", "Recognises system-wide trade-offs", "Integrates multiple perspectives into one operating picture"] },
      decision: { icon: "decision", title: "Decision-Making Under Complexity", copy: "The ability to make timely, defensible decisions while balancing mission, risk, resources, time and incomplete information.", evidence: ["Sets decision criteria", "Balances speed and assurance", "Adapts when assumptions change"] },
      institution: { icon: "institution", title: "Institutional Leadership", copy: "The ability to align strategy, governance, people and delivery systems toward sustained institutional outcomes.", evidence: ["Creates alignment across functions", "Builds ownership and accountability", "Converts direction into execution"] },
      innovation: { icon: "innovation", title: "Innovation & Transformation", copy: "The ability to evaluate emerging possibilities and convert relevant opportunities into practical, governed transformation.", evidence: ["Connects innovation to mission need", "Designs executable change pathways", "Manages adoption, risk and value"] },
      international: { icon: "international", title: "International Engagement", copy: "The ability to build trust, communicate across cultures and develop strategic relationships that create mutual value.", evidence: ["Adapts communication to context", "Builds credible long-term relationships", "Protects institutional interests while enabling cooperation"] }
    },
    ar: {
      judgement: { icon: "judgement", title: "الحكم الاستراتيجي", copy: "القدرة على قراءة السياق وفهم النتائج والتمييز بين الإشارة والضوضاء وربط القرارات بالمهمة والاتجاه المؤسسي المستقبلي.", evidence: ["صياغة القضايا المعقدة بوضوح", "تحديد الآثار المباشرة واللاحقة", "تفسير منطق الخيارات الاستراتيجية"] },
      systems: { icon: "systems", title: "التفكير المنظومي", copy: "القدرة على فهم الترابط بين الأفراد والسياسات والتقنية والقدرات والموارد والنتائج العملياتية.", evidence: ["رسم الاعتماديات الحرجة", "إدراك المفاضلات على مستوى المنظومة", "دمج وجهات النظر في صورة تشغيلية واحدة"] },
      decision: { icon: "decision", title: "اتخاذ القرار في التعقيد", copy: "القدرة على اتخاذ قرارات في الوقت المناسب وقابلة للدفاع عنها مع الموازنة بين المهمة والمخاطر والموارد والوقت ونقص المعلومات.", evidence: ["وضع معايير القرار", "الموازنة بين السرعة والضمان", "التكيف عند تغير الافتراضات"] },
      institution: { icon: "institution", title: "القيادة المؤسسية", copy: "القدرة على مواءمة الاستراتيجية والحوكمة والأفراد وأنظمة التنفيذ لتحقيق نتائج مؤسسية مستدامة.", evidence: ["خلق المواءمة بين الوظائف", "بناء الملكية والمساءلة", "تحويل التوجيه إلى تنفيذ"] },
      innovation: { icon: "innovation", title: "الابتكار والتحول", copy: "القدرة على تقييم الفرص الناشئة وتحويل المناسب منها إلى تحول عملي ومحكوم.", evidence: ["ربط الابتكار باحتياجات المهمة", "تصميم مسارات تغيير قابلة للتنفيذ", "إدارة التبني والمخاطر والقيمة"] },
      international: { icon: "international", title: "التفاعل الدولي", copy: "القدرة على بناء الثقة والتواصل عبر الثقافات وتطوير علاقات استراتيجية تحقق قيمة متبادلة.", evidence: ["تكييف التواصل مع السياق", "بناء علاقات موثوقة طويلة الأجل", "حماية المصالح المؤسسية مع تمكين التعاون"] }
    }
  };

  const impactData = {
    en: {
      readiness: { title: "Readiness and decision quality", copy: "Impact projects may address measurable improvements in readiness, decision cycles, prioritisation and leadership assurance.", list: ["Reduce decision latency", "Improve risk visibility", "Strengthen readiness governance"] },
      capability: { title: "Capability and transformation", copy: "Fellows may lead cross-functional assignments that improve capability development, sustainment or transformation execution.", list: ["Clarify capability priorities", "Improve lifecycle alignment", "Accelerate governed transformation"] },
      people: { title: "People and institutional learning", copy: "Projects may strengthen leadership pipelines, knowledge transfer, professional development or organisational learning.", list: ["Develop leadership pathways", "Capture and transfer critical knowledge", "Improve institutional learning systems"] }
    },
    ar: {
      readiness: { title: "الجاهزية وجودة القرار", copy: "قد تعالج مشاريع الأثر تحسينات قابلة للقياس في الجاهزية ودورات القرار وترتيب الأولويات والضمان القيادي.", list: ["تقليص زمن اتخاذ القرار", "تحسين وضوح المخاطر", "تعزيز حوكمة الجاهزية"] },
      capability: { title: "القدرات والتحول", copy: "قد يقود الزملاء مهاماً مشتركة تحسن تطوير القدرات أو الاستدامة أو تنفيذ التحول.", list: ["توضيح أولويات القدرات", "تحسين المواءمة عبر دورة الحياة", "تسريع التحول المحكوم"] },
      people: { title: "الأفراد والتعلم المؤسسي", copy: "قد تعزز المشاريع مسارات القيادة ونقل المعرفة والتطوير المهني أو التعلم المؤسسي.", list: ["تطوير مسارات القيادة", "التقاط المعرفة الحرجة ونقلها", "تحسين أنظمة التعلم المؤسسي"] }
    }
  };

  function setLanguage(language, persist = true) {
    currentLanguage = language === "ar" ? "ar" : "en";
    document.documentElement.lang = currentLanguage;
    document.documentElement.dir = currentLanguage === "ar" ? "rtl" : "ltr";

    qa("[data-i18n]").forEach((element) => {
      const value = translations[currentLanguage][element.dataset.i18n];
      if (value !== undefined) element.textContent = value;
    });

    qa("[data-i18n-html]").forEach((element) => {
      const value = translations[currentLanguage][element.dataset.i18nHtml];
      if (value !== undefined) element.innerHTML = value;
    });

    updateStation(stationOrder[stationIndex], false);
    if (persist) {
      try { localStorage.setItem("samt-language", currentLanguage); } catch (_) {}
    }
    requestAnimationFrame(() => window.ScrollTrigger?.refresh());
  }

  function initLanguage() {
    let stored = "en";
    try { stored = localStorage.getItem("samt-language") || "en"; } catch (_) {}
    setLanguage(stored, false);
    q(".language-toggle")?.addEventListener("click", () => setLanguage(currentLanguage === "en" ? "ar" : "en"));
  }

  function updateStation(key, animate = true) {
    const data = stationData[currentLanguage][key];
    if (!data) return;
    stationIndex = stationOrder.indexOf(key);

    const visual = q(".station-stage__visual");
    const content = q(".station-stage__content");
    const apply = () => {
      const image = q("#station-image");
      image.src = data.image;
      image.alt = `${data.title} preparation station`;
      q("#station-title").textContent = data.title;
      q("#station-subtitle").textContent = data.subtitle;
      q("#station-body").textContent = data.body;
      q("#station-duration").textContent = data.duration;
      q("#station-focus").textContent = data.focus;
      q(".station-stage__caption").textContent = `STATION 0${stationIndex + 1} / ${data.code}`;
      q("#station-points").innerHTML = data.points.map((item) => `<li>${item}</li>`).join("");

      qa(".station-route__node").forEach((node, index) => {
        const active = index === stationIndex;
        node.classList.toggle("is-active", active);
        if (active) node.setAttribute("aria-current", "step");
        else node.removeAttribute("aria-current");
      });

      qa(".station-route__line i").forEach((line, index) => {
        if (hasGSAP) gsap.to(line, { scaleX: index < stationIndex ? 1 : 0, transformOrigin: document.documentElement.dir === "rtl" ? "right" : "left", duration: .55, ease: "power3.out" });
        else line.style.transform = `scaleX(${index < stationIndex ? 1 : 0})`;
      });

      q("#station-modal-title").textContent = data.title;
      q("#station-modal-lead").textContent = data.subtitle;
      q("#station-modal-hosts").innerHTML = data.hosts.map((item) => `<li>${item}</li>`).join("");
      q("#station-modal-learning").innerHTML = data.learning.map((item) => `<li>${item}</li>`).join("");
      q("#station-modal-outcomes").innerHTML = data.outcomes.map((item) => `<li>${item}</li>`).join("");
      q("#station-modal-highlights").innerHTML = data.highlights.map((item) => `<li>${item}</li>`).join("");
    };

    if (animate && hasGSAP && !reducedMotion) {
      const tl = gsap.timeline();
      tl.to([visual, content], { autoAlpha: 0, y: 18, duration: .25, stagger: .04, ease: "power2.in" })
        .add(apply)
        .fromTo([visual, content], { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: .55, stagger: .06, ease: "power4.out" });
    } else {
      apply();
    }
    restartStationAutoplay();
  }

  function restartStationAutoplay() {
    clearTimeout(stationTimer);
    if (reducedMotion || document.hidden) return;
    stationTimer = setTimeout(() => updateStation(stationOrder[(stationIndex + 1) % stationOrder.length]), 9000);
  }

  function initStations() {
    qa(".station-route__node").forEach((button) => button.addEventListener("click", () => updateStation(button.dataset.station)));
    q("[data-station-prev]")?.addEventListener("click", () => updateStation(stationOrder[(stationIndex - 1 + stationOrder.length) % stationOrder.length]));
    q("[data-station-next]")?.addEventListener("click", () => updateStation(stationOrder[(stationIndex + 1) % stationOrder.length]));
    q(".station-console")?.addEventListener("mouseenter", () => clearTimeout(stationTimer));
    q(".station-console")?.addEventListener("mouseleave", restartStationAutoplay);
    updateStation(stationOrder[0], false);
  }

  function populateCompetency(key) {
    const data = competencyData[currentLanguage][key];
    if (!data) return;
    q("#competency-modal-title").textContent = data.title;
    q("#competency-modal-copy").textContent = data.copy;
    q("#competency-modal-evidence").innerHTML = data.evidence.map((item) => `<li>${item}</li>`).join("");
    q("#competency-modal-icon").setAttribute("href", `assets/icons/samt-icons.svg#${data.icon}`);
  }

  function populateImpact(key) {
    const data = impactData[currentLanguage][key];
    if (!data) return;
    q("#impact-modal-title").textContent = data.title;
    q("#impact-modal-copy").textContent = data.copy;
    q("#impact-modal-list").innerHTML = data.list.map((item) => `<li>${item}</li>`).join("");
  }

  function initModals() {
    qa("[data-modal-open]").forEach((button) => {
      button.addEventListener("click", () => {
        if (button.dataset.competency) populateCompetency(button.dataset.competency);
        if (button.dataset.impact) populateImpact(button.dataset.impact);
        openModal(document.getElementById(button.dataset.modalOpen));
      });
    });

    qa(".competency-card").forEach((button) => {
      button.addEventListener("click", () => {
        populateCompetency(button.dataset.competency);
        openModal(q("#competency-modal"));
      });
    });

    qa("[data-modal-close]").forEach((button) => button.addEventListener("click", () => closeModal(button.closest("dialog"))));
    qa("dialog.modal").forEach((modal) => {
      modal.addEventListener("click", (event) => { if (event.target === modal) closeModal(modal); });
      modal.addEventListener("cancel", (event) => { event.preventDefault(); closeModal(modal); });
    });
  }

  function openModal(modal) {
    if (!modal) return;
    lastFocusedElement = document.activeElement;
    modal.showModal();
    lenis?.stop();
    document.body.classList.add("modal-open");
    if (hasGSAP && !reducedMotion) {
      gsap.fromTo(modal, { autoAlpha: 0 }, { autoAlpha: 1, duration: .28 });
      gsap.fromTo(q(".modal__shell", modal), { y: 48, scale: .97 }, { y: 0, scale: 1, duration: .55, ease: "power4.out" });
    }
    q("[data-modal-close]", modal)?.focus();
  }

  function closeModal(modal) {
    if (!modal?.open) return;
    const finish = () => {
      modal.close();
      document.body.classList.remove("modal-open");
      lenis?.start();
      lastFocusedElement?.focus?.();
    };
    if (hasGSAP && !reducedMotion) {
      gsap.to(q(".modal__shell", modal), { y: 30, scale: .98, autoAlpha: 0, duration: .28, ease: "power2.in" });
      gsap.to(modal, { autoAlpha: 0, duration: .3, onComplete: () => { gsap.set(modal, { clearProps: "all" }); gsap.set(q(".modal__shell", modal), { clearProps: "all" }); finish(); } });
    } else finish();
  }

  function initMenu() {
    const toggle = q(".menu-toggle");
    const menu = q(".mobile-menu");
    const panel = q(".mobile-menu__panel");
    const backdrop = q(".mobile-menu__backdrop");

    const open = () => {
      toggle.setAttribute("aria-expanded", "true");
      menu.classList.add("is-open");
      menu.setAttribute("aria-hidden", "false");
      lenis?.stop();
      if (hasGSAP) {
        gsap.to(backdrop, { opacity: 1, duration: .3 });
        gsap.to(panel, { x: 0, duration: .65, ease: "power4.out" });
        gsap.from(".mobile-menu nav a", { y: 30, autoAlpha: 0, stagger: .05, duration: .55, delay: .15, ease: "power3.out" });
      } else panel.style.transform = "translateX(0)";
    };

    const close = () => {
      if (!menu.classList.contains("is-open")) return;
      toggle.setAttribute("aria-expanded", "false");
      const direction = document.documentElement.dir === "rtl" ? -100 : 100;
      if (hasGSAP) {
        gsap.to(backdrop, { opacity: 0, duration: .25 });
        gsap.to(panel, { xPercent: direction, duration: .45, ease: "power3.in", onComplete: finish });
      } else finish();
    };

    const finish = () => {
      menu.classList.remove("is-open");
      menu.setAttribute("aria-hidden", "true");
      window.gsap?.set(panel, { clearProps: "transform" });
      lenis?.start();
    };

    toggle?.addEventListener("click", () => menu.classList.contains("is-open") ? close() : open());
    backdrop?.addEventListener("click", close);
    qa(".mobile-menu a").forEach((link) => link.addEventListener("click", close));
    document.addEventListener("keydown", (event) => { if (event.key === "Escape") close(); });
  }

  function initSmoothScroll() {
    if (hasLenis && !reducedMotion) {
      lenis = new Lenis({ lerp: .1, smoothWheel: true, wheelMultiplier: .9, touchMultiplier: 1.1 });
      lenis.on("scroll", () => window.ScrollTrigger?.update());
      if (hasGSAP) {
        gsap.ticker.add((time) => lenis.raf(time * 1000));
        gsap.ticker.lagSmoothing(0);
      } else {
        const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); };
        requestAnimationFrame(raf);
      }
    }

    qa('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", (event) => {
        const target = q(link.getAttribute("href"));
        if (!target) return;
        event.preventDefault();
        if (lenis) lenis.scrollTo(target, { offset: 0, duration: 1.2 });
        else target.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
      });
    });
  }

  function initCursor() {
    if (!matchMedia("(pointer:fine)").matches || reducedMotion || !hasGSAP) return;
    const dot = q(".cursor--dot");
    const ring = q(".cursor--ring");
    const label = q(".cursor-label");
    let mouseX = innerWidth / 2;
    let mouseY = innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    addEventListener("pointermove", (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      gsap.set(dot, { x: mouseX, y: mouseY });
      gsap.set(label, { x: mouseX, y: mouseY });
    });

    gsap.ticker.add(() => {
      ringX += (mouseX - ringX) * .18;
      ringY += (mouseY - ringY) * .18;
      gsap.set(ring, { x: ringX, y: ringY });
    });

    qa("[data-cursor]").forEach((element) => {
      element.addEventListener("mouseenter", () => {
        document.body.classList.add(`cursor-${element.dataset.cursor}`);
        if (element.dataset.cursor === "view") {
          label.textContent = currentLanguage === "ar" ? "عرض" : "View";
          gsap.to(label, { autoAlpha: 1, duration: .2 });
        }
      });
      element.addEventListener("mouseleave", () => {
        document.body.classList.remove(`cursor-${element.dataset.cursor}`);
        gsap.to(label, { autoAlpha: 0, duration: .2 });
      });
    });
  }

  function initMagnetic() {
    if (reducedMotion || !hasGSAP) return;
    qa(".magnetic").forEach((element) => {
      element.addEventListener("pointermove", (event) => {
        const rect = element.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;
        gsap.to(element, { x: x * .14, y: y * .14, duration: .3, ease: "power3.out" });
      });
      element.addEventListener("pointerleave", () => gsap.to(element, { x: 0, y: 0, duration: .65, ease: "elastic.out(1,.45)" }));
    });
  }

  function initParticles() {
    const canvas = q("#particle-canvas");
    const context = canvas?.getContext("2d");
    if (!canvas || !context || reducedMotion) return;
    let particles = [];
    let frame = 0;
    let dpr = Math.min(devicePixelRatio || 1, 2);

    const resize = () => {
      dpr = Math.min(devicePixelRatio || 1, 2);
      canvas.width = innerWidth * dpr;
      canvas.height = innerHeight * dpr;
      canvas.style.width = `${innerWidth}px`;
      canvas.style.height = `${innerHeight}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(110, Math.max(35, Math.floor(innerWidth / 17)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * innerWidth,
        y: Math.random() * innerHeight,
        radius: Math.random() * 1.2 + .2,
        vx: (Math.random() - .5) * .06,
        vy: Math.random() * .1 + .02,
        alpha: Math.random() * .32 + .05
      }));
    };

    const draw = () => {
      context.clearRect(0, 0, innerWidth, innerHeight);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y -= p.vy;
        if (p.y < -5) { p.y = innerHeight + 5; p.x = Math.random() * innerWidth; }
        if (p.x < -5) p.x = innerWidth + 5;
        if (p.x > innerWidth + 5) p.x = -5;
        context.beginPath();
        context.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(241,217,154,${p.alpha})`;
        context.fill();
      });
      frame = requestAnimationFrame(draw);
    };

    resize();
    draw();
    addEventListener("resize", resize);
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) cancelAnimationFrame(frame);
      else draw();
    });
  }

  function initLoader() {
    const loader = q(".loader");
    const bar = q(".loader__bar");
    const value = q(".loader__value");
    if (!hasGSAP) {
      document.body.classList.remove("is-loading");
      loader?.classList.add("is-hidden");
      return;
    }

    const state = { value: 0 };
    gsap.to(state, {
      value: 100,
      duration: 1.5,
      ease: "power2.inOut",
      onUpdate: () => {
        const number = Math.round(state.value);
        bar.style.width = `${number}%`;
        value.textContent = `${number}%`;
      },
      onComplete: () => {
        document.body.classList.remove("is-loading");
        loader.classList.add("is-hidden");
        runIntro();
        window.ScrollTrigger?.refresh();
      }
    });
  }

  function animateFollower(pathSelector, followerSelector, duration, delay = 0) {
    if (!hasGSAP || reducedMotion) return;
    const path = q(pathSelector);
    const follower = q(followerSelector);
    if (!path || !follower) return;
    const length = path.getTotalLength();
    const state = { progress: 0 };
    gsap.to(state, {
      progress: 1,
      duration,
      delay,
      repeat: -1,
      repeatDelay: 1.1,
      ease: "none",
      onUpdate: () => {
        const point = path.getPointAtLength(length * state.progress);
        follower.setAttribute("cx", point.x);
        follower.setAttribute("cy", point.y);
      }
    });
  }

  function runIntro() {
    if (!hasGSAP) return;
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    tl.from(".site-header", { y: -32, autoAlpha: 0, duration: .8 })
      .from(".hero__eyebrow", { y: 20, autoAlpha: 0, duration: .65 }, "-=.35")
      .from(".hero__title span", { yPercent: 115, autoAlpha: 0, stagger: .12, duration: 1.05 }, "-=.35")
      .from(".hero__arabic, .hero__summary", { y: 24, autoAlpha: 0, stagger: .1, duration: .75 }, "-=.55")
      .from(".hero__actions > *", { y: 18, autoAlpha: 0, stagger: .1, duration: .6 }, "-=.42")
      .from(".hero__identity", { x: 42, autoAlpha: 0, duration: .95 }, "-=.7")
      .from(".scroll-cue", { y: 16, autoAlpha: 0, duration: .5 }, "-=.35");

    qa(".hero-route").forEach((path, index) => {
      const length = path.getTotalLength();
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      gsap.to(path, { strokeDashoffset: 0, duration: 1.75 + index * .22, delay: .3 + index * .12, ease: "power2.out" });
    });
    gsap.fromTo(".command-star", { scale: 0, rotation: -35 }, { scale: 1, rotation: 0, duration: 1.15, delay: 1, ease: "back.out(2)" });
  }

  function initMotion() {
    if (!hasGSAP || !hasScrollTrigger) return;
    gsap.registerPlugin(ScrollTrigger);

    animateFollower("#route-1", ".route-follower--1", 7.6, 1.1);
    animateFollower("#route-2", ".route-follower--2", 9.2, 2.4);
    animateFollower("#route-3", ".route-follower--3", 10.8, 3.1);

    if (!reducedMotion) {
      gsap.to(".command-star", { scale: 1.13, duration: 1.8, repeat: -1, yoyo: true, ease: "sine.inOut" });
      gsap.to(".ambient__aurora--gold", { xPercent: -18, yPercent: 16, duration: 13, repeat: -1, yoyo: true, ease: "sine.inOut" });
      gsap.to(".ambient__aurora--blue", { xPercent: 16, yPercent: -12, duration: 17, repeat: -1, yoyo: true, ease: "sine.inOut" });
    }

    gsap.to(".page-progress span", {
      scaleX: 1,
      ease: "none",
      scrollTrigger: { trigger: document.documentElement, start: "top top", end: "bottom bottom", scrub: true }
    });

    ScrollTrigger.create({
      start: 80,
      onUpdate: (self) => q(".site-header")?.classList.toggle("is-scrolled", self.scroll() > 80)
    });

    gsap.to(".scroll-cue", { y: 24, autoAlpha: 0, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "25% top", scrub: true } });
    gsap.to(".hero__copy", { yPercent: 15, autoAlpha: .12, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1 } });
    gsap.to(".hero__identity", { yPercent: -11, autoAlpha: .18, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1 } });
    gsap.to(".hero-routes", { yPercent: 10, scale: 1.04, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1 } });
    gsap.to(".hero__earth", { yPercent: 16, scale: 1.06, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1.2 } });

    const revealSelectors = [
      ".programme__intro", ".programme__statement", ".selection__copy", ".selection-orbit",
      ".stations__header > *", ".station-console", ".competencies__header > *", ".assessment__intro",
      ".assessment-flow", ".governance-map", ".impact__header > *", ".impact-projects",
      ".admission__panel", ".command__inner > *"
    ];

    revealSelectors.forEach((selector) => {
      qa(selector).forEach((element) => gsap.from(element, {
        y: 48,
        autoAlpha: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: element, start: "top 86%", once: true }
      }));
    });

    qa(".programme__metrics article, .selection-gates article, .competency-card, .impact-card").forEach((card, index) => {
      gsap.from(card, {
        y: 36,
        autoAlpha: 0,
        scale: .97,
        duration: .75,
        delay: (index % 6) * .05,
        ease: "power3.out",
        scrollTrigger: { trigger: card, start: "top 88%", once: true }
      });
    });

    qa("[data-counter]").forEach((counter) => {
      const target = Number(counter.dataset.counter || 0);
      const state = { value: 0 };
      gsap.to(state, {
        value: target,
        duration: 1.6,
        ease: "power2.out",
        scrollTrigger: { trigger: counter, start: "top 90%", once: true },
        onUpdate: () => { counter.textContent = Math.round(state.value); }
      });
    });

    if (matchMedia("(min-width:901px)").matches) {
      const track = q(".journey__track");
      const section = q(".journey");
      const distance = () => Math.max(0, track.scrollWidth - innerWidth + innerWidth * .12);
      const journeyTween = gsap.to(track, {
        x: () => document.documentElement.dir === "rtl" ? distance() : -distance(),
        ease: "none",
        scrollTrigger: { trigger: section, start: "top top", end: "bottom bottom", scrub: 1, invalidateOnRefresh: true }
      });
      gsap.to(".journey__progress span", { scaleX: 1, ease: "none", scrollTrigger: { trigger: section, start: "top top", end: "bottom bottom", scrub: true } });
      qa(".journey-card").forEach((card) => gsap.from(card, {
        y: 55,
        autoAlpha: .25,
        scale: .94,
        ease: "none",
        scrollTrigger: { trigger: card, containerAnimation: journeyTween, start: "left 88%", end: "center center", scrub: true }
      }));
    }

    if (!reducedMotion) {
      gsap.to(".selection-orbit__ring--outer", { rotation: 360, duration: 45, repeat: -1, ease: "none" });
      gsap.to(".selection-orbit__ring--inner", { rotation: -360, duration: 32, repeat: -1, ease: "none" });
      gsap.to(".stations__globe", { yPercent: 12, ease: "none", scrollTrigger: { trigger: ".stations", start: "top bottom", end: "bottom top", scrub: 1 } });
      gsap.to(".governance-map", { rotation: .8, duration: 5, repeat: -1, yoyo: true, ease: "sine.inOut" });
    }

    gsap.from(".command__figure", { y: 140, autoAlpha: 0, duration: 1.4, ease: "power4.out", scrollTrigger: { trigger: ".command", start: "top 68%", once: true } });
    gsap.from(".command__light", { scaleY: 0, transformOrigin: "top", duration: 1.5, ease: "power3.out", scrollTrigger: { trigger: ".command", start: "top 72%", once: true } });
    gsap.from(".command__architecture i", { scale: .4, autoAlpha: 0, stagger: .12, duration: 1.2, ease: "power4.out", scrollTrigger: { trigger: ".command", start: "top 72%", once: true } });

    const sections = qa("main [data-section]");
    const railDots = qa(".section-rail i");
    sections.forEach((section, index) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",
        onToggle: ({ isActive }) => {
          if (!isActive) return;
          q(".section-rail__current").textContent = String(index + 1).padStart(2, "0");
          railDots.forEach((dot, dotIndex) => dot.classList.toggle("is-active", dotIndex === Math.min(index, railDots.length - 1)));
        }
      });
    });
  }

  function initCardTilt() {
    if (reducedMotion || !hasGSAP || !matchMedia("(pointer:fine)").matches) return;
    qa(".competency-card, .impact-card, .programme__metrics article").forEach((card) => {
      card.addEventListener("pointermove", (event) => {
        const rect = card.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width - .5;
        const py = (event.clientY - rect.top) / rect.height - .5;
        gsap.to(card, { rotateY: px * 5, rotateX: -py * 5, transformPerspective: 900, duration: .35, ease: "power2.out" });
      });
      card.addEventListener("pointerleave", () => gsap.to(card, { rotateY: 0, rotateX: 0, duration: .55, ease: "power3.out" }));
    });
  }

  function init() {
    initLanguage();
    initSmoothScroll();
    initMenu();
    initStations();
    initModals();
    initCursor();
    initMagnetic();
    initCardTilt();
    initParticles();
    initMotion();
    initLoader();

    document.addEventListener("visibilitychange", restartStationAutoplay);
    document.fonts?.ready?.then(() => window.ScrollTrigger?.refresh());
    addEventListener("resize", () => { clearTimeout(window.__samtResize); window.__samtResize = setTimeout(() => window.ScrollTrigger?.refresh(), 180); });
  }

  init();
})();
