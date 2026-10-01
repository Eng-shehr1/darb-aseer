/* Darb Aseer — بيانات الأسئلة والاحتياجات وبيانات التجربة */

// كل سؤال: id, title, hint (توضيح), icon للسؤال نفسه غير مستخدم، options[]
// كل خيار: id, icon (اسم رمز من الملصق svg)، label، desc (شرح مبسّط يظهر تحت الخيار)
const QUESTIONS = [
  {
    id: "q1",
    title: { en: "What kind of experience draws you in?", ar: "أي نوع من التجارب يجذبك؟" },
    hint: { en: "Choose what sounds most like you. No local knowledge needed.", ar: "اختر ما يشبهك أكثر. لا تحتاج معرفة مسبقة بالمكان." },
    allowUnknown: true,
    options: [
      {
        id: "nature",
        icon: "mountain",
        label: { en: "Nature and green highlands", ar: "الطبيعة والمرتفعات الخضراء" },
        desc: { en: "Explore forests, cool highlands, misty valleys and scenic views.", ar: "استكشف الغابات والمرتفعات الباردة والوديان الضبابية والمناظر الخلابة." },
      },
      {
        id: "heritage",
        icon: "landmark",
        label: { en: "Heritage and old villages", ar: "التراث والقرى القديمة" },
        desc: { en: "Discover historic villages, traditional buildings and local crafts.", ar: "اكتشف القرى التاريخية والمباني التراثية والحِرف المحلية." },
      },
      {
        id: "adventure",
        icon: "compass",
        label: { en: "Adventure and activity", ar: "المغامرة والنشاط" },
        desc: { en: "Try active experiences, from mountain walks to outdoor adventures.", ar: "جرّب تجارب نشطة، من المشي الجبلي إلى مغامرات في الهواء الطلق." },
      },
      {
        id: "market",
        icon: "basket",
        label: { en: "Markets and local flavors", ar: "الأسواق والنكهات المحلية" },
        desc: { en: "Browse traditional markets and discover regional food and products.", ar: "تجوّل في الأسواق التقليدية واكتشف الأطعمة والمنتجات المحلية." },
      },
      {
        id: "art",
        icon: "palette",
        label: { en: "Arts and culture", ar: "الفنون والثقافة" },
        desc: { en: "Explore creative spaces, cultural experiences and distinctive cafes.", ar: "استكشف المساحات الإبداعية والتجارب الثقافية والمقاهي المميزة." },
      },
      {
        id: "unknown",
        icon: "question",
        label: { en: "Not sure. Surprise me.", ar: "لست متأكدًا. فاجئني." },
        desc: { en: "You do not need a list of places. We will help you explore.", ar: "لا تحتاج إلى قائمة أماكن جاهزة. سنساعدك على الاستكشاف." },
      },
    ],
  },
  {
    id: "q2",
    title: { en: "What atmosphere feels right for you?", ar: "أي جو يناسبك؟" },
    hint: { en: "Think about the setting you would most enjoy.", ar: "فكّر في البيئة التي تستمتع بها أكثر." },
    options: [
      {
        id: "calm",
        icon: "leaf",
        label: { en: "Quiet and peaceful", ar: "هادئ ومريح" },
        desc: { en: "Relax in quieter places away from the crowds.", ar: "استرخِ في أماكن أكثر هدوءًا وبعيدًا عن الازدحام." },
      },
      {
        id: "social",
        icon: "users",
        label: { en: "Lively and social", ar: "حيوي واجتماعي" },
        desc: { en: "Enjoy a lively atmosphere with people and activity.", ar: "استمتع بجو حيوي مليء بالناس والنشاط." },
      },
      {
        id: "comfort",
        icon: "sparkles",
        label: { en: "Comfort and a little luxury", ar: "الراحة وقليل من الرفاهية" },
        desc: { en: "Comfortable places with a little extra attention to service.", ar: "أماكن مريحة تهتم بالخدمة بشكل أكبر." },
      },
      {
        id: "spontaneous",
        icon: "backpack",
        label: { en: "Simple and spontaneous", ar: "بسيط وعفوي" },
        desc: { en: "Keep things casual and follow your mood.", ar: "اجعل الأمور بسيطة واتبع مزاجك." },
      },
    ],
  },
  {
    id: "q3",
    title: { en: "How active would you like to be?", ar: "ما مستوى النشاط الذي تفضله؟" },
    hint: { en: "There is no right answer. Choose what feels comfortable.", ar: "لا توجد إجابة صحيحة. اختر ما يناسبك." },
    options: [
      {
        id: "light",
        icon: "chair",
        label: { en: "Light", ar: "خفيف" },
        desc: { en: "Short walks and plenty of time to sit and relax.", ar: "مشي قصير ووقت كافٍ للجلوس والاسترخاء." },
      },
      {
        id: "medium",
        icon: "footprints",
        label: { en: "Moderate", ar: "متوسط" },
        desc: { en: "Some walking with regular breaks.", ar: "بعض المشي مع فترات راحة منتظمة." },
      },
      {
        id: "high",
        icon: "run",
        label: { en: "High", ar: "عالٍ" },
        desc: { en: "Longer walks or physically demanding activities.", ar: "مشي أطول أو أنشطة تتطلب جهدًا بدنيًا." },
      },
    ],
  },
  {
    id: "q4",
    title: { en: "What pace suits your day?", ar: "أي إيقاع يناسب يومك؟" },
    hint: { en: "When would you like to start, and how should the day flow?", ar: "متى تحب أن تبدأ، وكيف يسير يومك؟" },
    options: [
      {
        id: "early",
        icon: "sunrise",
        label: { en: "Early and energetic", ar: "مبكر وحيوي" },
        desc: { en: "Start early and make the most of the day.", ar: "ابدأ باكرًا واستفد من يومك بالكامل." },
      },
      {
        id: "balanced",
        icon: "clock",
        label: { en: "Balanced", ar: "متوازن" },
        desc: { en: "Start a little later and take a comfortable pace.", ar: "ابدأ بوقت متأخر قليلًا وبإيقاع مريح." },
      },
      {
        id: "flexible",
        icon: "moon",
        label: { en: "Flexible and unhurried", ar: "مرن وبلا استعجال" },
        desc: { en: "Follow your mood without a strict schedule.", ar: "اتبع مزاجك دون جدول صارم." },
      },
    ],
  },
  {
    id: "q5",
    title: { en: "How open are you to something new?", ar: "ما مدى انفتاحك على تجربة شيء جديد؟" },
    hint: { en: "Help us balance familiar favorites with new discoveries.", ar: "ساعدنا على التوازن بين ما تحبه وما يمكن اكتشافه." },
    options: [
      {
        id: "excited",
        icon: "rocket",
        label: { en: "Very excited", ar: "متحمس جدًا" },
        desc: { en: "I enjoy trying unfamiliar things.", ar: "أستمتع بتجربة أشياء غير مألوفة." },
      },
      {
        id: "curious",
        icon: "seedling",
        label: { en: "Curious, one step at a time", ar: "أتعلم خطوة بخطوة" },
        desc: { en: "I am open to trying something new at my own pace.", ar: "منفتح على تجربة شيء جديد بخطوتي الخاصة." },
      },
      {
        id: "familiar",
        icon: "home",
        label: { en: "I prefer familiar things", ar: "أفضّل الأشياء المألوفة" },
        desc: { en: "I feel more comfortable with things I already know.", ar: "أشعر بمزيد من الراحة مع ما أعرفه مسبقًا." },
      },
    ],
  },
];

