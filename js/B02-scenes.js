// ============================================================
// B02-scenes.js  —  그룹 B (기반)
// 씬 리스트 배열 + 공통 상수
// 의존: B01-core.js
// ============================================================

// ===== 공통 데이터 =====
const SCENES_ALL = [
  {id:"fog",      code:"LPL#01",kr:"안개가 휘감은 세상에",                      en:"In a world wrapped in fog",                               file:"LPL_01"},
  {id:"LPL_02",   code:"LPL#02",kr:"당신의 온기가 스며들면",                    en:"When your warmth seeps in",  file:"LPL_02"},
  {id:"LPL_03",   code:"LPL#03",kr:"세상은 본연의 모습을 되찾고",               en:"The world regains its true colors",                    file:"LPL_03"},
  {id:"dreams",   code:"LPL#04",kr:"그 품안에서 사랑의 꿈이 일렁입니다",        en:"In that embrace, dreams of love ripple",           file:"LPL_04"},
  {id:"RST_01",   code:"",      kr:"",                                         en:"",                                                    file:"RST_01"},
  {id:"dreams00", code:"LDR#00",kr:"사랑의 꿈은",                              en:"Dreams of love",                                       file:"LDR_00"},
  {id:"dreams01", code:"LDR#11",kr:"이끌림을 따라",                            en:"Following the pull",                                   file:"LDR_11"},
  {id:"dreams02", code:"LDR#21",kr:"설렘에 실려",                              en:"Carried by excitement",                                file:"LDR_21"},
  {id:"dreams03", code:"LDR#31",kr:"그리움과 함께 넓어지며",                   en:"Expanding with longing",                               file:"LDR_31"},
  {id:"dreams04", code:"LDR#41",kr:"애틋함으로 깊어져",                        en:"Deepening with tenderness",                            file:"LDR_41"},
  {id:"dreams05", code:"LDR#51",kr:"행복의 바다에 이르고",                     en:"Reaching the sea of happiness",                        file:"LDR_51"},
  {id:"RST_02",   code:"",      kr:"",                                         en:"",                                                    file:"RST_02"},
  {id:"song01",   code:"LSN#01",kr:"사랑의 노래가 되어",                       en:"Becoming a song of love",                              file:"LSN_01"},
  {id:"song02",   code:"LSN#02",kr:"당신만을 바라고 또 바라 봅니다",            en:"I gaze at you, and gaze again",                        file:"LSN_02"},
  {id:"RST_03",   code:"",      kr:"",                en:"",            file:"RST_03"},
  {id:"song03",   code:"LSN#03",kr:"어제, 오늘 그리고 내일",                   en:"Yesterday, today, and tomorrow",                       file:"LSN_03"},
  {id:"song04",   code:"LSN#04",kr:"하루의 모든 순간",                         en:"Every moment of the day",                              file:"LSN_04"},
  {id:"song05",   code:"LSN#05",kr:"잠 못 이루는 밤",                          en:"Sleepless nights",                                     file:"LSN_05"},
  {id:"song06",   code:"LSN#06",kr:"꿈속에서도",                               en:"Even in dreams",                                       file:"LSN_06"},
  {id:"song07",   code:"LSN#07",kr:"내가 머물고 싶은 공간",                    en:"The space I want to dwell",                            file:"LSN_07"},
  {id:"song08",   code:"LSN#08",kr:"끝없이 샘솟는 기쁨",                       en:"Endlessly springing joy",                              file:"LSN_08"},
  {id:"song09",   code:"LSN#09",kr:"마음을 울리는 노래 속에도",                en:"Even in songs that move my heart",                     file:"LSN_09"},
  {id:"song10",   code:"LSN#10",kr:"언제나 당신이 있습니다",                   en:"You are always there",                                 file:"LSN_10"},
  {id:"RST_04",   code:"",      kr:"",                                         en:"",                                                    file:"RST_04"},
  {id:"song11",   code:"LSN#11",kr:"당신의",                                   en:"Your",                                                 file:"LSN_11"},
  {id:"song12",   code:"LSN#12",kr:"해맑은 미소와 따스한 온기에",              en:"Pure smile and warm embrace",                          file:"LSN_12"},
  {id:"song13",   code:"LSN#13",kr:"모든 순간이 낙원이 되고",                  en:"Every moment becomes paradise",                        file:"LSN_13"},
  {id:"song14",   code:"LSN#14",kr:"온 세상이 사랑으로 물들면",                en:"When the whole world is tinted with love",             file:"LSN_14"},
  {id:"song15",   code:"LSN#15",kr:"나는 당신의 사랑안에서",                   en:"In your love",                                         file:"LSN_15"},
  {id:"song16",   code:"LSN#16",kr:"새로이 태어납니다",                        en:"I am born anew",                                       file:"LSN_16"},
  {id:"RST_05",   code:"",      kr:"아직 열리지 않은 이야기들이 있습니다.\n사랑의 공명, 사랑의 춤, 사랑의 합창 —\n언젠가, 다른 공간에서 만나길 바랍니다.",                                         en:"There are stories yet to be opened.\nLove Resonance, Love Dance, Love Chorus —\nwe hope to meet them someday, in another space.",                                                    file:"RST_05"},
  {id:"LEL_01", code:"LEL#01",kr:"사랑이 감싸 안은 세상,\n세상도 내 마음도 사랑으로 가득합니다",                    en:"A world embraced by love,\nthe world and my heart are filled with love",                             file:"LEL_01"},
];

