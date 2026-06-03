import type { Artwork } from '@/data/artworks';
import { getCachedArtworkSubThemes } from '@/utils/subThemeCache';

export type ArtworkSearchOptions = {
  keyword: string;
  unit: string;
  theme: string;
};

const STOP_WORDS = new Set([
  'a',
  'an',
  'and',
  'ap',
  'art',
  'the',
  'of',
  'in',
  'on',
  'to',
  'for',
  'with',
  'by',
  'from',
  'work',
  'artwork',
  'image',
  'piece',
]);

const SEARCH_ALIASES: Record<string, string[]> = {
  apollo: ['apollo', 'apollo 11', 'apollo 11 stones', 'apollo 11 cave stones'],
  bull: ['bull', 'bulls', 'lascaux'],
  bulls: ['bull', 'bulls', 'lascaux'],
  hammurabi: ['hammurabi', 'code stele', 'law code'],
  narmer: ['narmer', 'palette'],
  pyramids: ['pyramid', 'pyramids', 'giza', 'sphinx'],
  sphinx: ['sphinx', 'giza', 'pyramid'],
  parthenon: ['parthenon', 'athena'],
  pantheon: ['pantheon', 'oculus', 'dome'],
  augustus: ['augustus', 'primaporta', 'prima porta'],
  hagia: ['hagia sophia', 'sophia'],
  sophia: ['hagia sophia', 'sophia'],
  chartres: ['chartres', 'cathedral'],
  sistine: ['sistine chapel', 'michelangelo'],
  guadalupe: ['guadalupe', 'virgin of guadalupe'],
  liberty: ['liberty leading the people', 'delacroix', 'revolution'],
  demoiselles: ['demoiselles', 'picasso'],
  sunflower: ['sunflower seeds', 'ai weiwei'],
  shibboleth: ['shibboleth', 'salcedo'],
  wave: ['great wave', 'hokusai'],
  taj: ['taj mahal'],
  sanchi: ['great stupa', 'sanchi'],
  angkor: ['angkor wat', 'angkor thom'],
  moai: ['moai', 'rapa nui'],
};

function normalize(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[#’']/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function tokenize(value: string) {
  return normalize(value)
    .split(/\s+/)
    .filter((token) => token.length > 0);
}

function meaningfulTerms(keyword: string) {
  return tokenize(keyword).filter((term) => term.length >= 2 && !STOP_WORDS.has(term));
}

function expandTerms(terms: string[]) {
  const expanded = new Set<string>();

  for (const term of terms) {
    expanded.add(term);
    const aliases = SEARCH_ALIASES[term] ?? [];
    aliases.forEach((alias) => {
      tokenize(alias).forEach((aliasTerm) => {
        if (!STOP_WORDS.has(aliasTerm)) expanded.add(aliasTerm);
      });
    });
  }

  return Array.from(expanded);
}

function levenshtein(a: string, b: string) {
  const rows = a.length + 1;
  const cols = b.length + 1;
  const dp: number[][] = Array.from({ length: rows }, () => Array(cols).fill(0));

  for (let i = 0; i < rows; i += 1) dp[i][0] = i;
  for (let j = 0; j < cols; j += 1) dp[0][j] = j;

  for (let i = 1; i < rows; i += 1) {
    for (let j = 1; j < cols; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost
      );
    }
  }

  return dp[a.length][b.length];
}

function maxTypoDistance(term: string) {
  if (term.length <= 3) return 0;
  if (term.length <= 5) return 1;
  if (term.length <= 8) return 2;
  return 3;
}

function fuzzyWordMatch(queryTerm: string, candidateToken: string) {
  if (queryTerm === candidateToken) return true;

  // Prefix search should only go query -> candidate, not candidate -> query.
  // This prevents "ap" from matching "apollo" unless the user actually typed "ap".
  if (queryTerm.length >= 3 && candidateToken.startsWith(queryTerm)) return true;

  if (queryTerm.length < 4 || candidateToken.length < 4) return false;

  const lengthGap = Math.abs(queryTerm.length - candidateToken.length);
  if (lengthGap > maxTypoDistance(queryTerm)) return false;

  return levenshtein(queryTerm, candidateToken) <= maxTypoDistance(queryTerm);
}

