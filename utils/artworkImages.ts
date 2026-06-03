import type { Artwork } from '@/data/artworks';

const TITLE_ALIASES: Record<string, string> = {
  'apollo-11-stones': 'Apollo 11 Cave Stones Namibia',
  'great-hall-of-the-bulls': 'Great Hall of the Bulls Lascaux',
  'camelid-sacrum-in-the-shape-of-a-canine': 'Camelid sacrum in the shape of a canine Tequixquiac',
  'running-horned-woman': 'Running horned woman Tassili n Ajjer',
  'beaker-with-ibex-motifs': 'Beaker with ibex motifs Susa',
  'anthropomorphic-stele': 'Anthropomorphic stele Arabian Peninsula',
  'jade-cong': 'Jade cong Liangzhu',
  'stonehenge': 'Stonehenge',
  'the-ambum-stone': 'Ambum Stone',
  'tlatilco-female-figurine': 'Tlatilco female figurine',
  'terra-cotta-fragment': 'Lapita terra cotta fragment',
};

export function cleanArtworkTitle(title: string) {
  return title
    .replace(/^\d+\.\s*/, '')
    .replace(/\(.*?\)/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function artworkImageQuery(artwork: Artwork) {
  const title = TITLE_ALIASES[artwork.id] ?? cleanArtworkTitle(artwork.title);
  const location = artwork.location && !artwork.location.toLowerCase().includes('within') ? artwork.location : '';
  return `${title} ${location}`.trim();
}

export function artworkThumbnailUrl(artwork: Artwork, variant = 0) {
  if (artwork.imageUrl && variant === 0) return artwork.imageUrl;

  const query = encodeURIComponent(artworkImageQuery(artwork));

  if (variant === 0) {
    return `https://tse1.mm.bing.net/th?q=${query}%20Smarthistory&w=1400&h=900&c=7&rs=1&p=0`;
  }

  if (variant === 1) {
    return `https://tse2.mm.bing.net/th?q=${query}%20AP%20Art%20History&w=1400&h=900&c=7&rs=1&p=0`;
  }

  return `https://tse3.mm.bing.net/th?q=${query}%20artwork&w=1400&h=900&c=7&rs=1&p=0`;
}
