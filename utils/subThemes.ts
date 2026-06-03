import type { Artwork } from '@/data/artworks';

export type ThemeGroup = {
  theme: string;
  description: string;
  subThemes: string[];
};

export const themeGroups: ThemeGroup[] = [
  {
    theme: 'Culture and context',
    description: 'Setting, belief system, social use, historical background, and the culture that shaped the artwork.',
    subThemes: ['Cultural identity', 'Historical context', 'Social values', 'Tradition', 'Community use', 'Cultural exchange', 'Syncretism', 'Colonial context', 'Ethnographic interpretation', 'Cultural setting', 'Local tradition', 'Cultural memory']
  },
  {
    theme: 'Visual analysis',
    description: 'What you can directly see: line, color, texture, composition, scale, material, style, pose, and space.',
    subThemes: ['Line', 'Color', 'Texture', 'Composition', 'Scale', 'Style', 'Shape and form', 'Space', 'Pose', 'Movement', 'Symmetry', 'Pattern', 'Surface detail', 'Visual evidence']
  },
  {
    theme: 'Form and style',
    description: 'How the artwork looks and how its style helps communicate meaning.',
    subThemes: ['Naturalism', 'Abstraction', 'Idealization', 'Hieratic scale', 'Linear perspective', 'Foreshortening', 'Contrapposto', 'Optical refinement', 'Tenebrism', 'Broken brushstrokes', 'Geometric forms', 'Multiple viewpoints', 'Stylization', 'Expressive distortion']
  },
  {
    theme: 'Function and purpose',
    description: 'What the artwork was made to do: ritual, political, devotional, decorative, narrative, educational, or conceptual.',
    subThemes: ['Ritual function', 'Political function', 'Devotional function', 'Narrative function', 'Decorative function', 'Educational function', 'Conceptual function', 'Commemorative function', 'Funerary function', 'Protective function', 'Ceremonial function', 'Public function', 'Private function', 'Didactic purpose']
  },
  {
    theme: 'Content and iconography',
    description: 'Subject matter, symbols, stories, figures, motifs, texts, and images that carry meaning.',
    subThemes: ['Symbolism', 'Iconography', 'Mythology', 'Religious narrative', 'Political narrative', 'Historical narrative', 'Portraiture', 'Animal imagery', 'Cosmology', 'Allegory', 'Text and image', 'Continuous narrative', 'Vision imagery', 'Composite creature', 'Guardian figure']
  },
  {
    theme: 'Materials and process',
    description: 'Material, technique, craft, labor, technology, and making process as sources of meaning.',
    subThemes: ['Local materials', 'Luxury materials', 'Craftsmanship', 'Carving', 'Casting', 'Weaving', 'Fresco', 'Mosaic', 'Oil paint', 'Printmaking', 'Photography', 'Installation', 'Performance', 'Mass production', 'Recycled materials', 'Industrial materials', 'Adobe and mud brick', 'Concrete', 'Manuscript illumination', 'Textiles', 'Metalwork', 'Woodwork', 'Ceramics', 'Mixed media']
  },
  {
    theme: 'Purpose and audience',
    description: 'Who paid for, used, viewed, displayed, or controlled the artwork.',
    subThemes: ['Elite patronage', 'Religious patronage', 'Imperial patronage', 'Public audience', 'Private devotion', 'Museum display', 'Market culture', 'Commission', 'Ownership', 'Viewer experience', 'Immersive experience', 'Site-specific audience', 'Court audience', 'Civic audience', 'Domestic audience']
  },
  {
    theme: 'Power and rulership',
    description: 'Rulers, government, empire, conquest, propaganda, law, authority, and public power.',
    subThemes: ['Propaganda', 'Divine kingship', 'Political authority', 'Military victory', 'Law and order', 'Empire', 'Dynasty', 'Public monument', 'State power', 'Absolute monarchy', 'Court narrative', 'Royal portraiture', 'Ruler cult', 'Imperial image', 'Civic virtue']
  },
  {
    theme: 'Religion and belief',
    description: 'Sacred spaces, worship, ritual, pilgrimage, afterlife, devotion, relics, cosmology, and religious symbolism.',
    subThemes: ['Sacred space', 'Devotion', 'Pilgrimage', 'Ritual', 'Ceremony', 'Afterlife', 'Relics', 'Prayer', 'Ancestor worship', 'Spiritual transformation', 'Aniconism', 'Circumambulation', 'Axis mundi', 'Mandala', 'Shamanic interpretation', 'Religious syncretism', 'Sacred narrative', 'Cult image']
  },
  {
    theme: 'Architecture and space',
    description: 'Buildings, cities, sacred sites, engineering, movement through space, and spatial experience.',
    subThemes: ['Post-and-lintel', 'Basilica plan', 'Central plan', 'Hypostyle hall', 'Four-iwan plan', 'Dome', 'Pendentive', 'Arch and vault', 'Flying buttress', 'Urban planning', 'Sacred architecture', 'Domestic space', 'Procession', 'Monumentality', 'Axis and orientation', 'Temple mountain', 'Rock-cut space', 'Terracing', 'Courtyard', 'Oculus', 'Coffering', 'Muqarnas']
  },
  {
    theme: 'Identity and society',
    description: 'Gender, race, class, family, labor, social roles, personal identity, and collective identity.',
    subThemes: ['Gender', 'Race', 'Class', 'Family', 'Labor', 'Self-portrait', 'Personal identity', 'Collective identity', 'Community identity', 'Resistance', 'Social role', 'National identity', 'Identity politics', 'Diaspora identity', 'Black identity', 'Indigenous identity', 'Colonial identity', 'Hybrid identity']
  },
  {
    theme: 'Interactions and exchange',
    description: 'Trade, migration, religious spread, conquest, colonialism, syncretism, hybridity, and global circulation.',
    subThemes: ['Trade routes', 'Silk Road', 'Atlantic exchange', 'Religious spread', 'Colonialism', 'Syncretism', 'Hybridity', 'Imported materials', 'Migration', 'Diaspora', 'Cross-cultural dialogue', 'Global circulation', 'Islamic-Christian layers', 'Postcolonial critique', 'Cultural appropriation', 'Transcultural style']
  },
  {
    theme: 'Conflict and memory',
    description: 'War, trauma, revolution, conquest, commemoration, memorials, resistance, and historical memory.',
    subThemes: ['War', 'Violence', 'Trauma', 'Commemoration', 'Memorial', 'Revolution', 'Colonial violence', 'Resistance', 'Social critique', 'Historical memory', 'Division and racism', 'Political protest', 'National history', 'Conquest', 'Occupation', 'Collective trauma']
  },
  {
    theme: 'Nature and environment',
    description: 'Animals, landscape, agriculture, water, cosmology, fertility, ecology, and human relationships with nature.',
    subThemes: ['Animals', 'Landscape', 'Fertility', 'Agriculture', 'Water', 'Cosmos', 'Body and nature', 'Ecology', 'Hunting', 'Seasons', 'Astronomical alignment', 'Natural resources', 'Sublime nature', 'Gardens', 'Oceanic environment', 'Environmental concern']
  },
  {
    theme: 'Period and movement',
    description: 'Historical styles and movements that help identify works and compare change over time.',
    subThemes: ['Prehistoric', 'Ancient Near East', 'Egyptian', 'Greek', 'Roman', 'Late Antique', 'Byzantine', 'Medieval', 'Romanesque', 'Gothic', 'Renaissance', 'Baroque', 'Neoclassicism', 'Romanticism', 'Realism', 'Impressionism', 'Post-Impressionism', 'Cubism', 'Surrealism', 'Abstract Expressionism', 'Pop Art', 'Minimalism', 'Conceptual art', 'Feminist art', 'Global contemporary']
  },
  {
    theme: 'AP Big Ideas',
    description: 'College Board style “big idea” thinking: culture, interactions, theories, materials/process, and purpose/audience.',
    subThemes: ['Culture Big Idea', 'Interactions Big Idea', 'Theory and interpretation Big Idea', 'Materials and process Big Idea', 'Purpose and audience Big Idea', 'Culture setting question', 'Interaction question', 'Material meaning question', 'Purpose question', 'Interpretation question']
  },
  {
    theme: 'AP skills',
    description: 'AP Art History thinking skills used in MCQs and FRQs.',
    subThemes: ['Visual analysis', 'Contextual analysis', 'Comparison', 'Continuity and change', 'Attribution', 'Interpretation', 'Argumentation', 'Art beyond the image set', 'Evidence-based reasoning', 'Specific visual evidence', 'Unknown work strategy', 'Thesis evidence']
  },
  {
    theme: 'Comparison framework',
    description: 'Reusable FRQ comparison categories: form, function, content, context, patronage, religion, trade, politics, and change.',
    subThemes: ['Form comparison', 'Function comparison', 'Content comparison', 'Context comparison', 'Patronage comparison', 'Religion comparison', 'Trade comparison', 'Political comparison', 'Continuity and change', 'Cross-cultural comparison', 'Historical reaction', 'Parallel structure', 'Similarities and differences']
  },
  {
    theme: 'Prehistory and ancient themes',
    description: 'Early image-making, inferred function, ritual, funerary belief, rulers, empire, architecture, and classical form.',
    subThemes: ['Art before writing', 'Inferred function', 'Ethnographic analogy', 'Oldest known art', 'Cave painting', 'Post-and-lintel', 'Ritual status object', 'Mud brick platform', 'Hieratic scale', 'Composite guardian', 'Ka and afterlife', 'Greek orders', 'Classical idealism', 'Roman concrete']
  },
  {
    theme: 'Europe and colonial Americas themes',
    description: 'Christian imagery, church plans, manuscripts, Renaissance perspective, Baroque drama, colonial race, and syncretism.',
    subThemes: ['Good Shepherd', 'Orant figure', 'Basilica church', 'Central-plan church', 'Imperial mosaics', 'Illuminated manuscript', 'Interlace', 'Tympanum sculpture', 'Stained glass', 'Linear perspective', 'Oil technique', 'Tenebrism', 'Theatricality', 'Casta system', 'Catholic-Indigenous syncretism']
  },
  {
    theme: 'Later Europe and Americas themes',
    description: 'Art movements from Neoclassicism to modernism, each reacting to the one before it.',
    subThemes: ['Civic virtue', 'Sublime emotion', 'Everyday subjects', 'Light and moment', 'Structure beyond Impressionism', 'Emotional color', 'Pointillism', 'Multiple viewpoints', 'Dream imagery', 'Gesture and scale', 'Consumer imagery', 'Industrial object', 'Idea over object', 'Feminist critique', 'Public social justice']
  },
  {
    theme: 'Indigenous Americas and Africa themes',
    description: 'Community-based, ritual, performative, political, cosmological, and post-contact art practices.',
    subThemes: ['Transformational imagery', 'Bloodletting ritual', 'Vision serpent', 'Cosmology', 'Ashlar masonry', 'Cliff dwellings', 'Effigy mound', 'Trade beads', 'Performative object', 'Memory board', 'Power figure', 'Oaths', 'Female initiation', 'Court narrative', 'Authority object']
  },
  {
    theme: 'Asia and Islamic art themes',
    description: 'Islamic aniconism and calligraphy, Buddhist and Hindu sacred forms, scroll painting, and cross-cultural court art.',
    subThemes: ['Aniconism', 'Calligraphy', 'Geometric pattern', 'Arabesque', 'Muqarnas', 'Four-iwan plan', 'Persian miniature', 'Text-image integration', 'Buddhist stupa', 'Torana', 'Circumambulation', 'Hindu cosmic dance', 'Temple mountain', 'Literati painting', 'Zen aesthetics', 'Ukiyo-e print']
  },
  {
    theme: 'Pacific and global contemporary themes',
    description: 'Navigation, ancestry, mana, ephemerality, globalization, identity politics, and installation/performance.',
    subThemes: ['Navigation', 'Mana', 'Ancestor figure', 'Ephemeral design', 'Wave pattern map', 'Bark cloth', 'Globalization', 'Postcolonial identity', 'Race and power', 'Gender and religion', 'Recycling and trade', 'Layered maps', 'Division and racism', 'Body as medium', 'Viewer participation']
  },

];

