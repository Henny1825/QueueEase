import TicketCard from "../components/TicketCard"

export default function UserView({ 
  queue = {}, myTickets = [], joinQueue,
  ORGS = [], CHANNELS = {}, org,
  jOrgId, setJOrgId, jSvc, setJSvc,
  jPhone, setJPhone, jChannel, setJChannel,
  Icon
}) {
  return (
    <div className="fade-up">
      <div style={{marginBottom:28}}>
        <h1 className="syne" style={{fontSize:28,fontWeight:800,letterSpacing:"-.02em"}}>Join a Queue</h1>
        <p style={{color:"var(--muted)",marginTop:4,fontSize:14}}>Skip the physical line — get your virtual token in seconds.</p>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20}} className="col-2">
        {/* LEFT: JOIN FORM */}
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

        {/* RIGHT: TICKET CARD */}
        <div style={{display:"flex",flexDirection:"column",gap:16}}>
          {myTickets.length > 0 && (
            <>
              {myTickets.map(t => {
                const svcEntry = queue[t.orgId]?.find(s => s.service === t.service);
                const pos = svcEntry?.tickets.filter(x => x.status === "waiting").findIndex(x => x.id === t.id) ?? -1;
                const ticketOrg = ORGS.find(o => o.id === t.orgId);
                const avgWait = (pos + 1) * (ticketOrg?.avgMins || 8);

                return (
                  <TicketCard 
                    key={t.id}
                    ticket={t}
                    position={pos}
                    org={ticketOrg}
                    estimatedWait={avgWait}
                  />
                );
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
}