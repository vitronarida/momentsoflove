// ============================================================
// C01-toc.js  —  그룹 C (UI 컴포넌트)
// TOC HTML 생성 + INDEX 렌더 + TOC/INDEX 오버레이
// 의존: B01-core, B02-scenes, B03-lang
// ============================================================

var isMobile = window._isMobile; // B01-core.js에서 감지
var SC = window.THIS_SCENE;       // 씬 HTML에서 선언

// ===== TOC HTML 생성 (버전별) =====
const buildTOCHTML = () => {
  const t = LANG_TEXTS[curLang];
  if (isMobile) {
    return `
    <div id="tocOverlay" class="overlay-panel" aria-hidden="true">
      <div class="overlay-backdrop" id="tocBackdrop"></div>
      <div class="toc-panel">
        <div class="mob-unified-body">
          <div class="mob-unified-left">
            <div class="menu-section">
              <h3 class="menu-h" id="menuH_TOC">${t.menuH_TOC}</h3>
              <ul class="toc-list">
                <li class="toc-item" id="tocHome" style="cursor:pointer;"><span class="toc-bullet">●</span><span class="toc-text">intro</span></li>
                <li class="toc-item${SC.tocSection==="prologue"?" toc-current":""}" id="tocPrologue"><span class="toc-bullet">●</span><span class="toc-text">${t.prologue}</span></li>
                <li class="toc-item${SC.tocSection==="lovedream"?" toc-current":""}" id="tocLoveDream"><span class="toc-bullet">●</span><span class="toc-text">${t.lovedream.replace(/\s*\(.*?\)/g,"")}</span></li>
                <li class="toc-item${SC.tocSection==="lovesong"?" toc-current":""}" id="tocLoveSong"><span class="toc-bullet">●</span><span class="toc-text">${t.lovesong.replace(/\s*\(.*?\)/g,"")}</span></li>
                <li class="toc-item toc-locked" id="tocResonance"><span class="toc-bullet">●</span><span class="toc-text">${t.resonance.replace(/\s*\(.*?\)/g,"")}</span></li>
                <li class="toc-item toc-locked" id="tocDance"><span class="toc-bullet">●</span><span class="toc-text">${t.dance.replace(/\s*\(.*?\)/g,"")}</span></li>
                <li class="toc-item toc-locked" id="tocChorus"><span class="toc-bullet">●</span><span class="toc-text">${t.chorus.replace(/\s*\(.*?\)/g,"")}</span></li>
                <li class="toc-item${SC.tocSection==="epilogue"?" toc-current":""}" id="tocEpilogue"><span class="toc-bullet">●</span><span class="toc-text">${t.epilogue}</span></li>
              </ul>
            </div>
            <div class="menu-section">
              <h3 class="menu-h menu-h-link" id="menuH_ABOUT" tabindex="0">${t.menuH_ABOUT}</h3>
            </div>
            <div class="menu-section">
              <div class="mob-contact-icons" style="padding-left:12px;">
                <a href="mailto:vitro@narida.art" title="E-Mail">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/></svg>
                  <span class="mob-contact-icon-text">vitro@narida.art</span>
                </a>
                <a href="https://instagram.com/vitro.narida" target="_blank" rel="noopener">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg>
                  <span class="mob-contact-icon-text">vitro.narida</span>
                </a>
              </div>
            </div>
            <div class="menu-section">
              <div class="mob-copyright" style="padding-left:12px;">© Vitro Narida.<br>All rights reserved.</div>
            </div>
            <div class="menu-section">
              <h3 class="menu-h menu-h-link" id="menuH_GB" tabindex="0">${t.menuH_GB}</h3>
            </div>
            <div class="menu-section">
              <div class="mob-bottom-bar">
                <div class="lang-btn${curLang==="EN"?" active":""}" id="langEN">EN</div>
                <div class="lang-btn${curLang==="KR"?" active":""}" id="langKR">KR</div>
                <div class="mob-info-btn" id="tocInfoBtn" aria-label="Help" tabindex="0">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:18px;height:18px;"><path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.064.852l-.708 2.836a.75.75 0 0 0 1.064.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" /></svg>
                </div>
              </div>
            </div>
          </div>
          <div class="mob-unified-right">
            <div class="mob-right-header">
              <h3 class="mob-col-title">${t.indexTitle}</h3>
              <div style="display:flex;align-items:center;gap:6px;">
                <div class="mob-expand-btn" id="mobExpandBtn">
                  <svg viewBox="0 0 24 24"><path d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9m11.25-5.25v4.5m0-4.5h-4.5m4.5 0L15 9m-11.25 11.25v-4.5m0 4.5h4.5m-4.5 0L9 15m11.25 5.25v-4.5m0 4.5h-4.5m4.5 0L15 15"/></svg>
                </div>
                <div class="toc-close" id="tocClose">✕</div>
              </div>
            </div>
            <div class="mob-thumb-grid" id="mobThumbGrid"></div>
          </div>
        </div>
      </div>
    </div>
    <div id="indexOverlay" class="overlay-panel" aria-hidden="true">
      <div class="overlay-backdrop" id="indexBackdrop"></div>
      <div class="index-panel">
        <div class="toc-header" style="margin-bottom:8px;">
          <div>
            <h2 class="index-title" id="indexTitle">${t.indexTitle}</h2>
          </div>
          <div class="toc-close" id="indexClose">✕</div>
        </div>
        <div class="index-grid" id="indexGrid"></div>
      </div>
    </div>
    <div id="aboutOverlay" class="overlay-panel" aria-hidden="true" style="display:none;">
      <div class="overlay-backdrop" id="aboutBackdrop"></div>
      <div class="index-panel panel-box">
        <div class="toc-header" style="margin-bottom:8px;">
          <div>
            <h2 class="index-title" id="aboutTitle"></h2>
          </div>
          <div class="toc-close" id="aboutClose">✕</div>
        </div>
        <div class="index-grid about-mode" id="aboutGrid"></div>
      </div>
    </div>
    <div id="poemOverlay" class="overlay-panel" aria-hidden="true" style="display:none;">
      <div class="overlay-backdrop" id="poemBackdrop"></div>
      <div class="index-panel panel-box">
        <div class="toc-header" style="margin-bottom:8px;">
          <div><h2 class="index-title" id="poemTitle"></h2></div>
          <div class="toc-close" id="poemClose">✕</div>
        </div>
        <div class="poem-body" id="poemBody"></div>
      </div>
    </div>
    <div id="gbOverlay" class="overlay-panel" aria-hidden="true" style="display:none;">
      <div class="overlay-backdrop" id="gbBackdrop"></div>
      <div class="gb-panel panel-box">
        <div class="toc-header" style="margin-bottom:8px;">
          <div><h2 class="gb-title" id="gbTitle">${t.gbTitle}</h2></div>
          <div class="toc-close" id="gbClose">✕</div>
        </div>
        <div id="gbAuthArea"></div>
        <div id="gbFormArea"></div>
        <div id="gbListArea"></div>
      </div>
    </div>
    <div id="helpOverlay" class="overlay-panel" aria-hidden="true" style="display:none;">
      <div class="overlay-backdrop" id="helpBackdrop"></div>
      <div class="index-panel panel-box">
        <div class="toc-header" style="margin-bottom:8px;">
          <div><h2 class="index-title" id="helpTitle">${t.infoHelpTitle}</h2></div>
          <div class="toc-close" id="helpClose">✕</div>
        </div>
        <div class="info-section" style="padding:0 16px;">
          <div class="info-row"><kbd>← →</kbd> <span>${t.infoNav}</span></div>
          <div class="info-row"><kbd>M</kbd> <span>${t.infoMenu}</span></div>
          <div class="info-row"><kbd>H</kbd> <span>${t.infoHelp}</span></div>
          <div class="info-row"><kbd>T</kbd> <span>${t.infoT}</span></div>
          <div class="info-row"><kbd>G</kbd> <span>${t.infoG}</span></div>
          <div class="info-row"><kbd>P</kbd> <span>${t.infoP}</span></div>
        </div>
        <div class="info-version">${BUILD_TS}</div>
      </div>
    </div>
    <div id="introOverlay" class="overlay-panel" aria-hidden="true" style="display:none;">
      <div class="overlay-backdrop" id="introBackdrop"></div>
      <div class="intro-circle-wrap">
        <div class="intro-btn" id="introBtn"><span class="intro-btn-text">intro</span></div>
        <div class="intro-ring"></div>
        <div class="intro-ring"></div>
      </div>
    </div>
    <div id="thumbOverlay" class="overlay-panel" aria-hidden="true" style="display:none;">
      <div class="overlay-backdrop" id="thumbBackdrop"></div>
      <div class="index-panel panel-box">
        <div class="toc-header" style="margin-bottom:8px;">
          <div><h2 class="index-title" id="thumbTitle">${t.indexList}</h2></div>
          <div style="display:flex;align-items:center;gap:8px;">
            <div class="thumb-menu-btn" id="thumbMenuBtn" style="cursor:pointer;padding:4px;opacity:0.7;">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:20px;height:20px;"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/></svg>
            </div>
            <div class="toc-close" id="thumbClose">✕</div>
          </div>
        </div>
        <div class="index-body">
          <div class="thumb-grid" id="thumbGrid"></div>
        </div>
      </div>
    </div>`;
  } else {
    // 데스크탑
    return `
    <a href="#mainContent" class="skip-link">Skip to main content</a>
    <div id="blackout" aria-hidden="true"></div>
    <div id="tocOverlay" class="overlay-panel" aria-hidden="true">
      <div class="overlay-backdrop" id="tocBackdrop"></div>
      <div class="unified-panel panel-box" role="dialog" aria-modal="true" aria-label="Menu">
        <div class="toc-close" id="tocClose" aria-label="Close">✕</div>
        <div class="unified-left">
          <div class="toc-main">
            <div class="menu-section">
              <h3 class="menu-h" id="menuH_TOC">${t.menuH_TOC}</h3>
              <ul class="toc-list">
                <li class="toc-item" id="tocHome" style="cursor:pointer;"><span class="toc-bullet">●</span><span class="toc-text">intro</span></li>
                <li class="toc-item${SC.tocSection==="prologue"?" toc-current":""}" id="tocPrologue"><span class="toc-bullet">●</span><span class="toc-text">${t.prologue}</span></li>
                <li class="toc-item${SC.tocSection==="lovedream"?" toc-current":""}" id="tocLoveDream"><span class="toc-bullet">●</span><span class="toc-text">${t.lovedream}</span></li>
                <li class="toc-item${SC.tocSection==="lovesong"?" toc-current":""}" id="tocLoveSong"><span class="toc-bullet">●</span><span class="toc-text">${t.lovesong}</span></li>
                <li class="toc-item toc-locked" id="tocResonance"><span class="toc-bullet">●</span><span class="toc-text">${t.resonance}</span></li>
                <li class="toc-item toc-locked" id="tocDance"><span class="toc-bullet">●</span><span class="toc-text">${t.dance}</span></li>
                <li class="toc-item toc-locked" id="tocChorus"><span class="toc-bullet">●</span><span class="toc-text">${t.chorus}</span></li>
                <li class="toc-item${SC.tocSection==="epilogue"?" toc-current":""}" id="tocEpilogue"><span class="toc-bullet">●</span><span class="toc-text">${t.epilogue}</span></li>
              </ul>
            </div>
            <div class="menu-section">
              <h3 class="menu-h menu-h-link has-tooltip" id="menuH_ABOUT" tabindex="0" data-tooltip="${curLang==="KR"?"작가의 이야기":"Artist's story"}">${t.menuH_ABOUT}</h3>
            </div>
            <div class="menu-section">
              <div class="contact-icons">
                <a href="mailto:vitro@narida.art" class="contact-icon" title="E-Mail">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/></svg>
                  <span class="contact-icon-text">vitro@narida.art</span>
                </a>
                <a href="https://instagram.com/vitro.narida" target="_blank" rel="noopener noreferrer" class="contact-icon" title="Instagram">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg>
                  <span class="contact-icon-text">vitro.narida</span>
                </a>
              </div>
            </div>
            <div class="menu-section">
              <div class="menu-copyright" id="copyrightLine">© Vitro Narida.<br>All rights reserved.</div>
            </div>
            <div class="menu-section">
              <h3 class="menu-h menu-h-link has-tooltip" id="menuH_GB" tabindex="0" data-tooltip="${curLang==="KR"?"감상과 응원을 남겨주세요":"Leave your thoughts"}">${t.menuH_GB}</h3>
            </div>
          </div>
          <div class="unified-bottom-bar">
            <div class="langBtn${curLang==="EN"?" active":""}" id="langEN" role="button" tabindex="0">EN</div>
            <div class="langBtn${curLang==="KR"?" active":""}" id="langKR" role="button" tabindex="0">KR</div>
            <div class="toc-info-btn" id="tocInfoBtn" aria-label="Help" tabindex="0">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:18px;height:18px;"><path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.064.852l-.708 2.836a.75.75 0 0 0 1.064.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" /></svg>
            </div>
          </div>
        </div>
        <div class="unified-right">
          <div class="unified-right-header">
            <h2 class="index-title" id="thumbTitle">${t.indexTitle}</h2>
            <div class="thumb-expand-btn" id="thumbExpandBtn" tabindex="0" title="${curLang==="KR"?"전체 화면":"Full view"}">
              <svg class="icon-expand" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9m11.25-5.25v4.5m0-4.5h-4.5m4.5 0L15 9m-11.25 11.25v-4.5m0 4.5h4.5m-4.5 0L9 15m11.25 5.25v-4.5m0 4.5h-4.5m4.5 0L15 15"/></svg>
              <svg class="icon-collapse" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25"/></svg>
            </div>
          </div>
          <div class="unified-thumb-body">
            <div class="thumb-grid" id="thumbGrid"></div>
          </div>
        </div>
      </div>
    </div>
    <div id="indexOverlay" class="overlay-panel" aria-hidden="true">
      <div class="overlay-backdrop" id="indexBackdrop"></div>
      <div class="index-panel panel-box" role="dialog" aria-modal="true">
        <div class="index-close" id="indexClose" aria-label="Close">✕</div>
        <div class="index-header">
          <div>
            <h2 class="index-title" id="indexTitle">${t.indexTitle}</h2>
            <div class="index-sub" id="indexSub">${t.indexSub}</div>
          </div>
        </div>
        <div class="index-body">
          <div class="index-grid" id="indexGrid"></div>
        </div>
      </div>
    </div>
    <div id="aboutOverlay" class="overlay-panel" aria-hidden="true" style="display:none;">
      <div class="overlay-backdrop" id="aboutBackdrop"></div>
      <div class="index-panel panel-box">
        <div class="toc-header" style="margin-bottom:8px;">
          <div>
            <h2 class="index-title" id="aboutTitle"></h2>
          </div>
          <div class="toc-close" id="aboutClose">✕</div>
        </div>
        <div class="index-grid about-mode" id="aboutGrid"></div>
      </div>
    </div>
    <div id="poemOverlay" class="overlay-panel" aria-hidden="true" style="display:none;">
      <div class="overlay-backdrop" id="poemBackdrop"></div>
      <div class="index-panel panel-box">
        <div class="toc-header" style="margin-bottom:8px;">
          <div><h2 class="index-title" id="poemTitle"></h2></div>
          <div class="toc-close" id="poemClose">✕</div>
        </div>
        <div class="poem-body" id="poemBody"></div>
      </div>
    </div>
    <div id="gbOverlay" class="overlay-panel" aria-hidden="true" style="display:none;">
      <div class="overlay-backdrop" id="gbBackdrop"></div>
      <div class="gb-panel panel-box" role="dialog" aria-modal="true">
        <div class="gb-close" id="gbClose" aria-label="Close">✕</div>
        <h2 class="gb-title" id="gbTitle">${t.gbTitle}</h2>
        <div id="gbAuthArea"></div>
        <div id="gbFormArea"></div>
        <div id="gbListArea"></div>
      </div>
    </div>
    <div id="helpOverlay" class="overlay-panel" aria-hidden="true" style="display:none;">
      <div class="overlay-backdrop" id="helpBackdrop"></div>
      <div class="index-panel panel-box">
        <div class="toc-header" style="margin-bottom:8px;">
          <div><h2 class="index-title" id="helpTitle">${t.infoHelpTitle}</h2></div>
          <div class="toc-close" id="helpClose">✕</div>
        </div>
        <div class="info-section" style="padding:0 16px;">
          <div class="info-row"><kbd>← →</kbd> <span>${t.infoNav}</span></div>
          <div class="info-row"><kbd>M</kbd> <span>${t.infoMenu}</span></div>
          <div class="info-row"><kbd>H</kbd> <span>${t.infoHelp}</span></div>
          <div class="info-row"><kbd>T</kbd> <span>${t.infoT}</span></div>
          <div class="info-row"><kbd>G</kbd> <span>${t.infoG}</span></div>
          <div class="info-row"><kbd>P</kbd> <span>${t.infoP}</span></div>
        </div>
        <div class="info-version">${BUILD_TS}</div>
      </div>
    </div>
    <div id="introOverlay" class="overlay-panel" aria-hidden="true" style="display:none;">
      <div class="overlay-backdrop" id="introBackdrop"></div>
      <div class="intro-circle-wrap">
        <div class="intro-btn" id="introBtn"><span class="intro-btn-text">intro</span></div>
        <div class="intro-ring"></div>
        <div class="intro-ring"></div>
      </div>
    </div>
    <div id="app" role="main"></div>
    <span id="mainContent" aria-hidden="true" style="position:absolute;top:0;left:0;"></span>`;
  }
};


