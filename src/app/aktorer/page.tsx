import type { Metadata } from 'next';
import Link from 'next/link';
import { ActorsDirectoryClient } from '@/components/ActorsDirectoryClient';

export const metadata: Metadata = {
  title: 'Aktører & Byråer',
  description:
    'Arkitekturbevegelser, urbanisme-studioer og arkitektkontorer som bidrar med planer og visjoner på Bysjon.',
};

export default function ActorsPage() {
  return (
    <section className="section-pad">
      <div className="container">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: '1rem',
            flexWrap: 'wrap',
            marginBlockEnd: 'var(--space-lg)',
          }}
        >
          <div style={{ maxInlineSize: '64ch' }}>
            <span className="eyebrow">Arkitektkontorer · Urbanister · Bevegelser</span>
            <h1
              className="font-display"
              style={{ margin: '0.6rem 0 1rem', fontSize: 'var(--font-display)' }}
            >
              Aktører på plattformen
            </h1>
            <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: 'var(--font-lg)' }}>
              Enten stemmen kommer fra en folkebevegelse, et nyurbanistisk nettverk
              eller et samtidsarkitektkontor — her møtes visjonene på like vilkår.
              (Eksempelprofiler i denne første versjonen er merket som demo.)
            </p>
          </div>

          <Link href="/send-inn" className="btn btn-primary">
            Registrer nytt forslag
          </Link>
        </div>

        <ActorsDirectoryClient />
      </div>
    </section>
  );
}
