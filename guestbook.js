/* ================================================================
 *  guestbook.js — gallery.js 연동 방명록 (Firestore)
 *  인라인 스타일 제거 → gallery.js CSS 클래스 사용
 * ================================================================ */

const GB_CONFIG = {
  firebase: {
    apiKey:            "AIzaSyCM-4subBV6n9zEUgFq9D1b4mUSsNjGzlc",
    authDomain:        "moment-of-love-d0dbb.firebaseapp.com",
    projectId:         "moment-of-love-d0dbb",
    storageBucket:     "moment-of-love-d0dbb.firebasestorage.app",
    messagingSenderId: "276426425721",
    appId:             "1:276426425721:web:c402f613c67c8968435ba8"
  },
  maxLength: 300
};

let gbFirebaseReady = false;
let gbAuth = null;
let gbDB = null;

const loadGBFirebase = () => new Promise((resolve) => {
  if (gbFirebaseReady) { resolve(); return; }
  // gallery.js(하트 코드)가 이미 Firebase를 로드했으면 재사용
  if (typeof firebase !== "undefined" && firebase.apps && firebase.apps.length) {
    gbAuth = firebase.auth();
    gbDB = firebase.firestore();
    gbFirebaseReady = true;
    resolve();
    return;
  }
  const sdks = [
    "https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js",
    "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth-compat.js",
    "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore-compat.js"
  ];
  let loaded = 0;
  sdks.forEach(src => {
    if (document.querySelector(`script[src="${src}"]`)) { loaded++; if(loaded===sdks.length) init(); return; }
    const s = document.createElement("script");
    s.src = src;
    s.onload = () => { loaded++; if (loaded === sdks.length) init(); };
    document.head.appendChild(s);
  });
  function init() {
    if (!firebase.apps.length) firebase.initializeApp(GB_CONFIG.firebase);
    gbAuth = firebase.auth();
    gbDB = firebase.firestore();
    gbFirebaseReady = true;
    resolve();
  }
});

/* ──────────────────────────────
 * 번역
 * ────────────────────────────── */
const T = {
  KR: {
    subtitle:    "당신의 순간은 어떤가요?",
    name:        "당신의 이름",
    msg:         "",
    submit:      "당신의 순간 보내기",
    sending:     "전송 중…",
    emptyAlert:  "이름과 내용을 모두 적어주세요.",
    successMsg:  "당신의 이야기가 전해졌습니다.",
    errorMsg:    "오류가 발생했습니다. 다시 시도해주세요."
  },
  EN: {
    subtitle:    "What did this moment mean to you?",
    name:        "Your Name",
    msg:         "",
    submit:      "Send Your Moment",
    sending:     "Sending…",
    emptyAlert:  "Please fill in both name and message.",
    successMsg:  "Your story has been delivered.",
    errorMsg:    "Something went wrong. Please try again."
  }
};

/* ──────────────────────────────
 * DOM
 * ────────────────────────────── */
const $ = (id) => document.getElementById(id);

/* ──────────────────────────────
 * 폼 렌더링 (Firebase 불필요 — 즉시 표시)
 * ────────────────────────────── */
function renderForm(lang) {
  const area = $("gbFormArea");
  if (!area) return;
  const t = T[lang] || T.KR;

  area.innerHTML = `
    <div class="gb-form">
      <p class="gb-subtitle">${t.subtitle}</p>
      <input type="text" id="gbName" class="gb-input"
        placeholder="${t.name}" maxlength="30">

      <textarea id="gbTextarea" class="gb-textarea"
        placeholder="${t.msg}"
        maxlength="${GB_CONFIG.maxLength}" rows="3"></textarea>

      <div id="gbErrorMsg" class="gb-error-msg"></div>

      <div class="gb-form-footer">
        <span class="gb-char-count" id="gbCharCount">0 / ${GB_CONFIG.maxLength}</span>
        <button class="gb-submit-btn" id="gbSubmitBtn">${t.submit}</button>
      </div>
    </div>`;

  // 글자수 카운터 + textarea 자동 높이
  const textarea = $("gbTextarea");
  const counter  = $("gbCharCount");
  const autoResize = () => {
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  };
  textarea.addEventListener("input", () => {
    const n = textarea.value.length;
    counter.textContent = `${n} / ${GB_CONFIG.maxLength}`;
    counter.classList.toggle("gb-char-warn", n > GB_CONFIG.maxLength * 0.9);
    autoResize();
  });

  // 모바일 키보드 올라올 때 입력 필드 가려짐 방지
  [$("gbName"), textarea].forEach(el => {
    el.addEventListener("focus", () => {
      setTimeout(() => el.scrollIntoView({ block: "center", behavior: "smooth" }), 300);
    });
  });

  // 전송 버튼
  $("gbSubmitBtn").addEventListener("click", () => handleSubmit(lang));
}

/* ──────────────────────────────
 * 리스트 영역 초기화
 * ────────────────────────────── */
function clearListArea() {
  const area = $("gbListArea");
  if (area) area.innerHTML = "";
}

/* ──────────────────────────────
 * 전송 처리 (이 시점에서만 Firebase 로드)
 * ────────────────────────────── */
async function handleSubmit(lang) {
  const name    = $("gbName")?.value.trim();
  const message = $("gbTextarea")?.value.trim();
  const btn     = $("gbSubmitBtn");
  const t       = T[lang] || T.KR;

  if (!name || !message) {
    const errEl = $("gbErrorMsg");
    if (errEl) {
      errEl.textContent = t.emptyAlert;
      errEl.classList.add("show");
      setTimeout(() => errEl.classList.remove("show"), 3000);
    }
    return;
  }

  btn.disabled = true;
  btn.textContent = t.sending;

  try {
    // 전송 시점에 Firebase 로드 (이미 로드됐으면 즉시)
    await loadGBFirebase();
    if (!gbAuth.currentUser) await gbAuth.signInAnonymously();

    await gbDB.collection("private_guestbook").add({
      name:      name,
      message:   message,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });

    // 성공 화면 (gallery.js CSS 클래스 사용)
    $("gbFormArea").innerHTML = `
      <div class="gb-success">
        <div class="gb-success-icon"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.2" stroke="rgba(212,175,55,0.85)" style="width:40px;height:40px;"><path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" /></svg></div>
        <p class="gb-success-msg">${t.successMsg.replace(/\n/g, "<br>")}</p>
      </div>`;

    // 3초 후 자동 닫기
    setTimeout(() => {
      if (typeof window.GuestbookManager !== "undefined") {
        window.GuestbookManager.close();
      } else {
        // fallback: 직접 닫기
        const ov = document.getElementById("gbOverlay");
        if (ov) { ov.classList.remove("on"); ov.setAttribute("aria-hidden","true"); setTimeout(() => { ov.style.display = "none"; }, 420); }
      }
    }, 3000);

  } catch (err) {
    console.error("Guestbook submit error:", err);
    const errEl = $("gbErrorMsg");
    if (errEl) {
      errEl.textContent = t.errorMsg;
      errEl.classList.add("show");
      setTimeout(() => errEl.classList.remove("show"), 4000);
    }
    btn.disabled = false;
    btn.textContent = t.submit;
  }
}

/* ──────────────────────────────
 * 초기화 (gallery.js에서 호출)
 * Firebase 로드 없이 즉시 폼 렌더
 * ────────────────────────────── */
window.initGuestbook = function (lang) {
  renderForm(lang);
  clearListArea();
  // Firebase는 백그라운드에서 미리 로드 (전송 시 빠르게)
  loadGBFirebase().catch(() => {});
};

window.updateGuestbookLang = function (lang) {
  renderForm(lang);
};
