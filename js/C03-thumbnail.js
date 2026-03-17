// ============================================================
// C03-thumbnail.js  —  그룹 C (UI 컴포넌트)
// 썸네일 INDEX 렌더 + 썸네일 매니저 + Firebase
// 의존: B01-core, B02-scenes, B03-lang
// ============================================================

if (typeof SC === 'undefined') var SC = window.THIS_SCENE;

// ===== 썸네일 INDEX 렌더 =====
const HEART_PATH = "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z";

// Firebase 설정 (guestbook과 동일 프로젝트)
const HEART_FB_CONFIG = {
  apiKey:            "AIzaSyCM-4subBV6n9zEUgFq9D1b4mUSsNjGzlc",
  authDomain:        "moment-of-love-d0dbb.firebaseapp.com",
  projectId:         "moment-of-love-d0dbb",
  storageBucket:     "moment-of-love-d0dbb.firebasestorage.app",
  messagingSenderId: "276426425721",
  appId:             "1:276426425721:web:c402f613c67c8968435ba8"
};

let heartFBReady = false;
let heartAuth = null;
let heartDB = null;

const loadHeartFirebase = () => new Promise((resolve) => {
  if (heartFBReady) { resolve(); return; }
  if (typeof firebase !== "undefined" && firebase.apps && firebase.apps.length) {
    heartAuth = firebase.auth();
    heartDB = firebase.firestore();
    heartFBReady = true;
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
    if (!firebase.apps.length) firebase.initializeApp(HEART_FB_CONFIG);
    heartAuth = firebase.auth();
    heartDB = firebase.firestore();
    heartFBReady = true;
    resolve();
  }
});

/* Firestore 구조: photo_likes/{photoCode}
   { count: 42, likedBy: ["uid1", "uid2", ...] }
   - count: 총 하트 수 (나중에 카운트 표시 가능)
   - likedBy: 하트 누른 사용자 UID 배열
   - 문서 ID: LPL#01 → LPL_01 (# → _ 치환) */

