export type UnitPalette = {
  accent: string;
  soft: string;
  border: string;
  text: string;
  dark: string;
};

const defaultPalette: UnitPalette = {
  accent: '#F97316',
  soft: '#FFEDD5',
  border: '#FED7AA',
  text: '#7C2D12',
  dark: '#431407'
};

export const unitPalettes: Record<string, UnitPalette> = {
  'Global Prehistory': { accent: '#D97706', soft: '#FEF3C7', border: '#FCD34D', text: '#78350F', dark: '#451A03' },
  'Ancient Mediterranean': { accent: '#DC2626', soft: '#FEE2E2', border: '#FCA5A5', text: '#7F1D1D', dark: '#450A0A' },
  'Early Europe and Colonial Americas': { accent: '#9333EA', soft: '#F3E8FF', border: '#D8B4FE', text: '#581C87', dark: '#3B0764' },
  'Later Europe and Americas': { accent: '#2563EB', soft: '#DBEAFE', border: '#93C5FD', text: '#1E3A8A', dark: '#172554' },
  'Indigenous Americas': { accent: '#059669', soft: '#D1FAE5', border: '#6EE7B7', text: '#064E3B', dark: '#022C22' },
  Africa: { accent: '#EA580C', soft: '#FFEDD5', border: '#FDBA74', text: '#7C2D12', dark: '#431407' },
  'West and Central Asia': { accent: '#0891B2', soft: '#CFFAFE', border: '#67E8F9', text: '#164E63', dark: '#083344' },
  'South, East, and Southeast Asia': { accent: '#DB2777', soft: '#FCE7F3', border: '#F9A8D4', text: '#831843', dark: '#500724' },
  'The Pacific': { accent: '#4F46E5', soft: '#E0E7FF', border: '#A5B4FC', text: '#312E81', dark: '#1E1B4B' },
  'Global Contemporary': { accent: '#65A30D', soft: '#ECFCCB', border: '#BEF264', text: '#365314', dark: '#1A2E05' }
};

export function getUnitPalette(unit: string): UnitPalette {
  return unitPalettes[unit] || defaultPalette;
}

const fallbackUnitColor = {
  main: '#D97706',
  light: '#FED7AA',
  soft: '#FFFBEB',
  border: '#F59E0B',
};

export function getUnitColor(unit: string) {
  return fallbackUnitColor;
}
