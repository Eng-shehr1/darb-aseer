/* Darb Aseer — منطق التطبيق */

const STORAGE_KEY = "darbAseerState";

function newState() {
  return {
    stage: "landing", // landing | setup | handoff | survey | summary
    trip: {
      name: "",
      participantsCount: 3,
      participantNames: ["", "", ""],
      budget: "",
      startPoint: "",
    },
    participants: [],
    currentParticipantIndex: 0,
    currentQuestionIndex: 0, // 0..4 أسئلة, 5 = أمنية واحتياجات
    editingReturnToSummary: false,
  };
}

let state = loadState();

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return newState();
    const parsed = JSON.parse(raw);
    if (!parsed || !parsed.trip || !Array.isArray(parsed.participants) || !["landing","setup","handoff","survey","summary"].includes(parsed.stage)) return newState();
    return parsed;
  } catch (e) {
    return newState();
  }
}

function saveState() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
  catch(e) { if(!document.getElementById('storageNotice')){const note=document.createElement('p');note.id='storageNotice';note.setAttribute('role','status');note.textContent=t('storageUnavailable');document.getElementById('app').prepend(note);} }
}

function viewEl(name) {
  return document.getElementById("view-" + name);
}

function icon(name, extraClass) {
  return (
    '<svg class="icon' +
    (extraClass ? " " + extraClass : "") +
    '"><use href="#icon-' +
    name +
    '"></use></svg>'
  );
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str == null ? "" : String(str);
  return div.innerHTML;
}

/* ============ التبديل بين الشاشات ============ */

const STAGES = ["landing", "setup", "handoff", "survey", "summary"];

function render() {
  applyStaticI18n();
  STAGES.forEach((s) => viewEl(s).classList.toggle("hidden", state.stage !== s));
  document.getElementById("newTripBtn").classList.toggle("hidden", state.stage === "landing");

  if (state.stage === "setup") renderSetup();
  if (state.stage === "handoff") renderHandoff();
  if (state.stage === "survey") renderSurvey();
  if (state.stage === "summary") renderSummary();

  window.scrollTo({ top: 0, behavior: "auto" });
}

/* ============ لغة وسمة العرض ============ */

function updateLangButton() {
  const btn = document.getElementById("langToggleBtn");
  if (!btn) return;
  const current = getLang();
  btn.querySelector("span").textContent = current === "ar" ? "English" : "العربية";
}

function updateThemeButton() {
  const btn = document.getElementById("themeToggleBtn");
  if (!btn) return;
  const dark = getTheme() === "dark";
  btn.querySelector("use").setAttribute("href", dark ? "#icon-sunrise" : "#icon-moon");
  btn.querySelector("span").textContent = dark ? t("lightMode") : t("darkMode");
}

document.getElementById("langToggleBtn").addEventListener("click", () => {
  setLang(getLang() === "ar" ? "en" : "ar");
});

document.getElementById("themeToggleBtn").addEventListener("click", () => {
  setTheme(getTheme() === "dark" ? "light" : "dark");
});

updateLangButton();
updateThemeButton();

/* ============ صفحة البداية ============ */

document.getElementById("startPlanBtn").addEventListener("click", () => {
  state.stage = "setup";
  saveState();
  render();
});

document.getElementById("tryDemoBtn").addEventListener("click", () => {
  state = buildSampleState();
  saveState();
  render();
});

document.getElementById("soloPlanBtn").addEventListener("click", () => {
  state.stage = "setup";
  state.trip.participantsCount = 1;
  syncParticipantNamesLength();
  saveState();
  render();
});

document.getElementById("newTripBtn").addEventListener("click", () => {
  const ok = window.confirm(t("confirmNewTrip"));
  if (!ok) return;
  try { localStorage.removeItem(STORAGE_KEY); } catch(e) {}
  state = newState();
  saveState();
  render();
});

/* ============ إنشاء رحلة ============ */

document.querySelector(".back-to-landing").addEventListener("click", () => {
  state.stage = "landing";
  saveState();
  render();
});

function syncParticipantNamesLength() {
  const count = state.trip.participantsCount;
  const names = state.trip.participantNames;
  while (names.length < count) names.push("");
  while (names.length > count) names.pop();
}

