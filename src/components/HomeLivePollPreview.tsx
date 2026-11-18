'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { StyleBadge } from '@/components/StyleBadge';
import { useBysjonStore } from '@/lib/repository';

export function HomeLivePollPreview() {
  const { getAreaVoteStats } = useBysjonStore();
  const stats = getAreaVoteStats('lagmannsholmen');

  return (
    <div
      style={{
        background: 'var(--bg-elevated)',
        border: '1px solid var(--border-hairline)',
        padding: 'var(--space-lg)',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
        gap: 'var(--space-lg)',
        alignItems: 'center',
      }}
    >
      <div>
        <span className="eyebrow">Pågående folkepuls · Kristiansand</span>
        <h2
          className="font-display"
          style={{ margin: '0.65rem 0 1rem', fontSize: 'var(--font-2xl)' }}
        >
          Lagmannsholmen: Hvilken retning leder akkurat nå?
        </h2>
        <p
          style={{
            margin: '0 0 1.5rem',
            color: 'var(--text-secondary)',
            maxInlineSize: '48ch',
          }}
        >
          Tallene oppdateres umiddelbart når innbyggere avgir sin stemme. Resultatet
          viser både ønsket arkitekturstil og hvilke bokvaliteter publikum vektlegger
          høyest.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem' }}>
          <Link href="/omrader/lagmannsholmen#avstemning" className="btn btn-primary">
            <span>Delta i avstemningen</span>
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
          <Link
            href="/omrader/lagmannsholmen?tab=sammenlign"
            className="btn btn-brass-outline"
          >
            <span>Sammenlign side om side</span>
          </Link>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            borderBlockEnd: '1px solid var(--border-hairline)',
            paddingBlockEnd: '0.6rem',
          }}
        >
          <span className="font-mono-meta" style={{ color: 'var(--text-muted)' }}>
            FORDELING AV STEMMER
          </span>
          <span
            className="font-mono-meta"
            style={{ color: 'var(--accent-brass-bright)' }}
          >
            {stats.totalVotes.toLocaleString('nb-NO')} TOTALT
          </span>
        </div>

        {stats.entries.map((entry) => (
          <div key={entry.proposalSlug}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '0.5rem',
                marginBlockEnd: '0.35rem',
                flexWrap: 'wrap',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                <Link
                  href={`/omrader/lagmannsholmen/forslag/${entry.proposalSlug}`}
                  style={{ fontWeight: 600, fontSize: 'var(--font-sm)' }}
                >
                  {entry.title}
                </Link>
                <StyleBadge style={entry.style} />
              </div>
              <span
                className="font-mono-meta"
                style={{ color: 'var(--accent-brass-bright)' }}
              >
                {entry.percentage} %
              </span>
            </div>
            <div className="poll-bar-track">
              <div
                className="poll-bar-fill"
                style={{ inlineSize: `${entry.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
