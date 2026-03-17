// ============================================================
// E02-events.js  —  그룹 E (렌더링)
// ripple 초기화 + 공통 이벤트 (DOM 삽입 후) + 타임스탬프
// 의존: B01-core, B02-scenes, B03-lang, D01-effects
// ============================================================

var isMobile = window._isMobile;
var SC = window.THIS_SCENE;

// ===== ripple 초기화 (DOM 삽입 후) =====
    if(SC.id==="prague"||SC.id==="dreams"){
      const doRipple=()=>{
        if(imgEl._rippleStarted)return;
        imgEl._rippleStarted=true;
        if(SC.id==="prague") _initRipple(imgEl,sq);
        else _initRippleTop(imgEl,sq);
      };
      if(imgEl.complete&&imgEl.naturalWidth>0) doRipple();
      else{
        imgEl.addEventListener("load",doRipple,{once:true});
        const rp=setInterval(()=>{if(imgEl.naturalWidth>0){clearInterval(rp);doRipple();}},16);
        imgEl.addEventListener("load",()=>clearInterval(rp),{once:true});
      }
    }
  } else {
    setTimeout(()=>frame.classList.add("show-text"),TIMING.SCENE_TEXT());
    setTimeout(()=>frame.classList.add("nav-ready"),TIMING.SCENE_TEXT()+50);
  }

  // UI 모드
  // UI 초기화 (고정: ui-text-only)
  document.body.classList.add("ui-text-only");
  document.body.classList.add("ui-mode-ready");
  const _poemIcon=`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:28px;height:28px;"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"/></svg>`;
  document.querySelectorAll(".soloToggle").forEach(b=>{ b.innerHTML=_poemIcon; });

  // Poem 모달
  const _poemCode = (SC.code || "").replace(/#/g,"_");
  const _poemFile = curLang==="EN" ? `../poems/${_poemCode}_EN.txt` : `../poems/${_poemCode}.txt`;
  let _poemText = null;
  if(_poemCode){
    fetch(_poemFile).then(r=>{
      if(!r.ok) throw new Error("not found");
      return r.text();
    }).then(txt=>{
      _poemText=txt;
      document.querySelectorAll(".soloToggle").forEach(b=>{
        b.setAttribute("data-tip", curLang==="KR" ? "사진 너머의 속삭임" : "A whisper beyond the frame");
      });
    }).catch(()=>{
      _poemText=null;
      document.querySelectorAll(".soloToggle").forEach(b=>{
        b.setAttribute("data-tip", curLang==="KR" ? "아직 피지 않은 이야기" : "A story yet to bloom");
      });
    });
  }
  const PoemManager = {
    open(){
      if(!_poemText) return;
      const ov=document.getElementById("poemOverlay");
      if(!ov) return;
      document.getElementById("poemTitle").textContent = curLang==="KR" ? SC.textKR : SC.textEN;
      const pb=document.getElementById("poemBody");
      pb.style.cssText="font-family:'Nanum Pen Script',cursive;font-size:clamp(20px,2.5vw,24px);line-height:0.8;color:rgba(235,235,235,0.90);white-space:pre-wrap;word-break:keep-all;padding:0 16px;margin-top:32px;";
      pb.textContent = _poemText.replace(/\r\n/g,"\n").replace(/\r/g,"\n");
      ov.style.display="flex"; ov.setAttribute("aria-hidden","false");
      requestAnimationFrame(()=>requestAnimationFrame(()=>ov.classList.add("on")));
    },
    close(){
      const ov=document.getElementById("poemOverlay");
      if(!ov) return;
      const fromList = ov.dataset.fromList === "1";
      delete ov.dataset.fromList;
      ov.classList.remove("on");
      setTimeout(()=>{
        ov.style.display="none"; ov.setAttribute("aria-hidden","true");
        if(fromList) SceneListManager.open();
      },340);
    }
  };
  document.getElementById("poemClose")?.addEventListener("click",PoemManager.close);
  document.getElementById("poemBackdrop")?.addEventListener("click",PoemManager.close);
  document.querySelectorAll(".soloToggle").forEach(b=>b.addEventListener("click",()=>{
    SceneListManager.open();
  }));

  // 데스크탑 전용 이벤트
  menuBtn.addEventListener("click",TOCManager.open);
  workCode.addEventListener("click",(e)=>{e.preventDefault();e.stopPropagation();IndexManager.open();});
  workCode.addEventListener("keydown",(e)=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();IndexManager.open();}});
  document.getElementById("thumbExpandBtn")?.addEventListener("click",()=>{document.querySelector(".unified-panel")?.classList.toggle("expanded");});
  document.getElementById("thumbExpandBtn")?.addEventListener("keydown",(e)=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();document.querySelector(".unified-panel")?.classList.toggle("expanded");}});

  // 키보드
  document.addEventListener("keydown",(e)=>{
    const menuOn=document.getElementById("tocOverlay").classList.contains("on");
    const indexOn=document.getElementById("indexOverlay").classList.contains("on");
    const aboutOn=document.getElementById("aboutOverlay")?.classList.contains("on");
    const poemOn=document.getElementById("poemOverlay")?.classList.contains("on");
    const gbOn=document.getElementById("gbOverlay")?.classList.contains("on");
    const helpOn=document.getElementById("helpOverlay")?.classList.contains("on");
    const introOn=document.getElementById("introOverlay")?.classList.contains("on");
    const slstOn=document.getElementById("sceneListOverlay")?.classList.contains("on");
    if(e.key==="Escape"){
      if(introOn){e.preventDefault();IntroManager.close();return;}
      if(helpOn){e.preventDefault();HelpManager.close();return;}
      if(slstOn){e.preventDefault();SceneListManager.close();return;}
      if(poemOn){e.preventDefault();PoemManager.close();return;}
      if(gbOn){e.preventDefault();GuestbookManager.close();return;}
      if(aboutOn){e.preventDefault();AboutManager.close();return;}
      if(indexOn){e.preventDefault();IndexManager.close();return;}
      if(menuOn){e.preventDefault();TOCManager.close();return;}
      return;
    }
    if(e.key==="m"||e.key==="M"){e.preventDefault();menuOn?TOCManager.close():TOCManager.open();return;}
    if(e.key==="i"||e.key==="I"){e.preventDefault();indexOn?IndexManager.close():IndexManager.open();return;}
    if(e.key==="g"||e.key==="G"){e.preventDefault();gbOn?GuestbookManager.close():GuestbookManager.open();return;}
    if(e.key==="h"||e.key==="H"){e.preventDefault();helpOn?HelpManager.close():HelpManager.open();return;}
    if(menuOn||indexOn||aboutOn||poemOn||gbOn||helpOn||introOn||slstOn)return;
    if(e.key==="ArrowRight"||e.key==="ArrowDown"||e.key==="Enter"){e.preventDefault();goTo(SC.nextURL);}
    else if(e.key==="ArrowLeft"||e.key==="ArrowUp"){e.preventDefault();goTo(SC.prevURL);}
  });

  // Photo Only 피크
  let peekTimer=null;
  const showPeek=()=>{document.body.classList.add("solo-peek");clearTimeout(peekTimer);peekTimer=setTimeout(()=>document.body.classList.remove("solo-peek"),2000);};
  document.addEventListener("mousemove",showPeek);
  document.addEventListener("click",showPeek);
  document.addEventListener("touchstart",showPeek,{passive:true});
  // nav-ready 시점 자동 peek 제거 — 마우스 이동 시에만 버튼 표시
}

