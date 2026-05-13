// ---------------------------------------------------------------------------
// Pexels API client — build-time only (called from getStaticPaths)
// Requires env var: PEXELS_API_KEY
// Docs: https://www.pexels.com/api/documentation/
// ---------------------------------------------------------------------------

export interface PexelsPhoto {
  id: number;
  width: number;
  height: number;
  alt: string;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
  };
  photographer: string;
  photographerUrl: string;
}

interface PexelsSearchResponse {
  photos: PexelsPhoto[];
  total_results: number;
  page: number;
  per_page: number;
}

/**
 * Fetches photos from Pexels at build time.
 * Returns an empty array (gracefully) if PEXELS_API_KEY is not set.
 */
export async function fetchClubPhotos(
  query: string,
  perPage = 6
): Promise<PexelsPhoto[]> {
  const apiKey = import.meta.env.PEXELS_API_KEY;

  if (!apiKey) {
    console.warn('[pexels] PEXELS_API_KEY not set — skipping photo fetch for:', query);
    return [];
  }

  try {
    const params = new URLSearchParams({
      query,
      per_page: String(perPage),
      orientation: 'landscape',
    });

    const res = await fetch(`https://api.pexels.com/v1/search?${params}`, {
      headers: {
        Authorization: apiKey,
      },
    });

    if (!res.ok) {
      console.error(`[pexels] API error ${res.status} for query "${query}"`);
      return [];
    }

    const data: PexelsSearchResponse = await res.json();
    return data.photos ?? [];
  } catch (err) {
    console.error('[pexels] Fetch failed:', err);
    return [];
  }
}
