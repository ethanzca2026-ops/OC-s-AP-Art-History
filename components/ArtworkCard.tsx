import { useState } from 'react';
import { Link } from 'expo-router';
import { Image, StyleSheet, Text, View } from 'react-native';
import type { Artwork } from '@/data/artworks';
import { getUnitColor } from '@/utils/unitColors';
import { artworkThumbnailUrl } from '@/utils/artworkImages';
import { getCachedArtworkSubThemes } from '@/utils/subThemeCache';

function colorValue(color: any, key: string, fallback: string) {
  return color?.[key] ?? fallback;
}

export function ArtworkCard({ artwork }: { artwork: Artwork }) {
  const unitColor = getUnitColor(artwork.unit);
  const [attempt, setAttempt] = useState(0);
  const imageUrl = artworkThumbnailUrl(artwork, attempt);
  const subThemeTags = getCachedArtworkSubThemes(artwork);

  const main = colorValue(unitColor, 'main', '#D97706');
  const border = colorValue(unitColor, 'border', main);
  const light = colorValue(unitColor, 'light', border);
  const soft = colorValue(unitColor, 'soft', '#FFFBEB');

  return (
    <Link href={`/artwork/${artwork.id}`} style={[styles.card, { borderColor: border, borderTopColor: main }]}>
      <View>
        <View style={[styles.imageFrame, { borderColor: light, backgroundColor: soft }]}>
          <Image
            key={`${artwork.id}-${attempt}`}
            source={{ uri: imageUrl }}
            style={styles.image}
            resizeMode="contain"
            onError={() => {
              if (attempt < 2) {
                setAttempt((current) => current + 1);
              }
            }}
          />
          <View style={styles.imageBadge}>
            <Text style={styles.imageBadgeText}>AP #{artwork.apNumber}</Text>
            <Text style={styles.imageBadgeSubText}>{artwork.unit}</Text>
          </View>
        </View>

        <Text style={[styles.identifier, { color: main }]}>#{artwork.apNumber} · {artwork.unit}</Text>
        <Text style={styles.title}>{artwork.title}</Text>
        <Text style={styles.meta}>{artwork.culture} · {artwork.date}</Text>
        <Text style={styles.description} numberOfLines={4}>{artwork.description}</Text>

        <View style={styles.tags}>
          {subThemeTags.slice(0, 3).map((theme) => (
            <Text key={theme} style={[styles.tag, { backgroundColor: soft }]}>{theme}</Text>
          ))}
        </View>
      </View>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: 280,
    maxWidth: 380,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderTopWidth: 5,
    shadowColor: '#7C2D12',
    shadowOpacity: 0.08,
    shadowRadius: 20,
  },
  imageFrame: {
    height: 190,
    borderRadius: 18,
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: 14,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 190,
  },
  imageBadge: {
    position: 'absolute',
    left: 10,
    bottom: 10,
    backgroundColor: 'rgba(255, 251, 235, 0.94)',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 7,
    maxWidth: '82%',
  },
  imageBadgeText: {
    color: '#9A3412',
    fontWeight: '900',
    fontSize: 15,
    marginBottom: 1,
  },
  imageBadgeSubText: {
    color: '#2F1B10',
    fontWeight: '800',
    fontSize: 11,
  },
  identifier: {
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  title: {
    color: '#2F1B10',
    fontSize: 22,
    lineHeight: 27,
    fontWeight: '900',
    marginBottom: 6,
  },
  meta: {
    color: '#6B4E3D',
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '800',
    marginBottom: 8,
  },
  description: {
    color: '#5C4033',
    fontSize: 14,
    lineHeight: 21,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
  },
  tag: {
    color: '#2F1B10',
    fontSize: 12,
    fontWeight: '900',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    overflow: 'hidden',
  },
});
