import { artworks } from '@/data/artworks';

export type TopTrumpCard = {
  artworkId: string;
  apNumber: number;
  title: string;
  unit: string;
  date: string;
  culture: string;
  attributes: {
    culturalPower: number;
    visualImpact: number;
    materialInnovation: number;
    historicalInfluence: number;
    ageOfArtwork: number;
  };
};

function clamp(value: number) {
  return Math.max(1, Math.min(100, Math.round(value)));
}

function textForArtwork(artwork: typeof artworks[number]) {
  return [
    artwork.title,
    artwork.unit,
    artwork.culture,
    artwork.date,
    artwork.medium,
    artwork.location,
    artwork.description,
    artwork.whyItMatters,
    ...(artwork.themes ?? []),
    ...(artwork.contentTags ?? []),
  ].join(' ').toLowerCase();
}

function estimateAgeScore(artwork: typeof artworks[number]) {
  const text = textForArtwork(artwork);

  // Higher score = older artwork.
  // This is intentionally game-friendly, not a precise year calculator.
  if (text.includes('30,000') || text.includes('25,500') || text.includes('25,000') || text.includes('15,000') || text.includes('14,000')) return 100;
  if (text.includes('7000') || text.includes('6000') || text.includes('5000') || text.includes('4200') || text.includes('3500') || text.includes('3000')) return 94;
  if (text.includes('2500') || text.includes('2000') || text.includes('1792') || text.includes('1750') || text.includes('1550') || text.includes('1300')) return 88;
  if (text.includes('1000 b.c') || text.includes('800 b.c') || text.includes('600 b.c') || text.includes('500 b.c')) return 82;
  if (text.includes('b.c') || text.includes('bce') || text.includes('b.c.e')) return 78;

  if (artwork.unit === 'Global Prehistory') return 96;
  if (artwork.unit === 'Ancient Mediterranean') return 82;
  if (artwork.unit === 'Early Europe and Colonial Americas') return 55;
  if (artwork.unit === 'Indigenous Americas') return 58;
  if (artwork.unit === 'Africa') return 48;
  if (artwork.unit === 'West and Central Asia') return 50;
  if (artwork.unit === 'South, East, and Southeast Asia') return 52;
  if (artwork.unit === 'The Pacific') return 42;
  if (artwork.unit === 'Later Europe and Americas') return 28;
  if (artwork.unit === 'Global Contemporary') return 8;

  if (text.includes('present') || text.includes('contemporary') || text.includes('1980') || text.includes('2000')) return 8;
  if (text.includes('1900') || text.includes('20th')) return 18;
  if (text.includes('1800') || text.includes('19th')) return 25;
  if (text.includes('1700') || text.includes('18th')) return 32;
  if (text.includes('1600') || text.includes('17th')) return 38;
  if (text.includes('1500') || text.includes('16th')) return 44;
  if (text.includes('1400') || text.includes('15th')) return 50;
  if (text.includes('1300') || text.includes('14th')) return 56;
  if (text.includes('1200') || text.includes('13th')) return 62;
  if (text.includes('1100') || text.includes('12th')) return 66;
  if (text.includes('1000') || text.includes('11th')) return 70;

  return 45;
}

