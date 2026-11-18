import type { Area } from '@/lib/types';

export const AREAS: Area[] = [
  {
    slug: 'lagmannsholmen',
    name: 'Lagmannsholmen',
    city: 'Kristiansand',
    municipality: 'Kristiansand kommune',
    region: 'Agder',
    coordinates: '58°08′38″N 07°59′52″Ø',
    status: 'Åpen høring',
    areaDekar: 165,
    plannedHomes: '1 100 – 1 800 boliger',
    timeline: 'Planfase 2026–2036',
    summary:
      'Kristiansands mest sentrale sjøfront står foran en historisk forvandling når containerhavna flyttes og halvøya åpnes mot Kvadraturen og Skagerrak.',
    contextBody:
      'Lagmannsholmen ligger bare få minutters gange fra Kvadraturen, Odderøya og Kilden teater og konserthus. Når den tunge havnedriften samles lenger øst, frigjøres over 165 dekar med enestående sjøfront. Skal den nye bydelen videreføre Kvadraturens menneskelige kvartaler og sørlandske byggeskikk — eller markere en ny arkitektonisk epoke? Her vises fire vidt forskjellige retninger side om side.',
    keyQuestions: [
      'Skal byggehøydene holdes på 3–5 etasjer i tråd med Kvadraturen, eller tillates høyere markørbygg?',
      'Hvor stor andel av halvøya bør settes av til åpne kystparker, sjøbad og offentlig kai?',
      'Hvordan sikres levende førsteetasjer med kultur, verksteder og handel hele året?',
    ],
    heroImageUrl: '/images/lagmannsholmen-hero.jpg',
    heroCaption:
      'Lagmannsholmen i Kristiansand sett fra sørvest i overgangen fra ettermiddag til skumring (AI-illustrasjon).',
    seedQualityAverages: {
      klassiskEstetikk: 4.3,
      gronneByrom: 4.5,
      menneskeligSkala: 4.4,
      aktivtByliv: 4.2,
    },
    seedQualityResponseCount: 412,
  },
  {
    slug: 'filipstad',
    name: 'Filipstad',
    city: 'Oslo',
    municipality: 'Oslo kommune',
    region: 'Østlandet',
    coordinates: '59°54′24″N 10°43′10″Ø',
    status: 'Åpen høring',
    areaDekar: 320,
    plannedHomes: '2 400 – 3 100 boliger',
    timeline: 'Utbygging 2026–2040',
    summary:
      'Etter tiår med fergeterminal og containerstabling skal vestsiden av Oslo sentrum bindes sammen med Oslofjorden gjennom en kilometerlang fjordpromenade.',
    contextBody:
      'Filipstad er et av Oslos største gjenværende transformasjonsområder ved sjøen. Debatten står mellom stramme kontinentale sandsteinsbulevarder med sammenhengende kvartaler og skulpturell samtidsarkitektur med åpne fjordamfier.',
    keyQuestions: [
      'Hvordan unngås en lukket mur mot Oslofjorden og skapes reell sjøkontakt for hele byen?',
      'Bør Oslo bygge klassiske kvartalsbulevarder som kontrast til Bjørvika?',
      'Hvordan løses overgangen mellom E18-lokk, parkdrag og badeplasser?',
    ],
    heroImageUrl: '/images/filipstad-hero.jpg',
    heroCaption:
      'Visjon for Filipstad fjordbulevard i Oslo ved solnedgang (AI-illustrasjon).',
    seedQualityAverages: {
      klassiskEstetikk: 4.0,
      gronneByrom: 4.4,
      menneskeligSkala: 3.9,
      aktivtByliv: 4.5,
    },
    seedQualityResponseCount: 289,
  },
  {
    slug: 'dokken',
    name: 'Dokken',
    city: 'Bergen',
    municipality: 'Bergen kommune',
    region: 'Vestland',
    coordinates: '60°23′11″N 05°18′48″Ø',
    status: 'Under utredning',
    areaDekar: 260,
    plannedHomes: '1 800 – 2 500 boliger',
    timeline: 'Utredning 2026–2038',
    summary:
      'Bergens nye fjordbydel på Dokken skal erstatte godshavna med bærekraftige nabolag som tåler vestlandsvær og viderefører bergensk bykultur.',
    contextBody:
      'Dokken binder sammen Nordnes, Møhlenpris og Puddefjorden. Når godsterminalen flyttes ut av sentrum, åpner byen et nytt kapittel. Utfordringen er å skape lune gater og grønne regnparker tilpasset bergensk klima, enten gjennom gavlhus inspirert av historiske brygger eller terrasserte kystparker.',
    keyQuestions: [
      'Hvordan videreføres bergenske gavlproporsjoner og smau i moderne skala?',
      'Hvor mye av kaiområdet skal avsettes til blågrønne regnparker og offentlig sjøfront?',
    ],
    heroImageUrl: '/images/dokken-hero.svg',
    heroCaption:
      'Dokken i Bergen — Arkitektonisk fasadeskisse (Konseptfase): Bryggekvartalet mot Byfjellene.',
    seedQualityAverages: {
      klassiskEstetikk: 4.1,
      gronneByrom: 4.6,
      menneskeligSkala: 4.3,
      aktivtByliv: 4.0,
    },
    seedQualityResponseCount: 194,
  },
  {
    slug: 'nyhavna',
    name: 'Nyhavna',
    city: 'Trondheim',
    municipality: 'Trondheim kommune',
    region: 'Trøndelag',
    coordinates: '63°26′19″N 10°25′36″Ø',
    status: 'Konseptfase',
    areaDekar: 220,
    plannedHomes: '1 600 – 2 200 boliger',
    timeline: 'Konseptfase 2026–2039',
    summary:
      'Trondheims gamle verfts- og havneområde ved Nidelvas utløp rommer sjeldne teglhaller, maritime verksteder og direkte utsikt over Trondheimsfjorden.',
    contextBody:
      'På Nyhavna møtes tung industrihistorie, kulturarv og krevende klimamål. Spørsmålet er om utviklingen skal forankres i de vernede røde teglhallene med nye murkvartaler, eller gi plass til modige, utkragede fjordterrasser i massivtre.',
    keyQuestions: [
      'Hvordan sikres det at kulturaktører, verksteder og industriarv ikke presses ut av boligpriser?',
      'Hvilket arkitektonisk uttrykk kler møtet mellom verftskraner og Trondheimsfjorden best?',
    ],
    heroImageUrl: '/images/nyhavna-hero.svg',
    heroCaption:
      'Nyhavna i Trondheim — Arkitektonisk fasadeskisse (Konseptfase): Verftskvartalet og bevart industriarv.',
    seedQualityAverages: {
      klassiskEstetikk: 4.2,
      gronneByrom: 4.1,
      menneskeligSkala: 4.2,
      aktivtByliv: 4.4,
    },
    seedQualityResponseCount: 163,
  },
];

export function getAreaBySlug(slug: string): Area | undefined {
  return AREAS.find((area) => area.slug === slug);
}
