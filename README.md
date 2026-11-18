# Bysjon — Norges åpne plattform for byutvikling og arkitektur

**Bysjon** er en åpen informasjons- og deltakelsesplattform for norsk byutvikling. Målet er å samle konkurrerende og supplerende arkitekturforslag for store transformasjonsområder — som **Lagmannsholmen i Kristiansand**, **Filipstad i Oslo**, **Dokken i Bergen** og **Nyhavna i Trondheim** — på ett sted, slik at innbyggere, arkitekturbevegelser, designbyråer og offentlige etater kan sammenligne visjoner, utforske illustrasjoner og delta i avstemninger.

## Funksjoner i første versjon (Prototype)

- **Redaksjonell luksusprofil i mørk palett**: Heldekkende arkitekturheroer, typografisk kontrast mellom klassisk serif og stram sans-serif, messingaksenter og skarpe hårlinjer.
- **Transformasjonsområder med flere perspektiver**: Utforsk 4 norske byutviklingsområder, filtrer forslag på arkitektonisk retning (*Klassisk*, *Nyurbanisme*, *Moderne*, *Økologisk*).
- **Side-om-side sammenligning & Split-slider**: Sammenlign to forslag direkte i delt visning med interaktiv skyvebryter og strukturert nøkkeltall-tabell.
- **Innbyggeravstemninger (Polls)**: Stem på foretrukket forslag og vektlegg fire byutviklingskvaliteter (*Klassisk estetikk*, *Grønne byrom*, *Menneskelig skala*, *Aktivt byliv*) med sanntidsoppdatering.
- **Aktørprofiler**: Egen oversikt og profilside for arkitektkontorer, designstudioer og bevegelser (f.eks. eksempelbidrag fra *Arkitekturopprøret Sør* og *Nyurbanisme Norge*).
- **Send inn forslag**: Interaktivt innsendingsskjema med bildeopplasting, forhåndsvisning i sanntid og umiddelbar publisering lokalt i nettleseren.

## Kom i gang lokalt (Localhost)

1. Installer avhengigheter:
   ```bash
   npm install
   ```
2. Start utviklingsserveren:
   ```bash
   npm run dev
   ```
3. Åpne [http://localhost:3000](http://localhost:3000) i nettleseren.

> **Merk for Windows PowerShell:** Dersom kjøring av `.ps1`-skript er deaktivert i PowerShell, bruk `npm.cmd run dev` og `npx.cmd tsc --noEmit`.

## Klargjort for Vercel & Supabase

- **Demomodus uten oppsett:** Uten miljøvariabler kjører plattformen sømløst mot kuraterte demodata kombinert med lokal lagring (`localStorage`) for stemmer, kvalitetsvekting, kommentarer og nyinnsendte forslag.
- **Supabase-tilkobling:**
  1. Opprett et prosjekt på [supabase.com](https://supabase.com).
  2. Kjør `supabase/schema.sql` i Supabase SQL Editor for å opprette tabeller, visninger og RLS-regler.
  3. Kopier `.env.example` til `.env.local` og fyll inn `NEXT_PUBLIC_SUPABASE_URL` og `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
- **Vercel:** Importer GitHub-repositoryet på [vercel.com](https://vercel.com), legg til de samme miljøvariablene, og rull ut.