const INDEX_ROWS = [
  {type:"head",label:"LPL (Prologue)"},
  {type:"item",code:"LPL#01"},{type:"item",code:"LPL#02"},{type:"item",code:"LPL#03"},{type:"item",code:"LPL#04"},
  {type:"head",label:"LDR (Love Dream)"},
  {type:"item",code:"LDR#00"},
  {type:"item",code:"LDR#11"},{type:"item",code:"LDR#12"},{type:"item",code:"LDR#13"},
  {type:"item",code:"LDR#21"},{type:"item",code:"LDR#22"},{type:"item",code:"LDR#23"},
  {type:"item",code:"LDR#31"},{type:"item",code:"LDR#32"},{type:"item",code:"LDR#33"},
  {type:"item",code:"LDR#41"},{type:"item",code:"LDR#42"},{type:"item",code:"LDR#43"},
  {type:"item",code:"LDR#51"},{type:"item",code:"LDR#52"},{type:"item",code:"LDR#53"},
  {type:"head",label:"LSN (Love Song)"},
  {type:"item",code:"LSN#01"},{type:"item",code:"LSN#02"},
  {type:"item",code:"LSN#03"},{type:"item",code:"LSN#04"},{type:"item",code:"LSN#05"},{type:"item",code:"LSN#06"},
  {type:"item",code:"LSN#07"},{type:"item",code:"LSN#08"},{type:"item",code:"LSN#09"},{type:"item",code:"LSN#10"},
  {type:"item",code:"LSN#11"},{type:"item",code:"LSN#12"},{type:"item",code:"LSN#13"},{type:"item",code:"LSN#14"},
  {type:"item",code:"LSN#15"},{type:"item",code:"LSN#16"},
  {type:"head",label:"LRS (Love Resonance)"},{type:"item",code:"LRS#01"},
  {type:"head",label:"LDN (Love Dance)"},
  {type:"item",code:"LDN#01"},{type:"item",code:"LDN#02"},{type:"item",code:"LDN#03"},{type:"item",code:"LDN#04"},
  {type:"head",label:"LCR (Love Chorus)"},{type:"item",code:"LCR#01"},
  {type:"head",label:"LEL (Epilogue)"},{type:"item",code:"LEL#01"}
];

const THUMB_CODES = new Set([
  "LPL#01","LPL#02","LPL#03","LPL#04",
  "LDR#00","LDR#11","LDR#21","LDR#31","LDR#41","LDR#51",
  "LSN#01","LSN#02",
  "LSN#11","LSN#12","LSN#13","LSN#14","LSN#15","LSN#16",
  "LEL#01"
]);

const LOCKED_TITLES = {
  "LDR#12":"이끌림","LDR#13":"이끌림",
  "LDR#22":"설렘","LDR#23":"설렘",
  "LDR#32":"그리움","LDR#33":"그리움",
  "LDR#42":"애틋함","LDR#43":"애틋함",
  "LDR#52":"행복","LDR#53":"행복",
  "LSN#03":"노래","LSN#04":"노래","LSN#05":"노래","LSN#06":"노래",
  "LSN#07":"노래","LSN#08":"노래","LSN#09":"노래","LSN#10":"노래",
  "LRS#01":"공명",
  "LDN#01":"춤","LDN#02":"춤","LDN#03":"춤","LDN#04":"춤",
  "LCR#01":"합창"
};

