import { Link } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { NavBar } from '@/components/NavBar';
import { artworks } from '@/data/artworks';
import {
  getAvailableThemeGroupsWithinMainThemes,
  
  getThemeDescription,
} from '@/utils/subThemes';
import { getCachedSubThemeCount } from '@/utils/subThemeCache';

export default function ThemesScreen() {
  const availableThemeGroups = getAvailableThemeGroupsWithinMainThemes(artworks);

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <NavBar />

      <View style={styles.hero}>
        <Text style={styles.kicker}>Thematic links</Text>
        <Text style={styles.title}>Explore thematic connections.</Text>
        <Text style={styles.subtitle}>Explore artworks through visual analysis, context, materials, purpose, comparison, and AP Art History concepts.</Text>
      </View>

      <View style={styles.grid}>
        {availableThemeGroups.map((group) => (
          <View key={group.theme} style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.themeTextBlock}>
                <Text style={styles.themeTitle}>{group.theme}</Text>
                <Text style={styles.themeDescription}>{getThemeDescription(group.theme)}</Text>
              </View>
            </View>

            <View style={styles.subThemeList}>
              {group.subThemes.map((subTheme) => (
                <Link key={subTheme} href="/search" style={styles.subTheme}>
                  {subTheme} · {getCachedSubThemeCount(artworks, subTheme)}
                </Link>
              ))}
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { minHeight: '100%', paddingHorizontal: 22, paddingVertical: 30, backgroundColor: '#FFF7ED' },
  hero: { width: '100%', maxWidth: 1180, alignSelf: 'center', backgroundColor: '#FFFFFF', borderRadius: 30, padding: 28, borderWidth: 1, borderColor: '#FED7AA', marginBottom: 22 },
  kicker: { color: '#9A3412', fontWeight: '900', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 },
  title: { color: '#2F1B10', fontSize: 40, lineHeight: 46, fontWeight: '900', marginBottom: 8 },
  subtitle: { color: '#5C4033', fontSize: 17, lineHeight: 26, maxWidth: 840 },
  grid: { width: '100%', maxWidth: 1180, alignSelf: 'center', gap: 16 },
  card: { backgroundColor: '#FFFFFF', borderRadius: 24, padding: 22, borderWidth: 1, borderColor: '#FED7AA' },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', marginBottom: 14 },
  themeTextBlock: { flex: 1, minWidth: 260 },
  themeTitle: { color: '#2F1B10', fontSize: 26, fontWeight: '900', marginBottom: 6 },
  themeDescription: { color: '#5C4033', fontSize: 15, lineHeight: 22, fontWeight: '700' },
  subThemeList: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  subTheme: { color: '#7C2D12', fontWeight: '900', backgroundColor: '#FFFBEB', borderWidth: 1, borderColor: '#FED7AA', paddingHorizontal: 13, paddingVertical: 9, borderRadius: 999, overflow: 'hidden' },
});