export const allSubThemeTags = Array.from(new Set(themeGroups.flatMap((group) => group.subThemes))).sort();

function textForArtwork(artwork: Artwork) {
  return [
    artwork.title,
    artwork.artist ?? '',
    artwork.culture,
    artwork.date,
    artwork.unit,
    artwork.periodLabel,
    artwork.periodDates,
    artwork.medium,
    artwork.location,
    artwork.description,
    artwork.whyItMatters,
    ...(artwork.themes ?? []),
    ...(artwork.contentTags ?? []),
  ].join(' ').toLowerCase();
}

function hasAny(text: string, words: string[]) {
  return words.some((word) => text.includes(word.toLowerCase()));
}

function add(tagSet: Set<string>, tags: string[]) {
  tags.forEach((tag) => {
    if (allSubThemeTags.includes(tag)) {
      tagSet.add(tag);
    }
  });
}

function addByTheme(artwork: Artwork, tags: Set<string>) {
  for (const theme of artwork.themes ?? []) {
    if (theme === 'Cultural context') add(tags, ['Cultural identity', 'Historical context', 'Social values', 'Tradition', 'Community use', 'Culture Big Idea']);
    if (theme === 'Form and meaning') add(tags, ['Symbolism', 'Composition', 'Scale', 'Materials', 'Technique', 'Visual analysis', 'Form comparison']);
    if (theme === 'Power and rulership') add(tags, ['Political authority', 'Propaganda', 'State power', 'Public monument', 'Royal portraiture', 'Political comparison']);
    if (theme === 'Religion and belief') add(tags, ['Sacred space', 'Devotion', 'Ritual', 'Ceremony', 'Prayer', 'Religion comparison']);
    if (theme === 'Identity and society') add(tags, ['Personal identity', 'Collective identity', 'Community identity', 'Social role', 'Resistance']);
    if (theme === 'Architecture and space') add(tags, ['Sacred architecture', 'Urban planning', 'Viewer experience', 'Monumentality']);
    if (theme === 'Patronage and audience') add(tags, ['Elite patronage', 'Public audience', 'Religious patronage', 'Private devotion', 'Purpose and audience Big Idea']);
    if (theme === 'Materials and process') add(tags, ['Materials', 'Craftsmanship', 'Local materials', 'Luxury materials', 'Materials and process Big Idea']);
    if (theme === 'Conflict and memory') add(tags, ['Commemoration', 'Resistance', 'War', 'Social critique', 'Historical memory']);
    if (theme === 'Nature and environment') add(tags, ['Animals', 'Landscape', 'Body and nature', 'Cosmos', 'Ecology']);
  }
}

