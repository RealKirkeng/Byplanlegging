'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
import { ACTORS } from '@/data/actors';
import { getAreaBySlug } from '@/data/areas';
import { useBysjonStore } from '@/lib/repository';
import type { ActorCategory } from '@/lib/types';

const CATEGORIES: Array<'Alle' | ActorCategory> = [
  'Alle',
  'Arkitekturbevegelse',
  'Urbanisme-studio',
  'Arkitektkontor',
  'Landskap & Byform',
];

export function ActorsDirectoryClient() {
  const { getProposalsForActor } = useBysjonStore();
  const [categoryFilter, setCategoryFilter] = useState<'Alle' | ActorCategory>(
    'Alle'
  );

  const visibleActors =
    categoryFilter === 'Alle'
      ? ACTORS
      : ACTORS.filter((a) => a.category === categoryFilter);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
      <div
        className="filter-pills"
        role="group"
        aria-label="Filtrer aktører etter kategori"
      >
        {CATEGORIES.map((category) => (
          <button
            key={category}
            type="button"
            className="filter-pill"
            aria-pressed={categoryFilter === category}
            onClick={() => setCategoryFilter(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid-3">
        {visibleActors.map((actor) => {
          const proposals = getProposalsForActor(actor.slug);
          const totalVotes = proposals.reduce((sum, p) => sum + p.seedVotes, 0);

          return (
            <article
              key={actor.slug}
              className="editorial-card"
              style={{ padding: 'var(--space-md)', gap: '1rem' }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: '0.5rem',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                }}
              >
                <span
                  className="font-mono-meta"
                  style={{ color: 'var(--accent-brass)' }}
                >
                  {actor.category}
                </span>
                <span
                  className="font-mono-meta"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {actor.city}
                </span>
              </div>

              <div>
                <h2
                  className="font-display"
                  style={{ margin: '0 0 0.45rem', fontSize: '1.75rem' }}
                >
                  <Link href={`/aktorer/${actor.slug}`}>{actor.name}</Link>
                </h2>
                <p
                  style={{
                    margin: 0,
                    color: 'var(--text-primary)',
                    fontSize: 'var(--font-sm)',
                    fontWeight: 500,
                  }}
                >
                  {actor.tagline}
                </p>
              </div>

              <p
                style={{
                  margin: 0,
                  color: 'var(--text-secondary)',
                  fontSize: 'var(--font-sm)',
                }}
              >
                {actor.philosophy}
              </p>

              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.4rem',
                }}
              >
                {actor.focusTags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      padding: '0.25rem 0.55rem',
                      border: '1px solid var(--border-hairline)',
                      fontSize: '0.72rem',
                      color: 'var(--text-muted)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="metrics-row">
                <div>
                  <span className="metric-cell-label">Bidrag</span>
                  <span className="metric-cell-value">{proposals.length} planer</span>
                </div>
                <div>
                  <span className="metric-cell-label">Områder</span>
                  <span className="metric-cell-value">
                    {new Set(proposals.map((p) => p.areaSlug)).size} byer
                  </span>
                </div>
                <div>
                  <span className="metric-cell-label">Oppslutning</span>
                  <span className="metric-cell-value">
                    {totalVotes.toLocaleString('nb-NO')}
                  </span>
                </div>
              </div>

              {proposals.length > 0 && (
                <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-muted)' }}>
                  Siste:{' '}
                  <Link
                    href={`/omrader/${proposals[0].areaSlug}/forslag/${proposals[0].slug}`}
                    style={{ color: 'var(--accent-brass-bright)' }}
                  >
                    {proposals[0].title} (
                    {getAreaBySlug(proposals[0].areaSlug)?.name})
                  </Link>
                </div>
              )}

              <div style={{ marginBlockStart: 'auto' }}>
                <Link href={`/aktorer/${actor.slug}`} className="btn btn-sm" style={{ inlineSize: '100%' }}>
                  <span>Se aktørprofil og forslag</span>
                  <ArrowUpRight size={14} aria-hidden="true" />
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
