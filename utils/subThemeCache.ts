import type { Artwork } from '@/data/artworks';
import { getArtworkSubThemes } from '@/utils/subThemes';

const cache = new Map<string, string[]>();

export function getCachedArtworkSubThemes(artwork: Artwork) {
  const key = artwork.id;
  const cached = cache.get(key);

  if (cached) {
    return cached;
  }

  const tags = getArtworkSubThemes(artwork);
  cache.set(key, tags);
  return tags;
}

export function getCachedSubThemeCount(artworks: Artwork[], subTheme: string) {
  let count = 0;

  for (const artwork of artworks) {
    if (getCachedArtworkSubThemes(artwork).includes(subTheme)) {
      count += 1;
    }
  }

  return count;
}
