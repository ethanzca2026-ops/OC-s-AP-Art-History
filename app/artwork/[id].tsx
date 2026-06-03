import { Link, useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { NavBar } from '@/components/NavBar';
import { artworks, type Artwork } from '@/data/artworks';
import { ArtworkHeroImage } from '@/components/ArtworkHeroImage';
import { getArtworkSubThemes } from '@/utils/subThemes';

function cleanIdentifier(value: string, fallback: string) {
  if (!value) return fallback;
  const lower = value.toLowerCase();
  if (
    lower.includes('ap identifier medium') ||
    lower.includes('associated culture/site') ||
    lower.startsWith('within ')
  ) {
    return fallback;
  }
  return value;
}

function apIdentifierLine(artwork: Artwork) {
  const location = cleanIdentifier(artwork.location, artwork.culture);
  const culture = cleanIdentifier(artwork.culture, artwork.unit);
  const date = cleanIdentifier(artwork.date, artwork.periodDates);
  const medium = cleanIdentifier(artwork.medium, 'review exact AP medium');

  if (artwork.id === 'great-hall-of-the-bulls') {
    return 'Lascaux, France. Paleolithic Europe. 15,000–13,000 B.C.E. Rock painting.';
  }

  return `${location}. ${culture}. ${date}. ${medium}.`;
}

function artworkSummary(artwork: Artwork) {
  return artwork.description;
}

function apNeedToKnow(artwork: Artwork) {
  if (artwork.whyItMatters.includes('|')) {
    return artwork.whyItMatters.split('|').map((item) => item.trim()).filter(Boolean);
  }

  return [
    `Memorize the identifier: title, culture or artist, date, medium, and location.`,
    `Explain function, not just appearance.`,
    `Use context. Connect the work to ${artwork.unit} and its cultural setting.`,
    `Use form as evidence: material, scale, composition, technique, surface, space, pose, or viewer interaction.`,
    `Use comparison with another work that shares material, purpose, subject, power, belief, or identity themes.`
  ];
}

export default function ArtworkDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const artwork = artworks.find((item) => item.id === id);

  if (!artwork) {
    return (
      <ScrollView contentContainerStyle={styles.page}>
        <NavBar />
        <View style={styles.card}><Text style={styles.title}>Artwork not found</Text><Link href="/search" style={styles.back}>Back to search</Link></View>
      </ScrollView>
    );
  }

  const related = artwork.comparisons.map((comparisonId) => artworks.find((item) => item.id === comparisonId)).filter(Boolean);
  const medium = cleanIdentifier(artwork.medium, 'Use the AP title card to review the exact medium, material, and technique.');
  const location = cleanIdentifier(artwork.location, artwork.culture);
  const date = cleanIdentifier(artwork.date, artwork.periodDates);
  const themes = artwork.themes.join(', ');
  const needToKnow = apNeedToKnow(artwork);
  const subThemeTags = getArtworkSubThemes(artwork);

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <NavBar />
      <View style={styles.card}>
        <Link href="/search" style={styles.back}>← Back to search</Link>
        <ArtworkHeroImage artwork={artwork} />
        <Text style={styles.identifier}>AP #{artwork.apNumber} · {artwork.unit}</Text>
        <Text style={styles.title}>{artwork.title}</Text>
        <Text style={styles.meta}>{artwork.artist ? `${artwork.artist} · ` : ''}{artwork.culture} · {date}</Text>
        <View style={styles.infoGrid}>
          <View style={styles.infoBox}><Text style={styles.infoLabel}>Period</Text><Text style={styles.infoText}>{artwork.periodLabel}</Text></View>
          <View style={styles.infoBox}><Text style={styles.infoLabel}>Medium</Text><Text style={styles.infoText}>{medium}</Text></View>
          <View style={styles.infoBox}><Text style={styles.infoLabel}>Location / Culture</Text><Text style={styles.infoText}>{location}</Text></View>
          <View style={styles.infoBox}><Text style={styles.infoLabel}>Main themes</Text><Text style={styles.infoText}>{themes}</Text></View>
        </View>

        <Text style={styles.sectionTitle}>AP identifier</Text>
        <View style={styles.contentBox}>
          <Text style={styles.identifierSentence}>{apIdentifierLine(artwork)}</Text>
        </View>

        <Text style={styles.sectionTitle}>Description</Text>
        <View style={styles.contentBox}>
          <Text style={styles.body}>{artworkSummary(artwork)}</Text>
        </View>

        <Text style={styles.sectionTitle}>Sub-theme tags</Text>
        <View style={styles.subThemeRow}>
          {subThemeTags.map((tag) => (
            <Text key={tag} style={styles.subThemePill}>{tag}</Text>
          ))}
        </View>

        <Text style={styles.sectionTitle}>What you need to know for AP</Text>
        <View style={styles.mustKnowBox}>
          {needToKnow.map((item, index) => (
            <View key={item} style={styles.mustKnowItem}>
              <Text style={styles.mustKnowLabel}>{index + 1}</Text>
              <Text style={styles.body}>{item}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Comparison starters</Text>
        {related.length > 0 ? related.map((item) => item && <Link key={item.id} href={`/artwork/${item.id}`} style={styles.related}>• {item.title}</Link>) : <Text style={styles.body}>Comparison links will appear here.</Text>}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { minHeight: '100%', paddingHorizontal: 22, paddingVertical: 30, backgroundColor: '#FFF7ED' },
  card: { width: '100%', maxWidth: 960, alignSelf: 'center', backgroundColor: '#FFFFFF', borderRadius: 30, padding: 26, borderWidth: 1, borderColor: '#FED7AA' },
  back: { color: '#9A3412', fontWeight: '900', marginBottom: 18 },
  identifier: { color: '#9A3412', fontWeight: '900', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 },
  title: { color: '#2F1B10', fontSize: 44, lineHeight: 50, fontWeight: '900', marginBottom: 10 },
  meta: { color: '#6B4E3D', fontSize: 18, lineHeight: 26, fontWeight: '800', marginBottom: 20 },
  infoGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 22 },
  infoBox: { flexGrow: 1, flexBasis: 220, backgroundColor: '#FFFBEB', borderRadius: 18, padding: 16, borderWidth: 1, borderColor: '#FED7AA' },
  infoLabel: { color: '#9A3412', fontWeight: '900', marginBottom: 6 },
  infoText: { color: '#2F1B10', fontWeight: '800', lineHeight: 22 },
  sectionTitle: { color: '#2F1B10', fontSize: 22, fontWeight: '900', marginTop: 16, marginBottom: 8 },
  contentBox: { backgroundColor: '#FFFBEB', borderRadius: 20, padding: 18, borderWidth: 1, borderColor: '#FED7AA' },
  identifierSentence: { color: '#2F1B10', fontSize: 17, lineHeight: 25, fontWeight: '900' },
  mustKnowBox: { backgroundColor: '#FFFBEB', borderRadius: 20, padding: 18, borderWidth: 1, borderColor: '#FED7AA', gap: 14 },
  mustKnowItem: { flexDirection: 'row', gap: 12, borderBottomWidth: 1, borderBottomColor: '#FED7AA', paddingBottom: 12 },
  mustKnowLabel: { color: '#9A3412', fontWeight: '900', minWidth: 20 },
  body: { color: '#5C4033', fontSize: 16, lineHeight: 25, flex: 1 },
  subThemeRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, backgroundColor: '#FFFBEB', borderRadius: 20, padding: 16, borderWidth: 1, borderColor: '#FED7AA' },
  subThemePill: { color: '#7C2D12', fontWeight: '900', backgroundColor: '#FEF3C7', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 999, overflow: 'hidden' },
  related: { display: 'flex', color: '#7C2D12', fontWeight: '900', marginBottom: 8, fontSize: 16 }
});
