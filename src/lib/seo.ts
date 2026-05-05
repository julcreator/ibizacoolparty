export interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  type?: 'website' | 'article';
  noindex?: boolean;
}

export function getDefaultSEO(): SEOProps {
  return {
    title: 'Ibiza Cool Party – Best Ibiza Parties, Clubs, Tickets & Hotels',
    description: 'Your ultimate guide to Ibiza nightlife. Find the best clubs, boat parties, pool parties, tickets, hotels near venues, and airport transfers.',
    type: 'website',
  };
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[], siteUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.url}`,
    })),
  };
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Ibiza Cool Party',
    url: 'https://www.ibizacoolparty.com',
    logo: 'https://www.ibizacoolparty.com/logo.png',
    sameAs: [],
  };
}

export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Ibiza Cool Party',
    url: 'https://www.ibizacoolparty.com',
  };
}

export interface EventSchemaInput {
  name: string;
  startDate: string;          // ISO 8601
  endDate?: string;
  description?: string;
  imageUrl?: string;
  locationName: string;
  locationAddress?: string;
  ticketUrl: string;
  minPrice?: number;
  maxPrice?: number;
  currency?: string;
  status?: 'EventScheduled' | 'EventCancelled' | 'EventPostponed' | 'EventRescheduled';
}

export function generateEventSchema(event: EventSchemaInput) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'MusicEvent',
    name: event.name,
    startDate: event.startDate,
    eventStatus: `https://schema.org/${event.status ?? 'EventScheduled'}`,
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'MusicVenue',
      name: event.locationName,
      address: {
        '@type': 'PostalAddress',
        streetAddress: event.locationAddress ?? '',
        addressLocality: 'Ibiza',
        addressCountry: 'ES',
      },
    },
    offers: {
      '@type': 'Offer',
      url: event.ticketUrl,
      availability: 'https://schema.org/InStock',
      ...(event.minPrice !== undefined && { price: event.minPrice }),
      ...(event.currency && { priceCurrency: event.currency }),
      validFrom: new Date().toISOString(),
    },
  };

  if (event.endDate) schema.endDate = event.endDate;
  if (event.description) schema.description = event.description;
  if (event.imageUrl) schema.image = event.imageUrl;

  return schema;
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}
