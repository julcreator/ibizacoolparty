// ---------------------------------------------------------------------------
// Affiliate partner configuration
// Active: GetYourGuide, Viator, Fever (Impact deep link), Welcome Pickups
// Removed: Ticketmaster, Booking.com (rejected), Clubtickets (no affiliate program)
// ---------------------------------------------------------------------------

export type AffiliatePartner =
  | 'getyourguide'
  | 'viator'
  | 'fever'
  | 'welcomepickups';

export interface AffiliateLink {
  url: string;
  partner: AffiliatePartner;
  label: string;
}

export interface AffiliateConfig {
  getyourguide: {
    baseUrl: string;
    /** Partner ID from GetYourGuide affiliate program */
    partnerId: string;
  };
  viator: {
    baseUrl: string;
    /** Affiliate ID from Viator Partner Program */
    affiliateId: string;
  };
  fever: {
    /** Full Impact tracking URL — this IS the affiliate link */
    trackingUrl: string;
  };
  welcomepickups: {
    baseUrl: string;
    /** Travelpayouts affiliate marker */
    tpMarker: string;
  };
}

export const affiliateConfig: AffiliateConfig = {
  getyourguide: {
    baseUrl: 'https://www.getyourguide.com',
    partnerId: import.meta.env.GYG_PARTNER_ID ?? 'BCOUV2W',
  },
  viator: {
    baseUrl: 'https://www.viator.com',
    affiliateId: import.meta.env.VIATOR_AFFILIATE_ID ?? 'P00301063',
  },
  fever: {
    // Impact deep link — tracking ID 5kYY1D, cookie 30 days
    trackingUrl: import.meta.env.FEVER_TRACKING_URL ?? 'https://fever.pxf.io/5kYY1D',
  },
  welcomepickups: {
    baseUrl: 'https://www.welcomepickups.com',
    tpMarker: import.meta.env.TP_MARKER ?? '526733',
  },
};

// ---------------------------------------------------------------------------
// URL builders
// ---------------------------------------------------------------------------

/** Build a GetYourGuide affiliate link */
export function buildGygUrl(path: string): string {
  const base = `${affiliateConfig.getyourguide.baseUrl}${path}`;
  const url = new URL(base);
  url.searchParams.set('partner_id', affiliateConfig.getyourguide.partnerId);
  return url.toString();
}

/** Build a Viator affiliate link */
export function buildViatorUrl(path: string): string {
  // Viator uses PID parameter for affiliate tracking
  const separator = path.includes('?') ? '&' : '?';
  return `${affiliateConfig.viator.baseUrl}${path}${separator}pid=${affiliateConfig.viator.affiliateId}`;
}

/**
 * Build a Fever affiliate link via Impact deep link.
 * - No arguments: returns the base tracking URL (general Ibiza events page)
 * - With deepLinkUrl: appends a `u` parameter to deep-link into a specific Fever page
 *   e.g. buildFeverUrl('https://feverup.com/m/ibiza')
 */
export function buildFeverUrl(deepLinkUrl?: string): string {
  const base = affiliateConfig.fever.trackingUrl;
  if (!deepLinkUrl) return base;
  return `${base}?u=${encodeURIComponent(deepLinkUrl)}`;
}

/** Build a Welcome Pickups affiliate link (via Travelpayouts marker) */
export function buildWelcomePickupsUrl(path: string): string {
  const base = `${affiliateConfig.welcomepickups.baseUrl}${path}`;
  const url = new URL(base);
  url.searchParams.set('marker', affiliateConfig.welcomepickups.tpMarker);
  return url.toString();
}

/** HTML attributes for all affiliate links */
export function getAffiliateAttrs() {
  return {
    rel: 'sponsored nofollow noopener',
    target: '_blank',
  };
}