function addByUnit(artwork: Artwork, tags: Set<string>) {
  const unit = artwork.unit;
  if (unit === 'Global Prehistory') add(tags, ['Prehistoric', 'Art before writing', 'Inferred function', 'Ethnographic analogy', 'Ritual function', 'Animals', 'Hunting', 'Oldest known art']);
  if (unit === 'Ancient Mediterranean') add(tags, ['Ancient Near East', 'Egyptian', 'Greek', 'Roman', 'Political authority', 'Afterlife', 'Empire', 'Roman concrete', 'Classical idealism']);
  if (unit === 'Early Europe and Colonial Americas') add(tags, ['Late Antique', 'Byzantine', 'Medieval', 'Romanesque', 'Gothic', 'Renaissance', 'Baroque', 'Devotion', 'Sacred space', 'Catholic-Indigenous syncretism']);
  if (unit === 'Later Europe and Americas') add(tags, ['Neoclassicism', 'Romanticism', 'Realism', 'Impressionism', 'Post-Impressionism', 'Cubism', 'Surrealism', 'Pop Art', 'Social critique']);
  if (unit === 'Indigenous Americas') add(tags, ['Ritual', 'Community identity', 'Cosmology', 'Astronomical alignment', 'Colonial context', 'Transformational imagery']);
  if (unit === 'Africa') add(tags, ['Performance', 'Performative object', 'Activated object', 'Ancestor worship', 'Community use', 'Ritual', 'Authority object']);
  if (unit === 'West and Central Asia') add(tags, ['Aniconism', 'Sacred space', 'Trade routes', 'Islamic-Christian layers', 'Cultural exchange', 'Calligraphy']);
  if (unit === 'South, East, and Southeast Asia') add(tags, ['Sacred space', 'Devotion', 'Mandala', 'Circumambulation', 'Landscape', 'Spiritual transformation']);
  if (unit === 'The Pacific') add(tags, ['Ancestor worship', 'Ephemeral design', 'Performance', 'Oceanic environment', 'Community identity', 'Navigation', 'Mana']);
  if (unit === 'Global Contemporary') add(tags, ['Global contemporary', 'Identity politics', 'Postcolonial critique', 'Installation art', 'Globalization', 'Social critique']);
}

