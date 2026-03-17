// ============================================================
// E01-render.js  —  그룹 E (렌더링)
// 모바일/데스크탑 렌더링 + ripple + 공통 이벤트 + 타임스탬프
// 의존: B01-core, B02-scenes, B03-lang, C01~C04, D01-effects
// ============================================================

(function(){

// window에서 공유 변수 참조
var TOCManager       = window.TOCManager;
var IndexManager     = window.IndexManager;
var AboutManager     = window.AboutManager;
var HelpManager      = window.HelpManager;
var SceneListManager = window.SceneListManager;
var ThumbnailManager = window.ThumbnailManager;
var GuestbookManager = window.GuestbookManager;
var curLang          = window.curLang;
var setLang          = window.setLang;
var bindCommon       = window.bindCommon;
var goTo             = window.goTo;
var openPoemFromList = window.openPoemFromList;

// ===== 모바일 렌더링 =====
// =========================================
if (isMobile) {
  const app = document.getElementById("app");

  // 사진 영역
  const photoArea = document.createElement("div");
  photoArea.className = "photo-area";
  photoArea.id = "mPhotoArea";

  const textEl = document.createElement("div");
  textEl.id = "mSceneText";
  textEl.className = SC.type==="rest" ? "scene-text rest-text" : "scene-text";
  if (SC.id === "RST_05") textEl.classList.add("rest-note");
  textEl.textContent = curLang==="KR" ? SC.textKR : SC.textEN;

  if (SC.type === "rest") {
    photoArea.style.cssText += ";background:linear-gradient(to bottom,#0a0801 0%,#1a150a 100%) !important;aspect-ratio:unset;flex:1;overflow:visible !important;";
    document.body.classList.add('rst-active');
    var mIconWrap = document.createElement("div");
    mIconWrap.className = "rest-icon-wrap";
    mIconWrap.style.cssText = "position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:160px;height:160px;display:grid;place-items:center;cursor:pointer;z-index:5;";
    mIconWrap.innerHTML = '<div class="moon-glow2"></div><div class="moon-glow1"></div><div class="moon-ring"></div><div class="moon-ring r2"></div><div class="moon-core"></div>';
    if(SC.nextURL) mIconWrap.addEventListener("click",()=>goTo(SC.nextURL));
    photoArea.appendChild(mIconWrap);
      // ── RST 반딧불 (모바일) ──────────────────────
      var mFly=document.createElement('div'); mFly.id='rst-fly';
      photoArea.appendChild(mFly);
      // fly 시작은 DOM 삽입 후 (app.append 이후 rAF×2)
      // ─────────────────────────────────────────────
    // rest 씬에서는 텍스트 숨김 (표시 안 함)
  } else {
    const img = document.createElement("img");
    img.className="scene-img"; img.id="mSceneImg"; img.alt=SC.code||"";
    img.src = SC.imgSrc;

    // 안개 오버레이 (fog 타입)
    var mFogEl=null;
    photoArea.appendChild(img);
    if(SC.type==="fog"){
      var fogAtmo=document.createElement("div"); fogAtmo.className="fog-atmo";
      var fogAtmo2=document.createElement("div"); fogAtmo2.className="fog-atmo2";
      var fogTint=document.createElement("div"); fogTint.className="fog-tint-m";
      mFogEl=document.createElement("div"); mFogEl.className="fog-overlay-m"; mFogEl.id="fogNoiseM";
      _makeNoiseBg(mFogEl);
      photoArea.appendChild(fogAtmo);
      photoArea.appendChild(fogAtmo2);
      photoArea.appendChild(fogTint);
      photoArea.appendChild(mFogEl);
    }

    const onLoad = () => {
      img.classList.add("show");
      setTimeout(()=>textEl.classList.add("show"), 400);

      // 안개 시작 (HQ 로딩 후 딜레이)
      if(SC.type==="fog"&&mFogEl&&FogFX){
        FogFX.bind(mFogEl);
        setTimeout(()=>{
          mFogEl.style.opacity="0";
          requestAnimationFrame(()=>{void mFogEl.offsetHeight; mFogEl.style.opacity=""; mFogEl.classList.add("animated"); FogFX.start();});
        },1500);
      }

      // 리플 초기화 (prague/dreams)
      if(SC.id==="prague"||SC.id==="dreams"){
        setTimeout(()=>{
          if(img._rippleStarted)return;
          img._rippleStarted=true;
          if(SC.id==="prague") _initRipple(img, photoArea);
          else _initRippleTop(img, photoArea);
        },300);
      }
    };
    const onError = () => {
      img.style.display = "none";
      const errMsg = document.createElement("div");
      errMsg.className = "img-error-msg";
      errMsg.textContent = curLang === "KR" ? "이미지를 불러올 수 없어요" : "Image unavailable";
      photoArea.appendChild(errMsg);
      setTimeout(() => textEl.classList.add("show"), 400);
    };
    if(img.complete&&img.naturalWidth>0){onLoad();}
    else{
      img.addEventListener("load",onLoad,{once:true});
      img.addEventListener("error",onError,{once:true});
      const poll=setInterval(()=>{if(img.naturalWidth>0){clearInterval(poll);onLoad();}},16);
      img.addEventListener("load",()=>clearInterval(poll),{once:true});
    }
  }

  // 컨트롤 영역
  const ctrlArea = document.createElement("div");
  ctrlArea.className = "control-area";

  const codeEl = document.createElement("div");
  codeEl.className = "work-code";
  codeEl.textContent = SC.code ? `Op. ${SC.code}` : "";
  if (SC.code) { codeEl.style.cursor="pointer"; codeEl.addEventListener("click", ThumbnailManager.open); }

  // 네비바
  const navBar = document.createElement("div"); navBar.className = "nav-bar";

  const leftBtn = document.createElement("div");
  if (!SC.prevURL && SC.pageNum===1) {
    leftBtn.className = "nav-btn";
    leftBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:26px;height:26px;"><path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" /></svg>`;
    leftBtn.addEventListener("click",(e)=>{e.preventDefault();e.stopPropagation();AboutManager.open();});
  } else {
    leftBtn.className = "nav-btn" + (SC.prevURL ? "" : " disabled");
    leftBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:26px;height:26px;"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" /></svg>`;
    if (SC.prevURL) leftBtn.addEventListener("click", ()=>goTo(SC.prevURL));
  }
const menuBtn = document.createElement("div"); menuBtn.className = "nav-btn";
  menuBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:26px;height:26px;"><path stroke-linecap="round" stroke-linejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" /></svg>`;
  menuBtn.addEventListener("click", TOCManager.open);

  const indexBtn = document.createElement("div"); indexBtn.className = "nav-btn";
  indexBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:26px;height:26px;"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"/></svg>`;

  /* 모바일 시 fetch + PoemManager */
  const _mPoemCode = (SC.code || "").replace(/#/g,"_");
  const _mPoemFile = curLang==="EN" ? `../poems/${_mPoemCode}_EN.txt` : `../poems/${_mPoemCode}.txt`;
  let _mPoemText = null;
  if(_mPoemCode){
    fetch(_mPoemFile).then(r=>{
      if(!r.ok) throw new Error("not found");
      return r.text();
    }).then(txt=>{
      _mPoemText=txt;
      indexBtn.setAttribute("data-tip", curLang==="KR" ? "사진 너머의 속삭임" : "A whisper beyond the frame");
    }).catch(()=>{
      _mPoemText=null;
      indexBtn.setAttribute("data-tip", curLang==="KR" ? "아직 피지 않은 이야기" : "A story yet to bloom");
    });
  }
  const mPoemManager = {
    open(){
      if(!_mPoemText) return;
      const ov=document.getElementById("poemOverlay");
      if(!ov) return;
      document.getElementById("poemTitle").textContent = curLang==="KR" ? SC.textKR : SC.textEN;
      const pb=document.getElementById("poemBody");
      pb.style.cssText="font-family:'Nanum Pen Script',cursive;font-size:clamp(22px,3vw,28px);line-height:0.8;color:rgba(235,235,235,0.90);white-space:pre-wrap;word-break:keep-all;padding:0 16px;margin-top:32px;";
      pb.textContent = _mPoemText.replace(/\r\n/g,"\n").replace(/\r/g,"\n");
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
  document.getElementById("poemClose")?.addEventListener("click",mPoemManager.close);
  document.getElementById("poemBackdrop")?.addEventListener("click",mPoemManager.close);
  indexBtn.addEventListener("click", ()=>{ SceneListManager.open(); });

  const rightBtn = document.createElement("div");
  rightBtn.className = "nav-btn" + (SC.nextURL ? "" : " disabled");
  rightBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:26px;height:26px;"><path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>`;
  if (SC.nextURL) rightBtn.addEventListener("click", ()=>goTo(SC.nextURL));

  navBar.append(leftBtn, menuBtn, indexBtn, rightBtn);

  const counter = document.createElement("div");
  counter.className = "page-counter";
  counter.textContent = `P.${SC.pageNum} / ${SC.totalPages}`;

  ctrlArea.append(codeEl, textEl, navBar, counter);

  // index에서 온 경우: 정사각형만 흰색 → 서서히 투명
  if (fromIndex) {
    const wo = document.createElement("div");
    wo.style.cssText = "position:absolute;inset:0;z-index:50;background:#fff;pointer-events:none;transition:opacity 4000ms ease;";
    photoArea.appendChild(wo);
    setTimeout(() => { wo.style.opacity = "0"; }, 400);
    setTimeout(() => wo.remove(), 5000);
  }

  app.append(photoArea, ctrlArea);

  // RST 모바일 반딧불 시작 (flex 레이아웃 완료 후 500ms)
  if(SC.type==="rest") setTimeout(function(){
    if(window.rstStartFlyMobile) window.rstStartFlyMobile(photoArea);
  }, 500);

  // 스와이프
  let tx=null, ty=0;
  photoArea.addEventListener("touchstart",(e)=>{
    if(e.touches.length>1){tx=null;return;}
    tx=e.touches[0].clientX;ty=e.touches[0].clientY;
  },{passive:true});
  photoArea.addEventListener("touchend",(e)=>{
    if(tx===null||e.changedTouches.length>1)return;
    const dx=e.changedTouches[0].clientX-tx, dy=e.changedTouches[0].clientY-ty;
    if(Math.abs(dx)>Math.abs(dy)&&Math.abs(dx)>50){
      if(dx<0&&SC.nextURL) goTo(SC.nextURL);
      else if(dx>0&&SC.prevURL) goTo(SC.prevURL);
    }
  },{passive:true});

  // 키보드
  document.addEventListener("keydown",(e)=>{
    const menuOn=document.getElementById("tocOverlay").classList.contains("on");
    const indexOn=document.getElementById("indexOverlay").classList.contains("on");
    const aboutOn=document.getElementById("aboutOverlay")?.classList.contains("on");
    const poemOn=document.getElementById("poemOverlay")?.classList.contains("on");
    const gbOn=document.getElementById("gbOverlay")?.classList.contains("on");
    const thumbOn=document.getElementById("thumbOverlay")?.classList.contains("on");
    const helpOn=document.getElementById("helpOverlay")?.classList.contains("on");
    const introOn=document.getElementById("introOverlay")?.classList.contains("on");
    const slstOn=document.getElementById("sceneListOverlay")?.classList.contains("on");
    if(e.key==="Escape"){if(introOn)IntroManager.close();else if(helpOn)HelpManager.close();else if(slstOn)SceneListManager.close();else if(poemOn)mPoemManager.close();else if(thumbOn)ThumbnailManager.close();else if(gbOn)GuestbookManager.close();else if(aboutOn)AboutManager.close();else if(indexOn)IndexManager.close();else if(menuOn)TOCManager.close();return;}
    if(e.key==="m"||e.key==="M"){e.preventDefault();menuOn?TOCManager.close():TOCManager.open();return;}
    if(menuOn||indexOn||aboutOn||poemOn||gbOn||thumbOn||helpOn||introOn||slstOn)return;
    if(e.key==="ArrowRight"||e.key==="ArrowDown"||e.key==="Enter"){e.preventDefault();goTo(SC.nextURL);}
    else if(e.key==="ArrowLeft"||e.key==="ArrowUp"){e.preventDefault();goTo(SC.prevURL);}
  });

// =========================================
// ===== 데스크탑 렌더링 =====
// =========================================
} else {
  const CSSV={get:(p)=>parseInt(getComputedStyle(document.documentElement).getPropertyValue(p))||0};
  const TIMING={
    SCENE_TEXT:()=>CSSV.get('--scene-text-delay'),
    FOG_MIN_LQIP:()=>CSSV.get('--fog-min-lqip'),
    FOG_TEXT:()=>CSSV.get('--fog-text-delay'),
    FOG_HQ:()=>CSSV.get('--fog-hq-fade'),
    MENU_OUT:()=>CSSV.get('--menu-fade-out')
  };

  const app=document.getElementById("app");
  const frame=document.createElement("section");
  frame.className="screen visible scene"; frame.id=SC.id+"Screen";
  const wrap=document.createElement("div"); wrap.className="scene-wrap";
  const sq=document.createElement("div"); sq.className="square-frame"; sq.id="mainContent";

  const workCode=document.createElement("div");
  workCode.className="work-code"; workCode.setAttribute("tabindex","0");
  workCode.innerHTML=SC.code
    ?`Op. ${SC.code}<span class="page-num">&nbsp; P.${SC.pageNum}/${SC.totalPages}</span>`
    :`<span class="page-num">P.${SC.pageNum}/${SC.totalPages}</span>`;
  workCode.setAttribute("data-tip", curLang==="KR" ? "사랑의 순간" : "Moment of Love");

  const menuBtn=document.createElement("div");
  menuBtn.className="nav-menu nav-btn";
  menuBtn.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:28px;height:28px;"><path stroke-linecap="round" stroke-linejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" /></svg>`;
  menuBtn.setAttribute("data-tip", curLang==="KR" ? "메뉴" : "Menu");

  const uiBtn=document.createElement("div");
  uiBtn.className="soloToggle nav-btn";

  sq.append(workCode,menuBtn,uiBtn);

  if(SC.type==="fog"){
    const hero=document.createElement("section"); hero.className="hero"; hero.id="hero";
    const lqip=document.createElement("img"); lqip.className="bg fog-lqip"; lqip.src="../assets/LPL_01_lqip.webp"; lqip.alt=""; lqip.setAttribute("aria-hidden","true");
    const hq=document.createElement("img"); hq.className="bg fog-hq"; hq.id="fogHq"; hq.alt="";
    const ov=document.createElement("div"); ov.className="overlay";
    const fogAtmo=document.createElement("div"); fogAtmo.className="fog-atmo";
    const fogAtmo2=document.createElement("div"); fogAtmo2.className="fog-atmo2";
    const fog=document.createElement("div"); fog.className="fog"; fog.id="fogNoise"; fog.setAttribute("aria-hidden","true");
    _makeNoiseBg(fog);
    const txt=document.createElement("div"); txt.className="fog-text long-text"; txt.id="fogText";
    txt.textContent=curLang==="KR"?SC.textKR:SC.textEN;
    hero.append(lqip,hq,ov,fogAtmo,fogAtmo2,fog,txt); sq.appendChild(hero);
  } else if(SC.type==="img"){
    const img=document.createElement("img"); img.className="scene-img"; img.id=SC.id+"Img"; img.alt=SC.code||""; img.src=SC.imgSrc;
    img.addEventListener("error",()=>{
      img.style.display="none";
      const errMsg=document.createElement("div");
      errMsg.className="img-error-msg";
      errMsg.textContent=curLang==="KR"?"이미지를 불러올 수 없어요":"Image unavailable";
      sq.appendChild(errMsg);
    },{once:true});
    const txt=document.createElement("div"); txt.className="scene-text long-text"; txt.id=SC.id+"Text";
    txt.textContent=curLang==="KR"?SC.textKR:SC.textEN;
    sq.append(img,txt);
  } else {
    const txt=document.createElement("div"); txt.className="scene-text long-text"; txt.id=SC.id+"Text";
    if (SC.id === "RST_05") txt.classList.add("rest-note");
    txt.textContent=curLang==="KR"?SC.textKR:SC.textEN;
    sq.appendChild(txt);
    if(SC.type==="rest"){
      sq.classList.add("rest-sq");
      sq.style.background="transparent";
      wrap.style.background="transparent";
      frame.style.background="transparent";
      // 파도를 square-frame 안 첫번째 자식으로 삽입

      const iconWrap=document.createElement("div");
      iconWrap.className="rest-icon-wrap";
      iconWrap.innerHTML='<div class="moon-glow2"></div><div class="moon-glow1"></div><div class="moon-ring"></div><div class="moon-ring r2"></div><div class="moon-core"></div>';
      sq.appendChild(iconWrap);
      // ── RST 중앙 네비 버튼 ──────────────────────────
      const rstLBtn=document.createElement("div");
      rstLBtn.className="rst-nav-btn rst-nav-left";
      rstLBtn.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:26px;height:26px;"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5"/></svg>`;
      if(SC.prevURL) rstLBtn.addEventListener("click",()=>goTo(SC.prevURL));
      else rstLBtn.classList.add("disabled");
      sq.appendChild(rstLBtn);
      const rstRBtn=document.createElement("div");
      rstRBtn.className="rst-nav-btn rst-nav-right";
      rstRBtn.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:26px;height:26px;"><path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"/></svg>`;
      if(SC.nextURL) rstRBtn.addEventListener("click",()=>goTo(SC.nextURL));
      else rstRBtn.classList.add("disabled");
      sq.appendChild(rstRBtn);
      // ── RST 반딧불 div ───────────────────────────────
      var dFly=document.createElement('div'); dFly.id='rst-fly';
      sq.appendChild(dFly);
      // ────────────────────────────────────────────────
    }
  }

  const makeArrow=(dir,url)=>{
    const btn=document.createElement("div");
    btn.className=`nav-arrow nav-btn nav-${dir}`;
    btn.setAttribute("data-tip",
      curLang==="KR"
        ? (url ? (dir==="left" ? "이전" : "다음") : (dir==="left" ? "이전 없음" : "다음 없음"))
        : (url ? (dir==="left" ? "Previous" : "Next") : (dir==="left" ? "No previous" : "No next"))
    );
    if(!url){
      // 첫 작품(이전 없음)에서는 좌측 버튼을 '작품 소개'로 사용
      if(dir==="left" && SC.pageNum===1){
        btn.setAttribute("data-tip", curLang==="KR" ? "작가의 말" : "About");
        btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:28px;height:28px;"><path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" /></svg>`;
        btn.addEventListener("click",(e)=>{e.preventDefault();e.stopPropagation();AboutManager.open();});
        btn.addEventListener("touchend",(e)=>{e.preventDefault();AboutManager.open();});
        btn.addEventListener("keydown",(e)=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();AboutManager.open();}});
        return btn;
      }
      btn.classList.add("disabled");
      btn.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:28px;height:28px;"><path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/><path stroke-linecap="round" stroke-linejoin="round" d="M9 9.563C9 9.252 9.252 9 9.563 9h4.874c.311 0 .563.252.563.563v4.874c0 .311-.252.563-.563.563H9.564A.562.562 0 0 1 9 14.437V9.564Z"/></svg>`;
    } else {
      btn.innerHTML=dir==="left"
        ?`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:28px;height:28px;"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5"/></svg>`
        :`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:28px;height:28px;"><path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"/></svg>`;
      btn.addEventListener("click",()=>goTo(url));
      btn.addEventListener("touchend",(e)=>{e.preventDefault();goTo(url);});
      btn.addEventListener("keydown",(e)=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();goTo(url);}});
    }
    return btn;
  };
  sq.append(makeArrow("left",SC.prevURL),makeArrow("right",SC.nextURL));
  // ── RST 씬: 마우스 이동 시 버튼 표시 + 반딧불 시작 ──
  if(SC.type==="rest"){
    var rstNavTimer;
    document.addEventListener('mousemove', function(){
      document.body.classList.add('rst-nav-peek');
      clearTimeout(rstNavTimer);
      rstNavTimer=setTimeout(function(){document.body.classList.remove('rst-nav-peek');},2000);
    });
    requestAnimationFrame(function(){requestAnimationFrame(function(){
      if(window.rstStartFlyDesktop) window.rstStartFlyDesktop(sq);
    });});
  }

  // index에서 온 경우: 정사각형만 흰색 → 서서히 투명
  if (fromIndex) {
    const wo = document.createElement("div");
    wo.style.cssText = "position:absolute;inset:0;z-index:50;background:#fff;pointer-events:none;transition:opacity 4000ms ease;";
    sq.appendChild(wo);
    setTimeout(() => { wo.style.opacity = "0"; }, 400);
    setTimeout(() => wo.remove(), 5000);
  }

  wrap.appendChild(sq); frame.appendChild(wrap); app.appendChild(frame);


  if(SC.type==="fog"){
    document.addEventListener("keydown",(e)=>{
      if(e.key==="ArrowRight"||e.key==="ArrowDown"){e.preventDefault();goTo(SC.nextURL);}
    });
    const hero=document.getElementById("hero"),hqEl=document.getElementById("fogHq"),fogNoise=document.getElementById("fogNoise");
    FogFX.bind(fogNoise);
    hqEl.src=SC.imgSrc+"?t="+Date.now();
    let started=false;
    const begin=()=>{
      if(started)return;started=true;
      setTimeout(()=>{
        hero.classList.add("hq-show");
        setTimeout(()=>hero.classList.add("lqip-hide"),TIMING.FOG_HQ());
        setTimeout(()=>hero.classList.add("show-text"),TIMING.FOG_TEXT());
        setTimeout(()=>frame.classList.add("nav-ready"),TIMING.FOG_TEXT()+50);
        // 안개: HQ 이미지 페이드인 완료 후 시작
        setTimeout(()=>{
          fogNoise.style.opacity="0";
          requestAnimationFrame(()=>{void fogNoise.offsetHeight; fogNoise.style.opacity=""; fogNoise.classList.add("animated"); FogFX.start();});
        },TIMING.FOG_HQ()+500);
      },TIMING.FOG_MIN_LQIP());
    };
    hqEl.addEventListener("load",begin,{once:true});
    if(hqEl.complete&&hqEl.naturalWidth>0)begin();
  } else if(SC.type==="img"){
    const imgEl=document.getElementById(SC.id+"Img");
    let _began=false;
    const begin=()=>{if(_began)return;_began=true;requestAnimationFrame(()=>{requestAnimationFrame(()=>{frame.classList.add("hq-show");setTimeout(()=>frame.classList.add("show-text"),TIMING.SCENE_TEXT());setTimeout(()=>frame.classList.add("nav-ready"),TIMING.SCENE_TEXT()+50);});});};
    if(imgEl.complete&&imgEl.naturalWidth>0){begin();}
    else{
      imgEl.addEventListener("load",begin,{once:true});
      const poll=setInterval(()=>{if(imgEl.naturalWidth>0){clearInterval(poll);begin();}},16);
      imgEl.addEventListener("load",()=>clearInterval(poll),{once:true});
    }
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

// ── RST 반딧불 ────────────────────────────────────────────
(function(){
  var RST_FLY_RUNNING=false, RST_FLY_PARAMS={};
  var RST_FLY_DURATION=18000, RST_FLY_PAUSE=800;
  var RST_FLY_BP={inhale:3.2,exhale:3.2,gap:0};
  function rstRandomizePath(){
    RST_FLY_PARAMS={freq:0.8+Math.random()*2.0,amp:0.06+Math.random()*0.09,
      phase:Math.random()*Math.PI*2,yBase:0.5,pFreq:2.5+Math.random()*3.5};
  }
  function rstFlyPath(t){
    var p=RST_FLY_PARAMS;
    return{x:t,y:p.yBase+Math.sin(t*Math.PI*p.freq+p.phase)*p.amp,
      size:0.6+0.55*Math.abs(Math.sin(t*Math.PI*p.pFreq)),
      opacity:0.5+0.45*Math.abs(Math.sin(t*Math.PI*p.pFreq))};
  }
  function rstDoBreathe(btn,onDone){
    // CSS keyframe(rstBreatheGlow)이 3회 in→out 전체를 처리 (6.4s × 3 = 19.2s)
    btn.classList.remove('rst-breathe');
    void btn.offsetWidth; // reflow로 애니메이션 재시작
    btn.classList.add('rst-breathe');
    var dur = 6.4 * 3 * 1000;
    var mouseStop = function(){ /* 마우스 진입 시 무시 — 애니메이션이 자연스럽게 완료 */ };
    btn.addEventListener('mouseenter', mouseStop, {once:true});
    btn.addEventListener('touchstart', mouseStop, {once:true, passive:true});
    setTimeout(function(){
      btn.classList.remove('rst-breathe');
      if(onDone) onDone();
    }, dur);
  }
  window.rstStartFlyDesktop=function(sq){
    if(RST_FLY_RUNNING)return;
    RST_FLY_RUNNING=true; rstRandomizePath();
    var fly=document.getElementById('rst-fly');
    var lBtn=sq.querySelector('.rst-nav-left'),rBtn=sq.querySelector('.rst-nav-right');
    if(!fly||!lBtn||!rBtn){RST_FLY_RUNNING=false;return;}
    function launch(){
      var sqR=sq.getBoundingClientRect();
      var lr=lBtn.getBoundingClientRect(),rr=rBtn.getBoundingClientRect();
      var lX=lr.left-sqR.left+lr.width/2, lY=lr.top-sqR.top+lr.height/2;
      var rX=rr.left-sqR.left+rr.width/2, rY=rr.top-sqR.top+rr.height/2;
      var H=sqR.height, travelX=rX-lX;
      RST_FLY_PARAMS.yBase=lY/H;
      var alignStartX=rX-travelX*0.25, fadeStartX=rX-54;
      var start=null,triggered=false;
      function frame(ts){
        if(!document.getElementById('rst-fly')){RST_FLY_RUNNING=false;return;}
        if(!start)start=ts;
        var t=Math.min((ts-start)/RST_FLY_DURATION,1),fp=rstFlyPath(t);
        var curX=lX+fp.x*travelX,curY=fp.y*H;
        if(curX>=alignStartX){
          var ar=Math.min(1,(curX-alignStartX)/(rX-alignStartX));
          var ease=ar<0.5?2*ar*ar:1-Math.pow(-2*ar+2,2)/2;
          curY=curY+(rY-curY)*ease;
        }
        var op=fp.opacity;
        if(curX>=fadeStartX)op*=Math.max(0,1-(curX-fadeStartX)/(rX-fadeStartX));
        var sz=11*fp.size, sh=sz*0.45, glow=sz*1.5;
        fly.style.left=(curX-sz/2)+'px'; fly.style.top=(curY-sh/2)+'px';
        fly.style.width=sz+'px'; fly.style.height=sh+'px'; fly.style.opacity=op;
        fly.style.borderRadius='50%';
        fly.style.background='radial-gradient(ellipse at center,rgba(255,252,165,1) 10%,rgba(212,175,55,0.5) 50%,transparent 80%)';
        fly.style.boxShadow='0 0 '+glow+'px '+(glow*0.3)+'px rgba(212,175,55,0.45),0 0 '+(glow*2)+'px '+(glow*0.6)+'px rgba(212,175,55,0.15)';
        if(!triggered&&curX>=rX-40){
          triggered=true;fly.style.opacity=0;
          setTimeout(function(){
            rstDoBreathe(rBtn,function(){
              rBtn.classList.remove('rst-breathe-in','rst-breathe-out');
              rstRandomizePath();setTimeout(launch,RST_FLY_PAUSE);
            });
          }, 1000);
          return;
        }
        if(t<1)requestAnimationFrame(frame);
        else{fly.style.opacity=0;rstRandomizePath();setTimeout(launch,RST_FLY_PAUSE);}
      }
      requestAnimationFrame(frame);
    }
    setTimeout(launch,1200);
  };
  window.rstStartFlyMobile=function(sq){
    if(RST_FLY_RUNNING)return;
    RST_FLY_RUNNING=true;
    // 모바일용 경로: yBase를 중앙(0.5) 고정, 진폭만 랜덤
    function mRandomize(){
      RST_FLY_PARAMS={freq:0.8+Math.random()*1.5,amp:0.10+Math.random()*0.15,
        phase:Math.random()*Math.PI*2,yBase:0.5,pFreq:2.5+Math.random()*3.5};
    }
    mRandomize();
    var fly=document.getElementById('rst-fly');
    if(!fly){RST_FLY_RUNNING=false;return;}
    function launch(){
      var W = window.innerWidth;
      var H = window.innerHeight;
      // photoArea의 실제 위치 보정
      var pa = document.getElementById('mPhotoArea');
      var offsetTop = pa ? pa.getBoundingClientRect().top : 0;
      var areaH = pa ? (pa.getBoundingClientRect().height || H * 0.55) : H * 0.55;
      var start=null;
      function frame(ts){
        if(!document.getElementById('rst-fly')){RST_FLY_RUNNING=false;return;}
        if(!start)start=ts;
        var t=Math.min((ts-start)/RST_FLY_DURATION,1);
        var p=RST_FLY_PARAMS;
        var x=t, y=p.yBase+Math.sin(t*Math.PI*p.freq+p.phase)*p.amp;
        var size=0.6+0.55*Math.abs(Math.sin(t*Math.PI*p.pFreq));
        var op=0.5+0.45*Math.abs(Math.sin(t*Math.PI*p.pFreq));
        var sz=10*size, sh=sz*0.45, glow=sz*1.5;
        var flyX = x * W - sz/2;
        var flyY = offsetTop + y * areaH - sh/2;
        fly.style.position='fixed';
        fly.style.left=flyX+'px'; fly.style.top=flyY+'px';
        fly.style.width=sz+'px'; fly.style.height=sh+'px'; fly.style.opacity=op;
        fly.style.borderRadius='50%';
        fly.style.background='radial-gradient(ellipse at center,rgba(255,252,165,1) 10%,rgba(212,175,55,0.5) 50%,transparent 80%)';
        fly.style.boxShadow='0 0 '+glow+'px '+(glow*0.3)+'px rgba(212,175,55,0.45),0 0 '+(glow*2)+'px '+(glow*0.6)+'px rgba(212,175,55,0.15)';
        if(t<1)requestAnimationFrame(frame);
        else{fly.style.opacity=0;mRandomize();setTimeout(launch,RST_FLY_PAUSE);}
      }
      requestAnimationFrame(frame);
    }
    setTimeout(launch,1200);
  };
  window.rstStopFly=function(){
    RST_FLY_RUNNING=false;
    var f=document.getElementById('rst-fly');if(f)f.remove();
  };
})();
// ─────────────────────────────────────────────────────────

})();
// ===== 빌드 타임스탬프 배지 =====
(()=>{
  const vb=document.createElement("div");vb.id="versionBadge";
  vb.textContent=BUILD_TS;
  const s=document.createElement("style");
  s.textContent="#versionBadge{position:fixed;bottom:12px;right:12px;z-index:99999;font-family:monospace;font-size:11px;color:rgba(255,255,255,0.55);background:rgba(0,0,0,0.45);padding:4px 8px;border-radius:6px;opacity:0;pointer-events:none;transition:opacity 300ms ease;}#versionBadge.show{opacity:1;}";
  document.head.appendChild(s);
  document.body.appendChild(vb);
})();