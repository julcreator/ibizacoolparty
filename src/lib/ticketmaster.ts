// ---------------------------------------------------------------------------
// Ticketmaster Discovery API v2 client
// Used at build-time to fetch Ibiza events and generate static pages
// Refresh: run `astro build` hourly via Vercel cron or redeploy webhook
// ---------------------------------------------------------------------------

const TM_BASE = 'https://app.ticketmaster.com/discovery/v2';

// ---------------------------------------------------------------------------
// Types (subset of Discovery API v2 response shapes we actually use)
// ---------------------------------------------------------------------------

export interface TmImage {
  url: string;
  ratio: '16_9' | '3_2' | '4_3';
  width: number;
  height: number;
  fallback: boolean;
}

export interface TmPriceRange {
  type: 'standard' | 'including fees';
  currency: string;
  min: number;
  max: number;
}

export interface TmVenue {
  id: string;
  name: string;
  city: { name: string };
  country: { name: string; countryCode: string };
  address?: { line1: string };
  location?: { longitude: string; latitude: string };
}

export interface TmClassification {
  primary: boolean;
  segment: { id: string; name: string };
  genre?: { id: string; name: string };
  subGenre?: { id: string; name: string };
}

export interface TmEvent {
  id: string;
  name: string;
  type: string;
  url: string;
  locale: string;
  images: TmImage[];
  dates: {
    start: {
      localDate: string;      // 'YYYY-MM-DD'
      localTime?: string;     // 'HH:MM:SS'
      dateTime?: string;      // ISO 8601 UTC
      dateTBD?: boolean;
      timeTBD?: boolean;
    };
    end?: {
      localDate?: string;
      localTime?: string;
      dateTime?: string;
    };
    status?: { code: 'onsale' | 'offsale' | 'cancelled' | 'postponed' | 'rescheduled' };
  };
  priceRanges?: TmPriceRange[];
  classifications?: TmClassification[];
  _embedded?: {
    venues?: TmVenue[];
  };
  pleaseNote?: string;
  info?: string;
  promoter?: { id: string; name: string };
}

interface TmEventsPage {
  _embedded?: {
    events: TmEvent[];
  };
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}

// ---------------------------------------------------------------------------
// Fetch helpers
// ---------------------------------------------------------------------------

function getApiKey(): string {
  const key = import.meta.env.TM_API_KEY;
  if (!key) {
    throw new Error(
      '[ticketmaster] TM_API_KEY env var is not set. ' +
      'Add it to .env and to Vercel project environment variables.'
    );
  }
  return key;
}

/**
 * Fetch all upcoming events in Ibiza (countryCode=ES, keyword=Ibiza or
 * specific venue IDs) from Ticketmaster Discovery API v2.
 *
 * Called once at build-time. Vercel rebuild = data refresh.
 *
 * @param params Extra query params (e.g. { venueId: 'KovZpZAFJa6E' })
 */
export async function fetchTmEvents(
  params: Record<string, string> = {}
): Promise<TmEvent[]> {
  const apiKey = getApiKey();

  const allEvents: TmEvent[] = [];
  let page = 0;
  const size = 100; // max per page allowed by TM
  const maxPages = 5; // safety ceiling (500 events)

  do {
    const qs = new URLSearchParams({
      apikey: apiKey,
      countryCode: 'ES',
      city: 'Ibiza',
      classificationName: 'music',
      sort: 'date,asc',
      size: String(size),
      page: String(page),
      ...params,
    });

    const url = `${TM_BASE}/events.json?${qs}`;
    const res = await fetch(url);

    if (!res.ok) {
      console.error(`[ticketmaster] API error ${res.status} on page ${page}`);
      break;
    }

    const data: TmEventsPage = await res.json();

    const events = data._embedded?.events ?? [];
    allEvents.push(...events);

    const { totalPages, number } = data.page;
    if (number + 1 >= totalPages) break;
    page++;
  } while (page < maxPages);

  return allEvents;
}

/**
 * Fetch events for a specific Ticketmaster venue ID.
 */
export async function fetchTmEventsByVenue(
  venueId: string
): Promise<TmEvent[]> {
  return fetchTmEvents({ venueId });
}

// ---------------------------------------------------------------------------
// Data helpers
// ---------------------------------------------------------------------------

/** Pick the best hero image (largest 16:9, non-fallback preferred) */
export function getBestImage(images: TmImage[]): TmImage | undefined {
  const preferred = images
    .filter((i) => i.ratio === '16_9' && !i.fallback)
    .sort((a, b) => b.width - a.width);
  return preferred[0] ?? images[0];
}

/** Format price range as "€20 – €60" */
export function formatPriceRange(ranges?: TmPriceRange[]): string {
  if (!ranges?.length) return 'Check site';
  const eur = ranges.find((r) => r.currency === 'EUR') ?? ranges[0];
  const fmt = new Intl.NumberFormat('en-ES', { style: 'currency', currency: eur.currency, maximumFractionDigits: 0 });
  if (eur.min === eur.max) return fmt.format(eur.min);
  return `${fmt.format(eur.min)} – ${fmt.format(eur.max)}`;
}

/** Format local date for display: "Sat 14 Jun 2025" */
export function formatEventDate(localDate: string, localTime?: string): string {
  const d = new Date(`${localDate}T${localTime ?? '00:00:00'}`);
  return d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
}

/** Return status badge label */
export function getStatusLabel(code?: string): string {
  switch (code) {
    case 'onsale': return 'On Sale';
    case 'offsale': return 'Sold Out';
    case 'cancelled': return 'Cancelled';
    case 'postponed': return 'Postponed';
    case 'rescheduled': return 'Rescheduled';
    default: return 'Check availability';
  }
}

/** Slugify a TM event name+date for URL (id is used as primary key) */
export function buildEventSlug(event: TmEvent): string {
  return event.id;
}
