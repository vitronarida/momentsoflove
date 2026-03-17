// ============================================================
// C02-scenelist.js  —  그룹 C (UI 컴포넌트)
// Scene List — 썸네일+제목 오버레이 (리스트 뷰)
// 의존: B01-core, B02-scenes, B03-lang
// ============================================================

if (typeof isMobile === 'undefined') var isMobile = window._isMobile;
if (typeof SC === 'undefined') var SC = window.THIS_SCENE;

// ===== 씬 리스트 =====
const buildSceneList = () => {
  const lockSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"/></svg>`;
  return SCENES_ALL.filter(sc => sc.kr !== undefined).map(sc => {
    if (sc.id.startsWith("RST")) return `<div class="slst-divider"></div>`;
    const isCurrent = sc.code && sc.code === SC.code;
    const hasThumb = THUMB_CODES.has(sc.code);
    const hasPage = !!sc.file;
    const thumbHTML = hasThumb
      ? `<img class="slst-img" src="../assets/thumb/${sc.file}.jpg" alt="" loading="lazy" />`
      : `<div class="slst-lock">${lockSVG}</div>`;
    const title = curLang==="KR" ? sc.kr : (sc.en||sc.kr);
    const safeKr = (sc.kr||"").replace(/"/g,"&quot;").replace(/\n/g," ");
    const safeEn = (sc.en||"").replace(/"/g,"&quot;").replace(/\n/g," ");
    const thumbEl = hasThumb && hasPage
      ? `<div class="slst-thumb" style="cursor:pointer;" data-url="./${sc.file}.html">${thumbHTML}</div>`
      : `<div class="slst-thumb">${thumbHTML}</div>`;
    return `<div class="slst-item${isCurrent?" slst-current":""}" data-code="${sc.code||""}" data-kr="${safeKr}" data-en="${safeEn}" data-has-poem="">${thumbEl}<span class="slst-title">${title.replace(/\n/g,"<br>")}</span></div>`;
  }).join("");
};

const openPoemFromList = (code, kr, en, itemEl) => {
  if (!code) return;
  // SCENES_ALL에서 원본 텍스트 가져오기 (줄바꿈 보존)
  const sc = SCENES_ALL.find(s => s.code === code);
  const title = sc ? (curLang==="KR" ? sc.kr : (sc.en||sc.kr)) : (curLang==="KR" ? kr : (en||kr));
  const poemCode = code.replace(/#/g,"_");
  const poemFile = curLang==="EN" ? `../poems/${poemCode}_EN.txt` : `../poems/${poemCode}.txt`;
  fetch(poemFile).then(r => {
    if (!r.ok) throw new Error("not found");
    return r.text();
  }).then(txt => {
    if (itemEl) itemEl.dataset.hasPoem = "yes";
    SceneListManager.close();
    setTimeout(() => {
      const ov = document.getElementById("poemOverlay");
      if (!ov) return;
      const titleEl = document.getElementById("poemTitle");
      if (titleEl) {
        titleEl.innerHTML = title.replace(/\n/g, "<br>");
      }
      const pb = document.getElementById("poemBody");
      if (pb) {
        pb.style.cssText = "font-family:'Nanum Pen Script',cursive;font-size:clamp(20px,2.5vw,24px);line-height:0.8;color:rgba(235,235,235,0.90);white-space:pre-wrap;word-break:keep-all;padding:0 16px;margin-top:32px;";
        pb.textContent = txt.replace(/\r\n/g,"\n").replace(/\r/g,"\n");
      }
      ov.style.display = "flex";
      ov.setAttribute("aria-hidden","false");
      ov.dataset.fromList = "1";
      requestAnimationFrame(() => requestAnimationFrame(() => ov.classList.add("on")));
    }, 200);
  }).catch(() => {
    if (itemEl) itemEl.dataset.hasPoem = "no";
    const t = itemEl?.querySelector(".slst-title");
    if (t) t.classList.remove("has-poem");
  });
};

const buildSceneListHTML = () => {
  const t = LANG_TEXTS[curLang];
  const langToggle = isMobile
    ? `<div class="lang-toggle"><div class="lang-btn${curLang==="KR"?" active":""}" id="slstLangKR">KR</div><div class="lang-btn${curLang==="EN"?" active":""}" id="slstLangEN">EN</div></div>`
    : `<div class="langToggle"><div class="langBtn${curLang==="EN"?" active":""}" id="slstLangEN" role="button" tabindex="0">EN</div><div class="langBtn${curLang==="KR"?" active":""}" id="slstLangKR" role="button" tabindex="0">KR</div></div>`;
  const panelClass = isMobile ? "toc-panel" : "unified-panel panel-box slst-panel";
  return `
  <div id="sceneListOverlay" class="overlay-panel" aria-hidden="true" style="display:none;">
    <div class="overlay-backdrop" id="slstBackdrop"></div>
    <div class="${panelClass}">
      <div class="slst-header">
        <h2 class="toc-title">${t.slstTitle}</h2>
        <div style="display:flex;align-items:center;gap:10px;">
          ${langToggle}
          <div class="toc-close" id="slstClose" aria-label="Close">✕</div>
        </div>
      </div>
      <div class="slst-body" id="sceneListBody">${buildSceneList()}</div>
    </div>
  </div>`;
};

const SceneListManager = {
  open: () => {
    history.pushState({overlay:"sceneList"}, "");
    const ov = document.getElementById("sceneListOverlay");
    if (!ov) return;
    ov.style.display = "flex";
    ov.setAttribute("aria-hidden","false");
    requestAnimationFrame(() => requestAnimationFrame(() => ov.classList.add("on")));
    scrollToCurrent(document.getElementById("sceneListBody"), ".slst-current");
    // lazy load 썸네일
    document.querySelectorAll("#sceneListBody .slst-img").forEach(img => {
      img.addEventListener("load", () => img.classList.add("loaded"), {once:true});
      if (img.complete && img.naturalWidth > 0) img.classList.add("loaded");
    });
    // 시 파일 존재 여부 사전 체크 (미체크 항목만)
    document.querySelectorAll("#sceneListBody .slst-item[data-has-poem='']").forEach(item => {
      const code = item.dataset.code;
      if (!code) return;
      const poemCode = code.replace(/#/g,"_");
      const poemFile = curLang==="EN" ? `../poems/${poemCode}_EN.txt` : `../poems/${poemCode}.txt`;
      const penSVG = `<span class="slst-lock-tag"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="M20.24 4.76a6 6 0 0 0-8.49 0L4 12.5V20h7.5l7.74-7.75a6 6 0 0 0 0-8.49z"/><line x1="16" y1="8" x2="2" y2="22"/><line x1="17.5" y1="15" x2="9" y2="15"/></svg></span>`;
      fetch(poemFile, {method:"HEAD"}).then(r => {
        item.dataset.hasPoem = r.ok ? "yes" : "no";
        const t = item.querySelector(".slst-title");
        if (!t) return;
        if (r.ok) {
          t.classList.add("has-poem");
          t.insertAdjacentHTML("beforeend", penSVG);
        }
      }).catch(() => {
        item.dataset.hasPoem = "no";
      });
    });
  },
  close: () => {
    const ov = document.getElementById("sceneListOverlay");
    if (!ov) return;
    ov.classList.remove("on");
    ov.setAttribute("aria-hidden","true");
    setTimeout(() => { ov.style.display = "none"; }, 420);
  }
};

// window 노출
window.SceneListManager = SceneListManager;
window.openPoemFromList = openPoemFromList;