function renderSetup() {
  document.getElementById("tripName").value = state.trip.name;
  document.getElementById("budget").value = state.trip.budget;
  document.getElementById("startPoint").value = state.trip.startPoint;

  const countSelector = document.getElementById("countSelector");
  countSelector.innerHTML = "";
  for (let n = 1; n <= 6; n++) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "count-btn" + (state.trip.participantsCount === n ? " active" : "");
    btn.textContent = n;
    btn.addEventListener("click", () => {
      state.trip.participantsCount = n;
      syncParticipantNamesLength();
      saveState();
      renderSetup();
    });
    countSelector.appendChild(btn);
  }

  syncParticipantNamesLength();
  const namesGrid = document.getElementById("namesGrid");
  namesGrid.innerHTML = "";
  state.trip.participantNames.forEach((name, idx) => {
    const wrap = document.createElement("div");
    wrap.className = "name-field";
    wrap.innerHTML =
      '<span class="name-index">' +
      (idx + 1) +
      '</span><input type="text" class="participant-name-input" placeholder="' +
      escapeHtml(t("participantNamePlaceholder")) + " " +
      (idx + 1) +
      '" />';
    const input = wrap.querySelector("input");
    input.value = name;
    input.addEventListener("input", (e) => {
      state.trip.participantNames[idx] = e.target.value;
      saveState();
    });
    namesGrid.appendChild(wrap);
  });

  document.getElementById("setupError").classList.remove("show");
}

document.getElementById("tripName").addEventListener("input", (e) => {
  state.trip.name = e.target.value;
  saveState();
});
document.getElementById("budget").addEventListener("input", (e) => {
  state.trip.budget = e.target.value;
  saveState();
});
document.getElementById("startPoint").addEventListener("input", (e) => {
  state.trip.startPoint = e.target.value;
  saveState();
});

document.getElementById("setupForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const trip = state.trip;
  const namesOk = trip.participantNames.every((n) => n.trim().length > 0);
  const valid =
    trip.name.trim().length > 0 &&
    trip.participantsCount >= 1 &&
    trip.participantsCount <= 6 &&
    namesOk &&
    String(trip.budget).trim().length > 0 &&
    Number(trip.budget) > 0 &&
    trip.startPoint.trim().length > 0;

  if (!valid) {
    document.getElementById("setupError").classList.add("show");
    return;
  }

  state.participants = trip.participantNames.map((name) => ({
    name: name.trim(),
    answers: {},
    wish: "",
    needs: [],
    needsOther: "",
    completed: false,
  }));
  state.currentParticipantIndex = 0;
  state.currentQuestionIndex = 0;
  state.editingReturnToSummary = false;
  // Solo trips have no one to hand the device to — go straight to the questionnaire.
  state.stage = state.participants.length === 1 ? "survey" : "handoff";
  saveState();
  render();
});

/* ============ تسليم الجهاز ============ */

function renderHandoff() {
  const idx = state.currentParticipantIndex;
  const total = state.participants.length;
  const p = state.participants[idx];
  document.getElementById("handoffOrder").textContent = fmt("personOfTotal", { p: idx + 1, total });
  document.getElementById("handoffName").textContent = fmt("yourTurnName", { name: p.name });
  document.getElementById("handoffText").textContent = idx === 0 ? t("handoffTextFirst") : t("handoffTextNext");
}

document.getElementById("handoffStartBtn").addEventListener("click", () => {
  state.stage = "survey";
  saveState();
  render();
});

/* ============ الاستبيان ============ */

const TOTAL_STEPS_PER_PERSON = QUESTIONS.length + 1; // 5 أسئلة + خطوة الأمنيات/الاحتياجات

function currentParticipant() {
  return state.participants[state.currentParticipantIndex];
}

