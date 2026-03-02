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
    name:        "성함",
    msg:         "사진을 본 소중한 감상을 남겨주세요…",
    submit:      "작가님께 전송하기",
    sending:     "전송 중…",
    emptyAlert:  "성함과 내용을 모두 적어주세요.",
    successMsg:  "소중한 마음이 작가님께 잘 전달되었습니다.\n감사합니다.",
    errorMsg:    "오류가 발생했습니다. 다시 시도해주세요."
  },
  EN: {
    name:        "Name",
    msg:         "Leave your message for the artist…",
    submit:      "Send to Artist",
    sending:     "Sending…",
    emptyAlert:  "Please fill in both name and message.",
    successMsg:  "Your message has been delivered to the artist.\nThank you.",
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
      <input type="text" id="gbName" class="gb-input"
        placeholder="${t.name}" maxlength="30">

      <textarea id="gbTextarea" class="gb-textarea"
        placeholder="${t.msg}"
        maxlength="${GB_CONFIG.maxLength}" rows="4"></textarea>

      <div class="gb-form-footer">
        <span class="gb-char-count" id="gbCharCount">0 / ${GB_CONFIG.maxLength}</span>
        <button class="gb-submit-btn" id="gbSubmitBtn">${t.submit}</button>
      </div>
    </div>`;

  // 글자수 카운터
  const textarea = $("gbTextarea");
  const counter  = $("gbCharCount");
  textarea.addEventListener("input", () => {
    const n = textarea.value.length;
    counter.textContent = `${n} / ${GB_CONFIG.maxLength}`;
    counter.classList.toggle("gb-char-warn", n > GB_CONFIG.maxLength * 0.9);
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
    alert(t.emptyAlert);
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
        <div class="gb-success-icon">✉️</div>
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
    alert(t.errorMsg);
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