// ===== 공통 이벤트 (반드시 DOM 삽입 후 실행) =====
bindCommon();

// ===== Android 백 버튼 — 오버레이 닫기 =====
window.addEventListener("popstate", () => {
  const overlays = [
    {id:"thumbOverlay",     mgr: ThumbnailManager},
    {id:"indexOverlay",     mgr: IndexManager},
    {id:"aboutOverlay",     mgr: AboutManager},
    {id:"gbOverlay",        mgr: GuestbookManager},
    {id:"helpOverlay",      mgr: HelpManager},
    {id:"introOverlay",     mgr: IntroManager},
    {id:"sceneListOverlay", mgr: SceneListManager},
    {id:"tocOverlay",       mgr: TOCManager},
  ];
  const open = overlays.find(o => document.getElementById(o.id)?.classList.contains("on"));
  if (open) {
    // 오버레이 있을 때 — 닫고 스택 보충 (페이지 이탈 방지)
    history.pushState(null, "", location.href);
    open.mgr.close();
  }
  // 오버레이 없을 때 — 자연스럽게 이전 장면으로 이동
});

// ===== 언어 전환 후 오버레이 복원 =====
try {
  const reopen = sessionStorage.getItem("reopen_overlay");
  if (reopen) {
    sessionStorage.removeItem("reopen_overlay");
    setTimeout(() => {
      if (reopen === "tocOverlay") TOCManager.open();
      else if (reopen === "thumbOverlay") ThumbnailManager.open();
      else if (reopen === "sceneListOverlay") SceneListManager.open();
      else if (reopen === "indexOverlay") IndexManager.open();
    }, 80);
  }
} catch(e) {}

