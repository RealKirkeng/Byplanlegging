'use client';

import Link from 'next/link';
import { ArrowUpRight, Search } from 'lucide-react';
import { useState } from 'react';
import { AREAS } from '@/data/areas';
import { useBysjonStore } from '@/lib/repository';
import type { AreaStatus } from '@/lib/types';

const STATUS_OPTIONS: Array<'Alle' | AreaStatus> = [
  'Alle',
  'Åpen høring',
  'Under utredning',
  'Konseptfase',
];

export function AreasDirectoryClient() {
  const { getProposalsForArea, getAreaVoteStats } = useBysjonStore();
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'Alle' | AreaStatus>('Alle');
  const [cityFilter, setCityFilter] = useState<string>('Alle');

  const cities = ['Alle', ...Array.from(new Set(AREAS.map((a) => a.city)))];

  const filteredAreas = AREAS.filter((area) => {
    const matchesStatus =
      statusFilter === 'Alle' || area.status === statusFilter;
    const matchesCity = cityFilter === 'Alle' || area.city === cityFilter;
    const q = query.trim().toLowerCase();
    const matchesQuery =
      !q ||
      area.name.toLowerCase().includes(q) ||
      area.city.toLowerCase().includes(q) ||
      area.summary.toLowerCase().includes(q);
    return matchesStatus && matchesCity && matchesQuery;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
      {/* Søk og filterlinje */}
      <div
        style={{
          padding: 'var(--space-md)',
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border-hairline)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
            gap: '1rem',
            alignItems: 'end',
          }}
        >
          <div className="field">
            <label htmlFor="area-search" className="field-label">
              Søk etter bydel eller by
            </label>
            <div style={{ position: 'relative' }}>
              <input
                id="area-search"
                type="search"
                className="field-input"
                placeholder="F.eks. Lagmannsholmen, Kristiansand, Bergen..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{ paddingInlineStart: '2.5rem' }}
              />
              <Search
                size={16}
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  insetInlineStart: '0.9rem',
                  insetBlockStart: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted)',
                  pointerEvents: 'none',
                }}
              />
            </div>
          </div>

          <div>
            <span className="field-label" style={{ display: 'block', marginBlockEnd: '0.45rem' }}>
              Filtrer på planstatus
            </span>
            <div className="filter-pills">
              {STATUS_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  className="filter-pill"
                  aria-pressed={statusFilter === opt}
                  onClick={() => setStatusFilter(opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div>
          <span className="field-label" style={{ display: 'block', marginBlockEnd: '0.45rem' }}>
            Byer
          </span>
          <div className="filter-pills">
            {cities.map((city) => (
              <button
                key={city}
                type="button"
                className="filter-pill"
                aria-pressed={cityFilter === city}
                onClick={() => setCityFilter(city)}
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Resultater */}
      {filteredAreas.length === 0 ? (
        <div
          style={{
            padding: 'var(--space-lg)',
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border-hairline)',
            textAlign: 'center',
          }}
        >
          <p style={{ margin: '0 0 1rem', color: 'var(--text-secondary)' }}>
            Ingen områder samsvarer med det valgte filteret.
          </p>
          <button
            type="button"
            className="btn btn-sm"
            onClick={() => {
              setQuery('');
              setStatusFilter('Alle');
              setCityFilter('Alle');
            }}
          >
            Nullstill filtre
          </button>
        </div>
      ) : (
        <div className="grid-2">
          {filteredAreas.map((area) => {
            const proposals = getProposalsForArea(area.slug);
            const voteStats = getAreaVoteStats(area.slug);

            return (
              <article key={area.slug} className="editorial-card">
                <div className="card-image-frame">
                  <Link href={`/omrader/${area.slug}`}>
                    <img
                      src={area.heroImageUrl}
                      alt={`${area.name} i ${area.city}`}
                      width={1280}
                      height={800}
                      loading="lazy"
                    />
                  </Link>
                  <div
                    style={{
                      position: 'absolute',
                      insetBlockStart: '0.85rem',
                      insetInlineStart: '0.85rem',
                      padding: '0.3rem 0.65rem',
                      background: 'rgba(8, 8, 10, 0.86)',
                      border: '1px solid var(--border-brass)',
                      fontFamily: 'var(--font-mono), monospace',
                      fontSize: '0.68rem',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--accent-brass-bright)',
                    }}
                  >
                    {area.status}
                  </div>
                </div>

                <div className="card-body">
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      gap: '0.5rem',
                      alignItems: 'center',
                    }}
                  >
                    <span className="font-mono-meta" style={{ color: 'var(--accent-brass)' }}>
                      {area.city} · {area.region}
                    </span>
                    <span className="font-mono-meta" style={{ color: 'var(--text-muted)' }}>
                      {area.coordinates}
                    </span>
                  </div>

                  <div>
                    <h2
                      className="font-display"
                      style={{ margin: '0 0 0.4rem', fontSize: '2rem' }}
                    >
                      <Link href={`/omrader/${area.slug}`}>{area.name}</Link>
                    </h2>
                    <p
                      style={{
                        margin: 0,
                        color: 'var(--text-secondary)',
                        fontSize: 'var(--font-sm)',
                      }}
                    >
                      {area.summary}
                    </p>
                  </div>

                  <div className="metrics-row">
                    <div>
                      <span className="metric-cell-label">Areal</span>
                      <span className="metric-cell-value">{area.areaDekar} daa</span>
                    </div>
                    <div>
                      <span className="metric-cell-label">Forslag</span>
                      <span className="metric-cell-value">{proposals.length} planer</span>
                    </div>
                    <div>
                      <span className="metric-cell-label">Stemmer</span>
                      <span className="metric-cell-value">
                        {voteStats.totalVotes.toLocaleString('nb-NO')}
                      </span>
                    </div>
                  </div>

                  <div
                    style={{
                      marginBlockStart: 'auto',
                      display: 'flex',
                      gap: '0.65rem',
                      flexWrap: 'wrap',
                    }}
                  >
                    <Link href={`/omrader/${area.slug}`} className="btn btn-primary btn-sm">
                      <span>Utforsk {area.name}</span>
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </Link>
                    <Link
                      href={`/omrader/${area.slug}?tab=sammenlign`}
                      className="btn btn-sm"
                    >
                      Sammenlign forslag
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
