import type { Actor } from '@/lib/types';

export const ACTORS: Actor[] = [
  {
    slug: 'arkitekturopproret-sor',
    name: 'Arkitekturopprøret Sør',
    category: 'Arkitekturbevegelse',
    city: 'Kristiansand',
    tagline: 'For menneskelig skala, klassisk kvartalsby og varig byggeskikk',
    philosophy:
      'Vi arbeider for at nye bydeler skal oppleves som en naturlig og vakker forlengelse av byens historiske sjel. I stedet for monotone bokser og høyhustetthet fremmer vi klassiske proporsjoner, rike tegl- og pussfasader, saltak og lune gårdsrom som tåler å eldes med verdighet.',
    focusTags: ['Klassisk kvartalsby', 'Menneskelig skala', 'Tegl & puss', 'Stedsidentitet'],
    websiteLabel: 'Eksempelbidrag (Demo) · Borgerinitiativ',
    isDemoProfile: true,
  },
  {
    slug: 'nyurbanisme-norge',
    name: 'Nyurbanisme Norge',
    category: 'Urbanisme-studio',
    city: 'Oslo / Kristiansand',
    tagline: 'Gåvennlige nabolag bygget rundt møteplasser og lokal trehusarv',
    philosophy:
      'Nyurbanisme setter hverdagens gangavstand i sentrum. Vi tegner blandede kvartaler hvor boliger, småbutikker, verksteder og kultur lever tett sammen langs smale, solfylte gater og lune torg — forankret i norsk kyst- og trebytradisjon.',
    focusTags: ['15-minuttersbyen', 'Trearkitektur', 'Småskala næring', 'Gatetun'],
    websiteLabel: 'Eksempelbidrag (Demo) · Urbanismenettverk',
    isDemoProfile: true,
  },
  {
    slug: 'nordlys-arkitekter',
    name: 'Nordlys Arkitekter',
    category: 'Arkitektkontor',
    city: 'Oslo',
    tagline: 'Skulpturell nordisk samtidighet i massivtre, glass og naturstein',
    philosophy:
      'Våre byvisjoner forener internasjonal arkitektonisk presisjon med nordisk lys og fjordkontakt. Vi utforsker hvordan åpne kulturpaviljonger, trappet silhuett og ambisiøse materialmøter kan gi nye kystbydeler et internasjonalt landemerkepreg.',
    focusTags: ['Samtidsarkitektur', 'Massivtre', 'Kulturbygg', 'Fjordpromenade'],
    websiteLabel: 'Eksempelbidrag (Demo) · Arkitektkontor',
    isDemoProfile: true,
  },
  {
    slug: 'fjord-og-form-studio',
    name: 'Fjord & Form Studio',
    category: 'Landskap & Byform',
    city: 'Bergen',
    tagline: 'Naturpositive kystbydeler der økologi og gjenbruk styrer byformen',
    philosophy:
      'Når gamle havner åpnes for byen, har vi en sjelden sjanse til å gi kystnaturen plass tilbake. Vi prioriterer lav bebyggelse, regnbed, gjenbruk av eksisterende havnebygg, sjøbad og offentlige allmenninger helt ned til vannkanten.',
    focusTags: ['Kystøkologi', 'Ombruk av industriarv', 'Blågrønn struktur', 'Sjøbad'],
    websiteLabel: 'Eksempelbidrag (Demo) · Landskapsstudio',
    isDemoProfile: true,
  },
  {
    slug: 'klassisk-byggeskikk',
    name: 'Klassisk Byggeskikk',
    category: 'Arkitektkontor',
    city: 'Oslo',
    tagline: 'Kontinentale fjordbulevarder med sandstein, arkader og taklandskap',
    philosophy:
      'Vi mener Norges viktigste sjøfronter fortjener den samme arkitektoniske tyngden som Europas mest elskede havnebyer. Med symmetriske akser, sandsteinsfasader og åpne arkader på gateplan skaper vi varige byrom for generasjoner.',
    focusTags: ['Sandstein & granitt', 'Arkader', 'Aksesymmetri', 'Bulevarder'],
    websiteLabel: 'Eksempelbidrag (Demo) · Arkitektkontor',
    isDemoProfile: true,
  },
  {
    slug: 'verftet-urbanisme',
    name: 'Verftet Urbanisme',
    category: 'Urbanisme-studio',
    city: 'Trondheim',
    tagline: 'Industriell sjøfartshistorie møter varme murkvartaler langs fjorden',
    philosophy:
      'Gamle verft og pakkhus bærer byens kollektive hukommelse. Vi lar historiske teglhaller danne ryggraden i nye bydeler, og fyller inn med robuste, tradisjonstro mur- og trekvartaler som respekterer den maritime silhuetten.',
    focusTags: ['Industriarv', 'Teglstein', 'Verftskarakter', 'Maritim byform'],
    websiteLabel: 'Eksempelbidrag (Demo) · Urbanisme-studio',
    isDemoProfile: true,
  },
];

export function getActorBySlug(slug: string): Actor | undefined {
  return ACTORS.find((actor) => actor.slug === slug);
}