const LANG_TEXTS = {
  KR:{tocTitle:"메뉴",menuH_TOC:"목차",menuH_INDEX:"작품 목록",menuH_CONTACT:"연락처",
      menuH_ABOUT:"작가의 이야기",aboutTitle:"작가의 이야기",aboutBody:`눈부신 햇살,
잔잔한 바람,
백조의 우아한 자태에
일렁이는 빛결은
보석처럼 반짝입니다.

백조와 반영은
서로의 색으로 물들고
온 세상이 사랑으로 번져갑니다.`,menuH_COPY:"저작권",
      homeText:"모든 사랑의 순간은 당신으로 열립니다",
      prologue:"프롤로그",lovedream:"사랑의 꿈 (일부 공개)",lovesong:"사랑의 노래",
      resonance:"사랑의 공명 (잠김)",dance:"사랑의 춤 (잠김)",chorus:"사랑의 합창 (잠김)",
      epilogue:"에필로그",indexList:"작품 목록",slstTitle:"사랑의 순간",
      indexTitle:"작품 목록",indexSub:"존재하는 작품은 클릭하면 바로 이동합니다",
      indexBtnLabel:"버튼",indexThumbLabel:"썸네일",
      infoBack:"뒤로",infoHelpTitle:"사용법",
      infoNav:"이전 / 다음 작품",infoMenu:"메뉴 열기 / 닫기",
      infoHelp:"도움말 열기 / 닫기",infoT:"텍스트 보기",
      infoG:"당신의 이야기 열기 / 닫기",infoP:"작가의 이야기 열기 / 닫기",copyright:"© Vitro Narida. All rights reserved.",
      menuH_GB:"당신의 이야기",gbTitle:"당신의 이야기",
      introText:"모든 사랑의\n순간은\n당신으로\n열립니다"},
  EN:{tocTitle:"Menu",menuH_TOC:"Contents",menuH_INDEX:"Collection",menuH_CONTACT:"Contact",
      menuH_ABOUT:"About",aboutTitle:"Artist’s Note",aboutBody:`Dazzling sunlight,
a gentle breeze,
in the graceful poise of swans
the shimmering light
sparkles like jewels.

Swans and their reflections
blend into each other’s colors
and the whole world spreads into love.

Every moment of love opens with you,
and love is complete with you.`,menuH_COPY:"Copyright",
      homeText:"Every moment of love opens with you.",
      prologue:"Prologue",lovedream:"Love Dream (Selection)",lovesong:"Love Song",
      resonance:"Love Resonance (locked)",dance:"Love Dance (locked)",chorus:"Love Chorus (locked)",
      epilogue:"Epilogue",indexList:"Artwork List",slstTitle:"Moment of Love",
      indexTitle:"Collection",indexSub:"Click on existing artworks to navigate",
      indexBtnLabel:"Buttons",indexThumbLabel:"Thumbnails",
      infoBack:"Back",infoHelpTitle:"How to Use",
      infoNav:"Prev / Next",infoMenu:"Open / Close Menu",
      infoHelp:"Open / Close Help",infoT:"View Text",
      infoG:"Open / Close Reader's Words",infoP:"Open / Close Artist's Note",copyright:"© Vitro Narida. All rights reserved.",
      menuH_GB:"Reader's Words",gbTitle:"Reader's Words",
      introText:"Every love\nbegins\nwith\nyou"}
};

const goTo = (url) => {
  if (!url) return;
  // 모든 오버레이 즉시 숨기기 (transition 무시 — 잔상 완전 방지)
  document.querySelectorAll(".overlay-panel").forEach(el => {
    el.classList.remove("on");
    el.setAttribute("aria-hidden","true");
    el.style.transition = "none";
    el.style.opacity = "0";
    el.style.pointerEvents = "none";
    el.style.display = "none";
  });
  // 타임스탬프 추가로 동일 URL 재진입 시 캐시 무력화
  const sep = url.includes("?") ? "&" : "?";
  const dest = url + sep + "_t=" + Date.now();
  const bo = document.getElementById("blackout");
  if (bo) { bo.classList.add("on"); setTimeout(() => { location.href = dest; }, 200); }
  else { location.href = dest; }
};
window.goTo = goTo;
