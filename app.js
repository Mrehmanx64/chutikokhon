/* ════════════════════════════════════════════════
   DATA
════════════════════════════════════════════════ */
const SCHED = [
  {
    id: "bfast",
    bn: "ব্রেকফাস্ট বিরতি",
    start: "09:00",
    end: "09:30",
    type: "break",
  },
  {
    id: "morn",
    bn: "সকালের ক্লাস",
    start: "09:30",
    end: "13:00",
    type: "class",
  },
  {
    id: "lunch",
    bn: "লাঞ্চ ও নামাজ",
    start: "13:00",
    end: "14:30",
    type: "lunch",
  },
  {
    id: "aft",
    bn: "বিকালের ক্লাস",
    start: "14:30",
    end: "17:00",
    type: "class",
  },
];
const DS = "09:00",
  DE = "17:00",
  LS = "13:00";

const TR = {
  morning: {
    6: { A: "সাগর মাহমুদ", B: "রাশিদুল ইসলাম", C: "সজীব হোসেন" },
    0: { A: "সজীব হোসেন", B: "সাগর মাহমুদ", C: "রাশিদুল ইসলাম" },
    1: { A: "রাশিদুল ইসলাম", B: "সজীব হোসেন", C: "সাগর মাহমুদ" },
    2: { A: "সাগর মাহমুদ", B: "রাশিদুল ইসলাম", C: "সজীব হোসেন" },
    3: { A: "সজীব হোসেন", B: "সাগর মাহমুদ", C: "রাশিদুল ইসলাম" },
    4: { A: "রাশিদুল ইসলাম", B: "সজীব হোসেন", C: "সাগর মাহমুদ" },
  },
  afternoon: {
    6: { A: "সজীব হোসেন", B: "সাগর মাহমুদ", C: "রাশিদুল ইসলাম" },
    0: { A: "রাশিদুল ইসলাম", B: "সজীব হোসেন", C: "সাগর মাহমুদ" },
    1: { A: "সাগর মাহমুদ", B: "রাশিদুল ইসলাম", C: "সজীব হোসেন" },
    2: { A: "সজীব হোসেন", B: "সাগর মাহমুদ", C: "রাশিদুল ইসলাম" },
    3: { A: "রাশিদুল ইসলাম", B: "সজীব হোসেন", C: "সাগর মাহমুদ" },
    4: { A: "সাগর মাহমুদ", B: "রাশিদুল ইসলাম", C: "সজীব হোসেন" },
  },
};

const BN = [
  "রবিবার",
  "সোমবার",
  "মঙ্গলবার",
  "বুধবার",
  "বৃহস্পতিবার",
  "শুক্রবার",
  "শনিবার",
];
const BNS = ["রবি", "সোম", "মঙ্গল", "বুধ", "বৃহ", "শুক্র", "শনি"];

const MSGS = {
  class: [
    {
      i: "fa-brain",
      t: "মনোযোগ দিন এখন ক্লাস চলছে। প্রতিটি সেকেন্ড মূল্যবান!",
    },
    {
      i: "fa-fire",
      t: "Focus! এই ক্লাসটা শেষ না হওয়া পর্যন্ত ফোন রাখুন। আপনিই পারবেন!",
    },
    {
      i: "fa-bolt",
      t: "আজকের ক্লাসে যা শিখছেন, সেটা আপনার ক্যারিয়ার বদলে দিতে পারে।",
    },
    { i: "fa-star", t: "ট্রেইনার কথা বলছেন মনোযোগ দিন, নোট নিন, প্রশ্ন করুন!" },
  ],
  break: [
    { i: "fa-mug-hot", t: "বিরতির সময়! একটু চা খান, মাথা ঠান্ডা করুন।" },
    {
      i: "fa-face-smile",
      t: "ব্রেক টাইম! শরীর stretch করুন পরের ক্লাসের জন্য রেডি!",
    },
  ],
  lunch: [
    {
      i: "fa-utensils",
      t: "লাঞ্চ টাইম! ভালো করে খান, নামাজ পড়ুন, ফ্রেশ মনে ফিরুন।",
    },
    { i: "fa-mosque", t: "লাঞ্চ ও নামাজের সময়। শরীর ও মনকে রিফ্রেশ করুন।" },
  ],
  done: [
    {
      i: "fa-party-horn",
      t: "আজকের ক্লাস শেষ! অসাধারণ কাজ করেছেন। বাড়ি যান!",
    },
    { i: "fa-house", t: "আজকের জন্য যথেষ্ট! বিশ্রাম নিন। কাল আবার দেখা হবে!" },
  ],
  before: [
    {
      i: "fa-sun",
      t: "ক্লাস শুরু হতে একটু বাকি। রেডি হয়ে নিন আজকের দিনটা দারুণ যাবে!",
    },
    {
      i: "fa-coffee",
      t: "ক্লাস শুরু হওয়ার আগে নিজেকে প্রস্তুত করুন। আজকেও শেখার দিন!",
    },
  ],
};

