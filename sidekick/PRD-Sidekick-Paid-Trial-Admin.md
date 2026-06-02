# PRD: Sidekick Paid Trial for Admin (Auto-Billing)

**Author:** Roni | **Date:** Feb 25, 2026 | **Status:** Draft
**Product area:** Sidekick

---

# Opportunity/Problem (WHY?)

## Opportunity:
- **Opportunity Size:** All free-tier and limited-plan admins who hit the Sidekick daily message limit. This is the primary monetization lever for Sidekick — converting free/limited usage into paid add-on seats ($10/seat/month).
- **Evidences:**
  - Admins are the purchase decision-makers; they hold billing authority
  - Users hitting the daily message limit have already experienced Sidekick's value (aha moment reached)
  - Auto-billing trial model (14-day, $0 upfront) reduces friction vs. requiring immediate payment
  - Sidekick usage data shows strong retention among users who exceed the free message cap

## Hypothesis:
- If we offer admins a frictionless 14-day free trial with auto-billing at the moment they hit their message limit (peak frustration + demonstrated value), we will convert a meaningful percentage of free accounts into paying Sidekick add-on subscribers, increasing Sidekick ARR without degrading user experience.

---

# Solution

### Product Areas:
- Sidekick chat (cross-board chat)
- Sidekick centerkick (home/welcome screen)
- Sidekick left panel (expanded navigation)
- Billing & checkout
- Notifications (in-app + email)
- Admin settings / manage apps

### Flow

| Step | Requirements | Entry Point |
| --- | --- | --- |
| 1. Free usage with counter | Admin sees "X free messages left for today" banner in prompt area. Banner includes "Try free trial" CTA + dismiss (X). | Centerkick, left panel, chat |
| 2. Message limit reached | Banner changes to "Daily message limit reached" with "Try free trial" CTA. Tooltip on send: "Daily message limit reached. Purchase the Sidekick add-on to increase your limit." Input is disabled. | Centerkick, chat |
| 3. Trial popup (auto-billing) | Modal: "Keep things moving with Sidekick — **14 day free trial**". Sub: "Get unlimited access and let Sidekick take action on your behalf." Timeline: Trial for $0 today → Reminder before trial ends → Billing starts after trial. CTAs: **Start free trial** (primary) / **See plans** (secondary). | Triggered by "Try free trial" click |
| 4. Trial active | Admin gets unlimited Sidekick access for 14 days. Free message counter/banner disappears. | All Sidekick surfaces |
| 5. Trial ending reminder — notification | In-app notification: "Your monday sidekick free trial ends tomorrow. Once your trial ends tomorrow, your payment will begin. Your access remains seamless to keep Sidekick handling complex tasks. **Manage apps**" | Notification bell |
| 6. Trial ending reminder — email | Email to admin: "Reminder: Your free trial ends tomorrow." Body: account has published apps, on [Trial End Date] free trial ends and billing begins. CTA: **View plan details**. | Email |
| 7. Trial ends → auto-billing | Payment begins automatically at $10/seat/month for 100 Sidekick messages. No action needed from admin. | Billing system |
| 8. Post-trial purchase (no trial) | If admin chose "See plans" instead of trial: Pricing modal showing $10/seat/month, 100 messages, value props. CTA: **Purchase account access**. Banner shows "Purchase Now" instead of "Try free trial". | Pricing modal |
| 9. Checkout | Standard monday.com checkout flow for Sidekick add-on purchase. | From pricing modal |

