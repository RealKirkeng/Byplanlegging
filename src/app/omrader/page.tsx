import type { Metadata } from 'next';
import { AreasDirectoryClient } from '@/components/AreasDirectoryClient';

export const metadata: Metadata = {
  title: 'Transformasjonsområder',
  description:
    'Utforsk norske byutviklings- og havneområder med konkurrerende arkitekturforslag og åpne innbyggeravstemninger.',
};

export default function AreasPage() {
  return (
    <section className="section-pad">
      <div className="container">
        <div style={{ maxInlineSize: '66ch', marginBlockEnd: 'var(--space-lg)' }}>
          <span className="eyebrow">Nasjonal oversikt</span>
          <h1
            className="font-display"
            style={{ margin: '0.6rem 0 1rem', fontSize: 'var(--font-display)' }}
          >
            Norske transformasjonsområder
          </h1>
          <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: 'var(--font-lg)' }}>
            Sammenlign arkitekturvisjoner for havner og bydeler under forvandling.
            Filtrer etter by eller planstatus og utforsk forslagene i detalj.
          </p>
        </div>

        <AreasDirectoryClient />
      </div>
    </section>
  );
}