/* ════════════════════════════════════════════════
   STATE
════════════════════════════════════════════════ */
const S = {
  lab: localStorage.getItem("lab") || "A",
  theme: localStorage.getItem("theme") || "light",
  mode: localStorage.getItem("mode") || "remaining",
  pStat: "",
  pNext: "",
  mCat: "",
  mIdx: 0,
  mTimer: null,
  schDone: false,
};

/* ════════════════════════════════════════════════
   HELPERS
════════════════════════════════════════════════ */
const $ = (id) => document.getElementById(id);
const pad = (n) => String(Math.floor(Math.abs(n))).padStart(2, "0");
const tm = (s) => {
  const [h, m] = s.split(":").map(Number);
  return h * 60 + m;
};
const nowS = () => {
  const n = new Date();
  return n.getHours() * 3600 + n.getMinutes() * 60 + n.getSeconds();
};
const hms = (s) => {
  s = Math.max(0, s);
  return { h: pad(s / 3600), m: pad((s % 3600) / 60), s: pad(s % 60) };
};

function curSlot() {
  const nm = nowS() / 60,
    ds = tm(DS),
    de = tm(DE);
  if (nm < ds) return { t: "before", sl: null };
  if (nm >= de) return { t: "done", sl: null };
  for (const sl of SCHED)
    if (nm >= tm(sl.start) && nm < tm(sl.end)) return { t: sl.type, sl };
  return { t: "done", sl: null };
}
function nxtEv() {
  const nm = nowS() / 60;
  for (const sl of SCHED) if (tm(sl.start) > nm) return sl;
  return null;
}
function getShift() {
  return nowS() / 60 < tm(LS) ? "morning" : "afternoon";
}
function getTr(lab, sh) {
  const d = new Date().getDay();
  return (TR[sh][d] || {})[lab] || "—";
}

function ripple(el, e) {
  const r = document.createElement("span");
  r.className = "ripple";
  const rc = el.getBoundingClientRect(),
    sz = Math.max(rc.width, rc.height);
  r.style.cssText = `width:${sz}px;height:${sz}px;left:${(e.clientX || rc.left + rc.width / 2) - rc.left - sz / 2}px;top:${(e.clientY || rc.top + rc.height / 2) - rc.top - sz / 2}px`;
  el.style.position = "relative";
  el.style.overflow = "hidden";
  el.appendChild(r);
  setTimeout(() => r.remove(), 800);
}

/* ════════════════════════════════════════════════
   THEME
════════════════════════════════════════════════ */
function applyTheme(t) {
  S.theme = t;
  document.documentElement.setAttribute("data-theme", t);
  $("themeIco").className =
    t === "dark" ? "fa-solid fa-sun" : "fa-solid fa-moon";
  localStorage.setItem("theme", t);
}
applyTheme(S.theme);
$("themeBtn").addEventListener("click", (e) => {
  ripple($("themeBtn"), e);
  gsap.to("#app", {
    opacity: 0.9,
    duration: 0.15,
    yoyo: true,
    repeat: 1,
    onComplete: () => applyTheme(S.theme === "dark" ? "light" : "dark"),
  });
});

