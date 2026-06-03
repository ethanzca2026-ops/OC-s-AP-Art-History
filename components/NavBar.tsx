import { Link } from 'expo-router';
import { StyleSheet, View } from 'react-native';

export function NavBar() {
  return (
    <View style={styles.nav}>
      <Link href="/" style={styles.logo}>OC's AP Art History</Link>
      <View style={styles.links}>
        <Link href="/search" style={styles.navSearchBar}>⌕  Search artworks...</Link>
        <Link href="/themes" style={styles.link}>Themes</Link>
        <Link href="/questions" style={styles.link}>OC's Top Trump</Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  nav: {
    width: '100%',
    maxWidth: 1180,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 28,
    gap: 18,
  },
  logo: {
    fontSize: 44,
    fontWeight: '900',
    color: '#2F1B10',
  },
  links: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    alignItems: 'center',
  },
  navSearchBar: {
    color: '#6B4E3D',
    fontSize: 15,
    fontWeight: '900',
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#FED7AA',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 999,
    overflow: 'hidden',
    minWidth: 230,
  },
  link: {
    color: '#7C2D12',
    fontSize: 15,
    fontWeight: '800',
    backgroundColor: '#FFF7ED',
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 999,
    overflow: 'hidden',
  },
});
