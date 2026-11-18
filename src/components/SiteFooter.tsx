import Link from 'next/link';
import { SITE_CONFIG } from '@/config/site';
import { AREAS } from '@/data/areas';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Link href="/" className="site-logo">
              <span className="site-logo-wordmark">{SITE_CONFIG.shortMark}</span>
            </Link>
            <p
              style={{
                color: 'var(--text-secondary)',
                fontSize: 'var(--font-sm)',
                maxInlineSize: '36ch',
                marginBlock: '1rem 1.25rem',
              }}
            >
              {SITE_CONFIG.tagline}. Et åpent arkitektur- og medvirkningsarkiv der
              ulike stemmer møtes før byen bygges.
            </p>
            <p
              className="font-mono-meta"
              style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}
            >
              PROTOTYPE v1.0 · KLARGJORT FOR VERCEL &amp; SUPABASE
            </p>
          </div>

          <div>
            <h2 className="footer-heading">Transformasjonsområder</h2>
            <ul className="footer-links">
              {AREAS.map((area) => (
                <li key={area.slug}>
                  <Link href={`/omrader/${area.slug}`}>
                    {area.name}, {area.city}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="footer-heading">Plattform</h2>
            <ul className="footer-links">
              <li>
                <Link href="/omrader">Alle byområder</Link>
              </li>
              <li>
                <Link href="/aktorer">Aktører &amp; byråer</Link>
              </li>
              <li>
                <Link href="/send-inn">Send inn forslag</Link>
              </li>
              <li>
                <Link href="/om">Om {SITE_CONFIG.name}</Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="footer-heading">Eksempeldata &amp; Drift</h2>
            <p
              style={{
                color: 'var(--text-muted)',
                fontSize: 'var(--font-xs)',
                margin: 0,
                lineHeight: 1.65,
              }}
            >
              Denne første visningen bruker illustrerte eksempelbidrag (AI-genererte
              perspektiver og arkitektoniske fasadeskisser) samt lokal lagring i
              nettleseren. Skjema for full Supabase-kobling ligger i{' '}
              <code>supabase/schema.sql</code>.
            </p>
          </div>
        </div>

        <div
          style={{
            marginBlockStart: 'var(--space-lg)',
            paddingBlockStart: 'var(--space-md)',
            borderBlockStart: '1px solid var(--border-hairline)',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            gap: '1rem',
            fontSize: 'var(--font-xs)',
            color: 'var(--text-muted)',
          }}
        >
          <span>© 2026 {SITE_CONFIG.name} — Åpen norsk byplanplattform</span>
          <span className="font-mono-meta">{SITE_CONFIG.locationLabel}</span>
        </div>
      </div>
    </footer>
  );
}
