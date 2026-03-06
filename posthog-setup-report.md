<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into this Next.js 16 App Router project (DevEvent). Here's a summary of all changes made:

- **`instrumentation-client.ts`** (new file): Initializes PostHog client-side using the Next.js 15.3+ recommended approach. Configured with a reverse proxy (`/ingest`), automatic exception capture, and debug mode in development.
- **`next.config.ts`**: Added reverse proxy rewrites routing `/ingest/*` to PostHog's ingestion endpoints, reducing the chance of events being blocked by ad blockers. Also set `skipTrailingSlashRedirect: true` as required by PostHog.
- **`components/ExploreBtn.tsx`**: Added `posthog.capture('explore_events_clicked')` to the button's `onClick` handler.
- **`components/EventCard.tsx`**: Converted to a client component (`'use client'`) and added `posthog.capture('event_card_clicked', { title, slug, location })` to the `Link`'s `onClick` handler.
- **`.env.local`**: Created with `NEXT_PUBLIC_POSTHOG_KEY` and `NEXT_PUBLIC_POSTHOG_HOST` environment variables.

| Event Name | Description | File |
|---|---|---|
| `explore_events_clicked` | User clicks the 'Explore Events' CTA button to scroll to the events list | `components/ExploreBtn.tsx` |
| `event_card_clicked` | User clicks on an event card to view event details (properties: `title`, `slug`, `location`) | `components/EventCard.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- **Dashboard**: [Analytics basics](https://us.posthog.com/project/332434/dashboard/1333617)
- **Insight**: [Explore Events Button Clicks](https://us.posthog.com/project/332434/insights/8cL2NfFR) — daily trend of CTA clicks
- **Insight**: [Event Card Clicks](https://us.posthog.com/project/332434/insights/uQEH6Qax) — daily trend of event card clicks
- **Insight**: [Event Discovery Funnel](https://us.posthog.com/project/332434/insights/cSIQjsT8) — conversion funnel: Page View → Explore Events → Event Card Click
- **Insight**: [Most Clicked Events](https://us.posthog.com/project/332434/insights/RmICAcAF) — breakdown of event card clicks by event title
- **Insight**: [Weekly Active Users on Key Actions](https://us.posthog.com/project/332434/insights/woY9bP3w) — weekly unique users on core engagement actions

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
