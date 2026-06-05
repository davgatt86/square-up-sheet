# Square-Up Sheet

Mobile-first data-entry form for trip square-ups. Crew (with saved roster), bond invoice parsing, fuel, labour, foreign crew bonus — all rolled into a printable A4 PDF for the office.

Built on the same stack as `trip-gross-estimator` (Vite + React + Netlify).

## What it does

- **Crew & shares** — add crew, save them to a roster (bookmark icon) so next trip is a tap to add. Share dropdown (Full, 7/8, 6/8, 5/8, 4/8, Custom). Bonus is a typed %.
- **Bond** — upload a PDF invoice (60N Bond Ltd format auto-parses; others should work if they have the same 7-column structure). Each line item gets a dropdown to assign to a crewman or to Stores (boat pays). Manual items are also supported.
- **Quota recovery** — dropdown 0–10%.
- **Fuel** — location, date, litres. Multiple entries.
- **Logistics / transport** — free text.
- **Labour** — name, boxes (optional), £ (optional).
- **Foreign crew bonus** — free text.

Form **auto-saves** to localStorage. Roster persists across trips. Reset icon (top-right) clears the trip but keeps the roster.

## PDF output

The **Share PDF** button generates a real PDF and opens the iOS/Android share sheet (WhatsApp, Mail, Save to Files, etc) using the Web Share API. Falls back to a plain download on desktop browsers that don't support file sharing.

The **Print** button is still there as a fallback — uses native browser print, which on iOS Safari lets you Save to Files but with a less direct UX.

## Local setup

```sh
npm install
npm run dev
```

Opens at `http://localhost:5173`.

## Build

```sh
npm run build
```

Output is in `dist/`.

## Deploy to Netlify

Same pattern as your other apps:

1. Push this repo to GitHub (e.g. `github.com/davgatt86/squareup-sheet`).
2. In Netlify, **Add new site → Import from GitHub** → pick this repo.
3. Build command and publish directory are already set in `netlify.toml` (`npm run build` → `dist`).
4. Deploy.

The SPA redirect rule in `netlify.toml` is in place if you ever add client-side routing later (not used yet).

## Project layout

```
src/
├── main.jsx              entry point
├── main.css              global styles
├── App.jsx               main app, trip state, autosave
├── BondSection.jsx       bond items + invoice upload + per-crew assignment
├── Preview.jsx           on-screen preview + Share/Print buttons
├── ui.jsx                shared UI building blocks (Section, IconBtn, inputs)
├── constants.js          colour palette, share/quota options
├── helpers.js            date, share, money formatters
├── storage.js            localStorage wrapper (roster + autosaved trip)
├── invoiceParser.js      pdf.js-based bond invoice parser
└── pdfGenerator.js       jsPDF document builder + Web Share helper
```

## Adding a new vessel / starting fresh

The vessel is editable per-trip — defaults to "Audacious BF83" but you can type any name. If you use this for Boy Andrew or the pair team and the crew is different, the **Reset** button (circular arrow, top right) clears the trip form but keeps the roster.

If you want **per-vessel rosters** later, that's a one-line change in `storage.js` (key the roster by vessel name) and a small UI to switch.

## Bond invoice parsing — supported formats

Tuned for **60N Bond Ltd** invoices (7 columns: Description, Qty/Hrs, Price/Rate, Net, %VAT, VAT, Total). The parser is fairly generic — any invoice with a row ending in 6 decimal numbers after a description will be picked up. If you get an invoice from a different supplier that doesn't parse cleanly, send a PDF and we can extend the parser.

Items default to **Unassigned** (highlighted red on the bond row) — you have to tap each one and assign it to a crewman or to Stores. The PDF will show an "Unassigned (review)" line in red if you forget any.

## Known iOS quirk

If you add the app to your home screen (Share → Add to Home Screen), it opens like a native app. The Share PDF button works exactly the same in standalone mode.

## Stack

React 18 · Vite 6 · jsPDF 2.5 · pdfjs-dist 4.7 · lucide-react · vanilla CSS (no framework)
