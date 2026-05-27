# QueueEase

Smart queue management system for government offices, hospitals, and banks in Nigeria & Ghana.

## What is QueueEase?

Citizens skip physical lines. Officers manage queues in real-time. Managers track performance—all through WhatsApp, Web, SMS, or USSD.

## Features

- **For Citizens:** Join queues via WhatsApp, Web, SMS, or USSD. Get a token. Track your position.
- **For Officers:** Real-time queue dashboard. Call next customer. Mark served. Track performance.
- **For Managers:** Live analytics. Queue load by organization. Channel distribution. Performance metrics.
- **USSD & WhatsApp:** Works on any phone. No internet required for USSD. SMS updates.

## Tech Stack

- **Frontend:** React 18, React Router, Context API, Tailwind CSS, Recharts
- **State:** React Context API (no Redux)
- **Styling:** CSS-in-JS + Tailwind
- **Build:** Vite
- **Fonts:** Syne, DM Sans, DM Mono

## Project Structure

```
src/
├── App.jsx                 (Main app, state management)
├── pages/
│   ├── UserLanding.jsx    (Citizen landing page)
│   ├── OfficerLanding.jsx (Officer landing page)
│   ├── ManagerLanding.jsx (Manager landing page)
│   ├── CustomerView.jsx   (Join queue view)
│   ├── AdminView.jsx      (Staff dashboard)
│   └── AnalyticsView.jsx  (Analytics dashboard)
├── main.jsx
└── App.css
```

## Getting Started

### Install

```bash
npm install
```

### Run Locally

```bash
npm run dev
```

Visit `http://localhost:5173`

### Build

```bash
npm run build
```

## Views

1. **Landing Page** → 3 landing pages (Citizen, Officer, Manager)
2. **Join Queue** → Citizens select org, service, phone, channel
3. **Staff Dashboard** → Officers call next, mark served, view queue
4. **Analytics** → Managers see metrics, queue load, channel stats
5. **USSD Simulator** → Mock USSD flow (`*384*ORGCODE#`)
6. **WhatsApp Bot** → Mock WhatsApp interactions

## Organizations (Demo Data)

- Ghana Health Service (GHS001)
- DVLA Licensing Office (DVLA02)
- Ghana Revenue Authority (GRA003)
- National ID Authority (NIA004)

## Channels

- 🌐 Web
- 💬 WhatsApp
- 📱 SMS
- 📟 USSD

## Navigation

Use the navbar buttons to switch between views. Landing page shows all 3 landing pages stacked.

## Future Enhancements

- Backend API integration (queue, auth, analytics)
- Real USSD gateway (Africa's Talking, Hubtel)
- Real WhatsApp Business API
- SMS notifications
- User authentication
- Database storage

## Team

QueueEase — 6-week alumni buildathon project.

## License

MIT

