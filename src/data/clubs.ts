export interface Club {
  name: string;
  slug: string;
  area: string;
  genre: string;
  bestNights: string;
  description: string;
  capacity: string;
  dressCode: string;
  priceRange: string;
  /** Official club website URL */
  officialUrl: string;
  /** Pexels search query for build-time photo gallery */
  pexelsQuery?: string;
  /** YouTube video IDs for aftermovies / official videos */
  youtubeVideos?: { id: string; title: string }[];
  faqs: { question: string; answer: string }[];
}

export const clubs: Club[] = [
  {
    name: 'Hï Ibiza',
    slug: 'hi-ibiza',
    area: 'Playa d\'en Bossa',
    genre: 'Tech House / EDM / Techno',
    bestNights: 'Mon, Tue, Fri, Sat',
    description: 'Hï Ibiza is a mega-club in Playa d\'en Bossa, successor to the legendary Space. With cutting-edge sound and production across two rooms, it hosts some of the biggest names in electronic music every summer season.',
    capacity: '5,000+',
    dressCode: 'Smart casual. No football shirts, no flip-flops.',
    priceRange: '€30–€80',
    officialUrl: 'https://www.hiibiza.com',
    pexelsQuery: 'Ibiza nightclub electronic music',
    youtubeVideos: [
      { id: '8keYXGt_HcU', title: 'Hï Ibiza — Opening Party 2024' },
      { id: 'OJnvJ9L-nLg', title: 'James Hype Live from Hï Ibiza 2024' },
    ],
    faqs: [
      { question: 'What time does Hï Ibiza open?', answer: 'Doors typically open at 23:00 and the club runs until 06:00.' },
      { question: 'How do I get to Hï Ibiza?', answer: 'Hï Ibiza is located on the main road in Playa d\'en Bossa. Taxis, buses (Discobus), and transfers are all available.' },
      { question: 'Should I buy tickets in advance?', answer: 'Yes, especially for popular nights. Advance tickets are cheaper and big events sell out.' },
    ],
  },
  {
    name: 'Ushuaïa',
    slug: 'ushuaia',
    area: 'Playa d\'en Bossa',
    genre: 'EDM / House / Tech House',
    bestNights: 'Sun, Mon, Tue, Wed, Thu, Fri',
    description: 'Ushuaïa is the world-famous open-air club and hotel in Playa d\'en Bossa. Known for spectacular daytime events with world-class DJs, incredible stage production, and a pool party atmosphere.',
    capacity: '5,000+',
    dressCode: 'Swimwear and casual during day events.',
    priceRange: '€40–€100',
    officialUrl: 'https://www.theushuaiaexperience.com',
    pexelsQuery: 'Ibiza pool party outdoor festival',
    youtubeVideos: [
      { id: 'uDfq8zPUoEk', title: 'Ushuaïa Ibiza — Official Aftermovie 2025' },
      { id: '8AKOhpvy1Ck', title: 'Ushuaïa Ibiza — Night Club July 2024' },
    ],
    faqs: [
      { question: 'Is Ushuaïa a daytime or nighttime club?', answer: 'Primarily daytime/early evening. Events usually run from 16:00 to midnight.' },
      { question: 'Can I swim at Ushuaïa?', answer: 'Yes, there\'s a pool in the main area. Many people come in swimwear.' },
      { question: 'What\'s the difference between Ushuaïa and Hï Ibiza?', answer: 'Ushuaïa is open-air daytime/early evening, while Hï is an indoor nightclub. They\'re owned by the same group and located next to each other.' },
    ],
  },
  {
    name: 'Pacha',
    slug: 'pacha',
    area: 'Ibiza Town',
    genre: 'House / Deep House / Commercial',
    bestNights: 'Fri, Sat',
    description: 'The iconic cherry logo, the most famous club brand in the world. Pacha has been the heart of Ibiza nightlife since 1973. Located just outside Ibiza Town\'s port, it offers a glamorous, upscale clubbing experience.',
    capacity: '3,000',
    dressCode: 'Smart. Dress to impress.',
    priceRange: '€30–€70',
    officialUrl: 'https://www.pacha.com',
    pexelsQuery: 'Ibiza nightclub glamour party luxury',
    youtubeVideos: [
      { id: 'VR5T5lrrZbQ', title: 'CamelPhat at Pacha — Opening Party 2024' },
      { id: 'Ckd_q1SAviA', title: 'Pacha Ibiza — Flower Power Highlights 2024' },
    ],
    faqs: [
      { question: 'What is Pacha Ibiza known for?', answer: 'Pacha is the oldest and most iconic club in Ibiza, famous for its glamorous atmosphere, cherry logo, and legendary parties since 1973.' },
      { question: 'What should I wear to Pacha?', answer: 'Smart attire is expected. Dress to impress — no beachwear or sportswear.' },
      { question: 'How far is Pacha from the port?', answer: 'Pacha is a 5-minute walk from Ibiza Town\'s marina/port area.' },
    ],
  },
  {
    name: 'Amnesia',
    slug: 'amnesia',
    area: 'San Rafael',
    genre: 'Techno / Trance / House',
    bestNights: 'Tue, Sat',
    description: 'Amnesia is one of Ibiza\'s original super-clubs, famous for its massive main room and legendary terrace. Located between Ibiza Town and San Antonio, it has hosted some of the island\'s most iconic parties.',
    capacity: '5,000',
    dressCode: 'Casual. Comfortable footwear recommended.',
    priceRange: '€25–€60',
    officialUrl: 'https://www.amnesia.es',
    pexelsQuery: 'Ibiza techno rave underground club',
    youtubeVideos: [
      { id: 'xkI3uFYwZhs', title: 'Amnesia Ibiza — Closing Festival 2024' },
      { id: 'bMoU9BjpKvM', title: 'Mar-T Live at Pyramid Opening Party — Amnesia 2024' },
    ],
    faqs: [
      { question: 'What time does Amnesia open?', answer: 'Doors open around midnight, with the party running until 06:00 or later.' },
      { question: 'What\'s special about Amnesia\'s terrace?', answer: 'The famous terrace has a retractable roof and is known for sunrise moments — one of Ibiza\'s most magical clubbing experiences.' },
      { question: 'How do I get to Amnesia?', answer: 'Amnesia is on the main road between Ibiza Town and San Antonio. Discobus and taxis serve it well.' },
    ],
  },
  {
    name: 'DC10',
    slug: 'dc10',
    area: 'Ses Salines (near airport)',
    genre: 'Techno / Minimal / Underground',
    bestNights: 'Mon, Fri',
    description: 'DC10 is the underground icon of Ibiza, a former farmhouse turned techno temple right next to the airport runway. Famous for Circoloco on Mondays, it attracts dedicated music lovers who value sound over spectacle.',
    capacity: '1,500',
    dressCode: 'Very casual. Anything goes.',
    priceRange: '€20–€50',
    officialUrl: 'https://www.dc10ibiza.com',
    pexelsQuery: 'Ibiza underground techno minimal dark club',
    youtubeVideos: [
      { id: 'D9oSAUCboOY', title: 'Circoloco at DC10 Ibiza — 25 Years 2024' },
      { id: '832J_H-kC2g', title: 'DC10 Ibiza — Closing Circoloco 2024' },
    ],
    faqs: [
      { question: 'What is Circoloco?', answer: 'Circoloco is DC10\'s legendary Monday party, running since 1999. It\'s one of the most famous underground events in the world.' },
      { question: 'Is DC10 hard to get into?', answer: 'It can be. Buy tickets in advance for popular nights, and expect queues.' },
      { question: 'What\'s the vibe at DC10?', answer: 'Raw, underground, no-frills techno. It\'s about the music, not the glamour. Planes flying overhead are part of the experience.' },
    ],
  },
];
