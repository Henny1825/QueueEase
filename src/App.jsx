import './App.css';
import { useState, useEffect, useRef } from "react";
import CitizenLanding from "./pages/UserLanding"
import OfficerLanding from "./pages/OfficerLanding"
import ManagerLanding from "./pages/ManagerLanding.jsx"



// ── palette & fonts via inline style injection ──────────────────────────────
const GlobalStyle = () => (
  <style>{`

     @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@400;500&family=DM+Sans:wght@300;400;500&display=swap');


    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --ink:    #0d0d0d;
      --paper:  #f5f2ec;
      --cream:  #ede9e0;
      --teal:   #00897b;
      --teal2:  #00bfa5;
      --amber:  #ffb300;
      --rose:   #e53935;
      --muted:  #6b6860;
      --border: #d6d1c7;
      --card:   #ffffff;
      --radius: 12px;
      --shadow: 0 2px 16px rgba(0,0,0,0.08);
    }

    body { font-family: 'DM Sans', sans-serif; background: var(--paper); color: var(--ink); }

    .syne   { font-family: 'Syne', sans-serif; }
    .mono   { font-family: 'DM Mono', monospace; }

    /* scrollbar */
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: var(--cream); }
    ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }

    /* animations */
    @keyframes fadeUp   { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:none; } }
    @keyframes pulse    { 0%,100%{opacity:1} 50%{opacity:.45} }
    @keyframes spin     { to { transform: rotate(360deg); } }
    @keyframes ticker   { from{transform:translateX(0)} to{transform:translateX(-50%)} }
    @keyframes pop      { 0%{transform:scale(.85);opacity:0} 70%{transform:scale(1.04)} 100%{transform:scale(1);opacity:1} }

    .fade-up   { animation: fadeUp .45s ease both; }
    .pop       { animation: pop .4s cubic-bezier(.34,1.56,.64,1) both; }
    .spinning  { animation: spin 1s linear infinite; }
    .pulsing   { animation: pulse 1.6s ease-in-out infinite; }

    /* ticket stamp */
    .stamp {
      display: inline-block;
      border: 3px solid var(--teal);
      border-radius: 6px;
      padding: 2px 10px;
      font-family: 'DM Mono', monospace;
      font-size: 11px;
      letter-spacing: .12em;
      text-transform: uppercase;
      color: var(--teal);
    }
    .stamp.rose { border-color: var(--rose); color: var(--rose); }
    .stamp.amber{ border-color: var(--amber); color: #9a6e00; }

    /* tab pill */
    .tab-pill {
      display: flex; gap: 4px;
      background: var(--cream);
      border-radius: 999px;
      padding: 4px;
      border: 1px solid var(--border);
    }
    .tab-pill button {
      border: none; cursor: pointer;
      border-radius: 999px;
      padding: 7px 20px;
      font-family: 'DM Sans', sans-serif;
      font-size: 13px;
      font-weight: 500;
      background: transparent;
      color: var(--muted);
      transition: all .2s;
    }
    .tab-pill button.active {
      background: var(--teal);
      color: #fff;
    }

    /* card */
    .card {
      background: var(--card);
      border-radius: var(--radius);
      border: 1px solid var(--border);
      box-shadow: var(--shadow);
    }

    /* btn */
    .btn {
      display: inline-flex; align-items: center; gap: 8px;
      border: none; cursor: pointer;
      border-radius: 8px;
      padding: 11px 22px;
      font-family: 'DM Sans', sans-serif;
      font-size: 14px; font-weight: 500;
      transition: all .18s;
    }
    .btn-primary   { background: var(--teal); color: #fff; }
    .btn-primary:hover { background: var(--teal2); transform: translateY(-1px); box-shadow: 0 4px 12px rgba(0,137,123,.3); }
    .btn-ghost     { background: transparent; color: var(--muted); border: 1px solid var(--border); }
    .btn-ghost:hover { background: var(--cream); color: var(--ink); }
    .btn-danger    { background: #ffeaea; color: var(--rose); border: 1px solid #ffc8c8; }
    .btn-danger:hover { background: #ffe0e0; }
    .btn:disabled  { opacity: .45; cursor: not-allowed; transform: none !important; }

    /* input */
    .field { display:flex; flex-direction:column; gap:5px; }
    .field label { font-size:12px; font-weight:600; text-transform:uppercase; letter-spacing:.08em; color:var(--muted); }
    .field input, .field select, .field textarea {
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 10px 14px;
      font-family: 'DM Sans', sans-serif;
      font-size:14px; color: var(--ink);
      background: var(--paper);
      outline: none;
      transition: border-color .18s;
    }
    .field input:focus, .field select:focus { border-color: var(--teal); }

    /* live dot */
    .live-dot {
      width:8px; height:8px; border-radius:50%;
      background: var(--teal2);
      box-shadow: 0 0 0 3px rgba(0,191,165,.25);
      animation: pulse 1.6s ease-in-out infinite;
    }

    /* queue bar */
    .q-bar { height:8px; border-radius:4px; background:var(--cream); overflow:hidden; }
    .q-bar-fill { height:100%; border-radius:4px; background: linear-gradient(90deg, var(--teal), var(--teal2)); transition: width .6s ease; }

    /* table */
    .tbl { width:100%; border-collapse: collapse; font-size:13px; }
    .tbl th { padding: 10px 14px; text-align:left; font-size:11px; text-transform:uppercase; letter-spacing:.08em; color:var(--muted); border-bottom:1px solid var(--border); font-weight:600; }
    .tbl td { padding: 12px 14px; border-bottom: 1px solid var(--cream); vertical-align:middle; }
    .tbl tr:last-child td { border-bottom: none; }
    .tbl tr:hover td { background: var(--paper); }

    /* ticket card */
    .ticket-card {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 16px;
      overflow: hidden;
      position: relative;
    }
    .ticket-card::before {
      content:'';
      display:block;
      height:6px;
      background: linear-gradient(90deg, var(--teal), var(--teal2), var(--amber));
    }

    /* notch circles on ticket */
    .notch { width:22px;height:22px;border-radius:50%;background:var(--paper);border:1px solid var(--border); }

    /* channel badge */
    .ch-badge {
      display:inline-flex; align-items:center; gap:5px;
      padding: 3px 10px;
      border-radius: 999px;
      font-size: 11px; font-weight:600;
      background: var(--cream);
      color: var(--muted);
      border: 1px solid var(--border);
    }

    /* stat box */
    .stat-box {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 20px;
    }
    .stat-val { font-family:'Syne',sans-serif; font-size:32px; font-weight:800; line-height:1; }
    .stat-lbl { font-size:12px; text-transform:uppercase; letter-spacing:.08em; color:var(--muted); margin-top:4px; }

    /* ticker tape */
    .ticker-wrap { overflow:hidden; background:var(--ink); color:#fff; padding:6px 0; }
    .ticker-inner { display:inline-flex; gap:60px; white-space:nowrap; animation: ticker 28s linear infinite; }
    .ticker-item  { font-family:'DM Mono',monospace; font-size:11px; letter-spacing:.1em; opacity:.75; }

    /* responsive */
    @media(max-width:700px) {
      .hide-sm { display:none !important; }
      .col-2   { grid-template-columns:1fr !important; }
  `}
   </style>
);


