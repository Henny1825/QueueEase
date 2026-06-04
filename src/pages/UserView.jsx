import TicketCard from "../components/TicketCard"

export default function UserView({ myTickets = [], queue = {}, ORGS = [] }) {
  return (
    <>
      {myTickets.length > 0 && (
        <>
          {myTickets.map(t => {
            const svcEntry = queue[t.orgId]?.find(s => s.service === t.service);
            const pos = svcEntry?.tickets.filter(x => x.status === "waiting").findIndex(x => x.id === t.id) ?? -1;
            const org = ORGS.find(o => o.id === t.orgId);
            const avgWait = (pos + 1) * (org?.avgMins || 8);

            return (
              <TicketCard
                key={t.id}
                ticket={t}
                position={pos}
                org={org}
                estimatedWait={avgWait}
              />
            );
          })}
        </>
      )}
    </>
  );
}