// 문서 ID 안전 변환 (# → _)
const toDocId = (code) => code.replace(/#/g, "_");

// localStorage 캐시 (즉시 UI용)
const getHeartsCache = () => {
  try { return JSON.parse(localStorage.getItem("gallery_hearts") || "{}"); }
  catch { return {}; }
};
const saveHeartsCache = (h) => {
  try { localStorage.setItem("gallery_hearts", JSON.stringify(h)); } catch {}
};

// Firestore에서 내가 누른 하트 목록 읽기
const loadHeartsFromDB = async () => {
  try {
    await loadHeartFirebase();
    if (!heartAuth.currentUser) await heartAuth.signInAnonymously();
    const uid = heartAuth.currentUser.uid;
    const snapshot = await heartDB.collection("photo_likes").get();
    const h = {};
    snapshot.forEach(doc => {
      const data = doc.data();
      if (data.likedBy && data.likedBy.includes(uid)) {
        // 문서 ID(LPL_01)를 원래 코드(LPL#01)로 복원하여 캐시 저장
        const code = doc.id.replace(/_/g, "#");
        h[code] = true;
      }
    });
    saveHeartsCache(h);
    return h;
  } catch (err) { console.error("Hearts load error:", err); }
  return getHeartsCache();
};

// 개별 하트 토글 (Firestore)
const toggleHeartInDB = async (code, isLiking) => {
  try {
    await loadHeartFirebase();
    if (!heartAuth.currentUser) await heartAuth.signInAnonymously();
    const uid = heartAuth.currentUser.uid;
    const ref = heartDB.collection("photo_likes").doc(toDocId(code));
    if (isLiking) {
      await ref.set({
        count: firebase.firestore.FieldValue.increment(1),
        likedBy: firebase.firestore.FieldValue.arrayUnion(uid)
      }, { merge: true });
    } else {
      await ref.update({
        count: firebase.firestore.FieldValue.increment(-1),
        likedBy: firebase.firestore.FieldValue.arrayRemove(uid)
      });
    }
  } catch (err) { console.error("Heart toggle error:", err); }
};

let currentHearts = {};

const renderThumbnails = async () => {
  const grid = document.getElementById("thumbGrid"); if (!grid) return;
  grid.innerHTML = "";
  // Firebase 먼저 로드 (하트 클릭 전 준비 완료)
  const fbReady = loadHeartFirebase().catch(() => {});
  // 캐시로 즉시 렌더
  currentHearts = getHeartsCache();
  buildThumbGrid(grid, currentHearts);
  // Firebase 로드 완료 대기 후 Firestore에서 동기화
  await fbReady;
  const dbHearts = await loadHeartsFromDB();
  if (JSON.stringify(dbHearts) !== JSON.stringify(currentHearts)) {
    currentHearts = dbHearts;
    buildThumbGrid(grid, currentHearts);
  }
};

const buildThumbGrid = (grid, hearts) => {
  grid.innerHTML = "";
  const codeToScene = {};
  SCENES_ALL.forEach(sc => { if (sc.code) codeToScene[sc.code] = sc; });
  const LOCK_SVG = '<svg viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="10" rx="2" ry="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>';

  INDEX_ROWS.forEach(row => {
    if (row.type === "head") {
      const head = document.createElement("div");
      head.className = "thumb-section-head";
      head.textContent = row.label;
      grid.appendChild(head);
      return;
    }

    const code = row.code;
    const sc = codeToScene[code];
    const hasThumb = THUMB_CODES.has(code);
    const card = document.createElement("div");

    if (sc && hasThumb) {
      card.className = "thumb-card" + (sc.code === SC.code ? " thumb-current" : "");

      const img = document.createElement("img");
      img.className = "thumb-img";
      img.alt = curLang === "KR" ? sc.kr : sc.en;
      img.loading = "lazy";
      img.src = "../assets/thumb/" + sc.file + ".jpg";
      img.addEventListener("load", () => img.classList.add("loaded"));
      img.addEventListener("error", () => { img.style.display="none"; }, {once:true});

      const codeEl = document.createElement("div");
      codeEl.className = "thumb-code";
      codeEl.textContent = sc.code;

      const liked = !!hearts[sc.code];
      const heart = document.createElement("div");
      heart.className = "thumb-heart";
      heart.innerHTML = `<svg viewBox="0 0 24 24" class="${liked ? "heart-filled" : "heart-empty"}"><path d="${HEART_PATH}"/></svg>`;

      heart.addEventListener("click", (e) => {
        e.stopPropagation();
        const isLiked = !!currentHearts[sc.code];
        if (isLiked) { delete currentHearts[sc.code]; }
        else { currentHearts[sc.code] = true; }
        saveHeartsCache(currentHearts);
        const svg = heart.querySelector("svg");
        svg.className.baseVal = isLiked ? "heart-empty" : "heart-filled";
        heart.classList.remove("pop");
        void heart.offsetHeight;
        heart.classList.add("pop");
        toggleHeartInDB(sc.code, !isLiked);
      });

      card.addEventListener("click", () => goTo("./" + sc.file + ".html"));
      card.append(img, codeEl, heart);
    } else {
      card.className = "thumb-card thumb-locked";

      const placeholder = document.createElement("div");
      placeholder.className = "thumb-placeholder";

      const lockIcon = document.createElement("div");
      lockIcon.className = "thumb-lock-icon";
      lockIcon.innerHTML = LOCK_SVG;

      const title = LOCKED_TITLES[code];
      if (title) {
        const titleEl = document.createElement("div");
        titleEl.className = "thumb-title";
        titleEl.textContent = title;
        card.append(placeholder, lockIcon, titleEl);
      } else {
        card.append(placeholder, lockIcon);
      }

      const codeEl = document.createElement("div");
      codeEl.className = "thumb-code";
      codeEl.textContent = code;
      card.appendChild(codeEl);
    }

    grid.appendChild(card);
  });
};

// ===== 썸네일 매니저 =====
const ThumbnailManager = {
  open: async () => {
    history.pushState({overlay:"thumb"}, "");
    TOCManager.close();
    const ov = document.getElementById("thumbOverlay");
    if (!ov) return;
    ov.style.display = "flex";
    ov.classList.add("on");
    ov.setAttribute("aria-hidden","false");
    await renderThumbnails();
    scrollToCurrent(document.getElementById("thumbGrid"), ".thumb-current");
  },
  close: () => {
    const ov = document.getElementById("thumbOverlay");
    if (!ov) return;
    ov.classList.remove("on");
    ov.setAttribute("aria-hidden","true");
    setTimeout(() => {
      ov.style.display = "none";
      const grid = document.getElementById("thumbGrid");
      if (grid) grid.innerHTML = "";
    }, 420);
  }
};

// window 노출
window.ThumbnailManager = ThumbnailManager;
