# Lamjung Experts Initiative — Execution System

End-to-end system for collecting, validating, and managing expert applications for the Lamjung Development Initiative led by Hon. Dharma Raj K.C., MP (Lamjung-1).

**Runtime:** ~8–9 weeks from form launch to workshop.

---

## Part 1 — Google Form (final, copy-ready)

**Form title:** Lamjung Experts & Stakeholders — Application

**Form description (paste as-is):**

> The Office of Hon. Dharma Raj K.C., MP (Lamjung-1) invites applications from experts and stakeholders to contribute to the Lamjung Development Initiative. Shortlisted applicants will be invited to a virtual consultation, followed by a 2–3 day workshop in Besisahar.
>
> **Deadline:** [Insert Date]  ·  **Queries:** office@dharmakc.np  ·  **Time to complete:** ~15–20 minutes

**Form settings:** Collect email **On** · Limit to 1 response (sign-in) **On** · Response receipts **On** · File uploads **On** · Progress bar **On** · Shuffle questions **Off**.

### Section 1 — Basic Information

*Description:* "Tell us who you are and how we can reach you."

| # | Question | Type | Options | Required |
|---|---|---|---|:---:|
| 1 | Full name | Short answer | — | ✅ |
| 2 | Email | Short answer (Response validation → Email) | — | ✅ |
| 3 | Phone (with country code, e.g. +977) | Short answer | — | ✅ |
| 4 | Current location (city, country) | Short answer | — | ✅ |
| 5 | Permanent address | Short answer | — | ✅ |
| 6 | Connection to Lamjung | Dropdown | Born in Lamjung · Raised in Lamjung · Family roots · Currently living in Lamjung · Working in/with Lamjung · Other | ✅ |
| 7 | Age group | Multiple choice | Under 25 · 25–34 · 35–44 · 45–54 · 55+ | ⬜ |
| 8 | Gender | Multiple choice | Woman · Man · Non-binary · Prefer not to say | ⬜ |

### Section 2 — Professional Background

| # | Question | Type | Options | Required |
|---|---|---|---|:---:|
| 9 | Current role / title | Short answer | — | ✅ |
| 10 | Current organization | Short answer | — | ✅ |
| 11 | Sector(s) of expertise | Checkboxes | Education · Health · Tourism · Hydropower & Energy · Water Supply & Sanitation · Roads & Infrastructure · Agriculture · Finance & Economic Development · Other | ✅ |
| 12 | Sub-specialization *(e.g. "maternal health", "micro-hydro")* | Short answer | — | ⬜ |
| 13 | Years of experience in sector | Multiple choice | Under 3 · 3–5 · 6–10 · 11–15 · 16+ | ✅ |
| 14 | Highest qualification | Multiple choice | Bachelor · Masters · PhD · Professional certification · Other | ✅ |
| 15 | Top 3 achievements *(one per line)* | Paragraph | — | ✅ |

### Section 3 — Expertise Validation

| # | Question | Type | Notes | Required |
|---|---|---|---|:---:|
| 16 | Describe your experience relevant to Lamjung or comparable hill districts | Paragraph | Max 250 words | ✅ |
| 17 | Share 1–2 projects with measurable impact *(what, who benefited, numbers)* | Paragraph | Max 300 words | ✅ |
| 18 | Portfolio / LinkedIn / website link | Short answer (URL validation) | — | ⬜ |
| 19 | Upload CV or proof of work | File upload | PDF/DOC, max 10 MB, 1 file | ⬜ |

### Section 4 — Problem-Solving Ability

| # | Question | Type | Notes | Required |
|---|---|---|---|:---:|
| 20 | Top 3 problems in your sector **in Lamjung** | Paragraph | — | ✅ |
| 21 | Pick one of those problems and propose a practical solution | Paragraph | Max 300 words. Be concrete. | ✅ |
| 22 | Implementation approach at local level *(partners, budget scale, timeline)* | Paragraph | Max 200 words | ✅ |
| 23 | KPIs you'd use to measure success | Paragraph | — | ⬜ |

### Section 5 — Commitment & Availability

