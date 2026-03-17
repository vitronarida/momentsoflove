// ============================================================
// B01-core.js  —  그룹 B (기반)
// 공통 변수, 디바이스 감지, CSS 조합 및 삽입
// 의존: A01~A11 (모든 CSS 파일이 먼저 로드되어야 함)
// ============================================================
'use strict';

(function() {

const SC = window.THIS_SCENE;
if (!SC) { console.error("THIS_SCENE not defined"); return; }

// ===== 디바이스 감지 =====
const isMobile = (() => {
  const forced = (() => { try { return sessionStorage.getItem("force_device"); } catch(e) { return null; } })();
  if (forced === "M") return true;
  if (forced === "PC") return false;
  return /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
})();

// ===== CSS 조합 및 삽입 =====
// A01~A11 파일에서 선언된 CSS 변수들을 isMobile에 따라 조합
const CSS_PARTS_MOBILE = [
  typeof CSS_A01_MOBILE    !== 'undefined' ? CSS_A01_MOBILE    : '',
  typeof CSS_A02_MOBILE     !== 'undefined' ? CSS_A02_MOBILE     : '',
  typeof CSS_A03_MOBILE   !== 'undefined' ? CSS_A03_MOBILE   : '',
  typeof CSS_A04_MOBILE     !== 'undefined' ? CSS_A04_MOBILE     : '',
  typeof CSS_A05_MOBILE !== 'undefined' ? CSS_A05_MOBILE : '',
  typeof CSS_A06_MOBILE     !== 'undefined' ? CSS_A06_MOBILE     : '',
  typeof CSS_A07_MOBILE   !== 'undefined' ? CSS_A07_MOBILE   : '',
  typeof CSS_A08_MOBILE !== 'undefined' ? CSS_A08_MOBILE : '',
  typeof CSS_A09_MOBILE !== 'undefined' ? CSS_A09_MOBILE : '',
  typeof CSS_A10_MOBILE  !== 'undefined' ? CSS_A10_MOBILE  : '',
  typeof CSS_A11_MOBILE !== 'undefined' ? CSS_A11_MOBILE : '',
].join('\n');

const CSS_PARTS_DESKTOP = [
  typeof CSS_A01_DESKTOP    !== 'undefined' ? CSS_A01_DESKTOP    : '',
  typeof CSS_A02_DESKTOP     !== 'undefined' ? CSS_A02_DESKTOP     : '',
  typeof CSS_A03_DESKTOP   !== 'undefined' ? CSS_A03_DESKTOP   : '',
  typeof CSS_A04_DESKTOP     !== 'undefined' ? CSS_A04_DESKTOP     : '',
  typeof CSS_A05_DESKTOP !== 'undefined' ? CSS_A05_DESKTOP : '',
  typeof CSS_A06_DESKTOP     !== 'undefined' ? CSS_A06_DESKTOP     : '',
  typeof CSS_A07_DESKTOP   !== 'undefined' ? CSS_A07_DESKTOP   : '',
  typeof CSS_A08_DESKTOP !== 'undefined' ? CSS_A08_DESKTOP : '',
  typeof CSS_A09_DESKTOP !== 'undefined' ? CSS_A09_DESKTOP : '',
  typeof CSS_A10_DESKTOP  !== 'undefined' ? CSS_A10_DESKTOP  : '',
  typeof CSS_A11_DESKTOP !== 'undefined' ? CSS_A11_DESKTOP : '',
].join('\n');

const styleEl = document.createElement("style");
styleEl.textContent = isMobile ? CSS_PARTS_MOBILE : CSS_PARTS_DESKTOP;
document.head.appendChild(styleEl);

// ===== viewport 높이 =====
const setVh = () => {
  document.documentElement.style.setProperty("--vh100", window.innerHeight + "px");
};
setVh();
window.addEventListener("resize", setVh);

// 전역 노출
window._isMobile = isMobile;
window._styleEl  = styleEl;

})();
