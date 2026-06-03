import { Link } from 'expo-router';
import { ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import { NavBar } from '@/components/NavBar';
import { artworks, periodGroups } from '@/data/artworks';
import { getUnitPalette } from '@/utils/unitColors';

export default function HomeScreen() {
  const unitsByPeriod = periodGroups.map((period) => ({
    ...period,
    count: artworks.filter((artwork) => artwork.unit === period.unit).length,
    palette: getUnitPalette(period.unit)
  }));

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <NavBar />

      <View style={styles.bannerFrame}>
        <Image
          source={{ uri: '/top-trump-home-banner.png' }}
          style={styles.topTrumpBanner}
          resizeMode="cover"
        />
      </View>
      <View style={styles.sectionHeader}>
        <View>
          <Text style={styles.sectionTitle}>Study units by time era</Text>
          <Text style={styles.sectionSubtitle}>Each AP content area has its own color so the units and artwork flashcards are easier to scan visually.</Text>
        </View>
      </View>

      <View style={styles.periodList}>
        {unitsByPeriod.map((period) => (
          <View key={period.id} style={[styles.periodSection, { borderColor: period.palette.border }]}> 
            <View style={[styles.colorBar, { backgroundColor: period.palette.accent }]} />
            <View style={styles.periodHeader}>
              <View style={styles.periodTextBlock}>
                <Text style={[styles.periodRange, { backgroundColor: period.palette.soft, color: period.palette.text }]}>{period.range}</Text>
                <Text style={styles.periodTitle}>{period.title}</Text>
                <Text style={[styles.periodDates, { color: period.palette.accent }]}>{period.dates}</Text>
                <Text style={styles.periodCount}>{period.count} required works</Text>
              </View>
              <Link href={`/search?unit=${encodeURIComponent(period.unit)}`} style={[styles.periodLink, { backgroundColor: period.palette.soft, color: period.palette.text }]}>Open era →</Link>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  bannerFrame: {
    width: '100%',
    maxWidth: 1180,
    alignSelf: 'center',
    height: 185,
    borderRadius: 28,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#FED7AA',
    marginBottom: 22,
    backgroundColor: '#FFFFFF',
  },
  topTrumpBanner: {
    width: '100%',
    height: '100%',
  },
  page: { minHeight: '100%', paddingHorizontal: 22, paddingVertical: 30, backgroundColor: '#FFF7ED' },
  sectionHeader: { width: '100%', maxWidth: 1180, alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14, gap: 18 },
  sectionTitle: { color: '#2F1B10', fontSize: 28, fontWeight: '900' },
  sectionSubtitle: { color: '#6B4E3D', fontSize: 15, lineHeight: 22, fontWeight: '700', marginTop: 6, maxWidth: 760 },
  inlineLink: { color: '#9A3412', fontWeight: '900' },
  periodList: { width: '100%', maxWidth: 1180, alignSelf: 'center', gap: 16 },
  periodSection: { width: '100%', backgroundColor: '#FFFFFF', borderRadius: 28, padding: 20, borderWidth: 1, overflow: 'hidden' },
  colorBar: { height: 8, marginHorizontal: -20, marginTop: -20, marginBottom: 18 },
  periodHeader: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 12, alignItems: 'flex-start' },
  periodTextBlock: { flex: 1, minWidth: 260 },
  periodRange: { alignSelf: 'flex-start', overflow: 'hidden', borderRadius: 999, fontWeight: '900', paddingHorizontal: 10, paddingVertical: 6, marginBottom: 10 },
  periodTitle: { color: '#2F1B10', fontSize: 23, lineHeight: 29, fontWeight: '900', marginBottom: 4 },
  periodDates: { fontWeight: '900', marginBottom: 6 },
  periodCount: { color: '#6B4E3D', fontWeight: '800' },
  periodLink: { overflow: 'hidden', borderRadius: 14, fontWeight: '900', paddingHorizontal: 14, paddingVertical: 10 }
});
