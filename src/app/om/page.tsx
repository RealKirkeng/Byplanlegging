import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SITE_CONFIG } from '@/config/site';

export const metadata: Metadata = {
  title: 'Om Bysjon',
  description:
    'Bakgrunnen for Bysjon — en uavhengig, åpen informasjonsplattform for norsk byutvikling, arkitekturdebatt og folkemedvirkning.',
};

export default function AboutPage() {
  return (
    <section className="section-pad">
      <div className="container" style={{ maxInlineSize: '920px' }}>
        <span className="eyebrow">Plattformens idé &amp; arkitektur</span>
        <h1
          className="font-display"
          style={{ margin: '0.6rem 0 1.25rem', fontSize: 'var(--font-display)' }}
        >
          En permanent scene for hele bydebatten
        </h1>
        <p
          style={{
            margin: '0 0 var(--space-lg)',
            fontSize: 'var(--font-lg)',
            color: 'var(--text-secondary)',
            lineHeight: 1.7,
          }}
        >
          {SITE_CONFIG.name} er skapt for å gi innbyggere, arkitekturbevegelser og
          fagmiljøer et felles, permanent utstillingsrom. I stedet for at planer for
          store områder som Lagmannsholmen forsvinner i flyktige nyhetsfeeder, kan
          ulike visjoner utforskes side om side på like premisser.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
          <article
            style={{
              padding: 'var(--space-md)',
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border-hairline)',
            }}
          >
            <span className="font-mono-meta" style={{ color: 'var(--accent-brass)' }}>
              01 · STILMESSIG NØYTRALITET
            </span>
            <h2 className="font-display" style={{ margin: '0.45rem 0 0.75rem', fontSize: '1.75rem' }}>
              Fra Arkitekturopprøret til moderne massivtre
            </h2>
            <p style={{ margin: 0, color: 'var(--text-secondary)' }}>
              Plattformen tar ikke parti for én stilretning. Klassisk kvartalsby,
              nyurbanisme, skulpturell samtid og kystøkologi vurderes etter de
              samme åpne kriteriene: etasjehøyde, boligkapasitet, grøntareal,
              materialer og kvalitet på gateplan.
            </p>
          </article>

          <article
            style={{
              padding: 'var(--space-md)',
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border-hairline)',
            }}
          >
            <span className="font-mono-meta" style={{ color: 'var(--accent-brass)' }}>
              02 · INNBYGGERAVSTEMNINGER &amp; DATA
            </span>
            <h2 className="font-display" style={{ margin: '0.45rem 0 0.75rem', fontSize: '1.75rem' }}>
              Veiledning til både utbyggere og kommuner
            </h2>
            <p style={{ margin: 0, color: 'var(--text-secondary)' }}>
              Ved å kombinere stemmegivning på konkrete konsepter med vekting av
              bykvaliteter (skala, estetikk, grøntareal og byliv), får private
              utbyggere og offentlige etater et tydeligere beslutningsgrunnlag enn
              tradisjonelle høringssvar alene gir.
            </p>
          </article>

          <article
            style={{
              padding: 'var(--space-md)',
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border-hairline)',
            }}
          >
            <span className="font-mono-meta" style={{ color: 'var(--accent-brass)' }}>
              03 · TEKNISK VEIKART (VERCEL &amp; SUPABASE)
            </span>
            <h2 className="font-display" style={{ margin: '0.45rem 0 0.75rem', fontSize: '1.75rem' }}>
              Klar for neste steg mot produksjonsdrift
            </h2>
            <p style={{ margin: 0, color: 'var(--text-secondary)' }}>
              Denne første utgaven fungerer som full interaktiv mal i nettleseren
              med <code>localStorage</code>. Komplett databaseskjema for{' '}
              <strong>Supabase</strong> ligger klart i{' '}
              <code>supabase/schema.sql</code>, og applikasjonen kan rulles ut på{' '}
              <strong>Vercel</strong> så snart miljøvariabler er lagt inn.
            </p>
          </article>
        </div>

        <div style={{ marginBlockStart: 'var(--space-lg)', display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }}>
          <Link href="/omrader/lagmannsholmen" className="btn btn-primary">
            <span>Se Lagmannsholmen</span>
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
          <Link href="/send-inn" className="btn btn-brass-outline">
            Send inn et forslag
          </Link>
        </div>
      </div>
    </section>
  );
}