### Figma link
[Sidekick add-on monetization — Admin CC section](https://www.figma.com/design/oXyfPYsyGHQA3WtE6EvOIc/Sidekick-add-on-monetization?node-id=857-22547)

### Design & UX notes
- **Trial popup uses a trust-building timeline** — 3-step visual: $0 today → reminder before end → billing after. Reduces anxiety about unexpected charges.
- **Two CTAs on trial popup** — "Start free trial" (primary, dark) and "See plans" (secondary, outline). Gives admins who want more info a non-committal path.
- **Banner is persistent but dismissible** — "X free messages left" banner includes X to dismiss, but "Daily message limit reached" is non-dismissible since input is blocked.
- **Post-trial state changes CTA copy** — "Try free trial" becomes "Purchase Now" after trial expires or for accounts that already trialed.
- **Email reminder has usage visibility** — "(Review full usage)" link lets admin see team-wide Sidekick usage before billing kicks in.
- **In-app notification is reassuring** — "Your access remains seamless" framing avoids panic about losing functionality.
- **Centerkick vs. chat entry points** — Same limit/trial flow appears in both the full-screen Sidekick home (centerkick) and the in-context chat view, ensuring coverage regardless of where the admin encounters the limit.
- **Left panel includes "Get sidekick" shortcut** — When expanded, bottom nav shows Settings, Get sidekick, Give us feedback, and mobile QR code.

---

# Target users
- **Primary:** Account admins on free/limited plans who actively use Sidekick and hit the daily message cap. These users have billing authority and have already experienced value.
- **Secondary:** Non-admin team members who benefit from the admin purchasing Sidekick (they get access once the admin buys seats). Also: admins on higher plans evaluating Sidekick as an add-on.

# Goals & success metrics
| Metric | Current | Target |
|--------|---------|--------|
| Trial start rate (admins who hit limit → start trial) | N/A | TBD% |
| Trial-to-paid conversion rate | N/A | TBD% |
| Sidekick add-on ARR | Baseline | +TBD% |
| Time-to-trial-start (from first limit hit) | N/A | < 2 sessions |
| Trial churn rate (cancel before billing) | N/A | < TBD% |
| Avg. messages/day during trial | N/A | TBD |

# Scope
| In v1 | Out of v1 (later) |
|-------|-------------------|
| Admin-only trial start flow | Non-admin "request trial" flow |
| 14-day auto-billing trial | Variable trial lengths / A/B on duration |
| $10/seat/month single plan | Tiered plans or volume discounts |
| In-app + email trial-ending reminders | SMS / push notifications |
| Centerkick + chat + left panel entry points | Board-level Sidekick widget entry point |
| "See plans" → pricing modal → checkout | Self-serve plan comparison page |
| Single reminder (1 day before) | Multi-touch reminders (7-day, 3-day, 1-day) |
| Credit card on file required for trial | Trial without payment method |

# Technical considerations
- **Billing integration:** Trial must hook into the existing monday.com billing system (Chargebee/Stripe). Auto-billing after 14 days requires subscription creation at trial start with a 14-day free period.
- **Entitlement service:** Sidekick message quota must be managed by the entitlement service — switching from free-tier cap to unlimited during trial, then to 100 messages/seat/month post-trial.
- **Message counter API:** Real-time message count needs to be tracked per-user per-day (free tier) and per-account per-billing-cycle (paid tier). The banner must reflect current state accurately.
- **Admin role check:** Trial start and purchase flows must be gated to admin role only. Non-admins should see a different UX (out of v1 scope but needs graceful handling — e.g., "Ask your admin to upgrade").
- **Trial state machine:** States: `free` → `trial_active` → `trial_ending` → `paid` (or `trial_expired` if cancelled). Need idempotent state transitions and handling for edge cases (admin removed during trial, etc.).
- **Notification service:** In-app notification 1 day before trial ends. Email triggered by billing system's trial-ending webhook.
- **Feature flags:** Trial flow should be behind a feature flag for staged rollout and A/B testing.
- **Analytics events:** Must fire BigBrain events at every step for funnel analysis.

# Edge cases & "what-if" scenarios
1. **Admin starts trial, then loses admin role** — Who owns the trial? Does billing continue? Recommendation: Trial is tied to the account, not the individual. Any remaining admin can manage/cancel.
2. **Admin starts trial, then account is downgraded** — If the account plan changes mid-trial, does the Sidekick trial continue independently? It should, since it's a separate add-on.
3. **Admin dismisses trial popup repeatedly** — After N dismissals, should we reduce frequency? Risk of banner fatigue. Consider capping trial popup frequency (e.g., once per session after 3 dismissals).
4. **Credit card on file expires before trial ends** — Billing fails at trial end. Need dunning flow: notify admin, give grace period (3 days?), then downgrade to free tier.
5. **Multiple admins on same account** — Admin A starts trial; Admin B sees "trial active" state, not another trial offer. Only one trial per account.
6. **Admin cancels trial on day 1** — Immediate cancellation should still grant access until end of 14-day period (standard trial behavior). Confirm this matches monday.com billing policy.
7. **User hits limit at message N but message was already processing** — If Sidekick is mid-response when limit hits, the response should complete. Limit enforcement happens at send time, not response time.
8. **Trial started via "Try free trial" in banner vs. popup** — Both paths should result in the same trial flow (popup appears in both cases). Ensure no duplicate trial creation.
9. **Admin is already on a paid plan with Sidekick** — Should never see trial flow. Entitlement check must exclude existing Sidekick subscribers.
10. **Account with no payment method on file** — Trial requires credit card. If admin has no payment method, redirect to payment method setup before trial activation.

---

# Data

### Main/Proxy Business KPIs
- Sidekick add-on revenue (ARR)
- Trial-to-paid conversion rate
- Net new Sidekick paid accounts

### Secondary KPIs
- Trial start rate (% of admins hitting limit who start trial)
- Trial engagement (messages/day during trial vs. free tier)
- Trial cancellation rate
- Time from limit hit to trial start
- Post-trial retention (30-day, 60-day)
- "See plans" click rate vs. "Start free trial" click rate

### Population
- Population: Account admins on plans without Sidekick add-on, who have used Sidekick at least once
- Languages: All supported languages
- Entry point to the test: Message limit reached banner → "Try free trial" CTA
- Do we need enrichment? Yes — need account-level data (plan type, team size, Sidekick usage history). Limitation: enrichment may not capture admins who haven't logged in recently.

### Overlapping tests
- Verify we don't have tests that overlap with this test
  - Internal Tests: Any ongoing Sidekick pricing experiments, message limit threshold tests, or Sidekick onboarding experiments
  - External Tests: Any billing/checkout funnel experiments running in parallel

### BB Events:

| **Event Name** | **Description** | **Placement** | **Info** |
| --- | --- | --- | --- |
| sidekick_message_limit_reached | User hits daily message limit | Sidekick chat/centerkick | user_id, account_id, messages_sent_today, plan_type |
| sidekick_trial_banner_shown | "Try free trial" banner displayed | Sidekick chat/centerkick | user_id, account_id, is_admin, surface (chat/centerkick/left_panel) |
| sidekick_trial_banner_clicked | Admin clicks "Try free trial" | Banner CTA | user_id, account_id, surface |
| sidekick_trial_popup_shown | Trial popup modal displayed | Modal overlay | user_id, account_id |
| sidekick_trial_popup_start_clicked | Admin clicks "Start free trial" | Trial popup | user_id, account_id |
| sidekick_trial_popup_see_plans_clicked | Admin clicks "See plans" | Trial popup | user_id, account_id |
| sidekick_trial_popup_dismissed | Admin closes trial popup (X) | Trial popup | user_id, account_id, dismissal_count |
| sidekick_trial_started | Trial successfully activated | Backend | account_id, admin_user_id, trial_end_date |
| sidekick_pricing_modal_shown | Pricing modal displayed ($10/seat/month) | Modal overlay | user_id, account_id, source (see_plans / purchase_now) |
| sidekick_pricing_purchase_clicked | Admin clicks "Purchase account access" | Pricing modal | user_id, account_id |
| sidekick_checkout_started | Admin enters checkout flow | Checkout page | account_id |
| sidekick_checkout_completed | Purchase completed | Checkout confirmation | account_id, seats_purchased, total_amount |
| sidekick_trial_reminder_notification_shown | In-app notification: trial ends tomorrow | Notification bell | account_id, admin_user_id |
| sidekick_trial_reminder_notification_clicked | Admin clicks "Manage apps" in notification | Notification panel | account_id |
| sidekick_trial_reminder_email_sent | Email reminder sent to admin | Email | account_id, admin_email |
| sidekick_trial_reminder_email_clicked | Admin clicks "View plan details" in email | Email CTA | account_id |
| sidekick_trial_ended | Trial period expires | Backend | account_id, converted (bool), cancellation_reason |
| sidekick_trial_cancelled | Admin cancels trial before end | Admin settings | account_id, days_remaining, messages_sent_during_trial |
| sidekick_auto_billing_started | First payment charged after trial | Billing system | account_id, amount, seats |

---

# Checklist before releasing a test

- [ ] Schedule a kickoff with all CRO CCO [Roni]
- [ ] Build rollout plan with CCO and CRO
- [ ] Schedule QA in advance [Dev]
- [ ] Prepare QA doc [Dev]
- [ ] When dev opens the test:
- [ ] Move test to status Running [Dev]
- [ ] Change running date [Dev]
- [ ] Insert link to AB test (BigBrain) [Dev]
- [ ] Figma link [Dev]
- [ ] Dashboard [Analyst]
- [ ] Update Payments team & #guardians-of-the-funnel
- [ ] Open an item in AB test board with status "upcoming" [Test owner]
- When the team decides upon test:
  - Summary [Analyst]
  - When test is closed/frozen — change status and final date [Dev]

# Communication

### Slack
- #sidekick-monetization
- #guardians-of-the-funnel

### Contacts
- PM: Roni
- R&D: TBD
- Design: TBD

---

# Open questions
- [ ] What is the exact daily message limit for the free tier? (Design shows "5 free messages left for today" — confirm this number)
- [ ] Does the trial require a credit card upfront, or can admins trial without one? (Design implies auto-billing, so CC should be required)
- [ ] What happens to non-admin users when the admin starts a trial? Do all users in the account get unlimited access, or only the admin?
- [ ] How does seat count work? Is it per-admin, per-user, or account-wide? ($10/seat/month — need to clarify what constitutes a "seat")
- [ ] Can an account trial Sidekick more than once? (Likely no — need to confirm)
- [ ] What is the cancellation UX? Where does the admin go to cancel? ("Manage apps" link in notification — need to define that flow)
- [ ] What is the grace period if payment fails at trial end? How many retry attempts before downgrade?
- [ ] Should the "See plans" CTA go to the in-context pricing modal ($10/seat) or to the full monday.com pricing page?
- [ ] Is the 100 messages/seat/month limit per billing cycle or rolling? What happens when a paid user exhausts 100 messages mid-month?
- [ ] What's the messaging for non-admins who hit the limit? (Out of v1 scope, but need a fallback — "Ask your admin to upgrade")
- [ ] Do we send a reminder email only 1 day before, or also at 7 days and 3 days?
- [ ] What is the "Sidekick usage policy" referenced in the pricing modal? Need link.