// ===== index → 첫 페이지: 정사각형만 흰색 전환 =====

// ===== INDEX 렌더 =====
const renderIndex = (gridId) => {
  const grid = document.getElementById(gridId || "indexGrid"); if (!grid) return;
  grid.innerHTML = "";
  const codeToFile = {}, codeToTitle = {};
  SCENES_ALL.forEach(sc => {
    if (sc.code) { codeToFile[sc.code]=sc.file; codeToTitle[sc.code]=curLang==="KR"?sc.kr:sc.en; }
  });
  INDEX_ROWS.forEach(row => {
    if (row.type==="head") {
      const h=document.createElement("div"); h.className="idx-head"; h.textContent=row.label;
      grid.appendChild(h); return;
    }
    const code=row.code, has=!!codeToFile[code];
    const tile=document.createElement("div");
    tile.className="idx-tile"+(has?" idx-clickable":" idx-missing");
    tile.textContent=code;
    if (code===SC.code) tile.classList.add("idx-current");
    if (has) {
      const h=(e)=>{e.preventDefault();e.stopPropagation();goTo("./"+codeToFile[code]+".html");};
      tile.addEventListener("click",h);
      tile.addEventListener("touchend",(e)=>{e.preventDefault();h(e);});
    }
    grid.appendChild(tile);
  });
};