function renderSurvey() {
  const step = state.currentQuestionIndex;
  const p = currentParticipant();
  const totalSteps = state.participants.length * TOTAL_STEPS_PER_PERSON;
  const globalStep = state.currentParticipantIndex * TOTAL_STEPS_PER_PERSON + step;
  const percent = Math.round(((step + 1) / TOTAL_STEPS_PER_PERSON) * 100);

  document.getElementById("progressParticipant").textContent = p.name;
  document.getElementById("progressStepText").textContent = fmt("personQuestionProgress", {
    p: state.currentParticipantIndex + 1,
    total: state.participants.length,
    step: step + 1,
    totalSteps: TOTAL_STEPS_PER_PERSON,
  });
  document.getElementById("progressBarFill").style.width = percent + "%";

  const card = document.getElementById("surveyCard");
  const nextBtn = document.getElementById("surveyNextBtn");
  const backBtn = document.getElementById("surveyBackBtn");

  if (step < QUESTIONS.length) {
    const q = QUESTIONS[step];
    const selected = p.answers[q.id] || null;

    card.innerHTML =
      '<h2 class="survey-q-title">' +
      escapeHtml(L(q.title)) +
      '</h2><p class="survey-q-hint">' +
      escapeHtml(L(q.hint)) +
      '</p><div class="options-grid">' +
      q.options
        .map(
          (opt) =>
            '<button type="button" class="opt-card' +
            (selected === opt.id ? " selected" : "") +
            '" data-opt="' +
            opt.id +
            '">' +
            icon(opt.icon) +
            '<span class="opt-card-text"><strong>' +
            escapeHtml(L(opt.label)) +
            "</strong><span>" +
            escapeHtml(L(opt.desc)) +
            '</span></span><span class="opt-check">' +
            icon("check") +
            "</span></button>"
        )
        .join("") +
      "</div>";

    card.querySelectorAll(".opt-card").forEach((btn) => {
      btn.setAttribute("aria-pressed", String(btn.classList.contains("selected")));
      btn.addEventListener("click", () => {
        p.answers[q.id] = btn.getAttribute("data-opt");
        saveState();
        renderSurvey();
      });
    });

    nextBtn.textContent = "";
    nextBtn.innerHTML = t("next") + icon("arrow-back", "icon-sm");
    nextBtn.disabled = !selected;
    backBtn.classList.toggle("hidden", step === 0 && !state.editingReturnToSummary);
  } else {
    // خطوة الأمنية والاحتياجات
    card.innerHTML =
      '<h2 class="survey-q-title">' + escapeHtml(t("finalStepTitle")) + '</h2>' +
      '<p class="survey-q-hint">' + escapeHtml(t("finalStepHint")) + '</p>' +
      '<div class="needs-diff-box"><strong>' + escapeHtml(t("needsDiffLabel")) + '</strong> ' + escapeHtml(t("needsDiffText")) + '</div>' +
      '<div class="section-label">' + escapeHtml(t("wishSectionLabel")) + '</div>' +
      '<textarea id="wishInput" placeholder="' + escapeHtml(t("wishPlaceholder")) + '">' +
      escapeHtml(p.wish) +
      "</textarea>" +
      '<div class="section-label">' + escapeHtml(t("needsSectionLabel")) + '</div>' +
      '<div class="options-grid" id="needsGrid">' +
      NEEDS_OPTIONS.map(
        (n) =>
          '<button type="button" class="opt-card' +
          (p.needs.includes(n.id) ? " selected" : "") +
          '" data-need="' +
          n.id +
          '">' +
          icon(n.icon) +
          '<span class="opt-card-text"><strong>' +
          escapeHtml(L(n.label)) +
          '</strong></span><span class="opt-check">' +
          icon("check") +
          "</span></button>"
      ).join("") +
      "</div>" +
      '<div class="other-need-input' +
      (p.needs.includes("other") ? "" : " hidden") +
      '" id="otherNeedWrap"><textarea id="otherNeedInput" placeholder="' + escapeHtml(t("otherNeedPlaceholder")) + '">' +
      escapeHtml(p.needsOther) +
      "</textarea></div>";

    card.querySelector("#wishInput").addEventListener("input", (e) => {
      p.wish = e.target.value;
      saveState();
    });

    card.querySelectorAll("#needsGrid .opt-card").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-need");
        const i = p.needs.indexOf(id);
        if (i === -1) p.needs.push(id);
        else p.needs.splice(i, 1);
        saveState();
        renderSurvey();
      });
    });

    const otherInput = card.querySelector("#otherNeedInput");
    if (otherInput) {
      otherInput.addEventListener("input", (e) => {
        p.needsOther = e.target.value;
        saveState();
      });
    }

    nextBtn.innerHTML = t("finishQuestionnaire") + icon("check", "icon-sm");
    nextBtn.disabled = false;
    backBtn.classList.toggle("hidden", false);
  }
}

document.getElementById("surveyBackBtn").addEventListener("click", () => {
  const step = state.currentQuestionIndex;
  if (step === 0 && state.editingReturnToSummary) {
    state.stage = "summary";
    saveState();
    render();
    return;
  }
  if (step > 0) {
    state.currentQuestionIndex = step - 1;
    saveState();
    render();
  }
});