const navItems = [
  {id:"landing", icon:"home", label:"Home"},  // ← ADD THIS
  {id:"customer", icon:"ticket", label:"Join Queue"},
  {id:"admin",    icon:"users",  label:"Staff Dashboard"},
  {id:"analytics",icon:"chart",  label:"Analytics"},
  // {id:"ussd",     icon:"phone",  label:"USSD Sim"},
  // {id:"whatsapp", icon:"bell",   label:"WhatsApp Bot"},
];

// ── seed data ────────────────────────────────────────────────────────────────
const ORGS = [
  { id:"GHS001", name:"Ganah Health Service – Accra", services:["General OPD","Lab Tests","Pharmacy","Specialist Consult"], avgMins:8 },
  { id:"DVLA02", name:"DVLA Licensing Office", services:["New License","Renewal","Road Worthiness","Plate Collection"], avgMins:12 },
  { id:"GRA003", name:"Ganah Revenue Authority", services:["Tax Clearance","VAT Registration","TIN Issuance","Customs"], avgMins:15 },
  { id:"NIA004", name:"National ID Authority", services:["New Registration","Replacement Card","Address Update"], avgMins:10 },
];

let ticketCounter = 100;
const genToken = (orgId) => `${orgId.slice(0,3)}-${++ticketCounter}`;

const CHANNELS = { web:"🌐 Web", whatsapp:"💬 WhatsApp", sms:"📱 SMS", ussd:"📟 USSD" };

const initQueue = () => {
  const q = {};
  ORGS.forEach(o => {
    q[o.id] = o.services.map(s => ({
      service: s,
      tickets: Array.from({length: Math.floor(Math.random()*6)+2}, (_,i) => ({
        id: `${o.id.slice(0,3)}-${90+i}`,
        phone: `+23305${Math.floor(Math.random()*9000000+1000000)}`,
        channel: Object.keys(CHANNELS)[Math.floor(Math.random()*4)],
        status: i===0 ? "called" : "waiting",
        joinedAt: new Date(Date.now() - (6-i)*4*60000),
      }))
    }));
  });
  return q;
};

// ── helpers ──────────────────────────────────────────────────────────────────
const fmtTime = (d) => d.toLocaleTimeString([], {hour:"2-digit", minute:"2-digit"});
// const waitMins = (ticket, tickets, avgMins) => {
//   const pos = tickets.filter(t=>t.status==="waiting").findIndex(t=>t.id===ticket.id);
//   return pos < 0 ? 0 : (pos+1)*avgMins;
// };

// ── Icon components ──────────────────────────────────────────────────────────
const Icon = ({name, size=16, color="currentColor"}) => {
  const icons = {
    queue: <><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></>,
    ticket: <><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M13 5v2M13 17v2M13 11v2"/></>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></>,
    bell: <><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></>,
    check: <><polyline points="20 6 9 17 4 12"/></>,
    x: <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,
    arrow: <><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></>,
    home: <><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></>,
    chart: <><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></>,
    settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></>,
    phone: <><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6.29 6.29l1.36-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></>,
    refresh: <><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></>,
    plus: <><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>,
    info: <><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {icons[name]}
    </svg>
  );
};

