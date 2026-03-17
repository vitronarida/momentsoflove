'use strict';
// ============================================================
// gallery.js — 갤러리 진입점
// 의존: B01~B03, C01~C04, D01, E01
// ============================================================

const BUILD_TS = '2026.02.26 22:14';
console.log('%c Moments of Love %c ' + BUILD_TS + ' ', 'background:#d4af37;color:#000;font-weight:bold;border-radius:3px 0 0 3px;padding:2px 6px;', 'background:#333;color:#fff;border-radius:0 3px 3px 0;padding:2px 6px;');

var SC       = window.THIS_SCENE;
var isMobile = window._isMobile;
if (!SC) { console.error('THIS_SCENE not defined'); }






window.goTo = goTo;

// ===== 페이지에 DOM 삽입 =====
// app 컨테이너는 항상 생성
const appEl = document.createElement("div"); appEl.id="app";
if (isMobile) {
  // 모바일: blackout + app 먼저, TOC/INDEX는 맨 뒤
  const bo = document.createElement("div"); bo.id="blackout";
  document.body.appendChild(bo);
  document.body.appendChild(appEl);
  document.body.insertAdjacentHTML("beforeend", buildTOCHTML());
} else {
  document.body.insertAdjacentHTML("afterbegin", buildTOCHTML());
  document.body.appendChild(appEl);
}
document.body.insertAdjacentHTML("beforeend", buildSceneListHTML());

// ===== index → 첫 페이지: 정사각형만 흰색 전환 =====
const fromIndex = new URLSearchParams(window.location.search).get("from") === "index";
window.fromIndex = fromIndex;

// ===== 공통 이벤트 바인딩 =====
const bindCommon = () => {
  document.getElementById("tocBackdrop")?.addEventListener("click", TOCManager.close);
  document.getElementById("tocClose")?.addEventListener("click", TOCManager.close);
  document.getElementById("indexBackdrop")?.addEventListener("click", IndexManager.close);
  document.getElementById("indexClose")?.addEventListener("click", IndexManager.close);
  document.getElementById("aboutBackdrop")?.addEventListener("click", AboutManager.close);
  document.getElementById("aboutClose")?.addEventListener("click", AboutManager.close);
  document.getElementById("gbBackdrop")?.addEventListener("click", GuestbookManager.close);
  document.getElementById("gbClose")?.addEventListener("click", GuestbookManager.close);
  document.getElementById("helpBackdrop")?.addEventListener("click", HelpManager.close);
  document.getElementById("helpClose")?.addEventListener("click", HelpManager.close);
  document.getElementById("tocInfoBtn")?.addEventListener("click", HelpManager.open);
  document.getElementById("menuH_GB")?.addEventListener("click",(e)=>{e.preventDefault();e.stopPropagation();GuestbookManager.open();});
  document.getElementById("menuH_GB")?.addEventListener("keydown",(e)=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();GuestbookManager.open();}});
  document.getElementById("langKR")?.addEventListener("click", ()=>setLang("KR"));
  document.getElementById("langEN")?.addEventListener("click", ()=>setLang("EN"));

  // 씬 리스트 오버레이
  document.getElementById("slstBackdrop")?.addEventListener("click", SceneListManager.close);
  document.getElementById("slstClose")?.addEventListener("click", SceneListManager.close);
  document.getElementById("slstLangKR")?.addEventListener("click", ()=>setLang("KR"));
  document.getElementById("slstLangEN")?.addEventListener("click", ()=>setLang("EN"));
  document.getElementById("sceneListBody")?.addEventListener("click", e => {
    // 썸네일 클릭 → 페이지 이동
    const thumb = e.target.closest(".slst-thumb[data-url]");
    if (thumb) { goTo(thumb.dataset.url); return; }
    // 제목 클릭 → 시 열기
    const title = e.target.closest(".slst-title");
    if (!title) return;
    const item = title.closest(".slst-item");
    if (!item) return;
    // 이미 시 없음 확인된 경우 — 살짝 흔들기 피드백
    if (item.dataset.hasPoem === "no") {
      title.classList.add("slst-shake");
      setTimeout(() => title.classList.remove("slst-shake"), 400);
      return;
    }
    openPoemFromList(item.dataset.code, item.dataset.kr, item.dataset.en, item);
  });

  const tocNav = {tocPrologue:"LPL",tocLoveDream:"LDR",tocLoveSong:"LSN",tocEpilogue:"LEL"};
  Object.entries(tocNav).forEach(([id,prefix])=>{
    document.getElementById(id)?.addEventListener("click",(e)=>{
      e.preventDefault();
      // 우측 썸네일 그리드에서 해당 섹션 헤더를 찾아 스크롤
      const gridId = isMobile ? "mobThumbGrid" : "thumbGrid";
      const grid = document.getElementById(gridId);
      if(!grid) return;
      const heads = grid.querySelectorAll(".thumb-section-head");
      for(const h of heads){
        if(h.textContent.trim().startsWith(prefix)){
          const scrollParent = h.closest(".mob-unified-right") || h.closest(".unified-thumb-body") || grid.parentElement;
          if(scrollParent){ scrollParent.scrollTop = h.offsetTop - scrollParent.offsetTop; }
          break;
        }
      }
    });
  });
  const tocIndex=document.getElementById("tocIndex");
  tocIndex?.addEventListener("click",(e)=>{e.preventDefault();e.stopPropagation();IndexManager.open();});
  document.getElementById("tocIndexBtn")?.addEventListener("click",(e)=>{e.preventDefault();e.stopPropagation();IndexManager.open();});
  document.getElementById("tocIndexBtn")?.addEventListener("keydown",(e)=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();IndexManager.open();}});
  document.getElementById("tocIndexThumb")?.addEventListener("click",(e)=>{e.preventDefault();e.stopPropagation();ThumbnailManager.open();});
  document.getElementById("tocIndexThumb")?.addEventListener("keydown",(e)=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();ThumbnailManager.open();}});
  document.getElementById("thumbBackdrop")?.addEventListener("click", ThumbnailManager.close);
  document.getElementById("thumbClose")?.addEventListener("click", ThumbnailManager.close);
  document.getElementById("thumbMenuBtn")?.addEventListener("click",(e)=>{e.preventDefault();e.stopPropagation();ThumbnailManager.close();setTimeout(()=>TOCManager.open(),200);});
  document.getElementById("thumbMenuBtn")?.addEventListener("keydown",(e)=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();ThumbnailManager.close();setTimeout(()=>TOCManager.open(),200);}});
  document.getElementById("mobExpandBtn")?.addEventListener("click",(e)=>{e.preventDefault();e.stopPropagation();TOCManager.close();setTimeout(()=>ThumbnailManager.open(),200);});
  document.getElementById("menuH_ABOUT")?.addEventListener("click",(e)=>{e.preventDefault();e.stopPropagation();AboutManager.open();});
  document.getElementById("menuH_ABOUT")?.addEventListener("keydown",(e)=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();AboutManager.open();}});

  const homeEl=document.getElementById("tocHome");
  homeEl?.addEventListener("click",(e)=>{e.preventDefault();IntroManager.open();});
  document.getElementById("introBackdrop")?.addEventListener("click", IntroManager.close);
  document.getElementById("introBtn")?.addEventListener("click",()=>{IntroManager.close();try{sessionStorage.removeItem("gl_mode");}catch(e){}setTimeout(()=>goTo("../index.html"),300);});
};
window.bindCommon = bindCommon;