function fieldText(artwork: Artwork) {
  const title = artwork.title;
  const highPriority = [
    artwork.title,
    artwork.artist ?? '',
    artwork.culture,
    artwork.unit,
    artwork.periodLabel,
    artwork.medium,
    artwork.location,
  ].join(' ');

  const all = [
    highPriority,
    artwork.date,
    artwork.periodDates,
    artwork.description,
    artwork.whyItMatters,
    artwork.sourceUrl,
    artwork.secondarySourceUrl ?? '',
    ...artwork.themes,
    ...getCachedArtworkSubThemes(artwork),
    ...artwork.contentTags,
  ].join(' ');

  return {
    title: normalize(title),
    highPriority: normalize(highPriority),
    all: normalize(all),
    tokens: tokenize(all),
    highTokens: tokenize(highPriority),
  };
}

function apNumberMatch(artwork: Artwork, terms: string[], rawKeyword: string) {
  const raw = normalize(rawKeyword);
  const apNumber = artwork.apNumber.toString();

  if (raw === apNumber) return 120;
  if (raw === `ap ${apNumber}`) return 120;
  if (raw === `ap ${apNumber}`.replace(' ', '')) return 120;
  if (terms.length === 1 && terms[0] === apNumber) return 120;

  return 0;
}

function scoreTerm(term: string, fields: ReturnType<typeof fieldText>) {
  let score = 0;

  if (fields.title.split(' ').includes(term)) score = Math.max(score, 90);
  else if (fields.title.includes(term) && term.length >= 3) score = Math.max(score, 75);

  if (fields.highPriority.split(' ').includes(term)) score = Math.max(score, 65);
  else if (fields.highPriority.includes(term) && term.length >= 3) score = Math.max(score, 50);

  if (fields.all.split(' ').includes(term)) score = Math.max(score, 35);
  else if (fields.all.includes(term) && term.length >= 3) score = Math.max(score, 25);

  for (const token of fields.highTokens) {
    if (fuzzyWordMatch(term, token)) {
      score = Math.max(score, 42);
      break;
    }
  }

  for (const token of fields.tokens) {
    if (fuzzyWordMatch(term, token)) {
      score = Math.max(score, 20);
      break;
    }
  }

  return score;
}

function scoreArtwork(artwork: Artwork, rawKeyword: string) {
  const baseTerms = meaningfulTerms(rawKeyword);
  if (baseTerms.length === 0) return 1;

  const fields = fieldText(artwork);
  const phrase = normalize(rawKeyword);
  let score = apNumberMatch(artwork, baseTerms, rawKeyword);

  if (phrase.length >= 3) {
    if (fields.title === phrase) score += 200;
    else if (fields.title.includes(phrase)) score += 120;
    else if (fields.highPriority.includes(phrase)) score += 75;
    else if (fields.all.includes(phrase)) score += 45;
  }

  // Require each real user term to match somewhere.
  // This makes multi-word searches behave like Google-style AND matching.
  for (const term of baseTerms) {
    const expanded = expandTerms([term]);
    const bestForTerm = Math.max(...expanded.map((expandedTerm) => scoreTerm(expandedTerm, fields)));

    if (bestForTerm <= 0) {
      return 0;
    }

    score += bestForTerm;
  }

  // Bonus for all terms close together in title/high-priority fields.
  if (baseTerms.length >= 2) {
    const titleHits = baseTerms.filter((term) => fields.title.includes(term)).length;
    const highHits = baseTerms.filter((term) => fields.highPriority.includes(term)).length;

    if (titleHits === baseTerms.length) score += 80;
    else if (highHits === baseTerms.length) score += 45;
  }

  return score;
}

export function searchArtworks(artworks: Artwork[], options: ArtworkSearchOptions) {
  const keyword = options.keyword.trim();

  return artworks
    .map((artwork) => {
      const matchesUnit = options.unit === 'All' || artwork.unit === options.unit;
      const matchesTheme = options.theme === 'All' || artwork.themes.includes(options.theme);

      if (!matchesUnit || !matchesTheme) {
        return { artwork, score: 0 };
      }

      return { artwork, score: scoreArtwork(artwork, keyword) };
    })
    .filter((result) => result.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.artwork.apNumber - b.artwork.apNumber;
    })
    .map((result) => result.artwork);
}
