// ============================================================
// A08-css-guestbook.js  —  그룹 A (CSS)
// ============================================================

const CSS_A08_MOBILE = `
/* ===== Guestbook 오버레이 (모바일) ===== */
#gbOverlay { align-items:flex-end; }
#gbOverlay .gb-panel {
  position:relative; width:100%; max-height:92dvh;
  background: rgba(255,255,255,0.10); border:1px solid rgba(255,255,255,0.08); border-bottom:none;
  border-radius:20px 20px 0 0; padding:14px 16px 24px; overflow-y:auto; -ms-overflow-style:none; scrollbar-width:none;
  transform:translateY(20px); transition:transform 400ms ease; color:#e6e6e6;
}
.gb-panel::-webkit-scrollbar { display: none; }
#gbOverlay.on .gb-panel { transform:translateY(0); }
.gb-login-btn {
  display:inline-flex; align-items:center; padding:10px 20px;
  background:rgba(255,255,255,0.10); border:1px solid rgba(255,255,255,0.18);
  border-radius:10px; color:#e6e6e6; font-family:"Nanum Pen Script",cursive;
  font-size:18px; cursor:pointer; transition:background 200ms;
}
.gb-login-btn:active { background:rgba(255,255,255,0.20); }
.gb-user-info { display:flex; align-items:center; gap:10px; flex-wrap:wrap; }
.gb-user-photo { width:32px; height:32px; border-radius:50%; object-fit:cover; }
.gb-user-name { font-family:"Nanum Pen Script",cursive; font-size:18px; color:rgba(235,235,235,0.90); }
.gb-admin-badge { font-size:13px; color:rgba(212,175,55,0.90); border:1px solid rgba(212,175,55,0.40); border-radius:4px; padding:1px 6px; margin-left:4px; }
.gb-logout-btn {
  padding:4px 12px; background:transparent; border:1px solid rgba(255,255,255,0.15);
  border-radius:6px; color:rgba(220,220,220,0.60); font-family:"Nanum Pen Script",cursive;
  font-size:15px; cursor:pointer; margin-left:auto;
}
.gb-login-notice { font-family:"Nanum Pen Script",cursive; font-size:17px; color:rgba(220,220,220,0.50); padding:12px 0; }
.gb-form { margin:14px 0; }
.gb-input {
  width:100%; box-sizing:border-box; padding:6px 12px; background:rgba(255,255,255,0.06);
  border:1px solid rgba(255,255,255,0.12); border-radius:10px; color:#e6e6e6;
  font-family:"Nanum Pen Script",cursive; font-size:22px; line-height:1.5;
  outline:none; transition:border-color 200ms; margin-bottom:10px;
}
.gb-input:focus { border-color:rgba(212,175,55,0.50); }
.gb-input::placeholder { color:rgba(220,220,220,0.35); }
.gb-textarea {
  width:100%; box-sizing:border-box; padding:12px; background:rgba(255,255,255,0.06);
  border:1px solid rgba(255,255,255,0.12); border-radius:10px; color:#e6e6e6;
  font-family:"Nanum Pen Script",cursive; font-size:22px; line-height:1.5;
  resize:none; outline:none; transition:border-color 200ms;
}
.gb-textarea:focus { border-color:rgba(212,175,55,0.50); }
.gb-textarea::placeholder { color:rgba(220,220,220,0.35); }
.gb-form-footer { display:flex; align-items:center; justify-content:space-between; margin-top:8px; }
.gb-char-count { font-family:"Nanum Pen Script",cursive; font-size:18px; color:rgba(180,180,180,0.45); padding-left:12px; }
.gb-char-count.gb-char-warn { color:rgba(212,120,80,0.80); }
.gb-submit-btn {
  padding:8px; background:rgba(212,175,55,0.22); border:1px solid rgba(212,175,55,0.40);
  border-radius:8px; color:rgba(255,250,230,0.90); font-family:"Nanum Pen Script",cursive;
  font-size:18px; cursor:pointer; transition:background 200ms;
}
.gb-submit-btn:active { background:rgba(212,175,55,0.40); }
.gb-submit-btn:disabled { opacity:0.45; pointer-events:none; }
.gb-error-msg { font-family:"Nanum Pen Script",cursive; font-size:18px; color:rgba(212,120,80,0.85); padding-left:12px; max-height:0; overflow:hidden; opacity:0; transition:max-height 300ms ease, opacity 300ms ease; margin-bottom:0; }
.gb-error-msg.show { max-height:40px; opacity:1; margin-bottom:8px; }
.gb-entry { padding:14px 0; border-bottom:1px solid rgba(255,255,255,0.06); }
.gb-entry:last-child { border-bottom:none; }
.gb-entry-pending { opacity:0.55; }
.gb-entry-header { display:flex; align-items:center; gap:8px; margin-bottom:6px; flex-wrap:wrap; }
.gb-entry-photo { width:24px; height:24px; border-radius:50%; object-fit:cover; }
.gb-entry-name { font-family:"Nanum Pen Script",cursive; font-size:16px; color:rgba(235,235,235,0.80); }
.gb-entry-date { font-family:"Nanum Pen Script",cursive; font-size:14px; color:rgba(180,180,180,0.40); margin-left:auto; }
.gb-entry-message { font-family:"Nanum Pen Script",cursive; font-size:17px; color:rgba(230,230,230,0.85); line-height:1.55; white-space:pre-wrap; word-break:break-word; padding-left:32px; }
.gb-entry-admin { display:flex; gap:8px; margin-top:6px; padding-left:32px; }
.gb-approve-btn, .gb-delete-btn {
  padding:3px 10px; border-radius:5px; font-family:"Nanum Pen Script",cursive; font-size:14px; cursor:pointer; border:1px solid rgba(255,255,255,0.12); background:rgba(255,255,255,0.06); color:rgba(220,220,220,0.70);
}
.gb-approve-btn:active { background:rgba(212,175,55,0.30); }
.gb-delete-btn:active { background:rgba(200,60,60,0.30); }
.gb-approved-label { font-family:"Nanum Pen Script",cursive; font-size:13px; color:rgba(212,175,55,0.60); }
.gb-pending-label { font-family:"Nanum Pen Script",cursive; font-size:13px; color:rgba(200,150,80,0.60); border:1px solid rgba(200,150,80,0.25); border-radius:4px; padding:1px 6px; }
.gb-empty, .gb-loading { font-family:"Nanum Pen Script",cursive; font-size:17px; color:rgba(200,200,200,0.45); text-align:center; padding:32px 0; }
.gb-spinner { display:inline-block; width:16px; height:16px; border:2px solid rgba(255,255,255,0.15); border-top-color:rgba(212,175,55,0.70); border-radius:50%; animation:gbSpin 0.8s linear infinite; margin-right:8px; vertical-align:middle; }
@keyframes gbSpin { to { transform:rotate(360deg); } }
.gb-toast { position:fixed; bottom:80px; left:50%; transform:translateX(-50%) translateY(20px); background:rgba(30,30,30,0.92); color:#e6e6e6; font-family:"Nanum Pen Script",cursive; font-size:16px; padding:10px 24px; border-radius:10px; border:1px solid rgba(255,255,255,0.08); opacity:0; transition:opacity 300ms, transform 300ms; pointer-events:none; z-index:10002; }
.gb-toast.show { opacity:1; transform:translateX(-50%) translateY(0); }
.gb-toast-error { border-color:rgba(200,60,60,0.40); }
.gb-success { text-align:center; padding:48px 16px; font-family:"Nanum Pen Script",cursive; }
.gb-success-icon { font-size:32px; margin-bottom:16px; }
.gb-success-msg { font-size:22px; line-height:1.7; color:rgba(230,230,230,0.80); }
.gb-subtitle { font-family:"Nanum Pen Script",cursive; font-size:22px; color:rgba(220,220,220,0.55); margin:0 0 14px; line-height:1.5; }
`;