| # | Question | Type | Options | Required |
|---|---|---|---|:---:|
| 24 | Willing to join a 60–90 min virtual consultation? | Multiple choice | Yes · No | ✅ |
| 25 | Willing to attend a 2–3 day workshop in Besisahar? | Multiple choice | Yes · No · Maybe (depends on dates) | ✅ |
| 26 | Hours/week you can commit over the next 3 months | Multiple choice | 1–3 · 4–7 · 8–15 · 16+ · Project-based | ✅ |
| 27 | Travel / accommodation support needed for workshop? | Multiple choice | Yes (full) · Partial · No | ✅ |

### Section 6 — Optional but Valuable

| # | Question | Type | Options | Required |
|---|---|---|---|:---:|
| 28 | Prior policy / government collaboration experience | Paragraph | — | ⬜ |
| 29 | Willing to mentor or lead a sector working group? | Multiple choice | Yes · Maybe · No | ⬜ |
| 30 | Language(s) comfortable working in | Checkboxes | Nepali · English · Gurung · Tamang · Other | ⬜ |
| 31 | Anything else we should know | Paragraph | — | ⬜ |

### Section 7 — Consent

| # | Question | Type | Options | Required |
|---|---|---|---|:---:|
| 32 | Consent | Checkboxes (single) | "I consent to be contacted and reviewed by the MP office's selection committee." | ✅ |

---

## Part 2 — Airtable Base Design

**Base name:** `Lamjung Experts Initiative`

### Table 1 — `Expert Applicants` (main)

| Field | Type | Notes |
|---|---|---|
| Name | Single line text | Primary field |
| Email | Email | |
| Phone | Phone | |
| Current Location | Single line text | From Q4 |
| Permanent Address | Long text | From Q5 |
| Connection to Lamjung | Single select | 6 options from Q6 |
| Sector | Multiple select | 9 options from Q11 |
| Sub-specialization | Single line text | |
| Years of Experience | Single select | Under 3 / 3–5 / 6–10 / 11–15 / 16+ |
| Key Skills | Long text | Paste from Q15 |
| Portfolio Link | URL | |
| CV | Attachment | |
| Problem Statement | Long text | From Q20 |
| Proposed Solution | Long text | From Q21 |
| Implementation Approach | Long text | From Q22 |
| Virtual Meet Willing | Checkbox | |
| Workshop Willing | Single select | Yes / No / Maybe |
| Travel Support | Single select | Yes / Partial / No |
| Hours/Week | Single select | 1–3 / 4–7 / 8–15 / 16+ / Project-based |
| Location Type | Single select | Local / Within Nepal / Diaspora / Outside |
| Availability | Single select | Low / Medium / High *(formula — see Part 3)* |
| Reviewer 1 Score | Number (0–40) | |
| Reviewer 2 Score | Number (0–40) | |
| **Application Score** | **Formula** | Average of reviewer scores (see formula below) |
| Status | Single select | New · In Review (समीक्षा) · Scored · Shortlisted · Invited to Virtual · Attended Virtual · Confirmed for Workshop · Waitlist · Rejected · Selected |
| Workshop Attendance | Checkbox | Checked when confirmed |
| Notes | Long text | Committee-visible notes |
| Reviewer Notes | Long text | Internal scoring notes |
| Submitted At | Created time | |
| Last Updated | Last modified time | |
| Red Flag | Checkbox | Flagged if rubric triggers fire |

**Application Score formula:**

```
ROUND(
  (IF({Reviewer 1 Score}, {Reviewer 1 Score}) + IF({Reviewer 2 Score}, {Reviewer 2 Score})) /
  (IF({Reviewer 1 Score}, 1) + IF({Reviewer 2 Score}, 1)),
  1
)
```

### Table 2 — `Sectors`

| Field | Type |
|---|---|
| Sector Name | Single line text |
| Target Shortlist | Number *(default 8)* |
| Applicants | Linked records (from Expert Applicants) |
| Shortlisted Count | Count of linked where Status = Shortlisted |
| Diversity Flag | Formula *(triggers if <30% women or <25% local)* |

### Table 3 — `Reviewers`

| Field | Type |
|---|---|
| Name | Single line text |
| Email | Email |
| Sector Coverage | Multiple select |
| Assigned Applications | Linked records |
| Reviews Completed | Count |

### Table 4 — `Meetings`

| Field | Type |
|---|---|
| Sector | Single select |
| Date | Date + time |
| Attendees | Linked records |
| Pre-work Submitted | Rollup count |
| Notes / Recording | URL / Long text |

