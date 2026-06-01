// ---------------------------------------------------------------------------
// Affiliate partner configuration
// Active: GetYourGuide, Viator, Welcome Pickups
// Pending: Fever (awaiting affiliate ID)
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
    baseUrl: string;
    /** Affiliate ID from Fever affiliate program */
    affiliateId: string;
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
    baseUrl: 'https://feverup.com',
    affiliateId: import.meta.env.FEVER_AFFILIATE_ID ?? 'REPLACE_WITH_FEVER_ID',
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

/** Build a Fever affiliate link */
export function buildFeverUrl(path: string): string {
  // Fever affiliate format TBD — placeholder
  return `${affiliateConfig.fever.baseUrl}${path}?ref=${affiliateConfig.fever.affiliateId}`;
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
