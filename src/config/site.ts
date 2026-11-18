import type { ArchitecturalStyle, QualityMetricKey } from '@/lib/types';

export const SITE_CONFIG = {
  name: 'Bysjon',
  shortMark: 'BYSJON',
  tagline: 'Norges åpne plattform for byutvikling og arkitektur',
  description:
    'Utforsk fremtidens norske bydeler før spaden settes i jorda. Sammenlign arkitekturforslag side om side, se illustrasjoner i full størrelse og delta i åpne innbyggeravstemninger.',
  email: 'redaksjon@bysjon.no',
  locationLabel: 'Norge — Kristiansand · Oslo · Bergen · Trondheim',
} as const;

export const NAV_LINKS = [
  { href: '/omrader', label: 'Områder' },
  { href: '/omrader/lagmannsholmen', label: 'Lagmannsholmen' },
  { href: '/aktorer', label: 'Aktører' },
  { href: '/om', label: 'Om Bysjon' },
] as const;

export const STYLE_META: Record<
  ArchitecturalStyle,
  {
    label: string;
    shortDesc: string;
    accentColor: string;
    badgeBg: string;
    badgeBorder: string;
  }
> = {
  Klassisk: {
    label: 'Klassisk',
    shortDesc: 'Tidløs kvartalsstruktur, murverk, saltak og menneskelig skala',
    accentColor: '#DFC38D',
    badgeBg: 'rgba(201, 169, 110, 0.14)',
    badgeBorder: 'rgba(201, 169, 110, 0.45)',
  },
  Nyurbanisme: {
    label: 'Nyurbanisme',
    shortDesc: 'Gåvennlige gater, trehusarv, lokale plasser og blandet bruk',
    accentColor: '#C5D1B8',
    badgeBg: 'rgba(139, 163, 128, 0.14)',
    badgeBorder: 'rgba(139, 163, 128, 0.45)',
  },
  Moderne: {
    label: 'Moderne',
    shortDesc: 'Skulpturell form, massivtre, glass og nyskapende byrom',
    accentColor: '#A9C3D9',
    badgeBg: 'rgba(122, 162, 196, 0.14)',
    badgeBorder: 'rgba(122, 162, 196, 0.45)',
  },
  Økologisk: {
    label: 'Økologisk',
    shortDesc: 'Naturbaserte kystparker, gjenbruk, lav høyde og sjøkontakt',
    accentColor: '#9AC6AE',
    badgeBg: 'rgba(110, 170, 138, 0.14)',
    badgeBorder: 'rgba(110, 170, 138, 0.45)',
  },
};

export const ALL_STYLES: ArchitecturalStyle[] = [
  'Klassisk',
  'Nyurbanisme',
  'Moderne',
  'Økologisk',
];

export const QUALITY_METRICS: Array<{
  key: QualityMetricKey;
  label: string;
  lowLabel: string;
  highLabel: string;
  description: string;
}> = [
  {
    key: 'klassiskEstetikk',
    label: 'Klassisk estetikk og stedstilpasning',
    lowLabel: 'Nyskapende uttrykk',
    highLabel: 'Sterkt tradisjonsforankret',
    description: 'Hvor viktig er gjenkjennelige fasader, materialvarme og historisk byform?',
  },
  {
    key: 'gronneByrom',
    label: 'Grønne byrom og sjøtilgang',
    lowLabel: 'Bygget tetthet først',
    highLabel: 'Maksimert park & kystline',
    description: 'Andel offentlig tilgjengelig brygge, vegetasjon og bilfrie plasser.',
  },
  {
    key: 'menneskeligSkala',
    label: 'Menneskelig skala og lav byggehøyde',
    lowLabel: 'Høye signalbygg',
    highLabel: 'Lave kvartaler (3–5 etg.)',
    description: 'Vektlegging av solforhold, gateromsproporsjoner og trivsel i øyehøyde.',
  },
  {
    key: 'aktivtByliv',
    label: 'Aktivt byliv og næring på gateplan',
    lowLabel: 'Rolige boliggater',
    highLabel: 'Levende bygulv & handel',
    description: 'Kafeer, verksteder, kulturscener og møteplasser langs hele kaien.',
  },
];