const CSS_A08_DESKTOP = `
/* ===== Guestbook 오버레이 (데스크톱) ===== */
#gbOverlay{ z-index:10000; }
.gb-panel{
  position:relative; width:min(560px, 88vw); max-height:80vh;
  padding:18px 26px 20px; overflow-y:auto; -ms-overflow-style:none; scrollbar-width:none;
}
.gb-panel::-webkit-scrollbar { display: none; }
.gb-title{ font-family:"Nanum Pen Script",cursive; font-size:26px; line-height:1.1; margin:0 0 10px; letter-spacing:0.2px; }
.gb-close{ position:absolute; top:12px; right:16px; font-size:22px; color:rgba(220,220,220,0.7); cursor:pointer; width:36px; height:36px; display:flex; align-items:center; justify-content:center; border-radius:8px; transition:background 150ms; }
.gb-close:hover{ background:rgba(255,255,255,0.08); }
.gb-login-btn {
  display:inline-flex; align-items:center; padding:10px 22px;
  background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.15);
  border-radius:10px; color:#e6e6e6; font-family:"Nanum Pen Script",cursive;
  font-size:18px; cursor:pointer; transition:background 200ms, border-color 200ms;
}
.gb-login-btn:hover { background:rgba(255,255,255,0.14); border-color:rgba(255,255,255,0.25); }
.gb-user-info { display:flex; align-items:center; gap:10px; flex-wrap:wrap; }
.gb-user-photo { width:32px; height:32px; border-radius:50%; object-fit:cover; }
.gb-user-name { font-family:"Nanum Pen Script",cursive; font-size:18px; color:rgba(235,235,235,0.90); }
.gb-admin-badge { font-size:13px; color:rgba(212,175,55,0.90); border:1px solid rgba(212,175,55,0.40); border-radius:4px; padding:1px 6px; margin-left:4px; }
.gb-logout-btn {
  padding:4px 14px; background:transparent; border:1px solid rgba(255,255,255,0.12);
  border-radius:6px; color:rgba(220,220,220,0.55); font-family:"Nanum Pen Script",cursive;
  font-size:15px; cursor:pointer; transition:background 150ms; margin-left:auto;
}
.gb-logout-btn:hover { background:rgba(255,255,255,0.06); }
.gb-login-notice { font-family:"Nanum Pen Script",cursive; font-size:17px; color:rgba(220,220,220,0.45); padding:14px 0; }
.gb-form { margin:16px 0; }
.gb-input {
  width:100%; box-sizing:border-box; padding:6px 14px; background:rgba(255,255,255,0.05);
  border:1px solid rgba(255,255,255,0.10); border-radius:10px; color:#e6e6e6;
  font-family:"Nanum Pen Script",cursive; font-size:clamp(22px, 3vw, 28px); line-height:1.5;
  outline:none; transition:border-color 200ms; margin-bottom:10px;
}
.gb-input:focus { border-color:rgba(212,175,55,0.45); }
.gb-input::placeholder { color:rgba(220,220,220,0.30); }
.gb-textarea {
  width:100%; box-sizing:border-box; padding:12px 14px; background:rgba(255,255,255,0.05);
  border:1px solid rgba(255,255,255,0.10); border-radius:10px; color:#e6e6e6;
  font-family:"Nanum Pen Script",cursive; font-size:clamp(22px, 3vw, 28px); line-height:1.5;
  resize:none; outline:none; transition:border-color 200ms;
}
.gb-textarea:focus { border-color:rgba(212,175,55,0.45); }
.gb-textarea::placeholder { color:rgba(220,220,220,0.30); }
.gb-form-footer { display:flex; align-items:center; justify-content:space-between; margin-top:8px; }
.gb-char-count { font-family:"Nanum Pen Script",cursive; font-size:18px; color:rgba(180,180,180,0.40); padding-left:14px; }
.gb-char-count.gb-char-warn { color:rgba(212,120,80,0.75); }
.gb-submit-btn {
  padding:8px; background:rgba(212,175,55,0.18); border:1px solid rgba(212,175,55,0.35);
  border-radius:8px; color:rgba(255,250,230,0.85); font-family:"Nanum Pen Script",cursive;
  font-size:18px; cursor:pointer; transition:background 200ms, border-color 200ms;
}
.gb-submit-btn:hover { background:rgba(212,175,55,0.32); border-color:rgba(212,175,55,0.55); }
.gb-submit-btn:disabled { opacity:0.4; pointer-events:none; }
.gb-error-msg { font-family:"Nanum Pen Script",cursive; font-size:18px; color:rgba(212,120,80,0.85); padding-left:14px; max-height:0; overflow:hidden; opacity:0; transition:max-height 300ms ease, opacity 300ms ease; margin-bottom:0; }
.gb-error-msg.show { max-height:40px; opacity:1; margin-bottom:8px; }
.gb-entry { padding:14px 0; border-bottom:1px solid rgba(255,255,255,0.05); }
.gb-entry:last-child { border-bottom:none; }
.gb-entry-pending { opacity:0.50; }
.gb-entry-header { display:flex; align-items:center; gap:8px; margin-bottom:6px; }
.gb-entry-photo { width:24px; height:24px; border-radius:50%; object-fit:cover; }
.gb-entry-name { font-family:"Nanum Pen Script",cursive; font-size:16px; color:rgba(235,235,235,0.80); }
.gb-entry-date { font-family:"Nanum Pen Script",cursive; font-size:14px; color:rgba(180,180,180,0.35); margin-left:auto; }
.gb-entry-message { font-family:"Nanum Pen Script",cursive; font-size:17px; color:rgba(230,230,230,0.85); line-height:1.55; white-space:pre-wrap; word-break:break-word; padding-left:32px; }
.gb-entry-admin { display:flex; gap:8px; margin-top:6px; padding-left:32px; }
.gb-approve-btn, .gb-delete-btn {
  padding:3px 12px; border-radius:5px; font-family:"Nanum Pen Script",cursive; font-size:14px;
  cursor:pointer; border:1px solid rgba(255,255,255,0.10); background:rgba(255,255,255,0.05);
  color:rgba(220,220,220,0.65); transition:background 150ms;
}
.gb-approve-btn:hover { background:rgba(212,175,55,0.25); }
.gb-delete-btn:hover { background:rgba(200,60,60,0.25); }
.gb-approved-label { font-family:"Nanum Pen Script",cursive; font-size:13px; color:rgba(212,175,55,0.55); }
.gb-pending-label { font-family:"Nanum Pen Script",cursive; font-size:13px; color:rgba(200,150,80,0.55); border:1px solid rgba(200,150,80,0.22); border-radius:4px; padding:1px 6px; }
.gb-empty, .gb-loading { font-family:"Nanum Pen Script",cursive; font-size:17px; color:rgba(200,200,200,0.40); text-align:center; padding:36px 0; }
.gb-spinner { display:inline-block; width:16px; height:16px; border:2px solid rgba(255,255,255,0.12); border-top-color:rgba(212,175,55,0.65); border-radius:50%; animation:gbSpin 0.8s linear infinite; margin-right:8px; vertical-align:middle; }
@keyframes gbSpin { to { transform:rotate(360deg); } }
.gb-toast { position:fixed; bottom:40px; left:50%; transform:translateX(-50%) translateY(20px); background:rgba(25,25,25,0.92); color:#e6e6e6; font-family:"Nanum Pen Script",cursive; font-size:16px; padding:10px 28px; border-radius:10px; border:1px solid rgba(255,255,255,0.06); opacity:0; transition:opacity 300ms, transform 300ms; pointer-events:none; z-index:10002; }
.gb-toast.show { opacity:1; transform:translateX(-50%) translateY(0); }
.gb-toast-error { border-color:rgba(200,60,60,0.35); }
.gb-success { text-align:center; padding:52px 20px; font-family:"Nanum Pen Script",cursive; }
.gb-success-icon { font-size:32px; margin-bottom:18px; }
.gb-success-msg { font-size:clamp(22px, 3vw, 28px); line-height:1.7; color:rgba(230,230,230,0.80); }
.gb-subtitle { font-family:"Nanum Pen Script",cursive; font-size:clamp(22px, 3vw, 28px); color:rgba(220,220,220,0.55); margin:0 0 16px; line-height:1.5; }
`;