function scoreArtwork(artwork: typeof artworks[number]) {
  const text = textForArtwork(artwork);

  let culturalPower = 50;
  let visualImpact = 50;
  let materialInnovation = 50;
  let historicalInfluence = 50;

  // Base AP number spread keeps cards from feeling identical.
  culturalPower += (artwork.apNumber % 7) * 2;
  visualImpact += (artwork.apNumber % 5) * 3;
  materialInnovation += (artwork.apNumber % 6) * 2;
  historicalInfluence += (artwork.apNumber % 8) * 2;

  if (artwork.unit === 'Global Prehistory') {
    culturalPower += 12;
    materialInnovation += 8;
    historicalInfluence += 10;
  }

  if (artwork.unit === 'Ancient Mediterranean') {
    culturalPower += 13;
    visualImpact += 8;
    historicalInfluence += 14;
  }

  if (artwork.unit === 'Early Europe and Colonial Americas') {
    culturalPower += 10;
    materialInnovation += 8;
    historicalInfluence += 12;
  }

  if (artwork.unit === 'Later Europe and Americas') {
    visualImpact += 12;
    historicalInfluence += 12;
  }

  if (artwork.unit === 'Indigenous Americas') {
    culturalPower += 14;
    materialInnovation += 8;
    historicalInfluence += 8;
  }

  if (artwork.unit === 'Africa') {
    culturalPower += 15;
    materialInnovation += 10;
    visualImpact += 8;
  }

  if (artwork.unit === 'West and Central Asia') {
    culturalPower += 12;
    materialInnovation += 10;
    historicalInfluence += 10;
  }

  if (artwork.unit === 'South, East, and Southeast Asia') {
    culturalPower += 12;
    visualImpact += 10;
    historicalInfluence += 10;
  }

  if (artwork.unit === 'The Pacific') {
    culturalPower += 15;
    materialInnovation += 11;
    visualImpact += 8;
  }

  if (artwork.unit === 'Global Contemporary') {
    culturalPower += 11;
    visualImpact += 12;
    materialInnovation += 12;
    historicalInfluence += 9;
  }

  if (text.includes('ritual') || text.includes('ceremon') || text.includes('sacred') || text.includes('devotion')) {
    culturalPower += 10;
  }

  if (text.includes('king') || text.includes('emperor') || text.includes('ruler') || text.includes('propaganda') || text.includes('power')) {
    culturalPower += 8;
    historicalInfluence += 8;
  }

  if (text.includes('temple') || text.includes('cathedral') || text.includes('mosque') || text.includes('palace') || text.includes('architecture')) {
    visualImpact += 12;
    materialInnovation += 8;
    historicalInfluence += 6;
  }

  if (text.includes('stone') || text.includes('bronze') || text.includes('gold') || text.includes('jade') || text.includes('ivory') || text.includes('concrete')) {
    materialInnovation += 10;
  }

  if (text.includes('paint') || text.includes('fresco') || text.includes('mosaic') || text.includes('photograph') || text.includes('installation')) {
    visualImpact += 9;
    materialInnovation += 7;
  }

  if (text.includes('trade') || text.includes('colonial') || text.includes('exchange') || text.includes('global') || text.includes('migration')) {
    culturalPower += 8;
    historicalInfluence += 7;
  }

  if (text.includes('identity') || text.includes('race') || text.includes('gender') || text.includes('social') || text.includes('critique')) {
    culturalPower += 9;
    historicalInfluence += 6;
  }

  if (text.includes('monument') || text.includes('colossal') || text.includes('large') || text.includes('public')) {
    visualImpact += 10;
    culturalPower += 5;
  }

  if (text.includes('manuscript') || text.includes('print') || text.includes('textile') || text.includes('woven')) {
    materialInnovation += 9;
    visualImpact += 5;
  }

  if (text.includes('afterlife') || text.includes('tomb') || text.includes('funerary')) {
    culturalPower += 8;
    historicalInfluence += 7;
  }

  if (text.includes('perspective') || text.includes('naturalism') || text.includes('abstract') || text.includes('modern')) {
    visualImpact += 8;
    historicalInfluence += 6;
  }

  const famousAnchors = [
    'lascaux',
    'stonehenge',
    'narmer',
    'hammurabi',
    'parthenon',
    'pantheon',
    'augustus',
    'hagia sophia',
    'chartres',
    'sistine',
    'versailles',
    'guadalupe',
    'liberty leading',
    'demoiselles',
    'sunflower seeds',
    'shibboleth',
    'great wave',
    'taj mahal',
    'sanchi',
    'angkor',
    'moai',
  ];

  if (famousAnchors.some((term) => text.includes(term))) {
    historicalInfluence += 8;
    visualImpact += 6;
  }

  return {
    culturalPower: clamp(culturalPower),
    visualImpact: clamp(visualImpact),
    materialInnovation: clamp(materialInnovation),
    historicalInfluence: clamp(historicalInfluence),
    ageOfArtwork: estimateAgeScore(artwork),
  };
}

export const topTrumpCards: TopTrumpCard[] = artworks.map((artwork) => ({
  artworkId: artwork.id,
  apNumber: artwork.apNumber,
  title: artwork.title,
  unit: artwork.unit,
  date: artwork.date,
  culture: artwork.culture,
  attributes: scoreArtwork(artwork),
}));
