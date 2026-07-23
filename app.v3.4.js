(() => {
  "use strict";
  window.SAMT_BUILD = "3.4.0";

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
  let stationAutoplayPaused = false;
  let stationLoadToken = 0;
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
      "selection.d7": "Critical thinking",
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
      "station.previous": "Previous station",
      "station.next": "Next station",
      "station.pause": "Pause station autoplay",
      "station.play": "Resume station autoplay",
      "station.unavailable": "Station artwork is temporarily unavailable.",
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
      "selection.d7": "التفكير النقدي",
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
      "station.previous": "المحطة السابقة",
      "station.next": "المحطة التالية",
      "station.pause": "إيقاف التنقل التلقائي بين المحطات",
      "station.play": "استئناف التنقل التلقائي بين المحطات",
      "station.unavailable": "يتعذر عرض المشهد المتحرك للمحطة مؤقتاً.",
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
        subtitle: "National foundation, sovereign capability and transformation",
        body: "A three-week national foundation station connecting leadership formation with the UAE defence, aviation, advanced-technology and sustainability ecosystems.",
        duration: "3 weeks",
        focus: "National capability & transformation",
        points: [
          "Tawazun and national capability governance",
          "EDGE and GAL defence and aviation ecosystems",
          "TII, Masdar, emerging technology and sustainability"
        ],
        hosts: ["Tawazun Council", "EDGE Group", "Global Aerospace Logistics — GAL", "Technology Innovation Institute — TII", "Masdar"],
        learning: ["National capability governance and strategic alignment", "Defence and aviation industrial development", "Advanced technology, innovation and sustainability"],
        outcomes: ["Common national strategic foundation", "Stronger understanding of the UAE capability ecosystem", "Readiness for international comparative exposure"],
        highlights: ["Executive and technical briefings", "Institutional, industrial and laboratory visits", "Leadership reflection and applied assignments"],
        image: "assets/stations/uae-animated-v3.4.svg"
      },
      uk: {
        code: "UK",
        title: "United Kingdom",
        subtitle: "Professional military education, governance and defence programmes",
        body: "A six-week station combining professional military education, leadership formation and exposure to organisations and leading companies supporting United Kingdom Ministry of Defence programmes.",
        duration: "6 weeks",
        focus: "Military education & defence programmes",
        points: ["RAF Cosford and air-power professional education", "Royal Military Academy Sandhurst leadership formation", "Leading companies supporting UK MOD programmes"],
        hosts: ["RAF Cosford", "Royal Military Academy Sandhurst", "Leading companies associated with UK Ministry of Defence programmes"],
        learning: ["Strategic studies, command judgement and air-power context", "Leadership, discipline and professional military ethos", "Defence programme governance, industry and delivery"],
        outcomes: ["Broader strategic and military perspective", "Stronger leadership and command understanding", "Improved policy, programme and industry integration"],
        highlights: ["Professional military education", "Senior-leader and institutional engagement", "Defence-industry and programme visits"],
        image: "assets/stations/uk-animated-v3.4.svg"
      },
      france: {
        code: "FRANCE",
        title: "France",
        subtitle: "European industry, partnerships and strategic engagement",
        body: "A three-week European station centred on EDGE Europe, its offices and relevant companies connected through approved memoranda of understanding or contractual relationships.",
        duration: "3 weeks",
        focus: "European partnerships & industry",
        points: ["EDGE Europe strategy and operating model", "European offices and affiliated industrial companies", "Engagement with companies covered by MoUs or contracts"],
        hosts: ["EDGE Europe", "Relevant EDGE Europe offices", "Companies connected through approved MoUs or contracts"],
        learning: ["European defence-industry engagement", "Partnership, contract and stakeholder management", "Industrial cooperation and international business development"],
        outcomes: ["Understanding of the European partner ecosystem", "Stronger commercial and government-relations perspective", "Improved partnership and negotiation capability"],
        highlights: ["Executive and partner-company briefings", "Office, facility and industrial visits", "Partnership and contract case studies"],
        image: "assets/stations/france-animated-v3.4.svg"
      },
      usa: {
        code: "USA",
        title: "United States of America",
        subtitle: "Defence cooperation, acquisition and strategic education",
        body: "A four-week station focused on the United States Department of Defense, government-to-government cooperation, Foreign Military Sales, strategic education and defence acquisition ecosystems.",
        duration: "4 weeks",
        focus: "Defence cooperation & acquisition",
        points: ["U.S. Department of Defense and government-to-government programmes", "Foreign Military Sales and security-cooperation processes", "Naval Postgraduate School, War College and strategic education"],
        hosts: ["United States Department of Defense", "Government-to-government and Foreign Military Sales programme stakeholders", "Naval Postgraduate School — NPS", "War College institutions and related strategic-education organisations"],
        learning: ["Security cooperation, G-to-G and FMS governance", "Acquisition, programme and stakeholder management", "Strategic studies, innovation and defence transformation"],
        outcomes: ["Improved understanding of U.S. defence-cooperation mechanisms", "Stronger acquisition and programme-management perspective", "Expanded strategic-education and transformation capability"],
        highlights: ["DoD and programme briefings", "NPS and War College engagements", "Security-cooperation, acquisition and innovation visits"],
        image: "assets/stations/usa-animated-v3.4.svg"
      }
    },
    ar: {
      uae: {
        code: "الإمارات",
        title: "دولة الإمارات العربية المتحدة",
        subtitle: "التأسيس الوطني والقدرات السيادية والتحول",
        body: "محطة تأسيس وطنية لمدة ثلاثة أسابيع تربط إعداد القيادة بمنظومات الدفاع والطيران والتقنيات المتقدمة والاستدامة في دولة الإمارات.",
        duration: "3 أسابيع",
        focus: "القدرات الوطنية والتحول",
        points: ["مجلس التوازن وحوكمة القدرات الوطنية", "منظومات إيدج وGAL في الدفاع والطيران", "معهد الابتكار التكنولوجي TII ومصدر والتقنيات الناشئة والاستدامة"],
        hosts: ["مجلس التوازن", "مجموعة إيدج", "جلوبال إيروسبيس لوجستكس — GAL", "معهد الابتكار التكنولوجي — TII", "مصدر"],
        learning: ["حوكمة القدرات الوطنية والمواءمة الاستراتيجية", "تطوير الصناعات الدفاعية والجوية", "التقنيات المتقدمة والابتكار والاستدامة"],
        outcomes: ["أساس استراتيجي وطني مشترك", "فهم أعمق لمنظومة القدرات في دولة الإمارات", "الجاهزية للمقارنة والتعرض الدولي"],
        highlights: ["إحاطات تنفيذية وفنية", "زيارات مؤسسية وصناعية ومختبرية", "تأملات قيادية ومهام تطبيقية"],
        image: "assets/stations/uae-animated-v3.4.svg"
      },
      uk: {
        code: "المملكة المتحدة",
        title: "المملكة المتحدة",
        subtitle: "التعليم العسكري المهني والحوكمة والبرامج الدفاعية",
        body: "محطة لمدة ستة أسابيع تجمع بين التعليم العسكري المهني وصقل القيادة والتعرض للمؤسسات والشركات الرائدة الداعمة لبرامج وزارة الدفاع البريطانية.",
        duration: "6 أسابيع",
        focus: "التعليم العسكري والبرامج الدفاعية",
        points: ["RAF Cosford والتعليم المهني للقوة الجوية", "الأكاديمية العسكرية الملكية ساندهيرست وصقل القيادة", "الشركات الرائدة الداعمة لبرامج وزارة الدفاع البريطانية"],
        hosts: ["RAF Cosford", "الأكاديمية العسكرية الملكية ساندهيرست", "الشركات الرائدة المرتبطة ببرامج وزارة الدفاع البريطانية"],
        learning: ["الدراسات الاستراتيجية والحكم القيادي وسياق القوة الجوية", "القيادة والانضباط والقيم العسكرية المهنية", "حوكمة البرامج الدفاعية والصناعة والتنفيذ"],
        outcomes: ["منظور استراتيجي وعسكري أوسع", "فهم أقوى للقيادة وتحمل المسؤولية", "تحسين التكامل بين السياسة والبرامج والصناعة"],
        highlights: ["تعليم عسكري مهني", "تفاعل مع القيادات والمؤسسات", "زيارات للبرامج والصناعات الدفاعية"],
        image: "assets/stations/uk-animated-v3.4.svg"
      },
      france: {
        code: "فرنسا",
        title: "الجمهورية الفرنسية",
        subtitle: "الصناعة الأوروبية والشراكات والتفاعل الاستراتيجي",
        body: "محطة أوروبية لمدة ثلاثة أسابيع تتمحور حول إيدج أوروبا ومكاتبها والشركات ذات الصلة المرتبطة بمذكرات تفاهم أو عقود معتمدة.",
        duration: "3 أسابيع",
        focus: "الشراكات والصناعة الأوروبية",
        points: ["استراتيجية إيدج أوروبا ونموذج عملها", "المكاتب الأوروبية والشركات الصناعية المرتبطة", "التفاعل مع الشركات المشمولة بمذكرات تفاهم أو عقود"],
        hosts: ["إيدج أوروبا", "مكاتب إيدج أوروبا ذات الصلة", "الشركات المرتبطة بمذكرات تفاهم أو عقود معتمدة"],
        learning: ["التفاعل مع الصناعات الدفاعية الأوروبية", "إدارة الشراكات والعقود وأصحاب المصلحة", "التعاون الصناعي وتطوير الأعمال الدولية"],
        outcomes: ["فهم منظومة الشركاء الأوروبيين", "تعزيز منظور العلاقات التجارية والحكومية", "تحسين قدرات الشراكة والتفاوض"],
        highlights: ["إحاطات تنفيذية مع الشركات الشريكة", "زيارات للمكاتب والمنشآت والمواقع الصناعية", "دراسات حالة في الشراكات والعقود"],
        image: "assets/stations/france-animated-v3.4.svg"
      },
      usa: {
        code: "الولايات المتحدة",
        title: "الولايات المتحدة الأمريكية",
        subtitle: "التعاون الدفاعي والاستحواذ والتعليم الاستراتيجي",
        body: "محطة لمدة أربعة أسابيع تركز على وزارة الدفاع الأمريكية وبرامج التعاون الحكومي بين الدول والمبيعات العسكرية الأجنبية والتعليم الاستراتيجي ومنظومات الاستحواذ الدفاعي.",
        duration: "4 أسابيع",
        focus: "التعاون الدفاعي والاستحواذ",
        points: ["وزارة الدفاع الأمريكية وبرامج التعاون الحكومي بين الدول", "المبيعات العسكرية الأجنبية وإجراءات التعاون الأمني", "كلية الدراسات العليا البحرية NPS وكليات الحرب والتعليم الاستراتيجي"],
        hosts: ["وزارة الدفاع الأمريكية", "أصحاب المصلحة في برامج التعاون الحكومي والمبيعات العسكرية الأجنبية", "كلية الدراسات العليا البحرية — NPS", "كليات الحرب ومؤسسات التعليم الاستراتيجي ذات الصلة"],
        learning: ["حوكمة التعاون الأمني وبرامج G-to-G وFMS", "إدارة الاستحواذ والبرامج وأصحاب المصلحة", "الدراسات الاستراتيجية والابتكار والتحول الدفاعي"],
        outcomes: ["فهم أفضل لآليات التعاون الدفاعي الأمريكية", "تعزيز منظور الاستحواذ وإدارة البرامج", "توسيع قدرات التعليم الاستراتيجي والتحول"],
        highlights: ["إحاطات وزارة الدفاع والبرامج", "تفاعلات مع NPS وكليات الحرب", "زيارات في التعاون الأمني والاستحواذ والابتكار"],
        image: "assets/stations/usa-animated-v3.4.svg"
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
    updateStationControlLabels();
    const languageToggle = q(".language-toggle");
    if (languageToggle) languageToggle.setAttribute("aria-label", currentLanguage === "ar" ? "Switch to English" : "التبديل إلى العربية");
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

  function updateStationControlLabels() {
    const previous = q("[data-station-prev]");
    const next = q("[data-station-next]");
    const pause = q("[data-station-pause]");
    const dictionary = translations[currentLanguage];
    previous?.setAttribute("aria-label", dictionary["station.previous"]);
    next?.setAttribute("aria-label", dictionary["station.next"]);
    if (pause) {
      pause.setAttribute("aria-label", dictionary[stationAutoplayPaused ? "station.play" : "station.pause"]);
      pause.setAttribute("aria-pressed", String(stationAutoplayPaused));
      const icon = q("span", pause);
      if (icon) icon.textContent = stationAutoplayPaused ? "▶" : "Ⅱ";
      pause.classList.toggle("is-paused", stationAutoplayPaused);
    }
  }

  function preloadRemainingStationAssets() {
    const paths = stationOrder.slice(1).map((key) => stationData.en[key].image);
    const load = () => paths.forEach((src) => {
      const image = new Image();
      image.decoding = "async";
      image.src = src;
    });
    if ("requestIdleCallback" in window) requestIdleCallback(load, { timeout: 2500 });
    else setTimeout(load, 1200);
  }

  function updateStation(key, animate = true) {
    const data = stationData[currentLanguage][key];
    if (!data) return;
    stationIndex = stationOrder.indexOf(key);
    const token = ++stationLoadToken;

    const stage = q(".station-stage");
    const visual = q(".station-stage__visual");
    const content = q(".station-stage__content");
    const image = q("#station-image");
    const fallback = q("#station-fallback");

    const applyContent = () => {
      q("#station-title").textContent = data.title;
      q("#station-subtitle").textContent = data.subtitle;
      q("#station-body").textContent = data.body;
      q("#station-duration").textContent = data.duration;
      q("#station-focus").textContent = data.focus;
      q(".station-stage__caption").textContent = `${currentLanguage === "ar" ? "المحطة" : "STATION"} 0${stationIndex + 1} / ${data.code}`;
      q("#station-points").innerHTML = data.points.map((item) => `<li>${item}</li>`).join("");

      qa(".station-route__node").forEach((node, index) => {
        const active = index === stationIndex;
        node.classList.toggle("is-active", active);
        node.tabIndex = active ? 0 : -1;
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

    const applyArtwork = () => {
      if (!image) return;
      stage?.setAttribute("aria-busy", "true");
      const probe = new Image();
      probe.decoding = "async";
      probe.onload = () => {
        if (token !== stationLoadToken) return;
        image.src = data.image;
        image.alt = currentLanguage === "ar" ? `مشهد متحرك لمحطة ${data.title}` : `Animated ${data.title} preparation station`;
        image.hidden = false;
        if (fallback) fallback.hidden = true;
        stage?.setAttribute("aria-busy", "false");
      };
      probe.onerror = () => {
        if (token !== stationLoadToken) return;
        image.hidden = true;
        if (fallback) {
          fallback.textContent = translations[currentLanguage]["station.unavailable"];
          fallback.hidden = false;
        }
        stage?.setAttribute("aria-busy", "false");
      };
      probe.src = data.image;
    };

    const apply = () => {
      applyContent();
      applyArtwork();
    };

    if (animate && hasGSAP && !reducedMotion) {
      const tl = gsap.timeline();
      tl.to([visual, content], { autoAlpha: 0, y: 16, duration: .22, stagger: .035, ease: "power2.in" })
        .add(apply)
        .fromTo([visual, content], { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: .52, stagger: .055, ease: "power4.out" });
    } else {
      apply();
    }
    restartStationAutoplay();
  }

  function restartStationAutoplay() {
    clearTimeout(stationTimer);
    if (reducedMotion || document.hidden || stationAutoplayPaused) return;
    stationTimer = setTimeout(() => updateStation(stationOrder[(stationIndex + 1) % stationOrder.length]), 9000);
  }

  function initStations() {
    const nodes = qa(".station-route__node");
    nodes.forEach((button, index) => {
      button.tabIndex = index === 0 ? 0 : -1;
      button.addEventListener("click", () => updateStation(button.dataset.station));
      button.addEventListener("keydown", (event) => {
        const isRtl = document.documentElement.dir === "rtl";
        let target = null;
        if (event.key === "Home") target = 0;
        if (event.key === "End") target = nodes.length - 1;
        if (event.key === "ArrowRight") target = (index + (isRtl ? -1 : 1) + nodes.length) % nodes.length;
        if (event.key === "ArrowLeft") target = (index + (isRtl ? 1 : -1) + nodes.length) % nodes.length;
        if (target === null) return;
        event.preventDefault();
        nodes[target].focus();
        updateStation(nodes[target].dataset.station);
      });
    });

    q("[data-station-prev]")?.addEventListener("click", () => updateStation(stationOrder[(stationIndex - 1 + stationOrder.length) % stationOrder.length]));
    q("[data-station-next]")?.addEventListener("click", () => updateStation(stationOrder[(stationIndex + 1) % stationOrder.length]));
    q("[data-station-pause]")?.addEventListener("click", () => {
      stationAutoplayPaused = !stationAutoplayPaused;
      updateStationControlLabels();
      if (stationAutoplayPaused) clearTimeout(stationTimer);
      else restartStationAutoplay();
    });

    const consoleElement = q(".station-console");
    consoleElement?.addEventListener("mouseenter", () => clearTimeout(stationTimer));
    consoleElement?.addEventListener("mouseleave", restartStationAutoplay);
    consoleElement?.addEventListener("focusin", () => clearTimeout(stationTimer));
    consoleElement?.addEventListener("focusout", (event) => {
      if (!consoleElement.contains(event.relatedTarget)) restartStationAutoplay();
    });

    updateStationControlLabels();
    updateStation(stationOrder[0], false);
    preloadRemainingStationAssets();
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


  function initActiveNavigation() {
    const links = qa('.desktop-nav a[href^="#"]');
    const pairs = links.map((link) => ({ link, section: q(link.getAttribute('href')) })).filter((item) => item.section);
    if (!pairs.length || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      pairs.forEach(({ link, section }) => link.classList.toggle('is-active', section === visible.target));
    }, { rootMargin: '-30% 0px -55% 0px', threshold: [0, .15, .35, .6] });
    pairs.forEach(({ section }) => observer.observe(section));
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

  function initHeroParallax() {
    if (reducedMotion || !hasGSAP || !matchMedia("(pointer:fine)").matches) return;
    const hero = q(".hero");
    const earth = q(".hero__earth");
    const network = q(".hero__earth-surface");
    const glow = q(".hero__earth-glow");
    if (!hero || !earth || !network || !glow) return;
    const reset = () => {
      gsap.to(earth, { x: 0, y: 0, duration: 1.1, ease: "power3.out", overwrite: "auto" });
      gsap.to(network, { x: 0, y: 0, duration: 1.2, ease: "power3.out", overwrite: "auto" });
      gsap.to(glow, { x: 0, y: 0, duration: 1.35, ease: "power3.out", overwrite: "auto" });
    };
    hero.addEventListener("pointermove", (event) => {
      const rect = hero.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - .5;
      const py = (event.clientY - rect.top) / rect.height - .5;
      gsap.to(earth, { x: px * -10, y: py * -7, duration: 1.1, ease: "power3.out", overwrite: "auto" });
      gsap.to(network, { x: px * 15, y: py * 10, duration: .95, ease: "power3.out", overwrite: "auto" });
      gsap.to(glow, { x: px * 22, y: py * 16, duration: 1.2, ease: "power3.out", overwrite: "auto" });
    });
    hero.addEventListener("pointerleave", reset);
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
    gsap.to(".hero__earth", { yPercent: 6, scale: 1.025, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1.2 } });
    gsap.to(".hero__earth-surface", { yPercent: 4, xPercent: -1.4, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1.35 } });
    gsap.to(".hero__earth-lines", { yPercent: 2, xPercent: 1.2, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1.5 } });

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
    initActiveNavigation();
    initModals();
    initCursor();
    initMagnetic();
    initCardTilt();
    initHeroParallax();
    initParticles();
    initMotion();
    initLoader();

    document.addEventListener("visibilitychange", restartStationAutoplay);
    document.fonts?.ready?.then(() => window.ScrollTrigger?.refresh());
    addEventListener("resize", () => { clearTimeout(window.__samtResize); window.__samtResize = setTimeout(() => window.ScrollTrigger?.refresh(), 180); });
  }

  init();
})();
