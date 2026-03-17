// ============================================================
// C04-guestbook.js  —  그룹 C (UI 컴포넌트)
// 게스트북 매니저 (Dynamic Import)
// 의존: B01-core
// ============================================================

if (typeof isMobile === 'undefined') var isMobile = window._isMobile;

// ===== Guestbook 매니저 (Dynamic Import) =====
let gbScriptLoaded = false;
const GuestbookManager = {
  open: () => {
    history.pushState({overlay:"gb"}, "");
    if (isMobile) TOCManager.close();
    const ov = document.getElementById("gbOverlay");
    if (!ov) return;
    ov.style.display = "flex";
    ov.classList.add("on");
    ov.setAttribute("aria-hidden","false");

    if (!gbScriptLoaded) {
      gbScriptLoaded = true;
      const s = document.createElement("script");
      s.src = "../guestbook.js?v=" + Date.now();
      s.onload = () => {
        if (typeof window.initGuestbook === "function") window.initGuestbook(curLang);
      };
      document.head.appendChild(s);
    } else {
      if (typeof window.initGuestbook === "function") window.initGuestbook(curLang);
    }
  },
  close: () => {
    const ov = document.getElementById("gbOverlay");
    if (!ov) return;
    ov.classList.remove("on");
    ov.setAttribute("aria-hidden","true");
    setTimeout(() => { ov.style.display = "none"; }, 420);
  }
};

// window 노출
window.GuestbookManager = GuestbookManager;
