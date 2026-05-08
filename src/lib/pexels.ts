/**
 * Pexels API client — build-time only (no runtime JS).
 * Uses PEXELS_API_KEY env var. Returns empty array gracefully if key is absent.
 */

export interface PexelsPhoto {
  id: number;
  url: string;
  photographer: string;
  photographerUrl: string;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
  };
  alt: string;
}

interface PexelsSearchResponse {
  photos: Array<{
    id: number;
    url: string;
    photographer: string;
    photographer_url: string;
    src: {
      original: string;
      large2x: string;
      large: string;
      medium: string;
      small: string;
    };
    alt: string;
  }>;
  total_results: number;
}

export async function fetchClubPhotos(
  query: string,
  perPage = 6
): Promise<PexelsPhoto[]> {
  const apiKey = import.meta.env.PEXELS_API_KEY;
  if (!apiKey) {
    // Graceful fallback: no photos but no build error
    return [];
  }

  try {
    const params = new URLSearchParams({
      query,
      per_page: String(perPage),
      orientation: 'landscape',
    });

    const res = await fetch(
      `https://api.pexels.com/v1/search?${params.toString()}`,
      {
        headers: { Authorization: apiKey },
      }
    );

    if (!res.ok) {
      console.warn(`[pexels] Failed to fetch photos for "${query}": ${res.status}`);
      return [];
    }

    const data: PexelsSearchResponse = await res.json();

    return data.photos.map((p) => ({
      id: p.id,
      url: p.url,
      photographer: p.photographer,
      photographerUrl: p.photographer_url,
      src: p.src,
      alt: p.alt || query,
    }));
  } catch (err) {
    console.warn(`[pexels] Network error for "${query}":`, err);
    return [];
  }
}
