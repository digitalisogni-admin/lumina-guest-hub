# Lumina AI Concierge — Smart TV Web App

A 10-foot UI hospitality concierge designed for 1920×1080 TV screens, optimized for D-pad/remote navigation with large typography, high-contrast surfaces, and a refined hotel aesthetic.

## Design System

**Palette** (semantic tokens in `index.css`)

- Background `#F8FAFC` · Surface `#FFFFFF` · Primary `#0F172A`
- AI Accent `#6366F1` (indigo) · Text primary `#0F172A` · Muted `#475569`
- Status: Pending (amber), En Route (indigo), Completed (emerald)
- Focus ring: 3px solid indigo with 2px offset for remote visibility

**Typography**

- Headings: **Playfair Display** (serif, hotel-luxury feel) — 32–56px
- UI/Body: **Inter** — 20–28px (TV-readable minimum)
- Type scale: 20 / 24 / 28 / 32 / 40 / 48 / 56

**Spacing & shape**

- 8px base scale, generous 24–48px gutters
- Cards: 24px radius, soft shadow, white surface on slate background
- Min interactive target: 64×64px

**Motion**: Subtle 200ms fades only; honors `prefers-reduced-motion`.

## Screens (Routes)

### 1. `/` — Welcome Dashboard

- Top bar: Lumina logo, room number, guest greeting, current time/weather
- Hero left: **Room info card** (Suite 1204, check-out date, Wi-Fi, digital key QR, NFC keys to google/apple wallet to open door) 
- Hero right: **Quick-action tile grid** (5 large tiles, focus-ringed):
  - Room Service · Spa · Maintenance · Dining · Extend Stay
- Bottom rail: "Talk to Lumina" CTA → opens AI Concierge

### 2. `/concierge` — AI Concierge

- Persistent **context pill** at top: `Suite 1204 · Apr 22–26 · Vegan, Quiet floor`
- Center: chat transcript with large message bubbles
  - Guest bubbles right-aligned (slate)
  - Lumina bubbles left-aligned with indigo accent + AI avatar
- **JSON-driven UI cards** rendered inline (mapped from `ui_component.type`):
  - `QuickReply` — horizontal chip rail, focusable
  - `RoomCard` — service preview with image, price, CTA
  - `StatusTracker` — inline progress for in-flight requests
  - `Carousel` — scrollable recommendations (dining, spa)
- Bottom bar: large input + **voice mic button** (simulated, animated waveform)
- Suggested replies surface as focusable chips below latest reply

### 3. `/services` — Service Tracker

- Active requests list, each as a wide card with:
  - Large service icon · Title · ETA badge
  - **3-step progress tracker**: Pending → En Route → Completed
  - Live updates simulated via mock SSE hook (status advances every ~8s)
- Empty state with CTA to request a service via concierge

### 4. `/stay` — Booking & Stay Management

- Reservation summary card (dates, room, guests, total)
- **Modify dates** — date range picker
- **Add services** — checkbox list (breakfast, late checkout, airport transfer) with running total
- **Checkout info** panel — folio summary, payment method, express checkout CTA

## Architecture

```
src/
├── components/
│   ├── tv/              # TVShell, TopBar, FocusRing, RemoteHint
│   ├── concierge/       # ChatBubble, ContextPill, VoiceButton, MessageList
│   ├── ui-cards/        # RoomCard, StatusTracker, QuickReply, Carousel
│   └── ui/              # shadcn primitives
├── routes/              # TanStack Start file-based routes
│   ├── __root.tsx       # TVShell, providers, global remote handler
│   ├── index.tsx        # Welcome Dashboard
│   ├── concierge.tsx
│   ├── services.tsx
│   └── stay.tsx
├── hooks/
│   ├── useRemoteNav.ts  # Arrow keys → focus movement, Enter, Back
│   ├── useFocusTrap.ts  # Modal focus containment
│   └── useMockSSE.ts    # Simulated real-time status stream
├── lib/
│   ├── mockAI.ts        # Returns { response, ui_component, backend_action }
│   ├── uiParser.tsx     # Maps ui_component.type → React component
│   └── mockData.ts      # Guest, room, reservation, services
└── context/
    ├── GuestContext.tsx
    ├── AISessionContext.tsx
    └── ServiceContext.tsx
```

> Note: This template uses **TanStack Router** (file-based routes in `src/routes/`), not React Router DOM. Navigation will use `<Link to="...">` from `@tanstack/react-router` — same UX, type-safe routes.

## Remote / Keyboard Navigation

- Global `useRemoteNav` listens for ArrowUp/Down/Left/Right, Enter, Escape (Back)
- Spatial focus model: every interactive element has `tabIndex={0}` + visible focus ring
- Arrow keys move to nearest focusable in that direction (geometric proximity)
- Escape navigates back via router history; Enter activates focused element
- Focus trap in modals (date picker, confirm dialogs)
- On-screen "Remote hints" footer (← → ↑ ↓ Select · ⏎ Back)

## Mock AI Contract

```ts
{
  response: { text: string, suggested_replies: string[] },
  ui_component: { type: "RoomCard"|"StatusTracker"|"QuickReply"|"Carousel", props: {...} } | null,
  backend_action: { kind: "create_request"|"book"|"none", payload?: {...} } | null
}
```

- `mockAI.ts` returns scripted responses based on intent keywords (spa, dinner, late checkout, etc.)
- `uiParser.tsx` switch-maps `type` → component, gracefully ignores unknown types
- `backend_action` dispatches into ServiceContext to create a tracked request

## Real-time Simulation

- `useMockSSE` opens a fake stream that emits status transitions every 6–10s for active requests
- Updates flow into ServiceContext → re-renders Service Tracker cards live

## Accessibility

- WCAG 2.1 AA contrast across all text (primary on bg ≥ 16:1)
- All interactive targets ≥ 64×64px
- `prefers-reduced-motion` disables fades
- Semantic landmarks (`<main>`, `<nav>`), aria-live for status updates and new chat messages

## Deliverables

- Fully runnable app with placeholder guest "Ms. Eleanor Chen", Suite 1204, Apr 22–26
- Pre-seeded: 1 in-flight spa booking, 1 pending room service order
- Clean comments throughout `mockAI`, `uiParser`, and remote nav hook