### Views on `Expert Applicants`

| View | Type | Filter | Sort |
|---|---|---|---|
| **All Applicants** | Grid | — | Submitted At ↓ |
| **By Sector** | Grid (grouped) | — | Score ↓ within group |
| **Top Scored** | Grid | Score ≥ 30 | Score ↓ |
| **Needs Review** | Kanban (by Status) | Status = New / In Review | Submitted At ↑ |
| **Shortlisted — Virtual** | Grid | Status = Shortlisted | Score ↓ |
| **Confirmed — Workshop** | Grid | Workshop Attendance = ✅ | Sector ↑ |
| **Travel Support Needed** | Grid | Travel Support ≠ No | Sector |
| **Diversity — Women** | Grid | Gender = Woman | Score ↓ |
| **Diversity — Under 35** | Grid | Age group = Under 25 or 25–34 | Score ↓ |
| **Diversity — Local** | Grid | Location Type = Local | Score ↓ |
| **Red Flag Queue** | Grid | Red Flag = ✅ | Submitted At ↓ |
| **Rejected / Archive** | Grid | Status = Rejected | Last Updated ↓ |

*Notion equivalent:* one database with the same fields (type mapping: Single select → Select, Multiple select → Multi-select, Formula → Formula, Attachment → Files). Views become filtered/grouped/sorted database views. No structural change.

---

## Part 3 — Scoring System (implementable)

### Formula

**Total = Experience (0–10) + Problem-Solution (0–10) + Past Impact (0–10) + Local Understanding (0–5) + Commitment (0–5) = /40**

Cutoffs:

- **≥ 30** → Shortlist
- **25–29** → Waitlist
- **< 25** → Archive

### Rubric — "good answer" vs "weak answer"

**Experience (/10)** — Q9, 10, 13, 14, 15

| Score | What it looks like |
|---|---|
| 8–10 | 10+ yrs, senior role, directly relevant, named orgs, verifiable (link/CV) |
| 5–7 | 5–10 yrs, mid-level, partially applicable |
| 0–4 | <3 yrs or self-described with no org context or verification |

**Problem-Solution Quality (/10)** — Q20, 21, 22

| Score | What it looks like |
|---|---|
| 8–10 | Problems named specifically ("143 settlements lack water"), solution has named partners / budget scale / timeline, acknowledges constraints |
| 5–7 | Problems plausible, solution partial, implementation generic |
| 0–4 | "Poverty" / "development" as a problem; buzzwords; no budget, timeline, or partners |

**Past Impact (/10)** — Q15, 17, 18, 19

| Score | What it looks like |
|---|---|
| 8–10 | 2+ projects with quantified impact (beneficiaries, MW, hectares, revenue); verifiable via link/attachment |
| 5–7 | 1 project with partial metrics |
| 0–4 | "Worked on many projects" / no numbers / no verification |

**Local Understanding (/5)** — Q4, 5, 6, 16, 20

| Score | What it looks like |
|---|---|
| 4–5 | Born / raised / living in Lamjung, OR active ground work. References specific places (Dordi, Ghalegaun, Marsyangdi) and local context (ACAP, monsoon, Gurung-Tamu culture) |
| 2–3 | Family roots + recent engagement, or work in comparable hill districts |
| 0–1 | Generic "Nepal" context; no Lamjung specifics |

**Commitment (/5)** — Q24, 25, 26, 29

| Score | What it looks like |
|---|---|
| 4–5 | Yes to both virtual + in-person; 8+ hrs/week; willing to lead/mentor |
| 2–3 | Yes to virtual + maybe in-person; 4–7 hrs/week |
| 0–1 | Virtual only; <4 hrs/week |

### Derived field — Availability tag

```
IF(
  OR(Hours/Week = "16+", Hours/Week = "8–15", Hours/Week = "Project-based"),
  "High",
  IF(Hours/Week = "4–7", "Medium", "Low")
)
```

### Red flags (committee reviews, does not auto-reject)