// ===== TOC/INDEX 오버레이 =====
const scrollToCurrent = (container, selector) => {
  setTimeout(() => {
    const el = container?.querySelector(selector);
    if (el) el.scrollIntoView({ block:"center", behavior:"smooth" });
  }, 120);
};
const TOCManager = {
  open: () => {
    history.pushState({overlay:"toc"}, "");
    const ov=document.getElementById("tocOverlay");
    ov.classList.add("on"); ov.setAttribute("aria-hidden","false");
    if (isMobile) {
      const grid = document.getElementById("mobThumbGrid");
      if (grid) { currentHearts = getHeartsCache(); buildThumbGrid(grid, currentHearts); }
      scrollToCurrent(document.querySelector(".mob-unified-right"), ".thumb-current");
    }
    else {
      renderThumbnails();
      scrollToCurrent(document.querySelector(".unified-right"), ".thumb-current");
    }
  },
  close: () => {
    const ov=document.getElementById("tocOverlay");
    ov.classList.remove("on"); ov.setAttribute("aria-hidden","true");
    document.querySelector(".unified-panel")?.classList.remove("expanded");
  }
};
const IndexManager = {
  open: () => {
    history.pushState({overlay:"index"}, "");
    TOCManager.close();
    renderIndex();
    const ov=document.getElementById("indexOverlay");
    if(ov){ ov.style.display="flex"; }
    ov.classList.add("on"); ov.setAttribute("aria-hidden","false");
    scrollToCurrent(document.getElementById("indexGrid"), ".idx-current");
  },
  close: () => {
    const ov=document.getElementById("indexOverlay");
    ov.classList.remove("on"); ov.setAttribute("aria-hidden","true");
    const grid=document.getElementById("indexGrid");
    grid?.classList.remove("about-mode");
    setTimeout(()=>{
      if(ov) ov.style.display="none";
      if(grid){ grid.innerHTML = ""; }
    }, 420);
  }
};

