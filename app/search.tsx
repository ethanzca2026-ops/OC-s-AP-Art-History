import { useEffect, useMemo, useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { NavBar } from '@/components/NavBar';
import { ArtworkCard } from '@/components/ArtworkCard';
import { FilterChip } from '@/components/FilterChip';
import { artworks, units } from '@/data/artworks';
import { searchArtworks } from '@/utils/search';
import { getThemeDescription, getSubThemesForGroup } from '@/utils/subThemes';
import {
  getCachedArtworkSubThemes,
  getCachedAvailableThemeGroups,
  getCachedSubThemeCount,
} from '@/utils/subThemeCache';

function artworkMatchesThemeGroup(artwork: any, theme: string) {
  if (theme === 'All') return true;

  const groupSubThemes = getSubThemesForGroup(theme);
  const artworkSubThemes = getCachedArtworkSubThemes(artwork);

  return (
    artwork.themes.includes(theme) ||
    groupSubThemes.some((subTheme) => artworkSubThemes.includes(subTheme))
  );
}

export default function SearchScreen() {
  const [keyword, setKeyword] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('All');
  const [selectedMainTheme, setSelectedMainTheme] = useState('All');
  const [selectedSubTheme, setSelectedSubTheme] = useState('All');
  const [themePopupOpen, setThemePopupOpen] = useState(false);
  const [popupTheme, setPopupTheme] = useState('Culture and context');
  const [visibleCount, setVisibleCount] = useState(30);

  const availableThemeGroups = useMemo(() => getCachedAvailableThemeGroups(artworks), []);
  const popupGroup = availableThemeGroups.find((group) => group.theme === popupTheme) ?? availableThemeGroups[0];

  const results = useMemo(() => {
    const baseResults = searchArtworks(artworks, {
      keyword,
      unit: selectedUnit,
      theme: 'All',
    });

    return baseResults.filter((artwork) => {
      if (selectedSubTheme !== 'All') {
        return getCachedArtworkSubThemes(artwork).includes(selectedSubTheme);
      }

      return artworkMatchesThemeGroup(artwork, selectedMainTheme);
    });
  }, [keyword, selectedUnit, selectedMainTheme, selectedSubTheme]);

  const displayedResults = useMemo(() => results.slice(0, visibleCount), [results, visibleCount]);

  useEffect(() => {
    setVisibleCount(30);
  }, [keyword, selectedUnit, selectedMainTheme, selectedSubTheme]);

  function openThemePopup(theme: string) {
    setPopupTheme(theme);
    setThemePopupOpen(true);
  }

  function selectThemeOnly(theme: string) {
    setSelectedMainTheme(theme);
    setSelectedSubTheme('All');
    setThemePopupOpen(false);
  }

  function selectSubTheme(theme: string, subTheme: string) {
    setSelectedMainTheme(theme);
    setSelectedSubTheme(subTheme);
    setThemePopupOpen(false);
  }

  function clearThemeFilters() {
    setSelectedMainTheme('All');
    setSelectedSubTheme('All');
    setThemePopupOpen(false);
  }

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <NavBar />

      <View style={styles.hero}>
        <Text style={styles.kicker}>Artwork search</Text>
        <Text style={styles.heading}>Explore the AP Art History collection.</Text>
        <Text style={styles.subtitle}>
          Search by title, AP number, artist, culture, medium, period, theme, sub-theme, location, comparison type, or idea.
        </Text>

        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>⌕</Text>
          <TextInput
            value={keyword}
            onChangeText={setKeyword}
            placeholder="Search artworks"
            placeholderTextColor="#9CA3AF"
            style={styles.input}
            returnKeyType="search"
          />
        </View>
      </View>

      <View style={styles.filterSection}>
        <Text style={styles.filterTitle}>Filter by AP unit</Text>
        <View style={styles.chipRow}>
          {['All', ...units].map((unit) => (
            <FilterChip key={unit} label={unit} active={selectedUnit === unit} onPress={() => setSelectedUnit(unit)} />
          ))}
        </View>

        <Text style={styles.filterTitle}>Filter by theme</Text>
        <Text style={styles.filterHint}>Select a theme to refine the collection.</Text>
        <View style={styles.chipRow}>
          <FilterChip label="All themes" active={selectedMainTheme === 'All' && selectedSubTheme === 'All'} onPress={clearThemeFilters} />
          {availableThemeGroups.map((group) => (
            <FilterChip
              key={group.theme}
              label={group.theme}
              active={selectedMainTheme === group.theme}
              onPress={() => openThemePopup(group.theme)}
            />
          ))}
        </View>

        {(selectedMainTheme !== 'All' || selectedSubTheme !== 'All') && (
          <View style={styles.activeFilterBox}>
            <Text style={styles.activeFilterText}>
              Active theme filter: {selectedMainTheme}{selectedSubTheme !== 'All' ? ` → ${selectedSubTheme}` : ''}
            </Text>
            <Pressable onPress={clearThemeFilters} style={styles.clearButton}>
              <Text style={styles.clearButtonText}>Clear</Text>
            </Pressable>
          </View>
        )}
      </View>

      <View style={styles.resultsHeader}>
        <Text style={styles.resultsTitle}>{results.length} artwork{results.length === 1 ? '' : 's'} found</Text>
      </View>

      <View style={styles.grid}>
        {displayedResults.map((artwork) => (
          <ArtworkCard key={artwork.id} artwork={artwork} />
        ))}
      </View>

      {visibleCount < results.length && (
        <View style={styles.loadMoreWrap}>
          <Pressable onPress={() => setVisibleCount((current) => current + 30)} style={styles.loadMoreButton}>
            <Text style={styles.loadMoreText}>Load more artworks</Text>
          </Pressable>
          <Text style={styles.loadMoreHint}>Showing {displayedResults.length} of {results.length}</Text>
        </View>
      )}

      <Modal visible={themePopupOpen} transparent animationType="fade" onRequestClose={() => setThemePopupOpen(false)}>
        <Pressable style={styles.modalBackdrop} onPress={() => setThemePopupOpen(false)}>
          <Pressable style={styles.modalCard} onPress={() => {}}>
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalKicker}>Theme filter</Text>
                <Text style={styles.modalTitle}>{popupGroup?.theme}</Text>
              </View>
              <Pressable onPress={() => setThemePopupOpen(false)} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>×</Text>
              </Pressable>
            </View>

            <Text style={styles.modalDescription}>{popupGroup ? getThemeDescription(popupGroup.theme) : ''}</Text>
            <Text style={styles.modalSubtitle}>Select the full theme or refine by sub-theme.</Text>

            {popupGroup && (
              <>
                <Pressable
                  onPress={() => selectThemeOnly(popupGroup.theme)}
                  style={[
                    styles.subThemeOption,
                    selectedMainTheme === popupGroup.theme && selectedSubTheme === 'All' ? styles.selectedSubThemeOption : null,
                  ]}
                >
                  <Text style={[
                    styles.subThemeOptionText,
                    selectedMainTheme === popupGroup.theme && selectedSubTheme === 'All' ? styles.selectedSubThemeOptionText : null,
                  ]}>
                    ✓ All {popupGroup.theme}
                  </Text>
                </Pressable>

                <View style={styles.subThemeGrid}>
                  {popupGroup.subThemes.map((subTheme) => {
                    const count = getCachedSubThemeCount(artworks, subTheme);
                    return (
                      <Pressable
                        key={subTheme}
                        onPress={() => selectSubTheme(popupGroup.theme, subTheme)}
                        style={[
                          styles.subThemeOption,
                          selectedSubTheme === subTheme ? styles.selectedSubThemeOption : null,
                        ]}
                      >
                        <Text style={[
                          styles.subThemeOptionText,
                          selectedSubTheme === subTheme ? styles.selectedSubThemeOptionText : null,
                        ]}>
                          {selectedSubTheme === subTheme ? '✓ ' : ''}{subTheme} · {count}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              </>
            )}
          </Pressable>
        </Pressable>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { minHeight: '100%', paddingHorizontal: 22, paddingVertical: 30, backgroundColor: '#FFF7ED' },
  hero: { width: '100%', maxWidth: 1180, alignSelf: 'center', backgroundColor: '#FFFFFF', borderRadius: 30, padding: 28, borderWidth: 1, borderColor: '#FED7AA', marginBottom: 18 },
  kicker: { color: '#9A3412', fontWeight: '900', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 },
  heading: { color: '#2F1B10', fontSize: 40, lineHeight: 46, fontWeight: '900', marginBottom: 8 },
  subtitle: { color: '#5C4033', fontSize: 17, lineHeight: 26, maxWidth: 850 },
  searchBar: { width: '100%', maxWidth: 780, alignSelf: 'center', flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 999, borderWidth: 2, borderColor: '#FED7AA', paddingHorizontal: 20, paddingVertical: 6, marginTop: 18, marginBottom: 4 },
  searchIcon: { color: '#9A3412', fontSize: 30, fontWeight: '900', marginRight: 12, marginBottom: 2 },
  input: { flex: 1, minHeight: 54, borderWidth: 0, backgroundColor: 'transparent', color: '#2F1B10', fontSize: 19, fontWeight: '800' },
  filterSection: { width: '100%', maxWidth: 1180, alignSelf: 'center', backgroundColor: '#FFFFFF', borderRadius: 24, padding: 20, borderWidth: 1, borderColor: '#FED7AA', marginBottom: 16 },
  filterTitle: { color: '#2F1B10', fontSize: 17, fontWeight: '900', marginBottom: 6, marginTop: 8 },
  filterHint: { color: '#6B4E3D', fontWeight: '800', marginBottom: 10 },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 12 },
  activeFilterBox: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 10, backgroundColor: '#FEF3C7', borderWidth: 2, borderColor: '#F59E0B', borderRadius: 18, padding: 14, marginTop: 8 },
  activeFilterText: { color: '#7C2D12', fontWeight: '900', fontSize: 15 },
  clearButton: { backgroundColor: '#9A3412', paddingHorizontal: 13, paddingVertical: 8, borderRadius: 999 },
  clearButtonText: { color: '#FFFFFF', fontWeight: '900' },
  resultsHeader: { width: '100%', maxWidth: 1180, alignSelf: 'center', marginBottom: 12 },
  resultsTitle: { color: '#2F1B10', fontSize: 22, fontWeight: '900' },
  grid: { width: '100%', maxWidth: 1180, alignSelf: 'center', flexDirection: 'row', flexWrap: 'wrap', gap: 16 },
  loadMoreWrap: { width: '100%', maxWidth: 1180, alignSelf: 'center', alignItems: 'center', gap: 10, marginTop: 22, marginBottom: 20 },
  loadMoreButton: { backgroundColor: '#9A3412', borderRadius: 999, paddingHorizontal: 22, paddingVertical: 13 },
  loadMoreText: { color: '#FFFFFF', fontWeight: '900', fontSize: 16 },
  loadMoreHint: { color: '#6B4E3D', fontWeight: '800' },
  modalBackdrop: { flex: 1, backgroundColor: 'rgba(47, 27, 16, 0.42)', justifyContent: 'center', alignItems: 'center', padding: 22 },
  modalCard: { width: '100%', maxWidth: 720, maxHeight: '86%', backgroundColor: '#FFFFFF', borderRadius: 28, borderWidth: 2, borderColor: '#FED7AA', padding: 24 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 8 },
  modalKicker: { color: '#9A3412', fontWeight: '900', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 },
  modalTitle: { color: '#2F1B10', fontSize: 30, lineHeight: 36, fontWeight: '900' },
  closeButton: { backgroundColor: '#FFF7ED', borderRadius: 999, width: 38, height: 38, alignItems: 'center', justifyContent: 'center' },
  closeButtonText: { color: '#9A3412', fontSize: 28, fontWeight: '900', lineHeight: 30 },
  modalDescription: { color: '#5C4033', fontSize: 16, lineHeight: 24, fontWeight: '700', marginBottom: 8 },
  modalSubtitle: { color: '#9A3412', fontSize: 14, lineHeight: 22, fontWeight: '900', marginBottom: 14 },
  subThemeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  subThemeOption: { backgroundColor: '#FFFBEB', borderColor: '#FED7AA', borderWidth: 2, borderRadius: 999, paddingHorizontal: 14, paddingVertical: 10, marginBottom: 8 },
  selectedSubThemeOption: { backgroundColor: '#9A3412', borderColor: '#9A3412' },
  subThemeOptionText: { color: '#7C2D12', fontWeight: '900' },
  selectedSubThemeOptionText: { color: '#FFFFFF' },
});
