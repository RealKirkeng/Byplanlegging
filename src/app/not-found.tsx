import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <section className="section-pad">
      <div className="container" style={{ maxInlineSize: '640px', paddingBlock: 'var(--space-xl)' }}>
        <span className="eyebrow">404 · Side ikke funnet</span>
        <h1
          className="font-display"
          style={{ margin: '0.6rem 0 1rem', fontSize: 'var(--font-display)' }}
        >
          Denne tomten er ikke regulert ennå
        </h1>
        <p style={{ margin: '0 0 2rem', color: 'var(--text-secondary)' }}>
          Siden du leter etter finnes ikke eller er flyttet. Utforsk de aktive
          transformasjonsområdene eller gå tilbake til forsiden.
        </p>
        <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }}>
          <Link href="/" className="btn btn-primary">
            Til forsiden
          </Link>
          <Link href="/omrader" className="btn">
            Se alle områder
          </Link>
        </div>
      </div>
    </section>
  );
}