const AboutManager = {
  open: () => {
    history.pushState({overlay:"about"}, "");
    if (isMobile) TOCManager.close();
    const t = LANG_TEXTS[curLang] || LANG_TEXTS.KR;
    const ov = document.getElementById("aboutOverlay");
    const titleEl = document.getElementById("aboutTitle");
    const grid = document.getElementById("aboutGrid");
    if (!ov || !titleEl || !grid) return;

    titleEl.textContent = t.aboutTitle || t.menuH_ABOUT || "";

    const parts = String(t.aboutBody||"").trim().split(/\n\s*\n/);
    const brTag = isMobile ? "<br><br>" : "<br>";
    const bodyHTML = parts.map(p => `<p>${p.replace(/\n/g,brTag)}</p>`).join("");
    grid.innerHTML = `<div class="about-body">${bodyHTML}</div>`;

    ov.style.display="flex";
    ov.classList.add("on");
    ov.setAttribute("aria-hidden","false");
  },
  close: () => {
    const ov = document.getElementById("aboutOverlay");
    if (!ov) return;
    ov.classList.remove("on");
    ov.setAttribute("aria-hidden","true");
    setTimeout(() => {
      ov.style.display = "none";
    }, 420);
  }
};

const HelpManager = {
  open: () => {
    history.pushState({overlay:"help"}, "");
    const ov = document.getElementById("helpOverlay");
    if (!ov) return;
    ov.style.display = "flex";
    ov.classList.add("on");
    ov.setAttribute("aria-hidden","false");
  },
  close: () => {
    const ov = document.getElementById("helpOverlay");
    if (!ov) return;
    ov.classList.remove("on");
    ov.setAttribute("aria-hidden","true");
    setTimeout(() => { ov.style.display = "none"; }, 420);
  }
};

const IntroManager = {
  open: () => {
    history.pushState({overlay:"intro"}, "");
    const ov = document.getElementById("introOverlay");
    if (!ov) return;
    ov.style.display = "flex";
    requestAnimationFrame(() => requestAnimationFrame(() => {
      ov.classList.add("on");
      ov.setAttribute("aria-hidden","false");
    }));
  },
  close: () => {
    const ov = document.getElementById("introOverlay");
    if (!ov) return;
    ov.classList.remove("on");
    ov.setAttribute("aria-hidden","true");
    setTimeout(() => { ov.style.display = "none"; }, 420);
  }
};

// window 노출
window.TOCManager = TOCManager;
window.IndexManager = IndexManager;
window.AboutManager = AboutManager;
window.HelpManager = HelpManager;
