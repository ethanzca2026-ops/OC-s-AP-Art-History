import type { Artwork } from '@/data/artworks';
import { getArtworkSubThemes, themeGroups } from '@/utils/subThemes';

const artworkTagCache = new Map<string, string[]>();
let countCache: Map<string, number> | null = null;
let availableThemeGroupsCache: typeof themeGroups | null = null;

export function getCachedArtworkSubThemes(artwork: Artwork) {
  const existing = artworkTagCache.get(artwork.id);

  if (existing) {
    return existing;
  }

  const tags = getArtworkSubThemes(artwork);
  artworkTagCache.set(artwork.id, tags);
  return tags;
}

export function getAllCachedSubThemeCounts(artworks: Artwork[]) {
  if (countCache) {
    return countCache;
  }

  const counts = new Map<string, number>();

  for (const artwork of artworks) {
    for (const tag of getCachedArtworkSubThemes(artwork)) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }

  countCache = counts;
  return counts;
}

export function getCachedSubThemeCount(artworks: Artwork[], subTheme: string) {
  return getAllCachedSubThemeCounts(artworks).get(subTheme) ?? 0;
}

export function getCachedAvailableThemeGroups(artworks: Artwork[]) {
  if (availableThemeGroupsCache) {
    return availableThemeGroupsCache;
  }

  const counts = getAllCachedSubThemeCounts(artworks);

  availableThemeGroupsCache = themeGroups
    .map((group) => ({
      ...group,
      subThemes: group.subThemes.filter((subTheme) => (counts.get(subTheme) ?? 0) > 0),
    }))
    .filter((group) => group.subThemes.length > 0);

  return availableThemeGroupsCache;
}
