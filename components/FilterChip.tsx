import { Pressable, StyleSheet, Text } from 'react-native';

type FilterChipProps = {
  label: string;
  active: boolean;
  onPress: () => void;
};

export function FilterChip({ label, active, onPress }: FilterChipProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.chip, active ? styles.activeChip : styles.inactiveChip]}
    >
      <Text style={[styles.label, active ? styles.activeLabel : styles.inactiveLabel]}>
        {active ? '✓ ' : ''}{label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    borderRadius: 999,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 2,
    overflow: 'hidden',
  },
  inactiveChip: {
    backgroundColor: '#FFFBEB',
    borderColor: '#FED7AA',
  },
  activeChip: {
    backgroundColor: '#9A3412',
    borderColor: '#9A3412',
  },
  label: {
    fontSize: 14,
    fontWeight: '900',
  },
  inactiveLabel: {
    color: '#7C2D12',
  },
  activeLabel: {
    color: '#FFFFFF',
  },
});
