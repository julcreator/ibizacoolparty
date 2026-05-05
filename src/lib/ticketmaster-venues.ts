// ---------------------------------------------------------------------------
// Ticketmaster venue ID mapping for Ibiza clubs
//
// These IDs come from the Discovery API /venues endpoint.
// Used to:
//   1. Fetch targeted events per venue at build-time
//   2. Link TM event pages back to our club guides
//
// How to verify / update IDs:
//   curl "https://app.ticketmaster.com/discovery/v2/venues.json?apikey=YOUR_KEY&keyword=Ibiza&countryCode=ES"
// ---------------------------------------------------------------------------

export interface VenueMapping {
  /** Ticketmaster venue ID */
  tmVenueId: string;
  /** Our internal club slug (src/data/clubs.ts) */
  clubSlug: string;
  /** Display name (from TM — may differ from our slug) */
  name: string;
}

/**
 * Known Ibiza venue IDs on Ticketmaster.
 *
 * NOTE: Verify these IDs with the /venues endpoint once you have your API key.
 * IDs starting with 'KovZ' are real TM venue IDs; the ones below are
 * placeholder-formatted correctly — replace after first API call.
 */
export const IBIZA_VENUES: VenueMapping[] = [
  {
    tmVenueId: 'KovZpZAFJa6E', // Hi Ibiza — verify with API
    clubSlug: 'hi-ibiza',
    name: 'Hï Ibiza',
  },
  {
    tmVenueId: 'KovZpZAFJaAE', // Ushuaïa — verify with API
    clubSlug: 'ushuaia',
    name: 'Ushuaïa Ibiza Beach Hotel',
  },
  {
    tmVenueId: 'KovZpZAFJa7E', // Pacha — verify with API
    clubSlug: 'pacha',
    name: 'Pacha Ibiza',
  },
  {
    tmVenueId: 'KovZpZAFJaEE', // Amnesia — verify with API
    clubSlug: 'amnesia',
    name: 'Amnesia Ibiza',
  },
  {
    tmVenueId: 'KovZpZAFJa5E', // DC10 — verify with API
    clubSlug: 'dc10',
    name: 'DC10 Ibiza',
  },
];

/** Lookup club slug from a TM venue ID (returns undefined if not mapped) */
export function getClubSlugForVenue(tmVenueId: string): string | undefined {
  return IBIZA_VENUES.find((v) => v.tmVenueId === tmVenueId)?.clubSlug;
}

/** All TM venue IDs for bulk querying */
export const ALL_IBIZA_VENUE_IDS: string[] = IBIZA_VENUES.map((v) => v.tmVenueId);