1. **AI-generated boilerplate** — no Lamjung specifics, abstract language → Problem-Solution ≤ 3
2. **No quantified past work** despite claiming 10+ yrs → Past Impact ≤ 3
3. **Claims 4+ sectors of expertise** with <5 yrs total → likely inflated
4. **No Lamjung connection + no reason stated** for applying
5. **Refuses portfolio / LinkedIn / CV** — verification gap
6. **Titles without org names** ("Director", "Consultant") and no context
7. **Requests compensation upfront** — initiative is voluntary
8. **Active conflict of interest** — current vendor bidding on Lamjung projects, or undisclosed party role → flag, don't auto-reject
9. **Bulk / duplicate submissions** — dedupe, keep best
10. **Threatening or inappropriate language** → auto-reject

---

## Part 4 — Operational Workflow

End-to-end runtime: **~8–9 weeks** from form launch to workshop.

| # | Step | Owner | Duration | Tools | Deliverable |
|---|---|---|---:|---|---|
| 1 | **Application Collection** | Coordinator | 30 days (form open) | Google Form + portal banner | Raw submissions flowing into Airtable |
| 2 | **Initial Screening** | Coordinator | 2 days post-deadline | Airtable "Needs Review" | Incomplete entries archived; complete → `In Review` |
| 3 | **Scoring & Evaluation** | 2 reviewers per app | 7 days | Airtable scoring fields | Every app scored /40 by 2 reviewers; `Scored` status |
| 4 | **Shortlisting** | Coordinator + MP | 2 days | "Top Scored" + diversity views | Top ~8 per sector; diversity guardrails applied; list published |
| 5 | **Invitation to Virtual Meet** | Coordinator | 2 days | Gmail mail-merge + Google Calendar | ~80 invites sent; RSVPs tracked |
| 6 | **Conduct Virtual Discussion** | Sector facilitators | 1 week (8 meetings) | Google Meet / Zoom | Per-sector notes + pre-work captured |
| 7 | **Final Selection for Workshop** | MP + coordinator | 3 days | Airtable Phase 2 view | Workshop invitee list (30–40) |
| 8 | **Invite + Confirm Attendance** | Coordinator | 1 week | Email + RSVP form | Confirmed list + travel/stay roster |
| 9 | **Besisahar Event** | MP office team | 2 weeks prep + 2–3 day event | Venue, hospitality, transport | Sector memos + 90-day plans + 3-yr roadmap |

### What actually happens in each step

**Step 1 — Collection.** Publish the form + social notice on Day 0. Post weekly reminders on Days 7, 14, 21, 28. Accept late entries up to 48 hrs past deadline at coordinator's discretion.

**Step 2 — Screening.** Mark incomplete, missing-consent, or clearly off-scope (e.g., a different district) as `Rejected - Archive`. Keep everything else.

**Step 3 — Scoring.** Assign each app to 2 reviewers — ideally a sector expert + a generalist. Reviewers score independently, add 1–2 sentence notes. If scores differ by >10 points, escalate to a 3rd reviewer.

**Step 4 — Shortlisting.** Run the "Top Scored" view, group by sector, take top 8. Then run diversity views — if a sector's top 8 fails a guardrail (e.g., <30% women), swap in the next-highest candidate who fits. Never drop a high scorer for a low-scorer.

**Step 5 — Virtual invites.** Template email: context + meeting date + pre-work (3 questions due 48 hrs before meeting) + Google Meet link. Auto-reminder at T-48h.

**Step 6 — Virtual meetings.** 60–90 min, sector-wise, 8–10 people each. Structure: 5 min context · 15 min problem-mapping (pre-work share) · 25 min solution discussion · 10 min next-steps · 5 min workshop invite. Record with consent. Facilitator writes a 1-page summary within 24 hrs.

**Step 7 — Final selection.** Re-score shortlisted experts on **Engagement** (pre-work quality + meeting participation + willingness). Take top 4–5 per sector = ~30–40 workshop invitees.

**Step 8 — Workshop invites.** Formal invite 7 days in advance with full agenda, venue, travel/stay guidance, and a pre-read pack. Hard RSVP deadline 4 days before.

**Step 9 — Besisahar event.** 2–3 days. Day 1: framing + sector breakouts. Day 2: draft plans + cross-sector review. Day 3: commitments + public close-out. Sector leads submit memos within 2 weeks; MP office compiles the "Lamjung Development Blueprint."

### Team you need

- **1 Coordinator** (full-time during the 9 weeks) — owns Airtable, logistics, comms
- **1 MP liaison** (part-time) — approvals, politics, final sign-offs
- **8 sector reviewers** (part-time during Step 3) — score ~15–25 apps each
- **8 sector facilitators** (one per virtual meeting + workshop breakout)
- **2 event-ops staff** (for workshop week) — venue, travel, hospitality