/* ════════════════════════════════════════════════
   LAB
════════════════════════════════════════════════ */
function setLab(lab) {
  S.lab = lab;
  localStorage.setItem("lab", lab);
  document
    .querySelectorAll(".lab-tab")
    .forEach((b) => b.classList.toggle("active", b.dataset.lab === lab));
  updTr();
  gsap.fromTo(
    "#trCard",
    { scale: 0.97, opacity: 0.65 },
    { scale: 1, opacity: 1, duration: 0.45, ease: "back.out(1.8)" },
  );
}
document.querySelectorAll(".lab-tab").forEach((b) => {
  b.addEventListener("click", (e) => {
    ripple(b, e);
    setLab(b.dataset.lab);
  });
});

// Swipe center for lab switch
let swX = 0;
$("centerPanel").addEventListener(
  "touchstart",
  (e) => {
    swX = e.touches[0].clientX;
  },
  { passive: true },
);
$("centerPanel").addEventListener(
  "touchend",
  (e) => {
    const dx = e.changedTouches[0].clientX - swX,
      labs = ["A", "B", "C"],
      i = labs.indexOf(S.lab);
    if (Math.abs(dx) > 50) {
      if (dx < 0 && i < 2) setLab(labs[i + 1]);
      if (dx > 0 && i > 0) setLab(labs[i - 1]);
    }
  },
  { passive: true },
);

/* ════════════════════════════════════════════════
   CLOCK MODE
════════════════════════════════════════════════ */
function applyMode() {
  $("clkLblTxt").textContent =
    S.mode === "remaining" ? "সময় বাকি" : "সময় পার হয়েছে";
  $("clkLabel").querySelector("i").className =
    S.mode === "remaining"
      ? "fa-regular fa-clock"
      : "fa-solid fa-hourglass-half";
}
applyMode();
$("clkDisplay").addEventListener("click", (e) => {
  S.mode = S.mode === "remaining" ? "spent" : "remaining";
  localStorage.setItem("mode", S.mode);
  applyMode();
  ripple($("clkDisplay"), e);
  gsap.fromTo(
    "#clkDisplay",
    { scale: 0.95 },
    { scale: 1, duration: 0.5, ease: "elastic.out(1.1,.5)" },
  );
});

/* ════════════════════════════════════════════════
   STATUS
════════════════════════════════════════════════ */
const SMAP = {
  before: {
    d: "sd-before",
    m: "ক্লাস শুরু হয়নি",
    s: "সকাল ৯টায় ক্লাস শুরু হবে",
  },
  class: { d: "sd-class", m: "Class চলছে", s: "মনোযোগ দিয়ে ক্লাস করুন" },
  break: { d: "sd-break", m: "Breakfast Time", s: "বিরতির সময়" },
  lunch: {
    d: "sd-lunch",
    m: "Lunch & Prayer চলছে",
    s: "লাঞ্চ এবং নামাজের বিরতি",
  },
  done: { d: "sd-done", m: "আজকের ক্লাস শেষ", s: "শুভ বিদায়! কাল দেখা হবে।" },
};
function updStatus({ t }) {
  if (t === S.pStat) return;
  S.pStat = t;
  const info = SMAP[t] || SMAP.class;
  $("sDot").className = "sdot " + info.d;
  gsap.to(["#stMain", "#stSub"], {
    opacity: 0,
    duration: 0.15,
    onComplete: () => {
      $("stMain").textContent = info.m;
      $("stSub").textContent = info.s;
      gsap.to(["#stMain", "#stSub"], { opacity: 1, duration: 0.3 });
    },
  });
}