// ===== 3·4페이지 마우스 휠 줌 차단 =====
if(SC.id==="prague"||SC.id==="dreams"){
  document.addEventListener("wheel",(e)=>{if(e.ctrlKey)e.preventDefault();},{passive:false});
}

// ===== 터치패드 스와이프 (데스크탑 모드) =====
if(!isMobile){
  let wheelTimer = null;
  document.addEventListener("wheel",(e)=>{
    if(e.ctrlKey) return; // 줌은 무시
    // 오버레이가 열려 있으면 스크롤은 오버레이 내부용 → 네비 차단
    if(document.querySelector(".overlay-panel.on")) return;
    clearTimeout(wheelTimer);
    wheelTimer = setTimeout(()=>{
      const dx = e.deltaX, dy = e.deltaY;
      // 더 큰 축 기준으로 방향 판단
      if(Math.abs(dx) >= Math.abs(dy)){
        if(dx > 30) goTo(SC.nextURL);
        else if(dx < -30) goTo(SC.prevURL);
      } else {
        if(dy > 30) goTo(SC.nextURL);
        else if(dy < -30) goTo(SC.prevURL);
      }
    }, 50);
  },{passive:true});
}

// bfcache 복귀 시 ripple 재시작 및 blackout 제거
window.addEventListener("focus", () => {
  const img = document.querySelector(".scene-img");
  const sqF = document.getElementById("mainContent") || document.getElementById("mPhotoArea");
  if (!img || !sqF) return;
  const id = (window.THIS_SCENE||{}).id;
  img._rippleStarted = false;
  if (id === "prague") _initRipple(img, sqF);
  else if (id === "dreams") _initRippleTop(img, sqF);
});

// bfcache 복귀 시 sq 크기가 0인 경우 재계산
window.addEventListener("pageshow", (e) => {
  if (!e.persisted) return;
  // bfcache 복원 시 blackout 제거
  const bo = document.getElementById("blackout");
  if (bo) { bo.classList.remove("on"); bo.style.opacity = ""; }
  // bfcache 복원 시 overlay-panel 인라인 display:none 제거
  // (goTo()가 설정한 인라인 스타일이 Manager.open()의 .on 클래스를 덮는 문제)
  document.querySelectorAll(".overlay-panel").forEach(el => {
    el.style.display = "";
    el.style.opacity = "";
    el.style.transition = "";
    el.style.pointerEvents = "";
  });
  // bfcache 복원 시 history 가드 재등록
  history.pushState(null, "", location.href);
  const sqP = document.getElementById("mainContent") || document.getElementById("mPhotoArea");
  if (!sqP || sqP.offsetWidth > 0) return;
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const img = document.querySelector(".scene-img");
      if (!img) return;
      const id = (window.THIS_SCENE||{}).id;
      img._rippleStarted = false;
      if (id === "prague") _initRipple(img, sqP);
      else if (id === "dreams") _initRippleTop(img, sqP);
    });
  });
});

})();
// ===== 빌드 타임스탬프 배지 =====
(()=>{
  const vb=document.createElement("div");vb.id="versionBadge";
  vb.textContent=BUILD_TS;
  const s=document.createElement("style");
  s.textContent="#versionBadge{position:fixed;bottom:12px;right:12px;z-index:99999;font-family:monospace;font-size:11px;color:rgba(255,255,255,0.55);background:rgba(0,0,0,0.45);padding:4px 8px;border-radius:6px;opacity:0;pointer-events:none;transition:opacity 300ms ease;}#versionBadge.show{opacity:1;}";
  document.head.appendChild(s);
  document.body.appendChild(vb);