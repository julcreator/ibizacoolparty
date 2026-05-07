// ---------------------------------------------------------------------------
// Affiliate partner configuration
// Priority stack: P1 = Ticketmaster, GetYourGuide, Booking.com
//                 P2 = Clubtickets (Hi Ibiza + Ushuaïa only)
// ---------------------------------------------------------------------------

export type AffiliatePartner =
  | 'ticketmaster'
  | 'clubtickets'
  | 'getyourguide'
  | 'booking';

export interface AffiliateLink {
  url: string;
  partner: AffiliatePartner;
  label: string;
}

export interface AffiliateConfig {
  ticketmaster: {
    /** Impact affiliate tracking parameter — set in env TM_IMPACT_TAG */
    impactTag: string;
    /** Base URL for event deeplinks */
    baseUrl: string;
  };
  clubtickets: {
    baseUrl: string;
    /** Clubs where Clubtickets is used as P2 complement */
    supportedSlugs: readonly string[];
    tag: string;
  };
  getyourguide: {
    baseUrl: string;
    /** Partner ID from GetYourGuide affiliate program */
    partnerId: string;
  };
  booking: {
    baseUrl: string;
    /** Affiliate ID from Booking.com affiliate program */
    aid: string;
  };
}

export const affiliateConfig: AffiliateConfig = {
  ticketmaster: {
    // Impact tag format: ?impactid=XXXX — replace with actual Impact campaign tag
    impactTag: import.meta.env.TM_IMPACT_TAG ?? 'REPLACE_WITH_IMPACT_TAG',
    baseUrl: 'https://www.ticketmaster.es',
  },
  clubtickets: {
    baseUrl: 'https://www.clubtickets.com',
    // P2: only used for Hi Ibiza and Ushuaïa as complementary option
    supportedSlugs: ['hi-ibiza', 'ushuaia'] as const,
    tag: import.meta.env.CLUBTICKETS_TAG ?? 'ibizacoolparty',
  },
  getyourguide: {
    baseUrl: 'https://www.getyourguide.com',
    partnerId: import.meta.env.GYG_PARTNER_ID ?? 'REPLACE_WITH_GYG_ID',
  },
  booking: {
    baseUrl: 'https://www.booking.com',
    aid: import.meta.env.BOOKING_AID ?? '101745433',
  },
};

// ---------------------------------------------------------------------------
// URL builders
// ---------------------------------------------------------------------------

/** Build a Ticketmaster affiliate deeplink (via Impact) */
export function buildTicketmasterUrl(eventUrl: string): string {
  const url = new URL(eventUrl);
  url.searchParams.set('impactid', affiliateConfig.ticketmaster.impactTag);
  return url.toString();
}

/** Build a GetYourGuide affiliate link */
export function buildGygUrl(path: string): string {
  const base = `${affiliateConfig.getyourguide.baseUrl}${path}`;
  const url = new URL(base);
  url.searchParams.set('partner_id', affiliateConfig.getyourguide.partnerId);
  return url.toString();
}

/** Build a Booking.com affiliate link */
export function buildBookingUrl(path: string): string {
  const base = `${affiliateConfig.booking.baseUrl}${path}`;
  const url = new URL(base);
  url.searchParams.set('aid', affiliateConfig.booking.aid);
  return url.toString();
}

/** Build a Clubtickets affiliate link (P2, Hi/Ushuaïa only) */
export function buildClubticketsUrl(path: string): string {
  const base = `${affiliateConfig.clubtickets.baseUrl}${path}`;
  const url = new URL(base);
  url.searchParams.set('aff', affiliateConfig.clubtickets.tag);
  return url.toString();
}

/** Returns true if the club slug has Clubtickets as P2 complement */
export function hasClubticketsP2(slug: string): boolean {
  return (affiliateConfig.clubtickets.supportedSlugs as readonly string[]).includes(slug);
}

/** HTML attributes for all affiliate links */
export function getAffiliateAttrs() {
  return {
    rel: 'sponsored nofollow noopener',
    target: '_blank',
  };
}
