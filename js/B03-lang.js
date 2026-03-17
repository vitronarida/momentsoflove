// ============================================================
// B03-lang.js  —  그룹 B (기반)
// 언어 감지 + 언어 전환 함수
// 의존: B01-core.js (isMobile)
// ============================================================

// ===== 언어 감지 =====
const detectLang = () => {
  try {
    const key = isMobile ? "m_lang" : "d_lang";
    const s = localStorage.getItem(key) || localStorage.getItem("lang");
    if (s === "KR" || s === "EN") return s;
  } catch(e) {}
  return (navigator.language||"en").toLowerCase().startsWith("ko") ? "KR" : "EN";
};
let curLang = detectLang();
const saveLang = (l) => {
  try {
    localStorage.setItem(isMobile ? "m_lang" : "d_lang", l);
    localStorage.setItem("lang", l);
  } catch(e) {}
};


// ===== 언어 전환 =====
const setLang = (l) => {
  saveLang(l);
  try{sessionStorage.removeItem("gl_mode");}catch(e){}
  // 현재 열린 오버레이 저장 → reload 후 복원
  try {
    const open = ["tocOverlay","thumbOverlay","sceneListOverlay","indexOverlay"]
      .find(id => document.getElementById(id)?.classList.contains("on"));
    if (open) sessionStorage.setItem("reopen_overlay", open);
    else sessionStorage.removeItem("reopen_overlay");
  } catch(e) {}
  location.reload();
};

// window 노출
window.curLang = curLang;
window.setLang = setLang;
window.saveLang = saveLang;
