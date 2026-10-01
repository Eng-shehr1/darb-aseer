/* Darb Aseer — bilingual UI strings (English / Arabic) and theme/language helpers */

const LANG_KEY = "darbAseerLang";
const THEME_KEY = "darbAseerTheme";
const LANG_NAMES = { en: "English", ar: "العربية" };

const STRINGS = {
  en: {
    pageTitle: "Darb Aseer — One trip. Something for everyone.",
    metaDescription: "Plan a day in Abha around your group, explore local places and play the story challenge with Darb Aseer.",
    brandName: "Darb Aseer",
    newTrip: "New trip",
    darkMode: "Dark mode",
    lightMode: "Light mode",

    tagline: "One trip. Something for everyone.",
    planOurDay: "Plan our day",
    planSolo: "Plan just for me",
    trySample: "Try a sample group",
    introNote: "Answer a few questions for each person, discover what you share, and build a day with something for everyone.",

    soloBadge: "Solo trip",
    soloSummarySubtitle: "Review your answers, then explore your suggested day.",
    soloInviteEyebrow: "Your day, your way",
    soloInviteTitle: "Where should I go today?",
    soloInviteText: "Three stops shaped around what you like. Make them your own.",
    soloFooterNote: "Review your answers, then open your suggested day. Swap stops and try the story challenge.",

    back: "Back",
    createTripTitle: "Create your trip",
    createTripSubtitle: "Add your group, then let each person answer on this device.",
    tripNameLabel: "Trip name",
    tripNamePlaceholder: "For example: Family day in Aseer",
    groupSizeLabel: "Group size",
    participantNamesLabel: "Participant names",
    participantNamePlaceholder: "Participant name",
    budgetLabel: "Daily budget for the whole group",
    budgetPlaceholder: "For example: 600",
    sarPerDay: "SAR / day",
    startPointLabel: "Starting point",
    startPointPlaceholder: "For example: Abha or your hotel",
    tripLengthLabel: "Trip length",
    oneDayNotice: "One day in this version",
    setupErrorText: "Please complete all fields and enter a budget greater than zero.",
    startQuestionnaire: "Start questionnaire",

    confirmNewTrip: "Start a new trip? This will remove the current trip from this device.",
    storageUnavailable: "Saving is unavailable on this device. You can continue, but your trip may be lost when you close the page.",

    personOfTotal: "Person {p} of {total}",
    yourTurnName: "Your turn, {name}",
    handoffTextFirst: "Pass the device to this person so they can choose their own answers.",
    handoffTextNext: "Pass the device to this person. Give them space to answer without being influenced by the group.",

    answeringNow: "Answering now:",
    personQuestionProgress: "Person {p} of {total} · Question {step} of {totalSteps}",
    previous: "Previous",
    next: "Next",
    finalStepTitle: "Finally, your wish and essential needs",
    finalStepHint: "This is the final step of your questionnaire.",
    needsDiffLabel: "What is the difference?",
    needsDiffText: "A wish would make your day special. A need is essential for your comfort or safety and must be checked before visiting.",
    wishSectionLabel: "One wish for your trip (optional)",
    wishPlaceholder: "For example: I would love to watch the sunset from a viewpoint.",
    needsSectionLabel: "Essential needs (select all that apply)",
    otherNeedPlaceholder: "Describe your other need here",
    finishQuestionnaire: "Finish questionnaire",

    allAgreeTemplate: 'Everyone agrees on "{option}"',
    someAgreeTemplate: '{names} agree on "{option}"',
    sharePreferenceTemplate: '{names} share a preference for "{option}"',
    commonHeading: "What you have in common",
    commonEmpty: "Your answers are different, and that is fine. Your suggested day will aim to balance those differences.",
    differHeading: "Where your preferences differ",
    differEmpty: "Your answers are similar across the questionnaire.",
    comparedWith: "; compared with ",
    wishesHeading: "Everyone’s wishes",
    wishesEmpty: "No wishes added yet.",
    needsHeading: "Essential needs to consider",
    needsEmpty: "No essential needs recorded.",
    footerNote: "Review your answers, then open your suggested day. Swap stops and try the story challenge.",
    startNewTrip: "Start a new trip",
    editBtn: "Edit",
    peopleCount: "{n} people",
    sarPerDayBadge: "{n} SAR/day",
    oneDayBadge: "One day",
    summarySubtitle: "Review your group before exploring your suggested day.",

    inviteEyebrow: "Your preferences, your day",
    inviteTitle: "Where shall we go together?",
    inviteText: "Three stops shaped around your group. Make them your own.",
    openPlanBtn: "Explore our day",

    needsNoticeWithNeeds: "Your group has essential needs. Access, shade and walking conditions are not verified. Check that each stop meets those needs before confirming your visit.",
    needsNoticeDefault: "Check opening hours and visitor access before setting off.",
    planEyebrow: "Your suggested day · Abha",
    printPlan: "Print itinerary",
    metricStops: "Stops",
    metricDuration: "Including travel buffers",
    metricSpend: "Group spending allowance",
    overBudgetText: "This allowance exceeds your budget by {amount} SAR. Reduce spending or swap a stop.",
    underBudgetText: "Budget remaining after stop allowances: {amount} SAR for transport, food and other expenses.",
    estimateNote: "Estimates may change and do not include accommodation or confirmed booking prices.",
    suggestedStartLabel: "Suggested start time",
    rebalanceBtn: "Rebalance our stops",
    startingPointNote: "Your starting point: {point}. This is a sample day within Abha. Travel from your starting point, opening hours and sunset times have not been calculated.",
    coverageTitle: "A place for everyone in your day",
    coverageUnknown: "A chance to discover different interests",
    coverageMatches: "{n} stops matching your interest",
    coverageNoMatch: "Your interest is not directly covered. Try swapping a stop.",
    exploreStopsHeading: "Explore the stops",
    schematicNote: "Schematic layout only. Not to scale or for navigation.",
    mapKeyIn: "● In your plan",
    mapKeyOut: "○ Explore another stop",
    mapCaptionDefault: "Select a marker to explore a place.",
    storiesEyebrow: "Stories along the way",
    discoverTogetherTitle: "Discover the stories together",
    discoverTogetherText: "A short challenge about Al Muftaha and Abha Dam Lake.",
    playAgain: "Play again",
    playQuiz: "Play the story challenge",
    lastScore: "Last score: {score} / {total} · Story Explorer badge",
    sourcesDetailsSummary: "How are stops chosen? What should we check?",
    sourcesP1: "We compare three-stop combinations and prioritize those that represent the most people, then consider wishes, atmosphere, activity, variety and budget. Wishes are matched using keywords, not full language understanding. High-effort options are excluded for mobility needs or light-activity preferences. This does not confirm the accessibility of other stops.",
    sourcesP2: "Place descriptions refer to the sources on each card. Durations, spending allowances and effort levels are planning estimates, not verified operating information. Accessibility and opening hours have not been checked. The starting point is a text entry, not a navigation route.",

    stopTimeLabel: "{begin} — {end} · {minutes} suggested minutes",
    stopReasonMatch: "Matches the interests of {names}",
    stopReasonVariety: "A stop for variety and discovery",
    stopReasonWishSuffix: " · May match a wish from {names}",
    spendNote: "Suggested spending allowance: {amount} SAR for the group — not a confirmed admission price.",
    viewOnMap: "View on map",
    locationDirections: "Location and directions",
    aboutThisPlace: "About this place",
    swapLabel: "Swap this stop",
    replaceAria: "Replace {name}",
    transferNote: "30-minute buffer for travel and rest — not a calculated driving time",

    mapIframeTitle: "Map: {name}",
    openMapLink: "Open map: {name} ↗",
    mapNeedsInternet: "The external map needs internet access. If it does not load, use the location link.",

    quizProgress: "{step} / {total} — {question}",
    correctAnswer: "Correct answer!",
    correctAnswerWas: "Correct answer: {answer}",
    storySource: "Story source",
    nextQuestion: "Next question",
    seeResults: "See results",
    storyExplorerBadge: "Story Explorer badge",
    challengeComplete: "Challenge complete · {score} / {total} correct answers",
    badgeNote: "A digital learning badge, not proof of a visit.",
  },
  ar: {
    pageTitle: "درب عسير — رحلة واحدة، لكل واحد فيها شيء يحبه",
    metaDescription: "خطّطوا يومًا في أبها يناسب مجموعتكم، واستكشفوا أماكن محلية وجرّبوا تحدي القصص مع درب عسير.",
    brandName: "درب عسير",
    newTrip: "رحلة جديدة",
    darkMode: "الوضع الليلي",
    lightMode: "الوضع النهاري",

    tagline: "رحلة واحدة، لكل واحد فيها شيء يحبه",
    planOurDay: "خطط يومنا",
    planSolo: "خطط لي بمفردي",
    trySample: "جرّب بيانات مجموعة جاهزة",
    introNote: "يجاوب كل فرد على بضع أسئلة بسيطة، فتكتشفون ما تتشاركونه، ثم نبني يومًا فيه شيء يناسب كل واحد.",

    soloBadge: "رحلة فردية",
    soloSummarySubtitle: "راجع إجاباتك، ثم استكشف يومك المقترح.",
    soloInviteEyebrow: "يومك على راحتك",
    soloInviteTitle: "إلى أين أذهب اليوم؟",
    soloInviteText: "ثلاث محطات مصمّمة حسب ما يناسبك. اجعلها خاصة بك.",
    soloFooterNote: "راجع إجاباتك، ثم افتح يومك المقترح. بدّل المحطات وجرّب تحدي القصص.",

    back: "رجوع",
    createTripTitle: "أنشئ رحلتكم",
    createTripSubtitle: "أضيفوا بيانات المجموعة، وبعدها كل مشارك يجاوب على هذا الجهاز.",
    tripNameLabel: "اسم الرحلة",
    tripNamePlaceholder: "مثال: رحلة العائلة إلى عسير",
    groupSizeLabel: "عدد المشاركين",
    participantNamesLabel: "أسماء المشاركين",
    participantNamePlaceholder: "اسم المشارك",
    budgetLabel: "ميزانية المجموعة اليومية",
    budgetPlaceholder: "مثال: 600",
    sarPerDay: "ر.س / يوم",
    startPointLabel: "نقطة البداية",
    startPointPlaceholder: "مثال: أبها، أو الفندق الذي ستنطلقون منه",
    tripLengthLabel: "مدة الرحلة",
    oneDayNotice: "في هذه النسخة: يوم واحد",
    setupErrorText: "فضلاً عبّوا جميع الحقول وأدخلوا ميزانية أكبر من صفر.",
    startQuestionnaire: "ابدأ الاستبيان",

    confirmNewTrip: "هل تريدون بدء رحلة جديدة؟ سيؤدي ذلك إلى حذف الرحلة الحالية من هذا الجهاز.",
    storageUnavailable: "الحفظ غير متاح على هذا الجهاز. يمكنكم الاستمرار، لكن قد تضيع بيانات الرحلة عند إغلاق الصفحة.",

    personOfTotal: "الشخص {p} من {total}",
    yourTurnName: "دور {name} الآن",
    handoffTextFirst: "لنبدأ! سلّموا الجهاز لهذا المشارك، فالأسئلة شخصية وإجاباتها تخصه وحده.",
    handoffTextNext: "سلّموا الجهاز لهذا المشارك، واتركوا له مساحة ليجاوب دون أن يتأثر بآراء بقية المجموعة.",

    answeringNow: "يجاوب الآن:",
    personQuestionProgress: "الشخص {p} من {total} · السؤال {step} من {totalSteps}",
    previous: "السابق",
    next: "التالي",
    finalStepTitle: "أخيرًا، أمنيتك واحتياجاتك الضرورية",
    finalStepHint: "هذه آخر خطوة في استبيانك.",
    needsDiffLabel: "ما الفرق بينهما؟",
    needsDiffText: "الأمنية شيء يجعل يومكم مميزًا، لكنه غير ضروري. أما الاحتياج فهو أساسي لراحتكم أو سلامتكم، ويجب التأكد منه قبل الزيارة.",
    wishSectionLabel: "أمنية واحدة لرحلتك (اختياري)",
    wishPlaceholder: "مثال: أتمنى أن أشاهد غروب الشمس من مكان مرتفع.",
    needsSectionLabel: "الاحتياجات الضرورية (اختر كل ما ينطبق)",
    otherNeedPlaceholder: "وضّح احتياجك الآخر هنا",
    finishQuestionnaire: "إنهاء الاستبيان",

    allAgreeTemplate: 'اتفق الجميع على "{option}"',
    someAgreeTemplate: 'يتفق {names} على "{option}"',
    sharePreferenceTemplate: 'يشترك {names} في تفضيل "{option}"',
    commonHeading: "ما يجمعكم",
    commonEmpty: "إجاباتكم مختلفة، وهذا طبيعي تمامًا. سيوازن يومكم المقترح بين هذه الاختلافات.",
    differHeading: "نقاط الاختلاف بينكم",
    differEmpty: "إجاباتكم متقاربة في كل الاستبيان.",
    comparedWith: "؛ مقابل ",
    wishesHeading: "أمنيات الجميع",
    wishesEmpty: "لم تتم إضافة أي أمنية بعد.",
    needsHeading: "احتياجات ضرورية يجب مراعاتها",
    needsEmpty: "لا توجد احتياجات ضرورية مسجّلة.",
    footerNote: "راجعوا إجاباتكم، ثم افتحوا يومكم المقترح. بدّلوا المحطات وجرّبوا تحدي القصص.",
    startNewTrip: "بدء رحلة جديدة",
    editBtn: "تعديل",
    peopleCount: "{n} مشاركين",
    sarPerDayBadge: "{n} ر.س/يوم",
    oneDayBadge: "يوم واحد",
    summarySubtitle: "راجعوا بيانات مجموعتكم قبل استكشاف يومكم المقترح.",

    inviteEyebrow: "تفضيلاتكم، يومكم",
    inviteTitle: "إلى أين نذهب معًا؟",
    inviteText: "ثلاث محطات مصمّمة حول مجموعتكم. اجعلوها خاصة بكم.",
    openPlanBtn: "استكشف يومنا",

    needsNoticeWithNeeds: "لمجموعتكم احتياجات ضرورية. إمكانية الوصول والظل وحالة المشي غير موثّقة. تأكدوا من ملاءمة كل محطة لهذه الاحتياجات قبل تأكيد الزيارة.",
    needsNoticeDefault: "تحقّقوا من ساعات العمل وإمكانية الزيارة قبل الانطلاق.",
    planEyebrow: "يومكم المقترح · أبها",
    printPlan: "طباعة البرنامج",
    metricStops: "محطات",
    metricDuration: "تشمل فواصل التنقل",
    metricSpend: "مخصص إنفاق المجموعة",
    overBudgetText: "يتجاوز هذا المخصص ميزانيتكم بمقدار {amount} ر.س. قلّلوا الإنفاق أو بدّلوا محطة.",
    underBudgetText: "المتبقي من الميزانية بعد مخصصات المحطات: {amount} ر.س للتنقل والطعام ومصاريف أخرى.",
    estimateNote: "التقديرات قابلة للتغير ولا تشمل الإقامة أو أسعار حجز مؤكدة.",
    suggestedStartLabel: "وقت البداية المقترح",
    rebalanceBtn: "أعد موازنة محطاتنا",
    startingPointNote: "نقطة بدايتكم: {point}. هذا يوم تجريبي داخل أبها. لم يُحسب التنقل من نقطة بدايتكم، ولا ساعات العمل، ولا وقت الغروب.",
    coverageTitle: "مكان لكل واحد في يومكم",
    coverageUnknown: "فرصة لاكتشاف اهتمامات مختلفة",
    coverageMatches: "{n} محطات تناسب اهتمامك",
    coverageNoMatch: "اهتمامك غير مغطى مباشرة. جرّب تبديل محطة.",
    exploreStopsHeading: "استكشف المحطات",
    schematicNote: "مخطط تقريبي فقط، وليس بمقياس دقيق أو للتنقل.",
    mapKeyIn: "● في خطتكم",
    mapKeyOut: "○ استكشف محطة أخرى",
    mapCaptionDefault: "اختر علامة لاستكشاف مكان.",
    storiesEyebrow: "قصص في الطريق",
    discoverTogetherTitle: "استكشفوا القصص معًا",
    discoverTogetherText: "تحدٍّ قصير عن المفتاحة وبحيرة سد أبها.",
    playAgain: "العب مرة أخرى",
    playQuiz: "جرّب تحدي القصص",
    lastScore: "آخر نتيجة: {score} / {total} · وسام مستكشف القصص",
    sourcesDetailsSummary: "كيف تُختار المحطات؟ وما الذي يجب التحقق منه؟",
    sourcesP1: "نقارن احتمالات ثلاث محطات ونعطي الأولوية لتمثيل أكبر عدد من الأشخاص، ثم نأخذ بالاعتبار الأمنيات والأجواء والنشاط والتنوع والميزانية. تُطابق الأمنيات بكلمات مفتاحية، لا بفهم لغوي كامل. تُستبعد الخيارات ذات المجهود العالي عند وجود احتياجات حركة أو تفضيل نشاط خفيف. هذا لا يعني أن باقي المحطات موثّقة الملاءمة لذوي الإعاقة.",
    sourcesP2: "أوصاف الأماكن تشير إلى المصادر الموجودة في كل بطاقة. المدد ومخصصات الإنفاق ومستويات المجهود تقديرات تخطيطية، لا معلومات تشغيل موثّقة. لم تُفحص إمكانية الوصول ولا ساعات العمل. نقطة البداية نص مكتوب، وليست مسار تنقل.",

    stopTimeLabel: "{begin} — {end} · {minutes} دقيقة مقترحة",
    stopReasonMatch: "يناسب اهتمامات {names}",
    stopReasonVariety: "محطة للتنوع والاكتشاف",
    stopReasonWishSuffix: " · قد يحقق أمنية {names}",
    spendNote: "مخصص إنفاق مقترح: {amount} ر.س للمجموعة — وليس سعر دخول مؤكدًا.",
    viewOnMap: "عرض على الخريطة",
    locationDirections: "الموقع والاتجاهات",
    aboutThisPlace: "عن هذا المكان",
    swapLabel: "بدّل هذه المحطة",
    replaceAria: "استبدال {name}",
    transferNote: "فاصل 30 دقيقة للتنقل والراحة — وليس زمن قيادة محسوبًا",

    mapIframeTitle: "خريطة: {name}",
    openMapLink: "فتح الخريطة: {name} ↗",
    mapNeedsInternet: "تحتاج الخريطة الخارجية اتصالًا بالإنترنت. إذا لم تظهر، استخدم رابط الموقع.",

    quizProgress: "{step} / {total} — {question}",
    correctAnswer: "إجابة صحيحة!",
    correctAnswerWas: "الإجابة الصحيحة: {answer}",
    storySource: "مصدر القصة",
    nextQuestion: "السؤال التالي",
    seeResults: "عرض النتيجة",
    storyExplorerBadge: "وسام مستكشف القصص",
    challengeComplete: "اكتمل التحدي · {score} / {total} إجابات صحيحة",
    badgeNote: "وسام تعلّم رقمي، ولا يُثبت زيارة المكان.",
  },
};