/* ════════════════════════════════════════════════
   CLOCK DIGITS
════════════════════════════════════════════════ */
function updClock({ t, sl }) {
  const ns = nowS(),
    ds = tm(DS) * 60,
    de = tm(DE) * 60;
  let secs = 0;
  if (S.mode === "remaining") {
    if (t === "before") secs = ds - ns;
    else if (t === "done") secs = 0;
    else if (sl) secs = tm(sl.end) * 60 - ns;
    else secs = de - ns;
  } else {
    secs = t === "before" ? 0 : Math.max(0, ns - ds);
  }
  const { h, m, s } = hms(secs);
  function set(el, v) {
    if (el.textContent !== v) {
      el.textContent = v;
      el.classList.remove("flipped");
      void el.offsetWidth;
      el.classList.add("flipped");
    }
  }
  set($("ckH"), h);
  set($("ckM"), m);
  set($("ckS"), s);
  // session meta
  const slSec = sl
    ? Math.max(0, tm(sl.end) * 60 - ns)
    : t === "before"
      ? Math.max(0, ds - ns)
      : 0;
  const { h: sh, m: sm } = hms(slSec);
  $("cmSlot").textContent = sh + ":" + sm;
}

/* ════════════════════════════════════════════════
   PROGRESS
════════════════════════════════════════════════ */
function updProg() {
  const nm = nowS() / 60,
    ds = tm(DS),
    de = tm(DE);
  const pct = Math.round(Math.min(Math.max((nm - ds) / (de - ds), 0), 1) * 100);
  $("pFill").style.width = pct + "%";
  const ps = pct + "%";
  if ($("pPct").textContent !== ps) {
    $("pPct").textContent = ps;
    $("cmPct").textContent = ps;
  }
  const rem = hms(Math.max(0, (de * 60 * 60) / 60 - nowS())); // remaining total
  const remS = Math.max(0, tm(DE) * 60 - nowS());
  const { h: rh, m: rm } = hms(remS);
  $("pRem").textContent = rh + "h " + rm + "m";
}