// ── USSD Simulator ───────────────────────────────────────────────────────────
const USSDSim = ({ orgs, onJoin }) => {
  const [screen, setScreen] = useState("home");
  const [input, setInput] = useState("");
  const [sel, setSel] = useState({});
  const [result, setResult] = useState(null);
  const ref = useRef();

  // const MENU = {
  //   home: { title:"CON Welcome to QueueEase\n\n1. Join a Queue\n2. Check My Position\n3. Cancel Ticket\n0. Exit", options:{"1":"join","2":"check","3":"cancel","0":"exit"} },
  //   join: { title:"CON Select Organization:\n\n1. Ganah Health Service\n2. DVLA Licensing\n3. GRA Tax Office\n4. National ID Authority", options:{"1":0,"2":1,"3":2,"4":3} },
  // };

  const handleSend = () => {
    const v = input.trim();
    setInput("");
    if (screen==="home") {
      if(v==="1") { setScreen("join"); return; }
      if(v==="0") { setScreen("home"); setSel({}); return; }
    }
    if (screen==="join" && ["1","2","3","4"].includes(v)) {
      const org = orgs[parseInt(v)-1];
      setSel({org});
      setScreen("service");
      return;
    }
    if (screen==="service" && sel.org) {
      const svcIdx = parseInt(v)-1;
      if (svcIdx>=0 && svcIdx<sel.org.services.length) {
        const ticket = genToken(sel.org.id);
        onJoin && onJoin({ orgId:sel.org.id, service:sel.org.services[svcIdx], phone:"+233055555555", channel:"ussd", token:ticket });
        setResult({ token:ticket, org:sel.org.name, service:sel.org.services[svcIdx] });
        setScreen("result");
        return;
      }
    }
    if(screen==="result") { setScreen("home"); setSel({}); setResult(null); }
  };

  const getDisplay = () => {
    if(screen==="home") return "CON Welcome to QueueEase\n\n1. Join a Queue\n2. Check My Position\n3. Cancel Ticket\n0. Exit";
    if(screen==="join") return `CON Select Organization:\n\n${orgs.map((o,i)=>`${i+1}. ${o.name.split("–")[0].trim()}`).join("\n")}\n\n0. Back`;
    if(screen==="service" && sel.org) return `CON ${sel.org.name.split("–")[0].trim()}\nSelect Service:\n\n${sel.org.services.map((s,i)=>`${i+1}. ${s}`).join("\n")}\n\n0. Back`;
    if(screen==="result" && result) return `END ✅ You're Queued!\n\nToken: ${result.token}\nOrg: ${result.org.split("–")[0].trim()}\nService: ${result.service}\n\nYou'll receive\nSMS updates on\nyour position.`;
    return "";
  };

  return (
    <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
      <div style={{
        width:260, background:"#1a1a2e", borderRadius:28, padding:"24px 16px",
        boxShadow:"0 20px 60px rgba(0,0,0,.4)", border:"4px solid #2d2d4e"
      }}>
        {/* phone top */}
        <div style={{display:"flex",justifyContent:"center",marginBottom:12}}>
          <div style={{width:60,height:6,borderRadius:3,background:"#2d2d4e"}}/>
        </div>
        {/* screen */}
        <div style={{
          background:"#e8f5e9", borderRadius:12, padding:14, minHeight:220,
          fontFamily:"'DM Mono',monospace", fontSize:11, lineHeight:1.7,
          color:"#1b5e20", whiteSpace:"pre-wrap", wordBreak:"break-word"
        }}>
          {getDisplay()}
        </div>
        {/* input row */}
        <div style={{marginTop:12,display:"flex",gap:6}}>
          <input
            ref={ref}
            value={input}
            onChange={e=>setInput(e.target.value)}
            onKeyDown={e=>e.key==="Enter"&&handleSend()}
            placeholder="Enter option..."
            style={{
              flex:1, background:"#2d2d4e", border:"none", borderRadius:8,
              padding:"8px 10px", color:"#fff", fontFamily:"'DM Mono',monospace",
              fontSize:12, outline:"none"
            }}
          />
          <button onClick={handleSend} style={{
            background:"var(--teal)", border:"none", borderRadius:8,
            padding:"8px 12px", cursor:"pointer", color:"#fff", fontWeight:700, fontSize:13
          }}>OK</button>
        </div>
        {/* keypad hint */}
        <p style={{textAlign:"center",color:"#555",fontSize:10,marginTop:8,fontFamily:"'DM Mono',monospace"}}>
          USSD Simulator — type option & press OK
        </p>
      </div>
    </div>
  );
};