---

## Part 5 — Automation (what to wire up)

### 1. Google Forms → Airtable

**Recommended: Make.com (free tier: 1,000 ops/mo).**

1. Create "Lamjung Experts" scenario.
2. Module 1: **Google Forms — Watch Responses** (pick the form).
3. Module 2: **Airtable — Create a Record** in `Expert Applicants`.
4. Map each Google Forms field to the Airtable field. Set `Status = "New"` on create.
5. Turn scenario on → every new submission creates a row in ~1 min.

*Alternative — Zapier:* same flow, 100 tasks/mo free, slightly easier UI.

*Alternative — Google Apps Script (free, no limits):* attach a script to the form's spreadsheet; on form submit, POST to Airtable's REST API (`https://api.airtable.com/v0/{baseId}/Expert%20Applicants` with auth header). Script is ~30 lines.

### 2. Auto-scoring & tagging (Airtable-native)

- **Application Score** — formula field (shown in Part 2).
- **Availability tag** — formula field (shown in Part 3).
- **Location Type** — formula:

  ```
  IF(
    SEARCH("Lamjung", {Current Location} & {Permanent Address}),
    "Local",
    IF(SEARCH("Nepal", {Current Location}), "Within Nepal", "Diaspora")
  )
  ```

- **Red Flag** — formula:

  ```
  IF(
    OR(
      {Problem-Solution Score} <= 3,
      AND({Years of Experience} = "Under 3", LEN({Sector}) >= 4)
    ),
    TRUE(),
    FALSE()
  )
  ```

- **Auto status → "Scored"** — Airtable Automation: *When Reviewer 1 Score AND Reviewer 2 Score both filled → update Status to "Scored" → post to Slack #selection-panel*.

### 3. Auto-emails

Build 4 templates in Airtable's **Automations → Send email** (or Gmail via Zapier):

| Trigger | Template | Placeholders |
|---|---|---|
| Status → `Shortlisted` | Virtual meeting invite (with Meet link, pre-work, deadline) | {Name}, {Sector}, {Meeting Date}, {Pre-work Link} |
| Status → `Waitlist` | "You're on standby" | {Name}, {Sector} |
| Status → `Rejected` | Thank-you + encouragement to engage via other channels | {Name} |
| Status → `Confirmed for Workshop` | Workshop details (dates, venue, travel info) | {Name}, {Sector}, {Travel Support}, {Agenda Link} |

Reminder automation — daily check at 9 AM: for any record where an invite was sent 3+ days ago and no RSVP → send reminder; 5+ days → flag `No Response` in Notes.

### 4. Portal integration (optional)

Expose a read-only list of selected experts on the MP portal:

- Airtable "Selected" view → publish as shareable view, OR
- Build a Next.js route `/api/experts` that hits Airtable's REST API with a read-only token, filtered to `Status = Selected`. Render as a grid section on the public page. Caches for 10 min.

### 5. Slack / WhatsApp ops channel

Single channel (`#lamjung-experts-ops`) with Airtable's Slack integration posting on:

- New application (daily digest)
- Score discrepancy >10 pts (immediate)
- RSVP received / no-show (daily)
- Travel support request (immediate)

---

## Quick-reference numbers

| Metric | Target |
|---|---|
| Form open window | 30 days |
| End-to-end runtime | 8–9 weeks |
| Shortlist per sector | 6–10 experts |
| Total virtual invitees | ~80 |
| Workshop invitees | 30–40 |
| Diversity floor — women | ≥ 30% per sector |
| Diversity floor — local (Lamjung) | ≥ 25% |
| Diversity floor — under 35 | ≥ 20% |
| Shortlist cutoff | Score ≥ 30/40 |
| Waitlist band | Score 25–29 |
| Scoring reviewer count | 2 per app (3rd if disagreement >10 pts) |

---

## Placeholders to fill in before launch

- `[Insert Date]` — application deadline in the Google Form description and in every public notice
- `[Insert Link]` — Google Form share URL in `content/callForExperts.ts` (`ctaHref`) and in the public notice
- Sector reviewer assignments in the `Reviewers` table
- Venue + hospitality vendor for Besisahar workshop
- Travel-support budget envelope
