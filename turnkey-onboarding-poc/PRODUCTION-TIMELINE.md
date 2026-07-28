# Turnkey Store Onboarding — Production Timeline

*Prepared by Ferhan · CheapestPrintOnDemand.ca*

This is the build plan for turning the interactive preview into the real,
production system: a client onboarding portal on the website, plus the CPOD
team's build-queue dashboard behind it.

**Total duration: 4–5 weeks of development.**

The system reuses infrastructure that already exists in the CPOD platform
(file uploads, Stripe payments, Shopify integration, email notifications,
background jobs), which is what makes this timeline possible.

---

## Week 1 — Foundations & client portal core

| Deliverable | Details |
|---|---|
| Data model | Client onboarding records: path (A/B/C), per-step state, timestamps, payment status, build status |
| Client accounts | Sign-up / sign-in for onboarding clients, secure sessions |
| Portal skeleton | Landing page with the three path buttons, stepper UI, step gating engine (a step unlocks only when the previous one is complete) |
| Path selection | Path A/B start the full flow; Path C routes to the app-install flow |

**End of week 1:** a client can create an account, pick a path, and see their
step-by-step journey.

---

## Week 2 — The eight steps

| Deliverable | Details |
|---|---|
| Steps 1–6 forms | Business name + four checks, Shopify/domain confirmation, registration + GST/QST question, bank confirmation, Shopify Payments confirmation, files/costs acknowledgments |
| Name review flow | Step 1 goes to CPOD for approval; approve unlocks Step 2, "ask to revise" sends it back with a note |
| Step 7 uploads | Logo and brand material uploads direct to CPOD's media service, with file validation (format, size, transparency) |
| Client emails | Automatic notifications: name approved, step confirmed, reminders |
| Safety rails | Forms never accept bank numbers or passwords — by design |

**End of week 2:** the full client homework journey (Steps 1–7) works end to end.

---

## Week 3 — Payment, access & the build clock

| Deliverable | Details |
|---|---|
| $1,000 payment | Stripe Checkout in CAD, receipt emailed, payment recorded against the client's build |
| Step 8 access | Staff-access instructions; system verifies access via the Shopify API and timestamps it |
| Two-key build clock | The 3–5 business day clock starts automatically only when **both** store access and brand materials are in; the "we have everything, we start today" email goes out on its own |
| Client build view | The client sees the two keys, the clock, the due date, and live build progress |

**End of week 3:** a client can go from sign-up to paid, access granted, and
build clock running — with zero manual email handling.

---

## Week 4 — CPOD team dashboard

| Deliverable | Details |
|---|---|
| Build queue | One row per client: path, stage, whose move it is, due dates |
| Review inbox | Pending name approvals with approve / revise actions |
| Build checklist | Per-store task list (app install, branding, policies, checkout/shipping/tax, test order, mobile check) with SLA countdown |
| Tax gate | Hard stop before launch if a GST/QST-registered client hasn't confirmed their numbers in Shopify |
| Handover | One-click handover: email with video library link, support address, onboarding-call booking, 7-day review window |
| Stall recovery | Automatic client check-ins at day 7 / 14 when a step sits untouched, and after handover if no products are published |

**End of week 4:** the CPOD team runs every client from one screen.

---

## Week 5 — Master store template & launch

This is where the store build itself gets industrialized. Instead of building
every client store from scratch, we build **one common store codebase — a
master template** — and every client store is created from it.

| Deliverable | Details |
|---|---|
| Master store template | One proven, conversion-tested store codebase (theme): layout, navigation, standard pages, cart and checkout flow — built once, reused for **every** store |
| Branding variables | The template exposes exactly what changes per store: logo, brand colours, store name, contact details, policy placeholders. Nothing else needs touching per client |
| Provisioning pipeline | When a build starts, the system pushes the master template to the client's store, applies their branding from Step 7, installs the four policies (EN + FR, per-store variables filled), and creates the standard pages via the existing Shopify integration |
| Path C flow | Install → billing → link-products onboarding for existing-store clients |
| End-to-end testing | Full dry run on a development store: every path, every step, every email, one complete store build from the template |
| Deployment | Production release, monitoring, and a real first-client walkthrough checklist |

**End of week 5: live.** The first real client can be onboarded through the
portal, and their store is built from the master template.

---

## How each store gets built after launch

Once the system is live, this is the store-build flow for every client — it
starts automatically when both keys (store access + brand materials) are in:

| Day | Store build work |
|---|---|
| **Day 1** | Push the master template to the client's store · apply logo, colours, and contact details from Step 7 |
| **Day 2** | Install policies (EN + FR) · configure checkout, shipping, and tax (using the client's GST/QST answers) · install and connect DropShipPOD (+ Custy for Path B) |
| **Day 3** | Full test order from storefront to print queue · check every page on a phone |
| **Days 4–5** | Buffer for fixes and re-checks · handover email goes out |

Because every store starts from the same proven codebase, the 3–5 business
day promise holds even with several builds running in the same week — the
work per store is applying branding and configuration, not building a website.

---

## Summary

| Week | Milestone |
|---|---|
| 1 | Portal core — accounts, paths, stepper |
| 2 | Steps 1–7 complete with review flow and uploads |
| 3 | Payment, access verification, automatic build clock |
| 4 | CPOD team dashboard — queue, checklist, handover |
| 5 | Master store template (common codebase), provisioning, Path C, testing, go-live |

---

## Assumptions

- The timeline covers **development work only** — feedback rounds, content
  changes, and decision-making are not included and happen in parallel.
- Copy and policies come from the existing client documents (no new content
  writing inside this timeline).
- A Shopify development store is available for testing from week 1.
- Existing CPOD services (media, payments, Shopify integration, email, jobs)
  are reused as-is; no changes to the DropShipPOD app itself are in scope.
- The master store template is built on the standard Shopify theme foundation
  and refined with the first few real store builds — client-facing screens are
  unaffected by those refinements.
- Every client store uses the same master template with per-store branding;
  fully custom layouts remain out of scope (billed separately at the standard
  $150/hour, as per the client documents).
