# Turnkey Onboarding — Proof of Concept

*Prepared by Ferhan*

A clickable, web-based POC of the turnkey store onboarding feature described in the
client document **"Step by Step Turnkey Merch Setup"**. It shows how the current
"email us at the end of every step" flow becomes a self-serve portal plus a CPOD
build queue.

Everything is simulated inside one file — no backend, no network calls, nothing
is stored anywhere except the browser's own localStorage (cleared with the
Reset button).

## How to run it

Open `index.html` in any browser. Double-clicking the file works — no server,
no install. It can be emailed or screen-shared as-is.

## 2-minute demo script

The demo is written for a non-technical audience: a stepper across the top
shows the whole journey, and each screen is one simple action. Technical
implementation notes are hidden behind the **⚙ Behind the scenes** toggle in
the top bar — leave it off when showing a client, turn it on when talking to
the team.

1. **Start Here** — the three path buttons on the first screen (a requirement
   from the Handoff Pack). Click **Path A**.
2. **Step 1** — click *Fill with example*, then **Send name for review**.
   The stepper shows the step in review (⏳); Step 2 stays locked.
3. Switch to the **CPOD team** view (top right). The name sits in the build
   queue as *Needs review* — click **Approve** (or *Ask to revise* to show the
   feedback loop).
4. Back in **Client** view: Step 1 is now a green check in the stepper and
   Step 2 is open. *Fill with example* and confirm Steps 2–6 (note Step 3 asks
   the GST/QST question, and Steps 4–5 refuse bank numbers and passwords by
   design).
5. **Step 7** — choose file (mock), send brand materials. **Payment** — the
   $1,000 CAD mock checkout. **Step 8** — grant access.
6. The **two-key gate**: access + materials both in → the 3–5 business day
   clock starts, with a due date.
7. Switch to **CPOD team**: the build card shows the SLA countdown, the
   **tax hard-stop** (fires if the client registered for GST/QST but never
   entered the numbers in Shopify), and the build checklist. *Check all*,
   then **Complete build + send handover**.
8. Client view again: the **handover screen** — confetti, video library,
   support email, onboarding call, 7-day review window, what's next.
9. Reset the demo and click **Path C** to show the app-only flow with its own
   mini-stepper: install → billing → link an existing product with variant
   mapping. No $1,000 fee.

## What is mocked vs. what would be real

| POC element | Production implementation |
|---|---|
| Step forms + gating | Onboarding portal on the marketing site; per-step state in Postgres (new Prisma models) |
| Logo "upload" | Existing **media** microservice, validation at the door |
| $1,000 payment | Stripe Checkout via the existing **stripe** microservice |
| "I've granted access" checkbox | Detected via the Shopify API, timestamped |
| Two-key build clock | Server-side timestamps; auto-sends the "we have everything, we start today" email (events service) |
| Admin build checklist | Build-queue dashboard; provisioning pipeline (master theme + policies + pages via ShopifyService) does most tasks automatically |
| Approve / revise name | Admin action + client notification email |
| Day-7/14 client check-ins, stall recovery | Scheduled jobs (Bull queue) driven by the same per-step state |

Implementation notes are embedded on each screen (dashed boxes) but hidden by
default — flip the **⚙ Behind the scenes** toggle in the top bar to show them.

## Not covered by this POC

- Step 9 (product creation) and Step 10 (launch) — those live in the
  DropShipPOD app itself and are only referenced on the handover screen.
- Real auth, emails, file storage, payments.
- French versions of the portal copy.
