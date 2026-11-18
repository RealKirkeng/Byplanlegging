import type { Proposal } from '@/lib/types';

export const SEED_PROPOSALS: Proposal[] = [
  // =========================================================
  // LAGMANNS­HOLMEN, KRISTIANSAND (4 kontrasterende forslag)
  // =========================================================
  {
    slug: 'lagmannsholmen-kvartaler',
    areaSlug: 'lagmannsholmen',
    actorSlug: 'arkitekturopproret-sor',
    title: 'Lagmannsholmen Kvartaler',
    subtitle: 'Klassisk nordisk kvartalsby med arkader mot sjøen og lune gårdsrom',
    style: 'Klassisk',
    maxFloors: 5,
    estimatedHomes: 1320,
    greenSpacePercent: 34,
    primaryMaterials: 'Håndbanket tegl, kalkpuss, naturstein og skifer-/tegltak',
    streetLifeSummary:
      'Sammenhengende buearkader langs kaikanten med bokhandel, bakeri, sjømathall og små håndverksbedrifter.',
    architecturalVision:
      'I stedet for å bryte med Kristiansands historiske struktur viderefører dette forslaget Kvadraturens rettvinklede gatenett rett ut på Lagmannsholmen. Byggehøydene holdes konsekvent på fire til fem etasjer med variasjon i gesims, valmede og skrå tak og rikt artikulerte fasader. De lukkede kvartalene skjermer grønne fellesgårder mot havgufs, samtidig som gaterommene åpner siktlinjer rett mot Odderøya og Skagerrak.',
    principles: [
      'Fast gatelinje og 4–5 etasjers kvartaler som gir le mot sørlandsvinden.',
      'Overdekkede arkader på gateplan slik at kaia kan brukes også på regntunge høstdager.',
      'Individuelle tomtefasader i tegl og kalkpuss så gaten oppleves som bygget over tid, ikke støpt i én form.',
      'Bilfrie tverrgater med granittbelegning og tydelige siktakser mot fjorden.',
    ],
    highlights: [
      'Høy stedstilpasning til Kvadraturen og Posebyen',
      'Naturlig vindskjerming i halvprivate gårdsrom',
      'Tidløs materialbruk med lavt vedlikeholdsbehov',
    ],
    tradeoffs: [
      'Høyere fasadekostnad enn prefabrikkerte betongelementer',
      'Lavere utnyttelse enn tårnmodeller (1 320 vs. 1 800 boliger)',
    ],
    heroImageUrl: '/images/lagmannsholmen-klassisk.jpg',
    galleryImages: [
      {
        url: '/images/lagmannsholmen-klassisk.jpg',
        caption: 'Kaipromenade med klassiske murkvartaler og arkader i skumringslys (AI-illustrasjon)',
        perspective: 'Sjøfront / Oversikt',
      },
      {
        url: '/images/lagmannsholmen-klassisk-gate.jpg',
        caption: 'Gateplan og byplass med utsikt mot fjorden og kystøyene (AI-illustrasjon)',
        perspective: 'Gateplan / Byplass',
      },
    ],
    seedVotes: 486,
    submittedAt: '2026-10-12',
  },
  {
    slug: 'sorlandets-treby',
    areaSlug: 'lagmannsholmen',
    actorSlug: 'nyurbanisme-norge',
    title: 'Sørlandets Treby',
    subtitle: 'Menneskelig skala i tre og mur rundt intime bryggetorg og småbåtkai',
    style: 'Nyurbanisme',
    maxFloors: 4,
    estimatedHomes: 1180,
    greenSpacePercent: 42,
    primaryMaterials: 'Kjerneved av furu, hvit og okergul trekledning, lokal murstein',
    streetLifeSummary:
      'Gatetun i øyehøyde med verksteder, kajakkutleie, nabolagskafé og trebrygger med seilbåtplasser.',
    architecturalVision:
      'Sørlandets Treby oversetter den sørlandske trehusbyens varme til moderne, tette og klimasmarte nabolag. Bebyggelsen varierer mellom to og fire etasjer rundt små torg og bilfrie smau, der familieleiligheter og rekkehus har direkte dør til gaten. Hele halvøya bindes sammen av en kontinuerlig trebrygge og lommeparker med bjørk og kystflora.',
    principles: [
      'Maks fire etasjer sikrer sol på torgene gjennom hele dagen.',
      'Blandet funksjon i hvert kvartal: bolig, nærmatbutikk, verksted og barnehage innen 5 minutters gange.',
      'Trekonstruksjon i kombinasjon med tegl i utsatte sokkeletasjer mot saltvann.',
      'Direkte båtplass- og sjøkontakt i hele vestre havnebasseng.',
    ],
    highlights: [
      'Svært familievennlige gaterom og lommeparker',
      'Lavest klimaavtrykk i konstruksjonsfasen gjennom nordisk trebruk',
      'Sterk lokal forankring i sørlandsk byggeskikk',
    ],
    tradeoffs: [
      'Lavere boligtetthet kan gi høyere infrastrukturkostnad per bolig',
      'Krever bevisst vedlikeholdsplan for treverk i salt kystluft',
    ],
    heroImageUrl: '/images/lagmannsholmen-nyurbanisme.jpg',
    galleryImages: [
      {
        url: '/images/lagmannsholmen-nyurbanisme.jpg',
        caption: 'Menneskelig tre- og murby rundt lunt bryggetorg og seilbåtkai (AI-illustrasjon)',
        perspective: 'Bryggetorg / Sjøfront',
      },
    ],
    seedVotes: 374,
    submittedAt: '2026-10-15',
  },
  {
    slug: 'krystallkaien',
    areaSlug: 'lagmannsholmen',
    actorSlug: 'nordlys-arkitekter',
    title: 'Krystallkaien',
    subtitle: 'Skulpturell samtidsarkitektur i massivtre, basalt og utkraget kulturpaviljong',
    style: 'Moderne',
    maxFloors: 9,
    estimatedHomes: 1740,
    greenSpacePercent: 38,
    primaryMaterials: 'Mørk basaltstein, synlig massivtre, jernfattig glass og børstet granitt',
    streetLifeSummary:
      'Åpen kulturpaviljong utkraget over fjorden, utstillingsrom, restaurantterrasse og lysende sjøpromenade.',
    architecturalVision:
      'Krystallkaien posisjonerer Kristiansand som et internasjonalt utstillingsvindu for nordisk samtidsarkitektur. Trappede volumer i mørk basalt og varmt massivtre stiger fra tre etasjer ved bryggekanten opp til ni etasjer mot bysiden, slik at utsikten åpnes for flest mulig. På spissen av holmen krager en offentlig kulturpaviljong ut over Skagerrak og danner en ny arkitektonisk signatur sammen med Kilden.',
    principles: [
      'Trappede bygningsvolumer som fanger kveldssolen og skjermer hovedpromenaden.',
      'Offentlig kulturpaviljong helt på spissen uten privatisering av odden.',
      'Gjennomgående høykapasitets gang- og sykkelakse fra Kvadraturen til Odderøya.',
      'Energieffektiv kompakt byform med plass til 1 740 boliger sentralt i byen.',
    ],
    highlights: [
      'Høyest boligkapasitet nær kollektivknutepunkt og sentrum',
      'Markant kulturattraksjon som trekker besøkende året rundt',
      'Presise materialmøter mellom mørk naturstein og varmt treverk',
    ],
    tradeoffs: [
      'Opp til ni etasjer bryter tydelig med Kvadraturens tradisjonelle silhuett',
      'Krever nøye vindsimulering rundt de høyeste bygningene',
    ],
    heroImageUrl: '/images/lagmannsholmen-moderne.jpg',
    galleryImages: [
      {
        url: '/images/lagmannsholmen-moderne.jpg',
        caption: 'Krystallkaien med utkraget kulturpaviljong og granittpromenade i blåtimen (AI-illustrasjon)',
        perspective: 'Kulturpaviljong / Blåtime',
      },
    ],
    seedVotes: 245,
    submittedAt: '2026-10-19',
  },
  {
    slug: 'holmen-naturby',
    areaSlug: 'lagmannsholmen',
    actorSlug: 'fjord-og-form-studio',
    title: 'Holmen Naturby',
    subtitle: 'Lav kystpark, ombrukte havnelager, kystfuruskog og flytende sjøbad',
    style: 'Økologisk',
    maxFloors: 4,
    estimatedHomes: 920,
    greenSpacePercent: 58,
    primaryMaterials: 'Ubehandlet sedertre, lokal naturstein, ombrukt tegl og tregangveier',
    streetLifeSummary:
      'Helårs flytende sjøbad, ombrukt rød teglhall til folkemarked, kyststier gjennom furulund og marin formidling.',
    architecturalVision:
      'Holmen Naturby snur rekkefølgen i byutviklingen: først restaureres kystlandskapet med furu, svaberg og blomstereng — deretter plasseres lave boligpaviljonger varsomt inn i terrenget. Et eksisterende industribygg i rød tegl transformeres til åpen kulturhall, mens et sirkulært sjøbad i sjøfronten gjør hele halvøya til Kristiansands grønneste møteplass.',
    principles: [
      '58 % sammenhengende blågrønn allmenning som binder by og natur.',
      'Bevaring og ombruk av eksisterende havnestrukturer i stedet for riving.',
      'Null nye bilveier inne på selve halvøya — kun tregangveier og sykkelstier.',
      'Regnbed og permeable overflater som håndterer ekstremnedbør og stormflo.',
    ],
    highlights: [
      'Desidert størst offentlig park- og kystandel for alle innbyggere',
      'Forbildeprosjekt for sirkulær materialbruk og marin restaurering',
      'Lunt kystklima mellom furutrær og lave paviljonger',
    ],
    tradeoffs: [
      'Færrest nye boliger (920) kan øke utbyggingspresset andre steder i byen',
      'Høy andel offentlig park stiller større krav til kommunalt driftsbudsjett',
    ],
    heroImageUrl: '/images/lagmannsholmen-naturby.jpg',
    galleryImages: [
      {
        url: '/images/lagmannsholmen-naturby.jpg',
        caption: 'Holmen Naturby med kystfuru, ombrukt teglhall og flytende sjøbad (AI-illustrasjon)',
        perspective: 'Kystpark / Sjøbad',
      },
    ],
    seedVotes: 318,
    submittedAt: '2026-10-22',
  },

  // =========================================================
  // FILIPSTAD, OSLO (2 forslag)
  // =========================================================
  {
    slug: 'fjordbulevarden',
    areaSlug: 'filipstad',
    actorSlug: 'klassisk-byggeskikk',
    title: 'Fjordbulevarden',
    subtitle: 'Kontinental sandsteinsbulevard langs Oslofjorden med parkdrag og arkader',
    style: 'Klassisk',
    maxFloors: 6,
    estimatedHomes: 2550,
    greenSpacePercent: 39,
    primaryMaterials: 'Nordisk sandstein, granittkantstein, smijern og puss',
    streetLifeSummary:
      'Bred trebeplantet fjordpromenade med klassiske bueganger, spisesteder og kveldssol mot Bygdøy.',
    architecturalVision:
      'Fjordbulevarden gir Oslo den sammenhengende, menneskelige sjøbulevarden byen mangler mellom Aker Brygge og Bygdøy. Med jevn gesimshøyde på fem til seks etasjer, tydelig sokkelarkitektur og varme sandsteinsfasader dannes en verdig ramme rundt en generøs fjordpark.',
    principles: [
      'Sammenhengende bulevardprofil med tydelig skille mellom offentlig brygge og privat boliggård.',
      'Tette, varme sandsteins- og teglfasader som gløder i kveldssolen fra vest.',
      'Åpne arkader langs hele promenaden sikrer liv hele døgnet.',
      'Direkte gangbroer over E18-kulvert til Ruseløkka og Vika.',
    ],
    highlights: [
      'Skaper en helhetlig byfront som står i kontrast til fragmenterte høyhus',
      'Generøs parkpromenade langs hele sjølinjen',
    ],
    tradeoffs: [
      'Kompakte seks etasjer gir lavere utnyttelse enn skisserte tårn på 14+ etasjer',
    ],
    heroImageUrl: '/images/filipstad-hero.jpg',
    galleryImages: [
      {
        url: '/images/filipstad-hero.jpg',
        caption: 'Sandsteinsbulevard og fjordpromenade på Filipstad i kveldssol (AI-illustrasjon)',
        perspective: 'Fjordpromenade',
      },
    ],
    seedVotes: 392,
    submittedAt: '2026-10-18',
  },
  {
    slug: 'vestfronten',
    areaSlug: 'filipstad',
    actorSlug: 'nordlys-arkitekter',
    title: 'Vestfronten',
    subtitle: 'Skulpturelle fjordkvarter og offentlig steinamfi ned mot Oslofjorden',
    style: 'Moderne',
    maxFloors: 11,
    estimatedHomes: 3050,
    greenSpacePercent: 36,
    primaryMaterials: 'Lys kalkstein, lavjern-glass og varm eik i interiørsoner',
    streetLifeSummary:
      'Monumentalt steinamfi direkte ned i fjorden, kulturhus på kaien og kveldsåpen sjøpromenade.',
    architecturalVision:
      'Vestfronten kombinerer høy urban boligkapasitet med et bredt, skulpturelt offentlig amfi som trekker byen rett ned til vannflaten. Lys stein og store glassflater reflekterer skiftende lys over Oslofjorden og frigjør brede siktlinjer mellom bygningskroppene.',
    principles: [
      'Steinamfi som gjør hele vestfronten til en sosial møteplass.',
      'Varierende høyder fra 4 til 11 etasjer for maksimal sol og fjordutsikt.',
      'Høy boligandel ved fremtidig Fjordbanen-stasjon.',
      'Bilfri sjøfront med integrert sykkelekspressvei.',
    ],
    highlights: [
      'Maksimal boligproduksjon sentralt ved kollektivtransport',
      'Nytt stort offentlig byrom direkte i vannkanten',
    ],
    tradeoffs: [
      'Høyeste bygningsvolumer kan kaste skygge på bakenforliggende kvartaler tidlig på dagen',
    ],
    heroImageUrl: '/images/filipstad-moderne.jpg',
    galleryImages: [
      {
        url: '/images/filipstad-moderne.jpg',
        caption: 'Vestfronten med offentlig fjordamfi og lys steinarkitektur i blåtimen (AI-illustrasjon)',
        perspective: 'Amfi / Sjøfront',
      },
    ],
    seedVotes: 278,
    submittedAt: '2026-10-21',
  },

  // =========================================================
  // DOKKEN, BERGEN (2 forslag — fasadeskisser i konseptfase)
  // =========================================================
  {
    slug: 'bryggekvartalet',
    areaSlug: 'dokken',
    actorSlug: 'nyurbanisme-norge',
    title: 'Bryggekvartalet',
    subtitle: 'Bergenske gavlhus, smau og kanaler i møte med Byfjellene',
    style: 'Nyurbanisme',
    maxFloors: 5,
    estimatedHomes: 2100,
    greenSpacePercent: 35,
    primaryMaterials: 'Tegl, mørk kjernefuru og skifer',
    streetLifeSummary:
      'Lune smau, småbåtkanaler, sjømathandel og overdekkede passasjer tilpasset bergensk regnvær.',
    architecturalVision:
      'Bryggekvartalet henter sin rytme fra Bergens historiske sjøboder og smau. Ved å dele opp lange kaifronter i slanke gavler med spisse tak og skjermede kanaler skapes et gjenkjennelig vestlandsk bybilde med lune uterom.',
    principles: [
      'Gavlrytme og smale passasjer som bryter ned vind fra Puddefjorden.',
      'Åpne vannkanaler som bringer fjorden inn mellom kvartalene.',
      'Overbygde gangpassasjer og arkader gir tørrskodd ferdsel i regnvær.',
      'Skala på 3–5 etasjer bevarer utsikten mot Løvstakken og Fløyen.',
    ],
    highlights: [
      'Klimatilpasset gatestruktur for mye nedbør og vind',
      'Umiddelbar bergensk stedsidentitet',
    ],
    tradeoffs: [
      'Kanalgraving og bryggeforsterkning gir høyere grunnkostnader',
    ],
    heroImageUrl: '/images/dokken-hero.svg',
    galleryImages: [
      {
        url: '/images/dokken-hero.svg',
        caption: 'Arkitektonisk fasadeskisse (Konseptfase): Bryggekvartalet med gavler og kanaler',
        perspective: 'Fasadeskisse / Bergen',
      },
    ],
    seedVotes: 241,
    submittedAt: '2026-10-25',
  },
  {
    slug: 'dokken-fjordpark',
    areaSlug: 'dokken',
    actorSlug: 'fjord-og-form-studio',
    title: 'Dokken Fjordpark',
    subtitle: 'Blågrønn regnparkby og terrasserte trekvartaler langs Puddefjorden',
    style: 'Økologisk',
    maxFloors: 5,
    estimatedHomes: 1850,
    greenSpacePercent: 52,
    primaryMaterials: 'Massivtre, sedumtak, naturstein og permeable kailøsninger',
    streetLifeSummary:
      'Flytende fjordbad, urbane regnhager, sykkelpromenade og grønne nabolagstun.',
    architecturalVision:
      'Dokken Fjordpark gjør Bergens nedbør til en arkitektonisk ressurs. Trappede trebygg med frodige grønne tak leder overvann gjennom åpne regnhager ned mot et stort offentlig sjøbad og en sammenhengende parkallmenning rundt hele odden.',
    principles: [
      'Over 50 % offentlig park- og blågrønn sone.',
      'Trappede massivtre-volumer med felles veksthus på takene.',
      'Åpne regnhager som både håndterer flom og skaper frodige byrom.',
      'Bilfri indre park med direkte kyststi til Nordnes.',
    ],
    highlights: [
      'Svært robust klimatilpasning og overvannshåndtering',
      'Stor offentlig allmenning langs hele Dokken-odden',
    ],
    tradeoffs: [
      'Noe lavere næringsareal på gateplan enn rene sentrumskvartaler',
    ],
    heroImageUrl: '/images/dokken-natur.svg',
    galleryImages: [
      {
        url: '/images/dokken-natur.svg',
        caption: 'Arkitektonisk fasadeskisse (Konseptfase): Dokken Fjordpark med regnhager og flytende sjøbad',
        perspective: 'Fasadeskisse / Parkprofil',
      },
    ],
    seedVotes: 214,
    submittedAt: '2026-10-27',
  },

  // =========================================================
  // NYHAVNA, TRONDHEIM (2 forslag — fasadeskisser i konseptfase)
  // =========================================================
  {
    slug: 'verftskvartalet',
    areaSlug: 'nyhavna',
    actorSlug: 'verftet-urbanisme',
    title: 'Verftskvartalet',
    subtitle: 'Bevarte teglhaller som hjerte i nye klassisk-industrielle murkvartaler',
    style: 'Klassisk',
    maxFloors: 5,
    estimatedHomes: 1780,
    greenSpacePercent: 33,
    primaryMaterials: 'Rød teglstein, mørkt stål, kjernefuru og granittsokkel',
    streetLifeSummary:
      'Bevarte verftshaller med kulturscene, matmarked og verksteder omgitt av varme murkvartaler.',
    architecturalVision:
      'Verftskvartalet lar Nyhavnas historiske verftshaller og kraner forbli bydelens ubestridte midtpunkt. Rundt hallene bygges solide kvartaler i rød og mørk tegl med buede vindusåpninger og saltak som snakker direkte med industriarven.',
    principles: [
      'Full bevaring og transformasjon av eksisterende teglhaller.',
      'Ny bebyggelse i 4–5 etasjer med tydelig industriell-klassisk detaljering.',
      'Vernede siktlinjer til de ikoniske verftskranene og fjorden.',
      'Rimelige verksted- og kulturlokaler i sokkeletasjene.',
    ],
    highlights: [
      'Tar vare på Trondheims maritime industrihistorie',
      'Skaper levende blanding av kultur, verksteder og boliger',
    ],
    tradeoffs: [
      'Sanering og ombruk av gamle haller krever nøye miljø- og fundamenteringsarbeid',
    ],
    heroImageUrl: '/images/nyhavna-hero.svg',
    galleryImages: [
      {
        url: '/images/nyhavna-hero.svg',
        caption: 'Arkitektonisk fasadeskisse (Konseptfase): Verftskvartalet med teglhaller og kranprofil',
        perspective: 'Fasadeskisse / Industriarv',
      },
    ],
    seedVotes: 264,
    submittedAt: '2026-10-30',
  },
  {
    slug: 'fjordterrassene',
    areaSlug: 'nyhavna',
    actorSlug: 'nordlys-arkitekter',
    title: 'Fjordterrassene',
    subtitle: 'Utkragede tre- og glassterrasser vendt mot Trondheimsfjorden',
    style: 'Moderne',
    maxFloors: 8,
    estimatedHomes: 2150,
    greenSpacePercent: 37,
    primaryMaterials: 'Limtre, glass, sink og varm granittkai',
    streetLifeSummary:
      'Offentlig fjordpaviljong, utendørs vinterbadstu og opplyst havnepromenade mot Munkholmen.',
    architecturalVision:
      'Fjordterrassene åpner Nyhavna som en moderne nordisk fjordfront med utkragede balkonger og trappetrinn ned mot Trondheimsfjorden. Bygningene trapper ned mot vannet for å slippe inn lav vintersol og ramme inn utsikten mot Munkholmen.',
    principles: [
      'Trappet silhuett optimalisert for trøndersk solinnfall.',
      'Offentlig kulturpaviljong og fjordpromenade i hele bredden.',
      'Massivtre i bæresystemer kombinert med værbestandig sink og glass.',
      'Høy boligkapasitet nær Lade og sentrum.',
    ],
    highlights: [
      'Utnytter utsikten mot Trondheimsfjorden og Munkholmen maksimalt',
      'Sterk samtidsarkitektur i massivtre',
    ],
    tradeoffs: [
      'Mindre direkte visuell referanse til områdets historiske murverk',
    ],
    heroImageUrl: '/images/nyhavna-moderne.svg',
    galleryImages: [
      {
        url: '/images/nyhavna-moderne.svg',
        caption: 'Arkitektonisk fasadeskisse (Konseptfase): Fjordterrassene mot Trondheimsfjorden',
        perspective: 'Fasadeskisse / Samtid',
      },
    ],
    seedVotes: 189,
    submittedAt: '2026-11-01',
  },
];

export function getSeedProposalsForArea(areaSlug: string): Proposal[] {
  return SEED_PROPOSALS.filter((p) => p.areaSlug === areaSlug);
}

export function getSeedProposalsByActor(actorSlug: string): Proposal[] {
  return SEED_PROPOSALS.filter((p) => p.actorSlug === actorSlug);
}
