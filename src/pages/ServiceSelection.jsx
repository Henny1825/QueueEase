import { useState, useEffect } from "react";

const getGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return "Good Morning";
  if (h < 17) return "Good Afternoon";
  return "Good Evening";
};

export default function ServiceSelection({ orgs, queue, onJoinQueue, apiFetch }) {
  const [search, setSearch] = useState("");
  const [selectedKey, setSelectedKey] = useState(null);

  // Fetch services
  useEffect(() => {
    const getServices = async() => {
      const data = await apiFetch('/service');
      console.log(data);
    }

    getServices;

  }, []);
  

  const allServices = orgs.flatMap(o =>
    o.services.map(s => ({
      key: `${o.id}::${s}`,
      orgId: o.id,
      orgName: o.name.split("–")[0].trim(),
      service: s,
      avgMins: o.avgMins,
    }))
  );

  const filtered = allServices.filter(item => {
    const q = search.toLowerCase();
    return item.service.toLowerCase().includes(q) || item.orgName.toLowerCase().includes(q);
  });

  const waitingCount = (orgId, service) =>
    queue[orgId]?.find(s => s.service === service)?.tickets.filter(t => t.status === "waiting").length || 0;

  const handleJoin = () => {
    if (!selectedKey) return;
    const [orgId, service] = selectedKey.split("::");
    onJoinQueue({ orgId, service });
  };

  return (
    <div className="fade-up">
      <div style={{marginBottom:24}}>
        <h1 className="syne" style={{fontSize:26,fontWeight:800,letterSpacing:"-.02em"}}>{getGreeting()}</h1>
        <p style={{color:"var(--muted)",marginTop:4,fontSize:14}}>What service would you like to access today?</p>
      </div>

      <div className="field" style={{marginBottom:24}}>
        <input
          placeholder="Search for a service"
          value={search}
          onChange={e=>setSearch(e.target.value)}
        />
      </div>

      <div style={{fontSize:12,fontWeight:600,textTransform:"uppercase",letterSpacing:".07em",color:"var(--muted)",marginBottom:12}}>
        Popular Services
      </div>

      <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:28}}>
        {filtered.map(item => {
          const selected = selectedKey === item.key;
          const waiting = waitingCount(item.orgId, item.service);
          return (
            <div
              key={item.key}
              onClick={()=>setSelectedKey(item.key)}
              className="card"
              style={{
                padding:16,
                display:"flex",
                justifyContent:"space-between",
                alignItems:"center",
                cursor:"pointer",
                borderColor: selected ? "var(--teal)" : "var(--border)",
                borderWidth: selected ? 2 : 1,
              }}
            >
              <div style={{display:"flex",gap:12,alignItems:"center"}}>
                <div style={{
                  width:44,height:44,borderRadius:10,
                  background: selected ? "var(--teal)" : "var(--cream)",
                  display:"flex",alignItems:"center",justifyContent:"center",
                  fontSize:18,
                  color: selected ? "#fff" : "var(--teal)"
                }}>
                  🎫
                </div>
                <div>
                  <div style={{fontWeight:700,fontSize:14}}>{item.service}</div>
                  <div style={{fontSize:12,color:"var(--muted)"}}>{item.orgName}</div>
                </div>
              </div>
              <div style={{textAlign:"right"}}>
                <div style={{fontSize:12,color:"var(--muted)"}}>{waiting} waiting</div>
                <div style={{fontSize:11,color:"var(--muted)"}}>{item.avgMins} min/person</div>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div style={{textAlign:"center",padding:24,color:"var(--muted)",fontSize:13}}>
            No services match "{search}"
          </div>
        )}
      </div>

      <button
        className="btn btn-primary"
        disabled={!selectedKey}
        onClick={handleJoin}
        style={{width:"100%",justifyContent:"center",padding:"14px 20px",fontSize:15}}
      >
        Join Queue
      </button>
    </div>
  );
}