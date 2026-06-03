import { Link } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function AboutScreen() {
  return (
    <ScrollView contentContainerStyle={styles.page}>
      <View style={styles.card}>
        <Link href="/" style={styles.back}>← Back home</Link>
        <Text style={styles.title}>Project foundation is ready.</Text>
        <Text style={styles.body}>
          This route is only a placeholder. You can replace it with your real website pages,
          login screen, dashboard, product pages, or any app functionality later.
        </Text>
        <Text style={styles.body}>
          The same codebase can run in Expo Go, development builds, Android/iOS EAS builds,
          and as a static website export.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    minHeight: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#F8FAFC'
  },
  card: {
    width: '100%',
    maxWidth: 760,
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
    padding: 32,
    borderWidth: 1,
    borderColor: '#E2E8F0'
  },
  back: {
    color: '#2563EB',
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 24
  },
  title: {
    fontSize: 38,
    lineHeight: 44,
    fontWeight: '900',
    color: '#0F172A',
    marginBottom: 18
  },
  body: {
    fontSize: 18,
    lineHeight: 29,
    color: '#475569',
    marginBottom: 14
  }
});
