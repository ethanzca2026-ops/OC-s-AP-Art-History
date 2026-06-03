import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { NavBar } from '@/components/NavBar';

const DOWNLOAD_URL = '/oc-top-trump-printable-cards-with-online-images.zip';

export default function TopTrumpScreen() {
  return (
    <ScrollView contentContainerStyle={styles.page}>
      <NavBar />

      <View style={styles.hero}>
        <Text style={styles.kicker}>OC&apos;s Top Trump</Text>
        <Text style={styles.title}>Printable artwork card deck.</Text>
        <Text style={styles.subtitle}>
          Download the printable OC&apos;s Top Trump card file and open it in your browser to print or save as a PDF.
        </Text>

        <Pressable onPress={() => Linking.openURL(DOWNLOAD_URL)} style={styles.downloadButton}>
          <Text style={styles.downloadButtonText}>Download Printable Cards ZIP</Text>
        </Pressable>

        <Text style={styles.note}>
          The file includes a printable card layout with online artwork images.
        </Text>
      </View>

      <View style={styles.instructionsCard}>
        <Text style={styles.instructionsTitle}>Printing instructions</Text>
        <Text style={styles.instructionsText}>
          Open the HTML file inside the ZIP, wait for images to load, then press Ctrl + P. Choose Letter paper, turn on background graphics, and save as PDF or print.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { minHeight: '100%', paddingHorizontal: 22, paddingVertical: 30, backgroundColor: '#FFF7ED' },
  hero: { width: '100%', maxWidth: 1180, alignSelf: 'center', backgroundColor: '#FFFFFF', borderRadius: 30, padding: 34, borderWidth: 1, borderColor: '#FED7AA', marginBottom: 22, alignItems: 'flex-start' },
  kicker: { color: '#9A3412', fontWeight: '900', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 },
  title: { color: '#2F1B10', fontSize: 44, lineHeight: 50, fontWeight: '900', marginBottom: 10 },
  subtitle: { color: '#5C4033', fontSize: 17, lineHeight: 26, maxWidth: 820, marginBottom: 22 },
  downloadButton: { backgroundColor: '#9A3412', borderRadius: 999, paddingHorizontal: 22, paddingVertical: 14, marginBottom: 12 },
  downloadButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '900' },
  note: { color: '#6B4E3D', fontSize: 14, fontWeight: '800' },
  instructionsCard: { width: '100%', maxWidth: 1180, alignSelf: 'center', backgroundColor: '#FFFFFF', borderRadius: 24, padding: 24, borderWidth: 1, borderColor: '#FED7AA' },
  instructionsTitle: { color: '#2F1B10', fontSize: 24, lineHeight: 30, fontWeight: '900', marginBottom: 8 },
  instructionsText: { color: '#5C4033', fontSize: 16, lineHeight: 25, fontWeight: '700' },
});