// ── WhatsApp Simulator ───────────────────────────────────────────────────────
const WhatsAppSim = ({ orgs, onJoin }) => {
  const [msgs, setMsgs] = useState([
    { from:"bot", text:"👋 Hi! Welcome to *QueueEase*.\n\nI can help you join a virtual queue.\n\nReply with:\n• *JOIN [OrgCode]* to join a queue\n• *POS* to check your position\n• *CANCEL* to cancel your ticket\n\n_Example: JOIN GHS001_" }
  ]);
  const [input, setInput] = useState("");
  const [myTicket, setMyTicket] = useState(null);
  const scrollRef = useRef();

  useEffect(()=>{ scrollRef.current?.scrollTo({top:9999,behavior:"smooth"}); },[msgs]);

  const botReply = (text) => {
    setTimeout(()=>{
      setMsgs(m=>[...m,{from:"bot",text}]);
    }, 700);
  };

  const send = () => {
    const v = input.trim();
    if(!v) return;
    setMsgs(m=>[...m,{from:"user",text:v}]);
    setInput("");

    const up = v.toUpperCase();
    if(up.startsWith("JOIN ")) {
      const code = up.split(" ")[1];
      const org = orgs.find(o=>o.id===code);
      if(!org) { botReply(`❌ Org code *${code}* not found.\n\nValid codes:\n${orgs.map(o=>`• ${o.id} — ${o.name.split("–")[0].trim()}`).join("\n")}`); return; }
      const svcList = org.services.map((s,i)=>`${i+1}. ${s}`).join("\n");
      botReply(`✅ *${org.name}*\n\nPlease reply with the service number:\n${svcList}`);
      // store pending join
      setMyTicket({pendingOrg: org});
      return;
    }
    if(myTicket?.pendingOrg && ["1","2","3","4"].includes(v)) {
      const org = myTicket.pendingOrg;
      const svc = org.services[parseInt(v)-1];
      if(!svc) { botReply("❌ Invalid option. Please reply with a valid number."); return; }
      const token = genToken(org.id);
      onJoin&&onJoin({orgId:org.id, service:svc, phone:"+233024111222", channel:"whatsapp", token});
      setMyTicket({token, org:org.name, service:svc});
      botReply(`🎟️ *You're In!*\n\n*Token:* \`${token}\`\n*Org:* ${org.name.split("–")[0].trim()}\n*Service:* ${svc}\n*Position:* #${Math.floor(Math.random()*8)+3}\n*Est. Wait:* ~${Math.floor(Math.random()*20)+8} mins\n\nWe'll message you when you're next. 🙌`);
      return;
    }
    if(up==="POS") {
      if(!myTicket?.token) { botReply("⚠️ You don't have an active ticket. Reply *JOIN [OrgCode]* to get started."); return; }
      botReply(`📍 *Position Update*\n\nToken: \`${myTicket.token}\`\nService: ${myTicket.service}\nYour position: *#4*\nEst. wait: *~16 mins*\n\nWe'll notify you when you're next! ⏳`);
      return;
    }
    if(up==="CANCEL") {
      setMyTicket(null);
      botReply("🚫 Your ticket has been cancelled.\n\nReply *JOIN [OrgCode]* anytime to rejoin.");
      return;
    }
    botReply("🤔 I didn't understand that.\n\nCommands:\n• *JOIN [OrgCode]* — join a queue\n• *POS* — check your position\n• *CANCEL* — cancel ticket");
  };

  return (
    <div style={{
      width:"100%", maxWidth:340, background:"#e5ddd5",
      borderRadius:16, overflow:"hidden",
      boxShadow:"0 8px 40px rgba(0,0,0,.15)"
    }}>
      {/* header */}
      <div style={{background:"#075e54",padding:"12px 16px",display:"flex",alignItems:"center",gap:10}}>
        <div style={{width:36,height:36,borderRadius:"50%",background:"#25d366",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>🤖</div>
        <div>
          <div style={{color:"#fff",fontWeight:700,fontSize:14}}>QueueEase Bot</div>
          <div style={{color:"#a8d5a2",fontSize:11,display:"flex",alignItems:"center",gap:4}}>
            <div className="live-dot" style={{width:6,height:6}}/>
            Online
          </div>
        </div>
      </div>
      {/* messages */}
      <div ref={scrollRef} style={{height:300,overflowY:"auto",padding:12,display:"flex",flexDirection:"column",gap:8,
        backgroundImage:"url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23a8c4b8' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
      }}>
        {msgs.map((m,i)=>(
          <div key={i} style={{display:"flex",justifyContent:m.from==="user"?"flex-end":"flex-start"}}>
            <div style={{
              maxWidth:"80%", padding:"8px 12px", borderRadius:m.from==="user"?"12px 2px 12px 12px":"2px 12px 12px 12px",
              background:m.from==="user"?"#dcf8c6":"#fff",
              fontSize:12, lineHeight:1.5, whiteSpace:"pre-wrap",
              boxShadow:"0 1px 2px rgba(0,0,0,.1)",
              fontFamily:"'DM Sans',sans-serif",
            }} dangerouslySetInnerHTML={{__html:
              m.text.replace(/\*([^*]+)\*/g,"<strong>$1</strong>")
                    .replace(/`([^`]+)`/g,`<code style="background:#f0f0f0;padding:1px 5px;border-radius:4px;font-family:'DM Mono',monospace">${"$1"}</code>`)
                    .replace(/_([^_]+)_/g,"<em>$1</em>")
            }}/>
          </div>
        ))}
      </div>
      {/* input */}
      <div style={{background:"#f0f0f0",padding:"8px 12px",display:"flex",gap:8,alignItems:"center"}}>
        <input
          value={input} onChange={e=>setInput(e.target.value)}
          onKeyDown={e=>e.key==="Enter"&&send()}
          placeholder="Type a message..."
          style={{flex:1,border:"none",borderRadius:999,padding:"9px 14px",fontSize:13,outline:"none",background:"#fff"}}
        />
        <button onClick={send} style={{
          width:36,height:36,borderRadius:"50%",background:"#075e54",
          border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"
        }}>
          <Icon name="arrow" size={16} color="#fff"/>
        </button>
      </div>
    </div>
  );
};

// ── Main App ─────────────────────────────────────────────────────────────────
export default function QueueEase() {
  const [view, setView] = useState("customer"); // customer | admin | analytics | ussd | whatsapp
  const [queue, setQueue] = useState(initQueue);
  const [myTickets, setMyTickets] = useState([]);
  const [toast, setToast] = useState(null);
  const [, setTick] = useState(0); //tick was removed from the first item in the array
   
  // join form state
  const [jOrgId, setJOrgId] = useState(ORGS[0].id);
  const [jSvc, setJSvc] = useState(ORGS[0].services[0]);
  const [jPhone, setJPhone] = useState("");
  const [jChannel, setJChannel] = useState("web");

  // admin state
  const [aOrg, setAOrg] = useState(ORGS[0].id);
  const [aSvc, setASvc] = useState(0);

  useEffect(()=>{ const t=setInterval(()=>setTick(x=>x+1),5000); return()=>clearInterval(t); },[]);

  const showToast = (msg, type="success") => {
    setToast({msg, type});
    setTimeout(()=>setToast(null), 3500);
  };

  const joinQueue = ({orgId, service, phone, channel, token}) => {
    const org = ORGS.find(o=>o.id===orgId);
    const t = {
      id: token || genToken(orgId),
      phone: phone||jPhone||"+233000000000",
      channel,
      status:"waiting",
      joinedAt: new Date(),
      orgId, service, orgName: org.name
    };
    setQueue(q=>{
      const nq = {...q};
      const svcArr = nq[orgId];
      const svcEntry = svcArr.find(s=>s.service===service);
      if(svcEntry) svcEntry.tickets.push(t);
      return nq;
    });
    setMyTickets(m=>[...m, t]);
    showToast(`Token ${t.id} issued! You're in queue.`);
    return t;
  };

  const callNext = (orgId, svcIdx) => {
    setQueue(q=>{
      const nq = {...q};
      const tickets = nq[orgId][svcIdx].tickets;
      const waitIdx = tickets.findIndex(t=>t.status==="waiting");
      if(waitIdx>=0) {
        tickets[waitIdx].status="called";
        showToast(`Called ${tickets[waitIdx].id} — please proceed to counter.`,"info");
      }
      return nq;
    });
  };

  const markDone = (orgId, svcIdx) => {
    setQueue(q=>{
      const nq = {...q};
      const tickets = nq[orgId][svcIdx].tickets;
      const idx = tickets.findIndex(t=>t.status==="called");
      if(idx>=0) { tickets[idx].status="done"; showToast("Marked as served ✓"); }
      return nq;
    });
  };

  const cancelTicket = (ticketId, orgId, service) => {
    setQueue(q=>{
      const nq = {...q};
      const svcEntry = nq[orgId]?.find(s=>s.service===service);
      if(svcEntry) {
        const t = svcEntry.tickets.find(t=>t.id===ticketId);
        if(t) t.status="cancelled";
      }
      return nq;
    });
    setMyTickets(m=>m.filter(t=>t.id!==ticketId));
    showToast("Ticket cancelled.","warning");
  };

  const org = ORGS.find(o=>o.id===jOrgId);
  const adminOrg = ORGS.find(o=>o.id===aOrg);
  const adminQueue = queue[aOrg]?.[aSvc];

  // stats
  const totalWaiting = Object.values(queue).flat().reduce((a,s)=>a+s.tickets.filter(t=>t.status==="waiting").length,0);
  const totalServed  = Object.values(queue).flat().reduce((a,s)=>a+s.tickets.filter(t=>t.status==="done").length,0);
  const totalOrgs    = ORGS.length;

  // const navItems = [
  //   {id:"customer", icon:"ticket", label:"Join Queue"},
  //   {id:"admin",    icon:"users",  label:"Staff Dashboard"},
  //   {id:"analytics",icon:"chart",  label:"Analytics"},
  //   {id:"ussd",     icon:"phone",  label:"USSD Sim"},
  //   {id:"whatsapp", icon:"bell",   label:"WhatsApp Bot"},
  // ];

  return (
    <>
    <GlobalStyle/>
      <div style={{minHeight:"100vh", display:"flex", flexDirection:"column"}}>

        {/* TICKER TAPE */}
        <div className="ticker-wrap">
          <div className="ticker-inner">
            {[...Array(2)].map((_,rep)=>
              ORGS.map(o=>(
                <span key={`${o.id}-${rep}`} className="ticker-item">
                  {o.id} · {o.name.split("–")[0].trim()} · {queue[o.id]?.reduce((a,s)=>a+s.tickets.filter(t=>t.status==="waiting").length,0)} waiting &nbsp;·&nbsp;
                </span>
              ))
            )}
          </div>
        </div>

        {/* HEADER */}
        <header style={{
          background:"var(--card)", borderBottom:"1px solid var(--border)",
          padding:"0 24px", display:"flex", alignItems:"center", justifyContent:"space-between",
          height:60, position:"sticky", top:0, zIndex:100
        }}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{
              width:34,height:34,borderRadius:8,
              background:"linear-gradient(135deg,var(--teal),var(--teal2))",
              display:"flex",alignItems:"center",justifyContent:"center"
            }}>
              <Icon name="queue" size={18} color="#fff"/>
            </div>
            <span className="syne" style={{fontWeight:800,fontSize:18,letterSpacing:"-.02em"}}>QueueEase</span>
          </div>

          {/* desktop nav */}
          <nav style={{display:"flex",gap:2}} className="hide-sm">
            {navItems.map(n=>(
              <button key={n.id} onClick={()=>setView(n.id)} style={{
                border:"none", cursor:"pointer", borderRadius:8,
                padding:"7px 14px", fontSize:13, fontWeight:500,
                background: view===n.id ? "var(--teal)" : "transparent",
                color: view===n.id ? "#fff" : "var(--muted)",
                display:"flex", alignItems:"center", gap:6,
                fontFamily:"'DM Sans',sans-serif",
                transition:"all .18s"
              }}>
                <Icon name={n.icon} size={14}/>
                {n.label}
              </button>
            ))}
          </nav>

          <div style={{display:"flex",alignItems:"center",gap:6}}>
            <div className="live-dot"/>
            <span style={{fontSize:12,color:"var(--muted)"}} className="mono hide-sm">{totalWaiting} active</span>
          </div>
        </header>

        {/* mobile nav */}
        <div style={{
          display:"flex", gap:0, overflowX:"auto", background:"var(--card)",
          borderBottom:"1px solid var(--border)", padding:"0 8px"
        }} className="show-sm">
          {navItems.map(n=>(
            <button key={n.id} onClick={()=>setView(n.id)} style={{
              border:"none", cursor:"pointer", borderRadius:0,
              padding:"10px 14px", fontSize:12, fontWeight:500,
              background:"transparent", whiteSpace:"nowrap",
              color: view===n.id ? "var(--teal)" : "var(--muted)",
              borderBottom: view===n.id ? "2px solid var(--teal)" : "2px solid transparent",
              fontFamily:"'DM Sans',sans-serif",
            }}>
              {n.label}
            </button>
          ))}
        </div>

        {/* TOAST */}
        {toast && (
          <div className="pop" style={{
            position:"fixed", bottom:24, right:24, zIndex:999,
            background: toast.type==="warning"?"#fff8e1":toast.type==="info"?"#e3f2fd":"#e8f5e9",
            border:`1px solid ${toast.type==="warning"?"#ffe082":toast.type==="info"?"#90caf9":"#a5d6a7"}`,
            borderRadius:10, padding:"12px 18px",
            boxShadow:"0 4px 20px rgba(0,0,0,.12)",
            fontSize:13, fontWeight:500, maxWidth:300,
            color: toast.type==="warning"?"#7c5700":toast.type==="info"?"#0d47a1":"#1b5e20"
          }}>
            {toast.msg}
          </div>
        )}

        {/* MAIN */}
        <main style={{flex:1, padding:"28px 20px", maxWidth:1100, margin:"0 auto", width:"100%"}}>
          {view === "landing" && <CitizenLanding onStartQueuing={() => setView("landing")} />}
          {view === "landing" && (
  <>
    <CitizenLanding onStartQueuing={() => setView("customer")} />
    <OfficerLanding onLoginAsOfficer={() => setView("admin")} />
    <ManagerLanding onViewAnalytics={() => setView("analytics")} />
  </>
)}
          {/* ── CUSTOMER VIEW ─────────────────────────────────────── */}
          {view==="customer" && (
            <div className="fade-up">
              <div style={{marginBottom:28}}>
                <h1 className="syne" style={{fontSize:28,fontWeight:800,letterSpacing:"-.02em"}}>Join a Queue</h1>
                <p style={{color:"var(--muted)",marginTop:4,fontSize:14}}>Skip the physical line — get your virtual token in seconds.</p>
              </div>

              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20}} className="col-2">
                {/* JOIN FORM */}
                <div className="card" style={{padding:24,display:"flex",flexDirection:"column",gap:18}}>
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    <Icon name="ticket" size={18} color="var(--teal)"/>
                    <span className="syne" style={{fontWeight:700,fontSize:16}}>New Ticket</span>
                  </div>

                  <div className="field">
                    <label>Organization</label>
                    <select value={jOrgId} onChange={e=>{setJOrgId(e.target.value); setJSvc(ORGS.find(o=>o.id===e.target.value).services[0]);}}>
                      {ORGS.map(o=><option key={o.id} value={o.id}>{o.name}</option>)}
                    </select>
                  </div>

                  <div className="field">
                    <label>Service</label>
                    <select value={jSvc} onChange={e=>setJSvc(e.target.value)}>
                      {org?.services.map(s=><option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>

                  <div className="field">
                    <label>Phone Number</label>
                    <input value={jPhone} onChange={e=>setJPhone(e.target.value)} placeholder="+233 XX XXX XXXX"/>
                  </div>

                  <div className="field">
                    <label>Channel</label>
                    <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                      {Object.entries(CHANNELS).map(([k,v])=>(
                        <button key={k} onClick={()=>setJChannel(k)} className="btn" style={{
                          fontSize:12, padding:"7px 14px",
                          background: jChannel===k ? "var(--teal)" : "var(--cream)",
                          color: jChannel===k ? "#fff" : "var(--muted)",
                          border: `1px solid ${jChannel===k?"var(--teal)":"var(--border)"}`,
                        }}>{v}</button>
                      ))}
                    </div>
                  </div>

                  <button className="btn btn-primary" style={{width:"100%",justifyContent:"center",paddingTop:13,paddingBottom:13}}
                    onClick={()=>joinQueue({orgId:jOrgId, service:jSvc, phone:jPhone, channel:jChannel})}>
                    <Icon name="plus" size={15}/>
                    Get My Token
                  </button>
                </div>

                {/* QUEUE STATUS */}
                <div style={{display:"flex",flexDirection:"column",gap:16}}>
                  {/* org status card */}
                  {org && (() => {
                    const svcEntry = queue[jOrgId]?.find(s=>s.service===jSvc);
                    const waiting = svcEntry?.tickets.filter(t=>t.status==="waiting").length || 0;
                    const called  = svcEntry?.tickets.find(t=>t.status==="called");
                    const cap = 20;
                    return (
                      <div className="card" style={{padding:20}}>
                        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
                          <div>
                            <div style={{fontWeight:700,fontSize:14}}>{org.name.split("–")[0].trim()}</div>
                            <div style={{color:"var(--muted)",fontSize:12}}>{jSvc}</div>
                          </div>
                          <span className="stamp">{jOrgId}</span>
                        </div>
                        <div style={{display:"flex",gap:20,marginBottom:14}}>
                          <div>
                            <div className="syne" style={{fontWeight:800,fontSize:28,color:"var(--teal)"}}>{waiting}</div>
                            <div style={{fontSize:11,color:"var(--muted)",textTransform:"uppercase",letterSpacing:".07em"}}>Waiting</div>
                          </div>
                          <div>
                            <div className="syne" style={{fontWeight:800,fontSize:28}}>{waiting * (org.avgMins||8)}</div>
                            <div style={{fontSize:11,color:"var(--muted)",textTransform:"uppercase",letterSpacing:".07em"}}>Est. mins</div>
                          </div>
                          <div>
                            <div className="syne" style={{fontWeight:800,fontSize:28}}>{org.avgMins}</div>
                            <div style={{fontSize:11,color:"var(--muted)",textTransform:"uppercase",letterSpacing:".07em"}}>Min/person</div>
                          </div>
                        </div>
                        <div className="q-bar" style={{marginBottom:6}}>
                          <div className="q-bar-fill" style={{width:`${Math.min(waiting/cap*100,100)}%`}}/>
                        </div>
                        <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:"var(--muted)"}}>
                          <span>Queue load</span><span>{Math.round(waiting/cap*100)}%</span>
                        </div>
                        {called && (
                          <div style={{marginTop:14,background:"#e8f5e9",border:"1px solid #a5d6a7",borderRadius:8,padding:"10px 14px",fontSize:12}}>
                            🔊 Now Serving: <strong>{called.id}</strong>
                          </div>
                        )}
                      </div>
                    );
                  })()}

                  {/* My tickets */}
                  {myTickets.length>0 && (
                    <div className="card" style={{padding:20}}>
                      <div style={{fontWeight:700,fontSize:14,marginBottom:14,display:"flex",alignItems:"center",gap:6}}>
                        <Icon name="ticket" size={15} color="var(--teal)"/>
                        My Active Tickets
                      </div>
                      <div style={{display:"flex",flexDirection:"column",gap:10}}>
                        {myTickets.map(t=>{
                          const svcEntry = queue[t.orgId]?.find(s=>s.service===t.service);
                          const pos = svcEntry?.tickets.filter(x=>x.status==="waiting").findIndex(x=>x.id===t.id) ?? -1;
                          return (
                            <div key={t.id} className="ticket-card" style={{padding:16}}>
                              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                                <span className="mono" style={{fontWeight:700,fontSize:16,color:"var(--teal)"}}>{t.id}</span>
                                <span className="ch-badge">{CHANNELS[t.channel]}</span>
                              </div>
                              <div style={{fontSize:12,color:"var(--muted)",marginBottom:10}}>{t.orgName.split("–")[0].trim()} · {t.service}</div>
                              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                                <div style={{fontSize:13}}>
                                  {pos>=0 ? <><strong>#{pos+1}</strong> in line · ~{(pos+1)*(ORGS.find(o=>o.id===t.orgId)?.avgMins||8)} mins</> : <span style={{color:"var(--teal)"}}>✅ Being served</span>}
                                </div>
                                <button className="btn btn-danger" style={{fontSize:11,padding:"5px 10px"}}
                                  onClick={()=>cancelTicket(t.id, t.orgId, t.service)}>
                                  Cancel
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ── ADMIN / STAFF VIEW ────────────────────────────────── */}
          {view==="admin" && (
            <div className="fade-up">
              <div style={{marginBottom:28}}>
                <h1 className="syne" style={{fontSize:28,fontWeight:800}}>Staff Dashboard</h1>
                <p style={{color:"var(--muted)",fontSize:14,marginTop:4}}>Manage queues, call customers, mark served.</p>
              </div>

              {/* org + service picker */}
              <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:24}}>
                <div className="field" style={{flex:1,minWidth:200}}>
                  <label>Organization</label>
                  <select value={aOrg} onChange={e=>{setAOrg(e.target.value);setASvc(0);}}>
                    {ORGS.map(o=><option key={o.id} value={o.id}>{o.name}</option>)}
                  </select>
                </div>
                <div className="field" style={{flex:1,minWidth:180}}>
                  <label>Service Window</label>
                  <select value={aSvc} onChange={e=>setASvc(parseInt(e.target.value))}>
                    {adminOrg?.services.map((s,i)=><option key={s} value={i}>{s}</option>)}
                  </select>
                </div>
              </div>

              {/* action bar */}
              <div style={{display:"flex",gap:10,marginBottom:20,flexWrap:"wrap"}}>
                <button className="btn btn-primary" onClick={()=>callNext(aOrg,aSvc)}>
                  <Icon name="bell" size={15}/>
                  Call Next
                </button>
                <button className="btn btn-ghost" onClick={()=>markDone(aOrg,aSvc)}>
                  <Icon name="check" size={15}/>
                  Mark Served
                </button>
                <button className="btn btn-ghost" onClick={()=>setTick(x=>x+1)}>
                  <Icon name="refresh" size={15}/>
                  Refresh
                </button>
              </div>

              {/* queue table */}
              <div className="card" style={{overflow:"hidden"}}>
                <div style={{padding:"16px 20px",borderBottom:"1px solid var(--border)",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <span style={{fontWeight:700,fontSize:14}}>
                    {adminOrg?.services[aSvc]} — Queue
                  </span>
                  <span className="mono" style={{fontSize:12,color:"var(--muted)"}}>
                    {adminQueue?.tickets.filter(t=>t.status==="waiting").length || 0} waiting
                  </span>
                </div>
                <div style={{overflowX:"auto"}}>
                  <table className="tbl">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Token</th>
                        <th>Phone</th>
                        <th>Channel</th>
                        <th>Joined</th>
                        <th>Est. Wait</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {adminQueue?.tickets.map((t,i)=>{
                        const waitPos = adminQueue.tickets.filter(x=>x.status==="waiting").findIndex(x=>x.id===t.id);
                        return (
                          <tr key={t.id}>
                            <td style={{color:"var(--muted)",fontFamily:"'DM Mono',monospace",fontSize:12}}>{i+1}</td>
                            <td><span className="mono" style={{fontWeight:600}}>{t.id}</span></td>
                            <td style={{color:"var(--muted)",fontSize:12}}>{t.phone}</td>
                            <td><span className="ch-badge">{CHANNELS[t.channel]}</span></td>
                            <td style={{color:"var(--muted)",fontSize:12}}>{fmtTime(t.joinedAt)}</td>
                            <td style={{fontSize:12}}>
                              {t.status==="waiting" ? `~${(waitPos+1)*adminOrg.avgMins} min` : "—"}
                            </td>
                            <td>
                              {t.status==="waiting" && <span className="stamp amber">Waiting</span>}
                              {t.status==="called"  && <span className="stamp" style={{animation:"pulse 1s ease-in-out infinite"}}>Called ▸</span>}
                              {t.status==="done"    && <span className="stamp" style={{opacity:.5}}>Done ✓</span>}
                              {t.status==="cancelled"&&<span className="stamp rose">Cancelled</span>}
                            </td>
                          </tr>
                        );
                      })}
                      {(!adminQueue?.tickets.length) && (
                        <tr><td colSpan={7} style={{textAlign:"center",padding:32,color:"var(--muted)"}}>Queue is empty</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ── ANALYTICS VIEW ───────────────────────────────────── */}
          {view==="analytics" && (
            <div className="fade-up">
              <div style={{marginBottom:28}}>
                <h1 className="syne" style={{fontSize:28,fontWeight:800}}>Analytics</h1>
                <p style={{color:"var(--muted)",fontSize:14,marginTop:4}}>Live platform metrics across all organizations.</p>
              </div>

              {/* stat row */}
              <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16,marginBottom:24}} className="col-2">
                {[
                  {label:"Total Waiting", val:totalWaiting, color:"var(--teal)"},
                  {label:"Served Today",  val:totalServed,  color:"var(--amber)"},
                  {label:"Orgs Live",     val:totalOrgs,    color:"var(--ink)"},
                  {label:"Avg Wait (min)",val:Math.round(ORGS.reduce((a,o)=>a+o.avgMins,0)/ORGS.length), color:"var(--rose)"},
                ].map(s=>(
                  <div key={s.label} className="stat-box">
                    <div className="stat-val" style={{color:s.color}}>{s.val}</div>
                    <div className="stat-lbl">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* per-org breakdown */}
              <div className="card" style={{padding:24,marginBottom:20}}>
                <h3 className="syne" style={{fontWeight:700,marginBottom:18,fontSize:16}}>Queue Load by Organization</h3>
                <div style={{display:"flex",flexDirection:"column",gap:18}}>
                  {ORGS.map(o=>{
                    const w = queue[o.id]?.reduce((a,s)=>a+s.tickets.filter(t=>t.status==="waiting").length,0)||0;
                    const d = queue[o.id]?.reduce((a,s)=>a+s.tickets.filter(t=>t.status==="done").length,0)||0;
                    const pct = Math.min(w/20*100,100);
                    return (
                      <div key={o.id}>
                        <div style={{display:"flex",justifyContent:"space-between",marginBottom:6,fontSize:13}}>
                          <span style={{fontWeight:600}}>{o.name.split("–")[0].trim()}</span>
                          <span style={{color:"var(--muted)"}}>{w} waiting · {d} served</span>
                        </div>
                        <div className="q-bar">
                          <div className="q-bar-fill" style={{
                            width:`${pct}%`,
                            background: pct>70 ? "linear-gradient(90deg,var(--rose),#ff8a65)"
                                       : pct>40 ? "linear-gradient(90deg,var(--amber),#ffca28)"
                                       : "linear-gradient(90deg,var(--teal),var(--teal2))"
                          }}/>
                        </div>
                        <div style={{display:"flex",gap:12,marginTop:6,flexWrap:"wrap"}}>
                          {o.services.map(svc=>{
                            const se = queue[o.id]?.find(s=>s.service===svc);
                            const sw = se?.tickets.filter(t=>t.status==="waiting").length||0;
                            return (
                              <span key={svc} style={{fontSize:11,color:"var(--muted)"}}>
                                {svc}: <strong>{sw}</strong>
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* channel distribution */}
              <div className="card" style={{padding:24}}>
                <h3 className="syne" style={{fontWeight:700,marginBottom:18,fontSize:16}}>Channel Distribution</h3>
                <div style={{display:"flex",gap:16,flexWrap:"wrap"}}>
                  {Object.entries(CHANNELS).map(([k,v])=>{
                    const count = Object.values(queue).flat()
                      .flatMap(s=>s.tickets).filter(t=>t.channel===k).length;
                    const total = Object.values(queue).flat().flatMap(s=>s.tickets).length||1;
                    const pct = Math.round(count/total*100);
                    return (
                      <div key={k} style={{flex:"1 1 120px",textAlign:"center",padding:16,background:"var(--paper)",borderRadius:10,border:"1px solid var(--border)"}}>
                        <div style={{fontSize:24,marginBottom:6}}>{v.split(" ")[0]}</div>
                        <div className="syne" style={{fontWeight:800,fontSize:22}}>{pct}%</div>
                        <div style={{fontSize:11,color:"var(--muted)",textTransform:"uppercase",letterSpacing:".07em"}}>{k}</div>
                        <div style={{fontSize:12,color:"var(--muted)",marginTop:2}}>{count} tickets</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </main>

        {/* FOOTER */}
        <footer style={{borderTop:"1px solid var(--border)",padding:"16px 24px",display:"flex",justifyContent:"space-between",alignItems:"center",background:"var(--card)"}}>
          <span className="syne" style={{fontWeight:800,fontSize:13}}>QueueEase</span>
          <span style={{fontSize:11,color:"var(--muted)"}}>Prototype · All channels · Real-time queue management</span>
        </footer>
      </div>
    </>
  );
}
