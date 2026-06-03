import { useMemo, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import type { Artwork } from '@/data/artworks';
import { artworkThumbnailUrl } from '@/utils/artworkImages';

export function ArtworkHeroImage({ artwork }: { artwork: Artwork }) {
  const [attempt, setAttempt] = useState(0);
  const fallbackSubtitle = useMemo(() => artwork.unit, [artwork.unit]);
  const imageUrl = artworkThumbnailUrl(artwork, attempt);
  const maxAttempts = 3;

  return (
    <View style={styles.imageFrame}>
      <Image
        key={`${artwork.id}-${attempt}`}
        source={{ uri: imageUrl }}
        style={styles.image}
        resizeMode="contain"
        onError={() => {
          if (attempt < maxAttempts - 1) {
            setAttempt((current) => current + 1);
          }
        }}
      />
      <View style={styles.overlayBadge}>
        <Text style={styles.overlayBadgeText}>AP #{artwork.apNumber}</Text>
        <Text style={styles.overlayBadgeSubText}>{fallbackSubtitle}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imageFrame: {
    minHeight: 380,
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#FED7AA',
    marginBottom: 20,
    backgroundColor: '#FFFBEB',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 380,
    backgroundColor: '#FFFBEB',
  },
  overlayBadge: {
    position: 'absolute',
    left: 14,
    bottom: 14,
    backgroundColor: 'rgba(255, 251, 235, 0.92)',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#FED7AA',
    maxWidth: '80%',
  },
  overlayBadgeText: {
    color: '#9A3412',
    fontWeight: '900',
    fontSize: 20,
    marginBottom: 2,
  },
  overlayBadgeSubText: {
    color: '#2F1B10',
    fontWeight: '800',
  },
});