/* ════════════════════════════════════════════════
   NEXT EVENT
════════════════════════════════════════════════ */
const NMAP = {
  class: { w: "ni-class", i: "fa-solid fa-book-open" },
  break: { w: "ni-break", i: "fa-solid fa-mug-hot" },
  lunch: { w: "ni-lunch", i: "fa-solid fa-utensils" },
  end: { w: "ni-end", i: "fa-solid fa-flag-checkered" },
};
function updNext({ t }) {
  const nx = nxtEv(),
    ns = nowS();
  if (t === "done" || !nx) {
    if (S.pNext === "done") return;
    S.pNext = "done";
    $("nName").textContent = "আজকের ক্লাস শেষ!";
    $("nTime").textContent = "কাল আবার দেখা হবে";
    $("nCd").textContent = "—";
    $("nIco").className = "nico ni-end";
    $("nIcoI").className = "fa-solid fa-flag-checkered";
    return;
  }
  const diff = Math.max(0, tm(nx.start) * 60 - ns);
  const { h, m, s } = hms(diff);
  $("nCd").textContent = h + ":" + m + ":" + s;
  if (S.pNext !== nx.id) {
    S.pNext = nx.id;
    $("nName").textContent = nx.bn;
    $("nTime").textContent = nx.start + " – " + nx.end;
    const ico = NMAP[nx.type] || NMAP.class;
    $("nIco").className = "nico " + ico.w;
    $("nIcoI").className = ico.i;
    gsap.fromTo(
      "#nextCard",
      { x: 7, opacity: 0.5 },
      { x: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
    );
  }
}

/* ════════════════════════════════════════════════
   TRAINER
════════════════════════════════════════════════ */
function updTr() {
  const sh = getShift(),
    op = sh === "morning" ? "afternoon" : "morning";
  $("trCur").textContent = getTr(S.lab, sh);
  $("trNxt").textContent = getTr(S.lab, op);
  $("shiftTag").textContent = sh === "morning" ? "Morning" : "Afternoon";
  $("shiftTag").className =
    "shift-tag " + (sh === "morning" ? "st-morning" : "st-afternoon");
}

/* ════════════════════════════════════════════════
   SCHEDULE
════════════════════════════════════════════════ */
function buildSch() {
  if (S.schDone) {
    updSchHi();
    return;
  }
  S.schDone = true;
  const list = $("schList");
  list.innerHTML = "";
  const bm = { class: "b-class", break: "b-break", lunch: "b-lunch" };
  const lm = { class: "Class", break: "Break", lunch: "Lunch" };
  SCHED.forEach((sl) => {
    const d = document.createElement("div");
    d.className = "si";
    d.id = "si-" + sl.id;
    d.innerHTML = `<span class="si-t">${sl.start} – ${sl.end}</span><span class="si-n">${sl.bn}</span><span class="si-b ${bm[sl.type]}">${lm[sl.type]}</span>`;
    list.appendChild(d);
  });
  updSchHi();
}
function updSchHi() {
  const nm = nowS() / 60;
  SCHED.forEach((sl) => {
    const el = $("si-" + sl.id);
    if (el) el.classList.toggle("now", nm >= tm(sl.start) && nm < tm(sl.end));
  });
}

/* ════════════════════════════════════════════════
   MESSAGE
════════════════════════════════════════════════ */
function updMsg(cat) {
  if (cat === S.mCat) return;
  S.mCat = cat;
  S.mIdx = 0;
  clearInterval(S.mTimer);
  showMsg(MSGS[cat][0]);
  S.mTimer = setInterval(() => {
    const ms = MSGS[S.mCat];
    S.mIdx = (S.mIdx + 1) % ms.length;
    showMsg(ms[S.mIdx]);
  }, 13000);
}
function showMsg(msg) {
  gsap.to("#msgCard", {
    opacity: 0,
    duration: 0.25,
    onComplete: () => {
      $("msgB").textContent = msg.t;
      $("msgI").className = "fa-solid " + msg.i;
      gsap.to("#msgCard", { opacity: 1, duration: 0.4 });
    },
  });
}

/* ════════════════════════════════════════════════
   DAY
════════════════════════════════════════════════ */
function updDay() {
  const d = new Date().getDay();
  $("dayTxt").textContent = "আজ: " + BN[d];
  $("cmDay").textContent = BNS[d];
}

/* ════════════════════════════════════════════════
   TICK
════════════════════════════════════════════════ */
function tick() {
  const info = curSlot();
  updStatus(info);
  updClock(info);
  updProg();
  updNext(info);
  updSchHi();
  updMsg(
    info.t === "before"
      ? "before"
      : info.t === "done"
        ? "done"
        : info.sl?.type || "class",
  );
}

/* ════════════════════════════════════════════════
   INIT
════════════════════════════════════════════════ */
window.addEventListener("DOMContentLoaded", () => {
  updDay();
  setLab(S.lab);
  buildSch();
  updTr();

  // Entrance
  gsap.fromTo(
    ".topbar",
    { y: -28, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.55, ease: "power3.out" },
  );
  gsap.fromTo(
    ".fade-in",
    { y: 18, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.6,
      stagger: 0.065,
      ease: "power3.out",
      delay: 0.18,
    },
  );
  gsap.fromTo(
    ".ring",
    { scale: 0.82, opacity: 0 },
    {
      scale: 1,
      opacity: 1,
      duration: 1.1,
      stagger: 0.14,
      ease: "power3.out",
      delay: 0.3,
    },
  );

  // Animate progress fill in
  setTimeout(() => {
    const w = $("pFill").style.width || "0%";
    $("pFill").style.width = "0%";
    gsap.to("#pFill", { width: w, duration: 1.4, ease: "power3.out" });
  }, 550);

  tick();
  setInterval(tick, 1000);
  setInterval(updDay, 30000);
  setInterval(updTr, 60000);
});