// خيارات الاحتياجات الضرورية (ليست أمنيات، بل أساسية لراحة/سلامة المشارك)
const NEEDS_OPTIONS = [
  { id: "no-stairs", icon: "stairs", label: { en: "Avoid stairs and steps", ar: "تجنّب السلالم والدرجات" } },
  { id: "no-long-walk", icon: "walk-slash", label: { en: "Avoid long walks", ar: "تجنّب المشي الطويل" } },
  { id: "shade", icon: "umbrella", label: { en: "Shade and places to rest", ar: "الظل وأماكن للراحة" } },
  { id: "wheelchair", icon: "wheelchair", label: { en: "Accessible facilities", ar: "مرافق مناسبة لذوي الإعاقة" } },
  { id: "other", icon: "dots", label: { en: "Another need", ar: "احتياج آخر" } },
];

// تسميات مختصرة للاستخدام في صفحة الملخص
const QUESTION_LABELS = {
  q1: { en: "Experience", ar: "التجربة" },
  q2: { en: "Atmosphere", ar: "الجو" },
  q3: { en: "Activity level", ar: "مستوى النشاط" },
  q4: { en: "Daily pace", ar: "إيقاع اليوم" },
  q5: { en: "Openness to new experiences", ar: "الانفتاح على تجارب جديدة" },
};

function findOption(questionId, optionId) {
  const q = QUESTIONS.find((q) => q.id === questionId);
  if (!q) return null;
  return q.options.find((o) => o.id === optionId) || null;
}

function findNeed(needId) {
  return NEEDS_OPTIONS.find((n) => n.id === needId) || null;
}

// بيانات تجربة جاهزة لعرض المشروع بسرعة
function buildSampleState() {
  return {
    stage: "summary",
    trip: {
      name: "Family day in Aseer",
      participantsCount: 3,
      participantNames: ["Sara", "Fahad", "Noura"],
      budget: "600",
      startPoint: "Abha",
    },
    participants: [
      {
        name: "Sara",
        answers: { q1: "nature", q2: "calm", q3: "light", q4: "balanced", q5: "curious" },
        wish: "I would love to watch the sunset from a viewpoint.",
        needs: ["shade"],
        needsOther: "",
        completed: true,
      },
      {
        name: "Fahad",
        answers: { q1: "adventure", q2: "social", q3: "high", q4: "early", q5: "excited" },
        wish: "I would love an active outdoor challenge.",
        needs: [],
        needsOther: "",
        completed: true,
      },
      {
        name: "Noura",
        answers: { q1: "heritage", q2: "calm", q3: "medium", q4: "balanced", q5: "curious" },
        wish: "I would love to discover stories about local history.",
        needs: ["no-stairs"],
        needsOther: "",
        completed: true,
      },
    ],
    currentParticipantIndex: 0,
    currentQuestionIndex: 0,
    editingReturnToSummary: false,
  };
}