document.getElementById("surveyNextBtn").addEventListener("click", () => {
  const step = state.currentQuestionIndex;
  if (step < QUESTIONS.length) {
    state.currentQuestionIndex = step + 1;
    saveState();
    render();
    return;
  }

  // انتهت خطوات هذا المشارك
  currentParticipant().completed = true;

  if (state.editingReturnToSummary) {
    state.editingReturnToSummary = false;
    state.stage = "summary";
    saveState();
    render();
    return;
  }

  if (state.currentParticipantIndex < state.participants.length - 1) {
    state.currentParticipantIndex += 1;
    state.currentQuestionIndex = 0;
    state.stage = "handoff";
    saveState();
    render();
  } else {
    state.stage = "summary";
    saveState();
    render();
  }
});

/* ============ الملخص ============ */

function computeInsights() {
  const common = [];
  const differences = [];

  QUESTIONS.forEach((q) => {
    const groups = {};
    state.participants.forEach((p) => {
      const ans = p.answers[q.id];
      if (!ans) return;
      (groups[ans] = groups[ans] || []).push(p.name);
    });
    const optionIds = Object.keys(groups);
    if (optionIds.length === 0) return;

    if (optionIds.length === 1) {
      const key = groups[optionIds[0]].length === state.participants.length ? "allAgreeTemplate" : "someAgreeTemplate";
      common.push({
        label: L(QUESTION_LABELS[q.id]),
        text: fmt(key, { names: groups[optionIds[0]].join(", "), option: L(findOption(q.id, optionIds[0]).label) }),
        icon: findOption(q.id, optionIds[0]).icon,
      });
    } else {
      optionIds.forEach((oid) => {
        if (groups[oid].length >= 2) {
          common.push({
            label: L(QUESTION_LABELS[q.id]),
            text: fmt("sharePreferenceTemplate", { names: groups[oid].join(", "), option: L(findOption(q.id, oid).label) }),
            icon: findOption(q.id, oid).icon,
          });
        }
      });
      differences.push({
        label: L(QUESTION_LABELS[q.id]),
        parts: optionIds.map((oid) => ({
          names: groups[oid].join(", "),
          text: L(findOption(q.id, oid).label),
        })),
      });
    }
  });

  return { common, differences };
}