function getLang() {
  try {
    const v = localStorage.getItem(LANG_KEY);
    return v === "ar" ? "ar" : "en";
  } catch (e) {
    return "en";
  }
}

function t(key) {
  const lang = getLang();
  return (STRINGS[lang] && STRINGS[lang][key]) || STRINGS.en[key] || key;
}

// Fill {placeholders} in a translated string with values from vars.
function fmt(key, vars) {
  let s = t(key);
  Object.keys(vars || {}).forEach((k) => {
    s = s.split("{" + k + "}").join(vars[k]);
  });
  return s;
}

// Resolve a field that may be a plain string (user content, never translated)
// or a bilingual object { en, ar } (fixed UI/content copy).
function L(field) {
  if (field && typeof field === "object") {
    const lang = getLang();
    return field[lang] || field.en || "";
  }
  return field == null ? "" : field;
}

function applyDocumentDirection() {
  const lang = getLang();
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  document.title = t("pageTitle");
  const meta = document.querySelector('meta[name="description"]');
  if (meta) meta.setAttribute("content", t("metaDescription"));
}

function setLang(lang) {
  try {
    localStorage.setItem(LANG_KEY, lang === "ar" ? "ar" : "en");
  } catch (e) {}
  applyDocumentDirection();
  if (typeof updateLangButton === "function") updateLangButton();
  if (typeof render === "function") render();
}

function getTheme() {
  try {
    const v = localStorage.getItem(THEME_KEY);
    return v === "dark" ? "dark" : "light";
  } catch (e) {
    return "light";
  }
}

function applyTheme() {
  document.documentElement.setAttribute("data-theme", getTheme());
}

function setTheme(theme) {
  try {
    localStorage.setItem(THEME_KEY, theme === "dark" ? "dark" : "light");
  } catch (e) {}
  applyTheme();
  if (typeof updateThemeButton === "function") updateThemeButton();
}

// Translate every element in the static HTML shell that carries a data-i18n /
// data-i18n-placeholder attribute. Dynamic, JS-built sections (survey card,
// summary, planner) translate themselves each time they render.
function applyStaticI18n() {
  applyDocumentDirection();
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t(el.getAttribute("data-i18n"));
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    el.setAttribute("placeholder", t(el.getAttribute("data-i18n-placeholder")));
  });
}

applyDocumentDirection();
applyTheme();