export function getArtworkSubThemes(artwork: Artwork) {
  const text = textForArtwork(artwork);
  const tags = new Set<string>();

  addByTheme(artwork, tags);
  addByUnit(artwork, tags);

  if (hasAny(text, ['apollo', 'lascaux', 'stonehenge', 'prehistoric', 'paleolithic', 'neolithic'])) add(tags, ['Cave painting', 'Prehistoric', 'Inferred function', 'Ritual function']);
  if (hasAny(text, ['ziggurat', 'narmer', 'lamassu', 'hammurabi', 'assyria', 'babylon', 'sumer'])) add(tags, ['Ancient Near East', 'Hieratic scale', 'Law and order', 'Composite guardian']);
  if (hasAny(text, ['pyramid', 'sphinx', 'egypt', 'pharaoh', 'ka', 'scribe'])) add(tags, ['Egyptian', 'Ka and afterlife', 'Divine kingship', 'Funerary function']);
  if (hasAny(text, ['kouros', 'doryphoros', 'parthenon', 'athena', 'alexander', 'greek'])) add(tags, ['Greek', 'Greek orders', 'Classical idealism', 'Contrapposto']);
  if (hasAny(text, ['pantheon', 'colosseum', 'augustus', 'pompeii', 'roman'])) add(tags, ['Roman', 'Concrete', 'Arch and vault', 'Political function']);
  if (hasAny(text, ['catacomb', 'santa sabina', 'san vitale', 'hagia sophia'])) add(tags, ['Basilica plan', 'Central plan', 'Pendentive', 'Imperial mosaics']);
  if (hasAny(text, ['lindisfarne', 'bayeux', 'chartres', 'sainte-foy'])) add(tags, ['Illuminated manuscript', 'Interlace', 'Tympanum sculpture', 'Stained glass']);
  if (hasAny(text, ['giotto', 'van eyck', 'michelangelo', 'brunelleschi'])) add(tags, ['Renaissance', 'Oil technique', 'Linear perspective', 'Fresco']);
  if (hasAny(text, ['caravaggio', 'bernini', 'versailles'])) add(tags, ['Baroque', 'Tenebrism', 'Theatricality', 'Absolute monarchy']);
  if (hasAny(text, ['casta', 'guadalupe'])) add(tags, ['Casta system', 'Catholic-Indigenous syncretism', 'Race', 'Syncretism']);

  if (hasAny(text, ['propaganda', 'victory', 'triumph', 'war', 'battle', 'empire', 'procession', 'king', 'queen', 'emperor', 'ruler'])) add(tags, ['Propaganda', 'Political function', 'Military victory', 'State power']);
  if (hasAny(text, ['ceremony', 'ritual', 'sacred', 'temple', 'shrine', 'altar', 'mask'])) add(tags, ['Ceremony', 'Ritual', 'Ceremonial function']);
  if (hasAny(text, ['dance', 'music', 'performance', 'performative'])) add(tags, ['Performance', 'Dance', 'Music', 'Activated object']);
  if (hasAny(text, ['community', 'identity', 'culture', 'indigenous', 'nation'])) add(tags, ['Community identity', 'Collective identity', 'Cultural identity']);
  if (hasAny(text, ['trade', 'exchange', 'cross-cultural', 'silk road', 'global'])) add(tags, ['Cultural exchange', 'Trade routes', 'Cross-cultural influence', 'Interactions Big Idea']);
  if (hasAny(text, ['stone', 'wood', 'bronze', 'gold', 'silver', 'jade', 'ivory', 'clay', 'terracotta', 'textile', 'paint', 'ink', 'charcoal', 'marble', 'concrete'])) add(tags, ['Materials', 'Materials and process Big Idea']);
  if (hasAny(text, ['symbol', 'symbolic', 'iconography', 'meaning'])) add(tags, ['Symbolism', 'Iconography', 'Content comparison']);
  if (hasAny(text, ['portrait', 'self-portrait', 'self portrait'])) add(tags, ['Portraiture', 'Self-portrait', 'Personal identity']);
  if (hasAny(text, ['church', 'mosque', 'temple', 'stupa', 'cathedral', 'shrine'])) add(tags, ['Sacred space', 'Sacred architecture']);
  if (hasAny(text, ['afterlife', 'tomb', 'burial', 'funerary', 'mummy'])) add(tags, ['Afterlife', 'Funerary function']);
  if (hasAny(text, ['colonial', 'colonialism', 'postcolonial'])) add(tags, ['Colonialism', 'Colonial context', 'Postcolonial critique']);
  if (hasAny(text, ['migration', 'diaspora', 'exile'])) add(tags, ['Migration', 'Diaspora']);
  if (hasAny(text, ['social', 'critique', 'injustice', 'protest'])) add(tags, ['Social critique', 'Political protest']);
  if (hasAny(text, ['animal', 'bull', 'horse', 'bird', 'deer', 'bison', 'jaguar', 'snake'])) add(tags, ['Animals', 'Animal imagery']);
  if (hasAny(text, ['landscape', 'mountain', 'garden', 'river', 'nature'])) add(tags, ['Landscape', 'Nature and environment']);
  if (hasAny(text, ['photograph', 'photo', 'camera'])) add(tags, ['Photography', 'New media']);
  if (hasAny(text, ['print', 'woodcut', 'etching', 'lithograph'])) add(tags, ['Printmaking', 'Reproduction']);
  if (hasAny(text, ['installation', 'site-specific', 'viewer'])) add(tags, ['Installation', 'Viewer participation', 'Viewer experience']);

  add(tags, ['Visual analysis', 'Contextual analysis', 'Form comparison', 'Function comparison', 'Context comparison', 'Evidence-based reasoning']);

  return Array.from(tags).slice(0, 24);
}

export function getSubThemeCount(artworks: Artwork[], subTheme: string) {
  return artworks.filter((artwork) => getArtworkSubThemes(artwork).includes(subTheme)).length;
}

export function getSubThemeCountForMainTheme(artworks: Artwork[], mainTheme: string, subTheme: string) {
  return getSubThemeCount(artworks, subTheme);
}

export function getAvailableThemeGroupsWithinMainThemes(artworks: Artwork[]) {
  return themeGroups
    .map((group) => ({
      ...group,
      subThemes: group.subThemes.filter((subTheme) => getSubThemeCount(artworks, subTheme) > 0),
    }))
    .filter((group) => group.subThemes.length > 0);
}

export function getThemeDescription(theme: string) {
  return themeGroups.find((group) => group.theme === theme)?.description ?? '';
}

export function getSubThemesForGroup(theme: string) {
  return themeGroups.find((group) => group.theme === theme)?.subThemes ?? [];
}