function renderSummary() {
  const trip = state.trip;
  const solo = state.participants.length === 1;
  const { common, differences } = computeInsights();

  let html = "";

  html +=
    '<div class="summary-header"><h2 class="page-title">' +
    escapeHtml(trip.name) +
    '</h2><p class="page-subtitle">' + escapeHtml(t(solo ? "soloSummarySubtitle" : "summarySubtitle")) + '</p>' +
    '<div class="summary-badges">' +
    '<span class="badge">' +
    icon("users", "icon-sm") +
    escapeHtml(solo ? t("soloBadge") : fmt("peopleCount", { n: trip.participantsCount })) +
    "</span>" +
    '<span class="badge">' +
    icon("wallet", "icon-sm") +
    escapeHtml(fmt("sarPerDayBadge", { n: trip.budget })) +
    "</span>" +
    '<span class="badge">' +
    icon("map-pin", "icon-sm") +
    escapeHtml(trip.startPoint) +
    "</span>" +
    '<span class="badge">' +
    icon("calendar", "icon-sm") +
    escapeHtml(t("oneDayBadge")) + "</span>" +
    "</div></div>";

  html += '<div class="summary-grid">';
  state.participants.forEach((p, idx) => {
    html +=
      '<div class="participant-card"><div class="participant-card-head"><h3>' +
      escapeHtml(p.name) +
      '</h3><button type="button" class="edit-btn" data-edit="' +
      idx +
      '">' +
      icon("edit", "icon-sm") +
      escapeHtml(t("editBtn")) + "</button></div>";

    html += '<div class="chip-list">';
    QUESTIONS.forEach((q) => {
      const ans = p.answers[q.id];
      const opt = ans ? findOption(q.id, ans) : null;
      html +=
        '<div class="chip-row"><span class="q-label">' +
        escapeHtml(L(QUESTION_LABELS[q.id])) +
        ":</span>" +
        (opt ? icon(opt.icon) + "<span>" + escapeHtml(L(opt.label)) + "</span>" : "<span>—</span>") +
        "</div>";
    });
    html += "</div>";

    if (p.wish && p.wish.trim()) {
      html += '<div class="wish-box">' + icon("sparkles", "icon-sm") + " " + escapeHtml(p.wish) + "</div>";
    }

    if (p.needs.length) {
      html +=
        '<div class="needs-chips">' +
        p.needs
          .map((nid) => {
            const n = findNeed(nid);
            const label = nid === "other" && p.needsOther ? p.needsOther : L(n.label);
            return '<span class="need-chip">' + icon(n.icon) + escapeHtml(label) + "</span>";
          })
          .join("") +
        "</div>";
    }

    html += "</div>";
  });
  html += "</div>";

  if (!solo) {
    html +=
      '<div class="insight-section"><h3>' +
      icon("sparkles") +
      escapeHtml(t("commonHeading")) + "</h3>";
    html +=
      '<div class="insight-list">' +
      (common.length
        ? common
            .map(
              (c) =>
                '<div class="insight-item">' +
                icon(c.icon, "icon-sm") +
                " " +
                escapeHtml(c.text) +
                "</div>"
            )
            .join("")
        : '<p class="insight-empty">' + escapeHtml(t("commonEmpty")) + '</p>') +
      "</div></div>";

    html +=
      '<div class="insight-section"><h3>' +
      icon("scales") +
      escapeHtml(t("differHeading")) + "</h3>";
    html +=
      '<div class="insight-list">' +
      (differences.length
        ? differences
            .map(
              (d) =>
                '<div class="insight-item"><span class="q-name">' +
                escapeHtml(d.label) +
                ":</span> " +
                d.parts.map((part) => escapeHtml(part.names) + ": " + escapeHtml(part.text)).join(t("comparedWith")) +
                "</div>"
            )
            .join("")
        : '<p class="insight-empty">' + escapeHtml(t("differEmpty")) + '</p>') +
      "</div></div>";
  }

  const wishes = state.participants.filter((p) => p.wish && p.wish.trim());
  html +=
    '<div class="insight-section"><h3>' +
    icon("sparkles") +
    escapeHtml(t("wishesHeading")) + "</h3><div class=\"insight-list\">" +
    (wishes.length
      ? wishes
          .map(
            (p) =>
              '<div class="insight-item"><span class="q-name">' +
              escapeHtml(p.name) +
              ":</span> " +
              escapeHtml(p.wish) +
              "</div>"
          )
          .join("")
      : '<p class="insight-empty">' + escapeHtml(t("wishesEmpty")) + '</p>') +
    "</div></div>";

  const needsMap = {};
  state.participants.forEach((p) => {
    p.needs.forEach((nid) => {
      const label = nid === "other" && p.needsOther ? p.needsOther : L(findNeed(nid).label);
      const key = nid === "other" ? "other-" + p.name : nid;
      if (needsMap[key]) needsMap[key].names.push(p.name);
      else needsMap[key] = { icon: findNeed(nid).icon, label, names: [p.name] };
    });
  });
  const needsList = Object.values(needsMap);
  html +=
    '<div class="insight-section"><h3>' +
    icon("puzzle") +
    escapeHtml(t("needsHeading")) + "</h3><div class=\"insight-list\">" +
    (needsList.length
      ? needsList
          .map(
            (n) =>
              '<div class="insight-item">' +
              icon(n.icon, "icon-sm") +
              " " +
              escapeHtml(n.label) +
              ' <span class="q-name">(' +
              escapeHtml(n.names.join(", ")) +
              ")</span></div>"
          )
          .join("")
      : '<p class="insight-empty">' + escapeHtml(t("needsEmpty")) + '</p>') +
    "</div></div>";

  html += '<p class="footer-note">' + escapeHtml(t(solo ? "soloFooterNote" : "footerNote")) + '</p>';

  html +=
    '<div class="summary-footer-actions"><button type="button" class="btn btn-danger-outline" id="restartFromSummaryBtn">' +
    icon("refresh", "icon-sm") +
    escapeHtml(t("startNewTrip")) + "</button></div>";

  document.getElementById("summaryContainer").innerHTML = html;
  if (window.mountPlanner) window.mountPlanner();

  document.querySelectorAll("[data-edit]").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.currentParticipantIndex = Number(btn.getAttribute("data-edit"));
      state.currentQuestionIndex = 0;
      state.editingReturnToSummary = true;
      state.stage = "survey";
      saveState();
      render();
    });
  });

  document.getElementById("restartFromSummaryBtn").addEventListener("click", () => {
    document.getElementById("newTripBtn").click();
  });
}

/* ============ الإقلاع ============ */

render();
